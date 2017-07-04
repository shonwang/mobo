define("youtubeController", function(require, exports, module) {
    var app = require('app');
    var   $ = require('jquery');
    var _ = require('underscore');
    var cache=require('r-cache');
    var isInit=0;
    var NoNet=require('NoNet');
    var globalConfig=require('globalConfig');
    var youtubeModel=require('YoutubeModel');
    var cacheA=new cache(false);
    var timer=null;
    var YoutubeCtr = app.ControllerBase.extend({
        ViewConfig: {
            youtubeView: require('youtubeView')
        },
        init: function(){
            this.render({ youtubeView: {
                pageId: this.pageId
            } });
            this.download();
            var onScreenin=function(){
                globalConfig.ctrConfig['1002'].query='';
                globalConfig.ctrConfig['1002'].pageState='';
                var paras=app.getCurHashParas();
                var sort=paras['query']?(paras['query']['sort']?paras['query']['sort']:''):'';
                var key=paras['pageState']?(paras['pageState']['q']?paras['pageState']['q']:''):'';
                var videoId=paras['pageState']?(paras['pageState']['videoId']?paras['pageState']['videoId']:''):'';
                if(sort=='search'){
                    if(key!=''){
                        $('#ytplayer').attr('src','http://www.youtube.com/results?search_query='+key);
                    }
                }else if(sort=='searchdetail'){
                    if(videoId!=''){
                        $('#ytplayer').attr('src','https://www.youtube.com/watch?v='+videoId);
                    }
                }
                
            };
            var onScreenout=function(){
                var iframeWindow = $('#ytplayer')[0].contentWindow;
                iframeWindow.document.querySelector('video.html5-main-video').pause();
            }
            $($('#ytplayer')[0].contentWindow).off()
            $($('#ytplayer')[0].contentWindow).on('click', function(event) {console.log(event)
                if(event.button == 1){
                    return false;
                }
            });
            this.off('screenin',onScreenin);
            this.on('screenin',onScreenin);
            this.off('screenout',onScreenout);
            this.on('screenout',onScreenout);

            // var _this=this;
            // this.initLoad();
            // cacheA.off('getConfigError');
            // cacheA.off('getConfigSuccess');
            // var onScreenin=function(){
            //     _this.initLoad();
            // };
            // cacheA.on('getConfigError',function(){
            //     console.error('getConfigError');
            //     if(NoNet){
            //         var nonet=new NoNet({
            //             pageId:this.pageId
            //         });
            //         nonet.on('retry',onScreenin);
            //     }
            //     this.off('screenin',onScreenin);
            //     this.on('screenin',onScreenin);
            //     app.eventCenter.off('switchSite',onScreenin);
            //     app.eventCenter.on('switchSite',onScreenin);
            // }.bind(this));
            // cacheA.on('getConfigSuccess',function(){
            //     console.error('getConfigSuccess');
            //     this.off('screenin',onScreenin);
            //     this.off('switchSite',onScreenin);
            // }.bind(this));
            
        },
        download: function() {console.log($('#ytplayer'))
            var _this=this;
            if(timer){
                clearInterval(timer);
            }
            var collection = new youtubeModel.Collection();
            var downloadInfo = [];
            var reload=function(){
                var $ytplayer=$('#ytplayer');
                if($ytplayer.length==0){return;}
                var iframeWindow = $('#ytplayer')[0].contentWindow;
                iframeWindow.location.reload();
            }
            app.eventCenter.off('resourceyoutube',reload);
            app.eventCenter.on('resourceyoutube',reload);
            function downloadBack() {
                var $ytplayer=$('#ytplayer');
                if($ytplayer.length==0){return;}
                var iframeWindow = $('#ytplayer')[0].contentWindow;
                $(iframeWindow.document).off();
                $(iframeWindow.document).on("contextmenu", function(e) {
                    e.preventDefault();
                    return false;
                });
                
                var url = iframeWindow.location.href;
                if (url.indexOf("watch?v=") < 0) {
                    return;
                }
                console.log(url)
                console.log(iframeWindow.document.getElementById("downloadNow"))
                if (!iframeWindow.document.getElementById("downloadNow")) {
                    console.log(iframeWindow.document.documentElement)
                    console.log($(iframeWindow.document).find('#movie_player')[0])
                    $(iframeWindow.document).find('#movie_player').css({'z-index':999});
                    console.log(iframeWindow.document.getElementById('watch7-headline'))
                    if (!iframeWindow.document.getElementById('watch7-headline')) {
                        return;
                    }
                    collection.getAllDownloadInfoByUrl(url, function(info) {
                        if(!info){return;}
                        console.log(info);
                        downloadInfo = info;
                        console.log(downloadInfo[0])
                        if(url!=iframeWindow.location.href){return;}
                        iframeWindow.document.getElementById('watch7-headline').innerHTML += '<div style= "width:100%;text-align:center;border:1px #eee;line-height:40px;background: #E8E8E8;height: 70px;margin-bottom:12px; position:relative;"> &nbsp;<a href= "javascript:; " id= "downloadNow" style= "float:left;margin-left:10px;min-width:176px;height: 51px;background: #f1f1f1;border-radius: 2px;padding-right: 20px;margin-top: 8px;text-decoration: none;color: #0098CB;line-height: 51px;font-size: 22px;cursor: pointer;border: #b4b4b4 solid 1px;border-radius: 3px;box-shadow: 0 2px #b4b4b4; "><img src= "http://public.voga360.com/client/images/youtube_b.png " style= "width:32px;height:32px;float:left;margin:10px; "/>Download</a><ul id="youtubeDownloadList" style="position:absolute;left:10px;top:60px;min-width:196px;background:#f1f1f1;z-index:99;border: 1px solid #c3c3c3;display:none"></ul></div> ';
                        console.log(iframeWindow.document.getElementById("downloadNow"));
                        console.log(iframeWindow.document.getElementById("youtubeDownloadList"));
                        var youtubeDownloadList=iframeWindow.document.getElementById("youtubeDownloadList");
                        iframeWindow.document.onclick=function(){
                            $(youtubeDownloadList).hide();
                        }
                        iframeWindow.document.getElementById("downloadNow").onclick = function(e) {
                            e.stopPropagation();
                            console.log(downloadInfo[0]);
                            console.log(youtubeDownloadList);
                            var li='';
                            for(var i=0,ii=info.length;i<ii;i++){
                                li+='<li style="line-height:30px;text-align:center;color:#525252;cursor:pointer;padding: 6px 0;" index="'+i+'">'+info[i].formatName+'</li>';
                            }
                            console.log(li)
                            $(youtubeDownloadList).html(li);
                            if($(youtubeDownloadList).css('display')=='none'){
                                $(youtubeDownloadList).show();
                            }else{
                                $(youtubeDownloadList).hide();
                            }
                            $(youtubeDownloadList).find('li').off();
                            $(youtubeDownloadList).find('li').on('click', function(event) {
                                var index=$(this).attr('index');
                                collection.downloadBySourceUrl(downloadInfo[index], function() {});
                            });
                            
                            console.log('download----------------click', iframeWindow.location.href)
                        }
                    });

                }
            }
            // $('#ytplayer').on('load',downloadBack);
            var retry=function(){
                console.log('retry',_this.pageId)
                _this.render({ youtubeView: {
                    pageId: _this.pageId
                } });
                _this.download();
            }
            function iframeError(){console.log('iframeError')
                if(NoNet){
                    var nonet=new NoNet({
                        pageId:_this.pageId
                    });
                    nonet.off();
                    nonet.on('retry',retry);
                    app.eventCenter.off('resourceyoutube',retry);
                    app.eventCenter.on('resourceyoutube',retry);
                }
            }
            timer=setInterval(function(){
                var $ytplayer=$('#ytplayer');
                if($ytplayer.length==0){return;}
                var iframeWindow = $('#ytplayer')[0].contentWindow;
                downloadBack();
                try{
                    if($(iframeWindow.document).find('#main-frame-error').length>0||
                    $(iframeWindow.document).find('body').html().indexOf('Failed to load URL')>-1){
                        iframeError();
                    }
                }catch(e){}
            }, 500);

        },
        rRouterInit:function(){
            console.log('rRouter-------------Init')
            if(isInit==0){isInit=1;return;}
            var rRouter=require('r-router');
            if(rRouter){
                rRouter.init(null,cacheA);
            }
        },
        onScreenOut:function(){
            
            var rRouter=require('r-router');
            if(rRouter){
                rRouter.screenout();
            }
        },
        onSwitchSite:function(){
            var paras=app.getCurHashParas();
            var module=paras.module;
            var action=paras.action;
            globalConfig.ctrConfig['4'].query='';
            globalConfig.ctrConfig['5'].query='';
            globalConfig.ctrConfig['1000'].query='';
            globalConfig.ctrConfig['1001'].query='';
            globalConfig.ctrConfig['1002'].query='';
            globalConfig.ctrConfig['1003'].query='';
            if((module=='resource'&&action=='youtube')||(module!='resource'&&module!='home')){
                var rRouter=require('r-router');
                rRouter.isSwitch=1;console.log('onSwitchSite=========',rRouter.isSwitch)
                if(rRouter){
                    rRouter.init(null,cacheA,'youtube');
                }
            }
        },
        initLoad:function(){
            var paras=app.getCurHashParas();
            var sort=paras['query']?paras['query']['sort']:'';
            sort=sort?sort:'';
            var pageState=paras['pageState']?paras['pageState']:'';
            var r_config=require('r-config');
            this.off('screenin',this.rRouterInit);
            this.off('screenout',this.onScreenOut);
            app.eventCenter.off('resourceyoutube',this.rRouterInit);
            app.eventCenter.off('switchSite',this.onSwitchSite);
            if(r_config){
                var rRouter=require('r-router');
                this.on('screenin',this.rRouterInit);
                this.on('screenout',this.onScreenOut);
                app.eventCenter.on('resourceyoutube',this.rRouterInit);
                app.eventCenter.on('switchSite',this.onSwitchSite);
                 rRouter.init({
                    module: 'resource',
                    action: 'youtube',
                    query: {
                        sort:sort,
                        id: this.pageId
                    },
                    pageState: pageState
                },cacheA);
            }else{
                cacheA.getConfig(
                    ['r','config'],
                    'resource/cache20140820/json/r-config.js',
                    function(obj){
                        cacheA.getFiles(
                            'r_config_js',
                            function(msg){
                                cacheA.setStorage([msg[0]],msg[1]);
                                eval(msg[1]);
                                var rRouter=require('r-router');
                                this.on('screenin',this.rRouterInit);
                                this.on('screenout',this.onScreenOut);
                                app.eventCenter.on('resourceyoutube',this.rRouterInit);
                                app.eventCenter.on('switchSite',this.onSwitchSite);
                                 rRouter.init({
                                    module: 'resource',
                                    action: 'youtube',
                                    query: {
                                        sort:sort,
                                        id: this.pageId
                                    },
                                    pageState: pageState
                                },cacheA);
                                 isInit=1;
                            }.bind(this)
                        );
                    }.bind(this)
                );
            }
        }
    });
    
    return YoutubeCtr;
});