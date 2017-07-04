define("UIPersonalView", function(require, exports, module) {
    var app = require('app');
    var   $ = require('jquery');
    var _ = require('underscore');
    var i18nDi  = require('I18NDI');
    var  utils = require('utils');
	var apiNames = require('APINames');
    var theUserCenter = require('userCenter');
    var UIDialog = require('UIDialog');
    var UISelectPortraitView = require('UISelectPortraitView');

    var ModifyPwdView = app.ViewBase.extend({
        module: module,
        init: function(opts){
            this.opts = opts;
            this.el = $(_.template(this.getTpl('tpl-modify-pwd-view'), {I18N: i18nDi}));
            this.isCorrectPwd = false;
        },

        render: function(target){
            this.el.appendTo(target);

            this.el.find(".input-old-pwd").on("blur", $.proxy(this.onBlurPasswordInput, this));
            this.el.find(".input-new-pwd").on("blur", $.proxy(this.onBlurPasswordInput, this));
            this.el.find(".confirm-new-pwd").on("blur", $.proxy(this.onBlurPasswordInput, this));
            this.el.find(".save").on("click", $.proxy(this.onClickSave, this));
            utils.placeholder(this.el.find(".input-old-pwd"),i18nDi.fillDomText('signin.oldword'));
            utils.placeholder(this.el.find(".input-new-pwd"),i18nDi.fillDomText('signin.newword'));
            utils.placeholder(this.el.find(".confirm-new-pwd"),i18nDi.fillDomText('signin.conword'));
        },

        onBlurPasswordInput: function(event){
            var pwdNode = $(event.target);
            var pwdValue = pwdNode.get(0).value;
            var errorNode = pwdNode.parent("li").find("p");
            console.log(pwdValue);
            if (pwdValue){
                if (pwdValue.length < 8){
                    errorNode.html(i18nDi.fillDomText('signin.shortPwdLabel'));
                    pwdNode.parent("li").find(".ico-pwd").hide();
                    this.isCorrectPwd = false;
                } else if (pwdValue.length > 20){
                    errorNode.html(i18nDi.fillDomText('signin.longPwdLabel'));
                    pwdNode.parent("li").find(".ico-pwd").hide();
                    this.isCorrectPwd = false;
                } else if (pwdValue.match(/[\d]+/g) === null ||
                       pwdValue.match(/[a-zA-Z]+/g) === null ){
                    errorNode.html(i18nDi.fillDomText('signin.errorPwdLabel'));
                    pwdNode.parent("li").find(".ico-pwd").hide();
                    this.isCorrectPwd = false;
                } else {
                    errorNode.html("");
                    pwdNode.parent("li").find(".ico-pwd").show();
                    this.isCorrectPwd = true;
                }
            } else {
                //errorNode.html(i18nDi.fillDomText('signin.emptyEmailLabel'));
            }

            var oldPwd = this.el.find(".input-old-pwd").get(0).value;
            var newPwd = this.el.find(".input-new-pwd").get(0).value;
            var conNewPwd = this.el.find(".confirm-new-pwd").get(0).value;
            if (newPwd && conNewPwd){
                if (newPwd !== conNewPwd){
                    this.el.find(".error-confirm-pwd").html(i18nDi.fillDomText('signin.notMatchPwdLbel'));
                    this.el.find(".correct-newc").hide();
                } else {
                    // this.el.find(".error-confirm-pwd").html("");
                    // this.el.find(".correct-newc").show();
                }
            }

            if (newPwd && oldPwd){
                if (newPwd === oldPwd){
                    this.el.find(".error-new-pwd").html(i18nDi.fillDomText('signin.samePwdLabel'));
                    this.el.find(".correct-new").hide();
                } else {
                    // this.el.find(".error-new-pwd").html("");
                    // this.el.find(".correct-new").show();
                }
            }

        },

        onClickSave : function(){
            var oldPwd = this.el.find(".input-old-pwd");
            var newPwd = this.el.find(".input-new-pwd");
            var conNewPwd = this.el.find(".confirm-new-pwd");
            if (!oldPwd.get(0).value){
                oldPwd.focus();
                this.el.find(".error-old-pwd").html(i18nDi.fillDomText('signin.emptyEmailLabel'));
                return false;
            } else if (!newPwd.get(0).value){
                newPwd.focus();
                this.el.find(".error-new-pwd").html(i18nDi.fillDomText('signin.emptyEmailLabel'));
                return false;
            } else if (!conNewPwd.get(0).value){
                conNewPwd.focus();
                this.el.find(".error-confirm-pwd").html(i18nDi.fillDomText('signin.emptyEmailLabel'));
                return false;                
            } else if (newPwd.get(0).value !== conNewPwd.get(0).value){
                conNewPwd.focus();
                this.el.find(".error-confirm-pwd").html(i18nDi.fillDomText('signin.notMatchPwdLbel'));
                this.el.find(".correct-newc").hide();                
                return false; 
            } else if (this.isCorrectPwd === false){
                return false;
            }
            var data = {};
            data.oldPwd = oldPwd.get(0).value;
            data.newPwd = newPwd.get(0).value;
            theUserCenter.changePwd(data, $.proxy(this.onChangePwd, this));
        },

        onChangePwd: function(res){
            if (res){
                if (res.result === true){
                    this.el.hide();
                    this.successNode = $(_.template(this.getTpl('tpl-modify-pwd-success'), {I18N: i18nDi}));
                    var win = this.opts.win;
                    this.successNode.appendTo(win.el.find('.g-window-ctn'));
                    this.successNode.find(".btn-ok").on("click", function(){
                        win.close();
                    })
                    app.dal.request({
                        action : apiNames.REQ_RESIZE_WINDOW,
                        paras : {width:340, height:200}
                    });
                    app.dal.request({
                        action : "get_CenterWindow",
                        paras : {}
                    });
                } else if (res.errorCode === 2003){
                    this.el.find(".correct-old").hide();
                    this.el.find(".error-old-pwd").html(i18nDi.fillDomText('signin.incorrectPwd'));
                }
            } else {
                var confirmDlg = new UIDialog({
                    buttonKey : 2, //1双按钮
                    content : i18nDi.fillDomText('signin.networkLabel'),
                    title: i18nDi.fillDomText('signin.myAccountLabel')
                });
                confirmDlg.show();
                confirmDlg.on("ok", function(){
                    this.opts.win.notifyParentWindow({
                        action: 'networkError',
                        para: {}
                    })
                    this.opts.win.close();
                }.bind(this));
            }
        }
    });

    var PersonalView = app.ViewBase.extend({
        module: module,
        events: {
            'click -> .button-send-check': 'onClickSend',
            'click -> .modify-pwd': 'onClickModifyPwd',
            'click -> .user-avatar': 'onClickPortrait',
            'change -> #upfile': 'onChangePortraitValue'
        },
        init: function(opts){
            this.opts = opts;
            var template = _.template(this.getTpl('tpl-personal-main-view'), {I18N: i18nDi});
            this.el = $(template);
            this.isSending = false; 
            this.isClickModifyPwd = false;
        },

        render: function(target){
            this.el.appendTo(target);
            if (this.opts.noLoginUI === true){
                app.dal.request({
                    action : apiNames.REQ_RESIZE_WINDOW,
                    paras : {width:340, height:410}
                });
                app.dal.request({
                    action : "get_CenterWindow",
                    paras : {}
                });
            }
        },

        userPersonalCenter: function(isCheck,data){
            String.prototype.times = function(n) {  
                return Array.prototype.join.call({length:n+1}, this);  
            }; 

            var changeAccount = function(originStr){
                var accStrPrefix= originStr.split("@")[0];
                var accStrSuffix= originStr.split("@")[1];
                var firstChar = accStrPrefix.charAt(0);
                var lastChar = accStrPrefix.charAt(accStrPrefix.length - 1);
                var accStr = firstChar + "*".times(4) + lastChar + "@" + accStrSuffix;
                return accStr;
            }
            if (data.imagePath){
                setTimeout(function(){
                    this.el.find(".portrait").attr("src", data.imagePath);
                    this.opts.win.notifyParentWindow({
                        action: 'changeHeader',
                        para: {imagePath: data.imagePath}
                    })
                }.bind(this), 1000)
            }
            if (!data.account3){
                var accStrt = changeAccount(data.account);
                this.el.find(".account").html(accStrt);
            } else {
                var accStrt = changeAccount(data.account3);
                this.el.find(".account").html(accStrt);
                this.el.find(".modify-pwd").hide();
            }
            if (isCheck){
                this.el.find(".button-send-check").hide();
            }
        },

        onClickSend: function(){
            this.el.find(".send-info").hide();
            if (this.isSending === false){
                this.isSending = true;
                theUserCenter.sendActiveAccoutEmail($.proxy(this.onSendActiveAccoutEmail, this));
                //*********************************************************
                //20140924
                var logObject = {
                    page: "usersystem_myaccount",
                    module: "verify",
                    action: "verification"
                }
                utils.sendNewLog("1000120", logObject);
                //*********************************************************  
            }
        },

        onSendActiveAccoutEmail: function(res){
            this.isSending = false;
            if (res){
                this.el.find(".send-info").show();
                if (res.result === true){
                    this.el.find(".send-info").html(i18nDi.fillDomText('signin.sendSuccessLabel'));
                } else {
                    this.el.find(".send-info").html();
                }
            } else {
                var confirmDlg = new UIDialog({
                    buttonKey : 2, //1双按钮
                    content : i18nDi.fillDomText('signin.networkLabel'),
                    title: i18nDi.fillDomText('signin.myAccountLabel')
                });
                confirmDlg.show();
                confirmDlg.on("ok", function(){
                    this.opts.win.notifyParentWindow({
                        action: 'networkError',
                        para: {}
                    })
                    this.opts.win.close();
                }.bind(this));
            }
        },

        onClickModifyPwd: function(event){
            // app.dal.request({
            //     action : "get_OpenUrlUseDefBrowser",
            //     paras : {url: "https://passport.mobogenie.com/personal.htm?method=index"},
            //     callback : function(){}
            // });
            this.el.find(".modify-pwd").prop("disabled", true);
            app.dal.request({
                action : "get_Url",
                paras : {url: "http://www.mobogenie.com/index.html"},
                callback : function(res) {
                    if (res&&res.code === 18){
                        var confirmDlg = new UIDialog({
                            buttonKey : 2, //1双按钮
                            content : i18nDi.fillDomText('signin.networkLabel'),
                            title: i18nDi.fillDomText('signin.myAccountLabel')
                        });
                        confirmDlg.show();
                        confirmDlg.on("ok", function(){
                            this.opts.win.notifyParentWindow({
                                action: 'networkError',
                                para: {}
                            })
                            this.opts.win.close();
                        }.bind(this));
                    } else {
                        this.el.hide();
                        var win = this.opts.win;
                        var options = {
                            win : win, 
                        };
                        var modifyPwdView = new ModifyPwdView(options);
                        modifyPwdView.render(win.el.find('.g-window-ctn'));
                        app.dal.request({
                            action : apiNames.REQ_RESIZE_WINDOW,
                            paras : {width:340, height:310}
                        });
                        app.dal.request({
                            action : "get_CenterWindow",
                            paras : {}
                        });
                    }
                    this.el.find(".modify-pwd").prop("disabled", false);
                }.bind(this)
            });
        },

        onClickPortrait: function(){
            // var args = {
            //     MultiSel: 0,
            //     Filter: '(*.png, *.jpg, *.gif)|*.png;*.jpg;*.gif'
            // };
            // app.dal.request({
            //     action : apiNames.REQ_POPUP_SYSTEM_DIALOG,
            //     paras : args,
            //     callback : $.proxy(this.onClickSystemPopupOK, this)
            // });
            //this.el.find("#upfile").click();

            this.el.hide();
            
            var options = this.opts;
            options.personalView = this;
            if (this.selectPortrait){
                this.selectPortrait.show();
            } else {
                this.selectPortrait = new UISelectPortraitView(options);
                this.selectPortrait.render(this.opts.win.el.find('.g-window-ctn'));
            }

            app.dal.request({
                action : apiNames.REQ_RESIZE_WINDOW,
                paras : {width:680, height:450}
            });

            app.dal.request({
                action : "get_CenterWindow",
                paras : {}
            });

            //*********************************************************
            //20140924
            var logObject = {
                page: "usersystem_myaccount",
                module: "icon",
                action: "changephoto"
            }
            utils.sendNewLog("1000120", logObject);
            //*********************************************************   
        },

        getSelectPortraitView: function(){
            if (this.selectPortrait){
                return this.selectPortrait;
            } else {
                return null;
            }
        },

        onChangePortraitValue: function(){
            var filePath = this.el.find("#upfile").get(0).value;
            if (filePath){
                var fileNames = filePath.split("\\");
                var fileName = fileNames[fileNames.length - 1];
                var ext = fileName.split(".")[fileName.split(".").length - 1].toLowerCase();
                if (ext !== "jpg" && ext !== "jfif" && ext !== "jpeg" && ext !== "pjpeg" && 
                    ext !== "pjp" && ext !== "png" && ext !== "gif"){

                    var confirmDlg = new UIDialog({
                        buttonKey : 2, //1双按钮
                        content : i18nDi.fillDomText('signin.errorPicLabel'),
                        title: i18nDi.fillDomText('signin.myAccountLabel')
                    });
                    confirmDlg.show();
                    confirmDlg.on("yes", function(){
                        confirmDlg.close();
                    });

                    return;
                }
            } else {
                return;
            }
            theUserCenter.uploadPortrait(this.el.find("#uploadImg"), $.proxy(this.onUploadPortrait, this));
            var imageInfoNode = this.el.find(".image-info");
            imageInfoNode.html(i18nDi.fillDomText('signin.waitImageUploadLabel'));
            if (imageInfoNode.hasClass("suc")){
                imageInfoNode.removeClass("suc");
            }
            imageInfoNode.show();
        },

        onClickSystemPopupOK: function(res){
            // if(res.info && res.info.list){
            //     var imagePath = res.info.list[0].path;
            //     theUserCenter.uploadPortrait(imagePath, $.proxy(this.onUploadPortrait, this, imagePath));
            // }
        },

        onUploadPortrait: function(res){
            this.selectPortrait.el.hide();
            this.el.show();
            app.dal.request({
                action : apiNames.REQ_RESIZE_WINDOW,
                paras : {width:340, height:410}
            });
            app.dal.request({
                action : "get_CenterWindow",
                paras : {}
            });
            if (res){
                if (res.result === true){
                    var imagePath = res.path;
                    theUserCenter.changePortrait(imagePath, $.proxy(this.onChangePortrait, this, imagePath))
                }
            } else {
                var imageInfoNode = this.el.find(".image-info");
                imageInfoNode.html(i18nDi.fillDomText('signin.imgUploadFailed'));
                if (imageInfoNode.hasClass("suc")){
                    imageInfoNode.removeClass("suc");
                }
                setTimeout(function(){
                    imageInfoNode.hide();
                }.bind(this), 3000);

                var confirmDlg = new UIDialog({
                    buttonKey : 2, //1双按钮
                    content : i18nDi.fillDomText('signin.networkLabel'),
                    title: i18nDi.fillDomText('signin.myAccountLabel')
                });
                confirmDlg.show();
                confirmDlg.on("ok", function(){
                    this.opts.win.notifyParentWindow({
                        action: 'networkError',
                        para: {}
                    })
                    this.opts.win.close();
                }.bind(this));
            }
        },

        onChangePortrait: function(imagePath, res){
            if (res){
                if (res.result === true){
                    this.el.find(".portrait").attr("src", imagePath);
                    var imageInfoNode = this.el.find(".image-info");
                    imageInfoNode.html(i18nDi.fillDomText('signin.imgUploadSuccess'));
                    if (!imageInfoNode.hasClass("suc")){
                        imageInfoNode.addClass("suc");
                    }
                    imageInfoNode.show();
                    setTimeout(function(){
                        this.el.find(".image-info").hide();
                    }.bind(this), 3000);

                    this.opts.win.notifyParentWindow({
                        action: 'changeHeader',
                        para: {imagePath: imagePath}
                    })
                }
            } else {
                var imageInfoNode = this.el.find(".image-info");
                imageInfoNode.html(i18nDi.fillDomText('signin.imgUploadFailed'));
                if (imageInfoNode.hasClass("suc")){
                    imageInfoNode.removeClass("suc");
                }

                setTimeout(function(){
                    this.el.find(".image-info").hide();
                }.bind(this), 3000);
            }
        }
    });
    return PersonalView;
}); 