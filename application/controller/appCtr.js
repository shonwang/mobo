define('appController', function(require, exports, module){
    var app = require('app');
    var appData = require('appModel');
    var connection = require('connectionMgr');
   var Friendly = require('UIFriendlyView');
   
    var Controller = app.ControllerBase.extend({
        ViewConfig: {
            appView: require('UIAppMainView')
        },
        collection: null, 
        init: function( opts ){
            var render = (function(){
                if(connection.isConnect()){
                    this.render({
                        appView: {
                            pageId: this.pageId
                        }
                    });
                }
            }).bind(this);
            
            render();
            connection.on('connection', render);
            this.on('screenin', this.onScreenIn);
        },
       onScreenIn:function(hash){
            var hash = app.getCurHashParas();
            if(!connection.isConnect()){
               if(!Friendly.instance){
                    Friendly.instance=new Friendly();
                }
                Friendly.instance.clickConnect();
            }else{
                this.views["appView"].redirect(hash);
            }
        },
        update: function(){
       
        }
    });
    return Controller;
});