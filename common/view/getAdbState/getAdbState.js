define('UIgetAdbState', function(require, exports, module){
	var app = require('app');
	var i18nDi  = require('I18NDI');
	var   $ = require('jquery');
	var   _ = require('underscore');
	var connection = require('connectionMgr');
	
	var View = app.ViewBase.extend({
        module: module,
		init: function(opts){
			var me = this;
		    this.opts = opts;
		    this.win = opts.win;
		    this.el = $(_.template(this.getTpl('tpl-adbState-view'), {I18N: i18nDi}));
		},
		showException:function(opts){
        	var me = this;
        	this.el.find(".adbName").html(opts.win.opts.name);
        	function get_KillAdb(){
        		app.dal.request({
		                action: "get_KillAdb",
		                paras : {},
		                callback :function(res){
		                	me.win.notifyParentWindow({
						    	action:"closeRecon"
						    });
		                }
			     });
        	};
        	this.win.on("close",function(){
        		app.dal.request({
		                action: "get_KillAdb",
		                paras : {},
		                callback :function(res){
		                
		                }
		         });
		         me.win.notifyParentWindow({
			    	action:"closeRecon"
			     });
        	})
        	this.el.find(".closeRe").click( function(){
        		get_KillAdb();
        	});
        	var count = 5;
        	var fbTime = setInterval( function(){
        		if( count <= 0 ){
	    			clearInterval(fbTime);
	    			get_KillAdb();
	    		}else{
	    			count--;
	    		}
	    		me.el.find(".count").html(count);
        	},1000);
		},
        render: function(target){
        	this.el.appendTo(target);
		    this.showException(this.opts)
        }
    });
    
    return View;
});