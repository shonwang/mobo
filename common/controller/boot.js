define('boot', function(require, exports, module){
    var    $ = require('jquery');
    var utils = require('utils');
    var app = require('app');
    var config = require('globalConfig');
    
    
    app.getServiceUrl();
    
    //如果长度为2, 那说明历史长度里包含
    if(history.length == 2){
        app.history.startIndex = 1;
    }
    
    $(function(){
        for(var ix in config.ctrConfig){
            var opts = config.ctrConfig[ix];
            app.addRouter(opts.module + '/' + opts.action , $.extend(true, {}, opts));
        }
        
        //启动路由监控
        app.start();
        app.navigate({
            module: config.defaultController['module'],
            action: config.defaultController['action']
        });
        
        var timer;
        
        app.eventCenter.on('refresh_resource_app_status', function(context){
            var taskView = require('taskView');
            var domContext = context || $(document.body);
            clearTimeout(timer);
            taskView.updateResourceAppStatus(domContext);
        });
        
        var SmartTip = require('UISmartTip');
        var setTip = new SmartTip();
                
        app.eventCenter.on('setwallpaper', function(res){
            var i18nDi = require('I18NDI');
            if(res.status == 1){
                setTip.flushTip(i18nDi.fillDomText('image.setWallpaperSuccess')); 
            }else{
                setTip.flushTip(i18nDi.fillDomText('image.setWallpaperFailed')); 
            }
            setTip.toCenter();
            setTip.show();
        });
    }); 
});
