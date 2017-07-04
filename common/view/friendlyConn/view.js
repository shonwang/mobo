define('UIFriendlyView', function(require, exports, module){
    var app = require('app');
    var $ = require('jquery');
    var i18nDi  = require('I18NDI');
    var   _ = require('underscore');
    var connection = require('connectionMgr');
    var utils = require('utils');
    
    var View = app.ViewBase.extend({
        module: module,
        events: {
            'click -> .action-area .conncetNowBtn' : 'clickConnect'
        },
        init: function(opts){
            this.el = $(_.template(this.getTpl('tpl-friendly-con-view'), {I18N: i18nDi}))
            this.el.appendTo($('#i-modules'));
            var me = this;
            function connectingInit(){
                var nowStatus = connection.getStatus();
                var connStatus = connection.status;
                if(connection.isConnecting()){
                    me.el.find(".conncetNowBtn").prop("disabled", true);
                    /*正在扫描状态 调连接方法 创建小窗*/
                    if( nowStatus == connStatus.WM_DEVICE_MSG_SCANING ||
                    	nowStatus == connStatus.WM_DEVICE_MSG_BEGINCONNECT){
                       View.connectWin.call(me);
                       View.connect.call(me);
                    }    
                }else{
                    me.el.find(".conncetNowBtn").prop("disabled", false);
                }                
            }
            connection.off("connection",connectingInit).on("connection",connectingInit);
            utils.setLogPublicFeild();
        },
        /*点击connect now 按钮触发*/
        clickConnect: function(usbOrWifi){
            var nowStatus = connection.getStatus();
            var connStatus = connection.status;
           
            /*出现错误状态 点击connect now按钮 将当前驱动弹窗关闭 调重新连接接口*/
            var curController = app.getCurController();
            if((curController && curController.views['header'] && curController.views['header'].connectionPannel)||
            	(curController && curController.views['header'] && curController.views['header'].adbPannel)){
	               curController.views['header'].connectionPannel&&curController.views['header'].connectionPannel.sendMessage({
		                todo:"restore"
		           });
		           curController.views['header'].adbPannel&& curController.views['header'].adbPannel.sendMessage({
		                todo:"restore"
		           });
		            /*curController.views['header'].connectionPannel.sendMessage({
	                    winMsg: 1//关闭
	                });*/
            }else{
            	View.connectWin.call(this,false,usbOrWifi);
	            View.connect.call(this);
	        	//connection.reConnect();
            }
        },
        usbConnect : function(){
        	connection.connect();
    		View.connect.call(this);
        }
    });
    /*connect方法 弹出连接小窗*/
    View.driverAdapterPannel = null;
    View.downCode;
    View.comName;
    /*发送日志定义的变量*/
    View.isDebug;
    View.debugTime;
    View.instance;
	View.logObject = {
		devicevid: "-",
		devicepid: "-",
		devicemacaddress: "-",
		deviceinstanceid: "-",
		osmajorversion: "-",
		osminorversion : "-",
		osips: "-",
		usbopened: "-",
		connect: "1",
		connectcode: "-",
		mbrand: "-",
		mmodel : "-",
		nullvalue: "-",
		beginconnect: "1",
		connectnow: "0"
	} 
    View.connectWin = function(fly,usbOrWifi){//fly是否是头部点击 头部点击有飞出动画
    	var connStatus = connection.status;
    	var nowStatus = connection.getStatus();
    	var nowWifi = connection.getWifiCode();
    	/*得到头部tip窗*/
        var curController = app.getCurController();
        	if(curController){
        		var header = curController.views['header'],
            	      connTip = header.connectionTip;
        	}
        app.dal.request({
            action : "get_GetClientInfo",
            paras : {},
            callback : function(res) {
                if (res&&res.info){
                	View.logObject.osmajorversion = res.info.majorVersion;
                	View.logObject.osminorversion = res.info.minorVersion;
                	var opis = "";
                	for ( var i =0 ;i< res.info.ips.length;i++){
                		if( i == res.info.ips.length - 1){
                			opis += res.info.ips[i] 
                		}else{
                			opis += res.info.ips[i] + ",";
                		}
                	}
                	View.logObject.osips = opis;
                	View.comName = res.info.computerName;
                }
            }
        });
        /*如果是wifi连接  把当前的状态传过去*/
        if( nowStatus == connStatus.WM_DEVICE_MSG_WIFICONNECT ){
        	View.downCode = nowWifi;
        }
    	if(!View.driverAdapterPannel && nowStatus != connStatus.WM_DEVICE_MSG_CONNECTSUCCEEDED){
    	
    		View.driverAdapterPannel = new app.PopupPanel({
				Model: 2,
				Width: 640,
				Height: 504,
                Parame: {
                    fly: fly,
                    nowStatus:nowStatus,
                    nowCode:View.downCode ? View.downCode : 0,
                    nowName:View.comName ? View.comName :"",
                    usbOrWifi:usbOrWifi
                },
				Path: 'driverAdapter.html'
			});  
            View.driverAdapterPannel.open();
            /*创建完头部tip隐藏*/
        	connTip&&connTip.hide();
        	//连接小窗接到关闭消息 把头部tip显示出来
        	View.driverAdapterPannel.on('message', function(data){
                if(data.action == 'close'){
                	View.driverAdapterPannel = null;
                    if(curController && curController.views['header'] && View.driverAdapterPannel == null ){
                        /*根据现在的连接状态 头部tip要显示不同内容*/
                        var status = connection.getStatus();
                        switch(status){
                        	case connStatus.WM_DEVICE_MSG_DOWNLOADDRIVER:
                            case connStatus.WM_DEVICE_MSG_INSTALLDRIVER:
                            case connStatus.WM_DEVICE_MSG_INSTALLMUSERVER:
                			case connStatus.WM_DEVICE_MSG_INSTALLMUSERVEROK:
                				var classname = connTip.gainClass();
                				if(classname != "ctn arrow-t"){
                					connTip.show();
                				}
                        	break; 	
                        	case connStatus.WM_DEVICE_MSG_SCANING:
							case connStatus.WM_DEVICE_MSG_CHECKDRIVERBEGIN:
							case connStatus.WM_DEVICE_MSG_CHECKDRIVEREND:
							case connStatus.WM_DEVICE_MSG_DRIVERLOADING:
							 	var classname = connTip.gainClass();
							 	if( classname == "ctn arrow-t arrow-bg-shadow ico-device-installing"){
									connTip.show();
								}
							break; 
                        }
                    }
				}else if(data.action == 'usbConnect'){
		            connection.wifiModel = 0;
		            connection.reConnect();
					View.connect.call(this);
				}else if(data.action == "logCon"){
					View.logObject.connectnow = data.paras.connectnow;
					View.logObject.devicemacaddress = data.paras.devicemacaddress;
				}else if(data.ready){
                  /*接到小窗口创建完成消息 如果没有设备插入*/
                    var nowStatus = connection.getStatus();
                    if(nowStatus == connStatus.WM_DEVICE_MSG_NODEVICEPLUGIN ||
                       nowStatus == connStatus.WM_DEVICE_MSG_DEVICEDISCONNECT ||
                       nowStatus == connStatus.WM_DEVICE_MSG_PHONEDISCONNECT){
	                        View.driverAdapterPannel&&View.driverAdapterPannel.sendMessage({
	                            status:nowStatus
	                        }); 
                    }    
                    View.driverAdapterPannel && (View.driverAdapterPannel.ready = true);                
                }
			});
    	}
    	
    };
    
    var connectWithCode = null;
    View.connect = function(){
    	var _this = this;
    	var isUpdate = false;
        /*把主窗口的连接状态发送到连接小窗里面  显示不同的内容*/
		connectWithCode = connectWithCode || function (curstate,code){
			var connStatus = connection.status;
			/*当前usb连接状态*/
			var status = connection.getStatus();
			/*当前wifi状态码*/
            var wifiCode = connection.getWifiCode();
            /*得到头部tip窗*/
	        var curController = app.getCurController(),
	            header = curController.views['header'],
	            connTip = header.connectionTip;
            /*下载驱动的tip class*/
			var classname = connTip.gainClass();
			
			/*如果是下载驱动状态 则接收两个参数 一个是状态 一个是下载进度*/
			if(status===connection.status.WM_DEVICE_MSG_DOWNLOADDRIVER&&code){
				View.downCode = code;
			    View.driverAdapterPannel&&View.driverAdapterPannel.sendMessage({
			        status:status,
			        todo:"downloadDriver",
			        downloadRate : code
			    }); 
			    isUpdate = false;               
			}else if(code===connection.wifiCode.WIFI_CODE_INSTALL){
				isUpdate = true;
				View.driverAdapterPannel&&View.driverAdapterPannel.sendMessage({
			        status:status,
			        todo:"wifiConnect",
			        wifiCode : code
			    });
			}else if((code===connection.wifiCode.WIFI_CODE_DISCONNECTING ||
					code===connection.wifiCode.WIFI_CODE_DISCONNECTED)&& isUpdate){
				View.driverAdapterPannel&&View.driverAdapterPannel.sendMessage({
                    status:2095,
			        todo:"wifiConnect",
			        wifiCode : 114
                });
                isUpdate = true;
			}else if( status===connection.status.WM_DEVICE_MSG_WIFICONNECT && code ){
				View.driverAdapterPannel&&View.driverAdapterPannel.sendMessage({
			        status:status,
			        todo:"wifiConnect",
			        wifiCode : code
			    });
				isUpdate = false;
			}else{
				if(classname == "ctn arrow-t arrow-bg-shadow ico-device-installing"){
			    	if( status===connection.status.WM_DEVICE_MSG_SCANING ||
			        	status===connection.status.WM_DEVICE_MSG_CHECKDRIVERBEGIN ||
			        	status===connection.status.WM_DEVICE_MSG_CHECKDRIVEREND ||
			        	status===connection.status.WM_DEVICE_MSG_DRIVERLOADING ){
			        		View.driverAdapterPannel&&View.driverAdapterPannel.sendMessage({
			                    status:2008
			                }); 
			        }
				}else{
					setTimeout( function(){
						View.driverAdapterPannel&&View.driverAdapterPannel.sendMessage({
			            	status:status
			       		 }); 
					},500)
				}  
				isUpdate = false;                
			}
         
            switch(status){
                case connStatus.WM_DEVICE_MSG_DOWNLOADDRIVER:
                 	connTip.addClassName("ico-device-down");
                 	downCode = code;
                    connTip.setText(i18nDi.fillDomText('common.downloadingDriver','( '+code +'% '+')' ));
                    if( View.driverAdapterPannel == null ){
		            	connTip.show();
		            }
                    break;
                case connStatus.WM_DEVICE_MSG_INSTALLDRIVER:
                    connTip.addClassName("ico-device-installing");
                    connTip.setText(i18nDi.fillDomText('common.installingDriverText'));
                    break;
                case connStatus.WM_DEVICE_MSG_INSTALLMUSERVER:
                case connStatus.WM_DEVICE_MSG_INSTALLMUSERVEROK:
                	connTip.addClassName("ico-device-mobo");
                    connTip.setText(i18nDi.fillDomText('common.installingMG'));
                    break;
                case connStatus.WM_DEVICE_MSG_DEVICEDISCONNECT:
                case connStatus.WM_DEVICE_MSG_PHONEDISCONNECT:
                    connTip.addClassName("ico-device-disconnect");
                    connTip.show();
                    connTip.setText(i18nDi.fillDomText('common.disconnectYourDeviceText'));
                    setTimeout( function(){
                        connTip.hide();
                    },3000);
                    break;
                case connStatus.WM_DEVICE_MSG_CONNECTSUCCEEDED:
	                connTip.addClassName("ico-device-connected");
	                connTip.show();
	                connTip.setText(i18nDi.fillDomText('common.connectedYourDeviceText'));
	                setTimeout(function(){
	                    connTip.hide();
	                }, 3000);
                    break;
                default: 
                	connTip.addClassName("");
                	connTip.hide();
                    break;
            }
            if( wifiCode == connection.wifiCode.WIFI_CODE_DISCONNECTED && !isUpdate){
            	connTip.addClassName("ico-device-disconnect");
                connTip.show();
                connTip.setText(i18nDi.fillDomText('common.disconnectYourDeviceText'));
                setTimeout( function(){
                    connTip.hide();
                },3000);
                app.dal.request({
	                action: "get_SetUsbConnectMode",
	                paras : {},
	                callback :function(res){
	                }
	            });
            }
            if( status === connection.status.WM_DEVICE_MSG_CONNECTSUCCEEDED){
            	if(connection.isWifiModel()){
            		View.logObject.mbrand = connection.deviceInfo.sPhoneBrand;
	        		View.logObject.mmodel = connection.deviceInfo.sPhoneName;
	        		utils.setlog_phonestatus(2);
	        		utils.sendWifiLog(View.logObject);
            	}
	        		
            }
            /*发送驱动页面时长日志   strat*/
            if(status === connection.status.WM_DEVICE_MSG_USBDEBUGNOTOPEN){
            	View.debugTime = new Date().valueOf();
				View.isDebug = true;
            }
            if(View.isDebug && status != connection.status.WM_DEVICE_MSG_USBDEBUGNOTOPEN){
            	var time2 = new Date().valueOf() - View.debugTime;
            	/*发送日志   strat*/
    			var logObject = {
					class: "usbdebugging",
					page: "p20026",
					duration: time2
				} 
				utils.sendNewLog("1000102", logObject);
				/*发送日志    end*/
            	View.isDebug = false;
            }
            /*发送驱动页面时长日志    end*/
           
            /*成功或断开 关掉小窗*/
            if (status === connection.status.WM_DEVICE_MSG_CONNECTSUCCEEDED ||
            	status === connection.status.WM_DEVICE_MSG_DEVICEDISCONNECT || 
            	status === connection.status.WM_DEVICE_MSG_PHONEDISCONNECT || 
            	wifiCode === connection.wifiCode.WIFI_CODE_CONNECTED ||
            	(wifiCode === connection.wifiCode.WIFI_CODE_DISCONNECTED && !isUpdate)) {
              		//窗口ready成功 发送关闭消息
					View.driverAdapterPannel && View.driverAdapterPannel.sendMessage({
						todo : "close"
 	   				});         			
			}           
        }
        
        connection.off("connection",connectWithCode).on("connection", connectWithCode);
        /*connection-"connectWithCode"方法 实时获取状态*/
    };
    return View;
});
