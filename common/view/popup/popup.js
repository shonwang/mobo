define('UIPopup', function(require, exports, module){
    var app = require('app');
    var $ = require('jquery');
    var apiNames = require('APINames');
    
    var Popup = app.ViewBase.extend({
        
        rendered: false,
        
        init: function(opts){
            this.el = $(document.createElement('div'));
            this.el.addClass('g-popup');
            
            this.destroy = $.proxy(this.destroy, this);
        },
        
        render: function ( target ) {
            this.el.appendTo( target );
            this.rendered = true;
        },
        
        /*
         * @paras opts{
         *     css: {} css properties
         * }
         */
        show: function ( opts ){
            opts = opts || {};
            
            if( !this.rendered ){
                this.render(document.body);
            }
            
            this.el.css({
           		'display': 'block',
            	'opacity':'1'
            });
            
            if(opts && opts.content){
                this.el.html(opts.content);
            }
                app.dal.request({
                    action:"get_MoveCenter"
                });
        },
        
        hide: function(){
        	 this.el.fadeOut(500);
        },
        /*重载hide，给定时间关闭*/
        hideIn: function(){
             this.el.hide();
        },
        
        destroy: function(){
            this.el.undelegate();
            this.el.remove();
            
            this.el = null;
        },
        /*添加盒子里的内容
         * @paras component{String | UIview} 设置盒子内容。 UIview必须实现 render 方法
         */
        setContent: function( component ){
            if(typeof component == 'string'){
                this.el.html(component);
            }else if(typeof component == 'object'){
                component.render(this.el);
            }
        },
        //居中弹出的  Popup 盒子
        toCenter: function(){
            var ww = window.innerWidth;
            var wh = window.innerHeight;
            
            this.setPosition((ww - this.el.width())/2+this.el.width()/2-5, (wh - this.el.height())/2+this.el.height()/2);
        },
        setSize:function(width,height){
            var me = this;
            app.dal.request({
                action:apiNames.REQ_RESIZE_WINDOW,
                paras:{
                    width:width,
                    height:height
                },
                callback:function(res){
                    if(res.status){
                        me.el.css({
                            width:width,
                            height:height
                            });
                    }
                }
            });  
        },
        setPosition: function(x, y){
            this.el.css({
                top: y,
                left: x
            });
        }
    });
    
    return Popup;
});