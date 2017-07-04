/**
 * @author liujintao
 */
define("GroupEditorView", function(require, exports, module) {
    var app = require('app');
    var $ = require('jquery');
    var _ = require('underscore');
    var contactModel = require('contactModel');
    var i18nDi = require('I18NDI');
    var UIMenu = require("UIMenu");
    var utils = require("utils");
    /*弹窗*/
    var UIDialog = require('UIDialog');
    
    var HANDLER_NAMES = {
        savedOk : "savedOk",
        savedError : "savedError",
        canceled : "cancel"
    };

    var GroupEditorView = app.ViewBase.extend({
        module : module,
        events : {
            'click -> .btn-save' : 'save',
            'click -> .btn-cancel' : 'cancel',
            'click -> .add-item-btn' : 'addGroupItem',
            'click -> .delete-item-btn' : 'deleteGroupItem'
        },
        init : function(opts) {
            console.log("GroupEditorView初始化");
            var me = this;
            this.el = $(opts.el);
            this.win = opts.win;

            this.deleteOk = false;
            this.addOk = false;
            this.updateOk = false;

            this.deleteGroupList = [];
            this.addGroupList = [];
            this.updateGroupList = [];
            this.collection = new contactModel.Collection();

            me.win.setHeader(i18nDi.fillDomText('contact.editgroup'));
            
            me.win.notifyParentWindow({
                ready : "1"
            });
            this.win.on("message", function(data) {
                if (data.info.todo == "initData") {
                    me.accountName = data.info.accountName;
                    me.accountMap = data.info.accountMap;
                    me.groupList = data.info.groupList || [];

                    var tpl = me.getTpl("tpl-group-dlg");
                    var groupListTpl = me.getTpl("tpl-group-list");
                    
                    var wraperDom = _.template(tpl, {
                        I18N : i18nDi,
                        accountName : me.accountName,
                    });
                    
                    $(wraperDom).appendTo(me.el);
                    
                    var groupListCtn = me.el.find(".dlg-group-item-wraper");
                    var groupListDom = _.template(groupListTpl, {
                        I18N : i18nDi,
                        accountName:me.accountName,
                        groupList:me.groupList
                    });
                    
                    groupListCtn.html(groupListDom);
                    
                    var menuList =_.map(Object.keys(me.accountMap),function(account){
                        return {
                             index:account,
                             label:account=='phone'?i18nDi.fillDomText("common.phoneText"):account,
                             value:account,
                             type:'checkbox'                           
                        }
                    });
                    
                    me.accountMenu = new UIMenu({
                        list : menuList
                    });
                    
                    me.accountMenu.decorate(me.el.find('.g-select .g-select-mod[name=account]'));
                    me.accountMenu.addClass("g-account-manager-menu");
                    
                    me.accountMenu.on(UIMenu.SELECT, function(item) {
                        me.accountName = item.value;
                        me.groupList = me.accountMap[item.value].groupList;
                        
                        me.el.find('.g-select .g-select-mod[name=account]').attr("value",item.value);
                        me.el.find('.g-select .g-select-mod[name=account] .name_sp').html(item.label);
                        
                        groupListDom = _.template(groupListTpl, {
                        I18N : i18nDi,
                        accountName:me.accountName,
                        groupList:me.groupList
                        });
                    
                        groupListCtn.html(groupListDom);
                        
                    });
                    
                    me.el.find(".dlg-group-item .delete-item-btn").attr("i18n-Key", "contact.deleteTipText");
                    utils.tooltip.attach(me.el.find(".dlg-group-item .delete-item-btn"));
                    me.el.find(".add-item-btn").attr("i18n-Key", "contact.addTipText");
                    utils.tooltip.attach(me.el.find(".add-item-btn"));
                }else if(data.info.todo == "unconnect"){
                    me.win.close();
                }
            });
        },
        addGroupItem : function(event) {
            var $num_item = $(this.getTpl("tpl-group-dlg-item"));
            $num_item.insertBefore(this.el.find(".dlg-group-item-just-action"));
            this.el.find(".dlg-group-item .delete-item-btn").attr("i18n-Key", "contact.deleteTipText");
            var rowHeight = $num_item.height();
            
            this.el.find(".dlg-group-item-wraper").scrollTop(this.el.find(".dlg-group-item-wraper").children().length*rowHeight);
            $num_item.focus();
            utils.tooltip.attach(this.el.find(".dlg-group-item .delete-item-btn"));
        },
        deleteGroupItem : function(event) {
            $(event.target).parents(".dlg-group-item").remove();
            var cur = $(event.target).parents(".dlg-group-item").find("input[name=groupName]");
            if(!isNaN(Number(cur.attr("group-id")))){
                this.deleteGroupList.push(Number(cur.attr("group-id")));
            }
        },
        checkValidate : function() {
            var input = $(".dlg-group-item-wraper .input-field");
            var checkOk = true;
            _.each(input, function(item) {
                if (item.checkValidity()) {
                    $(item).removeClass("err-input");
                } else {
                    $(item).addClass("err-input");
                    $(item)[0].scrollIntoView();
                    checkOk = false;
                }
            });
            setTimeout(function(){
                input.removeClass("err-input");
            },5000);
            return checkOk;
        },
        save : function() {
            var me = this;
            console.log("保存的save点击");
            if(!this.checkValidate()){
                return;
            }
            this.el.find(".btn-save").attr("disabled","disabled");
            this.errorInfo={
                add:{
                    success:true,
                    code:0
                },
                update:{
                    success:true,
                    code:0
                },
                del:{
                    success:true,
                    code:0
                }
            };
            var timer = setInterval(function() {
                if (me.addOk && me.updateOk && me.deleteOk) {
                    console.log("添加、删除、更新均ok");
                    /*通知保存成功*/
                    clearInterval(timer);
                    if(me.errorInfo.add.success&&me.errorInfo.update.success&&me.errorInfo.del.success){
                        me.win.notifyParentWindow({
                            result : true
                        });
                        me.win.close();                        
                    }else{
                        var dlgOpt = {
                            buttonKey : 2, //双按钮，2有ok按钮,3 yes cancel 双按钮
                            content : i18nDi.fillDomText('contact.saveGroupFailed'),
                            title : i18nDi.fillDomText('common.actionFailed')
                        };      
                            var pp = new UIDialog(dlgOpt);
                            pp.on("yes",function(){
                                me.el.find(".btn-save").removeAttr("disabled");
                            });
							pp.on("ok",function(){
                                me.el.find(".btn-save").removeAttr("disabled");
                            });
                            pp.on("cancel",function(){
                                me.el.find(".btn-save").removeAttr("disabled");
                            });
                            pp.show();                  
                    }

                }
            }, 500);
            var $ctn = this.el;
            var groupsItems = $ctn.find(".dlg-group-item input[name=groupName]");
            
            $.each(groupsItems, function(index, item) {
                if ($(item).attr("group-id")) {/*如果存在groupId，当作修改*/
                    _.each(me.groupList, function(group) {
                        if (group.groupId == $(item).attr("group-id") && group.groupName != $(item).val()&&$(item).val().replace(/\s/g,"")!="") {
                            me.updateGroupList.push({
                                accountName : $(item).attr("account-name"),
                                groupId : $(item).attr("group-id"),
                                groupName : $(item).val()
                            });
                        }
                    });
                } else if($(item).val().replace(/\s/g,"")!=""){//如果不存在groupId，说明是新添加的
                    me.addGroupList.push({
                        accountName : me.accountName,
                        groupName : $(item).val()
                    });
                }
            });
            if (this.deleteGroupList.length > 0) {
                //删除联系人分组
                var deleteCounter = 0;
                me.collection.deleteContactGroup(me.deleteGroupList, function(ret) {
                    deleteCounter++;
                    console.log("deleteContactGroup callback:");
                    console.log(ret);
                    me.errorInfo.del.success=ret.status==1?true:false;
                    me.errorInfo.del.code=ret.code;
                    if (deleteCounter == me.deleteGroupList.length) {
                        me.deleteOk = true;
                        me.deleteGroupList = [];
                    }
                });
            } else {
                me.deleteOk = true;
            }
            if (this.addGroupList.length > 0) {
                var addCounter = 0;
                me.collection.addContactGroup(me.addGroupList, function(ret) {
                    console.log("addContactGroup callback:");
                    console.log(ret);
                    addCounter++;
                    me.errorInfo.add.success=ret.status==1?true:false;
                    me.errorInfo.add.code=ret.code;
                    if (addCounter == me.addGroupList.length) {
                        me.addOk = true;
                        me.addGroupList = [];
                    }
                });
            } else {
                me.addOk = true;
            }
            if (this.updateGroupList.length > 0) {
                //修改联系人分组
                var updateCounter = 0;
                me.collection.updateContactGroup(me.updateGroupList, function(ret) {
                    console.log("updateContactGroup callback:");
                    console.log(ret);
                    updateCounter++;
                    me.errorInfo.update.success=ret.status==1?true:false;
                    me.errorInfo.update.code=ret.code;
                    if (updateCounter == me.updateGroupList.length) {
                        me.updateGroupList = [];
                        me.updateOk = true;
                    }
                });
            } else {
                me.updateOk = true;
            }
        },
        cancel : function() {
            this.win.notifyParentWindow({
                msg : "canceled",
                data : this.groupList
            });
            this.win.close();
        }
    });
    GroupEditorView.HANDLER_NAMES = HANDLER_NAMES;
    return GroupEditorView;
});
