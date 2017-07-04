define('traditionalchinese:myapp', function(require, exports, module){
    var dictionary = {
        installAppsLabel: '安裝應用程式',
        moveToSdCardLabel: '移動至SD卡',
        tabAppLabel: '已安裝',
        tabUpdatesLabel: '可更新',
        tabSystemLabel: '系统應用',
        moveLabel: '移動',
        
        appCurrentVersionLabel: '目前版本:',
        appLatestVersionLabel: '最新版本:',
        appLocationLabel: '安裝位置:',
        appSizeColonLabel: '文件大小:',
        ratingColonLabel: '評分:',
        
        likeColonLabel: '您可能喜歡:',
        downloadsText: '{0}次下載',
        updatingText: '更新中',
        uninstallingText: '解除安裝中',
        installingText: '安裝中',
        sureUninstallTip: '您確定要解除安裝已選取的應用程式嗎？',
        uninstalling: '正在解除安裝，請不要斷開您的設備！',
        uninstallSuccessText: '解除安裝完成',
        uninsatllFailed:"成功解除安裝{0}個應用程式，失敗{1}個：",
        
        exportSuccess:"成功導出{0}個應用！",
        exportFailed:"成功導出{0}個應用，失敗{1}個：",
        
        systemMaskText: '請先Root您的設備後，才可以管理您的系統應用！',
        systemMaskCtn: '清理您的系统應用最多可以釋放156.3 MB的儲存空間！',
        searchResultTitle:'找到{0}個應用程式',
        /*2014-5-26*/
        deviceTipText : "記憶體",
        sdCardTipText : "SD卡",
        //06-03
        noapptext:'没有找到應用程式',
        noupdatetext:'没有找到可更新的應用程式',
        noappBtnText:'下載應用程式',
        //08-13
        moving: '正在移動中，請不要中斷您的設備連線',
        moveFailed:"成功移動 {0} 個應用程式， {1} 個失敗：",
        //08-19
        moveConfirm:"應用程式移動到SD卡可能會導致無法正常運作，您確定要移動嗎？",
        //2014-10-14
       wifiUninstallTitle:"請在手機上完成解除安裝的操作"
    }
    return dictionary;
});