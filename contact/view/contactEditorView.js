/**
 * @author liujintao
 */
define("contactEditorView",function(require, exports, module){
    var app = require('app');
    var   $ = require('jquery');
    var   _ = require('underscore');
    var contactModel = require('contactModel');
    var UIMenu = require("UIMenu");
    var i18nDi = require('I18NDI');
    
    var HANDLER_NAMES={
        savedOk:"savedOk",
        savedError:"savedError",
        canceled:"cancel"
    };
    var ContactEditorView = app.ViewBase.extend({
        module: module,
        model:null,
        el:null,
        win:null,
        type:"new",
        events: {
             'click -> .btn-dlg-save': 'save',
             'click -> .btn-dlg-cancel': 'cancel',
             'click -> .change-contact-icon':"changeIcon",
             'change -> input[name=iconSelector]':'displayIcon',
             'click -> .add-item-btn':'addNumberItem',
             'click -> .delete-item-btn':'deleteNumberItem'
        },
        init: function(opts){
             console.log("contactEditorView初始化");
             console.log(opts);
             this.el = $(opts.el);
             this.type=opts.type;
             this.win = opts.win;
             this.model = opts.model||{};
             this.phoneTypes =contactModel.getPhoneTypes();
        },
        render: function(target){
             var tpl = this.getTpl("tpl-contact-new-dlg");
             var groups=_.map(JSON.parse(localStorage["groups"]),function(item,index){
                 return {index:index,label:item}
             });
                    
             $(_.template(tpl, 
                 {
                 	 I18N:i18nDi,
                     data:this.model, 
                     groups:groups,
                     phoneTypes:this.phoneTypes
                }
                )).appendTo($(target));
             
              this.groupMenu = new UIMenu({
                    list : groups
                });   
              this.groupMenu.decorate(this.el.find('.new-dlg-contact-item .group'));
              var me = this;
              me.groupMenu.on(UIMenu.SELECT,function(data){
                  me.el.find('.new-dlg-contact-item .group').text(data.label);
              })
              
                 for(var index=0;me.model.number&&index<me.model.number.length;index++){
                      var numberTypeMenu = new UIMenu({
                      list : me.phoneTypes
                      });   
                       numberTypeMenu.decorate(this.el.find('.number_item input[name=name][index='+index+']'));
                       numberTypeMenu.on(UIMenu.SELECT,function(dataItem){
                       numberTypeMenu.target.val(dataItem.label);
                  })
                }
        },
        changeIcon:function(){
           this.el.find("input[name=iconSelector]").trigger("click",function(event){
               console.log("change icon callback");
               console.log(event);
           });
        },
        displayIcon:function(event){
            var iconSrc=$("input[name=iconSelector]").val();
            console.log(iconSrc);
            this.el.find("img[name=icon]").attr("src",iconSrc);
        },
        addNumberItem:function(event){
            var $num_item = $(this.getTpl("tpl-new-dlg-contact-item"));
            $num_item.insertAfter($(event.target).parents(".new-dlg-contact-item"));
            var me = this;
            
            var new_number_menu =  new UIMenu({
                    list : me.phoneTypes
                });   
            new_number_menu.decorate($num_item.find('input[name=name]'));
            new_number_menu.on(UIMenu.SELECT,function(dataItem){
                  new_number_menu.target.val(dataItem.label);
              })
        },
        deleteNumberItem:function(event){
           $(event.target).parents(".new-dlg-contact-item").remove();
        },
        save:function(){
                var me = this; 
                var $ctn=this.el;
                var firstname = $ctn.find("input[name=name]").val();
                var lastname = $ctn.find("input[name=lastname]").val();
                var icon = $ctn.find("img[name=icon]").attr("src");
                var note = $ctn.find("textarea[name=note]").val();
                var group = $ctn.find(".group").text();
                var number = [];
                var email = [];
                var nums=$ctn.find(".number_item");
                $.each(nums,function(index,item){
                    if($(item).find("input[name=data]").val()){
                        if($(item).find(".name").val().toLowerCase()=="email"){
                            email.push({typename:$(item).find(".name").val().toLowerCase(),value:$(item).find("input[name=data]").val()});
                        }else{
                            number.push({typename:$(item).find(".name").val(),value:$(item).find("input[name=data]").val()});
                        }
                    }
                });
                console.log(number);
                console.log(email);
                var collection = new contactModel.Collection();
                var submitModel = contactModel.getDataStructure();
                $.extend(submitModel,
                    {
                        iOperation : "2",
                        sFirstName : firstname,
                        sLastName : lastname,
                        sImagePath : icon,
                        sComments : note,
                        sContactNumber : number[0].value?number[0].value:"",
                        sContactEmail : email[0].value==undefined?"":email[0].value,
                        sGroupName : group
                        });
                        console.log(submitModel);
                collection.addContact(submitModel,function(ret){
                    console.log(ret);
                      /*通知保存成功*/
                     me.win.notifyParentWindow(ret);
                     //me.win.close();
                });
              
        },
        cancel:function(){
            this.win.notifyParentWindow({msg:"canceled",data:this.model});
            this.win.close();
        }
    });
    ContactEditorView.HANDLER_NAMES = HANDLER_NAMES;
    return ContactEditorView;
});
