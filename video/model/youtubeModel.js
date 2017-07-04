/**
 * @author liujintao
 */
define("YoutubeModel",function(require,exports,module){
    var app = require("app");
    var _ = require("underscore");
    var gridModel = require("gridModel");
    var apiNames = require("APINames");
    var taskModel = require("taskModel");
    
    var Model = gridModel.Model.extend({
        init:function(opts){
            
        }
    });
    
    var Collection = gridModel.Collection.extend({
        model:Model,
        module : module,
        init:function(){
           this.prefix="http://youtube.com/watch?v=";
        },
        /*根据vid获取下载地址*/
        getDownloadInfoById:function(vid,callback){
            var me = this;
            app.dal.request({
                action:apiNames.GET_YOUTUBE_DOWNLOAD_INFO,
                paras:{
                    watchAddress:me.prefix+vid
                },
                callback:function(res){
                    callback&&callback(res);
                }
            });
        },
        /**
         * @description 获取youtube的所有下载链接信息
         * @param url 下载地址，http://www.youtube.com/watch?v=c7s2lzDtjew格式
          * @param callback 回调函数，返回分辨率为pix的视屏信息
         * 结构如下：
         *[{
             * abbr: "3gp", 
             * downloadUrl : "http://googlevideo.com/videoplayb….C1BDA2D95A2A4591A3E8B94554823E9038F5C762&itag=36", 
             * formatName : "3GP (MPEG-4 240p)",
             * resolution : "240p", 
             * videoName : "Nike Football"
         * }]
         * */
        getAllDownloadInfoByUrl:function(url,callback){
            var me = this;
            app.dal.request({
                action:apiNames.GET_YOUTUBE_DOWNLOAD_INFO,
                paras:{
                    watchAddress:url
                },
                callback:function(res){
                    var videoList;
                    try{
                         videoList = res.sort(function(a,b){
                            return a.formatName<b.formatName;
                        }); 
                        videoList.forEach(function(videoItem){
                            var oldUrl=videoItem.downloadUrl;
                            if(oldUrl.indexOf("js=")>-1){
                                videoItem.downloadUrl = me.decodeSig(oldUrl);    
                            }
                        });                       
                    }catch(e){
                        console.log("出错：",e);
                    }
                    callback&&callback(videoList);
                }
            });            
        },
        /**
         * @param url 下载地址，http://www.youtube.com/watch?v=c7s2lzDtjew格式
         * @param pix 分辨率 200px 或 200p 或200必须传入
         * @param callback 回调函数，返回分辨率为pix的视屏信息
         * 结构如下：
         * {
             * abbr: "3gp", 
             * downloadUrl : "http://r1---sn-a5m7lned.googlevideo.com/videoplayb….C1BDA2D95A2A4591A3E8B94554823E9038F5C762&itag=36", 
             * formatName : "3GP (MPEG-4 240p)",
             *  resolution : "240p", 
             * videoName : "Nike Football: Winner Stays. ft. Ronaldo, Neymar Jr., Rooney, Ibrahimovi?, Iniesta & more"
         * }
         * */
        getDownloadInfoByUrl:function(url,pix,callback){
            var me = this;
            app.dal.request({
                action:apiNames.GET_YOUTUBE_DOWNLOAD_INFO,
                paras:{
                    watchAddress:url
                },
                callback:function(res){
                    var result;
                    try{
                        var videoList = res.sort(function(a,b){
                            return a.resolution<b.resolution;
                        });
                        result =videoList[0];
                        
                        for(var i=0;i<videoList.length;i++){
                            if(videoList[i].resolution.replace(/\s/g,"").replace(/p/ig,"")==pix.replace(/p/ig,"")||(videoList[i].resolution.replace(/[\spx]/ig,"")==pix.replace(/[\spx]/ig,""))){
                                    result =videoList[i];
                                    break; 
                            }else if(i+1<=videoList.length-1&&videoList[i].resolution.replace(/p/ig,"").replace(/px/ig,"")>pix.replace(/p/ig,"").replace(/px/ig,"")&&pix.replace(/p/ig,"").replace(/px/ig,"")>videoList[i+1].resolution.replace(/p/ig,"").replace(/px/ig,"")){
                                    result =videoList[i]; 
                                    break;
                            }
                        }
                        console.log("当前下载：");
                        console.log(result);
                    }catch(e){
                        
                    }
                    callback&&callback(result);
                }
            });            
        },
        /**
         * @param url 下载地址，http://www.youtube.com/watch?v=c7s2lzDtjew格式
         * @param pix 分辨率 200px 或 200p 或200必须传入
         * @param callback 回调函数
         * @param staticsParas 统计信息
         * */
        downloadVideoByUrl:function(url,pix,callback,staticsParas){
            var me = this;
            if(!url||!pix){
                 throw new Error('Invalid arguments url and pix should be provided,'+ url+"---"+pix);
            }
            this.getDownloadInfoByUrl(url,pix,function(data){
                try{
                      if(data.downloadUrl.indexOf("js=")>-1){
                            data.downloadUrl = me.decodeSig(data.downloadUrl);
                      } 
                  var staticsParas= (staticsParas&&staticsParas.statistics)||{};
                  staticsParas=_.extend(staticsParas,{
                         s3: 5,
                         s5:{
                            module: "1",                             
                         },
                         s6: 0,
                         s7: "youtube_details",
                         s8: "youtube_details",
                         action:"download"
                  });                            
                    taskModel.download({
                        resType:taskModel.resourceType.M_YOUTUBE,
                        ext:data.abbr,
                        url:data.downloadUrl,
                        iconPath:(staticsParas&&staticsParas.iconPath)||'',
                        name:data.videoName.replace(/\\/g,'').replace(/\?/g,'').replace(/\#/g,'')+pix,
                        statistics:staticsParas//统计
                    });                    
                }catch(e){
                    
                }
                callback&&callback();
            });
        },
        /**
         * @param data:{//当前视屏的详情，格式回调里一条具体的item
             * abbr: "3gp", 
             * downloadUrl : "http://googlevideo.com/videoplayb….C1BDA2D95A2A4591A3E8B94554823E9038F5C762&itag=36", 
             * formatName : "3GP (MPEG-4 240p)",
             * resolution : "240p", 
             * videoName : "Nike Football" 
         * }
         * @param callback 回调函数
         * @param staticsParas 统计信息
         * */        
        downloadBySourceUrl:function(data,callback,staticsParas){
            if(!data.downloadUrl){
                 throw new Error('Invalid arguments downloadUrl should be provided：'+ data.downloadUrl);
            }
            var me = this;
                var pix = data.resolution;
                 if(data.downloadUrl.indexOf("js=")>-1){
                        data.downloadUrl = me.decodeSig(data.downloadUrl);
                  }
                  var staticsParas= (staticsParas&&staticsParas.statistics)||{};
                  staticsParas=_.extend(staticsParas,{
                         s3: 5,
                         s5:{
                            module: "1",                             
                         },
                         s6: 0,
                         s7: "youtube_details",
                         s8: "youtube_details",
                         action:"download"
                  });
                taskModel.download({
                    resType:taskModel.resourceType.M_YOUTUBE,
                    ext:data.abbr,
                    url:data.downloadUrl,
                    iconPath:(staticsParas&&staticsParas.iconPath)||'',
                    name:data.videoName.replace(/\\/g,'').replace(/\?/g,'').replace(/\#/g,'')+pix,
                    statistics:staticsParas//统计
                });
                callback&&callback();
        },
        /*解析为新签名的url*/
        decodeSig:function(originalUrl){
            //signature的正则
            var sPattern=/\&signature\=[0-9a-zA-Z\.]+/;
            //签名函数函数的正则
            var jsDef = /function[a-zA-Z0-9\s\$_]+\([a-zA-Z\,0-9\,]+\)/g;
            //取出函数体
            var jsBody = originalUrl.substring(originalUrl.indexOf("js=")+3,originalUrl.length);
            
            var s = originalUrl.match(sPattern).toString().split("=")[1];
            //获取函数列表
            var js = originalUrl.match(jsDef);
            /*
            console.log(s.toString());
            console.log("js=",js);
            console.log("jsBody=",jsBody);
            */
            //执行函数定义
            console.log("声明函数：");
            eval(jsBody);
            console.log("计算入口函数:");
            //签名入口函数
            var sigRealEnFunc=js[0].replace(/function\s+/g,"").replace(/\(\w+\)/g,"").replace("/\s/g","");
            
            console.log("入口函数：|"+sigRealEnFunc+"|");
            
            console.log("获取签名:");
            
            var signature = eval(sigRealEnFunc+"('"+s+"')");
            /*console.log("新的签名：",signature);*/
            console.log("最新下载地址：",originalUrl.replace(originalUrl.substring(originalUrl.indexOf("&signature="),originalUrl.length),signature));
            return originalUrl.replace(originalUrl.substring(originalUrl.indexOf("&signature="),originalUrl.length),"&signature="+signature);
        }
    });
    var single_collection = new Collection();
    exports.Collection=function(){
        return single_collection;
    }
    
});
