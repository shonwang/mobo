define('chinese:myapp', function(require, exports, module){
    var dictionary = {
        installAppsLabel: '安装应用',
        moveToSdCardLabel: '移动到SD卡',
        tabAppLabel: '已安装',
        tabUpdatesLabel: '可升级',
        tabSystemLabel: '系统应用',
        moveLabel: '移动',
        
        appCurrentVersionLabel: '当前版本:',
        appLatestVersionLabel: '最新版本:',
        appLocationLabel: '安装位置:',
        appSizeColonLabel: '文件大小:',
        ratingColonLabel: '评分:',
        
        likeColonLabel: '猜你喜欢:',
        downloadsText: '{0}次下载',
        updatingText: '升级中',
        uninstallingText: '卸载中',
        installingText: '安装中',
        sureUninstallTip: '您确定要卸载已选中的应用吗？',
        uninstalling: '正在卸载任务，请不要断开您的设备！',
        uninstallSuccessText: '卸载成功',
        uninsatllFailed:"成功卸载{0}个应用，失败{1}个：",
        
        exportSuccess:"成功导出{0}个应用！",
        exportFailed:"成功导出{0}个应用，失败{1}个：",
        
        systemMaskText: '请先Root您的设备后，才可以管理您的系统应用！',
        systemMaskCtn: '清理您的系统应用最多可以释放156.3 MB的存储空间！',
        searchResultTitle:'找到{0}个应用',
        /*2014-5-26*/
        deviceTipText : "内存",
        sdCardTipText : "SD卡",
        //06-03
        noapptext:'没有找到应用',
        noupdatetext:'没有找到可升级的应用',
        noappBtnText:'下载应用',
        //08-13
        moving: '正在移动中，请不要断开您的设备',
        moveFailed:"成功移动 {0} 个应用，失败 {1}个：",
        //08-19
        moveConfirm:"将应用移动到SD卡后可能会导致应用不可用，您确定要继续移动吗？"
    }
    return dictionary;
});