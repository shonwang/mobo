define('UIFeedback', function(require, exports, module){
	var app = require('app');
	var i18nDi  = require('I18NDI');
	var   $ = require('jquery');
	var   _ = require('underscore');
	var utils = require('utils');
	var globalConfig = require('globalConfig');
	var apiNames = require('APINames');
	
	var View = app.ViewBase.extend({
        module: module,
		init: function(opts){
		    this.opts = opts;
		    this.el = $(_.template(this.getTpl('tpl-feedback-view'), {I18N: i18nDi}));
		},
		showException:function(opts){
			utils.placeholder(this.el.find("textarea"),i18nDi.fillDomText('setting.fbTextarea'));
			utils.placeholder(this.el.find("input.userModel"),i18nDi.fillDomText('setting.fbModelName'));
			utils.placeholder(this.el.find("input.userVersion"),i18nDi.fillDomText('setting.fbOsVersion'));
			utils.placeholder(this.el.find("input.email"),i18nDi.fillDomText('common.email'));
			
			/*提交表单*/
			var pass = false;
			var me = this;
			var errorHint = this.el.find(".ico-error-small");
			var feedHint = this.el.find(".g-feedback-hint");
			var verifyInputResult = false,
				verifySelectesult = false,
				verifyEmailResult = false;
			var nameInput = me.el.find(".userModel"),
				emailInput = me.el.find(".email"),
				infoInput = me.el.find(".info");
				
			var clientVer,pid,vid,os,brand,model,systemlanguage,group;
			var placeholder = me.el.find(".placeholder").last(),
				textInfo = me.el.find(".com-area.info");
				
			//checkbox点击事件
			this.el.find(".fb-option").click( function(){
				if( $(this).prop("checked")){
					$(this).val( $(this).siblings("label").text());
					if(textInfo.val() == ""){
						var prompt = $(this).siblings("p").text();
						placeholder.show();
						placeholder.html(prompt);	
						textInfo.val("");
					}
					
				}else{
					var lastPrompt = me.el.find(":checkbox:checked").last().siblings("p").text();
					placeholder.html(lastPrompt);
					$(this).val("");
				}
				if( $(this).attr("id") == "user" ){
					if($(this).prop("checked")){
						placeholder.hide();
						var prompt = $(this).siblings("p").text();
						textInfo.val( prompt);
						obj = textInfo[0];
						obj.setSelectionRange(obj.value.length, obj.value.length);
				        obj.focus(); 
						
					}else{
						placeholder.show();
						var lastPrompt = me.el.find(":checkbox:checked").last().siblings("p").text();
						placeholder.html(lastPrompt);
						textInfo.val("");
					}
				}
				if( me.el.find(":checkbox:checked").length > 0){
					verifySelectesult = true;
					if( verifyInputResult && verifySelectesult && verifyEmailResult ){
						feedHint.show();
						errorHint.hide();
					}
				}else{
					placeholder.html(i18nDi.fillDomText('setting.fbTextarea'))
				}
			});
				
			//input blur事件
			function inputBlur ( inputObj ){
				inputObj.blur( function( e ){
					if($(e.target).val() != ""){
						feedHint.show();
						errorHint.hide();
						inputObj.removeClass("err-input");
					}
				});
			}
			emailInput.blur( function(){
				verifyEmail();
			})
			inputBlur(nameInput);
			inputBlur(infoInput);
			
			//邮箱格式
			var verifyEmail = function(){
				var email = me.el.find(".email").val();
				var isemail= /^([a-zA-Z0-9]+[_|\_|\.\-]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.|\-]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
				
				if( email == ""){
					feedHint.show();
					errorHint.hide();
					emailInput.removeClass("err-input");
					verifyEmailResult = false;
					return false;
				}
				if (!isemail.test(email)){
				     feedHint.hide();
					 errorHint.show();
					 emailInput.addClass("err-input");
				     errorHint.html(i18nDi.fillDomText('setting.fbEmailFormatFailed'));
				     verifyEmailResult = false;
				    return false;
				}else{
					feedHint.show();
					errorHint.hide();
					emailInput.removeClass("err-input");
					verifyEmailResult =  true;
				}
				verifyInputResult = true;
			};
			
			//验证input
			var verifyInput = function(){
				var emailValue = emailInput.val(),
					infoValue = infoInput.val();
				if( emailValue == "" || infoValue == "" ){
					feedHint.hide();
					errorHint.show();
					if(infoValue == ""){
						errorHint.html(i18nDi.fillDomText('setting.fbTextareaFailed'));
						infoInput.addClass("err-input");
					}else if(emailValue == ""){
						errorHint.html(i18nDi.fillDomText('setting.fbEmailFailed'));
						emailInput.addClass("err-input");
						verifyEmailResult = false;
					}
					verifyInputResult = false;
					return false;
				}
				if( emailValue != "" ){
					verifyEmail();
				}
			};
			
			//验证checkbox
			var verifySelect = function(){
				if( me.el.find(":checkbox:checked").length == 0){
					feedHint.hide();
					errorHint.show();
					errorHint.html(i18nDi.fillDomText('setting.fbSelectType'));
					verifySelectesult = false;
					return false;
				}
				verifySelectesult = true;
			};
			
			var verifySubmit = function(){
				/*开始表单验证*/
            	verifyInput();
				if(verifyInputResult){
					verifySelect();
				}
				console.log("verifyInputResult----------"+verifyInputResult);
				console.log("verifyEmailResult----------"+verifyEmailResult);
				console.log("verifySelectesult----------"+verifySelectesult);
				
				if( verifyInputResult && verifySelectesult && verifyEmailResult ){
					pass = true;
				}
				if( pass ){
					/*创建唯一id*/
					var myDate = new Date();
					var id = myDate.getTime();
					me.el.find(".feedbackID").val(id);
					/*通过邮箱截取name*/
					var mail = me.el.find(".email").val();
					var name = mail.split("@")[0];
					
					var count = 10;
					/*反馈到cms*/
					$.ajax({
					 	url:"http://server.mobogenie.com/nclient/feedback/pcFeedBack.htm",
					    data:$("#action-form").serialize(),
					    type:"post",
					    success:function(data){
					    	if( data.data.code == 100){
					    		$(".g-feedback-moudle").hide();
					    		$(".feedback-success-moudle").show();
					    		setInterval( function(){
						    		if( count <= 0 ){
						    			me.opts.win.close();
						    		}else{
						    			count--;
						    		}
						    		me.el.find(".count").html(count);
						    	},1000);
					    	}else if( data.data.code == 102 ){
					    		me.opts.win.close();
					    	}
					    	me.el.find(".close").click( function(){
					    		me.opts.win.close();
					    	});
					     }	 
					});
					console.log($("#action-form").serialize());
					
					/*反馈到Zendesk系统*/
					var fbk_sub = "";
					$.each(me.el.find(":checkbox:checked"),function(index,item){
						fbk_sub += $(item).val() +"'";
					});
					var info = me.el.find(".info").val();
					var modelName = me.el.find(".userModel").val() ? me.el.find(".userModel").val() :"";
					var osVersion = me.el.find(".userVersion").val()? me.el.find(".userVersion").val() :"";
					var str = 'clientVersion:'+clientVer+"*info:"+info+"*type:"+fbk_sub+"*modelName:"+modelName+"*osVersion:"+osVersion+"*feedbackID:"+id;
				
					var zenurl = 'https://mobogenie.zendesk.com/requests/embedded/create/?subject=Mobogenie PC Feedback&description='+str+ '&name=' + name + '&email=' + mail+ '&set_tags=' +group;
					$.ajax({
						type:'post',
						url: zenurl,
						dataType :'jsonp',
						jsonp: "callback",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(默认为:callback)
						jsonpCallback:"callback",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名
						success:function(data){
						}
					});
				}
			};
			
			var submit = function(){
				
				app.dal.request({
	                action: apiNames.REQ_GETCLIENT_INFO,
	                paras : {},
	                callback :function(res){
	                    clientVer = res.info.clientVer;
	                    pid = res.info.pid;
	                    vid = res.info.vid;
	                    os = res.info.wos;
	                    systemlanguage = parseInt(res.info.systemDefLanguageId,10);
	                    
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
	                    
	                	me.el.find(".clientVersion").val(clientVer);
	                	me.el.find(".pid").val(pid);
	                	me.el.find(".vid").val(vid);
	                	me.el.find(".os").val(os);
	                	
                		app.dal.request({
			                 action : apiNames.REQ_DEVICE_INFO,
			                 paras : {},
			                 callback : function(res) {
			                 	console.log(res);
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
				
				
				
			};
			this.el.find(".submit-btn").click( function(){
				  submit();
			});
			
		},
        render: function(target){
            this.el.appendTo(target);
			this.showException(this.opts);
        }
    });
    
    return View;
});