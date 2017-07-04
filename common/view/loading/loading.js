define('loading', function(require, exports, module){
    var $ = require('jquery');
    var app = require('app');
    var _ = require('underscore');
    var i18nDi  = require('I18NDI');

    var Loading = app.ViewBase.extend({
        module: module,
        init: function(opts){
            this.options = opts;
            this.refDom = opts&&opts.refDom;//关联dom操作
            var template = _.template(this.getTpl('tpl-loading-view'), {I18N: i18nDi});
            this.el = $(template);
            this.el.hide();
        },

        show: function(){
        	var me = this;
            // var i = 0;
            // me.handle = 0; 
            // var start = function(){
            //     i = i + 10;
            //     me.el.find(".g-loading").css("-webkit-transform","rotate(" + i + "deg)");
            //     if (i >= 360){
            //         i = 0;
            //     }
            //     me.handle = window.requestAnimationFrame(start);
            // };
            // start(); 
            //me.timecount = setInterval(start, 20);
            if(this.refDom){
                $(this.refDom).attr("disabled","disabled");
            }
            me.el.show();      
        },

        hide: function(){
            this.el.hide();
            // if(this.refDom){
            //     $(this.refDom).removeAttr("disabled");
            // }
            //clearInterval(this.timecount);
            // if (this.handle) {
            //   window.cancelAnimationFrame(this.handle);
            // }
        },
        setSize:function(width,height){
          this.el.css({width:width,height:height});  
        },
        render: function(target){
            this.el.appendTo(target);
        }
    });
    return Loading;	
});
