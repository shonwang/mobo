define('UISmartTip', function(require, exports, module) {
    var Popup = require('UIPopup');
    var $ = require("jquery");
    var app = require('app');
    var connection = require('connectionMgr');
   

    var UIPopupTip = Popup.extend({
        module : module,
        events : {
            'click -> .ctn' : 'onclick'
        },
        init : function(opts) {
            UIPopupTip.__super__.init.apply(this, arguments);
            this.el.html(this.getTpl('tpl-smart-tip'));
            this.tipType = (opts&&opts.tipType)||1;//显示默认无，1均显示，其他不显示
            this.autoDestroy=(opts&&opts.autoDestroy)||1;
            if(this.tipType==2){
                this.el.find(".ctn").hide();
            }else if(this.tipType==3){//有标题和内容的描述tip
                this.el.find(".ctn").hide();
            }else{
                this.el.find(".ctn").show();
            }
            this.el.addClass('g-smart-tip');
            this.animating=false;
            var me = this;
            connection.on("connection",function(device){
                if(!connection.isConnect()){
                    if(this.autoDestroy==2){
                        me.hide();
                    }
                }
            });
        },
        setText : function(text) {
            this.el.find('.ctn').html(text);
        },
        addClassName : function(name){
        	this.el.find('.ctn').attr("class","ctn arrow-t arrow-bg-shadow "+ name);
        },
        gainClass : function(){
        	var classname = this.el.find('.ctn').attr("class");
        	return classname;
        },
        flushTip : function(textInfo,flushConfig){
            var me = this;
            clearTimeout(this.timer);
            me.el.find(".g-popup-fade").hide();
            this.el.html(this.getTpl('tpl-smart-flush-tip'));
            this.el.find(".info").html(textInfo);
            this.el.find(".g-popup-fade").fadeIn(500);
            this.el.addClass('ar-smart-music');
            if(flushConfig&&flushConfig.duration){
                this.timer=setTimeout(function() {
                    me.hide();
                    this.el.removeClass('ar-smart-music');
                }, flushConfig.duration);                
            }else{
                this.timer=setTimeout(function() {
                    me.hide();
                }, 500);                    
            }

        },
        flushATip : function(target) {
            var me = this;
            if (!this.animating) {
                if($(target).find(".fadeOutDown").length<1){
                    $(target).html(this.getTpl('tpl-smart-arror-tip'));
                }
                this.animating=true;
                
                $(target).find(".fadeOutDown").transition({
                    y: "60",
                    opacity: 0
                },2500,'ease',function(){
                    $(target).find(".fadeOutDown").remove();
                    me.animating=false;
                    me.hide();
                });
            }
        },
        flushMTip : function(target) {
            var me = this;
            if (!this.animating) {
                if($(target).find(".flush").length<1){
                    $(target).html(this.getTpl('tpl-m-smart-arror-tip'));
                }
                this.animating=true;

                setTimeout(function(){
                    $(target).find(".flush").remove();
                    me.animating=false;
                    me.hide();
                },1900);
            }
        },
        showDescriptTip:function(target,title,info){
            var me = this;
            var timer;
            if(this.el.find("#descriptTip").length<1){
                 this.el.html(this.getTpl("tpl-smart-descript-tip"));
                 this.el.addClass("multi-tip");
                 this.el.off("mouseenter").on("mouseenter",function(){
                     me.hideIn();
                 });
            }
            this.el.find("#descriptTip .title").html(title);
            this.el.find("#descriptTip .info").html(info);
            var pos = $(target).offset();
                if($(document).height()-pos.top<this.el.outerHeight()/3){
                    this.el.find("#descriptTip .arr").addClass("arr-lb").removeClass("arr-lc");
                }else if($(document).height()-pos.top<this.el.outerHeight()){
                    this.el.find("#descriptTip .arr").addClass("arr-lc").removeClass("arr-lb");
                }else{
                    this.el.find("#descriptTip .arr").removeClass("arr-lb").removeClass("arr-lc");
                }
               this.el.transition({
                    top:(pos.top+this.el.outerHeight())>$(document).height()?$(document).height()-this.el.outerHeight()-$(target).height()-5:pos.top-$(target).height()/3-$(target).height()-5,
                    left:pos.left+($(target).text().length>8?70:40)
                },150);  
                
               this.show();
        },
        onclick : function() {
            this.hide();
            var Friendly = require('UIFriendlyView');
            if(!connection.isConnect()){
               if(!Friendly.instance){
                    Friendly.instance=new Friendly();
                }
                Friendly.instance.clickConnect();
            }
            this.trigger('click');
        }
    });
    return UIPopupTip;
});
