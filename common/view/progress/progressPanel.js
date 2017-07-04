/**
 * @author liujintao
 */
define("ProgressPanel", function(require, exports, module) {
    var app = require('app');
    var $ = require('jquery');
    var _ = require('underscore');

    var ProgressPanel = app.ViewBase.extend({
        module : module,
        init : function(opts) {
            /*绑定生命周期，0手动销毁，默认值/1丢失当前连接时销毁/2当前进度结束自动销毁/3=1+2*/
            this.autoDestroy = opts.autoDestroy||3; 
            this.openPath=opts.openPath;
            this.opts = opts;
            this.processWindow = new app.PopupPanel({
                Model : 2,
                Width : 400,
                Height : 180,
                DragWindowHeight : 30,
                Parame : {
                    header : opts.header,
                    doingTitle : opts.doingTitle,
                    successTitle : opts.successTitle,
                    retriable : opts.retriable,
                    failedTitle : opts.failedTitle,
                    retryButton : opts.retryLabel||"common.retryText",
                    okButton : opts.okLabel||"common.okLabel",
                    closeButton : opts.closeLabel||"common.closeLabel",
                    cancelButton : opts.cancelLabel||"common.cancelLabel",
                    openButton : opts.openLabel||"common.openLabel",
                    openPath : opts.openPath,
                    cancelAble:opts.cancelAble==undefined?true:opts.cancelAble,
                    numberType:opts.numberType||'index',//数值进度类型，index 1/3形式，percent 56%形式，none
                    total: opts.total,
                    isPop:opts.isPop||false,
                    /*是否仅显示刷子而没有进度*/
                   freshOnly:opts.freshOnly
                },
                Path : 'ProcessPanel.html',
            });
            var me = this;
            
            this.failedList = [];
            this.successList = [];
            /*接受弹窗信号*/
            this.processWindow.on("message", function(msg) {
                if (msg.ready == "1") {//弹窗初始化完毕
                    me.trigger("ready");
                } else if (msg.cancelClicked == "1"){
                    me.trigger("cancel");
                    setTimeout(function(){
                        me.close();
                    },300);
                    
                }else if(msg.closeClicked=="1"){
                    me.trigger("close");
                    me.close();
                }else if(msg.okClicked == "1") {
                   me.trigger("ok");
                   me.close();
                }else if(msg.retryClicked=="1"){
                    me.trigger("retry",msg.retryList);
                }else if(msg.openClicked=="1"){
                    me.trigger("openPath",msg.path);
                }
            });
             this.processWindow.on("close",function(){
                 me.close();
             });
             
            /*判断组件生命周期是否为当前连接,如果是，自动关闭*/
            if(this.autoDestroy==1||this.autoDestroy=="1"||this.autoDestroy==3||this.autoDestroy=="3"){
                var connectionMgr = require("connectionMgr");
                connectionMgr.on("connection",function(){
                    if(!connectionMgr.isConnect()){
                           me.close();
                    }
                });
            }
            this.render("body");
        },
        render : function(target) {
            console.log(target);
            var baseMask = $("<div id='process-mask'>&nbsp;</div>");
            baseMask.css({
                "height" : "100%",
                "width" : "100%",
                "position" : "absolute",
                "top" : "0",
                "left" : "0",
                "z-index" : "9999",
                "opacity": "0.2"
            });
            $(target).append(baseMask);
        },
        /*进度处理*/
        doProgress : function(current, total, id, success) {
            var me = this;
            this.processWindow.sendMessage({
                todo : "doProccess",
                current : current,
                total : total
            });
            if (!success) {
                this.failedList.push(id);
            }else{
                this.successList.push(id);
            }
            if (current == total) {
                /*判断组件生命周期是否为单个进度,如果是并且没有失败任务，自动关闭*/
                if((this.autoDestroy==2||this.autoDestroy=="2"||this.autoDestroy==3||this.autoDestroy=="3")&&this.failedList.length<1){
                       setTimeout(function(){
                            me.close();
                        },1000);
                    return;
                }else if(this.failedList.length>=1){
                    /*完成，但是有失败*/
                    this.processWindow.sendMessage({
                        todo : "onFailed",
                        failedList : this.failedList
                    });                    
                }else{//完成且没有失败，不允许自动关闭的时候
                    if(this.openPath){//结束后打开文件位置
                        this.processWindow.sendMessage({
                            todo : "onSuccess",
                            type : "export",
                            path : this.openPath
                        });                        
                    }else{//成功后的其他处理
                        /*
                         this.processWindow.sendMessage({
                            todo : "onSuccess",
                            successList:this.successList
                        }); */       
                    }
                }
            }
        },
        open:function(){
             this.processWindow.open();
        },
        /*设置失败标题，传入标题内容或dom，非字典*/
        setFailedTitle:function(title){
                    this.processWindow.sendMessage({
                        todo : "setFailedTitle",
                        title : title
                    });              
        },
        setTotal:function(total){
                    this.processWindow.sendMessage({
                        todo : "setTotal",
                        total : total
                    });               
        },
        showFreshBar:function(){
                    this.processWindow.sendMessage({
                        todo : "showFreshBar"
                    });              
        },
        setOpenPath:function(openPath){
                    this.openPath=openPath;
                    this.processWindow.sendMessage({
                        todo : "setOpenPath",
                        value:openPath
                    });                    
        },
        //设置失败列表
        showDetailInfo:function(detailInfo){
                    this.processWindow.sendMessage({
                        todo : "showResultDetail",
                        detailInfo : detailInfo
                    });               
        },
        /*设置成功标题，传入标题内容，非字典*/
        setSuccessTitle:function(title){
                    this.processWindow.sendMessage({
                        todo : "setSuccessTitle",
                        title : title
                    });                
        },
        /*设置成功标题，传入标题内容，非字典*/
        setStSuccessTitle:function(title){
                    this.processWindow.sendMessage({
                        todo : "setStSuccessTitle",
                        title : title
                    });                
        },
        /*设置成功的详细列表*/
        setSuccessList:function(successArray){
                     this.processWindow.sendMessage({
                        todo : "setSuccessList",
                        successList : successArray
                    });                  
        },
        setAutoDestroy:function(value){
                     this.autoDestroy=value;
                     this.processWindow.sendMessage({
                        todo : "setAutoDestroy",
                        autoDestroy : value
                    });                
        },
        /*设置header，传入header文字，非字典*/
        setHeader:function(header){
                    this.processWindow.sendMessage({
                        todo : "setHeader",
                        title : header
                    });                   
        },
        /*
         0：false,
         1:true
         * */
        setEnabled:function(enable){
                  this.processWindow.sendMessage({
                        todo : "setEnable",
                        value : enable
                  });        
        },
        close : function() {
            $("#process-mask").remove();
            this.processWindow.sendMessage({
                    todo : "close"
                });
        }
    });

    return ProgressPanel;
});
