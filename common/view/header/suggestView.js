/**
 * @author liujintao
 * @since 2014-04-24
 * @descript 重写suggestion组件，与header分离便于复用
 */
define("SuggestView",function(require,exports,module){
    var app = require("app");
    var _ = require("underscore");
    var $ = require("jquery");
    var apiNames = require('APINames');
    
    var UIMenu = require('UIMenu');
    var searchModel = require("searchSuggestion");
    var globalConfig = require('globalConfig');
    var utils = require("utils");
        /*国际化字典工具*/
    var i18nDi = require('I18NDI');
    
    var taskMgr = require('taskModel');
    
    var SuggestView = app.ViewBase.extend({
        module : module,
        /**
         * @param:
         * {
         *    searchInput 搜索输入框 
         *    el:组件容器 
         *    searchType 搜索类型，默认为APP_GAME
         * }
         * */
        init : function(opts){
            var me = this;
            this.searchInput = $(opts.searchInput);
            this.el = $(opts.el);
            this.searchType = opts.searchType||searchModel.type.APP_GAME;
            this.el.undelegate(this.searchInput).delegate(this.searchInput,"keyup",$.proxy(this.onSearchKeyup,this));
            this.el.undelegate(".g-search-icon").delegate(".g-search-icon",'click', $.proxy(this.onSearch,this));
            this.el.undelegate(".g-search-clear").delegate(".g-search-clear",'click', $.proxy(this.onClearInput,this));
            if(!this.suggestionMenu){
                this.suggestionMenu = new UIMenu({
                    list: [],
                    ani: false,
                    relTarget: this.searchInput,
                    y: 50,
                    autoDestroy:true
                }); 
                this.suggestionMenu.addClass('g-suggesion-menu');
            }
            this.suggestionMenu.on(UIMenu.SELECT, function(){
                    this.hide();
            });  
            this.suggestionMenu.el.undelegate(".g-search-local-app-item .btn-quick-update").delegate(".g-search-local-app-item .btn-quick-update","click",function(event){
                  var index = $(event.target).parents(".g-menu-item").attr("data-item");
                  var data_item = me.suggestionMenu.get(index);
                  data_item.data.index = index;
                   me.onQuickUpdate(data_item.data); 
                   me.suggestionMenu.hide();
                   event.stopPropagation();
            });
           this.suggestionMenu.el.undelegate(".g-search-app-item .btn-quick-install").delegate(".g-search-app-item .btn-quick-install","click",function(event){
                  var index = $(event.target).parents(".g-menu-item").attr("data-item");
                  var data_item = me.suggestionMenu.get(index);
                  data_item.data.index = index;
                   me.onQuickInstall(data_item.data); 
                   me.suggestionMenu.hide();
                   event.stopPropagation();
            });
            app.eventCenter.on('research',$.proxy(this.onSearch,this));
        },
        onClearInput:function(){
            this.searchInput.val("");
            this.searchInput.siblings(".icon-control").removeClass("g-search-clear").addClass("g-search-icon");
        },
        onSearchKeyup : function(e){
            var val = this.searchInput.val().replace(/:/g,"\:").replace(/\//g,"\\");
            var me = this;
 			
            if(!val||!this.checkValidate(this.searchInput)||val.replace(/[&#]/g,"")==""){
                this.suggestionMenu.hide();
                this.searchInput.siblings(".icon-control").removeClass("g-search-clear").addClass("g-search-icon");
                return;
            }else{
                /*如果输入有效*/
               //有内容时隐藏搜索框
            this.searchInput.siblings(".icon-control").removeClass("g-search-icon").addClass("g-search-clear");
            this.searchInput.siblings(".icon-control").off("click").on("click",function(){
                me.searchInput.val("");
                me.searchInput.siblings(".icon-control").removeClass("g-search-clear").addClass("g-search-icon");
                $(".g-search-box .loaddivBox").show();
                $(".g-search-box .placeholder-head").show();
                
            });
            var curHash = app.getCurHashParas();
            var type;
            
            var module = curHash.module;
            
           
            //屏蔽回车的搜索模块
            if (e.keyCode === 13 && module !== 'resource'&&module !="home"&&module!=="video"&&module!=="music"&&module!=="image"&&module!="task"&&module!="tools"){
                if(me.suggestionMenu.getCurFocus()){
                    var data = me.suggestionMenu.getCurFocus().data;
                   if(module == "contact"){
                       app.navigate({
                            module: "contact", 
                            action: this.getCurSearchAction(),
                            query:{},
                            pageState: {
                                searchType:"2",
                                multiple:"0",
                                data : data.sContactId,
                                keyInfo : JSON.stringify(data.keyInfo||[]),
                                vt:"search"
                            }
                           });
                    }else if(module=="sms"){
                        //根据当前短息控制器操作短信
                        var currentCtr = app.getCurController();
                        currentCtr.views['smsView'].showSearchSingleInfo(me.suggestionMenu.getCurFocus());         
                    }else if(module=="app"){
                      app.navigate({
                            module: "app", 
                            action: this.getCurSearchAction(),
                            query:{},
                            pageState: {
                                searchType:"1",
                                data : JSON.stringify({packageName:data.packageName,apkType:data.apkType,key:data.key}),
                                keyInfo : JSON.stringify(data.keyInfo||[]),
                                vt:"search"
                            }
                      });                             
                     }else if(module=="book"){
                          app.navigate({
                                module: "book", 
                                action: this.getCurSearchAction(),
                                query:{},
                                pageState: {
                                    searchType:"4",
                                    multiple:"0",
                                    data : data.sBookId,
                                    keyInfo : JSON.stringify(data.keyInfo||[]),
                                    vt:"search"
                                }
                          });                                         
                     }
                     me.suggestionMenu.hide();
                }else{
                    me.onEnter(e);
                }
                
            } else if(e.keyCode===40){
                me.suggestionMenu.focusNext();//向下方向键
            }else if(e.keyCode===38){
                me.suggestionMenu.focusPrev();//向上方向键
            } else {
                me.showLocalProxy = me.showLocalSugguestion;
                if(module == "contact"){
                    type = 2;
                    searchModel.searchLocal(searchModel.type.CONTACT, val, $.proxy(me.showLocalProxy, me));
                } else if (module == "app"){
                    type = 1;
                    searchModel.searchLocal(searchModel.type.LOCALAPP,val, $.proxy(me.showLocalProxy, me));
                } else if (module == "sms"){
                    type = 3;
                    searchModel.searchLocal(searchModel.type.SMS, val, $.proxy(me.showLocalProxy, me), 20);
                }else if(module == "book"){
                    type = 4;
                    searchModel.searchLocal(searchModel.type.BOOK, val, $.proxy(me.showLocalProxy, me), 20);                    
                } else {
                    //resource 资源搜索
                    type = me.getSearchType();       
                    console.log("当前type:");
                    console.log(type);
                    if (e.keyCode == 13) {
                        me.showResourceProxy = null;
                        //如果是键盘滑动到sugguestion元素时
                        if(me.suggestionMenu.getCurFocus()){
                            var data = me.suggestionMenu.getCurFocus().data;
                            me.suggestionMenu.hide();
                            if((type == searchModel.type.APP_GAME)||(type ==searchModel.type.GAME)||(type == searchModel.type.APP)){
                                app.navigate({
                                    module: 'resource', 
                                    action: this.getCurSearchAction(),
                                    query: {
                                        sort: 'detail',
                                    },
                                    pageState: {
                                        develop: data.webFrom,
                                        mtypeCode: data.mtypeCode,
                                        typeCode: data.typeCode,
                                        apkId: data.apkId,
                                        appId: data.id
                                    }
                                });                                
                            }else if((type == searchModel.type.RINGTONE)||(type == searchModel.type.WALLPAPER)||(type == searchModel.type.REBOOK)){
                                  //铃音和壁纸进入搜索结果
                                  me.searchInput.val(data.detail);
                                  me.onSearch();
                              }else if(type == searchModel.type.YOUTUBE){
                                   //Youtube进入detail
                                    app.navigate({
                                            module: 'resource', 
                                            action: this.getCurSearchAction(),
                                            query: {
                                                sort: 'searchdetail',
                                            },
                                            pageState: {
                                                videoId: data.id
                                            }
                                        });
                              }

                               //*********************************************************
                                //20140724 新版日志
                                var logObject = {
                                    class: "apps",
                                    page: "apps_search_guide",
                                    module: "matchwords",
                                    action: "to_detail",
                                    totalnum: me.suggestionMenu.list.length,
                                    position: me.suggestionMenu.getCurFocus().index + 1,
                                    mtypecode: (data&&data.mtypeCode) || "",
                                    typecode: (data&&data.typeCode) || "",
                                    targetvalue: data&&data.id,
                                    searchkey: val
                                }                
                                utils.sendNewLog("1000120", logObject);
                                //*********************************************************
                        }else{
                            this.onSearch();
                        }

                        
                    } else {
                        
                       me.showResourceProxy = me.showResourceSuggestion;
                        
                       if(!me.pendingSearch){
                            me.pendingSearch = true;
                            searchModel.sugguest({
                                t: me.getSearchType(),
                                q: val
                            }, function(res){
                                if(res.data.code == '100'){
                                    var searchList = res.data.words;
                                    me.showResourceProxy && me.showResourceProxy(searchList);
                                    //me.showResourceSuggestion(searchList);   
                                }else{
                                    //TODO
                                }
                            });
                                   me.pendingTimer =  setTimeout(function(){
                                         me.pendingSearch = false;   
                                     },80); 
                        }
                        
                    }
                }
            }            
            }
        },
        clearSearch:function(){
            this.searchResult=null;
        },
        getSearchType:function(){
            var type;
            var module = app.getCurHashParas().module;
            var action = app.getCurHashParas().action;
             if(module === 'resource'){ 
                    if(action == 'app'){
                        type = searchModel.type.APP
                    }else if(action == 'game'){
                        type = searchModel.type.GAME;
                    }else if(action == 'ringtone'){
                        type = searchModel.type.RINGTONE;
                    }else if(action == 'wallpaper'){
                        type = searchModel.type.WALLPAPER;
                    }else if(action=='youtube'){
                        type = searchModel.type.YOUTUBE;
                    }else if(action=='book'){
                        type = searchModel.type.REBOOK;
                    }
                }else if(module=="app"){
                    type = searchModel.type.LOCALAPP;
                }else if(module=="contact"){
                    type = searchModel.type.CONTACT;
                }else if(module=="sms"){
                    type = searchModel.type.SMS;
                }else if(module=="book"){
                    type = searchModel.type.BOOK;
                }else{
                    type = searchModel.type.APP_GAME;
                }
                return type;
        },
        getCurSearchAction: function(){
            var curHash = app.getCurHashParas();
            var action = '';
            if(curHash.action === 'app' || 
                curHash.action == 'game' ||
                curHash.action == 'wallpaper' ||
                curHash.action == 'ringtone'||
                curHash.action == 'contact'||
                curHash.action == 'sms'||
                curHash.action=='book'||
                curHash.action=='youtube'){
                action = curHash.action;
            }else{
                action = 'app';
            }
            return action;
        },
        /*有效性校验*/
        checkValidate : function(select){
            var input = select[0];
            return input.checkValidity();
        },
        /*资源的sugguestion*/
        showResourceSuggestion: function(searchList){
            var _this = this;
            var val = utils.DBC2SBC(this.searchInput.val()).replace(/:/g,"\:");
            var hash = app.getCurHashParas();
            //最大显示数
            searchList = searchList.slice(0, 5);
            var curSearchAction = _this.getCurSearchAction();
            var tpl;                           
            var reg = new RegExp(val, 'gim');
            
           if(curSearchAction==="ringtone"){
                    tpl = _this.getTpl('tpl-search-ringtones-item');
            }else if(curSearchAction==="wallpaper"){
                    tpl = _this.getTpl('tpl-search-wallpapers-item');
             }else if(curSearchAction==="youtube"){
                    tpl = _this.getTpl('tpl-search-youtube-item');
             }else if(curSearchAction==="book"){
                    tpl = _this.getTpl('tpl-search-book-item');
              }else{
                    tpl = _this.getTpl('tpl-search-app-item');
              }
              
            searchList = searchList.map(function(item, i){
                var orignName = item.orignName||item;
                var detail = item.detail||item;
                if(typeof detail!="string"){
                    detail="";
                }
                if(typeof item!="object"){
                    item = {};
                }
                  item=_.extend(item,{
                        detail:detail.replace(/<[^>].*?>/g, "").replace(/</g,"&lt;").replace(/>/g,"&gt"),
                        orignName:orignName&&orignName.replace(reg, function(val){
                            return '<font color="red">' + val + '</font>';
                        })
                    });
                var dom = _.template(tpl,{
                    name: item.orignName,
                    iconPath: curSearchAction=="youtube"?item.iconPath:globalConfig.domain.uploadVoga360 + item.iconPath + 'icon_m.png',
                    description: item.detail || '',
                    versionCode:item.versionCode||"",
                    packageName:item.apkId||"",
                    I18N: i18nDi
                });
                return {
                    index: i,
                    label: dom,
                    data: item
                }
            });
            this.showSuggestionTip(searchList);
        },
 
       onBackspace: function(event){
            var inputTextLength = this.searchInput.val().length;
            if(event.keyCode === 8 && 
                inputTextLength === 0){
                var curHash = app.getCurHashParas();
                app.eventCenter.trigger(curHash.module + curHash.action + 'clearsearch');
                this.suggestionMenu.hide();
            }
        },
       onEnter: function(event){
           var me = this;
           var key =  $.trim(this.searchInput.val());
            if(event.keyCode === 13 && this.suggestionMenu){
                
                me.showLocalProxy = null;
                
                this.suggestionMenu.hide();
                
                var curHash = app.getCurHashParas();
                var eventName = curHash.module + curHash.action + 'entersearch';
                     searchModel.searchLocal(me.getSearchType(),key,function(res){
                            me.searchResult = res;
                            me.searchResult.key = key;
                            app.eventCenter.trigger(eventName, me.searchResult);
                     });
            }
        },
        onQuickUpdate : function(data){
            try{
                this.updateCollection.clearSelected();
                this.updateCollection.setSelected(this.updateCollection.getAppByPackage(data.packageName).getId(),true);
                this.updateCollection.trigger("update");
                this.updateCollection.updateSelectedApp();                
            }catch(e){
                console.log(e);
            }
        },
        onQuickInstall : function(data){
            var me = this;
            try{
                var staticsObj = {
                    s1:'',
                    s2:data.apkId,
                    s3:data.mtypeCode,
                    s4:data.typeCode,
                    s5:{
                        module:'14',
                        totalNum:'1',
                        position:data.index,
                        apkName:data.apkId,
                        apkVersion:data.versionCode,
                        searchKey : $.trim(this.searchInput.val())
                    },
                    s7:"suggest",
                    s8:"suggest"
                };

               //*********************************************************
                //20140724 新版日志
                var logObject = {
                    "class": "apps",
                    page: "apps_search_guide",
                    module: "matchwords",
                    action: "download",
                    totalnum: me.suggestionMenu.list.length,
                    position: data.index + 1,
                    mtypecode: (data&&data.mtypeCode) || "",
                    typecode: (data&&data.typeCode) || "",
                    targetvalue: data&&data.id,
                    status: 0,
                    searchkey: $.trim(this.searchInput.val())
                }                

               taskMgr.download({
                    id: 'app_'+data.id,
                    url: globalConfig.domain.uploadVoga360+data.apkPath+"?md5="+data.md5,
                    name: data.basename,
                    iconPath: globalConfig.domain.uploadVoga360+data.iconPath+"/"+data.mediumIcon,
                    size: data.apkSize,
                    versionCode:data.versionCode,
                    packageName: data.apkId,
                    statistics:staticsObj,
                    nstatistics: logObject
                }, function(res){});
             
                utils.sendNewLog("1000100", logObject);
                //*********************************************************               
            }catch(e){
                console.log(e);
            }
        },
        onSearch: function(){
            var key =  $.trim(utils.DBC2SBC(this.searchInput.val()).replace(/:/g,"\:").replace(/\//g,"\\").replace(/http:/g,"h\ t\ t\ p:"));
            var me = this;
            this.suggestionMenu && this.suggestionMenu.hide();
            
            if(!key||!this.checkValidate(this.searchInput)||key.replace(/[&#]/g,"")==""){
                return;
            }
             if(encodeURIComponent(key)=="ilovemobogenie"){
                 var EggView = require("UIEggView");
                 
                 this.egg && this.egg.destroy();
                 var egg = this.egg = new EggView();
                 egg.off("close").on("close",function(){
                     egg.destroy();
                 });
             }else if(encodeURIComponent(key) == "mobogeniepcdebug"){
                 if(window.consoletemp){
                     console.log = window.consoletemp;
                     document.oncontextmenu=function(){};
                 }
                 
                 app.dal.request({
                     action: 'get_OpenContextMenu',
                     paras: {}
                 });
             }
            var curHash = app.getCurHashParas();
            var module = curHash.module;
            var action = curHash.action;
            //在这里屏蔽本地的搜索
            if (module !== 'resource'&&module !=="home"&&module!=="video"&&module!=="music"&&module!=="image"&&module!=="task"&&module!="tools"){
                var eventName = curHash.module + curHash.action + 'entersearch';
                     searchModel.searchLocal(me.getSearchType(),key,function(res){
                         console.log("搜索local",res);
                            me.searchResult = res;
                            me.searchResult.key = key;
                            app.eventCenter.trigger(eventName, me.searchResult);
                     });
                
            } else {
               searchModel.getClientInfo(function(data){
                   me.clientInfo = data;
                   //如果是搜索youtube的播放地址,5月22日新加
                   if(me.getCurSearchAction()=="youtube"&&key.indexOf("watch?v=")>-1){
                                //Youtube进入detail
                                    var videoId = key.match(/watch\?v=[^\&][^\#]+/).toString().split("=")[1];
                                    app.navigate({
                                            module: 'resource', 
                                            action: me.getCurSearchAction(),
                                            query: {
                                                sort: 'searchdetail',
                                            },
                                            pageState: {
                                                videoId: videoId
                                            }
                                        });
                   }else{
                       
                       console.log("============搜索资源==========：");
                       console.log(key);

                        //*********************************************************
                        //20140724 新版日志
                        var mtypecode;
                        var log_page="";
                        var log_module="searchbox";
                        var log_action="to_searchresult";
                        if(action.toLowerCase()=="app"){
                            mtypecode=1;
                            log_page="apps_search_guide";
                        }else if(action.toLowerCase()=="game"){
                            mtypecode=2;
                            log_page="apps_search_guide";
                        }else if(action.toLowerCase()=="book"){
                            mtypecode=9;
                            log_page="";
                        }else if(action.toLowerCase()=="ringtone"){
                            log_page="music_search_guide";
                            log_action="to_searchresult";                            
                            mtypecode=7;
                        }else if(action.toLowerCase()=="youtube"){
                            mtypecode=5;
                            log_page="";
                        }else if(action.toLowerCase()=="wallpaper"){
                            mtypecode=3;
                            log_page="";
                        }else{
                            mtypecode=1;
                            log_page="";
                        }
                        var logObject = {
                            page: log_page,
                            module: log_module,
                            action: log_action,
                            mtypecode: mtypecode,
                            searchkey: key
                        }                
                        utils.sendNewLog("1000120", logObject);
                        //*********************************************************

                        app.navigate({
                            module: 'resource', 
                            action: me.getCurSearchAction(),
                            query: {
                                sort: 'search',
                                id: ''
                            },
                            pageState: {
                                q: key.replace(/[&#]/g,""),
                                t: me.getSearchType(),
                                ip : me.clientInfo.clientid||""
                            }
                     });                      
                   }

               });
            }
        },
        showLocalSugguestion:function(searchResult){
            console.log(searchResult);
            /*搜索本地*/
            var _this = this;
            var val = this.searchInput.val();
            var searchType = searchResult.searchType;
            var tpl;
            //最大个
            this.searchResult = searchResult;
            this.searchResult.key = val;
            searchList = (searchResult.info&&searchResult.info.slice(0, 5))||[];
            
            if(searchResult.searchType=="2"||searchResult.searchType==2){//搜索的是联系
                tpl = _this.getTpl("tpl-search-local-contact");
            }else if(searchResult.searchType=="3"||searchResult.searchType==3){//搜索的是短信
                tpl = _this.getTpl("tpl-search-local-sms");
            }else if(searchResult.searchType=="1"||searchResult.searchType==1){//搜索结果是应用
                tpl = _this.getTpl("tpl-search-local-app");
            }else if(searchResult.searchType=="4"||searchResult.searchType==4){//搜索结果是本地Ebook
                tpl = _this.getTpl("tpl-search-local-book");
            }

            if (searchType !== 3 && searchType !== "3") {
                searchList = searchList.map(function(item, i){
                    var keyInfo = item.keyInfo;//关键词
                    /*item为每个搜索的匹配项，联系人，短信或者apk*/
                 if(searchType==2){//联系
                           var contact = _.extend({},{
                               sContactId : (keyInfo&&keyInfo.sContactId)||item.sContactId,
                               displayName : "",
                               sContactNumber : "",
                               sContactEmail : ""
                           });
                       keyInfo&&keyInfo.forEach(function(matches){//遍历匹配的所有字
                           
                            var reg = new RegExp(matches.keyword, 'gim');
                            
                            var matches_fullword=matches.fullword.replace(reg,function(val){
                                return '<font color="red">' + val + '</font>';
                            });
                            
                           if(matches.matchCode=="0"){//displayName匹配
                               contact=_.extend(contact,{
                                   displayName:matches_fullword
                               });
                           }else if(matches.matchCode=="1"){//电话号码匹配
                               contact=_.extend(contact,{
                                   sContactNumber:matches_fullword
                               });
                           }else if(matches.matchCode=="2"){//邮箱匹配
                               contact=_.extend(contact,{
                                   sContactEmail:matches_fullword
                               });
                           }
                       });
                       /*补充完全基本信息*/
                      if(!_this.contactCollection){
                          var contactModel = require("contactModel");
                          _this.contactCollection = new contactModel.Collection();
                      }
                       if(!contact.displayName){
                           contact.displayName = _this.contactCollection.getModelById("genie_contact_"+item.sContactId).get("sDisplayName");
                       }
                       if(!contact.sContactNumber){
                           var sContactNumbers = _this.contactCollection.getModelById("genie_contact_"+item.sContactId).get("sContactNumber");
                           sContactNumbers&&sContactNumbers.forEach(function(number,index){
                               contact.sContactNumber = contact.sContactNumber+number.value+" ";
                           });
                       }
                       contact.sContactIcon = _this.contactCollection.getModelById("genie_contact_"+item.sContactId).get("sContactIcon");
                       return {
                            index: i,
                            label: _.template(tpl, {data:contact,I18N: i18nDi}),
                            data: {searchType:2,sContactId:item.sContactId,keyInfo:keyInfo,key:val}
                        }
                    } else if(searchType==1){//搜索内容为应用
                        var appModel = require("appModel");
                        if(!_this.updateCollection){/*更新集合类*/
                            _this.updateCollection = appModel.updateCollection;
                        }
                        if(item.apkType==1){/*第三方应用*/
                              _this.appCollection = appModel.localCollection;
                         }else{
                              _this.appCollection = appModel.systemCollection;
                          }
                          var appItemModel = _this.appCollection.getAppByPackage(item.packageName);
                          var apk = _.extend({},{
                               packageName:item.packageName,
                               apkType : item.apkType,//是否为系统apk 0 否/ 1 是
                               apkName:appItemModel.data.sName||appItemModel.data.name,
                               iconPath:appItemModel.get("sThumbnailPath"),
                               installPos : appItemModel.get("sAppInstallPos"),
                               version:appItemModel.get("sAppVersion"),
                               versionCode:appItemModel.get("sAppVersionCode"),
                               updatable : _this.updateCollection.isUpdateApp(item.packageName)?true:false, 
                               updating : appItemModel.getProperty("updating"),
                               size : appItemModel.get("sAppSize")
                           });
                           keyInfo.forEach(function(matches){//遍历匹配的所有字
                              var reg = new RegExp(matches.keyword, 'gim');
                              var matches_fullword=matches.fullword.replace(reg,function(val){
                                        return '<font color="red">' + val + '</font>';
                              });
                               if(matches.matchCode=="0"){//apk名称
                                   apk=_.extend(apk,{
                                       apkName:matches_fullword
                                   });
                               }else if(matches.matchCode=="1"){//包名匹配
                                   apk=_.extend(apk,{
                                       packageName:matches_fullword
                                   });
                               }
                           });
                          return {
                              index : i,
                              label : _.template(tpl,{data:apk,I18N: i18nDi}),
                              data : {searchType:1,packageName:item.packageName,apkType:item.apkType,keyInfo:keyInfo,key:val}
                          }
                    }else if(searchType==4){//book搜索
                           var matches_fullword={}; 
                           keyInfo.forEach(function(matches){//遍历匹配的所有字
                              var reg = new RegExp(matches.keyword, 'gim');
                              matches_fullword=matches.fullword.replace(reg,function(val){
                                        return '<font color="red">' + val + '</font>';
                              });
                           });
                          return {
                              index : i,
                              label : _.template(tpl,{name:matches_fullword}),
                              data : {searchType:4,sBookId:item.sBookId,keyInfo:keyInfo,key:val}
                          }                        
                    }
                });
            } else {
                var resultList = [];
                var itemCount = 0;
                var preMessageID = null;
                for (var i = 0; i < searchList.length; i++){
                    var keyInfo = searchList[i].keyInfo;
                    var displayLabel = "";
                    if (searchList[i].isNameEmpty === 1){
                        displayLabel = searchList[i].smsPhoneNumber
                    } else {
                        displayLabel = searchList[i].contactName + "(" + searchList[i].smsPhoneNumber + ")"
                    }
                    for (var k = 0; k < keyInfo.length; k++){
                        switch (keyInfo[k].matchCode){
                            case "2":
                                if (preMessageID !== keyInfo[k].smsMessageId){
                                    var highlight = '<font color="red">' + keyInfo[k].keyword + '</font>';
                                    var reg = new RegExp(keyInfo[k].keyword, 'g');
                                    var content = keyInfo[k].fullword.replace(reg, highlight);
                                    var messageObj = {
                                        smsThreadId: searchList[i].smsThreadId,
                                        smsPhoneNumber: searchList[i].smsPhoneNumber,
                                        contactName: searchList[i].contactName,
                                        contactIcon: searchList[i].photoLocalPath[0] || "common/images/ico/default-avatar.png",
                                        smsContent: content,
                                        displayLabel: displayLabel
                                    };
                                    var itemObject = {
                                        index: itemCount,
                                        label: _.template(tpl, {data:messageObj}),
                                        data: {searchType:3, message:messageObj, keyInfo:keyInfo[k]}
                                    };
                                    resultList.push(itemObject);
                                    itemCount = itemCount + 1;
                                    preMessageID = keyInfo[k].smsMessageId;
                                }
                                break;
                            case "1":
                                break;
                            case "0":
                                break;
                        }
                        if (itemCount >= 5){
                            break;
                        }
                    }
                    if (itemCount >= 5){
                        break;
                    }
                }
                searchList = resultList.reverse();
            }
            this.showSuggestionTip(searchList);
        },        
        showSuggestionTip: function( list ){
            var me = this;
                var glbhandler = (function(e){
                    if(e.target !== this.el.find('input')[0]){
                        this.suggestionMenu.hide();
                    }
                }).bind(this);
              
                $(document).on('click', glbhandler);
                function goResult(item){
                    var data = item.data;
                   console.log("选中一条====================================================",item);
                   var curHash = app.getCurHashParas();
                    if(data.searchType==1){
                      app.navigate({
                            module: "app", 
                            action: me.getCurSearchAction(),
                            query:{},
                            pageState: {
                                searchType:"1",
                                data : JSON.stringify({packageName:data.packageName,apkType:data.apkType,key:item.key}),
                                keyInfo : JSON.stringify(data.keyInfo||[]),
                                vt:"search"
                            }
                      });        
                    }else if(data.searchType==2){
                        var currentCtr = app.getCurController();
                        currentCtr.views['contactMainView'].redirect({
                            pageState: {
                                searchType:"2",
                                multiple:"0",
                                data : data.sContactId,
                                keyInfo : JSON.stringify(data.keyInfo||[]),
                                vt:"search"
                            }
                        });  
                        /*
                      app.navigate({
                            module: "contact", 
                            action: me.getCurSearchAction(),
                            query:{},
                            pageState: {
                                searchType:"2",
                                multiple:"0",
                                data : data.sContactId,
                                keyInfo : JSON.stringify(data.keyInfo||[]),
                                vt:"search"
                            }
                      });*/
                    }else if(data.searchType==3){
                        //根据当前短息控制器操作短信
                        var currentCtr = app.getCurController();
                        currentCtr.views['smsView'].showSearchSingleInfo(item);                        
                    }else if(data.searchType==4){
                      app.navigate({
                            module: "book", 
                            action:me.getCurSearchAction(),
                            query:{},
                            pageState: {
                                searchType:"4",
                                multiple:"0",
                                data : data.sBookId,
                                keyInfo : JSON.stringify(data.keyInfo||[]),
                                vt:"search"
                            }
                      });                        
                    }else{//resource的跳转
                        //这里加 video跳转
                      var pageState ={};
                      var key = me.searchInput.val();
                      if(me.getCurSearchAction()=="ringtone"||me.getCurSearchAction()=="wallpaper"||me.getCurSearchAction()=="book"){
                          //铃音和壁纸进入搜索结果
                            me.searchInput.val(item.data.detail);
                            me.onSearch();
                            if(me.getCurSearchAction() == "ringtone"){
                                logObject = {
                                    page: "music_search_guide",
                                    module: "matchwords",
                                    action: "to_searchresult",
                                    mtypecode: (item.data&&item.data.mtypeCode) || "",
                                    searchkey: item.data.detail
                                }
                                utils.sendNewLog("1000120", logObject);     
                            }
                      }else if(me.getCurSearchAction()=="youtube"){
                        //youtube进入搜索结果
                        // localStorage["youtubeSearchDetail"] = JSON.stringify(data.videoInfo);      
                        app.navigate({
                                module: 'resource', 
                                action: me.getCurSearchAction(),
                                query: {
                                    sort: 'searchdetail',
                                },
                                pageState: {
                                    videoId: data.id
                                }
                            });          
                      }else{//应用或者games直接进入详情
                           app.navigate({
                                module: 'resource', 
                                action: me.getCurSearchAction(),
                                query: {
                                    sort: 'detail',
                                },
                                pageState: {
                                    versionCode:data.versionCode,
                                    develop: data.webFrom,
                                    mtypeCode: data.mtypeCode,
                                    typeCode: data.typeCode,
                                    apkId: data.apkId,
                                    appId: data.id
                                }
                            });
                           //*********************************************************
                            //20140724 新版日志
                            //2014-11-10 modify
                        var log_page="";
                        var log_module="searchbox";
                        var log_action="to_searchresult";
                        var matchwords="";
                        var logObject = {
                                class: "apps",
                                page: "apps_search_guide",
                                module: "matchwords",
                                action: "to_detail",
                                totalnum: list.length,
                                position: item.index + 1,
                                mtypecode: (item.data&&item.data.mtypeCode) || "",
                                typecode: (item.data&&item.data.typeCode) || "",
                                targetvalue: item.data&&item.data.id,
                                searchkey: key
                            } 
                        // if(me.getCurSearchAction() == "ringtone"){
                        //     logObject = {
                        //         page: "music_search_guide",
                        //         module: "matchwords",
                        //         action: "to_searchresult",
                        //         mtypecode: (item.data&&item.data.mtypeCode) || "",
                        //         searchkey: key
                        //     }     
                        // }
                        utils.sendNewLog("1000120", logObject);
                            //*********************************************************
                      }  
                    }
                }
                this.suggestionMenu.off(UIMenu.SELECT).on(UIMenu.SELECT,goResult);
            
            this.suggestionMenu.updateList(list);
            if(list.length>0){
                this.suggestionMenu.position();
                this.suggestionMenu.show();
            }else{
                this.suggestionMenu.hide();
            }
            if(!this.searchInput.val()){
                this.suggestionMenu.hide();
            };
            app.eventCenter.trigger('refresh_resource_app_status',this.suggestionMenu.el);
        }
    });
    return SuggestView;
});
