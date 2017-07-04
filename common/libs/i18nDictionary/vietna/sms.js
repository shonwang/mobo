define('vietna:sms', function(require, exports, module){
    var dictionary = {
       sendTo: 'Gửi tới',
        characters: 'Ký tự',
        pressCE: 'Nhấn Ctrl+Enter để gửi',
        writeMessage: 'Viết tin nhắn ở đây.',
        send: 'Gửi',
        allGroup: 'Tất cả nhóm',
        selectAll: 'Chọn TẤT CẢ',
        removeAll: 'Bỏ TẤT CẢ',
        emptyInfo:'Gửi tin nhắn cho bạn bè.',
        newMessage: 'Tin nhắn mới',
        msgSelected: '{0} Tin nhắn được chọn',
        promptDelete: 'Bạn muốn xóa {0} tin nhắn được chọn?',
        importLable: "Nhập",
        exportLabel: "Xuất",
        deleteLabel: "Xóa",
        refreshLabel: "Tải lại",
        addContact: "Thêm liên lạc",
        editContact: "Chỉnh sửa liên lạc",
        loadMore: "Tải thêm",
        /*2014-5-30*/
       	contacts: '{0} Liên lạc được chọn',
        contactName:"Tên hoặc số điện thoại của liên lạc",

        selectedMsgLabel: "Tin nhắn được chọn ({0})",
        allMsgLabel: "Tất cả tin nhắn ({0})",

        exportSuccess:"Xuất thành công {0} tin nhắn.",
        exportFailed:"Xuất thành công {0} tin nhắn,xuất thất bại {1}:",
         /*2014-5-31*/
        deleteFailed:"Xóa thành công {0} tin nhắn  , xóa thất bại {1}: ",
        /*2014-6-18*/
        markasRead:"Đánh dấu đã đọc",
        /*2014-07-22*/
       smsPermissionNotice:"Quyền SMS có thể bị chặn bởi một ứng dụng bảo mật. Vui lòng cấp quyền trong [Quản lý quyền]",
       emptySMS:"Không có tin nhắn trên thiết bị của bạn.",
    };
    return dictionary;
});
