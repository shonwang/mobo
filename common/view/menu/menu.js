define("UIMenu", function(require, exports, module) {
    var Popup = require('UIPopup');
    var $ = require('jquery');
    var _ = require('underscore');
    var app = require('app');
    var utils = require('utils');
    var connection = require('connectionMgr');
    
    /*
     * @construnctor Menu
     * @paras opts {
     *     list: {
     *         label: 'test',
     *         index: 0,
     *         type: 'sp|label|checkbox/multiCheck', sp分割条，label普通文本，checkbox单选列表，multiCheck多选列表
     *         hold: true 当选择menu item,是否保持菜单不隐藏
     *     },
     *     ani: true//default true,
     *     relTarget: 相对元素的偏移
     * }
     */
    var Menu = Popup.extend({
        module: module,
        target: null,//装饰的 DOM or Jquery 对象
        visible: false,
        events: {
            'click -> li': 'onselect',
            'click ->input[type=checkbox]':'oncheck',
            'mousedown -> li' : 'onmousedown',
            'mouseup -> li' : 'onmouseup',
        },
        init: function ( opts ){
            this.opts = $.extend(true, {
                ani: true,
                relTarget: null,//相对某个元素偏移,
                inputName: utils.randomStr(10),
                multiCheck:false,
                autoDestroy:false,
                duration: 200
            }, opts);
            
            this.onmouseup = this.onmouseup.bind(this);
            
            this.el = $(document.createElement('div'));
            this.el.addClass('g-menu-con');
            
            this.el.appendTo(document.body);
            
            this.toggleMenu = $.proxy(this.toggleMenu, this);
            this.onDocClick = $.proxy(this.onDocClick, this);
            this.onKeyDown = this.onKeyDown.bind(this);
            
            this.el.html(_.template(this.getTpl('ui-menu-tpl'), this.opts));
            this.list = this.opts.list;
            this.multiCheck = this.opts.multiCheck;
            this.position();
            $(window).resize($.proxy(this.position, this));
            var me = this;
            if(this.opts.autoDestroy){
                connection.on('connection', function(){
                      if(!connection.isConnect()){
                              me.hide();
                    }
                });                
            }

        },
        
        onmousedown: function(e){
            var $target = e.target.tagName.toLowerCase() == 'li' ? $(e.target) : $(e.target).parents('li');
            $target.addClass('active');
            $(document).on('mouseup', this.onmouseup);
        },
        
        onmouseup: function(e){
            $('.g-menu-con .active').removeClass('active');
            $(document).off('mouseup', this.onmouseup);
        },
        oncheck:function(event){
            var index = $(event.target).parents(".g-menu-item").attr("data-item");
            if($(event.target).parents(".g-menu-item").find("input[type=checkbox]").attr("checked")){
                 this.setChecked(index,false);
            }else{
                 this.setChecked(index,true);
            }
            var temp = [];
            console.log(this.list);
            this.list.forEach(function(item){
                if(item.checked){
                    temp.push(item);
                }
            });
            this.trigger("change",temp);
           event.stopPropagation();
        },
        updateList: function(list){
            this.list = list;
            this.el.html(_.template(this.getTpl('ui-menu-tpl'), {
                list: list,
                multiCheck:this.multiCheck,
                inputName: utils.randomStr(10)
            }));
            
            var $gmenu = this.el.find('.g-menu');
            if(this.el.hasClass('show')){
                $gmenu.css({y: 0});
            }
            if(this.el.hasClass('hide')){
                $gmenu.css({y: '-100%'});
            }
        },
        /*如果多选，清除其他*/
        onselect: function(e){
            var $target = e.target.tagName.toLowerCase() == 'li' ? $(e.target) : $(e.target).parents('li');
            
            var index = $target.attr('data-item');
            var dataItem = this.get(index);
            var type = dataItem.type;
            
            e.preventDefault();
            if(type && (type == 'sp' || type == 'label' || (type == 'checkbox' && dataItem.hold))){
                e.stopPropagation();
            }
            
            if(type != 'sp' && type != 'label'&&!this.multiCheck){
                this.trigger(Menu.SELECT, dataItem, e);
            }else  if(e.target.tagName.toLowerCase() != 'input'&&this.multiCheck){
                    this.el.find("input[type=checkbox]").removeAttr("checked");
                    this.list.forEach(function(item){
                      item.checked = false;
                    });
                    $target.find("input[type=checkbox]").trigger("click");
            }

        },
        setChecked : function(index,checked){
            if(!this.multiCheck){
                this.el.find("input[type=radio]").removeAttr("checked");
                this.list.forEach(function(item){
                 item.checked = false;
                });
            }

            if(checked){
                if(this.multiCheck){
                    this.el.find("li[data-item="+index+"]").find("input[type=checkbox]").attr("checked","checked");
                }else{
                    this.el.find("li[data-item="+index+"]").attr("checked",true);
                    this.el.find("li[data-item="+index+"]").find("input[type=radio]").attr("checked",true);
                }
                this.get(index).checked = true;
            }else{
                this.el.find("li[data-item="+index+"]").find("input[type=checkbox]").removeAttr("checked");    
                this.get(index).checked = false;            
            }
        },
        clearChecked : function(){
            this.el.find("radio").removeAttr("checked");
            this.el.find("checkbox").removeAttr("checked");
            this.list.forEach(function(item){
                item.checked = false;
            });            
        },
        get: function(index){
             var selItem =  _.find(this.list, function(item) {
                                return item.index == index;
                             });
              return selItem;
        },
        
        getList:function(){
           return this.list;  
        },
        
        onIframeClick: function(){
            if(this.visible){
            	this.visible = false;
                this.toggleMenu();
            }
        },
        
        //切换菜单开关
        toggleMenu: function(){
            if( !this.target ){
                return;
            }
            this.visible = !this.visible;
            var me = this;
            if(this.visible){
                this.position();
                this.show();
                
                //JQuery 绑定会出现问题， 现在没找到原因， 先用原生的代替
                document.addEventListener('click', this.onDocClick, false);
                document.addEventListener('keyup', this.onKeyDown, false);
            }else{
                document.removeEventListener('click', this.onDocClick, false);
                document.removeEventListener('keyup', this.onKeyDown, false);
                this.hide();
                 
            }
        },
        onKeyDown: function(e){
            var tagName = e.target.tagName.toLowerCase();
            if(e.keyCode == 8 && tagName != "input" && tagName != "textarea"){
                if(this.visible){
                    this.visible = false;
                    var $gmenu = this.el.find('.g-menu');
                    $gmenu.css({
	                    y: 0
	                });
	                this.el.removeClass('show').addClass('hide');
	                document.removeEventListener('click', this.onDocClick, false);
	                document.removeEventListener('keyup', this.onKeyDown, false);
                }
            }
        },
        
        position: function(){
            if(!this.opts.relTarget && !this.target){
                return;
            }
            
            var relTarget = this.opts.relTarget || this.target;
            var offset = relTarget.offset();
            var x = 0, y =0;
            
            if(typeof this.opts.x != 'undefined'){
                x = this.opts.x;
            }else if(typeof this.opts.rightOffsetX != 'undefined'){
                x = $(window).width() - this.el.outerWidth() - this.opts.rightOffsetX;
            }else{
                x = offset.left;
            }
            
            if(typeof this.opts.y != 'undefined'){
                y = this.opts.y;
            }else if(typeof this.opts.rightOffsetY != 'undefined'){
                y = $(window).height() - this.opts.rightOffsetY;
            }else{
                y = offset.top + relTarget.outerHeight();
            }
            var ww = $(window).width();
            var hh = $(window).height();
            
            if(x + this.el.width() > ww){
                x = ww - this.el.width();
            }
            
            if(y + this.el.height() > hh){
                y = offset.top - this.el.height();
            }
            
            this.setPosition(x, y); 
        },
        
        //响应全局事件
        onDocClick: function ( e ){
        	
            if( this.target ){
                var tt;
                if('length' in this.target){
                    tt = this.target[0];
                }else{
                    tt = this.target;
                }
                if(!tt.contains(e.target)){
                    this.toggleMenu();
                }
            }else{
                if(this.visible){
                	this.visible = false;
                    this.toggleMenu();
                }
            }
        },
        delegateEvent : function(elem,eventName,callback){
            this.el.undelegate($(elem),eventName);
            var me = this;
            this.el.delegate($(elem),eventName,function(event){
                var index = $(event.target).parents(".g-menu-item").attr("data-item");
                var data_item = me.get(index);
                callback&&callback(data_item);
                event.stopPropagation();
            });
        },
        decorate: function ( target ){
            if(this.target){
                return;
            }
            this.target = target;
            this.position();
            this.target.off('click', this.toggleMenu);
            this.target.on('click', this.toggleMenu);
        },
        
        undecorate: function(){
            if(this.target){
                this.target.off('click', this.toggleMenu);
                this.target = null;
            }
        },
        
        destroy: function(){
            $(document).off('click', this.onDocClick);
            app.eventCenter.off('iframeClick', this.onIframeClick);  
            
            this.el.undelegate();
            this.el.remove();
        },
        
        show: function(){
            this.el.removeClass('hide').addClass('show');
            var $gmenu = this.el.find('.g-menu');
            if(this.opts.ani){
                $gmenu.transition({
                    y: 0
                }, this.opts.duration, 'ease');
            }else{
                $gmenu.css({y: 0});
            }
            
            this.trigger('show');
        },
        focusPrev:function(){
            var index = this.el.find("li.cur").index();
            if(index==-1){
                this.el.find("li").removeClass("cur");
                return;
            }
            this.el.find("li:eq("+(index-1)%this.list.length+")").mouseover().addClass("cur").siblings().removeClass("cur");
        },
        focusNext:function(){
            var index = this.el.find("li.cur").index();
            console.log("当前索引", index);
            if(index==this.list.length-1){
                this.el.find("li").removeClass("cur");
                return;                
            }
            this.el.find("li:eq("+(index+1)%this.list.length+")").mouseover().addClass("cur").siblings().removeClass("cur");
        },
        getCurFocus:function(){
               var curIndex = this.el.find("li.cur").attr("data-item");
               var selItem =  _.find(this.list, function(item) {
                                return item.index == curIndex;
                        });
              return selItem;
        },
        hide: function(){
            var el = this.el;
            var $gmenu = this.el.find('.g-menu');
            
            if(this.opts.ani){
                $gmenu.transition({
                    y: '-100%'
                }, this.opts.duration, 'ease', function(){
                    el.removeClass('show').addClass('hide');
                });
            }else{
                $gmenu.css({
                    y: 0
                });
                el.removeClass('show').addClass('hide');
            }
            this.trigger('close');
            /*add by 杨天  发现断开连接后 不会解绑   所以在menu消失的时候解绑*/
            this.visible = false;
            document.removeEventListener('click', this.onDocClick, false);
            document.removeEventListener('keyup', this.onKeyDown, false);
        }
    });
    
    Menu.SELECT = 'select';
    Menu.MULTI_CHANGE ="change";
    return Menu;
}); 