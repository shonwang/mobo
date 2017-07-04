/**
 * @author liujintao
 * @descript 文件浏览器，图标形式展示视图
 * @since 2014-03-13
 */
define("FileIconView", function(require, exports, module) {
    var app = require("app");
    var $ = require("jquery");
    var _ = require("underscore");

    var FileIconView = app.ViewBase.extend({
        module : module,
        init : function(opts) {
            console.log(opts);
            this.modelList = opts.modelList;
            this.el = opts.el;
            this.tpl = this.getTpl("tpl-file-explore-icon-item");
        },
        render : function(target) {
            if (this.modelList) {
                target.html(_.template(this.tpl, {
                    models : this.modelList
                }));
            }
        },
        setNodeList : function(nodeList) {
            this.modelList = nodeList;
            this.el.html(_.template(this.tpl, {
                models : this.modelList
            }));
        }
    });

    return FileIconView;
});
