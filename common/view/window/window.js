define("UIWindow", function(require, exports, module) {
    var Popup = require('UIPopup');
    var $ = require('jquery');
    var _ = require('underscore');
    var app = require('app');
    
    var apiNames = require('APINames');
    var utils = require('utils');
    
    
    /*
     * @construnctor Menu
     * @paras opts {
     *     winType : 0 | 1 // 0 c++窗口类型; 1 为前端弹窗类型,
		   min : false | true // false 最小化按钮隐藏; true 最小化按钮显示
     * }
     */
    var Window = Popup.extend({
        module: module,
        events: {
            'click -> .g-window-header-x.ico-close' : 'close',
            'mousedown -> .g-window-header-x' : 'disableDrag',
            'dblclick -> .g-window-header-title':'toggleMax',
            'click -> .g-window-header-x.ico-max' : 'max',
            'click -> .g-window-header-x.ico-min' : 'min'
        },
        init: function( opts ){
            var i18nDi = require('I18NDI');
            
            this.opts = $.extend(true, {
                winType: 0,//默认为c++窗口类型
				isMin: false,//默认最小化按钮隐藏
				isMax:false//默认最大化按钮隐藏
            }, opts);
            this.maxable=true;
            Window.__super__.init.apply(this, [opts]);
            this.el.html(this.getTpl('tpl-window-view'));
            this.el.addClass('g-window');
            
            this.onMouseDown = $.proxy(this.onMouseDown, this);
            
            if(this.opts.winType == 1){
                this.el.find('.g-window-header').on('mousedown', this.onMouseDown);   
            }
            
            app.dal.binding(apiNames.BIND_EVENT_WINDOW_RECEIVER, _.bind(function(msg){
                this.trigger('message', msg);
                
                if(msg.info.action == 'switchLanguage'){
                    i18nDi.switchLanguage(msg.info.language);
                }else if(msg.info.restore == 1){
                    this.restore();
                }
            }, this));
            
            if(this.opts.winType == 0){
                var paraMe = decodeURIComponent(utils.getParameter('parame'));

                var language;

                if(paraMe){
                    paraMe = JSON.parse(paraMe);
                }else{
                    paraMe = {
                        language: utils.getParameter('language')
                    };
                }
                
                
                i18nDi.switchLanguage(paraMe.language);
            }
			
			if( this.opts.isMin ){
				this.el.find(".ico-min").show();
				if(this.opts.isMax){
				    this.el.find(".ico-min").addClass("min-r");
				}
			}else {
				this.el.find(".ico-min").hide();
			}
		  if( this.opts.isMax ){
                this.el.find(".ico-max").show();
            }else {
                this.el.find(".ico-max").hide();
            }
			app.dal.binding("set_Close", function(){
			    this.close();
			}.bind(this));
            this.notifyParentWindow({
                windowReady:true
            });
            
           document.addEventListener("dragenter", this.onDragEnter.bind(this),  false);  
           document.addEventListener("dragover", this.onDragEnter.bind(this),  false);  
           document.addEventListener("drop", this.onDragEnter.bind(this),  false);  
        },
        onDragEnter:function(event){
            event.preventDefault();
            event.stopPropagation();
            return false;
        },
        restore: function(){
            app.dal.request({
                action: apiNames.REQ_RESTORE
            });
        },
        disableDrag:function(event){
                app.dal.request({
                    action: apiNames.REQ_DRAG_DISABLED
                });            
        },
        onMouseDown: function ( e ){
            var startX = e.pageX;
            var startY = e.pageY;
            
            var mousemove = $.proxy(function( e ){
                e.preventDefault();
                
                var ofx = e.pageX - startX;
                var ofy = e.pageY - startY;
                
                startX = e.pageX;
                startY = e.pageY;
                
                var curOfx = this.el.position();
                this.el.css({
                    left: curOfx.left + ofx,
                    top: curOfx.top + ofy
                });
            }, this);
            
            var mouseup = $.proxy(function( e ){
                $(document).off('mousemove', mousemove);
                $(document).off('mouseup', mouseup);
            }, this);
            
            $(document).on('mousemove', mousemove);
            $(document).on('mouseup', mouseup);
        },
        
        show: function( opts ){
            console.log(this.opts)
            if( !this.rendered ){
                this.render(document.body);
                this.rendered = true;
             if(this.opts.slideOut && this.opts.fly.fly){
                 app.dal.request({
                        action:"get_MoveCenter",
                        callback:function(res){
                          
                        }
                    });
               }
            }


            /*
            if(this.opts.slideOut){
                 app.dal.request({
                        action : apiNames.REQ_ARIVE_CLOSE,
                        callback:function(){                            
                        }
                       
                })
            }*/
        },
        
        close: function(){
            var me = this;
            if(this.opts.slideOut && this.opts.fly.fly){
                 app.dal.request({
                        action : apiNames.REQ_ARIVE_CLOSE,
                        callback:function(){
                            me.opts.slideOut = null;
                            setTimeout(function(){
                                me.close();
                            },500);
                            
                        }
                       
                })
                return;
            }else if(this.opts.winType === 0){
                //在c++模态窗口关闭前关闭
                this.trigger('close');
                
               app.dal.request({
                    action: apiNames.REQ_CLOSE
                });
            }else{
                this.destroy();
                this.trigger('close');
            }
            //
            /*
            var me = this;
            this.el.transition({scale: 1.05, opacity: 0}, 100, function(){
                me.el.css('display', 'none');
                me.trigger('close');
            });
            */
        },
        min: function(){
        	if(this.opts.winType === 0){
                //在c++模态窗口关闭前关闭
                app.dal.request({
                    action: apiNames.REQ_MINILIZE
                });
        	}
        },
        max: function(){
            var me = this;
            if(this.opts.winType === 0){
                //在c++模态窗口关闭前关闭
                app.dal.request({
                    action: apiNames.REQ_MAXIMIZE,
                    callback:function(res){
                        me.trigger("toggleMax",res);
                    }
                });
            this.el.find(".ico-max").toggleClass("max");
            this.el.find(".ico-max").toggleClass("default");
            }
        },
        toggleMax:function(event){
            console.log("最大化");
            var me = this;
            if(this.opts.isMax&&this.maxable){
                app.dal.request({
                    action: apiNames.REQ_MAXIMIZE,
                    callback:function(res){
                        console.log("最大化后的回调",res);
                        me.trigger("toggleMax",res);
                    }
                });          
                this.el.find(".ico-max").toggleClass("max");
                this.el.find(".ico-max").toggleClass("default");      
            }
        },
        notifyParentWindow: function(paras){
            app.dal.request({
                action: apiNames.REQ_NOTIFY_PARENT_WINDOW,
                paras: paras || {}
            });
        },
        /*add by liujintao 2014-02-08 setHeader and delegateContentEvents*/
       /**添加header
         * @author liujintao 
         *  @since 2014-02-08
         * @param component 添加header内容，可以使字符串，也可以是html
      */
          setHeader: function( component ){
            var ctn = this.el.find('.g-window-header-title');
            if(typeof component == 'string'){
                ctn.html(component);
            }else if(typeof component == 'object'){
                component.render(ctn);
            }
        },
        /**添加content的事件代理,
         * @author liujintao 
         *  @since 2014-02-08
         * @param selector 添加委托事件的dom元素
         * @param eventName 委托的事件名称
         * @param handler 捕获事件的处理函数
         * @param multi 是否为累加事件，默认为否
         */
        delegateContentEvent:function(selector,eventName,handler,multi){
            if(!multi){
                 this.el.undelegate(selector,eventName);
            }
           this.el.delegate(selector,eventName,handler);
        },
        setContent: function( component ){
            var ctn = this.el.find('.g-window-ctn');
            if(typeof component == 'string'){
                ctn.html(component);
            }else if(typeof component == 'object'){
                component.render(ctn);
            }
        },
        setEnabled:function(enabled){
            app.dal.request({
                action:apiNames.REQ_POP_ENABLE_WINDOW,
                paras:{
                    state:enabled
                }
            });
        },
        setMaxable:function(enabled){
            this.maxable=enabled;
        },
        setFooter: function(component){
            var ctn = this.el.find('.g-window-footer');
            
            if('length' in component){
                component.appendTo(ctn);
            }else if(typeof component == 'string'){
                ctn.html(component);
            }else if(typeof component == 'object'){
                component.render(ctn);
            }
        },
        getContent:function(){
            return this.el.find('.g-window-ctn');
        },
        /**
         *创建托盘
         * @param trayInfo 托盘信息json
         * {
         *     menuType:整型，标识
         *     trayTip:托盘显示的tip
         *     menuList=[{menuId, text}]
         * }
         *  */
        setTray:function(trayInfo){
            var me = this;
            app.dal.request({
                action:apiNames.REQ_SET_TRAY_MENU_INFO,
                paras:trayInfo,
                callback:function(res){
                    console.log("创建托盘回调");
                }
            });
            app.dal.binding(apiNames.BINDING_SELECT_TRAY_MENU_ITEM,function(item){
                me.trigger("tray_menu_select",item);
            });
        },
        setVisible:function(value){
            app.dal.request({
                action:apiNames.SET_TRAY_WINDOW_VISIBLE,
                paras:{
                    cmdShow:value?1:0 
                },
                callback:function(res){
                    console.log("显示或隐藏窗口的回调",res);
                }
            });
            if(value){
                this.trigger("show");                
            }else {
                this.trigger("hide");
            }
        },
        deleteTray:function(){
            app.dal.request({
                action:apiNames.REQ_DELETE_WINDOW_TRAY,
                callback:function(res){
                    console.log("删除托盘回调");
                }
            });            
        }
    });
    
    return Window;
}); 