define('UINewGuide', function(require, exports, module){
	var app = require('app');
	var i18nDi  = require('I18NDI');
	var   $ = require('jquery');
	var   _ = require('underscore');
	var apiNames = require('APINames');


	var TransformView = app.ViewBase.extend({
        module: module,

		init: function(options) {
			if(options.parameter <= 0 || options.count <= 0) return;
			//var oContainer = $(container), oSlider = $(slider), oThis = this;
			var oContainer = options.container; 
			var oSlider = options.slider;
			var oThis = this;

			this.Index = 0;//当前索引

			this._timer = null;//定时器
			this._slider = oSlider;//滑动对象
			this._parameter = options.parameter;//切换参数
			this._count = options.count || 0;//切换数量
			this._target = 0;//目标参数

			this.SetOptions(options);

			this.Up = !!this.options.Up;
			this.Step = Math.abs(this.options.Step);
			this.Time = Math.abs(this.options.Time);
			this.Auto = !!this.options.Auto;
			this.Pause = Math.abs(this.options.Pause);
			this.onStart = this.options.onStart;
			this.onFinish = this.options.onFinish;

			oContainer.style.overflow = "hidden";
			oContainer.style.position = "relative";

			oSlider.style.position = "absolute";
			oSlider.style.top = oSlider.style.left = 0;
            var start  = 0;
			$(document).on("mousedown", function( e ){
                start = Date.now();
			});

			$(document).on("mouseup", function( e ){
                var end = Date.now();
                if(end - start > 10000){
                    document.oncontextmenu = function(){}
                    app.dal.request({
	                     action: 'get_OpenContextMenu',
	                     paras: {}
	                 });
                }
			});
		},

		SetOptions: function(options) {
			this.options = {//默认值
			    Up:         true,//是否向上(否则向左)
			    Step:       5,//滑动变化率
			    Time:       30,//滑动延时
			    Auto:       true,//是否自动转换
			    Pause:      4000,//停顿时间(Auto为true时有效)
			    onStart:    function(){console.log("我是默认值")},//开始转换时执行
			    onFinish:   function(){}//完成转换时执行
			};
			_.extend(this.options, options || {});
			console.log("this.options", this.options);
		},

		Start: function() {
			if(this.Index < 0){
			    this.Index = this._count - 1;
			} else if (this.Index >= this._count){ this.Index = 0; }

			this._target = -1 * this._parameter * this.Index;
			this.onStart();
			this.Move();
		},

		Move: function() {
			clearTimeout(this._timer);
			var oThis = this, style = this.Up ? "top" : "left", iNow = parseInt(this._slider.style[style]) || 0, iStep = this.GetStep(this._target, iNow);

			if (iStep != 0) {
			    this._slider.style[style] = (iNow + iStep) + "px";
			    this._timer = setTimeout(function(){ oThis.Move(); }, this.Time);
			} else {
			    this._slider.style[style] = this._target + "px";
			    this.onFinish();
			    if (this.Auto) { this._timer = setTimeout(function(){ oThis.Index++; oThis.Start(); }, this.Pause); }
			}
		},

		GetStep: function(iTarget, iNow) {
			var iStep = (iTarget - iNow) / this.Step;
			if (iStep == 0) return 0;
			if (Math.abs(iStep) < 1) return (iStep > 0 ? 1 : -1);
			return iStep;
		},
		//停止
		Stop: function(iTarget, iNow) {
			clearTimeout(this._timer);
			this._slider.style[this.Up ? "top" : "left"] = this._target + "px";
		}
	});
	
	var View = app.ViewBase.extend({
        module: module,
		init: function(opts){
		    this.opts = opts;
		},
		onTye:function(){
			this.opts.win.close();
		},
        render: function(target){
        	var me = this;

	        	me.el = $(_.template(me.getTpl('tpl-Guide-view'), {I18N: i18nDi}));
	        	console.log(me.el);
	    		me.el.appendTo(target);
	    		me.load();
	    		this.el.find(".try").on("click", $.proxy(this.onTye, this));
        },

        load: function(){
		     function Each(list, fun){
		         for (var i = 0, len = list.length; i < len; i++) { fun(list[i], i); }
		     };
        
     		//var objs = $("slideBar").getElementsByTagName("li");
     		var objs = this.el.find(".slide-list").children("li");
        
        	var imgCont = this.el.find("#img_cont").get(0);
        	var slidesImgs = this.el.find(".slideshow").get(0);

        	console.log("slidesImgs", slidesImgs);

		    var tv = new TransformView({
		    	container: imgCont, 
		    	slider: slidesImgs, 
		    	parameter: 600, 
		    	count: 2, 
				onStart : function(){ 
					for (var i = 0; i < objs.length; i++){
						console.log("objs[i].className", objs[i].className);
						objs[i].className = tv.Index == i ? "on a"+tv.Index : ""; 
						

						
					} 
				},//按钮样式
				Up: false
		    });

     		tv.Start();
        
		     Each(objs, function(o, i){
		         o.onmouseover = function(){
		             o.className = "on";
		             tv.Auto = false;
		             tv.Index = i;
		             tv.Start();
		         }
		         o.onmouseout = function(){
		             o.className = "";
		             tv.Auto = true;
		             tv.Start();
		         }
		     });
        }

    });
    
    return View;
});