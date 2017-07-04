define('template', function(require, exports, module){
    var $ = require('jquery');
    
    //tpl 容器
    //每个模版的key 是uuid
    var tpls = {};
    
    var getTpl = function(file, tplId){
        if(tpls[tplId]){
            return tpls[tplId];
        }else{
            $.ajax({
                async: false,
                url: file,
                dataType: 'text',
                xhrFields: {
                    withCredentials: true
                }
            }).done(function(text){
                    if(!text)return;
                    var $module = $('<div/>');
                    $module.html(text);
                    var $script = $module.find('script');
                    
                    $script.each(function(){
                        tpls[this.id.trim()] = this.innerHTML;
                    });
                    $module.remove();
                });
            return tpls[tplId] || '';
        }
    };
    exports.getTpl = getTpl;
});