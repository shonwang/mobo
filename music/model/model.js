define('musicModel', function(require, exports, module) {
    var app = require('app');
    var gridModel = require('gridModel');
    var utils = require('utils');
    var apiNames = require('APINames');
    var _ = require("underscore");
    var taskModel = require("taskModel");
    var connectionMgr = require("connectionMgr");
    var   $ = require('jquery');

    var Model = gridModel.Model.extend({
        init : function(opts) {
            this.id = "genie_music_" + opts.id
        },
        canPlay:function(){
            this.playExtList=["mp3","m4a","ogg","wav"];
            if(this.playExtList.indexOf(utils.getExtension(this.get("sMusicRemotePath")).toLowerCase())>-1){
                return true;
            }else {
                return false;
            }
        },
    });
    /*Music数据集合*/
    var Collection = gridModel.Collection.extend({
        model : Model,
        requested : false,
        responsed : false,
       
        init : function() {
            var me = this;
             this.importing = false,
            taskModel.completeCollection.off("import", this.onImportMusicDone);
            taskModel.completeCollection.on("import", $.proxy(this.onImportMusicDone, this));


             taskModel.completeCollection.on("setringtone", function(result) {
                if (me.importing==false&&result.success&&result.data.mediaId) {
                    if(me.getModelById("genie_music_"+result.data.mediaId)){
                        return;
                    }
                   me.push(new Model(_.extend(result.data,{id:result.data.mediaId})));
                   me.trigger("update");
                }
            });
        },

        onImportMusicDone: function(result) {
            console.log("result:",result);
            if (result.type == taskModel.taskType.IMPORT_MUSIC&&this.importing==false&&result.success&&result.data.mediaId) {
                if(this.getModelById("genie_music_"+result.data.mediaId)){
                    return;
                }
               this.push(new Model(_.extend(result.data,{id:result.data.mediaId})));
               this.trigger("update");
            }
        },

        parse : function(res) {
            console.log('musicList==', res);
            console.log(res);
            var list = res.info;
            this.responsed = true;
            if (list) {
                list = list.sort(function(m1, m2) {
                    return m1['sMusicName'].localeCompare(m2['sMusicName']);
                });
            }

            return list;
        },

        /*
         * 更新短信列表
         */
        refresh : function() {
            /*避免重复刷新*/
            console.log("requested:" + this.requested + ";responsed:" + this.responsed);
            if (this.requested == true && this.responsed == false) {
                return;
            } else {
                this.requested = true;
                this.responsed = false;
                this.stopProcess = false;
                this.clear();
                this.fetch(apiNames.REQ_ALL_MUSIC_INFO);
            }

        },
        sort : function(key, asc) {
            this.models = this.models.sort(function(m1, m2) {
                return asc ? m1.get(key).localeCompare(m2.get(key)) : -m1.get(key).localeCompare(m2.get(key));
            });
        },
        /*删除音乐*/
        proccessDelete : function(array, start, total) {
            var me = this;
            if (start > total || total == 0 || array.length == 0 || this.stopProcess == true) {
                this.stopProcess = false;
                return;
            }
            var curData = array.shift();
            var curNum = start;

            utils.logTime.start('deletemusic')

            //*********************************************************
            //20140924
            var successCount = 0
            //********************************************************* 
            //扩展名
            app.dal.request({
                action : apiNames.REQ_DELETE_MUSIC,
                paras : {
                    localPath : "",
                    fileName : curData.sMusicName.replace("\." + curData.ext, ""),
                    ext : utils.getExtension(curData.sMusicRemotePath),
                    id : curData.id,
                    remotePath : curData.sMusicRemotePath
                },
                callback : function(res) {
                    utils.log.out('DELETE_MUSIC_LOG:' + utils.logTime.end('deletemusic'));
                    curNum++;
                    if (res.code == "0" || res.status == "1") {
                        //*********************************************************
                        //20140924
                        successCount = successCount + 1;
                        //********************************************************* 
                        if (me.getModelById("genie_music_" + res.info.id)) {
                            me.remove(me.getModelById("genie_music_" + res.info.id));
                        }
                        me.trigger("doing", curNum, total, res.info.id, true);
                    } else {
                        me.trigger("doing", curNum, total, res.info.id, false);
                    }
                    if (!me.stopProcess) {
                        me.proccessDelete(array, curNum, total);
                    }
                    //*********************************************************
                    //20140924
                    if (curNum == total){
                        var logObject = {
                            page: "mymusic_home",
                            module: "menu",
                            action: "delete_result",
                            successnum: successCount,
                            failnum: total - successCount
                        }
                        utils.sendNewLog("1000120", logObject);             
                    }
                    //********************************************************* 
                }
            });
        },
        deleteMusic : function(data, callback) {
            //localPath 本地路径,为空不删除本地路径
            //id 视频id
            //remotePath 视频在sd卡上路径
            var me = this;
            me.proccessDelete(data, 0, data.length);
        },
        setStopProcess : function(flag,type) {
            this.stopProcess = flag;
            var stopAction;
            if(type&&type=="export"){
                stopAction=apiNames.REQ_GET_MUSIC_STOP_EXPORT;
            }else if(type&&type=="play"){
                stopAction=apiNames.REQ_GET_MUSIC_STOP_PLAY;
            }else if(type&&type=='import'){
                stopAction=apiNames.REQ_GET_MUSIC_STOP_IMPORT;
            }
            if(type&&flag){
                app.dal.request({
                    action:stopAction,
                    callback:function(res){
                        console.log("取消操作",res);
                    }
                });                
            }

        },
        /*播放音乐*/
        getPlayPath : function(data, callback) {
            app.dal.request({
                action : apiNames.REQ_GET_MUSIC_PLAY_PATH,
                paras : {
                    localPath : "",
                    fileName : data.fileName.replace("\." + data.ext, "").replace(/\./g, "") + "_" + data.id,
                    remotePath : data.remotePath,
                    ext : data.ext,
                    id : data.id
                },
                callback : function(res) {
                    console.log(res);
                    res.finish&&callback && callback({
                        result : res.status==1?true:false,
                        localPath : res.info.localPath,
                        id : res.info.id
                    });
                }
            });
        },
        /*导入音乐*/
        importMusic : function(callback) {
            var me = this;
            app.dal.request({
                action : apiNames.REQ_POPUP_SYSTEM_DIALOG,
                paras : {
                    MultiSel : 1,
                    MediaType : 'music',
                    Filter : '(*.mp3;*.ogg;*.m4a;*.aac;*.mid;*.wav;*.flac;*.wma;*.amr)|*.mp3;*.ogg;*.m4a;*.aac;*.mid;*.wav;*.flac;*.wma;*.amr'
                },
                callback : function(res) {
                    if(!connectionMgr.isConnect()){
                        return;
                    }
                    if (res.status !== 1) {
                        callback && callback(res);
                        return;
                    } else {
                        if (res.info && res.info.list) {
                            /*导入的任务总数*/
                            var total = res.info.list.length;
                           for(var i=0;i<res.info.list.length;i++){
                                if(res.info.list[i].status!=1){
                                    return;
                                }
                            }
                            var current = 0;
                            var importArrays = [];
                            me.importing=true;
                            res.info.list.forEach(function(file, index) {
                                importArrays.push({
                                    path : file.path,
                                    remotePath : "",
                                    size : utils.convertSizeToString(file.size),
                                    name : file.path.slice(file.path.lastIndexOf('\\') + 1)
                                });
                            });
                            //*********************************************************
                            //20140924
                            var successCount = 0
                            //********************************************************* 
                            taskModel.completeCollection.on("import", function(result) {
                                if (result.type == taskModel.taskType.IMPORT_MUSIC) {
                                    current++;
                                    result.data.id=result.data.mediaId;
                                    if(!me.getModelById("genie_music_"+result.data.id)){
                                        me.push(new Model(result.data));
                                    }
                                    //me.trigger("doing", current, total, result.data.id, result.success);
                                    callback && callback(result);
                                    //*********************************************************
                                    //20140924
                                    if (result.success){
                                        successCount = successCount + 1;
                                    }
                                    //*********************************************************
                                    if(current==total){
                                        me.importing=false;
                                        //*********************************************************
                                        //20140924
                                        var logObject = {
                                            page: "mymusic_home",
                                            module: "menu",
                                            action: "import_result",
                                            successnum: successCount,
                                            failnum: total - successCount
                                        }
                                        utils.sendNewLog("1000120", logObject);
                                        //********************************************************* 
                                    }
                                }
                            });
                            taskModel.batchImportMusic(importArrays);
                            //*********************************************************
                            //20140924
                            var logObject = {
                                page: "mymusic_home",
                                module: "menu",
                                action: "import",
                                totalnum: total
                            }
                            utils.sendNewLog("1000120", logObject);
                            //********************************************************* 
                            //forEach end
                        }//if end
                    }//else end
                }//callback end
            });
        },
        proccessExport : function(array, path, start, total) {
            var me = this;
            if (start > total || total == 0 || array.length == 0 || this.stopProcess == true) {
                this.stopProcess = false;
                return;
            }
            var curData = array.shift();
            var curNum = start;
            //扩展名
            var url = curData.sMusicRemotePath;
            var ext = url.substring(url.lastIndexOf(".") + 1, url.length);
            //*********************************************************
            //20140924
            var successCount = 0;
            //*********************************************************
            utils.logTime.start('exportmusic');
            app.dal.request({
                action : apiNames.REQ_EXPORT_MUSIC,
                paras : {
                    targetFolder : path,
                    remotePath : curData.sMusicRemotePath,
                    fileName : curData.sMusicName.replace("." + ext, "").replace(/\./g, "") + "." + ext,
                    localPath : path + curData.sMusicName.replace("." + ext, "").replace(/\./g, "") + "." + ext,
                    ext : ext,
                    id : curData.id
                },
                callback : function(res) {
                    utils.log.out('EXPORT_MUSIC_LOG:' + utils.logTime.end('exportmusic'));

                    if (res.code == "1" || res.status == "1") {
                        //*********************************************************
                        //20140924
                        successCount = successCount + 1;
                        //*********************************************************
                        
                        //正常状态下，并且是多个
                         if(res.finish&&total>1){
                            curNum++;
                            curData.localPath = res.info.localPath;
                            me.trigger("doing", curNum, total, curData, true);
                            me.proccessExport(array, path, curNum, total);
                        }else if(total==1){//仅有一个记录时按百分之计算
                            curData.localPath = res.info.localPath;
                            me.trigger("doing", res.percent/100, "1", curData, true);                           
                        }
                    } else {
                            curNum++;
                            me.trigger("doing", curNum, total, curData, false);
                            me.proccessExport(array, path, curNum, total);
                    }

                    //*********************************************************
                    //20140924
                    if (curNum == total){
                        var logObject = {
                            page: "mymusic_home",
                            module: "menu",
                            action: "export_result",
                            successnum: successCount,
                            failnum: total - successCount
                        }
                        utils.sendNewLog("1000120", logObject);
                    }
                    //*********************************************************
                    
                }
            });
        },
        /*导出音乐*/
        exportMusic : function(data, path, callback) {
            //*********************************************************
            //20140924
            var logObject = {
                page: "mymusic_home",
                module: "menu",
                action: "export",
                totalnum: data.length
            }
            utils.sendNewLog("1000120", logObject);
            //********************************************************* 
            var me = this;
            me.proccessExport(data, path, 0, data.length);
        },
        
        getModelPosition: function(model){
            var tasks = this.models;
            for(var i = 0; i < tasks.length; i++){
                var task = tasks[i];
                var id = task.get('id');
                if(id === model.get('id')){
                    return i;
                }
            }
        },

        getModelDataStructure : function() {
            var dataObj = {
                id : "",
                sMusicAlbumname : "music",
                sMusicArtist : "",
                sMusicComposer : "",
                sMusicDate : "",
                sMusicDuration : "",
                sMusicName : "",
                sMusicRemotePath : "",
                sMusicSize : "",
                sMusicThumbnailPath : ""
            };
            return dataObj;
        },
        /*设为铃音*/
        setMusicRingtone : function(data, callback) {
            var me = this;
            app.dal.request({
                action : apiNames.REQ_SET_RING_MUSIC,
                paras : _.extend({
                    name:"",
                    url:"",//在线设置铃音时传入此参数
                    localPath : "",
                    remotePath : "",
                    id : "",
                    type : "1"//设置类型 1 铃音，2 短信 3 闹铃
                }, data),
                callback : function(res) {
                    _.each(me.models, function(model) {
                        if (model.data.id != data.id) {
                            if (data.type == "1") {
                                model.set("isRing", false);
                            } else if (data.type == "2") {
                                model.set("isSms", false);
                            } else if (data.type == "4") {
                                model.set("isAlarm", false);
                            }
                        }
                    });
                    me.trigger("update");
                    callback && callback(res);
                }
            });
        }
    });

    var collection_single = new Collection();

    exports.Model = Model;
    exports.Collection = function() {
        if (!collection_single.requested && !collection_single.responsed) {
            collection_single.refresh();
        }
        return collection_single;
    }
});
