define('I18NDI', function(require, exports, module){
    var $ = require('jquery');
    var utils = require('utils'); 
    var string = require('string');
    var app = require('app');
    
    var language; 
    //language = 'chinese';
    var domIdPrex = 'i18n-';
    var textTpl = '<span class="loc-label" id="' + domIdPrex + '{0}" data-dy="{2}" i18n-key="{3}">{1}</span>';
    
    //存储相应dom id映射的 字典名称
    var idToDic = {};
    
    /*
     * 根据字典名称获取模块名 和 键值名
     * @paras dicName {String} format: 'module.key'
     */
    var _splitDicName = function ( dicName ) {
        var spt = dicName.split('.');
        return {
            dm: spt[0],
            name: spt[1]
        }
    };
    
    var fillDomText = function ( dicName ){
        var uuid = utils.getUID();
        var dic = _splitDicName(dicName);
        var dynArgus = Array.prototype.slice.apply(arguments, [1]);
        
        idToDic[domIdPrex + uuid] = dicName;
        
        var text = require(getLanguage() + ':' + dic.dm)[dic.name];
        text = text && dynArgus.length > 0 ? text.format.apply(text, dynArgus) : text;
        
        return textTpl.format(uuid, text, encodeURIComponent(JSON.stringify(dynArgus)), encodeURIComponent(dicName))
    };
    var getDicText=function(dicName){
        var uuid = utils.getUID();
        var dic = _splitDicName(dicName);
        var dynArgus = Array.prototype.slice.apply(arguments, [1]);
        
        idToDic[domIdPrex + uuid] = dicName;
        
        var text = require(getLanguage() + ':' + dic.dm)[dic.name];
        text = text && dynArgus.length > 0 ? text.format.apply(text, dynArgus) : text;
        console.log("取得的字典值",text);
        return text;        
    };
    var switchLanguage = function ( lgg ){
        language = lgg;
        for(var idKey in idToDic){
            var dic = _splitDicName(idToDic[idKey]);
            var $span = $('#' + idKey);
            
            if($span.length === 0){
                continue;
            }
            
            var dy = decodeURIComponent($span.attr('data-dy'));
            var dync = dy ? JSON.parse(dy) : [];
            var text = require(getLanguage() + ':' + dic.dm)[dic.name];
            
            text = text && dync.length > 0 ? text.format.apply(text, dync) : text;
            $span.html(text);
        }
        app.eventCenter.trigger('switchLanguage', language);
    };
    
    
    var $body = $(document.body);
    
    var getLanguage = function(){
        language = language || utils.getParameter('language');
        
        if(language == "farsi"){
        	$body.attr("language", "arabic");
        }else{
        	$body.attr("language", language);
        }
        
        
        if(!language){
            var winParaMe = utils.getParameter('Parame');
            winParaMe = JSON.parse(winParaMe);
            language = winParaMe.language;
        }
        
        language = language.toLowerCase();
        return language;
    };
    
    window.switchLanguage = switchLanguage;
    
    exports.getLanguage = getLanguage;
    exports.fillDomText = fillDomText;
    exports.switchLanguage = switchLanguage;
    exports.getDicText=getDicText;
});