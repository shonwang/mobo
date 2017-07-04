/**
 * @author liujintao
 * @descript 文件浏览器Model
 * @since 2014-03-13
 */
define("FileManagerModel", function(require, exports, module) {
    var app = require("app");
    var gridModel = require("gridModel");
    var _ = require("underscore");
    var $ = require("jquery");
    var utils = require("utils");
    var UIDialog = require('UIDialog');
    var apiNames = require('APINames');
    /*国际化字典工具*/
    var i18nDi = require('I18NDI');
    var fileTypes = {
        TYPE_DIR : -1,
        TYPE_VIDEO : 3,
        TYPE_RINGTONE : 4,
        TYPE_WALLPAPER : 5,
        TYPE_BOOK : 6,
        TYPE_APP : 7,
        TYPE_OTHER : 10,
    };
    var Model = gridModel.Model.extend({
        init : function(opts) {
            this.id = "genie_file_" + opts.id;
            var modifiedData = new Date(opts.modifiedTime);
            opts.realModifiedTime = (modifiedData.getDate() >=10?modifiedData.getDate():("0"+modifiedData.getDate()))
            + "/" + ((Number(modifiedData.getMonth()) + 1)>=10?(Number(modifiedData.getMonth()) + 1):("0"+(Number(modifiedData.getMonth()) + 1)))
            + "/" + modifiedData.getFullYear() 
            + " " + (modifiedData.getHours() >= 10 ? modifiedData.getHours() : ("0" + modifiedData.getHours())) 
            + ":" + (modifiedData.getMinutes() >= 10 ? modifiedData.getMinutes() : ("0" + modifiedData.getMinutes()));
            if (opts.type != 0 && opts.type != 1 && opts.type != 2 && !opts.isDirectory) {
                opts.realSize = utils.convertSizeToString(opts.size);
            } else {
                opts.realSize = opts.size;
            }
            if (opts.type == 0) {
                opts.name = "SDCard";
            } else if (opts.type == 1) {
                opts.name = "External SDCard";
            } else if (opts.type == 2) {
                opts.name = "Device";
            }
        }
    });
    var Collection = gridModel.Collection.extend({
        model : Model,
        requested : false,
        responsed : false,
        init:function(opts){
            Collection.__super__.init.apply(this,arguments);
            this.rememberReplace=false;
            this.rememberReplaceType=-1;
        },
        parse : function(res) {
            this.responsed = true;
            return res.info.list;
        },
        refresh : function() {
            this.stopProcess = false;
            this.requested = true;
            this.responsed = false;
        },
        getModelByPath : function(remotePath) {
            var model;
            for (var i in this.models) {
                if (this.models[i].remotePath == remotePath) {
                    model = this.models[i];
                    break;
                }
            }
            return model;
        },
        openFile:function(data,callback){
            app.dal.request({
                action : apiNames.REQ_OPEN_FILE,
                paras : {
                    remotePath : data.remotePath,
                    isDirectory : data.isDirectory//类型 文件夹或文件
                },
                callback:function(res){
                    callback&&callback(res);
                }
               });            
        },
        hasChildDir:function(nodeData){
            for(var i=0;i<this.models.length;i++){
                if ((this.models[i].get("parentId") == nodeData.id) && this.models[i].get("isDirectory")) {
                    this.getModelById("genie_file_"+nodeData.id).set("hasChildDir",true);
                    return true;
                  }                
            }
            this.getModelById("genie_file_"+nodeData.id).set("hasChildDir",false);
            return false;
        },
        /**
         * @descript 判断当前
         * @param fullRemotePath远程地址
         * */
        hasExistFile:function(fullRemotePath){
            for(var i=0;i<this.models.length;i++){
                if(this.models[i].get("remotePath")==fullRemotePath){
                    return true;
                }
            }
            return false;
        },
        /*删除文件，传入id和path，type*/
        proccessDelete : function(array, start, total) {
            var me = this;
            if (start > total || total == 0 || array.length == 0||this.stopProcess == true){
                return;
            }
            var curData = array.shift();
            var curNum = start;
            app.dal.request({
                action : apiNames.REQ_FILE_DEL_NODE,
                paras : {
                    remotePath : curData.remotePath,
                    isDirectory : curData.isDirectory//类型 文件夹或文件
                },
                callback : function(res) {
                    curNum++;
                    if (res.status == 1) {
                        console.log(JSON.stringify(res.info));
                        console.log(me.getModelById("genie_file_" + res.info.id));
                        var modelDel=new Model(me.getModelById("genie_file_" + res.info.id).data);
                        if (modelDel) {
                            me.remove(me.getModelById("genie_file_" + res.info.id),{trigger:false});
                        }
                        me.models.forEach(function(model) {
                            //如果遍历的当前model是删除节点的父节点，size-1
                            if ((model.get("id") == curData.parentId) && model.get("isDirectory")) {
                                var realSize = Number(model.get("realSize")) - 1;
                                model.set("realSize", realSize);
                            }
                            //如果遍历的当前节点是删除节点的子节点
                            if(model.get("parentId")==curData.id){
                                me.remove(model,{trigger:false});
                            }
                        });
                        if(me.getModelById("genie_file_"+curData.parentId)){
                            if(me.hasChildDir(me.getModelById("genie_file_"+curData.parentId).data)){
                                me.getModelById("genie_file_"+curData.parentId).set("hasChildDir",true);
                            }else{
                                me.getModelById("genie_file_"+curData.parentId).set("hasChildDir",false);
                            }
                        }
                        me.trigger("update",{type:"remove",model:modelDel});
                        me.trigger("deleting", curNum, total, res.info, true);
                    } else {
                        me.trigger("deleting", curNum, total, res.info, false);
                    }
                    me.proccessDelete(array, curNum, total);
                }
            });
        },
        deleteFile : function(data) {
            this.proccessDelete(data, 0, data.length);
        },
        exportOneFile : function(data, path, callback) {
            app.dal.request({
                action : apiNames.REQ_FILE_EXPORT,
                paras : {
                    remotePath : data.remotePath,
                    destPath : path,
                    parentId : data.id,
                    isDirectory : data.isDirectory
                },
                callback : function(res) {
                    callback && callback(res);
                }
            });
        },
        proccessExport : function(array, path, start, total) {
            var me = this;
            if (start > total || total == 0 || array.length == 0|| this.stopProcess == true) {
                 me.rememberReplace=false;
                 me.rememberReplaceType=-1;
                return;
            }
            var curData = array.shift();
            var curNum = start;
            //检测是否已经存在start
            app.dal.request({
                action : apiNames.REQ_CHECK_FILE_EXIST_PC,
                paras : {
                    path : path + curData.name,
                },
                callback : function(resfile) {
                    if (resfile.status&&me.rememberReplaceType==-1) {
                        //确认覆盖弹窗
                        var confirmDlg = new UIDialog({
                            buttonKey : 3, //1双按钮，2有ok按钮
                            title:'common.Export',
                            isTitleKey: true,
                            contentConfig : {
                                i18nValues : ["fileManager.confirmFileReplace",curData.name]
                            },
                            hasRememberCheck:total>1?true:false
                        });
                        confirmDlg.show();
                        confirmDlg.on("yes", function() {
                            if(me.rememberReplace){
                                me.rememberReplaceType=1;
                            }
                            me.exportOneFile(curData, path, function(res) {
                                if (total == 1) {
                                    me.trigger("exporting", res.percent / 100, total, {id:curData.id,localPath:res.info.localPath,name:res.info.name||res.reasonIfFail}, res.status == 1 ? true : false);
                                } else {
                                    if (res.finish) {
                                        me.trigger("exporting", curNum + 1, total, {id:curData.id,localPath:res.info.localPath,name:res.info.name||res.reasonIfFail}, res.status == 1 ? true : false);
                                    }
                                }
                                if (res.finish) {
                                    curNum++;
                                    me.proccessExport(array, path, curNum, total);
                                }
                            });
                        });
                        confirmDlg.on("cancel", function() {
                            curNum++;
                            me.trigger("exporting", curNum, total, null, true);
                            if(me.rememberReplace){
                                me.rememberReplaceType=0;
                            }
                            me.proccessExport(array, path, curNum, total);
                        });
                        /*记录重复操作*/
                        confirmDlg.on("remember", function(replace) {
                            me.rememberReplace=replace;
                        });
                    }else if(resfile.status&&me.rememberReplaceType==1){
                            me.exportOneFile(curData, path, function(res) {
                                if (total == 1) {
                                    me.trigger("exporting", res.percent / 100, total, {id:curData.id,localPath:res.info.localPath,name:res.info.name||res.reasonIfFail}, res.status == 1 ? true : false);
                                } else {
                                    if (res.finish) {
                                        me.trigger("exporting", curNum + 1, total, {id:curData.id,localPath:res.info.localPath,name:res.info.name||res.reasonIfFail}, res.status == 1 ? true : false);
                                    }
                                }
                                if (res.finish) {
                                    curNum++;
                                    me.proccessExport(array, path, curNum, total);
                                }
                            });                        
                    }else if(resfile.status&&me.rememberReplaceType==0){
                            curNum++;
                            me.trigger("exporting", curNum, total, null, true);
                            me.proccessExport(array, path, curNum, total);                        
                    } else {
                        me.exportOneFile(curData, path, function(res) {
                            if (total == 1) {
                                me.trigger("exporting", res.percent / 100, total, {id:curData.id,localPath:res.info.localPath,name:res.info.name||res.reasonIfFail}, res.status == 1 ? true : false);
                            } else {
                                if (res.finish) {
                                    me.trigger("exporting", curNum + 1, total, {id:curData.id,localPath:res.info.localPath,name:res.info.name||res.reasonIfFail}, res.status == 1 ? true : false);
                                }
                            }
                            if (res.finish) {
                                curNum++;
                                me.proccessExport(array, path, curNum, total);
                            }

                        });
                    }
                }
            });
            //检测是否已经存在end
        },
        setStopProcess:function(flag,type,paras){
            this.stopProcess = flag;
            var stopAction;
            var stopParas={};
            if(type&&type=="export"){
                stopAction=apiNames.REQ_FILE_STOP_EXPORT;
                stopParas=_.extend({
                    remotePath:"",
                    destPath:"",
                    isDirectory:true
                },paras);
            }else if(type&&type=="open"){
                stopAction=apiNames.REQ_FILE_STOP_OPEN;
            }else if(type&&type=='import'){
                stopAction=apiNames.REQ_FILE_STOP_IMPORT;
                stopParas=_.extend({
                    remotePath:"",
                    destPath:"",
                    isDirectory:true
                },paras);
            }
            if(type&&flag&&stopAction){
                app.dal.request({
                    action:stopAction,
                    paras:stopParas,
                    callback:function(res){
                        console.log("取消操作",res);
                    }
                });                
            }            
        },
        exportFiles : function(data, path, callback) {
            /*取到保存位置的文件夹*/
            this.proccessExport(data, path, 0, data.length);
            callback && callback();
        },
        //获取根节点
        getRootNodes : function(callback) {
            var me = this;
            app.dal.request({
                action : apiNames.REQ_FILE_GET_ROOT_INFO,
                paras : {},
                callback : function(res) {
                    console.log("get Root Nodes：");
                    console.log(res);
                    me.responsed=true;
                    _.each(res.info, function(nodeItem) {
                        if (!me.getModelById("genie_file_" + nodeItem.id)) {
                            var model=new Model(nodeItem);
                            model.set("hasChildDir",true);
                            me.push(model);
                        } else {
                            me.getModelById("genie_file_" + nodeItem.id || nodeItem.remotePath).setData(nodeItem);
                        }
                    });
                    callback && callback(res.info);
                }
            });
        },
        getNodeList : function(data, callback) {
            var me = this;
            me.responsed=false;
            var deleteIds=[];
            for(var i=0;i<me.models.length;i++){
                      var modelOld=me.models[i];
                      if(modelOld.get("parentPath")==data.remotePath){
                          deleteIds.push(modelOld.get("id"));
                      }                            
            }
            deleteIds.forEach(function(id){
                try{
                  me.remove(me.getModelById("genie_file_"+id));  
                }catch(e){
                    console.log("删除时出错");
                }
            });
            app.dal.request({
                action : apiNames.REQ_FILE_GET_SUB_NODES,
                paras : {
                    remotePath : data.remotePath
                },
                callback : function(res) {
                    me.responsed=true;
                    if(res.status==1){
                        res.info && res.info.forEach(function(node) {
                            if (!me.getModelById("genie_file_"+node.id)) {
                                var newModel=new Model(node);
                                me.push(newModel);
                                me.trigger("update",{type:"add",model:newModel});
                            }
                        });                        
                    }
                    callback && callback(res.info);
                }
            });
        },
        /*移动文件，传入id和path，type*/
        processMoveFile : function(array, path, start, total) {
            var me = this;
            if (start > total || total == 0 || array.length == 0) {
                return;
            }
            var curData = array.shift();
            var curNum = start;
            app.dal.request({
                action : apiNames.REQ_FILE_MOVE_TO,
                paras : {
                    remotePath : curData.remotePath,
                    destPath : path,
                    parentId : curData.id,
                    isDirectory : curData.isDirectory
                },
                callback : function(res) {
                    if (res.finish) {
                        curNum++;
                        me.trigger("doing", curNum, total, curData, res.status == 1 ? true : false);
                        me.processMoveFile(array, path, curNum, total);
                    }
                }
            });
        },
        /*移动文件，传入id和path，type*/
       copyOneFile:function(data,path,callback){
            app.dal.request({
                action : apiNames.REQ_FILE_COPY,
                paras : {
                    remotePath : data.remotePath,
                    destPath : path,
                    isDirectory : data.isDirectory,
                },
                callback : function(res) {
                       callback&&callback(res);
                }
            });             
       },
       processCopyFile : function(array, path, start, total) {
            var me = this;
            if (start > total || total == 0 || array.length == 0|| this.stopProcess == true) {
                 me.rememberReplace=false;
                 me.rememberReplaceType=-1;
                return;
            }
            var curData = array.shift();
            var curNum = start;
            var hasExist=false;
            var existModel;
            //判断导入的文件是否已经存在
            this.models.forEach(function(model){
                if((model.get("parentPath")==path)&&(model.get("name")==curData.name)){
                    hasExist=true;
                    existModel=model;
                }
            });  
            if(hasExist&&me.rememberReplaceType==-1){
                        var confirmDlg = new UIDialog({
                            buttonKey : 3, //1双按钮，2有ok按钮
                            contentConfig:{
                                i18nValues:["fileManager.confirmFileReplace",curData.name.replace(/\%/g,"")]                   
                            },
                            title:'fileManager.pasteLabel',
                            isTitleKey: true,
                            hasRememberCheck:total>1?true:false  
                        });
                        confirmDlg.show(); 
                        confirmDlg.on("yes",function(){
                            me.copyOneFile(curData,path,function(res){
                                
                                if(me.rememberReplace){
                                    me.rememberReplaceType=1;
                                }
                                curNum++;
                                me.remove(me.getModelById("genie_file_"+res.info.id));
                               if (!me.getModelById("genie_file_"+res.info.id)) {
                                    var model = new Model(res.info);
                                    me.push(model);
                                   if(model.get("isDirectory")){
                                        var parentModel=me.getModelById("genie_file_"+res.info.parentId);
                                        parentModel&&parentModel.set("hasChildDir",true);    
                                    }
                                    me.trigger("update", {
                                        type : "add",
                                        model : model
                                    });
                                }
                                me.trigger("coping", curNum, total, res.info||res.reasonIfFail, res.status == 1 ? true : false);
                                me.processCopyFile(array,path,curNum,total);
                            });
                        });  
                        confirmDlg.on("cancel",function(){
                            if(me.rememberReplace){
                                me.rememberReplaceType=0;
                            }
                            curNum++;
                            me.trigger("coping", curNum, total, null,true);
                            me.processCopyFile(array,path,curNum,total);
                        });   
                        /*记录重复操作*/
                        confirmDlg.on("remember", function(replace) {
                            me.rememberReplace=replace;
                        });          
            }else if(hasExist&&me.rememberReplaceType==1){
                            me.copyOneFile(curData,path,function(res){
                                curNum++;
                               if (res.info&&!me.getModelById("genie_file_"+res.info.id)) {
                                    var model = new Model(res.info);
                                    me.push(model);
                               if(model.get("isDirectory")){
                                    var parentModel=me.getModelById("genie_file_"+res.info.parentId);
                                    parentModel&&parentModel.set("hasChildDir",true);    
                                }
                                    me.trigger("update", {
                                        type : "add",
                                        model : model
                                    });
                                }
                                me.trigger("coping", curNum, total, res.info||res.reasonIfFail, res.status == 1 ? true : false);
                                me.processCopyFile(array,path,curNum,total);
                            });                  
            }else if(hasExist&&me.rememberReplaceType==0){
                            curNum++;
                            me.trigger("coping", curNum, total, null, true);
                            me.processCopyFile(array, path, curNum, total);                   
            }else{
                            me.copyOneFile(curData,path,function(res){
                                curNum++;
                               if (res.info&&!me.getModelById("genie_file_"+res.info.id)) {
                                    var model = new Model(res.info);
                                    me.push(model);
                               if(model.get("isDirectory")){
                                    var parentModel=me.getModelById("genie_file_"+res.info.parentId);
                                    parentModel&&parentModel.set("hasChildDir",true);    
                                }
                                    me.trigger("update", {
                                        type : "add",
                                        model : model
                                    });
                                }
                                me.trigger("coping", curNum, total, res.info||res.reasonIfFail, res.status == 1 ? true : false);
                                me.processCopyFile(array,path,curNum,total);
                            });                
            }   
        },
        /*重命名文件，传入id和path，name*/
        renameFile : function(data, callback) {
            var me = this;
            app.dal.request({
                action : apiNames.REQ_FILE_RENAME,
                paras : _.extend({
                    id : "",
                    remotePath : "",
                    fileName : ""//新名称
                }, data),
                callback : function(res) {
                    var model;
                    if (res.info&&res.info.oldFileId) {
                        model = me.getModelById("genie_file_" + res.info.oldFileId);
                        me.remove(model);
                        var newModel=new Model(res.info);
                        me.models.forEach(function(curModel) {
                            if (curModel.get("parentId") == res.info.oldFileId) {
                                curModel.set("parentId", res.info.id);
                            }
                        });
                        me.push(newModel);
                        me.trigger("update",{type:"add",model:newModel});
                    }
                    callback && callback(res);
                }
            });
        },
        /*导入一个文件*/
        importOneFile:function(data,callback){
            app.dal.request({
                action : apiNames.REQ_FILE_ADD,
                paras : {
                    parentId : data.parentId,
                    destPath : data.destPath,
                    remotePath : data.remotePath
                },
                callback : function(res) {
                       callback&&callback(res);
                }
            });            
        },
        proccessImport : function(array, start, total) {
            var me = this;
            if (start > total || total == 0 || array.length == 0|| this.stopProcess == true) {
                 me.rememberReplace=false;
                 me.rememberReplaceType=-1;
                return;
            }
            var curData = array.shift();
            var curNum = start;
            var hasExist=false;
            var existModel;
            var fileName =curData.destPath.substring(curData.destPath.lastIndexOf("\\")+1);
            //判断导入的文件是否已经存在
            this.models.forEach(function(model){
                if((model.get("parentId")==curData.parentId)&&(model.get("name")==fileName)){
                    hasExist=true;
                    existModel=model;
                }
            });
            if(hasExist&&!me.rememberReplace){
                //确认覆盖弹窗
                me.trigger("repeatTask");
                var confirmDlg = new UIDialog({
                    buttonKey : 3, //1双按钮，2有ok按钮
                    title:'common.Import',
                    isTitleKey: true,
                    contentConfig:{
                        i18nValues : ["fileManager.confirmFileReplace",fileName.replace(/\%/g,"")]
                    },
                    hasRememberCheck:total>1?true:false 
                });
                confirmDlg.show();
                confirmDlg.on("yes",function(){
                    if(me.rememberReplace){
                        me.rememberReplaceType=1;
                    }
                    existModel&&me.remove(existModel);
                    me.importOneFile(curData,function(res){
                        if(total==1){
                            me.trigger("importing", res.percent/100, total, res.info||res.reasonIfFail, res.status == 1);   
                        }else{
                            if(res.finish){
                                me.trigger("importing", curNum+1, total, res.info||res.reasonIfFail, res.status == 1);
                            }                            
                        }
                        if(res.finish){
                            curNum++;
                            if(res.info&&!me.getModelById("genie_file_"+res.info.id)&&res.status==1){
                                var model = new Model(res.info);
                                me.push(model);
                               if(model.get("isDirectory")){
                                    var parentModel=me.getModelById("genie_file_"+res.info.parentId);
                                    parentModel&&parentModel.set("hasChildDir",true);    
                                }
                                me.trigger("update",{type:"add",model:model});
                            }
                            me.proccessImport(array,curNum,total);
                        }
                    });                    
                });
                confirmDlg.on("cancel",function(){
                            if(me.rememberReplace){
                                me.rememberReplaceType=0;
                            }
                            curNum++;
                            me.trigger("importing", curNum, total, curData, true);
                            me.proccessImport(array, curNum, total);                        
                });
                confirmDlg.on("remember",function(toRemember){
                        me.rememberReplace=toRemember;                
                });
            }else if(hasExist&&me.rememberReplaceType==0){
                            curNum++;
                            me.trigger("importing", curNum, total, curData, true);
                            me.proccessImport(array, curNum, total);                      
            }else if(hasExist&&me.rememberReplaceType==1){
                    existModel&&me.remove(existModel);
                    me.importOneFile(curData,function(res){
                        if(total==1){
                            me.trigger("importing", res.percent/100, total, res.info||res.reasonIfFail, res.status == 1);   
                        }else{
                            if(res.finish){
                                me.trigger("importing", curNum+1, total, res.info||res.reasonIfFail, res.status == 1);
                            }                            
                        }
                        if(res.finish){
                            curNum++;
                            if(res.info&&!me.getModelById("genie_file_"+res.info.id)&&res.status==1){
                                var model = new Model(res.info);
                                me.push(model);
                               if(model.get("isDirectory")){
                                    var parentModel=me.getModelById("genie_file_"+res.info.parentId);
                                    parentModel&&parentModel.set("hasChildDir",true);    
                                }
                                me.trigger("update",{type:"add",model:model});
                            }
                            me.proccessImport(array,curNum,total);
                        }
                    });                    
            }else{
                me.importOneFile(curData,function(res){
                        if(total==1){
                            if(res.percent==100){
                              if(res.finish){
                                    me.trigger("importing", res.percent/100, total, res.info||res.reasonIfFail, res.status == 1); 
                                }   
                            }else{
                                me.trigger("importing", res.percent/100, total, res.info||res.reasonIfFail, res.status == 1); 
                            }
                        }else{
                            if(res.finish){
                                me.trigger("importing", curNum+1, total, res.info||res.reasonIfFail, res.status == 1);
                            }                            
                        }
                        if(res.finish){
                            curNum++;
                            if(res.info&&!me.getModelById("genie_file_"+res.info.id)&&res.status==1){
                                var model = new Model(res.info);
                                me.push(model);
                                if(model.get("isDirectory")){
                                    var parentModel=me.getModelById("genie_file_"+res.info.parentId);
                                    parentModel&&parentModel.set("hasChildDir",true);    
                                }
                                me.trigger("update",{type:"add",model:model});
                            }
                            me.proccessImport(array,curNum,total);
                        }
                });
            }
        },
        /*新建文件夹，传入id和path，name*/
        createDirectory : function(data, callback) {
            var me = this;
            app.dal.request({
                action : apiNames.REQ_FILE_CREATE_DIRECTORY,
                paras : _.extend({
                    remotePath : ""
                }, data),
                callback : function(res) {
                    if (res.info&&!me.getModelById("genie_file_" + res.info.id)) {
                        var newModel = new Model(res.info);
                        me.push(newModel);
                        if(newModel.get("isDirectory")){
                                  var parentModel=me.getModelById("genie_file_"+res.info.parentId);
                                  parentModel&&parentModel.set("hasChildDir",true);    
                         }
                        me.trigger("update", {
                            type : "add",
                            model : newModel
                        });
                    }
                    callback && callback(res);
                }
            });
        }
    });

    exports.fileTypes = fileTypes;
    exports.Model = Model;
    var collection_single = new Collection();
    exports.Collection = function() {
        if (!collection_single.requested && !collection_single.responsed) {
            collection_single.refresh();
        }
        return collection_single;
    }
});
