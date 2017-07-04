define("UIGenieView", function(require, exports, module) {
    var app = require('app');
    var   $ = require('jquery');
    var _ = require('underscore');
    var i18nDi  = require('I18NDI');
    var  utils = require('utils');
    var UIWindow = require('UIWindow');
    var UIDialog = require('UIDialog');
    var connection = require('connectionMgr');
	var apiNames = require('APINames');
    
    var GenieView = app.ViewBase.extend({
        module: module,
        events: {
            // 'click -> .btn-backup': 'onClickBackupProxy',
            // 'click -> .btn-restore': 'onClickRestoreProxy',
            // 'click -> .btn-fileManager': 'onClickFileManagerProxy',
            // 'click -> .btn-deviceInfo': 'onClickDeviceInfoProxy',
            // 'click -> .btn-installApp': 'onClickInstallProxy',
            // 'click -> .btn-oneclick': 'onClickRootProxy',
            // 'click -> .btn-pcCleaner': 'onClickPcCleaner',
        },
        init: function(opts){
            var pageId = opts.pageId;
            this.pageId = opts.pageId;

            this.collection = opts.collection;
            var template = _.template(this.getTpl('tpl-genie-view'), {I18N: i18nDi});
            this.el = $(template);
            this.el.appendTo($('#' + this.pageId));
            this.isInit = false;
            app.eventCenter.on("switchSite", $.proxy(this.updateDataBySite, this));
            this.el.get(0).onload = $.proxy(this.onLoadError, this);
        },

        redirect: function(hash){
            console.log("genie view >> update...", hash);
            this.hash = hash;
            var command;
            var content;
            if (hash&&hash.pageState){
                command = hash.pageState.vt;
                //content = JSON.parse(hash.pageState.content);
                content = hash.pageState.content.replace(/\|/g, "\/").replace(/\$/g, "=").replace(/\*/g, "&");
            }
            if (command == "update_data"&&content){
                this.content = content;

                // if (this.isInit === false){
                //     this.isInit = true;
                    this.el.attr("src", 'http://public.mobogenie.com/genie/index.html?' + new Date().valueOf());
                    //this.el.attr("src", 'file:///E:/resource/source/genie/index.html?' + new Date().valueOf() + '&content=' + content);
                // } else {
                    //this.el[0].contentWindow.updateDataBySite("", null, JSON.parse(content));
                // }
            } else {
                console.log("其他命令。。。")
            }
        },

        onLoadError: function(){
            var iframeDoc = this.el.get(0).contentWindow.document
            var h2Node = iframeDoc.querySelector('body h2');
            var bodyNode = this.el.get(0).contentWindow.document.body;

            var noNetPageNode = $('#' + this.pageId).find(".noNetPage")

            if (!noNetPageNode.get(0)){
                var noNetPageTpl = _.template(this.getTpl('tpl-genie-error-page'), {I18N: i18nDi});
                noNetPageNode = $(noNetPageTpl);
                noNetPageNode.appendTo($('#' + this.pageId));
                noNetPageNode.hide();
                noNetPageNode.find(".js-retry").on("click", function(){
                    this.redirect(this.hash)
                }.bind(this))
            }
            
            if (h2Node){
                var errorText = h2Node.innerHTML;
                console.log(errorText.indexOf("Failed to load"));
                if (errorText.indexOf("Failed to load") > -1){
                    console.log("Failed to load...");
                    noNetPageNode.show();
                    this.el.hide();
                }
            } else {
                noNetPageNode.hide();
                this.el.show();
            }
        },

        updateDataBySite: function(domain, title){
            this.content = JSON.parse(this.content);
            this.content.curSite = title.toLowerCase();
            this.content = JSON.stringify(this.content);
            this.el.attr("src", 'http://public.mobogenie.com/genie/index.html?' + new Date().valueOf());
            //this.el.attr("src", 'file:///E:/resource/source/genie/index.html?' + new Date().valueOf() + '&content=' + this.content);
            //this.el[0].contentWindow.updateDataBySite("", title, JSON.parse(this.content));
        }
    });
    return GenieView;
}); 