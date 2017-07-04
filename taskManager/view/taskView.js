define('taskView', function(require, exports, module){
    var app = require('app');
    var   $ = require('jquery');
    var   _ = require('underscore');
    var Menu = require('UIMenu');
    var SuperGrid = require('grid');
    var taskModel = require('taskModel');
    var utils = require('utils');
    var i18nDi = require('I18NDI');
    var connection = require('connectionMgr');
    var fillI18N = i18nDi.fillDomText.bind(i18nDi);
    var SmartTip = require("UISmartTip");
    var Friendly = require('UIFriendlyView');    
    
    var defaultIcon = {
        MUSIC: 'common\\\\images\\\\ico\\\\default-rim-ring.png',
        VIDEO: 'common\\\\images\\\\ico\\\\default-rim-play.png',
        PICTURE: 'common\\\\images\\\\ico\\\\default-rim-pic.png',
        APP: 'common\\\\images\\\\ico\\\\default-rim-app.png',
        BOOK: 'common\\\\images\\\\ico\\\\default-rim-book.png'
    };
    
    var adbCode = taskModel.adbCode;
    var installCode = taskModel.installCode;
    
    var adbCode2Text = function(code){
        var failedText = "";
        switch(code){
            case adbCode.INSTALL_FAILED_INSUFFICIENT_STORAGE:
            case adbCode.ADB_FAILED_NO_SPACE_LEFT:
            case adbCode.ADB_FAILED_NO_SPACE_LEFT_ON_PHONE:
            case adbCode.ADB_FAILED_NO_SPACE_LEFT_ON_SDCARD:
            case adbCode.SD_CARD_NOSPACE_LEFT:
                failedText = fillI18N('task.insuficientSpace');
                break;
            case adbCode.ADB_FAILED_PERMISSION_DENIED_ROM:
                failedText = fillI18N('task.noSdCard');
                break;
            case adbCode.ADB_FAILED_LOCAL_PATH_NOT_EXIST:
            case adbCode.ADB_FAILED_LOCAL_DIR_NOT_EXIST:
            case adbCode.ADB_FAILED_LOCAL_CREATE_FILE:
            case installCode.WIFI_APP_INS_FILE_NOT_EXSIT:
            case installCode.APP_FILE_INVALID:
                failedText = fillI18N('task.noSuchSourceFile');
                break;
            case adbCode.INSTALL_FAILED_INVALID_APK:
            case installCode.WIFI_APP_INS_FILE_INVALID:
                failedText = fillI18N('task.inValidApkFile');
                break;
            case adbCode.INSTALL_FAILED_MEDIA_UNAVAILABLE:
            case installCode.WIFI_APP_INS_NON_MARKET_APPS:
                var device = connection.deviceInfo;
                if(device && parseInt(device.sPhoneSDKVersion) > 10){
                    failedText = fillI18N('task.unknowSource2Setting');
                }else{
                    failedText = fillI18N('task.unknowSourceSetting');
                }
                break;
            case adbCode.INSTALL_FAILED_TO_SDCARD:
                failedText = fillI18N('task.installPhoneMemory');
                break;
            case adbCode.INSTALL_FAILED_OLDER_SDK:
            case installCode.WIFI_APP_INS_VERSION_NOT_MATCH:
                failedText = fillI18N('task.installSdkOlderError');
                break;
            case adbCode.ADB_MISMATCHED_CERTIFICATE:
                failedText = fillI18N('task.installMismatchedCertificateError');
                break;
            case adbCode.ADB_FAILED_DEVICE_NO_DEVICE:
            case adbCode.ADB_FAILED_DEVICE_OFFLINE:
            case adbCode.ADB_FAILED_DEVICE_MORE_THAN_ONE:
            case adbCode.ADB_FAILED_READX:
            case adbCode.ADB_FAILED_WRITEX:
            case adbCode.ADB_FAILED_SOCKET_CREATE:
            case adbCode.ADB_FAILED_SOCKET_CONNECT:
            case adbCode.ADB_FAILED_SOCKET_FH_INIT:
            case adbCode.ADB_FAILED_SOCKET_CONNECT_TO_SERVER:
            case adbCode.ADB_FAILED_SOCKET_ADDRINUSE:
            case adbCode.ADB_FAILED_SOCKET_RECV:
            case adbCode.ADB_FAILED_SOCKET_TIMEOUT:
                failedText = fillI18N('task.adbConnectionError');
                break;
            case installCode.APP_UNZIP_FAILED:
                failedText = fillI18N('task.unzipAppFailedText');
                break;
            case installCode.APP_PUSHDATA_FAILED:
            case installCode.WIFI_APP_INS_PUSHFILE_FAIL:
                failedText = fillI18N('task.transferAppFailedText');
                break;
            case installCode.APP_SAPCE_SD_NOT_ENOUGH:
                failedText = fillI18N('task.insuficientSpace');
                break;
            case installCode.APP_INSTALL_POSITION_FAILED:
                failedText = fillI18N('task.onlyInstallSdCard');
                break;                
              
           default: break;
        }
        return failedText;
    };
    
    
    var imageCache = {};
    
    var taskItemView = app.ViewBase.extend({
        module: module,
        init: function(model){
            this.model = model;
            this.tpl = this.getTpl('tpl-task-item');
        },
        
        fillDownloadTaskCtn: function(target){
            var $item = target.find('.g-task-item');
            var model = this.model;
            var data = model.data;
            var downloadCode = taskModel.downloadCode;
            var resourceType = taskModel.resourceType;
            
            var iconPath = this.model.get('iconPath');
            
            var imgURL; // = this.model.get('iconPath');
            
            if(data.resType == resourceType.M_APK){
                imgURL = defaultIcon.APP;
            }else if(data.resType == resourceType.M_RING){
                imgURL = defaultIcon.MUSIC;
            }else if(data.resType === resourceType.M_IMAGE_WALLPAPER){
                imgURL = defaultIcon.PICTURE;
            }else if(data.resType === resourceType.M_YOUTUBE){
                imgURL = defaultIcon.VIDEO;
            }else if(data.resType === resourceType.M_BOOK){
                 imgURL = defaultIcon.BOOK;
            }else{
                imgURL = iconPath;
            }
            
            
            var $img;
            
            if($item.size() == 0){
                target.html( _.template(this.tpl, {
                    name: this.model.get('name'),
                    iconPath: imgURL,
                    size: model.get('size')
                }));
                $item = target.find('.g-task-item');
                $img = $item.find('img');
            }else{
                
                $img = $item.find('img');
                
                if(iconPath != $img.attr('src')){
                    $img.attr('src', imgURL);
                }
                
                $item.find('.name').html(this.model.get('name'));
                $item.find('.size').html(model.get('size'));
            }
            
            if(iconPath && iconPath != $img.attr('src')){
                var $image = $('[data-id="' + data.id + '"]').find("img");
                if(imageCache[data.id]){
                    $image.attr("src", imageCache[data.id]);
                }else{
                    var image = new Image();
                    image.onload = function(){
                        var dataURL = utils.getBase64Image(image);
                        imageCache[data.id] = dataURL;
                        $image.attr("src", dataURL);
                    }
                    image.src = iconPath;
                }
            }
            
            if(data.resType == resourceType.M_APK){
                $img.attr('onerror', 'this.src="' + defaultIcon.APP + '"');
            }else if(data.resType == resourceType.M_MUSIC || data.resType == resourceType.M_RING){
                $img.attr('onerror', 'this.src="' + defaultIcon.MUSIC + '"');
            }else if(data.resType == resourceType.M_IMAGE_WALLPAPER || data.resType == resourceType.M_IMAGE){
                $img.attr('onerror', 'this.src="' + defaultIcon.PICTURE + '"');
            }else if(data.resType == resourceType.M_VIDEO || data.resType == resourceType.M_YOUTUBE){
                $img.attr('onerror', 'this.src="' + defaultIcon.VIDEO + '"');
            }else if(data.resType == resourceType.M_BOOK){
                $img.attr('onerror', 'this.src="' + defaultIcon.BOOK + '"');
            }else{
                $img.removeAttr('onerror');
            }
            
            var $pbstripes = $item.find('.progress-bar-stripes');
            var $pb = $item.find('.progress-bar');

            $pbstripes.hide();
            $pb.show().removeClass('disabled');
            
            if(data.res){
                var info = data.res.info;
                var code = data.res.code;
                var size = '';
                
                if(model.get('size')){
                    size = model.get('size');
                }else if(info.fileSize && info.fileSize != "0"){
                    size = utils.convertSizeToString(info.fileSize);
                    model.data.size = size;
                }
                
                $item.find('.size').html(size);
                
                var $opCol = $item.find('.op');
                var $text = $item.find('.ctn .txt');
                var $prText = $item.find('.ctn .pr-txt');
                
                $text.removeClass('ico-error-small');
                $prText.text('');
                
                if(code == downloadCode.DOWNLOADING){
                    $item.find('.progress-bar span').width(info.finishRate + '%');
                    
                    var dr = parseInt(info.downLoadRate || 0);
                    
                    if( dr >= 1024){
                        dr = dr / 1024;
                        dr = dr.toFixed(2);
                        
                        dr = dr + "M/s"
                    }else{
                        dr = dr + "KB/s";
                    }
                    
                    var rate = typeof info.downLoadRate != "undefined" && info.downLoadRate  != "0"? " (" + dr + ")" : "";
                    $text.html(fillI18N('common.downloadingText') + rate);
                    $prText.html(info.finishRate ? info.finishRate + '%' : '0%');
                    
                    var $pauseBtn = $('<button class="g-btn g-btn4 pause">' + fillI18N('common.pauseText') + '</button>');
                    $pauseBtn.on('click', function(e){
                        e.stopPropagation();
                        $pauseBtn.prop('disabled', true);

                        model.stopDownload(function(){
                            $pauseBtn.prop('disabled', false);

                            //*********************************************************
                            //20140724 新版日志
                            var logObject = {
                                class: "downloadmanager",
                                page: "downloadmanager",
                                module: "inprocess",
                                action: "download",
                                totalnum: taskModel.progressCollection.models.length,
                                position: taskModel.progressCollection.getModelPosition(model),
                                mtypecode: model.get('resType'),
                                typecode: model.get('resType'),
                                targetvalue: model.get('resId'),
                                status: 3,
                                source: 0,
                                doagain: 0
                            }                
                            utils.sendNewLog("1000100", logObject);
                            //*********************************************************
                        });

                    });
                    
                    $opCol.empty().append($pauseBtn);
                }else if(code == downloadCode.COMPLETE){
                    $text.html(fillI18N('common.completedText'));
                    $prText.html('100%');
                    
                    var $redownload = $('<button class="g-btn g-btn4 redownload">' + fillI18N('common.redownloadText') + '</button>');
                    $redownload.on('click', function(e){
                        e.stopPropagation();
                        model.download();

                        //*********************************************************
                        //20140724 新版日志
                        var logObject = {
                            class: "downloadmanager",
                            page: "downloadmanager",
                            module: "inprocess",
                            action: "download",
                            totalnum: taskModel.progressCollection.models.length,
                            position: taskModel.progressCollection.getModelPosition(model),
                            mtypecode: model.get('resType'),
                            typecode: model.get('resType'),
                            targetvalue: model.get('resId'),
                            status: 0,
                            source: 0,
                            doagain: 0
                        }                
                        utils.sendNewLog("1000100", logObject);
                        //*********************************************************

                    });
                    
                    $opCol.empty().append($redownload);
                }else if(code == downloadCode.STOP_DOWNLOAD){
                    $text.html(fillI18N('task.pausedText'));
                    $prText.html(info.finishRate ? info.finishRate + '%' : '');
                    var $continueBtn = $('<button class="g-btn g-btn4 continue">' + fillI18N('common.continueText') + '</button>');
                    
                    $item.find('.progress-bar span').width(info.finishRate + '%');
                    $pb.addClass('disabled');
                    
                    $opCol.empty().append($continueBtn);
                    $continueBtn.on('click', function(e){
                        e.stopPropagation();
                        model.continueDownload();

                        //*********************************************************
                        //20140724 新版日志
                        var logObject = {
                            class: "downloadmanager",
                            page: "downloadmanager",
                            module: "inprocess",
                            action: "download",
                            totalnum: taskModel.progressCollection.models.length,
                            position: taskModel.progressCollection.getModelPosition(model),
                            mtypecode: model.get('resType'),
                            typecode: model.get('resType'),
                            targetvalue: model.get('resId'),
                            status: 4,
                            source: 0,
                            doagain: 0
                        }                
                        utils.sendNewLog("1000100", logObject);
                        //*********************************************************

                    });
                }else if(code == downloadCode.WAITING){
                    //$pb.hide();
                    $item.find('.progress-bar span').width((info.finishRate ? info.finishRate : 0) + '%');
                    $text.html(fillI18N('task.waitingText'));
                    $text.removeClass('ico-error-small');
                    $prText.html(info.finishRate ? info.finishRate + '%' : '0%');
                    
                    var $pauseBtn = $('<button class="g-btn g-btn4 pause">' + fillI18N('common.pauseText') + '</button>');
                    $pauseBtn.on('click', function(e){
                        e.stopPropagation();
                        model.stopDownload();
                        //*********************************************************
                        //20140724 新版日志
                        var logObject = {
                            class: "downloadmanager",
                            page: "downloadmanager",
                            module: "inprocess",
                            action: "download",
                            totalnum: taskModel.progressCollection.models.length,
                            position: taskModel.progressCollection.getModelPosition(model),
                            mtypecode: model.get('resType'),
                            typecode: model.get('resType'),
                            targetvalue: model.get('resId'),
                            status: 3,
                            source: 0,
                            doagain: 0
                        }                
                        utils.sendNewLog("1000100", logObject);
                        //*********************************************************
                    });
                    
                    $opCol.empty().append($pauseBtn);
                }else{
                    var failedText = fillI18N('task.downloadUnknownError');
                    
                    switch(code){
                        case downloadCode.DOWNLOAD_REQUEST_404_ERROR:
                        case downloadCode.DOWNLOAD_NOT_FOUND_302_REDIRECT:
                        case downloadCode.DOWNLOAD_URL_ERROR:
                        case downloadCode.DOWNLOAD_RECV_SOCKET_ERROR:
                        case downloadCode.DOWNLOAD_INVALID_SOCKET:
                            failedText = fillI18N('task.networkErrorText');break;
                        case downloadCode.DOWNLOAD_INSUFICIENT_SPACE:
                            failedText = fillI18N('task.insufficeient');break;
                        default: failedText = fillI18N('task.downloadUnknownError');break;
                    }
                    
                    $pb.hide();
                    
                    failedText = failedText;
                    $text.html(failedText).addClass('ico-error-small');
                    $pb.addClass('disabled');
                    
                    var $retryBtn = $('<button class="g-btn g-btn6 retry">' + fillI18N('common.retryText') + '</button>');
                    $opCol.empty().append($retryBtn);
                    $retryBtn.on('click', function(e){
                        e.stopPropagation();
                        model.continueDownload();
                        //*********************************************************
                        //20140724 新版日志
                        model.set('isRetry', true);
                        var logObject = {
                            class: "downloadmanager",
                            page: "downloadmanager",
                            module: "inprocess",
                            action: "download",
                            totalnum: taskModel.progressCollection.models.length,
                            position: taskModel.progressCollection.getModelPosition(model),
                            mtypecode: model.get('resType'),
                            typecode: model.get('resType'),
                            targetvalue: model.get('resId'),
                            status: 4,
                            source: 0,
                            doagain: 1
                        }                
                        utils.sendNewLog("1000100", logObject);
                        //*********************************************************
                    });
                }
            }
        },
        
        fillApkTaskCtn: function(target){
            var me = this;
            var $item = target.find('.g-task-item');
            var model = this.model;
            var data = model.data;
            var installCode = taskModel.installCode;
            var adbCode = taskModel.adbCode;
            
            var iconPath = model.get('iconPath');
            var imageUrl = defaultIcon.APP;
            
            if($item.size() == 0){
                var tpl =  _.template(this.tpl, {
                    name: model.get('name'),
                    iconPath: imageUrl,
                    size: model.get('size')
                });
                target.html(tpl);
                $item = target.find('.g-task-item');
                var $img = $item.find('img');
            }else{
                var $img = $item.find('img');
                
                if(iconPath != $img.attr('src')){
                    $img.attr('src', imageUrl);
                }
                $item.find('.name').html(model.get('name'));
                $item.find('.size').html(model.get('size'));
            }
            
            if(iconPath && iconPath != $img.attr('src')){
                var $image = $('[data-id="' + data.id + '"]').find("img");
                if(imageCache[data.id]){
                    $image.attr("src", imageCache[data.id]);
                }else{
                    var image = new Image();
                    image.onload = function(){
                        var dataURL = utils.getBase64Image(image);
                        imageCache[data.id] = dataURL;
                        $image.attr("src", dataURL);
                    }
                    image.src = iconPath;
                }
            }
            
            $text = $item.find('.ctn .txt');
            
            $text.empty();
            
            //$text.html(fillI18N('myapp.installingText'));
            $item.find('.ctn .pr-txt, .op').empty();
            
            
            var $pbstripes = $item.find('.progress-bar-stripes');
            var $pb = $item.find('.progress-bar');
            
            $pbstripes.hide();
            $pb.show();
            $pb.removeClass('disabled');
            
            //如果是安装apk这种类型和 fromRestart为true， 说明不知道状态， 默认失败
            /*
            if(model.getProperty('fromRestart')){
                $pbstripes.hide();
                $text.html(fillI18N('task.installFailedText')).addClass('ico-error-small');
                
                var $retryBtn = $('<button class="g-btn g-btn6 retry">' + fillI18N('common.retryText') + '</button>');
                $item.find('.op').append($retryBtn);
                $retryBtn.on('click', function(e){
                    e.stopPropagation();
                    model.setProperty('fromRestart', false);
                    model.installApp();
                });
                
                return;
            }
            */
            
            $text.removeClass('ico-error-small');
            
            if(data.res){
                var info = data.res.info;
                var code = data.res.code;
                
                var size = '';
                var $prText = $item.find('.ctn .pr-txt');
                
                if(model.get('size')){
                    size = model.get('size');
                }else if(info.fileSize){
                    size = utils.convertSizeToString(info.fileSize);
                }
                $item.find('.size').html(size);
                
                //$pbstripes.hide();
                //$pb.hide();
                
                
                var $retryBtn = $('<button class="g-btn retry">' + fillI18N('common.retryText') + '</button>');
                var $popWifiInstallBtn = $('<button class="g-btn g-btn3 popWifiInstall">' + fillI18N('common.installLabel') + '</button>');
                var $op = $item.find('.op');
                
                $op.empty().append($retryBtn);
                
                //等待安装状态
                if(code == installCode.WAITING){
                    $item.find('.progress-bar span').width('0%');
                    $text.html(fillI18N('task.waitingText'));
                    $op.empty();
                    $prText.text("");
                    $text.removeClass('ico-error-small');
                }else if(code == installCode.TRANSFERING){
                    $item.find('.progress-bar span').width(data.res.percent + '%');
                    $prText.html(data.res.percent ? data.res.percent + '%' : '0%');
                    
                    if(data.res.progressType == 0){
                        $text.html(fillI18N('task.unzipAppText'));
                    }else if(data.res.progressType == 1){
                        $text.html(fillI18N('task.transferDataFile'));
                    }else if(data.res.progressType == 2){
                        if(data.res.percent == "100"){
                            $pbstripes.show();
                            $pb.hide();
                            $prText.text("");
                        }
                        $text.html(fillI18N('myapp.installingText'));
                    }
                    $op.empty();
                    /*wifi连接状态下传输完成状态*/   
                }else if(code==installCode.WIFI_APP_INS_POPUP_SUCCESS){
                    console.log("wifi模式下的传输完毕========",data);
                       //add 2014-09-25 for wifi install start
                      // if(connection.wifiModel!=0){
                           $pbstripes.hide();
                           $pb.hide();
                           $item.find('.ctn .pr-txt').empty();
                           $text.html(fillI18N('task.adbConnectionError'));
                           $text.addClass('ico-error-small');
                            $op.append($popWifiInstallBtn);
                            
                           if(connection.wifiModel!=1){//usb连接模式
                                $popWifiInstallBtn.hide();
                                $retryBtn.show();
                                $retryBtn.addClass('g-btn6');
                            }else{//非wifi连接模式
                                //连接手机时唤起弹窗
                                if(connection.isConnect()){
					$text.html(fillI18N('task.installOnDeviceText'));
                                    $popWifiInstallBtn.show();    
                                     $retryBtn.hide();
                                }else{
                                    $text.html(fillI18N('task.adbConnectionError'));
                                    $retryBtn.show();
                                    $retryBtn.addClass('g-btn6');
                                    $popWifiInstallBtn.hide();
                                }
                            }
                            
                           $popWifiInstallBtn.off("click").on("click",function(e){
                                e.stopPropagation();
                                console.log("当前任务：",model);
                                model.popupWifiInstall();
                               if(!me.smartTip){
                                    me.smartTip=new SmartTip();
                                }
                                me.smartTip.toCenter();
                                me.smartTip.show();
                                me.smartTip.flushTip(fillI18N('task.pleaseTapInstall'),{duration:3000});
                                me.smartTip.toCenter();
                            });   
                    $retryBtn.on('click', function(e){
                        e.stopPropagation();
                        model.setSelected(false);
                        $('.task-process .task-bar').click();
                        if(!connection.isConnect()){
                            me.connectNow();
                        }
                        if(connection.wifiModel!=1){
                            model.installApp();    
                        }else{
                            model.popupWifiInstall();
                        }
                        
                        //*********************************************************
                        //20140724 新版日志
                        var logObject = {
                            class: "downloadmanager",
                            page: "downloadmanager",
                            module: "completed",
                            action: "download",
                            totalnum: taskModel.progressCollection.models.length,
                            position: taskModel.progressCollection.getModelPosition(model),
                            mtypecode: model.get('resType'),
                            typecode: model.get('resType'),
                            targetvalue: model.get('resId'),
                            status: 7,
                            source: 0,
                            doagain: 1
                        }                
                        utils.sendNewLog("1000100", logObject);
                        //*********************************************************

                    });                            
                       // }
                        //add 2014-09-25 for wifi install  end   
                 /*安装完成或者传输完成状态*/                 
                }else if(code == installCode.SUCCESS){
                    try{
                        var info = model.get('res').info;
                        if(!info.completedDate){
                            var date = new Date();
                            
                            date = date.format('dd/MM/yyyy  hh:mm');
                            info.completedDate = date;
                        }
                        
                        $text.html(fillI18N('common.installedInText', info.completedDate));                        
                    }catch(e){
                        
                    }

                    $item.find('.ctn .pr-txt').empty();
               
                    $retryBtn.addClass('g-btn3');
                    
                    $retryBtn.html(fillI18N('task.reinstallText'));
                    $prText.text("");

                    $retryBtn.on('click', function(e){
                        e.stopPropagation();
                        if(!connection.isConnect()){
                            me.connectNow();
                        }
                        taskModel.completeCollection.remove(model);
                        taskModel.progressCollection.addTask(model);
                        model.setSelected(false);
                        $('.task-process .task-bar').click();
                        
                        model.installApp();

                        //*********************************************************
                        //20140724 新版日志
                        var logObject = {
                            class: "downloadmanager",
                            page: "downloadmanager",
                            module: "completed",
                            action: "download",
                            totalnum: taskModel.progressCollection.models.length,
                            position: taskModel.progressCollection.getModelPosition(model),
                            mtypecode: model.get('resType'),
                            typecode: model.get('resType'),
                            targetvalue: model.get('resId'),
                            status: 7,
                            source: 0,
                            doagain: 1
                        }                
                        utils.sendNewLog("1000100", logObject);
                        //*********************************************************

                    });
                    $pb.hide();
                }else{
                    
                    var failedText = adbCode2Text(code);
                    console.log("错误码================",code);
                    failedText = failedText || fillI18N('task.installUnknownError');
                    
                    $text.html(failedText).addClass('ico-error-small');
                    
                    if(code == adbCode.INSTALL_FAILED_INVALID_APK){//apk无效
                        var $delBtn = $('<button class="g-btn retry">' + fillI18N('common.Delete') + '</button>');
                        $item.find('.op').empty().append($delBtn);
                        
                        $delBtn.addClass('g-btn6');
                        
                        $delBtn.on('click', function(e){
                            e.stopPropagation();
                            taskModel.progressCollection.deleteTask([data.id]);
                        });
                    }else{
                        $retryBtn.addClass('g-btn6');
                        //2014-11-13 如果是指定位置安装失败，安装到手机中
                        if(code == installCode.APP_INSTALL_POSITION_FAILED){
                            $retryBtn.html(fillI18N('task.installSdCard'));
                             model.set("forceInstallPath",1);
                        }else{
                            $retryBtn.html(fillI18N('task.reinstallText'));
                            model.set("forceInstallPath",null);
                        }
                        $retryBtn.on('click', function(e){
                            e.stopPropagation();
                            if((code==installCode.APP_FILE_INVALID)||(code == adbCode.ADB_FAILED_LOCAL_PATH_NOT_EXIST)||(code==adbCode.ADB_FAILED_LOCAL_DIR_NOT_EXIST)||(code==adbCode.ADB_FAILED_LOCAL_CREATE_FILE)||(code==installCode.WIFI_APP_INS_FILE_NOT_EXSIT)){
                                model.set("type",taskModel.taskType.DOWNLOAD);
                                model.data.res.code=taskModel.downloadCode.WAITING;
                                $text.html(fillI18N('task.waitingText')).removeClass('ico-error-small');
                                model.download();
                            }else{
                                model.installApp();                                
                            }
                            
                            if(!connection.isConnect()){
                                me.connectNow();
                            }

                            //*********************************************************
                            //20140724 新版日志
                            model.set('isRetry', true);
                            var logObject = {
                                class: "downloadmanager",
                                page: "downloadmanager",
                                module: "inprocess",
                                action: "download",
                                totalnum: taskModel.progressCollection.models.length,
                                position: taskModel.progressCollection.getModelPosition(model),
                                mtypecode: model.get('resType'),
                                typecode: model.get('resType'),
                                targetvalue: model.get('resId'),
                                status: 13,
                                source: 0,
                                doagain: 1
                            }                
                            utils.sendNewLog("1000100", logObject);
                            //*********************************************************
                        });
                    }
                    $pb.hide();
                }
            }
        },
        
        fillImportTaskCtn: function(target){
            var me = this;
            var $item = target.find('.g-task-item');
            var model = this.model;
            var data = model.data;
            var importCode = taskModel.importCode;
            var resourceType = taskModel.resourceType;
            var thisType = data.type;
            
            var iconPath = this.model.get('iconPath');
            var imageUrl;
            
            if(thisType === taskType.IMPORT_MUSIC){
                imageUrl = defaultIcon.MUSIC;
            }else if(thisType === taskType.IMPORT_VIDEO){
                imageUrl = defaultIcon.VIDEO;
            }else if(thisType === taskType.IMPORT_PICTURE){
                imageUrl = defaultIcon.PICTURE;
            }else if(thisType === taskType.IMPORT_BOOK){
                imageUrl = defaultIcon.BOOK;
            }
            
            var $img;
            
            if($item.size() == 0){
                var tpl =  _.template(this.tpl, {
                    name: this.model.get('name') || '',
                    iconPath: imageUrl,
                    size: model.get('size')
                });
                target.html(tpl);
                $item = target.find('.g-task-item');
                $img = $item.find("img");
            }else{
                
                $img = $item.find('img');
                
                if(iconPath != $img.attr('src')){
                    $img.attr('src', imageUrl);
                }
                
                $item.find('.name').html(this.model.get('name'));
                $item.find('.size').html(model.get('size'));
            }
            
            if(data.resType == resourceType.M_APK){
                $img.attr('onerror', 'this.src="' + defaultIcon.APP + '"');
            }else if(data.resType == resourceType.M_MUSIC || data.resType == resourceType.M_RING){
                $img.attr('onerror', 'this.src="' + defaultIcon.MUSIC + '"');
            }else if(data.resType == resourceType.M_IMAGE_WALLPAPER || data.resType == resourceType.M_IMAGE){
                $img.attr('onerror', 'this.src="' + defaultIcon.PICTURE + '"');
            }else if(data.resType == resourceType.M_VIDEO || data.resType == resourceType.M_YOUTUBE){
                $img.attr('onerror', 'this.src="' + defaultIcon.VIDEO + '"');
            }else if(data.resType == resourceType.M_BOOK){
                $img.attr('onerror', 'this.src="' + defaultIcon.BOOK + '"');
            }else{
                $img.removeAttr('onerror');
            }
            
            
            if(iconPath && iconPath != $img.attr('src')){
                var $image = $('[data-id="' + data.id + '"]').find("img");
                if(imageCache[data.id]){
                    $image.attr("src", imageCache[data.id]);
                }else{
                    var image = new Image();
                    image.onload = function(){
                        var dataURL = utils.getBase64Image(image);
                        imageCache[data.id] = dataURL;
                        $image.attr("src", dataURL);
                    }
                    image.src = iconPath;
                }
            }
            
            //如果是资源下载类型
            var doingText = '';
            if(data.resType){
                doingText = fillI18N('task.transferringText');
            }else{
                doingText = fillI18N('common.ImportingText');
            }
            $item.find('.ctn .txt').html(doingText).removeClass('ico-error-small');
            $item.find('.ctn .pr-txt, .op').empty();
            
            var $pbstripes = $item.find('.progress-bar-stripes');
            var $pb = $item.find('.progress-bar');
            var $prText = $item.find('.ctn .pr-txt');
            
            $pbstripes.hide();
            $pb.show();
            
            $prText.empty();
            
            var $text = $item.find('.ctn .txt');
            $text.removeClass('ico-error-small');
            
            if(connection.isConnect()){
                 //无进度显示
                //$pbstripes.show();
            }else{
                data.res = data.res || {
                    code: importCode.DISCONNECT,
                    info: {}
                };
                
                $pb.hide();
                $text.html(fillI18N('task.importViaConnectText')).addClass('ico-error-small');
                
                var $retryBtn = $('<button class="g-btn g-btn6 retry">' + fillI18N('common.retryText') + '</button>');
                $item.find('.op').empty().append($retryBtn);
                
                $retryBtn.on('click', function(e){
                    e.stopPropagation();
                       if(!connection.isConnect()){
                            me.connectNow();
                        }
                    if(thisType === taskType.IMPORT_MUSIC){
                        model.importMusic();
                    }else if(thisType === taskType.IMPORT_VIDEO){
                        model.importVideo();
                    }else if(thisType === taskType.IMPORT_PICTURE){
                        model.importPicture();
                    }else if(thisType === taskType.IMPORT_BOOK){
                        model.importBook();
                    }
                });
            }
            
            $pb.removeClass('disabled');
            
            //如果res存在说明操作已经结束
            if(data.res){
                var info = data.res.info;
                var code = data.res.code;
                
                
                if(code == importCode.SYNC_FILE_ERROR){
                    code = importCode.SUCCESS;
                }
                
                //导入成功
                if(code == importCode.WAITING&&connection.isConnect()){
                    //TODO
                    $text.html(fillI18N('task.waitingText'));
                    $item.find('.progress-bar span').width(0);
                    $text.removeClass('ico-error-small');
                }else if(code == importCode.TRANSFERING){
                    console.log("%c IMPORT PROGRESS==" + data.res.percent, "color:red;font-size: 20px" );
                    
                    $item.find('.progress-bar span').width(data.res.percent + '%');
                    $prText.html(data.res.percent ? data.res.percent + '%' : '0%');
                    
                    if(!connection.isConnect()){
                        $prText.empty();
                    }
                }else if(code == importCode.SUCCESS){
                    $pbstripes.hide();
                    $pb.hide();
                    if(!info.completedDate){
                        var date = new Date();
                        var info = model.get('res').info;
                        
                        date = date.format('dd/MM/yyyy  hh:mm');
                        info.completedDate = date;
                    }
                    
                    var cpText = data.url ? fillI18N('task.downloadInText', info.completedDate) : 
                                              fillI18N('common.importedInText', info.completedDate);
                    
                    $text.html(cpText).removeClass('ico-error-small');
                    $item.find('.ctn .pr-txt, .op').empty();
                }else{
                    $pbstripes.hide();
                    $pb.hide();
                    
                    var failedText = '';
                    switch(code){
                        case importCode.FILE_NOT_EXISTED: 
                            failedText = fillI18N('task.importFileNotExistedText');
                            break;
                        case importCode.TRANSFER_ERROR: 
                            failedText = fillI18N('task.importTransferErrorText');
                            break;
                        case importCode.NOSPACE_LEFT: 
                            failedText = fillI18N('task.importInsufficientSpace');
                            break;
                        case importCode.DISCONNECT:
                            failedText = fillI18N('task.importViaConnectText');
                            break;
                        case importCode.NoSDCard:
                            failedText = fillI18N('task.importFailedNoSdCard');
                            break;
                        default: failedText = fillI18N('task.importUnknownError');break;
                    }
                      
                    $text.html(failedText).addClass('ico-error-small');
                    
                    var $retryBtn = $('<button class="g-btn g-btn6 retry">' + fillI18N('common.retryText') + '</button>');
                    $item.find('.op').empty().append($retryBtn);
                    
                    $retryBtn.on('click', function(e){
                        e.stopPropagation();
                        if(!connection.isConnect()){
                            me.connectNow();
                        }
                        if(thisType === taskType.IMPORT_MUSIC){
                            model.importMusic();
                        }else if(thisType === taskType.IMPORT_VIDEO){
                            model.importVideo();
                        }else if(thisType === taskType.IMPORT_PICTURE){
                            model.importPicture();
                        }else if(thisType === taskType.IMPORT_BOOK){
                            model.importBook();
                       }
                        
                    });
                }
            }
        },
        connectNow:function(){
               if(!Friendly.instance){
                    Friendly.instance=new Friendly();
                }
                Friendly.instance.clickConnect();
        },
        fillSetWallpaperCtn: function(target){
            var $item = target.find('.g-task-item');
            var model = this.model;
            var data = model.data;
            
            var thisType = data.type;
            var icon = this.model.get('iconPath');
            
            if($item.size() == 0){
                var tpl =  _.template(this.tpl, {
                    name: this.model.get('name') || '',
                    iconPath: icon,
                    size: model.get('size')
                });
                target.html(tpl);
                $item = target.find('.g-task-item');
            }else{
                var $newImg = $('<img ></img>');
                var $img = $item.find('img');
                $img.replaceWith($newImg);
                $newImg.attr("src", icon);
                
                $item.find('.name').html(this.model.get('name'));
                $item.find('.size').html(model.get('size'));
            }
            
            var $text = $item.find('.ctn .txt');
            var $op = $item.find('.op');
            var $prText = $item.find('.ctn .pr-txt');
            
            $text.html(fillI18N('task.setingAsWallpaper')).removeClass('ico-error-small');
            
            $op.empty();
            $prText.empty();
            
            var $pbstripes = $item.find('.progress-bar-stripes');
            var $pb = $item.find('.progress-bar');
            
            //无进度显示
            $pbstripes.show();
            $pb.hide();
            
            //如果res存在说明操作已经结束
            if(data.res){
                var info = data.res.info;
                
                $pbstripes.hide();
                
                //导入成功
                if(data.res.status == 1){
                    if(!info.completedDate){
                        var date = new Date();
                        var info = model.get('res').info;
                        
                        date = date.format('dd/MM/yyyy  hh:mm');
                        info.completedDate = date;
                    }
                    $text.html(fillI18N('task.settedText', info.completedDate));
                }else{
                    $text.html(fillI18N('common.setWallpaperFailed')).addClass('ico-error-small');
                    
                    var $retryBtn = $('<button class="g-btn g-btn6 retry">' + fillI18N('common.retryText') + '</button>');
                    $op.append($retryBtn);
                    
                    $retryBtn.on('click', function(e){
                        e.stopPropagation();
                        model.setWallpaper();
                    });
                }
            }
        },
        fillRingtoneCtn: function(target){
            var $item = target.find('.g-task-item');
            var model = this.model;
            var data = model.data;
            
            var thisType = data.type;
            
            if($item.size() == 0){
                var tpl =  _.template(this.tpl, {
                    name: this.model.get('name') || '',
                    iconPath: defaultIcon.MUSIC,
                    size: model.get('size')
                });
                target.html(tpl);
                $item = target.find('.g-task-item');
            }else{
                $item.find('img').attr('src', defaultIcon.MUSIC);
                $item.find('.name').html(this.model.get('name'));
                $item.find('.size').html(model.get('size'));
            }
            
            var $text = $item.find('.ctn .txt');
            var $op = $item.find('.op');
            var $prText = $item.find('.ctn .pr-txt');
            
            var $pbstripes = $item.find('.progress-bar-stripes');
            var $pb = $item.find('.progress-bar');
            
            
            $op.empty();
            $prText.empty();
            
            $pbstripes.show();
            $pb.hide();
            
            $text.html(fillI18N('task.setingAsRingtone')).removeClass('ico-error-small');
            
            //如果res存在说明操作已经结束
            if(data.res){
                var info = data.res.info;
                $pbstripes.hide();
                
                //导入成功
                if(data.res.status == 1){
                    if(!info.completedDate){
                        var date = new Date();
                        var info = model.get('res').info;
                        
                        date = date.format('dd/MM/yyyy  hh:mm');
                        info.completedDate = date;
                    }
                    $text.html(fillI18N('task.settedText', info.completedDate));
                }else{
                    $text.html(fillI18N('task.setRingtoneFailed')).addClass('ico-error-small');
                    
                    var $retryBtn = $('<button class="g-btn g-btn6 retry">' + fillI18N('common.retryText') + '</button>');
                    $op.append($retryBtn);
                    $retryBtn.on('click', function(e){
                        e.stopPropagation();
                        model.setRingtone();
                    });
                }
            }
        },
        render: function( target ){
            var thisType = this.model.data.type;
            taskType = taskModel.taskType;
            
            switch(thisType){
                case taskType.DOWNLOAD: 
                    this.fillDownloadTaskCtn(target); 
                    break;
                case taskType.INSTALL_APK: 
                    this.fillApkTaskCtn(target); 
                    break;
                case taskType.IMPORT_MUSIC: 
                case taskType.IMPORT_VIDEO:
                case taskType.IMPORT_PICTURE:
                case taskType.IMPORT_BOOK:
                    this.fillImportTaskCtn(target);
                    break;
                case taskType.SET_WALLPAPER:
                    this.fillSetWallpaperCtn(target);
                    break;
                case taskType.SET_RINGTONE:
                case taskType.SET_ALARM:
                case taskType.SET_SMS_RINGTONE:
                    this.fillRingtoneCtn(target);
                    break;
            }
        }
    });
    
    
    var tabs = {
        INPROGRESS: 'progress',
        COMPLETED: 'completed'
    };
    
    var TaskView = app.ViewBase.extend({
        expandComplete: false,
        module: module,
        tab: 'progress',
        
        events: {
            'click -> .back' : 'back',
            'click -> .g-toolbar .pause' : 'batchPause',
            'click -> .g-toolbar .continue' : 'batchContinue',
            'click -> .g-toolbar .delete' : 'onDelete',
            'click -> .g-toolbar .openFolder' : 'onOpenFolder',
            'click -> .g-list-tab-header .tab li': 'onTabClick'
        },
        
        onOpenFolder: function(){
            app.getUserConfig(function(res){
                utils.openFolderOrFile(res.info.resourceDownloadsPath);
            });

            //*********************************************************
            //20140724 新版日志
            var logObject = {
                class: "downloadmanager",
                page: "downloadmanager",
                module: "menu",
                action: "opendownloadsfolder"
            }                
            utils.sendNewLog("1000120", logObject);
            //********************************************************* 
        },
        
        setToolbarStatus: function(){
            var prtask = taskModel.progressCollection;
            var cptask = taskModel.completeCollection;
            
            if(this.tab == tabs.INPROGRESS){
                this.$pauseBtn.prop('disabled', !prtask.hasSelectedDownloadingTask());
                this.$continueBtn.prop('disabled', !prtask.hasStoppedTask());
                
                this.$deleteBtn.prop('disabled', !prtask.hasSelected());
                
                if(taskModel.progressCollection.size() > 0){
                     this.$emptyTip.hide();
                 }else{
                     this.$emptyTip.show();
                 }
            }else if(this.tab == tabs.COMPLETED){
                this.$pauseBtn.prop('disabled', true);
                this.$continueBtn.prop('disabled', true);
                this.$deleteBtn.prop('disabled', !cptask.hasSelected());
                
                if(taskModel.completeCollection.size() > 0){
                    this.$emptyTip.hide();
                }else{
                    this.$emptyTip.show();
                }
            }
        },
        
        onTabClick: function(e){
            var $target = $(e.target);
            var $tab = e.target.tagName.toLowerCase() == 'li' ? $target : $target.parents('li');
            var tab = $tab.attr('data-tab');
            if(tab==this.tab){
                return;
            }
            
            this.switchTab(tab);
        },
        
        switchTab : function(tabName){
            var tabHeader =  this.el.find(".g-list-tab-header li[data-tab=" + tabName + "]");
            var allCheckboxDelegate = this.el.find('.chkbox-all');
            var grid, $panel;
            
            tabHeader.addClass("selected").siblings().removeClass("selected");
            
            this.el.find('.g-list-tab-con .list').addClass('g-page-hide').removeClass('g-page-show');
            
            this.tab = tabName;
            
            switch(tabName){
                case tabs.INPROGRESS:
                    $panel = this.el.find('#i-task-process');
                    grid = this.progressGrid;
                    break;
               case tabs.COMPLETED: 
                    $panel = this.el.find('#i-task-complete');
                    grid = this.completeGrid;
                    break;             
            }
            
            $panel.removeClass('g-page-hide').addClass('g-page-show');
           
            this.posTabLine();
            this.setToolbarStatus();
            
            grid.setAllCheckboxDelegate(allCheckboxDelegate);
        },
        
        init: function(opts){
            this.el = $(_.template(this.getTpl('tpl-task-view'), {i18n: i18nDi}));
            this.el.appendTo($('#' + opts.pageId));
            
            this.posTabLine();
            
            setTimeout(function(){
                this.initTaskView(opts);
            }.bind(this), 400);
            /*添加title*/
			utils.tooltip.attach(this.el.find(".back"));
        },
        
        initTaskView: function( opts ){
            this.$pauseBtn = this.el.find('.g-toolbar .pause');
            this.$continueBtn = this.el.find('.g-toolbar .continue');
            this.$deleteBtn = this.el.find('.g-toolbar .delete');
            this.$emptyTip = this.el.find('.g-app-not');
            
            var $processCon = this.el.find('.task-process .list');
            var $completeCon = this.el.find('.task-complete-list');
            
            this.progressGrid = new SuperGrid({
                 container: $('#i-task-process'),
                 model: [
                            {
                               type: 'checkbox',
                               width: 54
                            },
                            {
                                name: '',
                                label: '',
                                type: 'view',
                                width: 'flex',
                                view: taskItemView
                            }
                        ],
                 showLabel: false,
                 rowHeight: 68,
                 checboxDelegate: this.el.find('.chkbox-all'),
                 collection: taskModel.progressCollection,
                 multiSelectable: false
            }); 
            
            this.completeGrid = new SuperGrid({
                 container: $('#i-task-complete'),
                 model: [
                            {
                               type: 'checkbox',
                               width: 54
                            },
                            {
                                name: '',
                                label: '',
                                type: 'view',
                                width: 'flex',
                                view: taskItemView
                            }
                        ],
                 showLabel: false,
                 rowHeight: 68,
                 checboxDelegate: null,
                 collection: taskModel.completeCollection,
                 multiSelectable: false
            }); 
            
            this.progressGrid.on(SuperGrid.ROW_SELECTED, $.proxy(this.setToolbarStatus, this));
            this.progressGrid.on(SuperGrid.ROW_UNSELECTED, $.proxy(this.setToolbarStatus, this));
            this.progressGrid.on(SuperGrid.ROW_SELECTED_ALL, $.proxy(this.setToolbarStatus, this));
            
            this.completeGrid.on(SuperGrid.ROW_SELECTED, $.proxy(this.setToolbarStatus, this));
            this.completeGrid.on(SuperGrid.ROW_UNSELECTED, $.proxy(this.setToolbarStatus, this));
            this.completeGrid.on(SuperGrid.ROW_SELECTED_ALL, $.proxy(this.setToolbarStatus, this));
            
            
            var renderEnd = function(){
                this.menu && this.menu.destroy();
            }.bind(this);
            
            this.progressGrid.on(SuperGrid.RENDER_END, renderEnd);
            this.completeGrid.on(SuperGrid.RENDER_END, renderEnd);
            
            if(taskModel.progressCollection.size() > 0){
                taskModel.progressCollection.trigger('update');
            }
            if(taskModel.completeCollection.size() > 0){
                taskModel.completeCollection.trigger('update');
            }
            
            
            var $prxEm = this.el.find('.g-list-tab-header [data-tab="progress"] em');
            var $cmpEm = this.el.find('.g-list-tab-header [data-tab="completed"] em');
            
            var updateCount = _.bind(function(){
                $prxEm.html(taskModel.progressCollection.size());
                $cmpEm.html(taskModel.completeCollection.size());
                this.setToolbarStatus();
            }, this);
            
            //toolbar的状态更新，延迟处理
            var timeout = 0;
            var updateProxy = function(){
                clearTimeout(timeout);
                timeout = setTimeout(function(){
                    updateCount();
                }, 100);
            };
            
            updateCount();
            
            taskModel.progressCollection.on('taskChange', updateProxy);
            taskModel.progressCollection.on('update', updateProxy);
            taskModel.completeCollection.on('update', updateProxy);

             $("#i-task-process")[0].oncontextmenu = $.proxy(this.contextMenu, this);
             $("#i-task-complete")[0].oncontextmenu = $.proxy(this.contextMenu, this);
             
             $(window).resize(this.posTabLine.bind(this));
        },
        
        posTabLine: function(){
            var selected = this.el.find('.g-list-tab-header .selected');
            var line = this.el.find('.g-list-tab-header .line');
            
            line.css({
                left: selected[0].offsetLeft,
                width: selected.width() + 2
            });
        },
        
        onDelete: function(){
            if(this.tab == tabs.INPROGRESS){
                var pcl = taskModel.progressCollection;
                var progressIds = Object.getOwnPropertyNames(pcl.getSelectedMap());
                pcl.deleteTask(progressIds);
                //*********************************************************
                //20140724 新版日志
                var logObject = {
                    class: "downloadmanager",
                    page: "downloadmanager",
                    module: "menu",
                    action: "delete",
                    totalnum: progressIds.length
                }                
                utils.sendNewLog("1000120", logObject);
                //********************************************************* 
            }else if(this.tab == tabs.COMPLETED){
                var completeList = taskModel.completeCollection;
                var completeIds = Object.getOwnPropertyNames(completeList.getSelectedMap());
                completeList.deleteTask(completeIds);
                //*********************************************************
                //20140724 新版日志
                var logObject = {
                    class: "downloadmanager",
                    page: "downloadmanager",
                    module: "menu",
                    action: "delete",
                    totalnum: completeIds.length
                }                
                utils.sendNewLog("1000120", logObject);
                //********************************************************* 
            }
        },
        
        batchContinue: function(){
            //*********************************************************
            //20140724 新版日志
            //-增加 continueAllTask 返回值，标识继续了多少个任务
            var count = taskModel.progressCollection.continueAllTask();
            //*********************************************************
            this.setToolbarStatus();

            //*********************************************************
            //20140724 新版日志
            var logObject = {
                class: "downloadmanager",
                page: "downloadmanager",
                module: "menu",
                action: "continue",
                totalnum: count
            }                
            utils.sendNewLog("1000120", logObject);
            //********************************************************* 
        },
        
        batchPause: function(){
            var pcl = taskModel.progressCollection;
            var count = pcl.batchPauseTask();
            this.setToolbarStatus()

            //*********************************************************
            //20140724 新版日志
            var logObject = {
                class: "downloadmanager",
                page: "downloadmanager",
                module: "menu",
                action: "pause",
                totalnum: count
            }                
            utils.sendNewLog("1000120", logObject);
            //********************************************************* 
        },
        
        back: function(){
            app.history.back();
            $(".g-title-tip").hide();
        },
        /*
        onProcessClick: function(){
            var _this = this;
            if(_this.transition){
                return;
            }
            var $completeBar = this.el.find('.task-complete');
            var $completList = this.el.find('.task-complete-list');
            
            this.expandComplete = false;
            $completeBar.transition({
                y: 0
            }, 300);
            _this.transition = true;
            $completList.transition({
                y: '100%',
            }, 300, function(){
                var style = $completList[0].style;
                style.visibility = 'hidden';
                style.webkitTransform = 'translateY(0)';
                _this.transition = false;
            });
        },
        
        
        onCompleteClick: function(e){
            var _this = this;
            
            if(_this.transition){
                return;
            }
            
            if(e.target.tagName.toLowerCase() == 'input' ||
               this.expandComplete){
                return;
            }
            
            var $completeBar = this.el.find('.task-complete');
            var $content = this.el.find('.g-content');
            var $completList = this.el.find('.task-complete-list');
            
            $completeBar.find('.task-bar').css('borderTop', this.toggle ? 'none' : '1px solid #ccc');
            
            _this.transition = true;
            
            $completeBar.transition({
                y: this.expandComplete ? 0 : 68 - $content.height(),
            }, 300, function(){
                _this.transition = false;
            });
            
            if(!this.expandComplete){
                $completList.css('visibility', 'visible');
                $completList[0].style.webkitTransform = 'translateY(100%)';
                
                $completList.transition({
                    y: 0,
                }, 300, function(){
                    
                });
            }
            
            this.onResize = this.onResize || $.proxy(function(){
                $completeBar.css({
                    y: this.expandComplete ?  68 - $content.height() : 0
                });
            }, this);
            
            $(window).off('resize', this.onResize);
            $(window).on('resize', this.onResize);
            
            this.expandComplete = !this.expandComplete;
        },
        */

        sendNewLogwithTotal: function(){
            var prtask = taskModel.progressCollection;
            var cptask = taskModel.completeCollection;
            var curHash = app.getCurHashParas();

            var logObject = {
                class: "framework",
                page: "framework",
                module: "leftmenu",
                action: utils.convertHashKeyByLog(curHash.module + "_" + curHash.action)
            }

            if(this.tab == tabs.INPROGRESS){
                logObject.totalnum = taskModel.progressCollection.size();
            }else if(this.tab == tabs.COMPLETED){
                logObject.totalnum = taskModel.completeCollection.size();
            }

            utils.sendNewLog("1000120", logObject);         
        },

        getContextMenuList: function(){
            var prtask = taskModel.progressCollection;
            var cptask = taskModel.completeCollection;
            
            var hasStoped = prtask.hasStoppedTask();
            var hasDingTask = prtask.hasSelectedDownloadingTask();
            
            var curColl;
            
            if(this.tab == tabs.INPROGRESS){
                curColl = taskModel.progressCollection;
            }else if(this.tab == tabs.COMPLETED){
                curColl = taskModel.completeCollection;
                hasStoped = false;
                hasDingTask = false;
            }
            
            var selected = curColl.hasSelected();
            
            var menuList = [{
                    index: 0,
                    label: i18nDi.fillDomText('common.pauseText'),
                    type: hasDingTask ? '' : 'label'
                },{
                    index: 1,
                    label: i18nDi.fillDomText('common.continueText'),
                    type: prtask.hasStoppedTask() ? '' : 'label'
                },{
                    index: 2,
                    label: i18nDi.fillDomText('common.Delete'),
                    type: selected ? '' : 'label'
                }];
            return menuList;
        },
        
        contextMenu: function( e ){
            e.preventDefault();
            var me=this;
            this.menu && this.menu.destroy();
            
            var prtask = taskModel.progressCollection;
            var cptask = taskModel.completeCollection;
            
            
            
            var menuList = this.getContextMenuList();
            
            this.menu  = new Menu({
                list: menuList,
                ani: false
            });
            this.menu.show();
            
            var x, y;
            if(e.pageX + this.menu.el.width() > $(window).width()){
                x = $(window).width() - this.menu.el.width();
            }else{
                x = e.pageX;
            }
            
            if(e.pageY + this.menu.el.height() > $(window).height()){
                y = $(window).height() - this.menu.el.height();
            }else{
                y = e.pageY;
            }
            
            
            this.menu.setPosition(x, y);
            
            var glbhandler = (function(e){
                this.menu && this.menu.destroy();
                $(document).off('click', glbhandler);
                taskModel.progressCollection.off('update', this.onUpdateMenuCallback);
                //document.removeEventListener('contextmenu', glbhandler);
            }).bind(this);
            
            $(document).on('click', glbhandler);
            
            //document.addEventListener('contextmenu', glbhandler);
            
            this.menu.on(Menu.SELECT, $.proxy(function(data, e){
                if(data.index === 0){
                    this.batchPause();
                }else if(data.index === 1){
                    this.batchContinue();
                }else if(data.index === 2){
                    this.onDelete();
                }
                this.menu.destroy();
            }, this));
            this.onUpdateMenuCallback = this.onUpdateMenuCallback || function(data){
                if(data.res&&data.res.code!=-100){
                    me.menu.updateList(me.getContextMenuList());
                }
            }.bind(this);
            
            taskModel.progressCollection.on('receiverTaskResponse', this.onUpdateMenuCallback);            
        }
    });
    
    /*
    var repeatTip = null;
    var TaskItems = [];
    var SentItems = [];
    var winReady = false;
    
    var sendRepeatedTaskToWin = function(){
        if(winReady && repeatTip){
            var item;
            while(item = TaskItems.shift()){
                SentItems.push(item);
                repeatTip.sendMessage({name: item.name});
            }
        }
    };
    
    TaskView.showDownloadRepeatTip = function(item){
         TaskItems.push(item);
         
         //创建并打开弹窗
         if(!repeatTip){
             repeatTip = new app.PopupPanel({
                 Model: 1,
                 Width: 392,
                 Height: 200,
                 Parame: {
                     list: [],
                     title: 'Tip'
                 },
                 Path: 'taskRepeatTip.html'
             });   
             repeatTip.open();
             
             repeatTip.on('message', function(data){
                 if(data.action == 'ready'){
                     winReady = true;
                     sendRepeatedTaskToWin();
                 }else{
                     winReady = false;
                     repeatTip = null;
                     
                     if(data.action == 'continue'){
                         SentItems.forEach(function(para){
                             para.continueDownload = 0;
                             taskModel.download(para);
                         });
                     }
                     TaskItems = [];
                     SentItems = [];
                 }
            });
          }else{
              sendRepeatedTaskToWin();
          }
    };
    */
   
    TaskView.updateResourceAppStatus = function(domContext){
        
        domContext = typeof domContext == 'string' ? $('#'+domContext) : domContext;
        
        var $installBtns = domContext.find('button.install');
        $installBtns.each(function(){
            $button = $(this);
            var pk = $button.attr('packagename');
            var vc = $button.attr('versioncode');
            
            if(!pk || !vc){
                return;
            }

            var status = taskModel.getAppStatus({
                packageName: pk,
                versionCode: vc
            });
            
            if(status === 0 || status === 2){
                $button.html(fillI18N('common.installedText'));
                $button.prop('disabled', true);
            }else if(status === 1){
                $button.html(fillI18N('common.updateAppText'));
                $button.prop('disabled', false);
            }else if(status === 4){
                $button.html(fillI18N('common.installingAppText'));
                $button.prop('disabled', true);
            }else if(status === 3){
                $button.html(fillI18N('myapp.updatingText'));
                $button.prop('disabled', true);
            }else{
                $button.html(fillI18N('common.installText'));
                $button.prop('disabled', false);
            }
        });
    };
    
    return TaskView;
});