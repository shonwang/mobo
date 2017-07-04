define("UIVideoView", function(require, exports, module) {
    var app = require('app');
    var   $ = require('jquery');
    var _ = require('underscore');
    var i18nDi  = require('I18NDI');
    var  utils = require('utils');
    var UIWindow = require('UIWindow');
    var UIDialog = require('UIDialog');
    var taskModel = require('taskModel');
    var UIsmsView = require('UISmsView'); 
    var connection = require('connectionMgr');
    var Loading = require('loading');
    var ProcessPanel = require('ProgressPanel');
    var config = require('globalConfig');
    var ToolTip = require('UItoolTip');
    var VideoModel = require('videoModel');
    var apiNames = require('APINames');

    var EmptyInfo = app.ViewBase.extend({
        module : module,
        events:{
            'click -> .goto-youtube': 'gotoYoutube'
        },
        init : function(options) {
            this.options = options;
            var template = _.template(this.getTpl('tpl-vedio-empty-info'), {I18N: i18nDi});
            this.el = $(template);
        },

        gotoYoutube: function () {
            var ctrCfg = config.ctrConfig["1002"];
            app.navigate({
                module: ctrCfg.module,
                action: ctrCfg.action
            });
        },

        render : function(target) {
            this.el.appendTo(target);
        }    
    });

    var VideoItemView = app.ViewBase.extend({
        module : module,
        events:{
            'click -> .select-item': 'onSelectItem',
            // 'mouseover -> .btn-info': 'onDetailHover',
            // 'mouseout -> .btn-info': 'onDetailOut',
            'click -> .btn-play': 'onClickPlay'
        },
        init : function(options) {
            this.options = options;
            var template = _.template(this.getTpl('tpl-vedio-item-view'), {I18N: i18nDi});
            this.el = $(template);

            this.el.attr("data-id", this.options.model.data['mediaId']);
            this.el.find(".info-detail").hide();

            var thumbnailPath = this.options.model.data['sThumbnailPath'];
            var name = this.options.model.data['sVideoName'];
            var size = this.options.model.data['sVideoSize'];
            var ext = "(" + name.split('.')[name.split('.').length - 1] + ")";
            var duration = utils.formatMillisecond(this.options.model.data['sVideoDuration']);

            this.el.find("#image").attr('src', thumbnailPath);
            this.el.find(".name").html(name);
            this.el.find(".ext").html(ext);
            this.el.find(".date-info").html(this.options.date);
            this.el.find(".size").html(size);
            this.el.find(".video-duration").html(duration);

            this.el.on('mouseenter', $.proxy(this.onShowControl, this));
            this.el.on('mouseleave', $.proxy(this.onHideControl, this));
            this.el.on('dblclick', $.proxy(this.onClickPlay, this));

            this.el.on('click', $.proxy(function(event){
                console.log("点击", event.target)
                var target = $(event.target);
                if (event.target.tagName !== "INPUT" &&
                    !target.hasClass("btn-play") &&
                    !target.hasClass("btn-info")){
                    $item = this.el.find(".select-item");
                    console.log("点击", $item.get(0))
                    console.log("点击", $item.get(0).checked)
                    if ($item.get(0).checked === false){
                        $item.click();
                        console.log("点击", $item.get(0).checked)
                        this.trigger("selectone", this.options.model);
                    } else {
                        this.trigger("selectone", this.options.model);
                    }
                }
            }, this));

            var imageData = {
                name: this.options.model.data['sVideoName'],
                date: this.options.model.data['sVideoDate'],
                size: this.options.model.data['sVideoSize']
            };
            var content = _.template(this.getTpl('tpl-vedio-detail-tip'),{
                I18N: i18nDi, 
                data: imageData
            });
            
            var tipOption = {
                target: this.el.find(".btn-info").get(0),
                content: content
            };
            // 显示视频信息3.0版================================2014/04/24
            // 每次新创建一个tip
            //var toolTip = new ToolTip(tipOption);
            // 显示视频信息4.0版================================2014/04/24
            //只用一个tip
            this.options.toolTip.setOption(tipOption);
            
            

            utils.tooltip.attach(this.el.find(".btn-play"));
        },

        render: function(target){
            this.el.appendTo(target);
            if (this.options.model.isSelected()){
                this.el.find(".select-item").click();
                this.el.find(".select-item").animate({bottom:'5px'}, 200);
            }
        },

        onShowControl: function(event){
            var me = this;
            if (me.controlTimeout) clearTimeout(me.controlTimeout);
            if (me.showCtrTimer) clearTimeout(me.showCtrTimer);

            this.showCtrTimer = setTimeout(function(){
                me.el.find(".control").slideDown(200);
                me.el.find(".select-item").animate({bottom:'5px'}, 200);
                me.el.find(".video-duration").hide();
            }, 300);
            // event.stopPropagation();
            //event.preventDefault();
        },

        onHideControl: function(event){
            var me = this;
            if (me.controlTimeout) clearTimeout(me.controlTimeout);
            if (me.showCtrTimer) clearTimeout(me.showCtrTimer);

            this.controlTimeout = setTimeout(function(){
                me.el.find(".control").slideUp(200);
                if (me.el.find(".select-item").get(0).checked === false){
                    me.el.find(".select-item").animate({bottom:'-15px'}, 200);
                }
                me.el.find(".video-duration").show();
            }, 300);
            //event.stopPropagation();
            //event.preventDefault();
        },

        // 显示视频详细信息1.0==============================2014/04/02 舍弃
        onShowInfo: function(){
            this.el.find(".info-detail").slideDown(200);
        },

        onHideInfo: function(){
            this.el.find(".info-detail").slideUp(200);
        },

        // 显示视频信息2.0版================================2014/04/17 舍弃
        onDetailHover: function(e){             
            var $target = $(e.target);
            var offset = $target.offset();
            var _this = this;
            
            var imageData = {
                                name: this.options.model.data['sVideoName'],
                                date: this.options.model.data['sVideoDate'],
                                size: this.options.model.data['sVideoSize']
                            };
            
            clearTimeout(this.tipTimer);
            
            this.tipTimer = setTimeout((function(d){
                var pos = {
                    x: offset.left,
                    y: offset.top
                };
                return function(){
                    _this.showImageTip(d, pos);
                }
            })(imageData), 300);
        },
        
        onDetailOut: function(){
            clearTimeout(this.tipTimer);
            if (this.$tip){
                this.$tip.hide();
            }
        },
        
        showImageTip: function(image, pos){
            if(!this.$tip){
                this.$tip = $(_.template(this.getTpl('tpl-vedio-detail-tip'),{I18N: i18nDi}));
                $(document.body).append(this.$tip);
            }
            this.$tip.show();
            
            var posX = pos.x + 36;
            var posY = pos.y - 6;
            
            if(posX + this.$tip.width() > $(window).width()){
                var diff = posX + this.$tip.width() - $(window).width();
                posX = posX - diff;
            }
            
            this.$tip.offset({
                left: posX,
                top: posY
            });
            
            this.$tip.find('.n em').html(image.name);
            this.$tip.find('.d em').html(image.date);
            this.$tip.find('.s em').html(image.size);
        },
        //显示视频信息2.0版 END========================================需求稳定后可删除

        onSelectItem: function(event){
            var isChecked = $(event.target).get(0).checked;
            this.options.collection.setSelected(this.options.model.getId(), isChecked);
            if (this.el.hasClass("selected")){
                this.el.removeClass("selected");
            } else {
                this.el.addClass("selected");
            }
            this.trigger('selectitem', this.options.model);
        },

        reset: function(model, collection){
            this.options.collection = collection;
            this.options.model = model;

            var $item = this.el.find(".select-item");
            $item.get(0).checked = false;
            if (this.el.hasClass("selected")){
                this.el.removeClass("selected");
                $item.css("bottom", '-15px');
            }
        },
        //localPath 本地路径
        //id 视频id
        //remotePath 视频在sd卡上路径
        onClickPlay: function(event){
            var me = this;
            var options = {
                    autoDestroy:1,                  
                    header : 'video.promptPlayTitle',
                    doingTitle : 'video.promptPlay',
                    retriable : false,
                    failedTitle : "",
                    retryButton : "common.retryText",
                    okButton : "common.okLabel",
                    closeButton : "common.closeLabel",
                    cancelButton : "common.cancelLabel",
                    total: 100,
                    freshOnly: false,
                    numberType: 'percent'
               };
            var processBar = new ProcessPanel(options);
            processBar.open();
            var status = null;
            processBar.on('ready', function(){
                    var args = {
                    localPath: "",
                    id: me.options.model.data['mediaId'],
                    fileName: me.options.model.data['sVideoName'],
                    extName: me.options.model.data['sVideoType'],
                    remotePath: me.options.model.data['sVideoRemotePath']
                };

                me.options.collection.playVideo(args, function(res){
                    if (res){
                        if (res.finish !== true&&res.code !== 11){
                            status = 1;
                            processBar.doProgress(res.percent, 100, res.info.id || "", true);
                        } else if (res.code === 11){
                            status = 0;
                            processBar.close();
                            var confirmDlg = new UIDialog({
                                buttonKey : 2, //1双按钮
                                content : i18nDi.fillDomText('video.promptFullDisk'),
                                title: i18nDi.fillDomText('video.promptPlayTitle')
                            });
                            confirmDlg.show();
                            confirmDlg.on("yes", function(){
                                confirmDlg.close();
                            });
                        }
                    } else {
                        status = 0;
                        processBar.close();
                        //*********************************************************
                        //20140924
                        var logObject = {
                            page: "myvideos_home",
                            module: "list",
                            action: "play",
                            totalnum: me.options.collection.models.length,
                            status: status
                        }
                        utils.sendNewLog("1000120", logObject);
                        //********************************************************* 
                    }
                    if (res&&res.finish){
                        processBar.close();
                        //*********************************************************
                        //20140924
                        var logObject = {
                            page: "myvideos_home",
                            module: "list",
                            action: "play",
                            totalnum: me.options.collection.models.length,
                            status: status
                        }
                        utils.sendNewLog("1000120", logObject);
                        //********************************************************* 
                    }
                });
            });

            processBar.on('cancel', function(){
                app.dal.request({
                    action : apiNames.REQ_STOP_PLAY_VIDEO,
                    paras : {id: me.options.model.data['mediaId']},
                    callback : function(res) {}
                });
            });
        }
    });

    var VideoThreadView = app.ViewBase.extend({
        module : module,
        events:{
            'click -> .selecter': 'onClickSelecter',
            'click -> .date': 'onClickDate'
        },
        init : function(options) {
            this.options = options;
            var template = _.template(this.getTpl('tpl-vedio-thread-view'), {I18N: i18nDi});
            this.el = $(template);
            this.el.find(".date").html(this.options.dateHtml);
            this.el.find(".count").html(this.options.count);
            this.el.attr("date-value", this.options.date.replace(/\//g, '-'));
        },

        appendVideoItem: function(){
            this.itemObjList = {};
            for(var i = 0; i < this.options.models.length; i++){
                var itemOptions = {
                    date: this.options.date,
                    model: this.options.models[i],
                    collection: this.options.collection,
                    toolTip: this.options.toolTip
                };
                var videoItem = new VideoItemView(itemOptions);
                videoItem.on('selectitem', $.proxy(this.onSelectChildrenItem, this));
                videoItem.on('selectone', $.proxy(this.onSelectOneChildrenItem, this));
                videoItem.render(this.el.find(".media-ctn"));
                this.itemObjList[this.options.models[i].data.mediaId] = videoItem;
            }
        },

        reset: function(models, collection){
            this.options.models = models;
            this.options.collection = collection;

            var $item =  this.el.find(".selecter");
            $item.get(0).checked = false;
        },

        onClickDate: function(){
            this.el.find(".selecter").click();
        },

        onClickSelecter: function(){
            var isChecked = this.el.find(".selecter").get(0).checked;
            for (var i = 0; i < this.options.models.length; i++){
                var modelID = this.options.models[i].getId();
                this.options.collection.setSelected(modelID, isChecked);
                var itemNode = this.el.find(".media-ctn").children(".g-media-item:visible").get(i);
                $(itemNode).find(".select-item").get(0).checked = isChecked;
                if (isChecked === true){
                    $(itemNode).find(".select-item").animate({bottom:'5px'}, 200);
                    $(itemNode).addClass("selected");
                } else {
                    $(itemNode).find(".select-item").animate({bottom:'-15px'}, 200);
                    $(itemNode).removeClass("selected");
                }
            }
            this.trigger('clickthread', this.options.models);
        },

        onSelectChildrenItem: function(model){
            var isChecked = this.el.find(".selecter").get(0).checked;
            var selectedCount = 0;
            for (var i = 0; i < this.options.models.length; i++){
                var modelID = this.options.models[i].getId();
                var isSelectedModel = this.options.collection.isSelectedModel(modelID);
                if (isSelectedModel === true){
                    selectedCount = selectedCount + 1;
                }
            }
            var unselectedCount = this.options.models.length - selectedCount;
            if (isChecked === true && unselectedCount !== 0){
                this.el.find(".selecter").get(0).checked = false;
            }
            if (isChecked === false && unselectedCount === 0){
                this.el.find(".selecter").get(0).checked = true;
            }
            this.trigger('clickitem', model);
        },

        onSelectOneChildrenItem: function(model){
            var isChecked = this.el.find(".selecter").get(0).checked;
            var unselectedCount = 0;
            for (var i = 0; i < this.options.models.length; i++){
                var modelID = this.options.models[i].getId();
                if (model.getId() !== modelID){
                    this.options.collection.setSelected(modelID, false);
                    var itemNode = this.el.find(".media-ctn").find("li[data-id=" + this.options.models[i].get('mediaId') + "]");
                    $(itemNode).find(".select-item").get(0).checked = false;
                    if ($(itemNode).hasClass("selected")){
                        $(itemNode).removeClass("selected");
                    }
                    $(itemNode).find(".select-item").animate({bottom:'-15px'}, 200);
                    $(itemNode).removeClass("selected");
                    unselectedCount = unselectedCount + 1;
                }
            }
            var selectedCount = this.options.models.length - unselectedCount;
            if (isChecked === true && unselectedCount !== 0){
                this.el.find(".selecter").get(0).checked = false;
            }
            if (isChecked === false && unselectedCount === 0){
                this.el.find(".selecter").get(0).checked = true;
            }
            this.trigger('clickitem', model);
        },

        render: function(target){
            this.el.appendTo(target);
        }
    });

    var VideoView = app.ViewBase.extend({
        module: module,
        events: {
            //'click -> .btn-refresh': 'refresh',
            'click -> .btn-import': 'onClickImport',
            'click -> .btn-export': 'onClickExport',
            'click -> .btn-delete': 'onClickDelete',
            'click -> .chkbox-all': 'onSelectAll'  
        },
        init: function(opts){
            var pageId = opts.pageId;
            this.collection = opts.collection;
            var template = _.template(this.getTpl('tpl-video-main-view'), {I18N: i18nDi});
            this.el = $(template);
            this.el.appendTo($('#' + pageId));

            this.isRefreshing = false;
            this.isInit = true;

            this.emptyInfo = new EmptyInfo();
            this.emptyInfo.render(this.el.find(".list"));
            this.emptyInfo.el.hide();

            this.loadingPage = new Loading();
            this.loadingPage.render(this.el.find(".list"));
            this.loadingPage.show();
            this.collection.bindSetVideoInfo($.proxy(this.updateVideoPic, this));
            this.collection.on('update', $.proxy(this.onUpdateVideoList, this));
            if (this.collection.isRequest === true &&
                this.collection.isResponse === true){
                this.collection.trigger('update');
            }
            this.el.find(".btn-refresh").hide();
            var curHash = app.getCurHashParas();
            app.eventCenter.on(curHash.module + curHash.action, $.proxy(this.refresh, this));

            var isShowImportTips = localStorage["isShowImportTips"];
            if (isShowImportTips && isShowImportTips === "false"){
                this.el.removeClass("g-video-tips-box");
            }
            this.el.find(".ico-close-blue").on("click", function(){
                localStorage["isShowImportTips"] = "false";
                this.el.removeClass("g-video-tips-box");
            }.bind(this));

            connection.on('connection', $.proxy(
                function(){
                    if (connection.isConnect()){
                        //this.refresh()
                    } else {
                        this.collection.requested = false;
                        this.collection.responsed = false;
                        this.collection.clear({trigger: false});
                    }
                }, this));

            var toolbar = this.el.find(".g-toolbar");
            toolbar.find(".btn-delete").attr("disabled", "disabled");
            toolbar.find(".btn-export").attr("disabled", "disabled");
            toolbar.find(".chkbox-all").attr("disabled", "disabled");
        },

        update: function(hash){
            console.log("video >> update...");
        },

        onUpdateVideoList: function(isfromImport){
            console.log("video >> get video data completed: ",this.collection.models);
            var threadNodes = this.el.find(".list").children(".g-media-thread");
            if (threadNodes.length > 0) this.clearVideoList();

            this.checkNav();
            var deviceInfo = connection.deviceInfo;
            // if (this.collection.models.length === 0 &&
            //     this.isInit === true){
                // this.isInit = false;
                // this.el.find(".chkbox-all").attr("disabled", "disabled");
                //this.el.find(".list").removeClass("g-media-thread-box");
            // } else 
            console.log("device==========================info============"+JSON.stringify(deviceInfo));
            if (this.collection.models.length === 0 &&
                this.isInit === true){
                this.loadingPage.hide();
                
                if(!deviceInfo.isSDCardExist&&connection.isConnect()){
                    this.switchSdShow();
                    this.emptyInfo.el.hide();
                    this.el.find(".g-toolbar").find(".btn-import").attr("disabled", "disabled");
                }else{
                    this.el.find(".g-toolbar").find(".btn-import").removeAttr("disabled");;
                    this.emptyInfo.el.show();
                    this.switchSdShow();
                }
                
                //this.emptyInfo.el.show();
                this.isInit = true;
                this.el.find(".chkbox-all").attr("disabled", "disabled");
                //this.el.find(".list").removeClass("g-media-thread-box");
            } else if (this.collection.models.length > 0){
                this.el.find(".chkbox-all").removeAttr("disabled");
                //this.el.find(".list").addClass("g-media-thread-box");
                this.loadingPage.hide();
                this.emptyInfo.el.hide();
                this.el.find(".sdempty").hide();

                if (threadNodes.length > 0){
                    this.updateVideoThread(isfromImport);
                } else {
                    this.createVideoThread();                    
                }          

                this.isInit = true;
            }
        },

        clearVideoList: function(){
            this.el.find(".chkbox-all").get(0).checked = false;
            // if (this.toolTip){
            //     this.toolTip.clearTimer();
            //     this.toolTip.el.remove();
            //     this.toolTip.rendered = false;
            // }
            var threadNodes = this.el.find(".list").children(".g-media-thread");
            for (var i = 0; i < threadNodes.length; i++){
                var threadNode = $(threadNodes[i]);
                threadNode.find("li").hide();
            }
            threadNodes.hide();
        },

        updateVideoThread: function(isfromImport){
            this.dateArray = this.collection.getDateArray();
            this.dateModelMap = this.collection.getModelByDate();
            this.dateCountMap = this.collection.getVideoCountByDate();
            console.log("video >> all video date: ", this.dateArray);
            console.log("video >> get video by date: ", this.dateModelMap);
            console.log("video >> get video count by date: ", this.dateCountMap);

            var listNode = this.el.find(".list");         
            for (var i = 0; i < this.dateArray.length; i++){
                var date = this.dateArray[i].replace(/\//g, '-');
                var threadNode = listNode.find("div[date-value=" + date + "]");
                if (threadNode.get(0)){
                    threadNode.show();
                    var videoListByDate = this.dateModelMap[this.dateArray[i]];
                    var mediaCtnNode = threadNode.find(".media-ctn");
                    var threadObj = this.dateThreadMap[this.dateArray[i]];
                    if (isfromImport !== true){
                        threadObj.reset(videoListByDate, this.collection);
                    }
                    threadObj.el.find(".count").html(videoListByDate.length);
                    for (var k = 0; k < videoListByDate.length; k++){
                        var id = videoListByDate[k].data.mediaId;
                        var videoItem = mediaCtnNode.find("li[data-id=" + id + "]");
                        if (videoItem.get(0)){
                            if (isfromImport !== true){
                                threadObj.itemObjList[id].reset(videoListByDate[k],this.collection);
                            }
                            videoItem.show();
                        } else {
                            var itemOptions = {
                                date: this.dateArray[i],
                                model: videoListByDate[k],
                                collection: this.collection,
                                toolTip: this.toolTip 
                            };
                            var videoItem = new VideoItemView(itemOptions);
                            videoItem.on('selectitem', $.proxy(threadObj.onSelectChildrenItem, threadObj));
                            videoItem.on('selectone', $.proxy(threadObj.onSelectOneChildrenItem, threadObj));
                            videoItem.el.insertBefore(mediaCtnNode.find("li").get(0));
                            threadObj.itemObjList[videoListByDate[k].data.mediaId] = videoItem;
                            threadNode.find(".count").html(this.dateCountMap[this.dateArray[i]])
                            threadObj.reset(videoListByDate, this.collection);
                        }
                    }
                } else {
                    var threadNodes = listNode.find(".g-media-thread");
                    var options = {
                        dateHtml: this.dateArray[i], 
                        date: this.dateArray[i],
                        count: this.dateCountMap[this.dateArray[i]],
                        models: this.dateModelMap[this.dateArray[i]],
                        collection: this.collection,
                        toolTip: this.toolTip
                    };
                    var videoThread = new VideoThreadView(options);
                    if (i + 1 > threadNodes.length){
                        videoThread.render(listNode);
                    } else {
                        videoThread.el.insertBefore(threadNodes[i]);
                    }
                    videoThread.appendVideoItem();
                    videoThread.on('clickitem', $.proxy(this.onClickItem, this));
                    videoThread.on('clickthread', $.proxy(this.onClickThread, this));
                    this.dateThreadMap[this.dateArray[i]] = videoThread;
                }
            }         
        },        

        createVideoThread: function(){
            this.dateArray = this.collection.getDateArray();
            this.dateModelMap = this.collection.getModelByDate();
            this.dateCountMap = this.collection.getVideoCountByDate();
            console.log("video >> all video date: ", this.dateArray);
            console.log("video >> get video by date: ", this.dateModelMap);
            console.log("video >> get video count by date: ", this.dateCountMap);
            this.dateThreadMap = {};
            this.toolTip = new ToolTip();
            for (var i = 0; i < this.dateArray.length; i++){
                var key = this.dateArray[i];
                var count = this.dateCountMap[key];
                var models = this.dateModelMap[key];
                //var currentMouth = new Date().getMonth() + 1;
                var date = key;
                //var keyMouth = key.split("/")[1];
                // if (currentMouth != keyMouth){
                //     key = '<strong>' + key.split("/")[0] + "</strong>/" + key.split("/")[1];
                // } else {
                //     key = '<strong>' + key.split("/")[0] + "</strong>/" + 
                //     key.split("/")[1] + "/" + key.split("/")[2];
                // }
                var options = {
                    dateHtml: key, 
                    date: date,
                    count: count,
                    models: models,
                    collection: this.collection,
                    toolTip: this.toolTip
                };
                var videoThread = new VideoThreadView(options);
                videoThread.render(this.el.find(".list"));
                videoThread.appendVideoItem();
                videoThread.on('clickitem', $.proxy(this.onClickItem, this));
                videoThread.on('clickthread', $.proxy(this.onClickThread, this));
                this.dateThreadMap[this.dateArray[i]] = videoThread;
            }

            console.log("video >> get thread obj by date: ", this.dateThreadMap);
        },

        updateVideoPic: function(res){
            var date = res.info.sVideoDate;
            var dataTime = parseInt(date);
            var dateObj = new Date();
            dateObj.setTime(dataTime * 1000);
            date = dateObj.format("dd-MM-yyyy");
            var currentMouth = (new Date().getMonth() + 1).toString();
            currentMouth = ("00"+ currentMouth).substr((""+ currentMouth).length);
            if (date.split('-')[1] !== currentMouth){
                date = date.split('-')[1] + '-' + date.split('-')[2];
            }
            var id = res.info.id;
            var listNode = this.el.find(".list");
            var threadNode = listNode.find("div[date-value=" + date + "]");
            var mediaCtnNode = threadNode.find(".media-ctn");
            var videoItem = mediaCtnNode.find("li[data-id=" + id + "]");
            var srcStr = videoItem.find("#image").attr("src");
            if (srcStr !== res.info.sThumbnailPath){
                videoItem.find("#image").attr("src", res.info.sThumbnailPath);
            }
        },

        onSelectAll: function(){
            var isChecked = this.el.find(".chkbox-all").get(0).checked;
            var selectedKeys = Object.keys(this.collection.selectedMap);
            var selectedLen = selectedKeys.length;
            this.collection.setSelectedAll(isChecked);
            for (var i = 0; i < this.dateArray.length; i++){
                var key = this.dateArray[i];
                // var threadNode = this.el.find(".list").children(".g-media-thread").get(i);
                var threadNode = this.el.find(".list").find("div[date-value=" + key.replace(/\//g, '-') + "]").get(0);
                if (threadNode){
                    $(threadNode).find(".selecter").get(0).checked = isChecked;
                    for (var k = 0; k < this.dateCountMap[key]; k++){

                        var itemNode = $(threadNode).find(".media-ctn").find('li[style="display: inline-block;"]').get(k);
                        $(itemNode).find(".select-item").get(0).checked = isChecked;
                        if (isChecked === true){
                            $(itemNode).find(".select-item").animate({bottom:'5px'}, 200);
                            $(itemNode).addClass("selected");
                        } else {
                            $(itemNode).find(".select-item").animate({bottom:'-15px'}, 200);
                            $(itemNode).removeClass("selected");
                        }
                    }
                }
            }
            this.checkNav();
        },

        onClickThread: function(modelsThread){
            this.onClickItem();
            this.checkNav();
        },

        onClickImport: function(){
            var me = this;
            var args = {
                MultiSel: 1,
                MediaType: 'video',
                Filter: '(*.3gp;*.avi;*.mp4;*.mov;*.mkv;*.rm;*.rmvb;*.mpg;*.mpeg;*.f4v;*.flv;*.m4v;*.wmv;*.asf)|*.3gp;*.avi;*.mp4;*.mov;*.mkv;*.rm;*.rmvb;*.mpg;*.mpeg;*.f4v;*.flv;*.m4v;*.wmv;*.asf'
            };
            this.collection.callPopupSysDialog(args, function(res){
                if(res.info && res.info.list){
                    var utils = require('utils');
                    var total = res.info.list.length;
                    for(var i=0;i<res.info.list.length;i++){
                            if(res.info.list[i].status!=1){
                                return;
                            }
                     }                    
                    var current = 0;
                    
                    var successCount = 0;
                    var parasArray = [];

                    //*********************************************************
                    //20140924
                    var logObject = {
                        page: "myvideos_home",
                        module: "menu",
                        action: "import",
                        totalnum: total
                    }
                    utils.sendNewLog("1000120", logObject);
                    //********************************************************* 

                    res.info.list.forEach(function(file){
                        console.log("video >> selected file: ", file);
                        parasArray.push({
                            path: file.path,
                            size: utils.convertSizeToString(file.size),
                            name: file.path.split('\\')[file.path.split('\\').length - 1]
                        });
                    });

                    //*********************************************************
                    //20140924
                    taskModel.completeCollection.on("import", function(result){
                        if (result.type === taskModel.taskType.IMPORT_VIDEO){
                            current = current + 1;
                            if (result.success === true) {
                                successCount = successCount + 1;
                            }
                            if (current === total){
                                var logObject = {
                                    page: "myvideos_home",
                                    module: "menu",
                                    action: "import_result",
                                    successnum: successCount,
                                    failnum: total - successCount
                                }
                                utils.sendNewLog("1000120", logObject);             
                            } 
                        }
                    });
                    //*********************************************************
                    
                    taskModel.batchImportVideo(parasArray);
                
                }
            });
        },

        onClickExport: function(){
            var modelSelectedIds = Object.keys(this.collection.getSelectedMap());
            this.collection.callPopupSaveDialog({},$.proxy(this.onSystemSaveDialogOK, this));
            //*********************************************************
            //20140924
            var logObject = {
                page: "myvideos_home",
                module: "menu",
                action: "export",
                totalnum: modelSelectedIds.length
            }
            utils.sendNewLog("1000120", logObject);
            //********************************************************* 
        },

        exportVideo: function(selectedLen, targetPath, processCtn){
            var modelSelected = Object.keys(this.collection.getSelectedMap());
            // var selectedLen = modelSelected.length;
            var i = 0;
            var isExporting = false;
            var me = this;
            var failedCount = 0;
            var failedNameStr = "";
            var successList = [];
            var exportVideoProcess = function(){
                if (isExporting === false && i < selectedLen){
                    isExporting = true;
                    var args = {
                        targetFolder: targetPath,
                        localPath: targetPath + "\\" + me.collection.getModelById(modelSelected[i]).data['sVideoName'],
                        id: me.collection.getModelById(modelSelected[i]).data['mediaId'],
                        remotePath: me.collection.getModelById(modelSelected[i]).data['sVideoRemotePath']
                    };
                    console.log("video >> to export id:", args.id);
                    me.collection.exportVideo(args, function(res){
                        if (res.finish !== false&&selectedLen !== 1){
                            var model = me.collection.getModelById(modelSelected[i]);
                            i = i + 1;
                            var isSuccess = true;
                            if (res.status !== 1){
                                isSuccess = false;
                                failedCount = failedCount + 1;
                                failedNameStr = failedNameStr + model.data['sVideoName'] + '<br>';
                            } else {
                                successList.push(res.info);
                            }
                            processCtn.doProgress(i, selectedLen, res.info, isSuccess);
                            console.log("video >> exported count" + i + "/" + selectedLen);
                            isExporting = false;
                        } else if (res.finish === false&&selectedLen === 1){
                            processCtn.doProgress(res.percent/100, 1, res.info, true);
                        } else if (res.finish === true&&selectedLen === 1){
                            if (res.status !== 0 && res.code !== 1){
                                processCtn.doProgress(res.percent/100, 1, res.info, true);
                            } else {
                                processCtn.doProgress(1, 1, res.info, false);
                            }
                            var model = me.collection.getModelById(modelSelected[i]);
                            i = i + 1;
                            isExporting = false;
                            if (res.status !== 1){
                                failedCount = failedCount + 1;
                                failedNameStr = failedNameStr + model.data['sVideoName'] + '<br>';
                            } else {
                                successList.push(res.info);
                            }
                        }
                    });
                }
                if (i == selectedLen){
                    clearInterval(me.timeCountID);
                    if (failedCount === 0){
                        processCtn.setSuccessTitle(i18nDi.fillDomText('video.exportSuccess', selectedLen));
                        processCtn.setSuccessList(successList);
                    } else {
                        processCtn.setFailedTitle(i18nDi.fillDomText('video.exportFailed', selectedLen - failedCount, failedCount));
                        processCtn.showDetailInfo(failedNameStr);
                    }
                    //*********************************************************
                    //20140924
                    var logObject = {
                        page: "myvideos_home",
                        module: "menu",
                        action: "export_result",
                        successnum: selectedLen - failedCount,
                        failnum: failedCount
                    }
                    utils.sendNewLog("1000120", logObject); 
                    //********************************************************* 
                }
            };
            processCtn.on('cancel', function(){
                app.dal.request({
                    action : apiNames.REQ_STOP_EXPORT_VIDEO,
                    paras : {},
                    callback : function(res) {}
                });
            });
            processCtn.on('close', function(){
                if (me.timeCountID){
                    clearInterval(me.timeCountID);
                }
            });
            me.timeCountID = setInterval(exportVideoProcess, 50);
        },

        onSystemSaveDialogOK: function(res){
            var me = this;
            var modelSelected = Object.keys(this.collection.getSelectedMap());
            var selectedLen = modelSelected.length;
            var targetPath = res.path;
            console.log("打开文件夹的路径: ", targetPath);
            if (res.status !== 0){
                var options = {
                        autoDestroy:1,                  
                        header : 'common.Export',
                        doingTitle : 'common.Exporting',
                        retriable : false,
                        total: selectedLen,
                        freshOnly: false,
                        openPath: targetPath,
                        numberType: "index"
                   };
                var processBar = new ProcessPanel(options);
                processBar.open();
                processBar.on('ready', function(){
                    me.exportVideo(selectedLen, targetPath, processBar);
                });
            } else if (res.status === 1){
                var confirmDlg = new UIDialog({
                    buttonKey : 2, //1双按钮
                    title : i18nDi.fillDomText('common.Export'),
                    content : i18nDi.fillDomText('video.promptInvaildPath')
                });
                confirmDlg.show();
            }
        },

        onClickDelete: function(){
            var modelSelected = Object.keys(this.collection.getSelectedMap());
            var selectedLen = modelSelected.length;
                var confirmDlg = new UIDialog({
                    buttonKey : 3, //1双按钮
                    content : i18nDi.fillDomText('video.promptDelete', selectedLen),
                    title: i18nDi.fillDomText('common.Delete')
                });
                confirmDlg.show();
                confirmDlg.on("yes", $.proxy(this.sureDelete, this));                
            //*********************************************************
            //20140924
            var logObject = {
                page: "myvideos_home",
                module: "menu",
                action: "delete",
                totalnum: selectedLen
            }
            utils.sendNewLog("1000120", logObject);
            //*********************************************************                 
        },

        sureDelete: function(){
            var modelSelected = Object.keys(this.collection.getSelectedMap());
            var selectedLen = modelSelected.length;
            if (selectedLen > 0){
                var me = this;
                
                var options = {
                        autoDestroy: 3,                  
                        header : 'common.Delete',
                        doingTitle : 'common.Deleting',
                        retriable : false,
                        failedTitle : "video.deleteFailed",
                        retryButton : "common.retryText",
                        okButton : "common.okLabel",
                        closeButton : "common.closeLabel",
                        cancelButton : "common.cancelLabel",
                        total: selectedLen,
                        freshOnly: selectedLen==1?true:false
                };
                if(selectedLen > 1){
                    var processBar = new ProcessPanel(options);
                    processBar.open();
                    processBar.on('ready', function(){
                        var i = 0;
                        var isDeleting = false;
                        var failedCount = 0;
                        var failedNameStr = "";
                        var deleteVideoProcess = function(){
                            if (isDeleting === false && i < selectedLen){
                                isDeleting = true;
                                var args = { 
                                        id: me.collection.getModelById(modelSelected[i]).data['mediaId'],
                                        remotePath: me.collection.getModelById(modelSelected[i]).data['sVideoRemotePath'],
                                        fileName: me.collection.getModelById(modelSelected[i]).data['sVideoName'],
                                        thumbpath: me.collection.getModelById(modelSelected[i]).data['sThumbnailPath'],
                                        ext:""
                                    };
                                console.log("video >> to deleting id:", args);
                                me.collection.deleteVideo(args, function(res){
                                    i = i + 1;
                                    var isSuccess = true;
                                    if (res.status !== 1){
                                        isSuccess = false;
                                        failedCount = failedCount + 1;
                                        failedNameStr = failedNameStr + args.fileName + '<br>';
                                    }
                                    processBar.doProgress(i, selectedLen, res.info.id, isSuccess);
                                    console.log("video >> deleting count" + i + "/" + selectedLen);
                                    isDeleting = false;
                                });
                            }
                            if (i == selectedLen){
                                if (failedCount === 0){
                                    processBar.close();
                                } else {
                                    processBar.setFailedTitle(i18nDi.fillDomText('video.deleteFailed', selectedLen - failedCount, failedCount));
                                    processBar.showDetailInfo(failedNameStr);
                                }
                                //*********************************************************
                                //20140924
                                var logObject = {
                                    page: "myvideos_home",
                                    module: "menu",
                                    action: "delete_result",
                                    successnum: selectedLen - failedCount,
                                    failnum: failedCount
                                }
                                utils.sendNewLog("1000120", logObject); 
                                //********************************************************* 
                                console.log("video >> clear time count", me.timeCountDel);
                                clearInterval(me.timeCountDel);
                                me.refresh();
                            }
                        };
                        processBar.on('close', function(){
                            if (me.timeCountDel){
                                clearInterval(me.timeCountDel);
                                if(isDeleting === false) {
                                    me.refresh();
                                } else {
                                    setTimeout(function(){
                                        me.refresh();
                                    }, 500);
                                }
                            }
                        });
                        me.timeCountDel = setInterval(deleteVideoProcess, 500);
                    });                    
                }else{
                    var args = { 
                            id: me.collection.getModelById(modelSelected[0]).data['mediaId'],
                            remotePath: me.collection.getModelById(modelSelected[0]).data['sVideoRemotePath'],
                            fileName: me.collection.getModelById(modelSelected[0]).data['sVideoName'],
                            thumbpath: me.collection.getModelById(modelSelected[0]).data['sThumbnailPath'],
                            ext:""
                    };
                    me.collection.deleteVideo(args, function(res){    
                        //if (res.status !== 1){

                        //}else{
                            me.refresh();   
                        //}
                    });                    
                }
                
                // processBar.on('close', function(){
                //     if (me.timeCountDel){
                //         console.log("video >> clear time count", me.timeCountDel);
                //         clearInterval(me.timeCountDel);
                //     }
                // });
            }
        },

        onClickItem: function(model){
            var isChecked = this.el.find(".chkbox-all").get(0).checked;
            var selectedKeys = Object.keys(this.collection.selectedMap);
            var selectedLen = selectedKeys.length;
            var unselectedCount = this.collection.models.length - selectedLen;
            if (isChecked === true && unselectedCount !== 0){
                this.el.find(".chkbox-all").get(0).checked = false;
            }
            if (isChecked === false && unselectedCount === 0){
                this.el.find(".chkbox-all").get(0).checked = true;
            }
            this.checkNav();
        },

        refresh: function(){
            var me = this;
            if (this.isRefreshing === false){
                this.isRefreshing = true;
                this.loadingPage.show();
                this.emptyInfo.el.hide();
                this.el.find(".chkbox-all").get(0).checked = false;
                this.clearVideoList();
                this.collection.refresh();
                this.checkNav();
                setTimeout(function(){
                        me.isRefreshing = false;
                    }, 2000);
            }
        },

        checkNav : function() {
            var modelSelectedIds = Object.keys(this.collection.getSelectedMap());
            var toolbar = this.el.find(".g-toolbar");
            if (modelSelectedIds.length === 0) {
                toolbar.find(".btn-delete").attr("disabled", "disabled");
                toolbar.find(".btn-export").attr("disabled", "disabled");
            } else {
                toolbar.find(".btn-delete").removeAttr("disabled");
                toolbar.find(".btn-export").removeAttr("disabled");
            }
            // var $importBtn = toolbar.find(".btn-import");
            // var connection = require('connectionMgr');
            // connection.getDeviceInfo(function(devInfo){
            //     $importBtn.prop("disabled", !(devInfo.info&&devInfo.info.isSDCardExist));
            // });
        },
        
        switchSdShow: function(){
            var connection = require('connectionMgr');
            var devInf = connection.deviceInfo;
                    
            if(!devInf.isSDCardExist&&connection.isConnect()){
                this.emptyInfo.el.hide();
                this.el.find(".sdempty").show();
            }else{
                this.el.find(".sdempty").hide();
                this.emptyInfo.el.show();
            }
        },
    });
    
    return VideoView;
}); 