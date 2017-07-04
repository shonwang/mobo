define("UIHeader", function(require, exports, module) {
    var app = require('app');
    var   $ = require('jquery');
    var   _ = require('underscore');
    var UIMenu = require('UIMenu');
    var Window = require('UIWindow');
    var apiNames = require('APINames');
    var  utils = require('utils');
    var SmartTip = require('UISmartTip');
    var connection = require('connectionMgr');
    var taskMgr = require('taskModel');
    var theUserCenter = require('userCenter');
    var config = require('globalConfig');
    var UIDialog = require('UIDialog');
    
    var Friendly = require('UIFriendlyView');
    var ToolsMainView = require('UIToolsMainView');
    //搜索组件
    var SuggestView = require("SuggestView");
    
    var userCenter = require('userCenter');
    
    var i18nDi = require('I18NDI');
    
    var Model = app.ModelBase.extend({});
    
    var HeaderView = app.ViewBase.extend({
        connectionPannel: null,
        adbPannel:null,
        module: module,
        model: new Model(),
        events: {
            'click -> .close': 'close',
            'click -> .max-icon': 'toggle',
            'click -> .min': 'min',
            'click -> .g-ico-return': 'onBack',
            'click -> .g-ico-retreat': 'onForward',
            'click -> .g-ico-refresh': 'onRefresh',
			'click -> .fbk': 'feedback',
			'click -> .device-info': 'connectNow',
            'click -> .sign-in': 'onClickSignin'
        },
        
        onRefresh: function(){
            var curHash = app.getCurHashParas();
            app.eventCenter.trigger(curHash.module + curHash.action);
        },
        
        init: function(opts){
            this.el = $('#i-header');
            this.el.html(_.template(this.getTpl('tpl-header'), {I18N: i18nDi}));
            this.pendingSearch = false;//搜索频度控制
            connection.on('connection', $.proxy(this.onConnection, this));
			
            this.connectionTip = new SmartTip();
            /*隐藏动画*/
            //var UIRing = require('UIRing');
            //this.ring = new UIRing({canvas: 'i-battery-circle'});
            //this.ring.reset();
            //this.ring.rotate();
            var _this = this;
            this.menu = new UIMenu({
                    list: [
                        {
                            index: 0,
                            label: i18nDi.fillDomText('setting.setting')
                        },{
                              
                        },{
                            type:  'sp'  
                        },{
                            index: 2,
                            label: i18nDi.fillDomText('setting.whatNew')
                        },{
                            index: 4,
                            label: i18nDi.fillDomText('setting.ContactUs')
                        },{
                            index: 5,
                            label: i18nDi.fillDomText('setting.aboutMe')
                        },{
                            type:  'sp'  
                        },{
                            index: 6,
                            label: this.getTpl('tpl-setting-sns')
                        }
                    ],
                    y: 50,
                    rightOffsetX: 20
                });   
                
            this.menu.decorate(this.el.find('.setting'));
            this.menu.addClass('g-menu-setting');
            this.menu.on("show",function(){
            	$(".g-title-tip").hide();
            	_this.el.find(".setting").removeAttr("i18n-key");
            	_this.el.find(".fbk").removeAttr("i18n-key");
            	_this.el.find(".min").removeAttr("i18n-key");
            	_this.el.find(".max-icon").removeAttr("i18n-key");
            	_this.el.find(".close").removeAttr("i18n-key");
            });
            this.menu.on("close",function(){
            	_this.el.find(".setting").attr("i18n-key","setting.settingTip");
            	_this.el.find(".fbk").attr("i18n-key","setting.feedback");
            	_this.el.find(".min").attr("i18n-key","common.minTipText");
            	_this.el.find(".max-icon").attr("i18n-key","common.maxTipText");
            	_this.el.find(".close").attr("i18n-key","common.exitTipText");
            });
			window.addEventListener("hashchange",function(){
			    var hashPara = app.getCurHashParas();
			    var inputVal;
			  
			    switch(hashPara.action){
			    	case "ringtone":
			    	inputVal = 'common.searchHolderRingtone';
			    	break;
			    	case "wallpaper":
			    	inputVal = 'common.searchHolderWallpaper';
			    	break;
			    	case "youtube":
			    	inputVal = 'common.searchHolderYoutube';
			    	break;
			    	case "sms":
			    	inputVal = 'common.smsLabel';
                    break;
                    case "contact":
                    inputVal = 'common.contactLabel';
                    break;
                    case "book":
                    inputVal = 'common.searchHolderEBook';
                    break;
                    case "app":
                    if(hashPara.module=="app"){
                        inputVal = 'common.searchHolderMyApp';
                    }else{
                    	inputVal = 'common.searchHolderAppGames';
                    }
                    break;
			    	default:
			    	inputVal = 'common.searchHolderAppGames';
			    }
			    _this.el.find(".g-search-box .placeholder-head").html(i18nDi.fillDomText(inputVal));
			    if(hashPara.query.sort&&hashPara.pageState&&hashPara.pageState.q){
			    	 _this.el.find(".g-search-box .com-text").val(hashPara.pageState.q);
			    	 _this.el.find(".g-search-box .com-text").siblings(".icon-control").addClass("g-search-clear").removeClass("g-search-icon");
			    }
			});
			
            this.menu.on(UIMenu.SELECT, function(data, e){
                if(data.index === 4){
                    utils.browser('http://www.mobogenie.com/contact.html');
                }else if(data.index === 6){
                    var i = e.target.dataset.i;
                    var url = '';
                    switch(i){
                        case "1": url = 'http://www.facebook.com/mobogenie';break;
                        case "2": url = 'https://twitter.com/mobogenie';break;
                        case "3": url = 'https://plus.google.com/+Mobogeniedotcom/posts';break;
                    }
                    url && utils.browser(url);
                }else if(data.index === 5){
					if(!_this.aboutPannel){
						_this.aboutPannel = new app.PopupPanel({
							Model: 1,
							Width: 500,
							Height: 300,
							Path: 'aboutMe.html'
						});   
						_this.aboutPannel.open();
						
						//处理弹窗中的事件
						_this.aboutPannel.on('message', function(data){
							if(data.action == 'close'){
								_this.aboutPannel = null;
							}
						});
					}
				}else if(data.index === 0){
					_this.openSettingPannel();
                    //*********************************************************
                    //20140724 新版日志
                    var logObject = {
                        class: "framework",
                        page: "framework",
                        module: "title",
                        action: "settings"
                    }
                    utils.sendNewLog("1000120", logObject);
                    //*********************************************************
			    }else if(data.index === 2){
				 	if(!_this.newBiePannel){
						_this.newBiePannel = new app.PopupPanel({
							Model: 2,
							Width: 600,
							Height: 400,
							Path: 'newbieGuide.html'
						});   
						_this.newBiePannel.open();
						
						//处理弹窗中的事件
						_this.newBiePannel.on('message', function(data){
							if(data.action == 'close'){
								_this.newBiePannel = null;
							}
						});
					}
				}
            });
            
            this.setStatusView();
            
            
            //this.connectionTip.show();
            
            //this.connectionTip.setPosition(10, 45);
            //this.connectionTip.setText('Downloading the driver for your ME525');
            
            
            this.el.on('mousedown', $.proxy(this.onmousedown, this));
            this.el.on('dblclick', $.proxy(this.ondbClick, this));
            app.history.on('statechange', (function(){
                this.setNavState(app.history.curIndex);
            }).bind(this));
            app.dal.binding(apiNames.BIND_CLOSE, function(){
                try{
                    taskMgr.progressCollection.saveProgressTask();
                }catch(e){}
                
                this.model.request({
                    action: apiNames.REQ_CLOSE
                });
            });
            
            app.dal.binding(apiNames.BIND_OPEN_SETTING, function(){
                _this.openSettingPannel();
            });

            app.dal.binding("set_Login", function() {
                _this.onClickSignin();
            });
            
            app.eventCenter.on('switchpageend', function(hash){
                //if(hash.module === 'home' || hash.module === 'tools'){
                if(hash.module === 'tools'){
                    this.el.find('.g-ico-refresh').prop('disabled', true);
                }else{
                    this.el.find('.g-ico-refresh').prop('disabled', false);
                }
            }.bind(this));
            
             this.suggestView = new SuggestView({
                    el : ".g-search-box",
                    searchInput : ".com-text"
              });
              
			/*添加title*/
			utils.tooltip.attach(this.el.find(".fbk"));
			utils.tooltip.attach(this.el.find(".setting"));
			utils.tooltip.attach(this.el.find(".min"));
			utils.tooltip.attach(this.el.find(".max-icon"));
			utils.tooltip.attach(this.el.find(".close"));
			
			utils.tooltip.attach(this.el.find(".g-ico-return"));
			utils.tooltip.attach(this.el.find(".g-ico-retreat"));
			utils.tooltip.attach(this.el.find(".g-ico-refresh"));
			
			/*托盘menu语言*/
			var switchLanguage = function(){
				var openText = $(i18nDi.fillDomText('common.menuOpenLabel')).html(),
					settingText = $(i18nDi.fillDomText('setting.setting')).html(),
					exitText = $(i18nDi.fillDomText('common.exitTipText')).html();
			    app.dal.request({
		            action: apiNames.REQ_SET_NENU_LANGUAGE,
		            paras : {
		            	open: openText,
		            	settings: settingText,
		            	exit: exitText
		            }
		        });
			}
			switchLanguage();
			/*第一次插手机设置弹窗*/
            connection.on("connection", function() {
                //conn.connect();
                var status = connection.getStatus();
                //console.log("第一次连接手机事件",status,connection.status.WM_DEVICE_MSG_CONNECTSUCCEEDED);
                if (status === connection.status.WM_DEVICE_MSG_CONNECTSUCCEEDED && !localStorage.setOpen) {
                        localStorage.setOpen = true;
                        if(!this.setTipswind){
                            this.setTipswind = new app.PopupPanel({
                                Model: 2,
                                Width: 380,
                                Height: 160,
                                Path: 'setTips.html'
                            });   
                            this.setTipswind.open();
			          		/*发送tips页面时长日志 strat*/
				        	var tipsTime = new Date().valueOf();
				        	
				        	/*发送tipshowup日志                  strat*/
							var showObject = {
								class: "ondeviceopen",
								page: "ondeviceopen",
								module: "body",
								action: "showup"
							} 
							utils.sendNewLog("1000120", showObject);
							/*发送tipshowup日志            end*/
                            //处理弹窗中的事件
                            this.setTipswind.on('message', function(data){
                                if(data.action == 'close'){
                                    this.setTipswind = null;
                                    /*发送页面时常日志*/
                                    var tipsTime2 = new Date().valueOf() - tipsTime;
									var logObject = {
										class: "ondeviceopen",
										page: "ondeviceopen",
										duration: tipsTime2
									} 
									utils.sendNewLog("1000102", logObject);
                                }else if(data.action == 'setPullClient'){
                                	/*发送用户选择日志                  strat*/
									var closeObject = {
										class: "ondeviceopen",
										page: "ondeviceopen",
										module: "body",
										action: "choose",
										targetvalue:data.paras
									} 
									utils.sendNewLog("1000120", closeObject);
									/*发送用户选择日志                       end*/
                                    app.dal.request({
                                        action : apiNames.REQ_SET_PULL_CLIENT,
                                        paras:{
                                            alwaysOpenMobogenie : data.paras
                                        },
                                        callback : function(res) {
                                            console.log(data.paras);
                                        }
                                    });

                                }
                            });
                        }
                    
                }
            });
           
			var I18NDI = require('I18NDI');
			app.eventCenter.on('switchLanguage',  switchLanguage);
			
            this.isLogin = false;
            //自动登录
            //判断是否本地存储用户名和密码
            // var isStorePwd = localStorage["isStorePwd"];
            // if (isStorePwd){
            //     this.onClickSignin();
            //     this.isLogin = true
            // }
           document.addEventListener("dragenter", this.onDragEnter.bind(this),  false);  
           document.addEventListener("dragover", this.onDragEnter.bind(this),  false);  
           document.addEventListener("drop", this.onDragEnter.bind(this),  false);  
        },
        onDragEnter:function(event){
            event.preventDefault();
            event.stopPropagation();
            return false;
        },        
        openSettingPannel: function(){
        	var globalConfig = require('globalConfig');
            if(!this.settingPannel){
                this.settingPannel = new app.PopupPanel({
                    Model: 1,
                    Width: 614,
                    Height: 506,
                    Path: 'setting.html'
                });   
                this.settingPannel.open();
                var site = globalConfig.domain.site;
                this.settingPannel.sendMessage({
                    site:globalConfig.domain.site
                });
                //处理弹窗中的事件
                this.settingPannel.on('message', function(data){
                    if(data.action == 'close'){
                        this.settingPannel = null;
                    }else if( data.action == 'switchSite' ){
                    	globalConfig.setService(data.paras,data.currentSite);
                    	app.eventCenter.trigger("switchSite",globalConfig.domain,$.trim(data.currentSite));    	
                    }else if( data.action == 'switchLanguage' ){
                    	switchLanguage(data.paras);
                    }
                }.bind(this));
            }
        },
        
        onBack: function(){
            app.history.back();
        },
        onForward: function(){
            app.history.forward()
        },

        setNavState: function(curPos){
            this.el.find('.g-ico-return').prop('disabled', curPos <= 0)
            this.el.find('.g-ico-retreat').prop('disabled', curPos >= app.history.length() - 1);
            var curHash = app.getCurHashParas();
            if(curHash.module=="app"){
            	utils.placeholder($(".g-search-box .head-box"),i18nDi.fillDomText('common.searchHolderMyApp'),"header"); 
            }else if(curHash.module=="contact"){
                utils.placeholder($(".g-search-box .head-box"),i18nDi.fillDomText('contact.sideLabel'),"header");
            }else if(curHash.module=="sms"){
                utils.placeholder($(".g-search-box .head-box"),i18nDi.fillDomText('contact.message'),"header");
            }else{
                if(curHash.action=="ringtone"){
                    utils.placeholder($(".g-search-box .head-box"),i18nDi.fillDomText('common.searchHolderRingtone'),"header");
                }else if(curHash.action=="wallpaper"){
                    utils.placeholder($(".g-search-box .head-box"),i18nDi.fillDomText('common.searchHolderWallpaper'),"header");
                }else if(curHash.action=="youtube"){
                   utils.placeholder($(".g-search-box .head-box"),i18nDi.fillDomText('common.searchHolderYoutube'),"header");
                }else if(curHash.action=="book"){
                   utils.placeholder($(".g-search-box .head-box"),i18nDi.fillDomText('common.searchHolderEBook'),"header");
                }else{
                    utils.placeholder($(".g-search-box .head-box"),i18nDi.fillDomText('common.searchHolderAppGames'),"header");
                }
            }
        },

        onGetDeviceInfo: function(){
            var conn = connection;
            var status = conn.getStatus();
            
            var $arrow = this.el.find('.device-info .arl');
            
            if(conn.isConnect()){
                var deviceInfo = conn.deviceInfo;
                
                this.el.find('.logo').removeClass('logo');
                $arrow.show();
                
                var brand;
                if(deviceInfo.sPhoneBrand){
                    var first = deviceInfo.sPhoneBrand.substring(0, 1);
                    first = first.toUpperCase();
                    brand = first + deviceInfo.sPhoneBrand.substring(1);
                }
                
                this.el.find('h1').html('<p class="brand">' + brand + '</p><p class="model"> ' + deviceInfo.sPhoneName + '</p>');
            }
        },

        setStatusView: function(){
            var conn = connection;
            var status = conn.getStatus();
            var wifiStatus = conn.getWifiCode();
            var wifiModel = conn.isWifiModel();
            var connStatus = conn.status;
            
            var $arrow = this.el.find('.device-info .arl');
            
            clearTimeout(this.batteryTimer);
            
            if(status == conn.status.WM_DEVICE_MSG_CONNECTSUCCEEDED){
                var deviceInfo = conn.deviceInfo;
                this.onGetDeviceInfo();
                
                //if(this.ring){
                    //this.ring.reset();
                    this.el.find('.connect').hide();
                    this.el.find('.battery').show();
                    if( wifiModel ){
                    	this.el.find('.wifi').show();
                    	this.el.find('.usb').hide();
                    }else{
                    	this.el.find('.wifi').hide();
                    	this.el.find('.usb').show();
                    }
                    var setBattery = (function(sBatteryLevel){
                        var $i = this.el.find('.electricity i');
                        
                        if(sBatteryLevel <= 20){
                            $i.removeClass('blue').addClass('reg');
                        }else{
                            $i.removeClass('reg').addClass('blue');
                        }
                        
                        $i.css('height', sBatteryLevel + '%');
                        
                        this.batteryTimer = setTimeout(function(){
                            if(conn.isConnect()){
                                conn.getBattery(function(b){
                                    setBattery(b);
                                });
                            }
                        }, 1000 * 60 * 2);
                    }).bind(this);
                    
                    setBattery(deviceInfo.sBatteryLevel);
                    
                //}
                $(document.body).removeClass('g-unconnected');
            }else if(status === connStatus.WM_DEVICE_MSG_DOWNLOADFAILED ||
                status === connStatus.WM_DEVICE_MSG_USBDEBUGNOTOPEN || 
                status === connStatus.WM_DEVICE_MSG_INSTALLMUSERVERFAILED || 
                status === connStatus.WM_DEVICE_MSG_CONNECTPHONEFAILED ||
                status === connStatus.WM_DEVICE_MSG_OFFLINEFAILED ||
                status === connStatus.WM_DEVICE_MSG_DEVICEDISCONNECT ||
                status === connStatus.WM_DEVICE_MSG_PHONEDISCONNECT ||
                status === connStatus.WM_DEVICE_MSG_USBDEBUGNOTOPEN ||
                status === connStatus.WM_DEVICE_MSG_INSTALLFAILED || 
                status === connStatus.WM_DEVICE_MSG_NOTSTART ||
                status === connStatus.WM_DEVICE_MSG_DEVICEISOFFLINE ||
                status === connStatus.WM_DEVICE_MSG_NODEVICEPLUGIN ||
                wifiStatus === conn.wifiCode.WIFI_CODE_DISCONNECTED ||
                wifiStatus === conn.wifiCode.WIFI_CODE_SCAN_NODEVICE ||
                wifiStatus === conn.wifiCode.WIFI_CODE_UDP_NODIP ||
                wifiStatus === conn.wifiCode.WIFI_CODE_MAC_NULL ||
                wifiStatus === conn.wifiCode.WIFI_CODE_TCP_CONNECT ||
                wifiStatus === conn.wifiCode.WIFI_CODE_NODEVICE ||
                wifiStatus === conn.wifiCode.WIFI_CODE_REFUSED ||
                wifiStatus === conn.wifiCode.WIFI_CODE_USERDISCONNECT ||
                wifiStatus === conn.wifiCode.WIFI_CODE_DISCONNECTING ||
                wifiStatus === conn.wifiCode.WIFI_CODE_UPDATEFAILED ){
                this.el.find('.device-info').addClass('logo');
                $arrow.hide();
                this.el.find('.connect').hide();
                this.el.find('.battery').hide();
                
                $(document.body).addClass('g-unconnected');
            }else{
                this.el.find('.logo').removeClass('logo');
                if( wifiModel ){
                 	this.el.find(".connect").addClass("connect-wifi")
                }else{
                 	this.el.find(".connect").removeClass("connect-wifi")
                }
                this.el.find('h1').html(i18nDi.fillDomText('common.connectingText'));
                $arrow.hide();
                
                this.el.find('.connect').show();
                
                /*断开手机 立马插入手机 tip消失*/
                if(status === connStatus.WM_DEVICE_MSG_SCANING){
                	var classname = this.connectionTip.gainClass();
                	if(classname == "ctn arrow-t arrow-bg-shadow ico-device-disconnect"){
	               		this.connectionTip.hide();
	                }
                }
                
                /*if(!this.ring.rotating){
                    this.ring.reset();
                    this.ring.rotate();
                }*/
                this.el.find('.battery').hide();
                $(document.body).addClass('g-unconnected');
            }
        },
        
        onConnection: function(status,downCode){
            //连接成功初始化下拉菜单
            if(connection.isConnect()){
            	
                if(!this.connectionMenu){
                    this.connectionMenu = new UIMenu({
                        list: [{
                                index: 0,
                                label: i18nDi.fillDomText('common.disconnectYourDeviceText')
                            },/*{
                                index: 1,
                                label: i18nDi.fillDomText('common.connectAnother')
                            },*/{
                                index: 2,
                                label: i18nDi.fillDomText('common.deviceInfo')
                            }],
                         duration: 100
                    }); 
                    
                    this.connectionMenu.on(UIMenu.SELECT, (function(data){
                        if(data.index == 1){
                            this.showDriverAdapter();
                        }else if(data.index == 2){
                        ToolsMainView.DeviceInfo();
                        /* 发送日志--------------------------------------- */
                        	var logObject = {
		                        class: "framework",
		                        page: "p20001",
		                        module: "m20002",
		                        action: "a20004"
		                    }
		                    utils.sendNewLog("1000120", logObject);
		                /* 发送日志--------------------------------------- */
                        	
                        }else if(data.index == 0){
                            connection.disconnect();
                        }
                    }).bind(this));
                }
                
                this.connectionMenu.decorate(this.el.find('.device-info'));
                this.connectionMenu.addClass('g-connect-menu');
                
                this.deviceInfo = connection.deviceInfo;
            }else{
            	ToolsMainView.DeviceInfo();
                this.connectionMenu && this.connectionMenu.hide();
                this.connectionMenu && this.connectionMenu.undecorate();
                this.suggestionMenu&&this.suggestionMenu.hide();
                this.suggestView&&this.suggestView.clearSearch();
            }
            
            this.setStatusView();
            
            connection.on("getDeviceInfo", this.onGetDeviceInfo.bind(this));
            
            //status = connection.status.WM_DEVICE_MSG_INSTALLMUSERVER;
            
            
            var conStatus = connection.status;
            var connTip = this.connectionTip;
            
           // clearTimeout(this.completeTimeout);
            console.log(status);
            
            connTip.setPosition(13, 52);

            /*if(status == conStatus.WM_DEVICE_MSG_CONNECTSUCCEEDED ){
                connTip.addClassName("ico-device-connected");
                connTip.show();
                connTip.setText(i18nDi.fillDomText('common.connectedYourDeviceText'));
                this.completeTimeout = setTimeout(function(){
                    connTip.hide();
                }, 3000);
            }*/
            clearTimeout(this.errorTimer);
            this.errorTimer = setTimeout(function(){
                this.showConnectionError(status,downCode);
            }.bind(this), 200);
        },
        
        showConnectionError: function(status,code){
            var connStatus = connection.status;
            var _this = this;
            
            var isErrorStatus = function(ss){
                if(ss === connStatus.WM_DEVICE_MSG_DOWNLOADFAILED ||
                    ss === connStatus.WM_DEVICE_MSG_USBDEBUGNOTOPEN || 
                    ss === connStatus.WM_DEVICE_MSG_INSTALLMUSERVERFAILED || 
                    ss === connStatus.WM_DEVICE_MSG_CONNECTPHONEFAILED ||
                    ss === connStatus.WM_DEVICE_MSG_OFFLINEFAILED ||
                    ss === connStatus.WM_DEVICE_MSG_USBDEBUGNOTOPEN ||
                    ss === connStatus.WM_DEVICE_MSG_INSTALLFAILED ||
                    ss === connStatus.WM_DEVICE_MSG_DEVICEISOFFLINE ||
                    ss === connStatus.WM_DEVICE_MSG_ADBISBLOCKED){
                        return true;
                }
                false;
            };
            
            this.receiveredStatus = status;
            
            if(isErrorStatus(status)){
				this.winReady = this.winReady || false;
				function showDriverWin(){
					//创建并打开弹窗
					if(!_this.connectionPannel){
					    _this.connectionPannel = new app.PopupPanel({
					        Model: 3,
					        Width: 640,
					        Height: 530,
					        Parame: {
					            status: status,
					            adbCode: connection.adbCode
					        },
					        Path: 'connectionException.html'
					    });   
					    _this.connectionPannel.open();
					    /*发送驱动页面时长日志                                                                                                                  strat*/
					    var debugTime;
			            if(status === connStatus.WM_DEVICE_MSG_USBDEBUGNOTOPEN){
			            	debugTime = new Date().valueOf();
			            }
			            /*发送驱动页面时长日志                                                                                                                  end*/
					    //处理弹窗中的事件
					    _this.connectionPannel.on('message', function(data){
					    	if( data.action == 'wifiConnet' ){
					    		_this.connectionPannel.sendMessage({
					            	winMsg: 1
					            });
					            /*发送驱动页面时长日志 strat*/
					        	if(status === connStatus.WM_DEVICE_MSG_USBDEBUGNOTOPEN && Friendly.isDebug){
					            	var debugTime2 = new Date().valueOf() - debugTime;
									var logObject = {
										class: "usbdebugging",
										page: "p20026",
										duration: debugTime2
									} 
									utils.sendNewLog("1000102", logObject);
					            }
					            Friendly.isDebug = false;
					            /*发送驱动页面时长日志 end*/
					            _this.connectionPannel = null;
					            _this.winReady = false;
					            
					        	if(!Friendly.instance){
					                Friendly.instance = new Friendly();
					            }
					            Friendly.instance.clickConnect(true);
					        }else if(data.action == 'close'){
					         	/*发送驱动页面时长日志                                                                                                                  strat*/
					        	if(status === connStatus.WM_DEVICE_MSG_USBDEBUGNOTOPEN && Friendly.isDebug){
					            	var debugTime2 = new Date().valueOf() - debugTime;
									var logObject = {
										class: "usbdebugging",
										page: "p20026",
										duration: debugTime2
									} 
									utils.sendNewLog("1000102", logObject);
					            }
					            Friendly.isDebug = false;
					            /*发送驱动页面时长日志                                                                                                                  end*/
					            _this.connectionPannel = null;
					            _this.winReady = false;
					        }else if(data.action == 'ready'){
					            _this.winReady = true;
					            
					            if(isErrorStatus(_this.receiveredStatus)){
					                _this.connectionPannel && _this.connectionPannel.sendMessage({
					                    status: _this.receiveredStatus,
					                    adbCode: connection.adbCode
					                });
					            }else{
					                _this.connectionPannel && _this.connectionPannel.sendMessage({
					                    winMsg: 1,//关闭
					                    adbCode: connection.adbCode
					                });
					            }
					        }
					    });
					}else{
					    if(_this.winReady){
					        _this.connectionPannel.sendMessage({
					            status: status,
					            adbCode: connection.adbCode 
					        });
					        _this.connectionPannel.restore();
					    }
					}
				}
				//去除adb yangtian
				function getAdbState(){
					if(status == connStatus.WM_DEVICE_MSG_CONNECTPHONEFAILED ||
					   status == connStatus.WM_DEVICE_MSG_ADBISBLOCKED){
						app.dal.request({
			                action: "get_AdbState",
			                paras : {},
			                callback :function(res){
			                	if(res.isMoboAdb == 0 || status == connStatus.WM_DEVICE_MSG_ADBISBLOCKED){
			                		if(!_this.adbPannel){
										_this.adbPannel = new app.PopupPanel({
											Model: 2,
											Width: 640,
											Height: 510,
											Parame: {
							                    name: res.adbName
							                },
											Path: 'getAdbState.html'
										});   
										_this.adbPannel.open();
										//处理弹窗中的事件
										_this.adbPannel.on('message', function(data){
											if(data.action == "closeRecon"){
												if( _this.adbPannel ){
													_this.adbPannel.sendMessage({
									                    todo: "close"//关闭
									                },function(){
									                	setTimeout( function(){
									                		
															connection.reConnect();
														},500)
									                });
												}else{
													connection.reConnect();
												}
											}else if(data.action == 'close'){
												_this.adbPannel = null;
											}
										});
									}
			                	}else{
			                		//showDriverWin();
			                		if(_this.adbPannel){
										_this.adbPannel.sendMessage({
								   		 	action : "close"
										},function(){
											setTimeout( function(){
												showDriverWin();
											},500)
										});  
									}else{
									 	showDriverWin();
									}
			                	}
			                }
			            });
					}else{
						if(_this.adbPannel){
							_this.adbPannel.sendMessage({
					   		 	action : "close"
							},function(){
								setTimeout( function(){
									showDriverWin();
								},500)
							});  
						}else{
						 	showDriverWin();
						}
					}
				};
				//获取当前的连接小窗
               
                if( Friendly.driverAdapterPannel ){
                	Friendly.driverAdapterPannel && Friendly.driverAdapterPannel.sendMessage({
			   		 todo : "close"
					},function(){
						setTimeout( function(){
							getAdbState()
						},500)
					});  
                }else{
                	//showDriverWin();
                	getAdbState()
                }
                
            }else{
                if(this.connectionPannel){
                    if(this.winReady){
                        this.connectionPannel.sendMessage({
                            winMsg: 1,//关闭
                            adbCode: connection.adbCode 
                        });
                    }
                }
            }
        },
        
        onmousedown: function(e){
            if(!$(e.target).hasClass('g-search-box')){
                this.model.request({
                    action: apiNames.REQ_DRAG_DISABLED
                });
            }
        },
        
        ondbClick: function(e){
            if($(e.target).hasClass('g-search-box')){
                this.toggle();
            }
        },
        
        connect: function(){
            var me = this;
            
            connection.connect(function(res){
                this.getDeviceInfo(function(res){
                    console.log('device=', res);
                });
            });
        },
        
        close: function(){
            taskMgr.progressCollection.saveProgressTask();
            this.model.request({
                action: apiNames.REQ_CLOSE
            });
        },
        toggle: function(){
            this.model.request({
                action: apiNames.REQ_MAXIMIZE
            });
            this.el.find(".max-icon").toggleClass("max");
            this.el.find(".max-icon").toggleClass("default");
        },
        min: function(){
            this.model.request({
                action: apiNames.REQ_MINILIZE
            });
        },
		feedback : function(){
			var _this = this;
			var curHash = app.getCurHashParas();
			console.log(curHash)
			
			var fbCfg = config.ctrConfig[1004];
            app.navigate({
                module : fbCfg.module,
                action : fbCfg.action,
                pageState :{
                	vt : "question",
                	curModule:curHash.module,
                	curAction:curHash.action
                }
            });
			//创建并打开弹窗
			/*if(!_this.feedbackPannel){
				_this.feedbackPannel = new app.PopupPanel({
					Model: 2,
					Width: 530,
					Height: 398,
					Path: 'feedback.html'
				});   
				_this.feedbackPannel.open();
				
				//处理弹窗中的事件
				_this.feedbackPannel.on('message', function(data){
					if(data.action == 'close'){
						_this.feedbackPannel = null;
					}
				});
			}*/
            //*********************************************************
            //20140724 新版日志
            var logObject = {
                class: "framework",
                page: "framework",
                module: "title",
                action: "feedback"
            }
            utils.sendNewLog("1000120", logObject);
            //*********************************************************             
		},
		connectNow : function(e){
			
			e.stopPropagation();
		    var _this = this;  
			var nowStatus = connection.getStatus();
        	var connStatus = connection.status;
       
        	if( nowStatus != connStatus.WM_DEVICE_MSG_CONNECTSUCCEEDED ){
                this.connectionTip.hide();
				if(!Friendly.instance){
	                Friendly.instance = new Friendly();
	            }
	            Friendly.instance.clickConnect();
			}
			/*连接成功后，点击logo，出现下拉菜单时，tip消失*/
			if( nowStatus === connStatus.WM_DEVICE_MSG_CONNECTSUCCEEDED && $(this.connectionTip)[0].el.is(":visible")){
				this.connectionTip.hide();
			}
			
		},
		showDriverAdapter : function(){
			var _this = this;
			//创建并打开弹窗
			if(!_this.connectionSelectorPannel){
				_this.connectionSelectorPannel = new app.PopupPanel({
					Model: 2,
					Width: 600,
					Height: 430,
					Path: 'driverAdapter.html'
				});   
				_this.connectionSelectorPannel.open();
				
				//处理弹窗中的事件
				_this.connectionSelectorPannel.on('message', function(data){
					if(data.action == 'close'){
						_this.connectionSelectorPannel = null;
					}
				});
			}
		},


        //****************************************************************
        //目的： 以下函数为弹窗登录
        //****************************************************************
        onClickSignin: function(){
            // var isStorePwd = localStorage["isStorePwd"];
            // if (isStorePwd && this.isLogin === false){
            //     console.log("获取用户信息");
            //     theUserCenter.getUserInfo($.proxy(this.onGetUserInfo, this));
            // } else {
                if(!this.loginPannel){
                    this.loginPannel = new app.PopupPanel({
                        Model: 1,
                        Width: 340,
                        Height: 410,
                        Path: 'signIn.html',
                        Parame: {
                            isLogin: this.isLogin, 
                            userInfo: this.userInfo,
                            connectInfo: connection.isConnect()
                        }
                    });   
                    this.loginPannel.open();
                    
                    this.loginPannel.on('message', function(data){
                        console.log("来自登录弹窗的消息 >> ", data);
                        if(data.action === 'close'){
                            this.loginPannel = null;
                        } else if (data.action === 'changeHeader'){
                            var data = data.para;
                            this.onlineHeader(data);
                            this.isLogin = true;
                            if (data.userInfo){
                                this.userInfo = data.userInfo
                            }
                            this.userInfo.imagePath = data.imagePath;
                        } else if (data.action === 'storeAccount'){
                            // var data = data.para;
                            // localStorage["isStorePwd"] = true;
                            // //TODO 加密
                            // localStorage["storeAccount"] = data.account;
                            // localStorage["storePwd"] = data.pwd;                       
                        } else if (data.action === 'networkError'){
                            this.onLogout();
                        }
                    }.bind(this));
                    
                    var sendConectInfo = function(){
                        console.log("手机连接状态：", connection.isConnect());
                        if (this.loginPannel){
                            if (connection.isConnect() === false){
                                this.loginPannel.sendMessage({action: "disconnect"});
                            } else if(connection.isConnect() === true){
                                this.loginPannel.sendMessage({action: "connect"});
                            }
                        }
                    }
                    connection.on('connection', $.proxy(sendConectInfo, this));
                }
            // }
        },

        onGetUserInfo: function(res){
            console.log("自动登录返回的用户信息 >> ", res);
            if (res){
                if (res.result === true){
                    this.onlineHeader(res);
                    this.userInfo = res;
                } else {
                    var account = localStorage["storeAccount"];
                    var pwd = localStorage["storePwd"];
                    var loginData = {};
                    loginData.account = account;
                    loginData.pwd = pwd;
                    loginData.loginType = 0;
                    theUserCenter.login(loginData, function(res){
                        if (res) {
                            this.onlineHeader(res);
                            this.userInfo = res;
                        }
                    }.bind(this));
                }
            } else {
                this.isLogin = false;
                // delete localStorage["isStorePwd"];
                // delete localStorage["storeAccount"];
                // delete localStorage["storePwd"];
            }
        },

        onLogout: function(res){
            if (res){
                if (res.result === true){
                } else {
                    this.loginMenu.decorate(this.el.find(".online"));
                }
            } else {
                this.el.find(".sign-in").show();
                this.el.find(".online").hide();
                this.isLogin = false;
                // delete localStorage["isStorePwd"];
                // delete localStorage["storeAccount"];
                // delete localStorage["storePwd"];
                if (this.loginMenu){
                    this.loginMenu.undecorate();
                    this.loginMenu.destroy();
                    this.loginMenu = null;
                }
            }
            app.dal.request({
                action : "get_Login",
                paras : {uid: null}
            });
        },

        onlineHeader: function(data){
            this.el.find(".sign-in").hide();
            if (data.imagePath){
                this.el.find(".online").find("img").get(0).src = data.imagePath;
            } else {
                this.el.find(".online").find("img").get(0).src = "../src/common/images/header/user-avatar30.png";
            }
            this.el.find(".online").show();
            if (this.loginMenu){
                this.loginMenu.undecorate();
                this.loginMenu.destroy();
                this.loginMenu = null;
            }

            var itemList = [
                {index: 1, label: i18nDi.fillDomText('signin.myAccountLabel')},
                {index: 2, label: i18nDi.fillDomText('signin.logoutLabel')},
            ]
            this.loginMenu = new UIMenu({
                list: itemList
            });
            this.loginMenu.el.addClass("g-header-user-down");
            this.loginMenu.decorate(this.el.find(".online"));
            this.loginMenu.on(UIMenu.SELECT, $.proxy(this.onSelectLoginMenuItem, this));
        },

        onSelectLoginMenuItem: function(item){
            console.log("登录下拉菜单 >> ", item);
            if (item){
                if (item.index === 1){
                    app.dal.request({
                        action : "get_Url",
                        paras : {url: "www.mobogenie.com"},
                        callback : function(res) {
                            if (res&&res.code === 18){
                                var confirmDlg = new UIDialog({
                                    buttonKey : 2, //1双按钮
                                    content : i18nDi.fillDomText('signin.networkLabel'),
                                    title: i18nDi.fillDomText('signin.myAccountLabel')
                                });
                                confirmDlg.show();
                                confirmDlg.on("ok", function(){
                                    this.onLogout();
                                }.bind(this));
                            } else {
                                this.onClickSignin();
                            }
                        }.bind(this)
                    });
                } else if (item.index === 2){
                    this.loginMenu.undecorate();
                    theUserCenter.logout($.proxy(this.onLogout, this));
                    this.el.find(".sign-in").show();
                    this.el.find(".online").hide();
                    this.isLogin = false;
                    // delete localStorage["isStorePwd"];
                    // delete localStorage["storeAccount"];
                    // delete localStorage["storePwd"];
                    if (this.loginMenu){
                        this.loginMenu.undecorate();
                        this.loginMenu.destroy();
                        this.loginMenu = null;
                    }
                }
            }
        }

        // navigateToPersonal: function(){
        //     var ctrCfg = config.ctrConfig[1004];
        //     app.navigate({
        //         module : ctrCfg.module,
        //         action : ctrCfg.action
        //     }, {
        //         mergeCache : true
        //     });
        // }
    });
    
    return HeaderView;
}); 