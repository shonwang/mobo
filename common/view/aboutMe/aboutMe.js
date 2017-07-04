define('UIAbout', function(require, exports, module){
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
		},
        render: function(target){
        	var me = this;
        	app.dal.request({
                action: apiNames.REQ_GETCLIENT_INFO,
                paras : {},
                callback :function(res){
                	me.el = $(_.template(me.getTpl('tpl-aboutMe-view'), {I18N: i18nDi }));
                	/*界面上的版本号是写死的 鼠标滑过之后是带有svn号的版本号*/
				    me.el.find(".ver").attr("titleText",res.info.clientVer)
				    utils.tooltip.attach(me.el.find(".ver"));
		    		me.el.appendTo(target);
		    		
		    		/*增加语言类名*/
		    		var language = i18nDi.getLanguage();
		           	me.el.find(".g-aboutMG-info").addClass(language);
		    		app.eventCenter.on("switchLanguage",function(data){
		    			language = i18nDi.getLanguage();
				    	me.el.find(".g-aboutMG-info").attr("class","g-aboutMG-info " + language);
		            });
		    		
		    		me.el.find(".link-MG").click( function(){
						utils.browser('http://www.mobogenie.com/');
					});
					me.el.find(".link-forums").click( function(){
						utils.browser('http://forums.mobogenie.com');
					});
					me.el.find(".link-privacy").click( function(){
						utils.browser('http://www.mobogenie.com/privacy-policy.html');
					});
					me.el.find(".link-EULA").click( function(){
						utils.browser('http://www.mobogenie.com/eula.html');
					});
					me.el.find(".link-TOS").click( function(){
						utils.browser('http://www.mobogenie.com/terms_conditions.html');
					});
					me.el.find(".link-upload").click( function(){
						utils.browser('http://www.mobogenie.com/upload/index.html');
					});
		        }
		    }); 
		    
        }
    });
    
    return View;
});