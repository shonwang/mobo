define('videoController', function(require, exports, module){
    var app = require('app');
    var Model = require('videoModel');
    var connection = require('connectionMgr');
    var $ = require('jquery');
    var Friendly = require('UIFriendlyView');  
     
    var Controller = app.ControllerBase.extend({
        ViewConfig: {
            videoMainView: require('UIVideoView')
        },
        collection: null, 
        init: function( opts ){
            var collection = new Model.Collection();
            var render = (function(){
                if(connection.isConnect()){
                    this.render({
                        videoMainView: {
                            pageId: this.pageId,
                            collection: collection
                        }
                    });
                    collection.refresh();
                }
            }).bind(this);

            render();
            connection.on('connection', render);
            this.on('screenin', this.onScreenin);
        },

        onScreenin:function(paras){
            // var hash = app.getCurHashParas();
            // console.log(hash);
            // this.views['videoMainView'].update(hash);
            if(!connection.isConnect()){
               if(!Friendly.instance){
                    Friendly.instance=new Friendly();
                }
                Friendly.instance.clickConnect();
            }
        },
       
        update: function(){
       
        }
    });
    return Controller;
});