define("UIBookView", function(require, exports, module) {
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

    var GridModel = require("gridModel");

    var connectionMgr = require("connectionMgr");

    var bookModel=require("myBookModel");

    var SmartTip = require("UISmartTip");

    var BookItemView = app.ViewBase.extend({
        module : module,
        init : function(model) {
            this.model = model;
            this.model.set("size", this.model.get("size") || Utils.convertSizeToString(this.model.data.sBookSize));
        },
        render : function(target) {
            var dom = target.find(".book-list-item");
            if (dom.length < 1) {
                var tpl = this.getTpl("tpl-book-list-item");
                $(target).html($(_.template(tpl, {
                    data : this.model.data
                })));
                dom = target.find(".book-list-item");
            }
            dom.attr("data-id", this.model.data.id);
            dom.find(".name").html(this.model.data.sBookName);
            dom.find(".name").attr("titleText", this.model.data.sBookName);

            Utils.tooltip.attach(dom.find(".name"));
            Utils.tooltip.attach(dom.find(".btn-open"));

            dom.find(".format").html(this.model.data.sBookExt);
            dom.find(".size").html(this.model.data.size);
        }
    });
    var gridTypes={
        GRID_SEARCH:1,
        GRID_NORMAL:0
    };
    var MyBookView = app.ViewBase.extend({
        module : module,
        events : {
            'click -> .g-toolbar .btn-delete' : 'onDelete',
            'click -> .g-toolbar .btn-import' : 'onImport',
            'click ->.g-toolbar .btn-export' : 'onExport',
            'click -> .book-list-item .btn-open' : 'onOpen',
            'click -> .g-grid-search .btn-clear-search' : 'onClearSearch',
            'click ->.g-media-empty-info .goto-downloadEbooks' : 'gotoEbooks'
        },
        init : function(opts) {
            var pageId = opts.pageId;
            var me = this;
            this.collection = opts.collection;

            this.el = $(_.template(this.getTpl('tpl-book-main-view'), {
                I18N : i18nDi
            }));
            this.el.appendTo($('#' + pageId));

            this.listContainer = this.el.find('.g-content .list');
            this.emptyContainer = this.el.find('.g-content .pic_content');
            this.curGrid=gridTypes.GRID_NORMAL;
            var allCheckboxPxy = this.el.find('.chkbox-all');
            this.grid = new SuperGrid({
                container : this.listContainer,
                model : [{
                    type : 'checkbox',
                    width : 54
                }, {
                    name : '',
                    label : "",
                    type : 'view',
                    width : 'flex',
                    view : BookItemView
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
            this.loading.hide();

            me.collection.on("update", function() {
                if (me.collection.responsed && me.collection.requested) {

                    var keys = Object.keys(me.collection.getModelMap());
                    var toolbar = $(this.el).find(".g-toolbar");
                        if (!connectionMgr.deviceInfo.isSDCardExist) {
                            toolbar.find(".btn-import").attr("disabled", "disabled");
                        } else {
                            toolbar.find(".btn-import").removeAttr("disabled");
                        }
                        if (keys.length < 1) {
                            if (connectionMgr.deviceInfo.isSDCardExist) {
                                me.emptyContainer.html(_.template(me.getTpl("tpl-book-empty-info"), {
                                    I18N : i18nDi
                                })).show();
                            } else {
                                me.emptyContainer.html(_.template(me.getTpl("tpl-book-nosd-info"), {
                                    I18N : i18nDi
                                })).show();
                            }
                            me.listContainer.css({
                                "visibility" : "hidden",
                                "opacity" : 0,
                                "z-index" : "-1"
                            });
                        } else {
                            me.listContainer.css({
                                "visibility" : "visible",
                                "opacity" : 1,
                                "z-index" : "1"
                            });
                            me.emptyContainer.hide();
                        }
                    me.loading.hide();
                }
            }.bind(this));
            var header = $(_.template(this.getTpl("tpl-search-header"), {
                I18N : i18nDi
            }));
            this.el.find(".list").prepend(header);

            if (this.collection.requested && this.collection.responsed) {
                this.collection.trigger("update");
            }
            var curHash = app.getCurHashParas();
            app.eventCenter.on(curHash.module + curHash.action, $.proxy(this.refresh, this));
            app.eventCenter.on(curHash.module + curHash.action + "entersearch", $.proxy(this.onMultiSearch, this));
            this.checkNav();
        },
        refresh : function() {
            this.loading.show();
            this.collection.refresh();
            this.grid.setAllSelect(false);
        },
        redirect : function(hash) {
            var me = this;
            if (hash.pageState && hash.pageState.searchType && hash.pageState.searchType == "4" && hash.pageState.multiple == "0") {
                me.grid.collection.clearSelected();
                var model = this.grid.collection.getModelById("genie_book_" + hash.pageState.data);
                me.grid.collection.setSelected(model.getId(), true);

                var index = this.grid.collection.models.indexOf(model);
                this.grid.scrollToIndex(index);
                me.grid.collection.trigger("update");
                me.checkNav();
            }
        },
        onMultiSearch : function(searchResult) {
            var me = this;
            var keyword = searchResult.key;
            if (!this.searchCollection) {
                this.searchCollection = new GridModel.Collection();
            }
            this.curGrid=gridTypes.GRID_SEARCH;
            this.searchCollection.clear();
            this.grid.setCollection(me.searchCollection);
            console.log("搜索结果",searchResult);
            if (searchResult.info) {
                searchResult.info.forEach(function(item) {
                    keyword = item.keyInfo[0].keyword;
                    if (item.sBookId) {
                        me.searchCollection.push(new bookModel.Model(me.collection.getModelById("genie_book_" + item.sBookId).data));
                    }
                });
            }
            this.el.find(".list").addClass("g-grid-search-box");
            this.el.find(".g-grid-search").css("display", "-webkit-box");

            me.searchCollection.trigger("update");

            me.updateHandler = function() {
                me.el.find(".g-grid-search .static").html(i18nDi.fillDomText('common.searchResultText', keyword, me.searchCollection.models.length));
                me.loading.hide();
            }
                 me.listContainer.css({
                                "visibility" : "visible",
                                "opacity" : 1,
                                "z-index" : "1"
                 });
                 me.emptyContainer.hide();
            this.el.find(".g-grid-search .static").html(i18nDi.fillDomText('common.searchResultText', keyword, me.searchCollection.models.length));
            me.searchCollection.off("update", me.updateHandler).on("update", me.updateHandler);
            me.checkNav();
        },
        onClearSearch : function() {
            this.curGrid=gridTypes.GRID_NORMAL;
            this.grid.setCollection(this.collection);
            this.grid.collection.clearSelected();
            this.el.find(".g-grid-search").hide();
            this.el.find(".list").removeClass("g-grid-search-box");
            this.grid.collection.trigger("update");
        },
        onDelete : function() {
            var me = this;
            //确认删除弹窗
            var selectedIds = Object.keys(me.collection.getSelectedMap());
            if(this.curGrid==gridTypes.GRID_NORMAL){
                selectedIds = Object.keys(me.collection.getSelectedMap());
            }else{
                selectedIds = Object.keys(me.searchCollection.getSelectedMap());
            }
            console.log(me.collection);
            var confirmDlg = new UIDialog({
                buttonKey : 3, //1双按钮，2有ok按钮
                content : i18nDi.fillDomText('book.sureDelete', selectedIds.length),
                title : i18nDi.fillDomText('common.Delete')
            });
            confirmDlg.show();
            confirmDlg.on("yes", function() {

                var submitData = [];
                var failedList = [];
                _.each(selectedIds, function(id) {
                    submitData.push(me.collection.getModelById(id).data);
                });
                if (selectedIds.length == 1) {
                        me.collection.deleteBook(submitData, function(res) {
                        });
                        me.collection.off("deleting").on("deleting",function(current, total, id, success){
                            if(success&&me.curGrid==gridTypes.GRID_SEARCH&&me.searchCollection.getModelById("genie_book_"+id)){
                                    me.searchCollection.remove(me.searchCollection.getModelById("genie_book_"+id));
                                }                            
                        });
                } else {
                    var processWindow = new ProcessWindow({
                        header : "common.Delete",
                        doingTitle : "common.Deleting",
                        successTitle : "image.deleteSuccessText",
                        failedTitle : "book.deleteFailed",
                        total : submitData.length,
                        freshOnly : selectedIds.length == 1 ? true : false,
                        autoDestroy : 3
                    });
                    me.collection.on("deleting", function(current, total, id, success) {
                            if (!success) {
                                failedList.push(id);
                            }
                            /*搜索结果中删除*/
                            if(success&&me.curGrid==gridTypes.GRID_SEARCH&&me.searchCollection&&me.searchCollection.getModelById("genie_book_"+id)){
                                console.log("删除的bookid"+id);
                                me.searchCollection.remove(me.searchCollection.getModelById("genie_book_"+id));
                            }
                            processWindow.doProgress(current, total, id, success);
                            if (current == total) {
                                if (failedList.length > 0) {
                                    processWindow.setFailedTitle(i18nDi.fillDomText('book.deleteFailed', total - failedList.length, failedList.length));
                                }
                            }
                        });                    
                    processWindow.on("ready", function() {
                        console.log(submitData);
                        me.collection.deleteBook(submitData, function(res) {
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
            var modelSelectedIds = Object.keys(this.grid.collection.getSelectedMap());
            var toolbar = this.el.find(".g-toolbar");
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
            me.collection.importBook(function(res) {
                if (res.success) {
                    me.collection.trigger("update");
                }
            });
        },
        onOpen : function(event) {
            var me = this;
            var id = $(event.target).parents(".book-list-item").attr("data-id");
            var model = this.collection.getModelById("genie_book_" + id);
            me.collection.openBook({
                id : model.get("id"),
                sBookName : model.get("sBookName")
            }, function(res) {
            });
        },
        onExport : function() {
            var me = this;
            var selectedIds = Object.keys(me.grid.collection.getSelectedMap());
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
                            successTitle : "book.exportSuccess",
                            failedTitle : "book.exportFailed",
                            total : selectedIds.length,
                            freshOnly : false,
                            numberType : selectedIds.length == 1 ? "none" : "index",
                            openPath : res.path,
                            autoDestroy : 1
                        });
                        me.collection.on("doing", function(current, total, curData, success) {
                            console.log("导出走进度===========",current,total,curData);
                            processWindow.doProgress(current, total, curData, success);
                            if (!success) {
                                failedList.push(curData);
                                failedStr += curData.sBookName + "<br/>";
                            } else {
                                successList.push(curData);
                            }
                            if (current == total) {
                                if (failedList.length > 0) {
                                    processWindow.setFailedTitle(i18nDi.fillDomText('book.exportFailed', total - failedList.length, failedList.length));
                                    processWindow.showDetailInfo(failedStr);
                                } else {
                                    /*允许对导出的数据进行多选*/
                                    processWindow.setSuccessTitle(i18nDi.fillDomText('book.exportSuccess', total));
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
                            me.collection.exportBook(submitModels, path, function(res) {
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
        gotoEbooks : function() {
            app.navigate({
                module : "resource",
                action : "book"
            });
        }
    });

    return MyBookView;
});
