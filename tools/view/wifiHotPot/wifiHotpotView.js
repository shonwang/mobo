/**
 * @author liujintao
 * @since 2014-11-03
 */
define("WifiHotpotView", function(require, exports, module) {
    var app = require("app");
    var $ = require("jquery");
    /*国际化字典工具*/
    var i18nDi = require('I18NDI');

    var _ = require("underscore");
    var WifiModel = require("WifiHotPotMode");
    var SmartTip = require("UISmartTip");
    var apiNames = require('APINames');
    
    var wifiStateMap = WifiModel.stateMap;
    var HotpotMainView = app.ViewBase.extend({
        module : module,
        init : function(opts) {
            this.win = opts.win;
            var me = this;
            this.collection = new WifiModel.Collection();
            this.whiteListTpl = this.getTpl("tpl-whiteList-view");
            this.blackListTpl = this.getTpl("tpl-blackList-view");

            this.render();
            this.win.on("close", function() {
                me.collection.stopWIfiHotpot();
            });
            this.win.on("message",function(data){
                console.log(data);
                if(data.info.todo=="show"){
                    me.win.setVisible(true);
                }else if(data.info.todo=="restore"){
                    app.dal.request({
                        action : apiNames.REQ_RESTORE
                    });
                }
            });
            this.collection.bindingStateChange(function(res) {
                console.log("wifi状态发生改变=====================" + JSON.stringify(res));
                if (res.wifiHotSpotStatus == wifiStateMap.CONNECT_FOUND || res.wifiHotSpotStatus == wifiStateMap.CONNECT_LOSS || res.wifiHotSpotStatus == wifiStateMap.REMOVE_BLACKLIST_SUCCESS||res.wifiHotSpotStatus==wifiStateMap.RENAME_DEVICE_SUCCESS) {
                    me.updateConnectList();
                } else {
                    me.switchPage(res.wifiHotSpotStatus);
                }
            });
            var trayObj={
                menuType:6329,
                trayTip:"Mobogenie Wi-Fi",
                menuList:[{
                    menuId:1,
                    text:"close"
                }]
            };
            this.setTray(trayObj);
            this.win.el.undelegate(".g-window-header-x.ico-close","click").delegate(".g-window-header-x.ico-close","click",function(){
                me.win.setVisible(false);
            });
            this.win.on("tray_menu_select",function(item){
                console.log("选择的菜单",item);
                if(item.menuType==6329&&item.menuId==1){
                    me.win.close();
                }
            });
        },
        render : function() {
            var _this = this;
            var tpl = this.getTpl("tpl-wifihotpot-main-view");
            var dom = _.template(tpl, {
                I18N : i18nDi
            });
            this.win.setContent(dom);

            this.startPage = this.win.el.find(".wifipot-not-start");
            this.successPage = this.win.el.find(".wifipot-starting-now");
            this.connectListPage = this.win.el.find(".wifihot-connected-box");
            this.tip = this.win.el.find(".tipCtn");
            this.startPage.delegate(".btn-have-wifi", "click", $.proxy(this.onCreateClick, this));

            this.connectListPage.undelegate(".btn-setblack").delegate(".btn-setblack", "click", $.proxy(this.onSetBlackClick, this));
            this.connectListPage.undelegate(".btn-setlimit").delegate(".btn-setlimit", "click", $.proxy(this.onSetLimitClick, this));
            this.connectListPage.undelegate(".btn-remove-black").delegate(".btn-remove-black", "click", $.proxy(this.onRemoveBlackClick, this));
            this.connectListPage.undelegate(".whiteList-item-li input[name=deviceName][readonly=true]","click").delegate(".whiteList-item-li p[name=deviceName]", "click", $.proxy(this.onRenameDeviceClick, this));
            this.connectListPage.undelegate(".whiteList-item-li input[name=deviceName]","blur").delegate(".whiteList-item-li input[name=deviceName]", "blur", $.proxy(this.onRenameDeviceBlur, this));

            this.connectListPage.delegate(".expand-or-close", "click", $.proxy(this.onExpandOrCloseListClick, this));

            this.connectListPage.delegate(".btn-back-to-info", "click", function(event) {
                _this.switchPage(wifiStateMap.CREATE_SUCCESS);
            });

            this.successPage.delegate("p.name", "click", $.proxy(this.onWifiNameClick, this));
            this.successPage.delegate("p.password", "click", $.proxy(this.onPasswordClick, this));
            this.successPage.delegate("input[name=name]", "blur", $.proxy(this.onModifyWifiInfoClick, this));
            this.successPage.delegate("input[name=password]", "blur", $.proxy(this.onModifyWifiInfoClick, this));

            this.successPage.delegate(".btn-close", "click", $.proxy(this.onCloseWifiClick, this));
            this.successPage.delegate(".btn-go-list", "click", function(event) {
                _this.switchPage(wifiStateMap.CONNECT_FOUND);
            });
           // this.doAnimation();
            _this.collection.getWifiHotpotInfo(function(res) {
                _this.collection.ssid = res.ssid;
                _this.collection.pswd = res.pswd;
                _this.collection.createHotpot({
                    ssid : _this.collection.ssid,
                    pswd : _this.collection.pswd
                }, function(result) {
                });
                     _this.successPage.find("p.name").html(_this.collection.ssid);
                    _this.successPage.find("p.password").html(_this.collection.pswd);
                    _this.successPage.find("input[name=name]").val(_this.collection.ssid);
                    _this.successPage.find("input[name=password]").val(_this.collection.pswd);
            });       
                
        },
        setTray:function(trayInfo){
            this.win.setTray(trayInfo);
            app.dal.request({
                action:apiNames.REQ_CREATE_WIFIHOTPOT_TRAY
            }); 
        },
        switchPage : function(wifiState) {
            var _this = this;
            _this.stopAnimation();
            switch (wifiState) {
                case wifiStateMap.CREATING:
                    _this.startPage.removeClass("hide").siblings(".wifi-page").addClass("hide");
                    _this.startPage.find(".creating").show();
                    _this.startPage.find(".create-failed").hide();
                    console.log("连接中................");
                    //_this.doAnimation();
                    break;
                case wifiStateMap.CREATE_SUCCESS:
                    _this.successPage.removeClass("hide").siblings(".wifi-page").addClass("hide");
                    console.log("连接成功.....");
                    break;
                case wifiStateMap.CREATE_FAILED:
                    _this.startPage.removeClass("hide").siblings(".wifi-page").addClass("hide");
                    _this.startPage.find(".creating").hide();
                    _this.startPage.find(".create-failed").show();
                    console.log("连接失败....");
                    break;
                case wifiStateMap.NO_WIRELESS_ADAPTER:
                    _this.startPage.removeClass("hide").siblings(".wifi-page").addClass("hide");
                    _this.startPage.find(".creating").hide();
                    _this.startPage.find(".create-failed").show();
                    console.log("没有无线网卡");
                    break;
                case wifiStateMap.CONNECT_FOUND:
                    _this.connectListPage.removeClass("hide").siblings(".wifi-page").addClass("hide");
                    _this.updateConnectList();
                    console.log("发现新连接设备");
                    break;
                case wifiStateMap.CONNECT_LOSS:
                    _this.connectListPage.removeClass("hide").siblings(".wifi-page").addClass("hide");
                    console.log("有设备断开连接");
                    break;
                 case wifiStateMap.RESTART_FAILED://重启失败
                     _this.startPage.removeClass("hide").siblings(".wifi-page").addClass("hide");
                    console.log("重启wifi失败");
                    break;
                  case  wifiStateMap.INIT_FAILED:
                        _this.startPage.removeClass("hide").siblings(".wifi-page").addClass("hide");
                        console.log("初始化wifi失败");
                        break;
                  case  wifiStateMap.INIT_FAILED_ACCESS:
                        _this.startPage.removeClass("hide").siblings(".wifi-page").addClass("hide");
                        console.log("初始化wifi失败，权限不足");
                        break;  
                  case  wifiStateMap.INIT_GET_NETWORK_FAILED:
                        _this.startPage.removeClass("hide").siblings(".wifi-page").addClass("hide");
                        console.log("初始化wifi失败，获取网卡失败");
                        break;
                  case  wifiStateMap.CREATE_FAILED_INVALID_PARAM:
                        _this.startPage.removeClass("hide").siblings(".wifi-page").addClass("hide");
                        console.log("创建wifi失败，无效参数");
                        break;     
                  case  wifiStateMap.CREATE_FAILED_WHEN_SHARE:
                        _this.startPage.removeClass("hide").siblings(".wifi-page").addClass("hide");
                        console.log("创建wifi失败，无法共享网络");
                        break;                                                                                                                                               
            }
        },
        updateConnectList : function() {
            var _this = this;

            this.collection.getWifiHotpotInfo(function(res) {
                //dom更新前先将事件解除
                _this.connectListPage.undelegate(".btn-setblack", "click", $.proxy(_this.onSetBlackClick, _this));
                _this.connectListPage.undelegate(".btn-setlimit", "click", $.proxy(_this.onSetLimitClick, _this));
                _this.connectListPage.undelegate(".btn-remove-black", "click", $.proxy(_this.onRemoveBlackClick, _this));
                _this.connectListPage.undelegate(".input[name=deviceName][readonly=true]", "click", $.proxy(_this.onRenameDeviceClick, _this));
                _this.connectListPage.undelegate(".input[name=deviceName]", "blur", $.proxy(_this.onRenameDeviceBlur, _this));
                
                _this.collection.ssid = res.ssid;
                _this.collection.pswd = res.pswd;
                _this.successPage.find("p.name").html(res.ssid);
                _this.successPage.find("p.password").html(res.pswd);
                _this.successPage.find("input[name=name]").val(res.ssid);
                _this.successPage.find("input[name=password]").val(res.pswd);

                var connectList = (res.info && res.info.connectList) || [];
                var blackList = (res.info && res.info.blackList) || [];
                var whiteListDom = _.template(_this.whiteListTpl, {
                    data : connectList,
                    I18N : i18nDi
                });
                _this.connectListPage.find(".connect-list-ul").html(whiteListDom);
                if (connectList.length > 0) {
                    _this.connectListPage.find(".wifihot-connected").addClass("open");
                    _this.connectListPage.find(".wifihot-black").removeClass("open");
                } else {
                    _this.connectListPage.find(".wifihot-connected").removeClass("open");
                }
                blackList&&blackList.forEach(function(blackItem){
                    var orignDate=new Date(Number(blackItem.joinBlackTime)*1000);
                    blackItem.updateTime=orignDate.getDate()+"/"+(orignDate.getMonth()+1)+"/"+orignDate.getFullYear()
                });
                var blackListDom = _.template(_this.blackListTpl, {
                    data : blackList,
                    I18N : i18nDi
                });
                _this.connectListPage.find(".black-list-ul").html(blackListDom);
                _this.successPage.find(".success-connected-static").html(i18nDi.fillDomText('tools.devicesConnectedTitle', connectList.length));
                _this.connectListPage.find(".wifihot-connected .title-label").html(i18nDi.fillDomText('tools.deviceConnectingList', "(" + connectList.length + ")"));
                _this.connectListPage.find(".wifihot-black .title-label").html(i18nDi.fillDomText('tools.deviceBlackList2', "(" + blackList.length + ")"));
                _this.connectListPage.delegate(".btn-setblack", "click", $.proxy(_this.onSetBlackClick, _this));
                _this.connectListPage.delegate(".btn-setlimit", "click", $.proxy(_this.onSetLimitClick, _this));
                _this.connectListPage.delegate(".btn-remove-black", "click", $.proxy(_this.onRemoveBlackClick, _this));

            _this.connectListPage.undelegate(".whiteList-item-li input[name=deviceName][readonly=true]","click").delegate(".whiteList-item-li p[name=deviceName]", "click", $.proxy(_this.onRenameDeviceClick, _this));
            _this.connectListPage.undelegate(".whiteList-item-li input[name=deviceName]","blur").delegate(".whiteList-item-li input[name=deviceName]", "blur", $.proxy(_this.onRenameDeviceBlur, _this));                
            });

        },
        doAnimation : function() {
            this.startPage.find("#starting-animation").addClass("starting-animation");
        },
        stopAnimation:function(){
          this.startPage.find("#starting-animation").removeClass("starting-animation");  
        },
        onRenameDeviceClick:function(event){
            var _target=$(event.target).is(".whiteList-item-li")?$(event.target):$(event.target).parents(".whiteList-item-li");
            _target.find(".wifi-deviceName-editor").show();
            _target.find("p[name=deviceName]").hide();
            _target.find("input[name=deviceName]").focus();
        },
        onRenameDeviceBlur:function(event){
            var me = this;
            var _target=$(event.target).is(".whiteList-item-li")?$(event.target):$(event.target).parents(".whiteList-item-li");
            
            var deviceName=_target.find("input[name=deviceName]").val();
            if(_target.find("input[name=deviceName]").val().length>12||_target.find("input[name=deviceName]").val().length<1){
                 _target.find("input[name=deviceName]").addClass("err-input"); 
                 return;                 
            }else{
                  _target.find("input[name=deviceName]").removeClass("err-input");  
            }
            
            _target.find(".wifi-deviceName-editor").hide();
            _target.find("p[name=deviceName]").show();
            var mac = _target.attr("mac");

            me.collection.updateDeviceInfo({mac:mac,deviceName:deviceName},function(res){
                me.updateConnectList();
            });
        },
        onExpandOrCloseListClick : function(event) {
            var targetCtn = $(event.target).parents(".list-ctn-div");
            targetCtn.toggleClass("open");
            if (targetCtn.hasClass("open")) {
                targetCtn.siblings(".list-ctn-div").removeClass("open");
            }
            event.stopPropagation();
        },
        onWifiNameClick : function(event) {
            $(event.target).hide();
            this.successPage.find(".wifi-name-editor").show();
        },
        onPasswordClick : function(event) {
            $(event.target).hide();
            this.successPage.find(".wifi-password-editor").show();
        },

        onSetBlackClick : function(event) {
            var me = this;
            var _target = $(event.target).parents(".whiteList-item-li");
            var mac = _target.attr("mac");
            this.collection.addBlackList({
                mac : mac
            }, function(res) {
                console.log("设置黑名单结果", res);
                me.tip.html(i18nDi.fillDomText("tools.setBlackValidateNextTime"));
                me.tip.fadeIn(500);
                /*
                me.tip.css({
                    left:me.tip.width()
                });*/
                setTimeout(function(){
                    me.tip.fadeOut(400);                    
                },3000);
                me.updateConnectList();
            });
            event.stopPropagation();
        },
        onSetLimitClick : function(event) {
            console.log("限速");
        },
        onRemoveBlackClick : function(event) {
            var me = this;
            var _target = $(event.target).parents(".blackList-item-li");
            var mac = _target.attr("mac");
            this.collection.removeBlackList({
                mac : mac
            }, function(res) {
                console.log("移出黑名单回调", res);
            });
        },
        onCreateClick : function(event) {
            console.log("创建wifi");
            var _this=this;
            _this.collection.getWifiHotpotInfo(function(res) {
                _this.collection.ssid = res.ssid;
                _this.collection.pswd = res.pswd;
                _this.collection.createHotpot({
                    ssid : _this.collection.ssid,
                    pswd : _this.collection.pswd
                }, function(result) {
                });
                    _this.successPage.find("p.name").html(_this.collection.ssid);
                    _this.successPage.find("p.password").html(_this.collection.pswd);
                    _this.successPage.find("input[name=name]").val(_this.collection.ssid);
                    _this.successPage.find("input[name=password]").val(_this.collection.pswd);
            });      
        },
        onCloseWifiClick : function(event) {
            this.collection.stopWIfiHotpot();
            this.win.close();
        },
        onModifyWifiInfoClick : function(event) {
            var _this = this;
            var basicInfoBox = this.win.el.find(".wifipot-starting-now");
            var wifiSid = basicInfoBox.find("input[name=name]").val();
            var pswd = basicInfoBox.find("input[name=password]").val();
            
            if(basicInfoBox.find("input[name=name]")[0].checkValidity()){
                basicInfoBox.find("input[name=name]").removeClass("err-input");  
            }else{
                 basicInfoBox.find("input[name=name]").addClass("err-input"); 
                 return;
            }
            if(basicInfoBox.find("input[name=password]")[0].checkValidity()){
                basicInfoBox.find("input[name=password]").removeClass("err-input");   
            }else{
                 basicInfoBox.find("input[name=password]").addClass("err-input"); 
                 return;
            }            
            
            if (wifiSid != this.collection.ssid || pswd != this.collection.pswd) {
                this.collection.modifyWifiInfo({
                    ssid : wifiSid,
                    pswd : pswd
                }, function() {
                });
            }
            _this.successPage.find("p.name").show();
            _this.successPage.find("p.password").show();
            _this.successPage.find(".wifi-name-editor").hide();
            _this.successPage.find(".wifi-password-editor").hide();   
        }
    });
    exports.HotpotMainView = HotpotMainView;
});

