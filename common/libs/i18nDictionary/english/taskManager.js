define('english:task', function(require, exports, module){
    var dictionary = {
        setingAsWallpaper: 'Setting as wallpaper...',
        setingAsRingtone: 'Setting as ringtone...',
        setRingtoneSuccess: 'Set ringtone succeed',
        setRingtoneFailed: 'Set ringtone failed',
        
        insuficientSpace: 'Install failed. Insufficient space',
        noSdCard: 'Install failed. No SD card',
        noSuchSourceFile: 'Install failed. No such file',
        inValidApkFile: 'Install failed. Invalid apk file',
        unknowSourceSetting: 'Install failed. Please check “Unknown sources” in Settings > Applications',
        installPhoneMemory: 'Please install to Memory',
        unknownError: 'Unknown error',
        networkErrorText: 'Network error',
        
        waitingText: 'Waiting',
        pausedText: 'Paused',
        installUnknownError: 'Install failed. Unknown error',
        downloadUnknownError: 'Download failed. Unknown error',
        
        adbConnectionError: 'Connect device to install',
        
        importFileNotExistedText: 'Import failed. File does not exist',
        importTransferErrorText: 'Import failed. File transfer error',
        importInsufficientSpace: 'Import failed. Insufficient space',
        importUnknownError: 'Import failed. Unknown error',
        importUnConnectError: 'Connect device to import',
        importFailedNoSdCard: 'Import failed. No SD card',
        installSdkOlderError: 'Incompatible with your device',
        installMismatchedCertificateError: 'APK certificate mismatch. Please uninstall the current application before installing',
        
        transferringText: 'Transferring',
        settedText: 'Set in {0}',
        importViaConnectText: 'Connect device to import',
        
        installFailedText: 'Install failed',
        
        openFolder:'Open downloads folder',
        
        downloadInText: 'Downloaded in {0}',
        reinstallText: 'Reinstall',
        noTaskText: 'There are no tasks here.',
        /*6-04*/
        unknowSource2Setting: "Install failed. Please check “Unknown sources” in Settings > Security",
        
        unzipAppText: "Extracting data file",
        transferDataFile: "Transferring data file",
        unzipAppFailedText: "Failed to extract data file",
        transferAppFailedText: "Failed to transfer data file",
        /*7-28*/
        hideTaskTip:"Hide",
        /*2014-09-25*/
        showInstallPopLabel:"Install",
        /*2014-10-14*/
        installOnDeviceText: 'Please complete installation on your device.',
         /*2014-10-16*/
        pleaseTapInstall:"Please click 'Install' on your device.",
        /*2014-11-10*/
        installSdCard: "Install to RAM",
        onlyInstallSdCard: "This app can only be installed to your device's RAM.",
        
        /*2015-1-7yangtian*/
        insufficeient:"Low disk space"
       
    };
    return dictionary;
});