define('imageController', function(require, exports, module){
    var app = require('app');
    var connection = require('connectionMgr');
    var Friendly = require('UIFriendlyView');
    
    var Controller = app.ControllerBase.extend({
        ViewConfig: {
            imageView: require('UIImageView')
        }, 
        init: function( opts ){
            
            var render = (function(){
                if(connection.isConnect()){
                    this.render({
                        imageView: {
                            pageId: this.pageId
                        }
                    });
                }
            }).bind(this);
            
            render();
            connection.on('connection', render);
            this.on('screenin', this.onScreenin);
        },
        onScreenin:function(paras){
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