define('vietna:task', function(require, exports, module){
    var dictionary = {
        setingAsWallpaper: 'Cài làm hình nền...',
        setingAsRingtone: 'Cài làm nhạc chuông...',
        setRingtoneSuccess: 'Cài nhạc chuông thành công',
        setRingtoneFailed: 'Cài nhạc chuông thất bại',
        
        insuficientSpace: 'Cài đặt thất bại. Không đủ bộ nhớ',
        noSdCard: 'Cài đặt thất bại. Không có thẻ SD',
        noSuchSourceFile: 'Cài đặt thất bại. Không có tập tin như vậy',
        inValidApkFile: 'Cài đặt thất bại. apk không hợp lệ',
        unknowSourceSetting: 'Cài đặt thất bại. Vui lòng chọn “Nguồn không xác định” trong Cài đặt > Ứng dụng',
        installPhoneMemory: 'Hãy cài đặt vào bộ nhớ,',
        unknownError: 'Lỗi không xác định',
        networkErrorText: 'Lỗi mạng', 
        
        waitingText: 'Đang chờ',/*不超过56个字符*/
        pausedText: 'Dừng',/*不超过24个字符*/
        installUnknownError: 'Cài đặt thất bại. Lỗi không xác định',
        downloadUnknownError: 'Cài đặt thất bại. Lỗi không xác định',
        
        adbConnectionError: 'Kết nối điện thoại để cài đặt',
        
        importFileNotExistedText: 'Nhập thất bại. Tập tin không tồn tại',
        importTransferErrorText: 'Nhập thất bại. Lỗi chuyển tập tin',
        importInsufficientSpace: 'Nhập thất bại. Không đủ bộ nhớ',
        importUnknownError: 'Nhập thất bại. Lỗi không xác định',
        importUnConnectError: 'Kết nối thiết bị để nhập',
        importFailedNoSdCard: 'Nhập thất bại. Không có thẻ SD',
        installSdkOlderError: 'Không tương thích với thiết bị của bạn',
        installMismatchedCertificateError: 'Chứng nhận Apk không phù hợp. Xin vui lòng gỡ bỏ ứng dụng hiện tại trước khi cài đặt',
        
        transferringText: 'Đang chuyển',/*不超过55个字符*/
        settedText: 'Cài trong {0}',
        importViaConnectText: 'Kết nối thiết bị để nhập ',
        
        installFailedText: 'Cài đặt thất bại',
        
        openFolder:'Mở thư mục tải ',
        
        downloadInText: 'Tải về trong{0}',
        reinstallText: 'Cài đặt lại',/*不超过15个字符*/
        noTaskText: 'Không có nhiệm vụ nào ở đây.',
         /*6-04*/
        unknowSource2Setting: "Cài đặt thất bại. Vui lòng chọn “Nguồn không xác định” trong cài đặt > Bảo mật",
        
        unzipAppText:"Đang tách file dữ liệu ",
        transferDataFile:"Đang chuyển file dữ liệu",
        unzipAppFailedText:"Tách file dữ liệu thất bại",
        transferAppFailedText:"Chuyển file dữ liệu thất bại",
        /*7-28*/
        hideTaskTip:"Ẩn",
        /*2014-09-25*/
        showInstallPopLabel:"Install",
        /*2014-10-14*/
        installOnDeviceText: 'Hãy hoàn tất cài đặt trên thiết bị của bạn.',
         /*2014-10-16*/
        pleaseTapInstall:"Hãy bấm 'Cài đặt' trên thiết bị.",
        /*2014-11-10*/
        installSdCard: "Cài đặt vào RAM",
        onlyInstallSdCard: "Ứng dụng này chỉ có thể được cài đặt vào RAM của thiết bị.",
        
        /*2015-1-7yangtian*/
        insufficeient:"Không gian đĩa thấp"
    };
    return dictionary;
});