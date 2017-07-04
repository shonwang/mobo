define("UISmsView", function(require, exports, module) {
    var app = require('app');
    var $ = require('jquery');
    var _ = require('underscore');
    var SuperGrid = require('grid');
    var UISmsSendView = require('UISmsSendView');
    var UIChatBox = require('UIChatBox');
    var i18nDi  = require('I18NDI');
    var gridModel = require('gridModel');
    var MessageModel = require('smsModel');
    var ContactEditorView = require("ContactDetailPanel");
    var UIWindow = require('UIWindow');
    var connection = require('connectionMgr');
    var Loading = require('loading');
    var UIDialog = require('UIDialog');
    var ProcessPanel = require('ProgressPanel');
    var UIMenu = require('UIMenu');
    var utils = require('utils');

    var SmsItemView = app.ViewBase.extend({
        module : module,
        init : function(model) {
            this.model = model;
            this.smsData = this.model.data;

            this.listLen = this.smsData.smsList.length;
            if (this.listLen > 0){
                //var dataTime = parseInt(this.smsData.smsList[this.listLen - 1].smsTime);
                var dataTime = parseInt(this.smsData.smsList[0].smsTime);
                this.dateObj = new Date();
                this.dateObj.setTime(dataTime);
                this.smsShowTime = this.dateObj.format("dd/MM/yyyy hh:mm:ss");
            }

            if (!this.smsData.contactName){
                if (this.smsData.smsPhoneNumber.length === 1){
                    this.smsData.contactName = this.smsData.smsPhoneNumber[0];
                } else {
                    this.smsData.contactName = this.smsData.smsPhoneNumber.join(",");
                }
            }
        },

        render : function(target) {
            if (this.dateObj){
                var smsDay = this.dateObj.format("dd/MM/yyyy");
                var currentDay = new Date().format("dd/MM/yyyy");
            }

            var itemNode = $(target).find(".sms-list-item");
            if (itemNode.get(0)){
                itemNode.find(".phone").html(this.smsData.smsPhoneNumber);
                if (this.listLen > 0){
                    //itemNode.find(".info").html(this.smsData.smsList[this.listLen - 1].smsContent);
                    itemNode.find(".info").html(this.smsData.smsList[0].smsContent);
                } else {
                    itemNode.find(".info").html("");
                }
                itemNode.find(".name").html(this.smsData.contactName);

                if (this.smsData.isAllRead === true){
                    itemNode.find(".name").addClass("fb");
                } else {
                    itemNode.find(".name").removeClass("fb");
                }

                if (this.smsData.contactIcon){
                    itemNode.find(".icon").attr('src', this.smsData.contactIcon);
                } else {
                    itemNode.find(".icon").attr('src', "common/images/ico/default-avatar.png");
                }
                itemNode.find(".sms-num").html(this.listLen);
                if (this.smsShowTime){
                    if (smsDay == currentDay){
                        itemNode.find(".time").html(this.smsShowTime.split(" ")[1]);
                    } else {
                        itemNode.find(".time").html(this.smsShowTime.split(" ")[0]);
                    }
                }
            }
            else {
                if (this.smsShowTime){
                    if (smsDay == currentDay){
                        this.smsData.showTime = this.smsShowTime.split(" ")[1];
                    } else {
                        this.smsData.showTime = this.smsShowTime.split(" ")[0];
                    }
                }
                var tpl = this.getTpl("tpl-sms-list-item");
                $(target).html(_.template(tpl, {
                    data : this.smsData
                }));

                if (this.smsData.isAllRead === true){
                    $(target).find(".name").addClass("fb");
                } else {
                    $(target).find(".name").removeClass("fb");
                }
            }
        }
    });

    var CloseItemView = app.ViewBase.extend({
        module : module,
        init: function(model){
            this.model = model;
            this.el = $('<div class="close-item ico-close"></div>');
            this.el.attr("data-id", this.model.id);
        },

        onClickClose: function(event){
            $(event.target).remove();
            gridModel.selectedCollection.remove(this.model);
            gridModel.collection.setSelected(this.model.id, false);
            gridModel.collection.trigger('update');
        },

        render: function(target){
            $(target).find(".close-item").remove();
            this.el.appendTo(target);
            this.el.on('click', $.proxy(this.onClickClose, this));
        }
    });

    var MultipleItemView = app.ViewBase.extend({
        module : module,
        events:{
            'click -> .cancel-select': 'onClickCancel'
        }, 
        init: function(opts){
            this.options = opts;
            var multipleItemTemplate = _.template(this.getTpl('tpl-sms-right-multiple-selected'), {I18N: i18nDi});
            this.el = $(multipleItemTemplate);
            this.gridConversationlist = new SuperGrid({
                container: this.el.find(".g-message-batch-conversations-list-ctn"),
                model : [{
                        name : 'smsPhoneNumber',
                        label : '',
                        type : 'view',
                        width : 'flex',
                        view : SmsItemView
                    },{
                        name : 'id',
                        label : '',
                        type : 'view',
                        width : '30px',
                        view : CloseItemView
                    }
                ],
                showLabel : false,
                rowHeight : 34,
                collection : this.options.selectedCollection
            });
            this.options.selectedCollection.on('update', $.proxy(this.countSelectMessage, this));

            this.el.find(".contacts-count").html(i18nDi.fillDomText('sms.msgSelected', 0));
        },

        countSelectMessage: function(){
            var len = this.options.selectedCollection.models.length;
            //<%=I18N.fillDomText('sms.msgSelected')%>
            this.el.find(".contacts-count").html(i18nDi.fillDomText('sms.msgSelected', len));
        },

        onClickCancel: function(){
            this.el.remove();
            this.trigger("cancelselect", "");
        },

        remove: function(){
            this.el.remove();
        },

        render : function(target){
            this.el.appendTo(target);
            this.options.selectedCollection.trigger('update');
        }
    });

    var SMSMainView = app.ViewBase.extend({
        module : module,
        events : {
            //'click -> .btn-refresh' : 'refresh',
            'click -> .btn-send-message' : 'onNewMessage',
            'click -> .btn-delete' : 'onDeleteMsgThread',
            'click -> .chkbox-all' : 'onGridSelectAll',
            'click -> .btn-export' : 'onClickExport',
            'click -> .btn-import' : 'onClickImport',
            'click -> .btn-mark' : 'onClickMarkRead'
        },

        init : function(opts) {
            var pageId = opts.pageId;
            this.collection = opts.collection;
            this.contactCollection = opts.contactCollection;
            console.log("初始化短信=============================");
            var elTemplate = _.template(this.getTpl('tpl-sms-main-view'), {I18N: i18nDi});
            this.el = $(elTemplate);
            this.el.appendTo($('#' + pageId));
            this.checkNav();
            this.isRefreshing = false;
            this.isDeleting = false;
            this.collectionModels = this.collection.models;
            
            //初始化左侧页面
            var listContainer = this.el.find('.list');
            this.allCheckboxPxy = this.el.find('.chkbox-all');
            this.gridSMSlist = new SuperGrid({
                container : listContainer,
                model : [{
                    type : 'checkbox',
                    width: 54
                }, {
                    name : 'smsPhoneNumber',
                    label : '',
                    type : 'view',
                    width : 'flex',
                    view : SmsItemView
                }],
                showLabel : false,
                rowHeight : 68,
                multiSelectable: false,
                checboxDelegate : this.allCheckboxPxy,
                collection : this.collection
            });
            this.gridSMSlist.on(SuperGrid.ROW_SELECTED, $.proxy(this.onGridSelected, this));
            this.gridSMSlist.on(SuperGrid.ROW_UNSELECTED, $.proxy(this.onGridUnSelect, this));
            //this.gridSMSlist.on(SuperGrid.ROW_SELECTED_ALL, $.proxy(this.onGridSelectAll, this));

            this.loadingPage = new Loading();
            this.loadingPage.render(this.el.find(".list"));
            this.loadingPage.show();

            var itemList = [
                        {index: 1, label: i18nDi.fillDomText('sms.selectedMsgLabel')},
                        {index: 2, label: i18nDi.fillDomText('sms.allMsgLabel')}
            ]
            this.dropMenu = new UIMenu({
                list: itemList
            });

            this.dropMenu.decorate(this.el.find(".btn-export"));
            this.dropMenu.on(UIMenu.SELECT, $.proxy(this.onSelectMenuItem, this));

            this.collection.on('update', $.proxy(this.onLoadingCompleted, this));

            //初始化创建新短信页面
            this.newMessageView = new UISmsSendView({
                contactCollection: this.contactCollection,
                smsCollection: this.collection
            });
            this.newMessageView.render(this.el.find('.right'));
            this.newMessageView.hide();
            this.newMessageView.on('send', $.proxy(this.onSendNewMessage, this));

            this.contactCollection.on('update', 
                $.proxy(this.newMessageView.contactCollection.onFetchContactFinished, 
                    this.newMessageView.contactCollection));
            this.contactCollection.on('update', 
                $.proxy(this.newMessageView.onInitTypeahead, this.newMessageView));
            
            //初始化空白页面0
            var emptyInfoTemplate = _.template(this.getTpl('tpl-sms-right-empty-info'), {I18N: i18nDi});
            this.emptyInfoPanel = $(emptyInfoTemplate);
            this.emptyInfoPanel.appendTo(this.el.find(".right"));

            this.collection.bindReceiveMessage($.proxy(this.onReceiveMessage, this));
            connection.on('connection', $.proxy(
                function(){
                    if (connection.isConnect()){
                        this.refresh()
                    } else {
                        this.collection.isFetchContact = false;
                        if (this.dropMenu){
                            this.dropMenu.hide();
                        }
                        console.log("断开连接清除所有短信数据")
                        this.collection.requested = false;
                        this.collection.responsed = false;
                        this.collection.clear();
                    }
                }, this));

            if (this.collection.requested === true && this.collection.responsed === true) {
                this.collection.trigger("update");
            }

            this.el.find(".btn-refresh").hide();
            var curHash = app.getCurHashParas();
            app.eventCenter.on(curHash.module + curHash.action, $.proxy(this.refresh, this));
            app.eventCenter.on(curHash.module + curHash.action + 'clearsearch', $.proxy(this.onSearchClear, this));
            app.eventCenter.on(curHash.module + curHash.action + 'entersearch', $.proxy(this.onSearchEnter, this));
        },

        updateMenuList: function(){
            var selectedMapIds = Object.keys(this.collection.getSelectedMap());
            var selectedLen = selectedMapIds.length;
            var selThreadList = [];
            var selectedMessageCount = 0
            for (var i = 0; i < selectedLen; i++){
                var model = this.collection.getModelById(selectedMapIds[i]);
                selThreadList.push(model.data.smsThreadId);
                var smsSelLen =  model.data.smsList.length;
                selectedMessageCount = selectedMessageCount + smsSelLen;
            }
            var allMessageCount = 0;
            var allThreadList = [];
            for (var k = 0; k < this.collection.models.length; k++){
                var model = this.collection.models[k];
                allThreadList.push(model.data.smsThreadId);
                var smsAllLen =  model.data.smsList.length;
                allMessageCount = allMessageCount + smsAllLen;
            }
            var itemList = [{
                index: 1, 
                label: i18nDi.fillDomText('sms.selectedMsgLabel', selectedMessageCount), 
                count: selectedMessageCount,
                threadIDList: selThreadList
            },{
                index: 2, 
                label: i18nDi.fillDomText('sms.allMsgLabel', allMessageCount), 
                count: allMessageCount,
                threadIDList: allThreadList
            }]
            if (selectedMessageCount === 0){
                itemList[0].type = "label";
            } else {
                delete itemList[0].type;
            }
            if (allMessageCount === 0){
                itemList[1].type = "label";
            } else {
                delete itemList[1].type;
            }
            this.dropMenu.updateList(itemList);
        },

        onLoadingCompleted: function(){
            if (this.collection.requested === true && 
                this.collection.responsed === true){
                console.log("短信 >> 更新短信信息完毕...");
                this.loadingPage.hide();
                var toolbar = this.el.find(".g-toolbar");
                if (this.collection.models.length === 0){
                    toolbar.find(".chkbox-all").attr("disabled", "disabled");
                    this.el.find(".g-image-sms-empty").show();
                    toolbar.find(".btn-export").attr("disabled", "disabled");
                } else {
                    toolbar.find(".chkbox-all").removeAttr("disabled");
                    this.el.find(".g-image-sms-empty").hide();
                    toolbar.find(".btn-export").removeAttr("disabled");
                }
            }
            if (this.contactCollection.requested === true && 
                this.contactCollection.responsed === true &&
                this.collection.requested === true && 
                this.collection.responsed === true &&
                this.collection.isFetchContact !== true) {
                console.log("联系人 >> 更新联系人信息完毕...")
                this.contactCollection.trigger('update');
            }
            if (this.collection.models.length >= this.collectionModels.length){
                this.collectionModels = this.collection.models;
            }
            //this.gridSMSlist.update();
        },

        redirect: function(hash){
            console.log("短信 >> redirect to sms hash: ", hash);
            var command;
            var content;
            if (hash){
                if (hash.pageState){
                    command = hash.pageState.vt;
                    content = JSON.parse(hash.pageState.content);
                }
            }
            if (command == "multiSender"){
                this.refresh();
                this.emptyInfoPanel.hide();
                var toSendCollection = this.newMessageView.toSendCollection;
                var isContain = false;
                var contactsArray = content;
                console.log("短信 >> 从联系人跳转到短信页面发短信: ", content);
                for (var i = 0; i < content.length; i++){
                    var insertText = '"' + content[i].sDisplayName + '"(' + content[i].phoneNumber + ')';
                    console.log(insertText);
                    if (toSendCollection.length !== 0){
                        isContain = this.newMessageView.contactCollection.isArrayContain(this.newMessageView.toSendCollection, content[i].phoneNumber);
                        if (content[i].phoneNumber !== "" && isContain === false &&
                            content[i].sDisplayName.length < 30){
                            this.newMessageView.insertContactItem(insertText);
                            this.newMessageView.toSendCollection.push(content[i].phoneNumber);
                        } else {
                            isContain = false;
                        }
                    } else {
                        if (content[i].phoneNumber !== "" &&
                            content[i].sDisplayName.length < 30){
                            this.newMessageView.insertContactItem(insertText);
                            this.newMessageView.toSendCollection.push(content[i].phoneNumber);
                        }
                    }
                }
                this.newMessageView.show();
                console.log("短信 >> 来自联系人模块的发短信数据: ", this.newMessageView.toSendCollection);
            } else {
                this.gridSMSlist.update();
            }
        },

        showSearchSingleInfo: function(item){
            console.log("短信 >> 搜索短信信息: ", item);
            var keyInfo = item.data.keyInfo;
            var messageInfo = item.data.message;
            var date = keyInfo.smsTime;
            this.resetUI(false, true);
            var model = this.collection.getMsgModelByThreadID(messageInfo.smsThreadId);
            if (model !== null){
                this.collection.setSelected(model.getId(), true);
                var index = this.collection.getIndex(model);
                this.gridSMSlist.scrollToIndex(index);
                if (!this.chatBox){
                    this.createSingleChatBox(model);
                } else {
                    this.chatBox.show();
                    this.chatBox.setChatView(model);
                }
                if (date.toString().indexOf('/') == -1 ) {
                    var dataTime = parseInt(date);
                    var dateObj = new Date();
                    dateObj.setTime(dataTime);
                    date = dateObj.format("dd-MM-yyyy");
                }
                //setTimeout(function(){}.bind(this), 500);
                var messageList = this.el.find(".right").find(".g-message-threads-list-ctn");
                var dateItem = messageList.find("li[date=" + date + "]");
                console.log("短信 >> 查找日期节点：li[date=" + date + "]", dateItem.get(0));

                var messageNodes = dateItem.find(".g-message-item-ctn");
                messageNode = messageNodes.find("li[message-id=" + keyInfo.smsMessageId + "]");
                console.log("短信 >> 查找短信节点：li[message-id=" + keyInfo.smsMessageId + "]", messageNode.get(0));

                while (messageNode.get(0) === undefined){
                    messageList.find(".load-more-msg").click();
                    messageNode = messageNodes.find("li[message-id=" + keyInfo.smsMessageId + "]");
                    console.log("短信 >> 查找短信节点：li[message-id=" + keyInfo.smsMessageId + "]", messageNode.get(0));
                }
                // var messageNodes = dateItem.find(".g-message-item-ctn");
                // messageNode = messageNodes.find("li[message-id=" + keyInfo.smsMessageId + "]");
                messageNode.find(".content").html(messageInfo.smsContent);
                messageList.scrollTop(0);
                messageList.animate({scrollTop:messageNode.offset().top - 200}, 200);
            }
        },

        onSearchEnter: function(list){
            console.log("短信 >> 搜索结果列表: ", list);
            this.resetUI(true, true);
            if (list.info){
                var count = '<font color="red">' + list.info.length + '</font>';
                var key = '<font color="red">' + list.info[0].keyInfo[0].keyword + '</font>';                
            } else {
                var count = '<font color="red">' + 0 + '</font>';
                var key = '<font color="red">' + list.key + '</font>';   
            }

            if (this.searchTip){
                this.searchTip.show();
                this.searchTip.find(".static").html(i18nDi.fillDomText('common.searchResultText', key, count));
                this.el.find(".list").addClass("g-grid-search-box");
            } else {
                var searchTipTpl = _.template(this.getTpl('tpl-search-result-tip'), {
                    count: count,
                    key: key,
                    i18n: i18nDi});
                this.searchTip = $(searchTipTpl);
                this.searchTip.insertBefore(this.el.find(".list").children()[0]);
                this.searchTip.on('click', $.proxy(this.onSearchClear, this));
                this.el.find(".list").addClass("g-grid-search-box");
            }
            if (!this.searchCollection){
                this.searchCollection = new gridModel.Collection();
            } else {
                this.searchCollection.clear();
            }
            if (list.info){
                var id = "";
                for(var i = 0; i < list.info.length; i++){
                    var keyInfo = list.info[i].keyInfo;
                    var number = list.info[i].smsPhoneNumber[0];
                    var threadID = list.info[i].smsThreadId;
                    this.collection.models = this.collectionModels;
                    //var model = this.collection.getMsgModelByCallNum(number);
                    var model = this.collection.getMsgModelByThreadID(threadID);
                    console.log("短信 >> 搜出来的会话ID：", threadID);
                    model.setSelected(false);
                    console.log("短信 >> 搜出来的会话模型：", model);
                    if (id !== model.getId()){
                        this.searchCollection.push(model);
                        id = model.getId();
                        for (var k = 0; k < model.data.smsList.length; k++){
                        	var message = model.data.smsList[k];
                        	var reg = new RegExp(list.info[0].keyInfo[0].keyword, "g");
                        	message.smsContent = message.smsContent.replace(reg, key);
                        }
                    }
                }
            }
            this.collection.models = this.searchCollection.models.reverse();
            console.log("短信 >> 搜出来的会话集合：", this.searchCollection);
            console.log("短信 >> 搜出来的会话集合：", this.collection);
            //this.collection.trigger('update');
            this.gridSMSlist.update();
            this.checkNav();
        },

        onSearchClear: function(){
            this.searchCollection.clear();
            this.collection.models = this.collectionModels;
            for (var i = 0; i < this.collection.models.length; i++){
            	var model = this.collection.models[i];
                for (var k = 0; k < model.data.smsList.length; k++){
                	var message = model.data.smsList[k];
                	var reg = new RegExp('<font color="red">', "g");
                	message.smsContent = message.smsContent.replace(reg, "");
                	var reg2 = new RegExp('</font>', "g");
                	message.smsContent = message.smsContent.replace(reg2, "");
                }
                if (model.data.smsList.length === 0){
                    this.collection.remove(model);
                }
            }            
            this.gridSMSlist.update();
            //this.collection.trigger('update');
            this.resetUI(true, true);
            this.checkNav();
        },

        resetUI: function(isShowEmpty, isHideSearchTip){
            if (this.searchTip&&isHideSearchTip){
                this.searchTip.hide();
                this.el.find(".list").removeClass("g-grid-search-box");
            }
            this.gridSMSlist.setAllSelect(false);
            if (this.contactEditorViewRoot){
                this.contactEditorViewRoot.hide();
            }
            if (this.multipleConversation){
                this.multipleConversation.remove();
                this.multipleConversation = undefined;
            }
            if (this.chatBox){
                this.chatBox.hide();
            }
            if (this.massChatBox){
                this.massChatBox.remove();
                this.massChatBox = undefined;
            }
            this.newMessageView.hide();
            this.newMessageView.hideSearchContacView();
            if (this.allCheckboxPxy[0].checked === true){
                this.allCheckboxPxy[0].checked = false;
            }
            if (this.selectedCollection){
                this.selectedCollection.models = [];
            }
            if (isShowEmpty === true){
                this.emptyInfoPanel.show();
            } else {
                this.emptyInfoPanel.hide();
            }
            this.checkNav();
        },

        refresh : function(isData) {
            var me = this;
            this.collection.isFetchContact = false;
            if (this.isRefreshing === false){
                this.isRefreshing = true;
				if (isData !== false){
                    this.loadingPage.show();
					this.collection.refresh();
				}
                this.searchCollection = null;
                this.collectionModels = this.collection.models;
                this.resetUI(true, true);
                setTimeout(
                    function(){
                        me.isRefreshing = false;
                    }, 1000);
            }
            this.checkNav();
        },

        onReceiveMessage: function(res){
            console.log("短信 >> 接受到新短信：", res);
            var model = this.collection.getMsgModelByThreadID(res.info.smsThreadId);
            // if (!model){
            //     model = this.collection.createNewMsgModel(res.info);
            //     this.collection.setModeltoFirst(model);
            // }
            // model.data.isAllRead = true;
            // var msg = this.collection.getMsgByMsgID(model.data.smsList, res.info.smsMessageId);
            // if (!msg){
            //     //model.data.smsList.push(res.info);
            //     var temp = [];
            //     temp.push(res.info);
            //     model.data.smsList = temp.concat(model.data.smsList);
            // }
            // this.collection.trigger('update');

            if(this.chatBox && model.isSelected()){
                this.chatBox.appendMessageItem(res.info, true);
            }
            this.checkNav();
        },

        onSendNewMessage: function(messageData){
            var number;
            var splitLen;
            var smsData;

            this.gridSMSlist.setAllSelect(false);
            this.newMessageView.hide();
            console.log("短信 >> 总共选择的联系人: ", messageData.toSendCollection);
            var numberArray = [];
            for (var i = 0; i < messageData.toSendCollection.length; i++){
                if (messageData.toSendCollection[i].indexOf("(") !== -1){
                    splitLen = messageData.toSendCollection[i].split('"(').length;
                    number = messageData.toSendCollection[i].split('"(')[splitLen - 1].match(/[\+\-\*\#0-9]{2,15}/g)[0];
                } else {
                    number = messageData.toSendCollection[i];
                }
                numberArray.push(number)
            }
            console.log("短信 >> 过滤后的联系人: ", numberArray);
            smsData = this.generateMessageDate(numberArray, messageData.toSendMessage);
          
            this.collection.getPhoneTime({}, function(res){
                console.log("短信 >> 开始获取手机时间: ", res);
                if (res&&res.info){
                    var currentTime = res.info.sPhoneCurrentTime;
                    smsData.smsTime = currentTime.toString();

                    if (numberArray.length === 1){
                        var model = this.collection.setModelBeforeSend(smsData);
                    } else {
                        var model = this.collection.setModelBeforeMultiSend(smsData);
                    }

                    if (!this.chatBox){
                        this.createSingleChatBox(model);
                    } else {
                        this.chatBox.show();
                        this.chatBox.setChatView(model);
                    }
                    for (var k = 0; k < numberArray.length; k++){
                        var uiAppendData = { 
                            smsContent:smsData.smsContent,
                            smsPhoneNumber: smsData.smsPhoneNumber[k],
                            smsMessageId: smsData.smsMessageId,
                            smsThreadId: smsData.smsThreadId,
                            smsThreadPCId: smsData.smsThreadPCId,
                            smsTime: smsData.smsTime,
                            smsMessagePCID: smsData.smsMessagePCID
                        };
                        this.chatBox.appendMessageItem(uiAppendData);
                    }
                    console.log("短信 >> 获取手机时间完毕, 发送短信: ", smsData);
                    this.collection.sendMessage(smsData, $.proxy(this.sendMessageCallback, this));
                    
                }
            }.bind(this));
            this.emptyInfoPanel.hide();
            this.checkNav();

            //*********************************************************
            //20140924
            var logObject = {
                page: "mymessages_home",
                module: "rightarea",
                action: "sendmessage",
                totalnum: numberArray.length
            }
            utils.sendNewLog("1000120", logObject);
            //*********************************************************  
        },

        sendMessageCallback: function(resData, model){
            console.log("短信 >> 从安卓端返回的发送结果: ", resData);
            var smsData = resData.info;
            this.chatBox.modifyMessageStatus(smsData);
            this.collection.isFetchContact = false;
            this.collection.trigger('update', model);
            this.checkNav();
            //*********************************************************
            //20140924
            var logObject = {
                page: "mymessages_home",
                module: "rightarea",
                action: "sendmessage_result",
                status: smsData.result === "2" ? 1 : 0
            }
            utils.sendNewLog("1000120", logObject);
            //*********************************************************  

        },

        generateMessageDate: function(number, message){
            var time = new Date().valueOf();
            var smsData = { 
                smsContent:message,
                smsPhoneNumber: number,
                smsMessageId: "",
                smsThreadId: "",
                smsThreadPCId: time,
                smsTime: time,
                result: "",
                smsMessagePCID: time
            };
            return smsData;
        },

        onGridSelectAll: function(){
            this.checkNav();
            this.emptyInfoPanel.hide();
            this.newMessageView.hide();
            this.newMessageView.hideSearchContacView();
            if (this.contactEditorViewRoot){
                this.contactEditorViewRoot.hide();
            }
            if (this.massChatBox){
                this.massChatBox.remove();
                this.massChatBox = undefined;
            }
            if (this.chatBox){
                this.chatBox.hide();
            }
            if (this.multipleConversation){
                this.multipleConversation.remove();
                this.multipleConversation = undefined;
            }
            var checked = this.allCheckboxPxy[0].checked;
            if (checked){
                this.createMultipleSelected();
            } else {
                this.emptyInfoPanel.show();
            }
        },

        onGridSelected: function(model){
            console.log("短信 >> 选中了一行, 返回该行的短信模型: ", model);
            if (model.data.isAllRead === true){
                this.collection.setMessageRead([model.data.smsThreadId], function(){
                    model.data.isAllRead = false;
                    setTimeout(function(){
                        this.collection.trigger("update");
                        if (this.selectedCollection){
                            this.selectedCollection.trigger("update");
                        }
                        this.checkNav();
                    }.bind(this), 500);
                }.bind(this));
            }
            this.checkNav();
            this.emptyInfoPanel.hide();
            this.newMessageView.hide();
            this.newMessageView.hideSearchContacView();
            if (this.contactEditorViewRoot){
                this.contactEditorViewRoot.hide();
            }
            if (this.massChatBox){
                this.massChatBox.remove();
                this.massChatBox = undefined;
            }
            if (this.chatBox){
                this.chatBox.hide();
            }
            var selectedKeys = Object.keys(this.collection.selectedMap);
            var selectedLen = selectedKeys.length;
            //如果是单选，显示快速发送聊天窗口
            if (selectedLen == 1){
                if (this.multipleConversation){
                    this.multipleConversation.remove();
                    this.multipleConversation = undefined;
                }
                if (!this.chatBox){
                    this.createSingleChatBox(model);
                } else {
                    this.chatBox.show();
                    setTimeout(function(){
                        this.chatBox.setChatView(model);
                    }.bind(this), 20);
                }
            } else if (selectedLen > 1){
                //多选界面
                if (this.multipleConversation){
                    this.selectedCollection.push(model);
                    this.selectedCollection.trigger('update');
                } else {
                    this.createMultipleSelected(model);
                }
            }
        },

        onGridUnSelect: function(model){
            this.checkNav();
            if (this.contactEditorViewRoot){
                this.contactEditorViewRoot.hide();
            }
            if (this.massChatBox){
                this.massChatBox.remove();
                this.massChatBox = undefined;
            }
            this.newMessageView.hide();
            this.newMessageView.hideSearchContacView();
            var selectedKeys = Object.keys(this.collection.selectedMap);
            var selectedLen = selectedKeys.length;
            if (selectedLen == 0){
                //取消最后一个选项后，就显示问候界面
                this.emptyInfoPanel.show();
                if (this.chatBox){
                    this.chatBox.hide();
                }
            } else if (selectedLen == 1){
                //取消选择时，只有一个选项时显示单选页面
                if (!this.chatBox){
                    this.createSingleChatBox(this.collection.modelMap[selectedKeys[0]]);
                } else {
                    setTimeout(function(){
                        this.chatBox.show();
                        this.chatBox.setChatView(this.collection.modelMap[selectedKeys[0]]);
                        if (this.multipleConversation){
                            this.multipleConversation.remove();
                            this.multipleConversation = undefined;
                        }
                    }.bind(this), 20);
                }
            } else if (selectedLen > 1){
                //取消选择时，如果还是多选，就移除取消选择的model
                this.selectedCollection.remove(model);
            }
        },

        createMultipleSelected: function(model){
            var selectedMapKey = Object.keys(this.collection.selectedMap);
            var selectedMapLen = selectedMapKey.length;
            this.selectedCollection = new gridModel.Collection();
            for (var i = 0; i < selectedMapLen; i++){
                var id = selectedMapKey[i];
                var selectedModel = this.collection.modelMap[id];
                this.selectedCollection.push(selectedModel);
            }
            gridModel.selectedCollection = this.selectedCollection;
            gridModel.collection = this.collection;
            this.multipleConversation = new MultipleItemView({selectedCollection: this.selectedCollection});
            this.multipleConversation.render(this.el.find('.right'));
            this.multipleConversation.on('cancelselect', $.proxy(this.onCancelMultipleSelected, this));
            this.selectedCollection.on('update', $.proxy(this.onCloseSelected, this));
        },

        onCloseSelected: function(){
            if (this.allCheckboxPxy[0].checked == true){
                this.allCheckboxPxy[0].checked = false;
            }
            var len = this.selectedCollection.models.length;
            //点叉叉删除，只剩一项的时候显示快速发送界面
            if (len == 1){
                var model = this.selectedCollection.models[0];
                if (!this.chatBox){
                    this.createSingleChatBox(model);
                } else {
                    setTimeout(function(){
                        this.chatBox.setChatView(model);
                        if (this.multipleConversation){
                            this.multipleConversation.remove();
                            this.multipleConversation = undefined;
                        }
                        this.chatBox.show();
                    }.bind(this), 20);
                }
            } else if (len == 0){
                // 全部删完时，显示问候界面
               if (this.multipleConversation){
                    this.multipleConversation.remove();
                    this.multipleConversation = undefined;
                    this.emptyInfoPanel.show();
                }
            }
        },

        onCancelMultipleSelected: function(){
            if (this.allCheckboxPxy[0].checked == true){
                this.allCheckboxPxy[0].checked = false;
            }
            if (this.chatBox){
                this.chatBox.hide();
            }
            this.gridSMSlist.setAllSelect(false);
            if (this.multipleConversation){
                this.multipleConversation.remove();
                this.multipleConversation = undefined;
            }
            this.emptyInfoPanel.show();
        },

        createSingleChatBox: function(model){
            console.log("短信 >> 创建短信聊天框，传入的短信模型: ", model);
            var isContain = false;
            var isMulti = false;
            if (model.data['contactName'] !== model.data['smsPhoneNumber'].join(",")){
                isContain = true;
            } else {
                isContain = false;
            }
            if (model.data['smsPhoneNumber'].length !== 1){
                isMulti = true;
            } else {
                isMulti = false;
            }
            //创建快速发送、聊天框
            var chatBoxOption = {
                isHeader: true, //是否显示头部
                isEditButton:isContain, //是否显示Edit按钮，false 显示 Add 按钮
                isMulti: isMulti, // 是否是群发短信
                contactName: model.data['contactName'], // header 需要显示的联系人名或号码
                contactInfo: model.data['smsPhoneNumber'], // 联系人号码，用于快速发送
                isQuickSender:true, // 是否显示快速发送器
                isDropdownBtn: false, // 是否在发送器中显示号码下拉菜单
                collection: this.collection, // 短信集合
                resendCallback: $.proxy(this.onClickItemResend, this),
                forwardCallback: $.proxy(this.onClickItemForward, this),
                deleteCallback: $.proxy(this.onClickItemDelete, this)
            };
            this.chatBox = new UIChatBox(chatBoxOption);
            this.chatBox.appendTo(this.el.find('.right'));
            this.chatBox.setChatView(model);
            this.chatBox.quickSend.on('quicksend', $.proxy(this.onQuickSend, this));
            this.chatBox.chatHeader.on('clickedit', $.proxy(this.onEditContact, this));
            this.chatBox.chatHeader.on('clickadd', $.proxy(this.onAddContact, this));
        },

        onAddContact: function(contactInfo){
           app.navigate({
                module:'contact',
                action:'contact',
                pageState:{
                    vt:'add',
                    data: JSON.stringify({
                            sContactNumber : [{
                                typeName : "mobile",
                                value : contactInfo.contactCallNum,
                                label: "0"
                            }],
                            sDisplayName: contactInfo.contactName
                        })
                }
            });
        },

        onEditContact: function(contactInfo){
            var me = this;
            app.navigate({
                module:'contact',
                action:'contact',
                pageState:{
                    vt:'edit',
                    data:JSON.stringify({
                        sContactNumber : [{
                            typeName : "mobile",
                            value : contactInfo.contactCallNum[0],
                            label: "0"
                        }],
                        sDisplayName: contactInfo.contactName
                    })
                }
            });
        },

        onHideCttPanel: function(data){
            this.contactEditorViewRoot.hide();
            this.chatBox.show();
        },

        onQuickSend:function(messageData){
            console.log("quicksend is work", messageData);
            if (messageData.smsContent == ""){
                return;
            }
            var smsData = this.generateMessageDate(messageData.smsToCellPhoneNumber, messageData.smsContent);
            this.collection.getPhoneTime({}, function(res){
                console.log("短信 >> 开始获取手机时间: ", res);
                if (res&&res.info){
                    var currentTime = res.info.sPhoneCurrentTime;
                    smsData.smsTime = currentTime.toString();

                    for (var k = 0; k < messageData.smsToCellPhoneNumber.length; k++){
                        var uiAppendData = { 
                            smsContent:smsData.smsContent,
                            smsPhoneNumber: smsData.smsPhoneNumber[k],
                            smsMessageId: smsData.smsMessageId,
                            smsThreadId: smsData.smsThreadId,
                            smsThreadPCId: smsData.smsThreadPCId,
                            smsTime: smsData.smsTime,
                            smsMessagePCID: smsData.smsMessagePCID
                        };
                        this.chatBox.appendMessageItem(uiAppendData);
                    }
                    console.log("短信 >> 获取手机时间完毕, 发送短信: ", smsData);
                    this.collection.sendMessage(smsData, $.proxy(this.sendMessageCallback, this));
                }
            }.bind(this));
        },

        onClickItemResend: function(smsData){
            console.log("re-send is work");
            this.collection.getPhoneTime({}, function(res){
                console.log("sms >> get phone time: ", res);
                var currentTime = res.info.sPhoneCurrentTime;
                smsData.smsTime = currentTime.toString();
                var temp =[];
                temp.push(smsData.smsPhoneNumber);
                smsData.smsPhoneNumber = temp;
                console.log("sms >>get phone time completed, send message: ", smsData);
                this.collection.sendMessage(smsData, $.proxy(this.sendMessageCallback, this));
            }.bind(this));
        },

        onClickItemDelete: function(smsData, messageItemListNode, messageItemNode){
            // var temp = [];
            // temp.push(smsData);
            console.log("短信 >> 删除单条短信: ", smsData);
            this.collection.deleteMessage(smsData, $.proxy(function(res){
                console.log("短信 >> 删除单条短信返回的数据: ", res);
                if (res.status === 1){
                    if (messageItemListNode.children(".message-item").length == 1) {
                        messageItemListNode.parent(".g-message-thread").remove();
                    } else {
                        messageItemNode.remove();
                    }
                    if (res.isLastMsg === true){
                        console.log("短信 >> 删除最后一条短信...");
                        this.resetUI(true, false);
                    }
                }
            }, this));
        },

        onClickItemForward: function(message){
            console.log("短信 >> 转发短信", message);
            this.gridSMSlist.setAllSelect(false);
            this.gridSMSlist.update();
            this.newMessageView.el.find(".input-content").val(message);
            this.newMessageView.el.find(".content-count").html(message.replace(/\n|\r|\r/g, "").length);
            this.chatBox.hide();
            this.newMessageView.show();
        },

        onClickMarkRead: function(){
            var me = this;
            var selectedMapIds = Object.keys(this.collection.getSelectedMap());
            var selectedLen = selectedMapIds.length;
            var threadIDList = [];
            var messageCount = 0;
            for (var i = 0; i < selectedLen; i++){
                var model = this.collection.getModelById(selectedMapIds[i]);
                threadIDList.push(model.data.smsThreadId);
                var smsLen =  model.data.smsList.length;
                messageCount = messageCount + smsLen;
            }
            this.collection.setMessageRead(threadIDList, function(res){
                var modelTemp = me.collection.getMsgModelByThreadID(res.info.smsThreadId);
                modelTemp.data.isAllRead = false;
                me.collection.trigger("update");
                //me.gridSMSlist.update();
                // var selectedModel = me.selectedCollection.getModelById(modelTemp.getId());
                // selectedModel.data.isAllRead = false;
                me.selectedCollection.trigger("update");
            });
            //*********************************************************
            //20140924
            var logObject = {
                page: "mymessages_home",
                module: "menu",
                action: "export",
                totalnum: messageCount
            }
            utils.sendNewLog("1000120", logObject);
            //********************************************************* 
        },

        onClickImport: function(){
            var me = this;
            var args = {
                MultiSel: 0,
                Filter: '(*.csv)|*.csv'
            };
            this.collection.callPopupSysDialog(args, function(res){
                if (connection.isConnect()){
                    if(res.info && res.info.list && res.info.list[0].size > 0){
                       for(var i=0;i<res.info.list.length;i++){
                            if(res.info.list[i].status!=1){
                                return;
                            }
                        }
                        if (res.info.list[0].status !== 0){
                            console.log("短信 >> 选择要导入的文件: ", res.info.list[0].path);
                            var options = {
                                autoDestroy:3,                  
                                header : 'sms.importLable',
                                doingTitle : 'contact.importingTitle',
                                retriable : false,
                                total: 0,
                                freshOnly: false,
                                cancelAble: false
                            };

                            var processBar = new ProcessPanel(options);
                            processBar.open();

                            processBar.on('ready', function(){
                                var args = {
                                    localPath: res.info.list[0].path
                                };
                                var failedCount = 0;
                                var isSuccess = true;
                                me.collection.importMessage(args, function(resImport){
                                    console.log("短信 >> 导入短信回调: ", resImport);
                                    if (res.code === -6){
                                        processBar.setTotal(res.info.totalsize);
                                        return;
                                    }
                                    if (res.status !== 1&&res.code !== -6){
                                        isSuccess = false;
                                        failedCount = failedCount + 1;
                                    }
                                    if (resImport.info && resImport.info.totalsize > 0 && res.code !== -6){
                                        processBar.doProgress(resImport.info.process + 1, resImport.info.totalsize, resImport.info, isSuccess); 
                                        if (resImport.info.process + 1 === resImport.info.totalsize){
                                            if (failedCount === 0){
                                                processBar.setSuccessTitle(i18nDi.fillDomText('video.exportSuccess', resImport.info.totalsize));
                                            } else {
                                                processBar.setFailedTitle(i18nDi.fillDomText('video.exportFailed', resImport.info.totalsize - failedCount, failedCount));
                                            }
                                            if (me.chatBox){
                                                me.chatBox.setChatView();
                                            }
                                            //*********************************************************
                                            //20140924
                                            var logObject = {
                                                page: "mymessages_home",
                                                module: "menu",
                                                action: "import_result",
                                                successnum: resImport.info.totalsize - failedCount,
                                                failnum: failedCount
                                            }
                                            utils.sendNewLog("1000120", logObject);
                                            //*********************************************************  
                                        }
                                    } else {
                                        processBar.close();
                                    }
                                }); 
                            });
                        }            
                    }
                }
            });

            //*********************************************************
            //20140924
            var logObject = {
                page: "mymessages_home",
                module: "menu",
                action: "import"
            }
            utils.sendNewLog("1000120", logObject);
            //********************************************************* 
        },

        onClickExport: function(){
            this.updateMenuList();
        },

        onSelectMenuItem: function(selectedInfo){
            this.collection.getPhoneTime({}, function(res){
                var date = new Date();
                var dateStr = date.format('yyyyMMdd_hhmmss');
                var phoneName = res.info.sPhoneBrand + "_" + res.info.sPhoneName;
                var fileName = phoneName + "_" + dateStr + ".csv";
                var args = {
                    MultiSel: 0,
                    Filter: '(*.csv)|*.csv',
                    DialogType: "save",
                    Ext:".csv",
                    FileName: fileName//要保存的名称
                };
                this.collection.callPopupSysDialog(args,$.proxy(this.onSystemSaveDialogOK, this, selectedInfo));
            }.bind(this));
        },

        onSystemSaveDialogOK: function(selectedInfo, res){
            console.log("短信 >> 导出已经选择的短信：", selectedInfo, res);
            var me = this;
            var messageMap = selectedInfo.threadIDList;
            var messageCount = selectedInfo.count;
            var targetPath = res.info.path;
            if (connection.isConnect()){
                if (res.status !== 0){
                    var options = {
                            autoDestroy:1,                  
                            header : 'common.Export',
                            doingTitle : 'common.Exporting',
                            retriable : false,
                            total: messageCount,
                            freshOnly: false,
                            openPath: targetPath
                    };

                    var processBar = new ProcessPanel(options);
                    processBar.open();

                    processBar.on('ready', function(){
                        var args = {
                            localPath: targetPath,
                            smsThreadIds: messageMap,
                        };
                        console.log("短信 >> 开始导出短信: ", args);
                        var i = 0;
                        var failedCount = 0;
                        var isSuccess = true;
                        me.collection.exportMessage(args, function(res){
                            console.log("短信 >> 导出短信回调。。。", res);
                            if (res.status !== 1){
                                isSuccess = false;
                                failedCount = failedCount + 1;
                            }
                            i = i + 1;
                            processBar.doProgress(i, messageCount, res.info, isSuccess);
                            if (i === messageCount){
                                if (failedCount === 0){
                                    processBar.setSuccessTitle(i18nDi.fillDomText('sms.exportSuccess', messageCount));
                                } else {
                                    processBar.setFailedTitle(i18nDi.fillDomText('sms.exportFailed', messageCount - failedCount, failedCount));
                                }
                                //*********************************************************
                                //20140924
                                var logObject = {
                                    page: "mymessages_home",
                                    module: "menu",
                                    action: "export_result",
                                    successnum: messageCount - failedCount,
                                    failnum: failedCount
                                }
                                utils.sendNewLog("1000120", logObject);
                                //*********************************************************  
                            }
                        });
                    });
                }
            } 
            // else if (res.status === 1){
            //     var confirmDlg = new UIDialog({
            //         buttonKey : 2, //1双按钮
            //         content : i18nDi.fillDomText('video.promptInvaildPath')
            //     });
            //     confirmDlg.show();
            // }
            //*********************************************************
            //20140924
            var logObject = {
                page: "mymessages_home",
                module: "menu",
                action: "export",
                totalnum: messageCount
            }
            utils.sendNewLog("1000120", logObject);
            //********************************************************* 

        },

        onDeleteMsgThread: function(){
            var selectedMapIds = Object.keys(this.collection.getSelectedMap());
            var selectedLen = selectedMapIds.length;
            var messageCount = 0;
            for (var i = 0; i < selectedLen; i++){
                var model = this.collection.getModelById(selectedMapIds[i]);
                var smsLen =  model.data.smsList.length;
                messageCount = messageCount + smsLen;
            }
            var confirmDlg = new UIDialog({
                buttonKey : 3, //1双按钮
                content : i18nDi.fillDomText('sms.promptDelete', selectedLen, messageCount),
                title: i18nDi.fillDomText('common.Delete')
            });
            confirmDlg.show();
            confirmDlg.on("yes", $.proxy(this.sureDelete, this));

            //*********************************************************
            //20140924
            var logObject = {
                page: "mymessages_home",
                module: "menu",
                action: "delete",
                totalnum: messageCount
            }
            utils.sendNewLog("1000120", logObject);
            //********************************************************* 
        },

        sureDelete: function(){
            var me = this;
            // this.collection.getPhoneTime({}, function(res){
            // if (res&&res.info&&parseFloat(res.info.sPhoneReleaseVersion) < 4.4){
                    var selectedMapIds = Object.keys(this.collection.getSelectedMap());
                    var selectedLen = selectedMapIds.length;
                    var messageCount = 0;
                    var messageMap = [];
                    for (var i = 0; i < selectedLen; i++){
                        var model = this.collection.getModelById(selectedMapIds[i]);
                        var smsLen =  model.data.smsList.length;
                        messageCount = messageCount + smsLen;
                        for (var k = 0; k < smsLen; k++){
                            var messageArgs = {
                                smsMessageId: model.data.smsList[k].smsMessageId,
                                smsThreadId: model.data.smsThreadId
                            }
                            messageMap.push(messageArgs);
                        }
                    }
                    var options = {
                            autoDestroy: 3,                  
                            header : 'common.Delete',
                            doingTitle : 'common.Deleting',
                            retriable : false,
                            failedTitle : "video.deleteFailed",
                            retryButton : "common.retryText",
                            okButton : "common.okLabel",
                            closeButton : "common.closeLabel",
                            cancelButton : "common.cancelLabel",
                            total: selectedLen,
                            freshOnly: messageCount==1?true:false
                    };
                    var processBar = new ProcessPanel(options);
                    processBar.open();
                    processBar.on('ready', function(){
                        var i = 0;
                        var isDeleting = false;
                        var failedCount = 0;
                        var failedNameStr = "";
                        var deleteMessageProcess = function(){
                            if (isDeleting === false && i < messageCount){
                                isDeleting = true;
                                var args = {
                                    smsMessageId: messageMap[i].smsMessageId,
                                    smsThreadId: messageMap[i].smsThreadId,
                                };
                                console.log("短信 >> 开始删除，要删除的短信信息:", args);
                                me.collection.deleteMessage(args, function(res){
                                    i = i + 1;
                                    var isSuccess = true;
                                    if (res.status !== 1){
                                        isSuccess = false;
                                        failedCount = failedCount + 1;
                                        //failedNameStr = failedNameStr + args.fileName + '<br>';
                                    }
                                    processBar.doProgress(i, messageCount, res.info.id, isSuccess);
                                    console.log("短信 >> 删除中，短信删除统计" + i + "/" + messageCount);
                                    isDeleting = false;
                                });
                            }
                            if (i === messageCount){
                                if (failedCount === 0){
                                    processBar.close();
                                } else {
                                    processBar.setFailedTitle(i18nDi.fillDomText('sms.deleteFailed', messageCount - failedCount, failedCount));
                                    //processBar.showDetailInfo(failedNameStr);
                                    //me.resetUI(true, false);
                                }

                                //*********************************************************
                                //20140924
                                var logObject = {
                                    page: "mymessages_home",
                                    module: "menu",
                                    action: "delete_result",
                                    successnum: messageCount - failedCount,
                                    failnum: failedCount
                                }
                                utils.sendNewLog("1000120", logObject);
                                //*********************************************************
                                console.log("短信 >> 删除完毕，清除计时器: ", me.timeCountDel);
                                clearInterval(me.timeCountDel);
                                if (me.collection.models.length === 0){
                                    me.resetUI(true, true);
                                }
                            }
                        };
                        processBar.on('close', function(){
                            if (me.timeCountDel){
                                clearInterval(me.timeCountDel);
                                if(isDeleting === false) {
                                    me.resetUI(true, false);
                                } else {
                                    setTimeout(function(){
                                        me.resetUI(true, false);
                                    }, 500);
                                }
                            }
                        });
                        me.timeCountDel = setInterval(deleteMessageProcess, 50);
                    });
                // } else {
                //     var confirmDlg = new UIDialog({
                //         buttonKey : 2, //1双按钮
                //         content : "Android 4.4以上的设备不支持在PC上删除短信，请在手机上执行删除操作",//i18nDi.fillDomText('signin.networkLabel'),
                //         title: "删除(Delete)"//i18nDi.fillDomText('signin.signUpHeader')
                //     });
                //     confirmDlg.show();
                //     confirmDlg.on("yes", function(){
                //         confirmDlg.close();
                //     }); 
                // }
        },

        deleteMsgThreadCallback: function(res, model){
            console.log("sms >> back delete message data: ", res)
            var smsData = res;
            if (smsData){
                if (smsData['result'] == 2){
                    if (this.selectedCollection){
                        this.selectedCollection.remove(model);
                    }
                    if (this.chatBox){
                        this.chatBox.remove();
                        this.chatBox = undefined;
                        this.emptyInfoPanel.show();
                    }
                } else {
                    this.refresh();
                }
            }
            this.checkNav();
        },

        onNewMessage : function() {
            if (this.contactEditorViewRoot){
                this.contactEditorViewRoot.hide();
            }
            if (this.multipleConversation){
                this.multipleConversation.remove();
                this.multipleConversation = undefined;
            }
            if (this.chatBox){
                this.chatBox.hide();
            }
            if (this.massChatBox){
                this.massChatBox.remove();
                this.massChatBox = undefined;
            }
            if (this.allCheckboxPxy[0].checked = true){
                this.allCheckboxPxy[0].checked = false;
            }
            this.gridSMSlist.setAllSelect(false);
            this.emptyInfoPanel.hide();
            this.newMessageView.show();
            this.checkNav();

            //*********************************************************
            //20140924
            var logObject = {
                page: "mymessages_home",
                module: "menu",
                action: "newmessage"
            }
            utils.sendNewLog("1000120", logObject);
            //********************************************************* 
            //用于弹窗发送，于20140220需求变动暂时舍弃
            // var win = new app.PopupPanel({
            //     Model : 2,
            //     Width : 400,
            //     Height : 450,
            //     DragWindowHeight : 30,
            //     Parame : {
            //         a : 1
            //     },
            //     Path : 'smsBox.html'
            // });
            // win.on('message', function(msg) {
            //     console.log("get message from child:");
            //     console.log(msg);
            // });
            // win.open();
        },

        checkNav : function() {
            var modelSelectedIds = Object.keys(this.collection.getSelectedMap());
            var toolbar = this.el.find(".g-toolbar");
            console.log("短信 >> 检查按钮是否可用", modelSelectedIds.length);
            if (modelSelectedIds.length == 0) {
                toolbar.find(".btn-delete").attr("disabled", "disabled");
            } else {
                toolbar.find(".btn-delete").removeAttr("disabled");
            }
            toolbar.find(".btn-mark").attr("disabled", "disabled");
            if(modelSelectedIds.length > 1){
                for (var i = 0; i < modelSelectedIds.length; i++){
                    var model = this.collection.getModelById(modelSelectedIds[i]);
                    console.log(model);
                    if (model.data.isAllRead === true){
                        toolbar.find(".btn-mark").removeAttr("disabled");
                        console.log("短信 >> 点亮标记已读按钮");
                        break;
                    }
                }
            }
        }
    });

    //return SMSMainView;
    exports.SMSMainView = SMSMainView;
});
