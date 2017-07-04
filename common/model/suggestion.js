define('searchSuggestion', function(require, exports, module){
    var app = require('app');
    var _ = require('underscore');
    var $ = require('jquery');
    var apiNames = require('APINames');
    var connection = require('connectionMgr');
    
    var SearchModel = app.ModelBase.extend({
        init: function(){
            this.defaultParas = {
                type: "POST",
                async: true,
                dataType: 'json',
                cache: false, 
                ifModified: true,
                timeout: 30000
            };
            
            this.type = {
                APP_GAME: 'appgame',//混合
                APP: 'app',//应用
                GAME: 'game', //游戏
                WALLPAPER: 'wallpaper',//壁纸
                RINGTONE: 'ringtone', //铃声
                YOUTUBE:'youtube',
                REBOOK:'ebook',
                LOCALAPP:1,
                CONTACT:2,
                SMS:3,
                BOOK:4
            };
            var me = this;
            //保存设备信息
               me.getClientInfo(function(data){
                    me.clientInfo = data;
              });
              
              this.youtubeKeyArray=[
                    'AIzaSyB0h-fYaK47V1tLvdJm1GW_tyfFM_N2O-o',
                    'AIzaSyDmLeLz-D7vt88PxRlNyklcgrVKGucb8eU',
                    'AIzaSyCA-nuPyLgyiB9HoJhYplcFNGchFxkFud8',
                    'AIzaSyAB_PHpPUO_ZxiVWD4UW7NmpQLu9-poDY4',
                    'AIzaSyCyPxnzC0teQ-VqdtSRD533kdBOq-7y96g',
                    'AIzaSyBVZ9HO2y_AmIJkLsnJtmaWKGANDe4ujhw',
                    'AIzaSyChuj3QHcLSGfkXPj84Skv_atrL5MPcWZE',
                    'AIzaSyAxGNQ908NumBBR0StWZPua26xDR96pLpk',
                    'AIzaSyD0OxZxlXmr1EI7KNwDYdwukFVZ1Z06cl8',
                    'AIzaSyBBK356LEKq3e9mkktv991QECPihgcnJUU',
                    'AIzaSyA-_TckHgaJ6n7XtHuMBFD6wAMLfkfJeXQ',
                    'AIzaSyCR94yWeD_GB0wQtt3tP9S-sAeTo0SkddI',
                    'AIzaSyBCKibJzLLz07nYc625JrNhJrjD80VYHso',
                    'AIzaSyBOHsg-x9sK9J71KL9YSE9dicD1VM-0lY0',
                    'AIzaSyCASGMlFRva0S5FqMepERg5Jf0gzb1ffYU',
                    'AIzaSyA49dUrewe05ZIA2RCx8X07p-JShPUBLng',
                    'AIzaSyBmK3X_YLxiBv1h8wm22B0n6RJ_Bd2ztY8',
                    'AIzaSyBzf1hj3UjNwSE_3P3htMlFewMbOpxNjz0',
                    'AIzaSyADm_73fxcf6k8tomSaYoE68VUTuIcPuT0',
                    'AIzaSyDAZzGGV_9Zm8WdOi6e9sLjDTDwTyIuAFY',
                    'AIzaSyDhX9Z80pkSuCiWt7zAqvoA6bLD63iGSi0'
               ];
        },
        getRandomKey:function(){
            var keyIndex = Math.ceil(Math.random()*this.youtubeKeyArray.length)-1;
            return this.youtubeKeyArray[keyIndex];
        },
        search: function(data, callback){
            var me = this;
            var globalConfig = require('globalConfig');//globalConfig必须作为局部变量，以应对动态切站
            this.searchURL = globalConfig.domain.searchVoga360 +　'api/search.htm';
            var paras = _.extend(this.defaultParas,{
                url:this.searchURL
            } );
            paras.data = _.extend({
                q : '',
                f : 'pc',
                t : 'appgame',
                ps: 5,
                a: 'gl',
                sortfield: 'totalnum',
                ip : (me.clientInfo&&me.clientInfo.clientid)||"",
                tm:1
            }, data);
            paras.success = function(res){
                callback && callback.call(this, res);
            }
            $.ajax(paras);
        },
        /**sugguestion 接口，响应keyup事件*/
        sugguest : function(data,callback){
                    var me = this;
                    /*搜索的是youtube，转向专门接口*/
                    if(data.t==this.type.YOUTUBE){
                        this.searchYoutube(data,function(res){
                            callback&&callback(res);
                        });
                    }else{
                        var globalConfig = require('globalConfig');
                        this.sugguestionURL = globalConfig.domain.searchVoga360 +'api/suggest.htm';
                        var paras = _.extend(this.defaultParas,{
                            url:this.sugguestionURL
                        } );
                        //tm:1重构的sugguestion模板
                        paras.data = _.extend({
                            q : '',
                            f : 'pc',
                            t : 'appgame',
                            ps: 5,
                            a: 'gl',
                            sortfield: 'totalnum',
                            ip : (me.clientInfo&&me.clientInfo.clientid)||"",
                            tm:1
                        }, data);
                        paras.success = function(res){
                            callback && callback.call(me, res);
                        }
                        $.ajax(paras);                         
                    }
   
        },
        searchYoutube:function(data,callback){
                    var me = this;
                    var key = this.getRandomKey();
                    this.sugguestionURL = "https://www.googleapis.com/youtube/v3/search";
                    var paras = _.extend(this.defaultParas,{
                        url:this.sugguestionURL,
                        type:"GET",
                        cache:false,
                        ifModified:false
                    });
                    //tm:1重构的sugguestion模板
                    paras.data = _.extend({
                        q : '',
                        maxResults: 5,
                        pageToken:"",
                        part:"snippet",
                        type:"video",
                        key:key
                    }, data);
                    paras.success = function(res){
                        
                        console.log("搜索youtube 的suggest====================");
                        if(!res){
                              return;
                        }
                        var infoList = _.map(res.items,function(item){
                            return {
                                id:item.id.videoId,
                                detail:item.snippet.description,
                                orignName:item.snippet.title,
                                title:item.snippet.title,
                                iconPath:item.snippet.thumbnails.medium.url,
                                videoInfo:item
                            }
                        });
                        callback && callback.call(me, {
                            data:{
                                code:100,
                                status:1,
                                words:infoList
                                }
                                });
                    }
                    $.ajax(paras);                
        },
         /**本地搜索
         *@since 2014-03-27
         *@param type 类型
         * @param key 关键词
         * @param limit 限制后台搜索
         * @param globalSearch 是否统计其他模块匹配
         * */
        searchLocal: function(type, key,callback,limit,globalSearch){
            var me = this;
            app.dal.request({
                action: apiNames.REQ_LOCAL_SEARCH,
                paras: {
                    SearchType :  type,
                    key : key,
                    limit : limit||0,//0为不限制长度
                    globalSearch:globalSearch||0
                },
                callback: function(res){
                    callback&&callback(res);
                }
            });  
        },        
        getClientInfo:function(callback){
            if(!this.clientInfo){
                app.dal.request({
                    action:apiNames.REQ_GETCLIENT_INFO,
                    paras:{},
                    callback : function(data){
                        callback&&callback(data.info);
                    }
                });                
            }else{
                callback&&callback(this.clientInfo);
            }
        }
    }); 
    return new SearchModel();
});