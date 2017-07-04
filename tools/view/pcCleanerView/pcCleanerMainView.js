/**
 * @author liujintao
 * @descript PC清理大师主视图
 * @since 2014-09-12
 */
define("PcCleaner", function(require, exports, module) {
    var app = require("app");
    var $ = require("jquery");
    var _ = require("underscore");
    var gridModel = require("gridModel");
    var apiNames = require('APINames');
    var utils = require("utils");
    var PcCleanerModel = require("pcCleanerModel");

    var ProgressWindow = require("ProgressPanel");

    /*国际化字典工具*/
    var i18nDi = require('I18NDI');
    /*弹窗*/
    var UIDialog = require('UIDialog');
    /*进度处理框*/
    var ProcessWindow = require("ProgressPanel");
    /*下拉菜单组件*/
    var UIMenu = require("UIMenu");
    var connection = require('connectionMgr');

    var PcCleanerMainView = app.ViewBase.extend({
        module : module,
        events : {
            "click -> .cleaner-wraper .cleanBtn" : 'onClickClean',
            "click -> .cleaner-wraper .close" : 'closeWin',
            "click -> .info-item input" : 'onClickChoose',
            "click -> .title input" : 'onClickSelected'
        },
        init : function(opts) {
            var me = this;
            this.win = opts.win;
            this.el = this.win.getContent();
            this.el.addClass("cleaner-box");
            this.collection = new PcCleanerModel.Collection();
            
            var cleanTime = new Date().valueOf();
            /*获取大类别列表*/
            var categoryList = this.collection.getCategoryList();
            this.categoryArr = [];
            $.each(categoryList,function(index,item){
            	me.categoryArr.push(item);
            });
            connection.getDeviceInfo(function(){
                utils.setLogPublicFeild(true, connection.deviceInfo);
            })
            utils.setLogPublicFeild();
            app.dal.request({
	            action: apiNames.REQ_CLEAN_WINDOW,
	            paras: {},
	            callback: function(res){
	            
	            }
	        });
	        //document.oncontextmenu = function(){return false};
	        /*窗口接受到消息  */
            this.win.on("message", function(data) {
                if (data.info.todo == "restore") {
                    app.dal.request({
                        action : apiNames.REQ_RESTORE //置前
                    });
                } else if (data.info.todo == "close") {
                    me.win.close();
                }
            });
            /*接收到关闭消息  停止扫描 停止清理*/
            this.win.on("close",function(){
            	me.collection.stopScaning();  
                me.collection.stopCleaning(); 
                var cleanTime2 = new Date().valueOf() - cleanTime;
                var logObject = {
					class: "c20008",
					page: "p20064",
					duration: cleanTime2
				} 
				utils.sendNewLog("1000102", logObject); 
            });
           	/*创建大类别*/
            this.render(this.el);
            this.el.find(".tt[data-id=1]").addClass("net");
            this.el.find(".tt[data-id=2]").addClass("trace");
            this.el.find(".tt[data-id=3]").addClass("com");
            this.el.find(".tt[data-id=4]").addClass("sys");
            this.el.find(".tt[data-id=5]").addClass("trash");
            this.el.find(".tt[data-id=6]").addClass("registry");
            
            /*进入清理窗口进行扫描*/
            var cleanText = this.el.find(".cleaner-top .text"),
            	cleanSize = this.el.find(".cleaner-top .size");
            var fileNumber =  cleanText.find(".fileNum"),
            	regNumber = cleanText.find(".regNum");
            
            var cleanBtn = this.el.find(".button");
            
            var cleanTop = this.el.find(".cleaner-top"),
            	animBox = this.el.find(".anima"),
            	animFly = this.el.find(".anima-fly");
            	
            this.collection.on("update",function(parasObj){
            	//扫描过程
                if(parasObj.type=="scan"&&parasObj.model){
                	animBox.removeClass("clean");
                	animFly.show();
	            	animFly.addClass("rotateIn");
	            	cleanBtn.attr("disabled",true);
	            	me.el.find(".title:visible").find("input").attr("disabled",true);
                    me.el.find(".less-info input").attr("disabled",true);
                     //扫描文件更新
                    var categoryHeader=me.el.find(".tt[data-id="+parasObj.model.get("category")+"]");
                    
                    var subcategory=me.el.find(".info-item[subcategory="+parasObj.model.get("subcategory")+"]");
                    var catesize = 0;
                    var catecount = 0;
                    var totalSize = 0;
                    totalSize =  me.collection.cleanCategory["browserHistory"].size
                    		 	 + me.collection.cleanCategory["usageHistory"].size
                    		 	 + me.collection.cleanCategory["localSoft"].size
                    		 	 + me.collection.cleanCategory["sysSoft"].size
                    		 	 + me.collection.cleanCategory["recycleBin"].size
                    		 	 + me.collection.cleanCategory["unuseRegistry"].size;
                    var ts = utils.convertSizeToString(totalSize).replace(/[^0-9.]/g,''),
	    				tb = utils.convertSizeToString(totalSize).replace(/[0-9.]/g,''); 
	    			cleanSize.find("b").html(ts);    
                    cleanSize.find("span").html(tb);   
                    /*分类*/            
                    if(parasObj.model.get("category") == 1){
                        catesize=me.collection.cleanCategory["browserHistory"].size;
                        catecount=me.collection.cleanCategory["browserHistory"].count;
                    }else if(parasObj.model.get("category") == 2){
                        catesize=me.collection.cleanCategory["usageHistory"].size;
                        catecount=me.collection.cleanCategory["usageHistory"].count;    	                    
                    }else if(parasObj.model.get("category") == 3){
                        catesize=me.collection.cleanCategory["localSoft"].size;
                        catecount=me.collection.cleanCategory["localSoft"].count;  	                    
                    }else if(parasObj.model.get("category") == 4){
                        catesize=me.collection.cleanCategory["sysSoft"].size;
                        catecount=me.collection.cleanCategory["sysSoft"].count;  	                    
                    }else if(parasObj.model.get("category") == 5){
                        catesize=me.collection.cleanCategory["recycleBin"].size;
                        catecount=me.collection.cleanCategory["recycleBin"].count;  	                    
                    }else if(parasObj.model.get("category") == 6){
                        catesize=me.collection.cleanCategory["unuseRegistry"].size;
                        catecount=me.collection.cleanCategory["unuseRegistry"].count;               
                    }
                    if(parasObj.model.get("type")==1 && parasObj.model.get("category")!= 6){//文件类
    							subcategory.find(".info-size").html(utils.convertSizeToString(me.collection.subcategoryMap[parasObj.model.get("subcategory")].size));
    					
    					categoryHeader.find(".size .mb").text(utils.convertSizeToString(catesize));
	                    categoryHeader.find(".size .select").text(utils.convertSizeToString(catesize));
                    }else{//注册表类
                    	subcategory.find(".info-size").html(me.collection.subcategoryMap[parasObj.model.get("subcategory")].count)
                   	 	categoryHeader.find(".size .mb").text(me.collection.cleanCategory["unuseRegistry"].count);
                   		categoryHeader.find(".size .select").text(me.collection.cleanCategory["unuseRegistry"].count);   
                    }
                    categoryHeader.find(".elastic").show();
                    categoryHeader.find(".title .size").removeClass("hide");
                    categoryHeader.find(".title .mb").removeClass("hide");
                    subcategory.show();
                    
                }else if(parasObj.type=="cleanFile"&&parasObj.model){
                	animFly.show();
	            	animFly.addClass("rotateIn");
	            	cleanBtn.attr("disabled",true);
	            	me.el.find(".title:visible").find("input").attr("disabled",true);
                    me.el.find(".less-info input").attr("disabled",true);
                    //清理文件更新
                        var categoryHeader=me.el.find(".tt[data-id="+parasObj.model.get("category")+"]");
                        var subcategory=me.el.find(".info-item[subcategory="+parasObj.model.get("subcategory")+"]");
                        var catesize=0;
                        var catecount=0;
                        //subcategory.find(".info-size").html(utils.convertSizeToString(me.collection.subcategoryMap[parasObj.model.get("subcategory")].size));
                        //
                        if(parasObj.model.get("category")==1){
                            catesize=me.collection.cleanCategory["browserHistory"].size;
                            catecount=me.collection.cleanCategory["browserHistory"].count;
                        }else if(parasObj.model.get("category")==2){
                            catesize=me.collection.cleanCategory["usageHistory"].size;
                            catecount=me.collection.cleanCategory["usageHistory"].count;                            
                        }else if(parasObj.model.get("category")==3){
                            catesize=me.collection.cleanCategory["localSoft"].size;
                            catecount=me.collection.cleanCategory["localSoft"].count;                               
                        }else if(parasObj.model.get("category")==4){
                            catesize=me.collection.cleanCategory["sysSoft"].size;
                            catecount=me.collection.cleanCategory["sysSoft"].count;                               
                        }else if(parasObj.model.get("category")==5){
                            catesize=me.collection.cleanCategory["recycleBin"].size;
                            catecount=me.collection.cleanCategory["recycleBin"].count;                               
                        }else if(parasObj.model.get("category")==6){
                            catesize=me.collection.cleanCategory["unuseRegistry"].size;
                            catecount=me.collection.cleanCategory["unuseRegistry"].count;                                
                        }
                        categoryHeader.find(".size .mb").text(utils.convertSizeToString(catesize));
                        
	                    var totalSize =  me.collection.cleanCategory["browserHistory"].size
	                    		 	 + me.collection.cleanCategory["usageHistory"].size
	                    		 	 + me.collection.cleanCategory["localSoft"].size
	                    		 	 + me.collection.cleanCategory["sysSoft"].size
	                    		 	 + me.collection.cleanCategory["recycleBin"].size
	                    		 	 + me.collection.cleanCategory["unuseRegistry"].size;
	                    var ts = utils.convertSizeToString(totalSize).replace(/[^0-9.]/g,''),
		    				tb = utils.convertSizeToString(totalSize).replace(/[0-9.]/g,''); 
		    			cleanSize.find("b").html(ts);    
	                    cleanSize.find("span").html(tb); 
                        
                }else if(parasObj.type=="cleanReg"){
	            	animFly.addClass("rotateIn");
	            	cleanBtn.attr("disabled",true);
	            	me.el.find(".title:visible").find("input").attr("disabled",true);
                    me.el.find(".less-info input").attr("disabled",true);
                    //清理注册表更新
                    me.el.find(".registry").find(".size .mb").html(me.collection.cleanCategory["unuseRegistry"].count);
                }else if(parasObj.type=="clickChoose"){
                    /**选择扫描或者清理项
                     *step 1 遍历collection中所有model设置当前选中的subcategory下model的selected值
                     * step 2 重新计算选中的category的size和count值
                     * */
                    var catesize=0;
                    var catecount=0;
                    var curSize = 0;
                    var curCoint = 0;
                	var subcategoryId = parasObj.subcategoryId,
                		checked = parasObj.checked;
                		subcategory = me.collection.subcategoryMap[subcategoryId];
            			categoryId = subcategory.category;
                	var categoryHeader = me.el.find(".tt[data-id="+categoryId+"]");
                	//step 1 遍历collection中所有model设置当前选中的subcategory下model的selected值
                	
			        //step 2 重新计算选中的category的size和count值
			        if(checked){
				        me.collection.models.forEach(function(model){
	                		if(model.get("subcategory")==subcategoryId){
	                			me.collection.setSelected(model.getId(), true);
			                }
				        });
				        if(categoryId==1){
			        		catesize=me.collection.cleanCategory["browserHistory"].size;
	                        catecount=me.collection.cleanCategory["browserHistory"].count;
	                        me.collection.cleanCategory["browserHistory"].size = catesize+subcategory.size;
	                        me.collection.cleanCategory["browserHistory"].count = catecount+subcategory.count;
	                        catesize=me.collection.cleanCategory["browserHistory"].size;
	                    }else if(categoryId==2){
	                        catesize=me.collection.cleanCategory["usageHistory"].size;
	                        catecount=me.collection.cleanCategory["usageHistory"].count;  
	                        me.collection.cleanCategory["usageHistory"].size = catesize+subcategory.size;
	                        me.collection.cleanCategory["usageHistory"].count = catecount+subcategory.count;
	                        catesize=me.collection.cleanCategory["usageHistory"].size;                      
	                    }else if(categoryId==3){
	                        catesize=me.collection.cleanCategory["localSoft"].size;
	                        catecount=me.collection.cleanCategory["localSoft"].count;
	                        me.collection.cleanCategory["localSoft"].size = catesize+subcategory.size;
	                        me.collection.cleanCategory["localSoft"].count = catecount+subcategory.count;
	                        catesize=me.collection.cleanCategory["localSoft"].size;                                     
	                    }else if(categoryId==4){
	                        catesize=me.collection.cleanCategory["sysSoft"].size;
	                        catecount=me.collection.cleanCategory["sysSoft"].count;
	                        me.collection.cleanCategory["sysSoft"].size = catesize+subcategory.size;
	                        me.collection.cleanCategory["sysSoft"].count = catecount+subcategory.count;
	                        catesize=me.collection.cleanCategory["sysSoft"].size;                                     
	                    }else if(categoryId==5){
	                        catesize=me.collection.cleanCategory["recycleBin"].size;
	                        catecount=me.collection.cleanCategory["recycleBin"].count;  
	                        me.collection.cleanCategory["recycleBin"].size = catesize+subcategory.size;
	                        me.collection.cleanCategory["recycleBin"].count = catecount+subcategory.count;
	                        catesize=me.collection.cleanCategory["recycleBin"].size;                             
	                    }else if(categoryId==6){
	                        catesize=me.collection.cleanCategory["unuseRegistry"].size;
	                        catecount=me.collection.cleanCategory["unuseRegistry"].count;   
	                        me.collection.cleanCategory["unuseRegistry"].count = catecount+subcategory.count;
	                        catecount=me.collection.cleanCategory["unuseRegistry"].count;                                  
	                    }
			        }else{
			        	me.collection.models.forEach(function(model){
	                		if(model.get("subcategory")==subcategoryId){
	                			me.collection.setSelected(model.getId(), false);
			                }
				        });
			        	if(categoryId==1){
			        		catesize=me.collection.cleanCategory["browserHistory"].size;
			        		catecount=me.collection.cleanCategory["browserHistory"].count;
	                        me.collection.cleanCategory["browserHistory"].size = catesize-subcategory.size;
	                        me.collection.cleanCategory["browserHistory"].count = catecount-subcategory.count;
	                        catesize=me.collection.cleanCategory["browserHistory"].size;
	                    }else if(categoryId==2){
	                        catesize=me.collection.cleanCategory["usageHistory"].size;
	                        catecount=me.collection.cleanCategory["usageHistory"].count;  
	                        me.collection.cleanCategory["usageHistory"].size = catesize-subcategory.size;
	                        me.collection.cleanCategory["usageHistory"].count = catecount-subcategory.count;
	                        catesize=me.collection.cleanCategory["usageHistory"].size;                      
	                    }else if(categoryId==3){
	                        catesize=me.collection.cleanCategory["localSoft"].size;
	                        catecount=me.collection.cleanCategory["localSoft"].count;
	                        me.collection.cleanCategory["localSoft"].size = catesize-subcategory.size;
	                        me.collection.cleanCategory["localSoft"].count = catecount-subcategory.count;
	                        catesize=me.collection.cleanCategory["localSoft"].size;                                     
	                    }else if(categoryId==4){
	                        catesize=me.collection.cleanCategory["sysSoft"].size;
	                        catecount=me.collection.cleanCategory["sysSoft"].count;
	                        me.collection.cleanCategory["sysSoft"].size = catesize-subcategory.size;
	                        me.collection.cleanCategory["sysSoft"].count = catecount-subcategory.count;
	                        catesize=me.collection.cleanCategory["sysSoft"].size;                                     
	                    }else if(categoryId==5){
	                        catesize=me.collection.cleanCategory["recycleBin"].size;
	                        catecount=me.collection.cleanCategory["recycleBin"].count;  
	                        me.collection.cleanCategory["recycleBin"].size = catesize-subcategory.size;
	                        me.collection.cleanCategory["recycleBin"].count = catecount-subcategory.count;
	                        catesize=me.collection.cleanCategory["recycleBin"].size;                             
	                    }else if(categoryId==6){
	                        catesize=me.collection.cleanCategory["unuseRegistry"].size;
	                        catecount=me.collection.cleanCategory["unuseRegistry"].count; 
	                        me.collection.cleanCategory["unuseRegistry"].count = catecount-subcategory.count;
	                        catecount=me.collection.cleanCategory["unuseRegistry"].count;                                  
	                    }
			        }
			        if(categoryId==6){
                    	categoryHeader.find(".select").html(catecount);
                    }else{
                    	categoryHeader.find(".select").html(utils.convertSizeToString(catesize));
                    }
                    var totalSize = 0;
                    var totalFile = 0;
                    totalSize =  me.collection.cleanCategory["browserHistory"].size
                    		 	 + me.collection.cleanCategory["usageHistory"].size
                    		 	 + me.collection.cleanCategory["localSoft"].size
                    		 	 + me.collection.cleanCategory["sysSoft"].size
                    		 	 + me.collection.cleanCategory["recycleBin"].size
                    		 	 + me.collection.cleanCategory["unuseRegistry"].size;
                    var ts = utils.convertSizeToString(totalSize).replace(/[^0-9.]/g,''),
	    				tb = utils.convertSizeToString(totalSize).replace(/[0-9.]/g,''); 
	    			cleanSize.find("b").html(ts);    
                    cleanSize.find("span").html(tb); 
                    totalFile = me.collection.cleanCategory["browserHistory"].count
            		 	 + me.collection.cleanCategory["usageHistory"].count
            		 	 + me.collection.cleanCategory["localSoft"].count
            		 	 + me.collection.cleanCategory["sysSoft"].count
            		 	 + me.collection.cleanCategory["recycleBin"].count;
            		
		            me.el.find(".fileNum").html(totalFile);
		            me.el.find(".regNum").html(me.collection.cleanCategory["unuseRegistry"].count);  
		            if(totalFile == 0 && me.collection.cleanCategory["unuseRegistry"].count == 0){
		            	me.el.find(".button").attr("disabled",true);
		            }else{
		            	me.el.find(".button").attr("disabled",false);
		            }
			        
                }
            });
            this.collection.getCleanConfigList(function(res,size){
				this.configList = res;
				//划分小类，按照subcategory合并
				var subcategoryIds=Object.keys(me.collection.subcategoryMap);
				
                subcategoryIds.forEach(function(subcategoryId){
                	var subcategory=me.collection.subcategoryMap[subcategoryId];
                    var tpl = me.getTpl("tpl-infoList-view");
                    var info = $(_.template(tpl, {
                        data:subcategory,
                        I18N: i18nDi
                    }));  			         
                	if(subcategory.category == 1){
			            me.el.find(".net ul").append(info);
                	}else if(subcategory.category == 2){
                		me.el.find(".trace ul").append(info);
                	}else if(subcategory.category == 3){
                		me.el.find(".com ul").append(info);
                	}else if(subcategory.category == 4){
                		me.el.find(".sys ul").append(info);
                	}else if(subcategory.category == 5){
                		me.el.find(".trash ul").append(info);
                	}else if(subcategory.category == 6){
                		me.el.find(".registry ul").append(info);
                	}

                });
                me.onClickScan();
            });
            this.el.find(".title").click(function(e){
            	if($(this).find(".elastic").is(":visible") &&
            	   $(e.target)[0].tagName != "INPUT"){
            		$(this).find(".elastic").click();
            	}
            });
            this.el.find(".elastic").click(function(e) {
            	e.stopPropagation();
                var $info = $(this).parents(".tt").find(".info");
				if ($info.hasClass("fold")) {
                    $(this).addClass("expand");
                    $info.slideDown(300);
                    $info.removeClass("fold");
                    /*console.log($(e.target))
                    if($(e.target).parents(".tt").hasClass("registry")){
                    	setTimeout( function(){
                    		me.el.find(".info-item").last()[0].scrollIntoView();
                    	},200)
                    	setTimeout( function(){
		                	var height = me.el.find(".less-info").height(),
		                	scrHeight = me.el.find(".less-info")[0].scrollHeight;
		                	me.el.find(".less-info").animate({scrollTop:scrHeight}, 500);
		                },250)
                    	
                    }*/
                    
                } else {
                    $(this).removeClass("expand");
                    $info.slideUp(300);
                    $info.addClass("fold");
                }
               
            });
        },
        closeWin : function(){
        	this.win.close();
        },
        onClickScan : function(){
        	
        	/*扫描日志              start*/
        	var logObject = {
                class: "c20008",
                page: "p20064",
                module: "m20055",
                action: "a20105"
            }
            setTimeout(function(){
            	utils.sendNewLog("1000120", logObject);   
            },2000)  
            /*扫描日志              end*/
        	var me = this; 
        	var scanFileIds=[];
            var scanRegIds=[];
            var idArr = [];
            var cleanPro = this.el.find(".clean-progress");
            var winTop = this.el.find(".g-cleanWin-top");
            var cleanText = this.el.find(".cleaner-top .text");
            var cleanBtn = this.el.find(".button"),
           		cleanTop = this.el.find(".cleaner-top"),
                saoba = this.el.find(".anima-bg"),
                animBox = this.el.find(".anima");
                //重置集合
        	me.collection.models.forEach(function(model){
                if(model.get("display")==1){
                    if(model.get("type")==1){
                        scanFileIds.push(model.get("id"));
                    }else{
                    	scanRegIds.push(model.get("id"));
                    }
                }                
            });
            this.collection.reset();
        	me.collection.getScanCategoryList({
                type:1,
                id:scanFileIds
            },function(res) {
                if( !res.finish ){
                	if(res.info){
                		cleanText.html(res.info.filePath); 
	                	cleanItem(res);
	                	me.collection.getModelById(res.info.id);
	                	
                	}else{
                		var color,cNum;
                		var pro = res.percent;
                		if( pro>=0 && pro<=2){
                			cleanPro.find(".pg").width("2%");
                		}else{
                			cleanPro.find(".pg").width(pro+"%");
                		}
	                	if(pro >= 0 && pro <= 25 ){
		                	  color = "#68B206";
	                	}else if(pro > 25 && pro <= 50 ){
		                	  color = "#F2BB15";
	                	}else if(pro > 50 && pro <= 75 ){
		                	  color = "#E39000";
	                	}else if(pro > 75 && pro <= 100 ){
		                	  color = "#e35000";
	                	}
                		winTop.css("background",color)
                	}
                
                }else{
                	console.log("扫描文件结束",res);
                    itemHide(idArr[0]);
                    me.collection.getScanCategoryList({
                        type:0,
                        id:scanRegIds
                    },function(regRes){
                    	if(!regRes.finish){
                    		if(regRes.info){
                    			cleanItem(regRes);
                    		}else{
                    			console.log(res);
                    		}
                    	}
                    	if(regRes.finish){
                    		console.log("扫描注册表结束",regRes);
                    		winTop.css("background","#e35000")
                    		 itemHide(idArr[0]);
                    		 var regNum = me.collection.cleanCategory["unuseRegistry"].count;
                    		 var fileNum = me.collection.cleanCategory["browserHistory"].count
                    		 	 + me.collection.cleanCategory["usageHistory"].count
                    		 	 + me.collection.cleanCategory["localSoft"].count
                    		 	 + me.collection.cleanCategory["sysSoft"].count
                    		 	 + me.collection.cleanCategory["recycleBin"].count;
                    		 animBox.addClass("clean");
                    		 cleanTop.addClass("finish");
                    		 cleanBtn.attr("disabled",false);
                    		 me.el.find(".title:visible").find("input").attr("disabled",false);
                    		 me.el.find(".title:visible").find("input").prop("checked",true);
                    		 me.el.find(".less-info input").attr("disabled",false);
                    		 me.el.find(".less-info input").prop("checked",true);
                    		 me.el.find(".blue-size").removeClass("hide");
                    		 saoba.removeClass("rotateIn");
                    		 cleanText.html(i18nDi.fillDomText('tools.scanOver',"<span class='fileNum'>"+fileNum+"</span>","<span class='regNum'>"+regNum+"</span>"));
                    	}
                    });                        
                }
            });  
            
            function cleanItem(res){
            	if( me.collection.getModelById(res.info.id) != undefined){
            		var subC = me.collection.getModelById(res.info.id).get("subcategory");
	                if( subC != idArr[0]){
	               		var $this = me.el.find(".info-item[subcategory="+subC+"]");
	               		$this.parents(".tt").find(".title").addClass("scan");
	               		$this.addClass("sing");
	               		idArr.push(subC);
	               		if(idArr.length == 2){
	               			itemHide(idArr[0]);
	               		}
	                }
            	}
            };
            function itemHide(sub){
            	if(sub == undefined){
            		return;
            	}
            	var item = me.el.find(".info-item[subcategory="+sub+"]");
       				itemPar = item.parents(".info");
       			var subcategory = me.collection.subcategoryMap[sub];
            		categoryId = subcategory.category;
            	if(idArr.length == 2){
            		var precategory =  me.collection.subcategoryMap[idArr[1]],
       				precategoryId = precategory.category;
            	}
       			if( categoryId != precategoryId){
       				item.parents(".tt").find(".title").removeClass("scan");
       			}
	            idArr.splice(0,1);
       			item.removeClass("sing");
            };
        },
        /*选择某一条subcategory*/
        onClickChoose:function(event){
            var me = this; 
            var $this = $(event.target),
            	subcategory = $this.parents("li").attr("subcategory"),
                $tt = $this.parents(".info").parents(".tt");
            var titleInput = $tt.find(".title input");
            me.collection.trigger("update", {
                type : "clickChoose",
                subcategoryId:subcategory,
                checked:$this.prop("checked")
            });                		    
            if($this.prop("checked")){
            	var inputLength = $tt.find("li:visible").find("input:checked").length,
            		liLength = $tt.find("li:visible").length;
            	if( inputLength == liLength){
            		titleInput.prop("checked",true);
            	}
            }else{
              	titleInput.prop("checked",false);
            }
        },
         /**
         * 选择某一category
         * */
        onClickSelected:function(event){
        	var me=this;
            var $this = $(event.target),
            	$tt = $this.parents(".tt"),
            	catoryId = $tt.attr("data-id");
            var cleanSize = me.el.find(".cleaner-top .size");
            var fileNumber =  me.el.find(".fileNum"),
            	regNumber = me.el.find(".regNum");
            var catesize = 0,
                catecount = 0;	
            
            if($this.prop("checked")){
            	if(catoryId == 1){
            		me.collection.cleanCategory["browserHistory"].size = 0;
            		me.collection.cleanCategory["browserHistory"].count = 0;
            	}else if(catoryId == 2){
            		me.collection.cleanCategory["usageHistory"].size = 0;
            		me.collection.cleanCategory["usageHistory"].count = 0;
            	}else if(catoryId == 3){
            		me.collection.cleanCategory["localSoft"].size = 0;
            		me.collection.cleanCategory["localSoft"].count = 0;
            	}else if(catoryId == 4){
            		me.collection.cleanCategory["sysSoft"].size = 0;
            		me.collection.cleanCategory["sysSoft"].count = 0;
            	}else if(catoryId == 5){
            		me.collection.cleanCategory["recycleBin"].size = 0;
            		me.collection.cleanCategory["recycleBin"].count = 0;
            	}else if(catoryId == 6){
            		me.collection.cleanCategory["unuseRegistry"].size = 0;
            		me.collection.cleanCategory["unuseRegistry"].count = 0;
            	}
            	Object.keys(me.collection.subcategoryMap).forEach(function( subcategory){
            		if(me.collection.subcategoryMap[subcategory].category == 1 && 
            			catoryId == me.collection.subcategoryMap[subcategory].category ){
            			me.collection.cleanCategory["browserHistory"].size+=me.collection.subcategoryMap[subcategory].size;
            			
            			me.collection.cleanCategory["browserHistory"].count+=me.collection.subcategoryMap[subcategory].count;
            			catesize = me.collection.cleanCategory["browserHistory"].size;
            		}else if(me.collection.subcategoryMap[subcategory].category == 2 && 
            			catoryId == me.collection.subcategoryMap[subcategory].category ){
            			me.collection.cleanCategory["usageHistory"].size+=me.collection.subcategoryMap[subcategory].size;
            			me.collection.cleanCategory["usageHistory"].count+=me.collection.subcategoryMap[subcategory].count;
            			catesize = me.collection.cleanCategory["usageHistory"].size;
            		}else if(me.collection.subcategoryMap[subcategory].category == 3 && 
            			catoryId == me.collection.subcategoryMap[subcategory].category ){
            			me.collection.cleanCategory["localSoft"].size+=me.collection.subcategoryMap[subcategory].size;
            			me.collection.cleanCategory["localSoft"].count+=me.collection.subcategoryMap[subcategory].count;
            			catesize = me.collection.cleanCategory["localSoft"].size;
            		}else if(me.collection.subcategoryMap[subcategory].category == 4 && 
            			catoryId == me.collection.subcategoryMap[subcategory].category ){
            			me.collection.cleanCategory["sysSoft"].size+=me.collection.subcategoryMap[subcategory].size;
            			me.collection.cleanCategory["sysSoft"].count+=me.collection.subcategoryMap[subcategory].count;
            			catesize = me.collection.cleanCategory["sysSoft"].size;
            		}else if(me.collection.subcategoryMap[subcategory].category == 5 && 
            			catoryId == me.collection.subcategoryMap[subcategory].category ){
            			me.collection.cleanCategory["recycleBin"].size+=me.collection.subcategoryMap[subcategory].size;
            			me.collection.cleanCategory["recycleBin"].count+=me.collection.subcategoryMap[subcategory].count;
            			catesize = me.collection.cleanCategory["recycleBin"].size;
            		}else if(me.collection.subcategoryMap[subcategory].category == 6 && 
            			catoryId == me.collection.subcategoryMap[subcategory].category ){
            			me.collection.cleanCategory["unuseRegistry"].count+=me.collection.subcategoryMap[subcategory].count;
            			catecount = me.collection.cleanCategory["unuseRegistry"].count;
            		}
            	});
                if(catoryId==6){
                	$tt.find(".select").html(catecount);
                }else{
                	$tt.find(".select").html(utils.convertSizeToString(catesize));
                }
	            $tt.find(".info input").prop("checked",true);
	            $tt.find(".info li").each(function(){
	            	var subcategory = $(this).attr("subcategory");
	            	me.collection.models.forEach(function(model){
	            		if(model.get("subcategory") == subcategory){
	            			me.collection.setSelected(model.getId(), true);
	            		}
	            	});
                });
                
            }else{
                 $tt.find(".info input").prop("checked",false);
                 if(catoryId==6){
                 	me.collection.cleanCategory["unuseRegistry"].count = 0;
                 	$tt.find(".select").html("0");
                 }else{
                 	if(catoryId==1){
                 		me.collection.cleanCategory["browserHistory"].size = 0;
                 		me.collection.cleanCategory["browserHistory"].count = 0;
	                }else if(catoryId==2){
	                    me.collection.cleanCategory["usageHistory"].size = 0; 
	                    me.collection.cleanCategory["usageHistory"].count = 0;                         
	                }else if(catoryId==3){
	                    me.collection.cleanCategory["localSoft"].size = 0; 
	                    me.collection.cleanCategory["localSoft"].count = 0;                           
	                }else if(catoryId==4){
	                    me.collection.cleanCategory["sysSoft"].size = 0; 
	                    me.collection.cleanCategory["sysSoft"].count = 0;                           
	                }else if(catoryId==5){
	                    me.collection.cleanCategory["recycleBin"].size = 0; 
	                    me.collection.cleanCategory["recycleBin"].count = 0;                           
	                }
                 	$tt.find(".select").html("0KB");
                 }
                 $tt.find(".info li").each(function(){
	            	var subcategory = $(this).attr("subcategory");
	            	me.collection.models.forEach(function(model){
	            		if(model.get("subcategory") == subcategory){
	            			 me.collection.setSelected(model.getId(), false);
	            		}
	            	});
                });
            }
            var totalSize = 0,
            	totalFile = 0;
            totalSize =  totalSize + me.collection.cleanCategory["browserHistory"].size
            		 	 + me.collection.cleanCategory["usageHistory"].size
            		 	 + me.collection.cleanCategory["localSoft"].size
            		 	 + me.collection.cleanCategory["sysSoft"].size
            		 	 + me.collection.cleanCategory["recycleBin"].size
            		 	 + me.collection.cleanCategory["unuseRegistry"].size;
            var ts = utils.convertSizeToString(totalSize).replace(/[^0-9.]/g,''),
				tb = utils.convertSizeToString(totalSize).replace(/[0-9.]/g,''); 
			cleanSize.find("b").html(ts);    
            cleanSize.find("span").html(tb);   
            totalFile = totalFile + me.collection.cleanCategory["browserHistory"].count
            		 	 + me.collection.cleanCategory["usageHistory"].count
            		 	 + me.collection.cleanCategory["localSoft"].count
            		 	 + me.collection.cleanCategory["sysSoft"].count
            		 	 + me.collection.cleanCategory["recycleBin"].count;
            fileNumber.html(totalFile);
            regNumber.html(me.collection.cleanCategory["unuseRegistry"].count);
            if(totalFile == 0 && 
            	me.collection.cleanCategory["unuseRegistry"].count == 0&&
            	me.el.find(".button").hasClass("cleanBtn")){
            	me.el.find(".button").attr("disabled",true);
            }else{
            	me.el.find(".button").attr("disabled",false);
            }
        },
        /**
         * 点击清理
         * @step 1 循环collection找出所有要清理文件和要清理的注册表
         * @step 2 调用清理接口开始清理文件更新清理的size
         * @step 3 清理文件finish后开始清理注册表，通过回调计数
         * */
        onClickClean:function(event){
        	/*清理日志              start*/
        	var logObject = {
                class: "c20008",
                page: "p20064",
                module: "m20055",
                action: "a20106"
            }
            utils.sendNewLog("1000120", logObject);    
            /*清理日志              end*/
        	var ids=Object.keys(this.collection.getSelectedMap());
            var me=this;
            var cleanFileNum = me.collection.cleanCategory["browserHistory"].count
            		 	 + me.collection.cleanCategory["usageHistory"].count
            		 	 + me.collection.cleanCategory["localSoft"].count
            		 	 + me.collection.cleanCategory["sysSoft"].count
            		 	 + me.collection.cleanCategory["recycleBin"].count;
            	cleanRegNum = me.collection.cleanCategory["unuseRegistry"].count;
            var animFly = this.el.find(".anima-fly"),
            	animd = this.el.find(".anima-d"),
            	animBox = this.el.find(".anima"),
            	cleanWin = this.el.find(".g-cleanWin-top"),
            	cleanTop = this.el.find(".cleaner-top"),
            	cleanPro = this.el.find(".clean-progress"),
            	cleanBtn = this.el.find(".button"),
            	cleanText = this.el.find(".cleaner-top .text");
            var winTop = this.el.find(".g-cleanWin-top");
            var files=[];
            var regs=[];
            var idArr = [];
            var totalSize=0;
            ids.forEach(function(id){
                var model=me.collection.getModelById(id);
                if((model.get("type")==1)&& model.get("display")==1&&model.isSelected()){
                        files.push(model.get("id"));
                }else if(model.get("type")==0&&model.get("display")==1&&model.isSelected()){
                        regs.push(model.get("id"));
                }
            });
            console.log("选中files：",files);
            console.log("选中regs：",regs);
            var regNum = 0;
    		var fileNum = 0;
    		
    		if(files.length>0){
            	cleanIng();
            	this.collection.startCleaning({type:1,files:files},function(fileRes){
            		fileNum+=1;
            		
            		if(!fileRes.finish){
            		   cleanText.html(fileRes.info.path);
            		   cleanItem(fileRes);
            		   if(fileRes.percent >= 0 && fileRes.percent <= 20 ){
            		   		 color = "#e35000";  
	                	}else if(fileRes.percent > 20 && fileRes.percent <= 40 ){
	                		 color = "#E39000";
	                	}else if(fileRes.percent > 40 && fileRes.percent <= 50 ){
		                	 color = "#F2BB15";
	                	}else if(fileRes.percent > 50 && fileRes.percent <= 70 ){
	                		color = "#68B206";
	                	}else if(fileRes.percent > 70 && fileRes.percent <= 100 ){
	                		color = "#0096E3";
	                	}
	                	
	                	if( fileRes.percent >= 95){
	                		fileRes.percent = 95;
	                		color = "#0096E3";
	                	}
	                	winTop.css("background",color);
            		   	cleanPro.find(".pg").width(fileRes.percent+"%");
	                	
            		}
            		if( files.length == 1 && fileRes.finish && regs.length == 0){
            			var subC = me.collection.getModelById(files[0]).get("subcategory");
            			var $this = me.el.find(".info-item[subcategory="+subC+"]");
            			$this.parents(".tt").find(".size").hide();
            			$this.parents(".tt").find(".title").removeClass("clean");
	       				$this.parents(".tt").find(".fin").addClass("show");
	       				cleanFinish();	
            		}
            		
            		if((fileRes.finish )){
	               	   cleanRegs(regs);
	               	   itemHide(idArr[0]);
	               	   cleanPro.find(".pg").width("95%");
                   }
               });                  
            }else if(regs.length>0){
	        	cleanIng();
	        	cleanRegs(regs);                
            }
            function cleanIng(){
            	animFly.show();
            	animd.hide();
	        	animFly.addClass("rotateIn");
	        	cleanWin.addClass("clean");
            	cleanTop.removeClass("finish");
	        	cleanPro.show();
	        	cleanBtn.attr("disabled",true);
            };
            function cleanItem(res){
            	if(res.info){
            		var subC = me.collection.getModelById(res.info.id).get("subcategory");
            	}else{
            		var subC = me.collection.getModelById(res).get("subcategory");;
            	}
            	
                if( subC != idArr[0]){
               		var $this = me.el.find(".info-item[subcategory="+subC+"]");
               		$this.addClass("cing");
                    $this.parents(".tt").find(".title").addClass("clean");
               		idArr.push(subC);
               		if(idArr.length == 2){
               			itemHide(idArr[0]);
               		}
               		/*if(idArr.length == 1){
	       				$this.parents(".tt").find(".title").removeClass("clean");
	       				$this.parents(".tt").find(".fin").addClass("show");
	       			}*/
                }
            };
            function itemHide(sub){
            	if(sub == undefined){
            		return;
            	}
            	var item = me.el.find(".info-item[subcategory="+sub+"]");
       				itemPar = item.parents(".info");
       				item.hide();
       			var cate1 =  me.collection.subcategoryMap[idArr[0]].category,
       				cate2;
       			
       			if(idArr.length == 2){
       				cate2 =  me.collection.subcategoryMap[idArr[1]].category;
       			}
       			if(cate1 != cate2){
       				item.parents(".tt").find(".title").removeClass("clean");
       				item.parents(".tt").find(".fin").addClass("show");
       				itemPar.hide();
       				itemPar.parents(".tt").find(".elastic").removeClass("expand");
       				itemPar.parents(".tt").find(".elastic").hide();
       				itemPar.parents(".tt").find(".size").addClass("hide");
       				itemPar.parents(".tt").find(".title input").prop("checked",false);
       			}
       			item.removeClass("cing");
       			/*if(itemPar.find("li:visible").length == 0){
       				itemPar.hide();
       				itemPar.parents(".tt").find(".elastic").removeClass("expand");
       				itemPar.parents(".tt").find(".elastic").hide();
       				itemPar.parents(".tt").find(".size").addClass("hide");
       				itemPar.parents(".tt").find(".title input").prop("checked",false);
       			}*/
       			idArr.splice(0,1);
            };
            function cleanRegs(regs){
            	if(regs.length>0){
    		   		me.collection.startCleaning({type:0,regs:regs},function(regRes){
    		   			regNum += 1;
                    	if(!regRes.finish){
                    		cleanItem(regRes);
                    	}
                    	if(regRes.finish){
                    		itemHide(idArr[0]);
		           			cleanFinish();	
                    	}
                   });
    		   }else{
                   	cleanFinish();	
    		   }
            };
            function cleanFinish(){
            	cleanPro.hide();
            	animFly.hide();
            	cleanPro.find(".pg").width("100");
            	winTop.css("background","#0096E3");
            	cleanBtn.removeClass("cleanBtn").addClass("close");
           		cleanBtn.removeClass("cleanBtn").attr("disabled",false);
           		cleanBtn.html(i18nDi.fillDomText('common.okLabel'));
           		cleanText.html(i18nDi.fillDomText('tools.cleanOver',cleanFileNum,cleanRegNum));
           		cleanTop.addClass("clean-finish");
           		me.el.find(".cleaner-top .size").html(i18nDi.fillDomText('tools.cleanFinish'));
           		me.el.find(".title:visible").find("input").attr("disabled",false);
    		    me.el.find(".less-info input").attr("disabled",false);
    		    me.el.find(".info-item").find("img").hide();
    		    me.el.find(".info-item").find("input").show();
        		me.el.find(".tt").each(function(){
    				$(this).find(".info").hide();
       				$(this).find(".elastic").removeClass("expand");
       				$(this).find(".elastic").hide();
       				$(this).find(".size").addClass("hide");
       				$(this).find(".title input").attr("disabled",true);
       				$(this).find(".title input").prop("checked",false);
       				//$(this).find(".fin").addClass("show");
        		});
            };
        },
        render : function(target) {
            var tpl = this.getTpl("tpl-pcCleaner-main-view");
            this.win.setContent(_.template(tpl, {
                I18N : i18nDi,
                category:this.categoryArr
            }));
            
            this.win.setHeader(i18nDi.fillDomText('tools.pcCleanerLabel'));
        },
        onRefresh : function() {
        }
    });
    exports.PcCleanerMainView = PcCleanerMainView;
});
