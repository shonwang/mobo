define('APINames', function(require, exports, module){
    var Map = {
        //REQ_ 表明前端页面主动发起的请求，回调页面同样的接口
        //BIND_ 表明由客户端主动发起请求给前端页面。
        REQ_LOCAL_SEARCH: 'get_LocalSearch',
        REQ_DEVICE_INFO : "get_PhoneInfo",//通知页面手机基本信息 
        REQ_DISCONNECT : "get_DisConnect", //断开手机连接
        BIND_DISCONNECT : "set_DisConnect",//断开手机连接
        REQ_CONNECTPHONE: "get_ConnectPhone", //连接手机,被动
        BIND_CONNECTION: "set_ConnectPhone",//通知页面连接手机是否成功主动
        REQ_REDISCONNECT : "get_ReConnectPhone",//重新连接
        
        REQ_SCREENSHOT: 'get_PhoneScreenImage',
        REQ_UPDATE_INFO: 'get_APKUpdateInfo',

        REQ_ALL_APP_INFO: "get_AllThirdAPKInfo",
        BIND_ALL_THIRDAPK_INFO: 'set_AllThirdAPKImages',
        BIND_ALL_SYSTEM_INFO: 'set_AllSystemAPKImages',
        REQ_ALL_SYSTEM_INFO: "get_AllSystemAPKInfo",
        
        BIND_INSTALL_APK_BYPHONE: "set_InstallAPK",
        BIND_UNINSTALL_APK_BYPHONE: "set_UnInstallAPK",
        
        REQ_PHONE_IMAGE_INFO: 'get_AllPhoneImageInfo',
        REQ_WALLPAPER_IMAGE_INFO: 'get_AllWallpaperInfo',
        REQ_ALL_IMAGE_INFO: "get_AllImageInfo",
        REQ_ALL_MUSIC_INFO : "get_AllMusicInfo",
        REQ_ALL_RING_INFO : "get_AllRingInfo",
        REQ_INSTALL_APP: "get_InstallAPK",
        REQ_EXPORT_THIRD_APK: 'get_ExportThirdAPK',
        REQ_EXPORT_SYS_APK: 'get_ExportSystemAPK',
      
        REQ_ALL_SMS_INFO : "get_OnAllSmsInfo",
        REQ_ALL_CONTACT_INFO: "get_AllContactsInfo",
      
        BIND_APP_INFO: "set_AllThirdAPKImages",
        BIND_SYSTEM_INFO: "set_AllSystemAPKImages",
        
        REQ_DRAG_DISABLED: 'get_DragMainDisabled',
        REQ_CLOSE : "get_Close", //退出程序
        BIND_CLOSE: 'set_Close',
        REQ_MINILIZE : "get_Minimize", //最小化
        REQ_MAXIMIZE : "get_Maximize", //最大化
        REQ_RESTORE  : "get_Restore",  //正常模式
        
        
        REQ_NOTIFY_PARENT_WINDOW: 'get_PopupWindowNotifyParentWind',
        REQ_POPUP_SYSTEM_DIALOG: 'get_PopupSelectDialog',
        REQ_POPUO_SAVE_DIALOG: 'get_PopupSavaAsDialog',
        REQ_COPY_FILE: 'get_CopyFile',
        REQ_OPEN_EXISTED_FILE: 'get_PopupExplorerSelFile',
        
        REQ_UNINSTALL_APP : "get_UnistThirdAPK",
        REQ_UNINSTALL_SYSAPP : "get_UnistSystemAPK",
        REQ_DELETE_MUSIC : "get_DelMusic",//删除音乐
        REQ_DELETE_RING : "get_DelRing",
        REQ_SET_RING_MUSIC : "get_SetMusicRing",//设置铃音
        REQ_IMPORT_MUSIC : "get_AddMusic",//导入音乐
        REQ_EXPORT_MUSIC: "get_SaveAsMusic",//导出音乐
        REQ_GET_MUSIC_PLAY_PATH: "get_PlayMusic",//播放音乐
        
        /*2014-02-11 for contact and sms delete and modify add*/
       REQ_CONTACT_QUERY : "get_FindContacts",//查找联系人，按账号和分组
       REQ_CONTACT_DELETE:"get_DelContacts",//删除
       REQ_CONTACT_ALL_DELETE:"get_DelAllContacts",//删除所有
       REQ_CONTACT_UPDATE:"get_UpdateContacts",//更新
       REQ_CONTACT_ADD : "get_AddContacts",//添加
       REQ_CONTACT_EXPORT : "get_ContactsBackUp",//导出
       REQ_CONTACT_IMPORT : "get_ContactsLoad",//导入
       
       REQ_CONTACT_Groups_ALL:"get_AllContactsGroup",
       REQ_CONTACT_Groups_ADD:"get_AddContactsGroup",
       REQ_CONTACT_Groups_DELETE:"get_DelContactsGroup",
       REQ_CONTACT_Groups_UPDATE:"get_UpdateContactsGroup",
       
       REQ_SMS_DELETE:"get_DelSms",//删除
       REQ_SMS_ALL_DELETE:"get_DelAllContacts",//删除所有
       REQ_SMS_SEND:"get_SendSms",//发送
       REQ_SMS_EXPORT : "get_SmsBackUp",//导出
       REQ_SMS_IMPORT : "get_SmsLoad",//导入
       BIND_SMS_RECEIVE : "set_RecvSms",
       REQ_SMS_SET_READ: "get_SmsRead",
       
       BIND_VIDEO_INFO: "set_VideoInfo", //获取单个视频信息，包含本地缩略图路径
       BIND_IMAGE_INFO: "set_ImageInfo",//获取单张图片信息，包含本地缩略图路径
       REQ_ALL_VIDEO_INFO: "get_AllVideoInfo",//获取所有视频信息
       REQ_VIDEO_SAVEAS: "get_SaveAsVideo",//视频另存
       REQ_VIDEO_PLAY: "get_PlayVideo",//用系统注册的默认播放器播放视频
       REQ_VIDEO_DELETE: "get_DelVideo",//删除视频
       REQ_VIDEO_ADD: "get_AddVideo", //导入一个视频
       
       REQ_PICTURE_ADD: 'get_AddImage',
       REQ_DELETE_PICTURE: 'get_DelImage',
       REQ_SET_WALLPAPER: 'get_SetWallpaper',
       BIND_PHONE_IMAGE: 'set_PhoneImageInfo',
       BIND_WALLPAPER_IMAGE: 'set_WallpaperImageInfo',
       BIND_OTHER_IMAGE: 'set_ImageInfo',
       REQ_SAVE_IMAGE: 'get_SaveAsImage',
       REQ_OPEN_DEFAULT_BROWSER: 'get_OpenUrlUseDefBrowser',
       REQ_OPEN_ORIGIN_PIC: 'get_CefOpenImage',
 
       REQ_DOWNLOAD: 'get_DownLoad',
       REQ_STOP_DOWNLOAD: 'get_StopDownLoad',
       REQ_SAVE_TASK_INFO: 'get_SaveTaskCenterInfo',
       REQ_GET_TASK_CENTER_INFO: 'get_TaskCenterInfo',
       REQ_GET_TASK_INFO: 'get_TaskCenterInfo',
       REQ_DELETE_TASK: 'get_DelTask',
       BIND_TASK_EVEND: 'set_TaskCenter',
       
       BIND_EVENT_WINDOW_RECEIVER: 'set_NotifyCefWindow',
       REQ_ROTATE_PICTURE: 'get_RotateImage',
       REQ_GET_USER_CONFIG: 'get_UserConfInfo',
       REQ_SET_USER_CONFIG: 'get_SaveUserConfInfo',
 //File Manager Interface defination 2014-03-13
       REQ_FILE_GET_ROOT_INFO : "get_PhoneRootDirectory",//获取根节点
      
       REQ_FILE_GET_SUB_NODES: "get_PhoneDirectory",//获取目录子节点列表 id,path
       REQ_FILE_DEL_NODE: "get_DelPhoneFile",//删除目录id,path
       REQ_FILE_RENAME:"get_RenamePhoneFile",//更改文件名称id,remotePath,fileName,isDirectory
       REQ_FILE_MOVE_TO:"get_MovePhoneFile",//移动文件或文件夹 id,isDirectory,remotePath=源文件夹 destPath=目标文件夹名
       REQ_FILE_CREATE_DIRECTORY:"get_CreatePhoneDirectory",//创建文件夹,remotePath,isDirectory,fileName
       REQ_FILE_COPY:"get_CopyPhoneFile",//复制文件,srcPath,destPath
       REQ_FILE_ADD:"get_ImportFile",//添加本地文件到手机目录，//localPath= ,//srcPath=手机端 路径
       REQ_FILE_DIRECTORY_ADD:"get_AddLocalDirectory",//添加本地文件夹到手机目录，//localPath= ,//srcPath=手机端 路径
       REQ_FILE_DIRECTORY_EXPORT:"get_ExportPhoneDirectory",//导出手机文件夹
       REQ_FILE_EXPORT:"get_ExportPhoneFile",//导出手机文件

       //备份还原
       REQ_BACKUP_INFO_NUM: 'get_BackupPhoneInfoNum',
       REQ_DEFAULT_BACKUP_PATH: 'get_DefaultBakFilePath',
       REQ_SET_BACKUP_PATH: 'get_SysFSDialog',
       REQ_LAST_BACKUP_TIME: 'get_LastTimeBakTime',
       REQ_START_BACKUP: 'get_BackupFile',
       REQ_DEFAULT_RESTORE_INFO: 'get_RestorePhoneInfoNum',
       REQ_START_RESTORE: 'get_RecoveryFile',
  //log
      REQ_REPORT_LOG: 'get_ReportLog',
   //获取域名
      REQ_SERVICE_URL: 'get_ServiceUrl',
	   
	    REQ_REDOWNLOAD_DRIVER: 'get_ReDownLoadDriver',//重新下载驱动
	    REQ_REINSTALL_MUSERVER: 'get_ReInstallMuserver',//重新安装Muserver
	    REQ_REAUTHORIZE: 'get_ReAuthorize',//拉起手机弹出授权框
	 
	    REQ_COPYTOCLIPBOARD: 'get_CopyToClipboard',//copy文本到剪贴板  
	   
	    REQ_GETCLIENT_INFO: 'get_GetClientInfo',//获取客户端信息
	   
	    BIND_INSTALL_APK: 'set_InstallApkInfo',
	    REQ_INSTALL_APK_INFO: 'get_InstallApkInfo',
	   
	    BIND_OPEN_SETTING: 'set_PopupSettingDialog',
	    BIND_SET_DOWNLOAD_SPEED: 'set_AllDownloadsRate',
	   
	    GET_YOUTUBE_DOWNLOAD_INFO:"get_YoutubeDownloadInfo",//获取youtube下载地址，"watchAddress”:" http://www.youtube.com/watch?v=3XviR7esUvo"
	    REQ_OEN_KEY_ROOT:"get_OneKeyRoot",
	    REQ_MULTI_SEL_FILE:"get_PopupExplorerSelMulFile",//导出后选中多个文件
	    REQ_SWICH_SITE:"get_SetDefaultSwitchSite", //切站后返回当前站点信息
	    REQ_SET_LANGUAGE:"get_SetLanguage",//设置语言
	    REQ_OPEN_FILEMANGGER:"get_OpenPhoneFileManager",//打开文件管理
	    REQ_SET_NENU_LANGUAGE:"get_SetTrayMeunLanguage",//设置托盘menu语言
	   
	    REQ_RESIZE_WINDOW: "get_WindowSize",//(width,height)
      REQ_SET_PULL_CLIENT: "get_SavebPopularActivitieInfo",//设置是否自动拉起客户端
      BIND_SET_SCREEN_BLACK: "set_PhoneScreenChange",
       
       //取消操作
      REQ_GET_MUSIC_STOP_EXPORT:"get_StopExportMusic",
      REQ_GET_MUSIC_STOP_IMPORT:"get_StopImportMusic",
      REQ_GET_MUSIC_STOP_PLAY:"get_StopPlayMusic",
      REQ_STOP_IMPORT_VIDEO: "get_StopImportVideo",
      REQ_STOP_EXPORT_VIDEO: "get_StopExportVideo",
      REQ_STOP_PLAY_VIDEO: "get_StopPlayVideo",

      REQ_STOP_BACKUP: "get_StopBackup",
      REQ_STOP_RESTORE: "get_StopRestore",
      
      REQ_STOP_IMPORT_CONTACT:"get_StopImportContacts",
      
      //电子书管理2014-07-02新功能
      REQ_ALL_BOOK_INFO:"get_AllEBook",
      REQ_DELETE_BOOK:"get_DelEBook",
      REQ_IMPORT_BOOK:"get_ImportEBook",
      REQ_EXPORT_BOOK:"get_ExportEBook",
      REQ_OPEN_EBOOK:"get_OpenEBook",
      
      REQ_STOP_DELETE_CONTACT:"get_StopDelContacts",
      //安装驱动提示弹窗关闭动画
      REQ_ARIVE_CLOSE:"get_MoveLeftTop",
      //电子书管理的取消操作 2014-07-17
      REQ_GET_BOOK_STOP_IMPORT:"get_StopImportEBook",
      REQ_GET_BOOK_STOP_EXPORT:"get_StopExportEBook",
      REQ_GET_BOOK_STOP_PLAY:"get_StopPlayEBook",
      //判断pc端文件是否存在
      REQ_CHECK_FILE_EXIST_PC:"get_PathFileExists",//path 完整路径
      
      //2014-08-12中断操作
      REQ_FILE_STOP_EXPORT:"get_StopExportPhoneFile",
      REQ_FILE_STOP_IMPORT:"get_StopImportPhoneFile",
      REQ_FILE_STOP_OPEN:"get_StopOpenPhoneFile",
      //2014-08-13移动apk
      REQ_APK_MOVE:"get_MoveAPK",
      REQ_POP_TO_TOP:"get_TopMostWindow",
      REQ_POP_ENABLE_WINDOW:"get_EnableWindow",//解冻窗口1是0冻结
      //2014-9-1获取wifi连接记录
      REQ_GET_WIFIHISTORY:"get_ConnectWifiHistory",
      //2014-09-09
      REQ_OPEN_FILE:"get_OpenPhoneFile",
 
      //2014-09-12清理大师
      REQ_SCAN_CLEAN_INFO:"get_CleanPCInfo",//获取大类别列表@return {totalSize=总大小,title标题名称,size类型大小，count数目个数,id标识}
      REQ_START_CLEAN:"get_CleanPCRubbish", //开始清理//@param id=数组
      REQ_SUB_CATEGORY_LIST:"get_CleanPCListInfo",  // 获取某一大类别的字列表@param id=某一大类的id @return{ path,size,id}
      REQ_STOP_SCAN:"get_StopScanCleanPCInfo",  // 停止扫描
      REQ_STOP_CLEAN:"get_StopCleanPCRubbish",  // 停止清理
      REQ_CLEAN_WINDOW:"get_CleanWindow",
      
      //2014-09-25
      REQ_POPUP_INSTALL_ON_PHONE : "get_WifiPopupPhoneInstApkWindow",//localPath 唤起wifi安装界面 
      
      //10.17重试wifi连接
      REQ_GET_RETRWIFI:"get_RetryWifiConnectAfterRefused",
      
      //wifi热点
      REQ_GET_CREATE_WIFI_HOTPOT:"get_StartWifiHotSpot",
      REQ_GET_WIFI_HOTPOT_STATE:"get_WifiSpotState",      //获取状态
      REQ_GET_HIDE_WIFI_HOTPOT:"get_HideWifiHotSpot",      //隐藏wifi
      REQ_SET_WIFI_HOTPOT_BLACK:"get_SetWifiHotBackList",//添加到黑名单
      REQ_SET_STOP_HOTPOT:"get_StopWifiHotSpot_Get",//停用wifi
      REQ_SET_WIFI_REMOVE_BLACK:"get_KickDeviceFormBlackList",//移出黑名单,{mac:"a-f-cfd-1d"}
      REQ_GET_WIFI_HOTPOT_INFO:"get_WifiHotSpotInfo",
      BIND_WIFI_HOTPOT_CHANGE:"set_WifiHotSpotState",//主动监听wifi状态变化
      REQ_SET_MODIFY_WIFIHOTPOT:"get_ResetWifiHotSpot",//修改wifi ssid或者密码
      REQ_SET_MODIFY_DEVICE_NAME:"get_RenameDeviceName",
      
      //托盘操作2014-11-14 add by liujintao
      REQ_CREATE_WIFIHOTPOT_TRAY:"get_CreateTray",
      
      REQ_DELETE_WINDOW_TRAY:"get_DelTray",
    //设置托盘菜单信息
    //menuType=整数，回调
    //trayTip=托盘显示的tip
    //menuList={[menuId, text} 数组，menuId 整数，菜单id, text菜单内容
      REQ_SET_TRAY_MENU_INFO:"get_SetTrayMeunInfo",
      BINDING_SELECT_TRAY_MENU_ITEM:"set_SelectTrayMenu",//menuType=来自于get_SetTrayMeunInfo设置的信息,menuId==来自于get_SetTrayMeunInfo设置的信息
   
      SET_TRAY_WINDOW_VISIBLE:"get_ShowWindow",//显示或隐藏窗口，托盘窗口可用
    }
    return Map;
});
