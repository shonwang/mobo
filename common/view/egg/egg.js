define('UIEggView', function(require, exports, module){
    var app = require('app');
    var i18nDi  = require('I18NDI');
    var   $ = require('jquery');
    var   _ = require('underscore');
    var utils = require('utils');
    var apiNames = require('APINames');
    var taskMgr = require('taskModel');
    
    var userlist = [
        {
            name: "Adrena",
            title: "Tester",
            positionY:0
        },
        {
            name: "Amelie",
            title: "Designer",
            positionY:-60
        },
        {
            name: "Charles",
            title: "C++ Developer",
            positionY:-120
        },
        {
            name: "Chen",
            title: "Product Manager",
            positionY:-180
        },
        {
            name: "Christina",
            title: "Front-end Developer",
            positionY:-240
        },
        {
            name: "Daniel",
            title: "Front-end Developer",
            positionY:-300
        },
        {
            name: "Dongxu",
            title: "Android Developer",
            positionY:-360
        },
        {
            name: "Eric",
            title: "C++ Developer",
            positionY:-420
        },
        {
            name: "Iverson",
            title: "Tester",
            positionY:-480
        },
        {
            name: "Jason",
            title: "Tester",
            positionY:-540
        },
        {
            name: "Javen",
            title: "Java Developer",
            positionY:-600
        },
        {
            name: "Jeff",
            title: "Front-end Developer",
            positionY:-660
        },
        {
            name: "Jianqiang",
            title: "Project Manager",
            positionY:-720
        },
        {
            name: "Jun",
            title: "C++ Developer",
            positionY:-780
        },
        {
            name: "Kapucino",
            title: "Front-end Developer",
            positionY:-840
        },
        {
            name: "Matrix",
            title: "C++ Developer",
            positionY:-900
        },
        {
            name: "Nickluck",
            title: "Front-end Developer",
            positionY:-960
        },
        {
            name: "Nicole",
            title: "Designer",
            positionY:-1020
        },
        {
            name: "Pan",
            title: "Tester",
            positionY:-1080
        },
        {
            name: "Pitta",
            title: "C++ Developer",
            positionY:-1140
        },
        {
            name: "Quan",
            title: "Tester",
            positionY:-1200
        },
        {
            name: "Serena",
            title: "Tester",
            positionY:-1260
        },
        {
            name: "Sherry",
            title: "Front-end Developer",
            positionY:-1320
        },
        {
            name: "Shon",
            title: "Front-end Developer",
            positionY:-1380
        },
        {
            name: "Smart Baby",
            title: "C++ Developer",
            positionY:-1440
        },
        {
            name: "Tangtang",
            title: "C++ Developer",
            positionY:-1500
        },
        {
            name: "Turkeysy",
            title: "C++ Developer",
            positionY:-1560
        },
        {
            name: "Wayne",
            title: "Android Developer",
            positionY:-1620
        },
        {
            name: "Yeats",
            title: "Product Manager",
            positionY:-1680
        },
        {
            name: "Yi",
            title: "Tester",
            positionY:-1740
        },
        {
            name: "Zhe",
            title: "Tester",
            positionY:-1800
        }
        
    ];
    
    
    var dataList = [];
    
    var View = app.ViewBase.extend({
        module: module,
        tplItem: '',
        init: function(opts){
            this.opts = $.extend({
                cardWidth: 220,
                cardHeight: 80,
                columnNums: 4,
                rowNums: 8
            }, opts);
            
            this.el = $('<div><div class="egg-title">A Product By Mobogenie.com</div><button class="close"></button></div>');
            
            this.el.addClass("g-egg-container");
            this.el.appendTo(document.body);
            
            this.viewHolder = this.el.find("view-holder");
            
            this.tplItem = this.getTpl("tpl-egg-contact-item");

            
            this.viewHolderList = [];
            this.initViewHolderList();
            
            this.initPlaceHolder();
            this.addContent();
            var me = this;
            this.el.undelegate(".close").delegate(".close","click",function(){
                me.trigger("close");
            });
        },
        
        initViewHolderList : function(){
            
            
            var column = this.opts.columnNums;
            var row = this.opts.rowNums;
             
            var viewWidth = this.opts.columnNums * this.opts.cardWidth;
            var initLeft = (this.el.width() - viewWidth) / 2;
            var initTop = 60;
            
            
            for(var i=0; i < row; i++){
                for(var j=0; j < column; j++){
                    this.viewHolderList.push({
                        left: initLeft + j * this.opts.cardWidth,
                        top: initTop + i * this.opts.cardHeight
                    });
                }
            }
        },
        
        initPlaceHolder: function(){
            var width = $(window).width();
            var height = $(window).height();
            var edgeWidth = width + this.opts.cardWidth * 2;
            var edgeHeight = height + this.opts.cardHeight * 2;
            
            this.placeHolders = [];
            
            var topHolder = [];
            var bottomHolder = [];
            var leftHolder = [];
            var rightHolder = [];
            
            var hnums = Math.floor(edgeWidth / this.opts.cardWidth);
            var vnums = Math.floor(height / this.opts.cardHeight);
            
            var hnums = 10;
            var vnums = 8;
            
            var itemWidth = edgeWidth / hnums;
            var itemHeight = edgeHeight / vnums;
            
            
            for(var i=0; i < hnums; i++){
                var left = i * itemWidth;
                
                topHolder.push({
                    left: left,
                    top: - this.opts.cardHeight
                });
                
                bottomHolder.push({
                    left: left,
                    top: height
                });
            }
            
            
            for(var j=0; j < vnums; j++){
                leftHolder.push({
                    left: -this.opts.cardWidth,
                    top: itemHeight * j
                });
                rightHolder.push({
                    left: width,
                    top: itemHeight * j
                });
            }
            
            this.placeHolders = this.placeHolders.concat(topHolder).concat(bottomHolder).concat(leftHolder).concat(rightHolder);
        },
        destroy:function(){
            this.el.remove();
        },
        addContent: function(){
            var viewList = [];
            var list = userlist.concat([]);
            
            this.placeHolders.forEach(function(holder){
                
                var people = list.shift();
                
                if(!people){
                    return;
                }
                
                var $item = this.createItem(people);
                $item.css({
                    left: holder.left,
                    top: holder.top
                });
                
                viewList.push($item);
            }.bind(this));
            
            
            setTimeout(function(){
                viewList.forEach(function(view){
                    var pos = this.viewHolderList.shift();
                    view.addClass("ani");
                    view.css({
                        left: pos.left,
                        top: pos.top
                    });
                    
                }.bind(this));
            }.bind(this), 100);
        },
        
        createItem: function(people){
            var tpl = this.getTpl("tpl-egg-contact-item");
            var $item = $(_.template(tpl, people));
            
            this.el.append($item);
            
            var gap = this.opts.cardWidth - $item.width();
            
            
            if(gap > 0){
                $item.css("marginLeft", gap/2);
            }
            
            return $item;
        }
    });
    
    return View;
});