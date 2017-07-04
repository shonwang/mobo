define('genieController', function(require, exports, module){
    var app = require('app');
    var connection = require('connectionMgr');
    var $ = require('jquery');
   
    var Controller = app.ControllerBase.extend({
        ViewConfig: {
            genieView: require('UIGenieView')
        },
        collection: null, 
        init: function( opts ){

            var render = (function(){
                    this.render({
                        genieView: {
                            pageId: this.pageId,
                            //collection: collection
                        }
                    });
                    //collection.refresh();
            }).bind(this);

            render();
            connection.on('connection', render);
            this.on('screenin', $.proxy(this.onScreenin, this));
            app.eventCenter.on("switchSite", function(siteConfig){
                this.siteConfig = siteConfig;
            }.bind(this));
        },

        onScreenin:function(){
            var curModule=app.getCurHashParas();

            if (this.siteConfig){
                var domainConfig = require("globalConfig");
                var inBlackList=false;
                for(var i in domainConfig.ctrConfig){
                     if (domainConfig.ctrConfig[i].module == curModule.module&& 
                         domainConfig.ctrConfig[i].action == curModule.action&&
                         domainConfig.ctrConfig[i].blackList&&
                         (domainConfig.ctrConfig[i].blackList == "all"||
                          domainConfig.ctrConfig[i].blackList.indexOf(this.siteConfig.site.toLowerCase())>-1)){
                             inBlackList=true;
                     }
                }
                var content = JSON.parse(curModule.pageState.content);
                if(inBlackList||content.curSite !== this.siteConfig.site.toLowerCase()){
                    // app.navigate({
                    //     module:domainConfig.defaultController.module,
                    //     action:domainConfig.defaultController.action
                    // });
                    //alert(content.curSite + "/" + this.siteConfig.site.toLowerCase())
                    content.curSite = this.siteConfig.site.toLowerCase()
                    //alert(content.curSite + "/" + this.siteConfig.site.toLowerCase())
                    curModule.pageState.content = JSON.stringify(content);
                    app.history.back();
                    window.history.back();
                }
            }
            this.views['genieView'].redirect(curModule);
        },
       
        update: function(){
       
        }
    });
    return Controller;
});