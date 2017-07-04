define('traditionalchinese:backupRestore', function(require, exports, module){
    var dictionary = {
        lastBackupLabel: '上次備份時間： ',
        basicLabel: '基本選項',
        advanceLabel: '高級選項',
        backupCompleted: '備份完成',
        backupProcess: '正在備份中，請不要關閉您的設備',
        viewBackup: '查看備份',
        finish: '完成',
        backtoLabel: "備份至",
        changeLabel: "瀏覧",
        contactLabel: "聯絡人",
        messageLabel: "短訊",
        callRegordsLabel: "通話記錄",
        appLabel: "應用",
        picLabel: "圖片",
        musicLabel: "音樂",
        videoLabel: "影片",

        restoreProcess: '正在還原中，請不要斷開您的設備。',
        restoreLabel: "還原",
        nextLabel: "下一步",
        closeLabel : "關閉",
        restoreFolder: "從自訂文件夾還原",
        selectLabel: "選擇一個要還原的文件： ",
        previousLabel: "上一步",
        //20140531 - add by wangzhisong
        noBackupFile: "沒有找到備份記錄",
        //20140623
        pushBackupLabel: "為了保障您手機的資源安全，請立即備份您手機的數據",
        //2014-7-25
        sureDialogText:"為防止資料遺失，不能同時操作備份和還原功能。"
    };
    return dictionary;
});