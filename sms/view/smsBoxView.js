define("UISmsBoxView", function(require, exports, module) {
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
            //初始化分组下拉菜单
            var groupList = this.contactCollection.getGroupsList();
            this.dropMenu = new UIMenu({
                list: groupList,
                relTarget: this.el.find(".search-list-header")
            });
            this.dropMenu.decorate(this.el.find(".button-group"));
            this.dropMenu.on(UIMenu.SELECT, $.proxy(this.onSelectMenuItem, this));
            this.options.parentWindow.on('close', $.proxy(this.onCloseWindow, this));
            //初始化联系人列表
            this.contactGrid = new SuperGrid({
                 container: this.el.find(".search-list"),
                 model: [
                            {
                                type : 'checkbox',
                                width : '10%'
                            },
                            {
                                name: 'name',
                                label: '',
                                type: 'string',
                                width: '45%',
                            },
                            {
                                name: 'cellphonenumber',
                                label: '',
                                type: 'string',
                                width: '45%',
                            }
                        ],
                 showLabel: false,
                 rowHeight: 30,
                 multiSelectable: true,
                 collection: this.contactCollection
            });
            this.contactGrid.on(SuperGrid.ROW_SELECTED, $.proxy(this.onGridSelect, this));
            this.contactGrid.on(SuperGrid.ROW_UNSELECTED, $.proxy(this.onGridUnSelect, this));
        },

        countSelectedNum: function(){
            this.el.find(".contacts-count").html(this.seletedContacts.length);
        },

        onClickOK: function(){
            this.onCloseWindow();
            this.options.parentWindow.destroy();
            this.trigger("clickok", this.seletedContacts);
        },

        onClickCancels: function(){
            this.onCloseWindow();
            this.options.parentWindow.destroy();
        },

        onCloseWindow:function(){
            this.dropMenu.destroy();
            this.contactCollection.models = this.contactCollection.allContacts;
            this.contactCollection.clearSelected();
        },

        onRemoveAll:function(){
            this.contactGrid.setAllSelect(false);
            var models = this.contactCollection.models;
            for (var k=0; k < models.length; k++){
                this.onGridUnSelect(models[k]);
                // this.contactCollection.setSelectedHistory(models[k].id, false);
                // this.contactCollection.setSelected(models[k].id, false);
            }
            // this.contactCollection.trigger('update');
            // var gridNodes = this.el.find(".g-scr-prx-content").children(".g-grid-row");
            // for (var i=0; i < gridNodes.length; i++){
            //     if ($(gridNodes[i]).hasClass("selected") == true){
            //         $(gridNodes[i]).removeClass("selected");
            //         $(gridNodes[i]).find("input").get(0).checked = false;
            //     }
            // }
        },

        onSelectAll: function(){
            // this.contactCollection.setSelectedAll(true);
            // this.contactCollection.trigger('update');
            // var gridNodes = this.el.find(".g-scr-prx-content").children(".g-grid-row");
            // for (var i=0; i < gridNodes.length; i++){
            //     if ($(gridNodes[i]).hasClass("selected") == false){
            //         $(gridNodes[i]).addClass("selected");
            //         $(gridNodes[i]).find("input").get(0).checked = true;
            //     }
            // }
            this.contactGrid.setAllSelect(true);
            var models = this.contactCollection.models;
            for (var k=0; k < models.length; k++){
                this.onGridSelect(models[k]);
            }
        },

        onGridSelect: function(model){
            model.data['cellphonenumber'] = this.contactCollection.formatCallNum(model.data['cellphonenumber']);
            var text = '"' + model.data['name'] +'"(' + model.data['cellphonenumber'] + ")";
            var isContain = this.contactCollection.isArrayContain(this.seletedContacts, text)
            if (isContain == false){
                var data = {
                    text: text, 
                    id: model.id,
                    model: model,
                    closeItemCallback: $.proxy(this.onCloseSelectedItem, this)
                };
                var contactItem = new ContactItemView(data);
                contactItem.appendTo(this.el.find(".selected-container"));
                this.seletedContacts.push(data.text);
                this.countSelectedNum();
            }
        },

        onGridUnSelect: function(model){
            var contactLabelNodes = this.el.find(".selected-container").children(".contact-label");
            for (var i=0; i < contactLabelNodes.length; i++){
                if ($(contactLabelNodes[i]).attr("data-id") == model.id){
                    $(contactLabelNodes[i]).remove();
                }
            }
            model.data['cellphonenumber'] = this.contactCollection.formatCallNum(model.data['cellphonenumber']);
            var text = '"' + model.data['name'] +'"(' + model.data['cellphonenumber'] + ")"
            this.contactCollection.deleteArrayKey(this.seletedContacts, text);
            this.countSelectedNum();
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
            this.contactCollection.getContactByGroupName(selectedItem.label);
            this.contactCollection.trigger('update');
        },

        render: function(target){
            this.el.appendTo(target);
            this.contactCollection.trigger('update');
        },
    });
    
    var SMSBoxView = app.ViewBase.extend({
        module: module,
        events: {
            'click -> .ico-add': 'onAddContact',
            'click -> .button-send': 'onSend',
            'click -> .address': 'onAddressBoxClick',
            'blur -> .input-contact': 'onInputBlur', 
            'focus -> .input-contact': 'onInputFocus',
            'click -> .expression': 'onClickExpression'
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
            //获取联系人数据
            var contactsArray = [];
            this.contactCollection = new SearchContactModel.Collection();
            this.contactCollection.getAllContacts();
            for(var i=0; i < this.contactCollection.models.length; i++){
                var contact = '"' + this.contactCollection.models[i].data['name'] + '"(' + 
                this.contactCollection.models[i].data['cellphonenumber'] + ")"
                contactsArray.push(contact);
            }
            //初始化发送地址输入自动补全
            var options = {
                targetElement: this.el.find(".input-contact"),
                source:contactsArray,
                wrapper:this.el.find(".address-input-box"),
                css:{},
                callback: $.proxy(this.onClickTypeaheadItem, this)
            }
            var typeahead = new Typeahead(options);
            //初始化发送地址框;
            var inputContact = this.el.find(".input-contact");
            inputContact.on('keyup', $.proxy(this.onAddressBoxEnter, this));
            inputContact.on('keyup', $.proxy(this.onInputBackspace, this));
            inputContact.on('keyup', $.proxy(this.onCheckInputLen, this));
            //初始化聊天框
            var chatBoxOption = {
                resendCallback: $.proxy(this.onClickItemResend, this),
                forwardCallback: $.proxy(this.onClickItemForward, this),
                deleteCallback: $.proxy(this.onClickItemDelete, this)
            };
            this.chatBox = new UIChatBox(chatBoxOption);
            //初始化短信输入框
            var textarea = this.el.find(".input-content");
            textarea.on('keyup', $.proxy(this.onInputTextarea, this));
            textarea.on('blur', $.proxy(this.onTextareaBlur, this));
            this.chatBox.insertBefore(textarea);
        },

        render: function(target){
            this.el.appendTo(target);
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
            this.toSendCollection.push(text);
            this.setContactsNum();
        },

        // {
            // id:"20130512", //sms需要，联系人不需要
            // iOperation : "1",//短信：发送，删除，接收。1：发送，2：接收，3：删除
            // iResult:"",//结果 1：失败，2：成功
            // iMsgid : "",//单条短信的id。
            // iSmsThreadid:"789",//短信的组回话id
            // cellphonenumber:["1307878","70841231"],//手机号列表，群发短息用。增加时同时有多个手机号，主次号按照列表顺序。
            // //短信项
            // sContent:" 这里是短信内容",//短息内容
            // sSmsTime : "130789515444"//时间
        // }
        generateMessageDate: function(){
            var i = 0;
            for (i = 0; i < this.toSendCollection.length; i++){
                if (this.toSendCollection[i].indexOf("(") !== -1){
                    this.toSendCollection[i] = this.toSendCollection[i].split("(")[1].match(/\d+/g)[0];
                }
            }
            time = new Date().valueOf();    
            var smsData = {
                id: time,
                iOperation: "1", 
                iResult:"",
                iMsgid:"",
                iSmsThreadid:"",
                cellphonenumber: this.toSendCollection,
                sContent: this.toSendMessage,
                sSmsTime: time
            }
            console.log(smsData);
            return smsData
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
            var value = this.el.find(".input-content").val();
            var rangeSelected = this.getSelection();
            var start = value.substring(0, rangeSelected.selectionStart);
            var end = value.substring(rangeSelected.selectionEnd, value.length);
            var newValue = start + event.target.textContent + end;
            this.el.find(".input-content").val(newValue);
            this.el.find(".content-count").html(newValue.length.toString());
            var newPosition = start.length + event.target.textContent.length;
            this.el.find(".input-content").get(0).setSelectionRange(newPosition, newPosition);
        },

        onClickItemResend: function(event){
            var me = this;
            var infoNode = $(event.target).parent(".info");
            var messageItemNode = infoNode.parent(".message-item");
            var address = [];
            address.push(messageItemNode.attr("address-num"));
            var messageID = messageItemNode.attr("message-id");
            var messageBody = messageItemNode.find(".content").html();
            var dateItem = messageItemNode.parent(".g-message-item-ctn").parent(".g-message-thread");
            var date = dateItem.attr("date");
            infoNode.find("#status").html("Sending");
            infoNode.find(".button-resend").hide();
            var smsData = {
                id:messageID,
                iOperation : "1", //1：发送，2：接收，3：删除
                iResult:"",//结果 1：失败，2：成功
                iMsgid: "", 
                iSmsThreadid:"",
                cellphonenumber:address,
                sContent: messageBody,
                sSmsTime: new Date().valueOf()
            }
            app.dal.request({
                action: apiNames.REQ_SMS_SEND,
                paras: smsData,
                callback: $.proxy(this.chatBox.modifyMessageStatus, this.chatBox)
            });
            //TODO 用于模拟C++，以后用C++接口回调
            // setTimeout(
            //     function(){
            //         me.chatBox.modifyMessageStatus.call(me.chatBox, smsData);
            //     }, 1000);
        },

        onClickItemDelete: function(event){
            var actionsNode = $(event.target).parent(".actions");
            var wrapNode = actionsNode.parent(".content-wrap");
            var messageItemNode = wrapNode.parent(".message-item");
            var messageID = messageItemNode.attr("message-id");
            var messageItemListNode = messageItemNode.parent(".g-message-item-ctn");
            if (messageItemListNode.children(".message-item").length == 1) {
                messageItemListNode.parent(".g-message-thread").remove();
            } else {
                messageItemNode.remove();
            }
            //TODO 调用C++接口根据短信ID删除短信
        },

        onClickItemForward: function(event){
            var parentNode = $(event.target).parent(".actions").parent(".content-wrap");
            var message = parentNode.find(".content").html();
            this.el.find(".input-content").val(message);
            this.el.find(".content-count").html(message.replace(/\n|\r|\r/g, "").length);
            this.el.find(".address").children(".contact-label").remove();
        },

        onContactItemClose: function(event){
            var parentNode = $(event.target).parent(".contact-label");
            var itemText = parentNode.find("#contact").html();
            parentNode.remove();
            this.contactCollection.deleteArrayKey(this.toSendCollection, itemText);
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
            this.expressionPopup.show();
            this.expressionPopup.setPosition(45,240);
        },

        onInputTextarea: function(event){
            var text = this.el.find('.input-content').val().replace(/\n|\r|\r/g, "");
            this.el.find(".content-count").html(text.length);
        },

        onTextareaBlur: function(event){
            var text = this.el.find('.input-content').val();
            this.toSendMessage = text;
        },

        onAddressBoxClick: function(event){
            this.el.find(".input-contact").focus();
            //TODO 为地址框添加获得焦点后效果
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
            this.isAddressBoxFocus = false;
            var sel = this.el.find(".typeahead").find('li[class=active]');
            if (sel.get(0) !== undefined){
                var callNum = sel.attr('data-value').substring(sel.attr('data-value').indexOf('(')+1,sel.attr('data-value').indexOf(')'));
                var name = sel.attr('data-value').substring(0,sel.attr('data-value').indexOf('('));
                callNum = this.contactCollection.formatCallNum(callNum);
                var insertText = '"' + name + '"(' + callNum + ')';
            } else {
                var insertText = this.el.find(".input-contact").val();     
            }
            this.el.find(".input-contact").val("");
            var isContain = this.contactCollection.isArrayContain(this.toSendCollection, insertText);
            if (insertText != "" && isContain == false){
                this.insertContactItem(insertText);
            }
        },

        onInputFocus: function(event){
            this.isAddressBoxFocus = true;
        },

        onAddContact: function(){
            var win = new UIWindow({
                winType: 1
            });
            win.el.addClass("g-search-contact-window");
            win.show();
            win.toCenter();
            searchContacView = new SearchContacView({
                contactCollection: this.contactCollection,
                parentWindow: win
            });
            win.setContent(searchContacView);
            searchContacView.on('clickok', $.proxy(this.onExportSelected, this));
        },

        onExportSelected: function(contactList){
            for (var i=0; i < contactList.length; i++){
                var isContain = this.contactCollection.isArrayContain(this.toSendCollection, contactList[i])
                if (isContain == false){
                    this.insertContactItem(contactList[i]);
                }
            }
        },

        onSend: function(){
            var me = this;
            this.clearTextarea();
            var messageToSendData = this.generateMessageDate();
            this.chatBox.appendMessageItem(messageToSendData);
            // app.dal.request({
            //     action: apiNames.REQ_SMS_SEND,
            //     paras: messageToSendData,
            //     callback: $.proxy(this.chatBox.modifyMessageStatus, this.chatBox)
            // });
            //TODO 用于模拟C++，以后用C++接口回调modifyMessageStatus函数
           // var smsData = {
           //      id:messageToSendData.id,
           //      iOperation : "1", //1：发送，2：接收，3：删除
           //      iResult:"1",//结果 1：失败，2：成功
           //      iMsgid : "123", 
           //      iSmsThreadid:"789",
           //      cellphonenumber:messageToSendData.cellphonenumber,
           //      sContent:" 这里是短信内容",
           //      sSmsTime : messageToSendData.sSmsTime
           //  }
           //  setTimeout(
           //      function(){
           //          me.chatBox.modifyMessageStatus.call(me.chatBox, smsData);
           //      }, 1000);
        },        
    });
    
    return SMSBoxView;
}); 