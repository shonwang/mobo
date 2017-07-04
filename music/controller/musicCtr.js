define('musicController', function(require, exports, module) {
    var app = require('app');
    var Model = require('musicModel');
    var connection = require('connectionMgr');
    /*音乐播放器*/
    var audio = require('audio');
    var AudioPlayer = audio.AudioPlayer;
    var Friendly = require('UIFriendlyView');  
    
    var Controller = app.ControllerBase.extend({
        ViewConfig : {
            musicMainView : require('UIMusicView')
        },
        init : function(opts) {
            var render = (function() {
                if (connection.isConnect()) {
                    this.collection = new Model.Collection();
                    if (!this.collection.requested && !this.collection.responsed) {
                        this.collection.refresh();
                    }
                    this.render({
                        musicMainView : {
                            pageId : this.pageId,
                            collection : this.collection
                        }
                    });
                }else{
                    if(AudioPlayer){
                        AudioPlayer.pause();
                        AudioPlayer.reset();
                    }
                   if(this.collection){
                        this.collection.clear();
                        this.collection.requested=false;
                        this.collection.responsed=false;
                        this.collection.setStopProcess(true);
                        this.collection.trigger("update");
                    }
                }
            }).bind(this);
            render();
            connection.on('connection', render);
            var _this = this;
            this.on('screenin', this.onScreenin);
            this.on('screenout', function(hash){
                _this.views["musicMainView"].stopPlay();          
            });
        },
        onScreenin:function(paras){
            if(!connection.isConnect()){
               if(!Friendly.instance){
                    Friendly.instance=new Friendly();
                }
                Friendly.instance.clickConnect();
            }
        },
        update : function() {

        }
    });
    return Controller;
});
