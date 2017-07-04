define("UIRestore", function(require, exports, module) {
    var app = require('app');
    var   $ = require('jquery');
    var _ = require('underscore');
    var i18nDi  = require('I18NDI');
    var  utils = require('utils');
    var connection = require('connectionMgr');
    var gridModel = require('gridModel');
    var apiNames = require('APINames');
    var Collection = "";

    var RestoreItemDetailView = app.ViewBase.extend({
        module: module,
        events: {
            'click -> .checkbox': 'onClickCheckBox'
        },

        init: function(opts){
            var template = _.template(this.getTpl('tpl-restore-detail-item-view'), {I18N: i18nDi});
            this.el = $(template);

            console.log(this.el.get(0));
            this.model = opts.model;

            var checkbox = this.el.find(".checkbox");
            switch(this.model.data.type){
                case "picture":
                  this.el.find(".name").html(i18nDi.fillDomText('backupRestore.picLabel'));
                  this.el.find(".icon-tools").addClass("ico-tools-picture");
                  break;
                case "music":
                  this.el.find(".name").html(i18nDi.fillDomText('backupRestore.musicLabel'));
                  this.el.find(".icon-tools").addClass("ico-tools-music");
                  break;
                case "video":
                  this.el.find(".name").html(i18nDi.fillDomText('backupRestore.videoLabel'));
                  this.el.find(".icon-tools").addClass("ico-tools-video");
                  break;
                case "app":
                  this.el.find(".name").html(i18nDi.fillDomText('backupRestore.appLabel'));
                  this.el.find(".icon-tools").addClass("ico-tools-app");
                  break;
                // case "callRecord":
                //   this.el.find(".name").html(i18nDi.fillDomText('backupRestore.callRegordsLabel'));
                //   this.el.find(".icon-tools").addClass("ico-tools-records");
                //   break;
                case "message":
                  this.el.find(".name").html(i18nDi.fillDomText('backupRestore.messageLabel'));
                  this.el.find(".icon-tools").addClass("ico-tools-message");
                  this.el.find(".size").hide();
                  break;
                case "contact":
                  this.el.find(".name").html(i18nDi.fillDomText('backupRestore.contactLabel'));
                  this.el.find(".icon-tools").addClass("ico-tools-contact");
                  this.el.find(".size").hide();
                  break;
            }
            this.el.find(".num").html(this.model.data.count);
            size = utils.convertSizeToString(this.model.data.size);
            this.el.find(".size").html(size);
            this.el.attr("data-type", this.model.data.type);
            
            this.el.on('click', $.proxy(function(event){
                if (event.target.tagName !== "INPUT"){
                    this.el.find(".checkbox").click();
                }
                Collection.trigger('update');
            }, this));

            if (this.model.data.count === 0){
                this.el.hide();
                checkbox.get(0).checked = false;
            } else {
                Collection.setSelected(this.model.getId(), true);
            }
        },

        onClickCheckBox: function(event){
            var isChecked = $(event.target).get(0).checked;
            Collection.setSelected(this.model.getId(), isChecked);
        },

        render: function(target){
            this.el.appendTo(target);
        }
    });

    var RestoreItemView = app.ViewBase.extend({
        module: module,
        events: {},

        init: function(opts){
            var template = _.template(this.getTpl('tpl-restore-item-view'), {I18N: i18nDi});
            this.el = $(template);
            this.options = opts;
            switch(this.options.type){
                case "picture":
                  this.el.find(".icon").addClass("ico-picture");
                  break;
                case "music":
                  this.el.find(".icon").addClass("ico-music");
                  break;
                case "video":
                  this.el.find(".icon").addClass("ico-video");
                  break;
                case "app":
                  this.el.find(".icon").addClass("ico-app");
                  break;
                // case "callRecord":
                //   this.el.find(".icon").addClass("ico-records");
                //   break;
                case "message":
                  this.el.find(".icon").addClass("ico-message");
                  break;
                case "contact":
                  this.el.find(".icon").addClass("ico-contact");
                  break;
            }    
            this.el.find(".number").html(this.options.count);
            if (this.options.count === 0){
                this.el.hide();
            }
        },

        render: function(target){
            this.el.appendTo(target);
        }
    });


    var RestoreFileItemView = app.ViewBase.extend({
        module: module,
        events: {
            'click -> .radio': 'onClickRadio',
            'click -> .file-name': 'onClickFileName',
        },

        init: function(opts){
            var template = _.template(this.getTpl('tpl-restore-file-item-view'), {I18N: i18nDi});
            this.el = $(template);
            if (opts.isDefaultChecked === true){
                this.el.find(".radio").get(0).checked = true;
                this.el.addClass("cur");
            }
            this.model = opts.model;
            this.options = opts;
            this.el.find(".file-name").html(this.model.fileName);
            this.el.find(".time").html(this.model.backupTime);   
            this.initRestoreItem();
        },

        initRestoreItem: function(){
            var allInfoKeys = Object.keys(this.model);
            for (var i = 0; i < allInfoKeys.length; i++){
                if (allInfoKeys[i] !== "fileName" &&
                    allInfoKeys[i] !== "backupTime" &&
                    allInfoKeys[i] !== "localPath"){
                    var options = {
                        type: allInfoKeys[i],
                        count: this.model[allInfoKeys[i]].count,
                        size: this.model[allInfoKeys[i]].size,
                    };
                    var restoreItem = new RestoreItemView(options);
                    restoreItem.render(this.el.find(".restore-list"));
                }
            }
        },

        onClickFileName: function(){
            this.el.find(".radio").click();
        },

        onClickRadio: function(event){
            var isChecked = $(event.target).get(0).checked;            
            Collection.currentSeleted = this.model;
            console.log(Collection.currentSeleted);
            this.trigger("click_radio", event);
        },

        render: function(target){
            this.el.appendTo(target);
        }
    });


    var RestoreView = app.ViewBase.extend({
        module: module,
        events: {
            'click -> .btn-next': 'onClickNext',
            'click -> .pre-link': 'onClickPrevious',
            'click -> .btn-restore': 'onClickRestore',
            'click -> .btn-restore-folder': 'onClickChange',
            'click -> .btn-close': 'onFinished',
            'click -> .btn-cancel': 'onFinished'
        },

        init: function(opts){
            Collection = opts.collection;
            var template = _.template(this.getTpl('tpl-restore-view'), {I18N: i18nDi});
            this.el = $(template);
            this.getDefaultPath();
            this.isRestoring = false;
            this.options = opts;
            this.el.find(".backup-footer .btn-next").attr("disabled", "disabled");
            this.el.find(".restore-no-file").hide();
            this.el.find(".btn-cancel").hide();

            Collection.on('update', function(){
                var allIDKeys = Object.keys(Collection.getSelectedMap());
                if (allIDKeys.length > 0){
                    this.el.find(".backup-footer .btn-restore").removeAttr("disabled");
                } else {
                    this.el.find(".backup-footer .btn-restore").attr("disabled", "disabled");
                }
            }.bind(this));

            //*********************************************************
            //20140724 新版日志
            this.isDefaultFolder = 0;

            this.getDefaultPath();
            connection.getDeviceInfo(function(){
                utils.setLogPublicFeild(true, connection.deviceInfo);
            })
            utils.setLogPublicFeild();
            if (opts.isWifi){
                utils.setlog_phonestatus(2);
            } else {
                utils.setlog_phonestatus(1);
            }   
            //document.oncontextmenu = function(){return false};
            //*********************************************************             
        },

        getDefaultPath: function(){
            var me = this;
            Collection.getDefaultBackupPath({}, function(res){
                me.defaultPath = res.DefaultBackupPath;
                me.backtoPath = me.defaultPath;
                Collection.getDefaultRestoreInfo({localPath: me.defaultPath, scanFolder: 1}, function(res){
                    if (res&&res.info){
                        res.info = Collection.sortDate(res.info);
                        Collection.defaultRestoreInfo = res.info;
                    }
                    me.initRestoreFileList();
                });
            });
        },

        initRestoreFileList: function(){
            var restoreFiles = Collection.defaultRestoreInfo;
            console.log("还原 >> 获取默认路径下的信息", restoreFiles);
            if (restoreFiles){
                this.el.find(".backup-footer .btn-next").removeAttr("disabled");
                this.el.find(".restore-no-file").hide();
                var isDefaultChecked = false;
                for (var i = 0; i < restoreFiles.length; i++){
                    if (i === 0){
                        isDefaultChecked = true;
                        Collection.currentSeleted = restoreFiles[i];
                    } else {
                        isDefaultChecked = false;
                    }
                    var options = {
                        model: restoreFiles[i],
                        isDefaultChecked: isDefaultChecked
                    };
                    if (restoreFiles[i].backupTime.toString().indexOf("/") === -1){
                        var date = new Date();
                        date.setTime(restoreFiles[i].backupTime * 1000);
                        restoreFiles[i].backupTime = date.format("dd/MM/yyyy hh:mm:ss");
                    }
                    var restoreFile = new RestoreFileItemView(options);
                    restoreFile.render(this.el.find(".restore-file-list"));
                    restoreFile.on("click_radio", $.proxy(this.onClickListItem, this));
                }
            } else {
                this.el.find(".restore-no-file").css("display", "-webkit-box");
            }
        },

        onClickListItem: function(event){
            var items = this.el.find(".restore-file-list").children("li");
            for (var i = 0; i < items.length; i++){
                $(items[i]).removeClass("cur");
                var fileName = $(items[i]).find(".file-name").html();
                var eventFileName = $(event.target).parent(".restore-file-item").find(".file-name").html();
                if (fileName === eventFileName){
                    $(items[i]).addClass("cur");
                }
            }
        },

        initRestoreItemDetail: function(){
            var data = Collection.currentSeleted;
            var allInfoKeys = Object.keys(data);
            for (var i = 0; i < allInfoKeys.length; i++){
                if (allInfoKeys[i] !== "fileName" &&
                    allInfoKeys[i] !== "backupTime" &&
                    allInfoKeys[i] !== "localPath"){
                    var model = new gridModel.Model({
                        type: allInfoKeys[i],
                        count: data[allInfoKeys[i]].count,
                        size: data[allInfoKeys[i]].size
                    });
                    Collection.push(model);
                }
            }
            console.log(Collection.models);
            for (var i = 0; i < Collection.models.length; i++){
                var options = {
                   model: Collection.models[i]
                };
                var detailItem = new RestoreItemDetailView(options);
                detailItem.render(this.el.find(".backup-list"));
            }
        },

        onClickChange: function(){
            var me = this;
            Collection.callSysFolderDialog({}, function(res){
                if (res){
                    if (res.status !== 0){
                        this.backtoPath = res.path;
                        //me.el.find(".restore-file-list").find("li").remove();
                        Collection.getDefaultRestoreInfo({localPath: res.path, scanFolder: 0}, function(resp){
                            // me.initRestoreFileList();
                            if (resp&&resp.status !== 0){
                                Collection.currentSeleted = resp.info[0];
                                me.onClickNext();
                                //*********************************************************
                                //20140724 新版日志
                                me.isDefaultFolder = 1;
                                //********************************************************* 
                                me.el.find(".restore-no-file").hide();
                            }
                        });
                    }
                }
            });
        },

        onClickNext: function(){
            this.el.find(".select-label").hide();
            this.el.find(".btn-restore-folder").hide();
            this.el.find(".restore-file-list").hide();
            this.el.find(".btn-next").hide();

            var restoreItemList = this.el.find(".backup-list");
            restoreItemList.show();
            this.el.find(".pre-link").show();
            this.el.find(".btn-restore").show();

            var item = restoreItemList.find(".backup-item").get(0);
            if (item !== undefined){
                restoreItemList.children(".backup-item").remove();
                Collection.clear();
            }
            this.initRestoreItemDetail();
            Collection.trigger("update");
        },

        onClickPrevious: function(){
            this.el.find(".select-label").show();
            this.el.find(".btn-restore-folder").show();
            this.el.find(".restore-file-list").show();
            this.el.find(".btn-next").show();

            this.el.find(".backup-list").hide();
            this.el.find(".pre-link").hide();
            this.el.find(".btn-restore").hide();
            var restoreItemList = this.el.find(".restore-file-list");
            if (restoreItemList.children("li").length === 0){
                this.el.find(".restore-no-file").css("display", "-webkit-box");
            }
        },

        setItemVisibilityByCheckBox: function(){
            var items = this.el.find(".backup-list").children(".backup-item");
            for (var i = 0; i < items.length; i++){
                var checkbox = $(items[i]).find(".checkbox");
                if(checkbox.get(0).checked == true){
                    $(items[i]).removeClass("hide");
                    checkbox.hide();
                    $(items[i]).find(".size").hide();
                } else {
                    $(items[i]).addClass("hide");
                }
            }
        },

        onCancelRestore: function(){
            console.log("取消！！！！！！！")
            app.dal.request({
                action : apiNames.REQ_STOP_RESTORE,
                paras : {},
                callback : function(res) {}
            });
            this.options.parentWindow.notifyParentWindow({refresh: "all"});
        },

        onClickRestore: function(){
            this.el.find(".backup-list").addClass("g-tools-box");
            this.el.find(".pre-link").hide();
            this.el.find(".btn-restore").hide();
            this.setItemVisibilityByCheckBox("hide");
            this.el.find(".restore-process").css("display", "-webkit-box");
            this.el.find(".btn-cancel").show();

             var selectedArgs = {};
            var allIDKeys = Object.keys(Collection.getSelectedMap());
            console.log("backup >> selected id: ", allIDKeys);
            this.isSuccess = {};

            //*********************************************************
            //20140724 新版日志
            var logArray = [];
            var selectedCode = 0;
            //*********************************************************

            for (var i = 0; i < allIDKeys.length; i++){
                var model = Collection.getModelById(allIDKeys[i]);
                selectedArgs[model.data.type] = {
                    count: model.data.count, 
                    size: model.data.size
                }
                this.isSuccess[model.data.type] = 0;

                //*********************************************************
                //20140724 新版日志
                switch(model.data.type){
                   case 'contact' : 
                       selectedCode = 1; 
                       break;
                   case 'message' : 
                       selectedCode = 2; 
                       break;
                   case 'picture' : 
                       selectedCode = 3;
                       break;
                   case 'app':
                       selectedCode = 4;
                       break;
                   case 'music':
                       selectedCode = 5;
                       break;
                   case 'video':
                       selectedCode = 6;
                       break;
                }
                logArray.push(selectedCode);
                //*********************************************************
            }
            selectedArgs.localPath = Collection.currentSeleted.localPath;
            //console.log("还原 >> 要还原的参数：", selectedArgs);
            // $(document.body).find(".ico-close").hide();
            // $(document.body).find(".ico-min").css("right", "0px");
            Collection.startRestore(selectedArgs, $.proxy(this.restoreProcess, this));
            this.isRestoring = true;

            //*********************************************************
            //20140724 新版日志
            var logObject = {
                class: "toolkit",
                page: "restore",
                module: "body",
                action: "restore",
                targetvalue: logArray.join(","),
                targetvaluemore: this.isDefaultFolder
            }                
            utils.sendNewLog("1000120", logObject);
            //********************************************************* 
        },

        restoreProcess: function(res){
            var $listNode = this.el.find(".backup-list");
            var type = res.type;
            var currentCount = res.currentCount;
            var total = res.total;
            if (res.info&&res.info.type !== "all"){
                if (res.info&&res.info.status !== "finish"){
                    if (res.status === 0){
                        this.isSuccess[type] = this.isSuccess[type] + 1;
                    }
                    console.log("还原 >> 类型：", type);
                    console.log("还原 >> 进度：", currentCount / total * 100 + '%');
                    var $itemNode = $listNode.find('li[data-type='+ type + ']');
                    console.log("还原 >> 查询节点 li[data-type=" + type + ']', $itemNode.get(0));
                    $itemNode.find(".tools-load").removeClass("hide");
                    $itemNode.find(".progress-bar").find("span").css("width", currentCount / total * 100 + '%');
                } else {
                    type = res.info.type;
                    var $itemNode = $listNode.find('li[data-type='+ type + ']');
                    console.log("备份 >> 查询节点 li[data-type=" + type + ']', $itemNode.get(0));
                    $itemNode.find(".tools-load").removeClass("hide");
                    $itemNode.find(".progress-bar").find("span").css("width", '100%');

                    var totalNum = $itemNode.find(".num").html();
                    $itemNode.off("click");
                    if (this.isSuccess[type] !== 0){
                        $itemNode.find(".ico-warng-small").show();
                        $itemNode.find(".num").html('<em class="c-red">' + this.isSuccess[type] + "</em>/" + totalNum);
                    } else {
                        $itemNode.find(".ico-pass-small").show();
                    }
                    this.options.parentWindow.notifyParentWindow({refresh: type});
                }
            }
            if (res.info&&res.info.type === "all" && res.info.status === "finish"){
                this.isRestoring = false;
                this.el.find(".btn-cancel").hide();
                // $(document.body).find(".ico-close").show();
                // $(document.body).find(".ico-min").css("right", "30px");
                this.el.find(".restore-process").hide();
                this.el.find(".btn-close").show();
            }
        },

        onFinished: function(){
            this.options.parentWindow.close();
        },

        render: function(target){
            this.el.appendTo(target);
            //this.initRestoreFileList();
        }
    });
    
    return RestoreView;
}); 