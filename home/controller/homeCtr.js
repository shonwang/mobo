define("homeController", function(require, exports, module) {
    var app = require('app');
    
    var HomeCtr = app.ControllerBase.extend({
        ViewConfig: {
            homeView: require('UIHomeMainView')
        },
        init: function(opts){
            this.page.addClass('g-page-home');
            
            app.getServiceUrl(function(){
                this.render({
                    homeView: {
                        pageId: this.pageId
                    }
                });
            }.bind(this));
        }
    });
    
    return HomeCtr;
}); 