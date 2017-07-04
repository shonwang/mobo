define('NoNet', function(require, exports, module){
    var $ = require('jquery');
    var app = require('app');
    var _ = require('underscore');
    var i18nDi  = require('I18NDI');

    var NoNet = app.ViewBase.extend({
        module: module,
        events: {
            'click -> .js-retry': 'retry',
        },
        init: function(opts){
            this.options = opts;
            var template = _.template(this.getTpl('tpl-nonet-view'), {I18N: i18nDi});
            this.el = $(template);
            $('#' + opts.pageId).html('');
            this.el.appendTo($('#' + opts.pageId));
        },
        retry:function(){
            this.trigger('retry');
        }
    });
    return NoNet; 
});
