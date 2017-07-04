define("UISidebar", function(require, exports, module) {
    var app = require('app');
    var $ = require('jquery');
    var _ = require('underscore');
    var i18nDi = require('I18NDI');
    var utils = require('utils');
    var config = require('globalConfig');
    var taskMgr = require('taskModel');
    var SmartTip = require("UISmartTip");
    var apiNames = require('APINames');
    var Friendly = require('UIFriendlyView');
    
    var Sidebar = app.ViewBase.extend({
        module : module,
        curHash : null,
        events : {
            'click -> nav li' : 'onSelect'
        },

        clickTime : 0,
        init : function(opts) {
            var me = this;
            this.el = $('#i-sidebar');
            this.genieData = "";
            var configLocal=config.ctrConfig;
            app.getUserConfig(function(res) {
                $.ajax({
                    url:config.domain.publicMobogenie+"/resource/pchome/view/sidebarConfig.json",
                    type: "post",
                    async: false,
                    dataType: 'jsonp',
                    jsonpCallback:"callback",
                    cache: false, 
                    timeout: 5000,
                    success:function(data){
                        Object.keys(configLocal).forEach(function(moduleKey){
                            if(data.BlackListConfig[moduleKey].blackList){
                                configLocal[moduleKey]["blackList"] = data.BlackListConfig[moduleKey].blackList;
                            }
                        });
                    }
                });
                me.el.html(_.template(me.getTpl('tpl-sidebar-adjust'), {
                    I18N : i18nDi,
                    config : configLocal,
                    defsite : (res.info.defResourceLanguage&&res.info.defResourceLanguage.toLowerCase().replace(/\s/g, ''))||"GL"
                }));

                var $taskNav = me.el.find('.task-nav');
                var $count = $taskNav.find('.speed .c');
                var $speed = $taskNav.find('.speed .s');
				
                var interval = 0;
                var updateSideTaskView = _.bind(function() {
                    if (taskMgr.progressCollection.size() == 0) {
                        $count.html(i18nDi.fillDomText('common.noTaskText'));
                        $speed.html('');
                    } else {
                        $count.html(i18nDi.fillDomText('common.countTasksText', taskMgr.progressCollection.size()));
                    }
                }, me);

                updateSideTaskView();
                taskMgr.progressCollection.on('update', function() {
                    requestAnimationFrame(updateSideTaskView);
                });

                app.eventCenter.on("switchSite", $.proxy(me.switchSiteHandler, me));
                app.eventCenter.on('switchpageend', $.proxy(me.select, me));

                //taskMgr.completeCollection.on('update', updateSideTaskView);
                //taskMgr.progressCollection.on('receiverTaskResponse', updateSideTaskView);
                taskMgr.progressCollection.on('addTask', function() {
                    if (!me.tip) {
                        me.tip = new SmartTip({
                            tipType : 2
                        });
                        me.tip.toCenter();
                    }
                    me.tip.flushATip(".task-nav .animation-ctn");
                });
                //add by liujintao 2014-08-18 失败重新下载时触发动画
                taskMgr.progressCollection.on('repeatDownload', function(data) {
                    console.log("触发了repeatDownload=============================",JSON.stringify(data));
                    if (!me.tip) {
                        me.tip = new SmartTip({
                            tipType : 2
                        });
                        me.tip.toCenter();
                    }
                    me.tip.flushATip(".task-nav .animation-ctn");
                });
                //add by liujintao 2014-08-18 任务继续下载时触发动画
               taskMgr.progressCollection.on('continueDownload', function(data) {
                    console.log("触发了continueDownload=============================",JSON.stringify(data));
                    if (!me.tip) {
                        me.tip = new SmartTip({
                            tipType : 2
                        });
                        me.tip.toCenter();
                    }
                    me.tip.flushATip(".task-nav .animation-ctn");
                });
                taskMgr.completeCollection.on('setringtone', function(res) {
                    if (!me.tip) {
                        me.tip = new SmartTip();
                    }
                    me.tip.toCenter();
                    me.tip.show();
                    if (res.success) {
                        if (res.type == "1") {
                            me.tip.flushTip(i18nDi.fillDomText('music.setringtoneSuccess'));
                        } else if (res.type == "2") {
                            me.tip.flushTip(i18nDi.fillDomText('music.setsmsSuccess'));
                        } else {
                            me.tip.flushTip(i18nDi.fillDomText('music.setalarmSuccess'));
                        }
                    } else {
                        me.tip.flushTip(i18nDi.fillDomText('music.setFailed'));
                    }
                });

                var isOpenFirst = localStorage["isOpenFirst"];
                if (!isOpenFirst){
                    var $navGenie = me.el.find('.tools .genie');
                    $navGenie.addClass('tips');
                }

                var appModel = require('appModel');
                var $navApp = me.el.find('.local .app');

                var updateStatus = function() {
                    if (appModel.updateCollection.size() > 0) {
                        $navApp.addClass('tips');
                    } else {
                        $navApp.removeClass('tips');
                    }
                };
                appModel.updateCollection.on('update', updateStatus);

                //检查是否有未读短信
                var MessageModel = require('smsModel');
                var connection = require('connectionMgr');
                var $navMsg = me.el.find('.local .sms');
                connection.on('connection', function() {
                    if (connection.isConnect()) {
                        var collectionMsg = new MessageModel.Collection();
                        var updateMsgStatus = function() {

                            setTimeout(function(){
                                collectionMsg.getPhoneTime({}, function(res) {
                                    console.log("Sidebar >> 是否有未读短信：", res);
                                    if (res.info && res.info.hasMessage === true) {
                                        $navMsg.addClass('tips');
                                    } else {
                                        $navMsg.removeClass('tips');
                                    }
                                });
                            }, 2000);
                            
                            // collectionMsg.getPhoneTime({}, function(res) {
                            //     console.log("Sidebar >> 是否有未读短信：", res);
                            //     if (res.info && res.info.hasMessage === true) {
                            //         $navMsg.addClass('tips');
                            //     } else {
                            //         $navMsg.removeClass('tips');
                            //     }
                            // });
                        };
                        collectionMsg.on('update', updateMsgStatus);
                        collectionMsg.bindReceiveMessage(function(res) {
                            var model = collectionMsg.getMsgModelByThreadID(res.info.smsThreadId);
                            if (!model) {
                                model = collectionMsg.createNewMsgModel(res.info);
                                //collectionMsg.setModeltoFirst(model);
                            }
                            collectionMsg.setModeltoFirst(model);
                            model.data.isAllRead = true;
                            var msg = collectionMsg.getMsgByMsgID(model.data.smsList, res.info.smsMessageId);
                            if (!msg) {
                                //model.data.smsList.push(res.info);
                                var temp = [];
                                temp.push(res.info);
                                model.data.smsList = temp.concat(model.data.smsList);
                            }
                            collectionMsg.trigger('update');
                        });
                    } else {
                        var config = require('globalConfig');
                        var curHash = app.getCurHashParas();

                        if (curHash.module != 'resource' && curHash.module != 'task' && curHash.module != 'feedback'&&curHash.module!='tools'&&curHash.module!='genie') {
                            app.navigate({
                                module : config.defaultController['module'],
                                action : config.defaultController['action']
                            });
                        }

                        $navApp.removeClass('tips');
                        $navMsg.removeClass('tips');
                    }
                });

                
                var speedQueqe = [];
                var timer = null;

                var renderSpeed = function() {
                    var res = speedQueqe.shift();
                    if (res) {
                        var hasTask = taskMgr.progressCollection.hasDownloadingTasks();
                        if (!hasTask) {
                            res.info.downloadRate = '';
                        } else {
                            res.info.downloadRate = parseInt(res.info.downloadRate);
                        }
                        $speed.html(res.info.downloadRate ? res.info.downloadRate + ' KB/s' : '');
                        timer = setTimeout(renderSpeed, 1000);
                    } else {
                        timer = null;
                    }
                };
                me.select();

                me.getGenieConfig(res);
            });

            /*
             app.dal.binding(apiNames.BIND_SET_DOWNLOAD_SPEED, function(res) {
             speedQueqe.push(res);

             if (!timer) {
             renderSpeed();
             }
             });
             */
        },

        getGenieConfig: function(userConfig){
            var me = this;
            var paras = {
                type: "get",
                url: 'http://public.mobogenie.com/genie/js/genieConfig.json?' + new Date().valueOf(),
                async: true,
                dataType: 'text',
                timeout: 30000
            };
            
            paras.success = function(res){
                var data = eval("(" + res + ")")
                console.log('getGenieConfig >> ', data);
                config.ctrConfig["12"].blackList = data.blackList;
                console.log('getGenieConfig >> ', userConfig);
                console.log('getGenieConfig >> ', config.ctrConfig);
                var title = "GL"
                var defsite = userConfig.info.defsite;
                console.log('userConfig===========',userConfig)
                if(userConfig.info.site){
                    for (var i = 0; i < userConfig.info.site.length; i++) {
                        if (userConfig.info.site[i].title === defsite) {
                            title = userConfig.info.site[i].resourceLanguage;
                            break;
                        }
                    }
                }
                me.switchSiteHandler("", title);
                data.curSite = title.toLowerCase();
                me.genieData = data;
            };

            paras.error = function(response, msg){
                console.log("getGenieConfig >> error XMLHttpRequest obj: ", response);
                console.log("getGenieConfig >> 失败啦！！！ ", msg);
            };
            
            app.dal.request({
                action : "get_Url",
                paras : {url: "www.mobogenie.com"},
                callback : function(res) {
                    if (res&&res.code === 18){
                        paras.error();
                    } else {
                        $.ajax(paras);
                    }
                }
            });
        },

        switchSiteHandler : function(domain, title) {
           var $sidebarLi = this.el.find("nav li");
           var config = require('globalConfig');
           var ctrKeys = Object.keys(config.ctrConfig);
           ctrKeys.forEach(function(ctr){
               if((config.ctrConfig[ctr].blackList&&config.ctrConfig[ctr].blackList.indexOf("all")>-1)||(config.ctrConfig[ctr].blackList&&config.ctrConfig[ctr].blackList.indexOf(title.toLowerCase())>-1)){
                   $sidebarLi.filter("[data-index='nav-"+ctr+"']").hide();
               }else{
                   $sidebarLi.filter("[data-index='nav-"+ctr+"']").show();
               }
           });
           this.genieData.curSite = title.toLowerCase();
        },
        onSelect : function(e) {
            var $target = $(e.target);
            var $navEl = $target.hasClass('title') ? $target : $target.parents('li');
            var navIndex = $navEl.attr('data-index').split('-')[1];
            var ctrCfg = config.ctrConfig[navIndex];
            var curHash = app.getCurHashParas();

            if (ctrCfg.module =='genie'){
                $navEl.find(".genie").removeClass('tips');
            }

            if (ctrCfg.module != 'resource' && ctrCfg.module != 'task' && ctrCfg.module != 'home'&&ctrCfg.module != 'tools'&&ctrCfg.module!='genie') {
                var connection = require('connectionMgr');
                if (!connection.isConnect()) {
                    if(!Friendly.instance){
                        Friendly.instance=new Friendly();
                    }
                    Friendly.instance.clickConnect();
                    return;
                }
            }

            this.el.find('.selected').removeClass('selected');
            $navEl.addClass('selected');

            if (ctrCfg.module == 'task' && curHash.module == 'task') {
                app.history.back();
            } else if (ctrCfg.module == 'genie'){
                console.log(this.genieData);
                console.log(JSON.stringify(this.genieData))
                app.navigate({
                    module : 'genie',
                    action : 'genie',
                    pageState : {
                        vt : "update_data",
                        content : JSON.stringify(this.genieData).replace(/\//g, "|").replace(/=/g, "$").replace(/&/g, "*")
                    }
                }, {
                    cache : false
                });
            } else { 
                app.navigate({
                    module : ctrCfg.module,
                    action : ctrCfg.action
                }, {
                    mergeCache : true
                });
                if (ctrCfg.module !== 'task' && curHash.module !== 'task'){
                    //*********************************************************
                    //20140724 新版日志-页面跳转
                    var logObject = {
                        class: "framework",
                        page: "framework",
                        module: "leftmenu",
                        action: utils.convertHashKeyByLog(ctrCfg.module + "_" + ctrCfg.action)
                    }
                    utils.sendNewLog("1000120", logObject);
                    //*********************************************************
                }
            }
        },

        /*
         * 导航选择
         */
        select : function() {
            var hash = app.getCurHashParas();
            if (!this.curHash || this.curHash.module != hash.module || this.curHash.action != hash.action) {
                this.el.find('.selected').removeClass('selected');
                for (var ix in config.ctrConfig) {
                    var opts = config.ctrConfig[ix];

                    if (hash.module == opts.module && hash.action == opts.action) {
                        $('[data-index="nav-' + ix + '"]').addClass('selected');
                        break;
                    }
                }
            }
        }
    });

    return Sidebar;
});
