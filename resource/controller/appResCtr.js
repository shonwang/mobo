define("appResController", function(require, exports, module) {
    var app = require('app');
    var   $ = require('jquery');
    var cache=require('r-cache');
    var globalConfig=require('globalConfig');
    var cacheA=new cache(false);
    var isInit=0;
    var NoNet=require('NoNet');
    var AppResCtr = app.ControllerBase.extend({
        ViewConfig: {
            appResView: require('appResView')
        },
        init: function(){
            this.render({ appResView: {
                pageId: this.pageId
            }});
            var _this=this;
            this.initLoad();
            cacheA.off('filesNotAllReady');
            cacheA.off('filesAllReady');
            var onScreenin=function(){
                _this.initLoad();
            };
            var error=function(){
                console.error('getConfigError||filesNotAllReady');
                if(NoNet){
                    var nonet=new NoNet({
                        pageId:_this.pageId
                    });
                    nonet.on('retry',onScreenin);
                }
                _this.off('screenin',onScreenin);
                _this.on('screenin',onScreenin);
                app.eventCenter.off('switchSite',onScreenin);
                app.eventCenter.on('switchSite',onScreenin);
                app.eventCenter.off('resourceapp',onScreenin);
                app.eventCenter.on('resourceapp',onScreenin);

            };
            var success=function(){
                console.error('getConfigSuccess||filesAllReady');
                _this.off('screenin',onScreenin);
                _this.off('switchSite',onScreenin);
                app.eventCenter.off('resourceapp',onScreenin);
            }
            cacheA.on('filesNotAllReady',error);
            cacheA.on('getConfigError',error);
            cacheA.on('filesAllReady',success);
        },
        rRouterInit:function(){
            console.log('rRouter-------------Init')
            if(isInit==0){isInit=1;return;}
            var rRouter=require('r-router');
            if(rRouter){
                rRouter.init(null,cacheA);
            }
        },
        onScreenOut:function(){
            
            var rRouter=require('r-router');
            if(rRouter){
                rRouter.screenout();
            }
        },
        onSwitchSite:function(){
            var paras=app.getCurHashParas();
            var module=paras.module;
            var action=paras.action;
            globalConfig.ctrConfig['4'].query='';
            globalConfig.ctrConfig['5'].query='';
            globalConfig.ctrConfig['1000'].query='';
            globalConfig.ctrConfig['1001'].query='';
            globalConfig.ctrConfig['1002'].query='';
            globalConfig.ctrConfig['1003'].query='';
            if((module=='resource'&&action=='app')||(module!='resource'&&module!='home')){
                var rRouter=require('r-router');
                rRouter.isSwitch=1;console.log('onSwitchSite=========',rRouter.isSwitch)
                if(rRouter){
                    rRouter.init(null,cacheA,'app');
                }
            }
        },
        initLoad:function(){
            var paras=app.getCurHashParas();
            var sort=paras['query']?paras['query']['sort']:'';
            sort=sort?sort:'';
            var pageState=paras['pageState']?paras['pageState']:'';
            var r_config=require('r-config');
            this.off('screenin',this.rRouterInit);
            this.off('screenout',this.onScreenOut);
            app.eventCenter.off('resourceapp',this.rRouterInit);
            app.eventCenter.off('switchSite',this.onSwitchSite);
            if(r_config){
                var rRouter=require('r-router');
                this.on('screenin',this.rRouterInit);
                this.on('screenout',this.onScreenOut);
                app.eventCenter.on('resourceapp',this.rRouterInit);
                app.eventCenter.on('switchSite',this.onSwitchSite);
                rRouter.init({
                    module: 'resource',
                    action: 'app',
                    query: {
                        sort:sort,
                        id: this.pageId
                    },
                    pageState: pageState
                },cacheA);
            }else{
                cacheA.getConfig(
                    ['r','config'],
                    'resource/cache20140820/json/r-config.js',
                    function(obj){
                        cacheA.getFiles(
                            'r_config_js',
                            function(msg){
                                cacheA.setStorage([msg[0]],msg[1]);
                                eval(msg[1]);
                                var rRouter=require('r-router');
                                this.on('screenin',this.rRouterInit);
                                this.on('screenout',this.onScreenOut);
                                app.eventCenter.on('resourceapp',this.rRouterInit);
                                app.eventCenter.on('switchSite',this.onSwitchSite);
                                rRouter.init({
                                    module: 'resource',
                                    action: 'app',
                                    query: {
                                        sort:sort,
                                        id: this.pageId
                                    },
                                    pageState: pageState
                                },cacheA);
                                isInit=1;
                            }.bind(this)
                        );
                    }.bind(this)
                );
            }
        }
    });
    
    return AppResCtr;
});