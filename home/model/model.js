define('homeModel', function(require, exports, module){
    var app = require('app');
    var apiNames = require('APINames');
    var _ = require('underscore');
    var utils = require('utils');
    var connection = require('connectionMgr');
    var $ = require('jquery');
    
    var Model = app.ModelBase.extend({
        snapShootUrl: '',
        init: function(){
            this.binding(apiNames.BIND_SET_SCREEN_BLACK, function(res){
                this.trigger('screenswitch', res.screenIsOn);
            }.bind(this));
        },
        
        getScreenShot: function(callback){
            var me = this;
            var count = 0;
            
            var ss = _.bind(function(){
                this.request({
                    action: apiNames.REQ_SCREENSHOT,
                    callback: function( res ){
                        if(res.info && res.info.sScreenShotImagePath){
                            me.snapShootUrl = res.info.sScreenShotImagePath;
                        }
                        
                        var image = new Image();
                        image.src = me.snapShootUrl;
                        image.onload = function(){
                             callback && callback.apply(me, [res]);
                        }
                        image.onerror = function(){
                             count++;
                             if(count <3){
                                 ss();
                             }else{
                                 callback && callback.apply(me, [{status: 1, info:{}}]);
                             }
                        }
                    }
                });
            }, this);
            
            if(connection.isConnect()){
                ss();
            }else{
                connection.on('connection', function(status){
                    if(this.isConnect()){
                        count = 0;
                        ss();
                    }
                });
            }
        },
        
        saveSnapShoot: function(callback){
            var me = this;
            
            var audio = require('audio');
            audio.AudioPlayer.init({
                src: 'common\\images\\capture_audio.wav'
            });
            audio.AudioPlayer.play();
            
            
            app.getUserConfig(function(res){
                var scpath = res.info.screenshootsPath;
                var date = new Date();
                var pathName = scpath + '\\Mobogenie_' +　date.format('yyyyMMdd_hhmmss') + '.png';
                    
                me.request({
                    action: apiNames.REQ_COPY_FILE,
                    paras: {
                        srcFile: me.snapShootUrl,
                        destFile: pathName,
                        bFailIfExists: 0
                    },
                    callback: function(res){
                        res.des = pathName;
                        callback && callback.call(this, res);
                    }
                });
            });
        },
        status: function(){
            
        }
    });
    
    /** 1应用 2游戏 3壁纸 4铃声 5视频 6应用专辑 7游戏专辑 8壁纸专辑 9铃声专辑 10视频专辑 11抽奖 **/
    // var NetworkResource = app.ModelBase.extend({
        
    //     init: function(){
    //         var globalConfig = require('globalConfig');
    //         this.remmendURL= globalConfig.domain.serverVoga360 + 'nclient/sjson/home/cardInfo.htm';
            
    //         this.defaultParas = {
    //             type: "get",
    //             url: this.remmendURL,
    //             async: true,
    //             dataType: 'json',
    //             cache: true, 
    //             ifModified: true,
    //             timeout: 30000
    //         };
    //     },
        
    //     fetchRecommend: function(callback){
    //         var me = this;
    //         var paras = _.extend({}, this.defaultParas);
            
           
    //         paras.success = function(res){
    //             alert(JSON.stringify(res));
    //             callback && callback.call(me, res);
    //         }
            
    //          console.log('recommend resource==', paras);
    //         $.ajax(paras);
    //     }
    // });
    
    // Model.network = new NetworkResource();
    
    return Model;
});