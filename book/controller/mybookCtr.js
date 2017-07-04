define('myBookController', function(require, exports, module) {
    var app = require('app');
    var Model = require('myBookModel');
    var connection = require('connectionMgr');
   var Friendly = require('UIFriendlyView');
    
    var Controller = app.ControllerBase.extend({
        ViewConfig : {
            bookMainView : require('UIBookView')
        },
        init : function(opts) {
            var render = (function() {
                if (connection.isConnect()) {
                    this.collection = new Model.Collection();
                    if (!this.collection.requested && !this.collection.responsed) {
                        this.collection.refresh();
                    }
                    this.render({
                        bookMainView : {
                            pageId : this.pageId,
                            collection : this.collection
                        }
                    });
                }else{
                   if(this.collection){
                        this.collection.clear();
                        this.collection.requested=false;
                        this.collection.responsed=false;
                        this.collection.trigger("update");
                    }
                }
            }).bind(this);
            render();
            connection.on('connection', render);
            this.on('screenin', this.onScreenIn);
        },
        onScreenIn:function(hash){
            if(!connection.isConnect()){
               if(!Friendly.instance){
                    Friendly.instance=new Friendly();
                }
                Friendly.instance.clickConnect();
            }else{
                this.views['bookMainView'].redirect(hash);
            }
        },
        update : function() {

        }
    });
    return Controller;
});
