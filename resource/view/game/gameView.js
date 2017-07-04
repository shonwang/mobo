define("gameView", function(require, exports, module) {
    var app = require('app');
    var   $ = require('jquery');
    var i18nDi = require('I18NDI');
    var _ = require('underscore');
    var utils = require('utils');
    
    var GameView = app.ViewBase.extend({
        module: module,
        init: function ( opts ){
            var pageId = opts.pageId;
            // $('#' + pageId).html(_.template(this.getTpl('tpl-game-view'), {I18N: i18nDi}));
            // utils.watchIframeClickEvent('gameIfr');
        }
    });
    
    return GameView;
}); 