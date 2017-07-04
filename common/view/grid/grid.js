define('grid', function(require, exports, module){
    var $ = require('jquery');
    var app = require('app');
    var ScrollerProxy = require('scrollerProxy');
    
    /*
    * @constructor Grid 
    * @paras id 渲染的目标容器
    * @opts 可选项
    * opts 格式
    * {
    *    model: [{
    *              name: 'title',//数据字段名
    *              label: '名称',//表格列名
    *              type: 'view|string|checkbox',
    *              width: 50 //px
    *         }],
    *    rowHeight: 100,
    *    showLabel: true,
    *    multiSelectable:false,
    *    dragSelectable: true//Default dragSelectable
    * }
    */
    var SuperGrid = app.ViewBase.extend({
       module: module,
       init: function(opts){
            this.opts = $.extend({
               rowHeight: 25,
               showLabel: true,
               checboxDelegate: null,
               dragSelectable: false,
               showChecboxDelegate: true
            }, opts);
            
            this.el = typeof opts.container == 'string' ? $('#'+opts.container) : opts.container;
            this.el.html(this.getTpl('grid-template'));
            
            this.onSelectAll = $.proxy(this.onSelectAll, this);
            
            
            var $proxyContainer = this.el.find('.proxy-container');
            this.scrollerProxy = new ScrollerProxy({
               container: $proxyContainer,
               rowHeight: this.opts.rowHeight
            });
            
            this.$allCheckbox = this.opts.checboxDelegate || null;
            
            this.scrollerProxy.on('renderOneScreen', $.proxy(this.renderList, this));
            
            if(this.opts.collection){
               this.collection = this.opts.collection;
               this.collection.on('update', $.proxy(this.update, this));
            }
            
            this.buildGridHeader();
            
            if(!this.opts.showLabel){
                this.el.find('header').remove();
                $proxyContainer.css('top', 0);
            }
            
            $proxyContainer.on('click', $.proxy(this.onSelectedRow, this));
            
            if(this.opts.dragSelectable){
                $(document).on('mousedown', $.proxy(this.onDragSelect, this));   
            }
            
            $(window).on('resize', $.proxy(this.update, this));
       },
       
       onDragSelect: function( e ){
           var $target = $(e.target) ;
           var $pxyCon = this.el.find('.proxy-container');
           
           //mousedown 选择列表范围内直接退出 
           if(!$pxyCon[0].contains($target[0])){
               return;
           }
           
           var $doc = $(document);
           var collection = this.collection;
           //获取当前选取的行元素
           var $row = $target.parents('.g-grid-row');
           //当前选取的行元素ID
           var startId = $row.attr('data-id');
           //当前选取的数据
           var startModel = collection.getModelById( startId );
           //数据所在列表中的索引
           var startIndex = collection.getIndex( startModel );
           
           var epageY = e.pageY;
           
           var watchMove = null;
           
           var mouseMove = $.proxy(function( e ){
               e.preventDefault();
                
               var $r = $(e.target).parents('.g-grid-row');
               var mid = $r.attr('data-id');
               
               var spx = this.scrollerProxy;
               
               var moveModel  = collection.getModelById(mid);
               var moveIndex =  collection.getIndex(moveModel);
               
                
               collection.models.forEach(function(model){
                   collection.setSelected(model.getId(), false);
               }, this);
               
               
               //相对容器底部的偏移量
               var offsetBottomY = e.pageY - window.innerHeight;
               var offsetLastPageY = e.pageY - epageY;
               var offsetProxyY = $pxyCon.offset().top;
               
               var models = [];
               
               if(offsetBottomY > 0){
                   if(offsetLastPageY > 0){
                       this.scrollerProxy.mouseWheel({
                           originalEvent : {
                               wheelDelta: -120
                           }
                       });
                   }
                   models = collection.models.slice(startIndex, spx.getIndex() + spx.getOneScreenNum());
               }else if(e.pageY < offsetProxyY){
                   if(offsetLastPageY < 0){
                       this.scrollerProxy.mouseWheel({
                           originalEvent : {
                               wheelDelta: 120
                           }
                       });
                   }
                   models = collection.models.slice(spx.getIndex(), startIndex);
               }else{
                   var sx = Math.min(moveIndex, startIndex);
                   var ex = Math.max(moveIndex, startIndex);
                   
                   models = collection.models.slice(sx, ex);
               }
               models.forEach(function( model ){
                   collection.setSelected(model.getId(), true);
               });
               this.renderList({
                   index: spx.getIndex(),
                   screenNum: spx.getOneScreenNum()
               });
                   
               epageY = e.pageY;
           }, this);
           
           var mouseup = $.proxy(function(e){
               $doc.off('mousemove', mouseMove);
               $doc.off('mouseup', mouseup);
           }, this);
            
           $doc.on('mousemove', mouseMove);
           $doc.on('mouseup', mouseup);
       },
       
       onSelectedRow: function( evt ){
           var $target = $(evt.target);
           var $row = $target.parents('.g-grid-row');  
           var checkbox = $row.find('input')[0];
           var modelId = $row.attr('data-id');
           var curModel = this.collection.getModelById(modelId);
            
           if($row.length === 0 || !checkbox){
               return;
           }
            
           //非点击CHECKBOX 列的处理
           if(evt.target.tagName.toLowerCase() !== 'input' && 
               !$target.hasClass('g-grid-checkbox')){
                 
               if(this.opts.multiSelectable){
                   checkbox.checked = !checkbox.checked; 
                   this.collection.setSelected(modelId, checkbox.checked);
                   $row[checkbox.checked ? 'addClass': 'removeClass']('selected');
                   this.trigger(checkbox.checked? SuperGrid.ROW_SELECTED : SuperGrid.ROW_UNSELECTED, curModel);
               }else{
                   this.collection.clearSelected();
                   this.collection.setSelected(modelId, true);
                  
                   var rows = this.getRowElements();
                   rows.forEach(function(row){
                        row.rowElement.find('input:checkbox').prop('checked', false);
                        row.rowElement['removeClass']('selected');
                   });
                   checkbox.checked = true;
                   $row['addClass']('selected');
                  
                   this.collection.setSelectedHistory(modelId, checkbox.checked);
                   this.trigger(SuperGrid.ROW_SELECTED, curModel);
               }
               
            //点击checkbox列
            }else {
               if($target.hasClass('g-grid-checkbox')){
                  checkbox.checked = !checkbox.checked;
               }
               this.collection.setSelectedHistory(modelId, checkbox.checked);
               this.collection.setSelected(modelId, checkbox.checked);
               
               $row[checkbox.checked ? 'addClass' : 'removeClass']('selected');
               this.trigger(checkbox.checked? SuperGrid.ROW_SELECTED : SuperGrid.ROW_UNSELECTED, curModel);
            }
            
            
            if(this.$allCheckbox){
               this.$allCheckbox.prop('checked', this.collection.hasSelectedAll());
            }
       },
       
       onSelectAll: function(e){
            var checked = this.$allCheckbox[0].checked;
            
            if(this.collection.size() === 0){
                e.preventDefault();
                return;
            }
            this.setAllSelect(checked);
       },
       
       setAllSelect: function(checked){
           this.collection.setSelectedAll(checked);
           var rows = this.getRowElements();
           rows.forEach(function( row ){
               row.rowElement.find('input:checkbox').prop('checked', !!checked);
               row.rowElement[checked ? 'addClass' : 'removeClass']('selected');
           });
           this.trigger(SuperGrid.ROW_SELECTED_ALL, checked);
       },
       
       buildGridHeader: function(){
            if(this.opts.model){
               var mls = this.opts.model || [];
               this.$header = this.el.find('header');
               
               mls.forEach(function(m){
                  var colLabel = $('<div class="g-grid-label"/>');
                  if(m.width == 'flex'){
                        colLabel[0].style.webkitBoxFlex = 1;
                  }else{
                        colLabel.css('width', m.width || 14);
                  }
                  
                  if(m.type === 'checkbox'){
                        //全选checkbox可以使代理， 交由其他 checkbox元素处理
                        if(!this.$allCheckbox && this.opts.showChecboxDelegate){
                            this.$allCheckbox = $('<input type="checkbox"/>');
                            colLabel.append(this.$allCheckbox);
                        }
                        this.$allCheckbox && this.$allCheckbox.on('click', this.onSelectAll);
                        colLabel.addClass('g-grid-checkbox');
                  }else{
                        colLabel.html(m.label);
                  }
                  
                  var pack = m.pack || 'left';
                  colLabel[0].style.webkitBoxPack = pack;
                  
                  this.$header.append(colLabel);
               }, this);
            }
       },
       
       setAllCheckboxDelegate: function( delegate ){
           this.$allCheckbox = delegate;
           this.$allCheckbox.off('click');
           this.$allCheckbox.on('click', this.onSelectAll);
           
           this.$allCheckbox.prop('checked', this.collection.hasSelectedAll());
       },
       
       getRowElements: function(){
            var rowNums = this.scrollerProxy.getOneScreenNum();
            
            if(this.domRows && rowNums === this.domRows.length){
               return this.domRows;
            }
            
            var fragment = document.createDocumentFragment();
            this.domRows = this.domRows || [];
            
            rowNums = rowNums - this.domRows.length;
            
            for(var i=0; i < rowNums; i++){
               
               //缓存的dom元素
               var domElement = $('<div class="g-grid-row" style="display:none"></div>');
               var rowMap = {
                  rowElement: domElement,
                  columns: []
               };
               this.domRows.push(rowMap);
               
               //创建列元素容器
               this.opts.model.forEach( function( m ){
                  var column = $('<div class="g-grid-column"></div>');
                  rowMap.columns.push(column);
                  
                  if(m.width === 'flex'){
                        column[0].style.webkitBoxFlex = 1;
                  }else{
                        column.width(m.width);
                  }
                  
                  
                  if(m.type == 'checkbox'){
                        column.addClass('g-grid-checkbox');
                        column.html('<input type="checkbox"/>');
                  }
                  var pack = m.pack || 'left';
                  column[0].style.webkitBoxPack = pack;
                  
                  domElement.append(column);
               });
               
               fragment.appendChild(domElement[0]);
               domElement.height(this.opts.rowHeight);
            }
            this.scrollerProxy.addContent(fragment);
            return this.domRows;
       },
       getScreenModels: function(index, nums){
            var screenModels = this.collection.models.slice(index, index + nums);
            
            screenModels.forEach(function(model, i){
               model.setProperty('even', (index +　i) % 2 == 1);
            }, this);
            return screenModels;
       },
       renderList: function(ev){
            var oneList = this.getScreenModels(ev.index, ev.screenNum);
            
            this.renderOrder = this.renderOrder || [];
            this.renderOrder.push(oneList);
            
            if(!this.aniFrame){
               var render = function(){
                  var me = this;
                  var rowList = this.getRowElements();
                  var cpList = rowList.slice(0, rowList.length);
                  var renderList = this.renderOrder.shift();
                  
                  if(!renderList){
                        clearTimeout(this.aniFrame);
                        this.aniFrame = null;
                        return;
                  }
                  this.trigger(SuperGrid.RENDER_START, renderList);
                  
                  renderList.forEach(function(model, index){
                        var row = cpList.shift();
                        var checkbox = row.rowElement.find('input:checkbox');
                        
                        row.rowElement.attr('data-id', model.getId());
                        
                        var renderRow = function (){
                           me.opts.model.forEach(function(m, i){
                              var column = row.columns[i];
                              
                              if(m.type !== 'checkbox'){
                                  if(m.type == 'view'){
                                      var vw = new m['view'](model);
                                      vw.render(column);
                                  }else{
                                      column.html(model.get(m['name']));
                                  }
                              }else{
                                  checkbox[0].checked = model.isSelected();
                              }
                           });
                        };
                        renderRow();
                        
                        if(checkbox.length !== 0){
                            var selected = model.isSelected();
                            row.rowElement[selected ? 'addClass' : 'removeClass']('selected');
                        }
                        
                        row.rowElement.css('display', '-webkit-box');
                        
                        //是否需要斑马线高亮
                        row.rowElement.removeClass('even');
                        if(model.getProperty('even')){
                           row.rowElement.addClass('even');
                        }
                        model.oneBind(function(){
                            var $row = $('[data-id="' + this.getId() + '"]');
                            if($row.size() > 0){
                                renderRow();
                            }
                        });
                  });
                  
                  cpList.forEach(function(row){
                       row.rowElement.css('display', 'none');
                  });
                  
                  var spx = this.scrollerProxy;
                  
                  if(spx.getIndex() + spx.getOneScreenNum() - 1 >= spx.length){
                       rowList[rowList.length - 1].rowElement[0].scrollIntoView();
                  }else if(spx.getIndex() <= 1){
                       rowList[0].rowElement[0].scrollIntoView();
                  }
                  
                  this.trigger(SuperGrid.RENDER_END, renderList);
                  this.aniFrame = setTimeout($.proxy(render, this), 0);
                  
                  this.$allCheckbox && this.$allCheckbox.prop('checked', this.collection.hasSelectedAll());
               };
               this.aniFrame = setTimeout($.proxy(render, this), 0);
            }
       },
       /**
        *@description modify by liujintao 2014-05-14  */
       scrollToIndex: function( index ){
           //如果collection的models长度小于一屏数目，直接返回
           if(this.collection.models.length<this.scrollerProxy.getOneScreenNum()){
               return;
           }
            this.renderList({
                index: index, 
                screenNum: this.scrollerProxy.getOneScreenNum()
            });
            this.scrollerProxy.setScrollTopByIndex( index );
       },
       update: function(){
            this.scrollerProxy.setLength(this.collection.size());
            this.renderList({
               index: this.scrollerProxy.getIndex(),
               screenNum: this.scrollerProxy.getOneScreenNum()
            });
            if(this.$allCheckbox && this.collection.size() <=0 ){
               this.$allCheckbox.prop('checked', false);
               this.trigger(SuperGrid.ROW_SELECTED_ALL, false);
            }
       },
       setCollection: function(collection){
            this.collection = collection;
            this.scrollerProxy.setLength(collection.size());
            this.collection.on('update', $.proxy(this.update, this));
       }
    });
    
    SuperGrid.RENDER_START = 'renderStart';
    SuperGrid.RENDER_END = 'renderEnd';
    
    SuperGrid.ROW_SELECTED = 'selected';
    SuperGrid.ROW_UNSELECTED = 'unselected';
    SuperGrid.ROW_SELECTED_ALL = 'allselected';
    
    return SuperGrid;
});
