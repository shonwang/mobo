/**
 * @author liujintao
 * @descript 文件浏览器主视图
 * @since 2014-03-13
 */
define("FileManager", function(require, exports, module) {
    var app = require("app");
    var $ = require("jquery");
    var _ = require("underscore");
    var FileManagerModel = require("FileManagerModel");
    var gridModel = require("gridModel");
    var apiNames = require('APINames');
    var connection = require('connectionMgr');
    var utils = require("utils");

    var ProgressWindow = require("ProgressPanel");

    var FileIconView = require("FileIconView");
    var FileTableView = require("FileTableView");

    /*国际化字典工具*/
    var i18nDi = require('I18NDI');
    /*弹窗*/
    var UIDialog = require('UIDialog');
    /*进度处理框*/
    var ProcessWindow = require("ProgressPanel");
    /*下拉菜单组件*/
    var UIMenu = require("UIMenu");

    var FileManagerMainView = app.ViewBase.extend({
        module : module,
        events : {
            "click -> .sidebar .nav-left-li" : 'onFileExploreClick',
            "dblclick -> .sidebar .nav-left-li" : 'onDblClickNode',
            "click -> .sidebar .root-node" : "onExpandRootClick",
            "click -> .sidebar .ico-expand" : "onExpandTreeClick",
            "click -> .sidebar .ico-fold" : "onFoldTree",
            "click -> .g-toolbar .btn-export" : "onExport",
            "click -> .g-toolbar .btn-delete" : "onDelete",
            "click -> .g-toolbar .btn-copy" : "onCopy",
            "click -> .g-toolbar .btn-paste" : "onPaste",
            /* "click -> .g-toolbar .btn-refresh" : "onRefresh",*/
            "click -> .g-toolbar .btn-new-folder" : "onCreateDirectory",
            "mouseleave ->.left-nav" : "onMouseLeaveNav",
           
            "click -> .nav-tool-bar .btn-refresh" : "onRefresh",
            "click -> .nav-tool-bar .btn-back" : "onBack",
            "click -> .nav-tool-bar .btn-forward" : "onForward"
        },
        init : function(opts) {
            var me = this;
            this.collection = new FileManagerModel.Collection();
            this.processWindowInstance=null;
            this.win = opts.win;
            this.el = this.win.getContent();
            this.el.addClass("sd-box");
            this.clickTimer = null;
            this.exploreHistory=[];
            this.exploreHistoryIndex=0;
            this.win.on("message", function(data) {
                if (data.info.todo == "restore") {
                    app.dal.request({
                        action : apiNames.REQ_RESTORE
                    });
                } else if (data.info.todo == "close") {
                    if(me.processWindowInstance){
                        me.processWindowInstance.close();
                    }
                    setTimeout(function(){
                        me.win.close();
                    },300);
                    
                }
            });
            this.sidebarRoot_tpl = this.getTpl("tpl-fileManager-menu-root");
            this.sidebarNode_tpl = this.getTpl("tpl-fileManager-menu-tree");
            /*生成根节点*/
            var me = this;

            this.collection.getRootNodes(function(data) {
                me.rootNodes = data;
                me.render(me.el);
            });

            this.navBar = this.el.find(".left-nav");
            this.collection.on("update", function(paras) {
                me.navBar = me.el.find(".left-nav");
                var model = paras.model;
                //当类型为删除时，model是指模型的数据
                var parentModel = me.collection.getModelById("genie_file_" + paras.model.get("parentId")) || me.collection.getModelById("genie_file_" + paras.model.parentId);
                /*更新类型为添加节点*/
                if (paras && paras.type == "add") {
                    if (model.get("isDirectory")) {
                        parentModel.set("hasChildDir", true);
                    }
                    if (parentModel.get("opened") && model.get("isDirectory")) {//如果节点已经展开,追加节点
                        //追加子节点
                        var node = _.template(me.sidebarNode_tpl, {
                            data : [model.data],
                            I18N : i18nDi
                        });
                        me.navBar.find("#" + parentModel.get("id")).children(".childNode").append(node);
                    } else if (model.get("isDirectory")) {//添加展开按钮
                        me.navBar.find("#" + parentModel.get("id")).find(".ico-open-close").addClass("ico-expand").removeClass("ico-fold");
                    }
                } else if (paras && paras.type == "remove") {//更新类型为删除节点
                    me.navBar.find("#" + model.get("id")).remove();
                    if (model.get("isDirectory") && !me.collection.hasChildDir(parentModel.data)) {//如果子目录
                        me.navBar.find("#" + parentModel.get("id")).find(".ico-open-close").removeClass("ico-fold").removeClass("ico-expand");
                        parentModel.set("opened", false);
                    }
                } else if (paras && paras.type == "modify") {
                    if (paras.model.get("oldFileId") && model.get("isDirectory")) {
                        me.navBar.find("#" + model.get("oldFileId")).attr("id", model.get("id")).children(".nav-left-li").find(".name_sp").find(".i-name").text(model.get("name"));
                    } else if (model.get("isDirectory")) {
                        me.navBar.find("#" + model.get("id")).children(".nav-left-li").find(".name_sp").find(".i-name").text(model.get("name"));
                    }
                }
            });
        },
        render : function(target) {
            var tpl = this.getTpl("tpl-fileManager-main-view");
            this.win.setContent(_.template(tpl, {
                I18N : i18nDi
            }));
            this.win.setHeader(i18nDi.fillDomText('tools.fileManager'));
            var me = this;
            /*生成根节点 */

            target.find(".root").html(_.template(me.sidebarRoot_tpl, {
                data : this.rootNodes,
                I18N : i18nDi
            }));
            this.fileExploreView = new FileTableView({
                el : $(".list-view"),
                collection : me.collection
            });
            this.fileExploreView.render(this.fileExploreView.el);
            var sdNode;
            console.log("roots:", this.rootNodes);
            for (var i = 0; i < this.rootNodes.length; i++) {
                if (this.rootNodes[i].type == 0) {
                    sdNode = this.rootNodes[i];
                    break;
                }
            }
            this.onExpandRoot(sdNode);
            this.exploreHistory.push(sdNode.id);
            var curNode = $("#" + sdNode.id);
            this.el.find(".left-nav").find(".node").removeClass("cur");
            curNode.addClass("cur");
            this.importMenu = new UIMenu({
                list : [{
                    index : 1,
                    label : i18nDi.fillDomText("fileManager.ImportFile"),
                    value : 2
                }, {
                    index : 2,
                    label : i18nDi.fillDomText("fileManager.ImportDirectory"),
                    value : 1
                }]
            });
            this.importMenu.decorate(this.el.find(".g-toolbar .ico-import"));

            this.importMenu.off(UIMenu.SELECT);
            this.importMenu.on(UIMenu.SELECT, $.proxy(this.onImport, this));
            this.fileExploreView.currentCollection.off("update", $.proxy(me.checkNav, me)).on("update", $.proxy(me.checkNav, me));
            this.fileExploreView.off("selectChange", $.proxy(me.checkNav, me)).on("selectChange", $.proxy(me.checkNav, me));
            this.fileExploreView.off("changePath").on("changePath", function(nodeData) {
                me.onExpandTree(me.collection.getModelById("genie_file_" + nodeData.id).data, {
                    cache : true
                });
                if(me.exploreHistory.indexOf(nodeData.id)!=me.exploreHistory.length-1){
                    me.exploreHistory.push(nodeData.id);
                    me.exploreHistoryIndex++;
                }
                var curNode = me.el.find(".left-nav").find("#" + nodeData.id);
                me.el.find(".left-nav").find(".node").removeClass("cur");
                curNode.addClass("cur");
            });
            this.fileExploreView.on("idchanged", function() {
                me.onRefresh();
            });
            this.fileExploreView.currentCollection.on("update", function() {
                console.log("currentCollection 更新了",me.fileExploreView.currentCollection);
                if (me.fileExploreView.currentCollection.models.length > 0) {
                    me.el.find(".emptyBox").addClass("box-none-height-hidden").removeClass("box-full-height-show").siblings(".list-view").css("visibility", "visible");
                } else {
                    me.el.find(".emptyBox").removeClass("box-none-height-hidden").addClass("box-full-height-show").siblings(".list-view").css("visibility", "hidden");
                }
            });
            utils.tooltip.attach(this.el.find(".nav-tool-bar .btn-back"));
            utils.tooltip.attach(this.el.find(".nav-tool-bar .btn-forward"));
            utils.tooltip.attach(this.el.find(".nav-tool-bar .btn-refresh"));
        },
        onBack:function(event){
            if(this.exploreHistory.length>0&&this.exploreHistoryIndex>0){
                this.exploreHistoryIndex--;     
                console.log(this.exploreHistoryIndex);
                 console.log("后退",this.collection.getModelById("genie_file_"+this.exploreHistory[this.exploreHistoryIndex]));
                 if(this.exploreHistory[this.exploreHistoryIndex]){
                     if(this.collection.getModelById("genie_file_"+this.exploreHistory[this.exploreHistoryIndex])){
                        this.onFileExplore(this.collection.getModelById("genie_file_"+this.exploreHistory[this.exploreHistoryIndex]).data,{fromHistory:true});    
                     }else{
                        this.onBack(event); 
                     }
                 }
                 this.checkNav();
            }
        },
        showEmpty:function(){
            var me=this;
            me.fileExploreView.loading.hide();
            me.el.find(".emptyBox").removeClass("box-none-height-hidden").addClass("box-full-height-show").siblings(".list-view").css("visibility", "hidden");            
        },
        onForward:function(event){
           if(this.exploreHistory.length>0&&this.exploreHistoryIndex<this.exploreHistory.length-1){
                this.exploreHistoryIndex++;    
                console.log(this.exploreHistoryIndex);             
                console.log("前进",this.collection.getModelById("genie_file_"+this.exploreHistory[this.exploreHistoryIndex]));  
                if(this.exploreHistory[this.exploreHistoryIndex]){
                    if(this.collection.getModelById("genie_file_"+this.exploreHistory[this.exploreHistoryIndex])){
                        this.onFileExplore(this.collection.getModelById("genie_file_"+this.exploreHistory[this.exploreHistoryIndex]).data,{fromHistory:true});
                    }else{
                        this.onForward(event);
                    }
                 } 
                 this.checkNav();
            }
        },
        onRefresh : function(callback) {
            /*生成根节点*/
            var id = this.fileExploreView.currentId;
            var model = this.collection.getModelById("genie_file_" + id);
            var openedBefore = model.get("opened");
            var me = this;
            if (!this.collection.request || !this.collection.responsed) {
                return;
            }
            this.copyData = [];
            me.fileExploreView.refresh();
            this.collection.getNodeList({
                parentId : id,
                remotePath : model.get("remotePath")
            }, function(nodeData) {
                me.fileExploreView.showNodeList(id, nodeData);
                if (openedBefore) {
                    model.set("opened", true);
                    me.onExpandTree(model.data, {
                        cache : true
                    });
                }
                try{
                    callback&&callback(model.data);   
                }catch(e){
                    
                }
                me.checkNav();
            });
        },
        onMouseLeaveNav : function(event) {
            var _target = $(event.target).is(".left-nav") ? $(event.target) : $(event.target).parent(".left-nav");
            _target.addClass("fadeOut");
        },
        onCreateDirectory : function() {
            var me = this;
            var fileName = i18nDi.getDicText("fileManager.newFolder");
            me.fileExploreView.appendEditRow(fileName, function(res) {
            }, function(res) {
                //失败提示
                var confirmDlg = new UIDialog({
                    buttonKey : 2, //1双按钮，2有ok按钮
                    contentConfig : {
                        i18nValues : ["fileManager.createFolderFailed"]
                    },
                    title : i18nDi.fillDomText('fileManager.newFolder')
                });
                confirmDlg.show();
            });
        },
        onImport : function(item) {
            var me = this;
            var action;
            if (item.value == 2) {//导入文件
                action = apiNames.REQ_POPUP_SYSTEM_DIALOG;
            } else {//导入文件夹
                action = apiNames.REQ_POPUO_SAVE_DIALOG;
            }
            app.dal.request({
                action : action,
                paras : {
                    MultiSel : 1,
                    MediaType : '*',
                    Filter : '(*.*)|*.*'
                },
                callback : function(res) {
                    if (res.status != 1 || res.exist == 0) {
                        return;
                    } else if ((res.info && res.info.list) || res.path) {
                        var currentId = me.fileExploreView.getCurrentId();
                        var model = me.collection.getModelById("genie_file_" + currentId);
                        var failedList = [];
                        var successList = [];
                        var failedText = "";
                        var length = (res.info && res.info.list.length) || 1;
                        var progressWindow = new ProgressWindow({
                            header : item.value == 2 ? "fileManager.ImportFile" : "fileManager.ImportDirectory",
                            doingTitle : "fileManager.importingTitle",
                            successTitle : "fileManager.importingTitle",
                            cancelAble : true,
                            autoDestroy : 3,
                            total : length,
                            numberType : "index"
                        });
                        me.fileExploreView.currentCollection.clearSelected();
                        me.fileExploreView.currentCollection.trigger("update");
                        me.collection.off("importing").on("importing", function(index, total, dataInfo, success) {
                            progressWindow.doProgress(index, total, dataInfo, success);
                            if (success && dataInfo && model.get("remotePath") == dataInfo.parentPath) {
                                if (!me.fileExploreView.currentCollection.getModelById("genie_file_" + dataInfo.id)) {
                                    me.fileExploreView.currentCollection.push(new FileManagerModel.Model(dataInfo));
                                } else {
                                    me.fileExploreView.currentCollection.remove(me.fileExploreView.currentCollection.getModelById("genie_file_" + dataInfo.id));
                                    me.fileExploreView.currentCollection.push(new FileManagerModel.Model(dataInfo));
                                }
                                successList.push(dataInfo);
                                var newModel = me.fileExploreView.currentCollection.getModelById("genie_file_" + dataInfo.id);
                                var indexModel = me.fileExploreView && me.fileExploreView.currentCollection.models.indexOf(newModel);
                                me.fileExploreView.currentCollection.setSelected(newModel.getId(), true);
                                me.fileExploreView.grid && me.fileExploreView.grid.scrollToIndex(indexModel);
                                me.fileExploreView.currentCollection.trigger("update");
                            } else if (!success) {
                                if (dataInfo) {
                                    failedList.push(dataInfo);
                                    failedText += ((dataInfo && dataInfo.name) || dataInfo) + "<br/>";
                                }
                            }
                            if (index == total && failedList.length > 0) {
                                progressWindow.setFailedTitle(i18nDi.fillDomText('fileManager.importFailed', total - failedList.length, failedList.length));
                                progressWindow.showDetailInfo(failedText);
                            }
                            if (index == total && item.value == 1) {
                                me.onRefresh(function(parentData){
                                    try{
                                        var newModel = me.fileExploreView.currentCollection.getModelById("genie_file_" + dataInfo.id);
                                        var indexModel = me.fileExploreView && me.fileExploreView.currentCollection.models.indexOf(newModel);
                                        me.fileExploreView.currentCollection.setSelected(newModel.getId(), true);
                                        me.fileExploreView.grid && me.fileExploreView.grid.scrollToIndex(indexModel);
                                        me.fileExploreView.currentCollection.trigger("update");                                           
                                    }catch(e){}
                                 
                                });
                            }
                            me.checkNav();
                        });
                        progressWindow.on("ready", function() {
                            me.collection.setStopProcess(false);
                            var tempList = [];
                            if (item.value == 2) {//导入的是文件
                                res.info && res.info.list.forEach(function(file) {
                                    tempList.push({
                                        destPath : file.path,
                                        parentId : currentId,
                                        remotePath : model.get("remotePath")
                                    });
                                });
                            } else {
                                tempList.push({
                                    destPath : res.path,
                                    parentId : currentId,
                                    remotePath : model.get("remotePath")
                                });
                            }
                            me.collection.proccessImport(tempList, 0, length);
                        });
                        progressWindow.on("close",function(){
                            me.processWindowInstance=null;  
                        });       
                                     
                        me.processWindowInstance=progressWindow;
                          
                        progressWindow.on("cancel", function() {
                            me.collection.setStopProcess(true, "import", {
                                remotePath : model.get("remotePath")
                            });
                                me.onRefresh();
                        });
                        progressWindow.open();
                    }
                }
            });
        },
        onExport : function() {
            var selIds = Object.keys(this.fileExploreView.currentCollection.getSelectedMap());
            var submitObj = [];
            var successList = [];
            var failedList = [];
            var me = this;
            me.collection.setStopProcess(false);
            _.each(selIds, function(id) {
                var model = me.fileExploreView.currentCollection.getModelById(id);
                submitObj.push(model.data);
            });
            app.dal.request({
                action : apiNames.REQ_POPUO_SAVE_DIALOG,
                callback : function(res) {
                    if (res.status !== 1 || res.exist == 0) {
                        return;
                    } else {
                        var path = res.path + "\\";
                        var processWindow = new ProcessWindow({
                            header : "common.Export",
                            doingTitle : "fileManager.exportingTitle",
                            successTitle : "common.exportSuccess",
                            retryLabel : "common.retryText",
                            total : submitObj.length,
                            autoDestroy : 1,
                            retriable : false
                        });
                        processWindow.setOpenPath(path);
                        
                        processWindow.on("ready", function() {
                            me.collection.exportFiles(submitObj, path, function() {
                            });
                            var failedText = "";
                            me.collection.off("exporting").on("exporting", function(current, total, id, success) {
                                processWindow.doProgress(current, total, id, success);
                                if (success && current >= 1) {
                                    if (id) {
                                        successList.push(id);
                                    }
                                } else if (current >= 1) {
                                    if (id) {
                                        failedList.push(id);
                                        failedText += id.name + "<br/>";
                                    }
                                }
                                if (current == total) {
                                    if (successList.length > 0&&failedList.length == 0) {//有成功结果，提示
                                        processWindow.setStSuccessTitle('common.exportSuccess');
                                        processWindow.setSuccessList(successList);
                                    } else if (failedList.length == 0 && successList.length == 0) {//如果全被取消，自动关闭
                                        processWindow.close();
                                    } else if (failedList.length > 0) {
                                        processWindow.setFailedTitle(i18nDi.fillDomText('fileManager.exportFailed', total - failedList.length, failedList.length));
                                        processWindow.showDetailInfo(failedText);
                                    }
                                }
                            });
                        });
                        processWindow.on("close",function(){
                            me.processWindowInstance=null;
                        });
                        me.processWindowInstance=processWindow;
                        processWindow.on("cancel", function() {
                            me.collection.setStopProcess(true, "export", {
                                destPath : path
                            });
                        });
                        processWindow.open();
                    }
                }
            });
        },
        /*
         *@description 删除内容，
         * case 1：
         *    当只有一条记录时，确认后直接删除，失败弹窗提示
         * case 2：
         *   当选中的记录多于一个时，确认后弹窗走进度删除，失败也给出弹窗提示
         * step 1：记录删除的id
         * step 2：调用collection的deleteFile方法
         * step 3：监听delete的事件，如果成功，删除右侧列表currentCollection中数据，删除this.copyData中相应数据
         * step 4：如果有失败，给出失败弹窗
         * */        
        onDelete : function() {
            var me = this;
            var failedList = [];
            var failedText = "";
            me.collection.setStopProcess(false);
            //确认删除弹窗
            var confirmDlg = new UIDialog({
                buttonKey : 3, //1双按钮，2有ok按钮
                contentConfig : {
                    i18nValues : ["fileManager.sureDelete"]
                },
                title : 'common.Delete',
                isTitleKey : true
            });
            confirmDlg.show();
            confirmDlg.on("yes", function() {
                var selIds = Object.keys(me.fileExploreView.currentCollection.getSelectedMap());
                var submitObj = [];
                _.each(selIds, function(id) {
                    var model = me.fileExploreView.currentCollection.getModelById(id);
                    submitObj.push(model.data);
                });
                if (submitObj.length == 1) {
                        me.collection.deleteFile(submitObj);
                        me.collection.off("deleting").on("deleting", function(current, total, res, success) {
                            var model = me.fileExploreView.currentCollection.getModelById("genie_file_" + res.id);
                            me.copyData && me.copyData.forEach(function(dataTemp, index) {
                                if (dataTemp.id == res.id) {
                                    me.copyData.splice(index, 1);
                                }
                            });
                            if (model) {
                                me.fileExploreView.currentCollection.remove(model);
                            }
                            /*删除失败的弹窗*/
                            if(!success){
                                var failedCtn=_.template(me.getTpl("tpl-file-single-failed"),{
                                    failedText:res.remotePath.substring(res.remotePath.lastIndexOf("/") + 1),
                                    failedTitle:i18nDi.fillDomText('fileManager.deleteFailed', 0, 1)
                                });
                                var confirmDlg = new UIDialog({
                                    buttonKey : 2, //1双按钮，2有ok按钮
                                    title : 'common.Delete',
                                    height:180,
                                    isTitleKey : true
                                });    
                                confirmDlg.setContent(failedCtn);   
                                confirmDlg.show();                         
                            }
                        });                        
                } else {
                    var processWindow = new ProcessWindow({
                        header : "common.Delete",
                        doingTitle : "fileManager.deletingTitle",
                        successTitle : "fileManager.deleteSuccess",
                        failedTitle : "common.failedLabel",
                        autoDestroy : 3,
                        total : submitObj.length,
                    });
                    processWindow.on("ready", function() {
                        me.collection.deleteFile(submitObj);
                        me.collection.off("deleting").on("deleting", function(current, total, res, success) {
                            processWindow.doProgress(current, total, res, success);
                            if (!success && res) {
                                failedList.push(res);
                                failedText += res.remotePath.substring(res.remotePath.lastIndexOf("/") + 1) + "<br/>";
                            }
                            var model = me.fileExploreView.currentCollection.getModelById("genie_file_" + res.id);
                            me.copyData && me.copyData.forEach(function(dataTemp, index) {
                                if (dataTemp.id == res.id) {
                                    me.copyData.splice(index, 1);
                                }
                            });
                            if (model) {
                                me.fileExploreView.currentCollection.remove(model);
                            }
                            if (current == total && failedList.length > 0) {
                                processWindow.setFailedTitle(i18nDi.fillDomText('fileManager.deleteFailed', total - failedList.length, failedList.length));
                                processWindow.showDetailInfo(failedText);
                            }
                        });
                    });
                    
                    
                    processWindow.on("close",function(){
                        me.processWindowInstance=null;
                    });
                    me.processWindowInstance=processWindow;
                    
                    processWindow.on("cancel", function() {
                        me.collection.setStopProcess(true, "delete");
                    });
                    processWindow.open();

                }
            });

        },
        onCopy : function() {
            var copyIds = Object.keys(this.fileExploreView.currentCollection.getSelectedMap());
            this.copyData = [];
            var me = this;
            copyIds.forEach(function(modelId) {
                me.copyData.push(me.fileExploreView.currentCollection.getModelById(modelId).data);
            });
        },
        /*
         *@description 粘贴文件或文件夹，粘贴来源记录在this.copyData数组中，
         * 每次均复制一份this.copyData，刷新时清空该数组
         * */
        onPaste : function() {
            var me = this;
            var curId = this.fileExploreView.getCurrentId();
            var totalLength = this.copyData.length;
            var failedList = [];
            var failedText = "";
            if (totalLength < 1) {
                return;
            }
            var processWindow = new ProcessWindow({
                header : "tools.copy",
                doingTitle : "fileManager.copingTitle",
                successTitle : "fileManager.copySuccess",
                failedTitle : "common.failedLabel",
                cancelAble : totalLength == 1 ? false : true,
                total : totalLength,
            });
            processWindow.on("ready", function() {
                me.collection.setStopProcess(false);
                var copyDataTemp = [];
                me.copyData.forEach(function(item) {
                    copyDataTemp.push(item);
                });
                
                me.collection.off("coping").on("coping", function(current, total, dataInfo, success) {
                     processWindow.doProgress(current, total, dataInfo, success);
                    if (success && dataInfo) {
                        var model = new FileManagerModel.Model(dataInfo);
                        if (me.fileExploreView.currentCollection.getModelById("genie_file_" + dataInfo.id)) {
                            me.fileExploreView.currentCollection.getModelById("genie_file_" + dataInfo.id).setProperty("id", model.getId());
                            me.fileExploreView.currentCollection.getModelById("genie_file_" + dataInfo.id).data = model.data;
                        } else {
                            me.fileExploreView.currentCollection.push(model);
                        }
                        me.fileExploreView.currentCollection.trigger("update");
                    } else {
                        if (dataInfo) {
                            failedList.push(dataInfo);
                            failedText += (dataInfo.name || dataInfo) + "<br/>";
                        }
                    }
                    if (current == total && failedList.length > 0) {
                        processWindow.setFailedTitle(i18nDi.fillDomText('fileManager.copyFailed', total - failedList.length, failedList.length));
                        processWindow.showDetailInfo(failedText);
                    }
                });
                me.collection.processCopyFile(copyDataTemp, me.collection.getModelById("genie_file_" + curId).get("remotePath"), 0, me.copyData.length);
            });
            processWindow.on("cancel", function() {
                me.collection.setStopProcess(true);
                me.fileExploreView.currentCollection.trigger("update");
            });
            
            processWindow.on("close", function() {
                me.collection.setStopProcess(true);
                me.fileExploreView.currentCollection.trigger("update");
                me.processWindowInstance=null;
            });
            me.processWindowInstance=processWindow;
            processWindow.open();
        },
        onFileExploreClick : function(event) {
            var me = this;
            var curNode = $(event.target).is(".node")?$(event.target):$(event.target).parents(".nav-left-li").parent(".node");
            this.importMenu && this.importMenu.hide();
            if(!this.collection.responsed){
                return;
            }
            var id = curNode.attr("id");
            this.onFileExplore(this.collection.getModelById("genie_file_" + id).data);
            event.stopPropagation();
        },
        onFileExplore:function(nodeObj,param){
            var me=this;
           
            me.el.find(".left-nav").find(".node").removeClass("cur");
            var curNode = me.el.find(".left-nav").find("#"+nodeObj.id);
            curNode.addClass("cur");
            
            if(nodeObj.id==this.fileExploreView.currentId){
                return;
            }
            var model = me.collection.getModelById("genie_file_" + nodeObj.id);
            if(!param||!param.fromHistory){
                this.exploreHistory.push(nodeObj.id);    
                this.exploreHistoryIndex++;
            }
            if (!me.collection.hasChildDir(model.data)) {
                me.collection.getNodeList({
                    parentId : nodeObj.id,
                    remotePath : model.get("remotePath")
                }, function(nodeData) {
                    me.fileExploreView.showNodeList(nodeObj.id, nodeData);
                    me.checkNav();
                });
            } else {
                var nodeList = [];
                me.collection.models.forEach(function(modelItem) {
                    if (modelItem.get("parentPath") == model.get("remotePath")) {
                        nodeList.push(modelItem.data);
                    }
                });
                me.fileExploreView.showNodeList(nodeObj.id, nodeList);
                me.checkNav();
            }            
        },
        onDblClickNode : function(event) {
            clearTimeout(this.clickTimer);
            var me = this;
            this.clickTimer = setTimeout(function() {
                var curNode = $(event.target).is(".node") ? $(event.target) : $(event.target).parents(".node");
                var id = curNode.attr("id");
                var model = me.collection.getModelById("genie_file_" + id);
                if (model.get("opened")) {
                    me.onFoldNode(model.data);
                } else if (model.get("hasChildDir") || model.get("type") == 0 || model.get("type") == 1 || model.get("type") == 2) {
                    me.onExpandTree(model.data, {
                        cache : true
                    });
                }
            }, 200);
        },
        onExpandRootClick : function(event) {
            var curNode = $(event.target).is(".root-node") ? $(event.target) : $(event.target).parents(".root-node");
            var parentId = curNode.attr("id");
            var model = this.collection.getModelById("genie_file_" + parentId);
            this.onExpandRoot(model.data);
            event.stopPropagation();
        },
        onExpandRoot : function(rootObj, params) {
            var me = this;
            if (!this.deviceNode) {
                this.deviceNode = this.el.find(".deviceNodes>.childNode");
            }
            if (!this.sdCardNode) {
                this.sdCardNode = this.el.find(".sdcardRoot>.childNode");
            }
            if (!this.extSdNode) {
                this.extSdNode = this.el.find(".extSdcardRoot>.childNode");
            }
            var rootTree;
            var height = this.el.find(".left-nav").height() - this.el.find(".root-node").length * this.el.find(".root-node").height();
            var model = me.collection.getModelById("genie_file_" + rootObj.id);
            model.set("opened", true);
            if (rootObj.type == 0) {/*内置sd卡*/
                rootTree = this.sdCardNode;
                $(".sdcardRoot").children(".nav-left-li").children(".ico-open-close").removeClass("ico-expand").addClass("ico-fold");
            } else if (rootObj.type == 1) {/*外置sd卡*/
                rootTree = this.extSdNode;
                $(".extSdcardRoot").children(".nav-left-li").children(".ico-open-close").removeClass("ico-expand").addClass("ico-fold");
            } else if (rootObj.type == 2) {/*默认*/
                rootTree = this.deviceNode;
                $(".deviceRoot").children(".nav-left-li").children(".ico-open-close").removeClass("ico-expand").addClass("ico-fold");
            }

            if (params && params.cache) {
                var nodeList = [];
                this.collection.models.forEach(function(modelItem) {
                    if (modelItem.get("parentId") == rootObj.id) {
                        nodeList.push(modelItem.data);
                    }
                });
                rootTree.html(_.template(me.sidebarNode_tpl, {
                    data : nodeList,
                    I18N : i18nDi
                }));
                if (nodeList.length > 0) {
                    model.set("opened", true);
                    me.fileExploreView.showNodeList(rootObj.id, nodeList);
                    rootTree.children(".childNode").show();
                }else{
                    me.showEmpty();
                }
            } else {
                this.collection.getNodeList({
                    parentId : rootObj.id,
                    remotePath : rootObj.remotePath
                }, function(nodeData) {
                    if (!nodeData) {
                        console.log("空数据");
                        me.showEmpty();
                        return;
                    }
                    rootTree.html(_.template(me.sidebarNode_tpl, {
                        data : nodeData,
                        I18N : i18nDi
                    }));

                    if (nodeData.length > 0) {
                        model.set("opened", true);
                        rootTree.children(".childNode").show();
                        me.fileExploreView.showNodeList(rootObj.id, nodeData);
                    }else{
                        me.showEmpty();
                    }
                });
            }

        },
        onExpandTreeClick : function(event) {
            var curNode = $(event.target).parent(".nav-left-li").parent(".node");
            var model = this.collection.getModelById("genie_file_" + curNode.attr("id"));
            model.set("opened", true);
            if (this.collection.hasChildDir(model.data)) {
                this.onExpandTree(model.data, {
                    cache : true
                });
            } else {
                this.onExpandTree(model.data, {
                    cache : false
                });
            }
            event.stopPropagation();
        },
        /*
         *@description 递归展开导航树
         * @step 1 找到当前节点的父节点，
         * @step 2 如果当前父节点未展开，先递归展开父节点
         * @step 3 找到当前节点，展开当前节点，设置展开标识opened为true
         * @step 4 滚动到当前节点
         * */
        onExpandTree : function(nodeObj, param) {
            var parentId = nodeObj.id;
            var model = this.collection.getModelById("genie_file_" + parentId);
            var nodeList = [];
            var me = this;

            var parentModel = this.collection.getModelById("genie_file_" + model.get("parentId"));
            if (parentModel && !parentModel.get("opened")) {
                if (parentModel.get("type") == 1 || parentModel.get("type") == 0 || parentModel.get("type") == 2) {
                    me.onExpandRoot(this.collection.getModelById("genie_file_" + model.get("parentId")).data, {
                        cache : true
                    });
                } else {
                    me.onExpandTree(this.collection.getModelById("genie_file_" + model.get("parentId")).data, {
                        cache : true
                    });
                }
            }

            var curNode = $(".node").filter("#" + nodeObj.id);
            if (param && param.cache) {
                this.collection.models.forEach(function(modelItem) {
                    if (modelItem.get("parentId") == parentId) {
                        nodeList.push(modelItem.data);
                    }
                });
                if (nodeList.length < 1) {
                    return;
                }
                curNode.children(".childNode").html(_.template(me.sidebarNode_tpl, {
                    data : nodeList,
                    I18N : i18nDi
                }));
                curNode.children(".childNode").show();
                if (me.collection.hasChildDir(model.data)) {
                    curNode.children(".nav-left-li").children(".ico-open-close").removeClass("ico-expand").addClass("ico-fold");
                } else {
                    curNode.children(".nav-left-li").children(".ico-open-close").removeClass("ico-expand").removeClass("ico-fold");
                }
                if (curNode.offset()&&curNode.offset().top >= me.el.find(".left-nav .root").height()) {
                    curNode[0].scrollIntoView();
                }
            } else {
                this.collection.getNodeList({
                    parentId : parentId,
                    remotePath : model.get("remotePath")
                }, function(nodeData) {
                    if (nodeData.length < 1) {
                        return;
                    }
                    curNode.children(".childNode").html(_.template(me.sidebarNode_tpl, {
                        data : nodeData,
                        I18N : i18nDi
                    }));
                    curNode.children(".childNode").show();
                    if (me.collection.hasChildDir(model.data)) {
                        curNode.children(".nav-left-li").children(".ico-open-close").removeClass("ico-expand").addClass("ico-fold");
                    } else {
                        curNode.children(".nav-left-li").children(".ico-open-close").removeClass("ico-expand").removeClass("ico-fold");
                    }
                    if (curNode.offset()&&curNode.offset().top >= me.el.find(".left-nav .root").height()) {
                        curNode[0].scrollIntoView();
                    }
                });
            }
            if (me.collection.hasChildDir(model.data)) {
                model.set("opened", true);
            }

        },
        checkNav : function() {
            var me = this;
            this.toobar = this.el.find(".g-toolbar");
            this.navbar=this.el.find(".nav-tool-bar");
            this.infoBox = this.el.find(".sd-detail-box");
            var folderNum = 0;
            var fileNum = 0;
            if (this.fileExploreView && this.fileExploreView.currentCollection&&this.fileExploreView.currentId){
                var ids = Object.keys(this.fileExploreView.currentCollection.getSelectedMap());
                if (ids.length < 1) {
                    this.toobar.find(".btn-export").attr("disabled", true);
                    this.toobar.find(".btn-copy").attr("disabled", true);
                    this.toobar.find(".btn-delete").attr("disabled", true);
                    /*显示当前导航文件夹下的文件和文件夹数目*/
                    var data = this.collection.getModelById("genie_file_" + this.fileExploreView.currentId).data;
                    /*sd卡或者device根节点*/
                    if (data.type == 0 || data.type == 1 || data.type == 2) {
                        var rootName = data.name;
                        if (data.type == 0) {
                            rootName = i18nDi.fillDomText("fileManager.sdCard");
                        } else if (data.type == 1) {
                            rootName = i18nDi.fillDomText("fileManager.extSdCard");
                        } else if (data.type == 2) {
                            rootName = i18nDi.fillDomText("fileManager.deviceText");
                        }
                        this.infoBox.find(".sd-box").find(".name").html(rootName);
                        this.collection.getRootNodes(function(res){
                            var totalSize = data.totalSize;
                            var avaliableSize = data.avaliableSize;
                            me.infoBox.find(".sd-box").find(".progress").css("width", (totalSize - avaliableSize) / totalSize * 100 + "%");
                            if ((totalSize - avaliableSize) / totalSize * 100 >= 85) {
                                me.infoBox.find(".sd-box").find(".progress").addClass("alarm");
                            } else {
                                me.infoBox.find(".sd-box").find(".progress").removeClass("alarm");
                            }
                            me.infoBox.find(".sd-box").find(".usage").html(i18nDi.fillDomText("fileManager.sdCardUsage", utils.convertSizeToString(totalSize * 1024), utils.convertSizeToString(avaliableSize * 1024)));                            
                        });

                        me.infoBox.find(".sd-box").show().siblings().hide();

                    } else {
                        /*选中左侧普通文件夹*/
                        folderNum = 0;
                        fileNum = 0;
                        me.fileExploreView.currentCollection.models && me.fileExploreView.currentCollection.models.forEach(function(model) {
                            if (model.get("isDirectory")) {
                                folderNum += 1;
                            } else {
                                fileNum += 1;
                            }
                        });
                        //console.log("选中的是普通文件夹" + folderNum + ";" + fileNum);
                        this.infoBox.find(".multiSelect .info-sp").html(i18nDi.fillDomText("fileManager.selectDirectoryInfo", folderNum, fileNum));
                        this.infoBox.find(".multiSelect").show().siblings().hide();
                    }

                } else {
                    /*右侧选中的数目多于1个*/
                    this.toobar.find(".btn-export").removeAttr("disabled");
                    this.toobar.find(".btn-copy").removeAttr("disabled");
                    this.toobar.find(".btn-delete").removeAttr("disabled");
                    if (ids.length == 1) {
                        /*显示当前选中文件的基本信息*/
                        this.singleSelectTpl = this.getTpl("tpl-file-single-selected");
                        var data = this.fileExploreView.currentCollection.getModelById(ids[0]).data;
                        var dom = _.template(this.singleSelectTpl, {
                            I18N : i18nDi,
                            data : data
                        });
                        this.infoBox.find(".singleSelect").html(dom).show().siblings().hide();
                        if (data.isDirectory) {
                            this.infoBox.find(".singleSelect").find(".size").hide();
                        } else {
                            this.infoBox.find(".singleSelect").find(".size").show();
                        }
                    } else {
                        /*显示当前选中文件的信息*/
                        folderNum = 0;
                        fileNum = 0;
                        ids.forEach(function(id) {
                            var model = me.fileExploreView.currentCollection.getModelById(id);
                            if (model.get("isDirectory")) {
                                folderNum += 1;
                            } else {
                                fileNum += 1;
                            }
                        });
                        this.infoBox.find(".multiSelect  .info-sp").html(i18nDi.fillDomText("fileManager.selectMultiInfo", folderNum, fileNum));
                        this.infoBox.find(".multiSelect").show().siblings().hide();
                    }
                }
                if (me.copyData && me.copyData.length > 0) {
                    me.toobar.find(".btn-paste").removeAttr("disabled");
                } else {
                    me.toobar.find(".btn-paste").attr("disabled", "disabled");
                }
            }
            if(this.exploreHistory.length<=1){
                this.navbar.find(".btn-back").attr("disabled",true);
                this.navbar.find(".btn-forward").attr("disabled",true);
            }else{
                if(this.exploreHistoryIndex>0){
                    this.navbar.find(".btn-back").removeAttr("disabled");
                    if(this.exploreHistoryIndex<this.exploreHistory.length-1){
                        this.navbar.find(".btn-forward").removeAttr("disabled");
                    }else{
                        this.navbar.find(".btn-forward").attr("disabled",true);  
                    }
                }else{
                    //滚动到第一个元素，不允许后退，只允许前进
                    this.navbar.find(".btn-back").attr("disabled",true);
                    this.navbar.find(".btn-forward").removeAttr("disabled");  
                }
            }
        },
        onFoldTree : function(event) {
            var curNode = $(event.target).parents(".nav-left-li").parent(".node");
            var id = curNode.attr("id");
            var model = this.collection.getModelById("genie_file_" + id);
            this.onFoldNode(model.data);
            event.stopPropagation();
        },
        /*
         *@description 递归折叠导航树
         * @step 1 找到当前节点，并将当前节点opened标志设为false，
         * @step 2 找到当前节点所有子节点，opened全部设为false
         * @step 3 清空当前节点
         * */
        onFoldNode : function(nodeObj) {
            var me = this;
            var model = this.collection.getModelById("genie_file_" + nodeObj.id);
            model.set("opened", false);
            var curNode = $("#" + nodeObj.id);
            this.collection.models.forEach(function(modelItem) {
                if (modelItem.get("parentId") == model.get("id")) {
                    modelItem.set("opened", false);
                }
            });
            curNode.addClass("cur").siblings().removeClass("cur");
            curNode.children(".childNode").empty();
            if (me.collection.hasChildDir(model.data)) {
                curNode.children(".nav-left-li").children(".ico-open-close").removeClass("ico-fold").addClass("ico-expand");
            } else {
                curNode.children(".nav-left-li").children(".ico-open-close").removeClass("ico-fold").removeClass("ico-expand");
            }
        }
    });
    exports.FileManagerMainView = FileManagerMainView;
});
