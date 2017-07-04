define('traditionalchinese:contact', function(require, exports, module){
    var dictionary = {
        sideLabel: '聯絡人',
        message: '短訊',
        music: '音樂',
        photo: '圖片',
        video: '影片',
        backup: '備份和還原',
        ChangeIcon:'修改',
        MessageRecord:'短訊記錄',
        Note:'備註',
        Save:'儲存',
        Edit:'編輯',
        Cancel:'取消',
        inputhere:'在這裡輸入',
        ContactSelected:'已選擇<span class="contacts-count selectedNum f18">{0}</span>個聯絡人',
        SendMessage:'發送短訊',
        Filter:'篩選',
        AllContacts:'所有聯絡人',
        AllGroups:'所有分組',
        NewContact:'新建聯絡人',
        ContactInfomation:'聯繫方式',
        //add 2014-03-24
        sureDeleteTitle:'您確定要删除已選擇的{0}個聯絡人嗎？',
        deleteFailed:"删除失敗",
        
        importingTitle:'在導入過程中，請不要中斷您的設備',
        importHeader:"導入聯絡人",
        
        exportSuccess:"已成功導出{0}個聯絡人！",
        exportFailed:"導出失敗",
        
        addContactText:'快速添加聯絡人，搜尋電話簿和發送短訊。',
        newContact: '建立新聯絡人',
        writeMessage:'填寫您的新短訊',
        Mobile: '手機',
        //add 2014-04-09
        deletingTitle:'删除的过程中，请不要断开您的设备',
        //2014-5-26
        addTipText:"新增",
        accountLabel:"帳號：",
        emptyContact:"您的手機裡沒有聯絡人",
        //2014-05-29
        deleteTipText:"删除",
        smsTipText:"發送短訊",
        
        importFailed:"已成功導入{0}個聯絡人，失敗{1}個",
        exportHeader:"導出聯絡人",
        exportAll:"導出所有聯絡人 ({0})",
        exportSelect:"導出選擇聯絡人 ({0})",
        //2014-06-03
        editgroup:"編輯分組",
        notassigened:"未分組",
        saveFailed:'聯絡人修改失敗，請稍候重試',
        //2014-06-11
        fileError:'文件無效',
        groupText:'分組',
        
        /*2014-07-22*/
       contactPermissionNotice:"聯絡權限可能已由某個安全性應用程式封鎖。請在 [權限管理] 中允許開放權限",
       //2014-08-18 保存分组失败
       saveGroupFailed:'群組儲存失敗，請稍候再試'

    };
    return dictionary;
});
