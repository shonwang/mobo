define('traditionalchinese:music', function(require, exports, module){
    var dictionary = {
        ImportMusic: '導入音樂',
        Artist:'演出者',
        Time:'日期',
        Format:'格式',
        emptyMusicLabel:"没有找到音樂",
        gotoRingtonesLabel: '前去下載鈴聲',
        
        exportSuccess:"成功導出{0}首音樂！",
        exportFailed:"成功導出{0}首音樂，{1}首失敗：",
        
        sureDelete : "您確定要删除已選取的{0}首音樂？",
        deleteSuccess:"删除成功！",
        deleteFailed:"成功删除{0}首音樂，{1}首失敗：",
        //add 2014-04-02
        setringtoneSuccess:'鈴聲設定成功',
        setsmsSuccess:'短訊鈴聲設定成功',
        setalarmSuccess:'鬧鐘設定成功',
        setFailed:'設置失敗',
        //add 2014-04-16
        cancelringtone:'成功取消鈴聲設定',
        cancelsetsms:'成功取消短訊鈴聲設定',
        cancelsetalarm:'成功取消鬧鐘設定',
        //add 2014-04-28
        formaterror:"不支持此格式",
         //add 2014-05-14
        setasringtone:"設為鈴聲",
        setasnotification:"設為短訊鈴聲",
        setasalarm:"設為鬧鐘",
        /*2014-5-26*/
        stop:"停止",
        /*2014-09-10*/
       musicnotexist:"沒有音樂存在"
    };
    return dictionary;
});
