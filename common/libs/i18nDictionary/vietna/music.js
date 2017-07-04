define('vietna:music', function(require, exports, module){
    var dictionary = {
        ImportMusic: 'Nhập bài hát',/*不超过28个字符*/
        Artist:'Nghệ sĩ',/*不超过20个字符*/
        Time:'Thời gian',/*不超过12个字符*/
        Format:'Định dạng',/*不超过10个字符*/
        emptyMusicLabel:"Không có bài hát nào trong thiết bị của bạn.",/*不超过11个字符*/
        gotoRingtonesLabel: 'Tải nhạc chuông',/*不超过35个字符*/
        
        exportSuccess:"Xuất thành công {0} bài.",
        exportFailed:"Xuất thành công{0} bài, xuất thất bại {1} bài:",
        
        sureDelete : "Bạn có chắc muốn xóa {0} bài hát đã chọn?",
        deleteSuccess:"Xóa thành công.",
        deleteFailed:"Xóa thành công 0} bài, xóa thất bại{1}:",
        //add 2014-04-02
        setringtoneSuccess:'Cài làm nhạc chuông thành công',
        setsmsSuccess:'Cài làm âm cảnh báo thành công',
        setalarmSuccess:'Cài làm chuông báo thức thành công',
        setFailed:'Cài đặt thất bại',
        //add 2014-04-16
        cancelringtone:'Hủy nhạc chuông thành công',
        cancelsetsms:'Hủy âm cảnh báo thành công',
        cancelsetalarm:'Hủy chuông báo thức thành công',
        //add 2014-04-28
        formaterror:"Định dạng này không được hỗ trợ",
        //add 2014-05-14
        setasringtone:"Cài làm nhạc chuông",
        setasnotification:"Cài làm cảnh báo",
        setasalarm:"Cài làm chuông báo thức",
        /*2014-5-26*/
        stop:"Dừng",
        /*2014-09-10*/
       musicnotexist:"Nhạc không tồn tại"
    };
    return dictionary;
});
