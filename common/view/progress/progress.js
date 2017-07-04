/**
 * @author liujintao
 */
define("ProgressDialog", function(require, exports, module) {
    var app = require('app');
    var $ = require('jquery');
    var _ = require('underscore');
    /*国际化字典工具*/
    var i18nDi = require('I18NDI');
    var apiNames = require('APINames');
    /*信号集*/
    /*
     var SIGNAL_MAP={
     READY:"",
     OK_CLICKED:"",
     PROCESSING:"",
     CLOSED:""
     };*/
    var ProgressDialog = app.ViewBase.extend({
        module : module,
        events : {
            "click -> .progress-container .btn-retry" : "onRetry",
            "click -> .progress-container .btn-close" : "onClose",
            "click -> .progress-container .btn-cancel" : "onCancel",
            "click -> .progress-container .btn-ok" : "onClose",
            "click -> .progress-container .btn-open-dir" : "onOpenDir"
        },
        init : function(opts) {
            console.log(opts);
            this.win = opts.win;
            this.doingTitle = opts.doingTitle;
            this.successTitle = opts.successTitle;
            this.failedTitle = opts.failedTitle;
            this.cancelButton = opts.cancelButton;
            this.okButton = opts.okButton;
            this.closeButton = opts.closeButton;
            this.retryButton = opts.retryButton;
            this.header = opts.header;
            this.retriable = opts.retriable || false;
            this.total = opts.total;
            this.freshOnly = opts.freshOnly || false;
            this.cancelAble = opts.cancelAble;
            this.numberType = opts.numberType;
            this.openButton = opts.openButton;
            this.el = opts.win.getContent();

            var me = this;

            this.win.on("message", function(data) {
                console.log("接收到的消息",data);
                if (data.info.todo == "doProccess") {
                     var now = new Date();
                    if (!me.freshOnly) {
                        me.el.find(".progress-bar .inner").css("width", Number(data.info.current) / Number(data.info.total) * 100 + "%");
                        if(me.numberType=="index"){//索引形式
                            me.el.find(".progress-num .current").html(Math.floor(data.info.current));
                            me.el.find(".progress-num .total").html(data.info.total);
                        }else if(me.numberType=="percent"){//百分比形式
                            me.el.find(".progress-num .percent").html(Math.floor(Number(data.info.current) / Number(data.info.total) * 100) + "%");
                        }else{//无数值形式
                            me.el.find(".progress-num").hide();
                        }
                        
                    } else {
                        me.el.find(".progress-bar").hide();
                        me.el.find(".progress-num").hide();
                        me.el.find(".progress-bar-stripes").show();
                    }

                }else if(data.info.todo=="setTotal"){//设置总数
                    me.el.find(".progress-num .total").html(data.info.total);
                }else if(data.info.todo=="showFreshBar"){
                        me.el.find(".progress-bar").hide();
                        me.el.find(".progress-num").hide();
                        me.el.find(".progress-bar-stripes").show();                    
                } else if (data.info.todo == "onFailed" && data.info.failedList.length > 0) {//失败
                    me.el.find(".result-failed").show().siblings().hide();
                    if (me.retriable == true) {
                        me.el.find(".btn-retry").show().siblings().hide();
                        me.retryList = data.info.failedList;
                    } else {
                        me.el.find(".btn-ok").show().siblings().hide();
                    }
                     me.el.find(".result-detail").show();
                     me.win.el.find(".ico-close").show();
                } else if (data.info.todo == "close") {//直接关闭
                    me.win.close();
                } else if (data.info.todo == "onSuccess") {//完全成功
                    if (data.info.type == "export") {
                        me.el.find(".btn-open-dir").attr("data-path", data.info.path).show().siblings().hide();
                        me.el.find(".result-success").show().siblings().hide();
                        me.el.find(".btn-close").show();
                    }else{
                            me.el.find(".result-success").show().siblings().hide();
                            me.el.find(".btn-ok").show().siblings().hide();
                    }
                   me.win.el.find(".ico-close").show();
                }else if(data.info.todo=="setHeader"){
                    me.win.setHeader(data.info.header);
                }else if(data.info.todo=="setFailedTitle"){
                    me.el.find(".result-failed").html(data.info.title);
                }else if(data.info.todo=="setSuccessTitle"){
                    me.el.find(".result-success").html(data.info.title);
                }else if(data.info.todo=="setStSuccessTitle"){
                	me.el.find(".result-success").html(i18nDi.fillDomText(data.info.title));
                }else if(data.info.todo=="showResultDetail"){
                    //判断不同的内容使用不同的模板
                    if(typeof data.info.detailInfo=='string'&&data.info.detailInfo.indexOf("<br/>")>-1){
                        var infoList = data.info.detailInfo.split('<br/>');
                        var dom = _.template(me.getTpl("tpl-info-detail-list"),{
                            data:infoList
                        });
                        me.el.find(".result-detail").html(dom).show();
                    }else if(typeof data.info.detailInfo=='string'&&data.info.detailInfo.indexOf("<br>")>-1){
                        var infoList = data.info.detailInfo.split('<br>');
                        var dom = _.template(me.getTpl("tpl-info-detail-list"),{
                            data:infoList
                        });
                        me.el.find(".result-detail").html(dom).show();                        
                    }else{
                        me.el.find(".result-detail").html(data.info.detailInfo).show();
                    }
                    me.win.setSize(400,240);
                    me.win.el.find(".ico-close").show();
                }else if(data.info.todo=="setSuccessList"){
                    me.successList = data.info.successList;
                }else if(data.info.todo=="setEnable"){
                    me.win.setEnabled(data.info.value);
                }else if(data.info.todo=="setOpenPath"&&data.info.value){
                    me.openPath=data.info.value;
                }
            });
            me.win.on("close", function() {
                me.win.notifyParentWindow({
                    closeClicked : "1"
                });
            });
        },
        render : function(target) {
            var tpl = this.getTpl("tpl-progress-dlg");
            var dom = _.template(tpl, {
                data : {
                    doingTitle : this.doingTitle && i18nDi.fillDomText(this.doingTitle) || i18nDi.fillDomText("common.inProcessingTaskText"),
                    successTitle : this.successTitle && i18nDi.fillDomText(this.successTitle) || i18nDi.fillDomText("common.successText"),
                    failedTitle : this.failedTitle && i18nDi.fillDomText(this.failedTitle) || i18nDi.fillDomText("common.failedLabel"),
                    okButton : this.okButton && i18nDi.fillDomText(this.okButton) || i18nDi.fillDomText("common.okLabel"),
                    retryButton : this.retryButton && i18nDi.fillDomText(this.retryButton) || i18nDi.fillDomText("common.retryText"),
                    cancelButton : this.cancelButton && i18nDi.fillDomText(this.cancelButton) || i18nDi.fillDomText("common.cancelLabel"),
                    closeButton : this.closeButton && i18nDi.fillDomText(this.closeButton) || i18nDi.fillDomText("common.closeLabel"),
                    openButton : this.openButton && i18nDi.fillDomText(this.openButton) || i18nDi.fillDomText("common.openLabel"),
                    numberType:this.numberType,
                    cancelAble:this.cancelAble
                }
            });
            this.win.setHeader(i18nDi.fillDomText(this.header));
            $(dom).appendTo($(target));
            /*页面准备完毕*/
            this.win.notifyParentWindow({
                ready : "1"
            });
            if (this.freshOnly) {
                this.el.find(".progress-bar").hide();
                this.el.find(".progress-num").hide();
                this.el.find(".progress-bar-stripes").show();
                this.el.find(".btn-cancel").hide();
            }
            this.el.find(".progress-num .current").html(0);
            this.el.find(".progress-num .total").html(this.total);
            this.win.el.find(".ico-close").hide();
        },
        onClose : function() {
            this.win.notifyParentWindow({
                closeClicked : "1"
            });
            this.win.close();
        },
        onCancel : function() {
            this.win.notifyParentWindow({
                cancelClicked : "1"
            });
            this.win.close();
        },
        onRetry : function() {
            /*页面准备完毕*/
            this.win.notifyParentWindow({
                retryClicked : "1",
                retryList : this.retryList
            });
        },
        onOpenDir : function(event) {
            /*页面准备完毕*/
           var pathList = [];
           if(this.successList){
               this.successList.forEach(function(successItem){
                   if(successItem.localPath){
                       pathList.push(successItem.localPath);
                   }
               });
           }
           if(pathList.length>0){
                app.dal.request({
                    action : apiNames.REQ_MULTI_SEL_FILE,
                    paras : {
                        pathList :pathList,
                        selFile : 1
                    }
                });
           }else{
                app.dal.request({
                    action : apiNames.REQ_OPEN_EXISTED_FILE,
                    paras : {
                        path : $(event.target).attr("data-path") || $(event.target).parents(".btn-open-dir").attr("data-path"),
                        selFile : 1
                    }
                });
           }
                this.win.notifyParentWindow({
                    openClicked : "1",
                    path : $(event.target).attr("data-path") || $(event.target).parents(".btn-open-dir").attr("data-path")
                });                 

            this.win.close();
        },
        onOk : function() {
            this.win.notifyParentWindow({
                okClicked : "1"
            });
            this.win.close();
        }
    });
    return ProgressDialog;
});
