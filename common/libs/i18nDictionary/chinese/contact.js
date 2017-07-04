define('chinese:contact', function(require, exports, module){
    var dictionary = {
        sideLabel: '联系人',
        message: '短信',
        music: '音乐',
        photo: '图片',
        video: '视频',
        backup: '备份和还原',
        ChangeIcon:'修改',
        MessageRecord:'短信记录',
        Note:'备注',
        Save:'保存',
        Edit:'编辑',
        Cancel:'取消',
        inputhere:'在这里输入',
        ContactSelected:'已选中<span class="contacts-count selectedNum f18">{0}</span>个联系人',
        SendMessage:'发送短信',
        Filter:'筛选',
        AllContacts:'所有联系人',
        AllGroups:'所有分组',
        NewContact:'新建联系人',
        ContactInfomation:'联系方式',
        //add 2014-03-24
        sureDeleteTitle:'您确定要删除已选中的联系人吗？',
        deleteFailed:"删除失败",
        
        importingTitle:'在导入过程中，请不要断开您的设备',
        importHeader:"导入联系人",
        
        exportSuccess:"已成功导出{0}个联系人！",
        exportFailed:"导出失败",
        
        addContactText:'快速添加联系人，搜索电话簿和发送短信。',
        newContact: '新建联系人',
        writeMessage:'填写您的新短信',
        Mobile: '手机',
        //add 2014-04-09
        deletingTitle:'删除的过程中，请不要断开您的设备',
        //2014-5-26
        addTipText:"新建",
        accountLabel:"账号：",
        emptyContact:"您的手机里没有联系人",
        //2014-05-29
        deleteTipText:"删除",
        smsTipText:"发送短信",
        
        importFailed:"已成功导入{0}个联系人，失败{1}个",
        exportHeader:"导出联系人",
        exportAll:"导出所有联系人 ({0})",
        exportSelect:"导出选中联系人 ({0})",
        //2014-06-03
        editgroup:"编辑分组",
        notassigened:"未分组",
        saveFailed:'联系人修改失败，请稍后重试',
        //2014-06-11
        fileError:'无效文件',
        groupText:'分组',
        /*2014-07-22*/
       contactPermissionNotice:"可能是权限管理应用阻止了联系人的访问权限. 请在[权限管理]中允许此权限",
       //2014-08-18 保存分组失败
       saveGroupFailed:'Failed to save group. Please try later.',
    };
    return dictionary;
});
