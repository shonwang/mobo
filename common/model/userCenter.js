define('userCenter', function(require, exports, module){
    var app = require('app');
    var $ = require('jquery');
    require('jquery.form');

    var UserCenter = app.ModelBase.extend({
        init: function(){
            this.defaultParas = {
                type: "post",
                url: '',
                async: true,
                dataType: 'jsonp',
                timeout: 60000
            };
            this.passport = "https://passport.mobogenie.com/";
        },
        
        getUserInfo: function(callback){
            var paras = $.extend({}, this.defaultParas);
            paras.url = this.passport + "login.htm";
            
            paras.data = {};
            paras.data.method = 'getUserInfo';

            // paras.beforeSend = function(){
            //     xhr.setRequestHeader("If-Modified-Since", 0);
            // }
            
            paras.success = function(res){
                console.log('getUserInfo >> ', res);
                callback && callback(res);
            };

            paras.error = function(response, msg){
                console.log("getUserInfo >> error XMLHttpRequest obj: ", response);
                console.log("getUserInfo >> 失败啦！！！ ", msg);
                callback && callback();
            };
            
            app.dal.request({
                action : "get_Url",
                paras : {url: "www.mobogenie.com"},
                callback : function(res) {
                    if (res&&res.code === 18){
                        paras.error();
                    } else {
                        $.ajax(paras);
                    }
                }
            });
        },
        
        login: function(data, callback){
            var paras = $.extend({}, this.defaultParas);
            paras.url = this.passport + "login.htm";

            data.method = "login";
            paras.data = data;

            paras.beforeSend = function(xhr){
                console.log(xhr)
            };

            paras.success = function(res){
                console.log("login >> ", res);
                callback && callback(res);
            };

            paras.error = function(response, msg){
                console.log("login >> error XMLHttpRequest obj: ", response);
                console.log("login >> 失败啦！！！ ", msg);
                callback && callback();
            };
            app.dal.request({
                action : "get_Url",
                paras : {url: "www.mobogenie.com"},
                callback : function(res) {
                    if (res&&res.code === 18){
                        paras.error();
                    } else {
                        $.ajax(paras);
                    }
                }
            });
        },

        isLogin: function(){
            
        },
        
        register: function(data, callback){
            var paras = $.extend({}, this.defaultParas);
            paras.url = this.passport + 'reg.htm';
            data.method = 'register';
            paras.data = data;
            
            paras.success = function(res){
                console.log("register >> ", res);
                callback && callback(res);
            };

            paras.error = function(response, msg){
                console.log("register >> error XMLHttpRequest obj: ", response);
                console.log("register >> 失败啦！！！ ", msg);
                callback && callback();
            };
            
            app.dal.request({
                action : "get_Url",
                paras : {url: "www.mobogenie.com"},
                callback : function(res) {
                    if (res&&res.code === 18){
                        paras.error();
                    } else {
                        console.log("register >> send XMLHttpRequest obj: ", paras);
                        $.ajax(paras);
                    }
                }
            });
        },
        
        getVerifyCode: function(data){
            var img = new Image();
            img.src = VERIFY_CODE_URL + '?method=randCode';
            return img;
        },

        checkRandCode: function(randcode, callback){
            var checkRandCodeUrl = this.passport + 'code.htm';
            var p = $.extend({}, this.defaultParas);
            p.data = {};
            p.data.method = "checkRandCode";
            p.data.randCode = randcode;
            p.url = checkRandCodeUrl;

            p.success = function(res){
                console.log('checkRandCode >> ', res);
                callback && callback(res);
            };
            p.error = function(response, msg){
                console.log("checkRandCode >> error XMLHttpRequest obj: ", response);
                console.log("checkRandCode >> 失败啦！！！ ", msg);
            };
            $.ajax(p);
        },

        verifyEmail: function(email, callback){
            var verifyEmailUrl = this.passport + 'reg.htm';
            var p = $.extend({}, this.defaultParas);
            p.data = {};
            p.data.method = "verify";
            p.data.email = email;
            p.url = verifyEmailUrl;

            p.success = function(res){
                console.log('verifyEmailRequest >> ', res);
                callback && callback(res);
            };
            p.error = function(response, msg){
                console.log("verifyEmailRequest >> error XMLHttpRequest obj: ", response);
                console.log("verifyEmailRequest >> 失败啦！！！ ", msg);
            };
            $.ajax(p);
        },

        sendActiveAccoutEmail: function(callback){
            var verifyEmailUrl = this.passport + 'user.htm';
            var p = $.extend({}, this.defaultParas);
            p.data = {};
            p.data.method = "sendActiveAccoutEmail";
            p.url = verifyEmailUrl;

            p.success = function(res){
                console.log('sendActiveAccoutEmail >> ', res);
                callback && callback(res);
            };
            p.error = function(response, msg){
                console.log("sendActiveAccoutEmail >> error XMLHttpRequest obj: ", response);
                console.log("sendActiveAccoutEmail >> 失败啦！！！ ", msg);
                callback && callback();
            };

            app.dal.request({
                action : "get_Url",
                paras : {url: "www.mobogenie.com"},
                callback : function(res) {
                    if (res&&res.code === 18){
                        p.error();
                    } else {
                        $.ajax(p);
                    }
                }
            }); 
        },

        logout: function(callback){
            var logoutUrl = this.passport + 'login.htm';
            var p = $.extend({}, this.defaultParas);
            p.data = {};
            p.data.method = "logout";
            p.url = logoutUrl;

            p.success = function(res){
                console.log('logout >> ', res);
                callback && callback(res);
            };
            p.error = function(response, msg){
                console.log("logout >> error XMLHttpRequest obj: ", response);
                console.log("logout >> 失败啦！！！ ", msg);
                callback && callback();
            };
            app.dal.request({
                action : "get_Url",
                paras : {url: "www.mobogenie.com"},
                callback : function(res) {
                    if (res&&res.code === 18){
                        p.error();
                    } else {
                        $.ajax(p);
                    }
                }
            }); 
        },

        changePortrait: function(imagePath, callback){
            var portraitUrl = this.passport + 'user.htm';
            var p = $.extend({}, this.defaultParas);
            p.data = {};
            p.data.method = "saveHeadImage";
            p.data.imagePath = imagePath;
            p.url = portraitUrl;

            p.success = function(res){
                console.log('changePortrait >> ', res);
                callback && callback(res);
            };
            p.error = function(response, msg){
                console.log("changePortrait >> error XMLHttpRequest obj: ", response);
                console.log("changePortrait >> 失败啦！！！ ", msg);
                callback && callback()
            };
            $.ajax(p); 
        },

        uploadPortrait: function(form, callback) {
            var portraitUrl = this.passport + 'upload.htm?method=uploadHeadImg'; 
            var options = {  
                    dataType : "json",  
                    beforeSubmit : function() {  
                        form.attr("action", portraitUrl);
                    },  
                    success : function(res) {
                        console.log("上传头像回调：", res)  
                        callback && callback(res);
                    },  
                    error : function(result) { 
                        console.log("Upload Fail,Please try again!",result);
                        callback && callback();
                    }  
            };  
            form.attr("action", portraitUrl);

            app.dal.request({
                action : "get_Url",
                paras : {url: "www.mobogenie.com"},
                callback : function(res) {
                    if (res&&res.code === 18){
                        options.error();
                    } else {
                        form.ajaxSubmit(options); 
                    }
                }
            });  
        },

        changePwd: function(data, callback){
            var modifyPwdUrl = this.passport + 'user.htm';
            var p = $.extend({}, this.defaultParas);
            p.data = {};
            p.data.method = "modifyPwd";
            p.data.oldPwd = data.oldPwd;
            p.data.newPwd = data.newPwd
            p.url = modifyPwdUrl;

            p.success = function(res){
                console.log('modifyPwd >> ', res);
                callback && callback(res);
            };
            p.error = function(response, msg){
                console.log("modifyPwd >> error XMLHttpRequest obj: ", response);
                console.log("modifyPwd >> 失败啦！！！ ", msg);
                callback && callback();
            };
            app.dal.request({
                action : "get_Url",
                paras : {url: "www.mobogenie.com"},
                callback : function(res) {
                    if (res&&res.code === 18){
                        p.error();
                    } else {
                        $.ajax(p);
                    }
                }
            }); 
        }
    });
    
    var instance = new UserCenter();
    window.userInstance = instance;
    
    return instance;
});
