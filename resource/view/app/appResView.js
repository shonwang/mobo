define("appResView", function(require, exports, module) {
    var app = require('app');
    var   $ = require('jquery');
    var   _ = require('underscore');
    var i18nDi  = require('I18NDI');
    var utils = require('utils');
    var config = require('globalConfig');
    var Window = require('UIWindow');
    
    
    var AppResView = app.ViewBase.extend({
        module: module,
        curHash: null,
        init: function(opts){
            var pageId = opts.pageId;
            // $('#' + pageId).html(_.template(this.getTpl('tpl-app-res-view'), {I18N: i18nDi}));
            // utils.watchIframeClickEvent('appResIfr');
            
        }
    });
    
    return AppResView;
}); 