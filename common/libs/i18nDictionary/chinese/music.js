define('chinese:music', function(require, exports, module){
    var dictionary = {
        ImportMusic: '导入音乐',
        Artist:'艺术家',
        Time:'日期',
        Format:'格式',
        emptyMusicLabel:"暂时没有音乐",
        gotoRingtonesLabel: '去下载铃声',
        
        exportSuccess:"成功导出{0}首音乐！",
        exportFailed:"成功导出{0}首音乐，失败{1}首：",
        
        sureDelete : "您确定要删除已选中的{0}首音乐？",
        deleteSuccess:"删除成功！",
        deleteFailed:"成功删除{0}首音乐，失败{1}首：",
        //add 2014-04-02
        setringtoneSuccess:'设为铃声成功！',
        setsmsSuccess:'设为提示音成功',
        setalarmSuccess:'设为闹钟成功',
        setFailed:'设置失败',
        //add 2014-04-16
        cancelringtone:'取消设为铃声成功',
        cancelsetsms:'取消设为提示音成功',
        cancelsetalarm:'取消设为闹钟成功',
        //add 2014-04-28
        formaterror:"不支持此格式",
         //add 2014-05-14
        setasringtone:"设为铃声",
        setasnotification:"设为短信铃声",
        setasalarm:"设为闹钟",
        /*2014-5-26*/
        stop:"停止",
        /*2014-09-10*/
       musicnotexist:"Music not exist"
    };
    return dictionary;
});
