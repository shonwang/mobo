define('myBookModel', function(require, exports, module) {
    var app = require('app');
    var gridModel = require('gridModel');
    var utils = require('utils');
    var apiNames = require('APINames');
    var _ = require("underscore");
    var taskModel = require("taskModel");
    var connectionMgr = require("connectionMgr");
    
    var Model = gridModel.Model.extend({
        init : function(opts) {
            this.id = "genie_book_" + opts.id;
        }
    });
    /*Book数据集合*/
    var Collection = gridModel.Collection.extend({
        model : Model,
        requested : false,
        responsed : false,
       
        init : function() {
            var me = this;
             this.importing = false,
            taskModel.completeCollection.off("importBook");
            taskModel.completeCollection.on("importBook", function(result) {
                if (result.type == taskModel.taskType.IMPORT_BOOK&&result.success) {
                    console.log("导入电子书 成功result:",result.data);
                    if(me.getModelById("genie_book_"+result.data.sBookId)){
                        return;
                    }
                    result.data.id=result.data.sBookId;
                   me.push(new Model(result.data));
                   me.trigger("update");
                }
            });
        },
        /**
         * sBookExt: "txt"
            sBookName: "EmailID.txt"
            sBookRemotePath: "/mnt/sdcard/mobogenie/Ebook"
            sBookSize: "379"
            sBookTime: "2014-07-15 16:33"
         *  */
        parse : function(res) {
            this.responsed = true;
            console.log(res.info);
            return res.info;
        },
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
                this.fetch(apiNames.REQ_ALL_BOOK_INFO);
            }

        },
        sort : function(key, asc) {
            this.models = this.models.sort(function(m1, m2) {
                return asc ? m1.get(key).localeCompare(m2.get(key)) : -m1.get(key).localeCompare(m2.get(key));
            });
        },
        setStopProcess : function(flag,type) {
            this.stopProcess = flag;
            var stopAction;
            if(type&&type=="export"){
                stopAction=apiNames.REQ_GET_BOOK_STOP_EXPORT;
            }else if(type&&type=="play"){
                stopAction=apiNames.REQ_GET_BOOK_STOP_PLAY;
            }else if(type&&type=='import'){
                stopAction=apiNames.REQ_GET_BOOK_STOP_IMPORT;
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
        /*删除书籍*/
        proccessDelete : function(array, start, total) {
            var me = this;
            if (start > total || total == 0 || array.length == 0 || this.stopProcess == true) {
                this.stopProcess = false;
                return;
            }
            var curData = array.shift();
            var curNum = start;
            //扩展名
            app.dal.request({
                action : apiNames.REQ_DELETE_BOOK,
                paras : {
                    sBookName : curData.sBookName,
                    id : curData.sBookId
                },
                callback : function(res) {
                    curNum++;
                    if (res.status == "1") {
                        if (me.getModelById("genie_book_" + res.info.id)) {
                            me.remove(me.getModelById("genie_book_" + res.info.id));
                        }
                        me.trigger("deleting", curNum, total, res.info.id, true);
                    } else {
                        me.trigger("deleting", curNum, total, res.info.id, false);
                    }
                    if (!me.stopProcess) {
                        me.proccessDelete(array, curNum, total);
                    }
                }
            });
        },
        deleteBook : function(data, callback) {
            //sBookName 本地路径,为空不删除本地路径
            //id bookId
            var me = this;
            me.proccessDelete(data, 0, data.length);
        },
        /*导入电子书*/
        importBook : function(callback) {
             var me = this;
            app.dal.request({
                action : apiNames.REQ_POPUP_SYSTEM_DIALOG,
                paras : {
                    MultiSel : 1,
                    MediaType : 'book',
                    Filter : '(*.txt;*.pdf;*.epub;*.mobi)|*.txt;*.pdf;*.epub;*.mobi'
                },
                callback : function(res) {
                    console.log("导入电子书选择文件：",res);
                    if(!connectionMgr.isConnect()){
                        return;
                    }
                    if (res.status !== 1) {
                        callback && callback(res);
                        return;
                    } else {
                        if (res.info && res.info.list) {
                          for(var i=0;i<res.info.list.length;i++){
                                if(res.info.list[i].status!=1){
                                    return;
                                }
                            }                            
                            /*导入的任务总数*/
                            var total = res.info.list.length;
                            var current = 0;
                            var importArrays = [];
                            me.importing=true;

                            //*********************************************************
                            //20140924
                            var logObject = {
                                page: "mybooks_home",
                                module: "menu",
                                action: "import",
                                totalnum: total
                            }
                            utils.sendNewLog("1000120", logObject);
                            //********************************************************* 

                            res.info.list.forEach(function(file, index) {
                                importArrays.push({
                                    path : file.path,
                                    remotePath : "",
                                    size : utils.convertSizeToString(file.size),
                                    name : file.path.substring(file.path.lastIndexOf('\\') + 1)
                                });
                            });

                            //*********************************************************
                            //20140924
                            var successCount = 0
                            //********************************************************* 

                            taskModel.completeCollection.off("importBook").on("importBook", function(result) {
                                if (result.type == taskModel.taskType.IMPORT_BOOK&&result.success) {
                                    current++;
                                    if(!me.getModelById("genie_book_"+result.data.sBookId)){
                                        result.data = _.extend(result.data,{id:result.data.sBookId});
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
                                            page: "mybooks_home",
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
                            taskModel.batchImportBook(importArrays);
                            //forEach end
                        }//if end
                    }//else end
                }//callback end
            });
        },
        openBook:function(paras,callback){
            app.dal.request({
                action : apiNames.REQ_OPEN_EBOOK,
                paras : {
                    sBookName : paras.sBookName,
                    targetFolder : paras.localPath||""
                },
                callback : function(res) {
                    callback&&callback(res);
                }
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
            var url = curData.name;
            app.dal.request({
                action : apiNames.REQ_EXPORT_BOOK,
                paras : {
                    targetFolder : path,
                    sBookName : curData.sBookName
                },
                callback : function(res) {
                    if (res.status == "1") {
                        //正常状态下，并且是多个
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
                }
            });
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

        /*导出音乐*/
        exportBook : function(data, path, callback) {
            //*********************************************************
            //20140924
            var logObject = {
                page: "mybooks_home",
                module: "menu",
                action: "export",
                totalnum: data.length
            }
            utils.sendNewLog("1000120", logObject);
            //********************************************************* 
            var me = this;
            me.proccessExport(data, path, 0, data.length);
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
