define('utils', function(require, exports, module){
    var app = require('app');
    var Window = require('UIWindow');
    var $ = require('jquery');
    var i18nDi  = require('I18NDI');
    var globalConfig = require('globalConfig');
    
    //获取随机ID
    var randomInt = function (min, max){
        return Math.floor(Math.random() * (max - min + 1) + min);
    };

    var randomStr_str = '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIGKLMNOPQRSTUVWXYZ';
    var randomStr_len = randomStr_str.length - 1;
    var randomStr = function ( max ){
        var rv = '';
        for(var i=0; i < max; i++){
            rv += randomStr_str[randomInt(0, randomStr_len)];
        }
        return rv;
    };
    
    //获取UUID
    var count = 0;
    var prex = '';
    var getUID = function () {
        if(!prex){
            prex = randomStr(8);
        }
        count++;
        return (prex + count);
    };
    
    //验证hash结构是否正确， 目前只要满足两个需求。包含module 和 action
    var validateHash = function ( hash ) {
        if(!hash || typeof hash != 'string' ){
            return false;
        }
        
        var splitHash = hash.split('/');
        if(splitHash.length < 2){
            return false;
        }
        return true;
    };
    /*
     *把json对象转换为hash
     *@paras json {Object} json对象
     */
    var convertJsonTohash = function ( json ) {
        if(typeof json !== 'object' || !json.module || !json.action){
            console.error('Invalid hash json:' + json);
            return null;
        }
        var module = json.module;
        var action = json.action;
        var query = [];
        var pageState = [];
        var ret = '';
        
        for(var qkey in json.query){
            query.push(qkey + '=' + json.query[qkey]);
        }
        for(var pkey in json.pageState){
            pageState.push(pkey + '=' + json.pageState[pkey]);
        }
        query = query.join('&');
        pageState = pageState.join('&');
        
        ret = module + '/' + action + (query ? '/' + query : '/foo=bar') + (pageState ? '/' + pageState : '');
        
        return ret;
    };
    
    
    /*
     *把hash转换为json对象
     *@paras hash {String} hash 字符串， hash格式：module/action/query/pageState
     */
    var converHashToJson = function ( hash ) {
        if(!validateHash(hash)){
            throw new Error('Invalid hash value:' + hash);
        }
        var splitHash = hash.split('/');
        var paras = {};
        
        paras.module = splitHash[0];
        paras.action = splitHash[1];
        
        
        if(splitHash[2]){
            var query = splitHash[2].split('&');
            paras.query = {};
            
            query.forEach(function(para){
                var splitParas = para.split('=');
                paras.query[splitParas[0]] = splitParas[1];
            });
        }
        if(splitHash[3]){
            var pageState = splitHash[3].split('&');
            paras.pageState = {};
            
            pageState.forEach(function(para){
                var splitParas = para.split('=');
                paras.pageState[splitParas[0]] = splitParas[1];
            });
        }
        return paras;
    };
    
    
    /*获取URL中的参数*/
    var getParameter = function(name, targetUrl){
        var url = targetUrl || location.href;  
        
        //去掉hash
        if(url.indexOf('#') > -1){
            url = url.slice(0, url.indexOf('#'));
        }
        
        var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");  
        var paraObj = {}  
        for (i = 0; j = paraString[i]; i++) {  
            paraObj[j.substring(0, j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=") + 1, j.length);  
        }  
        var returnValue = paraObj[name.toLowerCase()];  
        if (typeof (returnValue) == "undefined") {  
            return "";  
        } else {  
            return window.decodeURIComponent(returnValue);  
        }  
    };
    
    var convertSizeToString = function(initSize){
        if(initSize == 0){
            return 0 + "KB";
        }else if(initSize < 1024){
            return initSize + "B";
        }else if((initSize / 1024) < 1024){
            return Math.ceil(toDecimal(initSize / 1024)) + "KB";
        }else if((initSize / (1024*1024)) < 1024){
            return toDecimal(initSize / (1024*1024)) + "MB";
        }else if((initSize / (1024*1024*1024)) < 1024){
            return toDecimal(initSize / (1024*1024*1024))+"GB";
        }
    };

    var toDecimal = function(x){    
        var f = parseFloat(x);    
        if (isNaN(f)) {    
            return;    
        }    
        f = Math.round(x*100)/100;    
        return f;    
    }

    var formatMillisecond = function(millisecond){
        var millisecondStr = "";
        millisecond = parseInt(millisecond);
        var date = new Date();
        date.setTime(millisecond);
        if (millisecond === 0){
            millisecondStr = "00:00:00";
        } else if (millisecond < 1000 * 60 * 60){
            millisecondStr = date.format("mm:ss");
        } else if (millisecond >= 1000 * 60 * 60){
            var hour =  Math.floor(millisecond / 1000 / 60 / 60);
            hour = ("00" + hour.toString()).substring(hour.toString().length);
            millisecondStr = hour + ":" + date.format("mm:ss");
        }
        return millisecondStr;
    }
    
    var browser = function(url){
        var apiNames = require('APINames');
        app.dal.request({
            action: apiNames.REQ_OPEN_DEFAULT_BROWSER,
            paras: {
                url: url
            }
        });
    };
    
    var watchIframeClickEvent = function(id, callback){
        var iframe = document.getElementById(id);
        
        iframe && iframe.contentWindow.addEventListener('click', function(){
            app.eventCenter.trigger('iframeClick', iframe.id);
        });
        iframe.contentWindow.addEventListener('unload', function( e ){
            //console.log(iframe.contentWindow.document.readyState);
        });
    };
    
    /*全局提示框*/
    var GlobalWindowTip;
    
    function showTip(text){
        GlobalWindowTip =  new Window({
            winType: 1
        });
        GlobalWindowTip.addClass('g-global-tip');
        GlobalWindowTip.show();
        GlobalWindowTip.setContent(text);
        GlobalWindowTip.toCenter();
    };
    
    /*Messsage Tip*/
    var $rootEl = null;
    var tipTime = 0;
    var showMessageTip = function(text, callback){
        $rootEl && $rootEl.delegate().remove();
        $rootEl = $('<div class="g-message-tip c-f hbox"><div class="ctn"></div><div class="ico-close"></div></div>');
        $rootEl.appendTo(document.body); 
        $rootEl.delegate('.ico-close', 'click', $.proxy(function(){
            $rootEl.undelegate().remove();
            $rootEl = null;
        }, this));
        $rootEl.find('.ctn').html(text);
        
        clearTimeout(tipTime);
        tipTime = setTimeout(function(){
            $rootEl && $rootEl.hide();
        }, 1000 * 10);
        callback && callback.call(this, $rootEl);
    };
    
    /*获取文件扩展名*/
    var getExtension = function(fileName){
        if(!fileName){
            return "";
        }
        return fileName.substring(fileName.lastIndexOf('.')+1,fileName.length);  
    };
	
	/*复制文本到剪贴板*/
    var copyToClipboard = function(copyText){
        var apiNames = require('APINames');
        app.dal.request({
            action: apiNames.REQ_COPYTOCLIPBOARD,
            paras: {
                content: copyText
            }
        });
    };
	
    /*placeholder*/
	var placeholder = function(id,text,position){ 
		/*当前文本框*/
		var EditArea = (typeof id == 'string') ? $('#' + id) : id;
		
		EditArea.css({
			"position":"relative",
			"zIndex":"0"
		});
		
		var $loaddiv;
		var holderstr;
		var EditAreaParent = EditArea.parent();
		
		/*针对头部的input*/
		if( position == "header" && EditArea.last().val() == ""){
			/*如果当前input已经有了holder，删除重建*/
			if(EditAreaParent.find(".loaddivBox").length>0){
				$loaddivBox = EditAreaParent.find(".loaddivBox").remove();
			}
			$loaddivBox = $('<div class="cbox loaddivBox" ></div>');
			$loaddiv = $('<div class="placeholder-head"></div>');
		    var position = EditArea.position();
			$loaddiv.html(text);
			EditAreaParent.append($loaddivBox);
			$loaddivBox.append($loaddiv);
			$loaddiv.fadeIn(100);
			/*点击*/
			$loaddiv.click( function(){
				$loaddiv.fadeOut(100);
        		 EditArea.css({
                    "zIndex":"1"
                });
				EditArea.focus();
			});
			/*文本框触发事件*/
			EditArea.blur( function(e){
				if($.trim($(e.target).val()) == "" ){
					$loaddivBox.fadeIn(100);
					$loaddiv.fadeIn(100);
    		        EditArea.css({
                        "zIndex":"0"
                    });
				}else{
					$loaddivBox.hide();
					$loaddiv.hide();
				}
			});
			EditArea.keydown(function(e){ 
				if( $loaddiv && $loaddiv.is(":visible") && 
					$loaddivBox && $loaddivBox.is(":visible")){
					
					$loaddivBox.fadeOut(100);
					$loaddiv.fadeOut(100);
				}
		    }); 
			/*hash变化*/
			window.addEventListener("hashchange",function(){
				if($.trim(EditArea.last().val()) == "" ){
					$loaddivBox.show();
					$loaddiv.show();
				}else{
					if( $loaddivBox &&  $loaddiv ){
						$loaddivBox.hide();
						$loaddiv.hide();
				}
			}
		});
		}else if( EditArea.last().val() == "" ){
			/*给input的父元素设置定位*/
			var cssPosition = window.getComputedStyle(EditAreaParent[0]);
			if( cssPosition.position == "static"){
				EditAreaParent.css("position","relative");
			}
			var offset = EditArea.offset();
			$loaddiv = $('<div class="placeholder"></div>');
		
				$loaddiv.css({
					"top": EditArea[0].offsetTop,
					"left": EditArea[0].offsetLeft
				});
			
			
			/*找到当前文本框相对应的placeholder,根据不同类型设置样式*/
			if(EditArea[0].tagName == "TEXTAREA"){
				$loaddiv.css({
					"width": EditArea.width() - 20,
					"height": (EditArea.height() - 20)>18 ? (EditArea.height() - 20):18,
				});
			}else if(EditArea[0].tagName == "INPUT"){
				$loaddiv.css({
					"width": EditArea.width(),
					"height": EditArea.height()
				});
			}
			$loaddiv.html(text);
			EditAreaParent.append($loaddiv);
			$loaddiv.fadeIn(100);
			/*点击*/
			$loaddiv.click( function(){
				$loaddiv.fadeOut(100);
				EditArea.focus();
			});
			/*文本框触发事件*/
			EditArea.blur( function(e){
				if($(e.target).val() == "" ){
					$loaddiv.fadeIn();
				}else{
					$loaddiv.hide();
				}
			});
			EditArea.focus( function(e){
				if( $loaddiv && $loaddiv.is(":visible") ){
					$loaddiv.fadeOut(100);
				}
			});
			EditArea.keydown(function(e){ 
				if( $loaddiv && $loaddiv.is(":visible")){
					$loaddiv.fadeOut(100);
				}
		    }); 
			
		}
		
	};
	
	var openFolderOrFile = function(url, selFile){
	    var apiNames = require('APINames');
	    app.dal.request({
            action: apiNames.REQ_OPEN_EXISTED_FILE,
            paras: {
                path: url,
                selFile: selFile || 0
            }
        });
	};
	
	var Obj2Url = function(obj){
	    var u = '';
	    for(var key in obj){
	        var kv = key + '=' + obj[key];
	        u = u + kv + ':';
	    }
	    return u.slice(0, u.lastIndexOf(':'));
	};
	
	  var serializeObj = function(obj){
        var u = '';
        for(var key in obj){
            var kv = key + '=' + obj[key];
            u = u + kv + '&';
        }
        return u.slice(0, u.lastIndexOf('&'));
    };

    var pageTime = null;
    var lastToPate = "home_home";
    var lastFromPate = "launch_client";

    var setLastPageTime = function(time){
        pageTime = time;
    };
	
	var sendStatistics = function(paras){
        try {
    	    var curHash = app.getCurHashParas();
    	    var apiNames = require('APINames');
    	    
    	    var actionName = paras.action;
            var toPage = "";
            var fromPage = "";

            toPage = paras.toPage || curHash.module + '_' + curHash.action;
            fromPage = paras.fromPage || curHash.module + '_' + curHash.action;
            var agrsStr = paras.args || {};

            //计算页面停留时间
            if ((lastToPate !== toPage || lastFromPate !== fromPage) && 
                actionName === "page_access"){
                var time = new Date().valueOf();
                var remainTime = formatMillisecond(time - pageTime);
                setLastPageTime(time);
                lastToPate = toPage;
                lastFromPate = fromPage;
                agrsStr['duration'] = remainTime;
            }
    	    
            var paramObj = {
                S1 : actionName||"",
                S2 : JSON.stringify(agrsStr),
                S3 : toPage||"",
                S4 : fromPage||"",
                sid :"1000120"
            };
            console.log("%c utility >> event log info: " + serializeObj(paramObj), "color:green"); 
    	    app.dal.request({
    	        action: apiNames.REQ_REPORT_LOG,
    	        paras: {
    	            paramer: serializeObj(paramObj)
    	        }
    	    });
        } catch (error){
            console.error("utility >> event log info: ", error); 
        }
	};

    var sendStatisticsDriver = function(data){
        try {
            var apiNames = require('APINames');
            var syncdata = data.status === 1 ? 1 : 2;
            var paramer ={
                S1:data.eveintid, 
                S21:syncdata, 
                S22:data.info.sPhoneBrand, 
                S23:data.info.sPhoneName, 
                sid:'1000110'
            }; 
            /*'S1=' + data.eveintid + 
                         '&S21=' + syncdata + 
                         '&S22=' + data.info.sPhoneBrand + 
                         '&S23=' + data.info.sPhoneName + 
                         '&sid=1000110';*/
            console.log("utility >> driver log info: ", serializeObj(paramer));
            app.dal.request({
                action: apiNames.REQ_REPORT_LOG,
                paras: {
                    paramer: serializeObj(paramer)
                }
            });
        } catch (error){
            console.error("utility >> driver log info: ", error); 
        }
    };

    var sendStatisticsDownload = function(data){
        try {
            var curHash = app.getCurHashParas();
            var toPage = curHash.module + '_' + curHash.action;
            var fromPage = curHash.module + '_' + curHash.action;

            var apiNames = require('APINames');
            var args = data.s5;
            var paramObj = {
                        S1:data.s1||"", //站点信息
                        S2: data.s2||"",
                        S3:data.s3||"",
                        S4:data.s4||"",
                        S5:JSON.stringify(data.s5||{}),
                        S6:data.s6,
                        S7:data.s7 || toPage || "",
                        S8:data.s8 || fromPage || "",
                        sid:'1000100'
            }
            console.log("%c utility >> download log info: " + serializeObj(paramObj), "color:blue"); 
            app.dal.request({
                action: apiNames.REQ_REPORT_LOG,
                paras: {
                    paramer: serializeObj(paramObj)
                }
            });
        } catch (error){
            console.error("utility >> download log info: ", error); 
        }
    };
    /**
     *@descript 全角转半角
     * @since 2014-05-10
     * @author liujintao
     * @param str to convert
     * @result  the converted string
     *  */
    var DBC2SBC=function(str){
            var result = '';
            for(var i=0;i<str.length;i++){
                    code = str.charCodeAt(i);//获取当前字符的unicode编码
                    if (code >= 65281 && code <= 65373)//在这个unicode编码范围中的是所有的英文字母已经各种字符
                    {
                         result += String.fromCharCode(str.charCodeAt(i) - 65248);//把全角字符的unicode编码转换为对应半角字符的unicode码
                    }else if (code == 12288)//空格
                    {
                         result += String.fromCharCode(str.charCodeAt(i) - 12288 + 32);
                    }else
                    {
                          result += str.charAt(i);
                    }
            }
            return result;
        };
	
	var statisticsCode = {
	    //page action
	    GO_HOME: 'page_access',
	    GO_RESOURCE_APP: 'page_access',
	    GO_RESOURCE_GAMES: 'page_access',
	    GO_RESOURCE_RETONGE: 'page_access',
	    GO_RESOURCE_WALLPAPER: 'page_access',
	    GO_RESOURCE_YOUTUBE: 'page_access',
	    GO_TOOLS: 'page_access',
	    GO_MYAPP: 'page_access',
	    GO_MYCONTACT: 'page_access',
	    GO_MYSMS: 'page_access',
	    GO_MYMUSIC: 'page_access',
	    GO_MYPICTURE: 'page_access',
	    GO_MYVIDEO: 'page_access',
	    GO_TASK_CENTER: 'page_access',
	    
	    //HOME ACTIONS
	    HOME_REFRESH_SCREEN: 'refreshscreen',
	    HOME_SCREEN_SHOT: 'screenshot',
	    HOME_INSTALL_ALL: 'installall',

        //HOME ARGS
        M_HOME: 10,
        M_HOME_PHONE_SCREEN: 1,
        M_RECOMMEND: 2,
        M_MANAGER: 3,
        M_CARDS: 4,
	    
	    HOME_OPEN_BACKUP: 'open_backup',
	    HOME_OPEN_RESTORE: 'open_restore',
	    HOME_OPEN_FILE_MANAGER: 'open_fmanager',
	    
	    //MY APP ACTIONS
	    MYAPP_INSTALL_ALL: 'installapps',
	    MYAPP_INSTALL_COMPLETE: 'installapps_c',
	    MYAPP_UPDATE_ALL: 'updateall',
	    MYAPP_UPDATE: 'update',
	    MYAPP_EXPORT: 'export',
	    MYAPP_EXPORT_COMPLETE: 'export_c',
	    MYAPP_UNINSTALL: 'uninstall',
	    MYAPP_UNINSTALL_COMPLETE: 'uninstall_c',
	    MYAPP_COLUMN_UPDATE: 'update',
	    MYAPP_INSTALL: 'install',

        //MY APP ARGS
        M_MY_APP: 13,
        M_NAVIGATION: 1,
        M_LIST_APPS: 2,
        M_LIST_UPDATE: 3,
        M_LIST_SYS: 4,
        M_RECOMMEND_DEFAULT: 5,
        M_RECOMMEND_SELECTED: 6,
        M_DETAIL_SELECTED: 7
	    
	    //TASK CENTER EVENT
	};

	dateHandle={
        addZero : function(num,n) {
            if (!n) n = 2;
            return Array(Math.abs(('' + num).length - (n + 1))).join(0) + num;
        },
        formatDate : function(v,f) {
            var F = f.replace(/\W/g,',').split(','),format = ['yyyy','MM','dd','hh','mm','ss','ww'];
            var date = {
                y : v.getFullYear(),
                M : v.getMonth() + 1,
                d : v.getDate(),
                h : v.getHours(),
                m : v.getMinutes(),
                s : v.getSeconds(),
                w : v.getDay()
            };
            for (var i = 0,num = F.length;i < num;i++) {
                var o = F[i];
                for (var j = 0;j < 7;j++) {
                    var S = format[j].slice(-1);
                    if (o.indexOf(S)>-1) {
                        if (S == 'w' && date[S] == 0) date[S] = 7; //Sunday
                        if (o.indexOf(format[j])>-1) {
                            f = f.replace(RegExp(format[j],'g'),this.addZero(date[S]));
                        }
                        else f = f.replace(RegExp(format[j].slice(format[j].length/2),'g'),date[S]);
                    }
                }
            }
            return f;
        },
        /**
         * 格式化生成时间对象
         * 
         * @param {String} String 格式化前的时间字符串
         * @param {String} String 时间格式
         * @return {Object} Object 时间对象
         *            @example
         *            var date = dateHandle.parseDate('2010-11-06 15:48:04','yyyy-MM-dd hh:mm:ss');
         */
        parseDate : function(v,f) {
            if (!f) f = 'yyyy-MM-dd';
            f = f.replace(/\W/g,',').split(',');
            v = v.replace(/\D/g,',').split(',');
            var y = 2000,M = 0,d = 1,h = 0,m = 0,s = 0,D = true;
            _MUI.each(f,function(o,i){
                //if (v[i] == '' || isNaN(v[i])) D = false;
                if (v[i] != '' && !isNaN(v[i])) {
                    if (o.indexOf('y')>-1) y = Number(v[i]);
                    if (o.indexOf('M')>-1) M = Number(v[i]) - 1;
                    if (o.indexOf('d')>-1) d = Number(v[i]);
                    if (o.indexOf('h')>-1) h = Number(v[i]);
                    if (o.indexOf('m')>-1) m = Number(v[i]);
                    if (o.indexOf('s')>-1) s = Number(v[i]);
                    if (o.indexOf('w')>-1) s = Number(v[i]);
                }
            });
            if (!D) return false;
            return new Date(y,M,d,h,m,s);
        }
    };
    
    
    var logTime = {
        keys: {},
        start: function(key){
            this.keys[key] = Date.now();
        },
        end: function(key){
            var now = Date.now();
            var start = this.keys[key] || 0;
            return now - start;
        }
    };
    
    var log = {
        out: function(msg){
            console.log("%c" + msg, "color:blue;font-size: 20px");
        }  
    };
    
    var tooltip = (function(){
    	var el = null;
        var titleText;
        var timer;
        
        var lastEv;
        
        var showTip =  function(e){
            
            if(!el){
                el = $('<div class="g-title-tip"></div>');
                $(document.body).append(el);
            }
        	var $t = $(this);
        	var i18nKey = $t.attr('i18n-key');
				titleText = $t.attr('titleText');
			if(i18nKey == undefined && titleText == undefined ){
				return;
			}
			if( i18nKey && i18nKey != "" ){
				el.html(i18nDi.fillDomText(i18nKey));
			}else if( titleText && titleText!=""){
				el.html(titleText);
			}
			
			
			var offset = $t.offset(),
				offsetLeft = $t.offset().left,
				offsetTop = $t.offset().top,
				positionLeft = $t.position().left,
				positionTop = $t.position().top;
			var thisW = $t.outerWidth(),
				thisH = $t.outerHeight(),
				elW = el.outerWidth(),
				elH = el.outerHeight();
				
			var xx = e.pageX;
			var yy = e.pageY;
			
			//没有取到offset
			if( offsetTop == 0 && offsetLeft == 0 
				&& positionLeft == 0 && positionTop == 0){
				console.log("四四为零!")
				return false;
			}
			/*tip要显示在左边*/
			if( $t.hasClass("tipRight")){
				el.css({
					"top": offsetTop + thisH/2 - elH/2,
					"left":offsetLeft + thisW
				});
				
			}else{
				/*tip在底部并在右侧*/
				if( $(document).height() - elH - offsetTop < 60 &&  
					$(document).width() - xx  < 100){
					el.css({
						"top": offsetTop - elH + 10,
						"left": xx - elW
					});
			
				}else if($(document).height() - elH - offsetTop < 60 &&  
						 $(document).width() - thisW - offsetLeft  < 100){
					el.css({
						"top": offsetTop - elH,
						"left": offsetLeft + thisW  - elW
					});
					
				/*tip在底部*/	
				}else if( $(document).height() - elH - offsetTop < 60 ){
					el.css({
						"top": offsetTop - elH + 10,
						"left": xx
					});	
				/*tip在右边*/	
				}else if( $(document).width() - xx  < 100 ){
					el.css({
						"top": offsetTop + thisH,
						"left": xx - elW
					});
				}else{
					el.css({
						"top": offsetTop + thisH,
						"left": xx
					});
				}
			}
			
			el.fadeIn(100);
			
        };
        
        var mouseover = function(e){
            lastEv = e;
            var _this = this;
            timer = setTimeout(function(){
                showTip.call(_this, e);
            }, 200);
        };
        var mouseout = function(e){
            clearTimeout(timer);
            if( el ){
				el.hide();
            };
        };
        $(window).on('mousewheel', function(event) {
			el && el.hide();
		});
		$(document).on('mousedown',function(e){
			el && el.hide();
		});
        return {
            attach: function(id,position){
        		var $target = (typeof id == 'string') ? $('#' + id) : id;
        		if(position == 'right'){
        			$target.addClass("tipRight");
        		}
        		var i18nKey = $target.attr('i18n-key');
					titleText = $target.attr('titleText');
				if( (i18nKey && i18nKey != "") || (titleText && titleText!="" )){
					$target.off('mouseenter', mouseover);
	                $target.off('mouseleave', mouseout);
	                
	                $target.on("mouseenter", mouseover);
	                $target.on("mouseleave", mouseout);	
				}
				
            },
            unattach: function(id){
				var $target = (typeof id == 'string') ? $('#' + id) : id;

                $target.off('mouseenter', mouseover);
                $target.off('mouseleave', mouseout);

                $target.removeAttr("titleText");
                $target.removeAttr('i18n-key');
            
            },
            tipHide : function(){
            	if( el && el.is(":visible")){
					el.hide();
				}
			}
        };
    })();
    
    
    function getBase64Image(img) {
        // Create an empty canvas element
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
    
        // Copy the image contents to the canvas
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
    
        // Get the data-URL formatted image
        // Firefox supports PNG and JPEG. You could check img.src to guess the
        // original format, but be aware the using "image/jpg" will re-encode the image.
        var dataURL = canvas.toDataURL("image/png");
        return dataURL
        //return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
    };
    //*********************************************************
    //20140724 新版日志
    var log_channelid = "-";
    var log_version = "-";
    var log_sessionid = "-";
    var log_site = "-";
    var log_pclg = "-";
    var log_mbrand = "-";
    var log_mmodel = "-";
    var log_phonestatus = "-"
    
	var setlog_phonestatus = function(value){
		log_phonestatus = value;
	}

    var setlog_pclg = function(value){
        if (value){
            log_pclg = value;
        }
    }
	
    var setLogPublicFeild = function (isPhoneInfo, deviceInfo){
  
        if (isPhoneInfo === true){
            log_mbrand = deviceInfo.sPhoneBrand || "-";
            log_mmodel = deviceInfo.sPhoneName || "-";
            //log_phonestatus = deviceInfo.log_phonestatus || "-";
        } else{
            app.dal.request({
                action : "get_GetClientInfo",
                paras : {},
                callback : function(res) {
                    console.log("日志公共字段====================", res);
                    if (res&&res.info){
                        log_channelid = res.info.channelid;
                        log_version = res.info.clientVer;
                        log_sessionid = res.info.sessionid;
                        log_site = res.info.site;
                        log_pclg = res.info.language;
                    }
                    
                }
            });
        }
    };

    var logPageCodeDic = {
        apps_home: "p20004", 
        games_home: "p20027",
        framework: "p20001",
        push:   "p20002",
        home:  "p20003",
        home_home:  "p20003",
        apps:  "p20004",
        apps_categories:    "p20005",
        apps_albumlist: "p20006",
        apps_album: "p20007",
        apps_toptens:   "p20008",
        apps_details:   "p20009",
        apps_search_guide:  "p20010",
        apps_search_result: "p20011",
        books: "p20012",
        books_home: "p20012",
        books_categories:   "p20013",
        books_albumlist:    "p20014",
        books_album:    "p20015",
        books_toptens:  "p20016",
        books_details:  "p20017",
        books_search_guide: "p20018",
        books_search_result:    "p20019",
        toolkit_home:   "p20020",
        toolkit: "p20020",
        backup: "p20021",
        restore:    "p20022",
        oneclickroot:   "p20023",
        myapps: "p20024",
        downloadmanager:    "p20025",
        openusbdebugging:   "p20026",
        games: "p20027",
        games_categories:   "p20028",
        games_albumlist:    "p20029",
        games_album:    "p20030",
        games_toptens:  "p20031",
        games_details:  "p20032",
        games_search_guide: "p20033",
        games_search_result:    "p20034",
        //20140924
        usersystem_signin :"p20035",
        usersystem_signup :"p20036",
        usersystem_myaccount :"p20037",
        youtube_webpage :"p20038",
        wallpapers_categories :"p20039",
        wallpapers_home :"p20040",
        wallpapers_search_result :"p20041",
        wallpapers_search_guide :"p20042",
        wallpapers_details :"p20043",
        wallpapers_collection :"p20044",
        wallpapers_album :"p20045",
        ringtones_categories :"p20046",
        ringtones_singer :"p20047",
        ringtones_toptens :"p20048",
        ringtones_home :"p20049",
        ringtones_search_result :"p20050",
        ringtones_search_guide :"p20051",
        ringtones_albumlist :"p20052",
        ringtones_album :"p20053",
        ondeviceopen :"p20054",
        youtube_search_result :"p20055",
        youtube_search_guide :"p20056",
        mycontacts_home :"p20057",
        mycontacts: "p20057",
        myvideos_home :"p20058",
        myvideos: "p20058",
        mybooks_home :"p20059",
        mypictures_home :"p20060",
        mypicutures: "p20060",
        mymessages_home :"p20061",
        mymessages: "p20061",
        mymusic_home :"p20062",
        mymusic: "p20062",
        feedback :"p20063",
        clean: "p20064",
        music_home: "p20065",
        music_collections: "p20066",
        music_collections_detail: "p20067",
        music_artists: "p20068",
        music_artists_detail: "p20069",
        music_artists_albumdetail: "p20070",
        music_top: "p20071",
        music_top_detail: "p20072",
        music_ringtones: "p20073",
        music_ringtones_categories: "p20074",
        music_search_guide: "p20075",
        music_search_result: "p20076"
    };

    var logModuleCodeDic = {
        title: "m20001",
        leftmenu:   "m20002",
        notification:   "m20003",
        phone:  "m20004",
        recommend:  "m20005",
        manage: "m20006",
        updatecards:    "m20007",
        recommendlist:  "m20008",
        banner: "m20009",
        featured:   "m20010",
        ranking:    "m20011",
        albumlist:  "m20012",
        newreleases:    "m20013",
        categories: "m20014",
        searchbox:  "m20015",
        hotwords:   "m20016",
        list:   "m20017",
        bottom: "m20018",
        morealbumlist:  "m20019",
        screenshot: "m20020",
        similarapp: "m20021",
        morefromdeveloper:  "m20022",
        matchwords: "m20023",
        editorchoice:   "m20024",
        bestbooksofthemonth:    "m20025",
        languages:  "m20026",
        languageselect: "m20027",
        related:    "m20028",
        managementtools:    "m20029",
        advancedtools:  "m20030",
        basic:  "m20031",
        advanced:   "m20032",
        body:   "m20033",
        menu:   "m20034",
        apps:   "m20035",
        updates:    "m20036",
        rightarea_selected: "m20037",
        rightarea_recommend:    "m20038",
        inprocess:  "m20039",
        completed:  "m20040",
        pictureguide:   "m20041",
        videoguide: "m20042",
        //20140924
        signup_signin: "m20043",
        signup: "m20044",
        icon: "m20045",
        verify: "m20046",
        wallpapers: "m20047",
        topsingers: "m20048",
        rightarea: "m20049",
        populartags: "m20050",
        others: "m20051",
        gallery: "m20052",
        featuredringtones: "m20053",
        details: "m20054",
        clean: "m20055",
        banner_area:"m20056",
        banner_type:"m20057",
        banner_picture:"m20058",
        banner_video:"m20059",
        artists_detail_single:"m20060",
        similar_artists:"m20061",
        artists_detail_album:"m20062",
        search_result_single:"m20063",
        search_result_artists:"m20064"
    };

    var logActionCodeDic = {
        exit:  "a20001",
        feedback:   "a20002",
        settings:   "a20003",
        aboutdevice:    "a20004",
        home:   "a20005",
        apps:   "a20006",
        games:  "a20007",
        ringtones:  "a20008",
        wallpapers: "a20009",
        youtube:    "a20010",
        books:  "a20011",
        toolkit:    "a20012",
        mycontacts: "a20013",
        mymessages: "a20014",
        myapps: "a20015",
        mymusic:    "a20016",
        mypicutures:    "a20017",
        myvideos:   "a20018",
        mybooks:    "a20019",
        downloadmanager:    "a20020",
        pushreceive:    "a20021",
        pushshowup: "a20022",
        pushclick:  "a20023",
        refresh:    "a20024",
        capture:    "a20025",
        oneclickdownload:   "a20027",
        download:   "a20028",
        to_backup:  "a20029",
        to_restore: "a20030",
        to_filemanager: "a20031",
        updateall:  "a20032",
        bannerclick:    "a20033",
        to_detail:  "a20034",
        to_categories:  "a20035",
        to_toptens: "a20036",
        to_album:   "a20037",
        to_albumlist:   "a20038",
        to_searchresult:    "a20039",
        to_page:    "a20040",
        next:   "a20041",
        previous:   "a20042",
        touchdownload:  "a20043",
        to_language:    "a20044",
        morelanguage:   "a20045",
        to_aboutdevice: "a20046",
        to_installfiles:    "a20047",
        to_oneclickroot:    "a20048",
        backup: "a20049",
        restore:    "a20050",
        rootnow:    "a20051",
        removeroot: "a20052",
        installapps:    "a20053",
        export: "a20054",
        uninstall:  "a20055",
        installapps_result: "a20056",
        export_result:  "a20057",
        uninstall_result:   "a20058",
        opendownloadsfolder:    "a20059",
        pause:  "a20060",
        "continue":   "a20061",
        "delete": "a20062",
        showup: "a20063",
        pictureguide:   "a20064",
        videoguide: "a20065",
        "one-clicksetting":   "a20066",
        customerservice:    "a20067",
        nextpage:   "a20068",
        previouspage:   "a20069",
        chooseversion: "a20070",
        //20140924
        to_myaccount: "a20071",
        to_signup: "a20072",
        to_forgotpassword: "a20073",
        facebook_signin: "a20074",
        google_signin: "a20075",
        changephoto: "a20076",
        selectphoto: "a20077",
        uploadphoto: "a20078",
        verification: "a20079",
        delete_result: "a20080",
        easynew: "a20081",
        edit: "a20082",
        edit_result: "a20083",
        fullnew: "a20084",
        import: "a20085",
        import_result: "a20086",
        markasread: "a20087",
        newcontact: "a20088",
        newmessage: "a20089",
        play: "a20090",
        playall: "a20091",
        seaswallpaper: "a20092",
        sendmessage: "a20093",
        sendmessage_result: "a20094",
        setas: "a20095",
        setaswallpaper: "a20096",
        choose: "a20097",
        open: "a20098",
        recommendclick: "a20099",
        to_nextpage: "a20100",
        to_previouspage: "a20101",
        to_singer: "a20102",
        whatusbdebug: "a20103",
        to_clean: "a20104",
        scan: "a20105",
        clean: "a20106",
        to_collections:"a20107",
        to_top:"a20108",
        to_collections_detail:"a20109",
        area:"a20110",
        type:"a20111",
        to_artists_detail:"a20112",
        to_artists_albumdetail:"a20113",
        to_top_detail:"a20114",
        to_categoriesdetail:"a20115"
    };

    /**
     * 拼接日志业务字符串，并发送给C++
     * @method
     * @param string logServiceid
     * @param object logServiceExt
     * @return 无
     */
    var sendNewLog = function (logServiceid, logServiceExt){
        var log_time = new Date().valueOf();
        var log_nettype = "-";

        var log_service_id = logServiceid;
        if (log_service_id !== "1000102"){
            logServiceExt.mbrand = log_mbrand;
            logServiceExt.mmodel = log_mmodel;
        }
        if (logPageCodeDic[logServiceExt.page]){
            logServiceExt.page = logPageCodeDic[logServiceExt.page];
        }
        if (logModuleCodeDic[logServiceExt.module]){

            logServiceExt.module = logModuleCodeDic[logServiceExt.module];
        }
        if (logActionCodeDic[logServiceExt.action]){
            logServiceExt.action = logActionCodeDic[logServiceExt.action];
        }
        log_site = globalConfig.domain.site;
        logServiceExt = JSON.stringify(logServiceExt)
        var feildStr = [log_channelid, log_version, log_sessionid, log_time, log_nettype, log_site, log_phonestatus, log_pclg, log_service_id, logServiceExt].join("###");
        console.log("%c 新版日志 >> " + feildStr, "color:#13abe1");
        try{
            app.dal.request({
                action: "get_ReportLog2",
                paras: feildStr
            });
        } catch (error){}   
    };
	
	var sendWifiLog = function (logServiceExt){
		var log_time = new Date().valueOf();
        var log_nettype = "wifi";
        var log_service_id = "1000115";
        log_site = globalConfig.domain.site;
        logServiceExt = JSON.stringify(logServiceExt)
        var feildStr = [log_channelid, log_version, log_sessionid, log_time, log_nettype, log_site, log_phonestatus, log_pclg, log_service_id, logServiceExt].join("###");
        console.log("%c 新版wifi日志 >> " + feildStr, "color:#13abe1");
        try{
            app.dal.request({
                action: "get_ReportLog2",
                paras: feildStr
            });
        } catch (error){}   
    };
	
    var sendNewLogDriver = function(data){
        try {
            var syncdata = data.status === 1 ? 1 : 2;

            var log_time = new Date().valueOf();
            var log_nettype = "-";

            var logServiceExt ={
                eventid:data.eveintid, 
                syncdata: syncdata, 
                mbrand:data.info.sPhoneBrand, 
                mmodel:data.info.sPhoneName, 
            }; 
            var log_service_id = "1000110";
        	log_site = globalConfig.domain.site;
            logServiceExt = JSON.stringify(logServiceExt)
            var feildStr = [log_channelid, log_version, log_sessionid, log_time, log_nettype, log_site, log_phonestatus, log_pclg, log_service_id, logServiceExt].join("###");
            console.log("%c 新驱动日志 >> " + feildStr, "color:#13abe1");
            app.dal.request({
                action: "get_ReportLog2",
                paras: feildStr
            });
        } catch (error){
            console.error("utility >> driver log info: ", error); 
        }
    };

    var newPageTime = null;

    var setNewLastPageTime = function(time){
        newPageTime = time;
    };

    var getNewLastPageTime = function(){
        return newPageTime
    };

    var convertHashKeyByLog = function(HashKey){
        var convertedHashKey = "";
        switch(HashKey){
           case 'home_home' : 
               convertedHashKey = "home"; 
               break;
           case 'resource_app' : 
               convertedHashKey = "apps"; 
               break;
           case 'resource_game' : 
               convertedHashKey = "games";
               break;
           case 'resource_ringtone':
               convertedHashKey = "ringtones";
               break;
           case 'resource_wallpaper':
               convertedHashKey = "wallpapers";
               break;
           case 'resource_youtube':
               convertedHashKey = "youtube";
               break;
           case 'tools_tools':
               convertedHashKey = "toolkit";
               break;
           case 'contact_contact':
               convertedHashKey = "mycontacts";
               break;
           case 'sms_sms':
               convertedHashKey = "mymessages";
               break;
           case 'app_app':
               convertedHashKey = "myapps";
               break;
           case 'music_music': 
               convertedHashKey = "mymusic";
               break;
           case 'image_image':
               convertedHashKey = "mypicutures";
               break;
           case 'video_video':
               convertedHashKey = "myvideos";
               break;
           case 'task_task':
               convertedHashKey = "downloadmanager";
               break;
           case 'book_book':
               convertedHashKey = "mybooks";
               break;
           case 'resource_book':
               convertedHashKey = "books";
               break;
        }
        return convertedHashKey;
    };
    exports.sendNewLogDriver = sendNewLogDriver;
    exports.setLogPublicFeild = setLogPublicFeild;
    exports.convertHashKeyByLog = convertHashKeyByLog;
    exports.sendNewLog = sendNewLog;
    exports.setNewLastPageTime = setNewLastPageTime;
    exports.getNewLastPageTime = getNewLastPageTime;
    exports.setlog_phonestatus = setlog_phonestatus;
    exports.setlog_pclg = setlog_pclg;
    //*********************************************************
    
    //wifi日志
    exports.sendWifiLog = sendWifiLog;
    
    exports.getBase64Image = getBase64Image;
    exports.setLastPageTime = setLastPageTime;
	exports.sendStatistics = sendStatistics;
    exports.sendStatisticsDriver = sendStatisticsDriver;
    exports.sendStatisticsDownload = sendStatisticsDownload;
	exports.statisticsCode = statisticsCode;
    exports.getUID = getUID;
    exports.randomStr = randomStr;
    exports.validateHash = validateHash;
    exports.convertJsonTohash = convertJsonTohash;
    exports.converHashToJson = converHashToJson;
    exports.watchIframeClickEvent = watchIframeClickEvent;
    exports.getParameter = getParameter;
    exports.convertSizeToString = convertSizeToString;
    exports.formatMillisecond = formatMillisecond;
    exports.showTip = showTip;
    exports.browser = browser;
    exports.showMessageTip = showMessageTip;
    exports.getExtension = getExtension;
	exports.placeholder = placeholder;
	exports.openFolderOrFile = openFolderOrFile;
	exports.copyToClipboard = copyToClipboard;
    exports.dateHandle = dateHandle;
    exports.serializeObj = serializeObj;/*对象序列化*/
    exports.tooltip = tooltip;/*对象序列化*/
    exports.DBC2SBC = DBC2SBC;
    exports.logTime = logTime;
    exports.log = log;
});