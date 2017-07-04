define("UIMusicView", function(require, exports, module) {
    var app = require('app');
    var $ = require('jquery');
    var _ = require('underscore');
    var SuperGrid = require('grid');
    var UIMenu = require("UIMenu");
    var UIDialog = require('UIDialog');
    var apiNames = require('APINames');
    /*国际化字典工具*/
    var i18nDi = require('I18NDI');
    var Utils = require("utils");
    var LoadingPic = require("loading");
    /*进度处理框*/
    var ProcessWindow = require("ProgressPanel");
    var utils = require('utils');

    var canvas = require('canvas');
    var audio = require('audio');
    var AudioPlayer = audio.AudioPlayer;

    var connectionMgr = require("connectionMgr");

    var SmartTip = require("UISmartTip");

    var MusiItemView = app.ViewBase.extend({
        module : module,
        init : function(model) {
            this.model = model;
            var seconds = Math.ceil(parseInt(this.model.data.sMusicDuration) / 1000);
            var timeDuration = (Math.floor(seconds / 60) >= 10 ? Math.floor(seconds / 60) : ("0" + Math.floor(seconds / 60))) + ":" + (seconds % 60 >= 10 ? seconds % 60 : "0" + seconds % 60);
            this.model.data = _.extend(this.model.data, {
                size : this.model.data.size || Utils.convertSizeToString(this.model.data.sMusicSize),
                duration : timeDuration,
                format : this.model.data.format || Utils.getExtension(this.model.data.sMusicRemotePath),
                playing : this.model.data.playing || "0",
                sMusicArtist : this.model.data.sMusicArtist || "Unknown Artist"
            });
        },
        render : function(target) {
            var dom = target.find(".music-list-item");
            if (dom.length < 1) {
                var tpl = this.getTpl("tpl-music-list-item");
                $(target).html($(_.template(tpl, {
                    data : this.model.data
                })));
                dom = target.find(".music-list-item");
            }
            dom.attr("data-url", this.model.data.sMusicRemotePath);
            dom.attr("data-id", this.model.data.id);
            dom.find(".musicName").html(this.model.data.sMusicName);
            dom.find(".musicName").attr("titleText", this.model.data.sMusicName);
            if (this.model.get("fileError")) {
                dom.find(".musicName").addClass("line-through");
            } else {
                dom.find(".musicName").removeClass("line-through");
            }
            Utils.tooltip.attach(dom.find(".musicName"));

            dom.find(".musicAlbumn").html(this.model.data.sMusicAlbumname);
            dom.find(".artist").html(this.model.data.sMusicArtist);

            dom.find(".play-icon .play-control").attr("data-url", this.model.data.sMusicRemotePath);
            dom.find(".play-icon .play-control").attr("data-id", this.model.data.id);

            dom.find(".play-icon .play-control").attr("class", this.model.data.playing == "1" ? "play-control btn-pause" : "play-control btn-play");

            if (!this.model.canPlay()) {
                dom.find(".play-control").attr("i18n-Key", 'music.formaterror');
                dom.find(".play-control").addClass("disabled");
                Utils.tooltip.attach(dom.find(".play-control"), "right");
            } else if (this.model.get("fileError")) {
                dom.find(".play-control").attr("i18n-Key", 'common.promptInvaildPath');
                dom.find(".play-control").addClass("disabled");
                Utils.tooltip.attach(dom.find(".play-control"), "right");
            } else {
                dom.find(".play-control").removeAttr("i18n-Key");
                dom.find(".play-control").removeClass("disabled");
                if (this.model.data.playing == "1") {
                    dom.find(".play-icon .play-control").attr("i18n-Key", "music.stop");
                    utils.tooltip.attach(dom.find(".play-icon .play-control"));
                } else {
                    dom.find(".play-icon .play-control").attr("i18n-Key", "video.playLabel");
                    utils.tooltip.attach(dom.find(".play-icon .play-control"));
                }
            }
            dom.find(".settings .phone").attr("class", this.model.data.isRing ? "phone cur" : "phone").attr("data-url", this.model.data.sMusicRemotePath).attr("data-id", this.model.data.id).attr("i18n-key", "music.setasringtone");
            Utils.tooltip.attach(dom.find(".settings .phone"));
            dom.find(".settings .sms").attr("class", this.model.data.isSms ? "sms cur" : "sms").attr("data-url", this.model.data.sMusicRemotePath).attr("data-id", this.model.data.id).attr("i18n-key", "music.setasnotification");
            Utils.tooltip.attach(dom.find(".settings .sms"));
            dom.find(".settings .ring").attr("class", this.model.data.isAlarm ? "ring cur" : "ring").attr("data-url", this.model.data.sMusicRemotePath).attr("data-id", this.model.data.id).attr("i18n-key", "music.setasalarm");
            Utils.tooltip.attach(dom.find(".settings .ring"));

            if (this.model.data.isRing || this.model.data.isSms || this.model.data.isAlarm) {
                dom.find(".settings").addClass("hasSetted");
            } else {
                dom.find(".settings").removeClass("hasSetted");
            }
            dom.find(".format").html(this.model.data.format);
            dom.find(".duration").html(this.model.data.duration);
            dom.find(".size").html(this.model.data.size);
            /*更新音乐进度条*/
            if (AudioPlayer.circleProgress && AudioPlayer.circleProgress.canvas) {
                if (this.model.data.playing == "1") {
                    dom.find(".play-icon .play-control").html($(AudioPlayer.circleProgress.canvas));
                    dom.find(".play-icon .play-control").find("canvas").show();
                } else {
                    dom.find(".play-icon .play-control").find("canvas").hide();
                    //dom.find(".play-icon .play-control").empty();
                }
            }

        }
    });
    var MusicView = app.ViewBase.extend({
        module : module,
        events : {
            'click -> .music-list-item .play-control' : 'onPlay',
            'dblclick -> .musicName' : 'onPlay',
            'click -> .g-toolbar .btn-delete' : 'onDelete',
            'click -> .music-list-item .settings button' : 'onSetting',
            'click -> .g-toolbar .btn-import' : 'onImport',
            'click ->.g-toolbar .btn-export' : 'onExport',
            'click ->.g-media-empty-info .goto-downloadRingtones' : 'gotoRingtones'
        },
        init : function(opts) {
            var pageId = opts.pageId;
            var me = this;
            this.collection = opts.collection;

            this.el = $(_.template(this.getTpl('tpl-music-main-view'), {
                I18N : i18nDi
            }));
            this.el.appendTo($('#' + pageId));

            var listContainer = this.el.find('.g-content .list');
            var emptyContainer = this.el.find('.g-content .pic_content');

            var allCheckboxPxy = this.el.find('.chkbox-all');
            var header = $(_.template(this.getTpl("tpl-music-grid-header"), {
                I18N : i18nDi
            }));
            this.grid = new SuperGrid({
                container : listContainer,
                model : [{
                    type : 'checkbox',
                    width : 54
                }, {
                    name : '',
                    label : header,
                    type : 'view',
                    width : 'flex',
                    view : MusiItemView
                }],
                showLabel : false,
                rowHeight : 48,
                multiSelectable : false,
                checboxDelegate : allCheckboxPxy,
                collection : this.collection
            });
            this.grid.on(SuperGrid.ROW_SELECTED, function() {
                me.checkNav();
            });
            this.grid.on(SuperGrid.ROW_UNSELECTED, function() {
                me.checkNav();
            });
            this.grid.on(SuperGrid.ROW_SELECTED_ALL, function() {
                me.checkNav();
            });

            this.loading = new LoadingPic();
            this.loading.render(this.el.find(".g-content"));
            this.loading.show();

            me.collection.on("update", function() {
                if (me.collection.responsed && me.collection.requested) {

                    var keys = Object.keys(me.collection.getModelMap());
                    var toolbar = $(this.el).find(".g-toolbar");
                    try {
                        if (!connectionMgr.deviceInfo.isSDCardExist&&connectionMgr.isConnect()) {
                            toolbar.find(".btn-import").attr("disabled", "disabled");
                            console.log("音乐 >> 没有SD卡，禁用 btn-import", toolbar.find(".btn-import").get(0));
                        } else {
                            toolbar.find(".btn-import").removeAttr("disabled");
                            console.log("音乐 >> 拥有SD卡，启用 btn-import", toolbar.find(".btn-import").get(0));
                        }
                        if (keys.length < 1) {
                            if (connectionMgr.deviceInfo.isSDCardExist) {
                                emptyContainer.html(_.template(me.getTpl("tpl-music-empty-info"), {
                                    I18N : i18nDi
                                })).show();
                            } else if (!connectionMgr.deviceInfo.isSDCardExist&&connectionMgr.isConnect()){
                                emptyContainer.html(_.template(me.getTpl("tpl-music-nosd-info"), {
                                    I18N : i18nDi
                                })).show();
                            }
                            listContainer.css({
                                "visibility" : "hidden",
                                "opacity" : 0,
                                "z-index" : "-1"
                            });
                        } else {
                            listContainer.css({
                                "visibility" : "visible",
                                "opacity" : 1,
                                "z-index" : "1"
                            });
                            emptyContainer.hide();
                        }
                    } catch(e) {
                    }
                    me.loading.hide();
                }
            }.bind(this));

            if (this.collection.requested && this.collection.responsed) {
                this.collection.trigger("update");
            }
            var curHash = app.getCurHashParas();
            app.eventCenter.on(curHash.module + curHash.action, $.proxy(this.refresh, this));
            /*初始化播放器*/
            AudioPlayer.audioInit();
            if (AudioPlayer.circleProgress) {
                AudioPlayer.circleProgress.end();
            };

            this.checkNav();
        },
        refresh : function() {
            this.loading.show();
            this.collection.refresh();
            this.grid.setAllSelect(false);
            AudioPlayer.reset();
            AudioPlayer.pause();
        },
        onSetting : function(event) {
            var me = this;
            var target = $(event.target);
            var url = $(target).parents(".music-list-item").attr("data-url");
            var id = $(target).parents(".music-list-item").attr("data-id");
            var model = me.collection.getModelById("genie_music_" + id);
            var setasname = $(target).attr("name") || $(target).parents("button").attr("name");
            var settype;
            if (setasname == "setasring") {
                settype = model.data.isRing ? "-1" : "1";
            } else if (setasname == "setasmsg") {
                settype = model.data.isSms ? "-2" : "2";
            } else if (setasname == "setasalarm") {
                settype = model.data.isAlarm ? "-4" : "4";
            }
            var submitObject = {
                localPath : "",
                remotePath : url,
                id : id,
                type : settype
            };
            me.collection.setMusicRingtone(submitObject, function(res) {
                if (!me.tip) {
                    me.tip = new SmartTip();
                }
                me.tip.toCenter();
                me.tip.show();
                var status = null;
                if (res.status == "1") {
                    status = 1;
                    if (setasname == "setasring") {
                        model.set("isRing", !model.get("isRing"));
                        target.toggleClass("cur");
                        me.tip.flushTip(model.get("isRing") ? i18nDi.fillDomText('music.setringtoneSuccess') : i18nDi.fillDomText('music.cancelringtone'));
                    } else if (setasname == "setasmsg") {
                        model.set("isSms", !model.get("isSms"));
                        target.toggleClass("cur");
                        me.tip.flushTip(model.get("isSms") ? i18nDi.fillDomText('music.setsmsSuccess') : i18nDi.fillDomText('music.cancelsetsms'));
                    } else if (setasname == "setasalarm") {
                        model.set("isAlarm", !model.get("isAlarm"));
                        target.toggleClass("cur");
                        me.tip.flushTip(model.get("isAlarm") ? i18nDi.fillDomText('music.setalarmSuccess') : i18nDi.fillDomText('music.cancelsetalarm'));
                    }
                    if (model.get("isRing") || model.get("isSms") || model.get("isAlarm")) {
                        target.parents(".settings").addClass("hasSetted");
                    } else {
                        target.parents(".settings").removeClass("hasSetted");
                    }

                } else {
                    status = 0
                    me.tip.flushTip(i18nDi.fillDomText('music.setFailed'));
                }

                //*********************************************************
                var position = me.collection.getModelPosition(model)
                //20140924
                var logObject = {
                    page: "mymusic_home",
                    module: "list",
                    action: "play",
                    totalnum: me.collection.models.length,
                    position: position,
                    targettype: setasname,
                    status: status,
                    owner:model.get("sMusicArtist"),
                    name:model.get("sMusicName")
                }
                utils.sendNewLog("1000120", logObject);
                //********************************************************* 

                app.eventCenter.trigger('setMusic', res);
            });
            event.stopPropagation();
        },
        onDelete : function() {
            var me = this;

            //确认删除弹窗
            var selectedIds = Object.keys(me.collection.getSelectedMap());
            var confirmDlg = new UIDialog({
                buttonKey : 3, //1双按钮，2有ok按钮
                content : i18nDi.fillDomText('music.sureDelete', selectedIds.length),
                title : i18nDi.fillDomText('common.Delete')
            });
            //*********************************************************
            //20140924
            var logObject = {
                page: "mymusic_home",
                module: "menu",
                action: "delete",
                totalnum: selectedIds.length
            }
            utils.sendNewLog("1000120", logObject);
            //********************************************************* 
            confirmDlg.show();
            confirmDlg.on("yes", function() {

                var submitData = [];
                var failedList = [];
                _.each(selectedIds, function(id) {
                    submitData.push(me.collection.getModelById(id).data);
                    if (me.collection.getModelById(id).get("playing") == "1") {
                        AudioPlayer && AudioPlayer.pause();
                        AudioPlayer && AudioPlayer.reset();
                    }
                });
                if (selectedIds.length == 1) {
                    me.collection.on("doing",function(current, total, id, success){
                            me.checkNav();   
                    });
                    me.collection.deleteMusic(submitData, function(res) {
                    });
                } else {
                    var processWindow = new ProcessWindow({
                        header : "common.Delete",
                        doingTitle : "common.Deleting",
                        successTitle : "music.deleteSuccess",
                        failedTitle : "music.deleteFailed",
                        total : submitData.length,
                        freshOnly : selectedIds.length == 1 ? true : false,
                        autoDestroy : 3
                    });
                    processWindow.on("ready", function() {
                        console.log(submitData);
                        me.collection.deleteMusic(submitData, function(res) {
                        });
                        me.collection.on("doing", function(current, total, id, success) {
                            if (!success) {
                                failedList.push(id);
                            }
                            processWindow.doProgress(current, total, id, success);
                            if (current == total) {
                                if (failedList.length > 0) {
                                    processWindow.setFailedTitle(i18nDi.fillDomText('music.deleteFailed', total - failedList.length, failedList.length));
                                }
                            }
                        });
                    });
                    processWindow.on("close", function() {
                        me.checkNav();
                        setTimeout(function() {
                            me.collection.setStopProcess(false);
                        }, 500);
                    });
                    processWindow.on("cancel", function() {
                        me.collection.setStopProcess(true);
                        me.checkNav();
                    });
                    processWindow.open();
                }

            });
        },
        checkNav : function() {
             if(this.collection.getModelById("genie_music_undefined")){
                this.collection.remove(this.collection.getModelById("genie_music_undefined"));
            }
            var modelSelectedIds = Object.keys(this.collection.getSelectedMap());
            var toolbar = this.el.find(".g-toolbar");
            console.log("检查导航..................."+modelSelectedIds);
            if (modelSelectedIds.length == 0) {
                toolbar.find(".btn-delete").attr("disabled", "disabled");
                toolbar.find(".btn-export").attr("disabled", "disabled");
            } else {
                toolbar.find(".btn-delete").removeAttr("disabled");
                toolbar.find(".btn-export").removeAttr("disabled");
            }
        },
        onImport : function() {
            var me = this;
            me.collection.importMusic(function(res) {
                if (res.success) {
                    me.collection.trigger("update");
                }
            });
        },
        onExport : function() {
            var me = this;
            var selectedIds = Object.keys(me.collection.getSelectedMap());
            var submitModels = [];
            var failedList = [];
            var successList = [];
            var failedStr = "";
            _.each(selectedIds, function(id) {
                var model = me.collection.getModelById(id);
                submitModels.push(model.data);
            });

            app.dal.request({
                action : apiNames.REQ_POPUO_SAVE_DIALOG,
                callback : function(res) {
                    if (!connectionMgr.isConnect()) {
                        return;
                    }
                    if (res.status !== 1) {
                        return;
                    } else if (res.path == "") {
                        //确认删除弹窗
                        var confirmDlg = new UIDialog({
                            buttonKey : 2, //1双按钮，2有ok按钮
                            content : i18nDi.fillDomText('common.promptInvaildPath')
                        });
                        confirmDlg.show();
                        return;
                    } else {
                        var processWindow = new ProcessWindow({
                            header : "common.Export",
                            doingTitle : "common.Exporting",
                            successTitle : "music.exportSuccess",
                            failedTitle : "music.exportFailed",
                            total : selectedIds.length,
                            freshOnly : false,
                            numberType : "index",
                            openPath : res.path,
                            autoDestroy : 1
                        });
                        me.collection.on("doing", function(current, total, curData, success) {
                            processWindow.doProgress(current, total, curData, success);
                            if (!success) {
                                failedList.push(curData);
                                failedStr += curData.sMusicName + "<br/>";
                            } else {
                                successList.push(curData);
                            }
                            if (current == total) {
                                if (failedList.length > 0) {
                                    processWindow.setFailedTitle(i18nDi.fillDomText('music.exportFailed', total - failedList.length, failedList.length));
                                    processWindow.showDetailInfo(failedStr);
                                } else {
                                    /*允许对导出的数据进行多选*/
                                    processWindow.setSuccessTitle(i18nDi.fillDomText('music.exportSuccess', total));
                                    processWindow.setSuccessList(successList);
                                }
                            }
                        });
                        processWindow.on("cancel", function() {
                            me.collection.setStopProcess(true, "export");
                        });
                        processWindow.on("ready", function() {
                            var path = res.path + "\\";
                            /*取到保存位置的文件夹*/
                            me.collection.exportMusic(submitModels, path, function(res) {
                                if (res.status == 0) {//如果点击了取消
                                    processWindow.close();
                                }
                            });

                        });
                        processWindow.open();
                    }
                }
            });

        },
        play : function(model) {
            var me = this;
            if (AudioPlayer.src.indexOf(model.get("localPath")) < 0 || AudioPlayer.sourceId != model.get("id")) {
                if (AudioPlayer.circleProgress) {
                    AudioPlayer.circleProgress.end();
                }
                me.el.find("canvas").remove();
                AudioPlayer.reset();
                AudioPlayer.init({
                    src : model.get("localPath"),
                    sourceId : model.get("id"),
                    circleProgress : new canvas.CircleProgress({
                        parent : me.el.find(".play-icon .play-control[data-id=" + model.get("id") + "]"),
                        radius : 9,
                        lineWidth : 1,
                        progressColor : '#0cb7f0',
                        bgProgressColor : '#999',
                        fillStyle : '#fff',
                        end : function() {
                            model.set("playing", "0");
                            me.el.find(".play-icon .play-control").removeClass("btn-pause").addClass("btn-play");
                            me.el.find("canvas").hide();
                            me.el.find(".play-icon .play-control[data-id=" + model.get("id") + "]").attr("i18n-Key", "video.playLabel");
                        },
                        error : function(event) {
                            AudioPlayer.circleProgress.end();
                        }
                    })
                });
            }

            AudioPlayer.playOrpause();
            var isPaused = AudioPlayer.isPaused();

            if (isPaused) {
                model.set("playing", "0");
                me.el.find(".play-icon .play-control[data-id=" + model.get("id") + "]").removeClass("btn-pause").addClass("btn-play");
                me.el.find("canvas").hide();
                me.el.find(".play-icon .play-control[data-id=" + model.get("id") + "]").attr("i18n-Key", "video.playLabel");
                utils.tooltip.attach(me.el.find(".play-icon .play-control[data-id=" + model.get("id") + "]"));
            } else {
                model.set("playing", "1");
                me.el.find(".play-icon .play-control[data-id=" + model.get("id") + "]").removeClass("btn-play").addClass("btn-pause");

                me.el.find(".play-icon .play-control[data-id=" + model.get("id") + "]").attr("i18n-Key", "music.stop")
                utils.tooltip.attach(me.el.find(".play-icon .play-control[data-id=" + model.get("id") + "]"));
                me.el.find("canvas").show();

                //*********************************************************
                var position = me.collection.getModelPosition(model)
                //20140924
                var logObject = {
                    page: "mymusic_home",
                    module: "list",
                    action: "play",
                    totalnum: me.collection.models.length,
                    position: position,
                    owner:model.get("sMusicArtist"),
                    name:model.get("sMusicName")
                }
                utils.sendNewLog("1000120", logObject);
                //********************************************************* 
            }
        },
        onPlayTip : function(event) {
            var id = $(event.target).parents(".play-icon").find(".play-control").attr("data-id");
            var model = this.collection.getModelById("genie_music_" + id);
            if (!model.canPlay()) {
                Utils.tooltip.attach($(event.target).parents(".play-icon").find(".play-control"), "right");
                return;
            }
        },
        onPlay : function(event) {
            console.log("MUSIC >> Play the music", event.target);
            var me = this;
            var url = $(event.target).parents(".music-list-item").find(".play-control").attr("data-url");
            var id = $(event.target).parents(".music-list-item").find(".play-control").attr("data-id");
            var model = this.collection.getModelById("genie_music_" + id);
            var ext = Utils.getExtension(url);
            if (!model.canPlay()) {
                return;
            }
            //me.el.find("canvas").hide();

            /*如果没有取过本地文件*/
            if (!model.get("localPath") && model.get("playing") != "1") {
                var submitData = {
                    id : model.data['id'],
                    fileName : model.data.sMusicName,
                    ext : ext,
                    remotePath : model.data.sMusicRemotePath
                }
                var isPaused = AudioPlayer.isPaused();
                if (!isPaused) {
                    me.stopPlay();
                }
                this.collection.getPlayPath(submitData, function(res) {
                    if (res.result) {
                        model.set("localPath", res.localPath);
                        me.play(model);
                    } else {
                        model.set("fileError", true);
                        if (!me.tip) {
                            me.tip = new SmartTip();
                        }
                        me.tip.toCenter();
                        me.tip.show();
                        me.tip.flushTip(i18nDi.fillDomText('common.promptInvaildPath'));
                        $(event.target).parents(".music-list-item").find(".play-control").attr("i18n-Key", 'common.promptInvaildPath');
                        $(event.target).parents(".music-list-item").find(".play-control").addClass("disabled");
                        Utils.tooltip.attach($(event.target).parents(".music-list-item").find(".play-control"), "right");
                    }
                });
            } else {
                me.play(model);
            }
            this.checkNav();
            event.stopPropagation();
        },
        stopPlay : function() {
            var model = this.collection.getModelById("genie_music_" + AudioPlayer.sourceId);
            if (model) {
                model.set("playing", "0");
                this.el.find(".play-icon .play-control[data-id=" + model.get("id") + "]").removeClass("btn-pause").addClass("btn-play");
                this.el.find("canvas").hide();
                try {
                    AudioPlayer.pause();
                } catch(e) {
                }

            }

        },
        gotoRingtones : function() {
            app.navigate({
                module : "resource",
                action : "ringtone"
            });
        }
    });

    return MusicView;
});
