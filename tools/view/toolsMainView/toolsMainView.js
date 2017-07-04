define("UIToolsMainView", function(require, exports, module) {
    var app = require('app');
    var   $ = require('jquery');
    var _ = require('underscore');
    var i18nDi  = require('I18NDI');
    var  utils = require('utils');
    var UIWindow = require('UIWindow');
    var UIDialog = require('UIDialog');
    var connection = require('connectionMgr');
	var taskModel = require('taskModel');
	var apiNames = require('APINames');
    var Friendly = require('UIFriendlyView');
    
    var ToolsMainView = app.ViewBase.extend({
        module: module,
        events: {
            'click -> .btn-backup': 'onClickBackupProxy',
            'click -> .btn-restore': 'onClickRestoreProxy',
            'click -> .btn-fileManager': 'onClickFileManagerProxy',
            'click -> .btn-deviceInfo': 'onClickDeviceInfoProxy',
            'click -> .btn-installApp': 'onClickInstallProxy',
            'click -> .btn-oneclick': 'onClickRootProxy',
            'click -> .btn-pcCleaner': 'onClickPcCleaner',
            'click -> .btn-wifiHotpot': 'onClickWifiHotpot',
        },
        init: function(opts){
            var pageId = opts.pageId;
            var _this=this;
            this.collection = opts.collection;
            var template = _.template(this.getTpl('tpl-tools-main-view'), {I18N: i18nDi});
            this.el = $(template);
            this.el.appendTo($('#' + pageId));
           
            if(connection.isConnect()){
                        _this.clickBackupProxy=_this.onClickBackup;
                        _this.clickFileManagerProxy=_this.onClickFileManager;
                        _this.clickRestoreProxy=_this.onClickRestore;
                        _this.clickDeviceInfoProxy=_this.onClickDeviceInfo;
                        _this.clickInstallProxy=_this.onClickInstall;
                        _this.clickRootProxy=_this.onClickRoot;                
            }else{
                this.clickBackupProxy=this.clickFileManagerProxy=this.clickRestoreProxy=this.clickDeviceInfoProxy=this.clickInstallProxy=this.clickRootProxy=this.onClickUnConnect;
            }
            if( !localStorage.isFirstClean){
				this.el.find(".btn-pcCleaner").addClass("first")
			}
            ToolsMainView.root = this.el;       
            connection.on("connection",function(){
                    //2014-09-18 未连接时打开tools main start
                    if(connection.isConnect()){
                        _this.clickBackupProxy=_this.onClickBackup;
                        _this.clickFileManagerProxy=_this.onClickFileManager;
                        _this.clickRestoreProxy=_this.onClickRestore;
                        _this.clickDeviceInfoProxy=_this.onClickDeviceInfo;
                        _this.clickInstallProxy=_this.onClickInstall;
                        _this.clickRootProxy=_this.onClickRoot;
                        console.log("连接完成");
                    }else{
                        console.log("连接断开");
                        _this.clickBackupProxy=_this.clickFileManagerProxy=_this.clickRestoreProxy=_this.clickDeviceInfoProxy=_this.clickInstallProxy=_this.clickRootProxy=_this.onClickUnConnect;
                    }
                    //2014-09-18 未连接时打开tools main end                
            });
        },
          //未连接时的点击
        onClickUnConnect:function(event){
            if(!Friendly.instance){
                Friendly.instance=new Friendly();
            }
            Friendly.instance.clickConnect();
        },
        onClickBackupProxy:function(event){
          this.clickBackupProxy(event);  
        },        
        onClickBackup: function(){
            ToolsMainView.Backup();
            //*********************************************************
            //20140724 新版日志-点击备份
            var logObject = {
                class: "toolkit",
                page: "toolkit_home",
                module: "managementtools",
                action: "to_backup"
            }
            utils.sendNewLog("1000120", logObject);
            //*********************************************************  
        },
        onClickRestoreProxy:function(event){
            this.clickRestoreProxy(event);
        },
        onClickRestore: function(){
            ToolsMainView.Restore();
            //*********************************************************
            //20140724 新版日志-点击还原
            var logObject = {
                class: "toolkit",
                page: "toolkit_home",
                module: "managementtools",
                action: "to_restore"
            }
            utils.sendNewLog("1000120", logObject);
            //*********************************************************  
        },
        onClickFileManagerProxy:function(event){
            this.clickFileManagerProxy(event);
        },        
        onClickFileManager:function(){
            ToolsMainView.FileManager();
            //*********************************************************
            //20140724 新版日志
            var logObject = {
                class: "toolkit",
                page: "toolkit_home",
                module: "managementtools",
                action: "to_filemanager"
            }
            utils.sendNewLog("1000120", logObject);
            //*********************************************************  
        },
        onClickDeviceInfoProxy:function(event){
          this.clickDeviceInfoProxy(event);  
        },
		onClickDeviceInfo:function(){
            ToolsMainView.DeviceInfo();
            //*********************************************************
            //20140724 新版日志
            var logObject = {
                class: "toolkit",
                page: "toolkit_home",
                module: "managementtools",
                action: "to_aboutdevice"
            }
            utils.sendNewLog("1000120", logObject);
            //*********************************************************  
        },
        onClickInstallProxy:function(event){
            this.clickInstallProxy(event);
        },
		onClickInstall:function(){
            ToolsMainView.InstallApp();
            //*********************************************************
            //20140724 新版日志
            var logObject = {
                class: "toolkit",
                page: "toolkit_home",
                module: "managementtools",
                action: "to_installfiles"
            }
            utils.sendNewLog("1000120", logObject);
            //********************************************************* 
        },
        onClickRootProxy:function(event){
            this.clickRootProxy(event);
        },
        onClickRoot:function(){
        	if(connection.isWifiModel()){
        		var roodlog = new UIDialog({
                     buttonKey: 2,
                     content: i18nDi.fillDomText('tools.wifiConNot'),
                     title: i18nDi.fillDomText('tools.netWorkError')
                 });
                 roodlog.show();
            	
        	}else{
	            ToolsMainView.oneKeyRoot();
	            //*********************************************************
	            //20140724 新版日志
	            var logObject = {
	                class: "toolkit",
	                page: "toolkit_home",
	                module: "advancedtools",
	                action: "to_oneclickroot"
	            }
	            utils.sendNewLog("1000120", logObject);
	            //********************************************************* 
	        }
        },
        update: function(hash){
            console.log("Tool main view >> update...");
        },
        onClickPcCleaner:function(){
            ToolsMainView.downPcClean();  
            //20140926 新版日志-点击清理
            var logObject = {
                class: "c20008",
                page: "p20020",
                module: "m20030",
                action: "a20104"
            }
            utils.sendNewLog("1000120", logObject);          
        },
       onClickWifiHotpot: function(){
            ToolsMainView.WifiHotpot();
            //*********************************************************
            //20140724 新版日志-点击备份
            var logObject = {
                class: "toolkit",
                page: "toolkit_home",
                module: "managementtools",
                action: "to_backup"
            }
            //utils.sendNewLog("1000120", logObject);
            //*********************************************************  
        }
    });


    ToolsMainView.isBackuping = false;
    ToolsMainView.isRestoring = false;
    ToolsMainView.isFileManager = false;
    ToolsMainView.isDeviceInfo = false;
    ToolsMainView.isPcCleaner = false;
    ToolsMainView.isWifiHotpot = 0;
    connection.on('connection', function(){

        if (connection.isConnect() === false &&
            ToolsMainView.win){
            ToolsMainView.win.sendMessage("disconect");
        }else if(connection.isConnect() === false &&
            ToolsMainView.fileWin){
                ToolsMainView.fileWin.sendMessage({
                    todo:"close"
                });
            }
    });
    
    ToolsMainView.dialogRe = function(){
    	var confirmDlg = new UIDialog({
            buttonKey : 2, //1双按钮
            content : i18nDi.fillDomText('backupRestore.sureDialogText'),
            title: i18nDi.fillDomText("common.toolsLabel")
        });
        confirmDlg.show();
    }
              

    ToolsMainView.Backup = function(){
        var isWifi = connection.isWifiModel();
        if (ToolsMainView.isBackuping == false &&
            ToolsMainView.isRestoring == false){
            ToolsMainView.isBackuping = true; 
            ToolsMainView.win = new app.PopupPanel({
                Model : 3,
                Width : 740,
                Height : 400,
                DragWindowHeight : 30,
                Parame : {isWifiModel: isWifi},
                Path : 'backup.html'
            });
            ToolsMainView.win.on('message', function(msg) {
                console.log("Tools main view >> backup window says: ", msg);
                if (msg == "close"){
                    ToolsMainView.isBackuping = false;
                    ToolsMainView.win = null;
                }
            });
            ToolsMainView.win.open();
        } else if (ToolsMainView.isBackuping === true){
            if (ToolsMainView.win) ToolsMainView.win.restore();
        }else if(ToolsMainView.isRestoring === true){
       		ToolsMainView.dialogRe();
        }
    };

    ToolsMainView.Restore = function(){
        var isWifi = connection.isWifiModel();
        if (ToolsMainView.isBackuping == false &&
            ToolsMainView.isRestoring == false){
            ToolsMainView.isRestoring = true; 
            ToolsMainView.win = new app.PopupPanel({
                Model : 3,
                Width : 740,
                Height : 400,
                DragWindowHeight : 30,
                Parame : {isWifiModel: isWifi},
                Path : 'restore.html'
            });
            ToolsMainView.win.on('message', function(msg) {
                console.log("Tools main view >> restore window says: ", msg);
                if (msg === "close"){
                    ToolsMainView.isRestoring = false;
                    ToolsMainView.win = null;
                } else if (msg.refresh){
                    console.log("还原 >> 还原完毕，自动刷新：", msg);
                    switch(msg.refresh){
                        case "picture":
                          app.eventCenter.trigger("imageimage");
                          break;
                        case "music":
                          app.eventCenter.trigger("musicmusic");
                          break;
                        case "video":
                          app.eventCenter.trigger("videovideo");
                          break;
                        case "app":
                          app.eventCenter.trigger("appapp");
                          break;
                        case "message":
                          app.eventCenter.trigger("smssms");
                          break;
                        case "contact":
                          app.eventCenter.trigger("contactcontact");
                          break;
                        case "all":
                          app.eventCenter.trigger("imageimage");
                          setTimeout(function(){app.eventCenter.trigger("musicmusic");}, 500);
                          setTimeout(function(){app.eventCenter.trigger("videovideo");}, 600); 
                          setTimeout(function(){app.eventCenter.trigger("appapp");}, 700); 
                          setTimeout(function(){app.eventCenter.trigger("smssms");}, 800); 
                          setTimeout(function(){app.eventCenter.trigger("contactcontact");}, 900);  
                          break;
                    }
                }
            });
            ToolsMainView.win.open();
        } else if (ToolsMainView.isRestoring === true){
            if (ToolsMainView.win) ToolsMainView.win.restore();
        }else if(ToolsMainView.isBackuping == true){
       		ToolsMainView.dialogRe();
        }
    };

    ToolsMainView.FileManager = function(){
          /*
    	app.dal.request({
            action: apiNames.REQ_OPEN_FILEMANGGER,
            paras: {}
        });*/
       console.log("======device info======="+JSON.stringify(connection.deviceInfo));
       if(!connection.deviceInfo.isSDCardExist){
           var noticeDialog=new UIDialog({
                 buttonKey: 2,
                 content: i18nDi.fillDomText('fileManager.noSdCardNotice'),
                 title: i18nDi.fillDomText('tools.fileManager')
           });
           noticeDialog.show();
           return;
       }
      if (ToolsMainView.isFileManager == false){
            ToolsMainView.isFileManager = true;
             var win = new app.PopupPanel({
                    Model : 3,
                    Width : 900,
                    Height : 650,
                    DragWindowHeight : 30,
                    Parame : {},
                    Path : 'fileManager.html'
                });
                win.on('message', function(msg) {
                    console.log("Tools main view >> file manager says: ", msg);
                    if (msg == "close"){
                        ToolsMainView.isFileManager = false;
                        ToolsMainView.fileWin=null;
                    }
                });
                win.open();
                ToolsMainView.fileWin=win;
        }else if(ToolsMainView.fileWin){
            ToolsMainView.fileWin.sendMessage({
                todo:"restore"
            });
        }
    };
    
    ToolsMainView.DeviceInfo = function(){
    	if(connection.isConnect()){
    		if (ToolsMainView.isDeviceInfo == false){
	            ToolsMainView.isDeviceInfo = true;
            	ToolsMainView.deviceinfoWin = new app.PopupPanel({
	                Model : 1,
	                Width : 780,
	                Height : 510,
	                DragWindowHeight : 30,
	                Path : 'deviceInfo.html'
	            });
	            ToolsMainView.deviceinfoWin.on('message', function(msg) {
	                console.log("Tools main view >> device info says: ", msg);
	                if (msg == "close"){
	                    ToolsMainView.isDeviceInfo = false;
	                }
	            });
	            ToolsMainView.deviceinfoWin.open();
	        }
    	}
        if(!connection.isConnect() && ToolsMainView.deviceinfoWin){
        	ToolsMainView.deviceinfoWin.sendMessage({
                todo : "close"
            });
        }
    };
    
    
    ToolsMainView.InstallApp = function(){
        app.dal.request({
            action: apiNames.REQ_POPUP_SYSTEM_DIALOG,
            paras: {
                MultiSel: 1,
                MediaType: 'apk',
                Filter: '(*.apk)|*.apk'
            },
            callback: function(res){
                if(res.info && res.info.list){
                    var logArgs = {
                        module: utils.statisticsCode.M_MY_APP,
                        module2: utils.statisticsCode.M_NAVIGATION,
                        totalNum: res.info.list.length
                    }
                    utils.sendStatistics({
                        action: utils.statisticsCode.MYAPP_INSTALL_ALL,
                        args: logArgs
                    });

                    var curHash = app.getCurHashParas();
                    
                    var paras = [];
                    
                    res.info.list.forEach(function(file){
                        var p = {
                            name: file.apkName,
                            iconPath: file.imagePath,
                            path: file.path,
                            size: utils.convertSizeToString(file.size),
                            packageName: file.packageName,
                            statistics: {
                                p_module: curHash.module,
                                p_action: curHash.action
                            }
                        };
                        paras.push(p);
                    });
                    taskModel.progressCollection.trigger("addTask");   
                  //  taskModel.batchInstappApp(paras);
                }
            }
        });
    };
    /*2014-09-11 pc清理大师 start*/
    ToolsMainView.PcCleaner = function(){
    		
            if (ToolsMainView.isPcCleaner == false){
                ToolsMainView.isPcCleaner = true;
               
                ToolsMainView.pcCleanerWin = new app.PopupPanel({
                    Model : 3,
                    Width : 600,
                    Height : 620,
                    DragWindowHeight : 265,
                    Path : 'pcCleaner.html'
                });
                
                ToolsMainView.pcCleanerWin.on('message', function(msg) {
                    console.log("Tools main view >> device info says: ", msg);
                    if (msg == "close"){
                        ToolsMainView.isPcCleaner = false;
                    }
                });
                ToolsMainView.pcCleanerWin.open();
            }else if(ToolsMainView.pcCleanerWin ){
            	ToolsMainView.pcCleanerWin.sendMessage({
	                todo:"restore"
	            });
            }
    };  
    /*2014-09-11 pc清理大师 end*/  
    
    
    /*2014-11-03 wifi hotpot start*/
    ToolsMainView.WifiHotpot = function(){
            
            if (ToolsMainView.isWifiHotpot == 0){
                ToolsMainView.isWifiHotpot = 1;
               
                ToolsMainView.wifiHotpotWin = new app.PopupPanel({
                    Model : 3,
                    Width : 640,
                    Height : 500,
                    DragWindowHeight : 120,
                    Path : 'wifiHotpot.html'
                });
                
                ToolsMainView.wifiHotpotWin.on('message', function(msg) {
                    if (msg == "close"){//窗口关闭
                        ToolsMainView.isWifiHotpot = 0;
                    }else if(msg=="show"){//窗口显示
                        ToolsMainView.isWifiHotpot = 1;
                    }else if(msg=="hide"){//窗口被隐藏
                        ToolsMainView.isWifiHotpot = 2;
                    }
                });
                ToolsMainView.wifiHotpotWin.open();
            }else if(ToolsMainView.isWifiHotpot==2){
                ToolsMainView.wifiHotpotWin.sendMessage({
                    todo:"show"
                });                
            }else if(ToolsMainView.wifiHotpotWin ){
                ToolsMainView.wifiHotpotWin.sendMessage({
                    todo:"restore"
                });
            }
    };      
  /*2014-11-03 wifi hotpot end*/  
    ToolsMainView.oneKeyRoot = function(){
    	var root = function(){
			app.dal.request({
	            action: apiNames.REQ_OEN_KEY_ROOT,
	            paras: {},
	            callback: function(res){
	            	console.log("状态码--------------------------",res.code);
	            	//res.tool = 0是本地没有root文件，= 2是不用升级，= 3是用升级
	            	if( res.tool == 0 || res.tool == 3){
	            		$(".btn-oneclick").addClass("disabled");
	            		$(".btn-oneclick .progress-bar").fadeIn();
	            	}
	            	//res.code = 0 正在下载 ，= 1 下载完成，2-12 未知错误,大于12网络错误
	            	if(res.code == 0){
            			$(".btn-oneclick").addClass("disabled");
            			$(".btn-oneclick .progress-bar span").width(res.info.finishRate +"%");
	            	}
					if( res.code == 1){
            			$(".btn-oneclick").removeClass("disabled");
	        			$(".btn-oneclick .progress-bar").fadeOut("fast",function(){
	        				$(".btn-oneclick .progress-bar span").width(0);
	        			});
	        			/*发送下载成功日志*/
	        			var logObject = {
	        				toolid:"1",
			                downloadstatus:"1"
			            }
			            utils.sendNewLog("1000114", logObject);
	        			return;
	        		}
	        		if( res.code >= 3 && res.code < 13 ){
	        			var rootDialog = new UIDialog({
		                     buttonKey: 5,
		                     content: i18nDi.fillDomText('tools.unKnownText'),
		                     title: i18nDi.fillDomText('tools.unknownError')
		                 });
		                 rootDialog.show();
		                 /*发送下载失败日志*/
	        			 var logObject = {
	        				toolid:"1",
			                downloadstatus:"0"
			             }
			             utils.sendNewLog("1000114", logObject);
		            	 rootDialog.on('ok',function(){
		            	    root();
		            	 });
		            	 rootDialog.on('cancel',function(){
		            	    $(".btn-oneclick .progress-bar").fadeOut();
		            	    $(".btn-oneclick").removeClass("disabled");
		            	 });
	        		}
	        		if( res.code == 2 || res.code == 3 || res.code >= 13 && res.code <= 19 ){
	        			var rootDialog = new UIDialog({
		                     buttonKey: 5,
		                     content: i18nDi.fillDomText('tools.netWorkErrorText'),
		                     title: i18nDi.fillDomText('common.toolsLabel')
		                 });
		                 rootDialog.show();
		                 /*发送下载失败日志*/
		                 var logObject = {
	        				toolid:"1",
			                downloadstatus:"0"
			             }
			             utils.sendNewLog("1000114", logObject);
		            	 rootDialog.on('ok',function(){
		            	    root();
		            	 });
		            	 rootDialog.on('cancel',function(){
		            	    $(".btn-oneclick .progress-bar").fadeOut();
		            	    $(".btn-oneclick").removeClass("disabled");
		            	 });
	        		}
	            }
	        });
    	}
    	root();
    	
    };
    /*2014-11-03 wifi hotpot end*/  
    /*2014-12-5清理*/
    ToolsMainView.downPcClean = function(){
    	var pcClean = function(){
			app.dal.request({
	            action: "get_StartClean",
	            paras: {},
	            callback: function(res){
	            	console.log("状态码--------------------------",res.code);
	            	//res.tool = 0是本地没有root文件，= 2是不用升级，= 3是用升级
	            	if( res.tool == 0 || res.tool == 3){
	            		$(".btn-pcCleaner").addClass("disabled");
	            		$(".btn-pcCleaner .progress-bar").fadeIn();
	            	}
	            	//res.code = 0 正在下载 ，= 1 下载完成，2-12 未知错误,大于12网络错误
	            	if(res.code == 0){
            			$(".btn-pcCleaner").addClass("disabled");
            			$(".btn-pcCleaner .progress-bar span").width(res.info.finishRate +"%");
	            	}
					if( res.code == 1){
            			$(".btn-pcCleaner").removeClass("disabled");
	        			$(".btn-pcCleaner .progress-bar").fadeOut("fast",function(){
	        				$(".btn-pcCleaner .progress-bar span").width(0);
	        			});
	        			/*发送下载成功日志*/
	        			var logObject = {
	        				toolid:"3",
			                downloadstatus:"1"
			            }
			            utils.sendNewLog("1000114", logObject);
	        			return;
	        		}
	        		if( res.code >= 3 && res.code < 13 ){
	        			var rootDialog = new UIDialog({
		                     buttonKey: 5,
		                     content: i18nDi.fillDomText('tools.unKnownText'),
		                     title: i18nDi.fillDomText('tools.unknownError')
		                 });
		                 rootDialog.show();
		                 /*发送下载失败日志*/
	        			 var logObject = {
	        				toolid:"3",
			                downloadstatus:"0"
			             }
			             utils.sendNewLog("1000114", logObject);
		            	 rootDialog.on('ok',function(){
		            	    pcClean();
		            	 });
		            	 rootDialog.on('cancel',function(){
		            	    $(".btn-pcCleaner .progress-bar").fadeOut();
		            	    $(".btn-pcCleaner").removeClass("disabled");
		            	 });
	        		}
	        		if( res.code == 2 || res.code == 3 || res.code >= 13 && res.code <= 19 ){
	        			var rootDialog = new UIDialog({
		                     buttonKey: 5,
		                     content: i18nDi.fillDomText('tools.netWorkErrorText'),
		                     title: i18nDi.fillDomText('common.toolsLabel')
		                 });
		                 rootDialog.show();
		                 /*发送下载失败日志*/
		                 var logObject = {
	        				toolid:"3",
			                downloadstatus:"0"
			             }
			             utils.sendNewLog("1000114", logObject);
		            	 rootDialog.on('ok',function(){
		            	    pcClean();
		            	 });
		            	 rootDialog.on('cancel',function(){
		            	    $(".btn-pcCleaner .progress-bar").fadeOut();
		            	    $(".btn-pcCleaner").removeClass("disabled");
		            	 });
	        		}
	            }
	        });
    	}
    	pcClean();
    	
    };
    return ToolsMainView;
}); 