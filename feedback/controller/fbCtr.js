define('fbController', function(require, exports, module){
    var app = require('app');
    var appData = require('appModel');
    var connection = require('connectionMgr');
   
    var Controller = app.ControllerBase.extend({
        ViewConfig: {
            fbView: require('UIFeedback')
        },
        collection: null, 
        init: function( opts ){
            var render = (function(){
                this.render({
                    fbView: {
                        pageId: this.pageId
                    }
                });
            }).bind(this);
            
            render();
            
        }
    });
    return Controller;
});