define('contactController', function(require, exports, module){
    var app = require('app');
    var contactModel = require('contactModel');
    var connection = require('connectionMgr');
    var Friendly = require('UIFriendlyView');    
    var Controller = app.ControllerBase.extend({
        ViewConfig: {
            contactMainView: require('UIContactView')  
        },
        
        init: function(opts){
            var render=(function(){
                if(connection.isConnect()){
                    this.collection = new contactModel.Collection();
                    if(!this.collection.requested&&!this.collection.responsed){
                        this.collection.refresh();
                    }
                    this.render({contactMainView: {
                    pageId: this.pageId,
                    collection: this.collection
                }
                });
                }else{
                    if(this.collection){
                        console.log("断开连接，清空联系人============");
                        this.collection.clear();
                        this.views['contactMainView'].gridCollection.clear();
                        this.collection.requested=false;
                        this.collection.responsed=false;
                        this.collection.trigger("update");
                    }
                }
            }).bind(this);
            
            render();
            connection.on('connection', render);
                        
            this.on('screenin', this.onScreenIn);
         //   this.collection.refresh();
        },
       onScreenIn:function(hash){
           // if(hash.pageState&&hash.pageState.searchType&&hash.pageState.searchType=="2"&&hash.pageState.multiple=="0"){
           if(!connection.isConnect()){
               if(!Friendly.instance){
                    Friendly.instance=new Friendly();
                }
                Friendly.instance.clickConnect();
            }else{
                this.views['contactMainView'].redirect(hash);
            }
            //}
        },
        update: function(){
       
        }
    });
    return Controller;
});