/**
 * @author yangtian
 * @since 2014-03-17
 */
define("DeviceInfoView", function(require, exports, module) {
    var app = require("app");
    var $ = require("jquery");
    var _ = require("underscore");
    var connection = require('connectionMgr');
    var utils = require('utils');
    var i18nDi  = require('I18NDI');
    var apiNames = require('APINames');

    var deviceInfoMainView = app.ViewBase.extend({
        module : module,
        init : function(opts) {
            this.win = opts.win;
        },
        render : function(target) {
        	var that = this;
        	
        	app.dal.request({
                action: apiNames.REQ_DEVICE_INFO,
                paras : {},
                callback :function(res){
                    if(res.status == -1){
                        return;
                    }
	        		var info = res.info;
		        	var sAvaliableMemory = parseInt(info.sAvaliableMemory/1024);
		        	var sTotalMemory = parseInt(info.sTotalMemory/1024);
		        	var sSDAvaliableMemory = parseInt(info.sSDAvaliableMemory/1024);
		        	var sSDTotalMemory = parseInt(info.sSDTotalMemory/1024);
		        	var sPhoneCPUFrequency = info.sPhoneCPUFrequency/1000;
		        	var sPhoneRam = parseInt(info.sPhoneRam/1024);
		        	var isPhoneRooted;
		        	if( info.sSDAvaliableMemory == 0){
		        		sSDAvaliableMemory = parseInt(info.sExternSDAvaliableMemory/1024);
		        	}
		        	if( info.sSDTotalMemory == 0){
		        		sSDTotalMemory = parseInt(info.sExternSDTotalMemory/1024);
		        	}
		        	if( info.isPhoneRooted ){
		        		isPhoneRooted = "Yes";
		        	}else {
		        		isPhoneRooted = "No";
		        	}
		            var tpl = _.template(that.getTpl('tpl-device-info'), {
		            	I18N: i18nDi,
		            	infoData:info,
			            sAvaliableMemory: sAvaliableMemory,
			            sTotalMemory: sTotalMemory,
			            sSDAvaliableMemory: sSDAvaliableMemory,
			            sSDTotalMemory: sSDTotalMemory,
			            sPhoneCPUFrequency: sPhoneCPUFrequency,
			            sPhoneRam: sPhoneRam,
			            isPhoneRooted: isPhoneRooted
		            });
		            that.win.setContent(tpl);
		            
		            var me = that.win;
		            if( info.sSDTotalMemory == 0 && info.sExternSDTotalMemory == 0){
		            	me.el.find(".sdCard").hide();
		            }
		            var copyTip = me.el.find('.copy-tip');
		            copyTip.css({
		            	top:"50%",
		            	left:"50%",
		            	marginLeft:-copyTip.width()/2,
		            	marginTop:-copyTip.height()/2 - 15
		            })
		            me.el.find(".copy").click( function(){
		            	var phoneIMEI = me.el.find(".phoneIMEI").text();
		            	copyTip.fadeIn(200,function(){
		            		setTimeout( function(){
		            			copyTip.fadeOut(200);
		            		},1000);
		            	});
		            	
		            	utils.copyToClipboard(phoneIMEI);           
		            });
		            me.on("message",function(data){
			           if(data.info.todo=="close"){
			                me.close();
			           }
			        });
			        utils.tooltip.attach(me.el.find(".cpu"));
			        utils.tooltip.attach(me.el.find(".ver"));
			        utils.tooltip.attach(me.el.find(".kernelVer"));
				}       
			});
        }
    });
	exports.deviceInfoMainView = deviceInfoMainView;
});
