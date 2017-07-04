define('smsController', function(require, exports, module){
    var app = require('app');
    var MessageModel = require('smsModel');
    var $ = require('jquery');
    var SMSView = require('UISmsView');
    var ContactModel = require('contactModel');
    var connection = require('connectionMgr');
    var Friendly = require('UIFriendlyView');     
    var Controller = app.ControllerBase.extend({
        ViewConfig: {
            smsView: SMSView.SMSMainView
        },
        collection: null, 
        init: function( opts ){
            var render = (function(){
                if(connection.isConnect()){
                    this.collection = new MessageModel.Collection();
                    this.contactCollection = new ContactModel.Collection();
                    this.render({
                        smsView: {
                            pageId: this.pageId,
                            collection: this.collection,
                            contactCollection: this.contactCollection
                        }
                    });
                } else {
                    if(this.contactCollection){
                        this.collection.clear();
                        this.contactCollection.clear();
                        this.contactCollection.requested=false;
                        this.contactCollection.responsed=false;
                        this.contactCollection.trigger("update");
                    }
                }
            }).bind(this);

            render();
            connection.on('connection', render);

            this.on('screenin', this.onScreenin);
            //collection.refresh();
        },

        onScreenin:function(){
            var hash = app.getCurHashParas();
            console.log(hash);
            if(!connection.isConnect()){
               if(!Friendly.instance){
                    Friendly.instance=new Friendly();
                }
                Friendly.instance.clickConnect();
            }else{
               this.views['smsView'].redirect(hash); 
            }
        },
       
        update: function(){
       
        },
    });
    return Controller;
});