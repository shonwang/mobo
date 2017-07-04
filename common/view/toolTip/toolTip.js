define('UItoolTip', function(require, exports, module) {
    var Popup = require('UIPopup');
    var $ = require("jquery");
    var _ = require('underscore');
    var  utils = require('utils');
    var connection = require('connectionMgr');

    var UIToolTip = Popup.extend({
        module : module,
        events : {
            // 'click -> .ctn' : 'onclick'
        },

        init : function(opts) {
            UIToolTip.__super__.init.apply(this, arguments);
            this.el.attr("class", "g-tooltip");
            this.el.html(this.getTpl('tpl-tool-tip-l'));
            // target       :   element        // 触发元素对象
            this.defaults = {
                content     :   "", // String   工具提示的内容
                maxWidth    :   240,           // Number   工具提示的最大显示宽度
                position    :   'bottom',         // String   工具提示显示的方位
                triggerType :   'mouseenter',  // String   触发工具提示的事件类型
                space       :   12,             // Number   工具提示离触发元素的间距
                background  :   "normol"        //String 背景色
            };
            this.contentMap = {};
            this.targetMap = {};
            this.positionMap = {};
            this.isVisible = false;

            if (opts) _.extend(this.defaults, opts);
            if (this.defaults.background === "black") this.el.addClass("g-home-sd-tips");
            this.setArrowPositon();
            this.setContent(this.defaults.content);
            if (this.defaults.target) this.bindTriggerEvent();

            connection.on('connection', function(status){
                if(!connection.isConnect()){
                    this.el.remove();
                    this.rendered = false;
                }
            }.bind(this));
        },

        setArrowPositon: function(){
            //根据设置改变箭头方向,tip位置与箭头的位置相反，比如tip在上端时，箭头朝下
            var $contentNode = this.el.find(".g-tooltip-content");

            switch (this.defaults.position){
                case "top":
                    $contentNode.attr("class", "g-tooltip-content arrow-bottom");
                    break;
                case "bottom":
                    $contentNode.attr("class", "g-tooltip-content arrow-top");
                    break;
                case "right":
                    $contentNode.attr("class", "g-tooltip-content arrow-left");
                    break;
                case "left":
                    $contentNode.attr("class", "g-tooltip-content arrow-right");
                    break;
            }
        },

        bindTriggerEvent: function(){
            var $target = $(this.defaults.target);
            // var self.openTimer, self.closeTimer;
            if(this.defaults.triggerType === 'mouseenter'){
                var self = this;

                $target.on('mouseenter', function(event){
                    if (self.openTimer) clearTimeout(self.openTimer);
                    if (self.closeTimer) clearTimeout(self.closeTimer);     
                    
                    self.openTimer = setTimeout(function(){
                        self.show(event);
                        self.isVisible = true;
                    }, 300);
                    //event.stopPropagation();
                    //event.preventDefault();
                });

                $target.on('mouseleave', function(event){
                    if (self.openTimer) clearTimeout(self.openTimer);
                    if (self.closeTimer) clearTimeout(self.closeTimer);

                    self.closeTimer = setTimeout(function(){
                        self.hide();
                        self.isVisible = false;
                    }, 300);
                    //event.stopPropagation();
                    //event.preventDefault();
                });

                this.el.find(".g-tooltip-content").on('mouseenter', function(){
                    clearTimeout(self.closeTimer);
                });

                this.el.find(".g-tooltip-content").on('mouseleave', function(){
                    self.hide();
                });
            } else {
                //TODO 其他触发方式
            }
        },

        show: function (event){
            if (!this.rendered) this.render(document.body);
            if (event) {
                var randomID = $(event.target).attr("tip-id");
                if (randomID){
                    var content = this.contentMap[randomID];
                    this.defaults.target = this.targetMap[randomID];
                    this.defaults.position = this.positionMap[randomID];
                    this.setContent(content);
                    this.setArrowPositon();
                    this.el.show();
                    this.setPosition();
                }
            }
        },

        clearTimer: function(){
            if (this.openTimer) clearTimeout(this.openTimer);
            if (this.closeTimer) clearTimeout(this.closeTimer); 
        },

        hide: function (content){
            this.el.hide();
        },

        setContent: function( component ){
            if(typeof component === 'string'){
                this.el.find(".g-wrapper").html(component);
            }else if(typeof component === 'object'){
                component.render(this.el.find(".g-wrapper"));
            }
        },

        setOption: function(options){
            _.extend(this.defaults, options);
            var randomID = $(this.defaults.target).attr("tip-id");
            var $target = $(this.defaults.target);
            if (randomID){
                $target.removeAttr("tip-id");
                $target.off('mouseenter');
                $target.off('mouseleave');
                delete this.targetMap[randomID];
                delete this.positionMap[randomID];
                delete this.contentMap[randomID];
            }
            randomID = utils.randomStr(9);
            $target.attr("tip-id", randomID);
            this.targetMap[randomID] = this.defaults.target;
            this.positionMap[randomID] = this.defaults.position;
            this.contentMap[randomID] = this.defaults.content;
            this.bindTriggerEvent();
        },

        setPosition: function(){
            var cssMap = {};
            //获取tip的宽度和高度
            var wrapElem = this.el.find(".g-tooltip-content");
            wrapElem.removeAttr("style");
            var wrapWidth = wrapElem.outerWidth();
            var wrapHeight = wrapElem.outerHeight();
            var space = this.defaults.space;
            if (wrapWidth > this.defaults.maxWidth) {
                wrapWidth = this.defaults.maxWidth;
                wrapElem.outerWidth(wrapWidth);
            }
            var $arr = this.el.find(".arr");
            if (this.defaults.position === "top" || 
                this.defaults.position === "bottom"){
                $arr.css("left", "50%");
            } else {
                $arr.css("top", "50%");
            }
            var arrLeft = $arr.position().left;
            var arrTop = $arr.position().top;
            //获取触发元素的位置、高度、宽度
            var $target = $(this.defaults.target);
            var offsetTarget = $target.offset();
            var offsetTop = offsetTarget.top;         
            var offsetLeft = offsetTarget.left;
            targetWidth = $target.outerWidth();
            targetHeight = $target.outerHeight();  
            //获取窗口的宽度和高度
            var winWidth = $(window).width();
            var winHeight = $(window).height();

            if (this.defaults.position === "top" ||
                this.defaults.position === "bottom") {
                //tip的位置 = 触发元素的位置 + 触发元素宽度的一半 - tip宽度的一半
                cssMap.left = offsetLeft + targetWidth / 2 - wrapWidth / 2;
                //防止溢出窗口，两像素误差
                if (cssMap.left + wrapWidth > winWidth){
                    var len = cssMap.left + wrapWidth - winWidth;
                    cssMap.left = cssMap.left - len - 2;
                    $arr.css("left", arrLeft + len + 2 + "px");
                }
                if (cssMap.left < 0){
                    $arr.css("left", cssMap.left + arrLeft + 2 + "px");
                    cssMap.left = 2;
                }
                cssMap.left = cssMap.left + 'px';
            }
            if (this.defaults.position === "top") {
                cssMap.top = offsetTop - wrapHeight - space;
                if (cssMap.top < 0){
                    this.defaults.position = "bottom";
                    this.setArrowPositon();
                    cssMap.top = offsetTop + targetHeight + space;
                }
                cssMap.top = cssMap.top + 'px';
            }
            if (this.defaults.position === "bottom") {
                cssMap.top = offsetTop + targetHeight + space;
                //如果下面的距离无法容纳tip，tip移动到上面
                if (cssMap.top + wrapHeight > winHeight){
                    this.defaults.position = "top";
                    this.setArrowPositon();
                    cssMap.top = offsetTop - wrapHeight - space;
                }
                cssMap.top = cssMap.top + 'px';
            }

            if (this.defaults.position === "right" ||
                this.defaults.position === "left"){
                cssMap.top = offsetTop - (wrapHeight / 2 - targetHeight / 2);
                if (cssMap.top < 0){
                    $arr.css("top", cssMap.top + arrTop - 2 + "px");
                    cssMap.top = 2;
                }
                if (cssMap.top + wrapHeight > winHeight){
                    var len = cssMap.top + wrapHeight - winHeight;
                    cssMap.top = cssMap.top - len - 2;
                    $arr.css("top", arrTop + len + 2 + "px");
                }
                cssMap.top = cssMap.top + 'px';
            }
            if (this.defaults.position === "left"){
                cssMap.left = offsetLeft - wrapWidth - space;
                if (cssMap.left < 0){
                    this.defaults.position = "right";
                    this.setArrowPositon();
                    cssMap.left = offsetLeft + targetWidth + space;
                }
                cssMap.left = cssMap.left + 'px';
            }
            if (this.defaults.position === "right"){
                cssMap.left = offsetLeft + targetWidth + space;
                if (cssMap.left + wrapWidth > winWidth){
                    this.defaults.position = "left";
                    this.setArrowPositon();
                    cssMap.left = offsetLeft - wrapWidth - space;
                }
                cssMap.left = cssMap.left + 'px';
            }

            this.el.css(cssMap);
        }
    });

    return UIToolTip;
});
