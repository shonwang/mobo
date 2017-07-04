define('vietna:image', function(require, exports, module){
    var dictionary = {
    	importPicture: 'Nhập hình ảnh',/*不超过28个字符*/
    	gallery: 'Bộ sưu tập',/*不超过24个字符*/
    	wallpapers: 'Hình nền',/*不超过24个字符*/
    	others:'Khác',/*不超过24个字符*/
    	date:'Ngày',
        sureDeleteText : "Bạn có chắc muốn xóa{0} hình đã chọn?",
        deleteSuccessText: 'Xóa thành công',
        deleteFailed:"Xóa thành công {0}hình, xóa thất bại{1}:",
        setWallpaper: 'Cài làm hình nền',
        
        exportSuccess:"Xuất thành công {0} hình.",
        exportFailed:"Xuất thành công {0}hình, xuất thất bại{1}:",
        setWallpaperSuccess: 'Cài làm hình nền thành công',
        setWallpaperFailed: 'Cài làm hình nền thất bại',
        /*201405-27*/
        rotateLeftText:"Xoay trái",
        rotateRightText:"Xoay phải",
        noImagesText:"Không có ảnh nào trong máy.",
        downloadImage:"Tải về Hình nền",
        
        /*2014-07-16*/
        previewLabel:"Xem trước"
    };
    return dictionary;
});