define("UISmsSendView", function(require, exports, module) {
    var app = require('app');
    var   $ = require('jquery');
    var _ = require('underscore');
    var i18nDi  = require('I18NDI');
    var SuperGrid = require('grid');
    var Typeahead = require('Typeahead');
    var UIChatBox = require('UIChatBox');
    var Popup = require('UIPopup');
    var UIWindow = require('UIWindow');
    var apiNames = require('APINames');
    var SearchContactModel = require('SearchContactModel');
    var UIMenu = require('UIMenu');
    var utils = require('utils');
    var connection = require('connectionMgr');


    var ImageItemView = app.ViewBase.extend({
        module : module,
        init : function(model) {
            this.model = model;
            var template = '<img class="icon" src="<%=data.icon%>" width="24" height="24">';
            this.tpl = _.template(template, {
                data : this.model.data
            });
            

        },
        render : function(target) {
            $(target).html(this.tpl);
        }
    });

    var ExpressionPopup = Popup.extend({
        module: module, 
        init: function(opts){
            ExpressionPopup.__super__.init.apply(this, arguments);
            this.options = opts;
            this.el.html('<div class="expression-container"></div>')
            this.el.addClass("g-expression-popup");
        },

        appendExpression: function(){
            var expressionArray = ["(^O^)","(-.-)","(~o~)","(._.)","(^.^)","(..;)","(^_^)","(/_/)","(^^)V","(^^)","(..)","(p_-)","(~_~)","(>_<)","(?_?)","(o|o)","(>.<)","(T-T)","(T.T)","(*^_^*)"]
            var i = 0;
            for (i = 0; i < expressionArray.length; i++){
                var data = {
                    text: expressionArray[i], 
                    id: i,
                    type:"expression",
                    clickItemCallback: $.proxy(this.hidePopup, this) 
                };
                var contactItem = new ContactItemView(data);
                contactItem.appendTo(this.el.find(".expression-container"));
            }
        },
        
        hidePopup: function(){
            this.hide();
            if (typeof this.options.clickItemCallback === 'function'){
                this.options.clickItemCallback.call(this, event);
            }
        }
    });

    var ContactItemView = app.ViewBase.extend({
        module: module,
        events:{
            'click -> #close': 'onClickClose',
            'click -> #contact': 'onClickItem'
        },

        init: function(options){
            this.options = options;
            this.tpl = this.getTpl('tpl-sms-contact-item');
            this.el = $(this.tpl);
            this.el.find("#contact").html(this.options.text);
            if (this.options.text.indexOf('"(') !== -1){
                var number = this.options.text.split('"(')[this.options.text.split('"(').length - 1].match(/[\+\-\*\#0-9]{2,15}/g)[0];
                this.el.find("#contact").attr("titleText", number);
                utils.tooltip.attach(this.el.find("#contact"));
                var name = this.options.text.split('"(')[0].split('"')[1];
                this.el.find("#contact").html(name);
            }
            this.el.attr("data-id", this.options.id);
            if (this.options.type == "expression"){
                this.el.find('#close').remove();
            }
        },

        appendTo: function(target){
            this.el.appendTo(target);
        },

        insertBefore: function(target){
            this.el.insertBefore(target);
        },

        onClickItem: function(event){
            if (typeof this.options.clickItemCallback === 'function'){
                this.options.clickItemCallback.call(this, event);
            }
        },

        onClickClose: function(event){
            if (typeof this.options.closeItemCallback === 'function'){
                this.options.closeItemCallback.call(this, event, this.options.model);
            }
        }
    });

    var SearchContacView = app.ViewBase.extend({
        module: module,
        events:{
            'keyup -> .input-search': 'onEnterKeyword',
            'click -> .button-search': 'onEnterKeyword',
            'click -> .button-select-all': 'onSelectAll',
            'click -> .remove-all-selected': 'onRemoveAll',
            'click -> .button-cancel': 'onClickCancels',
            'click -> .button-ok': 'onClickOK'
        },

        init: function(options){
            this.options = options;
            var smsBoxTemplate = _.template(this.getTpl('tpl-sms-search-contact'), {I18N: i18nDi});
            this.el = $(smsBoxTemplate);
            this.contactCollection = options.contactCollection;
            this.seletedContacts = [];
            this.seletedNum = [];
            //初始化联系人列表
            //this.contactCollection.getAllContacts("model");
            this.contactGrid = new SuperGrid({
                 container: this.el.find(".search-list"),
                 model: [
                            {
                                type : 'checkbox',
                                width : '10%'
                            },
                            {
                                name : 'icon',
                                label : '',
                                type : 'view',
                                width : '12%',
                                view : ImageItemView
                            },
                            {
                                name: 'name',
                                label: '',
                                type: 'string',
                                width: '38%',
                            },
                            {
                                name: 'cellphonenumber',
                                label: '',
                                type: 'string',
                                width: '40%',
                            }
                        ],
                 showLabel: false,
                 rowHeight: 30,
                 multiSelectable: true,
                 collection: this.contactCollection
            });
            this.contactGrid.on(SuperGrid.ROW_SELECTED, $.proxy(this.onGridSelect, this));
            this.contactGrid.on(SuperGrid.ROW_UNSELECTED, $.proxy(this.onGridUnSelect, this));
            //初始化分组下拉菜单
            //this.el.find(".button-group").hide();
            var groupList = this.contactCollection.getGroupsList();
            this.groupListLocal = groupList;
            
            for(var i = 0; i < groupList.length; i++){
                this.groupListLocal[i].temp = this.groupListLocal[i].data;
                if (this.groupListLocal[i].data === "All Groups"){
                    this.groupListLocal[i].data = i18nDi.fillDomText('sms.allGroup');
                    this.groupListLocal[i].label = '<span class="name">' + i18nDi.fillDomText('sms.allGroup') + '</span>';
                } else if(this.groupListLocal[i].data === "Not Assigned"){
                    this.groupListLocal[i].data = i18nDi.fillDomText('contact.notassigened');
                    this.groupListLocal[i].label = '<span class="name">' + i18nDi.fillDomText('contact.notassigened') + '</span>';
                }
            }
            this.dropMenu = new UIMenu({
                list: this.groupListLocal,
                relTarget: this.el.find(".search-list-header")
            });
            this.dropMenu.addClass("g-sms-all-group");
            this.dropMenu.decorate(this.el.find(".button-group"));
            this.dropMenu.on(UIMenu.SELECT, $.proxy(this.onSelectMenuItem, this));
            connection.on('connection', $.proxy(function(){
                if (!connection.isConnect()){
                    this.dropMenu.hide();
                }
            }, this));

            this.contactCollection.on("update_menu", function(){
                console.log("短信 >> 更新分组下拉菜单...");
                this.el.find(".button-group .group-name").html(i18nDi.fillDomText('sms.allGroup'));
                var groupList = this.contactCollection.getGroupsList();
                this.dropMenu.updateList(groupList);
            }.bind(this));

            this.el.find(".selected-container").hide();
            this.disableOKBtn();

            this.el.find(".contacts-count").html(i18nDi.fillDomText('sms.contacts', 0));
        },

        disableOKBtn: function(){
            this.el.find(".button-ok").attr("disabled", "disabled");
        },

        enableOKBtn: function(){
            this.el.find(".button-ok").removeAttr("disabled");
        },

        countSelectedNum: function(){
            //<%=i18nDi.fillDomText('sms.contacts')%>
            this.el.find(".contacts-count").html(i18nDi.fillDomText('sms.contacts', this.seletedContacts.length));
        },

        onClickOK:function(){
            this.hide();
            console.log("添加联系人界面 名字：", this.seletedContacts);
            console.log("添加联系人界面 号码：", this.seletedNum);
            this.trigger("clickok", this.seletedContacts, this.seletedNum);
        },

        onClickCancels: function(){
            this.hide();
            this.trigger("clickcancel");
        },

        show: function(){
            this.el.show();
        },

        hide: function(){
            this.dropMenu.destroy();
            this.contactCollection.models = this.contactCollection.allContacts;
            this.contactCollection.clearSelected();
            //this.el.transition({x: '380px'}, 200, 'ease');
            this.el.hide();
        },

        onRemoveAll:function(){
            this.contactGrid.setAllSelect(false);
            var models = this.contactCollection.models;
            for (var k=0; k < models.length; k++){
                this.onGridUnSelect(models[k]);
            }
            this.disableOKBtn();
        },

        onSelectAll: function(){
            this.contactGrid.setAllSelect(true);
            var models = this.contactCollection.models;
            for (var k=0; k < models.length; k++){
                this.onGridSelect(models[k]);
            }
            this.enableOKBtn();
        },

        onGridSelect: function(model){
            console.log("短信 >> 选中了一行，返回该行的数据模型: ", model);
            model.data['cellphonenumber'] = this.contactCollection.formatCallNum(model.data['cellphonenumber']);
            var text = '"' + model.data['name'] +'"(' + model.data['cellphonenumber'] + ")";
            var isContain = this.contactCollection.isArrayContain(this.seletedNum, model.data['cellphonenumber']);
            if (isContain == false){
                // var data = {
                //     text: text, 
                //     id: model.id,
                //     model: model,
                //     closeItemCallback: $.proxy(this.onCloseSelectedItem, this)
                // };
                // var contactItem = new ContactItemView(data);
                // contactItem.appendTo(this.el.find(".selected-container"));
                this.seletedContacts.push(model.data['name']);
                this.seletedNum.push(model.data['cellphonenumber']);
                this.countSelectedNum();
            }
            this.enableOKBtn()
        },

        onGridUnSelect: function(model){
            // var contactLabelNodes = this.el.find(".selected-container").children(".contact-label");
            // for (var i=0; i < contactLabelNodes.length; i++){
            //     if ($(contactLabelNodes[i]).attr("data-id") == model.id){
            //         $(contactLabelNodes[i]).remove();
            //     }
            // }
            model.data['cellphonenumber'] = this.contactCollection.formatCallNum(model.data['cellphonenumber']);
            var text = '"' + model.data['name'] +'"(' + model.data['cellphonenumber'] + ")"
            this.contactCollection.deleteArrayKey(this.seletedContacts, model.data['name']);
            this.contactCollection.deleteArrayKey(this.seletedNum, model.data['cellphonenumber']);
            this.countSelectedNum();
            if (this.seletedContacts.length == 0){
                this.disableOKBtn();
            }
        },

        onCloseSelectedItem: function(){
            var event = arguments[0];
            var model = arguments[1];
            this.contactCollection.setSelectedHistory(model.id, false);
            this.contactCollection.setSelected(model.id, false);
            this.contactCollection.trigger('update');
            //根据model的ID去除checkbox的选中状态
            var gridNodes = this.el.find(".g-scr-prx-content").children(".g-grid-row");
            for (var i=0; i < gridNodes.length; i++){
                if ($(gridNodes[i]).attr("data-id") == model.id){
                    $(gridNodes[i]).removeClass("selected");
                    $(gridNodes[i]).find("input").get(0).checked = false;
                }
            }
            $(event.target).parent().remove();
            model.data['cellphonenumber'] = this.contactCollection.formatCallNum(model.data['cellphonenumber']);
            var text = '"' + model.data['name'] +'"(' + model.data['cellphonenumber'] + ")"
            this.contactCollection.deleteArrayKey(this.seletedContacts, text);
            this.countSelectedNum();
        },

        onEnterKeyword: function(){
            var keyword = this.el.find(".input-search").val();
            this.contactCollection.getContactByKeyword(keyword);
            this.contactCollection.trigger('update');
        },

        onSelectMenuItem: function(selectedItem){
            this.contactCollection.getContactByGroupName(this.groupListLocal[selectedItem.index].temp);
            this.el.find(".button-group .group-name").html(selectedItem.data);
            this.contactCollection.trigger('update');
        },

        render: function(target){
            this.el.appendTo(target);
            this.contactCollection.trigger('update');
            utils.placeholder(this.el.find(".input-search"),i18nDi.fillDomText('sms.contactName'));
            
            // this.el.transition({ x: 380 }, 0);
            // this.el.transition({ x: 0 }, 200, 'ease');
        },
    });
    
    var SmsSendView = app.ViewBase.extend({
        module: module,
        events: {
            'click -> .ico-add': 'onAddContact',
            'click -> .button-send': 'onSend',
            'click -> .address': 'onAddressBoxClick',
            'blur -> .input-contact': 'onInputBlur', 
            'focus -> .input-contact': 'onInputFocus',
            'click -> .ico-expression': 'onClickExpression'
        },
        init: function(opts){
            var smsBoxTemplate = _.template(this.getTpl('tpl-sms-box-view'), {I18N: i18nDi});
            this.el = $(smsBoxTemplate);
            this.isAddressBoxFocus = true;
            this.inputedContactID = 0;
            this.sendMessageID = 0;
            this.toSendCollection = [];
            this.toSendMessage = "";
            this.isInputEmpty = true;
            this.expressionPopup = null;
            this.isExpressionShow = false;
            this.isAddContact = false;
            //获取联系人数据
            this.contactCollection = new SearchContactModel.Collection({
                contactCollection: opts.contactCollection,
                smsCollection: opts.smsCollection
            });
            //this.contactCollection.cttCollection.on('update', $.proxy(this.onInitTypeahead, this));
            //this.contactCollection.getAllContacts();
            //初始化发送地址框;
            var inputContact = this.el.find(".input-contact");
            inputContact.on('keyup', $.proxy(this.onAddressBoxEnter, this));
            inputContact.on('keyup', $.proxy(this.onInputBackspace, this));
            inputContact.on('keyup', $.proxy(this.onCheckInputLen, this));
            //初始化短信输入框
            var textarea = this.el.find(".input-content");
            textarea.on('keyup', $.proxy(this.onInputTextarea, this));
            textarea.on('blur', $.proxy(this.onTextareaBlur, this));
            $(document).on('keyup', $.proxy(this.onSend, this));
          
        },

        render: function(target){
            this.el.appendTo(target);
            utils.placeholder(this.el.find(".input-content"),i18nDi.fillDomText('sms.writeMessage'));
            /*添加title*/
			utils.tooltip.attach(this.el.find(".ico-add"));
        },

        hide: function(){
            $(document).off('keyup', this.onSend);
            this.el.hide();
            if (this.isAddContact == false){
                this.setContactsNum();
                this.removeAllContactItem();
                this.clearTextarea();
            } else {
                this.isAddContact = false;
            }
        },

        show: function(){
            if (this.searchContacView){
                this.searchContacView.hide();
            }
            $(document).on('keyup', $.proxy(this.onSend, this));
            this.el.show();
            this.el.find(".input-content").focus();
        },

        onInitTypeahead: function(){
            //初始化发送地址输入自动补全          
            this.el.find(".input-contact").off('blur');
            this.el.find(".input-contact").off('keydown');
            this.el.find(".input-contact").off('keyup');
            var inputContact = this.el.find(".input-contact");
            inputContact.on('keyup', $.proxy(this.onAddressBoxEnter, this));
            inputContact.on('keyup', $.proxy(this.onInputBackspace, this));
            inputContact.on('keyup', $.proxy(this.onCheckInputLen, this));
            //console.log("短信 >> 发送地址输入自动补全：", this.contactCollection.contactsArray);
            var options = {
                targetElement: this.el.find(".input-contact"),
                source:this.contactCollection.contactsArray,
                wrapper:this.el.find(".address-input-box"),
                css:{},
                callback: $.proxy(this.onClickTypeaheadItem, this)
            }
            var typeahead = new Typeahead(options);
        },

        hideSearchContacView:function(){
            if (this.searchContacView){
                this.searchContacView.hide();
            }
        },

        insertContactItem: function(text){
            var data = {
                text: text, 
                id: this.inputedContactID,
                closeItemCallback: $.proxy(this.onContactItemClose, this) 
            };
            var contactItem = new ContactItemView(data);
            contactItem.insertBefore(this.el.find(".input-contact"));
            this.inputedContactID = this.inputedContactID + 1;
            this.setContactsNum();
        },

        removeAllContactItem: function(){
            this.el.find(".address").children(".contact-label").remove();
            this.toSendCollection = [];
        },

        setContactsNum: function(){
            this.el.find(".contacts-count").html(this.toSendCollection.length);
        },

        clearTextarea: function(){
            this.el.find('.input-content').val("");
            this.el.find('.input-content').focus();
            this.el.find(".content-count").html(0);
        },

        getSelection: function(){
            var textarea = this.el.find(".input-content");
            textarea.focus();
            return {
                selectionStart:textarea.get(0).selectionStart,
                selectionEnd:textarea.get(0).selectionEnd
            }
        },

        //callback
        onClickExpressionItem: function(event){
            this.isExpressionShow = false;
            var value = this.el.find(".input-content").val();
            if (value.length === 1000) return;
            var rangeSelected = this.getSelection();
            var start = value.substring(0, rangeSelected.selectionStart);
            var end = value.substring(rangeSelected.selectionEnd, value.length);
            var newValue = start + event.target.textContent + end;
            this.el.find(".input-content").val(newValue);
            this.el.find(".content-count").html(newValue.length.toString());
            var newPosition = start.length + event.target.textContent.length;
            this.el.find(".input-content").get(0).setSelectionRange(newPosition, newPosition);
        },

        onContactItemClose: function(event){
            var parentNode = $(event.target).parent(".contact-label");
            var number = parentNode.find("#contact").attr("titleText");
            var itemText = parentNode.find("#contact").html();
            if (!number){
                //itemText = '"' + itemText + '"(' +  number + ')';
                number = itemText;
            }
            parentNode.remove();
            this.contactCollection.deleteArrayKey(this.toSendCollection, number);
            console.log("短信 >> 当前的电话：", this.toSendCollection);
            this.setContactsNum();
        },

        onClickTypeaheadItem: function(event){
            var sel = this.el.find(".typeahead").find('li[class=active]');
            if(sel.get(0) !== undefined){
                this.el.find(".input-contact").val("");
            }
        },

        //event handler
        onClickExpression: function(event){
            if (this.expressionPopup == null){
                this.expressionPopup = new ExpressionPopup({
                    clickItemCallback:$.proxy(this.onClickExpressionItem, this)});
                this.expressionPopup.appendExpression();
            }
            if (this.isExpressionShow == false){
                this.expressionPopup.render(this.el);
                this.expressionPopup.show();
                this.expressionPopup.setPosition("35px", "150px")
                this.isExpressionShow = true;
            } else {
                this.expressionPopup.hide();
                this.isExpressionShow = false;
            }
        },

        onInputTextarea: function(event){
            var text = this.el.find('.input-content').val().replace(/\n|\r|\r/g, "");
            this.el.find(".content-count").html(text.length);
        },

        onTextareaBlur: function(event){

        },

        onAddressBoxClick: function(event){
            this.el.find(".input-contact").focus();
        },

        onAddressBoxEnter: function(event){
            var me = this;
            if(event.keyCode === 13){
                me.el.find(".input-contact").blur();
                setTimeout(
                    function(){
                        me.el.find(".input-contact").focus();
                    }, 500); 
            }
        },

        onInputBackspace: function(event){
            var inputTextLength = this.el.find(".input-contact").val().length;
            if(event.keyCode === 8 && 
                this.isInputEmpty === true &&
                this.isAddressBoxFocus === true){
                var lastNode = this.el.find(".address").children(".contact-label").last();
                var itemText = lastNode.find("#contact").html();
                lastNode.remove();
                this.contactCollection.deleteArrayKey(this.toSendCollection, itemText);
                this.setContactsNum();
            }
        },

        onCheckInputLen: function(event){
            var inputTextLength = this.el.find(".input-contact").val().length;
            if (inputTextLength == 0){
                this.isInputEmpty = true;
            } else {
                this.isInputEmpty = false;
            }
        },

        //输入框失去焦点时生成联系人小方块
        onInputBlur: function(event){
            console.log(this.el.find(".input-contact").val())
            if (this.el.find(".input-contact").val().replace(/\n|\r/g, "").trim() == ""){
                this.el.find(".input-contact").val("");
                this.el.find(".address").css("border","1px solid #cacaca");
                return false;
            }
            this.isAddressBoxFocus = false;
            var mark = 0;
            var sel = this.el.find(".typeahead").find('li[class=active]');
            if (sel.get(0) !== undefined){
                var splitLen = sel.attr('data-value').split('"(').length;
                // var callNum = sel.attr('data-value').substring(sel.attr('data-value').indexOf('(')+1,sel.attr('data-value').indexOf(')'));
                // var name = sel.attr('data-value').substring(0,sel.attr('data-value').indexOf('('));
                var callNum = sel.attr('data-value').split('"(')[splitLen - 1].match(/[\+\-\*\#0-9]{2,15}/g)[0];
                var name = sel.attr('data-value').replace('(' + callNum + ')', "");  

                callNum = this.contactCollection.formatCallNum(callNum);
                //var insertText = '"' + name + '"(' + callNum + ')';
                var insertText = name + '(' + callNum + ')';
                this.el.find(".typeahead").removeAttr("match-value");
                mark = 0;
            } else {
                perfectMatch = this.el.find(".typeahead").attr("match-value");
                if (perfectMatch){
                    var callNum = this.el.find(".input-contact").val();
                    var insertText = perfectMatch;
                    this.el.find(".typeahead").removeAttr("match-value");
                    mark = 0;
                } else {
                    var insertText = this.el.find(".input-contact").val();
                    mark = 1;
                }
            }
            this.el.find(".input-contact").val("");
            if (mark === 0){
                var isContain = this.contactCollection.isArrayContain(this.toSendCollection, callNum);
            } else {
                var isContain = this.contactCollection.isArrayContain(this.toSendCollection, insertText);
            }
            if (insertText != "" && isContain === false){
                if (insertText.length < 30 && mark === 1){
                    this.insertContactItem(insertText);
                    this.toSendCollection.push(insertText);
                } else if (insertText.length - callNum.length < 30 && mark === 0){
                    this.insertContactItem(insertText);
                    this.toSendCollection.push(callNum);
                }
            }
            console.log("短信 >> 当前输入的电话：", this.toSendCollection);
            this.el.find(".address").css("border","1px solid #cacaca");
            sel.removeClass("active");
        },

        isMatchRegular: function(string){
            var regular = /^\+?\w{0,20}\d{0,20}$/;
            var isMatch = regular.test(string);
            return isMatch;
        },

        onInputFocus: function(event){
            this.isAddressBoxFocus = true;
            this.el.find(".address").css("border","1px solid #65c4eb");
        },

        onAddContact: function(){
            this.isAddContact = true;
            this.hide();
            this.searchContacView = new SearchContacView({
                contactCollection: this.contactCollection
            });
            this.searchContacView.render(this.el.parent(".right"));
            this.searchContacView.on('clickok', $.proxy(this.onExportSelected, this));
            this.searchContacView.on('clickcancel', $.proxy(this.show, this));
        },

        onExportSelected: function(contactList, numList){
            console.log("sms >> searched number: ", numList);
            console.log("sms >> searched contact: ", contactList);
            for (var i=0; i < contactList.length; i++){
                var text = '"' + contactList[i] +'"(' + numList[i] + ")";
                var isContain = this.contactCollection.isArrayContain(this.toSendCollection, numList[i]);
                if (isContain == false){
                    this.insertContactItem(text);
                    this.toSendCollection.push(numList[i]);
                }
            }
            this.show();
            this.isAddContact = false;
        },

        onSend: function(event){
            if ((event.ctrlKey && event.keyCode == 13) || event.type == 'click'){
                var text = this.el.find('.input-content').val();
                this.toSendMessage = text;
                if (this.toSendCollection.length == 0){
                    this.el.find(".input-contact").focus();
                    return;
                }
                
                if (this.toSendMessage.replace(/\n|\r|\r/g, "") == ""){
                    this.el.find('.input-content').focus();
                    return;
                }

                for (var i = 0; i < this.toSendCollection.length; i++) {
                    var rex = /[\+\-\*\#0-9]{2,15}/g;
                    var test = rex.test(this.toSendCollection[i]);
                    console.log(this.toSendCollection[i]);
                    console.log(test);
                    if (test == false){
                        this.el.find(".input-contact").focus();
                        return;
                    }
                }
                var me = this;
                this.clearTextarea();
                var messageData = {
                    toSendCollection: this.toSendCollection,
                    toSendMessage: this.toSendMessage
                }
                this.trigger("send", messageData);
            }
        },        
    });
    
    exports.ExpressionPopup = ExpressionPopup;
    return SmsSendView;
}); 