define("UIImageView", function(require, exports, module) {
    var app = require('app');
    var $ = require('jquery');
    var ScrollProxy = require('scrollerProxy');
    var _ = require('underscore');
    var pictureModel = require('imageModel');
    var apiNames = require('APINames');
    var taskModel = require('taskModel');
    var ImagePlayer = require('UIImagePlayer');
    var UILoading = require('loading');
    var i18nDi = require('I18NDI');
    var ToolTip = require('UItoolTip');
    var ProcessWindow = require("ProgressPanel");
    var utils = require('utils');

    var connection = require('connectionMgr');

    var galleryColl = pictureModel.galleryCollection;
    var wallpaperColl = pictureModel.wallpaperCollection;
    var otherColl = pictureModel.otherCollection;

    var tabs = {
        GALLERY : '1',
        WALLPAPER : '2',
        OTHER : '3'
    };

    var ImageView = app.ViewBase.extend({
        module : module,
        tab : '1',
        imageWidth : 142, //图片宽度+边框
        imageHeight : 142,
        events : {
            'click -> .g-list-tab-header .tab li' : 'onTabClick',
            'click -> .g-toolbar .ico-picture' : 'onImportClick',
            'click -> .g-image-thread .g-image-item' : 'onImageItemClick',
            'click -> .g-toolbar .ico-delete' : 'onDeleteClick',
            'click -> .g-toolbar .ico-export' : 'onExport',
            'click -> .g-image-thread .thread-checkbox' : 'onThreadCheckedBox',
            'click -> .chkbox-all' : 'onCheckedAll',
            'click -> .ico-refresh' : 'onRefresh',
            // 'mouseover -> .g-image-item .detail': 'onDetailHover',
            // 'mouseout -> .g-image-item .detail': 'onDetailOut'
        },
        init : function(opts) {
            var pageId = opts.pageId;

            this.el = $(_.template(this.getTpl('tpl-image-main-view'), {
                I18N : i18nDi
            }));
            this.el.appendTo($('#' + pageId));

            this.setCount();
            galleryColl.on('update', this.setCount.bind(this));
            wallpaperColl.on('update', this.setCount.bind(this));
            otherColl.on('update', this.setCount.bind(this));

            this.initGalleryCtn();

            galleryColl.on('update', this.onGalleryUpdate.bind(this));

            galleryColl.fetchGallery();
            wallpaperColl.fetchWappler();
            otherColl.fetchOther();

            this.posTabLine();
            $(window).resize(this.posTabLine.bind(this));
            this.initGalleryCtn();

            this.player = new ImagePlayer({
                container : 'i-image-player-placeholder',
                showDelete : true,
                showDownload : false
            });

            //旋转事件
            this.player.on('rotate', (function(deg, diff) {
                var collection = this.getCurCollection();
                var data = this.player.list[this.player.index];
                var rotateFlipType = deg % 360;

                collection.rotate({
                    id : data.id,
                    thumbnailPath : data.picUrl,
                    picUrl : data.originPic,
                    remotePath : data.remotePath,
                    rotateFlipType : ImagePlayer.DEG_MAP[diff]
                });

                var listData = collection.getPictureById(data.id);

                $('[data-imageid="' + data.id + '"]').each(function() {
                    var r = $(this).attr('rotate');

                    r = parseInt(r);

                    if (!r) {
                        r = 0;
                    }
                    r = r + diff;

                    $(this).attr('rotate', r);

                    console.log("========================%%%%%%%%==============================", listData);

                    listData.rotateAngle = r;

                    this.style.webkitTransform = 'rotate(' + r + 'deg)';
                });
            }).bind(this));
            this.player.on("hide",function(){
                var curHash = app.getCurHashParas();
                if(curHash.pageState && curHash.pageState.vt == 'img_player'){
                    curHash.pageState.vt=null;
                }
            });
            this.player.on('setWallpaper', this.onPlayerSetWallpaper.bind(this));

            //监听删除事件
            this.player.on('delete', this.onPlayerDelete.bind(this));

            this.on('deleteSuccess', this.onDeleteSuccess.bind(this));

            //默认进来显示loading
            this.loading = new UILoading();
            this.loading.render(this.el.find('.g-list-tab-con'));
            this.loading.show();

            connection.on('connection', function() {
                if (connection.isConnect()) {
                    galleryColl.fetchGallery();
                    wallpaperColl.fetchWappler();
                    otherColl.fetchOther();
                    if (connection.deviceInfo) {
                        this.switchSdShow();
                    }
                } else {
                    galleryColl.clear();
                    wallpaperColl.clear();
                    otherColl.clear();
                }
            }.bind(this));

            this.switchSdShow();

            var curHash = app.getCurHashParas();
            app.eventCenter.on(curHash.module + curHash.action, (function(e) {
                this.onRefresh();
            }).bind(this));

            this.player.on('hide', this.onPlayerHide.bind(this));

            app.eventCenter.on('switchpageend', function(para) {
                var collection = this.getCurCollection();
                if (curHash.module == para.module && para.pageState && para.pageState.vt == 'img_player' && collection.dataList.length > 0) {
                    this.player.show();
                } else {
                    this.player.hide();
                }
            }.bind(this));

            this.toolTip = new ToolTip();

            this.el.delegate('#wallpaper-empty-tip button', 'click', function() {
                app.navigate({
                    module : 'resource',
                    action : 'wallpaper'
                });
            });

            this.el.dblclick( function(e) {
                var $target = $(e.target);
                var $item = $target.hasClass('g-image-item') ? $target : $target.parents('.g-image-item');

                var $input = $item.find('input');

                var dataset = $input[0].dataset;

                //数据
                var id = parseInt(dataset.id);

                this.openBigPicture(id);
            }.bind(this));
        },

        switchSdShow : function() {
            var me = this;
            if (!(connection.deviceInfo && connection.deviceInfo.isSDCardExist)) {
                me.el.find(".g-media-empty-info").show();
                me.el.find('#wallpaper-empty-tip').hide();
            } else {
                me.el.find(".g-media-empty-info").hide();
            }
        },

        onPlayerHide : function() {
            var hash = app.getCurHashParas();
            var preHash = app.getPreHash();

            if (hash.pageState && hash.pageState.vt == 'img_player' && preHash.module == hash.module) {

                window.addEventListener('hashchange', function() {
                    var hashPara = app.getCurHashParas();
                    app.navigate(hashPara);
                    window.removeEventListener('hashchange', arguments.callee);
                });
                app.history.back();
            } else {
                if (hash.pageState) {
                    delete hash.pageState.vt;
                }
                if(hash.module == "image"){
                    app.navigate(hash);
                }
            }
        },

        onDeleteSuccess : function(pic) {
            var curHash = app.getCurHashParas();
            if (curHash.pageState.vt == 'img_player') {
                var data = this.player.list[this.player.index];
                if (data.id == pic.id) {
                    this.player.list.splice(this.player.index, 1);

                    if (this.player.list.length > 0) {
                        if (this.player.index > this.player.list.length - 1) {
                            this.player.index = 0;
                        }
                        if (this.player.list.length === 1){
                            this.player.el.find('.arrow').hide();
                        }
                        this.player.play();
                    } else {
                        this.player.onClose();
                    }
                }
            }
        },

        onPlayerSetWallpaper : function() {
            var data = this.player.list[this.player.index];
            var collection = this.getCurCollection();
            collection.setWallpaper({
                spath : data.remotePath,
                id : data.id,
                spath : data.remotePath
            });
        },

        onPlayerDelete : function() {
            var data = this.player.list[this.player.index];
            var collection = this.getCurCollection();

            var tempFunc = collection.getCheckedList;

            //覆盖
            collection.getCheckedList = function(callback) {
                callback.call(this, [{
                    id : data.id,
                    sPictureRemotePath : data.remotePath,
                    sThumbnailPath : data.sThumbnailPath
                }]);
            }
            this.onDeleteClick();

            collection.getCheckedList = tempFunc;
        },

        onDetailHover : function(e) {
            var $target = $(e.target);

            var $item = $target.hasClass('g-image-item') ? $target : $target.parents('.g-image-item');
            var input = $item.find('input')[0];
            var id = input.dataset.id;

            var conll = this.getCurCollection();
            var data = conll.originList[conll.ids.indexOf(id)];

            var date = new Date();

            date.setTime(parseInt(data.sPictureDate));

            var offset = $target.offset();
            this.showImageTip({
                name : data.sPictureName,
                date : date.format('dd/MM/yyyy'),
                size : data.sPictureSize
            }, {
                x : offset.left,
                y : offset.top
            });
        },

        onDetailOut : function() {
            this.detailTimeout = setTimeout((function() {
                this.$tip && this.$tip.hide();
            }).bind(this), 300);
        },

        showImageTip : function(image, pos) {
            clearTimeout(this.detailTimeout);
            if (!this.$tip) {
                this.$tip = $(_.template(this.getTpl('tpl-image-detail-tip'), {
                    I18N : i18nDi
                }));
                $(document.body).append(this.$tip);
                this.$tip.on('mouseover', (function() {
                    clearTimeout(this.detailTimeout);
                }).bind(this));
                this.$tip.on('mouseout', (function(e) {
                    if (!this.$tip[0].contains(e.toElement)) {
                        this.$tip.hide();
                    }
                }).bind(this));
            }
            this.$tip.show();

            var posX = pos.x + 36;
            var posY = pos.y - 6;

            if (posX + this.$tip.width() > $(window).width()) {
                var diff = posX + this.$tip.width() - $(window).width();
                posX = posX - diff;
            }

            this.$tip.offset({
                left : posX,
                top : posY
            });

            this.$tip.find('.n em').html(image.name);
            this.$tip.find('.d em').html(image.date);
            this.$tip.find('.s em').html(image.size);
        },

        onRefresh : function() {
            this.loading.show();
            $("#wallpaper-empty-tip").hide();

            if (this.tab == tabs.GALLERY) {
                galleryColl.fetchGallery();
            } else if (this.tab == tabs.WALLPAPER) {
                wallpaperColl.fetchWappler();
            } else if (this.tab == tabs.OTHER) {
                otherColl.fetchOther();
            }

        },

        onCheckedAll : function(e) {
            var collection = this.getCurCollection();
            collection.setAllChecked(e.target.checked);
            collection.trigger('update');
        },

        onExport : function() {
            var me = this;
            var collection = this.getCurCollection();
            collection.getCheckedList(function(checkedDataList) {
                checkedDataList = checkedDataList.map(function(item) {
                    return {
                        id : item.id,
                        name : item.sPictureName,
                        remotePath : item.sPictureRemotePath
                    };
                });
                var total = checkedDataList.length;
                //*********************************************************
                //20140924
                var logObject = {
                    page: "mypictures_home",
                    module: "menu",
                    action: "export",
                    totalnum: total
                }
                utils.sendNewLog("1000120", logObject);
                //********************************************************* 

                var failedList = [];
                var successList = [];
                app.dal.request({
                    action : apiNames.REQ_POPUO_SAVE_DIALOG,
                    callback : function(resp) {
                        if (resp.status !== 1) {
                            return;
                        }
                        var path = resp.path;
                        var processWindow = new ProcessWindow({
                            header : "common.Export",
                            doingTitle : "common.Exporting",
                            failedTitle : "image.exportFailed",
                            autoDestroy : 1,
                            total : total,
                            openPath : path
                        });

                        processWindow.on("cancel", function() {
                            collection.setStopProcess(true);
                        });
                        processWindow.on("ready", function() {
                            var current = 0;
                            collection.exportPicture(path, checkedDataList, function(res) {
                                current++;
                                if (res.status !== 1) {
                                    failedList.push({
                                        id : res.info.remotePath,
                                        label : res.info.localPath
                                    });
                                } else {
                                    successList.push({
                                        id : res.info.remotePath,
                                        localPath : res.info.localPath
                                    });
                                }
                                if (current == total) {
                                    if (failedList.length > 0) {
                                        processWindow.setFailedTitle(i18nDi.fillDomText("image.exportFailed", total - failedList.length, failedList.length));
                                        processWindow.showDetailInfo(_.template(me.getTpl("tpl-image-failed-item"), {
                                            data : failedList
                                        }));
                                    } else {
                                        processWindow.setSuccessTitle(i18nDi.fillDomText("image.exportSuccess", total));
                                        processWindow.setSuccessList(successList);
                                    }

                                    //*********************************************************
                                    //20140924
                                    var logObject = {
                                        page: "mypictures_home",
                                        module: "menu",
                                        action: "export_result",
                                        successnum: successList.length,
                                        failnum: failedList.length
                                    }
                                    utils.sendNewLog("1000120", logObject);
                                    //*********************************************************
                                }
                                processWindow.doProgress(current, total, res.info.remotePath || current, res.status === 1);
                            });
                        });
                        processWindow.open();
                    }
                });
            });
        },

        onDeleteClick : function() {
            var _this = this;
            var collection = this.getCurCollection();
            collection.getCheckedList(function(checkedDataList) {
                checkedDataList = checkedDataList.map(function(item) {
                    return {
                        id : item.id,
                        spath : item.sPictureRemotePath,
                        sThumbnailPath : item.sThumbnailPath
                    };
                });

                var UIDialog = require('UIDialog');
                var i18nDi = require('I18NDI');

                var confirmDlg = new UIDialog({
                    buttonKey : 3, //1双按钮
                    content : i18nDi.fillDomText('image.sureDeleteText', checkedDataList.length),
                    title : i18nDi.fillDomText('common.Delete')
                });

                //*********************************************************
                //20140924
                    var logObject = {
                        page: "mypictures_home",
                        module: "menu",
                        action: "delete",
                        totalnum: checkedDataList.length
                    }
                    utils.sendNewLog("1000120", logObject);             
                //********************************************************* 
                confirmDlg.show();

                confirmDlg.on("yes", function() {
                    if (checkedDataList.length == 1) {
                            collection.deletePicture(checkedDataList, function(res, pic) {
                                if (res.status === 1) {
                                    try {
                                        _this.trigger('deleteSuccess', pic);
                                    } catch(e) {

                                    }
                                }
                                //_this.setToolbarStatus();
                            });
                    } else {
                        var processWindow = new ProcessWindow({
                            header : "common.Delete",
                            doingTitle : "common.Deleting",
                            successTitle : "image.deleteSuccessText",
                            autoDestroy : 3,
                            freshOnly : checkedDataList.length === 1 ? true : false,
                            total : checkedDataList.length
                        });

                        var total = checkedDataList.length;
                        var curSuccessList = [];
                        var curFailedList = [];
                        var current = 0;

                        processWindow.on("cancel", function() {
                            collection.setStopProcess(true);
                            _this.setToolbarStatus();
                        });

                        processWindow.on("ready", function() {

                            collection.deletePicture(checkedDataList, function(res, pic) {
                                current += 1;
                                if (res.status === 1) {
                                    curSuccessList.push(pic);
                                    processWindow.doProgress(current, total, pic, true);
                                    try {
                                        _this.trigger('deleteSuccess', pic);
                                    } catch(e) {

                                    }
                                } else {
                                    curFailedList.push({
                                        id : pic.id,
                                        label : pic.spath.substring(pic.spath.lastIndexOf("/") + 1, pic.spath.length)
                                    });
                                    processWindow.doProgress(current, total, pic, false);
                                    if (current == total) {
                                        processWindow.setFailedTitle(i18nDi.fillDomText('image.deleteFailed', total - curFailedList.length, curFailedList.length));
                                        processWindow.showDetailInfo(_.template(_this.getTpl("tpl-image-failed-item"), {
                                            data : curFailedList
                                        }));

                                        //*********************************************************
                                        //20140924
                                        var logObject = {
                                            page: "mypictures_home",
                                            module: "menu",
                                            action: "delete_result",
                                            successnum: curSuccessList.length,
                                            failnum: curFailedList.length
                                        }
                                        utils.sendNewLog("1000120", logObject);             
                                        //********************************************************* 
                                    }
                                }
                                //_this.setToolbarStatus();
                            });
                        });
                        processWindow.open();
                    }
                });
            });
        },

        onThreadCheckedBox : function(e) {
            var $target = $(e.target);
            var $thread = $target.parents('.g-image-thread');

            var threadId = $thread.attr('data-threadid');
            var collection = this.getCurCollection();
            collection.setThreadChecked(threadId, e.target.checked);
            collection.trigger('update');
        },

        openBigPicture : function(id) {
            var _this = this;
            var collection = this.getCurCollection();
            var playOpts = collection.getPlayListById(id);
            console.log(playOpts.list);
            this.player.setPlayList(playOpts.list);
            this.player.setIndex(playOpts.index);
            this.player.getBigPic = function(callback) {
                var data = _this.player.list[_this.player.index];

                collection.getOriginPicture({
                    id : data.id,
                    filePath : '',
                    fileName : data.name || "genie_wallpaper_" + id,
                    remotePath : data.remotePath,
                    callback : function(res) {
                        callback && callback(res.info.localPath);
                    }
                });
            };
            this.player.play();
            this.player.show();
        },

        onImageItemClick : function(e) {
            var $target = $(e.target);
            var $item = $target.hasClass('g-image-item') ? $target : $target.parents('.g-image-item');
            var $input = $item.find('input');
            var $thread = $target.parents('.g-image-thread');

            var dataset = $input[0].dataset;

            //数据
            var id = parseInt(dataset.id);
            var spath = dataset.remotepath;
            var name = dataset.name;
            var remotePath = dataset.remotepath;
            var threadId = $thread.attr('data-threadid');
            var _this = this;

            var collection = this.getCurCollection();

            if ($target.hasClass('open')) {
                this.openBigPicture(id);
            } else if ($target.hasClass('wp')) {

                collection.setWallpaper({
                    id : id,
                    spath : spath
                });

            } else if ($target.hasClass('detail')) {

            } else {
                var tag = e.target.tagName.toLowerCase();
                if (tag != 'input') {
                    collection.setAllChecked(false);
                    collection.setChecked(threadId, id, true);
                } else {
                    collection.setChecked(threadId, id, $input.prop('checked'));
                }
                collection.trigger('update');
            }
        },

        getCurCollection : function(tab) {
            if (this.tab == tabs.GALLERY) {
                return galleryColl;
            } else if (this.tab == tabs.WALLPAPER) {
                return wallpaperColl;
            } else if (this.tab == tabs.OTHER) {
                return otherColl;
            }
        },

        onImportClick : function() {
            //*********************************************************
            //20140924
            var current = 0;
            var successCount = 0;
            //*********************************************************
            app.dal.request({
                action : apiNames.REQ_POPUP_SYSTEM_DIALOG,
                paras : {
                    MultiSel : 1,
                    MediaType : 'image',
                    Filter : '(*.bmp; *.gif; *.jpeg; *.jpg; *.png; *.wbmp)|*.bmp; *.gif; *.jpeg; *.jpg; *.png; *.wbmp'
                },
                callback : function(res) {
                    if (res.info && res.info.list) {
                       for(var i=0;i<res.info.list.length;i++){
                            if(res.info.list[i].status!=1){
                                return;
                            }
                        }
                        var utils = require('utils');
                        var parasArray = [];
                        //*********************************************************
                        //20140924
                        var logObject = {
                            page: "mypictures_home",
                            module: "menu",
                            action: "import",
                            totalnum: res.info.list.length
                        }
                        utils.sendNewLog("1000120", logObject);
                        //********************************************************* 
                        utils.logTime.start('importimage');
                        res.info.list.forEach(function(file) {
                            parasArray.push({
                                path : file.path,
                                size : utils.convertSizeToString(file.size),
                                name : file.path.slice(file.path.lastIndexOf('\\') + 1)
                            });
                        });
                        utils.log.out('importimage:' + utils.logTime.end('importimage'));
                        //*********************************************************
                        //20140924
                        taskModel.completeCollection.on("importPic", function(result) {
                            current = current + 1
                            if(result.success){
                                successCount = successCount + 1;
                            }
                            if (current == res.info.list.length){
                                var logObject = {
                                    page: "mypictures_home",
                                    module: "menu",
                                    action: "import_result",
                                    successnum: successCount,
                                    failnum: res.info.list.length - successCount
                                }
                                utils.sendNewLog("1000120", logObject);
                            }
                        });
                        //*********************************************************
                        taskModel.batchImportPicture(parasArray);
                    }
                }
            });
        },

        setCount : function() {
            this.el.find('.g-list-tab-header [data-tab="1"] em').html(galleryColl.total);
            this.el.find('.g-list-tab-header [data-tab="2"] em').html(wallpaperColl.total);
            this.el.find('.g-list-tab-header [data-tab="3"] em').html(otherColl.total);
            this.posTabLine();
        },
        /*
         * 计算行图片个数
         */
        calColumnNums : function() {
            var marginLeft = 20;
            var marginRight = 20;

            var conWidth = this.el.find('.g-list-tab-con').width();
            return Math.floor((conWidth - marginLeft - marginRight) / this.imageWidth);
        },

        calRowNums : function() {
            var conHeight = this.el.find('.g-list-tab-con').height();

            return Math.ceil(conHeight / this.imageHeight + 2);
        },

        /*
         * 切图片处理
         */
        cutCurrentImgs : function() {
            var $imgs = this.el.find('.g-image-thread img');
            var me = this;

            $imgs.each(function() {
                var src = this.src;
                var image = new Image();
                var $img = $(this);

                image.onload = function() {
                };
                image.src = this.src;
            });
        },

        setToolbarStatus : function() {
            var $exportBtn = this.el.find('.g-toolbar .ico-export');
            var $deleteBtn = this.el.find('.g-toolbar .ico-delete');

            var $importBtn = this.el.find('.g-toolbar .ico-picture');

            var devInf = connection.deviceInfo || {};
            $importBtn.prop("disabled", !devInf.isSDCardExist);

            var coll = this.getCurCollection();
            var hasChecked = coll.hasChecked();

            $exportBtn.prop('disabled', !hasChecked);
            $deleteBtn.prop('disabled', !hasChecked);
            $('#i-image-chkboxall').prop('checked', coll.isAllChecked());
        },

        initProxyHandler : function(proxyScroller, collection) {
            var _this = this;

            var screenHandler = function(responseList) {
                console.log('screenData===', responseList);
                if (_this.toolTip) {
                    _this.toolTip.hide();
                }
                responseList.forEach(function(thread, index) {
                    var list = thread.list;
                    var $thread = proxyScroller.el.find('.g-image-thread:eq(' + index + ')');

                    $thread.show();

                    //如果不存在，
                    if ($thread.length === 0) {
                        $thread = $(_this.getTpl('tpl-image-thread'));
                        proxyScroller.addContent($thread[0]);
                    }

                    $thread.find('.title strong').html(thread.strong);
                    $thread.find('.title .second').html(thread.second);

                    $thread.attr('data-threadid', thread.threadId);

                    $thread.find('.title input').prop('checked', collection.isThreadChecked(thread.threadId));
                    $thread.find('.title .count').html(thread.count);

                    var items = $thread.find('.g-image-item').toArray();

                    if (list.length > items.length) {
                        var addLen = list.length - items.length;
                        for (var j = 0; j < addLen; j++) {
                            var $item = $(_this.getTpl('tpl-image-item'));
                            items.push($item[0]);
                            $thread.find('.pic-list').append($item);
                        }
                    }

                    for (var i = 0; i < items.length; i++) {
                        var $item = $(items[i]);
                        if (list[i]) {
                            $item.show();
                            var input = $item.find('input')[0];
                            var $img = $item.find('img');

                            $img.attr('src', list[i].sThumbnailPath).attr('data-imageid', list[i].id);
                            $img.attr('rotate', list[i].rotateAngle);
                            console.log("初始化角度", list[i].rotateAngle)
                            $img[0].style.webkitTransform = 'rotate(' + list[i].rotateAngle + 'deg)';

                            input.dataset.id = list[i].id;
                            input.dataset.remotepath = list[i].sPictureRemotePath;
                            input.dataset.name = list[i].sPictureName;

                            var date = new Date();
                            date.setTime(parseInt(list[i].sPictureDate));

                            var wh = list[i].sPictureMeasure.split(",");

                            var imageData = {
                                name : list[i].sPictureName,
                                date : date.format('dd/MM/yyyy'),
                                size : list[i].sPictureSize,
                                measure : wh[0] + ' x ' + wh[1]
                            };
                            var content = _.template(_this.getTpl('tpl-image-detail-tip'), {
                                I18N : i18nDi,
                                data : imageData
                            });
                            var tipOption = {
                                target : $item.find(".detail").get(0),
                                content : content
                            };
                            _this.toolTip.setOption(tipOption);

                            var checked = collection.isChecked(thread.threadId, list[i].id);
                            $(input).prop('checked', checked);
                            $item[checked ? 'addClass' : 'removeClass']('selected');
                        } else {
                            $item.hide();
                        }
                    }
                });

                //隐藏没有显示数据的dom
                var ix = responseList.length - 1;
                var $unUsedThreads = proxyScroller.el.find('.g-image-thread:gt(' + ix + ')');
                $unUsedThreads.hide();

                var curColl = _this.getCurCollection();
                if (curColl == collection) {
                    $('#i-image-chkboxall').prop('checked', collection.isAllChecked());
                    _this.setToolbarStatus();

                    if (curColl.sendRequest && curColl.receiverResponse) {
                        this.loading.hide();
                    }
                }

                if (curColl == collection) {
                    if (responseList.length == 0 && curColl.sendRequest && curColl.receiverResponse) {
                        var devInfo = connection.deviceInfo || {};
                        if (devInfo.isSDCardExist) {
                            this.el.find('#wallpaper-empty-tip').show();
                            this.el.find(".g-media-empty-info").hide();
                        } else {
                            this.el.find('#wallpaper-empty-tip').hide();
                        }
                    } else {
                        $('#wallpaper-empty-tip').hide();
                    }
                    if (pictureModel.galleryCollection.size() > 0 || pictureModel.wallpaperCollection.size() > 0 || pictureModel.otherCollection.size() > 0) {
                        _this.el.find(".g-media-empty-info").hide();
                    }
                }
                /*添加title*/
                utils.tooltip.attach(this.el.find(".wp"));
                utils.tooltip.attach(this.el.find(".open"));
            };

            proxyScroller.on('renderOneScreen', $.proxy(function(ev) {
                var dataList = collection.dataList;
                var pictureNums = this.calRowNums() * this.calColumnNums();
                var index = ev.index;

                if (collection.dataList.length === 0) {
                    //proxyScroller.addContent('');
                    proxyScroller.el.find('.g-image-thread').hide();
                }

                pictureModel.getPictureInList({
                    index : index,
                    rows : this.calRowNums(),
                    columns : this.calColumnNums(),
                    dataList : dataList,
                    callback : screenHandler.bind(this)
                });
            }, this));
        },

        initGalleryCtn : function() {
            if (this.galleryProxy) {
                return;
            }

            var galleryProxy = this.galleryProxy = new ScrollProxy({
                container : this.el.find('#i-gallery-pic'),
                rowHeight : 100
            });

            this.initProxyHandler(galleryProxy, galleryColl);
        },

        initWallPaper : function() {
            if (this.wallpaperProxy) {
                return;
            }
            this.wallpaperProxy = new ScrollProxy({
                container : this.el.find('#i-wallpaper-pic'),
                rowHeight : 100
            });
            this.initProxyHandler(this.wallpaperProxy, wallpaperColl);

            wallpaperColl.on('update', this.onWallpaperUpdate.bind(this));

            if (wallpaperColl.sendRequest && wallpaperColl.receiverResponse) {
                wallpaperColl.trigger('update');
            }
        },

        initOther : function() {
            if (this.otherProxy) {
                return;
            }
            this.otherProxy = new ScrollProxy({
                container : this.el.find('#i-other-pic'),
                rowHeight : 100
            });
            this.initProxyHandler(this.otherProxy, otherColl);

            otherColl.on('update', this.onOtherUpdate.bind(this));

            if (otherColl.sendRequest && otherColl.receiverResponse) {
                otherColl.trigger('update');
            }
        },

        posTabLine : function() {
            var selected = this.el.find('.g-list-tab-header .selected');
            var line = this.el.find('.g-list-tab-header .line');

            line.css({
                left : selected[0].offsetLeft,
                width : selected.width() + 2
            });
        },

        onTabClick : function(e) {
            var $target = $(e.target);
            var $tab = e.target.tagName.toLowerCase() == 'li' ? $target : $target.parents('li');
            var tab = $tab.attr('data-tab');

            var $panel = null;
            if (tab == this.tab) {
                return;
            }

            $tab.parent().find('.selected').removeClass('selected');
            $tab.addClass('selected');

            this.el.find('.g-list-tab-con .list').addClass('g-page-hide').removeClass('g-page-show');

            switch(tab) {
                case tabs.GALLERY:
                    $panel = this.el.find('#i-gallery-pic');
                    this.initGalleryCtn();
                    break;
                case tabs.WALLPAPER:
                    $panel = this.el.find('#i-wallpaper-pic');
                    this.initWallPaper();
                    break;
                case tabs.OTHER:
                    $panel = this.el.find('#i-other-pic');
                    this.initOther();
                    break;
            }

            this.tab = tab;
            this.posTabLine();

            this.setToolbarStatus();
            var curColl = this.getCurCollection();
            if (curColl.receiverResponse && curColl.originList.length == 0) {

                var devInf = connection.deviceInfo || {};
                if (devInf.isSDCardExist) {
                    $('#wallpaper-empty-tip').show();
                }

            } else {
                $('#wallpaper-empty-tip').hide();
            }

            $panel.removeClass('g-page-hide').addClass('g-page-show');
            var curColl = this.getCurCollection();

            if (curColl.sendRequest && curColl.receiverResponse) {
                this.loading.hide();
            } else if (curColl.sendRequest && !curColl.receiverResponse) {
                this.loading.show();
            }
            this.player.hide();
        },

        onGalleryUpdate : function() {
            var threadList = galleryColl.dataList || [];
            var rows = 2;
            var $threadView = this.el.find("#i-gallery-pic");
            if (galleryColl.sendRequest && galleryColl.receiverResponse) {
                this.loading.hide();
            }

            threadList.forEach(function(thread) {
                rows += Math.ceil(thread.list.length / this.calColumnNums());
                $threadView.find(".g-image-thread[data-threadid='" + thread.threadId + "']").find(".count").html(thread.list.length);
            }, this);

            this.galleryProxy.setLength(rows + 1);

            this.galleryProxy.trigger('renderOneScreen', {
                index : this.galleryProxy.getIndex(),
                screenNum : this.galleryProxy.getOneScreenNum(),
            });
        },

        onWallpaperUpdate : function() {
            var threadList = wallpaperColl.dataList || [];
            var rows = 2;
            var $threadView = this.el.find("#i-wallpaper-pic");

            if (wallpaperColl.sendRequest && wallpaperColl.receiverResponse) {
                this.loading.hide();
            }

            threadList.forEach(function(thread) {
                rows += Math.ceil(thread.list.length / this.calColumnNums());
                $threadView.find(".g-image-thread[data-threadid='" + thread.threadId + "']").find(".count").html(thread.list.length);
            }, this);

            this.wallpaperProxy.setLength(rows + 1);

            this.wallpaperProxy.trigger('renderOneScreen', {
                index : this.wallpaperProxy.getIndex(),
                screenNum : this.wallpaperProxy.getOneScreenNum(),
            });
        },

        onOtherUpdate : function() {
            var threadList = otherColl.dataList || [];
            var rows = 2;
            var $threadView = this.el.find("#i-other-pic");

            if (otherColl.sendRequest && otherColl.receiverResponse) {
                this.loading.hide();
            }

            threadList.forEach(function(thread) {
                rows += Math.ceil(thread.list.length / this.calColumnNums());
                $threadView.find(".g-image-thread[data-threadid='" + thread.threadId + "']").find(".count").html(thread.list.length);
            }, this);

            this.otherProxy.setLength(rows + 1);

            this.otherProxy.trigger('renderOneScreen', {
                index : this.otherProxy.getIndex(),
                screenNum : this.otherProxy.getOneScreenNum(),
            });
        }
    });

    return ImageView;
});
