define('smsModel', function(require, exports, module) {
    var app = require('app');
    var gridModel = require('gridModel');
    var ContactModel = require('contactModel');
    var utils = require('utils');
    var apiNames = require('APINames');
    var _ = require("underscore");
    var Model = gridModel.Model.extend({
        // init : function(data) {
        //     //console.log("new sms model:", data);
        //     this.id = "genie_sms_" + data.smsThreadId;
        //     this.on('change', _.bind(this.change, this));
        // }
    });

    var Collection = gridModel.Collection.extend({
        model : Model,
        requested : false,
        responsed : false,

        getMsgModelByCallNum : function(contactNum) {
            var number
            for (var i = 0; i < this.models.length; i++) {
                if (this.models[i].data['smsPhoneNumber'].length === 1){
                    number = this.models[i].data['smsPhoneNumber'][0].split(" ").join();
                    contactNum = contactNum.split(" ").join();
                    if (number == contactNum) {
                        console.log("短信 >> 根据电话号码获取短信模型：", this.models[i]);
                        return this.models[i];
                    }
                }
            }
            return null;
        },

        getMsgModelByContainNum : function(contactNum) {
            var number
            for (var i = 0; i < this.models.length; i++) {
                if (this.models[i].data['smsPhoneNumber'].length > 1){
                    number = this.models[i].data['smsPhoneNumber'];
                    for (var k = 0; k < number.length; k++){
                        if (number[k] === contactNum) {
                            console.log("短信 >> 根据电话号码获取群发短信模型：", this.models[i]);
                            return this.models[i];
                        }
                    }
                }
            }
            return null;
        },

        getMsgMultiModelByPhoneNum : function(contactArray) {
            var number, count = 0;
            for (var i = 0; i < this.models.length; i++) {
                if (this.models[i].data['smsPhoneNumber'].length > 1){
                    number = this.models[i].data['smsPhoneNumber'];
                    if (number.length !== contactArray.length) continue;
                    for (var k = 0; k < number.length; k++){
                        for (var m = 0; m < contactArray.length; m++){
                            if (number[k] === contactArray[m]) {
                                count = count + 1
                                break;
                            }
                        }
                    }
                    if (count === contactArray.length){
                        return this.models[i];
                    }
                }
            }
            return null;
        },

        getMsgModelByThreadID : function(smsThreadId) {
            for (var i = 0; i < this.models.length; i++) {
                var number = this.models[i].data['smsThreadId'];
                if (number == smsThreadId) {
                    return this.models[i];
                }
            }
            return null;
        },

        getMsgModelByThreadPCID : function(smsThreadPCId) {
            for (var i = 0; i < this.models.length; i++) {
                var number = this.models[i].data['smsThreadPCId'];
                if (number == smsThreadPCId) {
                    return this.models[i];
                }
            }
            return null;
        },

        deleteMessageByMessageID : function(smsList, smsMessageId) {
            for (var i = 0; i < smsList.length; i++) {
                var id = smsList[i].smsMessageId;
                if (id === smsMessageId) {
                    smsList.splice(i, 1);
                    break;
                }
            }
        },

        createNewMsgModel : function(smsData) {
            var model = new Model();
            model.data = {};
            model.data['smsPhoneNumber'] = smsData.smsPhoneNumber;
			if (smsData.smsDisplayName){
				model.data['contactName'] = smsData.smsDisplayName.join(",");
			} else {
				model.data['contactName'] = smsData.smsPhoneNumber.join(",");
			}
            model.data['smsThreadId'] = smsData.smsThreadId;
            model.data['smsThreadPCId'] = smsData.smsThreadPCId;
            model.data['smsList'] = [];
            console.log("短信 >> 创建一个新的短信模型: ", model);
            return model;
        },

        parse : function(res) {
            console.log("短信 >> 前端第一次获取的短信模型集合: ", res);
            var list = res.info;
            if (list){
                //list = list.reverse();
                for (var i = 0; i < list.length; i++){
                    // if (i%2 === 0){
                    //     list[i].smsPhoneNumber.push("10086" + i);
                    // }
                    //list[i].isAllRead = true;
                    //list[i].smsList[0].smsType = "5"
                    if (list[i].smsDisplayNames){
                        list[i].contactName = list[i].smsDisplayNames.join(",");
                    } else {
                        list[i].contactName = list[i].smsPhoneNumber.join(",");
                    }
                }
            }
            this.responsed = true;
            return list;
        },

        /*
         * 更新短信列表
         */
        refresh : function() {
            this.requested = true;
            this.responsed = false;
            this.clear();
            this.fetch(apiNames.REQ_ALL_SMS_INFO);
        },

        getPhoneTime: function(data, callback){
            app.dal.request({
                action : apiNames.REQ_DEVICE_INFO,
                paras : data,
                callback : function(res) {
                    callback && callback(res);
                }
            });
        },

        setMessageRead: function(data, callback){
            app.dal.request({
                action : apiNames.REQ_SMS_SET_READ,
                paras : data,
                callback : function(res) {
                    callback && callback(res);
                }
            });
        },

        callPopupSysDialog: function(args, callback){
            console.log("短信 >> call System Dialog popup, ars is", args);
            app.dal.request({
                action : apiNames.REQ_POPUP_SYSTEM_DIALOG,
                paras : args,
                callback : function(res) {
                    console.log("短信 >> call System Dialog popup response is", res);
                    callback && callback(res);
                }
            });
        },

        callPopupSaveDialog: function(args, callback){
            console.log("短信 >> call system save popup, ars is", args);
            app.dal.request({
                action : apiNames.REQ_POPUO_SAVE_DIALOG,
                paras : args,
                callback : function(res) {
                    console.log("短信 >> call system save popup response is", res);
                    callback && callback(res);
                }
            });
        },

        importMessage: function(args, callback){
            var me = this;
            console.log("短信 >> import, args is", args);  
            app.dal.request({
                action : apiNames.REQ_SMS_IMPORT,
                paras : args,
                callback : function(res) {                    
                    //console.log("短信 >> import response is", res.info);
                    if (res&&res.status !== 0&&res.info){
                        console.log("短信 >> import response is", res);
                        if (res.info.smsThreadId){
                            var model = me.getMsgModelByThreadID(res.info.smsThreadId);
                            if (!model){
                                console.log("短信 >> 陌生号码：", res.info.smsThreadId);
                                model = me.createNewMsgModel(res.info);
                                model.data.smsDisplayName = res.info.smsDisplayName;
                                me.push(model);
                            } else {
                                var temp = model.data.smsPhoneNumber;
                                var tempName = model.data.smsDisplayName;
                                for (var i = 0; i < model.data.smsPhoneNumber.length; i++){
                                    if (model.data.smsPhoneNumber[i] !== res.info.smsPhoneNumber[0]){
                                        temp.push(res.info.smsPhoneNumber[0]);
                                        tempName.push(res.info.smsDisplayName[0])
                                        break;
                                    }
                                }
                                model.data.smsPhoneNumber = temp;
                                model.data.smsDisplayName = tempName;
                                if (tempName){
                                    model.data.contactName = tempName.join(",");
                                } else {
                                    model.data.contactName = temp.join(",");
                                }
                            }
                            var msg = me.getMsgByMsgID(model.data.smsList, res.info.smsMessageId);
                            if (!msg){
                                model.data.smsList.push(res.info);
                            }
                            me.trigger('update');
                        }
                    }
                    callback && callback(res);
                }
            });
        },

        exportMessage: function(args, callback){
            console.log("短信 >> export, args is", args);  
            app.dal.request({
                action : apiNames.REQ_SMS_EXPORT,
                paras : args,
                callback : function(res) {                    
                    console.log("短信 >> export response is", res);
                    callback && callback(res);
                }
            });
        },

        deleteMessage : function(data, callback) {
            console.log("短信 >> to delete message data: ", data);
            var me = this;
            app.dal.request({
                action : apiNames.REQ_SMS_DELETE,
                paras : data,
                callback : function(res) {
                    console.log("短信 >> 删除短信返回的数据：", res);
                    if (res){
                        if (res.status === 1){
                            var model = me.getMsgModelByThreadID(res.info.smsThreadId);
                            if (model){
                                me.deleteMessageByMessageID(model.data.smsList, res.info.smsMessageId);
                                console.log("短信 >> 删除之前的短信数量：", model.data.smsList.length);
                                if (model.data.smsList.length === 0) {
                                    me.remove(model);
                                    res.isLastMsg = true;
                                }
                            }
                            me.trigger('update');
                        }
                        callback && callback(res);
                    }
                }
            });
        },

        sendMessage : function(data, callback) {
            console.log("短信 >> to send message data: ", data);
            var me = this;
            app.dal.request({
                action : apiNames.REQ_SMS_SEND,
                paras : data,
                callback : function(res) {
                    console.log("短信 >> send message response data: ", res);
                    if (res){
                        if (res.status === 1){
                            res.info['result'] = "2";
                        } else {
                            res.info['result'] = "1";
                        }
                        var threadModel = me.getMsgModelByThreadID(res.info.smsThreadId);
                        console.log("短信 >> 从安卓端返回的会话ID：", threadModel);
                        if (!threadModel){
                            threadModel = me.getMsgModelByThreadPCID(res.info.smsThreadPCId);
                            threadModel.data['smsThreadId'] = res.info.smsThreadId;
                            console.log("短信 >> 这是一个新会话：", threadModel);
                        }
                        //threadModel.data.smsList.push(res.info);
                        var message = me.getMsgByMsgID(threadModel.data.smsList, res.info.smsMessageId);
                        if (message === null){
                            var temp = [];
                            temp.push(res.info);
                            threadModel.data.smsList = temp.concat(threadModel.data.smsList);
                        }
                        me.trigger('update');
                        callback && callback(res, threadModel);
                    } 
                }
            });
        },

        setModelBeforeSend: function(data){
            var model = this.getMsgModelByCallNum(data.smsPhoneNumber[0]);
            if (model === null){
                console.log("短信 >> 此号码为陌生号码: ", data.smsPhoneNumber[0]);
                model = this.createNewMsgModel(data);
                this.push(model);
            }
            this.setModeltoFirst(model);
            this.setSelected(model.getId(), true);
            this.trigger('update');
            return model;
        },

        setModelBeforeMultiSend: function(data){
            var model = this.getMsgMultiModelByPhoneNum(data.smsPhoneNumber);
            if (model === null){
                model = this.createNewMsgModel(data);
                console.log("短信 >> 创建一个新的短信模型: ", model);
                this.push(model);
            }
            this.setModeltoFirst(model);
            this.setSelected(model.getId(), true);
            this.trigger('update');
            return model;
        },

        bindReceiveMessage : function(callback) {
            var me = this;
            app.dal.binding(apiNames.BIND_SMS_RECEIVE, function(res) {
                console.log("sms model >> receive message data:", res);
                // me.pushMessage(res);
                callback && callback(res);
            });
        },

        getMsgByMsgID : function(smsList, msgID) {
            for (var i = 0; i < smsList.length; i++) {
                var id = smsList[i].smsMessageId;
                if (id === msgID) {
                    return smsList[i];
                }
            }
            return null;
        },
    });

    exports.Model = Model;
    /*单例模式，将Collection暴露出去一个实例*/
    var collection_single = new Collection();
    exports.Collection = function() {
        if (!collection_single.requested && !collection_single.responsed) {
            console.log("sms model >> CALL interface, get data from phone...");
            collection_single.refresh();
        }
        return collection_single;
    };
});
