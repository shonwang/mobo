define('english:backupRestore', function(require, exports, module){
    var dictionary = {
        lastBackupLabel: 'Last backup: ',
        basicLabel: 'Basic',
        advanceLabel: 'Advanced',
        backupCompleted: 'Backup Completed',
        backupProcess: 'Backup in progress... Please keep your device connected.',
        viewBackup: 'View backup',
        finish: 'Finish',
        backtoLabel: "Backup to: ",
        changeLabel: "Change",
        contactLabel: "Contacts",
        messageLabel: "Messages",
        callRegordsLabel: "Call regords",
        appLabel: "Applications",
        picLabel: "Pictures",
        musicLabel: "Music",
        videoLabel: "Videos",

        restoreProcess: 'Restore in progress... Please keep your device connected.',
        restoreLabel: "Restore",
        nextLabel: "Next",
        closeLabel : "Close",
        restoreFolder: "Restore from customized folder",
        selectLabel: "Select a file to restore: ",
        previousLabel: "Previous",

        //20140531 - add by wangzhisong
        noBackupFile: "No backup files found.",
        //20140623
        pushBackupLabel: "Back up your device now to secure your personal information.",
        //2014-7-25
        sureDialogText:"To prevent data loss, Backup and Restore cannot be operated simultaneously."
    };
    return dictionary;
});