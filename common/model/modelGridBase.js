define('gridModel', function(require, exports, module){
    var app = require('app');
    var utils = require('utils');
    var _ = require('underscore');
    
    var Model = app.ModelBase.extend({
        selected: false,
        even: false,
        init: function(opts){
            this.id = utils.getUID();
            this.on('change', _.bind(this.change, this));
        },
        isSelected: function(){
            return this.selected;
        },
        setSelected: function(selected){
            this.selected = !!selected;
        },
        getId: function(){
            return this.id;
        },
        change: function(){
            this.oneHandler && this.oneHandler.call(this);
        },
        oneBind: function(handler){
            this.oneHandler = handler;
        }
    });
    
    var Collection = app.Collection.extend({
        
        init: function(){
            //选择的model ID map
            this.selectedMap = {};
            //存放 model 的容器
            this.modelMap = {};
            //选择model的ID历史记录
            this.selectedHistory = [];
        },
        push: function( model ){
            if(!model){
                return;
            }
            Collection.__super__.push.call(this, model);
            this.modelMap[model.getId()] = model;
            model.on('remove', _.bind(function(){
                this.remove(model);
            }, this));
        },

        //将model的位置调整到第一位，by wangzhisong
        setModeltoFirst: function(model){
            if (this.modelMap[model.getId()]){
                var isSelected = model.selected;
                this.remove(model, {trigger: false});
            }
            var temp = [];
            temp.push(model);
            this.models = temp.concat(this.models);
            this.modelMap[model.getId()] = model;
            if (isSelected){
                this.setSelected(model.getId(), isSelected);
            }
            model.on('remove', _.bind(function(){
                this.remove(model);
            }, this));
        },
         //add by liujintao 用于应对modelId发生了变化的情况，id为旧id，model为最新的model
        updateModel:function(id,model){
            if(!model||!id){
                return;
            }
            Collection.__super__.updateModel.apply(this,[id,model]);
            if(id!=model.getId()){
                this.remove(this.modelMap[id],{trigger:false});
            }
            this.modelMap[model.getId()]=model;
             model.on('remove', _.bind(function(){
                this.remove(model);
            }, this));
        },
        setSelected: function(modelId, selected){
            var model = this.modelMap[modelId];
            selected = !!selected;
            
            model.setSelected(selected);
            if(selected){
                this.selectedMap[modelId] = true;
            }else{
                delete this.selectedMap[modelId];
            }
        },
        clearSelected: function(){
            this.setSelectedAll(false);
        },
        setSelectedHistory: function(modelId, selected){
            var existedIndex = this.selectedHistory.indexOf(modelId);
            existedIndex > -1 && this.selectedHistory.splice(existedIndex, 1);
            if(selected){
                this.selectedHistory.push(modelId);
            }
        },
        hasSelectedAll: function(){
            var props = Object.getOwnPropertyNames(this.selectedMap);
            return (this.models.length !== 0 && props.length == this.models.length);
        },
        setSelectedAll: function(selected){
            selected = !!selected;
            this.models.forEach(function(model){
                if(!model){
                    return false;
                }
                model.setSelected(selected);
                this.selectedMap[model.getId()] = true;
            }, this);
                
            if(!selected){
                this.selectedMap = {};
                this.selectedHistory.length = 0;
            }else{
                var model = this.models[this.models.length - 1];
                this.selectedHistory.push(model.getId());
            }
        },
        hasSelected: function(){
            for(var i in this.selectedMap){
                return true;
            }
            return false;
        },
        isSelectedModel: function(modelId){
            return !!this.selectedMap[modelId];
        },
        getModelById: function( id ){
            return this.modelMap[id];
        },
        /* add by liujintao 2014-02-14 */
        getModelMap:function(){
            return this.modelMap;
        },
        getSelectedMap:function(){
            return this.selectedMap;
        },
        remove: function(model, opts){
            
            opts = opts || {trigger: true};
            
            var id = model.getId();
            delete this.selectedMap[id];
            delete this.modelMap[id];
            var hisIndex = this.selectedHistory.indexOf(id);
            var modelIndex = this.models.indexOf(model);
            
            if(hisIndex > - 1){
                this.selectedHistory.splice(hisIndex, 1);
            }
            if(modelIndex > -1){
                this.models.splice(modelIndex, 1);
            }
            if(opts.trigger){
                this.trigger('update',{type:"remove",model:model});
            }
        },
        /*清空Collection*/
        clear : function(opts){
            opts = opts || {trigger: true};
            
            this.selectedHistory&&this.setSelectedAll(false);
              //选择的model ID map
            this.selectedMap = {};
            //存放 model 的容器
            this.modelMap = {};
            //清空models
            this.models = [];
            //选择model的ID历史记录
            this.selectedHistory = [];
            
            
            //更新
            
            if(opts.trigger){
                this.trigger("update", {context: this, action: "clear"});
            }
        }
    });
    exports.Model = Model;
    exports.Collection = Collection;
});