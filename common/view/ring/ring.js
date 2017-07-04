define("UIRing",function(require, exports, module){
    var $ = require('jquery');
    var app = require('app');
    
    var UIRing = app.ViewBase.extend({
        init: function(opts){
            this.canvas = typeof opts.canvas == 'string' ?
                                       document.getElementById(opts.canvas) : opts.canvas;
            this.opts = $.extend({
                deg: 0
            }, this.opts);       
            this.curDeg = this.opts.deg; 
            this.startDeg = -90;
            
            this.rotating = false;
            this.strokeStyle = '#0c98ca';
        },
        
        setColor: function(style){
            this.strokeStyle = style;
        },
        
        reset: function(){
            this.startDeg = -90;
            this.curDeg = 0;
            this.strokeStyle = '#0c98ca';
            
            this.rotating = false;
            cancelAnimationFrame(this.frame);
        },
        draw: function(deg){
            var context = this.canvas.getContext('2d');
            context.clearRect(0,0,100,100);
            
            context.lineWidth = 3;
            context.strokeStyle = this.strokeStyle;
            
            var r = 15;//radius
    
            var sa= this.startDeg * Math.PI / 180;//set 0 for circle
            
            this.curDeg = deg;
            
            var curDeg = this.curDeg - 90;
            
            
            var ea= curDeg * Math.PI / 180;
    
            var t = 20;
            var l = 20;
            var direction = false;//set false for anticlockwise
    
            context.beginPath();
            context.arc(l,t,r, sa, ea, direction);
    
            //context.closePath(); // to close arc path
            context.stroke();
            //context.fill();//to fill inside arc
        },
        rotate: function(){
            var deg = 45;
            var diff = 8;
            this.startDeg = -90;
            this.rotating = true;
            
            var r = function(){
                
                this.startDeg += diff;
                deg += diff;
                
                this.draw(deg);
                this.frame = requestAnimationFrame(r.bind(this));
            }
            this.frame = requestAnimationFrame(r.bind(this));
        }
    });
    return UIRing;
});
