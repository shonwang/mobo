define('english:myapp', function(require, exports, module){
    var dictionary = {
        installAppsLabel: 'Install Apps',
        moveToSdCardLabel: 'Move to SD Card',
        tabAppLabel: 'Apps',
        tabUpdatesLabel: 'Updates',
        tabSystemLabel: 'System',
        moveLabel: 'Move',
        
        appCurrentVersionLabel: 'Current Version:',
        appLatestVersionLabel: 'Latest Version:',
        appLocationLabel: 'Location:',
        appSizeColonLabel: 'Size:',
        ratingColonLabel: 'Rating:',
        
        likeColonLabel: 'You might also like...',
        downloadsText: '{0} downloads',
        updatingText: 'Updating',
        uninstallingText: 'Uninstalling',
        installingText: 'Installing',
        sureUninstallTip: 'Are you sure you want to uninstall selected {0} app(s)?',
        uninstalling: 'Uninstall in process.Please keep your device connected.',
        uninstallSuccessText: 'Success',
        uninsatllFailed:"Uninstall {0} app(s) successful,failed to uninstall {1}:",
        
        exportSuccess:"Exported {0} apps successful.",
        exportFailed:"Export {0} apps successful,failed to export {1}:",
        
        systemMaskText: 'You can manage you system apps after rooting your device.',
        systemMaskCtn: 'Clearing your system apps will free up to 156.3 MB of space.',
        searchResultTitle:'we find {0} app(s)',
        
        /*2014-5-26*/
        deviceTipText : "Device Memory",
        sdCardTipText : "SD Card",
        //06-03
        noapptext:'There are no  apps on your device.',
        noupdatetext:'There are no updatable apps on your device.',
        noappBtnText:'Download Apps',
        //08-13
        moving: 'Moving in process.Please keep your device connected.',
        moveFailed:"Move {0} app(s) successful,failed to move {1}:",
        //08-19
        moveConfirm:"Apps might not work after being moved to SD Card. Are you sure you want to continue?",
        //2014-10-14
        wifiUninstallTitle:"Please complete uninstallation on your phone."
        
    }
    return dictionary;
});