define('chinese:task', function(require, exports, module){
    var dictionary = {
        setingAsWallpaper: '设为壁纸',
        setingAsRingtone: '设为铃声',
        setRingtoneSuccess: '设为铃声成功',
        setRingtoneFailed: '设为铃声失败',
        
        insuficientSpace: '安装失败，空间不足。',
        noSdCard: '安装失败，找不到SD卡。',
        noSuchSourceFile: '安装失败，源文件有错误。',
        inValidApkFile: '安装失败，无效的APK文件。',
        unknowSourceSetting: '请在设置>应用程序中勾选“允许未知源”',
        installPhoneMemory: '请安装到手机内存中',
        unknownError: '未知错误',
        networkErrorText: '网络错误',
        
        waitingText: '等待中',
        pausedText: '已暂停',
        installUnknownError: '安装失败，未知错误',
        downloadUnknownError: '下载失败，未知错误',
        
        adbConnectionError: '请连接手机进行安装',
        
        importFileNotExistedText: '导入失败，源文件不存在',
        importTransferErrorText: '导入失败，文件传输错误',
        importInsufficientSpace: '导入失败，手机空间不足',
        importUnknownError: '导入失败，未知错误',
        importUnConnectError: '请连接手机',
        importFailedNoSdCard: '导入失败，找不到SD卡',
        installSdkOlderError: '此应用与您的设备不兼容',
        installMismatchedCertificateError: 'APK证书不匹配，请先卸载此应用程序再安装',
        
        transferringText: '传输中',
        settedText: '设置于{0}',
        importViaConnectText: '请连接手机',
        
        installFailedText: '安装失败',
        
        openFolder:'打开下载文件夹',
        
        downloadInText: '下载于{0}',
        reinstallText: '重新安装',
        noTaskText: '暂时没有任务',
        /*6-04*/
        unknowSource2Setting: "安装失败，请在设置>安全中勾选“允许未知源” ",
        unzipAppText: "解压中",
        transferDataFile: "导入数据包中",
        unzipAppFailedText: "解压失败",
        transferAppFailedText: "导入数据包失败",
        /*7-28*/
        hideTaskTip:"隐藏",
        /*2014-09-25*/
        showInstallPopLabel:"Install",
        /*2014-10-14*/
        installOnDeviceText: 'Please install on your device',
    };
    return dictionary;
});