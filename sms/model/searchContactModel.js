define('SearchContactModel', function(require, exports, module){
    var app = require('app');
    var apiNames = require('APINames');
    var gridModel = require('gridModel');
    var ContactModel = require('contactModel');
    var   $ = require('jquery');
    var _ = require('underscore');
    
    var Model = gridModel.Model.extend({});
    var Collection = gridModel.Collection.extend({
        model: Model,
        
        init: function( opts ){
            Collection.__super__.init.apply(this, arguments);
            this.smsCollection = opts.smsCollection;
            this.cttCollection = opts.contactCollection;
            this.allContacts = [];
            this.groupList = ["All Groups"];
            this.contactsArray = [];
            //this.cttCollection = new ContactModel.Collection();
            //console.log("sms >> get contact collection", this.cttCollection);
            this.cttCollection.on('fetch_group_ok', $.proxy(this.onFetchContactFinished, this));
        },

        getAllContacts: function(type){
            // this.models = [];
            // if (this.cttCollection.requested == true && this.cttCollection.responsed == true){
            //     this.cttCollection.trigger('update');
            // }
            //TODO 模拟数据
            // for(var i=0; i < 100; i++){
            //     var group = "ungrouped";
            //     if (i % 2 == 0){
            //         group = "friend"
            //     } else if (i % 5 == 0){
            //         group = "family"
            //     } else if (i % 3 == 0){
            //         group = "classmate"
            //     }
            //     var model = new Model({
            //         sGroupName: group,
            //         name: "mobo-test",
            //         cellphonenumber: (i + 10000).toString()
            //     });
            //     this.push(model);
            // }
            // this.allContacts = this.models;
            // for (i = 0; i < this.models.length; i++){
            //     var name = this.models[i].data['name'];
            //     var contact = '"' + name + '"(' + this.models[i].data['cellphonenumber'] + ")";
            //     contactsArray.push(contact);
            // }
            // return contactsArray;
        }, 

        onFetchContactFinished: function(contactModel){
            this.contactsArray = [];
            this.models = [];
            this.groupList = ["All Groups"];
            console.log("短信 >> 联系人集合: ", this.cttCollection);
            console.log("短信 >> 短信  集合: ", this.smsCollection);
            console.log("短信 >> 联系人更新传过来的数据: ", contactModel);
            this.smsCollection.isFetchContact = true;
            var contactInfo = {};
            //if (contactModel){
                for (var i = 0; i < this.cttCollection.models.length; i++){
                    //var firstName = this.cttCollection.models[i].data['sFirstName'];
                    var displayName = this.cttCollection.models[i].data['sDisplayName'];
                    var name = displayName;
                    var contactsNumArray = this.cttCollection.models[i].data['sContactNumber'];
                    var group = this.cttCollection.models[i].data['sGroup'];
                    var iconImage = this.cttCollection.models[i].data['sContactIcon']
                    // try {
                        if (contactsNumArray) {
                            for(var k = 0; k < contactsNumArray.length; k++){
                                //初始化短信模块中的自动补全的数据源
                                var contact = '"' + name + '"(' + contactsNumArray[k].value + ")";
                                //var contact = name + '(' + contactsNumArray[k].value + ")";
                                if (contactsNumArray[k].value) {
                                    var matchResult = contactsNumArray[k].value.match(/\d+/g);
                                    if (matchResult){
                                        this.contactsArray.push(contact);
                                    }
                                }
                                //初始化短信模块中搜索联系人model
                                if (name == "" && contactsNumArray[k].value == ""){
                                    break;
                                }
                                if (contactsNumArray[k].value == ""){
                                    break;
                                }
                                var model = new Model({
                                    group: group,
                                    icon: iconImage || "common/images/ico/default-avatar.png",
                                    name: name,
                                    cellphonenumber: contactsNumArray[k].value
                                });
                                this.push(model);
                                var smsModel = this.smsCollection.getMsgModelByCallNum(contactsNumArray[k].value);
                                if (smsModel){
                                    smsModel.data.contactName = displayName;               
                                    smsModel.data['contactIcon'] = iconImage;
                                    // console.log("短信 >> 检查联系人头像", iconImage);
                                    // console.log("短信 >> 检查联系人姓名", displayName);
                                    // console.log("短信 >> 检查联系人号码", contactsNumArray[k].value);
                                }
                                smsModel = this.smsCollection.getMsgModelByContainNum(contactsNumArray[k].value);
                                if (smsModel){
                                    smsModel.data.contactName = smsModel.data.contactName.replace(contactsNumArray[k].value.toString(), displayName);
                                    // console.log("短信 >> 检查联系人姓名", smsModel.data.contactName);
                                    // console.log("短信 >> 检查联系人号码", contactsNumArray[k].value);               
                                }
                            }
                        }
                        if (group){
                            for (var m = 0; m < group.length; m++){
                                var isContain = this.isArrayContain(this.groupList, group[m].groupName);
                                if (isContain == false){
                                    this.groupList.push(group[m].groupName);
                                    console.log("短信: >> 统计分组信息：", this.groupList);
                                }
                            }
                        }
                    // } catch(e){
                    //     //console.log(e);
                    // }
                }
            //}
            this.trigger('update_menu');
            this.smsCollection.trigger('update', contactModel);
            this.allContacts = this.models;
        },

        getGroupsList: function(){
            var groupList = [];
            //var groups = JSON.parse(localStorage["groups"]);
            for(var i = 0; i < this.groupList.length; i ++){
                groupObj = {index: i, label: '<span class="name">' + this.groupList[i] + '</span>', data: this.groupList[i]}
                groupList.push(groupObj);
            }
            return groupList;
        },

        getContactByGroupName: function(groupName){
            if (groupName == "All Groups"){
                this.models = this.allContacts;
            } else {
                var tempModels = [];
                for (var i=0; i < this.allContacts.length; i++){
                    var groupArray = this.allContacts[i].data['group'];
                    for (var k = 0; k < groupArray.length; k++){
                        if (groupArray[k].groupName == groupName){
                            tempModels.push(this.allContacts[i]);
                        }
                    }
                }
                this.models = tempModels;
            }
        },

        getContactByKeyword: function(keyword){
            var tempModels = [];
            for (var i=0; i < this.allContacts.length; i++){
                if (this.allContacts[i].data['name'].indexOf(keyword) !== -1 ||
                    this.allContacts[i].data['cellphonenumber'].indexOf(keyword) !== -1){
                    tempModels.push(this.allContacts[i]);
                }
            }
            this.models = tempModels;
        },

        formatCallNum: function(callNum){
            if (callNum.indexOf(' ') !== -1){
                callNum = callNum.split(' ').join('');
            }
            if (callNum.indexOf('-') !== -1){
                callNum = callNum.split('-').join('');
            }
            return callNum;
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

        deleteArrayKey: function(array, key){
            var i = 0;
            for (i=0; i<array.length; i++){
                if (array[i] == key){
                    array.splice(i,1);
                    break;
                }
            }
        },       
    });
    
    exports.Model = Model;
    exports.Collection = Collection;
    window.exports=exports;
});