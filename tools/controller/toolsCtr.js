define('toolsMainController', function(require, exports, module){
    var app = require('app');
    var connection = require('connectionMgr');
    var $ = require('jquery');
   
    var Controller = app.ControllerBase.extend({
        ViewConfig: {
            toolsMainView: require('UIToolsMainView')
        },
        collection: null, 
        init: function( opts ){

            var render = (function(){
                    this.render({
                        toolsMainView: {
                            pageId: this.pageId,
                            //collection: collection
                        }
                    });
                    //collection.refresh();
            }).bind(this);

            render();
            connection.on('connection', render);
            this.on('screenin', $.proxy(this.onScreenin, this));
        },

        onScreenin:function(){
            var hash = app.getCurHashParas();
            this.views['toolsMainView'].update(hash);
        },
       
        update: function(){
       
        }
    });
    return Controller;
});