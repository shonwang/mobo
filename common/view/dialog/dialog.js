define('UIDialog', function(require, exports, module) {
    var app = require('app');
    var connectionMgr = require("connectionMgr");
    var apiNames = require('APINames');
    /*
     * @paras buttonKey 1|2|3
     *
     * buttonKey 1: ok_cancel
     * buttonKey 2: ok
     * buttonKey 3: yes + no
     *
     * @paras content 弹窗内容
     */
    var Dialog = app.ViewBase.extend({
        init : function(opts) {
            var me = this;
             this.autoDestroy = opts.autoDestroy||2;
             console.log(opts);
            //创建并打开弹窗
            this.pannel = new app.PopupPanel({
                Model : 1,
                Width : opts.width||392,
                Height : opts.height||142,
                Parame : {
                    buttonKey : opts.buttonKey || 1,
                    content : opts.content || '',
                    contentConfig:opts.contentConfig||{},
                    title : opts.title,
                    isTitleKey:opts.isTitleKey||false,
                    hasRememberCheck:opts.hasRememberCheck||false
                },
                Path : 'dialog.html'
            });

            //处理弹窗中的事件
            this.pannel.on('message', function(data) {
                me.pannel = null;
                if (data.action == 'close' || data.action == 'cancel') {
                    me.trigger('cancel');
                } else if (data.action == 'ok') {
                    me.trigger('ok');
                } else if (data.action == 'yes') {
                    me.trigger('yes');
                }else if(data.action=="remember"){
                    me.trigger("remember",data.value);
                }
            });

            connectionMgr.on("connection", function() {
                console.log(me.autoDestroy);
                if (!connectionMgr.isConnect()&&me.autoDestroy==2) {
                    try {
                        me.pannel.sendMessage({
                            todo : "close"
                        });
                    } catch(e) {

                    }
                }
            });

        },

        show : function() {
            this.pannel.open();
        },
        setContent:function(content){
          this.pannel.sendMessage({
              todo:"setContent",
              value:content
          });  
        },
        setTitle:function(title){
          this.pannel.sendMessage({
              todo:"setTitle",
              value:title
          });              
        },
        toTop:function(){
            app.dal.request({
                action:apiNames.REQ_POP_TO_TOP
            });
        }
    });

    return Dialog;
});
