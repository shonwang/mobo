define("UIChatBox", function(require, exports, module) {
    var $ = require('jquery');
    var _ = require('underscore');
    var app = require('app');
    var i18nDi  = require('I18NDI');
    var SmsSendView = require('UISmsSendView');
    var  utils = require('utils');
    
    var ChatSender = app.ViewBase.extend({
        module: module,
        events:{
            'click -> .button-send': 'onClickSend',
            'click -> .ico-expression': 'onClickExpression'
        }, 

        init: function(options){
            this.options = options;
            var senderTemplate = _.template(this.getTpl('tpl-chat-quick-sender'), {I18N: i18nDi});
            this.el = $(senderTemplate);
            this.toSendMessage = "";

            this.expressionPopup = null;
            this.isExpressionShow = false;
            this.isBindKeyup = false;

            this.el.find(".send-to-box").hide();
            this.el.find(".g-chat-box-footer").hide();

            if (this.options.isDropdownBtn == true){
                this.el.find(".send-to-box").show();
            }
            var textarea = this.el.find(".input-content");
            textarea.on('keyup', $.proxy(this.onInputTextarea, this));
            textarea.on('blur', $.proxy(this.onTextareaBlur, this));
            textarea.on('focus', $.proxy(this.onFocusTextarea, this));
        },

        onClickExpression: function(event){
            console.log("click expression", event);
            var x;
            var y;
            //表情框处理阿拉伯语
            if(i18nDi.getLanguage() == "arabic"){
                    x = "50px";
                    y = "540px";
                }else{
                    x = (event.clientX - 320).toString() + "px";
                    y = (event.clientY - 110).toString() + "px";
                }
            

            if (this.expressionPopup == null){
                this.expressionPopup = new SmsSendView.ExpressionPopup({
                    clickItemCallback:$.proxy(this.onClickExpressionItem, this)});
                this.expressionPopup.appendExpression();
            }
            if (this.isExpressionShow == false){
                this.expressionPopup.render($("body"));
                this.expressionPopup.show();
                this.expressionPopup.setPosition(x, y)
                this.isExpressionShow = true;
            } else {
                this.expressionPopup.hide();
                this.isExpressionShow = false;
            }
            $(document).on('click', function(event){
                if (!$(event.target).hasClass("ico-expression")){
                    this.expressionPopup.hide();
                    this.isExpressionShow = false;
                    $(document).off('click')
                }
            }.bind(this));
        },

        getSelection: function(){
            var textarea = this.el.find(".input-content");
            textarea.focus();
            return {
                selectionStart:textarea.get(0).selectionStart,
                selectionEnd:textarea.get(0).selectionEnd
            }
        },

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

        getDropdownBtn: function(){
            return this.el.find(".send-to-box");
        },

        setSendNumber: function(num){
            this.options.contactInfo = num;
            this.el.find(".selecte-number").attr("value",num).find(".number_span").text(num);
        },

        clearTextarea: function(){
            this.el.find('.input-content').val("");
        },

        onInputTextarea: function(event){
            var text = this.el.find('.input-content').val().replace(/\n|\r|\r/g, "");
            this.el.find(".content-count").html(text.length);
        },

        onFocusTextarea: function(event){
            if (this.options.isDropdownBtn == true){
                this.el.find(".send-to-box").show();
            }
            this.el.find(".g-chat-box-footer").show();
            this.el.find('.input-content').animate({height:"60px"}, 200);
            if (this.isBindKeyup === false){
                $(document).on('keyup', $.proxy(this.onClickSend, this));
                this.isBindKeyup = true;
            }
            if (this.focusTimeout){
                clearTimeout(this.focusTimeout);
            }
            this.trigger("inputfocus");
        },

        onTextareaBlur: function(event){
            this.focusTimeout = setTimeout(function(){
                if (this.options.isDropdownBtn !== true){
                    this.el.find(".send-to-box").hide();
                }
                this.el.find(".g-chat-box-footer").hide();
                this.el.find('.input-content').animate({height:"31px"}, 200);
                this.trigger("inputblur");
            }.bind(this), 2000);
        },

        onClickSend: function(event){
            var me = this;
            if ((event.ctrlKey && event.keyCode == 13) || event.type == 'click'){
                if (this.el.find('.input-content').val().replace(/\n|\r|\r/g, "") == ""){
                    this.el.find('.input-content').focus();
                    return;
                } 
                var text = this.el.find('.input-content').val();
                this.toSendMessage = text;
                this.el.find('.input-content').val("");
                this.el.find(".content-count").html(0);
                var smsData = {
                    smsContent:this.toSendMessage,
                    smsToCellPhoneNumber:this.options.contactInfo 
                };
                console.log("quick send in chatbox",smsData);
                this.el.find(".button-send").attr("disabled", "disabled");
                setTimeout(
                    function(){
                        me.el.find(".button-send").removeAttr("disabled");
                    }, 1000);
                this.trigger("quicksend", smsData);
            }
        },

        render:function(target){
        	var me = this;
            this.el.appendTo(target);
            this.timer=setInterval(function(){
                if($(me.el).find(".input-content").width()>0 && $(me.el).find(".input-content").height()>0){
                	utils.placeholder(me.el.find(".input-content"),i18nDi.fillDomText('sms.writeMessage'));
                	clearInterval(me.timer);
                }
            },500);
        }
    });

    var ChatboxHeader = app.ViewBase.extend({
        module: module,
        events:{
            'click -> .button-add-contact': 'onClickAddContact',
            'click -> .button-edit-contact': 'onClickEditContact',
            'click -> .button-all': 'onClickEditContact'
        },

        // options = {
        //     contactInfo: string...
        //     isEditButton:false;
        //     isMulti: false,
        // }
        init: function(options){
            this.options = options;
            var headerTemplate = _.template(this.getTpl('tpl-chat-box-header-view'), {I18N: i18nDi});
            this.el = $(headerTemplate);
            if (this.options.isEditButton === true){
                this.el.find(".button-add-contact").hide();
                this.el.find(".button-edit-contact").show();
            } else if (this.options.isEditButton === false){
                this.el.find(".button-add-contact").show();
                this.el.find(".button-edit-contact").hide();
            }
            this.el.find(".contact-info").html(this.options.contactInfo.join(","));
            this.el.find(".contact-info").hide();
            var $contactNameNode = this.el.find(".contact-name");
            var contactNameArray = this.options.contactName.split(",");
            var $singleName;
            for (var i = 0; i < this.options.contactInfo.length; i++){
                $singleName = $('<p titleText=' + this.options.contactInfo[i] + '></p>');
                if (i !== this.options.contactInfo.length - 1){
                    $singleName.html(contactNameArray[i] + ", ");
                } else {
                    $singleName.html(contactNameArray[i]);
                }
                $singleName.appendTo($contactNameNode.find(".name"));
                if (this.options.contactInfo[i] !== contactNameArray[i]){
                    utils.tooltip.attach($singleName);
                }
            }
            $contactNameNode.find(".num").html(this.options.contactInfo.length);
            if (this.options.isMulti === false){
                this.el.find(".button-all").hide();
                $contactNameNode.find(".num").hide();
            } else {
                this.el.find(".button-add-contact").hide();
                this.el.find(".button-edit-contact").hide();
                this.el.find(".button-all").hide();
                $contactNameNode.find(".num").show();
            }

            this.options.collection.on("update", function(contactModel){
                var isMulti = false;
                var tempName = "";
                if (contactModel&&contactModel.data){
                    var name = contactModel.data.sDisplayName || contactModel.data.contactName;
                    var contactNum = contactModel.data.sContactNumber || contactModel.data.smsPhoneNumber;
                    console.log("聊天框 >> 从联系人模块传过来的联系人名: ", name);
                    console.log("聊天框 >> 从联系人模块传过来的联系人号码: ", contactNum);
                    if (contactModel.data.isDeleteContact === true){
                        name = contactModel.data.sContactNumber[0].value;
                        this.el.find(".button-add-contact").show();
                        this.el.find(".button-edit-contact").hide();
                    }
                    if (name.indexOf(",") > -1){
                        name = name.split(",");
                        isMulti = true;
                    }
                    var $contactNameNode = this.el.find(".contact-name");
                    for (var i = 0; i < contactNum.length; i++){
                        var $numberNode;
                        if (contactNum[i].value){
                            $numberNode = $contactNameNode.find('p[titleText="' + contactNum[i].value + '"]');
                        } else {
                            $numberNode = $contactNameNode.find('p[titleText="' + contactNum[i] + '"]');
                        }
                        if (isMulti === true){
                            tempName = name[i];
                        } else {
                            tempName = name;
                        }
                        if ($numberNode){
                            if($numberNode.html()&&$numberNode.html().indexOf(", ") > -1){
                                $numberNode.html(tempName + ", ");
                            } else {
                                $numberNode.html(tempName);
                            }
                            utils.tooltip.attach($numberNode);
                        }
                    }
                    if ((isMulti === false&&name!==contactNum)&&
                        (isMulti === false&&name!==contactNum[0])){
                    }
                }
            }.bind(this));
        },

        editeHeader: function(name, info, isMulti){
            console.log("聊天框 >> 切换会话，是否群发会话: ", isMulti);
            this.options.contactInfo = info;
            this.options.contactName = name;
            var $contactNameNode = this.el.find(".contact-name");
            $contactNameNode.find(".name").html("");
            var contactNameArray = this.options.contactName.split(",");
            var $singleName;
            for (var i = 0; i < this.options.contactInfo.length; i++){
                $singleName = $('<p titleText=' + this.options.contactInfo[i] + '></p>');
                if (i !== this.options.contactInfo.length - 1){
                    $singleName.html(contactNameArray[i] + ", ");
                } else {
                    $singleName.html(contactNameArray[i]);
                }
                $singleName.appendTo($contactNameNode.find(".name"));
                if (this.options.contactInfo[i] !== contactNameArray[i]){
                    utils.tooltip.attach($singleName);
                }
            }
            $contactNameNode.find(".num").html(this.options.contactInfo.length);
            if (isMulti === true){
                this.el.find(".button-add-contact").hide();
                this.el.find(".button-edit-contact").hide();
                $contactNameNode.find(".num").show();
            } else {
                $contactNameNode.find(".num").hide();
                console.log("聊天框 >> 姓名：", this.options.contactName);
                console.log("聊天框 >> 号码：", this.options.contactInfo.join(","));
                if (this.options.contactName === this.options.contactInfo.join(",")){
                    this.el.find(".button-add-contact").show();
                    this.el.find(".button-edit-contact").hide();
                } else {
                    this.el.find(".button-edit-contact").show();
                    this.el.find(".button-add-contact").hide();
                }
            }
        },

        onClickAddContact: function(){
            var contactInfo = {
                contactName: this.options.contactName,
                contactCallNum: this.options.contactInfo
            }
            this.trigger("clickadd", contactInfo);
        },

        onClickEditContact: function(){
            var contactInfo = {
                contactName: this.options.contactName,
                contactCallNum: this.options.contactInfo
            }
            this.trigger("clickedit", contactInfo);
        },

        onClickRetryAll: function(){
            this.trigger("clickretryall", this.options.contactInfo);
        },

        insertBefore: function(target){
            this.el.insertBefore(target);
        }
    });

    var MessageItemView = app.ViewBase.extend({
        module: module,
        events:{
            // 'mouseenter -> .content-wrap': 'onShowAction',
            // 'mouseleave -> .content-wrap': 'onHideAction',
            'click -> .button-forward': 'onClickForward',
            'click -> .button-delete': 'onClickDelete',
            'click -> .button-resend':'onClickResend',
            'click -> .button-copy':'onClickCopy'
        },

        //发送结构
        //  { 
        //     operation: 1,
        //     smsContent:"hello everyone",
        //     smsPhoneNumber: "10086",
        //     smsMessageId: "",
        //     smsThreadId: "",
        //     smsTime: "",
        //     result: "",
        //     smsMessagePCID: "1110"
        // },
        init: function(options){
            this.options = options;
            var template = _.template(this.getTpl('tpl-sms-message-item'), {I18N: i18nDi});
            this.el = $(template);

            if (this.options.smsMessagePCID&&!this.options.smsMessageId){
                this.el.attr("message-id", this.options.smsMessagePCID);
            } else {
                this.el.attr("message-id", this.options.smsMessageId);
            }
            if (this.options.smsThreadPCID&&!this.options.smsThreadId){
                this.el.attr("thread-id", this.options.smsThreadPCID);
            } else {
                this.el.attr("thread-id", this.options.smsThreadId);
            }
            this.el.attr("address-num", this.options.smsPhoneNumber);
            this.el.find(".content").html(this.options.smsContent);

            if (this.options.smsType !== "1" || 
                this.options.operation == "1"){
                this.el.addClass("from-me");
            } else {
                this.removeSendStatus();
            }

            this.el.find(".actions").hide();
            this.el.find(".button-resend").hide();

            if (this.options.smsType === "5"){
                this.el.find("#status").hide();
                this.el.find(".button-resend").show();
                this.el.addClass("from-retry");
            }
        },

        removeSendStatus: function(){
            this.el.find("#status").removeClass("ico-loading14");
            var time = this.options.smsTime;
            if (time.toString().indexOf('-') === -1 ) {
                var dataTime = parseInt(time);
                var dateObj = new Date();
                dateObj.setTime(dataTime);
                time = dateObj.format("dd/MM/yyyy hh:mm:ss");
            }
            this.el.find("#status").html(time.split(" ")[1]);
            this.el.find("#status").show();
        },

        appendTo: function(target){
            this.el.appendTo(target);
            this.el.find(".content-wrap").on("mouseenter", $.proxy(this.onShowAction, this));
            this.el.find(".content-wrap").on("mouseleave", $.proxy(this.onHideAction, this));
            /*添加title*/
			utils.tooltip.attach(this.el.find(".button-delete"));
			utils.tooltip.attach(this.el.find(".button-copy"));
			utils.tooltip.attach(this.el.find(".button-forward"));
        },

        onShowAction:function(event){
            this.el.find(".actions").show();
        },

        onHideAction:function(event){
            this.el.find(".actions").hide();
        },

        offMouseAction: function(){
            // 'mouseenter -> .content-wrap': 'onShowAction',
            // 'mouseleave -> .content-wrap': 'onHideAction',
            this.el.find(".content-wrap").off("mouseenter");
            this.el.find(".content-wrap").off("mouseleave");
        },

        onMouseAction: function(){
            this.el.find(".content-wrap").on("mouseenter", $.proxy(this.onShowAction, this));
            this.el.find(".content-wrap").on("mouseleave", $.proxy(this.onHideAction, this));
        },

        onClickResend:function(event){
            if ($(event.target).hasClass("loc-label")){
                var infoNode = $(event.target).parent(".button-resend").parent(".info");
            }
            else {
                var infoNode = $(event.target).parent(".info");
            }
            var messageItemNode = infoNode.parent(".message-item");
            var address = messageItemNode.attr("address-num");
            var messageID = messageItemNode.attr("message-id");
            var threadID = messageItemNode.attr("thread-id");
            var messageBody = messageItemNode.find(".content").html();
            var dateItem = messageItemNode.parent(".g-message-item-ctn").parent(".g-message-thread");
            var date = dateItem.attr("date");
            if (!infoNode.find("#status").hasClass('ico-loading14')){
                infoNode.find("#status").addClass('ico-loading14')
                infoNode.find("#status").removeAttr("style");
            }
            //infoNode.find("#status").show();
            infoNode.find(".button-resend").hide(); 
            var time = new Date().valueOf(); 
            var smsData = {
                operation: "1",
                smsContent: messageBody,
                smsPhoneNumber: address,
                smsMessageId: messageID,
                smsThreadId: threadID,
                smsTime: time,
                result: "",
                smsMessagePCID: messageID
            };
            this.trigger('resendmsg', smsData);
        },

        onClickForward:function(event){
            var actionsNode = $(event.target).parent(".actions");
            var wrapNode = actionsNode.parent(".content-wrap");
            var messageBody = wrapNode.find(".content").html();
            this.trigger('forwardmsg', messageBody);
            // this.el.find(".input-content").val(message);
            // this.el.find(".content-count").html(message.replace(/\n|\r|\r/g, "").length);
            //this.el.find(".address").children(".contact-label").remove();
        },

        onClickCopy: function(event){
            var apiNames = require('APINames');
            var actionsNode = $(event.target).parent(".actions");
            var wrapNode = actionsNode.parent(".content-wrap");
            var messageBody = wrapNode.find(".content").html();
            console.log("聊天框 >> 复制短信到剪切板...", messageBody);
            app.dal.request({
                action : apiNames.REQ_COPYTOCLIPBOARD,
                paras : {content: messageBody},
                callback : function(){}
            });
        },

        onClickDelete:function(event){
            var actionsNode = $(event.target).parent(".actions");
            var wrapNode = actionsNode.parent(".content-wrap");
            var messageItemNode = wrapNode.parent(".message-item");
            var messageID = messageItemNode.attr("message-id");
            var threadID = messageItemNode.attr("thread-id");
            var messageItemListNode = messageItemNode.parent(".g-message-item-ctn");
            // if (messageItemListNode.children(".message-item").length == 1) {
            //     messageItemListNode.parent(".g-message-thread").remove();
            // } else {
            //     messageItemNode.remove();
            // }
            var smsData = {
                smsMessageId: messageID,
                smsThreadId: threadID,
            };
            this.trigger('deletemsg', smsData, messageItemListNode, messageItemNode);
        },

    });

    var DateItemView = app.ViewBase.extend({
        module: module,
        init: function(options){
            this.options = options;
            this.tpl = this.getTpl('tpl-sms-date-item');
            this.el = $(this.tpl);
            this.el.find(".date-ctn").html(options.replace(/-/g, '\/'));
            this.el.attr("date", options);
        },

        appendTo: function(target){
            this.el.appendTo(target);
        },
    });

    var ChatBox = app.ViewBase.extend({
        module: module,

        // options = {
        //     isHeader: true,
        //     isEditButton:false,
        //     contactInfo: string,
        //     isQuickSender:true,
        //     isDropdownBtn:true
        // }
        init: function(opts){
            this.options = opts;
            this.collection = opts.collection;
            this.tpl = _.template(this.getTpl('tpl-chat-box-view'), {I18N: i18nDi});
            this.el = $(this.tpl);
            this.failedCollection = [];
            if (this.options.isHeader == true){
                this.chatHeader = new ChatboxHeader(this.options);
                this.chatHeader.insertBefore(this.el.find(".g-message-threads-list-ctn"));
            }
            if (this.options.isQuickSender == true){
                this.quickSend = new ChatSender(this.options);
                this.quickSend.render(this.el.find(".g-message-threads-list-ctn"));
                
            }
        },

        setChatView: function(model){
            this.getLastSelectedModel(model);
            if (!this.model) return;
            this.getDateItemArray();
            this.getMessageByDate();
            this.insertDateItem(this.dateArray);
            this.addMessageItemByDate();
            var isMulti = false;
            if (model&&model.data['smsPhoneNumber'].length !== 1){
                isMulti = true;
            }
            if (this.options.isHeader === true){
                this.chatHeader.editeHeader(this.model.data.contactName, this.model.data.smsPhoneNumber, isMulti);
            }
        },

        getLastSelectedModel: function(model){
            var modelSelected = Object.keys(this.collection.getSelectedMap());
            var len = modelSelected.length;
            if (!model){
                this.model = this.collection.getModelById(modelSelected[len - 1]);
            } else {
                this.model = model;
            }
        },

        getDateItemArray: function(){
            this.dateArray = [];
            var dateArray = [];
            var isContain =false;
            for (var i = 0; i < this.model.data.smsList.length; i++){
                var date = this.model.data.smsList[i].smsTime;
                if (date.toString().indexOf('/') == -1 ) {
                    var dataTime = parseInt(date);
                    var dateObj = new Date();
                    dateObj.setTime(dataTime);
                    date = dateObj.format("dd-MM-yyyy");
                }
                isContain = this.isArrayContain(dateArray, date);
                if (isContain == false){
                    dateArray.push(date);
                } else {
                    isContain = false;
                }
            }
            this.dateArray = this.sortDate(dateArray);
            console.log("聊天框 >> current message date list: ", this.dateArray);
            return this.dateArray;
        },

        sortDate: function(list){
            var flag = 0;
            var temp;
            for (var i = 0; i < list.length - 1; i++){
                flag = 0;
                for (var j = 0; j < list.length - 1; j++){
                    var dateFir = parseInt(list[j].split('-').reverse().join(''));
                    var dateSec = parseInt(list[j + 1].split('-').reverse().join(''));
                    // var dateFir = list[j];
                    // var dateSec = list[j + 1];
                    if (dateFir > dateSec){
                        temp = list[j];
                        list[j] = list[j + 1];
                        list[j + 1] = temp;
                        flag = 1;
                    }
                }
                if (flag == 0){
                    break;
                }
            }
            return list;
        },

        getMessageByDate: function(){
            var mapObj = {};
            for (var i = 0; i < this.dateArray.length; i++){
                var key = this.dateArray[i];
                var messageArray = [];

                for(var k = 0; k < this.model.data.smsList.length; k++){
                    var date = this.model.data.smsList[k].smsTime;
                    if (date.toString().indexOf('/') == -1 ) {
                        var dataTime = parseInt(date);
                        var dateObj = new Date();
                        dateObj.setTime(dataTime);
                        date = dateObj.format("dd-MM-yyyy");
                    }
                    if (key == date){
                        messageArray.push(this.model.data.smsList[k]);
                    }
                }
                mapObj[key] = messageArray.reverse();
            }
            this.dateMessageMap = mapObj;
            console.log("聊天框 >> current dateMessage map: ", mapObj);
            return mapObj;
        },

        isArrayContain: function(array, key){
            var k = 0;
            var isContain = false;
            if (array.length > 0) {
                for (k = 0; k < array.length; k++){
                    if(key == array[k]){
                        isContain = true;
                        break;
                    }
                }
            }
            return isContain;
        },

        addMessageItemByDate: function(){
            var me = this;
            me.el.find(".load-more-msg").show();
            var dateLen = this.dateArray.length;
            console.log("聊天框 >> 日期列表长度：", dateLen);
            var allMessageNum = this.model.data.smsList.length;
            var dateArrayRev = this.dateArray.reverse();
            var index = 3;
            if (dateLen > 3 && allMessageNum > 30){
                for (var i = 0; i < index; i++){
                    this.insertMessageItem(dateArrayRev[i]);
                }
                var loadMoreMsg = function(){
                    var len = index + 3;
                    if (len > dateLen){
                        len = dateLen;
                    }
                    console.log(dateArrayRev);
                    for (var k = index; k < len; k++){
                        me.insertMessageItem(dateArrayRev[k]);
                    }

                    var messageList = me.el.find(".g-message-threads-list-ctn");
                    var dateItem = messageList.find("li[date=" + dateArrayRev[index - 1] + "]");
                    // var messageNodes = dateItem.find(".g-message-item-ctn");
                    // messageNode = $(messageNodes.get(messageNodes.length - 1));
                    // messageList.scrollTop(0);
                    if (dateItem.get(0)){
                        messageList.animate({scrollTop:dateItem.offset().top - 200}, 10);
                    }

                    index = index + 3;
                    console.log("聊天框 >> 当前索引值：", len);
                    if (len == dateLen){
                        me.el.find(".load-more-msg").hide();
                    }
                }
                this.el.find(".load-more-msg").off("click"); 
                this.el.find(".load-more-msg").on("click", loadMoreMsg);                 
            } else {
                me.el.find(".load-more-msg").hide();
                for (var i = 0; i < this.dateArray.length; i++){
                    this.insertMessageItem(this.dateArray[i]);
                } 
            }
            var tempListH = this.el.find(".g-message-threads-list-ctn").height();
            var scrollHHeight = this.el.find(".g-message-threads-list-ctn").get(0).scrollHeight;
            this.el.find(".g-message-threads-list-ctn").scrollTop(scrollHHeight - tempListH);
        },

        insertMessageItem: function(date){
            var dateItem = this.el.find("li[date=" + date + "]");
            $(dateItem[0]).show();
            if (dateItem.get(0) !== undefined){
                var messageNodes = $(dateItem[0]).find(".g-message-item-ctn").children(".message-item");
                messageNodes.remove();
                var messageList = this.dateMessageMap[date];
                for (var k = 0; k < messageList.length; k++){
                    var messageItem = new MessageItemView(messageList[k]);
                    messageItem.removeSendStatus();
                    messageItem.on('resendmsg', this.options.resendCallback);
                    messageItem.on('deletemsg', this.options.deleteCallback);
                    messageItem.on('forwardmsg', this.options.forwardCallback);
                    messageItem.appendTo($(dateItem[0]).find(".g-message-item-ctn"));
                }
            }
        },

        //复用message Dom 节点
        insertMessageItem_bak: function(date){
            var dateItem = this.el.find("li[date=" + date + "]");
            $(dateItem[0]).show();
            if (dateItem.get(0) !== undefined){
                var messageNodes = $(dateItem[0]).find(".g-message-item-ctn").children(".message-item");
                var messageList = this.dateMessageMap[date];
                if (messageNodes.length >= messageList.length){
                    for (var i = 0; i < messageList.length; i++){
                        this.editMessageItem(messageNodes, messageList, i, true, false);
                    }
                    for (var k = messageList.length; k < messageNodes.length; k++){
                        $(messageNodes[k]).hide();
                    }
                } else if (messageNodes.length < messageList.length){
                    for (var i = 0; i < messageNodes.length; i++){
                        this.editMessageItem(messageNodes, messageList, i, true, false)
                    }
                    for (var k = messageNodes.length; k < messageList.length; k++){
                        var messageItem = new MessageItemView(messageList[k]);
                        messageItem.removeSendStatus();
                        messageItem.on('resendmsg', this.options.resendCallback);
                        messageItem.on('deletemsg', this.options.deleteCallback);
                        messageItem.on('forwardmsg', this.options.forwardCallback);
                        messageItem.appendTo($(dateItem[0]).find(".g-message-item-ctn"));
                    }
                }
            }
        },

        editMessageItem: function(messageNodes, messageList, i, isList, isShowSending){
            var msgNodes = $(messageNodes[i]);
            var messageData = null;
            if (isList === false){
                messageData = messageList;
            } else {
                messageData = messageList[i];
            }
            //移除原先短信节点的特殊样式
            if (msgNodes.hasClass("from-me")){
                msgNodes.removeClass("from-me");
            }
            if (msgNodes.hasClass("from-retry")){
                msgNodes.removeClass("from-retry");
            }
            //填写短信信息
            if (messageData.smsMessagePCID){
                msgNodes.attr("message-id", messageData.smsMessagePCID);
            } else {
                msgNodes.attr("message-id", messageData.smsMessageId);
            }
            if (messageData.smsThreadPCID){
                msgNodes.attr("thread-id", messageData.smsThreadPCID);
            } else {
                msgNodes.attr("thread-id", messageData.smsThreadId);
            }
            msgNodes.attr("address-num", messageData.smsPhoneNumber);
            msgNodes.find(".content").html(messageData.smsContent);
            //添加当前短信的特殊样式
            if (messageData.smsType != "1" || 
                messageData.operation == "1"){
                msgNodes.addClass("from-me");
            }
            msgNodes.find(".actions").hide();
            if (isShowSending === false || !msgNodes.hasClass("from-me")){
                msgNodes.find("#status").removeClass("ico-loading14");
                var time = messageData.smsTime
                if (time.toString().indexOf('/') == -1 ) {
                    var dataTime = parseInt(time);
                    var dateObj = new Date();
                    dateObj.setTime(dataTime);
                    time = dateObj.format("dd/MM/yyyy hh:mm:ss");
                }
                msgNodes.find("#status").html(time.split(" ")[1]);
                msgNodes.find("#status").show();
            } else {
                var sendIconNode = msgNodes.find("#status");
                sendIconNode.html("");
                if (!sendIconNode.hasClass("ico-loading14")){
                    sendIconNode.removeAttr("style");
                    sendIconNode.addClass("ico-loading14");
                }
            }
            msgNodes.find(".button-resend").hide();

            if (messageData.smsType === "5"){
                msgNodes.find("#status").hide();
                msgNodes.find(".button-resend").show();
                msgNodes.addClass("from-retry");
            }
            msgNodes.show();
        },

        insertDateItem: function(dateArray){
            //先检查当前已经存在的日期节点
            var dateNodes = this.el.find(".g-message-threads-list-ctn").children(".g-message-thread");
            console.log("聊天框 >> node length ", dateNodes.length);
            console.log("聊天框 >> dateArray length ", dateArray.length);
            if (dateNodes.length >= dateArray.length){
                //如果已经存在的日期节点数量已经大于当前数据中日期的个数，隐藏多余的节点
                for (var i = 0; i < dateArray.length; i++){
                    var dateNode = $(dateNodes[i]);
                    dateNode.find(".date-ctn").html(dateArray[i].replace(/-/g, '\/'));
                    dateNode.attr("date", dateArray[i]);
                    dateNode.attr("msg-num", this.dateMessageMap[dateArray[i]].length);
                    dateNode.hide();
                }
                for (var k = dateArray.length; k < dateNodes.length; k++){
                    var dateNode = $(dateNodes[k]);
                    dateNode.hide();
                    dateNode.attr("date", "0");
                    dateNode.attr("msg-num", "0");
                }
            } else if (dateNodes.length < dateArray.length){
                //已经存在的节点不够，就创建新的
                for (var i = 0; i < dateNodes.length; i++){
                    var dateNode = $(dateNodes[i]);
                    dateNode.find(".date-ctn").html(dateArray[i].replace(/-/g, '\/'));
                    dateNode.attr("date", dateArray[i]);
                    dateNode.attr("msg-num", this.dateMessageMap[dateArray[i]].length);
                    dateNode.hide();
                }
                for (var k = dateNodes.length; k < dateArray.length; k++){
                    var dateItem = new DateItemView(dateArray[k]);
                    dateItem.appendTo(this.el.find(".g-message-threads-list-ctn"));
                    dateItem.el.attr("msg-num", this.dateMessageMap[dateArray[k]].length);
                    dateItem.el.hide();
                }
            }
        },

        removeThreadList: function(){
            this.el.find(".g-message-threads-list-ctn").find(".g-message-thread").remove();
        },

        remove: function(){
            if (this.options.isQuickSender == true){
                $(document).off('keyup', this.quickSend.onClickSend);
            }
            this.el.remove();
        },

        hide: function(){
            if (this.options.isQuickSender == true){
                $(document).off('keyup', this.quickSend.onClickSend);
            }
            this.el.hide();
        },

        show: function(){
            if (this.options.isQuickSender == true){
                $(document).on('keyup', $.proxy(this.quickSend.onClickSend, this.quickSend));
            }
            this.el.show();
        },

        appendTo: function(target){
            this.el.appendTo(target);
            var headerHeight = this.el.find(".g-chat-header").outerHeight()
            var quicksendHeight = this.el.find(".g-message-quick-sender").outerHeight()
            console.log("聊天框 >> 头部原始高度：", headerHeight);
            console.log("聊天框 >> 快速发送原始高度：", quicksendHeight);

            var listHeight = this.el.find(".g-message-threads-list-ctn").height();
            console.log("聊天框 >> 列表原始高度：", listHeight);

            this.quickSend.on("inputfocus", function(){
                var newHeight = listHeight - 100;
                this.el.find(".g-message-threads-list-ctn").height(newHeight);
            }.bind(this));
            
            this.quickSend.on("inputblur", function(){
                this.el.find(".g-message-threads-list-ctn").height("100%");
            }.bind(this));

            this.el.find(".g-message-threads-list-ctn").on("scroll", function(){
                var tempListH = this.el.find(".g-message-threads-list-ctn").height();
                console.log("聊天框 >> height：", tempListH);
                var scrollTop = this.el.find(".g-message-threads-list-ctn").get(0).scrollTop;
                console.log("聊天框 >> scrollTop：", scrollTop);
                var scrollHHeight = this.el.find(".g-message-threads-list-ctn").get(0).scrollHeight;
                console.log("聊天框 >> scrollHHeight: ", scrollHHeight);
            }.bind(this));
        },

        hasThreads : function(){
            if(this.el.find(".g-message-thread").length > 0){
                return true;
            } else {
                return false;
            }
        },

        insertBefore: function(target){
            this.el.insertBefore(target);
        },

        appendMessageItem_bak: function(smsData){
            console.log("聊天框 >> send a new message, append data:", smsData);
            var tempTime = smsData.smsTime;
            if (smsData.smsTime.toString().indexOf('/') == -1 ) {
                var dataTime = parseInt(smsData.smsTime);
                var dateObj = new Date();
                dateObj.setTime(dataTime);
                smsData.smsTime = dateObj.format("dd-MM-yyyy hh:mm:ss");
                console.log("聊天框 >> format message date", smsData.smsTime);
            }
            //查找短信的日期节点
            var dateItem = this.el.find("li[date=" + smsData.smsTime.split(" ")[0] + "]");
            if (dateItem.get(0) === undefined){
                //如果日期节点不存在，就查找空闲节点
                dateItem = this.el.find('li[date="0"]');
            }
            //如果空闲节点不存在则创建
            if (dateItem.get(0) === undefined){
                dateItem = new DateItemView(smsData.smsTime.split(" ")[0]);
                dateItem.appendTo(this.el.find(".g-message-threads-list-ctn"));
                dateItem.el.attr("msg-num", "1");
                //创建当前短信
                var messageItem = new MessageItemView(smsData);
                messageItem.on('resendmsg', this.options.resendCallback);
                messageItem.on('deletemsg', this.options.deleteCallback);
                messageItem.on('forwardmsg', this.options.forwardCallback);
                messageItem.appendTo(dateItem.el.find(".g-message-item-ctn"));
            } else {
                dateItem = $(dateItem.get(0));
                dateItem.show();
                //节点存在，检查该日期节点下的短信数和节点数来决定是否创建新的
                var msgNum = dateItem.attr("msg-num");
                msgNum = parseInt(msgNum);
                msgNum = msgNum + 1;
                if (dateItem.attr("date") === "0"){
                    dateItem.attr("date", smsData.smsTime.split(" ")[0]);
                    dateItem.find(".date-ctn").html(smsData.smsTime.split(" ")[0].replace(/-/g, '\/'));
                    dateItem.attr("msg-num", msgNum);
                }
                dateItem.attr("msg-num", msgNum);

                var messageNodes = dateItem.find(".g-message-item-ctn").children(".message-item");
                var nodeNum = messageNodes.length;
                //如果短信数等于节点数，就创建新的节点
                console.log("短信 >> 短信数：", msgNum);
                console.log("短信 >> 节点数：", nodeNum);
                if (msgNum >= nodeNum){
                    var messageItem = new MessageItemView(smsData);
                    messageItem.on('resendmsg', this.options.resendCallback);
                    messageItem.on('deletemsg', this.options.deleteCallback);
                    messageItem.on('forwardmsg', this.options.forwardCallback);
                    messageItem.appendTo(dateItem.find(".g-message-item-ctn"));
                } else if (msgNum < nodeNum){
                    //如果节点数大于短信数，说明有空闲节点，编辑之
                    this.editMessageItem(messageNodes, smsData, msgNum - 1, false, true);
                    for (var k = msgNum; k < messageNodes.length; k++){
                        $(messageNodes[k]).hide();
                    }
                }
            }
            //滚动条置底
            var tempListH = this.el.find(".g-message-threads-list-ctn").height();
            //var scrollTop = this.el.find(".g-message-threads-list-ctn").get(0).scrollTop;
            var scrollHHeight = this.el.find(".g-message-threads-list-ctn").get(0).scrollHeight;
            this.el.find(".g-message-threads-list-ctn").scrollTop(scrollHHeight - tempListH);

            smsData.smsTime = tempTime;
        },

        appendMessageItem: function(smsData, isReceive){
            console.log("聊天框 >> send a new message, append data:", smsData);
            var tempTime = smsData.smsTime;
            if (smsData.smsTime.toString().indexOf('/') == -1 ) {
                var dataTime = parseInt(smsData.smsTime);
                var dateObj = new Date();
                dateObj.setTime(dataTime);
                smsData.smsTime = dateObj.format("dd-MM-yyyy hh:mm:ss");
                console.log("聊天框 >> format message date", smsData.smsTime);
            }
            //查找短信的日期节点
            var dateItem = this.el.find("li[date=" + smsData.smsTime.split(" ")[0] + "]");
            if (dateItem.get(0) === undefined){
                //如果日期节点不存在，就查找空闲节点
                dateItem = this.el.find('li[date="0"]');
            }
            //如果空闲节点不存在则创建
            if (dateItem.get(0) === undefined){
                dateItem = new DateItemView(smsData.smsTime.split(" ")[0]);
                dateItem.appendTo(this.el.find(".g-message-threads-list-ctn"));
                dateItem.el.attr("msg-num", "1");
                //创建当前短信
                var messageItem = new MessageItemView(smsData);
                messageItem.on('resendmsg', this.options.resendCallback);
                messageItem.on('deletemsg', this.options.deleteCallback);
                messageItem.on('forwardmsg', this.options.forwardCallback);
                messageItem.appendTo(dateItem.el.find(".g-message-item-ctn"));
            } else {
                dateItem = $(dateItem.get(0));
                dateItem.show();

                if (dateItem.attr("date") === "0"){
                    dateItem.attr("date", smsData.smsTime.split(" ")[0]);
                    dateItem.find(".date-ctn").html(smsData.smsTime.split(" ")[0].replace(/-/g, '\/'));
                    dateItem.find(".g-message-item-ctn").children(".message-item").remove();
                }

                var messageItem = new MessageItemView(smsData);
                messageItem.on('resendmsg', this.options.resendCallback);
                messageItem.on('deletemsg', this.options.deleteCallback);
                messageItem.on('forwardmsg', this.options.forwardCallback);
                messageItem.appendTo(dateItem.find(".g-message-item-ctn"));
            }
            //onMouseAction
            if (isReceive !== true){
                messageItem.offMouseAction();
            }
            //滚动条置底
            var tempListH = this.el.find(".g-message-threads-list-ctn").height();
            var scrollHHeight = this.el.find(".g-message-threads-list-ctn").get(0).scrollHeight;
            this.el.find(".g-message-threads-list-ctn").scrollTop(scrollHHeight - tempListH);

            smsData.smsTime = tempTime;
        },

        modifyMessageStatus: function(smsData){
            console.log("聊天框 >> modify message status", smsData);
            var tempTime = smsData.smsTime;
            if (smsData.smsTime.toString().indexOf('/') == -1) {
                var dataTime = parseInt(smsData.smsTime);
                var dateObj = new Date();
                dateObj.setTime(dataTime);
                smsData.smsTime = dateObj.format("dd/MM/yyyy hh:mm:ss");
            }
            var dateItem = this.el.find("li[date=" + smsData.smsTime.split(" ")[0].replace(/\//g, '-') + "]");
            console.log("聊天框 >> 查询： li[date=" + smsData.smsTime.split(" ")[0].replace(/\//g, '-') + "]");
            var messageItem = dateItem.find("li[message-id=" + smsData.smsMessagePCID + "][address-num='" + smsData.smsPhoneNumber[0] + "']");
            console.log("聊天框 >> 查询：li[message-id=" + smsData.smsMessagePCID + "][address-num='" + smsData.smsPhoneNumber[0] + "']");
            console.log(dateItem.get(0));
            console.log(messageItem.get(0));

            messageItem.attr("message-id", smsData.smsMessageId);
            messageItem.attr("thread-id", smsData.smsThreadId);
            messageItem.find("#status").removeClass("ico-loading14");
            if (smsData.result == "2"){
                //成功后移除图标类显示时间
                messageItem.find("#status").html(smsData.smsTime.split(" ")[1]);
                messageItem.find("#status").show();
                messageItem.find(".button-resend").hide();
                if (messageItem.hasClass("from-retry")){
                    messageItem.removeClass("from-retry");
                }
            } else if (smsData.result == "1") {
                messageItem.find("#status").html(smsData.smsTime.split(" ")[1]);
                messageItem.find("#status").css("display", "inline-block")
                messageItem.find(".button-resend").show();
                this.failedCollection.push(smsData);
                messageItem.addClass("from-retry");
            } else {
                messageItem.find("#status").html("");
                messageItem.find(".button-resend").hide();
            }
            messageItem.find(".content-wrap").on("mouseenter", function(){
                messageItem.find(".actions").show();
            });
            messageItem.find(".content-wrap").on("mouseleave", function(){
                messageItem.find(".actions").hide();
            });
            smsData.smsTime = tempTime;
        }
    });
    ChatBox.ChatSender = ChatSender;
    return ChatBox;
}); 