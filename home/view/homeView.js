define('UIHomeMainView', function(require, exports, module) {
    var app = require('app');
    var $ = require('jquery');
    var _ = require('underscore');
    var connection = require('connectionMgr');
    var taskModel = require('taskModel');
    var appModel = require('appModel');
    var HomeModel = require('homeModel');
    var utils = require('utils');
    var apiNames = require('APINames');
    var i18nDi = require('I18NDI');
    var cacheHome = require('r-cache');
    var Friendly = require('UIFriendlyView');

    var HomeView = app.ViewBase.extend({
        module : module,
        model : new HomeModel(),

        events : {
            'click -> .g-screen-action .capture' : 'saveSnapshoot',
            'click -> .g-screen-action .refresh' : 'fetchSnapshoot',
            'click -> .screen-empty-info' : 'onClickUnConnect',
            'click -> .g-home-tools .backup' : 'onClickBackupProxy',
            'click -> .g-home-tools .recovery' : 'onClickRestoreProxy',
            'click -> .g-home-tools .file' : 'onClickFileManagerProxy'
        },

        init : function(opts) {
            var me = this;
            this.clickBackupProxy = this.clickFileManagerProxy = this.clickRestoreProxy = this.onClickUnConnect;
            this.el = $(_.template(this.getTpl('tpl-home-main-view'), {
                i18n : i18nDi
            }));
            this.el.appendTo($('#' + opts.pageId));

            this.isFirstSnapshoot = true;
            this.isGetServerTpl = false

            connection.on("getDeviceInfo", function() {
                this.intScreenStatus();
                connection.off("getDeviceInfo", arguments.callee);
            }.bind(this));

            this.el.on('scroll', $.proxy(this.scroll, this));

            me.onConnectionInit();
            connection.on('connection', function(status) {
                
                if (connection.isConnect()) {
                	var wifiModel = connection.isWifiModel();
                	me.onConnectionInit();
                    me.clickBackupProxy = me.onClickBackup;
                    me.clickFileManagerProxy = me.onClickFileManager;
                    me.clickRestoreProxy = me.onClickRestore;
                	if( wifiModel ){
                		var $screen = me.el.find('.g-mobile-screen');
                        $screen.addClass("wifi");
                        $screen.off("mouseover");
                        $screen.off("mouseover");
                		me.el.find('#wifi-screen-black').show();
                		
                	}else{
                        me.fetchSnapshoot(function(res) {
                            if (res.status === 1) {
                                //截屏按钮逻辑判断
                                var $screen = me.el.find('.g-mobile-screen');
                                $screen.removeClass("wifi");
                                $screen.off("mouseover");
                                $screen.off("mouseover");
        
                                $screen.on('mouseover', function() {
                                    if (connection.isConnect()) {
                                        $screen.addClass('hover');
                                    }
                                }).on('mouseout', function() {
                                    $screen.removeClass('hover');
                                });
                                me.intScreenStatus();
                            }
                        });  
                    }                  
                } else {
                    me.clickBackupProxy = me.clickFileManagerProxy = me.clickRestoreProxy = me.onClickUnConnect;
                    connection.deviceInfo = {};
	                me.el.find('.g-mobile-screen .pic img').attr('src',"home/images/unconnect_screen.png").css('visibility', 'visible');
	                me.el.find(".g-home-tools .all-memory").find(".progress").css("width", "0px");
	                me.el.find(".g-home-tools .all-memory").hide();
	                me.el.find(".screen-empty-info").show();
	                me.el.find('.g-screen-action').hide();
	                me.el.find(".g-home-tools").addClass("unconnected");
	                me.el.find('#screen-black').hide();
	                me.el.find('#wifi-screen-black').hide();
                }
            });

            this.renderServerTpl();

            this.setScreenSize();
            connection.on('getDeviceInfo', this.setScreenSize.bind(this));

            var updateMemory = function(lan) {
                $(document.body).find(".g-home-sd-tips").remove();
                me.onConnectionInit(true);
                utils.setlog_pclg(lan)
            }
            var updateSite=function(siteConfig){
                var domainConfig = require("globalConfig");
                var curModule=app.getCurHashParas();
                var inBlackList=false;
                for(var i in domainConfig.ctrConfig){
                     if(domainConfig.ctrConfig[i].module == curModule.module && 
                         domainConfig.ctrConfig[i].action == curModule.action&&domainConfig.ctrConfig[i].blackList&&
                         (domainConfig.ctrConfig[i].blackList=="all"||domainConfig.ctrConfig[i].blackList.indexOf(siteConfig.site.toLowerCase())>-1)){
                             inBlackList=true;
                     }
                 }
                 if(inBlackList){
                     app.navigate({
                         module:domainConfig.defaultController.module,
                         action:domainConfig.defaultController.action
                     });
                 }
            }
            app.eventCenter.on('switchLanguage', updateMemory);
            app.eventCenter.off('switchSite',updateSite).on('switchSite',updateSite);
            app.eventCenter.on("homehome", function(){
                if (!this.isGetServerTpl){
                    this.renderServerTpl();
                }
            }.bind(this));

            this.timer = setInterval(updateMemory, 10000);
            utils.setLastPageTime(new Date().valueOf());
            utils.setNewLastPageTime(new Date().valueOf());
            /*添加title*/
            utils.tooltip.attach(this.el.find(".backup"));
            utils.tooltip.attach(this.el.find(".recovery"));
            utils.tooltip.attach(this.el.find(".file"));

            this.model.on("screenswitch", function(ss) {
                if (ss == 0) {
                    $("#screen-black").show();
                } else {
                    $("#screen-black").hide();
                }
            });

            //*********************************************************
            //20140724 新版日志
            utils.setLogPublicFeild(false);
            //*********************************************************
        },

        intScreenStatus : function() {
            if (connection.deviceInfo && typeof connection.deviceInfo.screenOn == "undefined") {
                $("#screen-black").hide();
                return;
            }
            if (connection.deviceInfo && connection.deviceInfo.screenOn) {
                $("#screen-black").hide();
            } else {
                $("#screen-black").show();
            }
        },

        setScreenSize : function() {
            var info = connection.deviceInfo;
            if (info && info.width && info.height) {
                if (info.width > info.height) {
                    var temp = info.width;
                    info.width = info.height;
                    info.height = temp;
                }
                var $img = this.el.find('.g-mobile-screen .pic img');
                var $imageWidth = $img.width();

                var relativeH = $imageWidth * info.height / info.width;
                $img.height(relativeH);
            }
        },

        queue : function(functions, scope) {
            (function next() {
                if (functions.length > 0) {
                    functions.shift().apply(scope || {}, [next].concat(Array.prototype.slice.call(arguments, 0)));
                }
            })();
        },

        getServerConfig : function(callback) {
            this.cache.getConfig(['main', 'homeConfig'], "resource/pchome/view/main-homeConfig.js", callback);
        },

        getServerCSS : function(callback) {
            this.cache.getFiles("main-home-style-css", function(cssInfo) {
                var cssNode = $('#main_home_style_css')[0];
                if (!cssNode) {
                    var cssHtml = '<style type="text/css" id="main_home_style_css">' + cssInfo[1] + '</style>';
                    $('body').append(cssHtml);
                }
                callback();
            });
        },

        getServerTpl : function(callback) {
            var me = this;
            this.cache.getFiles("main-homeTpl-html", function(msg) {
                var $module = $('<div/>');
                var $script;

                $module.html(msg[1]);

                $script = $module.find('script');
                $script.each(function(item) {
                    me.tpls[$($script[item]).attr('id')] = $($script[item]).html();
                });

                $module.remove();

                callback();
            });
        },

        getServerJS : function() {
            var me = this;
            this.cache.getFiles("main-home-js", function(script) {
                eval(script[1]);
                var MainHomePartView = require('mainHomePartView');
                var options = {
                    homeView : me,
                    templateCellection : me.tpls
                };
                MainHomePartView.executeInit(options);
                me.isGetServerTpl = true
            });
        },

        renderServerTpl : function() {
            this.cache = new cacheHome();
            this.tpls = {};
            var funcList = [this.getServerConfig, this.getServerCSS, this.getServerTpl, this.getServerJS];
            this.queue(funcList, this);
        },
        onClickBackupProxy : function(event) {
            this.clickBackupProxy(event);
        },
        onClickBackup : function() {
            utils.sendStatistics({
                action : utils.statisticsCode.HOME_OPEN_BACKUP
            });
            var ToolsMainView = require('UIToolsMainView');
            ToolsMainView.Backup();
            //*********************************************************
            //20140724 新版日志-点击备份
            var logObject = {
                class : "home",
                page : "home_home",
                module : "manage",
                action : "to_backup"
            }
            utils.sendNewLog("1000120", logObject);
            //*********************************************************
        },
        //未连接时的点击
        onClickUnConnect : function(event) {
            if(!Friendly.instance){
                Friendly.instance=new Friendly();
            }
            Friendly.instance.clickConnect();
        },
        //还原的代理事件
        onClickRestoreProxy : function(event) {
            this.clickRestoreProxy(event);
        },
        onClickRestore : function() {
            utils.sendStatistics({
                action : utils.statisticsCode.HOME_OPEN_RESTORE
            });
            var ToolsMainView = require('UIToolsMainView');
            ToolsMainView.Restore();
            //*********************************************************
            //20140724 新版日志-点击还原
            var logObject = {
                class : "home",
                page : "home_home",
                module : "manage",
                action : "to_restore"
            }
            utils.sendNewLog("1000120", logObject);
            //*********************************************************
        },
        onClickFileManagerProxy : function(event) {
            this.clickFileManagerProxy(event);
        },
        onClickFileManager : function() {
            utils.sendStatistics({
                action : utils.statisticsCode.HOME_OPEN_FILE_MANAGER
            });
            var ToolsMainView = require('UIToolsMainView');
            ToolsMainView.FileManager();
            //*********************************************************
            //20140724 新版日志-点击文件管理器
            var logObject = {
                class : "home",
                page : "home_home",
                module : "manage",
                action : "to_filemanager"
            }
            utils.sendNewLog("1000120", logObject);
            //*********************************************************
        },

        // node : 显示进度的dom节点
        // total: 总量
        // avaliable: 可用量
        // toolTip: 提示工具对象
        // tipTitle: 提示工具的标题
        // triggerNode: 触发进度的dom节点
        setMemoryProgress : function(node, total, avaliable, toolTip, tipTitle, triggerNode) {
            var used = total - avaliable;
            if (used / total > 0.85) {
                node.addClass("alarm");
            } else {
                if (node.hasClass("alarm"))
                    node.removeClass("alarm");
            }
            node.css('width', (used / total) * 100 + '%');
            var avaliableStr = utils.convertSizeToString(avaliable * 1024);
            var totalStr = utils.convertSizeToString(total * 1024);

            var MemoryData = {
                title : tipTitle,
                total : totalStr,
                avaliable : avaliableStr
            };
            var MemoryContent = _.template(this.getTpl('tpl-home-memory-tip'), {
                I18N : i18nDi,
                data : MemoryData
            });
            var MemoryTipOption = {
                target : triggerNode.get(0),
                content : MemoryContent
            };
            toolTip.setOption(MemoryTipOption);
        },

        onConnectionInit: function(isUpdate){
            console.log("HOME >> init..", connection.isConnect());

            if (isUpdate !== true) {             
                this.el.find('.g-home-tools').transition({
                    x: 0
                }, 500, 'ease');
                
                this.el.find('.bottom').transition({
                    y: 0
                }, 500, 'ease');
                
                appModel.updateCollection.fetchUpdateApps();

                this.el.find('.g-mobile-screen').transition({
                    x: 0
                }, 500, 'ease');

                this.el.scrollTop(0);
            }
            if(connection.isConnect()){
                //显示内存使用量进度==============================
                connection.getDeviceInfo();
                var deviceInfo = connection.deviceInfo;
                console.log("HOME >> device info: ", deviceInfo);
                //*********************************************************
                //20140724 新版日志
                deviceInfo.log_phonestatus = connection.curStatus;
                utils.setLogPublicFeild(true, deviceInfo);
                //*********************************************************

                var ToolTip = require('UItoolTip');
                var toolTip = new ToolTip({
                    maxWidth: 2400,
                    space: 5,
                    background:"black"
                });

                var $phoneProgress = this.el.find('.phone-memory .progress');
                var tipTitle = i18nDi.fillDomText('common.deviceMemoryLabel');
                var triggerNode = this.el.find('.phone-memory');

                this.setMemoryProgress(
                    $phoneProgress, 
                    deviceInfo.sTotalMemory, 
                    deviceInfo.sAvaliableMemory,
                    toolTip,
                    tipTitle,
                    triggerNode);

                if (deviceInfo.isSDCardExist === false){
                    this.el.find('.sd-one').hide();
                    this.el.find('.sd-two').hide();
                } else {
                    if (deviceInfo.sSDTotalMemory > 0){
                        var $sdOne = this.el.find('.sd-one');
                        $sdOne.show();
                        var $sdProgress = this.el.find('.sd-one .progress');
                        tipTitle = i18nDi.fillDomText('common.sdCardLabel');
                        triggerNode = $sdOne;

                        this.setMemoryProgress(
                            $sdProgress, 
                            deviceInfo.sSDTotalMemory, 
                            deviceInfo.sSDAvaliableMemory,
                            toolTip,
                            tipTitle,
                            triggerNode);
                    } else {
                        this.el.find('.sd-one').hide();
                    }
                    if (deviceInfo.sExternSDTotalMemory > 0){
                    //if (1 > 0){
                        var $sdTwo = this.el.find('.sd-two');
                        $sdTwo.show();
                        var $sdProgressTwo = this.el.find('.sd-two .progress');
                        tipTitle = i18nDi.fillDomText('common.sdCardTwoLabel');
                        triggerNode = $sdTwo;

                        this.setMemoryProgress(
                            $sdProgressTwo, 
                            deviceInfo.sExternSDTotalMemory, 
                            deviceInfo.sExternSDAvaliableMemory,
                            toolTip,
                            tipTitle,
                            triggerNode);  
                    } else {
                        this.el.find('.sd-two').hide();
                    }
                }

                if (Object.keys(deviceInfo).length > 20){
                    this.el.find(".g-home-tools .all-memory").show();
                } else {
                    this.el.find(".g-home-tools .all-memory").hide();
                }
                this.el.find(".g-home-tools .all-memory").show();
                this.el.find(".screen-empty-info").hide();
                this.el.find('.g-screen-action').show();
                this.el.find(".g-home-tools").removeClass("unconnected");
            } else {
                //*********************************************************
                //20140724 新版日志
                var deviceInfo = {};
                deviceInfo.sPhoneBrand = "-";
                deviceInfo.sPhoneName = "-";
                deviceInfo.log_phonestatus = connection.curStatus;
                
               
                utils.setLogPublicFeild(true, deviceInfo);
                //*********************************************************
                //this.el.find('.g-mobile-screen .pic img').removeAttr('src').css('visibility', 'hidden');
                // this.el.find('.g-mobile-screen').transition({
                //     x: -300
                // }, 500, 'ease');
                // this.el.find('.g-home-tools').transition({
                //     x: 1160
                // }, 500, 'ease');
                // this.el.find('.g-home-recommend').transition({
                //     x: 2400
                // }, 500, 'ease');
            }
        },

        fetchSnapshoot : function(callback) {
            if (this.isFirstSnapshoot === true) {
                this.isFirstSnapshoot = false;
            }
            var _this = this;
            $('#screenshot-loading').show();
            this.el.find('.g-screen-action').addClass('hd');

            this.model.getScreenShot($.proxy(function(res) {
                console.log("HOME >> get screenshot: ", res);

                _this.el.find('.g-screen-action').removeClass('hd');
                $('#screenshot-loading').hide();

                var logArgs = {
                    module : utils.statisticsCode.M_HOME,
                    module2 : utils.statisticsCode.M_HOME_PHONE_SCREEN
                }
                utils.sendStatistics({
                    action : utils.statisticsCode.HOME_REFRESH_SCREEN,
                    args : logArgs
                });
                if (res.info && res.info.sScreenShotImagePath) {
                    var $img = this.el.find('.g-mobile-screen .pic img');
                    $img.attr('src', res.info.sScreenShotImagePath).css('visibility', 'visible');
                }
                if ( typeof callback == 'function') {
                    callback && callback.apply(this, [res]);
                } else {
                    //*********************************************************
                    //20140724 新版日志-手机屏幕刷新
                    var logObject = {
                        class : "home",
                        page : "home_home",
                        module : "phone",
                        action : "refresh"
                    }
                    utils.sendNewLog("1000120", logObject);
                    //*********************************************************
                }
            }, this));
        },

        saveSnapshoot : function() {
            var tpl = this.getTpl('tpl-home-message-tip');
            var _this = this;
            //*********************************************************
            //20140724 新版日志-手机屏幕截图
            var logObject = {
                class : "home",
                page : "home_home",
                module : "phone",
                action : "capture"
            }
            utils.sendNewLog("1000120", logObject);
            //*********************************************************
            this.fetchSnapshoot( function() {
                this.model.saveSnapShoot(function(res) {
                    if (res.status === 1) {

                        var des;

                        if (res.des) {
                            var nameIndex = res.des.lastIndexOf('\\');
                            var filename = res.des.slice(nameIndex);
                            var preStr = res.des.slice(0, nameIndex);

                            if (preStr.length > 50) {
                                preStr = preStr.slice(0, 50);
                                des = preStr + '...' + filename;
                            } else {
                                des = res.des;
                            }
                        }

                        if (!localStorage.isFirstSaveScreenShot || localStorage.isFirstSaveScreenShot == 0) {
                            this.tipPannel = new app.PopupPanel({
                                Model : 1,
                                Width : 392,
                                Height : 142,
                                Parame : {
                                    path : res.des
                                },
                                Path : 'screenshotTip.html'
                            });
                            this.tipPannel.open();

                            this.tipPannel.on("message", function(data) {
                                localStorage.isFirstSaveScreenShot = data.windowReady ? 1 : 0;
                            });

                            localStorage.isFirstSaveScreenShot = 1;
                            return;
                        }

                        var ctn = _.template(tpl, {
                            message : i18nDi.fillDomText('common.screenshotSave') + des,
                            openlabel : i18nDi.fillDomText('common.openLabel')
                        });
                        utils.showMessageTip(ctn, function(el) {
                            el.delegate('.open', 'click', function() {
                                app.dal.request({
                                    action : apiNames.REQ_OPEN_EXISTED_FILE,
                                    paras : {
                                        path : res.des
                                    }
                                });

                            });
                        });
                    } else {
                        utils.showMessageTip('The snapshot Failed');
                        // utils.sendStatistics({
                        //     action: utils.statisticsCode.HOME_SCREEN_SHOT,
                        //     status: 0
                        // });
                    }
                    var logArgs = {
                        module : utils.statisticsCode.M_HOME,
                        module2 : utils.statisticsCode.M_HOME_PHONE_SCREEN
                    }
                    utils.sendStatistics({
                        action : utils.statisticsCode.HOME_SCREEN_SHOT,
                        args : logArgs
                    });
                });
            }.bind(this));
        },

        scroll : function() {
            var hh = this.el.height();
            var scrollTop = this.el[0].scrollTop;
            var scrollHHeight = this.el[0].scrollHeight;

            var rate = 1 - scrollTop / 360;

            this.el.find('.g-home-bg').css({
                opacity : rate
            });
            this.el.find('.bottom').css({
                background : 'rgba(250, 250, 250, ' + (rate > 0.5 ? 0.5 : rate) + ')'
            });

            if (hh + scrollTop === scrollHHeight) {
                this.trigger('scrolltobottom');
            }
        }
    });

    return HomeView;
});
