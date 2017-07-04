define("r-cache", function(require, exports, module) {
    var events = require('event');
    var $ = require('jquery');
    var _ = require('underscore');
    var app=require('app');
    var globalConfig=require('globalConfig');
    var isVersionLoaded=0;
    function Rcache(async){
        this.cacheConfig={};
        this.curJson=null;
        this.curJsonStr=null;
        this.curLoadedFiles=[];
        this.jsonfileName=null;
        this.timer=null;
        this.async=true;
        this.versionCode=Math.random();
        this.getVersionCode();
        
    };
    _.extend(Rcache.prototype,{
        jsonDomain:globalConfig.domain.publicMobogenie,
        setjsonfileName:function(obj){
            if(!$.isArray(obj)){
                console.error('type error,it must be array!');
            };
            this.jsonfileName=obj.join('-')+'-json';
        },
        getVersionCode:function(callback){
            var _this=this;
            var parasBefore=app.getCurHashParas();
            
            if(isVersionLoaded==1){
                if(typeof callback=='function'){
                    var versionCode=this.getStorage('versionCode');
                    if(versionCode){
                        try{
                        this.versionCode=eval(versionCode)[0];
                        }catch(e){}
                    }
                    callback();
                }
                return;
            }
            $.ajax({
                   type: "GET",
                   url: this.jsonDomain+'resource/versionCode.js'+'?v='+Math.random(),
                   data: '',
                   async:this.async,
                   dataType: 'text',
                   beforeSend:function(xhr){
                        xhr.setRequestHeader("Cache-Control","no-cache");
                   },
                   success: function(msg){
                        var parasAfter=app.getCurHashParas();
                        console.log('nnnnnnnnnnnnnnnnnnnnnnnnnn',parasBefore.action,parasAfter.action)
                        if(parasBefore.module==parasAfter.module&&parasBefore.action!=parasAfter.action){return;}
                        isVersionLoaded=1;
                        this.setStorage('versionCode',msg);
                        try{
                        this.versionCode=eval(msg)[0];
                        }catch(e){}
                        if(typeof callback=='function'){
                            callback();
                        }
                   }.bind(this),
                   error:function(e){
                        var parasAfter=app.getCurHashParas();
                        console.log('nnnnnnnnnnnnnnnnnnnnnnnnnn',parasBefore.action,parasAfter.action)
                        if(parasBefore.module==parasAfter.module&&parasBefore.action!=parasAfter.action){return;}
                        this.trigger('getConfigError');
                        console.error(e);
                    }.bind(this)
                });
        },
        getConfig:function(obj,url,callback){//拉取资源配置文件
            var parasBefore=app.getCurHashParas();
            this.getVersionCode(function(){
                $.ajax({
                   type: "GET",
                   url:this.jsonDomain+url+'?v='+this.versionCode,
                   data: '',
                   timeout:5000,
                   dataType: 'text',
                   beforeSend:function(xhr){
                        // xhr.setRequestHeader("Cache-Control","no-cache");
                   },
                   success: function(msg){
                    if(!navigator.onLine){
                        this.trigger('getConfigError');
                        return;
                    }
                    var parasAfter=app.getCurHashParas();
                    console.log('nnnnnnnnnnnnnnnnnnnnnnnnnn',parasBefore.action,parasAfter.action)
                    if(parasBefore.module==parasAfter.module&&parasBefore.action!=parasAfter.action){return;}
                    this.curLoadedFiles=[];
                    this.cacheConfig={};
                    this.curJsonStr=msg;
                    this.setjsonfileName(obj);
                    try{
                        var msgJSON=eval(msg);
                    }catch(e){
                        this.trigger('getConfigError');
                        return;
                    }
                    console.log('config==========',msgJSON)
                    this.curJson=msgJSON;
                     var localConfig=this.getStorage(this.jsonfileName);//获取本地存储的资源配置文件函数
                    var localConfigJSON=null;
                     if(localConfig){
                        try{
                            localConfigJSON=eval(localConfig);
                        }catch(e){
                            this.trigger('getConfigError');
                            return;
                        }
                     };
                     this.compareConfig(localConfigJSON,msgJSON);
                     this.off('filesAllReady');
                     this.off('filesSomeoneReady');
                     this.on('filesSomeoneReady',function(){
                        console.log('filesSomeoneReady',this.timer)
                        if(this.timer){clearTimeout(this.timer);}
                     }.bind(this));
                     this.on('filesAllReady',function(){
                        this.setStorage(this.jsonfileName,this.curJsonStr);
                     }.bind(this));
                     // this.setStorage(this.jsonfileName,msg);
                    if(callback){
                        callback(this.cacheConfig);
                    }
                    if(this.timer){clearTimeout(this.timer);}
                    this.timer=setTimeout(function(){
                        this.trigger('filesNotAllReady');
                    }.bind(this),15000);
                     this.trigger('getConfigSuccess');
                   }.bind(this),
                    error:function(e){
                        var parasAfter=app.getCurHashParas();
                        console.log('nnnnnnnnnnnnnnnnnnnnnnnnnn',parasBefore.action,parasAfter.action)
                        if(parasBefore.module==parasAfter.module&&parasBefore.action!=parasAfter.action){return;}
                        this.trigger('getConfigError');
                        console.error(e);
                    }.bind(this)
                });
            }.bind(this));
            
        },
        isFilesAllReady:function(fileName){
            var curfileName=this.curJson.map(function(item){
                return item[1];
            });
            if(this.curLoadedFiles.indexOf(fileName)<0&&curfileName.indexOf(fileName)>-1){
                this.curLoadedFiles.push(fileName);
            };
            if((this.curJson.length<=3&&this.curLoadedFiles.length>0)||(this.curJson.length>3&&this.curLoadedFiles.length>=3)){
                this.trigger('filesSomeoneReady');
                console.log('filesSomeoneReady--------------',this.curJson.length,this.curLoadedFiles.length)
            }
            if(this.curLoadedFiles.length>=this.curJson.length){
                this.trigger('filesAllReady');
                
            }
        },
        compareConfig:function(localConfigJSON,msgJSON){//比较配置文件0位是否跟本地缓存配置文件0位相同，相同从本地读取资源文件
            
            if(localConfigJSON){
                for(var i=0,ii=msgJSON.length;i<ii;i++){
                    // try{
                        if(localConfigJSON[i]&&localConfigJSON[i][0]===msgJSON[i][0]){
                            this.cacheConfig[msgJSON[i][1]]=this.getStorage(msgJSON[i][1])?[1,this.getStorage(msgJSON[i][1])]:[0,msgJSON[i][2]];
                        }else{
                            this.cacheConfig[msgJSON[i][1]]=[0,msgJSON[i][2]];
                        }
                    // }catch(e){}
                }
            }else{
                for(var i=0,ii=msgJSON.length;i<ii;i++){
                    this.cacheConfig[msgJSON[i][1]]=[0,msgJSON[i][2]];
                }
            }
        },
        getFiles:function(fileName,callback){
            var parasBefore=app.getCurHashParas();
            var _this=this;
            if(!this.cacheConfig[fileName]){return;};
            if(this.cacheConfig[fileName][0]==1){
                var parasAfter=app.getCurHashParas();
                console.log('ffffffffffffffffffffffffffffffff',parasBefore.action,parasAfter.action)
                if(parasBefore.module==parasAfter.module&&parasBefore.action!=parasAfter.action){return;}
                callback([fileName,this.cacheConfig[fileName][1]]);
                this.isFilesAllReady(fileName);
            }else{
                this.getVersionCode(function(){
                    $.ajax({
                       type: "GET",
                       url: this.jsonDomain+this.cacheConfig[fileName][1]+'?v='+this.versionCode,
                       data: '',
                       dataType: 'text',
                       timeout:10000,
                       beforeSend:function(xhr){
                            xhr.setRequestHeader("Cache-Control","no-cache");
                       },
                       success: function(msg){
                            var parasAfter=app.getCurHashParas();
                            console.log('ffffffffffffffffffffff',parasBefore.action,parasAfter.action)
                            if(parasBefore.module==parasAfter.module&&parasBefore.action!=parasAfter.action){return;}
                            _this.setStorage(fileName,msg);
                            _this.isFilesAllReady(fileName);
                           callback([fileName,msg,1]);
                       }.bind(this),
                       error:function(e){
                            var parasAfter=app.getCurHashParas();
                            console.log('ffffffffffffffffffffffff',parasBefore.action,parasAfter.action)
                            if(parasBefore.module==parasAfter.module&&parasBefore.action!=parasAfter.action){return;}
                            this.trigger('getFilesError');
                            console.error(e);
                        }.bind(this)
                    });
                }.bind(this))
            }
        },
        setStorage:function(key,value){
             if(localStorage){
                if(typeof value!='string'){
                    console.error('storage type error,it must be string!');
                    return;
                };
                localStorage[key]=value;
             }
        },
        getStorage:function(key){
             if(localStorage){
                if(localStorage[key]){
                    return localStorage[key];
                }else{
                    return false;
                }
             }
        },
    },events);
    
    return Rcache;
}); 