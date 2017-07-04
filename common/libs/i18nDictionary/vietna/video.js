define('vietna:video', function(require, exports, module){
    var dictionary = {
        importVideo: 'Nhập Video',/*不超过28个字符*/
        exportSuccess:"Đã xuất thành công {0} video.",
        exportFailed:"Xuất thành công {0} video, xuất thất bại {1}:",
        promptDelete: 'Bạn có chắc muốn xóa {0} video đã chọn?',
        deleteFailed:"Xóa thành công{0} video ,xóa thất bại{1}:",
        promptPlayTitle: 'Chuẩn bị phát video',
        promptPlay: 'Đang tải...',
        emptyVideoLabel: 'Không có video nào trong thiết bị của bạn.',
        gotoYouTubeLabel: 'Tải video',
        promptInvaildPath: 'Đường dẫn không hợp lệ.',
        playLabel: 'Phát',
        promptImportTips: "Android chỉ hỗ trợ định dạng .avi, .3gp, .mp4, và .m4v. Hệ thống có thể sẽ không nhận những video có định dạng khác.",
        promptFullDisk:"Không đủ bộ nhớ trên ổ C. Vui lòng giải phóng thêm bộ nhớ trước khi phát video.",
    };
    return dictionary;
});