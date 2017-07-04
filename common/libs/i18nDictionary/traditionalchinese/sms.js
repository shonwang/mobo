define('traditionalchinese:sms', function(require, exports, module){
    var dictionary = {
        sendTo: '發送至',
        characters: '字符',
        pressCE: '按Ctrl + Enter鍵發送',
        writeMessage: '填寫短訊内容',
        send: '發送',
        allGroup: '所有群组',
        selectAll: '全選',
        removeAll: '全部删除',
        emptyInfo:'發送短訊给您的朋友',
        newMessage: '新短訊',
        msgSelected: '已選取{0}條短訊',
        promptDelete: '您確定要删除選取的{0}個會話（{1}條短訊）嗎？',
        importLable: "導入",
        exportLabel: "導出",
        deleteLabel: "删除",
        refreshLabel: "重新整理",
        addContact: "新增聯絡人",
        editContact: "編輯聯絡人",
        loadMore: "載入更多",
        /*2014-5-30*/
       	contacts: '已選取{0}個聯絡人',
        contactName:"聯絡人姓名或電話",

        selectedMsgLabel: "已選取的短訊({0})",
        allMsgLabel: "全部短訊({0})",

        exportSuccess:"成功導出{0}條短訊。",
        exportFailed:"成功導出{0}條短訊，失敗{1}條: ",
        /*2014-5-31*/
        deleteFailed:"成功删除{0}條短訊，失敗{1}條: ",
        /*2014-6-18*/
        markasRead:"標記已讀",
        /*2014-07-22*/
       smsPermissionNotice:"SMS 權限可能已由某個安全性應用程式封鎖。請在 [權限管理] 中允許開放權限",
       emptySMS:"您的裝置上沒有任何訊息。",
    };
    return dictionary;
});
