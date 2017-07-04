/**
 * @author liujintao
 * @descript 清理大师Model
 * @since 2014-09-12
 */
define("pcCleanerModel", function(require, exports, module) {
    var app = require("app");
    var gridModel = require("gridModel");
    var _ = require("underscore");
    var $ = require("jquery");
    var utils = require("utils");
    var UIDialog = require('UIDialog');
    var apiNames = require('APINames');
    var cleanConfig = require('cleanConfig');
    /*国际化字典工具*/
    var i18nDi = require('I18NDI');

    /**
     * type:类型 0 注册表 1 文件
     * category:大类，对应上面的cleanCategory
     * index:序号，控制前后顺序
     * display:显隐控制
     * */
    var cleanTypes = {};
    var Model = gridModel.Model.extend({
        init : function(opts) {
            this.id = opts.id;
        }
    });
    var Collection = gridModel.Collection.extend({
        model : Model,
        requested : false,
        responsed : false,
        parse : function(res) {
            console.log("执行parse");
            this.responsed = true;
            return res.info.list;
        },
        refresh : function() {
            this.stopProcess = false;
            this.requested = true;
            this.responsed = false;
        },
        /**
         * 获取大类别列表
         * id:大类别id，
         * title：大类别名称，
         * size:大类别的size大小，
         * count:大类别的文件或注册表个数，
         * subcategoryMap:合并类别列表，每个下级类别内为合并的统计列表，形如{}
         * */
        getCategoryList : function() {
            this.cleanCategory = {
                //浏览器缓存
                browserHistory : {
                    id : 1,
                    title : i18nDi.fillDomText('tools.lessBrowser'),
                    size : 0,
                    count : 0
                },
                //使用痕迹
                usageHistory : {
                    id : 2,
                    title : i18nDi.fillDomText('tools.lessHistory'),
                    size : 0,
                    count : 0
                },
                //常用软件
                localSoft : {
                    id : 3,
                    title : i18nDi.fillDomText('tools.lessCommonUes'),
                    size : 0,
                    count : 0
                },
                //系统软件
               sysSoft : {
                    id : 4,
                    title : i18nDi.fillDomText('tools.lessSystem'),
                    size : 0,
                    count : 0
                },
                //回收站
                recycleBin : {
                    id : 5,
                    title : i18nDi.fillDomText('tools.lessDelete'),
                    type : 1,
                    size : 0,
                    count : 0
                },
                //无用注册表
                unuseRegistry : {
                    id : 6,
                    title : i18nDi.fillDomText('tools.lessUsuse'),
                    type : 0,
                    size : 0,
                    count : 0
                }
            };
            //合并类map集合
            this.subcategoryMap={};
            return this.cleanCategory;
        },
        getCleanConfigList : function(callback) {
            var me = this;
            var tosize = 0;
           /* $.ajax({
                url : "../tools/model/pcCleanerModel/cleanListConfig.json",
                dataType : "jsonp",
                jsonpCallback : "callback",
                async : false,
                ifmodified : true,
                cache : true,
                success : function(res) {
                    console.log("配置的清理列表", res);*/
                var res = cleanConfig.cleanList;
            	var ids = Object.keys(res);
                ids && ids.forEach(function(id) {
                    if(res[id].display==1){
                        var tempModel = new Model(res[id]);
                        tosize++;
                        tempModel.set("size", 0);
                        me.push(tempModel);
                        me.setSelected(tempModel.getId(), true);
                        //构建合并类
	                   if(tempModel.get("isSubcateFlag")==1&&tempModel.get("display")==1){
					         if(!me.subcategoryMap[tempModel.get("subcategory")]){
					            me.subcategoryMap[tempModel.get("subcategory")]=res[id];
					            me.subcategoryMap[tempModel.get("subcategory")].size=0;
					            me.subcategoryMap[tempModel.get("subcategory")].count=0;
					         }
					   }                    
                    }
                });
                callback && callback(res,tosize);
           
        },
        /**
         * 扫描
         * */
        getScanCategoryList : function(param, callback) {
            var me = this;
            
            app.dal.request({
                action : apiNames.REQ_SCAN_CLEAN_INFO,
                paras : {
                    type : param.type,
                    id : param.id
                },
                callback : function(res) {
                     //console.log(me.subcategoryMap);
                    if (!res.finish&&res.info&&me.getModelById(res.info.id)) {
                        var modelTemp = me.getModelById(res.info.id);
                        modelTemp.set("size", Number(modelTemp.get("size")));
                        //console.log(modelTemp);
                        if (modelTemp.get("category") == 1) {
                            me.cleanCategory["browserHistory"].size += (res.info.size ? res.info.size : 0);
                            me.cleanCategory["browserHistory"].count += 1;
                        } else if (modelTemp.get("category") == 2 ) {
                            me.cleanCategory["usageHistory"].size += (res.info.size ? res.info.size : 0);
                            me.cleanCategory["usageHistory"].count += 1;
                        } else if (modelTemp.get("category") == 3) {
                            me.cleanCategory["localSoft"].size += (res.info.size ? res.info.size : 0);
                            me.cleanCategory["localSoft"].count += 1;
                        } else if (modelTemp.get("category") == 4) {
                            me.cleanCategory["sysSoft"].size += (res.info.size ? res.info.size : 0);
                            me.cleanCategory["sysSoft"].count += 1;
                        } else if (modelTemp.get("category") == 5) {
                            me.cleanCategory["recycleBin"].size += (res.info.size ? res.info.size : 0);
                            me.cleanCategory["recycleBin"].count += 1;
                        } else if (modelTemp.get("category") == 6) {
                            me.cleanCategory["unuseRegistry"].size += (res.info.size ? res.info.size : 0);
                            me.cleanCategory["unuseRegistry"].count += 1;
                        }
                        //合并类累加
                       me.subcategoryMap[modelTemp.get("subcategory")].size+=(res.info.size ? res.info.size : 0);
                       me.subcategoryMap[modelTemp.get("subcategory")].count+=1;
                        
                        me.trigger("update", {
                            type : "scan",
                            model : modelTemp
                        });
                    }else{//扫描注册表
                    }
                    callback && callback(res);
                }
            });
        },
        reset:function(){
            var me=this;
              this.cleanCategory&Object.keys(this.cleanCategory).forEach(function(categoryKey){
                  me.cleanCategory[categoryKey].size=0;
                  me.cleanCategory[categoryKey].count=0;
              });
              this.subcategoryMap&&Object.keys(this.subcategoryMap).forEach(function(subcategoryKey){
                  me.subcategoryMap[subcategoryKey].size=0;
                  me.subcategoryMap[subcategoryKey].count=0;
              });    
              this.models.forEach(function(model){
                  model.set("size",0);
              });  
        },
        /**
         * 清理文件与清理注册表传入参数不同
         * 文件：{
         *     type:1,
         *     file:[
         *         {  id:123, filePath:""}
         *      ],
         * 注册表：{
         *     type:0,
         *     reg:[
         *       { id:4542,  keyPath:"LOCAL/MACHINE/..",valueName:12}
         *      ]
         *    }
         * */
        startCleaning : function(param, callback) {
            var me=this;
            if (param.type == 1) {
                app.dal.request({
                    action : apiNames.REQ_START_CLEAN,
                    paras : {
                        type : 1,
                        id : param.files
                    },
                    callback : function(res) {
                        if (!res.finish&&me.getModelById(res.info.id)) {
                            var modelTemp = me.getModelById(res.info.id);
                            if (modelTemp.get("category") == 1) {//清理浏览器记录
                                if(me.cleanCategory["browserHistory"].size -res.info.size>=0){
                                   me.cleanCategory["browserHistory"].size -= (res.info.size ? res.info.size : 0); 
                                }
                                me.cleanCategory["browserHistory"].count -= 1;
                            } else if (modelTemp.get("category") == 2) {//清理实用痕迹
                                if(me.cleanCategory["usageHistory"].size -res.info.size>=0){
                                    me.cleanCategory["usageHistory"].size -= (res.info.size ? res.info.size : 0);
                                }
                                me.cleanCategory["usageHistory"].count -= 1;
                            } else if (modelTemp.get("category") == 3) {
                                if(me.cleanCategory["localSoft"].size -res.info.size>=0){
                                    me.cleanCategory["localSoft"].size -= (res.info.size ? res.info.size : 0);
                                }else{
                                    me.cleanCategory["localSoft"].size =0;
                                }                                
                                me.cleanCategory["localSoft"].count -= 1;
                            } else if (modelTemp.get("category") == 4) {
                                if(me.cleanCategory["sysSoft"].size -res.info.size>=0){
                                    me.cleanCategory["sysSoft"].size -= (res.info.size ? res.info.size : 0);
                                }else{
                                    me.cleanCategory["sysSoft"].size =0;
                                }  
                                me.cleanCategory["sysSoft"].count -= 1;
                            } else if (modelTemp.get("category") == 5) {
                                if(me.cleanCategory["recycleBin"].size -res.info.size>=0){
                                    me.cleanCategory["recycleBin"].size -= (res.info.size ? res.info.size : 0);
                                }else{
                                    me.cleanCategory["recycleBin"].size =0;
                                }                                 
                                me.cleanCategory["recycleBin"].count -= 1;
                            } else if (modelTemp.get("category") == 6) {
                                if(me.cleanCategory["unuseRegistry"].size -res.info.size>=0){
                                    me.cleanCategory["unuseRegistry"].size -= (res.info.size ? res.info.size : 0);
                                }else{
                                    me.cleanCategory["unuseRegistry"].size =0;
                                }      
                                me.cleanCategory["unuseRegistry"].count -= 1;
                            }
                            me.trigger("update", {
                                type : "cleanFile",
                                model : modelTemp
                            });
                        }
                        if(res.finish){
                            console.log("清理结果文件",me.cleanCategory);
                        }                        
                        callback && callback(res);
                    }
                });
            } else if (param.type == 0) {
                app.dal.request({
                    action : apiNames.REQ_START_CLEAN,
                    paras : {
                        type : 0,
                        id : param.regs
                    },
                    callback : function(res) {
                        if (!res.finish&&res.type==0) {
                            if(me.cleanCategory["unuseRegistry"].count>0){
                                me.cleanCategory["unuseRegistry"].count -= 1;
                            }
                            me.trigger("update", {
                                type : "cleanReg"
                            });
                        }else {
                            console.log("清理结果注册表",me.cleanCategory);
                        }
                        callback && callback(res);
                    }
                });
            }
        },
        /**
         *停止扫描
         * */
        stopScaning : function(callback) {
            app.dal.request({
                action : apiNames.REQ_STOP_SCAN,
                paras : {},
                callback : function(res) {
                    callback && callback(res);
                }
            });
        },
        /**
         *停止清理
         * */
        stopCleaning : function(callback) {
            app.dal.request({
                action : apiNames.REQ_STOP_SCAN,
                paras : {},
                callback : function(res) {
                    callback && callback(res);
                }
            });
        }
    });

    exports.Model = Model;
    exports.cleanTypes = cleanTypes;
    var collection_single = new Collection();
    exports.Collection = function() {
        if (!collection_single.requested && !collection_single.responsed) {
            collection_single.refresh();
        }
        return collection_single;
    }
});
