/**
 * @author liujintao
 * @since 2014-11-03
 */
define("WifiHotPotMode",function(require,exports,module){
  var app = require("app");
  var apiNames = require("APINames");   
  var _ = require("underscore");
  var gridModel = require("gridModel");
  
  var stateMap={
      CREATING:0,
      RESTARTING:1,//重启中
      STOPING:2,//停止中
      
      CREATE_SUCCESS:10,
      INIT_OK:11,//初始化成功
      STOP_SUCCESS:12,
      RENAME_DEVICE_SUCCESS:13,//重命名成功
      ADD_BLACK_SUCCESS:14,
      REMOVE_BLACKLIST_SUCCESS:15,

      CONNECT_FOUND:20,
      CONNECT_LOSS:21,
      
      REMOVE_BLACK_LIST_FAILED:22,
      ADD_BLACK_LIST_FAILED:23, 
      
      RESTART_FAILED:30,
      RENAME_DEVICE_FAILED:31,     
      CREATE_FAILED:32,
      INIT_FAILED:33,
      INIT_FAILED_ACCESS:40,//权限不足
      INIT_GET_NETWORK_FAILED:41,//获取网卡信息失败
      NO_WIRELESS_ADAPTER:42,//没有无线网卡
      CREATE_FAILED_INVALID_PARAM:43,//创建失败，无效参数
      CREATE_FAILED_WHEN_SHARE:44//开启共享失败
      
  };
  var Model = gridModel.Model.extend({
        init : function(opts) {
            this.id = opts.mac;
        }      
      });
      
   var Collection = gridModel.Collection.extend({
       model:Model,
       requested : false,
       responsed : false,
       init:function(opts){
         this.ssid="";
         this.pswd="";
         this.wifiState=-1;
       },
       /**
        * 创建热点
        * */
       createHotpot:function(data,callback){
           app.dal.request({
               action:apiNames.REQ_GET_CREATE_WIFI_HOTPOT,
               paras:{
                   ssid:data.ssid,
                   pswd:data.pswd
               },
               callback:function(res){
                   console.log("创建热点的回调",res);
                   callback&&callback(res);
               }
           });
       },
       /**
        * 添加到黑名单
        * */
       addBlackList:function(data,callback){
           app.dal.request({
               action:apiNames.REQ_SET_WIFI_HOTPOT_BLACK,
               paras:{
                 mac:data.mac  
               },
               callback:function(res){
                   callback&&callback(res);
               }
           });           
       },
       /**
        * 黑名单移除
        * */
       removeBlackList:function(data,callback){
           app.dal.request({
               action:apiNames.REQ_SET_WIFI_REMOVE_BLACK,
               paras:{
                 mac:data.mac  
               },
               callback:function(res){
                   console.log("添加黑名单的回调",res);
                   callback&&callback(res);
               }
           });                
       },
       /**
        * 修改用户名密码
        * */
       modifyWifiInfo:function(data,callback){
           app.dal.request({
               action:apiNames.REQ_SET_MODIFY_WIFIHOTPOT,
               paras:{
                 ssid:data.ssid,
                 pswd:data.pswd  
               },
               callback:function(res){
                   callback&&callback(res);
                   console.log("获取wifi连接状态回调",res);
               }
           });              
       },
       getWifiHotpotInfo:function(callback){
           var me = this;
           app.dal.request({
               action:apiNames.REQ_GET_WIFI_HOTPOT_INFO,
               callback:function(res){
                   console.log("获取wifi信息",res);
                   me.clear();
                   if(res.info&&res.info.connectList){
                       for(i in res.info.connectList){
                           var model = new Model(res.info.connectList[i]);
                           me.push(model);
                       }                       
                   }
                   if(res.info&&res.info.blackList){
                       for(i in res.info.blackList){
                           var model = new Model(res.info.blackList[i]);
                           model.set("black",true);
                           me.push(model);
                       }                       
                   }                   
                   callback&&callback(res);
               }
           });            
       },
       updateWifiInfo:function(data,callback){
           app.dal.request({
               action:apiNames.REQ_SET_STOP_HOTPOT,
               callback:function(res){
                   console.log("停用wifi连接回调",res);
               }
           });             
       },
       stopWIfiHotpot:function(){
           app.dal.request({
               action:apiNames.REQ_SET_STOP_HOTPOT,
               callback:function(res){
                   console.log("停用wifi连接回调",res);
               }
           });             
       },
       updateDeviceInfo:function(data,callback){
           app.dal.request({
               action:apiNames.REQ_SET_MODIFY_DEVICE_NAME,
               paras:{
                 mac:data.mac,
                 deviceName:data.deviceName  
               },
               callback:function(res){
                   callback&&callback(res);
                   console.log("更新设备信息回调",res);
               }
           });              
       },
       bindingStateChange:function(callback){
           app.dal.binding(apiNames.BIND_WIFI_HOTPOT_CHANGE,function(res){
               callback&&callback(res);
           });
       }
   });
   exports.Model=Model;
   exports.Collection=Collection;
   exports.stateMap=stateMap;
});
