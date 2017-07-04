define('taskController', function(require, exports, module){
    var app = require('app');
    var $ = require('jquery');
    
    var Controller = app.ControllerBase.extend({
        ViewConfig: {
             taskView: require('taskView') 
        },
        init: function( opts ){
            this.off('screenout');
            this.off('screenin');
            
            this.render({
                taskView: {
                    pageId: this.pageId
                }
            });
            
            this.page.addClass('g-page-task');
            
            var tmr = 0;
            var taskMgr = this.page.find('.g-task-manager');
            
            this.on('screenout', function(){
                taskMgr.removeClass('t-show').addClass('t-hide');
                
                clearTimeout(this.timer);
                this.timer = setTimeout(function(){
                    this.screenOut();
                }.bind(this), 300);
            }.bind(this));
            
            this.on('screenin', function(){
                this.screenIn();
                clearTimeout(this.timer);
                taskMgr.removeClass('t-hide').addClass('t-show');
                this.views['taskView'].sendNewLogwithTotal();
            }.bind(this));
            
            
            
            /*
            this.on('screenout', $.proxy(function(){
                var me = this;
                taskMgr.transition({
                    x: '-100%'
                }, 300, 'ease', function(){
                    me.screenOut();
                });
            }, this));
            
            this.on('screenin', function(){
                this.screenIn();
                
                taskMgr.transition({
                    x: 0
                }, 300, 'ease', function(){
                });
            });
            */
        },
        update: function(){
             
        }
    });
    return Controller;
});