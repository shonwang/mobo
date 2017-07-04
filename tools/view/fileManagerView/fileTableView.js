/**
 * @author liujintao
 * @descript 文件浏览器，表格形式展示视图
 * @since 2014-03-13
 */
define("FileTableView", function(require, exports, module) {
    var app = require("app");
    var $ = require("jquery");
    var _ = require("underscore");
    var SuperGrid = require("grid");
    var gridModel = require("gridModel");
    var Utils = require("utils");
    var FileModel = require("FileManagerModel");
    /*国际化字典工具*/
    var i18nDi = require('I18NDI');
    var Loading = require('loading');
    var UIDialog = require('UIDialog');
    var ProgressWindow = require("ProgressPanel");
    
    var FileListItemView = app.ViewBase.extend({
        module : module,
        init : function(model) {
            this.model = model;
        },
        render : function(target) {
            var tpl = this.getTpl("tpl-file-list-item");
            var dom = target.find(".file-list-item");
            if (dom.length == 0) {
                dom = $(_.template(tpl, {
                    data : this.model.data
                }));
                target.html(dom);
                dom = target.find(".file-list-item");
            }
            dom.attr("id", this.model.data.id);
            dom.attr("parentId", this.model.data.parentId);
            dom.find(".icon-file-type").attr("src", this.model.data.iconPath);
            dom.find(".name").val(this.model.data.name);
            if (this.model.data.editable) {
                dom.find(".name").removeAttr("readonly");
                dom.find(".name").addClass("editable").addClass("com-text");
                dom.find(".name").focus();
            } else {
                dom.find(".name").attr("readonly", true);
                dom.find(".name").removeClass("editable").removeClass("com-text");
            }
            dom.find(".type").html(this.model.data.type);
            dom.find(".size").html(this.model.data.realSize);
            if (this.model.data.isDirectory) {
                dom.find(".size").css("visibility", "hidden");
            } else {
                dom.find(".size").css("visibility", "visible");
            }
            dom.find(".modifyDate").html(this.model.data.realModifiedTime);
        }
    });
    /*有一个统一的数据collection，而列表中使用的是currentCollection，监听collection，当变化时，currentCollection做相应变化*/
    var FileTableView = app.ViewBase.extend({
        module : module,
        events : {
            'blur -> .file-list-item .name.com-text' : 'onEditorBlur',
            'click -> .file-list-item .name[readonly]' : 'onEditorFocus',
            'contextmenu ->.file-list-item .name' : 'onContext',
            'dblclick -> .file-list-item' : 'onDoubleClick',
            'keyup -> .file-list-item .name.com-text' : 'onEditorKeyUp'
        },
        init : function(opts) {
            this.collection = opts.collection;
            //初始化时间戳
            this.clickTimer
            this.el = opts.el;
            var me = this;
            this.currentCollection = new gridModel.Collection();
            var allCheckboxPxy = $(".g-toolbar").find('.chkbox-all');
            this.grid = new SuperGrid({
                container : this.el,
                model : [{
                    type : 'checkbox',
                    width : 54
                }, {
                    name : 'Name',
                    label : "",
                    type : 'view',
                    width : 'flex',
                    view : FileListItemView
                }],
                showLabel : false,
                rowHeight : 42,
                checboxDelegate : allCheckboxPxy,
                collection : this.currentCollection
            });
            this.grid.on(SuperGrid.ROW_SELECTED, function(model) {
                me.trigger("selectChange", model);
            });
            this.grid.on(SuperGrid.ROW_UNSELECTED, function(model) {
                me.trigger("selectChange", model);
            });
            this.grid.on(SuperGrid.ROW_SELECTED_ALL, function(selected) {
                me.trigger("selectChange", selected);
            });
            this.loading = new Loading();
            this.loading.render(this.el);
            this.loading.show();
        },
        onContext : function(event) {
            event.stopPropagation();
            event.cancelBubble = true
            event.returnValue = false;
            return false;
        },
        onDoubleClick : function(event) {
            if ($(event.target).is(".com-text")) {
                return;
            }
            var _target = $(event.target).is(".file-list-item") ? $(event.target) : $(event.target).parents(".file-list-item");
            var id = _target.attr("id");
            var me = this;
            clearTimeout(this.clickTimer);
            this.clickTimer = setTimeout(function() {
                var model = me.currentCollection.getModelById("genie_file_" + id);
                if (model.get("isDirectory")) {
                    me.collection.getNodeList({
                        parentId : id,
                        remotePath : model.get("remotePath")
                    }, function(nodeData) {
                       if(nodeData){
                           me.trigger("changePath", model.data);
                       }
                        me.showNodeList(id, nodeData);
                    });
                } else {
                       me.collection.setStopProcess(false);
                        var progressWindow = new ProgressWindow({
                            header : "fileManager.openHeader",
                            doingTitle : "fileManager.openingTitle",
                            cancelAble : true,
                            autoDestroy : 3,
                            total : 100,
                            numberType : "percent"
                        });
                        progressWindow.on("ready",function(){
                            me.collection.openFile(model.data, function(res) {
                                 console.log("打开文件的回调", res);
                                if(res.status==1){
                                    progressWindow.doProgress(res.percent/100, 1, model.get("id"), true);
                                }else if(res.finish){
                                    if(res.code==11){
                                        progressWindow.setFailedTitle( i18nDi.fillDomText("fileManager.cMemoryLess"));
                                    }else{
                                        progressWindow.setFailedTitle( i18nDi.fillDomText("fileManager.openingFailed"));
                                    }
                                    
                                    progressWindow.doProgress(1, 1, model.get("id"), false);
                                }
                            });                            
                        });
                        progressWindow.on("cancel",function(){
                            me.collection.setStopProcess(true,"open",{remotePath:model.get("remotePath"),id:model.get("id")});
                        });
                       progressWindow.open();
                }
            }, 100);
        },
        showNodeList : function(parentId, nodeList) {
            var me = this;
            this.loading.show();
            me.currentId = parentId;
            me.currentCollection.clear();
            this.currentCollection.trigger("update");
            nodeList && nodeList.forEach(function(node) {
                if (!me.currentCollection.getModelById("genie_file_" + node.id)) {
                    me.currentCollection.push(new FileModel.Model(_.extend({}, node)));
                }
            });
            this.currentCollection.trigger("update");
            this.loading.hide();
        },
        getCurrentId : function() {
            return this.currentId;
        },
        onEditorFocus : function(event) {
            event.preventDefault();
            var listItem = $(event.target).parents(".file-list-item");
            var me = this;
            var id = listItem.attr("id");
            var model = me.currentCollection.getModelById("genie_file_" + id);
            clearTimeout(this.clickTimer);
            if (!model.isSelected()) {
                listItem.trigger("click");
            } else {
                this.clickTimer = setTimeout(function() {
                    var hasEditing = false;
                    me.currentCollection.models.forEach(function(model) {
                        if (model.get("editable")) {
                            hasEditing = true;
                        }
                    });
                    if (hasEditing) {
                        return;
                    }
                    if (model.isSelected() && Object.keys(me.currentCollection.getSelectedMap()).length == 1) {
                        me.setEditFocus(model.data);
                    }
                }, 200);
            }
        },
        /*获取重命名的焦点*/
        setEditFocus : function(nodeObj) {
            var id = nodeObj.id;
            var listItem = this.el.find(".file-list-item").filter("#" + nodeObj.id);
            var me = this;
            me.currentCollection.clearSelected();
            me.currentCollection.models.forEach(function(modelItem) {
                modelItem.set("editable", false);
            });
            var model = me.currentCollection.getModelById("genie_file_" + id);
            model.set("editable", true);
            me.currentCollection.setSelected(model.getId(), true);
            me.currentCollection.trigger("update");
            listItem.find(".name").removeAttr("readonly");
            listItem.find(".name").addClass("editable").addClass("com-text");
            setTimeout(function() {
                listItem.find(".name").focus().select();
            }, 50);

        },
        onEditorKeyUp : function(event) {
            var me = this;
            if (event.keyCode == 13) {
                var listItem = $(event.target).parents(".file-list-item");
                var id = listItem.attr("id");
                var model = this.currentCollection.getModelById("genie_file_" + id);
                if (listItem.find(".name").val().replace(/s/g, '') == '') {
                    listItem.find(".name").val(model.get("name"));
                }
                if (this.collection.hasExistFile(model.get("parentPath") + "/" + listItem.find(".name").val()) && model.get("name") != listItem.find(".name").val()) {
                    var confirmDlg = new UIDialog({
                        buttonKey : 2, //1双按钮，2有ok按钮
                        contentConfig : {
                            i18nValues : ["fileManager.renameRepeatNotice", model.get("name")]
                        },
                        title : i18nDi.fillDomText('fileManager.renameLabel')
                    });
                    confirmDlg.show();
                    this.setEditFocus(model.data);
                } else if (listItem.find(".name").val().match(/[\:\*\?\%\|]+/g) && listItem.find(".name").val().match(/[\:\*\?\%\|]+/g).toString().length > 0) {
                    //特殊字符提示
                    var confirmDlg = new UIDialog({
                        buttonKey : 2, //1双按钮，2有ok按钮
                        contentConfig : {
                            i18nValues : ["fileManager.specailCharNotice"]
                        },
                        title : i18nDi.fillDomText('fileManager.renameLabel')
                    });
                    confirmDlg.show();
                    this.setEditFocus(model.data);
                }else  if (!model.get("isDirectory") && model.get("name").substring(model.get("name").lastIndexOf(".")) != listItem.find(".name").val().substring(listItem.find(".name").val().lastIndexOf("."))) {
                    //后缀变更提示
                    var extModifyDlg = new UIDialog({
                        buttonKey : 3, //1双按钮，2有ok按钮
                        contentConfig : {
                            i18nValues : ["fileManager.fileExtChangeNotice"]
                        },
                        title : i18nDi.fillDomText('fileManager.renameLabel')
                    });
                    extModifyDlg.show();  
                    extModifyDlg.on("yes",function(){
                        me.setEditBlur(model.data);                        
                    });
                    extModifyDlg.on("cancel",function(){
                        listItem.find(".name").val(model.get("name"));
                        me.setEditBlur(model.data);                        
                    });                 
            } else {
                    this.setEditBlur(model.data);
                }
            }
        },
        setEditBlur : function(nodeObj) {
            var listItem = this.el.find(".file-list-item").filter("#" + nodeObj.id);
            var me = this;
            var id = nodeObj.id;
            var model = this.currentCollection.getModelById("genie_file_" + id);
            //只有输入值与原值不同才重命名
            if (listItem.find(".name").val().replace(/s/g, '') == '') {
                listItem.find(".name").val(model.get("name"));
            }
            model.set("editable", false);
            listItem.find(".name").attr("readonly", true).removeClass("com-text");
            if (model.get("name") != listItem.find(".name").val()) {
                        me.collection.renameFile({
                            remotePath : model.get("remotePath"),
                            id : model.get("id"),
                            isDirectory : model.get("isDirectory"),
                            fileName : listItem.find(".name").val()
                        }, function(res) {
                            if (res.status == 1) {
                                me.trigger("idchanged");
                            } else {
                                //失败提示
                                var confirmDlg = new UIDialog({
                                    buttonKey : 2, //1双按钮，2有ok按钮
                                    contentConfig : {
                                        i18nValues : ["fileManager.renameFailed"]
                                    },
                                    title : i18nDi.fillDomText('common.failedLabel')
                                });
                                confirmDlg.show();
                            }
                        });                  
            } else {
                model.set("editable", false);
                listItem.find(".name").attr("readonly", true).removeClass("com-text");
                listItem.find(".name").blur();
            }
            me.currentCollection.trigger("update");
        },
        onEditorBlur : function(event) {
            var listItem = $(event.target).parents(".file-list-item");
            var me = this;
            var id = listItem.attr("id");
            var model = this.currentCollection.getModelById("genie_file_" + id);
            if (listItem.find(".name").val().replace(/s/g, '') == '') {
                listItem.find(".name").val(model.get("name"));
            }
            if (this.collection.hasExistFile(model.get("parentPath") + "/" + listItem.find(".name").val()) && model.get("name") != listItem.find(".name").val()) {
                //this.setEditBlur(model.data);
                var confirmDlg = new UIDialog({
                    buttonKey : 2, //1双按钮，2有ok按钮
                    contentConfig : {
                        i18nValues : ["fileManager.renameRepeatNotice", model.get("name")]
                    },
                    title : i18nDi.fillDomText('fileManager.renameLabel')
                });
                confirmDlg.show();
                this.setEditFocus(model.data);
            } else if (listItem.find(".name").val().match(/[\:\*\?\%\|]+/g) && listItem.find(".name").val().match(/[\:\*\?\%\|]+/g).toString().length > 0) {
                //特殊字符提示
                var confirmDlg = new UIDialog({
                    buttonKey : 2, //1双按钮，2有ok按钮
                    contentConfig : {
                        i18nValues : ["fileManager.specailCharNotice"]
                    },
                    title : i18nDi.fillDomText('fileManager.renameLabel')
                });
                confirmDlg.show();
                this.setEditFocus(model.data);
            }else  if (!model.get("isDirectory") && model.get("name").substring(model.get("name").lastIndexOf(".")) != listItem.find(".name").val().substring(listItem.find(".name").val().lastIndexOf("."))) {
                    //后缀变更提示
                    var extModifyDlg = new UIDialog({
                        buttonKey : 3, //1双按钮，2有ok按钮
                        contentConfig : {
                            i18nValues : ["fileManager.fileExtChangeNotice"]
                        },
                        title : i18nDi.fillDomText('fileManager.renameLabel')
                    });
                    extModifyDlg.show();  
                    extModifyDlg.on("yes",function(){
                        me.setEditBlur(model.data);                        
                    });           
                    extModifyDlg.on("cancel",function(){
                        listItem.find(".name").val(model.get("name"));
                        me.setEditBlur(model.data);                        
                    });                             
            } else {
                    this.setEditBlur(model.data);                 
            }
            event.stopPropagation();
        },
        appendEditRow : function(name, successCallback, errorCallback) {
            var me = this;
            var model = this.collection.getModelById("genie_file_" + this.currentId);
            clearTimeout(this.renameTimer);
            this.collection.createDirectory({
                remotePath : model.get("remotePath"),
                isDirectory : true,
                fileName : name
            }, function(res) {
                if (res.status == 1) {
                    var newModel = new FileModel.Model(res.info);
                    me.currentCollection.push(newModel);
                    var index = me.currentCollection.getIndex(newModel);
                    me.grid.scrollToIndex(index);
                    me.currentCollection.trigger("update");
                    me.renameTimer = setTimeout(function() {
                        me.setEditFocus(newModel.data);
                    }, 500);
                    successCallback && successCallback(res);
                } else if (res.status != 1) {
                    errorCallback && errorCallback(res);
                }
            });
        },
        destroy : function() {
            this.currentCollection.clear();
            this.currentCollection.trigger("update");
        },
        refresh : function() {
            this.loading.show();
        }
    });
    return FileTableView;
});
