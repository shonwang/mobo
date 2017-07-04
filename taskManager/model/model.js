define('taskModel', function(require, exports, module){
    var app = require('app');
    var gridModel = require('gridModel');
    var apiNames = require('APINames');
    var _ = require('underscore');
    var utils = require('utils');
    
    var connection = require('connectionMgr');
    
    //导入图片的位置
    var importDes = {
        OTHER: '0',
        CAMERA: '1',
        WALLPAPER: '2'
    };
    
    var actionType = {
        SET_WALLPAPER: 'setWallpaper',
        DOWNLOAD_WALLPAPER: 'downloadWallpaper',
        INSTALL_APK: 'installApk',
        SET_RINGTONE: 'setRingtone',
        SET_SMS_RINGTONE: 'setSmsRingtone',
        SET_ALARM: 'setAlarm',
        DOWNLOAD_RINGTONE: 'downloadRingtone'
    };
    
    /*
    var resourceType = {
        APK:'1',
        MUSIC: 'music',
        VIDEO: 'video',
        WALLPAPER: 'wallpaper'
    };
    */
    
    var resourceType = {
        M_UNKNOWN : 0,
        M_APK : 1,
        M_APK_APP : 2,
        M_APK_GAME : 3,
        M_MUSIC : 4,
        M_RING : 5,
        M_VIDEO : 6,
        M_BOOK : 7,
        M_IMAGE : 8,
        M_IMAGE_WALLPAPER : 9,
        M_IMAGE_CAMERA : 10 ,//用户照相机照相的目录
        M_YOUTUBE:11
    };
    
    
    var taskType = {
        DOWNLOAD: 1,
        INSTALL_APK: 2,
        IMPORT_MUSIC: 3,
        IMPORT_VIDEO: 4,
        IMPORT_PICTURE: 5,
        SET_WALLPAPER: 6,
        SET_RINGTONE: 7,
        SET_ALARM: 8,
        SET_SMS_RINGTONE: 9,
        //2014-07-15 ebook manage by liujintao
        IMPORT_BOOK:10
    };
    
    var downloadCode = {
        WAITING: -1,
        DOWNLOADING: 0,
        COMPLETE: 1,
        //网络错误
        DOWNLOAD_REQUEST_404_ERROR: 2, //文件不能下载
        DOWNLOAD_NOT_FOUND_302_REDIRECT: 3, //文件重定向
        DOWNLOAD_URL_ERROR: 4,
        //下载文件不完整
        DOWNLOAD_NON_COMPLETE: 6,
        DOWNLOAD_RECV_SOCKET_ERROR : 16,
        DOWNLOAD_INVALID_SOCKET : 18,
        
        STOP_DOWNLOAD: 5,//停止下载
        FILE_EXISTS: 7,
        DOWNLOAD_INSUFICIENT_SPACE : 9//磁盘已满
    };
    
    var adbCode = {
        INSTALL_FAILED_OLDER_SDK: 12,
        //内存不足
        INSTALL_FAILED_INSUFFICIENT_STORAGE: 4,
        SD_CARD_NOSPACE_LEFT: 6, 
        ADB_MISMATCHED_CERTIFICATE: 104,
        ADB_FAILED_NO_SPACE_LEFT: 242,
        ADB_FAILED_NO_SPACE_LEFT_ON_PHONE: 243,
        ADB_FAILED_NO_SPACE_LEFT_ON_SDCARD: 244,
        
        //SD卡不存在或无法访问
        ADB_FAILED_PERMISSION_DENIED_ROM: 261,
        
        //源文件或文件夹不存在
        ADB_FAILED_LOCAL_PATH_NOT_EXIST: 301,
        ADB_FAILED_LOCAL_DIR_NOT_EXIST: 302,
        ADB_FAILED_LOCAL_CREATE_FILE: 305,
        
        //无效APK
        INSTALL_FAILED_INVALID_APK: 2,
        
        //安装未知应用选项未打开
        INSTALL_FAILED_MEDIA_UNAVAILABLE: 20,
        
        //请安装到手机内存上
        INSTALL_FAILED_TO_SDCARD: 19,
        
        //断开连接
        ADB_FAILED_DEVICE_NO_DEVICE: 220,
        ADB_FAILED_DEVICE_OFFLINE: 221,
        ADB_FAILED_DEVICE_MORE_THAN_ONE: 222,
        ADB_FAILED_READX: 240,
        ADB_FAILED_WRITEX: 241,
        ADB_FAILED_SOCKET_CREATE: 340,
        //连接网络套接字失败
        ADB_FAILED_SOCKET_CONNECT: 341,
        //套接字文件句柄初始化失败
        ADB_FAILED_SOCKET_FH_INIT: 342,
        //从Adb客户端建立到Adb服务端的套接字连接失败
        ADB_FAILED_SOCKET_CONNECT_TO_SERVER: 343,
        //每个套接字地址(协议/网络地址/端口)只允许使用一次,因多次使用导致连接错误
        ADB_FAILED_SOCKET_ADDRINUSE: 344,
        //套接字读取错误
        ADB_FAILED_SOCKET_RECV: 345,
        //套接字超时
        ADB_FAILED_SOCKET_TIMEOUT: 346
    };
    
    var installCode = {
        SUCCESS: 0,
        FAILED: 1,
        
        APP_FILE_INVALID: -19,
        APP_UNZIP_FAILED: -18,
        APP_PUSHDATA_FAILED: -17,
        APP_SAPCE_SD_NOT_ENOUGH: -16,
        APP_SPACE_INTERNAL_NOT_ENOUGH: -15,
        APP_MENIFEST_READ_ERROR: -14,

        TRANSFERING: -100,
        WAITING: -1,
        CUSTOM_UNKNOW_ERROR: 10000,
        APP_INSTALL_POSITION_FAILED:120,//当前安装位置失败
        
        // 2014-09-26 wifi安装专用 start
        WIFI_APP_INS_POPUP_SUCCESS: -13,     // 弹出弹窗成功
        WIFI_APP_INS_FILE_NOT_EXSIT:-12,//文件不存在，已添加
        WIFI_APP_INS_FILE_INVALID:-11,
        WIFI_APP_INS_NON_MARKET_APPS:-10,   // 未打开未知来源 选项，已添加
        WIFI_APP_INS_INDEED_SUCCESS:-9,    // 彻底安装app成功
        WIFI_APP_INS_VERSION_NOT_MATCH:-8,
        WIFI_APP_INS_PUSHFILE_FAIL:-7 //push文件失败,已添加
        // 2014-09-26 wifi安装专用 end
    };
    

    var importCode = {
        TRANSFERING: -100,
        WAITING: -1,
        SUCCESS: 0 ,//导入成功
        FILE_NOT_EXISTED: 1,//文件不存在 （手机数据库有此文件记录，但是真实文件不存在）
        TRANSFER_ERROR: 2,//传输错误
        CREATE_FILE_ERROR: 3,//创建文件失败
        UNKNOWN_ERROR: 4,//未知错误
        INVALID_PARAMETER_ERROR: 5,//参数错误
        NOSPACE_LEFT: 6, //磁盘空间不足,
        SYNC_FILE_ERROR: 7,//同步数据成功
        
        DISCONNECT: 100,
        NoSDCard: 101,
        CUSTOM_UNKNOW_ERROR: 10000
    };
    
    /*
     * 
     * 该model只给下载任务和安装任务创建
     * @paras data
     * type为1: 下载
     * {
     *    continueDownload =1,0 继续下载，全新下载
     *    ext: 'apk'//默认为apk TODO
     *    url: 下载路径,
     *    name: 显示名称,
     *    iconPath: 缩略图路径,
     *    size: 文件大小,
     *    resId: 123
     *    resType: 资源类型: music, apk, video, wallpaper，book,
     *    actionType: "setWallpaper|downloadWallpaper|installApk|setRingtone|" 
     * }
     * type为2：安装
     * 
     * {   
     *     name: 文件名称,
     *     iconPath: 缩略图
     *     path: 文件路径,
     *     size: 文件大小
     * }
     */
    var Model = gridModel.Model.extend({
        init: function(){
            Model.__super__.init.apply(this, arguments);
            
            this.data.id = this.id = utils.getUID();
            this.data.statistics = this.data.statistics || {};
            this.data.statistics.s5 = this.data.statistics.s5 || {};
            //默认全新下载
            this.data.continueDownload = 0; //continueDownload =1,0 继续下载，全新下载
        },
        
        deleteTask: function(){
            this.request({
                action: apiNames.REQ_DELETE_TASK,
                paras: {
                    id: this.id
                },
                callback: function(res){
                    console.log('delettask=', res);
                }
            });
        },
        
        download: function(callback){
            var me = this;
            var dataRes = this.data.res;
            
            dataRes.info.id = this.data.id;
            
            var sendReq = function(){
                this.request({
                    action: apiNames.REQ_DOWNLOAD,
                    paras: this.data,
                    callback: function(res){
                        callback && callback.call(me, res);
                    }
                });
            }.bind(this);
            
            if(this.get("resType") == resourceType.M_IMAGE_WALLPAPER || 
                this.get("resType") == resourceType.M_MUSIC || 
                this.get("resType") == resourceType.M_RING||
                this.get("resType") == resourceType.M_BOOK){
                setTimeout(sendReq, 1000);
            }else{
                sendReq();
            }
        },
        
        stopDownload: function( cb ){
            var dataRes = _.extend({}, this.data.res);
             
            dataRes.code = downloadCode.STOP_DOWNLOAD;
            dataRes.info.id = this.data.id;
            
            //触发界面更新为stop状态
            this.set('res', dataRes);
            
            this.request({
                action: apiNames.REQ_STOP_DOWNLOAD,
                paras: {
                    id: this.getId()
                },
                callback: function(res){
                    app.eventCenter.trigger('refresh_resource_app_status');
                    cb && cb();
                }
            });
            
        },
        continueDownload: function(cb){
            if(this.data.res.totalTime){
                this.data.totalTime = this.data.res.totalTime;
            }
            this.data.continueDownload = 1;
            var res = _.extend({}, this.data.res);
            res.code = downloadCode.DOWNLOADING;
            //触发界面更新为下载状态
            this.set('res', res);
            
            this.download(cb);
            app.eventCenter.trigger('refresh_resource_app_status');
        },
        
        installApp: function(){
            var data = this.data || {};
            var filePath = data.path;
            
            this.setProperty('fromRestart', false);

            if(this.get('res')){
                this.set('res', {
                    code: installCode.TRANSFERING,
                    info: {
                        percent: 0
                    }
                });
            }else{
                this.trigger('change');
            }
            
            //应用安装开始统计
            // var ss = getBaseStatistics(this);
            // ss.action = 'installApp';
            // utils.sendStatistics(ss);
            
            if(!connection.isConnect()){
                this.set('res', {
                    code: adbCode.ADB_FAILED_DEVICE_NO_DEVICE,
                    info: {}
                });

                //*********************************************************
                //20140724 新版日志
                setTimeout(function(){
                    var logObj = data.nstatistics;
                    if (logObj){
                        logObj.status = 13;
                        logObj.source = 0;
                        logObj.error = adbCode.ADB_FAILED_DEVICE_NO_DEVICE;
                        utils.sendNewLog("1000100", logObj);        
                    }
                }, 1000)  
                //*********************************************************
                app.eventCenter.trigger('refresh_resource_app_status');
                return true;
            } 
            
            app.getUserConfig(function(res){
                var userConfig = res.info || {};
                utils.logTime.start('installapp');
                this.request({
                    action: apiNames.REQ_INSTALL_APP,
                    paras: {
                        id: this.data.id,
                        InstallOnSDCard: data.forceInstallPath||userConfig.installApkLocation || 0,
                        Path: filePath,
                        PackageName: data.packageName || '',
                        resId: data.resId,
                        versionCode: data.versionCode
                    },
                    callback: function(res){
                        console.log('instapp=', res);
                    }
                });
            }.bind(this));
        },
        
        importMusic: function(f){
            var data = this.data || {};
            var filePath = data.path;
            var remotePath = data.remotePath || '';
            
            if(connection.isConnect()){
                 this.set('res', {
                     code: importCode.TRANSFERING,
                     percent: 0
                 });
                 
                 utils.logTime.start('importmusic');
                 this.request({
                    action: apiNames.REQ_IMPORT_MUSIC,
                    paras: {
                        id: data.id,
                        localPath: filePath,
                        remotePath: remotePath
                    }
                });
            }else{
                this.set('res', {
                    code: importCode.DISCONNECT,
                    percent: 0
                });
                return true;
            }
        },

        importVideo: function(){
            var data = this.data || {};
            var filePath = data.path;
            var remotePath = data.remotePath || '';
            
            if(connection.isConnect()){
                utils.logTime.start('importvideo');
                
                this.set('res', {
                    code: importCode.TRANSFERING,
                    percent: 0
                });
                
                this.request({
                    action: apiNames.REQ_VIDEO_ADD,
                    paras: {
                        id: this.data.id,
                        localPath: filePath,
                        remotePath: remotePath
                    },
                    callback: function(res){
                    }
                });
            }else{
                this.set('res', {
                    code: importCode.DISCONNECT,
                    percent: 0
                });
                return true;
            }
        },

        importPicture: function(){
            var data = this.data || {};
            var filePath = data.path;
            
            data.desType = data.desType || importDes.OTHER;
            
            
            
            if(connection.isConnect()){
                this.set('res', {
                    code: importCode.TRANSFERING,
                    percent: 0
                });
                
                utils.logTime.start('importpicture');
                
                this.request({
                    action: apiNames.REQ_PICTURE_ADD,
                    paras: {
                        type: data.desType,
                        id: this.data.id,
                        localPath: filePath,
                        remotePath: filePath
                    },
                    callback: function(res){
                    }
                });
            }else{
                this.set('res', {
                    code: importCode.DISCONNECT,
                    percent: 0
                });
                return true;
            }
        },
        /**导入电子书 2014-07-15 liujintao add start*/
        importBook: function(f){
            var data = this.data || {};
            var filePath = data.path;
            var remotePath = data.remotePath || '';
            
            if(connection.isConnect()){
                this.set('res', {
                    code: importCode.TRANSFERING,
                    percent: 0
                });
                
                 this.request({
                    action: apiNames.REQ_IMPORT_BOOK,
                    paras: {
                        id: data.id,
                        localPath: filePath,
                        remotePath: remotePath
                    },
                    callback:function(res){
                        
                    }
                });
            }else{
                this.set('res', {
                    code: importCode.DISCONNECT,
                    percent: 0
                });
                //*********************************************************
                //20140724 新版日志
                setTimeout(function(){
                    var logObj = data.nstatistics;
                    if (logObj){
                        logObj.status = 13;
                        logObj.source = 0;
                        logObj.error = importCode.DISCONNECT;
                        utils.sendNewLog("1000100", logObj);        
                    }
                }, 1000)  
                //*********************************************************
            }
        },
        /**导入电子书 2014-07-15 liujintao add end*/
        setWallpaper: function(){
            var imageModel = require('imageModel');
            var remotePath = this.data.remotePath;
            var _this = this;
            
            _this.data.statistics.s5['type'] = "setWallpaper";
            imageModel.wallpaperCollection.setWallpaper({
                spath: remotePath,
                id: _this.data.mediaId,
                url: _this.data.url,
                name: _this.data.name,
                callback: function(res){
                    _this.set('res', res);
                    
                    if (res.status === 1){
                        _this.data.statistics['s6'] = 5;
                        utils.sendStatisticsDownload(_this.data.statistics);
                        
                    } else {
                        _this.data.statistics['s6'] = 6;
                        utils.sendStatisticsDownload(_this.data.statistics);
                    }
                }
            });
        },
        
        setMusic: function(){
            var musicModel = new require('musicModel');
            var musicColl = new musicModel.Collection();
            
            var _this = this;
            var action = this.get('actionType');
            
            var type = '1';
            if(action == actionType.SET_RINGTONE){
                type = '1';
            }else if(action == actionType.SET_ALARM){
                type = '4';
            }else if(action == actionType.SET_SMS_RINGTONE){
                type  = '2';
            }
            
            musicColl.setMusicRingtone({
                name:this.data.name||"",
                url : this.data.url||"",
                localPath : "",
                remotePath : this.data.remotePath,
                id : this.data.mediaId,
                type : type
            }, function(res){
                _this.set('res', res);
                if(res.status === 1){
                    if(!musicColl.getModelById("genie_music_"+res.info.mediaId)){
                        completeColl.trigger("setringtone",{type:type,data:res.info,success:true});
                    }
                    _this.data.statistics.s5['type'] = action;
                    _this.data.statistics['s6'] = 5;
                    utils.sendStatisticsDownload(_this.data.statistics);   
                } else {
                    _this.data.statistics.s5['type'] = action;
                    _this.data.statistics['s6'] = 6;
                    utils.sendStatisticsDownload(_this.data.statistics);
                    completeColl.trigger("setringtone",{type:type,data:res.info,success:false});
                }
            });
        },
        popupWifiInstall:function(){
            console.log(this.data);
            var me=this;
            /*
            app.dal.request({
                action:apiNames.REQ_POPUP_INSTALL_ON_PHONE,
                paras:{
                    packageName:me.data.packageName||me.data.appId
                },
                callback:function(res){
                    console.log("弹窗wifi安装界面的回调");
                }
            });*/
           me.installApp();
        }
    });
    
    /*未完成的任务列表*/
    var ProgressCollection = gridModel.Collection.extend({
        model: Model,
        historyModel: {},
        init: function( opts ){
            var me = this;
            ProgressCollection.__super__.init.apply(this, arguments);
            
            this.getSavedProgresses(function(res){
                
                var list = [];
                if(res.list){
                    list = JSON.parse(decodeURIComponent(res.list));
                }
                
                list.reverse();
                
                console.log('progress list=', list);
                
                list.forEach && list.forEach(function(data){
                    var model = new Model(data);
                    
                    if(!data.res){
                        //保存的任务没有后端的res说明不知道其状态, 如果置于false, 则按照正常流程逻辑处理
                        model.setProperty('fromRestart', true);
                    }
                    
                    if(data.type == taskType.DOWNLOAD){
                        data.res = data.res || {};
                        if(data.res.code == downloadCode.DOWNLOADING || data.res.code == downloadCode.WAITING){
                            data.res.code = downloadCode.STOP_DOWNLOAD;
                        }
                    }
                    
                    if(data.type == taskType.IMPORT_MUSIC ||
                        data.type == taskType.IMPORT_VIDEO ||
                        data.type == taskType.IMPORT_PICTURE||
                        data.type == taskType.IMPORT_BOOK){
                        if(data.res.code == importCode.TRANSFERING || 
                          data.res.code == importCode.WAITING){
                            data.res = {};
                            data.res.code = importCode.CUSTOM_UNKNOW_ERROR
                        }
                    }
                    
                    if(data.type == taskType.INSTALL_APK){
                        if(data.res.code == installCode.TRANSFERING || 
                          data.res.code == installCode.WAITING||
                          data.res.code == installCode.WIFI_APP_INS_POPUP_SUCCESS
                          ){
                            data.res = {};
                            data.res.code = installCode.CUSTOM_UNKNOW_ERROR
                        }
                    }
                    
                    me.addTask(model, {trigger: false});
                    
                    app.getUserConfig(function(res){
                        var userConfig = res.info || {};
                        if(userConfig.autoUnFinishTasksWithoutNotice == 1 && data.type == taskType.DOWNLOAD){
                            
                            if(connection.isConnect()){
                                model.continueDownload();
                            }else {
                                var hdl = (function(m){
                                    return function(){
                                        if(connection.isConnect()){
                                            m.continueDownload();
                                            connection.off('connection', hdl);
                                        }
                                    }
                                })(model);
                            
                                connection.on('connection', hdl);
                            }
                        }
                    });
                });
                me.trigger('update');
                
                me.initTaskByConfig();
                
                this.binding(apiNames.BIND_INSTALL_APK, this.installRelativeApk.bind(this));
                this.request({
                    action: apiNames.REQ_INSTALL_APK_INFO
                });
            }.bind(this));

            this.on('update', (function(){
                this.saveProgressTask();
            }).bind(this));
            
            connection.on('connection', function(){
                this.initTaskByConfig();
                if(!connection.isConnect()){
                    this.trigger('update');
                }
            }.bind(this));
        },
        
        installRelativeApk: function(res){
            var info  = res.info;
            console.log("task中安装app",res);
            if(res.info.status!=1&&res.taskCenter!=1){
                return;
            }
            var exModel = this.getTaskByPkAndVersion(info.packageName, info.versionCode, info.localPath);
            
            if(!exModel){
                
                var pth = info.localPath;
                var name = pth.slice(pth.lastIndexOf('\\') + 1);
                
                var data = {
                    name: info.apkName || name,
                    iconPath: info.imagePath || "common\\images\\ico\\default-rim-app.png",
                    path: info.localPath,
                    size: utils.convertSizeToString(info.size || 0),
                    packageName: info.packageName,
                    versionCode: info.versionCode,
                    statistics: {
                        p_module: "relApk",
                        p_action: "relApk"
                    }
                };
                
                if(connection.isConnect()){
                    exports.instappApp(data);
                }else{
                    data.type = taskType.INSTALL_APK;
                    data.res = {
                        code: adbCode.ADB_FAILED_DEVICE_NO_DEVICE,
                        info: {}
                    };
                    
                    var model = new Model(data);
                    progressColl.addTask(model);
                    
                    var hdl = (function(m){
                        return function(){
                            if(connection.isConnect()){
                                m.installApp();
                                connection.off('connection', hdl);
                            }
                        }
                    })(model);
                    connection.on('connection', hdl);
                }
            }else{
                var res = exModel.get("res");
                
                if(res.code != installCode.SUCCESS && res.code != installCode.TRANSFERING){
                    exModel.installApp();
                }
            }
            
            if(res.taskCenter == 1){
                app.navigate({
                    module: 'task',
                    action: 'task'
                });
            }
        },
        
        getTaskByPkAndVersion: function(pk, vc, path){
            var tasks = this.models;
            for(var i=0; i < tasks.length; i++){
                var task = tasks[i];
                
                var pname = task.get('packageName');
                var versionCode = task.get('versionCode');
                var pt = task.get("path");
                
                if(pname && pk == pname){
                    if(typeof vc == 'undefined' || vc == versionCode){
                        return task;
                    }
                }
                if(!pname && !versionCode && !pk && !vc){
                    if(pt == path){
                         return task;
                    }
                }
            }
            return false;
        },
       
        parse: function( res ){
            var list = res.info.list;
            return list;
        },
        
        addTask: function(taskModel, opts){
            opts = opts || {trigger: true};
            
            this.models.splice(0, 0, taskModel);
            this.modelMap[taskModel.getId()] = taskModel;
            
            taskModel.on('remove', _.bind(function(){
                this.remove(taskModel);
            }, this));
            
            taskModel.on('change', _.bind(function(){
                this.trigger('taskChange');
            }, this));
        	
            this.historyModel[taskModel.getId()] = taskModel;
            
            if(typeof opts.trigger == 'undefined' || opts.trigger){
                this.trigger('update');
            }
        },
 //初始化任务的状态       
        initTaskByConfig: function(){
            app.getUserConfig(function(res){
                var userConfig = res.info || {};
                
                this.hdr = function(){
                    connection.off("connection", this.hdr);
                    if(connection.isConnect() && userConfig.installUnFinishDAppsWithoutNotice == 1){
                        var models = this.models;
                        models.forEach(function(model){
                            if(model.get('url') && model.get('type') == taskType.INSTALL_APK){
                                var res = model.get('res');
                                res = res || {};
                                if(res.code != installCode.SUCCESS){
                                    model.installApp();
                                }
                            }
                            
                            if(model.get('url')){
                                var res = model.get('res');
                                res = res || {};
                                  
                                var t = model.get('type');
                                if(t==taskType.IMPORT_BOOK){
                                    if(res.code != importCode.SUCCESS){
                                        model.importBook();
                                    }                                    
                                }else  if(t == taskType.IMPORT_MUSIC){
                                    if(res.code != importCode.SUCCESS){
                                        model.importMusic();
                                    }
                                }else if(t == taskType.IMPORT_VIDEO){
                                    if(res.code != importCode.SUCCESS){
                                        model.importVideo();
                                    }
                                }else if(t == taskType.IMPORT_PICTURE){
                                    if(res.code != importCode.SUCCESS){
                                        model.importPicture();
                                    }
                                }
                            }
                        });
                    }
                }.bind(this);
                
                if(connection.isConnect()){
                    this.hdr();
                }else {
                    connection.on("connection", this.hdr);
                }
            }.bind(this));
        },
        
        hasStoppedTask: function(){
            var tasks = this.models;
            for(var i=0; i < tasks.length; i++){
                var task = tasks[i];
                var res = task.get('res');
                
                if(res && res.code == downloadCode.STOP_DOWNLOAD && task.isSelected()){
                    return true;
                }
            }
            return false;
        },
        
        hasProccessingTasks: function(){
            var tasks = this.models;
            for(var i=0; i < tasks.length; i++){
                var task = tasks[i];
                var res = task.get('res');
                var type = task.get('type');
                
                if(res && res.code == downloadCode.DOWNLOADING){
                    return true;
                }
                
                if(!res){
                    if(type == taskType.IMPORT_MUSIC ||
                        type == taskType.IMPORT_VIDEO ||
                        type == taskType.IMPORT_PICTURE ||
                        type == taskType.SET_WALLPAPER || 
                        type == taskType.SET_RINGTONE ||
                        type == taskType.IMPORT_BOOK||
                        type == taskType.INSTALL_APK){
                        return true;
                    }
                }
            }
            return false;
        },
        
        /*
         * 是否选择正在进行的任务
         */
        hasSelectedDownloadingTask: function(){
            var tasks = this.models;
            for(var i=0; i < tasks.length; i++){
                var task = tasks[i];
                var res = task.get('res');
                
                if(res && res.code == downloadCode.DOWNLOADING && task.isSelected()){
                    return true;
                }
            }
            return false;
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
        
        batchPauseTask: function(){
            var modelIds = progressColl.getSelectedMap();
            //*********************************************************
            //20140724 新版日志
            var count = 0;
            //*********************************************************
            for(var id in modelIds){
                var model = progressColl.getModelById(id);
                var type = model.get("type");
                
                if(type == taskType.DOWNLOAD){
                    //*********************************************************
                    //20140724 新版日志
                    count = count + 1;
                    var logObject = {
                        class: "downloadmanager",
                        page: "downloadmanager",
                        module: "menu",
                        action: "download",
                        mtypecode: model.get('resType'),
                        typecode: model.get('resType'),
                        targetvalue: model.get('resId'),
                        status: 3,
                        source: 0,
                        doagain: 0
                    }                
                    utils.sendNewLog("1000100", logObject);
                    //*********************************************************
                    model.stopDownload();
                }
            }
            //*********************************************************
            //20140724 新版日志
            return count;
            //*********************************************************
        },
        
        //继续下载所有的任务
        continueAllTask: function(isFromMenu){
            var tasks = this.models;
            //*********************************************************
            //20140724 新版日志
            var count = 0;
            //*********************************************************
            for(var i = tasks.length - 1; i >= 0; i--){
                var task = tasks[i];
                var res = task.get('res');
                var type = task.get('type');
                
                if(type == taskType.DOWNLOAD && res && task.isSelected()){
                    if(res.code == downloadCode.STOP_DOWNLOAD || res.code == downloadCode.WAITING){
                        //*********************************************************
                        //20140724 新版日志
                        count = count + 1;

                        var logObject = {
                            class: "downloadmanager",
                            page: "downloadmanager",
                            module: "menu",
                            action: "download",
                            mtypecode: task.get('resType'),
                            typecode: task.get('resType'),
                            targetvalue: task.get('resId'),
                            status: 4,
                            source: 0,
                            doagain: 0
                        }                
                        utils.sendNewLog("1000100", logObject);
                        //*********************************************************
                        task.continueDownload();
                    }
                }
            }
            //*********************************************************
            //20140724 新版日志
            return count;
            //*********************************************************
        },
        
        continueWaiting: function(){
            var tasks = this.models;
            var cwc = 0;
            var prc = 0;
            
            for(var i = tasks.length - 1; i >= 0; i--){
                var task = tasks[i];
                var res = task.get('res');
                var type = task.get('type');
                
                if(type == taskType.DOWNLOAD && res && res.code == downloadCode.WAITING){
                    if(cwc < 6){
                        task.continueDownload();
                        this.trigger("continueDownload",{res:res});
                    }else{
                        break;
                    }
                    cwc++;
                }
                
                var newRes = task.get('res');
                
                if(type == taskType.DOWNLOAD && newRes && newRes.code == downloadCode.DOWNLOADING){
                    prc += 1;
                    if(prc >= 6){
                        break;
                    }
                }
            }
        },
        
        saveProgressTask: function(){
            var models = this.models;
            var jsonDatas = [];
            
            models.forEach(function(model){
                var data = model.data;
                jsonDatas.push(data);
            });
            this.request({
                action: apiNames.REQ_SAVE_TASK_INFO,
                paras : {
                    type: 1,
                    list: encodeURIComponent(JSON.stringify(jsonDatas))
                },
                callback: function(res){
                    console.log('res save task--------');
                }
            });
        },
        
        getSavedProgresses: function(callback){
            var me = this;
            this.request({
                action: apiNames.REQ_GET_TASK_CENTER_INFO,
                paras: {
                    type: 1  
                },
                callback: function(res){
                    callback && callback.call(this, res);
                }
            });
        },
        
        deleteTask: function(taskIds){
            var me = this;
            var deleteCallbackCount = 0;
            var deletedModels = [];
            
            taskIds.forEach(function( taskId ){
                var model = this.getModelById(taskId);
                
                if(!model){
                    return;
                }
                
                deletedModels.push(model);
                
                var res = model.data.res;
                var path = '';
                var type = model.get("type");
                
                this.remove(model, {trigger: false});
                
                //置任务删除状态
                model.deleted = true;
                
                //如果url存在程序就认为是下载过的类型
                //下载过的类型可以删除本地的文件
                if(model.get('url')){
                    if(res && res.info){
                        path = res.info.localPath || res.info.path;
                    }else{
                        path = path || model.data.path || '';
                    }
                    
                    this.request({
                        action: apiNames.REQ_DELETE_TASK,
                        paras: {  
                            id: taskId,
                            path: path
                        },
                        callback: function(res){
                            deleteCallbackCount++;
                            if(deleteCallbackCount == taskIds.length){
                                me.saveProgressTask();
                            }
                        }
                    });
                }else{
                    deleteCallbackCount++;
                    if(deleteCallbackCount == taskIds.length){
                        me.saveProgressTask();
                    }
                }
                
                var paras = {
                    id: taskId
                };
                
                if(type == taskType.IMPORT_MUSIC){
                    this.request({
                        action: "get_StopImportMusic",
                        paras: paras
                    });
                }else if(type == taskType.IMPORT_PICTURE){
                    this.request({
                        action: "get_StopImportImage",
                        paras: paras
                    });
                }else if(type == taskType.IMPORT_VIDEO){
                    this.request({
                        action: "get_StopImportVideo",
                        paras: paras
                    });
                }else if(type == taskType.IMPORT_BOOK){
                    this.request({
                        action: "get_StopImportEBook",
                        paras: paras
                    });
                }else if(type == taskType.INSTALL_APK){
                    this.request({
                        action: "get_StopInstallApp",
                        paras: paras
                    });
                }
            }, this);
            
            this.trigger('update');
            this.trigger('batchdelete', deletedModels);
            
            progressColl.continueWaiting();
            app.eventCenter.trigger('refresh_resource_app_status');
        },
        
        hasDownloadingTasks: function(){
            var tasks = this.models;
            
            for(var i=0; i < tasks.length; i++){
                var task = tasks[i];
                var res = task.get('res');
                if(res && res.code == downloadCode.DOWNLOADING){
                    return true;
                }
            }
            return false;
        },
        
        isRepeatDownloadingTask: function(resURL){
            var tasks = this.models;
            
            for(var i=0; i < tasks.length; i++){
                var task = tasks[i];
                var data = task.data;
                
                if(task.get('url') === resURL){
                    console.log("重复任务,url相同");
                    if(!data.res || (data.res &&  data.res.code === downloadCode.DOWNLOADING)){
                        this.trigger("repeatDownload",{type:task.get("type")});
                        return task;
                    }
                }else if(utils.getParameter("md5",resURL)&&(utils.getParameter("md5",resURL)==utils.getParameter("md5",task.get('url')))){
                    console.log("重复任务,文件md5相同");
                    return task;
                }
            }
            return false;
        },
        /**
         * @descript 是否为重复的youtube下载,特殊处理youtube不同时间请求url不同的问题
         * @author liujintao 
         * @since 2014-05-06
         * @param youtubeObj包含youtube的resType、videoId、name，这两项确定是否是重复下载，name为title(标题)+pix(分辨率)+ext(后缀)的组合
         * */
        isRepeatDownloadingYoutube:function(youtubeObj){
            var tasks = this.models;
            for(var i=0; i < tasks.length; i++){
                var task = tasks[i];
                var data = task.data;
                
                if(task.get('resType') === youtubeObj.resType&&task.get('name') === youtubeObj.name){
                    if(!data.res || (data.res &&  data.res.code === downloadCode.DOWNLOADING)){
                        return task;
                    }
                }
            }
            return false;
        },

        isRepeatedFailedDownloadTask: function(resURL){
            var tasks = this.models;
            
            for(var i=0; i < tasks.length; i++){
                var task = tasks[i];
                var data = task.data;
                
                if((task.get('url') === resURL||(utils.getParameter("md5",resURL)&&utils.getParameter("md5",task.get("url"))==utils.getParameter("md5",resURL))) && data.res){
                    if(task.get('type') == taskType.DOWNLOAD && data.res.code !== downloadCode.DOWNLOADING && 
                        data.res.code != downloadCode.COMPLETE && 
                        data.res.code != downloadCode.WAITING){
                        
                        //记录上一次的状态    
                        var std = progressColl.selectedMap[task.id];
                        
                        progressColl.remove(task);
                        progressColl.addTask(task);
                        
                        //progressColl.remove(task) 会清除上一次的选择状态， 所以在这里恢复。
                        progressColl.selectedMap[task.id] = std;
                        
                        task.continueDownload();
                    }
                    
                    if(task.get('type') == taskType.INSTALL_APK && data.res){
                        if(data.res.code != installCode.SUCCESS){
                            task.installApp();
                        }
                    }
                    
                    if(task.get('type') == taskType.IMPORT_MUSIC && data.res){
                        if(data.res.code != importCode.SUCCESS){
                            task.importMusic();
                        }
                    }
                    
                    if(task.get('type') == taskType.IMPORT_VIDEO && data.res){
                        if(data.res.code != importCode.SUCCESS){
                            task.importVideo();
                        }
                    }
                    
                    if(task.get('type') == taskType.IMPORT_PICTURE && data.res){
                        if(data.res.code != importCode.SUCCESS){
                            task.importPicture();
                        }
                    }
                    
                    if(task.get('type') == taskType.SET_WALLPAPER && data.res){
                        if(data.res.status != 1){
                            task.setWallpaper();
                        }
                    }
                    if(task.get('type') == taskType.SET_RINGTONE && data.res){
                        if(data.res.status != 1){
                            task.setRingtone();
                        }
                    }
                    /*import ebook by liujintao start*/
                   if(task.get('type') == taskType.IMPORT_BOOK && data.res){
                        if(data.res.code != importCode.SUCCESS){
                            task.importBook();
                        }
                    }
                   /*import ebook by liujintao end*/
                    this.trigger("repeatDownload",{type:task.get("type")});
                    return task;
                }
            }
            return false;
        },

        isUpdating: function(appData){
            var tasks = this.models;
            
            for(var i=0; i < tasks.length; i++){
                var task = tasks[i];
                var res = task.get('res');
                var type = task.get('type');
                var vc = parseInt(task.get('versionCode'));
                var rvc = parseInt(appData.versionCode);
                
                if(task.get('resType') == resourceType.M_APK && 
                    appData.packageName == task.get('packageName') && 
                    vc >= rvc){
                        
                    if(!res){
                        return true;
                    }else{
                        if(type == taskType.DOWNLOAD){
                            if(res.code === downloadCode.DOWNLOADING || res.code == downloadCode.WAITING){
                                return true;
                            }
                        }else if(type==taskType.INSTALL_APK){
                            if(connection.isConnect() && 
                                res.code != installCode.SUCCESS && 
                                res.code != adbCode.ADB_FAILED_DEVICE_NO_DEVICE){
                                return true;
                            }                            
                        }
                    }
                }
            }
            return false;
        },

        doNextImportTask: function(){
           var tasks = this.models;
           var len = tasks.length;
           var _this = this;
           console.log("开始下一个导入");
           for(var i= len - 1; i >= 0; i--){
                var task = tasks[i];
                var type = task.get('type');
                var res = task.get('res');
                
                //res属性不存在说明还未安装过
                if(type == taskType.INSTALL_APK && res && res.code == installCode.WAITING){
                    if(tasks[i].installApp()){
                        continue;
                    }else{
                        break;
                    }
                }
                
                if(type == taskType.IMPORT_MUSIC && res && res.code == importCode.WAITING){
                    if(tasks[i].importMusic()){
                        continue;
                    }else{
                        break;
                    }
                }
                
                if(type == taskType.IMPORT_VIDEO && res && res.code == importCode.WAITING){
                    if(tasks[i].importVideo()){
                        continue;
                    }else{
                        break;
                    }
                }
                //importBook add by liujintao
                if(type == taskType.IMPORT_BOOK && res&& res.code == importCode.WAITING){
                    if(tasks[i].importBook()){
                        continue;
                    }else{
                        break;
                    }
                }
                if(type == taskType.IMPORT_PICTURE && res && res.code == importCode.WAITING){
                    setTimeout((function(t){
                        return function(){
                            if(t.importPicture()){
                                _this.doNextImportTask();
                            }
                        }
                    })(tasks[i]), connection.isConnect() ? 500 : 0);
                    break;
                }
            }
        }
    });
    
    /*已完成的任务列表*/
   
    var CompleteCollection =  gridModel.Collection.extend({
        init: function(){
            var me = this;
            CompleteCollection.__super__.init.apply(this, arguments);
            this.getSavedProgresses(function(res){
                var list = [];
                if(res.list){
                    list = JSON.parse(decodeURIComponent(res.list));
                }
                list.forEach && list.forEach(function(data){
                    console.log("完成的任务状态",data);
                    if(data.res.code==importCode.SUCCESS||data.res.code==installCode.SUCCESS){
                        var model = new Model(data);
                        me.push(model);                        
                    }
                });
                console.log("complete list:",list);
                me.trigger('update');
            });
            
            this.on('update', this.save.bind(this));
        },

        parse: function(){},
        
        addTask: function(taskModel){
            var id = taskModel.data.id;
            var exist = this.getModelById(id);
            
            if(exist||taskModel.data.res.code==undefined||(taskModel.data.res.code!=installCode.SUCCESS&&taskModel.data.res.code!=importCode.SUCCESS)||(taskModel.get("url")&&this.isRepeatDownloadTask(taskModel.get("url")))){
                console.log("任务已经存在，不再进行下载.................................................................",taskModel);
                return;
            }
            
            taskModel.setSelected(false);
            this.models.splice(0, 0, taskModel);
            this.modelMap[taskModel.getId()] = taskModel;
            taskModel.on('remove', _.bind(function(){
                this.remove(taskModel);
            }, this));
            this.trigger('update');
            
            this.save();
        },
        
        save: function(){
            var models = this.models;
            var jsonDatas = [];
            
            models.forEach(function(model){
                var data = model.data;
                    if(data.type==taskType.INSTALL_APK){
                        data.res.code=installCode.SUCCESS;
                    }else if(data.type==taskType.DOWNLOAD){
                        data.res.code=downloadCode.SUCCESS;
                    }else{
                        data.res.code=importCode.SUCCESS;
                    }
                jsonDatas.push(data);
            });
            
            this.request({
                action: apiNames.REQ_SAVE_TASK_INFO,
                paras : {
                    type: 2,
                    list: encodeURIComponent(JSON.stringify(jsonDatas))
                },
                callback: function(res){
                    console.log('Save Complete');
                }
            });
        },
        
        getSavedProgresses: function(callback){
            var me = this;
            this.request({
                action: apiNames.REQ_GET_TASK_CENTER_INFO,
                paras: {
                    type: 2
                },
                callback: function(res){
                    callback && callback.call(this, res);
                }
            });
        },
        
        isRepeatDownloadTask: function(resURL){
            var tasks = this.models;
            
            for(var i=0; i < tasks.length; i++){
                var task = tasks[i];
                var data = task.data;
                
                if(task.get('url') === resURL){
                    return task;
                }else  if(task.get('url')&&utils.getParameter("md5",resURL)&&(utils.getParameter("md5",resURL)==utils.getParameter("md5",task.get('url')))){
                    console.log("重复任务,文件md5相同");
                    return task;
                }
            }
            return false;
        },
        /**
         * @descript 是否为已完成的youtube下载,特殊处理youtube不同时间请求url不同的问题
         * @author liujintao 
         * @since 2014-05-06
         * @param youtubeObj包含youtube的resType、name，这两项确定是否是重复下载，name为title(标题)+pix(分辨率)+ext(后缀)的组合
         * */        
        isRepeatDownloadYoutube: function(youtubeObj){
            var tasks = this.models;
            
            for(var i=0; i < tasks.length; i++){
                var task = tasks[i];
                var data = task.data;
                
                if(task.get('resType') === youtubeObj.resType&&task.get('name') === youtubeObj.name){
                    return task;
                }
            }
            return false;
        },
        
        deleteTask: function(taskIds){
            var me = this;
            
            var deleteCallbackCount = 0;
            
            taskIds.forEach(function( taskId ){
                var model = this.getModelById(taskId);
                
                if(!model){
                    return;
                }
                
                var res = model.data.res;
                var path = '';
                
                this.remove(model, {trigger: false});
                
                //如果url存在程序就认为是下载过的类型
                //下载过的类型可以删除本地的文件
                if(model.get('url')){
                    if(res && res.info){
                        path = res.info.localPath || res.info.path || model.data.path;
                    }
                    deleteCallbackCount++;
                    if(deleteCallbackCount == taskIds.length){
                        me.save();
                    }         
                    /*           
                    this.request({
                        action: apiNames.REQ_DELETE_TASK,
                        paras: {  
                            id: taskId,
                            path: path
                        },
                        callback: function(res){
                            deleteCallbackCount++;
                            if(deleteCallbackCount == taskIds.length){
                                me.save();
                            }
                        }
                    });*/
                }else{
                    deleteCallbackCount++;
                    if(deleteCallbackCount == taskIds.length){
                        me.save();
                    }
                }
            }, this);
            
            this.trigger('update');
        }
    });
    
    var progressColl = new ProgressCollection();
    var completeColl = new CompleteCollection();
    var downloadingSpeed = 0;
    var saveProgressTaskTime = 0;
    
    
    var getBaseStatistics = function(data){
        console.log("APP >> get app base statistics: ", data);

        var statistics  = model.get('statistics');
        statistics = _.extend({}, statistics);
        
        var ss = {};
        
        ss.p_module = statistics.p_module;
        delete statistics.p_module;
        ss.p_action = statistics.p_action;
        delete statistics.p_action;
        ss.sm = statistics.sm;
        delete statistics.sm;
        
        if(model.get('resType')){
            ss.rt = model.get('resType');
        }
        
        _.extend(ss, statistics); 
        
        return ss;
    };
    /*监听apk安装*/
    var onInstallApkInvoke=function(res){
            console.log("任务中心监听中新增的apk");
            console.log(res);
           // console.log(JSON.stringify(progressColl.models));
            progressColl.models.forEach(function(model){
                if((model.get("packageName")==res.info.sAppPackage)&&(model.data.res.code==installCode.WIFI_APP_INS_POPUP_SUCCESS||model.data.res.code==installCode.SUCCESS||model.data.res.code==downloadCode.COMPLETE)){
                    model.data.res.code=installCode.SUCCESS;
                    progressColl.remove(model);
                    completeColl.addTask(model);                      
                }
            });
    };
    var OnRecierTask = function(res){
        //console.log('TASK==++++++++++++++++++++++++++++++++', JSON.stringify(res));
        
        var me = this;
		var originCode = res.code;
        
        //手机断开连接
        if(res.code == -5){
            res.code = importCode.DISCONNECT;
        }
        
        //获取任务    
        var model = progressColl.getModelById(res.info.id);
        //重置packageName，解决wifi下大型游戏没有packageName的问题start
        try{
	        if(!model.get("packageName")&&res.info.packageName){
	            model.set("packageName",res.info.packageName);
	        }
        }catch(e){

        }
        //重置packageName，解决wifi下大型游戏没有packageName的问题end
        try{
             if(!model){
                 model = progressColl.historyModel[res.info.id];
             }
             //改变任务的状态， 直接把res赋值给当前任务
             var type = model.get('type');
             //正在等待的任务， 保留之前的状态
             if(type == taskType.DOWNLOAD && res.code == downloadCode.WAITING){
                 res = _.extend({}, model.data.res);
                 res.code = downloadCode.WAITING;
             }else if(type == taskType.DOWNLOAD && res.code == downloadCode.STOP_DOWNLOAD){
                 res = _.extend({}, model.data.res);
                 res.code = downloadCode.STOP_DOWNLOAD;
             }else if(type == taskType.IMPORT_VIDEO || 
                 type == taskType.IMPORT_MUSIC || 
                 type == taskType.IMPORT_PICTURE||
                 type ==taskType.IMPORT_BOOK ){
                 //过滤为忙的操作
                 if(res && res.status == -1){
                    res.code = importCode.WAITING;
                 }
                 
                 if(res.code == importCode.SYNC_FILE_ERROR){
                     res.code = importCode.SUCCESS;
                 }
             }else if(type == taskType.INSTALL_APK){
                 //过滤为忙的操作
                 if(res && res.status == -1){
                     res.code = installCode.WAITING;
                 }
             }
             
             if(type == taskType.DOWNLOAD && res.code != downloadCode.WAITING 
                 && res.code != downloadCode.DOWNLOADING && res.code != downloadCode.COMPLETE
                 && res.code != downloadCode.STOP_DOWNLOAD){
                 res.info = res.info || {};
                 var originInfo = model.data.res.info || {};
                 
                 res.info.finishRate = originInfo.finishRate;
             }
             
             if(type == taskType.DOWNLOAD && res.code == downloadCode.DOWNLOAD_NON_COMPLETE){
                 if(!model.retryMDFailed){
                     model.retryMDFailed = true;
                     model.continueDownload();
                     return;
                 }
             }
             
            // console.log('RESPONSE_TASK_ID:' + res.info.id);
             
             model.set('res', res);
        }catch(e){
             console.log("RECEIVER TASK ERROR=", res);
        }
        
        switch(type){
            case taskType.INSTALL_APK:
                //console.log(connection,JSON.stringify(res));
                //utils.log.out('INTALL_APP_LOG:' + utils.logTime.end('installapp'));
                
                if(res.code == installCode.WAITING || res.code == installCode.TRANSFERING){
                    //TODO
                }else if(res.code == installCode.SUCCESS&&connection.wifiModel!=1){//usb连接时的安装完成
                	//console.log("装下一个应用=============================================================");
                    progressColl.doNextImportTask();
                    
                    // var ss = getBaseStatistics(model);
                    // ss.action = 'installAppSuccess';
                    // utils.sendStatistics(ss);
                    if (model.data.statistics.s5['msg']){
                        model.data.statistics.s5['msg'] = null;
                        delete model.data.statistics.s5['msg'];
                    }
                    model.data.statistics['s6'] = 3;
                    utils.sendStatisticsDownload(model.data.statistics);

                    //*********************************************************
                    //20140724 新版日志
                    var logObj = model.get("nstatistics");
                    if (logObj){
                        logObj.status = 8;
                        logObj.source = 0;            
                        utils.sendNewLog("1000100", logObj);
                    }
                    //*********************************************************
                    
                    try{
                        var appModel = require('appModel');
                        console.log("安装完成：");
                        console.log(res.info);
                        var packageName = res.info.packageName|| model.get('packageName');
                        
                        var appMe = new appModel.Model({
                            sName: res.info.apkName || '',
                            sThumbnailPath: res.info.imagePath||model.data.iconPath,
                            sAppVersion: res.info.version,
                            sAppVersionCode: res.info.versionCode || model.data.versionCode,
                            sAppPackage: res.info.packageName|| model.get('packageName') ,
                            sAppSize:　model.get('size')
                        });
                        
                        var mdl = appModel.getAppByPk(packageName);
                        if(mdl && mdl.getProperty("appType") == 3){
                            appModel.systemCollection.addApp(appMe);
                        }else{
                            appModel.localCollection.addApp(appMe);
                        }

                    }catch(e){
                        console.log(e.message);
                    }
                    
                    if(model.deleted){
                        return;
                    }
                    
                    progressColl.remove(model);
                    completeColl.addTask(model);
                }else{
                    progressColl.doNextImportTask();
                    
                    //var ss = getBaseStatistics(model);
                    // ss.action = 'installAppError';
                    // ss.adbCode = res.code;
                    // utils.sendStatistics(ss);
                    model.data.statistics['s6'] = 4;
                    model.data.statistics.s5['msg'] = res.code;
                    utils.sendStatisticsDownload(model.data.statistics);

                    //*********************************************************
                    //20140724 新版日志
                    var logObj = model.get("nstatistics");
                    if (logObj){
                        logObj.status = 9;
                        logObj.source = 0;
                        logObj.error = res.code;            
                        utils.sendNewLog("1000100", logObj);
                    }
                    //*********************************************************

                }

                if(res.code == importCode.SUCCESS&&res.finish&&res.info.packageName){
                    completeColl.trigger("install_app_done",{type:taskType.INSTALL_APK,data:res.info,success:true});
                } else if (res.finish&&res.info.packageName) {
                    completeColl.trigger("install_app_done",{type:taskType.INSTALL_APK,data:res.info,success:false});
                }
                app.eventCenter.trigger('refresh_resource_app_status');
                
                break;
            case taskType.DOWNLOAD:
                if(res.code === downloadCode.DOWNLOADING){
                    
                }else if(res.code == downloadCode.COMPLETE){
                    try{
                        //如果是图片和铃音的资源类型下载完成后， 如果已经断开连接
                        if(model.get('resType') == resourceType.M_IMAGE_WALLPAPER || 
                           model.get('resType')==resourceType.M_IMAGE||
                           model.get('resType') == resourceType.M_RING||
                           model.get('resType') == resourceType.M_YOUTUBE||
                           model.get('resType') == resourceType.M_BOOK
                           ){
                            if(connection.isConnect()){
                                model.data.res = null;
                            }else{
                                model.data.res = {
                                    code: importCode.DISCONNECT,
                                    info: {}
                                };
                            }
                        }else{
                            //2014-05-22被liujintao注掉，解决update的apk没有version和versionCode的bug
                           // model.data.res = null;
                        }
                        
                        //*********************************************************
                        //20140724 新版日志
                        var status = 0;
                        //*********************************************************
                        if(model.get('resType') == resourceType.M_IMAGE_WALLPAPER){
                            model.data.desType = importDes.WALLPAPER;
                            model.data.path = res.info.localPath;
                            model.set('type', taskType.IMPORT_PICTURE);
                            model.importPicture();
                            //*********************************************************
                            //20140724 新版日志
                            status = 10;
                        }else if(model.get('resType') == resourceType.M_APK){
                            model.data.path = res.info.localPath;
                            model.set('type', taskType.INSTALL_APK);
                            model.installApp();
                            status = 7;
                        }else if(model.get('resType') == resourceType.M_RING){
                            model.data.path = res.info.localPath;
                            model.set('type', taskType.IMPORT_MUSIC);
                            model.importMusic();
                            status = 10;                            
                        }else if(model.get('resType')==resourceType.M_YOUTUBE){//add download youtube by liujintao 2014-05-04
                            model.data.path = res.info.localPath;
                            model.set('type', taskType.IMPORT_VIDEO);
                            model.importVideo();
                            status = 10;                            
                        }else if(model.get('resType')==resourceType.M_BOOK){//add download book by liujintao 2014-07-17
                            model.data.path = res.info.localPath;
                            model.set('type', taskType.IMPORT_BOOK);
                            model.importBook();
                            status = 10;
                            //*********************************************************                                      
                        }
                    }catch(e){}

                    progressColl.continueWaiting();
                    //下载完成统计信息
                    model.data.statistics['s6'] = 1;
                    utils.sendStatisticsDownload(model.data.statistics);

                    //*********************************************************
                    //20140724 新版日志
                    var logObj = model.get("nstatistics");
                    logObj.status = status;
                    logObj.source = 0;
                    logObj.p2pMoude = res.p2pMoude;
                    logObj.p2pCode = res.p2pCode;
                    logObj.doagain = model.get('isRetry') === true ? 1 : 0;               
                    utils.sendNewLog("1000100", logObj);
                    //*********************************************************

                }else if(res.code == downloadCode.WAITING){
                    //*********************************************************
                    //20140724 新版日志
                    var logObj = model.get("nstatistics");
                    logObj.status = 2;
                    logObj.source = 0;
                    logObj.doagain = model.get('isRetry') === true ? 1 : 0;               
                    utils.sendNewLog("1000100", logObj);
                    //*********************************************************
                    //TODO
                }else{
                    progressColl.continueWaiting();
                    //下载失败统计信息
                    model.data.statistics['s6'] = 2;
                    model.data.statistics.s5['msg'] = res.code;
                    utils.sendStatisticsDownload(model.data.statistics);

                    //*********************************************************
                    //20140724 新版日志
                    var logObj = model.get("nstatistics");
                    logObj.status = 5;
                    logObj.error = res.code;
                    logObj.p2pMoude = res.p2pMoude;
                    logObj.p2pCode = res.p2pCode;             
                    utils.sendNewLog("1000100", logObj);
                    //*********************************************************

                }
                break;
           case taskType.IMPORT_MUSIC://导入音乐
                //utils.log.out('IMPORT_MUSIC_LOG:' + utils.logTime.end('importmusic'));
                
                if(res.code == importCode.WAITING || res.code == importCode.TRANSFERING){
                    //TODO
                }else if(res.code == importCode.SUCCESS){
                    progressColl.doNextImportTask();
                    
                    if(model.deleted){
                        return;
                    }
                    
                    var at = model.get('actionType');
                    
                    if(at == actionType.SET_RINGTONE || 
                       at == actionType.SET_ALARM || 
                       at == actionType.SET_SMS_RINGTONE){
                        
                        model.data.mediaId = res.info.mediaId;
                        model.data.remotePath = res.info.sMusicRemotePath;
                        //model.data.res = null;
                        
                        if(at == actionType.SET_RINGTONE){
                            model.set('type', taskType.SET_RINGTONE);
                        }else if(at == actionType.SET_ALARM){
                            model.set('type', taskType.SET_ALARM);
                        }else if(at == actionType.SET_SMS_RINGTONE){
                            model.set('type', taskType.SET_SMS_RINGTONE);
                        }
                        model.setMusic();
                    }else{
                        progressColl.remove(model);
                        completeColl.addTask(model);
                    }
                    
                    /*add by liujintao notice others for import success*/
                    if(res.code == importCode.SUCCESS&&res.finish&&res.info.mediaId){
                        completeColl.trigger("import",{type:taskType.IMPORT_MUSIC,data:res.info,success:true});
                    }
                     
                    //导入音乐成功统计
                    if (model.data.statistics.s5['msg']){
                        model.data.statistics.s5['msg'] = null;
                        delete model.data.statistics.s5['msg'];
                    }
                    model.data.statistics['s6'] = 3;
                    utils.sendStatisticsDownload(model.data.statistics);

                    //*********************************************************
                    //20140724 新版日志
                    var logObj = model.get("nstatistics");
                    if (logObj){
                        logObj.status = 11;
                        logObj.source = 0;         
                        utils.sendNewLog("1000100", logObj);
                    }
                    //*********************************************************
                }else{
                    progressColl.doNextImportTask();
                   if(!connection.isConnect()){
                        res = _.extend({}, res);
                        res.code = importCode.DISCONNECT;
                        model.set('res', res);
                    }else  if(connection.deviceInfo && !connection.deviceInfo.isSDCardExist){
                        res = _.extend({}, res);
                        res.code = importCode.NoSDCard;
                        model.set('res', res);
                    } 
                    //导入音乐失败统计
                    model.data.statistics['s6'] = 4;
                    model.data.statistics.s5['msg'] = res.code;
                    utils.sendStatisticsDownload(model.data.statistics);
                    /*add by liujintao notice others for import failed*/
                   if(res.code !== importCode.SUCCESS&&res.finish){
                      completeColl.trigger("import",{type:taskType.IMPORT_MUSIC,data:res.info,success:false});
                    }

                    //*********************************************************
                    //20140724 新版日志
                    var logObj = model.get("nstatistics");
                    if (logObj){
                        logObj.status = 12;
                        logObj.source = 0;
                        logObj.error = res.code;          
                        utils.sendNewLog("1000100", logObj);
                    }
                    //*********************************************************
                }
                break;
           case taskType.IMPORT_BOOK:
                utils.log.out('IMPORT_BOOK_LOG:' + utils.logTime.end('importbook'));
                 if(res.code == importCode.WAITING || res.code == importCode.TRANSFERING){
                    //TODO
                }else if(res.code == importCode.SUCCESS){
                        progressColl.doNextImportTask();
                        progressColl.remove(model);
                        completeColl.addTask(model);
                    /*add by liujintao notice others for import success*/
                    if(res.code == importCode.SUCCESS&&res.finish&&res.info.sBookId){
                        completeColl.trigger("importBook",{type:taskType.IMPORT_BOOK,data:res.info,success:true});
                     }
                    //导入book成功统计
                    if (model.data.statistics.s5['msg']){
                        model.data.statistics.s5['msg'] = null;
                        delete model.data.statistics.s5['msg'];
                    }
                    model.data.statistics['s6'] = 3;
                    utils.sendStatisticsDownload(model.data.statistics);

                    //*********************************************************
                    //20140724 新版日志
                    var logObj = model.get("nstatistics");
                    if (logObj){
                        logObj.status = 11;
                        logObj.source = 0;        
                        utils.sendNewLog("1000100", logObj);
                    }
                    //*********************************************************

                }else{
                   if(!connection.isConnect()){
                        res = _.extend({}, res);
                        res.code = importCode.DISCONNECT;
                        model.set('res', res);
                    }else  if(connection.deviceInfo && !connection.deviceInfo.isSDCardExist){
                        res = _.extend({}, res);
                        res.code = importCode.NoSDCard;
                        model.set('res', res);
                    } 
                    //导入book失败统计
                    model.data.statistics['s6'] = 4;
                    model.data.statistics.s5['msg'] = res.code;
                    utils.sendStatisticsDownload(model.data.statistics);
                    /*add by liujintao notice others for import failed*/
                    if(res.code !== importCode.SUCCESS&&res.finish){
                       completeColl.trigger("importBook",{type:taskType.IMPORT_BOOK,data:res.info,success:false});
                    }

                    //*********************************************************
                    //20140724 新版日志
                    var logObj = model.get("nstatistics");
                    if (logObj){
                        logObj.status = 12;
                        logObj.source = 0;
                        logObj.error = res.code;          
                        utils.sendNewLog("1000100", logObj);
                    }
                    //*********************************************************
                }           
           break;
           case taskType.IMPORT_VIDEO://导入视频
                //utils.log.out('IMPORT_VIDEO_LOG:' + utils.logTime.end('importvideo'));
                
                if(res.code == importCode.WAITING || res.code == importCode.TRANSFERING){
                    //TODO
                }else if(res.code == importCode.SUCCESS){
                    progressColl.doNextImportTask();
                    
                    if(model.deleted){
                        return;
                    }
                    
                    progressColl.remove(model);
                    completeColl.addTask(model);
                    /*add by liujintao notice others for import success*/
                   
                    if(originCode != 7){
                        completeColl.trigger("import",{type:taskType.IMPORT_VIDEO,data:res.info,success:true});
                    }
                    

                    //导入视频成功统计
                    if (model.data.statistics.s5['msg']){
                        model.data.statistics.s5['msg'] = null;
                        delete model.data.statistics.s5['msg'];
                    }
                    model.data.statistics['s6'] = 3;
                    utils.sendStatisticsDownload(model.data.statistics);

                    //*********************************************************
                    //20140724 新版日志
                    var logObj = model.get("nstatistics");
                    if (logObj){
                        logObj.status = 11;
                        logObj.source = 0;         
                        utils.sendNewLog("1000100", logObj);
                    }
                    //*********************************************************
                } else {
                    progressColl.doNextImportTask();
                   if(!connection.isConnect()){
                        res = _.extend({}, res);
                        res.code = importCode.DISCONNECT;
                        model.set('res', res);
                    }else  if(connection.deviceInfo && !connection.deviceInfo.isSDCardExist){
                        res = _.extend({}, res);
                        res.code = importCode.NoSDCard;
                        model.set('res', res);
                    } 
                    //导入视频失败统计
                    model.data.statistics['s6'] = 4;
                    model.data.statistics.s5['msg'] = res.code;
                    utils.sendStatisticsDownload(model.data.statistics);
                    //*********************************************************
                    //20140724 新版日志
                    var logObj = model.get("nstatistics");
                    if (logObj){
                        logObj.status = 12;
                        logObj.source = 0;
                        logObj.error = res.code;          
                        utils.sendNewLog("1000100", logObj);
                    }
                    //*********************************************************
                }
                break;
           case taskType.IMPORT_PICTURE://导入图片
                //utils.log.out('IMPORT_PICTURE_LOG:' + utils.logTime.end('importpicture'));
                
                if(res.code == importCode.WAITING || res.code == importCode.TRANSFERING){
                    //TODO
                }else if(res.code == importCode.SUCCESS){
                    progressColl.doNextImportTask();
                    
                    if(model.deleted){
                        return;
                    }
                    
                    if(model.get('resType') == resourceType.M_IMAGE_WALLPAPER){
                        if(model.get('actionType') == actionType.SET_WALLPAPER){
                            model.data.remotePath = res.info.remotePath;
                            model.data.mediaId = res.info.mediaId;
                            
                            model.data.res = null;
                            model.data.importRes = res;
                            model.set('type', taskType.SET_WALLPAPER);
                            model.setWallpaper();
                        }else if(model.get('actionType') == actionType.DOWNLOAD_WALLPAPER){
                            progressColl.remove(model);
                            completeColl.addTask(model);
                        }
                    }else{
                        progressColl.remove(model);
                        completeColl.addTask(model);
                    }

                    //*********************************************************
                    //20140924
                    completeColl.trigger("importPic",{type:taskType.IMPORT_PICTURE,data:res.info,success:true});
                    //*********************************************************

                    //导入图片成功统计
                    if (model.data.statistics.s5['msg']){
                        model.data.statistics.s5['msg'] = null;
                        delete model.data.statistics.s5['msg'];
                    }
                    model.data.statistics['s6'] = 3;
                    utils.sendStatisticsDownload(model.data.statistics);

                    //*********************************************************
                    //20140724 新版日志
                    var logObj = model.get("nstatistics");
                    if (logObj){
                        logObj.status = 11;
                        logObj.source = 0;         
                        utils.sendNewLog("1000100", logObj);
                    }
                    //*********************************************************
                } else {
                   if(!connection.isConnect()){
                        res = _.extend({}, res);
                        res.code = importCode.DISCONNECT;
                        model.set('res', res);
                    }else  if(connection.deviceInfo && !connection.deviceInfo.isSDCardExist){
                        res = _.extend({}, res);
                        res.code = importCode.NoSDCard;
                        model.set('res', res);
                    } 
                    progressColl.doNextImportTask(model);
                    //*********************************************************
                    //20140924
                    completeColl.trigger("importPic",{type:taskType.IMPORT_PICTURE,data:res.info,success:false});
                    //*********************************************************
                    //导入图片失败统计
                    model.data.statistics['s6'] = 4;
                    model.data.statistics.s5['msg'] = res.code;
                    utils.sendStatisticsDownload(model.data.statistics);

                    //*********************************************************
                    //20140724 新版日志
                    var logObj = model.get("nstatistics");
                    if (logObj){
                        logObj.status = 12;
                        logObj.source = 0;
                        logObj.error = res.code;          
                        utils.sendNewLog("1000100", logObj);
                    }
                    //*********************************************************
                }
                break;
        }
        
        clearTimeout(saveProgressTaskTime);
        saveProgressTaskTime = setTimeout(function(){
            progressColl.saveProgressTask();
        }, 1000 * 2);
        
        progressColl.trigger('receiverTaskResponse', model);
    };
    
    var initTaskManager = function(){
        app.dal.binding(apiNames.BIND_TASK_EVEND, OnRecierTask);
        app.dal.binding(apiNames.BIND_INSTALL_APK_BYPHONE, onInstallApkInvoke,true);
    };
    
    initTaskManager();

    
    /*
     * 下载任务
     */
    exports.download = function(paras, callback, opts){
        console.log('downloading***************', paras);
        
        paras.type = taskType.DOWNLOAD;
        
        paras.ext = paras.ext || "";
        
        //处理先前给未定义好的resType的值
        if(paras.resType == 'wallpaper'){
            paras.resType = resourceType.M_IMAGE_WALLPAPER
        }
        
        paras.resType = paras.resType || resourceType.M_APK;
        
        if(!paras.url){
            throw new Error('Invalid download url'+ paras.url);
        }
        
        if(paras.actionType == actionType.SET_WALLPAPER){
            var model = new Model(paras);
            model.setWallpaper();
            return false;
        }
        
        if(paras.actionType == actionType.SET_RINGTONE ||  
            paras.actionType == actionType.SET_ALARM ||  
            paras.actionType == actionType.SET_SMS_RINGTONE){
                        
            var model = new Model(paras);           
            if(paras.actionType == actionType.SET_RINGTONE){
                model.set('type', taskType.SET_RINGTONE);
            }else if(paras.actionType == actionType.SET_ALARM){
                model.set('type', taskType.SET_ALARM);
            }else if(paras.actionType == actionType.SET_SMS_RINGTONE){
                model.set('type', taskType.SET_SMS_RINGTONE);
            }
            model.setMusic();
            return false;
        }
        
        //如果在已经下载完的队列里， 而且不是强制重新下载就提示用户
        var repeatedModel = completeColl.isRepeatDownloadTask(paras.url)||completeColl.isRepeatDownloadYoutube(paras);
        if(repeatedModel){
            paras.continueDownload = 1;//继续下载，如果没有回自动识别？
            completeColl.remove(repeatedModel);
        //如果是重复的youtube下载        
        }else if(paras.resType==resourceType.M_YOUTUBE&&progressColl.isRepeatDownloadingYoutube(paras)){
            return;
            //如果任务正在进行中的用户列表中
        }else if( repeatedModel = progressColl.isRepeatDownloadingTask(paras.url)){
            //整整在安装的任务状态， 立马保持同步到其他应用里去
            if(repeatedModel.get('type') == taskType.INSTALL_APK){
                progressColl.trigger('receiverTaskResponse', repeatedModel);
            }
            
            if(paras.resType == resourceType.M_APK){
                app.eventCenter.trigger('refresh_resource_app_status');
            }
            return;
        }else{
            var repeatedFailedTask = progressColl.isRepeatedFailedDownloadTask(paras.url);
            if(repeatedFailedTask){
                if(repeatedFailedTask.get('type') == taskType.INSTALL_APK && !repeatedFailedTask.data.res){
                    progressColl.trigger('receiverTaskResponse', repeatedFailedTask);
                }
                if(paras.resType == resourceType.M_APK){
                    app.eventCenter.trigger('refresh_resource_app_status');
                }
                return;
            }
        }
        
        //设置一个默认进度状态, res是后端返回的response
        paras.res = {
            code : downloadCode.DOWNLOADING,
            info: {
                fileSize : paras.size || '0',
                finishRate : '0'
            }
        };
        
        var model = new Model(paras);
        
        model.download(callback);

        progressColl.addTask(model, opts);
        
        
        //应用安装统计信息发送
        // if(paras.resType == resourceType.M_APK || 
        //    paras.resType == resourceType.M_RING){
            // var ss = getBaseStatistics(model);
            // ss.action = 'download';
        if (model.data.statistics.s5['msg']){
            model.data.statistics.s5['msg'] = null;
            delete model.data.statistics.s5['msg'];
        }
        model.data.statistics['s6'] = 0;
        utils.sendStatisticsDownload(model.data.statistics);
        // }
        
        if(paras.resType == resourceType.M_APK){
            app.eventCenter.trigger('refresh_resource_app_status');
        }
        
        callback && callback.call(this, {
            status: 1 
        });
        
        if(paras.actionType != actionType.SET_WALLPAPER){
            progressColl.trigger("addTask");   
        }
    };
    
    //批量下载
    exports.batchDownload = function(paras){
        paras && paras.forEach(function(para){
            exports.download(para, null, {trigger: false});
        }, this);
        progressColl.trigger('update');
        progressColl.trigger("addTask");
    };
    
    /*
     * 停止下载任务
     */
    exports.stopDownload = function(taskId){
        var taskModel = progressColl.getModelById(taskId);
        taskModel.stopDownload();
    };
    
    /*
     * 安装apk
     */
    exports.instappApp = function(paras, opts){
        paras.type = taskType.INSTALL_APK;
        var model = new Model(paras);
        progressColl.addTask(model, opts);
        model.installApp();
    };
    
    /*
     * 批量安装apk
     */
    exports.batchInstappApp = function(paras){
        
        paras && paras.forEach(function(para){
            exports.instappApp(para, {trigger: false});
        }, this);
        
        progressColl.trigger('update');
        progressColl.trigger("addTask");
    };
    
    /*
     *@paras paras={
     *    path: '',//本地文件路径
     *    remotePath: ''//手机文件路径， 默认不给就可以,
     *    size: 0,
     *    name: 'music',
     *    iconPath: 'iconPath'
     * }
     */
    exports.importMusic = function(paras, opts){
        paras.type = taskType.IMPORT_MUSIC;
        var model = new Model(paras);
        progressColl.addTask(model, opts);
        model.importMusic();
    };
    
    exports.batchImportMusic = function(parasArray){
        parasArray.forEach(function(para){
            exports.importMusic(para, {trigger: false});
        });
        progressColl.trigger('update');
        
        progressColl.trigger("addTask");
    };
    /*
     *@paras paras={
     *    path: '',//本地文件路径
     *    remotePath: ''//手机文件路径， 默认不给就可以
     *    size: 0,
     *    name: 'music',
     *    iconPath: 'iconPath'
     * }
     */
    exports.importVideo = function(paras){
        paras.type = taskType.IMPORT_VIDEO;
        var model = new Model(paras);
        progressColl.addTask(model);
        model.importVideo();
    };
    
    exports.batchImportVideo = function(parasArray){
        parasArray.forEach(function(para){
            exports.importVideo(para, {trigger: false});
        });
        progressColl.trigger('update');
        
        progressColl.trigger("addTask");
    };
    
    /*
     *@paras paras={
     *    path: '',//本地文件路径
     *    remotePath: ''//手机文件路径， 默认不给就可以
     *    size: 0,
     *    name: 'music',
     *    iconPath: 'iconPath'
     * }
     */
    exports.importPicture = function(paras, opts){
        paras.type = taskType.IMPORT_PICTURE;
        var model = new Model(paras);
        progressColl.addTask(model, opts);
        model.importPicture();
    };
    
    exports.batchImportPicture = function(parasArray){
        parasArray.forEach(function(para){
            exports.importPicture(para, {trigger: false});
        });
        progressColl.trigger('update');
        
        progressColl.trigger("addTask");
    };
     /*
      * 导入电子书
     *@paras paras={
     *    path: '',//本地文件路径
     *    remotePath: ''//手机文件路径， 默认不给就可以
     *    size: 0,
     *    name: 'music',
     *    iconPath: 'iconPath'
     * }
     */
    exports.importBook = function(paras, opts){
        console.log("导入开始：",paras);
        paras.type = taskType.IMPORT_BOOK;
        var model = new Model(paras);
        progressColl.addTask(model, opts);
        model.importBook();
    };  

    exports.batchImportBook = function(parasArray){
        parasArray.forEach(function(para){
            exports.importBook(para, {trigger: false});
        });
        progressColl.trigger('update');
        
        progressColl.trigger("addTask");
    };

    exports.getSpeed = function(){
        return downloadingSpeed;  
    };
    /*
     * @paras resApp {Object} format{
     *     versionCode: 123, 
     *     packageName: 'apk.com'
     * }
     * @return -1：本地不存在， 0： 已安装， 1： 可升级，2： 资源版本低已安装的版本 3: 正在升级 4: 正在安装， 本地应用不存在
     */
    exports.getAppStatus = function(resApp){
        var appModel = require('appModel');
        var resVersion = parseInt(resApp.versionCode);
        var packageName = resApp.packageName;
        
        var nativeModel = appModel.getAppByPk(packageName);
        
        if(!nativeModel){
            if(progressColl.isUpdating({
                packageName: packageName,
                versionCode: resVersion
            })){
                 return 4;
            }
            
            return -1;
        }else {
            var nv = nativeModel.get('sAppVersionCode');
            
            if(nativeModel.get("sFakePackageName")){
                packageName = nativeModel.get("sFakePackageName");
                var nv = nativeModel.get('sFakeVersionCode');
            }else{
                var nv = nativeModel.get('sAppVersionCode');
            }
            nv = parseInt(nv);  
            
            if(progressColl.isUpdating({
                packageName: packageName,
                versionCode: resVersion
            })){
                 return 3;
            }
            
            if(nv < resVersion){
                return 1;//可升级
            }else if(nv == resVersion){
                return 0;//已安装
            }else if(nv > resVersion){
                return 2;//现在版本比较低
            }
        }
    };
    
    
    exports.importDes = importDes;
    exports.adbCode = adbCode;
    exports.actionType = actionType;
    exports.resourceType = resourceType;
    exports.taskType = taskType;
    exports.downloadCode = downloadCode;
    exports.installCode = installCode;
    exports.importCode = importCode;
    exports.Model = Model;
    exports.progressCollection = progressColl;
    exports.completeCollection = completeColl;
});