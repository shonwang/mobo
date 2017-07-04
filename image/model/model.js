define('imageModel', function(require, exports, module) {
    var app = require('app');
    var apiNames = require('APINames');
    var gridModel = require('gridModel');
    var utils = require('utils');
    
    var Model = gridModel.Model.extend({
        init : function() {

        },
    });

    /*
     * 相册图片集合类
     */
    var PictureCollection = gridModel.Collection.extend({
        model : Model,

        type : '', //1: gallery, 2: wallpaper: 3: others

        init : function(opts) {
            var _this = this;
            this.type = opts.type;

            PictureCollection.__super__.init(this, arguments);

            this.worker = new Worker(module.dirname + '/dataParse.js'), this.worker.onmessage = this.onMessage.bind(this);

            var bindName = '';

            if (this.type === 1) {
                bindName = apiNames.BIND_PHONE_IMAGE;
            } else if (this.type == 2) {
                bindName = apiNames.BIND_WALLPAPER_IMAGE;
            } else if (this.type == 3) {
                bindName = apiNames.BIND_OTHER_IMAGE;
            }
            this.binding(bindName, this.onImageReceiver.bind(this));

            //thread = {key: value}
            this.checkedMap = {};

            var taskModel = require('taskModel');
            taskModel.progressCollection.on('receiverTaskResponse', function(model) {
                var type = model.get('type');
                var desType = model.get('desType');

                if (type == taskModel.taskType.IMPORT_PICTURE || type == taskModel.taskType.SET_WALLPAPER) {
                    if ((opts.type == 3 && desType == taskModel.importDes.OTHER) || (opts.type == 2 && desType == taskModel.importDes.WALLPAPER)) {

                        var data = model.data;
                        var res = data.res || data.importRes;
                        var info;

                        if (data.res && data.res.info) {
                            info = data.res.info;
                        } else if (data.importRes && data.importRes.info) {
                            info = data.importRes.info;
                        }

                        if (info && res && res.code == taskModel.importCode.SUCCESS) {
                            var lastIndex = info.localPath.lastIndexOf('\\')+1;
                            var utils = require('utils');

                            _this.addImage({
                                id : info.mediaId,
                                sPictureDate : info.sPictureDate||Date.now(),
                                sPictureName : info.pictureName,
                                sPictureRemotePath : info.remotePath,
                                sPictureSize : info.size || data.size,
                                sPictureThumbnailPath : info.remotePath,
                                sThumbnailPath : info.thumbnailPath,
                                sPictureMeasure : info.sPictureMeasure,
                                rotateAngle: info.rotateAngle,
                                status : 1
                            });
                        }
                    }
                }
            });
        },

        sendRequest : false,
        receiverResponse : false,

        total : 0,

        dataList : [],

        //后端返回给前端原始数据类型
        originList : [],
        ids : [],

        onImageReceiver : function() {
            clearTimeout(this.updateTimer);
            this.updateTimer = setTimeout(function(){
                this.trigger('update');
            }.bind(this), 500);
        },
        setStopProcess : function(flag) {
            this.stopProcess = flag;
        },
        addImage : function(image) {
            this.originList = this.originList || [];
            this.originList.push(image);
            this.total = this.originList.length;

            this.worker.postMessage(JSON.stringify({
                action : 'parselist',
                list : this.originList
            }));
        },

        onMessage : function(e) {
            var data = e.data;
            this.receiverResponse = true;

            if (data.action === 'parselist') {
                var list = this.dataList = data.result || [];
                this.ids = data.ids;
                this.originList = data.originList;

                /*
                 list.forEach(function( data ){
                 this.push(new this.model( data ));
                 }, this);
                 */
                this.trigger('update');
                
            } else if (data.action === 'iterateCheckedListData') {
                this.onGetCheckedCallback && this.onGetCheckedCallback.call(this, data.result);
            } else if (data.action === 'deletePicture') {
                this._onDeleteHandler && this._onDeleteHandler.call(this, data.result);
            }
        },

        fetch : function(action, paras) {
            var cb = (function(response) {
                var list = response.info && response.info.list ? response.info.list : [];
                this.total = list.length;
                this.originList = list;

                this.worker.postMessage(JSON.stringify({
                    action : 'parselist',
                    list : list
                }));
            }).bind(this);

            this.request({
                action : action,
                paras : paras,
                callback : cb
            });
        },

        rotate : function(opts) {
            opts = opts || {};
            if (!opts.id) {
                return;
            }
            //var curData = this.list[this.index];
            this.request({
                action : apiNames.REQ_ROTATE_PICTURE,
                paras : {
                    id : opts.id,
                    localPath : opts.picUrl,
                    remotePath : opts.remotePath,
                    rotateFlipType : opts.rotateFlipType,
                    thumbnailPath : opts.thumbnailPath
                },
                callback : function(res) {

                }
            });
        },
        getPictureById : function(id) {
            var temp;
            for (var i = 0; i < this.originList.length; i++) {
                var item = this.originList[i];
                if (item.id == id) {
                    temp = item;
                    break;
                }
            };
            return temp;
        },
        getPicThreadId:function(pictureDate){
             var date = new Date(pictureDate);
              var picym = date.format('yyyy-MM');
              var curDate = new Date();
              var curYm = curDate.format('yyyy-MM');
              if(picym!==curYm){
                  return date.format('dd/MM/yyyy');
              }else{
                  return date.format('dd/MM');
              }
        },
        getPlayListById : function(id) {
            var idIndex = this.ids.indexOf(id);
            var list = this.originList.map(function(item) {
                return {
                    id : item.id,
                    picUrl : item.sThumbnailPath,
                    remotePath : item.sPictureRemotePath,
                    name : item.sPictureName,
                    rotateAngle: item.rotateAngle
                };
            });

            return {
                index : idIndex,
                list : list
            };
        },
        /**
         *删除图片的回调
         *  */
        _onDeleteHandler : function(list) {
            this.dataList = list;
            this.total = this.originList.length;
            this.trigger('update');
        },

        /*
         * 删除一条数据
         */
        _deletePicture : function(id) {
            var checkedMap = this.checkedMap;

            for (var i in checkedMap) {
                var thread = checkedMap[i] || {};
                delete thread[id];
            }
            var idIndex = this.ids.indexOf(id);

            if (idIndex > -1) {
                this.ids.splice(idIndex, 1);
                this.originList.splice(idIndex, 1);
            }

            this.worker.postMessage(JSON.stringify({
                action : 'deletePicture',
                id : id,
                dataList : this.dataList
            }));
        },

        deletePicture : function(pictureList, callback) {
            var me = this;

            var dlpic = function(pic) {
                me.request({
                    action : apiNames.REQ_DELETE_PICTURE,
                    paras : {
                        remotePath : pic.spath,
                        id : pic.id,
                        thumbpath: pic.sThumbnailPath
                    },
                    callback : function(res) {
                        //是否被阻止继续进行
                        if (me.stopProcess) {
                            me.stopProcess = false;
                            if (res.status == 1) {
                                me._deletePicture(pic.id);
                            }
                            return;
                        }else{
                            var p = pictureList.shift();
                            p && dlpic(p);
                            if (res.status == 1) {
                                me._deletePicture(pic.id);
                            }
                            callback && callback.apply(this, [res, pic]);                            
                        }

                    }
                });
            };
            dlpic(pictureList.shift());
        },

        onGetCheckedCallback : function() {
        },

        getCheckedList : function(callback) {

            var checkedIdList = [];
            var threadIds = Object.getOwnPropertyNames(this.checkedMap);
            for (var i = 0; i < threadIds.length; i++) {
                var checkedIds = Object.getOwnPropertyNames(this.checkedMap[threadIds[i]]);
                checkedIdList = checkedIdList.concat(checkedIds);
            }

            this.onGetCheckedCallback = callback;

            this.worker.postMessage(JSON.stringify({
                action : 'iterateCheckedListData',
                checkedIdList : checkedIdList,
                dataList : this.dataList
            }));
        },

        hasChecked : function() {
            var threadIds = Object.getOwnPropertyNames(this.checkedMap);
            for (var i = 0; i < threadIds.length; i++) {
                var checkedIds = Object.getOwnPropertyNames(this.checkedMap[threadIds[i]]);
                if (checkedIds.length > 0) {
                    return true;
                }
            }
            return false;
        },

        isAllChecked : function() {
            if (this.dataList.length <= 0) {
                return false;
            }
            var threadIds = Object.getOwnPropertyNames(this.checkedMap);

            //如果会话的长度小于 数据的长度， 说明不可能全选
            if (threadIds.length < this.dataList.length) {
                return false;
            }

            var checkedTotal = 0;
            for (var i = 0; i < threadIds.length; i++) {
                var checkedIds = Object.getOwnPropertyNames(this.checkedMap[threadIds[i]]);
                checkedTotal += checkedIds.length;
            }

            var totalCount = 0;
            for (var j = 0; j < this.dataList.length; j++) {
                var list = this.dataList[j].list;
                if (list.length > checkedTotal) {
                    return false;
                } else if (totalCount > checkedTotal) {
                    return false;
                }
                totalCount += list.length;
            }
            return (totalCount === checkedTotal)
        },

        setAllChecked : function(checked) {
            for (var i = 0; i < this.dataList.length; i++) {
                var td = this.dataList[i].threadId;
                this.setThreadChecked(td, checked);
            }
        },

        //设置整个会话的checked状态
        setThreadChecked : function(threadId, checked) {
            this.checkedMap[threadId] = this.checkedMap[threadId] || {};
            var threadMap = this.checkedMap[threadId];

            if (checked) {
                for (var i = 0; i < this.dataList.length; i++) {
                    if (this.dataList[i].threadId == threadId) {
                        var list = this.dataList[i].list;
                        list.forEach(function(item) {
                            threadMap[item.id] = true;
                        });
                        break;
                    }
                }
            } else {
                this.checkedMap[threadId] = {};
            }
        },

        setChecked : function(threadId, imageId, checked) {
            this.checkedMap[threadId] = this.checkedMap[threadId] || {};
            var threadMap = this.checkedMap[threadId];

            if (checked) {
                threadMap[imageId] = true;
            } else {
                delete threadMap[imageId]
            }
        },

        isChecked : function(threadId, imageId) {
            this.checkedMap[threadId] = this.checkedMap[threadId] || {};
            if ( imageId in this.checkedMap[threadId]) {
                return true;
            }
            return false;
        },

        isThreadChecked : function(threadId) {
            for (var i = 0; i < this.dataList.length; i++) {
                if (this.dataList[i].threadId == threadId) {
                    this.checkedMap[threadId] = this.checkedMap[threadId] || {};
                    var map = this.checkedMap[threadId];
                    var names = Object.getOwnPropertyNames(map);

                    return (names.length === this.dataList[i].list.length);
                }
            }
        },

        setWallpaper : function(image) {
            var _this = this;
            var status = 0;
            this.request({
                action : apiNames.REQ_SET_WALLPAPER,
                paras : {
                    remotePath : image.spath,
                    id : image.id,
                    localPath : image.spath,
                    url: image.url,
                    name: image.name || ''
                },
                callback : function(res) {
                    image.callback && image.callback.call(this, res);
                    
                    var info = res.info || {};
                    
                    if(res.status == 1 && info.url){
                        status = 1;
                        exports.wallpaperCollection.addImage({
                            id : info.id,
                            sPictureDate : info.sPictureDate||Date.now(),
                            sPictureName : info.pictureName,
                            sPictureRemotePath : info.remotePath,
                            sPictureSize : info.pictureSize,
                            sPictureThumbnailPath : info.thumbnailPath,
                            sThumbnailPath : info.thumbnailPath,
                            sPictureMeasure : info.sPictureMeasure
                        });
                    } else {
                        status = 0;
                    }
                    var module = null;
                    //1: gallery, 2: wallpaper: 3: others
                    if (_this.type === 1) {
                        module = "gallery";
                    } else if (_this.type === 2) {
                        module = "wallpapers";
                    } else if (_this.type === 3) {
                        module = "others";
                    }
                    //*********************************************************
                    //20140924
                    var logObject = {
                        page: "mymusic_home",
                        module: module,
                        action: "setaswallpaper",
                        status: status
                    }
                    utils.sendNewLog("1000120", logObject);
                    //*********************************************************             
                    
                    app.eventCenter.trigger('setwallpaper', res);
                }
            });
        },

        exportPicture : function(path, pictureList, callback) {
            var me = this;
            var exportPic = function(item) {
                me.savePictureToLocal({
                    targetFolder: path,
                    filePath : path + '\\' + item.name,
                    fileName : item.name,
                    ext : 0,
                    id : item.id,
                    remotePath : item.remotePath,
                    callback : function(res) {
                         //是否被阻止继续进行
                        if (me.stopProcess) {
                            me.stopProcess = false;
                            return;
                        }else{
                            var pic = pictureList.shift();
                            pic && exportPic(pic);
                            callback && callback.call(this, res);
                        }
                    }
                });
            };
            exportPic(pictureList.shift());
        },

        savePictureToLocal : function(opts) {
            this.request({
                action : apiNames.REQ_SAVE_IMAGE,
                paras : {
                    id : opts.id,
                    localPath : opts.filePath,
                    fileName : opts.fileName,
                    ext : opts.ext || '',
                    remotePath : opts.remotePath,
                    targetFolder: opts.targetFolder
                },
                callback : function(res) {
                    console.log("savePictureToLocal==============================:");
                    console.log(res);
                    opts.callback && opts.callback.call(this, res);
                }
            });
        },
        
        getOriginPicture: function(opts){
            this.request({
                action : apiNames.REQ_OPEN_ORIGIN_PIC,
                paras : {
                    id : parseInt(opts.id),
                    localPath : opts.filePath,
                    fileName : opts.fileName,
                    ext : opts.ext || '',
                    remotePath : opts.remotePath
                },
                callback : function(res) {
                    opts.callback && opts.callback.call(this, res);
                }
            });
        },
        clear : function() {
            this.total = 0;

            this.dataList = [];

            //后端返回给前端原始数据类型
            this.originList = [];
            this.ids = [];

            PictureCollection.__super__.clear.apply(this, arguments);
        },

        fetchGallery : function() {
            if(this.sendRequest && !this.receiverResponse){
                return;
            }
            
            this.sendRequest = true;
            this.receiverResponse = false;
            this.clear();
            
             this.checkedMap = {};

            //this.fetch(apiNames.REQ_ALL_IMAGE_INFO, {});
            this.fetch(apiNames.REQ_PHONE_IMAGE_INFO, {});
        },
        fetchWappler : function() {
            if(this.sendRequest && !this.receiverResponse){
                return;
            }
            
            this.sendRequest = true;
            this.receiverResponse = false;
            this.clear();
            this.checkedMap = {};
            //this.fetch(apiNames.REQ_ALL_IMAGE_INFO, {});
            this.fetch(apiNames.REQ_WALLPAPER_IMAGE_INFO, {});
        },
        fetchOther : function() {
            if(this.sendRequest && !this.receiverResponse){
                return;
            }
            
            this.sendRequest = true;
            this.receiverResponse = false;
            this.clear();
             this.checkedMap = {};
            this.fetch(apiNames.REQ_ALL_IMAGE_INFO, {});
            //this.fetch(apiNames.REQ_ALL_IMAGE_INFO, {});
        }
    });

    /*
     * 壁纸集合类
     */
    var WallpaperCollection = gridModel.Collection.extend({
        model : Model,
        init : function() {

        },
        parse : function() {

        }
    });

    /*
     * 其他图片类型
     */
    var OtherCollection = gridModel.Collection.extend({
        model : Model,
        init : function() {

        },
        parse : function() {

        },
        refresh : function() {
            this.clear();
        }
    });

    var webWorker = new Worker(module.dirname + '/dataParse.js');
    var getPictureInList = function(paras) {

        webWorker.onmessage = function(e) {
            var list = e.data.result;
            paras.callback.call(this, list);
        };

        webWorker.postMessage(JSON.stringify({
            action : 'getScreenData',
            index : paras.index,
            rows : paras.rows,
            columns : paras.columns,
            dataList : paras.dataList
        }));
    };

    exports.Model = Model;
    exports.getPictureInList = getPictureInList;

    exports.galleryCollection = new PictureCollection({
        type : 1
    });
    exports.wallpaperCollection = new PictureCollection({
        type : 2
    });
    exports.otherCollection = new PictureCollection({
        type : 3
    });
}); 