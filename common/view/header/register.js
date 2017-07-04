define('UIRegister', function(require, exports, module){
    var app = require('app');
    var i18nDi  = require('I18NDI');
    var   $ = require('jquery');
    var   _ = require('underscore');
    var utils = require('utils');
    var theUserCenter = require('userCenter');
    var UIMenu = require('UIMenu');
    var apiNames = require('APINames');
    var UIDialog = require('UIDialog');
        
    var RegisterView = app.ViewBase.extend({
        module: module,
        init: function(opts){
            this.opts = opts;
            this.el = $(_.template(this.getTpl('tpl-sign-up'), {I18N: i18nDi}));
            this.isCorrectEmail = false;
            this.isCorrectPwd = false;
            this.isCorrectCode = true;
            this.isMatchPwd = false;
            var itemList = [
                {index: 1, label: "@gmail.com"},
                {index: 2, label: "@yahoo.com"},
                {index: 3, label: "@hotmail.com"},
                {index: 4, label: "@ymail.com"},
                {index: 5, label: "@live.com"},
            ]
            this.dropMenu = new UIMenu({
                list: itemList
            });
            this.dropMenu.addClass('signin-down');
            this.dropMenu.on(UIMenu.SELECT, $.proxy(this.onSelectMenuItem, this));
            this.el.find(".button-signup").attr("disabled", "disabled");
        },

        render: function(target){
            this.el.appendTo(target);

            this.el.find(".button-signup").on("click", $.proxy(this.registerRequest, this));
            $(document).on("keyup", $.proxy(this.onKeyupEnter, this));

            this.el.find(".input-email").on("blur", $.proxy(this.onBlurEmailInput, this));
            this.el.find(".randcode").on("click", $.proxy(this.changCode, this));
            this.el.find(".input-pwd").on("blur", $.proxy(this.onBlurPasswordInput, this));
            this.el.find(".input-pwdconfirm").on("blur", $.proxy(this.onBlurPasswordConfirm, this));
            this.el.find(".input-code").on("blur", $.proxy(this.onBlurRandCodeInput, this));
            this.el.find(".input-email").on("keyup", $.proxy(this.onKeyupEmailInput, this));
            this.el.find(".sign-up").on("click", $.proxy(this.onClickSignIn, this));
            this.el.find(".checkbox").on("click", $.proxy(this.onClickCheckbox, this));
            this.el.find(".user-agree").on("click", $.proxy(this.onClickUserAgreement, this));
            this.el.find(".ico-facebook").on("click", $.proxy(this.onClickFacebookLogin, this));
            this.el.find(".ico-google").on("click", $.proxy(this.onClickGoogleLogin, this));

            utils.placeholder(this.el.find(".input-email"),i18nDi.fillDomText('common.email'));
            utils.placeholder(this.el.find(".input-pwd"),i18nDi.fillDomText('signin.loginInputText'));
            utils.placeholder(this.el.find(".input-pwdconfirm"),i18nDi.fillDomText('signin.conWordInputText'));
            utils.placeholder(this.el.find(".input-code"),i18nDi.fillDomText('signin.enterCodeInputText'));
                
            setTimeout(function(){
            	this.el.find(".randcode").get(0).src = theUserCenter.passport + "code.htm?method=randCode";
            }.bind(this), 20)
        },

        onKeyupEnter: function(event){
            if (event.keyCode === 13 && this.el.find(".checkbox").get(0).checked === true){
                this.el.find(".button-signup").click();
            }
        },

        onSelectMenuItem: function(item){
            clearTimeout(this.timer);
            var emailNode = this.el.find(".input-email");
            emailNode.get(0).value = item.label;
            this.onBlurEmailInput();
            this.dropMenu.toggleMenu();
            this.el.find(".placeholder").eq(0).hide();
        },

        onKeyupEmailInput: function(e){
            e.stopPropagation();
            e.preventDefault();

            var emailNode = this.el.find(".input-email");
            this.dropMenu.target = emailNode;

            if (!emailNode.get(0).value && this.dropMenu.visible === false) return false;
            if (!emailNode.get(0).value || emailNode.get(0).value.indexOf("@") > -1){
                if (this.dropMenu.visible) this.dropMenu.toggleMenu();
                return false
            }
            if (emailNode.get(0).value&&emailNode.get(0).value.indexOf("@") === -1&&e.keyCode !== 13&&e.keyCode !== 40&&e.keyCode !== 38){
                var itemList = [
                    {index: 1, label: emailNode.get(0).value + "@gmail.com"},
                    {index: 2, label: emailNode.get(0).value + "@yahoo.com"},
                    {index: 3, label: emailNode.get(0).value + "@hotmail.com"},
                    {index: 4, label: emailNode.get(0).value + "@ymail.com"},
                    {index: 5, label: emailNode.get(0).value + "@live.com"},
                ];
                this.dropMenu.updateList(itemList);

                if (!this.dropMenu.visible){
                    this.dropMenu.toggleMenu();
                }
            }
            if (e.keyCode === 13){
                var currentItem = this.dropMenu.getCurFocus();
                emailNode.get(0).value = currentItem.label;
                this.dropMenu.toggleMenu();
            } else if (e.keyCode === 40){
                this.dropMenu.focusNext();//向下方向键
            } else if (e.keyCode === 38){
                this.dropMenu.focusPrev();//向上方向键
            }
        },

        onBlurEmailInput: function(){
            var emailNode = this.el.find(".input-email");
            var errorNode = this.el.find(".error-email");
        	var emailValue = emailNode.get(0).value;

            if (emailValue){
            	this.isCorrect = emailNode.get(0).checkValidity()
            	if (this.isCorrect === false){
                    this.timer = setTimeout(function(){
                        errorNode.html(i18nDi.fillDomText('signin.errorEmailLabel'));
                    }, 200);
                    return false;
            	}
        		theUserCenter.verifyEmail(emailValue, $.proxy(this.onVerifyEmail, this))
        	} else {
                //errorNode.html(i18nDi.fillDomText('signin.emptyEmailLabel'));
                this.el.find(".correct-email").hide();
            }
        },

        onBlurPasswordInput: function(){
            var pwdNode = this.el.find(".input-pwd");
            var pwdValue = pwdNode.get(0).value;
            var errorNode = this.el.find(".error-pwd");
            var pwdConfirmNode = this.el.find(".input-pwdconfirm");
            var pwdConfirmValue = pwdConfirmNode.get(0).value;
            var errorNodePwd = this.el.find(".error-confirm");

            if (pwdValue){
                if (pwdValue.length < 8){
                    errorNode.html(i18nDi.fillDomText('signin.shortPwdLabel'));
                    this.el.find(".correct-pwd").hide();
                    this.isCorrectPwd = false;
                } else if (pwdValue.length > 20){
                    errorNode.html(i18nDi.fillDomText('signin.longPwdLabel'));
                    this.el.find(".correct-pwd").hide();
                    this.isCorrectPwd = false;
                } else if (pwdValue.match(/[\d]+/g) === null ||
                       pwdValue.match(/[a-zA-Z]+/g) === null ){
                    errorNode.html(i18nDi.fillDomText('signin.errorPwdLabel'));
                    this.el.find(".correct-pwd").hide();
                    this.isCorrectPwd = false;
                } else {
                    errorNode.html("");
                    this.el.find(".correct-pwd").show();
                    this.isCorrectPwd = true;
                }
                if (pwdConfirmValue) {
                    if(pwdValue === pwdConfirmValue){
                        errorNodePwd.html("");
                        this.el.find(".correct-cpwd").show();
                        this.isMatchPwd = true;
                    } else {
                        errorNodePwd.html(i18nDi.fillDomText('signin.notMatchPwdLbel'));
                        this.el.find(".correct-cpwd").hide();
                        this.isMatchPwd = false;
                    }
                }
            } else {
                this.el.find(".correct-pwd").hide();
                //errorNode.html(i18nDi.fillDomText('signin.emptyEmailLabel'));
            }
        },

        onBlurPasswordConfirm: function(){
            var pwdConfirmNode = this.el.find(".input-pwdconfirm");
            var pwdConfirmValue = pwdConfirmNode.get(0).value;
            var pwdNode = this.el.find(".input-pwd");
            var pwdValue = pwdNode.get(0).value;
            var errorNode = this.el.find(".error-confirm");

            if (!pwdConfirmValue){
                this.el.find(".correct-cpwd").hide();
                //errorNode.html(i18nDi.fillDomText('signin.emptyEmailLabel'));
            } else if (pwdValue !== pwdConfirmValue){
                errorNode.html(i18nDi.fillDomText('signin.notMatchPwdLbel'));
                this.el.find(".correct-cpwd").hide();
                this.isMatchPwd = false;
            } else {
                errorNode.html("");
                this.el.find(".correct-cpwd").show();
                this.isMatchPwd = true;
            }
        },

        onBlurRandCodeInput: function(){
            var codeNode = this.el.find(".input-code");
            var codeValue = codeNode.get(0).value;
            if (codeValue){
                theUserCenter.checkRandCode(codeValue, $.proxy(this.onCheckRandCode, this))
            } else {
                this.el.find(".correct-code").hide();
                //var errorNode = this.el.find(".error-code");
                //errorNode.html(i18nDi.fillDomText('signin.emptyEmailLabel'));
            }
        },

        onCheckRandCode: function(res){
            if (res){
                var errorNode = this.el.find(".error-code");
                if (res.result === false){
                    errorNode.html(i18nDi.fillDomText('signin.errorCodeLabel'));
                    this.el.find(".correct-code").hide();
                    this.isCorrectCode = false;
                } else {
                    errorNode.html("");
                    this.el.find(".correct-code").show();
                    this.isCorrectCode = true;
                }
            }
        },

        onVerifyEmail: function(res){
            console.log("邮箱验证回调", res.result)
            if (res){
                var errorNode = this.el.find(".error-email");
                if (res.result === false){
                    this.isCorrectEmail = false;
                    errorNode.html(i18nDi.fillDomText('signin.usedEmailLabel'));
                    this.el.find(".correct-email").hide();
                } else {
                    this.isCorrectEmail = true;
                    errorNode.html("");
                    this.el.find(".correct-email").show();
                }
            }
        },

        changCode: function(){
            this.el.find(".correct-code").hide();
            this.el.find(".randcode").get(0).src = theUserCenter.passport + "code.htm?method=randCode";
        },

        registerRequest: function(){
            var emailNode = this.el.find(".input-email");
            var pwdNode = this.el.find(".input-pwd");
            var pwdConfirmNode = this.el.find(".input-pwdconfirm");
            var codeNode = this.el.find(".input-code");

            if (this.isCorrect === false || this.isCorrectEmail === false){
                emailNode.focus();
                var errorNode = this.el.find(".error-email");
                errorNode.html(i18nDi.fillDomText('signin.errorEmailLabel'));
                return false;
            } else if (!emailNode.get(0).value){
                emailNode.focus();
                var errorNode = this.el.find(".error-email");
                errorNode.html(i18nDi.fillDomText('signin.emptyEmailLabel'));
                return false;
            } else if (!pwdNode.get(0).value){
                pwdNode.focus();
                var errorNode = this.el.find(".error-pwd");
                errorNode.html(i18nDi.fillDomText('signin.emptyEmailLabel'));
                this.el.find(".correct-pwd").hide();
                return false;
            } else if (!pwdConfirmNode.get(0).value){
                pwdConfirmNode.focus();
                var errorNode = this.el.find(".error-confirm");
                errorNode.html(i18nDi.fillDomText('signin.emptyEmailLabel'));
                this.el.find(".correct-cpwd").hide();
                return false;
            } else if (!codeNode.get(0).value){
                codeNode.focus();
                var errorNode = this.el.find(".error-code");
                errorNode.html(i18nDi.fillDomText('signin.emptyEmailLabel'));
                this.el.find(".correct-code").hide();
                return false;
            } else if (this.isCorrectPwd === false){
                return false;
            } else if (this.isCorrectCode === false){
                this.changCode();
                this.isCorrectCode = true;
                return false;
            } else if (this.isMatchPwd === false){
                return false;
            } else if (pwdNode.get(0).value !== pwdConfirmNode.get(0).value){
                var errorNodePwd = this.el.find(".error-confirm");
                errorNodePwd.html(i18nDi.fillDomText('signin.notMatchPwdLbel'));
                this.el.find(".correct-cpwd").hide();
                return false;
            }

            var registerData = {};
            registerData.email = emailNode.get(0).value;
            registerData.password = pwdNode.get(0).value;
            registerData.accountType = 0;
            registerData.randCode = codeNode.get(0).value;

            theUserCenter.register(registerData, $.proxy(this.onRegister, this, registerData));

            //*********************************************************
            //20140924
            var logObject = {
                page: "usersystem_signin",
                module: "signup",
                action: "to_myaccount"
            }
            utils.sendNewLog("1000120", logObject);
            //*********************************************************   
        },

        onRegister: function(registerData, res){
            console.log("注册信息 >> ", registerData)
            if (res){
                if (res.result === true){
                    var loginData = {};
                    loginData.account = registerData.email;
                    loginData.pwd = registerData.password;
                    loginData.loginType = 0;
                    theUserCenter.login(loginData, $.proxy(this.opts.loginView.onLogin, this.opts.loginView, loginData));
                } else if (res.errorCode === 1002){
                    this.changCode();
                    var confirmDlg = new UIDialog({
                        buttonKey : 2, //1双按钮
                        content : i18nDi.fillDomText('signin.errorCodeLabel'),
                        title: i18nDi.fillDomText('signin.signUpHeader')
                    });
                    confirmDlg.show();
                    confirmDlg.on("yes", function(){
                        confirmDlg.close();
                    });
                } else {
                    var confirmDlg = new UIDialog({
                        buttonKey : 2, //1双按钮
                        content : i18nDi.fillDomText('signin.registerFailedLabel'),
                        title: i18nDi.fillDomText('signin.signUpHeader')
                    });
                    confirmDlg.show();
                    confirmDlg.on("yes", function(){
                        confirmDlg.close();
                    });
                }
            } else {
                var confirmDlg = new UIDialog({
                    buttonKey : 2, //1双按钮
                    content : i18nDi.fillDomText('signin.networkLabel'),
                    title: i18nDi.fillDomText('signin.signUpHeader')
                });
                confirmDlg.show();
                confirmDlg.on("yes", function(){
                    confirmDlg.close();
                });
            }
        },

        onClickSignIn: function(isShowLogin){
            $(document).off("keyup", $.proxy(this.onKeyupEnter, this));
            $(document).on("keyup", $.proxy(this.opts.loginView.onKeyupEnter, this.opts.loginView));
            if (isShowLogin !== false){
                this.el.hide();
                this.opts.loginView.el.show();
                this.opts.win.setHeader(i18nDi.fillDomText('common.headSignIn'));
                app.dal.request({
                    action : apiNames.REQ_RESIZE_WINDOW,
                    paras : {width:340, height:310}
                });
                app.dal.request({
                    action : "get_CenterWindow",
                    paras : {}
                });
            }
        },

        onClickFacebookLogin: function(){
            this.onClickSignIn(false);
            this.opts.loginView.el.find(".ico-facebook").click();
        },

        onClickGoogleLogin: function(){
            this.onClickSignIn(false);
            this.opts.loginView.el.find(".ico-google").click();
        },

        onClickCheckbox : function(event){
            if (event.target.checked === true){
                this.el.find(".button-signup").removeAttr("disabled");
            } else {
                this.el.find(".button-signup").attr("disabled", "disabled");
            }
        },

        onClickUserAgreement: function(){
            app.dal.request({
                action : "get_OpenUrlUseDefBrowser",
                paras : {url: "http://www.mobogenie.com/eula.html"},
                callback : function(){}
            });
        }
    });
    
    return RegisterView;
});