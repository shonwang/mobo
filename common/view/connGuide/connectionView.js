define('UIConnectionView', function(require, exports, module){
    var app = require('app');
    var   $ = require('jquery');
	var   _ = require('underscore');
    var conn = require('connectionMgr');
	var globalConfig = require('globalConfig');
	var utils = require('utils');
	var i18nDi  = require('I18NDI');
	var apiNames = require('APINames');
	var language;
	var nextImg;
	var prevImg;
	var stepTip;
	var stepTipTwo;
	var video;
	var bigImgW;
	var smallImgW;
	var json;
	var prevBtn;
	var nextBtn;
	
	var PHONEVIDMAP = {
		"SAMSUNG":"04E8",
		"HTC":"0BB4",
		"LG":"1004",
		"Huawei":"12D1"
	}
	// model 根据手机vid判断出第几组图片 ； version 3个版本； num 切换一个版本，从第1张图片开始显示 
	//"../common/view/connGuide/debugConfig.json"
	function switchModelAndVersion(model,version, num){
		$(".g-usb-debug-refresh").hide();
		$(".g-usb-debug-loading").show();
		//$.getJSON(json,function(data){
		$.ajax({
			url:json,
			type:"get",
			dataType:"json",
			success:function(data){
				var imgNum = 0;
				stepTip = $(".g-usb-debug-version-content").find(".tip");
				stepTipTwo = $(".g-usb-debug-version-content").find(".tip-two");
				/*气泡*/
				var currentImg = data[model].version[version].image;
				var currentImgNum;
				var str = "";
				prevBtn = $(".previmg");
				nextBtn = $(".nextimg");
				var animating = false;
				var num_cur = num;
				var time = 500;
				$.each(currentImg,function(index,item){
					str += "<li class='list"+index+"'><img src='" + item.url + "' /></li>";
					imgNum = index;
				});	
				$(".g-usb-debug-version-content ul").html(str);
				stepTip.show();
				stepTip.addClass(currentImg[num].name);
				stepTip.html(currentImg[num].inner);
				stepTip.css({
					left:currentImg[num].left+"px",
					top:currentImg[num].top+"px"
				});
				nextBtn.show();
				prevBtn.hide();
				var loadNum = 0;
				$(".g-usb-debug-version-content ul img").each( function(){
					$( this ).load( function(){
						if( loadNum != imgNum){
							loadNum++;
						}else{
							$(".g-usb-debug-loading").hide();
						}
					});
				});
				var oneImg = $(".g-usb-debug-version-content ul li").eq(0).find("img");
				var twoImg = $(".g-usb-debug-version-content ul li").eq(1).find("img");
				oneImg.load( function(){
					oneImg.css({
						height:320,
						top:0,
						display:"block"
					});
					bigImgW = oneImg.width() / 2;
					oneImg.css("left",216-bigImgW)
				});
				twoImg.load( function(){
					twoImg.css({
						height:240,
						top:40,
						display:"block"
					});
					smallImgW = 433-twoImg.width();
					$(".g-usb-debug-version-content ul li img").not(":first").css("left",smallImgW);
					twoImg.css("left",smallImgW)
				});
			
				var lis= $(".g-usb-debug-version-content ul li");
					
				/*tip切换类名*/
				var tipClass = function(obj,name){
					if(obj.has("arrow-b")&&name=="arrow-t"){
						obj.removeClass("arrow-b").addClass(name);
					}else if(stepTip.has("arrow-t")&&name=="arrow-b"){
						obj.removeClass("arrow-t").addClass(name);
					}else{
						obj.addClass(name);
					}	
				}
				/*tip渲染*/
				var tipInfo = function(obj,inner,left,top){
					obj.html(inner);
					obj.css({
						left:left+"px",
						top:top+"px"
					});	
				}
				/*有两个tip窗和一个tip窗的情况*/
				var tipShow = function(){
					if(typeof(currentImgNum.inner) == "object"){
						tipClass(stepTip,currentImgNum.name[0]);
						tipInfo(stepTip,currentImgNum.inner[0],currentImgNum.left[0],currentImgNum.top[0]);
						stepTipTwo.fadeIn(100);
						tipClass(stepTipTwo,currentImgNum.name[1]);
						tipInfo(stepTipTwo,currentImgNum.inner[1],currentImgNum.left[1],currentImgNum.top[1]);
						
					}else{
						tipClass(stepTip,currentImg[num_cur].name);/*tip切换类名*/
						tipInfo(stepTip,currentImgNum.inner,currentImgNum.left,currentImgNum.top);
					}
				}
				
				/*向后一张切换*/
				var next_img = function(){
					 if (animating) {
						return;
					}
					prevBtn.show();
					num_cur++;
					currentImgNum = currentImg[num_cur];
					lis.last().show();
					if(typeof(currentImgNum.inner) !="object"){
						stepTipTwo.fadeOut(100);
					}
					lis.eq(num_cur).addClass("list0").siblings("li").removeClass("list0");
					animating=true;
					lis.eq(num_cur - 1).find("img").animate({ 
						height : 240, 
						top : 40, 
						left : 0}
					, "slow");
					lis.eq(num_cur).find("img").animate({ 
						height : 320, 
						top : 0, 
						left : 216 - bigImgW
						}, 
					"slow",function(){
						stepTip.fadeIn(100);
						tipShow();
						lis.eq(num_cur).find("img").css("cursor","default");
					});
					lis.eq(num_cur + 1).find("img").css("cursor","pointer");
					lis.eq(num_cur - 1).find("img").css("cursor","pointer");
					lis.eq(num_cur + 1).find("img").fadeIn();
					
					lis.eq(num_cur - 2).find("img").fadeOut();
					if (num_cur == imgNum) {
						 nextBtn.hide();
					}
					stepTip.hide();
					setTimeout(function() {
						animating = false;
					}, time + 100);
					
					/*发送日志                                                                                                                  strat*/
					var totalnum = imgNum + 1,//当前图片总张数
						targetvalue = num_cur + 1;//下一张
					var logObject = {
						class: "usbdebugging",
						page: "p20026",
						module: "m20041",
						action: "a20068",
						totalnum: totalnum,
                        targetvalue: targetvalue,
                        targettype:version

					} 
					utils.sendNewLog("1000120", logObject);
					/*发送日志                                                                                                                  end*/
					
				};
				/*向前一张切换*/
				var prev_img = function() {
					if (animating) {
						return;
					}
					nextBtn.show();
					num_cur--;
					currentImgNum = currentImg[num_cur];
					if(typeof(currentImgNum.inner) !="object"){
						stepTipTwo.fadeOut(100);
					}
					if (num_cur == 0) {
						prevBtn.hide();
						lis.last().hide();
					}
					lis.eq(num_cur).addClass("list0").siblings("li").removeClass("list0");
					animating = true;
					lis.eq(num_cur + 1).find("img").animate({ 
						height : 240, 
						top : 40, 
						left : smallImgW }
					, "slow");
					lis.eq(num_cur).find("img").animate({ 
						height : 320, 
						top : 0, 
						left : 216 - bigImgW}
					, "slow",function(){
						stepTip.fadeIn(100);
						tipShow();
						lis.eq(num_cur).find("img").css("cursor","default");
					});
					lis.eq(num_cur + 1).find("img").css("cursor","pointer");
					lis.eq(num_cur - 1).find("img").css("cursor","pointer");
					lis.eq(num_cur - 1).find("img").fadeIn();
					lis.eq(num_cur + 2).find("img").fadeOut();
					
					stepTip.hide();
					setTimeout(function() {
						animating = false;
					}, time + 100);
					/*发送日志                                                                                                                  strat*/
					var totalnum = imgNum + 1,//当前图片总张数
						targetvalue = num_cur+1;//上一张
					var logObject = {
						class: "usbdebugging",
						page: "p20026",
						module: "m20041",
						action: "a20069",
						totalnum: totalnum,
                        targetvalue: targetvalue,
                        targettype:version
					} 
					utils.sendNewLog("1000120", logObject);
					/*发送日志                                                                                                                  end*/
				};
				nextImg = function(event){
					next_img.call(nextBtn);
					event.stopPropagation();
					
				}
				prevImg = function(event){
					prev_img.call(prevBtn);
					event.stopPropagation();
					
				}
				
				switchImg = function( index ){
					if( index > num_cur){
						next_img();
					}
					if(index < num_cur){
						prev_img();
					}
				}
				/*绑定点击事件*/
				$(prevBtn).off('click').on('click',$.proxy(prevImg, this));	
				$(prevBtn).hover(
					 function () {
						$(this).addClass("light");
					 },
					 function () {
						$(this).removeClass("light");
					 }
				);
				
				$(nextBtn).off('click').on('click',$.proxy(nextImg, this));
				$(nextBtn).hover(
					 function () {
						$(this).addClass("light");
					 },
					 function () {
						$(this).removeClass("light");
					 }
				);
			},
		    error:function(data){
		    	if( !navigator.onLine){
		    		setTimeout( function(){
		    			$(".g-usb-debug-loading").hide();
			    		$(".g-usb-debug-refresh").show();
		    		},2000)
		    	}
		    },
		    complete:function(data,options){
		    	if(options == "error"){
		    		setTimeout( function(){
		    			$(".g-usb-debug-loading").hide();
			    		$(".g-usb-debug-refresh").show();
		    		},2000)
		    	}
		    }	
		});
	}
    function switchStatusPage(showObj,showLeft,hideObj,hideLeft){
		showObj.show();
		hideObj.animate({
			left:hideLeft,
			opacity:0
		},"fast",function(){
			showObj.siblings().hide();
		});
		showObj.animate({
			left:showLeft,
			opacity:1
		},"slow");
	}
    var View = app.ViewBase.extend({
        module: module,
		init: function(opts){
		    this.opts = opts;
		    this.el = $(_.template(this.getTpl('tpl-connection-view'), {I18N: i18nDi}));
		    
		    language = i18nDi.getLanguage();
		    json = globalConfig.domain.publicMobogenie + "debug/"+language +"/debugConfig.json?"+Math.random();
		    utils.setLogPublicFeild();
		    utils.setlog_phonestatus(0);
		},
		events:{
            'click -> .retry-btn': 'reDownLoadDriver',//网络连接失败，重新下载驱动
            'click -> .show-again-btn': 'ReAuthorize',//拉起手机授权框
            'click -> .hava-space-btn': 'reInstallMuserver',//有足够内存，重新安装Muserver
            'click -> .goto-setting': 'gotoSetting',/*adb offline状态页面切换*/
            'click -> .back-allow-debug': 'backAllowDebug',/*adb offline状态页面切换*/
            'click -> .link.feedback': 'feedback',//反馈链接
            'click -> .wifiCon': 'wifiConnect',//使用wifi连接
            'click -> .havaOpen': 'usbOpenConnect'//点击“已经打开usb”按钮
		},
		
        showException: function(opts){
            var status = opts.status;
            var adbCode = opts.adbCode;
            var statusDic = conn.status;
            var adbCodeMap = conn.adbCodeMap;
            this.el.find('.driver-module').each(function(){
                this.style.display = 'none';
            });
            
            //status = statusDic.WM_DEVICE_MSG_OFFLINEFAILED;
            switch(status){
                //下载驱动失败
                case statusDic.WM_DEVICE_MSG_DOWNLOADFAILED:
                    this.el.find('.g-driver-bad-network').show();
                    break;
                //安装MuServer失败
                case statusDic.WM_DEVICE_MSG_INSTALLMUSERVERFAILED:
                    //安装muserver失败一定会走这里
                    //如果是内存不足(根据adbCode来判断)
                    if(adbCode == adbCodeMap.ADB_FAILED_NO_SPACE_LEFT ||
                        adbCode == adbCodeMap.ADB_FAILED_NO_SPACE_LEFT_ON_PHONE ||
                        adbCode == adbCodeMap.ADB_FAILED_NO_SPACE_LEFT_ON_SDCARD ||
                        adbCode == adbCodeMap.ADB_SDCARD_NOT_ENOUGH){
                        this.el.find('.g-driver-no-space').show();
                    }else{
                        this.el.find('.g-driver-conncet-failed').show();
                        app.dal.request({
			                action: "get_ReportUserInfo",
			                paras : {},
			                callback :function(res){
			                }
			            });
                    }
                    break;
				//USB未打开
                case statusDic.WM_DEVICE_MSG_USBDEBUGNOTOPEN: 
            		this.el.find('.g-driver-usb-debug').show();
            		
            		/*发送日志                                                                                                                  strat*/
					var logObject = {
						class: "usbdebugging",
						page: "p20026",
						module: "m20033",
						action: "a20063"
					} 
					utils.sendNewLog("1000120", logObject);
					/*发送日志                                                                                                                  end*/
					/*发送日志                                                                                                                  strat*/
        			var logObject2 = {
						class: "usbdebugging",
						page: "p20026",
						module: "m20018",
						action: "a20064"
					} 
					utils.sendNewLog("1000120", logObject2);
					/*发送日志                                                                                                                  end*/
           		      //下面会根据判断手机vid，读取不同的图片   
                    var phoneVid;
                    var num;//num = 0 取Android的图片 ；num = 1 取Samsung的图片
                    video = $("#video-inner");
                    app.dal.request({
		                action: apiNames.REQ_GETCLIENT_INFO,
		                paras : {},
		                callback :function(res){
		                	phoneVid = res.info.vid;
		                	if( phoneVid == PHONEVIDMAP.SAMSUNG ){
		                		num = 1;//三星手机
		                	}else if(phoneVid == PHONEVIDMAP.HTC){
		                		num = 2;//HTC手机
		                	}else if(phoneVid == PHONEVIDMAP.LG){
		                		num = 3;//LG手机
		                	}else if(phoneVid == PHONEVIDMAP.Huawei){
		                		num = 4;//华为手机
		                	}else{
		                		num = 0;//其他型号手机
		                	}
		                	/*切换图片教程*/
		                	var version = 1;
		                	switchModelAndVersion(num, version, 0);
		                	$(".g-usb-debug-version-image .g-usb-debug-version-list li").on("click",function(){
	                				version = $(this).index();
	                				$(this).addClass("hover").siblings().removeClass("hover");
		                			switchModelAndVersion(num,version,0);
									prevBtn.hide();
									nextBtn.off('click',$.proxy(nextImg, this));
									prevBtn.off('click',$.proxy(prevImg, this));
									stepTip.hide();
									stepTipTwo.hide();
									if(stepTip.hasClass("arrow-t")){
										stepTip.removeClass("arrow-t");
									}else if(stepTip.hasClass("arrow-b")){
										stepTip.removeClass("arrow-b");
									}
								/*发送日志                                                                                                                  strat*/
								var logObject = {
									class: "usbdebugging",
									page: "p20026",
									module: "m20041",
									action: "a20070",
			                        targettype:version
								} 
								utils.sendNewLog("1000120", logObject);
								/*发送日志                                                                                                                  end*/
							});
							$(".g-usb-debug-version-content").delegate("ul li img","click",function(){
		                		var liIndex = $(this).parent("li").index();
		                		switchImg(liIndex);
		                	});
                			$(".g-usb-debug-refresh").click( function(){
                				switchModelAndVersion(num, version, 0);
                			});	
		                	/*切换图片、视频、set*/
                			$(".g-usb-debug-foot-text ul li").on("click",function(){
		                		var index = $(this).index();
		                		$(this).addClass("light").siblings().removeClass("light");
		                		//图片教程
		                		if( index == 0){
		                			$('.g-driver-usb-debug h1 p').html( i18nDi.fillDomText('driver.usbDebugTitle'));
		                			stepTip.hide();
									stepTipTwo.hide();
									if(stepTip.hasClass("arrow-t")){
										stepTip.removeClass("arrow-t");
									}else if(stepTip.hasClass("arrow-b")){
										stepTip.removeClass("arrow-b");
									}
		                			switchModelAndVersion(num, version, 0);
		                			/*发送日志                                                                                                                  strat*/
		                			var logObject = {
										class: "usbdebugging",
										page: "p20026",
										module: "m20018",
										action: "a20064"
									} 
									utils.sendNewLog("1000120", logObject);
									/*发送日志                                                                                                                  end*/
		                		//视频教程
		                		}else if(index == 1){
		                			$('.g-driver-usb-debug h1 p').html( i18nDi.fillDomText('driver.usbDebugTitle'));
									video.attr("src","https://www.youtube.com/embed/roZuGlE-tiY?autoplay=1");
									loadVideo();
									$(".g-usb-debug-video-refresh").click(function(){
										loadVideo();
									});	
									/*发送日志                                                                                                                  strat*/
									var logObject = {
										class: "usbdebugging",
										page: "p20026",
										module: "m20018",
										action: "a20065"
									} 
									utils.sendNewLog("1000120", logObject);
									/*发送日志                                                                                                                  end*/
								//扫描二维码	
		                		}else if( index == 2 ){
		                			$('.g-driver-usb-debug h1 p').html( i18nDi.fillDomText('driver.debugTipText',i18nDi.fillDomText('driver.debugSetterContentText')));
		                			/*发送日志                                                                                                                  strat*/
		                			var logObject = {
										class: "usbdebugging",
										page: "p20026",
										module: "m20018",
										action: "a20066"
									} 
									utils.sendNewLog("1000120", logObject);
									/*发送日志                                                                                                                  end*/
		                		//客服页面	
		                		}else if( index == 3 ){
		                			$('.g-driver-usb-debug h1 p').html( i18nDi.fillDomText('driver.usbDebugServiceText'));
		                			loadService();
		                			$(".g-driver-service-refresh").click( function(){
		                				loadService();
		                			});
		                			/*发送日志                                                                                                                  strat*/
		                			var logObject = {
										class: "usbdebugging",
										page: "p20026",
										module: "m20018",
										action: "a20067"
									} 
									utils.sendNewLog("1000120", logObject);
									/*发送日志                                                                                                                  end*/
		                		}
		                		$(".g-usb-debug-guide-body > div").eq(index).show().siblings().hide();
		                	});
		                	/*客服信息*/
		                	function loadService(){
		                		//"../common/view/connGuide/debugService.json"
	                			var serStr = "",
	                				numStr = "";
	                			var serLoad =$(".g-driver-service-loading"),
	                				serRefresh =$(".g-driver-service-refresh"),
	                				serInfo =$(".g-driver-service ul");
	                			serRefresh.hide();
                				serLoad.show();	
	                			var debugService = 'http://public.mobogenie.com/debug/service/debugService.json?'+Math.random();
                				$.ajax({
                					url:debugService,
                					type:"get",
                					dataType:"json",
                					success:function(data){
								    	for(var i = 0; i < data.length; i++){
										/*如果当前国家有多个电话号码*/
											if( typeof(data[i].number) == "object" ){
												for( var j = 0;j<data[i].number.length; j++){
													numStr += "<span class='ser_num'>"+data[i].number[j]+"</span>"
												}
												serStr += "<li><p><i><img src="+data[i].img+" /></i>"+data[i].country+"</p>"+numStr+"</li>";
												
											}else{
												serStr += "<li><p><i><img src="+data[i].img+" /></i>"+data[i].country+"</p><span class='ser_num'>"+data[i].number+"</span></li>";
											}
										}
										serInfo.html(serStr);
										serLoad.hide();
										serInfo.show();
								    },
								    error:function(data){
								    	if( !navigator.onLine || serInfo.html().trim() == ""){
								    		setTimeout( function(){
								    			serLoad.hide();
												serInfo.hide();
												serRefresh.show();
								    		},2000);
								    	}
								    }	
                				});
		                	}
		                	/*视频教程切换*/
							function loadVideo(){
								/*如果网络正常再去加载视频*/
								var videoLoad = $(".g-usb-debug-video-loading"),
									videoRefresh = $(".g-usb-debug-video-refresh");
								videoLoad.show();
								videoRefresh.hide()
								$.ajax({
									url:"https://www.googleapis.com/youtube/v3/search?type=video&pageToken=&part=snippet&maxResults=20&q=m&key=AIzaSyA-_TckHgaJ6n7XtHuMBFD6wAMLfkfJeXQ",
							    	type:"get",
								    success:function(data){
								    	videoLoad.hide();
								    },
								    error:function(data){
								    	setTimeout( function(){
								    		videoLoad.hide();
								    		videoRefresh.show();
								    	},2000);
								    }	 
								});
								/*切换视频版本*/
								$(".g-usb-debug-version-video .g-usb-debug-version-list li").off("click").on("click",function(){
									var ver = $(this).attr("ver");
									var videoVer = $(this).index();
									$(this).addClass("hover").siblings().removeClass("hover");
									if( ver == "low" ){
										$(".g-usb-debug-video-loading").show();
										video.attr("src","https://www.youtube.com/embed/lyciK_nAVYk?autoplay=1");
										loadVideo(); 
									}else if( ver == "high" ){ 
										$(".g-usb-debug-video-loading").show();
										video.attr("src","https://www.youtube.com/embed/roZuGlE-tiY?autoplay=1"); 
										loadVideo(); 
									}else if( ver == "higher" ){
										$(".g-usb-debug-video-loading").show();
										video.attr("src","https://www.youtube.com/embed/01716D5IsTM?autoplay=1"); 
										loadVideo(); 
									}
									/*发送日志                                                                                                                  strat*/
									var logObject = {
										class: "usbdebugging",
										page: "p20026",
										module: "m20042",
										action: "a20070",
				                        targettype:videoVer
									} 
									utils.sendNewLog("1000120", logObject);
									/*发送日志                                                                                                                  end*/
								});
							}
                			/*监听切换语言*/
						    app.eventCenter.on("switchLanguage",function(data){
						    	language = i18nDi.getLanguage();
						    	json = globalConfig.domain.publicMobogenie + "debug/"+language +"/debugConfig.json?"+Math.random();
						    	var verNum = $(".g-usb-debug-version-image .g-usb-debug-version-list li.hover").index();
						 		switchModelAndVersion(num, verNum, 0);
						 		if(stepTip.hasClass("arrow-t")){
									stepTip.removeClass("arrow-t");
								}else if(stepTip.hasClass("arrow-b")){
									stepTip.removeClass("arrow-b");
								}
				            });
		                }
		            });
                    
                    break;
				//device处于offline状态
                case statusDic.WM_DEVICE_MSG_DEVICEISOFFLINE:
                case statusDic.WM_DEVICE_MSG_OFFLINEFAILED:
                    this.el.find('.g-driver-allow-debug').show();
                   	this.el.find('.g-driver-allow-debug').addClass(language);
            		var me = this;
            		app.eventCenter.on("switchLanguage",function(data){
            			language = i18nDi.getLanguage();
				    	me.el.find('.g-driver-allow-debug').attr("class","driver-module g-driver-allow-debug " + language);
		            })
                   break;
				//设备断开连接
                case statusDic.WM_DEVICE_MSG_PHONEDISCONNECT:
                   this.el.find('.g-driver-conncet-failed').show();
                   app.dal.request({
		                action: "get_ReportUserInfo",
		                paras : {},
		                callback :function(res){
		                }
		            });
                   break;
				//安装驱动失败
                case statusDic.WM_DEVICE_MSG_INSTALLFAILED: 
                    this.el.find('.g-driver-conncet-failed').show();
                    app.dal.request({
		                action: "get_ReportUserInfo",
		                paras : {},
		                callback :function(res){
		                }
		            });
                    break;
				//连接失败
                case statusDic.WM_DEVICE_MSG_CONNECTPHONEFAILED:
                   this.el.find('.g-driver-conncet-failed').show();
                   app.dal.request({
		                action: "get_ReportUserInfo",
		                paras : {},
		                callback :function(res){
		                }
		            });
                   break;
            }
        },
        reDownLoadDriver : function(){
        	if( navigator.onLine ){
        		app.dal.request({
	                action: apiNames.REQ_REDOWNLOAD_DRIVER,
	                paras : {},
	                callback :function(res){
	                }
	            });
        	}else{
        		conn.reConnect();
        	}
            curWindow.close();
        },
        usbOpenConnect : function(){
        	conn.reConnect();
        },
        ReAuthorize : function(){
        	app.dal.request({
	            action: apiNames.REQ_REAUTHORIZE,
	            paras : {},
	            callback :function(res){
	            }
	        });
        },
        reInstallMuserver : function(){
        	app.dal.request({
                action: apiNames.REQ_REINSTALL_MUSERVER,
                paras : {},
                callback :function(res){
                }
            });
            curWindow.close();
        },
        gotoSetting : function(){
        	switchStatusPage($(".g-driver-debug-setting"),0,$(".g-driver-allow-debug"),-640);
        },
        backAllowDebug : function(){
        	switchStatusPage($(".g-driver-allow-debug"),0,$(".g-driver-debug-setting"),640);
        },
        feedback : function(){
        	utils.browser('http://www.mobogenie.com/feedback.html');
        },
        wifiConnect :function(){
        	curWindow.notifyParentWindow({
                action: 'wifiConnet'
            });
        },
        render: function(target){
            this.el.appendTo(target);
			//this.showException(this.opts);
        }
    });
    
    return View;
});