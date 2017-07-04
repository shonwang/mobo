define('UIDriverAdapter', function(require, exports, module){
	var app = require('app');
	var i18nDi  = require('I18NDI');
	var   $ = require('jquery');
	var   _ = require('underscore');
	var utils = require('utils');
	var globalConfig = require('globalConfig');
	var connection = require('connectionMgr');
	var apiNames = require('APINames');
	var Friendly = require('UIFriendlyView');
	var utils = require("utils");
	var  getTimer,getTimer2,getTimer3;
	var isTime = true;
	var View = app.ViewBase.extend({
        module: module,
		init: function(opts){
		    this.opts = opts;
		    this.win = opts.win;
		    this.el = $(_.template(this.getTpl('tpl-driverAdapter-view'), {I18N: i18nDi}));
		    if(!localStorage.driverOpen){
		    	this.el.find(".wifi").addClass("first")
		    }else{
		    	this.el.find(".wifi").removeClass("first")
		    }
		    
		    this.logObject = {
				devicevid: "-",
				devicepid: "-",
				devicemacaddress: "-",
				deviceinstanceid: "-",
				osmajorversion: "-",
				osminorversion : "-",
				osips: "-",
				usbopened: "-",
				connect: "-",
				connectcode: "-",
				mbrand: "-",
				mmodel : "-",
				nullvalue: "-",
				beginconnect: "1",
				connectnow: "0"
			} 
			var me = this;
		},
		showException:function(opts){
			var _this = this.el;
			var me = this;
			var wifiConting = false;
			
			/*设置窗口背景颜色*/
			$(".g-popup").addClass("g-popup-driver");
			$(".g-popup-driver").css("background","#f9f9f9");
			
			var $wifi = $(".g-connction-guide-wifi > div"),
				$wificon = _this.find(".wifi-con"),
				$wifipass = _this.find(".wifi-pass"),
				$wificonting = _this.find(".wifi-conncting"),
				$wififailed = _this.find(".wifi-failed"),
				$wifidevice = _this.find(".wifi-deviceCon"),
				$wifiwarrnnt = _this.find(".wifi-warrnnt"),
				$wifinix = _this.find(".wifi-nix"),
				$updateFailed = _this.find(".wifi-updatefailed"),
				$wifiInstall = _this.find(".wifi-install"),
				$wifiPleaInstall = _this.find(".wifi-pleaseInstall"),
				$wifiCode = $wifipass.find(".code"),
				$connectNav = _this.find(".g-connction-guide-nav");
			/*点击usb连接*/
			_this.find(".usbConn").click( function(){
               me.win.notifyParentWindow({
	                action: 'usbConnect'
	           });
			});
			/*底部切换usb wifi连接页面*/
			$(".g-connction-guide-nav ul li").click( function(){
				/*切换usb wifi连接页面*/
				$(this).addClass("light").siblings().removeClass("light");
				var light = _this.find('.g-connction-guide-nav .light');
				var line = _this.find('.g-connction-guide-nav .arrow-t');
			    line.css({
					left: light[0].offsetLeft
				});
				var index= $(this).index();
				$(".g-connction-guide-content > div").eq(index).show().siblings().hide();
				/*wifi连接  首先获取wifi连接记录*/
				if( index == 1){
					localStorage.driverOpen = true;
					_this.find(".wifi").removeClass("first");
					/*如果 wifi正在连接中,不需要调用wifi连接记录*/
					if(!wifiConting){
						app.dal.request({
			                action: apiNames.REQ_GET_WIFIHISTORY,
			                paras : {},
			                callback :function(res){
			                	if(res.info){
			                		console.log("wifi连接记录==========================",res);
			                		$wifi.hide();
									$wifidevice.show();
									var number = $wifidevice.find(".num");
									var timeArr = [];
									$.each(res.info,function(index,item){
										var phonetime = new Date(item.phoneConnectTime *1000);
										var year=phonetime.getFullYear(),     
								            month=phonetime.getMonth()+1,   
								        	date=phonetime.getDate();	 
								        var time = date+"/"+month+"/"+year;  
								        timeArr.push(time);	
									})
									
									$wifidevice.find(".num").html(res.info.length);
									
									var tpl = me.getTpl("tpl-wifi-phone-list"),
				            			wifiHost = $(_.template(tpl, {data: res.info,I18N: i18nDi,time:timeArr}));	
				            		$wifidevice.find(".device-list").html(wifiHost);
			                	}else{
			                		$wifi.hide();
									$wificon.show();
			                	}
			                }
			            });
					}
					
				}
			});
			/*调用c++wifi连接接口*/
			var wifiConnect = function(verifyCode,phoneUid,brand,model,connectnow){
				connection.wifiModel = 1;
				/*发送日志                                                                                                                  strat*/
				me.logObject.connectnow = connectnow ?connectnow :0;
				me.logObject.devicemacaddress = phoneUid ? phoneUid : "-";
				me.logObject.mbrand = brand;
				me.logObject.mmodel = model;
				me.win.notifyParentWindow({
	                action: 'logCon',
	                paras : {
	                	"connectnow":me.logObject.connectnow,
	                	"devicemacaddress":me.logObject.devicemacaddress
	                }
	            });
				/*发送日志                                                                                                                  end*/
				app.dal.request({
	                action: apiNames.REQ_CONNECTPHONE,
	                paras : {
	                	verifyCode:verifyCode,
	                	phoneUid:phoneUid,
	                	connType:1//wifi连接coonType是1
	                },
	                callback :function(res){
	                }
	            });
			
			};
			
			var wifiCon = function(){
				var code = $wifiCode.val();
				if(code.length == 4){
					wifiConnect(code,"","-","-");
				}else{
					$wifiCode.addClass("err-input")
				}
			}
			
			$wifiCode.blur(function(){
				if($(this).val().length == 4 ||
				   $(this).val().length == ""){
					$wifiCode.removeClass("err-input")
				}else{
					$wifiCode.addClass("err-input")
				}
			});
			/*点击connect按钮 wifi连接*/
			$("body").keydown(function() {
			 	if(event.keyCode==13){ 
	 				wifiCon();
	 			}
			});
			_this.find(".connect").click( function(){
				wifiCon();
			});
			/*点击以保存的wifi连接手机,直接传入uid，调用wifi接口连接*/
			_this.find(".device-list").delegate("li","click",function(){
				if( $(this).hasClass("other")){
					$wifi.hide();
					$wificon.show();
				}else{
				 	var uid = $(this).attr("phoneUid"),
				 		brand = $(this).attr("brand"),
				 		model = $(this).attr("model");
				 	wifiConnect("",uid,brand,model,3);
				}
            	
			});
			_this.find(".device-list").delegate("li","mouseover",function(){
				$(this).addClass("hover");
			});
			_this.find(".device-list").delegate("li","mouseout",function(){
				$(this).removeClass("hover");
			});
			/*页面中的点击事件                                                         页面切换*/
			var back = $wifipass.find(".back"),
				retry = $wififailed.find(".retry"),
				other = $wifidevice.find(".other"),
				retryShow = $wifinix.find(".retry"),
				backNix = $wifinix.find(".back"),
				helpPass = $wificon.find(".help"),
				recon = $wifiInstall.find(".retry"),
				reBack = $wifiInstall.find(".back");
			/*检测密码框是否为空*/
			var checkPass = function(){
				if($wifiCode.val() == ""){
					$wifipass.find(".code").focus();
					$wifiCode.removeClass("err-input")
				}
			}
			/*wifi 连接状态页面切换*/
			helpPass.add(retry).add(backNix).add(reBack).click( function(){
				$wifi.hide();
				$wifipass.show();
				checkPass();
			});
			$wifipass.find(".how").hover( function(){
				$wifipass.find(".yuan").show();
			},function(){
				$wifipass.find(".yuan").hide();
			});
			
			back.add(other).click( function(){
				$wifi.hide();
				$wificon.show();
			});
			retryShow.add(recon).click(function(){
				app.dal.request({
	                action: apiNames.REQ_GET_RETRWIFI,
	                paras : {},
	                callback :function(res){
	                }
	            });
			})
			retryShow.click(function(){
				me.logObject.connectnow = 2;
				me.win.notifyParentWindow({
	                action: 'logCon',
	                paras : {
	                	"connectnow":2,
	                	"devicemacaddress":"-"
	                }
	            });
			})
			recon.click(function(){
				me.logObject.connectnow = 1;
				me.win.notifyParentWindow({
	                action: 'logCon',
	                paras : {
	                	"connectnow":1,
	                	"devicemacaddress":"-"
	                }
	            });
			})
			
			/*usb 连接状态页面切换*/
			var guideTip = $(".g-connction-guide-tips");
			//通过参数  接收当前tip窗的文案
			var nowStatus = this.opts.win.opts.fly.nowStatus;
			var nowCode = this.opts.win.opts.fly.nowCode;
			var nowName = this.opts.win.opts.fly.nowName;
			var usbOrWifi = this.opts.win.opts.fly.usbOrWifi;
			if( nowStatus == connection.status.WM_DEVICE_MSG_WIFICONNECT){
				if( nowCode ==  connection.wifiCode.WIFI_CODE_CONNECTING ||
	        		nowCode ==  connection.wifiCode.WIFI_CODE_SCANING ||
	        		nowCode ==  connection.wifiCode.WIFI_CODE_SCANFINISHED ||
	        		nowCode ==  connection.wifiCode.WIFI_CODE_WAITTING ||
	        		nowCode ==  connection.wifiCode.WIFI_CODE_UPDATE ||
	        		nowCode ==  connection.wifiCode.WIFI_CODE_INSTALL ||
	        		nowCode ==  connection.wifiCode.WIFI_CODE_REFUSED){
	        		switchWifiStatus(nowCode,nowName);
	        	}else{
	        		switchStatus(nowStatus,nowCode);
	        	}
			}else{
				switchStatus(nowStatus,nowCode);
			}
			if(usbOrWifi){
				$(".g-connction-guide-nav ul li").last().trigger("click");
				//switchWifiStatus(nowCode,nowName);
			}
			//接收到消息  
			this.win.on("message", function(data) {
				var status = data.info.status;
				var wifiCode;
				//状态为2001 
				if( status == connection.status.WM_DEVICE_MSG_SCANING){
					$(".connct-imgs-moble").show();
	                $(".g-connction-guide-tips").show();
	                $(".connct-imgs").hide();
	                $(".g-connction-guide-usb-text").hide();
					guideTip.html(i18nDi.fillDomText('common.connectDeviceText'));
				}
				if( status == connection.status.WM_DEVICE_MSG_WIFICONNECT){
					wifiCode = data.info.wifiCode;
					switchWifiStatus(wifiCode);
				}else{
					/*下载驱动coede*/
	                var rate=data.info.downloadRate;
	                if(rate==undefined){
	                	rate=0;
	                }
	                switchStatus(status,rate);
				}
				
			});
			
			//wifi连接状态 
			function switchWifiStatus(code,nowName){
				clearTimeout(getTimer);
	            clearTimeout(getTimer2);
	            clearTimeout(getTimer3);
				/*切换到wifi连接界面*/
				$(".g-connction-guide-content > div").eq(1).show().siblings().hide();
				$(".g-connction-guide-nav ul li").eq(1).addClass("light").siblings().removeClass("light");
				var light = _this.find('.g-connction-guide-nav .light');
				var line = _this.find('.g-connction-guide-nav .arrow-t');
				$wifi.hide();
				$(".connct-imgs-moble").hide();
           		$(".g-connction-guide-tips").hide();
                $(".connct-imgs").show();
                $(".g-connction-guide-usb-text").show();
                $(".get-btn").hide();
				/*切换wifi连接状态*/
				switch(code){
					case connection.wifiCode.WIFI_CODE_CONNECTING://连接中
					case connection.wifiCode.WIFI_CODE_SCANING://扫描中
					case connection.wifiCode.WIFI_CODE_SCANFINISHED://扫描结束
						wifiConting = true;
						$connectNav.hide();
						$wificonting.find("p").html(i18nDi.fillDomText('driver.contingDevice'));
						$(".wifi-conncting").show();
						$wificonting.show();
						break;
					case connection.wifiCode.WIFI_CODE_WAITTING:
						wifiConting = true;
						$connectNav.hide();
						if( nowName){
							$wifiwarrnnt.find(".pc-name").html(nowName);
		           			$wifiwarrnnt.show();
						}else{
							app.dal.request({
					            action : "get_GetClientInfo",
					            paras : {},
					            callback : function(res) {
					                if (res&&res.info){
					                	$wifiwarrnnt.find(".pc-name").html(res.info.computerName);
		           						$wifiwarrnnt.show();
					                }
					            }
					        });
						}
						
						break;
					case connection.wifiCode.WIFI_CODE_REFUSED:// 用户手动拒绝wifi连接请求 
						wifiConting = true;
						$wifinix.show();
						$connectNav.show();
						me.logObject.connect = 2;
						me.logObject.connectcode = code;
						utils.sendWifiLog(me.logObject);
						break;
					case connection.wifiCode.WIFI_CODE_UPDATE:
						wifiConting = true;
						$connectNav.hide();
						$wificonting.find("p").html(i18nDi.fillDomText('driver.updatingHelp'));
						$wificonting.show();
						break;
					case connection.wifiCode.WIFI_CODE_INSTALL:
						wifiConting = true;
						$connectNav.hide();
						$wifiPleaInstall.show();
						break;
					case connection.wifiCode.WIFI_CODE_UPDATEFAILED:
						wifiConting = false;
						$connectNav.show();
						$updateFailed.show();
						me.logObject.connect = 2;
						me.logObject.connectcode = code;
						utils.sendWifiLog(me.logObject);
						break;
					case 114:
						wifiConting = false;
						$wifiInstall.show();
						$connectNav.show();
						break;
					case connection.wifiCode.WIFI_CODE_DISCONNECTING://
					case connection.wifiCode.WIFI_CODE_DISCONNECTED:
					case connection.wifiCode.WIFI_CODE_SCAN_NODEVICE:// 连接失败 
					case connection.wifiCode.WIFI_CODE_UDP_NODIP:// 连接失败 
					case connection.wifiCode.WIFI_CODE_MAC_NULL:// 连接失败 
					case connection.wifiCode.WIFI_CODE_TCP_CONNECT:// 连接失败 
					case connection.wifiCode.WIFI_CODE_NODEVICE:// 没有扫描到任何设备 
					case connection.wifiCode.WIFI_CODE_USERDISCONNECT:// 用户断开wifi连接
						wifiConting = false;
						$wififailed.show();
						$connectNav.show();
						me.logObject.connect = 2;
						me.logObject.connectcode = code;
						utils.sendWifiLog(me.logObject);
						break;
					default:
						$wificon.show();
						break;
				}
				line.css({
					left: light[0].offsetLeft
				});
			};
			function getReportInfo(){
				$(".get-btn").show();
				$(".get-btn").off("click").on("click",function(){
					app.dal.request({
			            action : "get_ReportUserInfo",
			            paras : {},
			            callback : function(res) {
			            }
			        });
				})
			}
			//usb连接状态 根据传过来的连接状态和下载进度  改变窗里面的内容
		
			function switchStatus(status,code){
				if(status != undefined && status != connection.status.WM_DEVICE_MSG_CONNECTSUCCEEDED){
					/*切换到usb连接界面*/
					if( status != connection.status.WM_DEVICE_MSG_NODEVICEPLUGIN){
						$(".g-connction-guide-content > div").eq(0).show().siblings().hide();
						$(".g-connction-guide-nav ul li").eq(0).addClass("light").siblings().removeClass("light");
						var light = _this.find('.g-connction-guide-nav .light');
						var line = _this.find('.g-connction-guide-nav .arrow-t');
					    line.css({
							left: light[0].offsetLeft
						});
						$wifi.hide();
					}
					$(".get-btn").hide();
					/*切换usb连接状态*/
					switch(status){
	                    //下载驱动
	                    case connection.status.WM_DEVICE_MSG_DOWNLOADDRIVER:
	                    	console.log("下载驱动===============================clear");
	                    	isTime = false;
	                    	 clearTimeout(getTimer);
	                    	 clearTimeout(getTimer2);
	                    	 clearTimeout(getTimer3);
	                         guideTip.html(i18nDi.fillDomText('common.downloadingDriver','( '+code+'% '+')' ));
	                         $connectNav.hide();
							break;
	                    //安装驱动
	                    case connection.status.WM_DEVICE_MSG_INSTALLDRIVER:
	                    	isTime = false;
	                    	 clearTimeout(getTimer);
	                    	 clearTimeout(getTimer2);
	                    	 getTimer3 = setTimeout( function(){
								getReportInfo();
								console.log("执行了===============================333333333")
							 },180000);
	                    	 guideTip.html(i18nDi.fillDomText('common.installingDriverText'));
	                    	 $connectNav.hide();
	                        break;
	                    //安装muserver
	                    case connection.status.WM_DEVICE_MSG_INSTALLMUSERVER:
	                    case connection.status.WM_DEVICE_MSG_INSTALLMUSERVEROK:
	                    	
	                    	isTime = false;
	                    	clearTimeout(getTimer);
	                    	 clearTimeout(getTimer3);
	                        guideTip.html(i18nDi.fillDomText('common.installingMG'));
	                        getTimer2 = setTimeout( function(){
								getReportInfo();
								console.log("执行了===============================222222222222")
							},180000);
	                        $connectNav.hide();
	                        break;
	                     //没有手机插入或者wifi连接中
	                     case connection.status.WM_DEVICE_MSG_WIFICONNECT:
	                     case connection.status.WM_DEVICE_MSG_NODEVICEPLUGIN:
	                     case connection.status.WM_DEVICE_MSG_DEVICEDISCONNECT:
	                     case connection.status.WM_DEVICE_MSG_NOTSTART:
	                     case connection.status.WM_DEVICE_MSG_DOWNLOADFAILED:
	                     case connection.status.WM_DEVICE_MSG_INSTALLMUSERVERFAILED:
	                     case connection.status.WM_DEVICE_MSG_USBDEBUGNOTOPEN:
	                     case connection.status.WM_DEVICE_MSG_DEVICEISOFFLINE:
	                     case connection.status.WM_DEVICE_MSG_PHONEDISCONNECT:
	                     case connection.status.WM_DEVICE_MSG_INSTALLFAILED:
	                     case connection.status.WM_DEVICE_MSG_CONNECTPHONEFAILED:
	                     case connection.status.WM_DEVICE_MSG_OFFLINEFAILED:
	                     isTime = false;
	                     	clearTimeout(getTimer);
	                    	clearTimeout(getTimer2);
	                    	clearTimeout(getTimer3);
	                        $(".connct-imgs-moble").hide();
		               		$(".g-connction-guide-tips").hide();
		                    $(".connct-imgs").show();
		                    $(".g-connction-guide-usb-text").show();
		                    $connectNav.show();
		                    break;
	                     //连接中
	                     default:
	                     	clearTimeout(getTimer2);
	                     	clearTimeout(getTimer3);
	                     	$(".connct-imgs-moble").show();
			                $(".g-connction-guide-tips").show();
			                $(".connct-imgs").hide();
			                $(".g-connction-guide-usb-text").hide();
							guideTip.html(i18nDi.fillDomText('common.connectDeviceText'));
							$connectNav.hide();
							getTimer = setTimeout( function(){
								if(isTime){
									getReportInfo();
								}
							},180000);
	                    	break;
	                }
				}
			}
		},
        render: function(target){
			var me = this;
            this.el.appendTo(target);
			this.showException(this.opts);
			this.win.on("message",function(data){
		       if(data.info.todo=="close"){
		       	   me.win.close();
		       }
		    });
		    
		    app.dal.request({
	            action : "get_GetClientInfo",
	            paras : {},
	            callback : function(res) {
	                if (res&&res.info){
	                	me.logObject.osmajorversion = res.info.majorVersion;
	                	me.logObject.osminorversion = res.info.minorVersion;
	                	var opis = "";
	                	for ( var i =0 ;i< res.info.ips.length;i++){
	                		if( i == res.info.ips.length - 1){
	                			opis += res.info.ips[i] 
	                		}else{
	                			opis += res.info.ips[i] + ",";
	                		}
	                	}
	                	me.logObject.osips = opis;
	                	utils.setlog_phonestatus(0);
	                	utils.setLogPublicFeild();
	                }
	            }
	        });
		    this.win.notifyParentWindow({
		    	ready:"true"
		    });
        }
    });
    
    return View;
});