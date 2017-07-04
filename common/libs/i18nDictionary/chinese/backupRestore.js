define('chinese:backupRestore', function(require, exports, module){
    var dictionary = {
        lastBackupLabel: '上次备份时间： ',
        basicLabel: '基本选项',
        advanceLabel: '高级选项',
        backupCompleted: '备份完成',
        backupProcess: '正在备份中，请不要断开您的设备',
        viewBackup: '查看备份',
        finish: '完成',
        backtoLabel: "备份至",
        changeLabel: "浏览",
        contactLabel: "联系人",
        messageLabel: "短信",
        callRegordsLabel: "通话记录",
        appLabel: "应用",
        picLabel: "图片",
        musicLabel: "音乐",
        videoLabel: "视频",

        restoreProcess: '在还原过程中，请不要断开您的设备',
        restoreLabel: "还原",
        nextLabel: "下一步",
        closeLabel : "关闭",
        restoreFolder: "从自定义文件夹还原",
        selectLabel: "选择一个要还原的文件： ",
        previousLabel: "上一步",
        //20140531 - add by wangzhisong
        noBackupFile: "没有找到备份记录",
        //20140623
        pushBackupLabel: "为了保障您手机的资源安全，请立即备份您手机的数据",
        //2014-7-25
        sureDialogText:"为保障您的数据安全，请不要同时进行备份和还原操作。"
    };
    return dictionary;
});