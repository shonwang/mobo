define('connectionMgr', function(require, exports, module){
    var app = require('app');
    var apiNames = require('APINames');
    var _ = require('underscore');
    var utils = require('utils');
    
    
    //Connection msg type list
    var status = {
        WM_DEVICE_MSG_NOTSTART: 0,//0为不在连接流程的状态码
        WM_DEVICE_MSG_SCANING  : 2001, //正在扫描
        WM_DEVICE_MSG_CHECKDRIVERBEGIN : 2002, //正在检测驱动
        WM_DEVICE_MSG_CHECKDRIVEREND : 2003, //检测驱动完成
        WM_DEVICE_MSG_DRIVERLOADING : 2004,//正在自驱
        WM_DEVICE_MSG_DOWNLOADDRIVER : 2005,  //下载驱动
        WM_DEVICE_MSG_DOWNLOADFAILED : 2006, //下载失败
        WM_DEVICE_MSG_DWONLOADSUCCEEDED : 2007,//下载完成
        WM_DEVICE_MSG_INSTALLDRIVER : 2008, //正在安装驱动
        WM_DEVICE_MSG_INSTALLFAILED : 2009, //安装驱动失败
        WM_DEVICE_MSG_INSTALLSUCCEEDED : 2010, //安装驱动成功
        WM_DEVICE_MSG_INSTALLMUSERVER : 2011, //开始安装muserver
        WM_DEVICE_MSG_INSTALLMUSERVEROK : 2012, //安装muserver ok
        WM_DEVICE_MSG_INSTALLMUSERVERFAILED : 2013, //安装muserver failed
        WM_DEVICE_MSG_BEGINCONNECT : 2014, //开始连接
        WM_DEVICE_MSG_CONNECTSUCCEEDED : 2015,//连接成功       
        WM_DEVICE_MSG_DATASYNCSUCCEEDED :  2016, //数据同步完成
        WM_DEVICE_MSG_DEVICEDISCONNECT : 2017,//物理上的设备断开
        WM_DEVICE_MSG_CONNECTPHONEFAILED : 2018,//连接手机失败
        WM_DEVICE_MSG_USBDEBUGNOTOPEN: 2019, //usb debug没有打开
        WM_DEVICE_MSG_DEVICEISOFFLINE: 2020, //device处于offline状态
        WM_DEVICE_MSG_PHONEDISCONNECT: 2021,  //非物理上的断开,
        WM_DEVICE_MSG_NODEVICEPLUGIN: 2022, //没有设备插入, 启动时发现没有设备会接受
        WM_DEVICE_MSG_OFFLINEFAILED: 2025, //连接失败
        WM_DEVICE_MSG_ADBISBLOCKED:2026,//第三方adb阻挡了连接
		WM_DEVICE_MSG_WIFICONNECT: 2095 //wifi连接
        
    };
    
    var wifiCode = {
    	WIFI_CODE_CONNECTING:100,//连接中
    	WIFI_CODE_CONNECTED:101,//连接成功
    	WIFI_CODE_DISCONNECTING:102,//断开中
    	WIFI_CODE_DISCONNECTED:103,//已经断开
    	WIFI_CODE_FAILED:104,// 连接失败 
    	WIFI_CODE_SCANING:105,// 正处于扫描状态 
    	WIFI_CODE_SCANFINISHED:106,// 扫描结束 
    	WIFI_CODE_NODEVICE:107,// 没有扫描到任何设备 
    	WIFI_CODE_REFUSED:108,// 用户手动拒绝wifi连接请求 
    	WIFI_CODE_USERDISCONNECT:109,// 用户断开wifi连接
    	WIFI_CODE_WAITTING:110,//等待用户点击允许按钮
    	WIFI_CODE_UPDATE:111,// 正在更新Mobogenie Helper 
    	WIFI_CODE_INSTALL:112,// 请在您的设备上完成Mobogenie Helper的安装
    	WIFI_CODE_UPDATEFAILED:113,//Mobogenie更新失败！
    	WIFI_CODE_SCAN_NODEVICE:114,// ARP扫描阶段 未扫描到任何设备
    	WIFI_CODE_UDP_NODIP:115,// UDP任务结束 未拿到IP地址 
		WIFI_CODE_MAC_NULL:116, // 进行WIFI连接的时候IP MAC Code有一项参数为空
		WIFI_CODE_TCP_CONNECT:117 // TCP连接阶段，校验失败

    };
    
    var ADBCODE = {
        //空间不足
        ADB_FAILED_NO_SPACE_LEFT : 242,
        //手机空间不足
        ADB_FAILED_NO_SPACE_LEFT_ON_PHONE : 243,
        //SD卡空间不足
        ADB_FAILED_NO_SPACE_LEFT_ON_SDCARD : 244,
        ADB_SDCARD_NOT_ENOUGH: 4
    };
    
    var Model = app.ModelBase.extend({
        /*
         * 连接流程的状态
         */
        curStatus: status.WM_DEVICE_MSG_NOTSTART,
        /*
         * 连接成功与否
         */
        wifiModel:0,//0是usb模式，1是wifi模式
        connected: false,
        deviceInfo: null,
        init: function(){
            var _this = this;
            var connQueue = [];
            var timer;
            
            var onConn = function(){
                if(!timer){
                    timer = setTimeout(onConn, 100);
                }else{
                    var cs = connQueue.shift();
                    if(cs){
                        _this.onConnection.call(_this, cs);
                        timer = setTimeout(onConn, 100);
                    }else{
                        timer = null;
                    }
                }
            };
            
            //绑定连接事件
            this.binding(apiNames.BIND_CONNECTION, function(res){
                console.log('CONNECTION==', res, (new Date()).format('yyyyMMdd_hhmmss.S'));
                connQueue.push(res);
                onConn();
            }.bind(this));
            
            //获取连接信息
            this.getDeviceInfo(function(res){
                 if(res.msgType != status.WM_DEVICE_MSG_NOTSTART){
                    this.trigger('connection', this.curStatus);
                 }
            }.bind(this));
        },
        
        isRoot: function(){
            if(this.deviceInfo && this.deviceInfo.isPhoneRooted){
                return true;
            }
            return false;
        },
        
        isConnect: function(){
            return this.connected;  
        },
        
        isConnecting: function(){
             if(this.curStatus >= status.WM_DEVICE_MSG_SCANING && 
                this.curStatus <= status.WM_DEVICE_MSG_WIFICONNECT &&
                this.curStatus != status.WM_DEVICE_MSG_DOWNLOADFAILED &&
                this.curStatus != status.WM_DEVICE_MSG_INSTALLFAILED &&
                this.curStatus != status.WM_DEVICE_MSG_INSTALLMUSERVERFAILED && 
                this.curStatus != status.WM_DEVICE_MSG_DEVICEDISCONNECT &&
                this.curStatus != status.WM_DEVICE_MSG_CONNECTPHONEFAILED &&
                this.curStatus != status.WM_DEVICE_MSG_OFFLINEFAILED &&
                this.curStatus != status.WM_DEVICE_MSG_USBDEBUGNOTOPEN &&
                this.curStatus != status.WM_DEVICE_MSG_DEVICEISOFFLINE &&
                this.curStatus != status.WM_DEVICE_MSG_PHONEDISCONNECT &&
                this.curStatus != status.WM_DEVICE_MSG_NODEVICEPLUGIN &&
                this.curStatus != status.WM_DEVICE_MSG_NODEVICEPLUGIN &&
                this.curWifiCode != wifiCode.WIFI_CODE_DISCONNECTING &&
                this.curWifiCode != wifiCode.WIFI_CODE_DISCONNECTED &&
                this.curWifiCode != wifiCode.WIFI_CODE_SCAN_NODEVICE &&
                this.curWifiCode != wifiCode.WIFI_CODE_UDP_NODIP &&
                this.curWifiCode != wifiCode.WIFI_CODE_MAC_NULL &&
                this.curWifiCode != wifiCode.WIFI_CODE_TCP_CONNECT &&
                this.curWifiCode != wifiCode.WIFI_CODE_NODEVICE &&
                this.curWifiCode != wifiCode.WIFI_CODE_REFUSED &&
                this.curWifiCode != wifiCode.WIFI_CODE_USERDISCONNECT){
                 
                return true;
            }else{
                return false;
            }
        },
        
        //处理后端连接信息
        onConnection: function(res){
             
            this.curStatus = res.info.msgType;
            this.adbCode = res.info.adbCode;
            this.curWifiCode = res.info.wifiCode;
            console.log("当前状态-------------------------------------",res.info.msgType, res.info.wifiCode);
            switch(this.curStatus){
                case status.WM_DEVICE_MSG_CONNECTSUCCEEDED:
                    var count = 0;
                    this.connected = true;
                    
                    
                    this.deviceInfo = this.deviceInfo || {};
                    
                    this.deviceInfo.sPhoneBrand = res.info.brand;
                    this.deviceInfo.sPhoneName = res.info.name;
                    this.deviceInfo.width = res.info.width;
                    this.deviceInfo.height = res.info.height;
                    this.deviceInfo.isSDCardExist = res.info.isSDCardExist;
                    this.deviceInfo.isScreenOn = res.info.isScreenOn;
                    
                    if(typeof consoletemp != "undefined"){
                        consoletemp.call(console, _.extend({}, this.deviceInfo));
                    }
                    this.trigger('connection', res.info.msgType);
                    
                    var isGetInfo = false;
                    var me = this;
                    var getDeviceInfo = function(){

                        //获取连接信息
                        //getDeviceInfo接口会返回连接的状态吗， 会抛出connection事件
                        this.getDeviceInfo(_.bind(function(data){
                            if(!isGetInfo){
                                if(data.status !== -1 && data.info){
                                    isGetInfo = true;
                                    console.log("CONNECTION >> 连接成功", data);
                                    if (!this.isWifiModel()){
                                    	utils.setlog_phonestatus(1)
                                        utils.sendStatisticsDriver(data);
                                        utils.sendNewLogDriver(data);
                                    } else {
                                    	utils.setlog_phonestatus(2)
                                        console.log("CONNECTION >> 老子用的wifi");
                                    }
                                }
                            }
                            if(data.status == -1 || !data.info){
                                if(count >= 10){
                                    //this.trigger('connection', res.info.msgType);
                                    return;
                                }
                                setTimeout(getDeviceInfo, 3000);
                                //getDeviceInfo();
                                count++;
                            }else{
                                
                                //this.trigger('connection', res.info.msgType);
                            }
                        }, this));
                    }.bind(this);
                    
                    getDeviceInfo();
                    break;
				case status.WM_DEVICE_MSG_DOWNLOADDRIVER:
                   	this.trigger('connection', this.curStatus, res.info.adbCode);
                    break;
                case status.WM_DEVICE_MSG_WIFICONNECT:
                	utils.setlog_phonestatus(0)
                	this.connected = false;
                    this.wifiModel = 1;
                	this.trigger('connection', this.curStatus, res.info.wifiCode);
                    break;
                default:
                	utils.setlog_phonestatus(0) 
                	this.wifiModel = 0;
                    this.connected = false;
                    this.trigger('connection', this.curStatus);
                    break;
            }
        },
        
        connect: function(callback){
            var me = this;
            this.request({
                action: apiNames.REQ_CONNECTPHONE,
                callback: function( res ){
                    callback && callback.apply(me, [res]);
                }
            });
        },
        
        reConnect: function(callback){
            var me = this;
            this.request({
                action: apiNames.REQ_REDISCONNECT,
                callback: function( res ){
                    callback && callback.apply(me, [res]);
                }
            });
        },
        
        disconnect: function(){
            this.request({action: apiNames.REQ_DISCONNECT});
            this.onConnection({
                info: {
                    msgType: status.WM_DEVICE_MSG_PHONEDISCONNECT
                }
            });
        },
        
        getDeviceInfo: function(callback){
            var me = this;
            var count = 0;
            
            this.request({
                action: apiNames.REQ_DEVICE_INFO,
                callback: function( res ){
                    console.log('GET_DEVICE:', typeof res, res, (new Date()).format('yyyyMMdd_hhmmss'));
                    if(res.msgType){
                        me.curStatus = res.msgType;
                    }
                    
                    if(res.adbCode){
                        me.adbCode = res.adbCode;
                    }
                    
                    if(res.msgType == status.WM_DEVICE_MSG_CONNECTSUCCEEDED){
                        me.connected = true;
                    }
                    
                    if(res.info){
                        me.deviceInfo = _.extend({}, res.info);
                    }else{
                        me.deviceInfo = me.deviceInfo || {};
                    }
                    
                    callback && callback.apply(me, [res]);
                    
                    me.trigger('getDeviceInfo');
                }
            });
        },
        
        getBattery: function(callback){
            var me = this;
            this.request({
                action: apiNames.REQ_DEVICE_INFO,
                callback: function( res ){
                    if(res.status !== 0){
                        var deviceInfo;
                        if(res.info){
                            deviceInfo= _.extend({}, res.info);
                        }else{
                            deviceInfo = deviceInfo || {};
                        }
                        callback && callback.apply(me, [deviceInfo.sBatteryLevel || 100]);
                    } 
                }
            });
        },
        
        getStatus: function(){
            return this.curStatus;
        },
        getWifiCode: function(){
            return this.curWifiCode;
        },
        isWifiModel:function(){
        	if( this.wifiModel == 1){
        		return true;
        	}else{
        		return false;
        	}
        },
        sendLog: function(data){
            var $ = require("jquery");
            $.ajax({
                url:"http://10.6.192.107:8089/log",
                data: data,
                type:"GET",
                success: function(res){
                    console.log("---------connected response----------");
                }
            });
        }
    });
    
    var instance = new Model(); 
    instance.status = status;
    instance.wifiCode = wifiCode;
    instance.adbCodeMap = ADBCODE;
    return instance;
});