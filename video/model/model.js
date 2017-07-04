define('videoModel', function(require, exports, module){
    var app = require('app');
    var gridModel = require('gridModel');
    var utils = require('utils');
    var apiNames = require('APINames');
    var _ = require('underscore');
    var taskModel = require("taskModel");
    var   $ = require('jquery');
    
    var Model = gridModel.Model.extend({
        init : function() {
            this.id = utils.getUID();
            this.on('change', _.bind(this.change, this));
            var dataTime = parseInt(this.get('sVideoDate'));
            var dateObj = new Date();
            dateObj.setTime(dataTime * 1000);
            this.set('sVideoDate', dateObj.format("dd/MM/yyyy"));
        },
    });
    
    var Collection = gridModel.Collection.extend({
        model: Model,
        isRequest: false,
        isResponse: false,
        
        init: function(){
            Collection.__super__.init.apply(this, arguments);
            taskModel.completeCollection.off("import", this.onImportCompleted);
            taskModel.completeCollection.on("import", $.proxy(this.onImportCompleted, this));    
        },

        onImportCompleted : function(result){
            if (result.type === taskModel.taskType.IMPORT_VIDEO &&
                result.success === true) {
                console.log("视频导入啦！！！！", result);
                if (result.data.sVideoDate){
                    this.setModeltoFirst(new Model(result.data));
                    this.trigger('update', true);
                }
            }                                
        },
       
        parse: function( res ){
            console.log('video=', res);
            if (res && res.info && res.info.list){
                var list = res.info.list;
            }
            this.isResponse = true;
            // for(var i = 0; i < 20; i++){
            //     this.push(new Model({
            //             id: -842150451,
            //             sThumbnailPath: "",
            //             sVideoDate: new Date().valueOf(),
            //             sVideoDuration: "3118",
            //             sVideoHeight: "352",
            //             sVideoLanguage: "",
            //             sVideoName: "test-vedio_1.3gp",
            //             sVideoRemotePath: "/mnt/sdcard/wandoujia/video/test-vedio_1.3gp",
            //             sVideoSize: "152KB",
            //             sVideoThumbnailPath: "/mnt/sdcard/DCIM/.thumbnails/1356998894206.jpg",
            //             sVideoWidth: "288",
            //             status: 1
            //     }));
            // }

            return list;
        },
        
        refresh: function(){
            if (this.isRequest == true && 
                this.isResponse == false) {
                return;
            } else {
                this.isRequest = true;
                this.isResponse = false;
                this.clear({trigger: false});
                this.fetch(apiNames.REQ_ALL_VIDEO_INFO);
            }
        },

        callPopupSysDialog: function(args, callback){
            console.log("video >> call System Dialog popup, ars is", args);
            app.dal.request({
                action : apiNames.REQ_POPUP_SYSTEM_DIALOG,
                paras : args,
                callback : function(res) {
                    console.log("video >> call System Dialog popup response is", res);
                    callback && callback(res);
                }
            });
        },

        callPopupExplorerSelFile: function(args, callback){
            console.log("video >> call system Explorer popup, ars is", args);
            app.dal.request({
                action : apiNames.REQ_OPEN_EXISTED_FILE,
                paras : args,
                callback : function(res) {
                    console.log("video >> call system Explorer popup response is", res);
                    callback && callback(res);
                }
            });
        },

        callPopupSaveDialog: function(args, callback){
            console.log("video >> call system save popup, ars is", args);
            app.dal.request({
                action : apiNames.REQ_POPUO_SAVE_DIALOG,
                paras : args,
                callback : function(res) {
                    console.log("video >> call system save popup response is", res);
                    callback && callback(res);
                }
            });
        },

        playVideo: function(args, callback){
            console.log("video >> play, ars is", args);
            app.dal.request({
                action : apiNames.REQ_VIDEO_PLAY,
                paras : args,
                callback : function(res) {
                    console.log("video >> play response is", res);
                    callback && callback(res);
                }
            });
        },

        exportVideo: function(args, callback){
            console.log("video >> export, ars is", args);
            utils.logTime.start('exportvideo')
            
            app.dal.request({
                action : apiNames.REQ_VIDEO_SAVEAS,
                paras : args,
                callback : function(res) {
                    utils.log.out('EXPORT_VIDEO_LOG:' + utils.logTime.end('exportvideo'));
                    
                    console.log("video >> export response is", res);
                    callback && callback(res);
                }
            });
        },

        deleteVideo: function(args, callback){
            console.log("video >> delete, ars is", args);
            
            utils.logTime.start('deletevideo')
            
            app.dal.request({
                action : apiNames.REQ_VIDEO_DELETE,
                paras : args,
                callback : function(res) {
                    utils.log.out('DELETE_VIDEO_LOG:' + utils.logTime.end('deletevideo'));
                    
                    console.log("video >> delete response is", res);
                    callback && callback(res);
                }
            });
        },

        importVideo: function(args, callback){
            console.log("video >> import, ars is", args);
            app.dal.request({
                action : apiNames.REQ_VIDEO_ADD,
                paras : args,
                callback : function(res) {
                    console.log("video >> import response is", res);
                    callback && callback(res);
                }
            });
        },

        bindSetVideoInfo : function(callback) {
            app.dal.binding(apiNames.BIND_VIDEO_INFO, function(res) {
                // console.log("video >> set info response is", res);
                callback && callback(res);
            });
        },

        getModelByDate: function(){
            var mapObj = {};
            var currentMouth = (new Date().getMonth() + 1).toString();
            var currentYear = (new Date().getFullYear()).toString();
            currentMouth = ("00"+ currentMouth).substr((""+ currentMouth).length);
            for (var i = 0; i < this.dateArray.length; i++){
                var key = this.dateArray[i];
                var modelArray = [];
                for(var k = 0; k < this.models.length; k++){
                    var modelMouth = this.models[k].data['sVideoDate'].split("/")[1];
                    var modelYear = this.models[k].data['sVideoDate'].split("/")[2];
                    var temp;
                    // if (currentMouth != modelMouth && currentYear != modelYear){
                    //     temp = this.models[k].data['sVideoDate'].split("/")[1] + "/" + 
                    //     this.models[k].data['sVideoDate'].split("/")[2];
                    // } else{
                    //     temp = this.models[k].data['sVideoDate'];
                    // }
                    if (currentMouth == modelMouth && currentYear == modelYear){
                        temp = this.models[k].data['sVideoDate'];
                    } else {
                        temp = this.models[k].data['sVideoDate'].split("/")[1] + "/" + 
                        this.models[k].data['sVideoDate'].split("/")[2];
                    }
                    if (key == temp){
                        modelArray.push(this.models[k]);
                    }
                }
                mapObj[key] = modelArray;
            }
            this.dateModelMap = mapObj;
            return mapObj;
        },


        getVideoCountByDate: function(){
            var countObj = {};
            for (var i = 0; i < this.dateArray.length; i++){
                var key = this.dateArray[i];
                countObj[key] = this.dateModelMap[key].length;
            }
            this.dateCountMap = countObj;
            return countObj;
        },

        getDateArray: function(){
            var dateArray = [];
            var isContain =false;
            var currentMouth = (new Date().getMonth() + 1).toString();
            var currentYear = (new Date().getFullYear()).toString();
            currentMouth = ("00"+ currentMouth).substr((""+ currentMouth).length);
            for (var i = 0; i < this.models.length; i++){
                var key = this.models[i].data['sVideoDate'];
                if (key){
                    var keyMouth = key.split("/")[1];
                    var keyYear = key.split("/")[2];
                    var temp;
                    // if (currentMouth != keyMouth && currentYear != keyYear){
                    //     temp = key.split("/")[1] + "/" + key.split("/")[2];  
                    // } else{
                    //     temp = key;
                    // }
                    if (currentMouth == keyMouth && currentYear == keyYear){
                        temp = key;
                    } else {
                        temp = key.split("/")[1] + "/" + key.split("/")[2]; 
                    }
                    isContain = this.isArrayContain(dateArray, temp);
                    if (isContain == false){
                        dateArray.push(temp);
                    } else {
                        isContain = false;
                    }
                }
            }
            dateArray = this.sortDate(dateArray);
            this.dateArray = dateArray;
            return this.dateArray;
        },

        isArrayContain: function(array, key){
            var k = 0;
            var isContain = false;
            if (array.length > 0) {
                for (k = 0; k < array.length; k++){
                    if(key == array[k]){
                        isContain = true;
                        break;
                    }
                }
            }
            return isContain;
        },

        sortDate: function(list){
            var flag = 0;
            var temp;
            for (var i = 0; i < list.length - 1; i++){
                flag = 0;
                for (var j = 0; j < list.length - 1; j++){
                    dateFirStr = list[j].split('/').reverse().join('');
                    dateSecStr = list[j + 1].split('/').reverse().join('');
                    if (dateFirStr.length < 8){
                        dateFirStr = dateFirStr + "00";
                    }
                    if (dateSecStr.length < 8){
                        dateSecStr = dateSecStr + "00";
                    }
                    var dateFir = parseInt(dateFirStr);
                    var dateSec = parseInt(dateSecStr);
                    if (dateFir < dateSec){
                        temp = list[j];
                        list[j] = list[j + 1];
                        list[j + 1] = temp;
                        flag = 1;
                    }
                }
                if (flag == 0){
                    break;
                }
            }
            return list;
        }
    });
    
    exports.Model = Model;
    exports.Collection = Collection;
});