/*
 * mobogenie 模块化API, 保持接口与COMMONJS 规范一致。
 * 为什么自己实现：客户端js加载对网络没要求， 自己实现简单， 可维护。
 * author lujingfeng@cyou-inc.com
 */
var DEBUG=false;

var app = app || {};
var cef = app;

(function(global, undefined){
    
    //扩展Date format方法
    Date.prototype.format = function(fmt) { 
      var o = { 
         "M+" : this.getMonth()+1,                 //月份 
         "d+" : this.getDate(),                    //日 
         "h+" : this.getHours(),                   //小时 
         "m+" : this.getMinutes(),                 //分 
         "s+" : this.getSeconds(),                 //秒 
         "q+" : Math.floor((this.getMonth()+3)/3), //季度 
         "S"  : this.getMilliseconds()             //毫秒 
      }; 
      
      if(/(y+)/.test(fmt)) 
          fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
      for(var k in o) 
          if(new RegExp("("+ k +")").test(fmt)) 
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length))); 
      return fmt; 
    };
    
    //扩展String format方法
    String.prototype.format = function() {
        var args = arguments;
        return this.replace(/\{(\d+)\}/g,                
        function(m,i){
            return args[i];
        });
    };
    
    //防止重新载入
    if(global.genie){
        return;
    }
    
    var genie = genie || {};
    var modules = {};
    
    /*
     * 模块构造器
     * @paras id {String} 模块的唯一标志， 
     * @paras deps {}
     */
    function Module(id, deps, factory, dirname, fileName){
        this.id = id;
        this.deps = deps || [];
        this.exports = {};
        this.factory = factory;
        this.dirname = dirname;
        this.fileName = fileName;
        
        this.require = false;
    }
    
    var require = function(id){
        if(!DEBUG){
            if(typeof modules[id] == 'undefined'){
                var url = moduleConfig[id];
                
                if(location.href.indexOf('winentry') > -1){
                    url = '../' + url;
                }
                
                if(!url){
                    return;
                }
                var xhr = new XMLHttpRequest();
                
                window.lastModuleURL = url;
                xhr.onreadystatechange = function(e){
                    if(xhr.readyState == 4 && xhr.status == 0){
                        eval(xhr.responseText);
                    }
                }
                xhr.open('GET', url, false);
                xhr.send();
            }
        }else{
            if(typeof modules[id] == 'undefined'){
                console.log(id + ' module didn\'t existed');
                return false;
            }
        }
        
        
        if(modules[id].require){
            return modules[id].exports;
        }
        
        modules[id].require = true;
        
        var exports;
        
        if(typeof modules[id].factory == 'function'){
            exports = modules[id].factory.apply(global, 
                        [require, modules[id].exports, modules[id]]);
        }else if(typeof modules[id].factory == 'object' || 
                 typeof modules[id].exports == 'string'){
            exports = modules[id].factory;
        }
        
        modules[id].exports = exports || modules[id].exports;
        
        return modules[id].exports;
    };
    
    /*
     * @paras id {String} 必选。 commonjs规范不是必须的, 我们定义为必须。
     *                    ID定义规范：1、必须为只带字母和冒号(:)的字符串。2、冒号为大模块前缀， 比如，common:menu。
     * @paras deps {Array} 可选
     * @paras factory {Functon} 必选
     */
    var define = function(id, deps, factory){
        if(arguments.length <= 1){
            throw new Error('模块定义需要的参数错误。');
        }else if(arguments.length == 2){
            factory = deps;
        }
        
        if(DEBUG){
            var scripts = document.getElementsByTagName('script');
            var lastScript = scripts[scripts.length - 1];
            var src = lastScript.src;
        }else{
            src = window.lastModuleURL;
        }
        
        var lastSlashIndex = '',
            dirname = '',
            fileName = '';
        
        if(src){
            lastSlashIndex = src.lastIndexOf('/');
            dirname = src.slice(0, lastSlashIndex);
            fileName = src.slice(lastSlashIndex);
        }
        
        modules[id] = new Module(id, deps, factory, dirname, fileName.slice(1, fileName.indexOf('.')));
    };
    
    define.amd =  true;
    
    Module.use = function(ids, callback){
        callback.apply(global, [require]);
    };
    /*
     *包定义方法
     *@paras *string {string} 多个当前包中的目录与文件
     */
    var packages = (function(){
        var currentBaseDir = null;
        var _loadScript = function(options){
            document.write('<script src="'+ options.url +'"></script>');
        };
                    
        var getBaseDir = function(){
            //if(currentBaseDir)return currentBaseDir;
                
            var scripts = document.getElementsByTagName('script');
            var len = scripts.length;
            
            for(var i=0, s, l, src; i < len; i++ ){
                s = scripts[i];
                    l = 'package.json'.length;
                    src = s.src;
                    
                    if(src.slice(-l) === 'package.json'){
                        s.parentNode.removeChild(s);
                        return src.slice(0, src.lastIndexOf('/'));
                    }
            }
            return (currentBaseDir || null);
        };
                
        return function(){
            if(arguments.length === 0)return;
            
            var baseDir = getBaseDir();
            var directorys = [];
            var args = Array.prototype.slice.call(arguments, 0);
            
            args.forEach(function(dirname, index){
                var url = baseDir + '/' + dirname;
                if(dirname.indexOf('!') == -1){
                    if(dirname && dirname.indexOf('.js') > -1){
                        try{
                            document.write('<script src="'+ url +'"></script>');
                        }catch(e){
                            console.error(url, e.message);
                        }
                    }else if(dirname && dirname.indexOf('.css') > -1){
                        document.write('<link rel="stylesheet" href="' + url + '" />');
                    }else if(dirname && dirname.indexOf('.html') > -1){
                        //To-Do
                    }else{
                        directorys.push(dirname);
                    }
                }
            });
            
            directorys.forEach(function(dirname){
                currentBaseDir = baseDir + '/' + dirname;
                _loadScript({url : currentBaseDir + '/package.json'});
            });
        };
    })();
    
    
    /*
     *@paras opts {Object}
     */
    var config = function(opts){
        
    };
    
    genie.use = Module.use;
    genie.config = config;
    genie.packages = packages;
    
    global.genie = genie;
    global.define = define;
})(window);
var moduleConfig={"jquery":"common/libs/jquery/jquery.js","\"jquery":"common/libs/jquery/jquery.js","jquery.transit":"common/libs/jquery/jquery.transit.js","jquery.form":"common/libs/jquery/jquery.form.js","jquery.imgAreaSelect":"common/libs/jquery/jquery.imgareaselect.js","underscore":"common/libs/underscore/api.js","utils":"common/libs/utils.js","event":"common/libs/event.js","app":"common/libs/app.js","template":"common/libs/template.js","I18NDI":"common/libs/i18nDI.js","string":"common/libs/string.js","arabic:contact":"common/libs/i18nDictionary/arabic/contact.js","arabic:common":"common/libs/i18nDictionary/arabic/common.js","arabic:sms":"common/libs/i18nDictionary/arabic/sms.js","arabic:video":"common/libs/i18nDictionary/arabic/video.js","arabic:myapp":"common/libs/i18nDictionary/arabic/myapp.js","arabic:driver":"common/libs/i18nDictionary/arabic/driver.js","arabic:setting":"common/libs/i18nDictionary/arabic/setting.js","arabic:music":"common/libs/i18nDictionary/arabic/music.js","arabic:tools":"common/libs/i18nDictionary/arabic/tools.js","arabic:backupRestore":"common/libs/i18nDictionary/arabic/backupRestore.js","arabic:task":"common/libs/i18nDictionary/arabic/taskManager.js","arabic:image":"common/libs/i18nDictionary/arabic/image.js","arabic:fileManager":"common/libs/i18nDictionary/arabic/fileManager.js","arabic:guide":"common/libs/i18nDictionary/arabic/guide.js","arabic:signin":"common/libs/i18nDictionary/arabic/signin.js","arabic:book":"common/libs/i18nDictionary/arabic/book.js","arabic:pcclean":"common/libs/i18nDictionary/arabic/pcClean.js","chinese:contact":"common/libs/i18nDictionary/chinese/contact.js","chinese:common":"common/libs/i18nDictionary/chinese/common.js","chinese:sms":"common/libs/i18nDictionary/chinese/sms.js","chinese:video":"common/libs/i18nDictionary/chinese/video.js","chinese:myapp":"common/libs/i18nDictionary/chinese/myapp.js","chinese:driver":"common/libs/i18nDictionary/chinese/driver.js","chinese:setting":"common/libs/i18nDictionary/chinese/setting.js","chinese:music":"common/libs/i18nDictionary/chinese/music.js","chinese:tools":"common/libs/i18nDictionary/chinese/tools.js","chinese:backupRestore":"common/libs/i18nDictionary/chinese/backupRestore.js","chinese:task":"common/libs/i18nDictionary/chinese/taskManager.js","chinese:image":"common/libs/i18nDictionary/chinese/image.js","chinese:fileManager":"common/libs/i18nDictionary/chinese/fileManager.js","english:guide":"common/libs/i18nDictionary/english/guide.js","chinese:signin":"common/libs/i18nDictionary/chinese/signin.js","chinese:book":"common/libs/i18nDictionary/chinese/book.js","chinese:pcclean":"common/libs/i18nDictionary/chinese/pcClean.js","english:contact":"common/libs/i18nDictionary/english/contact.js","english:common":"common/libs/i18nDictionary/english/common.js","english:sms":"common/libs/i18nDictionary/english/sms.js","english:video":"common/libs/i18nDictionary/english/video.js","english:myapp":"common/libs/i18nDictionary/english/myapp.js","english:driver":"common/libs/i18nDictionary/english/driver.js","english:setting":"common/libs/i18nDictionary/english/setting.js","english:music":"common/libs/i18nDictionary/english/music.js","english:tools":"common/libs/i18nDictionary/english/tools.js","english:backupRestore":"common/libs/i18nDictionary/english/backupRestore.js","english:task":"common/libs/i18nDictionary/english/taskManager.js","english:image":"common/libs/i18nDictionary/english/image.js","english:fileManager":"common/libs/i18nDictionary/english/fileManager.js","english:signin":"common/libs/i18nDictionary/english/signin.js","english:book":"common/libs/i18nDictionary/english/book.js","english:pcclean":"common/libs/i18nDictionary/english/pcClean.js","france:contact":"common/libs/i18nDictionary/france/contact.js","france:common":"common/libs/i18nDictionary/france/common.js","france:sms":"common/libs/i18nDictionary/france/sms.js","france:video":"common/libs/i18nDictionary/france/video.js","france:myapp":"common/libs/i18nDictionary/france/myapp.js","france:driver":"common/libs/i18nDictionary/france/driver.js","france:setting":"common/libs/i18nDictionary/france/setting.js","france:music":"common/libs/i18nDictionary/france/music.js","france:tools":"common/libs/i18nDictionary/france/tools.js","france:backupRestore":"common/libs/i18nDictionary/france/backupRestore.js","france:task":"common/libs/i18nDictionary/france/taskManager.js","france:image":"common/libs/i18nDictionary/france/image.js","france:fileManager":"common/libs/i18nDictionary/france/fileManager.js","france:guide":"common/libs/i18nDictionary/france/guide.js","france:signin":"common/libs/i18nDictionary/france/signin.js","france:book":"common/libs/i18nDictionary/france/book.js","france:pcclean":"common/libs/i18nDictionary/france/pcClean.js","indonesian:contact":"common/libs/i18nDictionary/indonesian/contact.js","indonesian:common":"common/libs/i18nDictionary/indonesian/common.js","indonesian:sms":"common/libs/i18nDictionary/indonesian/sms.js","indonesian:video":"common/libs/i18nDictionary/indonesian/video.js","indonesian:myapp":"common/libs/i18nDictionary/indonesian/myapp.js","indonesian:driver":"common/libs/i18nDictionary/indonesian/driver.js","indonesian:setting":"common/libs/i18nDictionary/indonesian/setting.js","indonesian:music":"common/libs/i18nDictionary/indonesian/music.js","indonesian:tools":"common/libs/i18nDictionary/indonesian/tools.js","indonesian:backupRestore":"common/libs/i18nDictionary/indonesian/backupRestore.js","indonesian:task":"common/libs/i18nDictionary/indonesian/taskManager.js","indonesian:image":"common/libs/i18nDictionary/indonesian/image.js","indonesian:fileManager":"common/libs/i18nDictionary/indonesian/fileManager.js","indonesian:guide":"common/libs/i18nDictionary/indonesian/guide.js","indonesian:signin":"common/libs/i18nDictionary/indonesian/signin.js","indonesian:book":"common/libs/i18nDictionary/indonesian/book.js","indonesian:pcclean":"common/libs/i18nDictionary/indonesian/pcClean.js","italian:contact":"common/libs/i18nDictionary/italian/contact.js","italian:common":"common/libs/i18nDictionary/italian/common.js","italian:sms":"common/libs/i18nDictionary/italian/sms.js","italian:video":"common/libs/i18nDictionary/italian/video.js","italian:myapp":"common/libs/i18nDictionary/italian/myapp.js","italian:driver":"common/libs/i18nDictionary/italian/driver.js","italian:setting":"common/libs/i18nDictionary/italian/setting.js","italian:music":"common/libs/i18nDictionary/italian/music.js","italian:tools":"common/libs/i18nDictionary/italian/tools.js","italian:backupRestore":"common/libs/i18nDictionary/italian/backupRestore.js","italian:task":"common/libs/i18nDictionary/italian/taskManager.js","italian:image":"common/libs/i18nDictionary/italian/image.js","italian:fileManager":"common/libs/i18nDictionary/italian/fileManager.js","italian:guide":"common/libs/i18nDictionary/italian/guide.js","italian:signin":"common/libs/i18nDictionary/italian/signin.js","italian:book":"common/libs/i18nDictionary/italian/book.js","italian:pcclean":"common/libs/i18nDictionary/italian/pcClean.js","korean:contact":"common/libs/i18nDictionary/korean/contact.js","korean:common":"common/libs/i18nDictionary/korean/common.js","korean:sms":"common/libs/i18nDictionary/korean/sms.js","korean:video":"common/libs/i18nDictionary/korean/video.js","korean:myapp":"common/libs/i18nDictionary/korean/myapp.js","korean:driver":"common/libs/i18nDictionary/korean/driver.js","korean:setting":"common/libs/i18nDictionary/korean/setting.js","korean:music":"common/libs/i18nDictionary/korean/music.js","korean:tools":"common/libs/i18nDictionary/korean/tools.js","korean:backupRestore":"common/libs/i18nDictionary/korean/backupRestore.js","korean:task":"common/libs/i18nDictionary/korean/taskManager.js","korean:image":"common/libs/i18nDictionary/korean/image.js","korean:fileManager":"common/libs/i18nDictionary/korean/fileManager.js","korean:guide":"common/libs/i18nDictionary/korean/guide.js","korean:signin":"common/libs/i18nDictionary/korean/signin.js","korean:book":"common/libs/i18nDictionary/korean/book.js","korean:pcclean":"common/libs/i18nDictionary/korean/pcClean.js","poland:contact":"common/libs/i18nDictionary/poland/contact.js","poland:common":"common/libs/i18nDictionary/poland/common.js","poland:sms":"common/libs/i18nDictionary/poland/sms.js","poland:video":"common/libs/i18nDictionary/poland/video.js","poland:myapp":"common/libs/i18nDictionary/poland/myapp.js","poland:driver":"common/libs/i18nDictionary/poland/driver.js","poland:setting":"common/libs/i18nDictionary/poland/setting.js","poland:music":"common/libs/i18nDictionary/poland/music.js","poland:tools":"common/libs/i18nDictionary/poland/tools.js","poland:backupRestore":"common/libs/i18nDictionary/poland/backupRestore.js","poland:task":"common/libs/i18nDictionary/poland/taskManager.js","poland:image":"common/libs/i18nDictionary/poland/image.js","poland:fileManager":"common/libs/i18nDictionary/poland/fileManager.js","poland:guide":"common/libs/i18nDictionary/poland/guide.js","poland:signin":"common/libs/i18nDictionary/poland/signin.js","poland:book":"common/libs/i18nDictionary/poland/book.js","poland:pcclean":"common/libs/i18nDictionary/poland/pcClean.js","portuguese:contact":"common/libs/i18nDictionary/portuguese/contact.js","portuguese:common":"common/libs/i18nDictionary/portuguese/common.js","portuguese:sms":"common/libs/i18nDictionary/portuguese/sms.js","portuguese:video":"common/libs/i18nDictionary/portuguese/video.js","portuguese:myapp":"common/libs/i18nDictionary/portuguese/myapp.js","portuguese:driver":"common/libs/i18nDictionary/portuguese/driver.js","portuguese:setting":"common/libs/i18nDictionary/portuguese/setting.js","portuguese:music":"common/libs/i18nDictionary/portuguese/music.js","portuguese:tools":"common/libs/i18nDictionary/portuguese/tools.js","portuguese:backupRestore":"common/libs/i18nDictionary/portuguese/backupRestore.js","portuguese:task":"common/libs/i18nDictionary/portuguese/taskManager.js","portuguese:image":"common/libs/i18nDictionary/portuguese/image.js","portuguese:fileManager":"common/libs/i18nDictionary/portuguese/fileManager.js","portuguese:guide":"common/libs/i18nDictionary/portuguese/guide.js","portuguese:signin":"common/libs/i18nDictionary/portuguese/signin.js","portuguese:book":"common/libs/i18nDictionary/portuguese/book.js","portuguese:pcclean":"common/libs/i18nDictionary/portuguese/pcClean.js","russian:contact":"common/libs/i18nDictionary/russian/contact.js","russian:common":"common/libs/i18nDictionary/russian/common.js","russian:sms":"common/libs/i18nDictionary/russian/sms.js","russian:video":"common/libs/i18nDictionary/russian/video.js","russian:myapp":"common/libs/i18nDictionary/russian/myapp.js","russian:driver":"common/libs/i18nDictionary/russian/driver.js","russian:setting":"common/libs/i18nDictionary/russian/setting.js","russian:music":"common/libs/i18nDictionary/russian/music.js","russian:tools":"common/libs/i18nDictionary/russian/tools.js","russian:backupRestore":"common/libs/i18nDictionary/russian/backupRestore.js","russian:task":"common/libs/i18nDictionary/russian/taskManager.js","russian:image":"common/libs/i18nDictionary/russian/image.js","russian:fileManager":"common/libs/i18nDictionary/russian/fileManager.js","russian:guide":"common/libs/i18nDictionary/russian/guide.js","russian:signin":"common/libs/i18nDictionary/russian/signin.js","russian:book":"common/libs/i18nDictionary/russian/book.js","russian:pcclean":"common/libs/i18nDictionary/russian/pcClean.js","spanish:contact":"common/libs/i18nDictionary/spanish/contact.js","spanish:common":"common/libs/i18nDictionary/spanish/common.js","spanish:sms":"common/libs/i18nDictionary/spanish/sms.js","spanish:video":"common/libs/i18nDictionary/spanish/video.js","spanish:myapp":"common/libs/i18nDictionary/spanish/myapp.js","spanish:driver":"common/libs/i18nDictionary/spanish/driver.js","spanish:setting":"common/libs/i18nDictionary/spanish/setting.js","spanish:music":"common/libs/i18nDictionary/spanish/music.js","spanish:tools":"common/libs/i18nDictionary/spanish/tools.js","spanish:backupRestore":"common/libs/i18nDictionary/spanish/backupRestore.js","spanish:task":"common/libs/i18nDictionary/spanish/taskManager.js","spanish:image":"common/libs/i18nDictionary/spanish/image.js","spanish:fileManager":"common/libs/i18nDictionary/spanish/fileManager.js","spanish:guide":"common/libs/i18nDictionary/spanish/guide.js","spanish:signin":"common/libs/i18nDictionary/spanish/signin.js","spanish:book":"common/libs/i18nDictionary/spanish/book.js","spanish:pcclean":"common/libs/i18nDictionary/spanish/pcClean.js","thai:contact":"common/libs/i18nDictionary/thai/contact.js","thai:common":"common/libs/i18nDictionary/thai/common.js","thai:sms":"common/libs/i18nDictionary/thai/sms.js","thai:video":"common/libs/i18nDictionary/thai/video.js","thai:myapp":"common/libs/i18nDictionary/thai/myapp.js","thai:driver":"common/libs/i18nDictionary/thai/driver.js","thai:setting":"common/libs/i18nDictionary/thai/setting.js","thai:music":"common/libs/i18nDictionary/thai/music.js","thai:tools":"common/libs/i18nDictionary/thai/tools.js","thai:backupRestore":"common/libs/i18nDictionary/thai/backupRestore.js","thai:task":"common/libs/i18nDictionary/thai/taskManager.js","thai:image":"common/libs/i18nDictionary/thai/image.js","thai:fileManager":"common/libs/i18nDictionary/thai/fileManager.js","thai:guide":"common/libs/i18nDictionary/thai/guide.js","thai:signin":"common/libs/i18nDictionary/thai/signin.js","thai:book":"common/libs/i18nDictionary/thai/book.js","thai:pcclean":"common/libs/i18nDictionary/thai/pcClean.js","vietna:contact":"common/libs/i18nDictionary/vietna/contact.js","vietna:common":"common/libs/i18nDictionary/vietna/common.js","vietna:sms":"common/libs/i18nDictionary/vietna/sms.js","vietna:video":"common/libs/i18nDictionary/vietna/video.js","vietna:myapp":"common/libs/i18nDictionary/vietna/myapp.js","vietna:driver":"common/libs/i18nDictionary/vietna/driver.js","vietna:setting":"common/libs/i18nDictionary/vietna/setting.js","vietna:music":"common/libs/i18nDictionary/vietna/music.js","vietna:tools":"common/libs/i18nDictionary/vietna/tools.js","vietna:backupRestore":"common/libs/i18nDictionary/vietna/backupRestore.js","vietna:task":"common/libs/i18nDictionary/vietna/taskManager.js","vietna:image":"common/libs/i18nDictionary/vietna/image.js","vietna:fileManager":"common/libs/i18nDictionary/vietna/fileManager.js","vietna:guide":"common/libs/i18nDictionary/vietna/guide.js","vietna:signin":"common/libs/i18nDictionary/vietna/signin.js","vietna:book":"common/libs/i18nDictionary/vietna/book.js","vietna:pcclean":"common/libs/i18nDictionary/vietna/pcClean.js","farsi:contact":"common/libs/i18nDictionary/farsi/contact.js","farsi:common":"common/libs/i18nDictionary/farsi/common.js","farsi:sms":"common/libs/i18nDictionary/farsi/sms.js","farsi:video":"common/libs/i18nDictionary/farsi/video.js","farsi:myapp":"common/libs/i18nDictionary/farsi/myapp.js","farsi:driver":"common/libs/i18nDictionary/farsi/driver.js","farsi:setting":"common/libs/i18nDictionary/farsi/setting.js","farsi:music":"common/libs/i18nDictionary/farsi/music.js","farsi:tools":"common/libs/i18nDictionary/farsi/tools.js","farsi:backupRestore":"common/libs/i18nDictionary/farsi/backupRestore.js","farsi:task":"common/libs/i18nDictionary/farsi/taskManager.js","farsi:image":"common/libs/i18nDictionary/farsi/image.js","farsi:fileManager":"common/libs/i18nDictionary/farsi/fileManager.js","farsi:guide":"common/libs/i18nDictionary/farsi/guide.js","farsi:signin":"common/libs/i18nDictionary/farsi/signin.js","farsi:book":"common/libs/i18nDictionary/farsi/book.js","farsi:pcclean":"common/libs/i18nDictionary/farsi/pcClean.js","traditionalchinese:contact":"common/libs/i18nDictionary/traditionalchinese/contact.js","traditionalchinese:common":"common/libs/i18nDictionary/traditionalchinese/common.js","traditionalchinese:sms":"common/libs/i18nDictionary/traditionalchinese/sms.js","traditionalchinese:video":"common/libs/i18nDictionary/traditionalchinese/video.js","traditionalchinese:myapp":"common/libs/i18nDictionary/traditionalchinese/myapp.js","traditionalchinese:driver":"common/libs/i18nDictionary/traditionalchinese/driver.js","traditionalchinese:setting":"common/libs/i18nDictionary/traditionalchinese/setting.js","traditionalchinese:music":"common/libs/i18nDictionary/traditionalchinese/music.js","traditionalchinese:tools":"common/libs/i18nDictionary/traditionalchinese/tools.js","traditionalchinese:backupRestore":"common/libs/i18nDictionary/traditionalchinese/backupRestore.js","traditionalchinese:task":"common/libs/i18nDictionary/traditionalchinese/taskManager.js","traditionalchinese:image":"common/libs/i18nDictionary/traditionalchinese/image.js","traditionalchinese:fileManager":"common/libs/i18nDictionary/traditionalchinese/fileManager.js","traditionalchinese:guide":"common/libs/i18nDictionary/traditionalchinese/guide.js","traditionalchinese:signin":"common/libs/i18nDictionary/traditionalchinese/signin.js","traditionalchinese:book":"common/libs/i18nDictionary/traditionalchinese/book.js","traditionalchinese:pcclean":"common/libs/i18nDictionary/traditionalchinese/pcClean.js","hindi:contact":"common/libs/i18nDictionary/hindi/contact.js","hindi:common":"common/libs/i18nDictionary/hindi/common.js","hindi:sms":"common/libs/i18nDictionary/hindi/sms.js","hindi:video":"common/libs/i18nDictionary/hindi/video.js","hindi:myapp":"common/libs/i18nDictionary/hindi/myapp.js","hindi:driver":"common/libs/i18nDictionary/hindi/driver.js","hindi:setting":"common/libs/i18nDictionary/hindi/setting.js","hindi:music":"common/libs/i18nDictionary/hindi/music.js","hindi:tools":"common/libs/i18nDictionary/hindi/tools.js","hindi:backupRestore":"common/libs/i18nDictionary/hindi/backupRestore.js","hindi:task":"common/libs/i18nDictionary/hindi/taskManager.js","hindi:image":"common/libs/i18nDictionary/hindi/image.js","hindi:fileManager":"common/libs/i18nDictionary/hindi/fileManager.js","hindi:guide":"common/libs/i18nDictionary/hindi/guide.js","hindi:signin":"common/libs/i18nDictionary/hindi/signin.js","hindi:book":"common/libs/i18nDictionary/hindi/book.js","hindi:pcclean":"common/libs/i18nDictionary/hindi/pcClean.js","turkish:contact":"common/libs/i18nDictionary/turkish/contact.js","turkish:common":"common/libs/i18nDictionary/turkish/common.js","turkish:sms":"common/libs/i18nDictionary/turkish/sms.js","turkish:video":"common/libs/i18nDictionary/turkish/video.js","turkish:myapp":"common/libs/i18nDictionary/turkish/myapp.js","turkish:driver":"common/libs/i18nDictionary/turkish/driver.js","turkish:setting":"common/libs/i18nDictionary/turkish/setting.js","turkish:music":"common/libs/i18nDictionary/turkish/music.js","turkish:tools":"common/libs/i18nDictionary/turkish/tools.js","turkish:backupRestore":"common/libs/i18nDictionary/turkish/backupRestore.js","turkish:task":"common/libs/i18nDictionary/turkish/taskManager.js","turkish:image":"common/libs/i18nDictionary/turkish/image.js","turkish:fileManager":"common/libs/i18nDictionary/turkish/fileManager.js","turkish:guide":"common/libs/i18nDictionary/turkish/guide.js","turkish:signin":"common/libs/i18nDictionary/turkish/signin.js","turkish:book":"common/libs/i18nDictionary/turkish/book.js","turkish:pcclean":"common/libs/i18nDictionary/turkish/pcClean.js","APINames":"common/libs/APINAMES.js","r-cache":"common/libs/r-cache.js","canvas":"common/libs/audio.js","audio":"common/libs/audio.js","UIMenu":"common/view/menu/menu.js","grid":"common/view/grid/grid.js","scrollerProxy":"common/view/scrollerProxy/proxy.js","UIPopup":"common/view/popup/popup.js","UISidebar":"common/view/sidebar/sidebar.js","UIHeader":"common/view/header/header.js","SuggestView":"common/view/header/suggestView.js","UIRegister":"common/view/header/register.js","UILogin":"common/view/header/login.js","UIPersonalView":"common/view/header/personalView.js","UISelectPortraitView":"common/view/header/selectPortrait.js","UIWindow":"common/view/window/window.js","Typeahead":"common/view/typeahead/typeahead.js","UISmartTip":"common/view/smartTip/smartTip.js","UIChatBox":"common/view/chatBox/chatBox.js","UIDialog":"common/view/dialog/dialog.js","UIConnectionView":"common/view/connGuide/connectionView.js","UIAbout":"common/view/aboutMe/aboutMe.js","UISetting":"common/view/setting/setting.js","UIDriverAdapter":"common/view/driverAdapter/driverAdapter.js","UIFriendlyView":"common/view/friendlyConn/view.js","UIRing":"common/view/ring/ring.js","loading":"common/view/loading/loading.js","UIImagePlayer":"common/view/imagePlayer/player.js","ProgressDialog":"common/view/progress/progress.js","ProgressPanel":"common/view/progress/progressPanel.js","UItoolTip":"common/view/toolTip/toolTip.js","NoNet":"common/view/noNet/noNet.js","UISetTips":"common/view/setTips/setTips.js","UINewGuide":"common/view/newbieGuide/newbieGuide.js","UIEggView":"common/view/egg/egg.js","UIgetAdbState":"common/view/getAdbState/getAdbState.js","gridModel":"common/model/modelGridBase.js","connectionMgr":"common/model/connection.js","searchSuggestion":"common/model/suggestion.js","userCenter":"common/model/userCenter.js","boot":"common/controller/boot.js","homeController":"home/controller/homeCtr.js","homeModel":"home/model/model.js","UIHomeMainView":"home/view/homeView.js","contactController":"contact/controller/contactCtr.js","contactModel":"contact/model/contactModel.js","UIContactView":"contact/view/contact.js","contactEditorView":"contact/view/contactEditorView.js","GroupEditorView":"contact/view/groupEditorView.js","ContactDetailPanel":"contact/view/contactDetailPanel.js","appController":"application/controller/appCtr.js","appModel":"application/model/model.js","UIAppMainView":"application/view/mainView.js","gameController":"resource/controller/gameCtr.js","appResController":"resource/controller/appResCtr.js","wallpaperController":"resource/controller/wallpaperCtr.js","ringtoneController":"resource/controller/ringtoneCtr.js","youtubeController":"resource/controller/youtubeCtr.js","bookController":"resource/controller/bookCtr.js","wallpaperView":"resource/view/wallpaper/wallpaperView.js","appResView":"resource/view/app/appResView.js","gameView":"resource/view/game/gameView.js","ringtoneView":"resource/view/ringtone/ringtoneView.js","youtubeView":"resource/view/youtube/youtubeView.js","bookView":"resource/view/book/bookView.js","imageModel":"image/model/model.js","imageController":"image/controller/imageCtr.js","UIImageView":"image/view/imageView.js","smsController":"sms/controller/smsCtr.js","smsModel":"sms/model/model.js","SearchContactModel":"sms/model/searchContactModel.js","UISmsView":"sms/view/smsView.js","UISmsBoxView":"sms/view/smsBoxView.js","UISmsSendView":"sms/view/smsSendView.js","videoController":"video/controller/videoCtr.js","videoModel":"video/model/model.js","YoutubeModel":"video/model/youtubeModel.js","UIVideoView":"video/view/videoView.js","myBookController":"book/controller/mybookCtr.js","myBookModel":"book/model/model.js","UIBookView":"book/view/mybookView.js","musicController":"music/controller/musicCtr.js","musicModel":"music/model/model.js","UIMusicView":"music/view/musicView.js","taskController":"taskManager/controller/taskController.js","taskModel":"taskManager/model/model.js","taskView":"taskManager/view/taskView.js","toolsMainController":"tools/controller/toolsCtr.js","UIToolsMainView":"tools/view/toolsMainView/toolsMainView.js","UIBackup":"tools/view/backupRestoreView/backupView.js","UIRestore":"tools/view/backupRestoreView/restoreView.js","FileIconView":"tools/view/fileManagerView/fileIconView.js","FileManager":"tools/view/fileManagerView/fileManagerMainView.js","FileTableView":"tools/view/fileManagerView/fileTableView.js","DeviceInfoView":"tools/view/deviceInfoView/deviceInfoView.js","PcCleaner":"tools/view/pcCleanerView/pcCleanerMainView.js","WifiHotpotView":"tools/view/wifiHotPot/wifiHotpotView.js","backupModel":"tools/model/backupRestoreModel/backupModel.js","FileManagerModel":"tools/model/fileManagerModel/fileManagerModel.js","pcCleanerModel":"tools/model/pcCleanerModel/pcCleanerModel.js","cleanConfig":"tools/model/pcCleanerModel/cleanListConfig.js","WifiHotPotMode":"tools/model/wifiHotpotModel/wifiHotpotModel.js","globalConfig":"globalConfig.js","fbController":"feedback/controller/fbCtr.js","UIFeedback":"feedback/view/feedback.js","genieController":"genie/controller/genieCtr.js","UIGenieView":"genie/view/genieView.js"};window.consoletemp=console.log;console.log=function(){};document.oncontextmenu=function(e){var tagName = e.target.tagName.toLowerCase();if((tagName!="input" && tagName!="textarea") || e.target.type == "checkbox" || e.target.type == "radio"){e.preventDefault();}};