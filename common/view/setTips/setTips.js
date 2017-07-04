define('UISetTips', function(require, exports, module){
	var app = require('app');
	var i18nDi  = require('I18NDI');
	var   $ = require('jquery');
	var   _ = require('underscore');
	
		
	var UISetView = app.ViewBase.extend({
        module: module,
        events:{
        	// 'click -> .btn-yes' : 'onYes',
        	// 'click -> .btn-no' : 'onNo'
        },
		init: function(opts){
		    this.opts = opts;
		    this.win = opts.win;
		    //this.el=$(document);
            this.el = $(_.template(this.getTpl('tpl-setTips-view'), {I18N: i18nDi}));
		},

		onYes:function(){
			this.win.notifyParentWindow({
                action: 'setPullClient',
                paras: 1
            });
            this.win.close();
		},
		onNo:function(){
			this.win.notifyParentWindow({
                action: 'setPullClient',
                paras: 0
            });
            this.win.close();
		},
        render: function(target){
        	
            this.el.appendTo(target);
            this.el.find(".btn-yes").on("click", $.proxy(this.onYes, this));
            this.el.find(".btn-no").on("click", $.proxy(this.onNo, this));
        }
    });

    return UISetView;
});