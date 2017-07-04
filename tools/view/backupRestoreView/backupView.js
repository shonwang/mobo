define("UIBackup", function(require, exports, module) {
    var app = require('app');
    var   $ = require('jquery');
    var _ = require('underscore');
    var i18nDi  = require('I18NDI');
    var  utils = require('utils');
    var apiNames = require('APINames');
    var connection = require('connectionMgr');
    var Collection = "";

    var BackupItemView = app.ViewBase.extend({
        module: module,
        events: {
            'click -> .checkbox': 'onClickCheckBox'
        },

        init: function(opts){
            var template = _.template(this.getTpl('tpl-backup-item-view'), {I18N: i18nDi});
            this.el = $(template);
            this.model = opts.model;
            if (//this.model.data.type == "picture" ||
                this.model.data.type == "music" ||
                this.model.data.type == "video"){
                this.el.addClass("hide");
            }
            var checkbox = this.el.find(".checkbox");
            switch(this.model.data.type){
                case "picture":
                  this.el.find(".name").html(i18nDi.fillDomText('backupRestore.picLabel'));
                  this.el.find(".icon-tools").addClass("ico-tools-picture");
                  checkbox.get(0).checked = true;
                  Collection.setSelected(this.model.getId(), true);
                  break;
                case "music":
                  this.el.find(".name").html(i18nDi.fillDomText('backupRestore.musicLabel'));
                  this.el.find(".icon-tools").addClass("ico-tools-music");
                  checkbox.get(0).checked = false;
                  break;
                case "video":
                  this.el.find(".name").html(i18nDi.fillDomText('backupRestore.videoLabel'));
                  this.el.find(".icon-tools").addClass("ico-tools-video");
                  checkbox.get(0).checked = false;
                  break;
                case "app":
                  this.el.find(".name").html(i18nDi.fillDomText('backupRestore.appLabel'));
                  this.el.find(".icon-tools").addClass("ico-tools-app");
                  checkbox.get(0).checked = false;
                  break;
                case "callRecord":
                  this.el.find(".name").html(i18nDi.fillDomText('backupRestore.callRegordsLabel'));
                  this.el.find(".icon-tools").addClass("ico-tools-records");
                  Collection.setSelected(this.model.getId(), true);
                  break;
                case "message":
                  this.el.find(".name").html(i18nDi.fillDomText('backupRestore.messageLabel'));
                  this.el.find(".icon-tools").addClass("ico-tools-message");
                  this.el.find(".size").hide();
                  Collection.setSelected(this.model.getId(), true);
                  break;
                case "contact":
                  this.el.find(".name").html(i18nDi.fillDomText('backupRestore.contactLabel'));
                  this.el.find(".icon-tools").addClass("ico-tools-contact");
                  this.el.find(".size").hide();
                  Collection.setSelected(this.model.getId(), true);
                  break;
            }
            this.el.find("input").attr("disabled", "disabled");
            this.el.find(".num").html(this.model.data.count);
            if (this.model.data.size > 0){
                size = utils.convertSizeToString(this.model.data.size);
                this.el.find(".size").html(size);
            }
            this.el.attr("data-type", this.model.data.type);

            this.el.on('click', $.proxy(function(event){
                if (event.target.tagName !== "INPUT"){
                    this.el.find(".checkbox").click();
                }
            }, this));         
        },

        onClickCheckBox: function(event){
            var isChecked = $(event.target).get(0).checked;
            Collection.setSelected(this.model.getId(), isChecked);
            Collection.trigger('update');
        },

        render: function(target){
            this.el.appendTo(target);
        }
    });


    var BackupView = app.ViewBase.extend({
        module: module,
        events: {
            'click -> .switch-link': 'onClickAdvance',
            'click -> .btn-backup': 'onClickBackup',
            'click -> .btn-cancel': 'onFinished',
            'click -> .btn-finish': 'onFinished',
            'click -> .btn-change': 'onClickChange'
        },

        init: function(opts){
            Collection = opts.collection;
            var template = _.template(this.getTpl('tpl-backup-view'), {I18N: i18nDi});
            this.el = $(template);
            
            this.options = opts;
            this.isBackuping = false;
            this.isBasic = true;
            this.isInit = false;

            Collection.initInfoCount();
            this.initBackItem();

            this.el.find(".ico-warng-small").hide();
            this.el.find(".ico-pass-small").hide();
            this.el.find(".path-input").attr("disabled", "disabled");
            this.el.find(".backup-footer .btn-backup").attr("disabled", "disabled");

            Collection.on('update', function(){
                this.updateBackItem();
                var allIDKeys = Object.keys(Collection.getSelectedMap());
                if (allIDKeys.length > 0){
                    this.el.find(".backup-footer .btn-backup").removeAttr("disabled");
                } else {
                    this.el.find(".backup-footer .btn-backup").attr("disabled", "disabled");
                }
            }.bind(this));

            Collection.getInfoCount({}, (function(res){
                if (this.isInit === false){
                    this.isInit = true;

                    if (res.backuptime !== ""){
                        if (res.backuptime.toString().indexOf("/") === -1){
                            var date = parseInt(res.backuptime) * 1000;
                            var dateObj = new Date();
                            dateObj.setTime(date);
                            this.getLastBackupTime(dateObj.format("dd/MM/yyyy hh:mm:ss"));
                        }
                        this.el.find(".last-backup-time").show();
                    } else {
                        this.el.find(".last-backup-time").hide();
                    }
                    // var allInfoKeys = Object.keys(res.info);
                    // for (var i = 0; i < allInfoKeys.length; i++){
                    //     if (res.info[allInfoKeys[i]].count !== 0){
                    //         this.el.find(".btn-backup").removeAttr("disabled");
                    //         break;
                    //     }
                    // }
                }
            }).bind(this));

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
        },

        initBackItem: function(){
            for (var i = 0; i < Collection.models.length; i++){
                var options = {
                    model: Collection.models[i]
                }
                var backitem = new BackupItemView(options);
                    backitem.render(this.el.find(".backup-list"));
            }
        },

        updateBackItem: function(){
            for (var i = 0; i < Collection.models.length; i++){
                var type = Collection.models[i].data.type;
                var $listNode = this.el.find(".backup-list");
                var $itemNode = $listNode.find('li[data-type='+ type + ']');
                $itemNode.removeAttr("disabled", "disabled");
                console.log("li[data-type=" + type + ']', $itemNode.get(0));
                $itemNode.find(".ico-loading20").hide();
                $itemNode.find(".num").html(Collection.models[i].data.count);
                size = utils.convertSizeToString(Collection.models[i].data.size);
                $itemNode.find(".size").html("(" + size + ")");
                //$itemNode.find(".num").addClass("num-w")
                $itemNode.find(".num").show();
                //$itemNode.find(".size").show();
                if (Collection.models[i].data.count === 0 ||
                    Collection.models[i].data.count === "0"){
                    $itemNode.find("input").attr("disabled", "disabled");
                    $itemNode.find("input").get(0).checked = false;
                    Collection.setSelected(Collection.models[i].getId(), false);
                } else {
                    $itemNode.find("input").removeAttr("disabled", "disabled");
                    // $itemNode.find("input").get(0).checked = true;
                    // Collection.setSelected(Collection.models[i].getId(), true);
                }
            }
        },

        getLastBackupTime: function(time){
            //this.lastBackupTime = Collection.getLastBackupTime();
            this.el.find(".time").html(time);
        },

        getDefaultPath: function(){
            var me = this;
            Collection.getDefaultBackupPath({}, function(res){
                me.defaultPath = res.DefaultBackupPath;
                me.el.find(".path-input").val(me.defaultPath);
                me.backtoPath = me.defaultPath;
            });
        },

        onClickAdvance: function(){
            if (this.isBasic == true){
                this.el.find(".backup-list").removeClass("g-popup-tools");
                this.el.find(".backup-list").addClass("g-tools-list");
                this.el.find(".switch-link").html(i18nDi.fillDomText('backupRestore.basicLabel'));
                this.el.find(".change-path").show();
                this.setItemVisibility("show");
                this.isBasic = false
                this.el.find(".switch-link").addClass("basic");
            } else if (this.isBasic == false){
                this.el.find(".backup-list").removeClass("g-tools-list");
                this.el.find(".backup-list").addClass("g-popup-tools");
                this.el.find(".switch-link").html(i18nDi.fillDomText('backupRestore.advanceLabel'));
                this.el.find(".change-path").hide();
                this.setItemVisibility("hide");
                this.isBasic = true;
                this.el.find(".switch-link").removeClass("basic");
            }
        },

        setItemVisibility: function(visibility){
            var items = this.el.find(".backup-list").children(".backup-item");
            for (var i = 0; i < items.length; i++){
                var itemAttr = $(items[i]).attr("data-type");
                if(// itemAttr == "picture" || 
                    itemAttr == "music" ||
                    itemAttr == "video"){
                    if (visibility == "show"){
                        $(items[i]).removeClass("hide");
                    } else if (visibility == "hide"){
                        $(items[i]).addClass("hide");
                    }
                }
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

        onClickChange: function(){
            var me = this;
            Collection.callSysFolderDialog({}, function(res){
                if (res&&res.exist === 1){
                    if (res.status !== 0){
                        me.backtoPath = res.path;
                        me.el.find(".path-input").val(res.path);
                        // Collection.setCustomBackupPath({"CustomBackupPath": res.path}, function(){
                        //     me.localPath = res.path
                        // });
                    }
                }
            });
        },

        onClickBackup: function(){
            this.el.find(".backup-list").removeClass("g-popup-tools");
            this.el.find(".backup-list").addClass("g-tools-list");
            if (!this.el.find(".backup-list").hasClass("g-tools-box")){
                this.el.find(".backup-list").addClass("g-tools-box");
            }
            this.el.find(".switch-link").html(i18nDi.fillDomText('backupRestore.basicLabel'));
            this.el.find(".switch-link").hide();
            this.el.find(".btn-backup").hide();
            this.el.find(".change-path").hide();

            this.el.find(".process-label").show();
            this.el.find(".btn-cancel").show();
            
            this.setItemVisibilityByCheckBox();
            this.isBasic = false;
            var selectedArgs = {};
            var allIDKeys = Object.keys(Collection.getSelectedMap());
            this.isSuccess = {};

            //*********************************************************
            //20140724 �°���־
            var logArray = [];
            var selectedCode = 0;
            //*********************************************************

            console.log("backup >> selected id: ", allIDKeys);
            for (var i = 0; i < allIDKeys.length; i++){
                var model = Collection.getModelById(allIDKeys[i]);
                selectedArgs[model.data.type] = {
                    count: model.data.count, 
                    size: model.data.size
                }
                this.isSuccess[model.data.type] = 0;

                //*********************************************************
                //20140724 �°���־
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
            selectedArgs.localPath = this.backtoPath;
            Collection.startBackup(selectedArgs, $.proxy(this.backupProcess, this));
            this.el.find(".last-backup-time").hide();
            this.isBackuping = true;

            //*********************************************************
            //20140724 �°���־
            if (this.isBasic === false){
                var logObject = {
                    class: "toolkit",
                    page: "backup",
                    module: "basic",
                    action: "backup",
                    targetvalue: logArray.join(",")
                }
            } else {
                var logObject = {
                    class: "toolkit",
                    page: "backup",
                    module: "advanced",
                    action: "backup",
                    targetvalue: logArray.join(",")
                }                
            }
            utils.sendNewLog("1000120", logObject);
            //********************************************************* 

        },

        onCancelBackup: function(){
            app.dal.request({
                action : apiNames.REQ_STOP_BACKUP,
                paras : {},
                callback : function(res) {}
            });
        },

        backupProcess: function(res){
            var $listNode = this.el.find(".backup-list");
            var type = res.info.type;
            var currentCount = res.info.currentCount;
            var total = res.info.total;

            if (type !== "all"){
                if (res.info.status !== "finish"){
                    if (res.status === 1){
                        this.isSuccess[type] = this.isSuccess[type] + 1;
                    }
                    console.log("���� >> ���ͣ�", type);
                    console.log("���� >> ��ȣ�", currentCount / total * 100 + '%');
                    var $itemNode = $listNode.find('li[data-type='+ type + ']');
                    console.log("���� >> ��ѯ�ڵ� li[data-type=" + type + ']', $itemNode.get(0));
                    $itemNode.find(".tools-load").removeClass("hide");
                    $itemNode.find(".progress-bar").find("span").css("width", currentCount / total * 100 + '%');
                } else {
                    var $itemNode = $listNode.find('li[data-type='+ type + ']');
                    console.log("���� >> ��ѯ�ڵ� li[data-type=" + type + ']', $itemNode.get(0));
                    $itemNode.find(".tools-load").removeClass("hide");
                    $itemNode.find(".progress-bar").find("span").css("width", '100%');
                    var totalNum = $itemNode.find(".num").html();
                    $itemNode.off("click");
                    totalNum = parseInt(totalNum);
                    if (totalNum - this.isSuccess[type] !== 0){
                        $itemNode.find(".ico-warng-small").show();
                        $itemNode.find(".num").html('<em class="c-red">' + (totalNum - this.isSuccess[type]) + "</em>/" + totalNum);
                    } else {
                        $itemNode.find(".ico-pass-small").show();
                    }
                }
            } else {
                if (res.info.status === "finish"){
                    this.isBackuping = false;
                    this.el.find(".process-label").hide();
                    this.el.find(".compelete-label").show();
                    //this.el.find(".view-backup").show();
                    this.el.find(".btn-cancel").hide();
                    this.el.find(".last-backup-time").hide();
                    this.el.find(".btn-finish").show();
                    console.log("���� >> ��ģ�鱸��ʧ������", this.isSuccess);
                }
            }
        },

        onFinished: function(){
            this.options.parentWindow.close();
        },

        render: function(target){
            this.el.appendTo(target);
        }
    });
    
    return BackupView;
}); 