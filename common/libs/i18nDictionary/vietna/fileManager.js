/**
 * @author liujintao
 */
define('vietna:fileManager', function(require, exports, module){
    var dictionary = {
        ImportFile: 'Nhập file',
        ImportDirectory: 'Nhập thư mục',
        sureDelete : "Bạn muốn xóa file/thư mục đã chọn?",
        
        exportingTitle:"Đang xuất, hãy giữ kết nối với thiết bị",
        deletingTitle:"Đang xóa, hãy giữ kết nối với thiết bị",
        /*2014-07-26*/
        copingTitle:"Hãy giữ kết nối với thiết bị",
        copySuccess:"Sao chép file thành công",
        sdCard:'Bộ nhớ máy',
        extSdCard:'Thẻ SD',
        pasteLabel:"Dán",
        newFolder:"Thư mục mới",
        /*2014-08-04*/
       selectMultiInfo:"{0} Thư mục, {1} file đã chọn",
       selectDirectoryInfo:"{0} thư mục, {1} file ",
       sdCardUsage:"Tổng: {0}, Có sẵn: {1}",
       sizeLabel:"Kích cỡ: {0}",
       modifiedTime:"Thời gian chỉnh sửa: {0}",
       /*2014-08-08*/
       importingTitle:'Đang nhập, hãy giữ kết nối với thiết bị',
	   /*2014-08-11*/
       noSdCardNotice:'Không thể đọc thẻ SD, hãy chắc chắn thẻ SD đã sẵn sàng trên thiết bị của bạn.',
       confirmFileReplace:'{0} đã có.Bạn muốn thay thế?',
       /*2014-08-18*/
      deleteFailed:"Xóa {0} file/thư mục thành công, xóa thất bại{1}:",
       importFailed:"Nhập {0} file/thư mục thành công, nhập thất bại {1}:",
	   createFolderFailed:"Tạo thư mục thất bại",
       exportFailed:"Xuất {0} file/thư mục thành công, xuất thất bại {1}:",
       copyFailed:"Sao chép{0} file/thư mục thành công, sao chép thất bại {1}:",
       /*2014-08-21*/
      renameFailed:"Đổi tên thất bại",
      spaceFailed:"Failed. Không đủ bộ nhớ.",
      nosdcontent:"Thư mục trống",
       /*2014-09-11*/
       specailCharNotice:'Những ký tự sau không được phép có trong tên thư mục:|/\:*?"<>',//重命名
       renameRepeatNotice:'Thư mục tên [{0}] đã tồn tại. Vui lòng đổi tên khác.',//重命名已存在
       renameLabel:"Đổi tên",
       openingTitle:'Đang mở. Vui lòng giữ điện thoại kết nối', 
       fileExtChangeNotice:'Nếu bạn đổi đuôi của tên tập tin, tập tin có thể trở không còn sử dụng được. Bạn có chắc chắn muốn đổi nó không?',//后缀变更
       openHeader:"Mở tập tin",
       openingFailed:"Không mở được tập tin",      
       /*2014-10-15*/
      cMemoryLess:"Không đủ dung lượng trên ổ C. Hãy giải phóng một ít dung lượng trước khi mở video, nhạc,..."      
    };
    return dictionary;
});