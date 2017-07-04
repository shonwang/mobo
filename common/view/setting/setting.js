define('UISetting', function(require, exports, module){
	var app = require('app');
	var apiNames = require('APINames');
	var i18nDi  = require('I18NDI');
	var   $ = require('jquery');
	var   _ = require('underscore');
	var utils = require('utils');
	var UIMenu = require('UIMenu');
	
	var View = app.ViewBase.extend({
        module: module,
		init: function(opts){
		    this.opts = opts;
		    this.el = $(_.template(this.getTpl('tpl-setting-view'), {I18N: i18nDi}));
			this.menu = new UIMenu({
                    list: [
                    	{
                            index: "indonesian",
                            label: 'Bahasa Indonesia'
                        },
                   		{
                            index:	"english",
                            label: 'English'
                        },
                        {
                            index: "spanish",
                            label: 'Español'
                        },
                        {
                            index: "france",
                            label: 'Français'
                        },
                        {
                            index: "italian",
                            label: 'Italiano'
                        },
                        {
							index: "poland",
                            label: 'Polski' 
                        },
                        {
                            index: "portuguese",
                            label: 'Português'
                        },
                        {
							index: "vietna",
                            label: 'Tiếng Việt' 
                        },
                        {
                            index: "turkish",
                            label: 'Türkçe'
                        },
                        {
                            index: "russian",
                            label: 'Русский'
                        },
                        {
                            index: "arabic",
                            label: 'العربية'
                        },
                        {
                            index: "farsi",
                            label: 'فارسی'
                        },
                        {
                            index: "hindi",
                            label: 'हिन्दी'
                        },
                        {
                            index: "thai",
                            label: 'ภาษาไทย'
                        },
                        {
                            index:	"traditionalchinese",
                            label: '中文 (繁體)'
                        },
                        {
                            index: "korean",
                            label: '한국어'
                        }
                    ]
            });   
                
            this.menu.decorate(this.el.find('.list-language .g-select'));
			this.menu.addClass("g-menu-language");
			app.getUserConfig($.proxy(this.handleUserConfInfo,this));
			this.opts.settingWindow.on('close',$.proxy(this.saveUserConfInfo,this));
			var me = this;
			this.opts.settingWindow.on('message', function(data){
				if( data.info.site ){
					this.ssite = data.info.site.toLocaleLowerCase();
				}
			}.bind(this))
			app.eventCenter.on("setPullClient",function(data){
		    	console.log("setting-------------------",data);
	        });
		},
		saveUserConfInfo: function(){
			var me = this;
			var data = {
				info: {
					alwaysOpenMobogenie: this.userConfInfo.alwaysOpenMobogenie,
					atuoUpdate:this.userConfInfo.atuoUpdate,
					autoUnFinishTasksWithoutNotice:this.userConfInfo.autoUnFinishTasksWithoutNotice,
					/*autoUpdateApps: 1,*/
					backupPath: this.userConfInfo.backupPath,
					backupTimeRemind:this.userConfInfo.backupTimeRemind,
					checkApkAssociate:this.userConfInfo.checkApkAssociate,
					clientUpdateTimeRemind:this.userConfInfo.clientUpdateTimeRemind,
					clientVer: this.userConfInfo.clientVer,
					closeStatus: this.userConfInfo.closeStatus,
					defResourceLanguage: this.userConfInfo.defResourceLanguage,
					defsite:this.userConfInfo.defsite,
					defsiteImageUrl:this.userConfInfo.defsiteImageUrl,
					installApkLocation:this.userConfInfo.installApkLocation,
					installUnFinishDAppsWithoutNotice:this.userConfInfo.installUnFinishDAppsWithoutNotice,
					language: this.userConfInfo.language,
					popularActivities: this.userConfInfo.popularActivities,
					resourceDownloadsPath: this.userConfInfo.resourceDownloadsPath,
					screenshootsPath: this.userConfInfo.screenshootsPath,
					site:this.userConfInfo.site
					
				}
			};
			var dataInfo = data.info;
			/*获取checkbox值*/
			var getInfoChecked = function(infoData,inputName){
				if( me.el.find(inputName).prop("checked") ){
					dataInfo[infoData] = 1;
				}else{
					dataInfo[infoData] = 0;
				}
			};
			/*获取radio值*/
			var getInfoRadio = function(infoData,inputName){
				dataInfo[infoData] = me.el.find(inputName+" input:checked").index(inputName+" input");
			};
			/*获取input值*/
			var getInfoText = function(infoData,inputName){
				dataInfo[infoData] = me.el.find(inputName).val();
			};
			/*获取General数据*/
			getInfoChecked("autoUnFinishTasksWithoutNotice",".atuoUnFinish");
			getInfoChecked("alwaysOpenMobogenie",".alwaysOpenMG");
			getInfoChecked("installUnFinishDAppsWithoutNotice",".installUnFinishDApps");
			getInfoRadio("closeStatus",".onClose");
			getInfoChecked("atuoUpdate",".atuoUpdate");
			
			/*获取Locations数据*/
			getInfoText("backupPath",".backupPath");
			getInfoText("resourceDownloadsPath",".resourcePath");
			getInfoText("screenshootsPath",".screenshootsPath");
			
			/*获取Appllications数据*/
			getInfoChecked("checkApkAssociate",".apkAssociate");
			getInfoRadio("installApkLocation",".defaultInstalled");
			
			/*获取Reminders数据*/
			getInfoRadio("clientUpdateTimeRemind",".clientUpdateRemind");
			getInfoRadio("backupTimeRemind",".backupReminders");
			getInfoChecked("popularActivities",".popularActivities");
			
			/*获取language*/
			dataInfo.language = this.currentLanCode;
			/*获取站点*/
			dataInfo.defResourceLanguage = this.defResourceLanguage;
			dataInfo.defsite = this.currentSite || "Global";
			dataInfo.defsiteImageUrl = me.currentSiteImg;
			console.log(data);
			app.setUserConfig(data);
		},
		/*选择路径*/
        settingPath : function(inputName,curPath,data, callback) {
            var me = this;
            app.dal.request({
                action : apiNames.REQ_POPUO_SAVE_DIALOG,
                paras:{
                	path : curPath
                },
                callback : function(res) {
                    if (res.status !== 1) {
                        return;
                    }
                    var path = res.path;
					me.el.find(inputName).val(path);
					me.saveUserConfInfo();
                }
            });
        },
		showException:function(opts){
			var me = this;
			this.el.find(".left-nav nav li").click( function(){
				var index = $(this).index();
				$(this).addClass("light").siblings().removeClass("light");
				me.el.find(".right-module > div").eq(index).show().siblings().hide();
			});
			this.el.find("input").click( function(){
				setTimeout( function(){
					me.saveUserConfInfo();
				},50);
			});
			this.el.find(".check").click( function(){
				setTimeout( function(){
					me.saveUserConfInfo();
				},50);
			});
			this.el.find(".resourcePathBtn").click(function(){
				me.settingPath(".resourcePath",me.userConfInfo.resourceDownloadsPath);
			});
			this.el.find(".backupPathBtn").click(function(){
				me.settingPath(".backupPath",me.userConfInfo.backupPath);
			});
			this.el.find(".screenPathBtn").click(function(){
				me.settingPath(".screenshootsPath",me.userConfInfo.screenshootsPath);
			});
		},
		handleUserConfInfo: function(res){
			this.userConfInfo = res.info;
			this.siteInfo = res.info.site;
			var me = this;
			
			if( this.siteInfo != null ){
				var siteArr = [];	
				me.currentSite = this.userConfInfo.defsite;
				me.currentSiteImg = this.userConfInfo.defsiteImageUrl;
				me.defResourceLanguage = this.userConfInfo.defResourceLanguage;
				/*判断当前站点是否正确*/
				var globalConfig = require('globalConfig');
				var curn = me.userConfInfo.defResourceLanguage.toLocaleLowerCase();
				if(me.ssite != curn){
					$.each(me.siteInfo,function(index,item){
						console.log(item)
						if(item.resourceLanguage.toLocaleLowerCase() == curn){
							console.log(item);
							var currentSiteObj = {
								localServer: item.server_voga360,
								publicUrl: item.public_voga360,
								uploadUrl: item.upload_voga360,
								searchUrl: item.search_voga360,
								marketUrl: item.market_voga360,
								site:item.resourceLanguage
							};
							console.log(currentSiteObj)
								
							/*发送切站消息,通知刷新页面*/
							me.opts.settingWindow.notifyParentWindow({
				                action: 'switchSite',
				                paras: currentSiteObj,
				                currentSite:item.resourceLanguage
				            });
				            /*发送当前站点信息到c++*/
				            app.dal.request({
					            action: apiNames.REQ_SWICH_SITE,
					            paras : item,
					            callback :function(res){
					            }
					        });
					        setTimeout( function(){
								me.saveUserConfInfo();
							},300);
						
						}
					})
				}
				
				
				/*联网正常的情况下设置站点和图片*/
				me.el.find(".list-site .site img").css("display","inline-block");
				me.el.find(".list-site .site img").attr("src",this.userConfInfo.defsiteImageUrl);
				me.el.find(".list-site .site .siteName").text(this.userConfInfo.defsite);
				/*读取站点信息 创建menu*/
				for( var i = 0; i < this.siteInfo.length;i++){
					siteArr.push({
						index: i,
	              		label: "<img class='logo-img' src='"+ this.siteInfo[i].imageUrl+ "' />" + "<span class='siteName'> "+this.siteInfo[i].title+" </span>"
	                });
				}
				this.siteMenu = new UIMenu({
	                    list:siteArr
	            });   
	            this.siteMenu.decorate(this.el.find('.list-site .g-select'));
				this.siteMenu.addClass("g-menu-site");
				var me = this;
				/*选择站点事件*/
				this.siteMenu.on(UIMenu.SELECT, function(data, e){
					var curNum = data.index;
					var chooseSiteName = me.siteInfo[curNum].title;
					var curSiteName = me.el.find(".list-site .siteName").html();
					
					me.el.find(".list-site .site").html(data.label);
					me.defResourceLanguage =  me.siteInfo[curNum].resourceLanguage;
					me.currentSite = $.trim(me.el.find(".list-site .siteName").text());
					me.currentSiteImg = me.el.find(".list-site .site img").attr("src");
					var currentSiteInfo = me.siteInfo[data.index];
					var currentSiteObj = {
						localServer: currentSiteInfo.server_voga360,
						publicUrl: currentSiteInfo.public_voga360,
						uploadUrl: currentSiteInfo.upload_voga360,
						searchUrl: currentSiteInfo.search_voga360,
						marketUrl: currentSiteInfo.market_voga360,
						site:currentSiteInfo.resourceLanguage
					};
					console.log(currentSiteObj)
					if( $.trim(chooseSiteName) != $.trim(curSiteName)){
							/*发送切站消息,通知刷新页面*/
							me.opts.settingWindow.notifyParentWindow({
				                action: 'switchSite',
				                paras: currentSiteObj,currentSite:currentSiteInfo.resourceLanguage
				            });
				            /*发送当前站点信息到c++*/
				            app.dal.request({
					            action: apiNames.REQ_SWICH_SITE,
					            paras : currentSiteInfo,
					            callback :function(res){
					            }
					        });
					        setTimeout( function(){
								me.saveUserConfInfo();
							},300);
					}
					
				});
			}else{
				/*网络不正常设置站点，隐藏图标*/
				me.el.find(".list-site .site img").hide();
				me.el.find(".list-site .site .siteName").text(this.userConfInfo.defsite);
			}
			window.addEventListener("online", function(e) { 
				$('.logo-img').each(function(){
					$(this).attr('src',$(this).attr('src'))
				})
			}, true); 
			/*语言设置*/
			me.currentLanCode = me.userConfInfo.language;
			this.menu.on(UIMenu.SELECT, function(data, e){
				me.currentLanCode = data.index;
				me.el.find(".list-language .language").text(data.label);
				switchLanguage(data.index);
				/*发送当前语言信息到c++*/
	            app.dal.request({
		            action: apiNames.REQ_SET_LANGUAGE,
		            paras : {
		            	language: data.index
		            }
		        });
		        
	            app.dal.request({
		            action: "get_NotifyAllCefWindow",
		            paras : {
		            	language: data.index
		            }
		        });		        
				
				/*发送切换语言消息,通知刷新页面*/
				me.opts.settingWindow.notifyParentWindow({
	                action: 'switchLanguage',
	                paras: data.index
	            });
				me.saveUserConfInfo();
			});
			
			/*设置checkbox值*/
			var setInfoChecked = function(infoData,inputName){
				if( me.userConfInfo[infoData] == 1 ){
					me.el.find(inputName).prop("checked", true);
				}else if( me.userConfInfo[infoData] == 0 ){
					me.el.find(inputName).prop("checked", false);
				}
			};
			/*设置radio值*/
			var setInfoRadio = function(infoData,inputName){
				me.el.find(inputName+" input").eq(me.userConfInfo[infoData]).prop("checked", true);
			};
			/*设置input值*/
			var setInfoText = function(infoData,inputName){
				me.el.find(inputName).attr("value",me.userConfInfo[infoData]);
			};
			/*设置Locations数据*/
			setInfoChecked("autoUnFinishTasksWithoutNotice",".atuoUnFinish");
			setInfoChecked("alwaysOpenMobogenie",".alwaysOpenMG");
			setInfoChecked("installUnFinishDAppsWithoutNotice",".installUnFinishDApps");
			setInfoRadio("closeStatus",".onClose");
			setInfoChecked("atuoUpdate",".atuoUpdate");
			
			/*设置Appllications数据*/
			setInfoText("resourceDownloadsPath",".resourcePath");
			setInfoText("backupPath",".backupPath");
			setInfoText("screenshootsPath",".screenshootsPath");
			
			/*设置Reminders数据*/
			setInfoChecked("checkApkAssociate",".apkAssociate");
			setInfoRadio("installApkLocation",".defaultInstalled");
			
			/*设置language*/
			setInfoRadio("clientUpdateTimeRemind",".clientUpdateRemind");
			setInfoRadio("backupTimeRemind",".backupReminders");
			setInfoChecked("popularActivities",".popularActivities");
			
			/*设置language*/
			var currentLanguage = $(document).find(".g-menu-language menu li[data-item=" + this.userConfInfo.language + "]");
			this.el.find(".g-select-mod .language").html(currentLanguage.html());
		
		},
        render: function(target){
            this.el.appendTo(target);
			this.showException(this.opts);
        }
    });
    
    return View;
});