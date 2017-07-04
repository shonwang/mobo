define('traditionalchinese:task', function(require, exports, module){
    var dictionary = {
        setingAsWallpaper: '設為桌布',
        setingAsRingtone: '設為鈴聲',
        setRingtoneSuccess: '設為鈴聲成功',
        setRingtoneFailed: '設為鈴聲失敗',
        
        insuficientSpace: '安裝失敗，空間不足。',
        noSdCard: '安裝失敗，找不到SD卡。',
        noSuchSourceFile: '安裝失敗，沒有這個檔案。',
        inValidApkFile: '安裝失敗，無效的APK文件。',
        unknowSourceSetting: '請在設置>應用程式中勾選「不明的來源」',
        installPhoneMemory: '請安裝到手機記憶體中',
        unknownError: '未知錯誤',
        networkErrorText: '網絡錯誤',
        
        waitingText: '等待中',
        pausedText: '已暫停',
        installUnknownError: '安裝失敗，未知錯誤',
        downloadUnknownError: '下載失敗，未知錯誤',
        
        adbConnectionError: '請連接手機進行安裝',
        
        importFileNotExistedText: '導入失敗，源文件不存在',
        importTransferErrorText: '導入失敗，文件傳輸錯誤',
        importInsufficientSpace: '導入失敗，內部儲存空間不足',
        importUnknownError: '導入失敗，未知錯誤',
        importUnConnectError: '請連接手機',
        importFailedNoSdCard: '導入失敗，找不到SD卡',
        installSdkOlderError: '此應用程式與您的設備不兼容',
        installMismatchedCertificateError: 'APK證書不匹配，請先解除安裝此應用程式後再試',
        
        transferringText: '轉移中',
        settedText: '設置於{0}',
        importViaConnectText: '請連接手機',
        
        installFailedText: '安裝失敗',
        
        openFolder:'打開下載文件夾',
        
        downloadInText: '下載於{0}',
        reinstallText: '重新安裝',
        noTaskText: '暫時沒有工作',
        /*6-04*/
        unknowSource2Setting: "安裝失敗，請在設置>安全中勾選“允許未知來源” ",
        unzipAppText: "解壓中",
        transferDataFile: "導入數據包中",
        unzipAppFailedText: "解壓失敗",
        transferAppFailedText: "導入數據包失敗",
        /*7-28*/
        hideTaskTip:"隱藏",
        /*2014-09-25*/
        showInstallPopLabel:"Install",
         /*2014-10-14*/
        installOnDeviceText: '請在您的設備上完成安裝操作',
         /*2014-10-16*/
        pleaseTapInstall:"請在您的設備上點擊「安裝」",
        /*2014-11-10*/
        installSdCard: "安裝至記憶體",
        onlyInstallSdCard: "此應用程式只可以安裝至您的裝置記憶體",
        
         /*2015-1-7yangtian*/
        insufficeient:"磁盤空間不足"
    };
    return dictionary;
});