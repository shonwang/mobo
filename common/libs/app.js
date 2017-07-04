define('app', function(require, exports, module){
     var  utils = require('utils');
     var      _ = require('underscore');
     var      $ = require('jquery');
     var events = require('event');
     var Config = require('globalConfig');
     
     document.addEventListener("dragstart", function(e){  
         e.preventDefault();
     }, false); 
     
     document.addEventListener("dragenter", function(e){  
         e.preventDefault();
     }, false); 
     document.addEventListener("mousedown", function(e){  
         if(e.button===1){
            e.preventDefault();
          }
     });          
     document.addEventListener('keydown', function(e){
         var tag = e.target.tagName.toLowerCase();
         
         //禁掉默认的后退功能
         if(e.keyCode === 8 && tag != 'input' && tag != 'textarea'){
             e.preventDefault();
             
             if(historyManager.startIndex == 1){
                 if(historyManager.curIndex > 0){
                     historyManager.back();
                 }
             }else{
                 historyManager.back();
             }
         }
     });
     
     //禁止a标签的默认行为
     $(document.body).delegate("a", "click", function(e){
         e.preventDefault();
         
         var href = this.href;
             
         if(!href){
             return;
         }
         
         if(href.slice(0, 5) != 'file:' && href.slice(0, 10) != 'javascript'){
             utils.browser(href);
         }
     });
     
     
     var eventCenter = _.extend({}, events);
     
     //数据访问层(DAL)
     var dalWorker = null;
     
     var dal = {
          _callback: {},
          observers: {},
          onWorkerMessage: function( ev ){
              var data = ev.data;
              if(typeof this._callback[data.__uid] === 'function'){
                  this._callback[data.__uid].call(this, data.response);
                  delete this._callback[data.__uid];
              }
          },
          
         /*
           *@paras opts {Object} 参数
           * paras: {
           *          action: 'getImage',
           *          paras: {},
           *          callback: function(){
           *          
           *          }
           *       }
           */
         request: function ( opts ){
              var me = this;
              var action = opts.action;
              var paras = opts.paras || {};
              var callback = opts.callback;
              var requestId = utils.getUID();
              
              this._callback[requestId] = callback || function(){};
              cef.removeMessageCallback(action);
              
              this._callback[action] = function(actionName, args){
                   var res = args[0];//后端返回的数据
                   var rid = args[1];//请求id
                   
                //   console.log(actionName, res);
                   //try{
                       if( !rid ){
                           var res = JSON.parse(res);
                           
                           callback && callback.apply(me, [res]);
                       }else{
                           var json = JSON.stringify({
                               __uid: rid,
                               response: res
                           });
                           dalWorker.postMessage(json);   
                       }
                       /*
                   }catch(e){
                       console.log('%c' + e.message, 'color:red;font-size: 20px;');
                   }*/
                  console.log('RESPONSE:', actionName, typeof res == 'string' ? JSON.parse(res) : res, args[1]);
              };
              
              cef.setMessageCallback(action, this._callback[action]);
              
              if( !dalWorker ){
                  dalWorker = dalWorker || new Worker(module.dirname + '/parser.js');
                  dalWorker.onmessage = _.bind(this.onWorkerMessage, this);
              }
              console.log('REQUEST:', action, paras);
              cef.sendMessage(action, [JSON.stringify(paras), requestId]);
          },
          /*
           *@paras bindingName {string} 后端事件唯一 bindingName
           *@paras handler {function} 前端回调
           */
          binding: function( bindingName, callback,multi){
              var me = this;
              var observers = this.observers[bindingName] = this.observers[bindingName] || [];
              observers.push(callback);
              
              if(!multi){
                cef.removeMessageCallback(bindingName);    
              }
              
              cef.setMessageCallback(bindingName, function(bn, args) {
                  var res;
                  try{
                      res = JSON.parse(args[0]);
                  }catch(e){
                      res = args[0];
                  }
                   
                  observers.forEach(function ( cb ) {
                      cb.call(me, res);
                  });
              });
          },
          unbinding: function( bindingName, callback ){
              if(arguments.length === 1){
                  cef.removeMessageCallback(bindingName);
              }else{
                  var cbs = this.observers[bindingName] || [];
                  var indexOf = cbs.indexOf(callback);
                  
                  if(indexOf > -1){
                      cbs.splice(indexOf, 1);
                  }
                  if(cbs.length === 0){
                      cef.removeMessageCallback(bindingName);
                  }
              }
          }
     };
     
    var historyManager = _.extend({
        curIndex: 0,
        history: [],
        startIndex: 0,
        pushState: function(hash){
            this.curIndex = this.length() - 1;
            this.history.push(hash);
            this.trigger('statechange');
        },
        back: function(){
            this.curIndex -= 1;
            history.back();
            this.trigger('statechange');
        },
        forward: function(){
            this.curIndex += 1;
            history.forward();
            this.trigger('statechange');
        },
        length: function(){
            return history.length - this.startIndex;
        }
    }, events);
    
    //控制管理器
    var controllerManager = {
         //controller 配置 key: hash, value: controller 模块
         preController: null,
         controllerConfig : {},
          
          controllerInstance: {},
          curController: null,
          
          /*
           *@paras paras {Object} 
           * paras structure: {
           *    module: 'welcome',
           *    action: 'welcome',
           *    query: {
           *       a: 1,
           *           b: 2
           *       },
           *    pageState: {
           *      show: true,
           *      direction: 1
           *    }
           *}
           */
        dispatch: function(paras){
              var module = paras.module;
               var action = paras.action;
               var controllerKey = module + '/' + action;
               
               if(!this.controllerConfig[controllerKey]){
                   console.error('Please specify the controller config:' + controllerKey);
                    return;
               }
               eventCenter.trigger('switchpagestart', paras);
               
               if(this.curController){
                   this.preController = this.curController;
                   try{
                       this.curController.trigger('screenout', this.curController.getHashParas());
                   }catch(e){
                       console.log('throw error in', this.curController.getHashParas(), e);
                   }
               }
               
               //try{
                   if(!this.controllerInstance[controllerKey]){
                       var ctrMdlName = this.controllerConfig[controllerKey].controllerModule;
                       
                       if(!ctrMdlName){
                           console.error('Please specify the module Name of' + module + '/' + action);
                           return;
                       }
                       
                       var Controller = require(ctrMdlName);
                       this.controllerInstance[controllerKey] = new Controller(paras);
                   }else{
                       this.controllerInstance[controllerKey].update();
                   }
                   this.curController = this.controllerInstance[controllerKey];
               //}catch(e){
                   //console.warn(e.message);
               //}
               
               try{
                   this.curController.trigger('screenin', paras);
               }catch(e){
                   console.log('throw error in', paras, e);
               }
               
               eventCenter.trigger('switchpageend', paras);
               
               this.sendStatistics(paras);
              //*********************************************************
              //20140724 新版日志
               this.caculatePageTime(paras);
              //********************************************************* 
          },
          
          //*********************************************************
          //20140724 新版日志-访问时长
          caculatePageTime: function(paras){
              var lastPageTime = utils.getNewLastPageTime();
              console.log(lastPageTime)
              var preModuleKey = '';
              var moduleKey = paras.module + '_' + paras.action;

              if(this.preController){
                 var preParas = this.preController.hashParas;
                 preModuleKey = preParas.module + '_' + preParas.action;
              } else {
                 preModuleKey = "home_home";
              }
              var time = new Date().valueOf();
              console.log(time)
              var remainTime = time - lastPageTime; 
              utils.setLastPageTime(new Date().valueOf());

              if(moduleKey != preModuleKey){
                var logObject = {
                    class: utils.convertHashKeyByLog(preModuleKey),
                    page: utils.convertHashKeyByLog(preModuleKey),
                    duration: remainTime,
                }
                utils.sendNewLog("1000102", logObject);
              }
          },
          //*********************************************************
          sendStatistics: function(paras){
               var preModuleKey = '';
               var moduleKey = paras.module + '_' + paras.action;
               
               if(this.preController){
                   var preParas = this.preController.hashParas;
                   preModuleKey = preParas.module + '_' + preParas.action;
               } else {
                   preModuleKey = "launch_client";
               }
               
               //如果上次跟当前模块也不同， 就是算进入一个页面
               if(moduleKey != preModuleKey){
                   var action = '';
                   switch(moduleKey){
                       case 'home_home' : 
                           action = utils.statisticsCode.GO_HOME; 
                           break;
                       case 'resource_app' : 
                           action = utils.statisticsCode.GO_RESOURCE_APP; 
                           break;
                       case 'resource_game' : 
                           action = utils.statisticsCode.GO_RESOURCE_GAMES;
                           break;
                       case 'resource_ringtone':
                           action = utils.statisticsCode.GO_RESOURCE_RETONGE;
                           break;
                       case 'resource_wallpaper':
                           action = utils.statisticsCode.GO_RESOURCE_WALLPAPER;
                           break;
                       case 'resource_youtube':
                           action = utils.statisticsCode.GO_RESOURCE_YOUTUBE;
                           break;
                       case 'tools_tools':
                           action = utils.statisticsCode.GO_TOOLS;
                           break;
                       case 'contact_contact':
                           action = utils.statisticsCode.GO_MYCONTACT;
                           break;
                       case 'sms_sms':
                           action = utils.statisticsCode.GO_MYSMS;
                           break;
                       case 'app_app':
                           action = utils.statisticsCode.GO_MYAPP;
                           break;
                       case 'music_music': 
                           action = utils.statisticsCode.GO_MYMUSIC;
                           break;
                       case 'image_image':
                           action = utils.statisticsCode.GO_MYPICTURE;
                           break;
                       case 'video_video':
                           action = utils.statisticsCode.GO_MYVIDEO;
                           break;
                       case 'task_task':
                           action = utils.statisticsCode.GO_TASK_CENTER;
                           break;
                   }
                  
                   utils.sendStatistics({
                       action: action,
                       fromPage: preModuleKey,
                       toPage: moduleKey
                   });   
               }
          },
          
          /*
           *@paras router {String} 模块hash: module/action
           *@paras ctrModule {String} Controller 对应的模块名称 
           */
          addRouter: function(router, opts){
              this.controllerConfig[router] = opts;
          }
    };
     
     /*
      *@ControllerBase 基础构造器， 任何一个子controller继承该类。
      *@paras {Object} hash paras
      */
     function ControllerBase( paras ){
         this.hashParas = paras;
         this.initilize.apply(this, arguments); 
     }
     
     _.extend(ControllerBase.prototype, {
         pageId: null,
         //key为view使用名称， value 为模块名称
         commonViews: {
             connetView: 'UIFriendlyView',
             sidebar: 'UISidebar',
             header: 'UIHeader'
         },
        
         views: {},
         ViewConfig: {},
         initilize: function( paras ){
             this.pageId = utils.randomStr(8);
             this.page = $(document.createElement('div'));
             this.page.addClass('g-page-ctn');
             this.page.attr('id', this.pageId);
             this.page.appendTo($('#i-modules'));
             
             this.on('screenout', function(){
                  var curHash = getCurHashParas();
                  //如果切换的任务管理器， 那当前的controller不出场
                  if(curHash.module !== 'task'){
                      this.screenOut();
                  }
             });
             
             this.on('screenin', this.screenIn);
             
             /*
              * 在每个controller监听controller事件
              * 当前切换到的controller与当前controller非同一个， 则当前controller页面出场
              * 如果在task模块出场， 在这里不处理
              */
             eventCenter.on('switchpagestart', _.bind(function(e){
                 var switchCtr = e.module + e.action;
                 var curCtr = this.hashParas.module + this.hashParas.action;
                 
                 if(switchCtr !== curCtr && 
                   this.hashParas.module !== 'task' && e.module !== 'task'){
                     this.screenOut();
                 }
             }, this));
             
             this.initCommonViews();
             this.init( paras );
         },   
          
         screenOut: function(){
             this.page.removeClass('g-page-show').addClass('g-page-hide');
         },
         
         screenIn: function(){
             this.page.removeClass('g-page-hide').addClass('g-page-show');
         },
         
         initCommonViews: function(){
             for(var name in this.commonViews){
                 var View = require(this.commonViews[name]);
                     
                 if(typeof View == 'function'){
                     if(!this.views[name]){
                         this.views[name] = new View();
                         
                         //处理未连接页面初始化状态
                         if(name == 'connetView'){
                             var connection = require('connectionMgr');
                             var switchConnetView = function(){
                                 
                                 var hashParas = getCurHashParas();
                                 
                                 if(connection.isConnect()){
                                     this.views['connetView'].hide();
                                 }else{
                                     if(hashParas.module != 'task'){
                                         if(hashParas.module == 'resource' || hashParas.module == 'feedback'||hashParas.module == 'tools'){
                                             this.views['connetView'].hide();
                                         }else{
                                             this.views['connetView'].hide();
                                         }   
                                     }
                                 }
                             };
                             
                             switchConnetView.apply(this);
                             connection.on('connection', switchConnetView.bind(this));
                             eventCenter.on('switchpageend', switchConnetView.bind(this));
                         }
                     }else{
                         this.views[name].update();
                     }
                 }else{
                     this.views[name] = View;
                     this.views[name].update();
                 }
                 delete this.commonViews[name];
             }
         },
         getHashParas: function(){
             return this.hashParas;
         },
         //跳转控制 paras hash的结构
         redirect: function( paras ){
             navigate(paras);
         },
         //渲染配置的view组件
         render: function( opts ){
             opts = opts || {};
               
             for(var name in opts){
                 var opt = opts[name];
                    
                 //构造器的处理
                 if(typeof this.ViewConfig[name] == 'function'){
                     if(!this.views[name]){
                         var View = this.ViewConfig[name];
                         this.views[name] = new View(opt);
                     }else{
                         this.views[name].update();
                     }
                 }else{
                     this.views[name] = this.ViewConfig[name];
                     this.views[name].update();
                 }
            }
        },
        update: function(){
            
        }          
     }, events, dal);
     
     
     /*
      *@constructor ModelBase
      *@paras opts {Object}
      */
     function Collection(opts){
         this.opts = opts;
         this.models = [];
          
         this.initilize.apply(this, arguments);
     }
     _.extend(Collection.prototype, {
         model: null,
         initilize: function(opts){
              this.init(opts);
         },
         //子类必须覆盖
         parse: function(response){
              return response;
         },
         fetch: function(action, paras){
             var cb = _.bind(
                 function( response ){
					 if (response.status === -1) return; 
                     var list = this.parse(response);
                     var me = this;
                      
                     list = list || [];
                      
                     list.forEach(function( data ){
                         me.push(new me.model( data ));
                     });
                      
                     this.trigger('update');
                 }, this);
                  
              this.request({
                  action: action,
                  paras: paras,
                  callback: cb
              });
          },
          push: function(model){
              this.models.push(model);
          },
          size: function(){
              return this.models.length;
          },
        //add by liujintao 用于应对modelId发生了变化的情况
        updateModel:function(id,modelTmp){
            console.log("app中接到的参数：id和model",id,modelTmp);
            for(var i=0;i<this.models.length;i++){
                if(this.models[i].getId()==id){
                    this.models[i]=modelTmp;
                    break;
                }
            }
        },          
          getIndex: function( model ){
              return this.models.indexOf(model);
          }
     }, events, dal);
     
     /*
      *@constructor ModelBase
      *@paras opts {Object}
      */
     function ModelBase(data, opts){
         this.opts = opts;
          this.data = data;
         this.initilize.apply(this, arguments); 
     }
     _.extend(ModelBase.prototype, {
         initilize: function(opts){
              this.init && this.init(opts);
          },
          //操作数据的属性
          set: function(key, value){
              var origin = this.data[key];
               if(origin != value){
                  this.data[key] = value;
                  this.trigger('change', this.data);
               }
          },
          get: function(key){
              return this.data[key];
          },
          setData: function( data ){
              this.data = data;
               this.trigger('change', this.data);
          },
          getProperty: function(property){
              return this[property];
          },
          //设置Model本身的属性
          setProperty: function(property, value){
              this[property] = value;
          },
          fetch: function(paras){
              
          },
          toJSON: function(){
              return JSON.stringify(this.data || {});
          }
     }, events, dal);
     
     var template = require('template');
     /*
      *@constructor ViewBase
      *@paras opts {Object}
      */
     function ViewBase(opts){
         this.opts = opts;
         this.initilize.apply(this, arguments); 
     }
     _.extend(ViewBase.prototype, {
         el: null,
         module: null,
         initilize: function(opts){
              this.init(opts);
              this.delegate();
          },
          delegate: function(){
              var evts = this.events;
               for(var key in evts){
                   var split = key.split('->');
                   var methodName = evts[key];
                   this.el.delegate(split[1].trim(), split[0].trim(), _.bind(this[methodName], this));
               }
          },
          //overrite
          update: function(){
              //TODO
          },
          render: function(){
              
          },
          
          addClass: function(className){
              this.el.addClass(className);
          },
          
          getTpl: function(id){
              return template.getTpl(
                   this.module.dirname + '/' + this.module.fileName + '.html', id);
          },
          show: function(){
              this.el.show();
          },
          hide: function(){
              this.el.hide();
          }
     }, events);
     
     
    // Helper function to correctly set up the prototype chain, for subclasses.
    // Similar to `goog.inherits`, but uses a hash of prototype properties and
    // class properties to be extended.
    var extend = function(protoProps, staticProps) {
        var parent = this;
        var child;
        
        // The constructor function for the new subclass is either defined by you
        // (the "constructor" property in your `extend` definition), or defaulted
        // by us to simply call the parent's constructor.
        if (protoProps && _.has(protoProps, 'constructor')) {
          child = protoProps.constructor;
        } else {
          child = function(){ return parent.apply(this, arguments); };
        }
        
        // Add static properties to the constructor function, if supplied.
        _.extend(child, parent, staticProps);
        
        // Set the prototype chain to inherit from `parent`, without calling
        // `parent`'s constructor function.
        var Surrogate = function(){ this.constructor = child; };
        Surrogate.prototype = parent.prototype;
        child.prototype = new Surrogate;
        
        // Add prototype properties (instance properties) to the subclass,
        // if supplied.
        if (protoProps) _.extend(child.prototype, protoProps);
        
        // Set a convenience property in case the parent's prototype is needed
        // later.
        child.__super__ = parent.prototype;
        
        return child;
    };
    
    var getPreHash = function(){
        if(controllerManager.preController){
            return controllerManager.preController.hashParas;
        }
        return null;
    };
     
     var getCurController = function(){
         return controllerManager.curController;
     };
     
     var getCurHashParas = function(){
         var hash = window.location.hash.slice(1);
         var paras = utils.converHashToJson(hash);
          return paras;
     };
    
     //根据 valid hash路由到相应的controller
    var router = function(){
        var hash = window.location.hash.slice(1);
          
         if(!utils.validateHash(hash)){
             console.error('Invalid hash:'+hash);
             return;
         }
         var paras = utils.converHashToJson(hash);
         controllerManager.dispatch(paras);
    };
     
     /*
      * @paras paras{
      *     module: 'name',
      *     acton: 'action',
      *     query: {},
      *     pageState: {}
      * } hash参数
      * @paras opts{
      *     overrite: true//覆盖
      * }
      */
     var navigate = function(paras, opts){
         opts = opts || {};
         
         var cfg = null;
         for(var i in Config.ctrConfig){
             if(Config.ctrConfig[i].module == paras.module && 
                 Config.ctrConfig[i].action == paras.action){
                 cfg = Config.ctrConfig[i];
             }
         }
         
         if(!cfg){
             console.error('Controller ' + paras.module + '没配置...');
         }
         
         //如果没有指定覆盖的情况下， 用默认配置的参数和当前给定的参数进行合并。
         //当前给定的参数优先， 
         //默认配置的参数会动态生成当前合并后的参数
         
         var query, pageState, hashObj = {};
         
         if(opts.merge){
             var curHash = getCurHashParas();
             var preQuery = _.extend({}, curHash.query);
             var prepPageState = _.extend({}, curHash.query);
             
             query = _.extend(preQuery, paras.query);
             pageState = _.extend(prepPageState, paras.pageState);
         }else{
             query = _.extend({}, paras.query);
             pageState = _.extend({}, paras.pageState);
         }
         
         if(opts.mergeCache){
             query = _.extend({}, cfg['query'], query);
             pageState = _.extend({}, cfg['pageState'], pageState);
         }
         
         if(typeof opts.cache == 'undefined' || opts.cache){
             cfg['query'] = query;
             cfg['pageState'] = pageState;
         }
         
         
         hashObj.module = paras.module;
         hashObj.action = paras.action;
         hashObj.query = query;
         hashObj.pageState = pageState;
         
         var hash = utils.convertJsonTohash(hashObj);
         
         window.location.hash = '#' + hash;
         historyManager.pushState(paras);
     };
     
     var start = function(){
         var hash = window.location.hash.slice(1);
         window.onhashchange = router;
         hash && router();
     };
     
     exports.addRouter = function(){
         controllerManager.addRouter.apply(controllerManager, arguments);
     };
     
     ControllerBase.extend = ModelBase.extend = ViewBase.extend = Collection.extend = extend;
     
     
     
      /**
      *
      * @constructor PopupPanel C++ popup Panel, A panel object will embed a entry of .html file  
      *         var win = new app.PopupPanel({
      *              Model: 1,//Model=1 模式窗口， =2 非模式窗口，在父窗口之上， =3非模式窗口，可以层叠
      *              Width: 500,
      *             Height: 500,
      *             DragWindowHeight: 30,
      *             Parame: {a:1},
      *             Path: 'setting.html'
      *         });
      *         win.on('message', function(msg){
      *             
      *         });
      *         win.open();
      */
     
     var PopupPanel = ViewBase.extend({
         init: function( opts ){
             this.opts = _.extend({}, opts);
             this.opts.Height=this.opts.Height&&(Number(this.opts.Height)+10);
             this.bindingId = utils.randomStr(10);
             this.dir = decodeURIComponent(location.pathname.slice(1, location.pathname.lastIndexOf('/')));
             this.ready = false;
             dal.binding(this.bindingId, _.bind(this.onMessage, this));
             
             eventCenter.on('switchLanguage', (function(language){
                 this.sendMessage({
                     action: 'switchLanguage',
                     language: language
                 });
             }).bind(this));
         },
         onMessage: function(msg){
             if(msg.windowReady){
                this.ready=true;                 
             }
             this.trigger('message', msg);
         },
         open: function(){
             var paras = _.extend({}, this.opts);
             var i18nDi = require('I18NDI');
             
             paras.Parame = paras.Parame || {}
             paras.Parame.language = i18nDi.getLanguage();
             
             if(DEBUG){
                 if(this.dir.indexOf('/winentry') > -1){
                     paras.Path = this.dir + '/' + paras.Path;
                 }else{
                     paras.Path = this.dir + '/winentry/' + paras.Path;
                 }
             }else{
                 /*modified by liujintao 2014-18-11
                  * fixed the bug cann't open dialog in release version 
                  * */
                 if(this.dir.indexOf('/winentry') > -1){
                     paras.Path = this.dir + '/' + paras.Path;
                 }else{
                     paras.Path = this.dir + '/winentry/' + paras.Path;
                 }
                // paras.Path = this.dir + '/winentry/' + paras.Path;
             }
             
             
             paras.Model = paras.Model || 1;
             paras.DragWindowHeight = paras.DragWindowHeight || 34;
             paras.BindName = this.bindingId;
             
             paras.Parame = window.encodeURIComponent(JSON.stringify(paras.Parame));
             
             var req = {
                 action: 'get_PopupCefWindow',
                 paras: paras,
                 callback: function(){}
             }
             dal.request(req);
         },
         sendMessage: function(msg,callback){
             var me = this;
             var timer=setInterval(function(){
                 if(me.ready){
                     dal.request({
                         action: 'get_NotifyCefWindow',
                         paras: {
                             BindName: me.bindingId,
                             info: msg
                         },
                         callback: function(res){
                             callback&&callback(res);
                         }
                     });        
                     clearInterval(timer);               
                 }
             },50);

         },
         restore: function(){
             this.sendMessage({
                 restore: 1
             });
         }
     }, events);
     
     
     var getUserConfig = function(callback){
         var config = {};
		 var apiNames = require('APINames');
         dal.request({
             action: apiNames.REQ_GET_USER_CONFIG,
             paras: {},
             callback: function(res){
				console.log(res);
                 callback && callback.call(this, res);
             }
         });
     };
     
     var setUserConfig = function(config, callback){
         config = config || {};
		 var apiNames = require('APINames');
         dal.request({
             action: apiNames.REQ_SET_USER_CONFIG,
             paras: config,
             callback: callback
         });
     };
     
     var getServiceUrl = function(callback){
         var apiNames = require('APINames');
         dal.request({
             action: apiNames.REQ_SERVICE_URL,
             callback: function(res){
             	dal.request({
             		action: "get_UserConfInfo",
             		callback: function(res2){
             			if( res2.info.site ){
             				$.each(res2.info.site,function(index,item){
	             				if( res.site == item.resourceLanguage){
		             				res.imageUrl = item.imageUrl;
		             				res.localServer = item.server_voga360;
		             				res.market = item.market_voga360;
		             				res.publicUrl = item.public_voga360;
		             				res.searchUrl = item.search_voga360;
		             				res.uploadUrl = item.upload_voga360;
	             					var config = require('globalConfig');
	                 				config.setService(res);
	                 				callback && callback.call(this, res);
	                 				dal.request({
							            action: apiNames.REQ_SWICH_SITE,
							            paras : item,
							            callback :function(r){
							            }
							        });
	                 				
	             				}
	             			});
             			}else{
             				var config = require('globalConfig');
             				config.setService(res);
             				callback && callback.call(this, res);
             			}
             		}
             	});
             }
         });
     };
     
     
     dal.binding("set_ReceiverInfoFromPopup", function(message){
         
         if(message.action == "navigate"){
             var paras = message.paras;
             navigate(paras);
         }else if(message.action == "install"){
             var taskModel = require("taskModel");
             var paras = message.paras;
             taskModel.batchDownload(paras);
         }else if(message.action == "backup"){
             var ToolsMainView = require('UIToolsMainView');
             
             var connection = require("connectionMgr");
             
             if(connection.isConnect()){
                 ToolsMainView.Backup();
             }else{
                 var hdr = function(){
                     if(connection.isConnect()){
                         ToolsMainView.Backup();
                         connection.off('connection', hdr);
                     }
                     
                 }.bind(this);
                 connection.on('connection', hdr);
             }
         }else if(message.action=="pcClean"){
         	 var ToolsMainView = require('UIToolsMainView');
             console.log("弹窗调用清理大师");
             ToolsMainView.PcCleaner({size:message.size});
         }else if(message.action=="wifiConnect"){
         	 var connection = require("connectionMgr");
         	 var Friendly = require('UIFriendlyView');
         	 var nowStatus = connection.getStatus();
        	 var connStatus = connection.status;
        	 if( nowStatus != connStatus.WM_DEVICE_MSG_CONNECTSUCCEEDED ){
             	if(!Friendly.instance){
	                Friendly.instance = new Friendly();
	            }
	            Friendly.instance.clickConnect(true);
			}
         }
     });
     
     //监听从浏览器资源站或者第三方传来的下载请求，start
     dal.binding("set_DownloadResources",function(res){
         var data = JSON.parse(decodeURIComponent(decodeURIComponent(res)));
         var taskMgr = require("taskModel");
         var youtubeModel=require("YoutubeModel");
         if(data.resType==taskMgr.resourceType.M_YOUTUBE){
             var ytbDownloader =new youtubeModel.Collection(); 
             ytbDownloader.downloadVideoByUrl(data.url,'360',function(newRes){
                 
             });
         }else{
               taskMgr.download({
                    url: data.url,
                    name: data.name,
                    iconPath: data.iconPath,
                    size: data.size,
                    versionCode:data.versionCode,
                    version:data.version,
                    packageName: data.packageName,
                    resType:data.resType,
                    actionType:data.resType==taskMgr.resourceType.M_IMAGE_WALLPAPER?taskMgr.actionType.DOWNLOAD_WALLPAPER:"",
                    nstatistics:{}
                }, function(newRes){});              
         }
         console.log("接收的的任务信息",data);
     });
     //监听从浏览器资源站或者第三方传来的下载请求，end
     exports.dal = dal;
     
     exports.getServiceUrl = getServiceUrl;
     exports.eventCenter = eventCenter;
     exports.ControllerBase = ControllerBase;
     exports.ModelBase = ModelBase;
     exports.ViewBase = ViewBase;
     exports.Collection = Collection;
     
     exports.navigate = navigate;
     exports.start = start;
     
     exports.getPreHash = getPreHash;
     exports.getCurController = getCurController;
     exports.getCurHashParas = getCurHashParas;
     
     exports.PopupPanel = PopupPanel;
     exports.history = historyManager;
     exports.dal =  dal;
     
     exports.getUserConfig = getUserConfig;
     exports.setUserConfig = setUserConfig;
});