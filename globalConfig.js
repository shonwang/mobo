/*
 * @fileoverview, controller 支持静态配置 和 动态配置
 */
define('globalConfig', function(require, exports, module){
    
    //路由控制器
    exports.ctrConfig = {
        1 : {
             module: 'contact',
             action: 'contact',
             pageState:{
               accountName:'all'  
             },
             controllerModule : 'contactController'
         },
        2 : {
            module: 'app',
            action: 'app',
            controllerModule : 'appController'
        },
        3 : {
            module: 'home',
            action: 'home',
            controllerModule: 'homeController'
        },
        
        4 : {
            module: 'resource',
            action: 'game',
            controllerModule: 'gameController'
        },
        5 : {
            module: 'resource',
            action: 'app',
            controllerModule: 'appResController'
        },
        6: {
            module: 'image',
            action: 'image',
            controllerModule: 'imageController'
        },
        7: {
            module: 'sms',
            action: 'sms',
            controllerModule: 'smsController'
        },
        8:{
            module: 'video',
            action: 'video',
            controllerModule: 'videoController'  
        },
        9:{
            module: 'music',
            action: 'music',
            controllerModule: 'musicController'  
        },
        10:{
            module: 'tools',
            action: 'tools',
            controllerModule: 'toolsMainController'  
        },
        11:{
            module: 'book',
            action: 'book',
            controllerModule: 'myBookController',
            blackList:["br","id","th","me","hk","vn","na","es","tr","ir","iq","sea"]
        },
        12: {
            module: 'genie',
            action: 'genie',
            controllerModule: 'genieController',
            blackList:"all"
        },
        100: {
            module: 'task',
            action: 'task',
            controllerModule: 'taskController'
        },
        1001 : {
            module: 'resource',
            action: 'wallpaper',
            controllerModule: 'wallpaperController'
        },
        1000: {
            module: 'resource',
            action: 'ringtone',
            controllerModule: 'ringtoneController'
        },
        1002: {
            module: 'resource',
            action: 'youtube',
            controllerModule: 'youtubeController',
            /*配置黑名单，将黑名单站点名称添加进blackList即可，如果是拒绝全部，值为all即可*/
            //blackList:["gl"]
        },
         1003: {
            module: 'resource',
            action: 'book',
            controllerModule: 'bookController',
            blackList:["br","id","th","me","hk","vn","na","es","tr","ir","iq","sea"]
        },
        1004: {
            module: 'feedback',
            action: 'feedback',
            controllerModule: 'fbController'
        }
    }
    exports.domain = {
        serverVoga360: "http://server.voga360.com/",
        publicVoga360: "http://public.voga360.com/",
        uploadVoga360: "http://upload.voga360.com/",
        searchVoga360: "http://search.voga360.com/",
        publicMobogenie: 'http://public.mobogenie.com/',
        marketVoga360: "http://market.voga360.com/",
        site:"gl"
    };
    
    exports.setService = function(service){
        console.log("设置站点",service);
        this.domain.serverVoga360 = service.localServer || this.domain.serverVoga360;
        this.domain.publicVoga360 = service.publicUrl || this.domain.publicVoga360;
        this.domain.uploadVoga360 = service.uploadUrl || this.domain.uploadVoga360;
        this.domain.searchVoga360 = service.searchUrl || this.domain.searchVoga360;
        this.domain.marketVoga360 = service.market || service.marketUrl || this.domain.marketVoga360;
        this.domain.publicMobogenie = service.publicMobogenie || this.domain.publicMobogenie;
        this.domain.site=service.site||this.domain.site;
        console.log("设置站点",this.domain.marketVoga360);
    };
    
    //默认路由, 只能配一个
    exports.defaultController = {
        module: 'home',
        action: 'home'
    };
    
});
