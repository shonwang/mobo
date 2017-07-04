define('appModel', function(require, exports, module){
    var app = require('app');
    var gridModel = require('gridModel');
    var utils = require('utils');
    var   $ = require('jquery');
    var apiNames = require('APINames');
    var _ = require('underscore');
    var taskModel = require('taskModel');
    
    var connection = require('connectionMgr');
    
    var Model = gridModel.Model.extend({
        appType: 1,//1、2、3 对应本地、升级、系统
        uninstalling: false,
        
        
        //升级几个字段
        updating: false,//正在升级
        updateProgress: 0,
        updateInstalling: false,
        
        uninstall: function(callback){
            var me = this;
            this.set("pcUninstall",true);
            this.setProperty('uninstalling', true);
            this.trigger('change');
            
            var pk = this.get('sAppPackage');
            
            
            utils.logTime.start('uninstallapp');
            
            this.request({
                action: apiNames.REQ_UNINSTALL_APP,
                paras: {
                    packageName: pk
                },
                callback: function( res ){
                    utils.log.out('UNINSTALL_APP_LOG:' + utils.logTime.end('uninstallapp'));
                    
                    if(res.status === 0 && res.info.lastError === 130){
                        res.status = 1;
                    }
                    me.setProperty('uninstalling', false);
                    if(res.status === 1&&!me.get("wifiUninstall")){
                        me.trigger('remove' , me);
                        var updateModel = updateCollection.getAppByPackage(me.get("sAppPackage"));
                        if(updateModel){
                            updateCollection.remove(updateModel);
                        }
                        var tm = taskModel.progressCollection.getTaskByPkAndVersion(pk);
                        if(tm){
                            taskModel.progressCollection.deleteTask([tm.get('id')]);
                        }
                    }else{
                        me.trigger('change' , me);
                    }
                    callback && callback.call(me, res);
                }
            });
            
        },
        //*********************************************************
        //20140724 新版日志-增加日志参数 nstatistics: logObject
        upateMe: function(logObject){
            var resId = this.get('id');
            this.setProperty('updating', true);
            this.setProperty('updateProgress', 0);
            
            this.trigger('change');
            
            taskModel.download({
                id: resId ? 'app_' + resId : utils.randomStr(10),
                url: this.get('downloadURL'),
                name: this.get('sName'),
                iconPath: this.get('remoteIconPath'),
                size: this.get('sAppSize'),
                packageName: this.get('sAppPackage'),
                resType:taskModel.resourceType.M_APK,
                versionCode: this.get("versionCode"),
                nstatistics: logObject
                // statistics: {
                //     doType: 'updateColomn'
                // }
            });
            
            var localModel = localCollection.getAppByPackage(this.get('sAppPackage'));
            localModel = localModel || systemCollection.getAppByPackage(this.get('sAppPackage'));
            if(localModel){
                localModel.setProperty('updating', true);
                localModel.trigger('change');
            }
        }
    });
    
    var BaseApi = {
        exportApp: function(appData, callback){
            var apiName;
            if(appData.appType == 3){
                apiName = apiNames.REQ_EXPORT_SYS_APK;
            }else{
                apiName = apiNames.REQ_EXPORT_THIRD_APK;
            }
            
            utils.logTime.start('exportapp');
            
            this.request({
                action: apiName,
                paras: {
                    localPath: appData.localPath,
                    remotePath: appData.remotePath,
                    packageName: appData.packageName,
                    targetFolder: appData.targetFolder
                },
                callback: function(res){
                    utils.log.out('EXPORT_APP_LOG:' + utils.logTime.end('exportapp'));
                    callback && callback.call(this, res);
                }
            });
        },
        cancalExport: function(){
            this.isCancelExport = true;
        },
        cancelMove:function(value){
            this.isCancelMove = value;
            console.log("取消操作"+value);
        },
        exportSelectedApps: function(opts, callback){
            var path = opts.path;
            
            var modelIds = opts.modelIds || [];
            var appModels = [];
            
            this.isCancelExport = false;
            
            for(var i=0; i < modelIds.length; i++){
                var model = this.getModelById(modelIds[i]);
                appModels.push(model);
            }
            
            
            var exportApp = function(){
                var model = appModels.shift();
                
                if(this.isCancelExport){
                    return;
                }
                
                if(model){
                    var appType = model.getProperty('appType');
                    this.exportApp({
                        targetFolder: path,
                        localPath: path + '\\' + model.get('sName') + '.apk',
                        remotePath: model.get('sAppPath'),
                        appType: appType,
                        packageName: model.get('sAppPackage')
                    }, function(res){
                        model.set("localPath",res.info.localPath);
                        callback && callback.call(this, res, model);
                        exportApp();
                    });
                }
            }.bind(this);
            
            exportApp();
        },
        
        cancelUninstall: function(){
            this.isCancelUninstall= true;
        },
        
        uninstallApps: function(modelIds, callback){
            var uninstallList = [];
            
            for(var id in modelIds){
               // var model = this.getModelById(id);
               // model.setProperty('uninstalling', true);
                //model.trigger('change');
                uninstallList.push(this.getModelById(id));
            } 
            
            this.isCancelUninstall = false;
            
            var uninstallApp = function(){
                if(this.isCancelUninstall) return;
                
                var model = uninstallList.shift();
                model&&model.setProperty('uninstalling', true);
                model&&model.trigger('change');
                model && model.uninstall(function(res){
                    callback && callback.apply(this, [res, model]);
                        uninstallApp();
                });
            }.bind(this);
            uninstallApp();
        },
        moveToSd:function(array,start,total){
            var me = this;
            if(start > total || total == 0 || array.length == 0||this.isCancelMove==true){
                return;
            }
            var curData = array.shift();
            var curNum = start;
            app.dal.request({
                action : apiNames.REQ_APK_MOVE,
                paras : {
                    packageName : curData.sAppPackage
                },
                callback:function(res) {
                    console.log("移动apk的回调",res);
                    curNum++;
                    
                    if(res.status==1&&res.info){
                        try{
                            localCollection.getAppByPackage(res.info.packageName)&&localCollection.getAppByPackage(res.info.packageName).set("sAppInstallPos",res.info.newPos)&&localCollectionCollection.trigger("update");    
                        }catch(e){
                            console.log("在localCollection中出错");
                        }
                       try{
                            updateCollection.getAppByPackage(res.info.packageName)&&updateCollection.getAppByPackage(res.info.packageName).set("sAppInstallPos",res.info.newPos)&&updateCollection.trigger("update");     
                       }catch(e){
                           console.log("在updateCollection中出错");
                       }
                       try{
                            var model=searchCollection.getAppByPackage(res.info.packageName);
                            if(model){
                                searchCollection.getAppByPackage(res.info.packageName).set("sAppInstallPos",res.info.newPos);
                                searchCollection.trigger("update"); 
                            }
                       }catch(e){
                           console.log("在searchCollection中出错");
                       }
                                               
                    }
                        me.trigger("moving",curNum,total,res.info,res.status==1);
                        me.moveToSd(array,curNum,total);
                }
                });
        },
        getAppByPackage: function(packageName){
            if(this.packageMap[packageName]){
                return this.packageMap[packageName];
            }
            
            for(var i=0; i < this.models.length; i++){
                var model = this.models[i];
                if(model.get('sAppPackage') == packageName){
                    return model;
                }
            }
            return false;
        }
    };
    
    /*Update Apps*/
    var UpdateConnection = gridModel.Collection.extend(_.extend({
        model: Model,
        
        sysFetched: false,
        localFetched: false,
        
        
        sendRequest: false,
        receiveResponse: false,
        
        init: function(opts){
            UpdateConnection.__super__.init.apply(this, arguments);
            
            this.sysConn = opts.sysConnection;
            this.localConn = opts.localConnection;
            
            this.onReceiverTask = this.onReceiverTask.bind(this);
            
            taskModel.progressCollection.on('receiverTaskResponse', this.onReceiverTask);
            taskModel.progressCollection.on('batchdelete', this.onBatchDeleteTasks.bind(this));
            
            this.onLocalResponse = this.onLocalResponse.bind(this);
            this.onSystemResponse = this.onSystemResponse.bind(this);
            
            this.packageMap = {};
            
            this.on('update', function(e){
                localCollection.trigger('update', e);
            });
            
            connection.on('connection', function(){
                if(!connection.isConnect()){
                    this.clear();
                }
            }.bind(this));
            
        },
        
        //*********************************************************
        //20140724 新版日志
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
        //*********************************************************

        onBatchDeleteTasks : function(models){
            console.log("==============删除任务=================",models);
            models.forEach(function(model){
                if(model.get('resType') == taskModel.resourceType.M_APK){
                    var pk = model.get('packageName');
                    var model = this.getAppByPackage(pk);
                    var localModel = localCollection.getAppByPackage(pk);
                    
                    localModel = localModel || systemCollection.getAppByPackage(pk);
                    
                    if(model){
                        model.setProperty('updating', false);
                        model.trigger('change');
                    }
                    if(localModel){
                        localModel.setProperty('updating', false);
                        localModel.trigger('change');
                    }
                }
            }, this);
        },
        
        onReceiverTask: function(model){
            
            if(model.get('resType') == taskModel.resourceType.M_APK){
                var data = model.data;
                
                var packageName = model.get('packageName');
                var updateModel = this.getAppByPackage(packageName);
                
                if(!updateModel){
                    return;
                }
                
                var curModel = getAppByPk(packageName);
                
                if(model.get('type') == taskModel.taskType.DOWNLOAD){
                    updateModel.updateProgress = data.res.info.finishRate;
                    
                    if(data.res.code != taskModel.downloadCode.DOWNLOADING && 
                        data.res.code != taskModel.downloadCode.COMPLETE && 
                        data.res.code != taskModel.downloadCode.WAITING){
                            
                        curModel && curModel.setProperty('updating', false);
                        updateModel.setProperty('updateInstalling', false);
                        updateModel.setProperty('updating', false);
                    }else{
                        curModel && curModel.setProperty('updating', true);
                        updateModel.setProperty('updating', true);
                    }
                }else if(model.get('type') == taskModel.taskType.INSTALL_APK){
                    if(!model.data.res||model.data.res.code == taskModel.installCode.TRANSFERING
                        ||model.data.res.code == taskModel.installCode.WAITING){
                        updateModel.setProperty('updating', true);
                        updateModel.setProperty('updateInstalling', true);
                        curModel && curModel.setProperty('updating', true);
                    }else if(model.data.res && 
                        updateModel && model.data.res.code === taskModel.installCode.SUCCESS
                        ||model.data.res.code==taskModel.installCode.WIFI_APP_INS_POPUP_SUCCESS){
                        updateModel.setProperty('updating', true);
                        this.remove(updateModel);
                        this.trigger('update');
                        
                        var res = model.data.res || {};
                        
                        curModel && curModel.set('sAppVersion', model.get('sAppVersion')||res.info.version);
                    }else{
                        updateModel.setProperty('updateInstalling', false);
                        updateModel.setProperty('updating', false);
                        curModel && curModel.setProperty('updating', false);
                    }   
                }
                updateModel.trigger('change');
                
                curModel && curModel.trigger('change');
                //2014-10-23修改，updateall不停闪动的bug start
                //this.trigger('update', "update");
                //2014-10-23修改，updateall不停闪动的bug end
                if(searchCollection.size() > 0){
                    searchCollection.trigger("update");
                }
            }
        },
        
        isAllSelectedUpdating: function(){
            var models = this.models;
            for(var i=0; i < models.length; i++){
                var m = models[i];
                if(this.isSelectedModel(m.getId()) && !m.updating){
                    return false;   
                }
            }
            return true;
        },
        
        isAllUpdating: function(){
            var result = _.find(this.models, function(m){
                return !m.updating;
            });
            return !result;
        },
        
        push: function(model){
            UpdateConnection.__super__.push.apply(this, arguments);
            model.setProperty('appType', 2);
            
            var pk =  model.get('sAppPackage');
            if(taskModel.progressCollection.isUpdating({packageName : pk})){
                model.setProperty('updating', true);
            }
        },
        
        parse: function(res){
            this.clear({trigger: false});
            
            this.receiveResponse = true;
            
            var appList = [];
            if(res.data && res.data.appList){
                appList = res.data.appList;
            }
            
            var updateList = [];
            appList.forEach(function(app){
                var model = localCollection.getAppByPackage(app.apkId);
                model = model ? model : systemCollection.getAppByPackage(app.apkId);
                
                //系统应用先过滤掉
                /*
                if(model && model.getProperty('appType') == 3){
                    return;
                }*/
                console.log("更新app:",app);
                var globalConfig = require('globalConfig');
                updateList.push({
                    id: app.id,
                    remoteIconPath: globalConfig.domain.uploadVoga360 + app.iconPath + 'icon_m.png',
                    sName: model.get('sName')||app.name,//app.apkName,
                    appType:model.getProperty('appType') ,
                    sAppType:model.getProperty('appType') ,
                    sThumbnailPath: model.get('sThumbnailPath'),
                    sCurVersion: app.version,
                    updateDetail:app.updateDetail||'',
                    sAppVersion: model.get('sAppVersion'),
                    sAppInstallPos: model.get('sAppInstallPos'),
                    sAppPackage: app.apkId,
                    sAppSize:app.apkSize,
                    versionCode: app.versionCode,
                    downloadURL: globalConfig.domain.uploadVoga360 + app.apkPath,
                    sAppPath: model.get('sAppPath'),
                    isAppCanMove:model.get("isAppCanMove")
                });
            });
            
            updateList.sort(function(a, b){
                var aname = a.sName;
                var bname = b.sName;
                
                return aname.localeCompare(bname);
            });
            return updateList;
        },
        
        refresh: function(){
            if(connection.isConnect()){
                this.sendRequest = true;
                this.receiveResponse = false;
                this.clear();
                
                var deviceInfo = connection.deviceInfo;
                
                var args_e = deviceInfo.sPhoneSDKVersion + '_' + deviceInfo.screenDpi;                
                this.fetch(apiNames.REQ_UPDATE_INFO, {
                    e: args_e,
                    sTwoCpuName:deviceInfo.sTwoCpuName,
                    sOpenGLVer:deviceInfo.sOpenGLVer
                });                
            }
        },
        
        isUpdateApp: function(packageName){
            for(var i=0; i < this.models.length; i++){
                var model = this.models[i];
                if(model.get('sAppPackage') == packageName){
                    return model;
                }
            }
            return false;
        },
        
        onRefreshLocalSystemApp: function(type, res){
            console.log(type, res);
            
            if(type  == 1){
                this.localFetched = true;
            }
            if(type == 2){
                this.sysFetched = true;
            }
            
            if(this.sysFetched && this.localFetched){
                this.refresh();
            }
        },
        
        onLocalResponse: function(res){
            this.localConn.off('response', arguments.callee);
            this.onRefreshLocalSystemApp(1, res);
        },
        
        onSystemResponse: function(res){
            this.sysConn.off('response', arguments.callee);
            this.onRefreshLocalSystemApp(2, res);
        },
        
        fetchUpdateApps: function(){
            this.sendRequest = true;
            this.sysFetched = this.localFetched = false;
            console.log("刷新重取app 数据信息");
            this.localConn.off('response', this.onLocalResponse);
            this.localConn.on('response', this.onLocalResponse);
            this.localConn.refresh();
            
            this.sysConn.off('response', this.onSystemResponse);
            this.sysConn.on('response', this.onSystemResponse);
            
            this.sysConn.refresh();
            this.clear();
        },
        updateSelectedApp: function(){
            var modelIds = this.getSelectedMap();
            var paras = [];
            
            modelIds = Object.getOwnPropertyNames(modelIds);
            
            modelIds.forEach(function(modelId){
                var model = this.getModelById(modelId);
                var resId = model.get('id');
                var pk = model.get('sAppPackage');
                
                paras.push({
                    id: resId ? 'app_' + resId : utils.randomStr(10),
                    url: model.get('downloadURL'),
                    name: model.get('sName'),
                    iconPath: model.get('remoteIconPath'),
                    size: model.get('sAppSize'),
                    packageName: pk,
                    
                    statistics: {
                        doType: 'updateSelected'
                    }
                });
                
                model.setProperty('updating', true);
                model.setProperty('updateProgress', 0);
                model.trigger('change');
                
                var localModel = localCollection.getAppByPackage(pk);
                localModel = localModel || systemCollection.getAppByPackage(pk);
                if(localModel){
                    localModel.setProperty('updating', true);
                    localModel.trigger('change');
                }
            }, this);
            taskModel.batchDownload(paras);
        },
        downloadAll: function(isFromHome){
            var models = this.models;
            var ps = [];

            for(var i=0; i < models.length; i++){
                var model = models[i];
                var resId = model.get('id');
                var pk = model.get('sAppPackage');

                //*********************************************************
                //20140724 新版日志
                if (isFromHome === true){
                    var logObject = {
                        class: "home",
                        page: "home_home",
                        module: "updatecards",
                        action: "updateall",
                        mtypecode: 1,
                        typecode: 1,
                        targettype: 1,
                        targetvalue: pk,
                        status: 0
                    }
                } else {
                    var logObject = {
                        class: "myapps",
                        page: "myapps",
                        module: "menu",
                        action: "updateall",
                        mtypecode: 1,
                        typecode: 1,
                        targettype: 1,
                        targetvalue: pk,
                        status: 0
                    }
                }                
                //*********************************************************
                var p = {
                    id: resId ? 'app_' + resId : utils.randomStr(10),
                    url: model.get('downloadURL'),
                    name: model.get('sName'),
                    iconPath: model.get('remoteIconPath'),
                    size: model.get('sAppSize'),
                    packageName: pk,
                    nstatistics: logObject,
                    statistics: {
                        doType: 'updateAll'
                    }
                };
                ps.push(p);
                
                utils.sendNewLog("1000100", logObject);
                model.setProperty('updating', true);
                model.setProperty('updateProgress', 0);
                model.trigger('change');
                
                var localModel = localCollection.getAppByPackage(pk);
                localModel = localModel || systemCollection.getAppByPackage(pk);
                if(localModel){
                    localModel.setProperty('updating', true);
                    localModel.trigger('change');
                }
            }
            taskModel.batchDownload(ps);
        }
        
    }, BaseApi));
    
    /*local App数据集合*/
    var LocalCollection = gridModel.Collection.extend(_.extend({
        model: Model,
        //是否发出请求获取过后端数据
        
        sendRequest: false,
        receiveResponse: false,
        init: function( opts ){
            LocalCollection.__super__.init.apply(this, arguments);
            this.binding(apiNames.BIND_ALL_THIRDAPK_INFO, (function(){
                this.trigger('update');
            }).bind(this));
            
            this.packageMap = {};
            this.binding(apiNames.BIND_APP_INFO, _.bind(this.onGetThirdApkInfo, this));
            
            this.on('update', function(){
                app.eventCenter.trigger('refresh_resource_app_status');
            });
            
            connection.on('connection', function(){
                if(!connection.isConnect()){
                    this.clear();
                }
            }.bind(this));
        },

        //*********************************************************
        //20140724 新版日志
        getModelPosition: function(model){
            var tasks = this.models;
            for(var i = 0; i < tasks.length; i++){
                var task = tasks[i];
                var id = task.get('sAppPackage');
                if(id === model.get('sAppPackage')){
                    return i;
                }
            }
        },
        //*********************************************************
        
        push: function(model){
            LocalCollection.__super__.push.apply(this, arguments);
            model.setProperty('appType', 1);
            
            if(taskModel.progressCollection.isUpdating({
                    packageName : model.get('sAppPackage')
                })){
                model.setProperty('updating', true);
            }
            
            var pk = model.get('sFakePackageName') || model.get('sAppPackage');
            model.on('remove', function(){
                delete this.packageMap[pk];
            }.bind(this));
            
            this.packageMap[pk] = model;
            
            model.data.sCurVersion = null;
        },
        
        onGetThirdApkInfo: function(data){
            this.trigger('update');
        },
       
        parse: function( res ){
            this.clear({trigger: true});
            
            this.receiveResponse = true;
            
            var list = [];
            if(res && res.info && res.info.list){
                list = res.info.list;
            }
            
            list.sort(function(a, b){
                var aname = a.sName;
                var bname = b.sName;
                
                return aname.localeCompare(bname);
            });
            
            this.trigger('response', res);
            return list;
        },
        
        clear: function(){
            LocalCollection.__super__.clear.apply(this, arguments);
            this.packageMap = {};
        },
        
        /*
         * 更新第三放应用数据列表
         */
        refresh: function(){
            //如果已经发出去请求， 
            if(this.sendRequest && !this.receiveResponse){
                return;
            }
            /*
            connection.on('connection', function(){
                if(connection.isConnect()){
                     this.fetch(apiNames.REQ_ALL_APP_INFO);
                }
            }.bind(this));*/
            if(connection.isConnect()){
                    this.sendRequest = true;
                    this.receiveResponse = false;
                    this.clear();
                    this.fetch(apiNames.REQ_ALL_APP_INFO);
             }            
        },
        
        addApp: function(model){
            var mdl = this.getAppByPackage(model.get("sAppPackage"));
            console.log("addApp方法中",mdl);
            console.log(model);
            if(mdl){
               model.data=_.extend(mdl.data,model.data);
               this.remove(mdl);
            }
            if(!model.get("sAppType")){
                model.set("sAppType",model.getProperty("appType"));
            }
            this.push(model);
            this.trigger('update');
        }
    }, BaseApi));
       
    var SystemCollection = gridModel.Collection.extend(_.extend({
        model: Model,
        //是否发出请求获取过后端数据
        sendRequest: false,
        receiveResponse: false,
        
        init: function( opts ){
            SystemCollection.__super__.init.apply(this, arguments);
            
            this.packageMap = {};
            
            this.binding(apiNames.BIND_ALL_SYSTEM_INFO, (function(){
                this.trigger('update');
            }).bind(this));
            
            this.on('update', function(){
                app.eventCenter.trigger('refresh_resource_app_status');
            });
            
            connection.on('connection', function(){
                if(!connection.isConnect()){
                    this.clear();
                }
            }.bind(this));
        },
        
        push: function(model){
            SystemCollection.__super__.push.apply(this, arguments);
            
            var pk = model.get('sAppPackage');
            model.on('remove', function(){
                delete this.packageMap[pk];
            }.bind(this));
            this.packageMap[pk] = model;
            
            model.setProperty('appType', 3);
            model.data.sCurVersion = null;
        },
        parse: function( res ){
            this.clear({trigger: false});
            this.receiveResponse = true;
            
            var list = [];
            
            if(res.info && res.info.list){
                list = res.info.list;
            }
            
            
            
            list.sort(function(a, b){
                var aname = a.sName;
                var bname = b.sName;
                
                return aname.localeCompare(bname);
            });
            
            this.trigger('response', res);
            return list;
        },
        
        /*
         * 更新第三放应用数据列表
         */
        refresh: function(){
            if(this.sendRequest && !this.receiveResponse){
                return;
            }
            /*
            connection.on('connection', function(){
                if(connection.isConnect()){
                      this.fetch(apiNames.REQ_ALL_SYSTEM_INFO);
                }
            }.bind(this));*/
            if(connection.isConnect()){
                            this.sendRequest = true;
                            this.receiveResponse = false;
                            console.log('****************refresh sytem app******************');
                            this.clear();
                      this.fetch(apiNames.REQ_ALL_SYSTEM_INFO);
            }           
        },
        
        clear: function(){
            SystemCollection.__super__.clear.apply(this, arguments);
            this.packageMap = {};
        }
    }, BaseApi));
    
    var SearchCollection = gridModel.Collection.extend(_.extend({
           init: function( opts ){
            SearchCollection.__super__.init.apply(this, arguments);
            this.packageMap = {};
            
            this.on('update', function(){
                app.eventCenter.trigger('refresh_resource_app_status');
            });
            
            connection.on('connection', function(){
                if(!connection.isConnect()){
                    this.clear();
                }
            }.bind(this));
        },
         push: function(model){
            SearchCollection.__super__.push.apply(this, arguments);
            var pk = model.get('sAppPackage');
            if(taskModel.progressCollection.isUpdating({
                    packageName : model.get('sAppPackage')
                })){
                model.setProperty('updating', true);
            }             
            model.on('remove', function(){
                delete this.packageMap[pk];
            }.bind(this));
            this.packageMap[pk] = model;
            model.setProperty('appType', (model.get("sAppType")==0?3:1)||(model.get("appType")==0?3:1));
        }
    },BaseApi));
    
    var FavoriteModel = app.ModelBase.extend({
        init: function(){
            this.defaultParas = {
                type: "post",
                url: '',
                async: true,
                dataType: 'jsonp',
                cache: false, 
                ifModified: true,
                timeout: 60000
            };
            this.setFavUrl('client/app/guessLike.htm');
        },
        
        setFavUrl: function(url){
            var globalConfig = require('globalConfig');
            this.favUrl = globalConfig.domain.serverVoga360 + url;
            this.defaultParas.url = this.favUrl;
        },
        
        getTop: function(callback){
            this.setFavUrl('client/app/guessLike.htm');            
            var paras = _.extend({}, this.defaultParas);
            
            paras.data = { nums: 50 };
            paras.success = function(res){
            	var list = res.data.recmdList;
            	res.data.recmdList = getRandomApp(list,10);
                callback && callback.call(this, res);
            }
            $.ajax(paras);
        },
        
        getRecommend: function(paras, callback){
            this.setFavUrl('client/app/guessLike.htm');
            var p = _.extend({}, this.defaultParas);
            p.data = paras;
            p.data.nums = 50;
            p.success = function(res){
                console.log('recommend===', res);
                var list = res.data.recmdList;
            	res.data.recmdList = getRandomApp(list,7);
                callback && callback.call(this, res);
            }
            $.ajax(p);
        },
        getInstalledNecessary: function(callback){
            //TODO: 需求#718
            //通过local storage 标记判断是否是安装后第一次打开
            //如果第一次打开，设置 local storage 标记，并调用装机必备接口
            var me = this;
            var isOpenFirst;
            var getBestPicks = _.extend({}, this.defaultParas);

            var successBest = function(response) {
                console.log("APP >> Best Picks服务端发过来的数据过滤：", response.data.bestPicksList);
                var bestPicksList = response.data.bestPicksList;
                response.data.recmdList = getRandomApp(bestPicksList, 8);
                callback && callback.call(this, response);
            };

            var errorBest = function(response, msg){
                console.log("APP >> error XMLHttpRequest obj: ", response);
                console.log("APP >> 获取Best Picks失败啦！！！ ", msg);
            };

            var sendBestReq = function(){
                me.setFavUrl('nclient/sjson/recommend/bestPicks.htm');
                var getBestPicks = _.extend({}, me.defaultParas);
                getBestPicks.dataType = "json";
                getBestPicks.type = "get";
                delete getBestPicks.cache;
                delete getBestPicks.ifModified;
                //getBestPicks.url = "http://server.voga360.com/nclient/sjson/recommend/bestPicks.htm";
                console.log("APP >> 发送Best Picks请求：", getBestPicks);
                getBestPicks.success = successBest;
                getBestPicks.error = errorBest;
                $.ajax(getBestPicks);
            };

            var isOpenFirst = localStorage["isOpenFirst"];
            if (!isOpenFirst){
                localStorage["isOpenFirst"] = true;
                isOpenFirst = true;
            } else {
                isOpenFirst = false;
            }
            if(isOpenFirst){
                this.setFavUrl('client/app/guessLike.htm');
                var p = _.extend({}, this.defaultParas);
                p.data ={
                    appNum: 0
                };

                p.success = function(res){
                    //TODO: 调用装机必备成功后，过滤装机必备应用，大于8个就显示， 否则就调用新接口Best Picks，再过滤
                    console.log("APP >> 装机必备服务端发过来的数据过滤：", res.data.recmdList);
                    var list = res.data.recmdList;
                    list = getRandomApp(list, 8);

                    if (list !== false){
                        res.data.recmdList = list;
                        console.log("APP >> 过滤完了，多余8个：", res.data.recmdList);
                        callback && callback.call(this, res);
                    } else {
                        console.log("APP >> 过滤完了，不够8个：", list);
                        sendBestReq();
                    }
                };

                p.error = function(res, msg){
                    console.log("APP >> error XMLHttpRequest obj: ", res);
                    console.log("APP >> 获取装机必备失败啦！！！ ", msg);
                    sendBestReq();
                };
                console.log("APP >> 发送装机必备请求：", p);
                $.ajax(p);
            }
            //否则不是第一次打开，直接调用新的接口Best Picks
            else {
                sendBestReq();
            }
        }
    }); 
    
    var getAppByPk = function(pk){
        var model = localCollection.getAppByPackage(pk);
        if(!model){
            model = systemCollection.getAppByPackage(pk);
        }
        return model;
    };
    var getRandomApp = function(list,randomNum){
    	for(var i = 0; i < list.length; i++){
    	    var item = list[i];
    	    var pk = item.apkId;
    	    var localApp = getAppByPk(pk);
    	    if(localApp && localApp.get('sAppVersionCode') == item.versionCode){
    	         list.splice(i, 1);
    	         i--;
    	    }
    	}

        if (list.length < randomNum) return false;

    	var  rdmNum,
			arrTemp = [];
			
	    function selectFrom( start, end ){
			var c = end - start + 1;
			return Math.floor( Math.random() * c + start );
		}
		function genRdmNum( nums, section ){
			arrTemp = [];
			while( arrTemp.length < nums ){
				rdmNum = selectFrom( section[0], section[1] );
				if( $.inArray( rdmNum, arrTemp ) == -1 ){
					arrTemp.push( rdmNum );
				}
			}
			return arrTemp;
		}
       	var numArr = genRdmNum(randomNum,[0,list.length - 1])
        //console.log("APP >> 随机数: ", numArr);
       	var tenList = [];
       	$.each(numArr, function(index,item){
   			tenList.push( list[item]);
       	});
       	return tenList;
    };
    
    
    //初始化本地应用，系统应用 和升级应用三种集合
    var localCollection = new LocalCollection();
    var systemCollection= new SystemCollection();
    
    var updateCollection = new UpdateConnection({
        sysConnection: systemCollection,
        localConnection: localCollection
    });
     /*监听手机端app变化*/            
     app.dal.binding(apiNames.BIND_UNINSTALL_APK_BYPHONE, function(data){
                console.log("Model中卸载的apk");
                console.log(data);
                var model = localCollection.getAppByPackage(data.info.packageName)||systemCollection.getAppByPackage(data.info.packageName);
                console.log(model);
                if((model&&!model.get("pcUninstall"))||model&&model.get("wifiUninstall")){
                    model.trigger('remove' , model);
                     //1本地应用 ， 2升级应用， 3系统应用
                    if(model.getProperty("appType")==1||model.get("sAppType")==1){
                        localCollection.remove(model); 
                    }else if(model.getProperty("appType")==3||model.get("sAppType")==0){
                        systemCollection.remove(model);
                    }
                    if(updateCollection.getAppByPackage(data.info.packageName)){
                        var modelUpdate=updateCollection.getAppByPackage(data.info.packageName);
                        updateCollection.remove(modelUpdate);
                    }
                }
           });   
           app.dal.binding(apiNames.BIND_INSTALL_APK_BYPHONE, function(data){
                console.log("Model中新增的apk");
				console.log(data);
                var model = localCollection.getAppByPackage(data.info.sAppPackage)||systemCollection.getAppByPackage(data.info.sAppPackage);
                if(!model){
                   model = new Model(data.info);
                   if(data.info.sAppType==0){
                       systemCollection.push(model);   
                       systemCollection.trigger("update"); 
                   }else{
                       localCollection.push(model); 
                       localCollection.trigger("update"); 
                   }
                    model.trigger('change');                   
                }else{
                    model.data=_.extend(model.data,data.info);//app.apkName,
                    model.trigger('change');
                    if(data.info.sAppType==0){
                        systemCollection.trigger("update"); 
                    }else{
                         localCollection.trigger("update"); 
                    }
                }
           },true);
    var searchCollection = new SearchCollection();
    
    exports.getAppByPk = getAppByPk;
    exports.getRandomApp = getRandomApp;
    
    exports.updateCollection = updateCollection;
    exports.localCollection = localCollection;
    exports.systemCollection = systemCollection;
    exports.searchCollection = searchCollection;
    
    exports.Model = Model;
    exports.favoriteModel = new FavoriteModel();
});