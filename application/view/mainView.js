define("UIAppMainView", function(require, exports, module) {
    var app = require('app');
    var   $ = require('jquery');
    var   _ = require('underscore');
    var UIMenu = require('UIMenu');
    var Window = require('UIWindow');
    var UIDialog = require('UIDialog');
    var SuperGrid = require('grid');
	var appModel = require('appModel');
	var taskModel = require('taskModel');
	var utils = require('utils');
	var connection = require('connectionMgr');
	var apiNames = require('APINames');
	var i18nDi  = require('I18NDI');
	var UILoading = require('loading');
	    /*grid model*/
    var GridModel = require("gridModel");
    
    var SmartTip = require("UISmartTip");
	
	var getI18N = i18nDi.fillDomText.bind(i18nDi);
    var ProcessWindow = require("ProgressPanel");	
	
	var appMainViewInstance;
	
	//名称列
	var NameView = app.ViewBase.extend({
        module: module,
        init: function(model){
            this.model = model;
        },
        render: function(target){
            if(target.find('.g-app-name-col').size() > 0){
                var $title = target.find('.title');
                
                target.find('img').attr('src', this.model.get('sThumbnailPath'));
                target.find('.title').html(this.model.get('sName') || '');
                $title.attr("titleText",this.model.get('sName'));
                utils.tooltip.attach($title);
            }else{
                var tpl = this.getTpl('tpl-name-col-view');
                
                var version = this.model.get('sAppVersion');
                if(this.model.getProperty('appType') == 2){
                    version =  version + ' -> ' + this.model.get('sCurVersion');
                }
                target.html(_.template(tpl, {
                    thumb: this.model.get('sThumbnailPath'),
                    name: this.model.get('sName'),
                    version: version
                }));
                
                utils.tooltip.attach(target.find('.title'));
            }
        }
    });
    
    var MiddleColumn = app.ViewBase.extend({
        module: module,
        init: function(model){
            this.model = model;
        },
        render: function(target){
           var appType = this.model.getProperty('appType');
           var me = this;
           this.el = target;
           if(appType === 2){
               var v = '<span class="c-9 cur-version">' + this.model.get('sAppVersion') +
                       '</span><span class="ar">-></span><span class="new-version">' +
                       this.model.get('sCurVersion') + '</span>';
               
               target.html('<div class="app-version-col te">' + v + '</div>');
           }else{
               target.html('<div class="app-size-col  c-9">' + this.model.get('sAppSize') + '</div>');
           }
           target.undelegate(".app-version-col .new-version","mouseenter",$.proxy(me.onMouseenter,me)).delegate(".app-version-col .new-version","mouseenter",$.proxy(me.onMouseenter,me));
           target.undelegate(".app-version-col .new-version","mouseleave",$.proxy(me.onMouseleave,me)).delegate(".app-version-col .new-version","mouseleave",$.proxy(me.onMouseleave,me));
           },
          onMouseenter:function(event){
              var me = this;
              var tpl = me.getTpl("tpl-app-update-info-version");
                if(!window.smartTip){
                   window.smartTip = new SmartTip({tipType:2,duration:100,autoDestroy:2});
               }
                 if(me.model.get("updateDetail")){
                     var descriptDom = _.template(tpl,{data:{
                           oldVersion:me.model.get('sAppVersion'),
                           newVersion:me.model.get('sCurVersion')
                     }});
                    window.smartTip.timer=setTimeout(function(){
                         window.smartTip.showDescriptTip(me.el.find(".new-version"),descriptDom,me.model.get("updateDetail").replace(/\r\n/g,"<br/>")||"");    
                    },200);
                 }
              event.stopPropagation();              
          },
          onMouseleave:function(event){
              var me = this;
                if(window.smartTip&&$(event.target).hasClass("new-version")){
                   clearTimeout(window.smartTip.timer);
                   window.smartTip.hideIn();
               }
               event.stopPropagation();    
          }
    });
    
    //apk安装位置列
    var PositionIcon = app.ViewBase.extend({
        init: function(model){
            this.model = model;
        },
        render: function( target ){
            var pos = this.model.get('sAppInstallPos');
            var classes = pos == 0 ? 'g-app-pos-phone' : 'g-app-pos-sd';
            target.html('<div class="' + classes + '" ></div>');
            if( pos == 0 ){
            	$("."+ classes).attr("i18n-Key","myapp.deviceTipText")
            	utils.tooltip.attach($("."+ classes));
            }else{
            	$("."+ classes).attr("i18n-Key","myapp.sdCardTipText")
            	utils.tooltip.attach($("."+ classes));
            }
        }
    });
    
     //应用可操作列
    var ActionCol = app.ViewBase.extend({
        module: module,
        init: function(model){
            this.model = model;
        },
        
        uninstall: function(){
            this.model.uninstall();
        },
        
        render: function(target){
            var $actionCol = target.find('.g-app-action-col');
            
            if($actionCol.size() == 0){
                target.html(_.template(this.getTpl('tpl-action-col-view'), {i18n: i18nDi}));
                $actionCol  = target.find('.g-app-action-col');
            }
            
            var updating = this.model.getProperty('updating');
            var $uninstallBtn = $actionCol.find('.uninstall');
            var $moveBtn = $actionCol.find('.move');
            var $updateBtn = $actionCol.find('.update');
            
            var appType = this.model.getProperty('appType');
            
            var updateColl = appModel.updateCollection;
           
            var _this = this;
            
            
            $updateBtn.off('click');
            //1本地应用 ， 2升级应用， 3系统应用
            if(appType == 1||appType==3){
                var updateModel = updateColl.isUpdateApp(this.model.get('sAppPackage'));
                if(updateModel){
                    $updateBtn.show();
                    
                    if(updating){
                        $updateBtn.hide();
                        var updateInstalling = updateModel.getProperty('updateInstalling');
                        if(updateInstalling){
                            $actionCol.find('.progress-bar').hide();
                            $actionCol.find('.progress-bar-stripes').show();
                        }else{
                            var per = updateModel.updateProgress || 0;
                            
                            $actionCol.find('.progress-bar').show();
                            $actionCol.find('.progress-bar-stripes').hide();
                            $actionCol.find('.progress-bar span').width(per + '%');
                        }
                    }else{
                        $updateBtn.show();
                        $actionCol.find('.progress-bar').hide();
                        $actionCol.find('.progress-bar-stripes').hide();
                    }
                }else{
                    $updateBtn.hide();
                    $actionCol.find('.progress-bar').hide();
                    $actionCol.find('.progress-bar-stripes').hide();
                }
                
                
                //$updateBtn.html(updating ? getI18N('myapp.updatingText') : getI18N('common.updateLabel'));
                //$updateBtn.prop('disabled', updating);
                
                $updateBtn.on('click', function(e){
                    //$(e.target).html(getI18N('myapp.updatingText'));
                    e.stopPropagation();
                    var updateMode = updateColl.getAppByPackage(_this.model.get('sAppPackage'));
                    //*********************************************************
                    //20140724 新版日志
                    var logObject = {
                        class: "myapps",
                        page: "myapps",
                        module: "apps",
                        action: "download",
                        totalnum: appModel.localCollection.size(),
                        position: appModel.localCollection.getModelPosition(_this.model),
                        mtypecode: 1,
                        typecode: 1,
                        targetvalue: _this.model.get('sAppPackage'),
                        status: 0
                    }   
                    //*********************************************************
                    updateMode && updateMode.upateMe(logObject);

                    var logArgs = {
                        module: utils.statisticsCode.M_MY_APP,
                        module2: appType == 1?utils.statisticsCode.M_LIST_APPS:utils.statisticsCode.M_LIST_SYS,
                        totalNum: 1
                    }
                    utils.sendStatistics({
                        action: utils.statisticsCode.MYAPP_COLUMN_UPDATE,
                        args: logArgs
                    });

                    //*********************************************************
                    //20140724 新版日志              
                    utils.sendNewLog("1000100", logObject);
                    //*********************************************************
                });
                //$uninstallBtn.off('click');
            }else if(appType == 2){
                
                if(updating){
                    $updateBtn.hide();
                    
                    var updateInstalling = this.model.getProperty('updateInstalling');
                    
                    if(updateInstalling){
                        $actionCol.find('.progress-bar').hide();
                        $actionCol.find('.progress-bar-stripes').show();
                    }else{
                        var per = this.model.updateProgress || 0;
                        
                        $actionCol.find('.progress-bar').show();
                        $actionCol.find('.progress-bar-stripes').hide();
                        $actionCol.find('.progress-bar span').width(per + '%');
                    }
                }else{
                    $updateBtn.show();
                    $actionCol.find('.progress-bar').hide();
                    $actionCol.find('.progress-bar-stripes').hide();
                }
                
                //$updateBtn.html(updating ? getI18N('myapp.updatingText') : getI18N('common.updateLabel'));
                //$updateBtn.prop('disabled', updating);
                
                $updateBtn.off('click').on('click', $.proxy(function(e){
                    //$(e.target).html(getI18N('myapp.updatingText'));
                    e.stopPropagation();
                    //*********************************************************
                    //20140724 新版日志
                    var logObject = {
                        class: "myapps",
                        page: "myapps",
                        module: "updates",
                        action: "download",
                        totalnum: updateColl.size(),
                        position: updateColl.getModelPosition(this.model),
                        mtypecode: 1,
                        typecode: 1,
                        targetvalue: this.model.get('sAppPackage'),
                        status: 0
                    }   
                    //*********************************************************
                    this.model.upateMe(logObject);
                    
                    appMainViewInstance.setToolbarStatus();
                    
                    var logArgs = {
                        module: utils.statisticsCode.M_MY_APP,
                        module2: utils.statisticsCode.M_LIST_UPDATE,
                        totalNum: 1
                    }
                    utils.sendStatistics({
                        action: utils.statisticsCode.MYAPP_COLUMN_UPDATE,
                        args: logArgs
                    });

                    //*********************************************************
                    //20140724 新版日志             
                    utils.sendNewLog("1000100", logObject);
                    //*********************************************************
                }, this));
            }
            //$uninstallBtn.html(uninstalling ? getI18N('myapp.uninstallingText') : getI18N('common.uninstallLabel'));
            //$uninstallBtn.prop('disabled', uninstalling);
            
            /*
            $uninstallBtn.on('click', $.proxy(function(e){
                //$(e.target).html('progressing').prop('disabled', true);
                e.stopPropagation();
                this.uninstall();
            }, this));
            */
        }
    });
    
    
    //app侧边栏面板
    var RightSidePanel = app.ViewBase.extend({
        module: module,
        init: function(opts){
            this.opts = opts;
            var me = this;
            this.el = $('.g-application');
            this.tplList = this.getTpl('tpl-recommend-list');
            this.tplDetail = this.getTpl('tpl-app-detail');
            
            this.onInstall = $.proxy(this.onInstall, this);
            this.onAppModelUpdate = $.proxy(this.onAppModelUpdate, this);
            this.uninstall = $.proxy(this.uninstall, this);
            this.onIninstallSucess = $.proxy(this.onIninstallSucess, this);
            
            this.el.delegate('.g-app-recommend-list .install', 'click', $.proxy(this.onInstall, this));
            this.el.delegate('.g-application-detail .uninstall', 'click', $.proxy(this.uninstall ,this));
            this.el.delegate('.g-application-detail .update', 'click', $.proxy(this.onUpdate ,this));
            this.el.delegate('.g-app-recommend-list .link-rec-app', 'click', $.proxy(this.onGotoAppDetail, this));
            
            appModel.favoriteModel.getTop(function(res){
                if(res.data.code === 'success'){
                    var list = res.data.recmdList || [];
                    var tpl = me.renderTop(list);
                }
            });
            
            appModel.updateCollection.on('update', function(){
                var coll = this.opts.appMainView.getCurCollection();
                var history = coll.selectedHistory;
                
                var modelId = history[history.length - 1];
                var model = coll.getModelById(modelId);
                
                if(!model){
                    this.showTop();
                }
            }.bind(this));
        },
        
        onUpdate: function(){
            var model = appModel.updateCollection.isUpdateApp(this.model.get('sAppPackage'));
            //*********************************************************
            //20140724 新版日志
            var logObject = {
                class: "myapps",
                page: "myapps",
                module: "rightarea_selected",
                action: "download",
                //totalnum: appModel.localCollection.size(),
                //position: appModel.localCollection.getModelPosition(this.model),
                mtypecode: 1,
                typecode: 1,
                targetvalue: model.get('sAppPackage'),
                status: 0
            }   
            //*********************************************************
            model && model.upateMe(logObject);
            
            this.opts.appMainView.setToolbarStatus();

            //*********************************************************
            //20140724 新版日志             
            utils.sendNewLog("1000100", logObject);
            //*********************************************************
        },
        onRefreshTop:function(){
            var me = this;
            appModel.favoriteModel.getTop(function(res){
                if(res.data.code === 'success'){
                    var list = res.data.recmdList || [];
                    var tpl = me.renderTop(list);
                }
            });            
        },
        onGotoAppDetail:function(event){
            var dataDom = $(event.target).parents("li").find(".install");
            app.navigate({
                module : "resource",
                action : dataDom.attr("data-mtypeCode")=="1"?"app":"game",
                query: {
                            sort: 'detail',
                        },
                pageState : {
                    develop : dataDom.attr("webFrom")||dataDom.attr("data-name"),
                    mtypeCode : dataDom.attr("data-mtypeCode"),
                    typeCode : dataDom.attr("data-typeCode"),
                    apkId : dataDom.attr("data-pk"),
                    appId : dataDom.attr("data-id")
                }
            });

            //*********************************************************
            //20140724 新版日志
            var logObject = {
                class: "myapps",
                page: "myapps",
                module: "rightarea_recommend",
                action: "to_detail",
                totalnum: $(event.target).parents("li").parent("ul").children("li").length,
                position: dataDom.attr("data-index"),
                mtypecode: dataDom.attr("data-mtypeCode"),
                typecode: dataDom.attr("data-typeCode"),
                targetvalue: dataDom.attr("data-pk"),
                targetvaluemore: this.model.get('sAppPackage')
            }
            utils.sendNewLog("1000120", logObject);   
            //*********************************************************
        },
        onInstall: function(e){
            var $button = e.target.tagName.toLowerCase() != 'button' ? $(e.target).parents('button') : $(e.target);
            var ds = $button[0].dataset;
            //*********************************************************
            //20140724 新版日志
            var logObject = {
                class: "myapps",
                page: "myapps",
                module: "rightarea_recommend",
                action: "download",
                totalnum: $(e.target).parents("li").parent("ul").children("li").length,
                position: ds.index,
                mtypecode: ds.mtypecode,
                typecode: ds.typecode,
                targetvalue: ds.pk,
                status: 0
            }   
            //*********************************************************
            if (this.model){
                logObject.targetvaluemore = this.model.get('sAppPackage');
            }
            taskModel.download({
                id: 'app_'+ds.id,
                url: utils.getParameter('a', ds.apkpath)+"?md5="+ds.md5,
                name: ds.name,
                iconPath: ds.iconpath + 'icon_m.png',
                size: ds.size,
                packageName: ds.pk,
                versionCode: ds.versioncode,
                nstatistics: logObject
                // statistics: {
                //     doType: 'favorite'
                // }
            }, function(res){});

            //*********************************************************
            //20140724 新版日志
            console.log("推荐列表日志====================================", logObject)
            utils.sendNewLog("1000100", logObject);
            //********************************************************* 
        },
        
        onAppModelUpdate: function(){
            var uninstalling = this.model.getProperty('uninstalling');
            var updating = this.model.getProperty('updating');
            var $uninstallBtn = this.el.find('.g-application-detail .uninstall');
            var $updateBtn = this.el.find('.g-application-detail .update');
            
            $updateBtn.html(updating ? getI18N('myapp.updatingText') : getI18N('common.updateLabel'));
            $updateBtn.prop('disabled', updating);
            
            $uninstallBtn.html(uninstalling ? getI18N('myapp.uninstallingText') : getI18N('common.uninstallLabel'));
            $uninstallBtn.prop('disabled', uninstalling);
            
            if(appModel.updateCollection.isUpdateApp(this.model.get('sAppPackage'))){
                $updateBtn.show();
            }else{
                $updateBtn.hide();
            }
            
            //系统应用升级现在直接不可操作
            if(this.model.getProperty('appType') == 3){
                this.el.find('.button').hide();
            }
        },
        /*right detail 的uninstall*/
        uninstall: function(){            
            var coll = this.opts.appMainView.getCurCollection();
            var tempFuc = coll.getSelectedMap;
            var _this = this;
            
            coll.getSelectedMap = function(){
                var m = {};
                m[_this.model.getId()] = true;
                
                return m; 
            };
            
            this.opts.appMainView.onUninstall(true);
            coll.getSelectedMap = tempFuc;
        },
        
        onIninstallSucess: function(){
            this.showTop();
        },
        
        showTop: function(){
            this.el.find('.detail').hide();
            this.el.find('.top').show();
        },
        
        showDetail: function(){
            this.el.find('.top').hide();
            this.el.find('.detail').show();
        },
        
        renderTop: function(list){
            var $top = this.el.find('.top');
            
            $top.html(_.template(this.tplList, {
                list: list,
                i18n: i18nDi
            }));
            
            app.eventCenter.trigger('refresh_resource_app_status');
        },
        
        renderDetail: function(model){
            var $recommend = this.el.find('.detail');
            var me = this;
            
            if(this.model == model){
                return;
            }
            
             //重新绑定， 防止重复
            this.model = model;
            //先清楚先前的model绑定在当前环境中的事件
            this.model && this.model.off('change', this.onAppModelUpdate);
            this.model && this.model.off('change', this.onAppModelUpdate);
            this.model && this.model.off('remove', this.onIninstallSucess);
            

            
            this.model && this.model.on('change', this.onAppModelUpdate);
            this.model && this.model.on('remove', this.onIninstallSucess);
            $recommend.html(_.template(this.tplDetail, {
                iconPath: model.get('sThumbnailPath'),
                name: model.get('sName'),
                version: model.get('sAppVersion'),
                location: model.get('sAppInstallPos'),
                size: model.get('sAppSize'),
                sCurVersion: model.get('sCurVersion'),
                appType:model.get('appType'),
                i18n:  i18nDi
            }));
            
            if(!appModel.updateCollection.isUpdateApp(model.get('sAppPackage'))){
                this.el.find('.g-application-detail .update').hide();
            }else{
                var $updateBtn = this.el.find('.g-application-detail .update').show();
                var $uninstall = this.el.find('.g-application-detail .uninstall');
                $updateBtn.removeClass('g-btn3').addClass('g-btn2');
                $uninstall.removeClass('g-btn2').addClass('g-btn3');
            }
            
            this.onAppModelUpdate();
            
            var $icon = this.el.find('.app-icon');
            var image = new Image();
            image.onerror = function(){
                $icon.attr('src','common\\images\\ico\\default-app.png');
            };
            image.src = $icon.attr('src');
            
            appModel.favoriteModel.getRecommend({
                apk_Id: model.get('sAppPackage')
            }, function(res){
                if(res.data.code === 'success'){
                    me.el.find('.detail .g-app-recommend-list').remove();
                    var list = res.data.recmdList || [];
                    var tpl = _.template(me.tplList, {
                        list: list,
                        i18n: i18nDi
                    });
                    
                    me.el.find('.detail').append(tpl);
                    app.eventCenter.trigger('refresh_resource_app_status');
                    me.el.find('.g-application-detail .star').show().find('.ico-stars').width(res.data.appStar * 2 * 10 + '%');
                }
            });
        }
    });
    
    
    var tabs = {
        LOCAL: 'local',
        UPDATE: 'update',
        SYSTEM: 'sys',
        SEARCH:'search'
    };
    
    /*
     * 
     * Application 主页面显示面板
     */
    var AppMainView = app.ViewBase.extend({
        module: module,
        
        tab: tabs.LOCAL,//default local, options is local update sys
        
        events: {
            'click -> .g-list-tab-header .tab li': 'onTabClick',
            'click -> .g-toolbar .install' : 'onInstall',
            'click -> .g-toolbar .updateall' : 'onUpdateAll',
            'click -> .g-toolbar .uninstall' : 'onUninstall',
           // 'click -> .g-toolbar .update' : 'onUpdate',
            'click -> .g-toolbar .export' : 'selectExportDes',
            'click -> .g-grid-search .btn-clear-search':'onClearSearch',
            'click -> .g-toolbar .move' : 'onMoveApk'
        },
        
        init: function(opts){
            appMainViewInstance = this;
            
            this.opts = _.extend({}, opts);
            this.el = $(_.template(this.getTpl('tpl-app-main-view'),{ i18n: i18nDi}));
            
            //默认进来显示loading
            this.loading = new UILoading();
            this.loading.render(this.el.find('.g-list-tab-con'));
            this.loading.show();
            
            $('#' + opts.pageId).append(this.el);
            
            this.rightPanel = new RightSidePanel({
                appMainView: this
            });
            
            var onrightPanel = function(e){
                if(e !== 'update'){
                    if(appModel.localCollection.receiveResponse && appModel.localCollection.size() > 0){
                        this.rightPanel.onRefreshTop();
                    }
                }
            }.bind(this);
            
            this.posTabLine();
            
            var onAllUpdate = (function(){
                this.setTabCount();
                this.setToolbarStatus();
                this.posTabLine();
            }).bind(this);
            
            appModel.updateCollection.on('update', onrightPanel);
            
            appModel.localCollection.on('update', onAllUpdate);
            appModel.systemCollection.on('update', onAllUpdate);
            appModel.updateCollection.on('update', onAllUpdate);
            
            this.initLocal();
            
            $(window).resize(this.posTabLine.bind(this));
            var curHash = app.getCurHashParas();
            connection.on('connection', (function(){
                if(connection.isConnect()){
                    this.refreshView();
                }else{
                    appModel.localCollection.clear();
                    appModel.systemCollection.clear();
                    appModel.updateCollection.clear();
                    var globalConfig = require("globalConfig");
                   // this.onClearSearch();
                    var ctrsKeys=Object.keys(globalConfig.ctrConfig);
                    ctrsKeys.forEach(function(key){
                        if(globalConfig.ctrConfig[key].module=="app"){
                            globalConfig.ctrConfig[key].pageState={
                                vt:tabs.LOCAL
                            };
                        }
                    });
                    app.eventCenter.trigger('refresh_resource_app_status');
                }
                this.rightPanel.showTop();
            }).bind(this));
            
            app.eventCenter.on('switchSite',(function(){
            	this.refreshView();
            }).bind(this));
            
            app.eventCenter.on(curHash.module + curHash.action, (function(e){
                this.refreshView();
            }).bind(this));
            app.eventCenter.on(curHash.module + curHash.action + "entersearch", $.proxy(this.onMultiSearch, this));
           // app.eventCenter.on(curHash.module + curHash.action + "clearsearch", $.proxy(this.onClearSearch, this));
           //处理从首页跳转到更新页
           app.eventCenter.on("switchpageend", function(hash){
                if (hash&&hash.pageState){
                    if (hash.pageState.vt === "home.app.update"){
                        this.el.find(".g-list-tab-header .tab li[data-tab='update']").click();
                    }
                }
           }.bind(this));
           
           //app.dal.binding(apiNames.BIND_INSTALL_APK_BYPHONE, this.refreshView.bind(this));
           var _this = this;
           app.dal.binding(apiNames.BIND_INSTALL_APK_BYPHONE, function(data){
                var model = appModel.localCollection.getAppByPackage(data.info.sAppPackage)||appModel.systemCollection.getAppByPackage(data.info.sAppPackage);
                if(!model){
                   model = new appModel.Model(data.info);
                   if(data.info.apkType==0){
                       appModel.systemCollection.push(model);   
                       appModel.systemCollection.trigger("update"); 
                   }else{
                       appModel.localCollection.push(model); 
                       appModel.localCollection.trigger("update"); 
                   }
                    model.trigger('change');                   
                }else{
                    model.setData(data.info);//app.apkName,
                    _this.getCurCollection().trigger("update");
                    model.trigger('change');
                }
           });
           //app.dal.binding(apiNames.BIND_UNINSTALL_APK_BYPHONE, this.refreshView.bind(this));
           app.dal.binding(apiNames.BIND_UNINSTALL_APK_BYPHONE, function(data){
                console.log("卸载的apk");
                console.log(data);
                
                if(_this.uninstalling){
                    return;
                }
                
                var model = appModel.localCollection.getAppByPackage(data.info.packageName)||appModel.systemCollection.getAppByPackage(data.info.packageName);
                console.log(model);
                if(model&&!model.get("pcUninstall")){
                    model.trigger('remove' , model);
                   _this.getCurCollection().remove(model); 
                }
           });
        },
        /*搜索多个*/
        onMultiSearch : function(searchResult) {
            var me = this;
            var key = searchResult.key;
            var hash = app.getCurHashParas();
            if(this.lastTab!=tabs.SEARCH){
                this.lastTab = this.tab;
            }
            this.tab = tabs.SEARCH;
            if(!this.searchCollection){
                me.initSearch();
            }else{
                this.searchCollection.clear();  
            }
           
            if (searchResult.info) {
                searchResult.info.forEach(function(item) {
                    if(item.packageName&&item.apkType==1) {
                        var tempModel=appModel.localCollection.getAppByPackage(item.packageName);
                        me.searchCollection.push(tempModel);
                    }else if(item.packageName&&item.apkType==0){
                        me.searchCollection.push(appModel.systemCollection.getAppByPackage(item.packageName));
                    }
                });
            me.searchCollection.clearSelected();
            }
            if(this.searchGrid){
                this.searchGrid.setCollection(me.searchCollection);
                this.el.find(".g-grid-search .static").html(i18nDi.fillDomText('common.searchResultText',key,me.searchCollection.models.length));
            }
            
            this.el.find(".g-grid-search").css("display","-webkit-box");
           
            this.el.find(".g-list-tab-header").hide();
            this.el.find("#i-search-app").removeClass('g-page-hide').addClass('g-page-show').siblings().removeClass("g-page-show").addClass('g-page-hide');
            me.searchCollection.trigger("update");
            app.navigate({
                module : hash.module,
                action : hash.action,
                pageState : {
                    vt:"search"
                }
            });
            this.setSearchToolbarStatus();
        },

        onClearSearch : function() {
                        
            this.el.find(".g-grid-search").hide();
            this.el.find(".g-list-tab-header").show();

            if(this.lastTab==tabs.SYSTEM){
                appModel.systemCollection.clearSelected();
                appModel.systemCollection.trigger("update");
                app.navigate({
                    module:"app",
                    action:"app",
                    vt:tabs.SYSTEM
                });
                this.switchTab(this.lastTab);
            }else{
                appModel.localCollection.clearSelected(); 
                appModel.localCollection.trigger("update");
                app.navigate({
                    module:"app",
                    action:"app",
                    vt:tabs.LOCAL
                });
                this.switchTab(tabs.LOCAL);
            }
             
        },
        refreshView: function(){
            if(this.tab==tabs.SEARCH){
                   app.eventCenter.trigger('research');
                   this.setSearchToolbarStatus();
            }else{
                this.el.find(".g-empty-state").hide();
                appModel.updateCollection.fetchUpdateApps();
                //刷新时重新取top榜单
                this.rightPanel.onRefreshTop();
                this.loading.show();
                this.setToolbarStatus();
            } 
        },
        
        selectExportDes: function(){
            var _this = this;
            app.dal.request({
                action: apiNames.REQ_POPUO_SAVE_DIALOG,
                callback: function(res){
                    if(res.status!==1){
                        return;
                    }else if(res.path==""){
                         //确认删除弹窗
                        var confirmDlg = new UIDialog({
                            buttonKey : 2, //1双按钮，2有ok按钮
                            content : i18nDi.fillDomText('common.promptInvaildPath')
                        });
                        confirmDlg.show();
                        return;
                    }else{
                        _this.onExport(res.path);
                    }
                }
            });  
        },
        onMoveApk:function(event){
            var coll = this.getCurCollection();  
            var modelIds = Object.keys(coll.getSelectedMap()); 
            var submitObj=[];
            var failedText="";
            var failedList=[];
            var successList=[];
            var me=this;
                                    //确认覆盖弹窗
            var confirmDlg = new UIDialog({
                buttonKey : 3, //1双按钮，2有ok按钮
                content:i18nDi.fillDomText('myapp.moveConfirm'),
                title:i18nDi.fillDomText('myapp.moveToSdCardLabel'),
            });
            confirmDlg.show();
            confirmDlg.on("yes",function(){
            modelIds.forEach(function(id){ 
                console.log(coll.getModelById(id));
                
                if((coll.getModelById(id).get("sAppType")==1||coll.getModelById(id).get("appType")==1)&&!coll.getModelById(id).getProperty("updating")&&coll.getModelById(id).get("sAppInstallPos")==0){
                    submitObj.push(coll.getModelById(id).data);    
                }
            });
            if(submitObj.length<1){
                return;
            }
            var processWindow = new ProcessWindow({
                header : "myapp.moveToSdCardLabel",
                doingTitle : "myapp.moving",
                successTitle : "common.successText",
                failedTitle : "myapp.moveFailed",
                freshOnly:submitObj.length==1?true:false,
                total: submitObj.length,
                autoDestroy: 3
            });  
            processWindow.on("ready",function(){
                    coll.cancelMove(false);
                    coll.off("moving").on("moving",function(current,total,data,success){
                        processWindow.doProgress(current,total,data,success);
                        if(success){
                            if(me.tab==tabs.SEARCH){
                                me.setSearchToolbarStatus();
                            }else{
                                me.setToolbarStatus();
                            }
                            successList.push(data);
                        }else{
                            try{
                                var modelResult=appModel.localCollection.getAppByPackage(data.packageName)||appModel.updateCollection.getAppByPackage(data.packageName);
                                failedList.push((modelResult&&modelResult.get("sName"))||data.packageName);
                                failedText+=(modelResult.get("sName")||data.packageName)+"<br/>";
                            }catch(e){
                                console.log("on moving 中出错");
                            }
                        }
                        if(current==total&&failedList.length>0){
                            processWindow.setFailedTitle(i18nDi.fillDomText('myapp.moveFailed',total-failedList.length,failedList.length));
                            processWindow.showDetailInfo(failedText);
                        }
                    });
                    coll.moveToSd(submitObj,0,submitObj.length);
                });
                processWindow.on("cancel",function(){
                    coll.cancelMove(true);
                });
                processWindow.open();                       
            });
        },
        onExport: function(path){
            var coll = this.getCurCollection();  
            var modelIds = coll.getSelectedMap();
            
            var array = Object.getOwnPropertyNames(modelIds);
                
            var processWindow = new ProcessWindow({
                header : "common.Export",
                doingTitle : "common.Exporting",
                total: array.length,
                autoDestroy: 1,
                freshOnly:array.length==1?true:false,
                openPath : path
            });
            
            var total = array.length;
            var curSuccessList = [];
            var curFailedList = [];
            var current = 0;

            var logArgs = {
                module: utils.statisticsCode.M_MY_APP,
                module2: utils.statisticsCode.M_NAVIGATION,
                totalNum: array.length
            }
            utils.sendStatistics({
                action: utils.statisticsCode.MYAPP_EXPORT,
                args: logArgs
            });

            //*********************************************************
            //20140724 新版日志
            var logObject = {
                class: "myapps",
                page: "myapps",
                module: "menu",
                action: "export",
                totalnum: array.length,
            }                
            utils.sendNewLog("1000120", logObject);
            //*********************************************************
            
            processWindow.on("ready", function() {
                var failedText ="";
                coll.exportSelectedApps({
                    modelIds: _.keys(modelIds),
                    path: path
                }, function(res, appData){
                    current += 1;
                    var success = false;
                    if(res.status === 1){
                        curSuccessList.push(appData.data);
                        success = true;
                    }else{
                        curFailedList.push(appData.data);
                        failedText+=appData.get("sName")||appData.get("sAppPackage")+"<br/>";
                        success = false;
                    }
                    
                    if(total === current){
                        if(curFailedList.length>0){
                             processWindow.setFailedTitle(i18nDi.fillDomText('myapp.exportFailed',Number(total)-Number(curFailedList.length),curFailedList.length));
                             processWindow.showDetailInfo(failedText);
                        }else{
                            processWindow.setSuccessTitle(i18nDi.fillDomText('myapp.exportSuccess',total));
                            processWindow.setSuccessList(curSuccessList);
                        }
                        var logArgs = {
                            module: utils.statisticsCode.M_MY_APP,
                            module2: utils.statisticsCode.M_NAVIGATION,
                            totalNum: total-curFailedList.length
                        }
                        utils.sendStatistics({
                            action: utils.statisticsCode.MYAPP_EXPORT_COMPLETE,
                            args: logArgs
                        });

                        //*********************************************************
                        //20140724 新版日志
                        var logObject = {
                            class: "myapps",
                            page: "myapps",
                            module: "menu",
                            action: "export_result",
                            successnum: Number(total)-Number(curFailedList.length),
                            failnum: curFailedList.length
                        }                
                        utils.sendNewLog("1000120", logObject);
                        //*********************************************************
                    }
                    processWindow.doProgress(current, total, appData.get("sAppPackage")||"", success);
                });
            });
            
            var cancelExport = function(){
                coll.cancalExport();
            }.bind(this);
            
            processWindow.on('cancel', cancelExport);
            processWindow.on('close', cancelExport);

            processWindow.open();
        },
        
        onInstall: function(){            
            app.dal.request({
                action: apiNames.REQ_POPUP_SYSTEM_DIALOG,
                paras: {
                    MultiSel: 1,
                    MediaType: 'apk',
                    Filter: '(*.apk;*.mpk)|*.apk;*.mpk'
                },
                callback: function(res){
                    console.log("导入app",res);
                    if(res.info && res.info.list){
                      for(var i=0;i<res.info.list.length;i++){
                            if(res.info.list[i].status!=1){
                                return;
                            }
                        }                          
                        var logArgs = {
                            module: utils.statisticsCode.M_MY_APP,
                            module2: utils.statisticsCode.M_NAVIGATION,
                            totalNum: res.info.list.length
                        }
                        utils.sendStatistics({
                            action: utils.statisticsCode.MYAPP_INSTALL_ALL,
                            args: logArgs
                        });

                        var curHash = app.getCurHashParas();
                        
                        var paras = [];
                        
                        res.info.list.forEach(function(file){
                            var pth = file.path;
                            var name = pth.slice(pth.lastIndexOf('\\') + 1);
                            
                            var p = {
                                name: file.apkName || name,
                                iconPath: file.imagePath || "common\\images\\ico\\default-rim-app.png",
                                path: file.path,
                                size: utils.convertSizeToString(file.size),
                                packageName: file.packageName,
                                statistics: {
                                    p_module: curHash.module,
                                    p_action: curHash.action
                                }
                            };
                            paras.push(p);
                        });

                        //*********************************************************
                        //20140724 新版日志                        
                        var isAppFromPC = function(packageName){
                            var isContain = false;
                            for (var k = 0; k < paras.length; k++){
                                if(packageName == paras[k].packageName){
                                    isContain = true;
                                    break;
                                }
                            }
                            return isContain;                            
                        }

                        var successInstall = 0;
                        var failedInstall = 0;
                        taskModel.completeCollection.off("install_app_done");
                        taskModel.completeCollection.on("install_app_done", function(result){
                            var isContain = isAppFromPC(result.data.packageName)
                            if (result.success === true) {
                                if (isContain === true) {
                                    successInstall = successInstall + 1
                                    console.log("APP >> 已经成功安装", successInstall);
                                }
                            } else if (result.success === false){
                                if (isContain === true) {
                                    failedInstall = failedInstall + 1
                                    console.log("APP >> 已经失败安装", failedInstall);
                                }                                
                            }
                            if (successInstall + failedInstall === res.info.list.length){
                                var logObject = {
                                    class: "myapps",
                                    page: "myapps",
                                    module: "menu",
                                    action: "installapps_result",
                                    successnum: successInstall,
                                    failnum: failedInstall
                                }                
                                utils.sendNewLog("1000120", logObject);
                                taskModel.completeCollection.off("install_app_done");
                            }
                        });
                        //*********************************************************
                        //taskModel.batchInstappApp(paras);
                        //*********************************************************
                        //20140724 新版日志
                        var logObject = {
                            class: "myapps",
                            page: "myapps",
                            module: "menu",
                            action: "installapps",
                            totalnum: res.info.list.length,
                        }                
                        utils.sendNewLog("1000120", logObject);
                        //*********************************************************
                    }
                }
            });
        },
        
        onUninstall: function(isFromRight){
            var moduleLog;
            var _this = this;
            
            if (isFromRight === true){
                moduleLog = utils.statisticsCode.M_DETAIL_SELECTED;
            } else {
                moduleLog = utils.statisticsCode.M_NAVIGATION;
            }
            var logArgs = {
                module: utils.statisticsCode.M_MY_APP,
                module2: moduleLog,
                totalNum: 1
            }
            utils.sendStatistics({
                action: utils.statisticsCode.MYAPP_UNINSTALL,
                args: logArgs
            });
            var coll = this.getCurCollection();
            var modelIds = coll.getSelectedMap();
            var me = this;
            var array = Object.getOwnPropertyNames(modelIds);
            var dlgContent=i18nDi.fillDomText('myapp.sureUninstallTip',array.length);
            var btnKey=3;
            if(connection.wifiModel==1){
                dlgContent=i18nDi.fillDomText('myapp.wifiUninstallTitle');
                btnKey=2;
                Object.keys(modelIds).forEach(function(id){
                        coll.getModelById(id).set("wifiUninstall",true);
                });
                coll.uninstallApps(modelIds, function(res, appData){});
            }
            var confirmDlg = new UIDialog({
                buttonKey : btnKey, //1双按钮
                content : dlgContent,
                title: i18nDi.fillDomText('common.uninstallLabel')
            });
            confirmDlg.show();
            
            function doUninstall(){
                
                var processWindow = new ProcessWindow({
                    header : "common.uninstallLabel",
                    doingTitle : "myapp.uninstalling",
                    successTitle : "myapp.uninstallSuccessText",
                    failedTitle : "myapp.uninsatllFailed",
                    retriable : false,
                    total: array.length,
                    freshOnly:array.length==1?true:false,
                    autoDestroy: 3
                });
                
                var total = array.length;
                var curSuccessList = [];
                var curFailedList = [];
                var current = 0;

                var logArgs = {
                    module: utils.statisticsCode.M_MY_APP,
                    module2: moduleLog,
                    totalNum: total
                }
                utils.sendStatistics({
                    action: utils.statisticsCode.MYAPP_UNINSTALL,
                    args: logArgs
                });
                //*********************************************************
                //20140724 新版日志
                var logObject = {
                    class: "myapps",
                    page: "myapps",
                    module: "menu",
                    action: "uninstall",
                    totalnum: total
                }
                if(isFromRight === true){
                    var model = coll.getModelById(array[0])
                    logObject.mtypecode = 1;
                    logObject.typecode = 1;
                    logObject.targetvalue = model.get('sAppPackage');
                    logObject.module = "rightarea_selected",
                    delete logObject.totalnum;
                }             
                utils.sendNewLog("1000120", logObject);
                //*********************************************************
                
                processWindow.on("ready", function() {
                    _this.uninstalling = true;

                    coll.uninstallApps(modelIds, function(res, appData){
                        current += 1;
                        var fialedApp;
                        processWindow.doProgress(current, total, appData, res.status === 1||res.info.lastError==-6);
                        if(res.status === 1){
                            curSuccessList.push(appData);
                            fialedApp=appData;
                            if(appModel.localCollection.getAppByPackage(res.info.packageName)){
                                appModel.localCollection.remove(appModel.localCollection.getAppByPackage(res.info.packageName));
                            }
                            
                            try{
                                if(me.searchCollection.getAppByPackage(res.info.packageName)){
                                    var searchLength = me.searchCollection.models.length;
                                    me.searchCollection.remove(me.searchCollection.getAppByPackage(res.info.packageName));
                                }      
                            }catch(e){
                                
                            }
                             if(coll.selectedHistory.length>0){
                                var history = coll.selectedHistory;
                                var modelId = history[history.length - 1];
                                var modelLast = coll.getModelById(modelId);
                                me.rightPanel.showDetail();
                                me.rightPanel.renderDetail(modelLast);
                            }else{
                                me.rightPanel.showTop();
                            }
                            
                        }else{
                            if(res.info.lastError!=-6){
                                curFailedList.push(appData);
                            }
                            fialedApp = appData;
                        }
                        
                        if(current==total){
                            if(curFailedList.length >0){
                                processWindow.setFailedTitle(i18nDi.fillDomText("myapp.uninsatllFailed",total-curFailedList.length,curFailedList.length));
                            }
                            var logArgs = {
                                module: utils.statisticsCode.M_MY_APP,
                                module2: moduleLog,
                                totalNum: total - curFailedList.length
                            }
                            utils.sendStatistics({
                                action: utils.statisticsCode.MYAPP_UNINSTALL_COMPLETE,
                                args: logArgs
                            });
                            _this.uninstalling = false;
                            //*********************************************************
                            //20140724 新版日志
                            var logObject = {
                                class: "myapps",
                                page: "myapps",
                                module: "menu",
                                action: "uninstall_result",
                                successnum: total-curFailedList.length,
                                failnum: curFailedList.length
                            }
                            if(isFromRight === true){
                                logObject.module = "rightarea_selected";
                                delete logObject.totalnum;
                            }                 
                            utils.sendNewLog("1000120", logObject);
                            //*********************************************************
                        }
                    });
                });
                
                var cancelUninstall = function(){
                    coll.cancelUninstall();
                     _this.uninstalling = false;
                }.bind(this);
                
                processWindow.on('cancel', cancelUninstall);
                processWindow.on('close', cancelUninstall);

                processWindow.open();                
            }
            
            confirmDlg.on("yes", function() {
                doUninstall();
            });
        },
        
        onUpdateAll: function(){
            appModel.updateCollection.downloadAll();
            $(".g-toolbar .updateall").attr("disabled",true);
            var logArgs = {
                module: utils.statisticsCode.M_MY_APP,
                module2: utils.statisticsCode.M_NAVIGATION,
                totalNum: appModel.updateCollection.size()
            }
            utils.sendStatistics({
                action: utils.statisticsCode.MYAPP_UPDATE_ALL,
                args: logArgs
            });
            //*********************************************************
            //20140724 新版日志
            var logObject = {
                class: "myapps",
                page: "myapps",
                module: "menu",
                action: "updateall",
                totalnum: appModel.updateCollection.size(),
            }                
            utils.sendNewLog("1000120", logObject);
            //*********************************************************
        },
        
        onUpdate: function(){
            appModel.updateCollection.updateSelectedApp();
            var len = Object.keys(appModel.updateCollection.getSelectedMap()).length;
            var logArgs = {
                module: utils.statisticsCode.M_MY_APP,
                module2: utils.statisticsCode.M_NAVIGATION,
                totalNum: len
            }
            
            this.setToolbarStatus();
            
            utils.sendStatistics({
                action: utils.statisticsCode.MYAPP_UPDATE,
                args: logArgs
            });
        },
        
        posTabLine: function(){
            var selected = this.el.find('.g-list-tab-header .selected');
            var line = this.el.find('.g-list-tab-header .line');
            
            line.css({
                left: selected[0].offsetLeft,
                width: selected.width() + 2
            });
        },
        
        setTabCount: function(){
            this.el.find('.g-list-tab-header [data-tab="local"] em').html(appModel.localCollection.size());
            this.el.find('.g-list-tab-header [data-tab="update"] em').html(appModel.updateCollection.size());
            this.el.find('.g-list-tab-header [data-tab="sys"] em').html(appModel.systemCollection.size());  
        },
		initSearch : function(){
            var me = this;
            var container = this.el.find('#i-search-app');
            var allCheckboxPxy = this.el.find('.chkbox-all');
            this.searchCollection = appModel.searchCollection;
            this.searchGrid = new SuperGrid({
                 container: container,
                 model: [
                            {
                               type: 'checkbox',
                               width: 54
                            },
                            {
                                name: 'sName',
                                label: getI18N('common.nameLabel'),
                                type: 'view',
                                width: 'flex',
                                view: NameView
                            },
                            {
                                name: 'sAppSize',
                                label: getI18N('common.sizeLabel'),
                                type: 'view',
                                width: '100',
                                pack: 'center',
                                view: MiddleColumn
                            },
                            {
                                name: 'sAppInstallPos',
                                label: getI18N('common.locationLabel'),
                                type: 'view',
                                width: '50',
                                view: PositionIcon,
                                pack: 'end'
                            },
                            
                            {
                                name: '',
                                label: getI18N('common.actionLabel'),
                                type: 'view',
                                width: '120',
                                view: ActionCol,
                                pack: 'center'
                            }
                        ],
                 showLabel: false,
                 rowHeight: 60,
                 checboxDelegate: allCheckboxPxy,
                 collection: this.searchCollection
            }); 	
            this.searchGrid.on(SuperGrid.ROW_SELECTED, $.proxy(this.onSearchGridSelect, this));
            this.searchGrid.on(SuperGrid.ROW_UNSELECTED, $.proxy(this.onSearchGridSelect, this));
            this.searchGrid.on(SuperGrid.ROW_SELECTED_ALL, $.proxy(this.onSearchGridSelect, this));   
            this.searchCollection.on("update",function(){
                if(me.searchCollection.models.length>=0){
                    me.el.find(".g-grid-search .static .num-sp").html(me.searchCollection.models.length);
                }
            });                     
		},
        initLocal: function(){
            var collection = appModel.localCollection;
            
            if(collection.sendRequest && collection.receiveResponse){
                this.loading.hide();
            }else if(collection.sendRequest && !collection.receiveResponse){
                this.loading.show();
            }
            
            if(this.localGrid) {
                return false;
            }
            
            var me = this;
            var container = this.el.find('#i-local-app');
            var allCheckboxPxy = this.el.find('.chkbox-all');
            
            
            this.localGrid = new SuperGrid({
                 container: container,
                 model: [
                            {
                               type: 'checkbox',
                               width: 54
                            },
                            {
                                name: 'sName',
                                label: getI18N('common.nameLabel'),
                                type: 'view',
                                width: 'flex',
                                view: NameView
                            },
                            {
                                name: 'sAppSize',
                                label: getI18N('common.sizeLabel'),
                                type: 'view',
                                width: '100',
                                pack: 'center',
                                view: MiddleColumn
                            },
                            
                            {
                                name: 'sAppInstallPos',
                                label: getI18N('common.locationLabel'),
                                type: 'view',
                                width: '50',
                                view: PositionIcon,
                                pack: 'end'
                            },
                            
                            {
                                name: '',
                                label: getI18N('common.actionLabel'),
                                type: 'view',
                                width: '120',
                                view: ActionCol,
                                pack: 'center'
                            }
                        ],
                 showLabel: false,
                 rowHeight: 60,
                 checboxDelegate: allCheckboxPxy,
                 collection: collection
            }); 
            
			this.localGrid.on(SuperGrid.ROW_SELECTED, $.proxy(this.onGridSelect, this));
            this.localGrid.on(SuperGrid.ROW_UNSELECTED, $.proxy(this.onGridSelect, this));
            this.localGrid.on(SuperGrid.ROW_SELECTED_ALL, $.proxy(this.onGridSelect, this));
            
            this.localGrid.on(SuperGrid.RENDER_END, this.onRenderEnd.bind(this));
            
            
            var $empty = $(_.template(this.getTpl('tpl-local-empty-tip'), {i18n: i18nDi}));
            var switchResponse = function(){
                if(collection.receiveResponse && collection.size() <= 0){
                    $empty.show();
                }else{
                    $empty.hide();
                }
            };
            
            collection.on('update', function(){
                if(collection.sendRequest && collection.receiveResponse){
                    if(this.tab == tabs.LOCAL){
                        this.loading.hide();
                    }
                    app.eventCenter.trigger('refresh_resource_app_status');
                }
                switchResponse();
            }.bind(this));
            
            container.append($empty);
            
            $empty.delegate('.g-btn', 'click', function(){
                app.navigate({
                    module: 'resource',
                    action: 'app'
                });
            });
			
			if(!collection.sendRequest){
			    collection.refresh();
			}else if(collection.receiveResponse){
			    collection.trigger('update');
			}
        },
        
        initUpdate: function(){
            var collection = appModel.updateCollection;
            
            if(collection.sendRequest && collection.receiveResponse){
                this.loading.hide();
            }else if(collection.sendRequest && !collection.receiveResponse){
                this.loading.show();
            }
            if(this.updateGrid) {
                return false;
            }
            
            var container = this.el.find('#i-update-app');
            this.updateGrid = new SuperGrid({
                 container: container,
                 model: [
                            {
                               type: 'checkbox',
                               width: 54
                            },
                            {
                                name: '',
                                label: getI18N('common.nameLabel'),
                                type: 'view',
                                width: 'flex',
                                pack: 'left',
                                view: NameView
                            },
                            {
                                name: 'sAppSize',
                                label: getI18N('common.sizeLabel'),
                                type: 'view',
                                width: '160',
                                pack: 'left',
                                view: MiddleColumn
                            },
                            /*
                            {
                                name: '',
                                label: getI18N('common.locationLabel'),
                                type: 'view',
                                pack: 'center',
                                view: PositionIcon,
                                width: '16'
                            }*/
                            
                            {
                                name: '',
                                label: getI18N('common.actionLabel'),
                                type: 'view',
                                pack: 'center',
                                view: ActionCol,
                                width: '120'
                            }
                        ],
                 showLabel: false,
                 rowHeight: 60,
                 showChecboxDelegate: false,
                 collection: collection
            }); 
            
            this.updateGrid.on(SuperGrid.ROW_SELECTED, $.proxy(this.onGridSelect, this));
            this.updateGrid.on(SuperGrid.ROW_UNSELECTED, $.proxy(this.onGridSelect, this));
            this.updateGrid.on(SuperGrid.ROW_SELECTED_ALL, $.proxy(this.onGridSelect, this));
            this.updateGrid.on(SuperGrid.RENDER_END, this.onRenderEnd.bind(this));
            
            var $empty = $(_.template(this.getTpl('tpl-update-empty-tip'), {i18n: i18nDi}));
            
            var switchResponse = function(opts){
                opts = opts || {};
                
                if(opts.action != "clear" && collection.receiveResponse && collection.size() <= 0){
                    $empty.show();
                }else{
                    $empty.hide();
                }
            };
            console.log("升级应用：");
            console.log(collection);
            
            collection.on('update', function(opts){
                if(collection.sendRequest && collection.receiveResponse){
                    if(this.tab == tabs.UPDATE){
                        this.loading.hide();
                    }
                }
                switchResponse(opts);
            }.bind(this));
            
            if(!collection.sendRequest){
                collection.refresh();
            }else if(collection.receiveResponse){
                collection.trigger('update');
            }
            this.setToolbarStatus();
            
            switchResponse();
            container.append($empty);
            
            $empty.delegate('.g-btn', 'click', function(){
                app.navigate({
                    module: 'resource',
                    action: 'app'
                });
            });
        },
        
        initSys: function( collection ){
            var collection = appModel.systemCollection;
            
            if(collection.sendRequest && collection.receiveResponse){
                this.loading.hide();
            }else if(collection.sendRequest && !collection.receiveResponse){
                this.loading.show();
            }
            
            if(this.sysGrid) {
                return false;
            }
            
            var me = this;
            var systemListContainer = this.el.find('#i-system-app');
            var allCheckboxPxy = this.el.find('.chkbox-all');
            
            var systemGrid = this.sysGrid = new SuperGrid({
                 container: systemListContainer,
                 model: [
                            {
                               type: 'checkbox',
                               width: 54
                            },
                            {
                                name: '',
                                label: getI18N('common.nameLabel'),
                                type: 'view',
                                width: 'flex',
                                pack: 'left',
                                view: NameView
                            },
                            {
                                name: 'sAppSize',
                                label: getI18N('common.sizeLabel'),
                                type: 'view',
                                width: '100',
                                pack: 'center',
                                view: MiddleColumn
                            },
                            
                            {
                                name: '',
                                label: getI18N('common.locationLabel'),
                                type: 'view',
                                pack: 'end',
                                view: PositionIcon,
                                width: '50'
                            },
                            
                            {
                                name: '',
                                label: getI18N('common.actionLabel'),
                                type: 'view',
                                pack: 'center',
                                view: ActionCol,
                                width: '120'
                            }
                        ],
                 showLabel: false,
                 rowHeight: 60,
                 checboxDelegate: allCheckboxPxy,
                 collection: collection
            }); 
            
            this.sysGrid.on(SuperGrid.ROW_SELECTED, $.proxy(this.onGridSelect, this));
            this.sysGrid.on(SuperGrid.ROW_UNSELECTED, $.proxy(this.onGridSelect, this));
            this.sysGrid.on(SuperGrid.ROW_SELECTED_ALL, $.proxy(this.onGridSelect, this));
            
            this.sysGrid.on(SuperGrid.RENDER_END, this.onRenderEnd.bind(this));
            
            
            collection.on('update', function(){
                if(collection.sendRequest && collection.receiveResponse){
                    if(this.tab == tabs.SYSTEM){
                        this.loading.hide();
                    }
                }
            }.bind(this));
            
            if(!collection.sendRequest){
                collection.refresh();
            }else if(collection.receiveResponse){
                collection.trigger('update');
            }
            this.setToolbarStatus();
            
            //systemListContainer.append($(_.template(this.getTpl('tpl-system-mask'), {i18nDi: i18nDi})));
        },
        
        redirect:function(hash){
            var me = this;
            if(hash.pageState&&hash.pageState.searchType&&hash.pageState.searchType=="1"){//选中搜索到的一个
                var data = JSON.parse(hash.pageState.data);
                var collection;
                var grid;
                if(data.apkType==1){//切换到localApp
                      collection = appModel.localCollection;
                      this.switchTab(tabs.LOCAL);
                      grid = this.localGrid;
                }else if(data.apkType==0){//切换到systemApp
                      collection = appModel.systemCollection;
                      this.switchTab(tabs.SYSTEM);
                      grid = this.sysGrid;
                }
               collection.clearSelected();

               var model =collection.getAppByPackage(data.packageName);
               collection.setSelected(model.getId(),true);
               collection.trigger("update");
               grid.scrollToIndex(collection.models.indexOf(model));
               me.onGridSelect(model);
            }else if(hash.pageState&&hash.pageState.vt){
                  me.switchTab(hash.pageState.vt);
            }else{
                  me.switchTab(tabs.LOCAL);
            }
            if(this.tab==tabs.SEARCH){
                this.setSearchToolbarStatus();
            }else{
                this.setToolbarStatus();
            }
        },
        onRenderEnd: function(list){
            
        },
        
        getCurCollection: function(){
            var coll;
            switch(this.tab){
                case tabs.LOCAL:
                    coll = appModel.localCollection;
                    break;
               case tabs.UPDATE: 
                    coll = appModel.updateCollection;
                    break;
               case tabs.SYSTEM: 
                    coll = appModel.systemCollection;
                    break;
               case tabs.SEARCH:
                    coll = this.searchCollection;
                    break;
            }
            return coll;
        },
        /*搜索表格选择*/
        onSearchGridSelect:function(model){
            var coll = this.getCurCollection();
            var rpl = this.rightPanel;
            console.log(model);
            /*添加判断条件model.isSelected，处理搜索结果*/
           if(model && _.isObject(model)){
                coll.setSelected(model.getId(),model.isSelected());               
           }
            if(coll.hasSelected()){
                var history = coll.selectedHistory;
                var modelId = history[history.length - 1]||model.getId();
                var modelLast = coll.getModelById(modelId);
                rpl.showDetail();
                rpl.renderDetail(modelLast||model);
            }else{
                rpl.showTop();
            }
            
            this.setSearchToolbarStatus();            
        },
        onGridSelect: function(model){
            var coll = this.getCurCollection();
            var rpl = this.rightPanel;
            /*添加判断条件model.isSelected，处理搜索结果*/
           if(model && _.isObject(model)){
                coll.setSelected(model.getId(),model.isSelected());               
           }
            if(coll.hasSelected()){
                //var history = coll.selectedHistory;
                //var modelId = history[history.length - 1]||(model&&model.getId());
                var selectIds = Object.keys(coll.getSelectedMap());
                var modelId = selectIds[selectIds.length - 1]||(model&&model.getId());
                var modelLast = coll.getModelById(modelId);
                rpl.showDetail();
                rpl.renderDetail(modelLast||model);
            }else{
                rpl.showTop();
            }
            
            this.setToolbarStatus();
        },
        setSearchToolbarStatus:function(){
            var collection = appModel.searchCollection;
            
            var $updateAllBtn = this.el.find('.g-toolbar .updateall');
            var $exportBtn = this.el.find('.g-toolbar .export');
            var $uninstallBtn = this.el.find('.g-toolbar .uninstall');
            var $moveBtn = this.el.find('.g-toolbar .move');
            if(!collection.hasSelected()){
                $updateAllBtn.prop('disabled', true);
                $exportBtn.prop('disabled', true);
                $uninstallBtn.prop('disabled', true);
                $moveBtn.prop('disabled', true);
            }else{
                //如果有选中项
                var selectedIds = Object.keys(collection.getSelectedMap());
                var hasSystem = false;
                var hasUpdate = false;
                var movable = false;
                for(var i=0;i<selectedIds.length;i++){
                    //是否有系统应用
                    var curModel = collection.getModelById(selectedIds[i]);
                    if(curModel.get("sAppInstallPos")==0&&(curModel.get("appType")==1||curModel.get("sAppType")==1)&&!curModel.getProperty("updating")){
                        movable=true;
                    }
                    if(curModel.get("sAppType")==0){
                        hasSystem = true;
                    }else{
                        //非系统应用，是否有可更新的应用
                        if(appModel.updateCollection.getAppByPackage(collection.getModelById(selectedIds[i]).get("sAppPackage"))){
                            hasUpdate = true;
                        }
                    }
                }
                if(hasSystem){
                    $uninstallBtn.prop('disabled', true);
                }else{
                    $uninstallBtn.prop('disabled', false);
                }
                $exportBtn.prop('disabled', false);
                if(hasUpdate){
                    $updateAllBtn.prop('disabled', false);
                }else{
                    $updateAllBtn.prop('disabled', true);
                }
                if(movable&&selectedIds.length>0&&connection.deviceInfo.isAppCanMove&&connection.wifiModel!=1){
                    $moveBtn.prop('disabled', false);
                }else{
                    $moveBtn.prop('disabled', true);
                }

            }
        },
        setToolbarStatus: function(){
            var localCol = appModel.localCollection;
            var systemCol = appModel.systemCollection;
            var updateCol = appModel.updateCollection;
            var searchCol =  appModel.searchCollection;
            var $installBtn = this.el.find(".g-toolbar .install");
            var $updateAllBtn = this.el.find('.g-toolbar .updateall');
            var $updateBtn = this.el.find('.g-toolbar .update');
            var $exportBtn = this.el.find('.g-toolbar .export');
            var $uninstallBtn = this.el.find('.g-toolbar .uninstall');
            var $moveBtn = this.el.find('.g-toolbar .move');
            
            if(localCol.sendRequest&&localCol.receiveResponse){
                $installBtn.prop('disabled', false);
            }else{
                $installBtn.prop('disabled', true);
            }
            
            if(this.tab == tabs.LOCAL){
                $updateBtn.prop('disabled', true);
                var hasSelected = localCol.hasSelected();
                //var isAllUpdating = updateCol.isAllSelectedUpdating();
                $updateAllBtn.prop('disabled', updateCol.isAllUpdating());
                $exportBtn.prop('disabled', !hasSelected);
                $uninstallBtn.prop('disabled', !hasSelected);
                var movable=false;
                var selectIds=Object.keys(localCol.getSelectedMap());
                for(var i=0;i<selectIds.length;i++){
                    var tempModel=localCol.getModelById(selectIds[i]);
                    if(tempModel.get("sAppInstallPos")==0&&(tempModel.get("sAppType")==1||tempModel.get("appType")==1)&&!tempModel.getProperty("updating")){
                        movable=true;
                    }                    
                }
                if(selectIds.length>0&&movable&&connection.deviceInfo.isAppCanMove&&connection.wifiModel!=1){
                    $moveBtn.prop('disabled', false);
                }else{
                    $moveBtn.prop('disabled', true);
                }
            }else if(this.tab == tabs.SYSTEM){
                $updateBtn.prop('disabled', true);
                $updateAllBtn.prop('disabled', updateCol.isAllUpdating());
                $exportBtn.prop('disabled', true);
                $uninstallBtn.prop('disabled', true);
                $moveBtn.prop('disabled', true);
                var hasSelected = systemCol.hasSelected();
                $exportBtn.prop('disabled', !hasSelected);
                
                if(connection.isRoot()){
                    $uninstallBtn.prop('disabled', !hasSelected);
                }else{
                    $uninstallBtn.prop('disabled', true);
                }
            }else if(this.tab == tabs.UPDATE){
                var hasSelected = updateCol.hasSelected();
                //var isAllUpdating = updateCol.isAllSelectedUpdating();
                 $updateAllBtn.prop('disabled', updateCol.isAllUpdating());
                //$updateBtn.prop('disabled', isAllUpdating);
                $exportBtn.prop('disabled', !hasSelected);
                $uninstallBtn.prop('disabled', !hasSelected);
                 var selectedIds = Object.keys(updateCol.getSelectedMap());
                 var movable=false;
                for(var i=0;i<selectedIds.length;i++){
                    //是否有系统应用
                    var curModel = updateCol.getModelById(selectedIds[i]);
                    if(curModel.get("appType")==3){
                         $uninstallBtn.prop('disabled', true);
                    }else if((curModel.get("appType")==1||curModel.getProperty("appType")==1)&&!curModel.getProperty("updating")&&curModel.get("sAppInstallPos")==0){
                         movable=true;
                    }
                }
                if(selectedIds.length>0&&movable&&connection.deviceInfo.isAppCanMove&&connection.wifiModel!=1){
                    $moveBtn.prop('disabled', false);
                }else{
                    $moveBtn.prop('disabled', true);
                }                
            }else if(this.tab==tabs.SEARCH){
                var hasSelected = searchCol.hasSelected();
                //$updateBtn.prop('disabled', isAllUpdating);
                $exportBtn.prop('disabled', !hasSelected);
                $uninstallBtn.prop('disabled', !hasSelected);
            }
            
        },
        /*点击tab*/
        onTabClick: function( e ){
            var $target = $(e.target);
            var $tab = e.target.tagName.toLowerCase() == 'li' ? $target : $target.parents('li');
            var tab = $tab.attr('data-tab');
            if(tab==this.tab){
                return;
            }
            var curHash = app.getCurHashParas();
            var pageState =  {};
            
            if(tab==tabs.LOCAL){
			      pageState.vt = tabs.LOCAL;
			 }else if(tab==tabs.UPDATE){
			      pageState.vt = tabs.UPDATE;
			 }else if(tab==tabs.SYSTEM){
			     pageState.vt = tabs.SYSTEM;
			 }
            curHash.pageState = pageState;

            app.navigate(curHash);
          //  this.switchTab(tab);
        },
        switchTab : function(tabName){
            var tabHeader =  this.el.find(".g-list-tab-header li[data-tab="+tabName+"]");
            tabHeader.addClass("selected").siblings().removeClass("selected");
            this.el.find('.g-list-tab-con .list').addClass('g-page-hide').removeClass('g-page-show');
            if(tabName!=tabs.SEARCH){
                  this.el.find(".g-grid-search").hide();
                  this.el.find(".g-list-tab-header").show();
            }else{
                 this.el.find(".g-grid-search").css("display","-webkit-box");
                 this.el.find(".g-list-tab-header").hide();           
            }

            var allCheckboxDelegate = this.el.find('.chkbox-all');
            
            this.tab = tabName;
            var grid = null;
            switch(tabName){
                case tabs.LOCAL:
                    $panel = this.el.find('#i-local-app');
                    this.initLocal();
                    grid = this.localGrid;
                    break;
               case tabs.UPDATE: 
                    $panel = this.el.find('#i-update-app');
                    this.initUpdate();
                    grid = this.updateGrid;
                    break;
               case tabs.SYSTEM: 
                    $panel = this.el.find('#i-system-app');
                     this.initSys();
                    grid = this.sysGrid;
                    break;
                case tabs.SEARCH:
                    $panel = this.el.find('#i-search-app');
                    grid = this.searchGrid;
                    break;                
            }
            $panel.removeClass('g-page-hide').addClass('g-page-show');
           
            this.posTabLine();
            this.setToolbarStatus();
            
            this.onGridSelect();
            
            grid.setAllCheckboxDelegate(allCheckboxDelegate);
        }
    });
    
    return AppMainView;
}); 