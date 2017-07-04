define('UIFeedback', function(require, exports, module){
	var app = require('app');
	var i18nDi  = require('I18NDI');
	var   $ = require('jquery');
		require('jquery.form');
	var   _ = require('underscore');
	var utils = require('utils');
	var globalConfig = require('globalConfig');
	var UIMenu = require('UIMenu');
	var apiNames = require('APINames');
	var NoNet=require('NoNet');
	
	
	var View = app.ViewBase.extend({
        module: module,
		init: function(opts){
		    this.opts = opts;
		    var pageId = opts.pageId;
		    this.el = $(_.template(this.getTpl('tpl-feedback-view'), {I18N: i18nDi}));
		    this.el.appendTo($('#' + pageId));
		    this.render(opts);
		    this.fbing = false;
		    /*记录页面时间*/
		   	fbTime = new Date().valueOf();
		    /*定义三个页面*/
			fbMoudle = $(".fb-moudle");
			fbQuestionMoudle = $(".fb-question-moudle");
	    	fbUsbMoudle = $(".feedback-usb-moudle");
	    	fbSuccessMoudle = $(".feedback-success-moudle");
	    	fbNetMoudle = $("#fb-net");
	    	/*监听页面变化*/
		    app.eventCenter.on("switchpageend", this.onSwitchPageEnd.bind(this));
		    utils.placeholder(this.el.find(".info"),i18nDi.fillDomText('setting.fbTextarea'));
		    /*记录反馈之前用户在哪个页面*/
		  	boforeHash = app.getCurHashParas(),
	    	beforeModule = boforeHash.pageState.curModule,
	    	beforeAction = boforeHash.pageState.curAction;
		},
		
		onSwitchPageEnd: function(){
		    var curHash = app.getCurHashParas();
		    if(curHash.action == "feedback"){
	    		 if(curHash.pageState.vt == "question"){
			    	fbMoudle.show();
			    	fbUsbMoudle.hide();
			      }else if(curHash.pageState.vt == "usb"){
			    	fbMoudle.hide();
			    	fbUsbMoudle.show();
			    }
		    }
		},
		showException:function(opts){
			var me = this;
			var fbType = this.el.find('.fb-type'),
				fbUsb = this.el.find('.fb-usb'),
				fbVer = this.el.find('.fb-ver'),
				fbAcc = this.el.find('.fb-acc'),
				fbModel = this.el.find('.fb-model'),
				fbEmail = this.el.find('.fb-mail'),
				fbFile = this.el.find('.fb-submit');
				
			var typeWarng = fbType.find(".ico-warng-small");
			var usbWarng = fbUsb.find(".ico-warng-small");
			var modelPass = fbModel.find(".hint"),
				modelWarng = fbModel.find(".ico-warng-small");
			var emailPass = fbEmail.find(".hint"),
				emailWarng = fbEmail.find(".ico-warng-small");
            var verPass = fbVer.find(".hint"),
				verWarng = fbVer.find(".ico-warng-small");
			var fileWarng = fbFile.find(".ico-warng-small"),
				fileNo = fbFile.find(".nof"),
				fileSuccsee = fbFile.find(".file-success"),
				fileFailed = fbFile.find(".file-failed"),
				fileName = fbFile.find(".file-name");
			
			var typeInner,usbInner,verInner,userModel,email;//此行变量都是用户必填写的内容
			var isgory,isusb,ismodel,isemail,isver,isFile,isPhone,isClickUsb,isClickVer;//此行变量是必填项是否通过
			var usbOpen,android_sys,cindex;
			var isusb = false;
			var isAll = false;
			var	isFile = true;//附件 初始化为true 如果用户点击了添加附件在做处理
			var accID,message;//社交帐号信息和info
			var acc="Facebook";
					
			var me = this;
			/*反馈类型下拉菜单*/
			this.menu = new UIMenu({
                    list: [
                    	{
                            index: 0,
                            label: i18nDi.fillDomText('setting.unableCon')
                        },
                        {
                            index: 8,
                            label: i18nDi.fillDomText('setting.unableWifiCon')
                        },
                        {
                            index: 9,
                            label: i18nDi.fillDomText('tools.pcCleanerLabel')
                        },
                   		{
                            index: 1,
                            label: i18nDi.fillDomText('setting.proInstall')
                        },
                        {
                            index: 2,
                            label: i18nDi.fillDomText('setting.contactsText')
                        },
                        {
                            index: 3,
                            label: i18nDi.fillDomText('setting.slowPer')
                        },
                        {
                            index: 4,
                            label: i18nDi.fillDomText('setting.unableRoot')
                        },
                        {
							index: 5,
                            label: i18nDi.fillDomText('setting.stillWhen')
                        },
                        {
                            index: 6,
                            label: i18nDi.fillDomText('setting.suggesNew')
                        },
                        {
							index: 7,
                            label: i18nDi.fillDomText('setting.fbType9')
                        }
                    ]
            });   
                
            this.menu.decorate(fbType.find('.g-select'));
            this.menu.addClass("fb-menu");
            
            function modelLeft(){
            	fbModel.show();
        		fbVer.show();
    			fbModel.attr("class","fb-model animation").addClass("fadeInLeftBig");
        		fbVer.attr("class","fb-ver animation").addClass("fadeInLeftBig");
        		isPhone = false;
            }
            function modelRight(){
            	fbModel.attr("class","fb-model animation2").addClass("fadeOutRightBig");
    			fbVer.attr("class","fb-ver animation2").addClass("fadeOutRightBig");
    			isPhone = true;
    			setTimeout( function(){
        			fbModel.hide();
        			fbVer.hide();
        		},600);
            }
            this.menu.on(UIMenu.SELECT, function(data, e){
            	cindex = data.index;
            	var mType = fbType.find(".m-type");
            	var typeID ;
            	switch(data.index){
            		case 0:
            			mType.html(i18nDi.fillDomText('setting.unableCon'));
            			typeID = 'setting.unableCon';
            		break;
            		case 1:
            			mType.html(i18nDi.fillDomText('setting.proInstall'));
            			typeID = 'setting.proInstall';
            		break;
            		case 2:
            			mType.html(i18nDi.fillDomText('setting.contactsText'));
            			typeID = 'setting.contactsText';
            		break;
            		case 3:
            			mType.html(i18nDi.fillDomText('setting.slowPer'));
            			typeID = 'setting.slowPer';
            		break;
            		case 4:
            			mType.html(i18nDi.fillDomText('setting.unableRoot'));
            			typeID = 'setting.unableRoot';
            		break;
            		case 5:
            			mType.html(i18nDi.fillDomText('setting.stillWhen'));
            			typeID = 'setting.stillWhen';
            		break;
            		case 6:
            			mType.html(i18nDi.fillDomText('setting.suggesNew'));
            			typeID = 'setting.suggesNew';
            		break;
            		case 7:
            			mType.html(i18nDi.fillDomText('setting.fbType9'));
            			typeID = 'setting.fbType9';
            		break;
            		case 8:
            			mType.html(i18nDi.fillDomText('setting.unableWifiCon'));
            			typeID = 'setting.unableWifiCon';
            		break;
            		case 9:
            			mType.html(i18nDi.fillDomText('tools.pcCleanerLabel'));
            			typeID = 'tools.pcCleanerLabel';
            		break;
            	}
            	isgory = true;
            	typeWarng.hide();
            	
            	function filterInner (str){
		            str = String(str || "").replace(/<style[^>]*>([\S\s]*?)<\/style>|<script[^>]*?>[\s\S]*?<\/script>/img, '');
		            return String(str || "").replace(/<[^>]+>/g, '');
		        }
		        me.el.find(".fbk_id").val(data.index+1);
		        
            	//me.el.find(".fbk_sub").val(filterInner(data.label));
            	me.el.find(".fbk_sub").val(filterInner(i18nDi.fillDomText(typeID)));
            	app.eventCenter.on("switchLanguage",function(data){
            		me.el.find(".fbk_sub").val(filterInner(i18nDi.fillDomText(typeID)));
            	});
            	if(data.index == 0){
            		if(!fbUsb.is(":visible")){
            			fbUsb.show();
            			fbUsb.attr("class","fb-usb animation").addClass("fadeInLeftBig");
            			
            		}
            		if(!fbModel.is(":visible")){
            			modelLeft();
            		}
            	}else{
            		fbUsb.attr("class","fb-usb animation2").addClass("fadeOutRightBig");
            		setTimeout( function(){
	        			fbUsb.hide();
	        		},600);
            	}
            	if(data.index == 5){
            		if(fbModel.is(":visible")){
            			modelRight();
            		}
            		isAll = true;
            	}else{
            		if(!fbModel.is(":visible")){
            			modelLeft();
            		}
            		isAll = false;
            	}
            	setTimeout( function(){
        			fbUsb.attr("class","fb-usb animation");
        			fbModel.attr("class","fb-model animation");
        			fbVer.attr("class","fb-ver animation");
        		},600);
            	
            });
            /*选择是否打开usb 下拉菜单*/
            this.usbMenu = new UIMenu({
                list: [
                	{
                        index: 1,
                        label: i18nDi.fillDomText('setting.usbOn')
                    },
               		{
                        index: 2,
                        label: i18nDi.fillDomText('setting.usbOff')
                    }
                ]
            }); 
			this.usbMenu.decorate(fbUsb.find('.g-select'));
			this.usbMenu.addClass("fb-menu");
			this.usbMenu.on(UIMenu.SELECT, function(data, e){
				switch(data.index){
            		case 1:
            			fbUsb.find(".m-usb").html(i18nDi.fillDomText('setting.usbOn'));
            		break;
            		case 2:
            			fbUsb.find(".m-usb").html(i18nDi.fillDomText('setting.usbOff'));
            		break;
            	}
				
            	isClickUsb = true;
            	usbWarng.hide();
            	if(data.index == 1){
            		usbOpen = 2;
            		me.el.find(".usb").val(2);
            	}else{
            		usbOpen = 1;
            		me.el.find(".usb").val(1);//1代表没打开
            	}
            });
			/*选择安卓版本 下拉菜单*/
			this.verMenu = new UIMenu({
                    list: [
                    	{
                            index: 3,
                            label: '4.2-4.4'
                        },
                   		{
                            index: 2,
                            label: '4.0-4.1'
                        },
                   		{
                            index: 1,
                            label: '1.6-3.2'
                        }
                    ]
            }); 
            
			this.verMenu.decorate(fbVer.find('.g-select'));
			this.verMenu.addClass("fb-menu");
			this.verMenu.on(UIMenu.SELECT, function(data, e){
				fbVer.find(".m-ver").html(data.label);
				isClickVer = true;
				verWarng.hide();
            	verPass.css("display","block");
            	android_sys = data.index;
            	me.el.find(".android_sys").val(data.index);
            });
			/*选择社交账号下拉菜单*/
			this.accMenu = new UIMenu({
                    list: [
                    	{
                            index: 0,
                            label: 'Facebook'
                        },
                   		{
                            index: 1,
                            label: 'Whatsapp'
                        },
                        {
                            index: 2,
                            label: 'Line'
                        },
                   		{
                            index: 3,
                            label: 'Kakaotalk'
                        },
                   		{
                            index: 4,
                            label: 'Skype'
                        },
                   		{
                            index: 5,
                            label: 'Twitter'
                        }
                    ]
            }); 
			this.accMenu.decorate(this.el.find('.fb-acc .g-select'));
			this.accMenu.addClass("fb-menu");
			this.accMenu.on(UIMenu.SELECT, function(data, e){
				fbAcc.find(".m-acc").html(data.label);
				acc = data.label;
            });
			
			
			/*用户手动输入型号和model*/
			function modelBlur(){
				userModel = me.el.find('.userModel').val();
				
				if( userModel != ""){
					modelWarng.hide();
					modelPass.css("display","block");
					ismodel = true;
					me.el.find('.fb-userModel').val(userModel);
				}else{
					ismodel = false;
				}
			};
			function emailBlur(){
				var email = me.el.find(".email").val();
				var proemail= /^([a-zA-Z0-9]+[_|\_|\.\-]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.|\-]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
				if(email != "" && proemail.test(email)){
					emailWarng.hide();
					emailPass.css("display","block");
				    isemail = true;
				    me.el.find(".mail").val(email);
				}else{
					if(email == ""){
						emailWarng.hide();
						emailPass.show();
						emailWarng.html(i18nDi.fillDomText('setting.enterEmail'));
					}
					if (email != "" && !proemail.test(email)){   
						emailWarng.html(i18nDi.fillDomText('setting.fbEmailFormatFailed'));
						emailPass.hide();
						emailWarng.css("display","block");
					}
					isemail = false;
				}
			};
			this.el.find('.userModel').blur( function(){
				modelBlur();
			});
			
			this.el.find(".email").blur( function(){
				emailBlur();
			});
			
			function switchState(vt){
				var curHash = app.getCurHashParas();
				if(curHash.action == "feedback"){
					curHash.pageState = curHash.pageState || {};
				    curHash.pageState.vt = vt;
				    app.navigate(curHash);
				}
			};
			/*跳转到usb页面*/
			this.el.find(".usb-hint").click( function(){
			    switchState("usb");
			});
			this.el.find(".return").click( function(){
			    switchState("question");
			});
			/*添加附件*/
			
			this.el.find(".add-files").off('click').on('click',function(){
					
				var fileVal = "";
				var sizeNum = 0;
				if(me.el.find(".file").val() != ""){
					imgChange();
				}
				me.el.find(".file").click();
				
				me.el.find(".file").off('change').on('change', function(){
					imgChange();
				});
				function imgChange(){
					var path = me.el.find(".file").val(),
				  		pathIndex = path.lastIndexOf("\\");
				  	var imgName = path.substring(pathIndex+1);
				  	
				  	if( path == ""){
				  		isFile = true;
				  		return;
				  	}else{
				  		isFile = false;
				  	}
	                var fileN = path.split("\\");
	                var fileN = fileN[fileN.length - 1];
	                var ext = fileN.split(".")[fileN.split(".").length - 1].toLowerCase();
	                
	                if (ext !== "jpg" && ext !== "jfif" && ext !== "jpeg" && ext !== "pjpeg" && 
	                    ext !== "pjp" && ext !== "png" && ext !== "gif"){
	                    isFile = false;
						fileSuccsee.hide();
						fileNo.show();
						fileFailed.show();
	                    fileWarng.html(i18nDi.fillDomText('setting.errorFile'));
	                    
	                    isFile = false;
	                }else{
	                	var size = me.el.find(".file")[0].files[0].size;
					  	if( size >　(3*1024*1024)){
					  		isFile = false;
							fileSuccsee.hide();
							fileFailed.show();
							fileNo.show();
							fileWarng.html(i18nDi.fillDomText('setting.onlySupports'));
						}else{
							isFile = true;
							fileSuccsee.show();
							fileName.html(imgName);
							fileNo.hide();
							fileFailed.hide();
						}
	                }
				};
			});
			this.el.find(".delete").off('click').on('click',function(){
				isFile = true;
				fileNo.show();
				fileSuccsee.hide();
				fileFailed.hide();
			});
			/*提交*/
			this.el.find('.submit').off('click').on('click',function(){
				submit();
			});
			function verifySubmit(){
				/*验证用户输入的手机型号和邮箱*/
				
				accID = me.el.find(".accid").val();
				message = me.el.find(".info").val();
				
				me.el.find(".s_type").val(acc);	
				me.el.find(".s_id").val(accID);
				
				me.el.find(".message").val(message);
					
				if(!isgory){
					typeWarng.css("display","block");
				}
				if(fbUsb.is(":visible")  ){
					isusbShow = true;
				}else{
					isusbShow = false;
				}
				if( !isusbShow || isClickUsb){
					isusb = true;
				}else{
					isusb = false;
				}
				if(!isusb){
					usbWarng.css("display","block");
				}
				if( isPhone  || isClickVer){
					isver = true;
				}else{
					isver = false;
				}
				if( isPhone ){
					ismodel = true;
				}else{
					ismodel = false;
					modelBlur();
				}
				if(!isver){
					verPass.hide();
					verWarng.css("display","block");
				}
				if(!ismodel){
					modelPass.hide();
					modelWarng.css("display","block");
				}
				if(!isemail){
					emailPass.hide();
					emailWarng.css("display","block");
				}
				console.log("验证啊--------------------------------------",isgory,isusb,isver,ismodel,isemail)
				/*填写信息全部成功 提交表单*/
				if(isgory && isusb && isver && ismodel &&  isemail){
					if( cindex == 5 ){
						me.el.find(".usb").val("");
						me.el.find(".fb-userModel").val("");
						me.el.find(".android_sys").val("");
					}else{
						me.el.find(".usb").val(usbOpen);
						me.el.find(".fb-userModel").val(userModel);
						me.el.find(".android_sys").val(android_sys);
						if(cindex == 0){
							me.el.find(".usb").val(usbOpen)
						}else{
							me.el.find(".usb").val("")
						}
					}
					var myDate,id;
					ajaxForm();
					function ajaxForm(){
						$.ajax({
						 	url:"http://public.mobogenie.com/debug/traditionalchinese/debugConfig.json?"+Math.random(),
						    type:"get",
							dataType:"json",
							success:function(data){
						    	submitSuccess();
						    },
						    complete:function(data,options){
						    	if(options == "error"){
						    		if(NoNet){
										var nonet = new NoNet({
					                        pageId:"fb-net"
					                    });
						    			fbMoudle.hide();
						    			fbNetMoudle.show();
					                    nonet.on('retry',ajaxForm);
					                }
						    	}
						    }	
						});
					}
					function submitSuccess(){
						/*创建唯一id*/
						myDate = new Date(),
						id = myDate.getTime();
						me.el.find(".feedbackID").val(id);
						
						/*切换到成功页面*/
						fbQuestionMoudle.hide();
				    	fbUsbMoudle.hide();
				    	fbMoudle.show();
				    	fbSuccessMoudle.show();
				    	fileFailed.hide();
						count = 10;
						me.el.find(".count").html(10);
						var fbTime = setInterval( function(){
				    		if( count <= 0 ){
				    			clearInterval(fbTime);
				    			var curHash = app.getCurHashParas();
				    			if(curHash.action == "feedback" && curHash.pageState.vt == "question"){
				    				app.navigate({
					    				 module : 'resource',
										 action : 'app'
					    			});
				    			}
				    			fbUsbMoudle.hide();
						    	fbSuccessMoudle.hide();
				    			fbMoudle.show();
				    			fbQuestionMoudle.show();
						    	
				    		}else{
				    			count--;
				    		}
				    		me.el.find(".count").html(count);
				    	},1000);
					
						/*提交附件图片*/
						if(me.el.find(".file").val()!="" ||
							(fileSuccsee.is(":visible") && isFile)){
							$("#image-form").submit();
							var imgTime = setInterval( function(){
								var inner = {};
								var win = $(".image-iframe")[0].contentWindow,
									inner = win.document.body.innerText;
		    					if(inner){
		    						me.el.find(".attach_file").val(JSON.parse(inner).data.source);
		    						win.document.body.innerText="";
		    						clearInterval(imgTime);
		    						me.trigger("image-ok");
		    					}
							},500);
							me.off("image-ok").on("image-ok",function(){
								infoForm();
							});
						}else{
							infoForm();
						}
						
						me.el.find(".close").off("click").on("click",function(){
				    		app.navigate({
			    				 module : beforeModule,
								 action : beforeAction
			    			});
				    	});
					};
				
					function infoForm(){
						console.log($("#info-form").serialize());
						$.ajax({
						 	url:"http://server.mobogenie.com/nclient/feedback/pcFeedBack.htm",
						    data:$("#info-form").serialize(),
						    type:"post",
						    success:function(data){
						    	console.log("反馈成功反馈成功反馈成功反馈成功反馈成功反馈成功反馈成功反馈成功反馈成功反馈成功反馈成功反馈成功",data);
						     }	
						});
						/*反馈到Zendesk系统*/
						var fbk_sub = me.el.find(".fbk_sub").val();
						var info = message;
						var modelName = userModel ? userModel :"";
						var osVersion = me.el.find(".android_sys").val()? me.el.find(".android_sys").val() :"";
						var str = 'clientVersion:'+clientVer+"*info:"+info+"*type:"+fbk_sub+"*modelName:"+modelName+"*osVersion:"+osVersion+"*feedbackID:"+id;
						var zmail = me.el.find(".mail").val();
						var zname = zmail.split("@")[0];
						var site = globalConfig.domain.site;
						
						var zenurl = 'https://mobogenie.zendesk.com/requests/embedded/create/?subject=Mobogenie PC Feedback&description='+str+ '&name=' + zname + '&email=' + zmail+ '&set_tags=' +site;
						$.ajax({
							type:'post',
							url: zenurl,
							dataType :'jsonp',
							jsonp: "callback",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
							jsonpCallback:"callback",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
							success:function(data){
								console.log("反馈到Zendesk系统成功了",data,"color:#13abe1")
							},
							error:function(data){
								console.log("反馈到Zendesk系统失败了",data,"color:#13abe1")
							}
					
						});
					};
					
				}
			}
			function submit(){
				app.dal.request({
	                action: apiNames.REQ_GETCLIENT_INFO,
	                paras : {},
	                callback :function(res){
	                    clientVer = res.info.clientVer;
	                    pid = res.info.pid;
	                    vid = res.info.vid;
	                    os = res.info.wos;
	                    systemlanguage = parseInt(res.info.systemDefLanguageId,10);
	                    /*获取系统语言*/
	                    languageTag = proLanguage(systemlanguage);
	                    
	                    me.el.find(".clientVersion").val(clientVer);
	                	me.el.find(".pid").val(pid);
	                	me.el.find(".vid").val(vid);
	                	me.el.find(".os").val(os);
	                	
                		app.dal.request({
			                 action : apiNames.REQ_DEVICE_INFO,
			                 paras : {},
			                 callback : function(res) {
			                 	if( res.info == null){
			                 		brand = "";
			                 		model = "";
			                 	}else{
			                 		brand = res.info.sPhoneBrand;
			                 		model = res.info.sPhoneName;		
			                 	}
			                 	me.el.find(".brand").val(brand);
			                   	me.el.find(".model").val(model);
			                   	verifySubmit();
			                 }
			            });
	                }
				});
				
			}
			
			/*获取系统语言*/
			function proLanguage(systemlanguage){
				//英语
                if(systemlanguage == parseInt(0x0409,10)||systemlanguage == parseInt(0x0809,10)||systemlanguage == parseInt(0x0c09,10)||systemlanguage == parseInt(0x1009,10)||systemlanguage == parseInt(0x1409,10)||systemlanguage == parseInt(0x1809,10)||systemlanguage == parseInt(0x1c09,10)||systemlanguage == parseInt(0x2009,10)||systemlanguage == parseInt(0x2409,10)||systemlanguage == parseInt(0x2809,10)||systemlanguage == parseInt(0x2c09,10)||systemlanguage == parseInt(0x3009,10)||systemlanguage == parseInt(0x3409,10)){
					group = "en";
					console.log("英语");
                //法语
                }else if(systemlanguage == parseInt(0x0c,10)||systemlanguage == parseInt(0x040c,10)||systemlanguage == parseInt(0x080c,10)||systemlanguage == parseInt(0x0c0c,10)||systemlanguage == parseInt(0x100c,10)||systemlanguage == parseInt(0x140c,10)||systemlanguage == parseInt(0x180c,10)){
                	group = "fr";
                	console.log("法语");
                //西班牙语
                }else if(systemlanguage == parseInt(0x040a,10)||systemlanguage == parseInt(0x080a,10)||systemlanguage == parseInt(0x0c0a,10)||systemlanguage == parseInt(0x100a,10)||systemlanguage == parseInt(0x140a,10)||systemlanguage == parseInt(0x180a,10)||systemlanguage == parseInt(0x1c0a,10)||systemlanguage == parseInt(0x200a,10)||systemlanguage == parseInt(0x240a,10)||systemlanguage == parseInt(0x280a,10)||systemlanguage == parseInt(0x2c0a,10)||systemlanguage == parseInt(0x300a,10)||systemlanguage == parseInt(0x340a,10)||systemlanguage == parseInt(0x380a,10)||systemlanguage == parseInt(0x3c0a,10)||systemlanguage == parseInt(0x400a,10)||systemlanguage == parseInt(0x440a,10)||systemlanguage == parseInt(0x480a,10)||systemlanguage == parseInt(0x4c0a,10)||systemlanguage == parseInt(0x500a,10)||systemlanguage == parseInt(0x0a,10)){
                	group = "es";
                	console.log("西班牙语");
                //德语
                }else if(systemlanguage == parseInt(0x0407,10)||systemlanguage == parseInt(0x0807,10)||systemlanguage == parseInt(0x0c07,10)||systemlanguage == parseInt(0x1007,10)||systemlanguage == parseInt(0x1407,10)){
                	group = "de";
                	console.log("德语");
                //葡萄牙语
                }else if(systemlanguage == parseInt(0x0416,10)||systemlanguage == parseInt(0x0816,10)||systemlanguage == parseInt(0x16,10)){
                	group = "pt";
                	console.log("葡语");
                //俄语
                }else if(systemlanguage == parseInt(0x0419,10)||systemlanguage == parseInt(0x19,10)){
                	group = "ru";
                	console.log("俄语");
                //阿拉伯语
                }else if(systemlanguage == parseInt(0x01,10)||systemlanguage == parseInt(0x0401,10)||systemlanguage == parseInt(0x0801,10)||systemlanguage == parseInt(0x0c01,10)||systemlanguage == parseInt(0x1001,10)||systemlanguage == parseInt(0x1401,10)||systemlanguage == parseInt(0x1801,10)||systemlanguage == parseInt(0x1c01,10)||systemlanguage == parseInt(0x2001,10)||systemlanguage == parseInt(0x2401,10)||systemlanguage == parseInt(0x2801,10)||systemlanguage == parseInt(0x2c01,10)||systemlanguage == parseInt(0x3001,10)||systemlanguage == parseInt(0x3401,10)||systemlanguage == parseInt(0x3801,10)||systemlanguage == parseInt(0x3c01,10)||systemlanguage == parseInt(0x4001,10)){
                	group = "ar";
                	console.log("阿拉伯语");
                //土耳其
                }else if(systemlanguage == parseInt(0x01,10)||systemlanguage == parseInt(0x0401,10)||systemlanguage == parseInt(0x0801,10)||systemlanguage == parseInt(0x0c01,10)||systemlanguage == parseInt(0x1001,10)||systemlanguage == parseInt(0x1401,10)||systemlanguage == parseInt(0x1801,10)||systemlanguage == parseInt(0x1c01,10)||systemlanguage == parseInt(0x2001,10)||systemlanguage == parseInt(0x2401,10)||systemlanguage == parseInt(0x2801,10)||systemlanguage == parseInt(0x2c01,10)||systemlanguage == parseInt(0x3001,10)||systemlanguage == parseInt(0x3401,10)||systemlanguage == parseInt(0x3801,10)||systemlanguage == parseInt(0x3c01,10)||systemlanguage == parseInt(0x4001,10)){
                	group = "tr";
                	console.log("土耳其语");
                //波斯语
                }else if(systemlanguage == parseInt(0x29,10)||systemlanguage == parseInt(0x0429,10)){
                	group = "fa";
                	console.log("波斯语");
                //印尼语
                }else if(systemlanguage == parseInt(0x21,10)||systemlanguage == parseInt(0x0421,10)){
                	group = "in";
                	console.log("印尼语");
                //孟加拉
                }else if(systemlanguage == parseInt(0x45,10)){
                	group = "bd";
                	console.log("孟加拉");
                //马来西亚
                }else if(systemlanguage == parseInt(0x043e,10)||systemlanguage == parseInt(0x083e,10)){
                	group = "ms";
                	console.log("马来西亚");
                //泰语
                }else if(systemlanguage == parseInt(0x1e,10)||systemlanguage == parseInt(0x041e,10)){
                	group = "th";
                	console.log("泰语");
                //捷克语
                }else if(systemlanguage == parseInt(0x05,10)||systemlanguage == parseInt(0x0405,10)){
                	group = "cs";
                	console.log("捷克语");
                //意大利语
                }else if(systemlanguage == parseInt(0x0410,10)||systemlanguage == parseInt(0x0810,10)||systemlanguage == parseInt(0x10,10)){
                	group = "it";
                	console.log("意大利语");
                //韩语
                }else if(systemlanguage == parseInt(0x12,10)||systemlanguage == parseInt(0x0812,10)||systemlanguage == parseInt(0x0412,10)){
                	group = "ko";
                	console.log("韩语");
                //罗马尼亚
                }else if(systemlanguage == parseInt(0x18,10)||systemlanguage == parseInt(0x0418,10)){
                	group = "ro";
                	console.log("罗马尼亚");
                //乌克兰语
                }else if(systemlanguage == parseInt(0x0422,10)||systemlanguage == parseInt(0x22,10)){
                	group = "uk";
                	console.log("乌克兰语");
                //越南语
                }else if(systemlanguage == parseInt(0x042a,10)||systemlanguage == parseInt(0x2a,10)){
                	group = "vi";
                	console.log("越南语");
                 //中文
                }else if(systemlanguage == parseInt(0x0c04,10) ||systemlanguage == parseInt(0x0404,10) || systemlanguage == parseInt(0x0804,10)||systemlanguage == parseInt(0x1404,10)){
                	group = "zh";
                	console.log("中文");
                }else{
                	group = "other";
                }
                return group;
			
			}
		},
        render: function(opts){
			this.showException(this.opts);
			
        }
    });
    
    return View;
});