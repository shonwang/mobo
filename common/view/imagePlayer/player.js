define('UIImagePlayer', function(require, exports, module){
    var $ = require('jquery');
    var utils=require('utils');
    var app = require('app');
    var _ = require('underscore');
    var i18nDi  = require('I18NDI');
    var apiNames = require('APINames');
    /*
    var DEG_MAP = {
        '0': 0,
        '90': 1,
        '180' : 2,
        '270' : 3,
        '-90' : 5,
        '-180' : 6,
        '-270' : 7,
        '-360' : 0,
        '-0' : 0
    };*/
    var DEG_MAP = {
        '0': 0,
        '90': 1,
        '180' : 2,
        '270' : 5,
        '-90' : 3,
        '-180' : 6,
        '-270' : 7,
        '-360' : 0,
        '-0' : 0
    };

    var View = app.ViewBase.extend({
        module: module,
        list: [],
        index: 0,
        
        roateDeg: 0,
        
        events: {
            'click -> .close': 'onClose',
            'click -> .pre': 'onPre',
            'click -> .next': 'onNext',
            'click -> .rotate-left': 'onRotateLeft',
            'click -> .rotate-right': 'onRotateRight',
            'click -> .wallpaper': 'onSetWallpaper',
            'click -> .downWallpaper': 'onDownWallpaper',
            'click -> .thumb img' : 'onSelectImage',
            'click -> .ico-delete' : 'onDelete'
        },
        
        init: function(opts){
            this.opts.container = opts.container;
            this.opts.showDownload = opts.showDownload;
            this.opts.showDelete = opts.showDelete || false;
            this.opts.showRotate = opts.showRotate || true;

            this.el = typeof opts.container == 'string' ? $('#'+opts.container) : opts.container;
            this.el.find(".g-image-player").remove();
            this.el.append(_.template(this.getTpl('tpl-image-player'), {I18N: i18nDi}));
            
            if(!this.opts.showDownload){
                this.el.find('.downWallpaper').hide();
            }
            if(opts.showDelete){
                this.el.find('.ico-delete').show();
            }
            if(!opts.showRotate){
                this.el.find('.rotate-left').hide();
                this.el.find('.rotate-right').hide();
            }
            if (opts.showArrow === false){
                this.el.find('.arrow').hide();
            }
            if (opts.showThumb === false){
                this.el.find('.thumb').hide();
            }
            app.eventCenter.on('resourcecloseimgplayer',this.onClose.bind(this));
            $(window).resize(this.onResize.bind(this));
            
            this.onGlobalKeyup = this.onGlobalKeyup.bind(this);
        },
        
        onDelete: function(){
            this.trigger('delete');
        },
        
        onResize: function(){
            //this.play();
        },
        
        onSetWallpaper: function(){
            this.trigger('setWallpaper');
        },
        onDownWallpaper:function(){
            this.trigger('downWallpaper');
        },
        onSelectImage: function(e){
            this.list[this.index].rotateAngle = this.roateDeg;
            var $target = $(e.target);
            var data = $target.data('data');
            if(data && !$target.hasClass('cur')){
                this.index = this.list.indexOf(data);
                this.play();
            }
        },
        
        setRotate: function(deg, diff){
            var $img = this.el.find('.container img');
            var $container = this.el.find('.container');
            
            var conH = $container.height();
            var conW = $container.width();
            
            $img.css('maxWidth', deg % 180 == 0 ? conW : conH);
            $img.css('maxHeight', deg % 90 == 0 ? conH : conW);
            
            $img[0].style.webkitTransform = 'rotate(' + deg + 'deg)';

            this.trigger("rotate", deg, diff);
        },
        
        onRotateLeft: function(){
            if(!this.isRotate()){
                return;
            }
            this.roateDeg -= 90;
            if (this.roateDeg <= -360){
                this.roateDeg = 0;
            }
            this.setRotate(this.roateDeg, -90);
        },
        
        onRotateRight: function(){
            if(!this.isRotate()){
                return;
            }
            console.log("旋转前角度：", this.roateDeg)
            this.roateDeg += 90;
            if (this.roateDeg >= 360){
                this.roateDeg = 0;
            }
            console.log("旋转后角度：", this.roateDeg)
            this.setRotate(this.roateDeg, 90);
        },
        
        isRotate: function(){
            this.lastTime = this.lastTime || 0;
            var now = Date.now();
            
            if(now - this.lastTime > 500){
                this.lastTime = Date.now();
                return true;
            }  
            return false;
        },
        
        onPre: function(){
            this.list[this.index].rotateAngle = this.roateDeg;
            this.index = this.index - 1;
            if(this.index<0){
                this.index = this.list.length - 1;
            }
            this.play();
            this.trigger('pre');
        },
        
        onNext: function(){
            this.list[this.index].rotateAngle = this.roateDeg;
            this.index = this.index + 1;
            if(this.index >= this.list.length){
                this.index = 0;
            }
            this.play();
            this.trigger('next');
        },
        
        setPlayList: function(list){
            this.list = list;
            if(this.list.length==1){
                this.el.find(".pre").hide();
                this.el.find(".next").hide();
            }else{
                this.el.find(".pre").show();
                this.el.find(".next").show();
            }
        },
        
        setIndex: function(index){
            this.index = index;
        },
        
        getBigPic: function(){},
        
        play: function(){
            var data = this.list[this.index];
            var $img = this.el.find('.container img');
            var $container = this.el.find('.container');
            
            var conH = $container.height();
            var conW = $container.width();
            this.roateDeg=data.rotateAngle;

            $img.removeAttr('width');
            $img.removeAttr('height');
            
            $img.css('maxWidth', '100%');
            $img.css('maxHeight', '100%');
            
            $img[0].style.webkitTransform = 'rotate(' + data.rotateAngle + 'deg)';
            //$img[0].style.webkitTransform = 'rotate(0deg)';
            
            $img.removeClass('sw');
            $img.addClass("hd");
            $img.attr('src','');
            var curData = this.list[this.index];
            
            this.getBigPic((function(url){
                curData.originPic = url;
                $img[0].onload = (function(){
                    $img.removeClass('hd');
                    $img.addClass('sw');
                }).bind(this);
                
                this.setImage(url);
            }).bind(this));
            
            var thumblist = this.getCurList();
            
            this.el.find('.thumb img').hide();
            thumblist.forEach((function(item, index){
                var $img = this.el.find('.thumb img:eq(' + index + ')');
                
                if($img.length === 0){
                    $img = $('<img></img>');
                    this.el.find('.thumb').append($img);
                }
                $img.data('data', item);
                $img.show();
                $img.attr('src', item.picUrl);
                $img.attr('data-imageid', item.id);
                
                //$img.removeAttr('rotate');
                $img.attr('rotate', item.rotateAngle);
                //$img[0].style.webkitTransform = 'rotate(0deg)';
                $img[0].style.webkitTransform = 'rotate(' + item.rotateAngle + 'deg)';
                
                if(this.list[this.index] === item){
                    $img.addClass('cur');
                }else{
                    $img.removeClass('cur');
                }
            }).bind(this));
            utils.tooltip.attach(this.el.find('.action button'));
            this.trigger('play', this.index);
        },
        
        getCurList: function(){
            var list = [];
            var start, end;
            
            if(this.list.length > 7){
                start = Math.max(this.index - 3, 0);
                end = Math.min(this.index + 3, this.list.length);
                
                list = this.list.slice(start, end);
                
                var diff = end - start - 7;
                
                if(diff < 0){
                    end = Math.min(Math.abs(diff) + end, this.list.length);
                    list = this.list.slice(start, end);
                    
                    diff = end - start - 7;
                    if(diff < 0){
                         start = Math.max(start + diff, 0);
                    }
                }
                
                list = this.list.slice(start, end);
            }else{
                list = this.list.slice(0, this.list.length);
            }
            
            return list;
        },
        
        setImage: function(url){
            this.el.find('.container img').attr('src', url);
        },
        
        onClose: function(){
            this.hide();
            this.trigger('hide');
        },
        
        onGlobalKeyup: function(e){
            if(e.keyCode == 37){
                this.onPre();
            }else if(e.keyCode == 39){
                this.onNext();
            }else if (e.keyCode === 27){
                this.onClose();
            }
        },

        show: function(){
            this.el.show();
            
            var hash = app.getCurHashParas();
            hash.pageState = hash.pageState || {};
            hash.pageState.vt = 'img_player';
            app.navigate(hash);
            
            $(document).off('keyup', this.onGlobalKeyup);
            $(document).on('keyup', this.onGlobalKeyup);
        },

        showSingle: function(){
            this.el.find('.container img').addClass("sw");
            this.el.show();
        },

        hide: function(){
            this.el.hide();
            this.el.find('.thumb img').each(function(){
                $(this).removeAttr('rotate');
            });
            $(document).off('keyup', this.onGlobalKeyup);
        }
    });
    
    View.DEG_MAP = DEG_MAP;
    return View; 
});
