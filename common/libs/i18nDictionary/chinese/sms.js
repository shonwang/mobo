define('chinese:sms', function(require, exports, module){
    var dictionary = {
        sendTo: '发送至',
        characters: '字符',
        pressCE: '按Ctrl + Enter键发送',
        writeMessage: '填写短信内容',
        send: '发送',
        allGroup: '所有组',
        selectAll: '全选',
        removeAll: '全部删除',
        emptyInfo:'发送短信给你的朋友',
        newMessage: '新短信',
        msgSelected: '{0}选中短信',
        promptDelete: '您确定要删除选中的{0}个会话（{1}条短信）吗？',
        importLable: "导入",
        exportLabel: "导出",
        deleteLabel: "删除",
        refreshLabel: "刷新",
        addContact: "添加联系人",
        editContact: "编辑联系人",
        loadMore: "加载更多",
        /*2014-5-30*/
       	contacts: '{0}已选中的联系人',
        contactName:"联系人姓名或电话",

        selectedMsgLabel: "已选中的短信({0})",
        allMsgLabel: "全部短信({0})",

        exportSuccess:"成功导出{0}条短信。",
        exportFailed:"成功导出{0}条短信，失败{1}条: ",
        /*2014-5-31*/
        deleteFailed:"成功删除{0}条短信，失败{1}条: ",
        /*2014-6-18*/
        markasRead:"标记已读",
        /*2014-07-22*/
       smsPermissionNotice:"可能是权限管理应用阻止了短信的访问权限. 请在[权限管理]中允许此权限",
       emptySMS:"您的手机里没有短信",
    };
    return dictionary;
});
