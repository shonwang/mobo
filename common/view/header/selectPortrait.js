define("UISelectPortraitView", function(require, exports, module) {
    var app = require('app');
    var   $ = require('jquery');
    var _ = require('underscore');
    var i18nDi  = require('I18NDI');
    var  utils = require('utils');
	var apiNames = require('APINames');
    var theUserCenter = require('userCenter');
    var UIDialog = require('UIDialog');
    require('jquery.imgAreaSelect');

    var SelectPortraitView = app.ViewBase.extend({
        module: module,
        init: function(opts){
            this.opts = opts;
            this.el = $(_.template(this.getTpl('tpl-select-portrait-view'), {I18N: i18nDi}));
            this.el.find(".cut-panel").hide();
            this.el.find(".select-wrap .label").hide();
            this.el.find(".upload-wrap").hide();
            this.isConnect = this.opts.para.connectInfo;
            this.picPath = "";
            this.lastSelection = {
                path: this.picPath,
                width: 50,
                height: 50,
                left: 0,
                top: 0
            },
            this.isInitSelect = false;
            this.isGetPhonePic = false;
            this.getPhonePicCount = 0;
        },

        render: function(target){
            this.el.appendTo(target);
            this.el.find(".select-pc").on("click", $.proxy(this.onClickSelectPC, this));
            this.el.find(".select-phone").on("click", $.proxy(this.onClickSelectPhone, this));
            this.el.find(".set-pic").on("click", $.proxy(this.onClickSetAsProfile, this));
        },

        setConnectInfo: function(isConnect){
            console.log("图片裁剪 >> 手机连接状态：", isConnect);
            this.isConnect = isConnect;
        },

        onSelectImgEnd: function(img, selection){
            if (selection.width === 0 || selection.height === 0){
                var option = {
                    aspectRatio: "1:1",
                    handles: "corners",
                    show: true,
                    x1:0,
                    y1:0,
                    x2:50,
                    y2:50,
                    minHeight: 50,
                    minWidth: 50,
                    persistent: true,
                    instance: true,
                    parent: this.el.find(".cut-panel"),
                    onSelectChange: function(img, selection){
                        // var rate = selection.width / 200;
                        // $('#small').width(originWidth / rate);
                        // $('#small').height(originHeight / rate);
                        // $('#small').css("margin-left", selection.x1 / rate * -1);
                        // $('#small').css("margin-top", selection.y1 / rate * -1);
                    },
                    onSelectEnd: $.proxy(this.onSelectImgEnd, this)
                }
                this.imgSelectObj.setOptions(option)
                //this.imgSelectObj.setSelection(0,0,50,50);
                this.imgSelectObj.update();
                return;
            }
            // var rate = selection.width / 200;
            // $('#small').width(originWidth / rate);
            // $('#small').height(originHeight / rate);
            // $('#small').css("margin-left", selection.x1 / rate * -1);
            // $('#small').css("margin-top", selection.y1 / rate * -1);
            console.log("图片裁剪 >> 选择结果1：", img);
            console.log("图片裁剪 >> 选择结果2：", selection);

            this.lastSelection = {
                path: this.picPath,
                width: selection.width,
                height: selection.height,
                left: selection.x1,
                top:selection.y1
            }
            console.log("图片裁剪 >> 选择结果3：", this.lastSelection);
        },

        onClickSetAsProfile: function(){
            if (this.lastSelection){
                app.dal.request({
                    action : "get_CutImage",
                    paras : this.lastSelection,
                    callback : $.proxy(this.onCutPictrueDone, this)
                });
                this.el.find(".cut-panel").hide();
                this.el.find(".upload-wrap").show();
                var process = 0;
                this.timer = setInterval(function(){
                    process = process + 1;
                    this.el.find(".upload-wrap .progress-bar span").width(process + "%");
                    if (process === 90){
                        clearInterval(this.timer);
                    }
                }.bind(this), 100);
            }
        },

        onCutPictrueDone: function(res){
            console.log("图片裁剪 >> 裁剪上传完毕后：", res);
            if (this.timer) clearInterval(this.timer);
            if (res&&res.status === 1){
                this.el.find(".upload-wrap .progress-bar span").width("100%");
                if (res.info){
                    var args = {
                        result: true,
                        path: res.info.imageSrcUrl
                    }
                    this.opts.personalView.onUploadPortrait(args);
                }
                //*********************************************************
                //20140924
                var logObject = {
                    page: "usersystem_myaccount",
                    module: "icon",
                    action: "uploadphoto",
                    status: 1
                }
                utils.sendNewLog("1000120", logObject);
                //*********************************************************   
            } else {
                this.opts.personalView.onUploadPortrait();
                //*********************************************************
                //20140924
                var logObject = {
                    page: "usersystem_myaccount",
                    module: "icon",
                    action: "uploadphoto",
                    status: 2
                }
                utils.sendNewLog("1000120", logObject);
                //*********************************************************  
            }
            this.el.find(".cut-panel").hide();
            this.el.find(".select-wrap .label").hide();
            this.el.find(".upload-wrap").hide();
            this.el.find(".select-wrap").show();
        },

        onClickSelectPhone: function(){
            if (this.isConnect){
                this.el.find(".select-wrap .label").html(i18nDi.fillDomText('signin.promptPullPic'));
                this.el.find(".select-wrap .label").show();
                this.el.find(".select-wrap .select-phone").prop("disabled", true);
                this.el.find(".select-wrap .select-pc").prop("disabled", true);
                app.dal.request({
                    action : apiNames.REQ_PHONE_IMAGE_INFO,
                    paras : {},
                    callback : $.proxy(this.onGetPhonePic, this)
                });
                app.dal.request({
                    action : apiNames.REQ_WALLPAPER_IMAGE_INFO,
                    paras : {},
                    callback : $.proxy(this.onGetPhonePic, this)
                });
                app.dal.request({
                    action : apiNames.REQ_ALL_IMAGE_INFO,
                    paras : {},
                    callback : $.proxy(this.onGetPhonePic, this)
                });
            } else {
                this.el.find(".select-wrap .label").html(i18nDi.fillDomText('signin.promptConnect'));
                this.el.find(".select-wrap .label").show();
            }
        },

        onGetPhonePic: function(res){
            if (this.isGetPhonePic === true) {
                this.getPhonePicCount = this.getPhonePicCount + 1;
                if (this.getPhonePicCount == 2){
                    this.isGetPhonePic = false;
                    this.getPhonePicCount = 0;
                }
                return;
            }
            console.log("图片裁剪 >> 获取手机图片完毕：", res);
            setTimeout(function(){
                this.el.find(".select-wrap .select-phone").prop("disabled", false);
                this.el.find(".select-wrap .select-pc").prop("disabled", false);
            }.bind(this), 2000);
            if (res&&res.status === 1&&this.isGetPhonePic === false){
                if (res.info&&res.info.list){
                    this.isGetPhonePic = true
                    for(var i = 0; i < res.info.list.length; i++){
                        if (res.info.list[i].sThumbnailPath !== res.info.list[i].sPictureThumbnailPath){
                            var filePath = res.info.list[i].sThumbnailPath;
                            var fileNames = filePath.split("\\");
                            fileNames.splice(fileNames.length - 1)
                            var folderPath = fileNames.join("\\")
                            this.onClickSelectPC(folderPath);
                            console.log("图片裁剪 >> 图片文件夹路径：", folderPath)
                            this.el.find(".select-wrap .label").hide();
                            this.el.find(".select-wrap .label").html(i18nDi.fillDomText('signin.promptConnect'));
                            break;
                        }
                    }
                } else {
                    this.el.find(".select-wrap .label").html(i18nDi.fillDomText('signin.promptPullPicFailed'));
                }
            } else {
                this.el.find(".select-wrap .label").html(i18nDi.fillDomText('signin.promptPullPicFailed'));
            }
        },

        onClickSelectPC: function(path){
            var args = {
                MultiSel: 0,
                Filter: '(*.png, *.jpg, *.gif)|*.png;*.jpg;*.gif'
            };
            if (typeof path == "string"){
                args.Path = path;
            }
            app.dal.request({
                action : apiNames.REQ_POPUP_SYSTEM_DIALOG,
                paras : args,
                callback : $.proxy(this.onClickSystemPopupOK, this)
            });
            //*********************************************************
            //20140924
            var logObject = {
                page: "usersystem_myaccount",
                module: "icon",
                action: "selectphoto"
            }
            utils.sendNewLog("1000120", logObject);
            //********************************************************* 
        },

        onZoomPicture: function(res){
            console.log("图片裁剪 >> 缩放后的图片信息：", res);
            if (res&&res.status === 1){
                if (res.info){
                    this.el.find(".select-wrap").hide();
                    this.el.find(".cut-panel img").attr("src", res.info.path);
                    this.lastSelection.path = res.info.path;

                    this.picPath = res.info.path;

                    var option = {
                        aspectRatio: "1:1",
                        handles: "corners",
                        show: true,
                        x1:0,
                        y1:0,
                        x2:50,
                        y2:50,
                        minHeight: 50,
                        minWidth: 50,
                        persistent: true,
                        instance: true,
                        parent: this.el.find(".cut-panel"),
                        onSelectChange: function(img, selection){
                            // var rate = selection.width / 200;
                            // $('#small').width(originWidth / rate);
                            // $('#small').height(originHeight / rate);
                            // $('#small').css("margin-left", selection.x1 / rate * -1);
                            // $('#small').css("margin-top", selection.y1 / rate * -1);
                        },
                        onSelectEnd: $.proxy(this.onSelectImgEnd, this)
                    }

                    if (this.isInitSelect === false){
                        this.imgSelectObj = this.el.find(".cut-panel img").imgAreaSelect(option);
                        this.isInitSelect = true;
                        this.el.find(".cut-panel img").get(0).onload = function(){
                            this.imgSelectObj.setOptions(option)
                            this.imgSelectObj.setSelection(0,0,50,50);
                            this.imgSelectObj.update();
                        }.bind(this);
                    }

                    this.el.find(".cut-panel").show();
                } else {
                    console.log("图片裁剪 >> 缩放后返回数据错误");
                }
            } else {
                var confirmDlg = new UIDialog({
                    buttonKey : 2, //1双按钮
                    content : "Zoom failed...",//i18nDi.fillDomText('signin.errorPicLabel'),
                    title: i18nDi.fillDomText('signin.myAccountLabel')
                });
                confirmDlg.show();
                confirmDlg.on("yes", function(){
                    confirmDlg.close();
                });
            }
        },

        onClickSystemPopupOK: function(res){
            console.log("图片裁剪 >> 选择的图片信息：", res);
            if (res&&res.status === 1){
                if (res.info&&res.info.list){
                    if (res.info.list[0].status === 0){
                        return;
                    }
                        app.dal.request({
                            action : "get_NarrowImage",
                            paras : {
                                path: res.info.list[0].path,
                                width: 600, 
                                height: 300
                            },
                            callback : $.proxy(this.onZoomPicture, this)
                        });
                } else {
                    console.log("图片裁剪 >> 返回的数据不对");
                }
            } else {
                console.log("图片裁剪 >> 什么都没有选择");
            }
            if (this.getPhonePicCount == 2){
                this.isGetPhonePic = false;
                this.getPhonePicCount = 0;
            }
        }
    });
    return SelectPortraitView;
}); 