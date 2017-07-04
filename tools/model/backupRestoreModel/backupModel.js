define('backupModel', function(require, exports, module){
    var app = require('app');
    var gridModel = require('gridModel');
    var utils = require('utils');
    var apiNames = require('APINames');
    var _ = require('underscore');
    
    var Model = gridModel.Model.extend({});
    
    var Collection = gridModel.Collection.extend({
        model: Model,
        isRequest: false,
        isResponse: false,
       
        parse: function(res){
        },
        
        refresh: function(){
            this.clear();
        },

        callSysFolderDialog: function(args, callback){
            console.log("backup >> call system save popup, args is", args);
            app.dal.request({
                action : apiNames.REQ_POPUO_SAVE_DIALOG,
                paras : args,
                callback : function(res) {
                    console.log("backup >> call system save popup response is", res);
                    callback && callback(res);
                }
            });
        },

        getLastBackupTime: function(args, callback){
            // console.log("backup >> get last back up time, args is", args);
            // app.dal.request({
            //     action : apiNames.REQ_POPUO_SAVE_DIALOG,
            //     paras : args,
            //     callback : function(res) {
            //         console.log("backup >> get last back up time response is", res);
            //         callback && callback(res);
            //     }
            // });
            return new Date().format("dd/MM/yyyy hh:mm:ss");            
        },

        getDefaultBackupPath: function(args, callback){
            console.log("backup >> get default backup path, args is", args);
            app.dal.request({
                action : apiNames.REQ_DEFAULT_BACKUP_PATH,
                paras : args,
                callback : function(res) {
                    console.log("backup >> get default backup path response is", res);
                    callback && callback(res);
                }
            });         
        },

        setCustomBackupPath: function(args, callback){
            console.log("backup >> set custom backup path, args is", args);
            app.dal.request({
                action : apiNames.REQ_SET_BACKUP_PATH,
                paras : args,
                callback : function(res) {
                    console.log("backup >> set custom backup path response is", res);
                    callback && callback(res);
                }
            });          
        },

        startBackup: function(args, callback){
            console.log("backup >> start backup, args is", args);
            app.dal.request({
                action : apiNames.REQ_START_BACKUP,
                paras : args,
                callback : function(res) {
                    console.log("backup >> start backup response is", res);
                    callback && callback(res);
                }
            });
        },

        initInfoCount: function(){
            var data = {
                    "contact": {"count": "","size": ""},
                    "message": {"count": "","size": ""},
                    "picture": {"count": "","size": ""},
                    "app": {"count": "","size": ""},
                    "music": {"count": "","size": ""},
                    "video": {"count": "","size": ""}
                };
            var allInfoKeys = Object.keys(data);
            for (var i = 0; i < allInfoKeys.length; i++){
                var model = new Model({
                    type: allInfoKeys[i],
                    count: data[allInfoKeys[i]].count,
                    size: data[allInfoKeys[i]].size,
                });
                this.push(model);
            }
        },

        getInfoCount: function(args, callback){
            console.log("备份 >> get info number, args is", args);
            app.dal.request({
                action : apiNames.REQ_BACKUP_INFO_NUM,
                paras : args,
                callback : (function(data) {
                    console.log("备份 >> get info number response is", data);
                    var allInfoKeys = Object.keys(data.info);
                    // for (var i = 0; i < allInfoKeys.length; i++){
                    //     data.info[allInfoKeys[i]].count = 1
                    // }
                    for (var i = 0; i < allInfoKeys.length; i++){
                        for (var k = 0; k < this.models.length; k++){
                            if (this.models[k].data.type === allInfoKeys[i]){
                                this.models[k].data.count = data.info[allInfoKeys[i]].count;
                                this.models[k].data.size = data.info[allInfoKeys[i]].size;
                                console.log(this.models[k].data.count + "=" + data.info[allInfoKeys[i]].count);
                                break;
                            }
                        }
                    }
                    this.trigger("update");
                    callback && callback(data);
                }).bind(this)
            }); 
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

        //============= restore ================
        getDefaultRestoreInfo: function(args, callback){
            var me = this;
            console.log("restore >> get info restore, args is", args);
            app.dal.request({
                action : apiNames.REQ_DEFAULT_RESTORE_INFO,
                paras : args,
                callback : function(res) {
                    console.log("restore >> get info restore response is", res);
                    callback && callback(res);
                }
            }); 
            // var data = {
            //     "fileName": "Motorola_ME525_20140309_152319",
            //     "backupTime": new Date().format("dd/MM/yyyy hh:mm:ss"),
            //     "contact": {"count": 150,"size": ""},
            //     "message": {"count": 151,"size": ""},
            //     "callRecord": {"count": 152,"size": ""},
            //     "app": {"count": 153,"size": ""},
            //     "picture": {"count": 154,"size": "100MB"},
            //     "music": {"count": 155,"size": "200M"},
            //     "video": {"count": 156,"size": "3GB"}
            // }
            // var temp = [];
            // for (var i = 0; i < 10; i++){
            //     temp.push(data);
            // }
            // this.defaultRestoreInfo = temp;
        },

        startRestore: function(args, callback){
            console.log("backup >> start RESTORE, args is", args);
            app.dal.request({
                action : apiNames.REQ_START_RESTORE,
                paras : args,
                callback : function(res) {
                    console.log("backup >> start RESTORE response is", res);
                    callback && callback(res);
                }
            });
        },

        sortDate: function(list){
            var flag = 0;
            var temp;
            for (var i = 0; i < list.length - 1; i++){
                flag = 0;
                for (var j = 0; j < list.length - 1; j++){
                    dateFirStr = list[j].backupTime;
                    dateSecStr = list[j + 1].backupTime;
                    var dateFir = parseInt(dateFirStr);
                    var dateSec = parseInt(dateSecStr);
                    if (dateFir < dateSec){
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
        }
    });
    
    exports.Model = Model;
    exports.Collection = Collection;
});