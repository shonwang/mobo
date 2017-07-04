define('scrollerProxy', function(require, exports, module){
    var app = require('app');
    var   $ = require('jquery');
    
    /*
     *@constructor ProxyView {Function}
     *@paras opts {
     *     container: '',
     *     rowHeight: 25,
     *     length: 1000
     * }
     */
    var ProxyView = app.ViewBase.extend({ 
        module: module,
        index: 0,
        events: {
            
        },
        
        init: function( opts ){
            this.el = typeof opts.container == 'string' ? $('#' + opts.container) : opts.container;
            this.el.html(this.getTpl('scroller-container'));
            this.delegate();
            
            this.length = this.opts.length;
            this.rowHeight = this.opts.rowHeight;
            
            this.$content = this.el.find('.g-scr-prx-content');
            this.$scroller = this.el.find('.g-scr-prx-scroller');
            
            this.$content.on('mousewheel', $.proxy(this.mouseWheel, this));
            this.$scroller.on('scroll', $.proxy(this.scroll, this));
            this.calScrollerHeight();
        },
        
        calScrollerHeight: function( ){
            var $gline = this.$scroller.find('.g-line');
            $gline.height(this.length * this.rowHeight);
        },
        
        scroll: function( ev ){
            var preIx = this.index;
            this.scrTop = this.scrTop || 0;
            var scrTop = ev.target.scrollTop;
            
            this.index = Math.floor(ev.target.scrollTop / this.rowHeight);
            
            var screenDataNum = this.getOneScreenNum();
            if(this.length - screenDataNum <= this.index && scrTop > this.scrTop){
                this.index = this.length - screenDataNum + 1;
            }
            
            if(this.index == preIx){
                return;
            }
            
            this.trigger('renderOneScreen', {
               index: this.index,
               screenNum: this.getOneScreenNum(),
            });
            this.scrTop = scrTop;
        },
        
        mouseWheel: function( evt ){
            evt.preventDefault && evt.preventDefault();
            if(this.length === 0)return;
            
            var screenDataNum = this.getOneScreenNum();
            var curIndex = this.index;
            
            if(screenDataNum > this.length){
                return;
            }
            
            if(evt.originalEvent.wheelDelta > 0){
                this.index -= 1;
            }else{
                this.index += 1;
            }
            
            //往上滚轮，有 index 小于0的情况
            if(this.index <= 0)this.index = 0;
            if(this.length - screenDataNum < this.index){
                this.index = this.length - screenDataNum + 1;
            }
            
            if(this.index == curIndex){
                return;
            }
            
            this.setScrollTopByIndex(this.index);
            
            this.trigger('renderOneScreen', {
               index: this.index,
               screenNum: screenDataNum,
            });
        },
        
        setScrollTopByIndex: function( index ){
            this.index = index;
            //尽量避免阻塞内容的渲染
            requestAnimationFrame($.proxy(function(){
                this.$scroller.prop('scrollTop', this.index * this.rowHeight);
            }, this));
        },
        
        setLength: function( len ){
            this.length = len;
            this.calScrollerHeight();
        },
        
        getIndex: function( ){
            return this.index;
        },
        
        getOneScreenNum: function( ){
            var ch = this.$content.height();
            var rh = this.rowHeight || 25;
            
            return Math.ceil(ch / rh);
        },
        addContent: function( component ){
            if(typeof component == 'string'){
                this.$content.html(component);
            //when component is dom object.  
            }else if(component.appendChild){
                this.$content.append(component);
            }else{
                component.render(this.$content);
            }
        }
    });
    
    return ProxyView;
});