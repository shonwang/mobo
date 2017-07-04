define('canvas', function(require, exports, module){
	var   $ = require('jquery');
    var _ = require('underscore');
	function CircleProgress(obj){
		this.parent=null;
		this.ctx=null;
		this.radius=null;
		this.lineWidth=null;
		this.progressColor=null;
		this.bgProgressColor=null;
		this.fillStyle=null;
		this.canvas=null;
		this.set(obj);
		this.init();
	}
	_.extend(CircleProgress.prototype,{
		set:function(obj){
			for(var i in obj){
				if(typeof obj[i]!='undefined'){
					this[i]=obj[i];
				}
			};
		},
		init:function(){
			if(this.parent[0]){
				this.canvas=$('<canvas width="'+this.radius*2+'" height="'+this.radius*2+'"></canvas>').appendTo(this.parent)[0];
			}else{
				console.error('缺少parent参数');
				return;
			}
			var ctx=this.canvas.getContext("2d");
			this.ctx=ctx; 
			
		},
		destroy:function(){
			this.parent.find('canvas').remove();
		},
		clear:function(){
			if(this.ctx){
				this.ctx.clearRect(0, 0,this.radius*2,this.radius*2);
			}
		},
		drawBg:function(){
			if(this.ctx){
				this.ctx.clearRect(0,0,this.radius*2,this.radius*2);
				this.ctx.beginPath();
				this.ctx.strokeStyle =this.progressColor;
			    this.ctx.lineWidth = this.lineWidth;
			    var arcRadius=this.radius-this.lineWidth;
			    this.ctx.arc(this.radius, this.radius, arcRadius,-Math.PI/2,Math.PI*2-Math.PI/2, false);
			    this.ctx.stroke();   
			    this.ctx.closePath();
			}
		},
		drawProgress:function(progress){
			if(this.ctx){
			    this.ctx.beginPath();
			    this.ctx.strokeStyle =this.progressColor;  
			    this.ctx.lineWidth = this.lineWidth+2; 
			    var arcRadius=this.radius-this.lineWidth-1.5;
			    this.ctx.arc(this.radius,this.radius,arcRadius,-Math.PI/2,Math.PI*2*progress/100-Math.PI/2,false);
			    this.ctx.stroke();
			    this.ctx.closePath();
			}
		},
		end:function(){
            
        },
        onended:function(){

        },
        error:function(e){

        }
	});
	exports.CircleProgress=CircleProgress;
});
define('audio', function(require, exports, module){
    var   $ = require('jquery');
    var _ = require('underscore');
    var events = require('event');
    var AudioPlayer=_.extend({
		type:0,
		src:'',
		// isInit:false,
		loadprogress:0,
		init:function(obj){
			this.reset();
			this.set(obj);
			this.audioInit();
			this.audio.src=this.src;
		},
		set:function(obj){
			for(var i in obj){
				if(typeof obj[i]!='undefined'){
					this[i]=obj[i];
				}
				
			};
		},
		reset:function(){
			this.type=0;
			this.src='';
			$(this.audio).off();
			this.loadprogress=0;
			if(this.circleProgress){
				this.circleProgress.destroy();
				this.circleProgress=null;
			};
		},
		audioInit:function(){
			var _this=this;
				this.creatAudio();
				$(this.audio).off();
				$(this.audio).on('loadstart',function(event) {
					if(_this.circleProgress){
						_this.circleProgress.drawBg();
					}
				});
				$(this.audio).on('timeupdate',function(event) {
					var duration=this.duration;
					var currentTime=this.currentTime;
					if(duration&&currentTime){
						if(_this.circleProgress){
							_this.circleProgress.drawBg();
							_this.circleProgress.drawProgress(currentTime*100/duration);
						}
					}
				});
				$(this.audio).on('ended',function(event) {
					if(_this.circleProgress){
						_this.circleProgress.clear();
						_this.circleProgress.end();
						_this.circleProgress.onended();
					};
				});
				$(this.audio).on('stalled',this.stalled);
				$(this.audio).on('error',function(event){
					if(_this.circleProgress){
						_this.circleProgress.error(event);
					};
				});
		},
		stalled:function(){
			console.log('网速失速！')
		},
		creatAudio:function(){
			var audio=$('.r-audio');
			if(audio[0]){
				this.audio=audio[0];
			}else{
				this.audio=$('<audio class="r-audio" style="display:none" controls="controls"></audio>').appendTo($('body'))[0];
			}
		},
		play:function(){
			this.audio.play();
		},
		pause:function(){
			this.audio.pause();
		},
		end:function(){
			try{
				this.audio.src=this.src;
			}catch(e){console.error(e)}
		},
		playOrpause:function(){
			if(this.audio.paused||this.audio.ended){
				this.play();
			}else{
				this.end();
			}
		},
		isPaused:function(){
			return this.audio?this.audio.paused:false;
		}
	}, events);
	exports.AudioPlayer=AudioPlayer;
});