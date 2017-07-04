define('contactModel', function(require, exports, module) {
    var app = require('app');
    var gridModel = require('gridModel');
    var utils = require('utils');
    var apiNames = require('APINames');
    var _ = require("underscore");
    /*国际化字典工具*/
    var i18nDi = require('I18NDI');
    
    var Model = gridModel.Model.extend({
        init : function(data) {
            this.id = "genie_contact_" + data.sContactId;
            this.on('change', _.bind(this.change, this));
        }
    });

    var getDataStructure = function() {
        var dataObj = {
            operation : "",
            accountName : "phone",
            sContactIcon : "",
            sNote : "",
            sContactNumber : [],
            sContactEmail : [],
            sGroup : []
        };
        return dataObj;
    };
    var getPhoneTypes = function() {
        var phoneTypes = [{
            index : 0,
            label : i18nDi.fillDomText("contact.Mobile"),
            value : "mobile"
        }, {
            index : 1,
            label : i18nDi.fillDomText("common.phoneText"),
            value : "phone"
        }];
        return phoneTypes;
    };
    var getEmailTypes = function() {
        return [{
            index : 2,
            label : i18nDi.fillDomText("common.email"),
            value : "Email"
        }]
    };
    /*App数据集合*/
    var Collection = gridModel.Collection.extend({
        model : Model,
        requested : false,
        responsed : false,
        list : [], /*数据列表*/
        queryContacts : function(accountName, groupId, callback) {
            var me = this;
            var list = [];
            if (accountName == "all" || accountName == "") {
                me.models.forEach(function(model){
                    list.push(model.data);
                });
                callback && callback(list);
            } else {
                var paras ={
                    accountName : accountName
                };
                if(groupId){
                    paras.groupId=groupId;
                }
                app.dal.request({
                    action : apiNames.REQ_CONTACT_QUERY,
                    paras : paras,
                    callback : function(res) {
                        console.log("query contacts callback in model:");
                        console.log(res);
                        res.contactList&&res.contactList.forEach(function(item) {
                            var new_contact = {
                                accountName : accountName,
                                readOnly : item.isSim,
                                sDisplayName : item.sDisplayName,
                                sContactId : item.sContactId || "",
                                sContactIcon : item.sContactIcon||'common/images/ico/default-avatar.png',
                                sNote : item.sNote || "",
                                sContactNumber : item.sContactNumber || [],
                                sContactEmail : item.sContactEmail || []
                            };
                            if(me.getModelById("genie_contact_"+item.sContactId)){
                                new_contact.sGroup=me.getModelById("genie_contact_"+item.sContactId).get("sGroup");
                            }
                            list.push(new_contact);
                        });
                        callback && callback(list);
                    }
                });
            }
        },
        filterContacts:function(accountName,groupId,callback){
            var list = [];
            this.models.forEach(function(model){
                    list.push(model.data);
            });
            if (!this.worker) {
                this.worker = new Worker(module.dirname + "/ContactWorker.js");
            }
            this.worker.postMessage({
                todo : "filterContacts",
                contactList : list,
                accountName : accountName,
                groupId : groupId
            });
            this.worker.onmessage = function(message) {
                if (message.data.action == "filterContacts") {
                    console.log("线程回调=============");
                    var result = message.data.contactList;
                    callback && callback(result);
                }
            }
        },
        getAccountMap : function() {
            if (this.requested && this.responsed) {
                return this.accountMap;
            }
        },
        /*获取分组菜单信息*/
        getGroupMenuList : function(accountName,showSize) {
            var me = this;
            var groups = [];
            var groupsMenuList = [];
            var accountMap =me.getAccountMap();
            
            if (!accountName || accountName == "all") {
                if(!accountMap){
                    return;
                }
                var accountKeys = Object.keys(accountMap);
                var accountIndex = 0;
                accountKeys.forEach(function(accountKey) {
                    accountIndex++;
                    var account = accountMap[accountKey];
                    var curGroupList = _.map(account["groupList"], function(groupItem) {//account下的分组信息
                        return {
                            index : groupItem.groupId,
                            accountName : groupItem.accountName,
                            value : groupItem.groupId,
                            type : "checkbox",
                            label : "<span class='g-group-filter-word te'>"+(groupItem.groupId<0?i18nDi.fillDomText('contact.notassigened'):groupItem.groupName) + "</span>" + (showSize?("<span class='g-group-filter-num'>("+groupItem.groupSize+")</span>"):"")
                        }
                    });
                    
                    groupsMenuList = groupsMenuList.concat([{//分割条
                        type : "sp"
                    }]).concat([{//account信息
                        index : "account_"+accountIndex,
                        accountName : accountKey,
                        value : accountKey,
                        type : "label",
                        label : accountKey=='phone'?i18nDi.fillDomText('common.phoneText'):accountKey
                    }]).concat(curGroupList);
                    accountIndex++;
                });
            } else {
                groups = (me.accountMap[accountName] && me.accountMap[accountName].groupList) || [];
                groupsMenuList = _.map(groups, function(groupItem) {
                    return {
                        index : groupItem.groupId,
                        accountName : groupItem.accountName,
                        value : groupItem.groupId,
                        type : "checkbox",
                        label : "<span class='te g-group-filter-word'>"+(groupItem.groupId<0?i18nDi.fillDomText('contact.notassigened'):groupItem.groupName) + "</span>" + (showSize?"<span class='g-group-filter-num'>("+groupItem.groupSize+")</span>":"")
                    }
                });
                groupsMenuList=[{//分割条
                        type : "sp"
                    }].concat(groupsMenuList);
            }
            return groupsMenuList;
        },
        /*获取账号菜单信息*/
        getAccountMenuList : function() {
            var me = this;
            var accountMap = this.getAccountMap();
            var accountMenuList = _.map(accountMap, function(accountItem, index) {
                return {
                    accountName : accountItem.accountName,
                    index : index,
                    label : accountItem.accountName=='phone'?i18nDi.fillDomText('common.phoneText'):accountItem.accountName,
                    type : "checkbox",
                    value : index
                }
            });
            return accountMenuList;
        },
        parse : function(res) {
            this.clear();
            this.workrunning = false;
            var contactList = (res.info && res.info.contactList) || [];
            console.log("取联系人结果============");
            console.log(res);
            this.accountMap=_.extend({});
            var me = this;
            this.list = contactList;
            var accountList = res.info && res.info.accountList || [];
            for (var i = 0; i < accountList.length; i++) {
                this.accountMap[res.info.accountList[i].accountName] = res.info.accountList[i];
            }
            this.defaultAccount = "phone";
            this.responsed = true;
            this.trigger("fetch_ok");
            return this.list;
        },
        /*
         * 更新第三放应用数据列表
         */
        refresh : function() {
            /*如果请求已经发出但是没有得到响应，禁止提交，阻止重复刷新*/
            if (this.requested == true && this.responsed == false) {
                return;
            } else {
                this.requested = true;
                this.responsed = false;
                this.models.length = 0;
                this.list=[];
                this.clear();
                this.fetch(apiNames.REQ_ALL_CONTACT_INFO);
            }
        },
        searchContact : function(opts, callback) {
            var me = this;
            if (!this.worker) {
                this.worker = new Worker(module.dirname + "/ContactWorker.js");
            }
            this.worker.postMessage({
                todo : "searchContact",
                contactList : me.list,
                sDisplayName : opts.sDisplayName,
                sContactNumber : opts.sContactNumber
            });
            this.worker.onmessage = function(message) {
                if (message.data.action == "searchContact") {
                    var searchResult = message.data.contactList;
                    callback && callback(searchResult);
                }
            }
        },
        /*多线程补充联系人分组列表*/
        calculateGroup : function() {
            var me = this;
            if (!this.worker) {
                this.worker = new Worker(module.dirname + "/ContactWorker.js");
            }
            if(this.list.length>0&&this.accountMap&&!this.workrunning){
                console.log("group计算==================");
                console.log(this.accountMap);
                 this.workrunning = true;
                 this.worker.postMessage({
                    todo : "calGroups",
                    accountMap : this.accountMap,
                    contactList : this.list
                });               
            }

            this.worker.onmessage = function(message) {
                if (message.data.action == "calGoups") {
                    this.workrunning = false;
                    var contactIds = Object.keys(message.data.groupMap);
                    _.each(contactIds, function(sContactId) {
                        if (me.getModelById("genie_contact_" + sContactId)) {
                            me.getModelById("genie_contact_" + sContactId).set("sGroup", message.data.groupMap[sContactId]["sGroup"]);
                            me.getModelById("genie_contact_" + sContactId).set("accountName",message.data.groupMap[sContactId]["accountName"]||'phone');
                        }
                    });
                    me.trigger("fetch_group_ok");
                }

            }
        },
        /*多线程获取短信列表*/
        parseSmsThread : function() {
            var me = this;
            if (!this.worker) {
                this.worker = new Worker(module.dirname + "/ContactWorker.js");
            }
            this.worker.postMessage({
                todo : "parseSms",
                smsList : this.smsList
            });
            this.worker.onmessage = function(message) {
                if (message.data.action == "parseSms") {
                    me.smsMap = message.data.smsMap;
                }
            }
        },
        /*for new contact by liujintao*/
        addContact : function(data, callback) {
            console.log("addContact");
            var me = this;
            var accountMap = me.getAccountMap();
            var accountName = data.accountName||"phone";
             
            if(!data.groupIds||data.groupIds.length<1||data.groupIds.indexOf(0)>-1){
                accountMap[accountName].groupList.forEach(function(group){
                     if(group.groupId<0){
                         data.groupIds =[group.groupId];
                     }
                });
            }
            app.dal.request({
                action : apiNames.REQ_CONTACT_ADD,
                paras : _.extend({   
                        accountName : "phone",
                        sDisplayName : "",
                        sNote : "",
                        sContactNumber : [],
                        sContactEmail : []           
                },data),
                callback : function(res) {
                    console.log("add contact callback in model:");
                    console.log(res);
                        if (res.status == 1) {
                            if (!me.getModelById("genie_contact_" + res.sContactId)) {
                                var contactData = _.extend({}, {
                                    accountName : data.accountName || "phone",
                                    readOnly:data.isSim||false,
                                    sContactId : res.info.sContactId,
                                    sDisplayName : data.sDisplayName,
                                    sContactIcon : data.sContactIcon || "common/images/ico/default-avatar.png",
                                    sNote : data.sNote || "",
                                    sContactNumber : data.sContactNumber || [],
                                    sContactEmail : data.sContactEmail || []
                                });
                                var contactItemModel = new Model(contactData);
                                var sGroup =[];
                                for(var accountName in me.accountMap){
                                    if(accountName!=""&&data.groupIds){
                                        me.accountMap[accountName].groupList.forEach(function(group){
                                            if(data.groupIds.indexOf(Number(group.groupId))>-1||data.groupIds.indexOf(group.groupId+"")>-1){
                                                sGroup.push({
                                                    groupId:group.groupId,
                                                    groupName:group.groupName
                                                });
                                                group.groupSize+=1;
                                                contactItemModel.set("accountName",accountName);
                                            }
                                        });
                                    }else{
                                        
                                    }
                                }
                                contactItemModel.set("sGroup",sGroup);
                                me.list.push(contactItemModel.data);
                                me.push(contactItemModel);
                                me.setModeltoFirst(contactItemModel);
                                me.trigger('update',{type:"add",model:contactItemModel});
                                callback && callback({
                                    result : true,
                                    model : contactItemModel
                                });
                            }
                        } else {
                            callback && callback({
                                result : false,
                                model : null,
                                code:res.code
                            });
                        }
                }
            });
        },
        updateContact : function(data, callback) {
            console.log("update contact");
            console.log(data);
            var me = this;
            var accountMap = me.getAccountMap();
            var accountName = data.accountName||"phone";
			
            
            if(!data.groupIds||data.groupIds.length<1||data.groupIds.indexOf(0)>-1){
				data.groupIds=[];
				var groupList = accountMap[accountName].groupList;
                for(i=0;i<groupList.length;i++){
					 console.log(groupList[i]);
                     if(groupList[i].groupId<0){
                         data.groupIds=[groupList[i].groupId];
                     }
                }
            }
            app.dal.request({
                action : apiNames.REQ_CONTACT_UPDATE,
                paras :  _.extend({   
                        sContactId :0 ,
                        sDisplayName : "",
                        sNote : "",
                        sContactNumber : [],
                        sContactEmail : []     
                },data),
                callback : function(res) {
                    if(res.status==1){
                        var contactItemModel = me.getModelById("genie_contact_"+res.info.sContactId);
                        var accountName =contactItemModel.get("accountName")||'phone';
                        var oldGroups = contactItemModel.get("sGroup");
                           try{
                            //重新计算分组
                                me.accountMap[accountName].groupList.forEach(function(group){
                                     if(oldGroups){
                                         for(var i=0;i<oldGroups.length;i++){
                                           if(oldGroups[i].groupId ==Number(group.groupId)||(oldGroups[i].groupId<0&&group.groupId<0)){
                                               if(group.groupSize>0){
                                                   group.groupSize-=1;
                                               }
                                            }
                                         }
                                     }
                               });                 
                                var sGroup =[];
                                contactItemModel.data=_.extend(contactItemModel.data,data);
                                console.log(contactItemModel);
                                console.log(me.accountMap[accountName]);
                                    if(accountName!=""&&data.groupIds){
                                        me.accountMap[accountName].groupList.forEach(function(group){
                                            if(data.groupIds.indexOf(Number(group.groupId))>-1||data.groupIds.indexOf(group.groupId+"")>-1){
                                                sGroup.push({
                                                    groupId:group.groupId,
                                                    groupName:group.groupName
                                                });
                                                group.groupSize+=1;
                                                contactItemModel.set("accountName",accountName);
                                            }
                                        });
                                    }
                                  contactItemModel.set("sGroup",sGroup);                                               
                            }catch(e){
                                utils.log.out("error in update");
                                console.log(e);
                            }

                        me.trigger("update",{type:"modify",model:contactItemModel});
                        callback&&callback({
                                    result : true,
                                    model : contactItemModel
                                });
                    }else{
                        callback&&callback({
                                    result : false,
                                    model : null,
                                    code:res.code
                                });                        
                    }
                }
            });
        },
        importContacts : function(path,callback) {
            console.log("importContacts");
            var me = this;
            app.dal.request({
                action : apiNames.REQ_CONTACT_IMPORT,
                paras : {
                    localPath : path
                },
                callback : function(res) {
                    if(res.info&&res.code!=-6&&res.code!=-5&&res.code!=-4&&res.code!=-7&&!res.type){
                        me.trigger("doing",res.info.index,res.info.count,res.info.sContactId,res.status==1?true:false);
                    }
                    callback && callback(res);
                }
            });
        },
        exportContacts : function(data, path, callback) {
            app.dal.request({
                action : apiNames.REQ_CONTACT_EXPORT,
                paras : _.extend({
                    localPath : path,
                    sContactIds : data
                }),
                callback : function(res) {
                    console.log(res);
                    callback && callback(res);
                }
            });
        },
        deleteContacts : function(data, callback) {
            var me = this;
            var counter =0;
            var total = data.sContactIds.length;
            var seperator = data.sContactIds.length>500?50:10;
            var idsTemp=[];
            app.dal.request({
                action : apiNames.REQ_CONTACT_DELETE,
                paras : data,
                callback : function(res) {
                    console.log("删除联系人的回调");
                    console.log(res);
                    counter++;
                    var curModel = me.getModelById("genie_contact_" + res.info.sContactId);
                        if (res.status == 1) {
                            idsTemp.push(res.info.sContactId);
                            try{
                            //重新计算分组
                                me.accountMap[curModel.get("accountName")].groupList.forEach(function(group){
                                     if(curModel.get("sGroup")){
                                         var sGroups =curModel.get("sGroup");
                                         for(var i=0;i<sGroups.length;i++){
                                           if(sGroups[i].groupId ==Number(group.groupId)||(sGroups[i].groupId<0&&group.groupId<0)){
                                               if(group.groupSize>0){
                                                   group.groupSize-=1;
                                               }
                                            }
                                         }
                                     }
                               });                                 
                            }catch(e){}
        
                                me.trigger("doing",counter,total,res.info.sContactId,true);

                                if (curModel) {
                                    var temp = curModel;
                                    temp.data.isDeleteContact = true
                                    me.trigger("fetch_group_ok", temp);
                                    me.remove(curModel,{trigger: false});
                                    if(counter%seperator==0||counter==total){
                                        me.trigger("update",{type:"remove",ids:idsTemp});
                                        idsTemp=[];
                                    }
                                }
                        }else{
                            me.trigger("doing",counter,total,-1,false);
                        }
                        if(counter==total){
                            callback && callback({result:true}); 
                        }
                        if(res.lastone==1){
                            me.trigger("update");
                            callback&&callback({result:true});
                        }
                       
                }
            });
        },
        /*更新联系人分组*/
        updateContactGroup : function(data, callback) {
            console.log("updateContactGroup");
            app.dal.request({
                action : apiNames.REQ_CONTACT_Groups_UPDATE,
                paras :  data,
                callback : function(res) {
                    callback && callback(res);
                }
            });
        },
        /*添加联系人组*/
        addContactGroup : function(data, callback) {
            console.log("addContactGroup");
            app.dal.request({
                action : apiNames.REQ_CONTACT_Groups_ADD,
                paras : data,
                callback : function(res) {
                    callback && callback(res);
                }
            });
        },
        /*删除联系人组*/
        deleteContactGroup : function(data, callback) {
            console.log("deleteContactGroup");
            app.dal.request({
                action : apiNames.REQ_CONTACT_Groups_DELETE,
                paras : data,
                callback : function(res) {
                    callback && callback(res);
                }
            });
        }
    });
    var collection_single = new Collection();
    exports.getDataStructure = getDataStructure;
    exports.getPhoneTypes = getPhoneTypes;
    exports.getEmailTypes = getEmailTypes;
    exports.Model = Model;
    exports.Collection = function() {
        if (!collection_single.requested && !collection_single.responsed) {
            collection_single.refresh();
        }
        collection_single.on("fetch_ok",function(){
                collection_single.calculateGroup();
        });
        collection_single.on("update", function() {
            if (collection_single.requested && collection_single.responsed) {
               // collection_single.calculateGroup();
               // collection_single.parseSmsThread();
            }
        });
        return collection_single;
    }
});
