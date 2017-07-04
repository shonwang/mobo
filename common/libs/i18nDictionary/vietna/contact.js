define('vietna:contact', function(require, exports, module){
    var dictionary = {
        sideLabel: 'Liên lạc',
        message: 'Tin nhắn',
        music: 'Nhạc của tôi',
        photo: 'Ảnh của tôi',
        video: 'Video của tôi',
        backup: 'Sao lưu & Khôi phục',
        ChangeIcon:'Thay đổi',
        MessageRecord:'Lịch sử tin nhắn',
        Note:'Ghi chú',
        Save:'Lưu',
        Edit:'Chỉnh sửa',
        Cancel:'Hủy',
        inputhere:'Nhập ở đây',
        ContactSelected:'<span class="contacts-count selectedNum f18">{0}</span> Liên lạc đã chọn',
        SendMessage:'Gửi tin nhắn',
        Filter:'Bộ lọc',
        AllContacts:'Tất cả liên lạc',
        AllGroups:'Tất cả các nhóm',
        NewContact:'Liên lạc mới',
        ContactInfomation:'Thông tin liên lạc',
        //add 2014-03-24
        sureDeleteTitle:'Bạn có chắc bạn muốn xóa {0} liên lạc?',
        deleteFailed:"Xóa thất bại.",
        
        importingTitle:'Đang nhập, xin giữ kết nối',
        importHeader:"Nhập liên lạc ",
        
        exportSuccess:"Xuất {0} liên lạc thành công.",
        exportFailed:"Xuất thất bại.",
        
        addContactText:'Thêm liên lạc, tìm kiếm danh bạ và gửi tin nhắn. ',
        newContact: 'Liên lạc mới',
        writeMessage:'Viết tin nhắn ở đây...',
        Mobile: 'Di động',
        //add 2014-04-09
        deletingTitle:'Đang xóa, xin giữ kết nối',
        //2014-5-26
        addTipText:"Thêm",
        accountLabel:"Tài khoản: ",
        emptyContact:"Thưa chủ nhân, không có liên lạc nào trong điện thoại",
        //2014-05-29
        deleteTipText:"Xóa",
        smsTipText:"SMS",
        
        importFailed:"Nhập thành công {0} liên lạc,nhập thất bại {1}",
        exportHeader:"Xuất liên lạc",
        exportAll:"Tất cả liên lạc <em class='c-9'>({0})</em>",
        exportSelect:"Liên lạc đã chọn <em class='c-9'>({0})</em>",
        //2014-06-03
        editgroup:"Chỉnh sửa Nhóm",
        notassigened:"Chưa phân loại",
        saveFailed:'Lưu liên lạc thất bại. Vui lòng thử lại sau.',
        //2014-06-11
        fileError:'Thất bại. File vcf không hợp lệ',
        groupText:'Nhóm',
        
        /*2014-07-22*/
       contactPermissionNotice:"Quyền liên lạc có thể bị chặn bởi một ứng dụng bảo mật. Vui lòng cấp quyền trong [Quản lý quyền]",
       //2014-08-18 保存分组失败
         saveGroupFailed:'Lưu nhóm thất bại. Hãy thử lại sau.'
    };
    return dictionary;
});
