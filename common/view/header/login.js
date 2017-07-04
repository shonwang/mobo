define('UILogin', function(require, exports, module){
    var app = require('app');
    var i18nDi  = require('I18NDI');
    var   $ = require('jquery');
    var   _ = require('underscore');
    var utils = require('utils');
    var theUserCenter = require('userCenter');
    var UIMenu = require('UIMenu');
    var apiNames = require('APINames');
    var UIDialog = require('UIDialog');
    var Loading = require('loading');
    var PersonalView = require('UIPersonalView');
    var RegisterView = require('UIRegister');

    var ThirdLoginView = app.ViewBase.extend({
        module: module,
        init: function(opts){
            this.opts = opts;
            this.el = $(_.template(this.getTpl('tpl-login-third'), {I18N: i18nDi}));

            this.loadingPage = new Loading();
            this.loadingPage.render(this.el);
            this.loadingPage.el.css("height", "400px");
            this.loadingPage.show();

            var redirectUrl = "https://passport.mobogenie.com/thirdApp/faceBook/login.htm";
            var me = this;
            var ThirdApp = {
                faceBook:{
                    login_url:"https://www.facebook.com/dialog/oauth",
                    client_id:"244094252459813",
                    redirect_uri: redirectUrl
                },
                faceBookLogin:function(callback){
                    var url = ThirdApp.faceBook.login_url;
                    url += "?client_id="+ ThirdApp.faceBook.client_id;
                    url += "&scope=basic_info,email";
                    url += "&response_type=code";
                    url += "&redirect_uri=";
                    url += ThirdApp.faceBook.redirect_uri;
                    // callback = callback||Tools.QueryString("url");
                    // if(callback){
                    //     url += "?url=" + encodeURIComponent(callback);
                    // }
                    //window.location.href = url;
                    var iframeEl = me.el.find("#third-frame").get(0);
                    iframeEl.src = url;
                    var isLoginSuccess = false;
                    var isCompleted = false;
                    var count = 0;

                    iframeEl.onload = function(){
                        console.log("页面载入结束...");
                        // if (isCompleted === false){
                        //     isCompleted = true;
                        //     me.timer = setInterval(function(){
                                var iframeDoc = iframeEl.contentWindow.document;
                                var titleNode = $(iframeDoc).find("title");

                                if (titleNode&&titleNode.html()&&titleNode.html().indexOf("User Center") > -1){
                                    //clearInterval(me.timer);
                                    console.log("第三方登录成功。。。。");
                                    $(iframeEl).hide();
                                    if (isLoginSuccess === false){
                                        isLoginSuccess = true;
                                        theUserCenter.getUserInfo(function(res){
                                            me.loadingPage.hide();
                                            res.isFromThird = true;
                                            console.log("获取第三方登录信息。。。。",res);
                                            callback&&callback({}, res);
                                        });
                                    }
                                } else if (titleNode&&titleNode.html()&&titleNode.html().indexOf("Facebook") > -1){
                                    $(iframeDoc).find("#pageFooter").hide();
                                    $(iframeDoc).find(".localeSelectorList").hide();
                                    $(iframeDoc).find(".reset_password").hide();
                                    $(iframeDoc).find("#register_link").hide();
                                    $(iframeDoc).find(".signup_box_content").hide();
                                    $(iframeDoc).find(".loggedout_menubar a").attr("target", "_blank");
                                    
                                    me.loadingPage.hide();
                                    $(iframeEl).show();
                                    console.log("已经打开Facebook，还没有登录...");
                                } else {
                                    console.log("错误的页面...");
                                    // if (count >= 10 && isLoginSuccess === false){
                                        //clearInterval(me.timer);
                                        var confirmDlg = new UIDialog({
                                            buttonKey : 2, //1双按钮
                                            content : i18nDi.fillDomText('signin.promptFailAuth'),
                                            title: i18nDi.fillDomText('common.headSignIn')
                                        });
                                        confirmDlg.show();
                                        confirmDlg.on("ok", function(){
                                            me.opts.win.close();
                                        });
                                    // }
                                }

                        //         count = count + 1;
                        //     }, 1000);
                        // }
                    };
                    // app.dal.request({
                    //     action : "get_OpenUrlUseDefBrowser",
                    //     paras : {url: url},
                    //     callback : function(){}
                    // });
                    // this.loginPannel = new app.PopupPanel({
                    //     Model: 3,
                    //     Width: 340,
                    //     Height: 410,
                    //     Path: url,
                    //     isHttp: true,
                    //     Parame: {
                    //         isLogin: this.isLogin, 
                    //         userInfo: this.userInfo
                    //     }
                    // });   
                    // this.loginPannel.open();
                    //window.open(url);
                    //window.open("https://passport.mobogenie.com/personal.htm?method=index#_=_")
                },
                google:{
                    login_url:"https://accounts.google.com/o/oauth2/auth",
                    client_id:"519248511738-apsiq99peao6f5c92agucaqc4qfjer6g.apps.googleusercontent.com",
                    redirect_uri: "https://passport.mobogenie.com/thirdApp/google/login.htm"
                },
                googleLogin:function(callback){
                    var url = ThirdApp.google.login_url;
                    url += "?client_id="+ ThirdApp.google.client_id;
                    url += "&scope=https://www.googleapis.com/auth/userinfo.email+https://www.googleapis.com/auth/userinfo.profile";
                    url += "&response_type=code";
                    url += "&redirect_uri=";
                    url += ThirdApp.google.redirect_uri;
                    //window.location.href = url;
                    //me.el.find("#third-frame").get(0).src = url;
                    var iframeEl = me.el.find("#third-frame").get(0);
                    iframeEl.src = url;
                    var isGLoginSuccess = false;
                    var isCompleted = false;
                    var count = 0;

                    iframeEl.onload = function(){
                        // if (isCompleted === false){
                        //     isCompleted = true;
                        //     me.timer = setInterval(function(){
                                var iframeDoc = iframeEl.contentWindow.document;
                                var titleNode = $(iframeDoc).find("title");
                                var googleAccessNode = $(iframeDoc).find("#submit_approve_access");

                                if (titleNode&&titleNode.html()&&titleNode.html().indexOf("User Center") > -1 ||
                                    googleAccessNode.get(0)){
                                    // clearInterval(me.timer);
                                    if (!googleAccessNode.get(0)){                                        
                                        if (isGLoginSuccess === false){
                                            isGLoginSuccess = true;
                                            $(iframeEl).hide(); 
                                            theUserCenter.getUserInfo(function(res){
                                                me.loadingPage.hide();
                                                res.isFromThird = true;
                                                console.log(res);
                                                callback&&callback({}, res);
                                            });
                                        }
                                    } else {
                                        $(iframeEl).show();
                                        me.loadingPage.hide();
                                        $(iframeDoc).find(".gb_5").hide();
                                    }
                                } else if (titleNode&&titleNode.html()&&titleNode.html().indexOf("Google") > -1){
                                    $(iframeDoc).find("#link-signup").hide();
                                    $(iframeDoc).find("#link-forgot-passwd").hide();
                                    $(iframeDoc).find(".footer").hide();
                                    
                                    me.loadingPage.hide();
                                    $(iframeEl).show();
                                    console.log("还没有登录...");
                                } else {
                                    console.log("登录ing...");
                                    // if (count >= 10 && isLoginSuccess === false){
                                        // clearInterval(me.timer);
                                        var confirmDlg = new UIDialog({
                                            buttonKey : 2, //1双按钮
                                            content : i18nDi.fillDomText('signin.promptFailAuth'),
                                            title: i18nDi.fillDomText('common.headSignIn')
                                        });
                                        confirmDlg.show();
                                        confirmDlg.on("ok", function(){
                                            me.opts.win.close();
                                        });
                                    // }
                                }

                        //         count = count + 1;
                        //     }, 1000);
                        // }
                    };
                }
            };
            this.ThirdApp  = ThirdApp; 
        },

        render: function(target){
            this.el.appendTo(target);
        }
    });
        
    var LoginView = app.ViewBase.extend({
        module: module,
        init: function(opts){
            this.opts = opts;
            
            this.el = $(_.template(this.getTpl('tpl-login-view'), {I18N: i18nDi}));
            this.isCorrectEmail = true;
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
        },

        render: function(target){
            this.el.appendTo(target);

            this.el.find(".button-login").on("click", $.proxy(this.loginRequest, this));
            $(document).on("keyup", $.proxy(this.onKeyupEnter, this));

            this.el.find(".input-email-login").on("blur", $.proxy(this.onBlurEmailInput, this));
            this.el.find(".input-pwd-login").on("blur", $.proxy(this.onBlurPasswordInput, this));
            //this.el.find(".input-pwd-login").on("focus", $.proxy(this.onFocusPasswordInput, this));
            this.el.find(".input-email-login").on("keyup", $.proxy(this.onKeyupEmailInput, this));
            this.el.find(".sign-up").on("click", $.proxy(this.onClickSignup, this));
            this.el.find(".forgot-pwd").on("click", $.proxy(this.onClickForgotPwd, this));
            this.el.find(".ico-facebook").on("click", $.proxy(this.onClickFacebook, this));
            this.el.find(".ico-google").on("click", $.proxy(this.onClickGoogle, this));

            utils.placeholder(this.el.find(".input-pwd-login"),i18nDi.fillDomText('signin.loginInputText'));
            utils.placeholder(this.el.find(".input-email-login"),i18nDi.fillDomText('common.email'));

            // var options = {win : this.opts.win};
            // this.personalView = new PersonalView(options);
            // this.personalView.render(this.opts.win.el.find('.g-window-ctn'));

            if (this.opts.para.isLogin === false){
                // this.personalView.el.hide();
                this.opts.win.setHeader(i18nDi.fillDomText('common.headSignIn'));
                app.dal.request({
                    action : apiNames.REQ_RESIZE_WINDOW,
                    paras : {width:340, height:310}
                });
                app.dal.request({
                    action : "get_CenterWindow",
                    paras : {}
                });
            } else {
                // this.el.hide();
                // this.opts.win.setHeader(i18nDi.fillDomText('signin.myAccountLabel'));
                // app.dal.request({
                //     action : apiNames.REQ_RESIZE_WINDOW,
                //     paras : {width:340, height:410}
                // });
                // if (this.opts.para.userInfo.emailVerified !== 1){
                //     this.personalView.userPersonalCenter(false, this.opts.para.userInfo);
                // } else {
                //     this.personalView.userPersonalCenter(true, this.opts.para.userInfo);
                // }
            }
        },

        onKeyupEnter: function(event){
            if (event.keyCode === 13){
                this.loginRequest();
            }
        },

        onSelectMenuItem: function(item){
            clearTimeout(this.timer);
            var emailNode = this.el.find(".input-email-login");
            emailNode.get(0).value = item.label;
            this.onBlurEmailInput();
            this.dropMenu.toggleMenu();
            this.el.find(".placeholder").eq(0).hide();
        },

        onKeyupEmailInput: function(e){
            e.stopPropagation();
            e.preventDefault();

            var emailNode = this.el.find(".input-email-login");
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
            var emailNode = this.el.find(".input-email-login");
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
                errorNode.html(i18nDi.fillDomText('signin.emptyEmailLabel'));
                this.el.find(".correct-email").hide();
            }
        },

        onFocusPasswordInput: function(){
            app.dal.request({
                action : "get_CapsLockKeyState",
                paras : {},
                callback: function(res){
                    if (res&&res.status === 1){
                        if (res.capsLock === 0){
                        } else if (res.capsLock === 1){
                        }
                    }
                }
            });
        },

        onBlurPasswordInput: function(){
            var pwdNode = this.el.find(".input-pwd-login");
            var pwdValue = pwdNode.get(0).value;
            var errorNode = this.el.find(".error-pwd");
            if (pwdValue){
                errorNode.html("");
                //this.el.find(".correct-pwd").show();
                // if (pwdValue.length < 8){
                //     errorNode.html("密码太短了，至少要8位");
                // } else if (pwdValue.length > 20){
                //     errorNode.html("密码太长了，不能超过20位");
                // } else if (pwdValue.match(/[\d]+/g) === null ||
                //        pwdValue.match(/[a-zA-Z]+/g) === null ){
                //     errorNode.html("必须是数字和字母的组合");
                // } else {
                //     errorNode.html("输入正确");
                // }
            } else {
                //errorNode.html(i18nDi.fillDomText('signin.emptyEmailLabel'));
            }
        },

        onVerifyEmail: function(res){
            console.log("邮箱验证回调", res.result)
            if (res){
                var errorNode = this.el.find(".error-email");
                if (res.result === false){
                    errorNode.html("");
                    this.el.find(".correct-email").show();
                    this.isCorrectEmail = true;
                } else {
                    errorNode.html(i18nDi.fillDomText('signin.nullAccount'));
                    this.isCorrectEmail = false;
                    this.el.find(".correct-email").hide();
                }
            }
        },

        loginRequest: function(){
            var emailNode = this.el.find(".input-email-login");
            var pwdNode = this.el.find(".input-pwd-login");
            var pwdConfirmNode = this.el.find(".input-pwdconfirm");
            var codeNode = this.el.find(".input-code");

            // emailNode.get(0).value = "barryoq75523@21cn.com";
            // pwdNode.get(0).value = "zxcv123456";

            if (this.isCorrect === false){
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
            } else if (this.isCorrectEmail === false){
                emailNode.focus();
                var errorNode = this.el.find(".error-email");
                errorNode.html(i18nDi.fillDomText('signin.nullAccount'));
                return false;
            }

            var loginData = {};
            loginData.account = emailNode.get(0).value;
            loginData.pwd = pwdNode.get(0).value;
            loginData.loginType = 0;

            // this.opts.win.notifyParentWindow({
            //     action: 'login',
            //     para: loginData
            // })
            theUserCenter.login(loginData, $.proxy(this.onLogin, this, loginData));

            this.personalView = new PersonalView(this.opts);
            this.personalView.render(this.opts.win.el.find('.g-window-ctn'));
            this.personalView.el.hide();

            //*********************************************************
            //20140924
            var logObject = {
                page: "usersystem_signin",
                module: "signup_signin",
                action: "to_myaccount"
            }
            utils.sendNewLog("1000120", logObject);
            //*********************************************************  
        },

        getSelectPortraitView: function(){
            if (this.personalView&&this.personalView.selectPortrait){
                return this.personalView.selectPortrait;
            } else {
                return null;
            }
        },

        onLogin: function(loginData, res){
            console.log("登录", res)
            if (res){
                if (res.result === true){
                    //更改sign in为头像
                    this.opts.win.notifyParentWindow({
                        action: 'changeHeader',
                        para: {
                            imagePath: res.imagePath,
                            userInfo : res
                        }
                    })
                    if (res.isFromThird !== true){
                        // this.opts.win.notifyParentWindow({
                        //     action: 'storeAccount',
                        //     para: {
                        //         account: loginData.account,
                        //         pwd: loginData.pwd
                        //     }
                        // })
                    }
                    this.el.hide();
                    $(document).off("keyup", $.proxy(this.onKeyupEnter, this));
                    if (this.registerView){
                        this.registerView.el.hide();
                        $(document).off("keyup", $.proxy(this.registerView.onKeyupEnter, this.registerView));
                    }
                    if (this.thirdView){
                        this.thirdView.el.hide();
                    }
                    if(!this.personalView){
                        this.personalView = new PersonalView(this.opts);
                        this.personalView.render(this.opts.win.el.find('.g-window-ctn'));
                    } else {
                        this.personalView.el.show();
                    }
                    this.opts.win.setHeader(i18nDi.fillDomText('signin.myAccountLabel'));
                    app.dal.request({
                        action : apiNames.REQ_RESIZE_WINDOW,
                        paras : {width:340, height:410}
                    });
                    app.dal.request({
                        action : "get_CenterWindow",
                        paras : {}
                    });
                    if(res.emailVerified !== 1){
                        //显示没有验证邮箱的界面;
                        this.personalView.userPersonalCenter(false, res);
                    } else {
                        //显示经过邮箱验证的个人中心;
                        this.personalView.userPersonalCenter(true, res);
                    }
                    app.dal.request({
                        action : "get_Login",
                        paras : {uid: res.uid}
                    });
                } else {
                    //错误的用户名或者密码
                    if (res.errorCode === 2002){
                        var errorNode = this.el.find(".error-pwd");
                        errorNode.html(i18nDi.fillDomText('signin.errorLoginLbel'));
                    } else if (res.errorCode === 2001){}
                    app.dal.request({
                        action : "get_Login",
                        paras : {uid: null}
                    });
                }
            } else {
                var confirmDlg = new UIDialog({
                    buttonKey : 2, //1双按钮
                    content : i18nDi.fillDomText('signin.networkLabel'),
                    title: i18nDi.fillDomText('common.headSignIn')
                });
                confirmDlg.show();
                confirmDlg.on("yes", function(){
                    confirmDlg.close();
                });
                app.dal.request({
                    action : "get_Login",
                    paras : {uid: null}
                });
            }
        },

        onClickSignup: function(){
            $(document).off("keyup", $.proxy(this.onKeyupEnter, this));
            var me = this;
            this.el.hide();
            var win = this.opts.win;
            var options = {
                win : win, 
                loginView: me
            };
            if (this.registerView){
                this.registerView.el.show();
                $(document).on("keyup", $.proxy(this.registerView.onKeyupEnter, this.registerView));
            } else {
                this.registerView = new RegisterView(options);
                this.registerView.render(win.el.find('.g-window-ctn'));
            }
            this.opts.win.setHeader(i18nDi.fillDomText('signin.signUpHeader'));
            app.dal.request({
                action : apiNames.REQ_RESIZE_WINDOW,
                paras : {width:340, height:410}
            });
            app.dal.request({
                action : "get_CenterWindow",
                paras : {}
            });

            //*********************************************************
            //20140924
            var logObject = {
                page: "usersystem_signin",
                module: "signup_signin",
                action: "to_signup"
            }
            utils.sendNewLog("1000120", logObject);
            //*********************************************************  
        },

        onClickForgotPwd: function(){
            app.dal.request({
                action : "get_OpenUrlUseDefBrowser",
                paras : {url: "https://passport.mobogenie.com/personal.htm?method=forgotPwd"},
                callback : function(){}
            });

            //*********************************************************
            //20140924
            var logObject = {
                page: "usersystem_signin",
                module: "signup_signin",
                action: "to_forgotpassword"
            }
            utils.sendNewLog("1000120", logObject);
            //********************************************************* 
        },

        onClickFacebook: function(){
            app.dal.request({
                action : "get_Url",
                paras : {url: "www.mobogenie.com"},
                callback : function(res) {
                    if (res&&res.code === 18){
                        var confirmDlg = new UIDialog({
                            buttonKey : 2, //1双按钮
                            content : i18nDi.fillDomText('signin.networkLabel'),
                            title: i18nDi.fillDomText('common.headSignIn')
                        });
                        confirmDlg.show();
                        confirmDlg.on("yes", function(){
                            confirmDlg.close();
                        });
                    } else {
                        this.el.hide();
                        if (this.registerView){
                            this.registerView.el.hide();
                        }
                        if (this.thirdView){
                            this.thirdView = null;
                            this.thirdView.el.remove();
                        }
                        var options = {win : this.opts.win};
                        this.thirdView =  new ThirdLoginView(options);
                        this.thirdView.render(this.opts.win.el.find('.g-window-ctn'));
                        this.thirdView.ThirdApp.faceBookLogin($.proxy(this.onLogin, this));
                        this.thirdView.el.addClass("third-box");
                        this.thirdView.el.find("#third-frame").addClass("third-facebook");

                        app.dal.request({
                            action : apiNames.REQ_RESIZE_WINDOW,
                            paras : {width:680, height:450}
                        });
                        app.dal.request({
                            action : "get_CenterWindow",
                            paras : {}
                        });
                    }
                }.bind(this)
            });

            //*********************************************************
            //20140924
            var logObject = {
                page: "usersystem_signin",
                module: "signup_signin",
                action: "facebook_signin"
            }
            utils.sendNewLog("1000120", logObject);
            //********************************************************* 
        },

        onClickGoogle: function(){
            app.dal.request({
                action : "get_Url",
                paras : {url: "www.mobogenie.com"},
                callback : function(res) {
                    if (res&&res.code === 18){
                        var confirmDlg = new UIDialog({
                            buttonKey : 2, //1双按钮
                            content : i18nDi.fillDomText('signin.networkLabel'),
                            title: i18nDi.fillDomText('common.headSignIn')
                        });
                        confirmDlg.show();
                        confirmDlg.on("yes", function(){
                            confirmDlg.close();
                        });
                    } else {
                        this.el.hide();
                        if (this.registerView){
                            this.registerView.el.hide();
                        }

                        if (this.thirdView){
                            this.thirdView = null;
                            this.thirdView.el.remove();
                        }

                        var options = {win : this.opts.win};
                        this.thirdView =  new ThirdLoginView(options);
                        this.thirdView.render(this.opts.win.el.find('.g-window-ctn'));
                        this.thirdView.ThirdApp.googleLogin($.proxy(this.onLogin, this));
                        this.thirdView.el.addClass("third-box");
                        this.thirdView.el.find("#third-frame").addClass("third-google");

                        app.dal.request({
                            action : apiNames.REQ_RESIZE_WINDOW,
                            paras : {width:680, height:450}
                        });
                        app.dal.request({
                            action : "get_CenterWindow",
                            paras : {}
                        });  
                    }
                }.bind(this)
            });

            //*********************************************************
            //20140924
            var logObject = {
                page: "usersystem_signin",
                module: "signup_signin",
                action: "google_signin"
            }
            utils.sendNewLog("1000120", logObject);
            //*********************************************************   
        }  
    });
    
    return LoginView;
});