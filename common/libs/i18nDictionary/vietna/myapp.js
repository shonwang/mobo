define('vietna:myapp', function(require, exports, module){
    var dictionary = {
        installAppsLabel: 'Cài đặt ứng dụng',/*不超过18个字符*/
        moveToSdCardLabel: 'Chuyển sang thẻ SD',/*不超过30个字符*/
        tabAppLabel: 'Ứng dụng',/*不超过24个字符*/
        tabUpdatesLabel: 'Cập nhật',/*不超过24个字符*/
        tabSystemLabel: 'Hệ thống',/*不超过24个字符*/
        moveLabel: 'Di chuyển',
        
        appCurrentVersionLabel: 'Phiên bản hiện tại:',/*不超过22个字符*/
        appLatestVersionLabel: 'Phiên bản mới nhất:',/*不超过22个字符*/
        appLocationLabel: 'Vị trí:',/*不超过20个字符*/
        appSizeColonLabel: 'Kích thước:',/*不超过22个字符*/
        ratingColonLabel: 'Đánh giá:',
        
        likeColonLabel: 'Bạn cũng có thể thích...',/*不超过45个字符*/
        downloadsText: '{0} ứng dụng tải xuống',
        updatingText: 'Đang cập nhật',/*不超过45个字符*/
        uninstallingText: 'Đang gỡ cài đặt',/*不超过12个字符*/
        installingText: 'Đang cài đặt',
        sureUninstallTip: 'Bạn có chắc muốn gỡ bỏ {0} ứng dụng đã chọn?',
        uninstalling: 'Đang gỡ. Vui lòng không ngắt kết nối.',
        uninstallSuccessText: 'Thành công',
        uninsatllFailed:"Gỡ thành công{0} ứng dụng, gỡ thất bại {1}:",
        
        exportSuccess:"Đã xuất thành công{0} ứng dụng.",
        exportFailed:"Xuất thành công{0} ứng dụng,xuất thất bại {1}:",
        
        systemMaskText: 'Bạn có thể quản lý các ứng dụng hệ thống sau khi root thiết bị của bạn.',
        systemMaskCtn: 'Xóa các ứng dụng hệ thống sẽ giải phóng 156.3 MB bộ nhớ   ',
        searchResultTitle:' Tìm thấy {0} ứng dụng',
        /*2014-5-26*/
        deviceTipText : "Bộ nhớ thiết bị",
        sdCardTipText : "Thẻ SD ",
        //06-03
        noapptext:'Không có ứng dụng nào trong máy.',
        noupdatetext:'Không có ứng dụng nào cần cập nhật',
        /*2014-6-18*/
        noappBtnText:'Tải ứng dụng',
        //08-13
        moving: 'Đang chuyển. Hãy giữ kết nối với thiết bị.',
        moveFailed:"Di chuyển {0} ứng dụng thành công, di chuyển thất bại {1}:",
        //08-19
        moveConfirm:"Ứng dụng có thể không chạy sau khi chuyển qua thẻ SD. Bạn có chắc muốn tiếp tục?",
        //2014-10-14
        wifiUninstallTitle:"Hãy hoàn tất việc gỡ cài đặt trên điện thoại."
    }
    return dictionary;
});