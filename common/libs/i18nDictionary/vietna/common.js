define('vietna:common', function(require, exports, module){
    var dictionary = {
        connectingText: 'Đang kết nối',/*不超过16个字符*/
        
        homeLabel: 'Trang chủ',/*不超过14个字符*/
        appLabel: 'Ứng dụng',/*不超过14个字符*/
        gamesLabel: 'Trò chơi',/*不超过14个字符*/
        ringtonesLabel: 'Nhạc chuông',/*不超过14个字符*/
        wallPaperLabel: 'Hình nền',/*不超过14个字符*/
        youTubeLabel: 'YouTube',/*不超过14个字符*/
        moreLabel: 'Khác',/*不超过14个字符*/
        toolsLabel: 'Bộ công cụ',/*不超过14个字符*/
        safetyLabel: 'An toàn',/*不超过14个字符*/
        contactLabel: 'Danh bạ',/*不超过14个字符*/
        smsLabel: 'Tin nhắn',/*不超过14个字符*/
        myAppLabel: 'Ứng dụng',/*不超过14个字符*/
        myMusicLabel: 'Nhạc',/*不超过14个字符*/
        myPictureLabel: 'Hình ảnh',/*不超过14个字符*/
        myVideoLabel: 'Video',/*不超过14个字符*/
        Import:'Nhập',/*不超过16个字符*/
        Export:'Xuất',/*不超过16个字符*/
        Delete:'Xóa',
        Refresh:'Tải lại',
        updateAllLabel: 'Cập nhật tất cả',/*不超过16个字符*/
        updateLabel: 'Cập nhật',/*不超过12个字符*/
        uninstallLabel: 'Gỡ cài đặt',/*不超过16个字符*/
        deviceText: 'Thiết bị',/*不超过12个字符*/
        phoneText: 'Điện thoại',
        memoryText: 'Bộ nhớ',/*不超过12个字符*/
        installLabel: 'Cài đặt',/*不超过12个字符*/
        sizeLabel: 'Kích cỡ',
        nameLabel: 'Tên',
        locationLabel: 'Vị trí',
        actionLabel: 'Thực hiện',
        selectAllLabel: 'Chọn tất cả',/*不超过30个字符*/
        downloadAllLabel: 'Tải về tất cả',/*不超过24个字符*/
        downloadingText: 'Đang tải',/*不超过24个字符*/
        redownloadText: 'Tải lại',
        downloadLabel: "Tải xuống",
        
        successText: 'Thành công',
        installedInText: 'Đã cài đặt trong{0}',/*不超过45个字符*/
        ImportingText: 'Đang nhập',/*不超过55个字符*/
        setWallpaperFailed: 'Cài đặt hình nền thất bại',
        importedInText: 'Nhập trong {0}',/*不超过45个字符*/
        retryText: 'Thử lại',/*不超过15个字符*/
        pauseText: 'Tạm ngưng',/*不超过15个字符*/
        continueText: 'Tiếp tục',/*不超过15个字符*/
        inProcessingTaskText: 'Đang thực hiện',
        completedText: 'Hoàn tất',
        noTaskText: 'Không có tác vụ nào đang thực hiện',/*不超过18个字符*/
        
        captureLabel: 'Thu hút',/*不超过24个字符*/
        featureText: 'Không thể bỏ qua',/*不超过24个字符*/
        countTasksText: '{0} tác vụ',/*不超过15个字符*/
        
        updateTipText: 'Bạn đã có phiên bản mới nhất của{0} ứng dụng.',/*不超过65个字符*/
        rootTipText: 'Thiết bị di động của bạn vẫn chưa được root. Root thiết bị sẽ cho phép bạn cài đặt bất kỳ ứng dụng nào bạn muốn,',
        oneClickRootLabel: 'Root ngay',
        shareMobogenieText: 'Chia sẻ Mobogenie trên',/*不超过65个字符*/
        
        tipLabel: 'Hướng dẫn',
        confirmLabel:'Xác nhận',
        okLabel : 'OK',
        yesLabel : 'Đồng ý',
        cancelLabel:'Hủy',
        closeLabel : 'Đóng',
        failedLabel : 'Thất bại',
        exportSuccess:'Xuất thành công',
        
        headSignIn:'Đăng nhập',/*不超过11个字符*/
        /*connectAnother : 'Connect another device',*/
        deviceInfo: 'Thông tin thiết bị',/*不超过22个字符*/
        email:'Email',
        /*add 2014-03-28*/
        promptInvaildPath:'Đường dẫn không hợp lệ.',
	   
	    connectDeviceVia:'Kết nối điện thoại để cài đặt Ứng dụng, Trò chơi, Video và tất cả nội dung Android miễn phí, và bắt đầu trải nghiệm dịch vụ mới mẻ về quản lý thiết bị di động.',
        connectNow:'Kết nối bây giờ',
		
		downloadingDriver:'Đang tải Driver cho thiết bị {0}',/*不超过50个字符*/
		installingDriverText:'Đang cài đặt driver cho thiết bị ',/*不超过50个字符*/
		installingMG:'Đang cài đặt Mobogenie cho thiết bị',/*不超过50个字符*/
		connectedYourDeviceText: 'Đã kết nối',/*不超过50个字符*/
		disconnectYourDeviceText: 'Ngắt kết nối',/*不超过50个字符*/

        searchResultText: 'Tìm kiếm <span class="c-red">{0}</span>, Tìm thấy <span class="c-red">{1}</span> kết quả ',
        searchSeeAllLink: 'Xem tất cả',
        openLabel: 'Mở thư mục',
        
        Exporting:"Đang xuất. Vui lòng đừng ngắt kết nối.",
        Deleting:" Đang xóa. Vui lòng đừng ngắt kết nối.",

        deviceMemoryLabel: "Bộ nhớ thiết bị",
        sdCardLabel: "Thẻ SD 1",
        sdCardTwoLabel: "Thẻ SD 2",
        total: "Tổng: ",/*不超过20个字符*/
        available: " Bộ nhớ trống ",/*不超过20个字符*/
        manage: "Quản lý",
        
        installedText: 'Đã cài đặt',/*不超过15个字符*/
        updateAppText: 'Cập nhật',/*不超过12个字符*/
        installingAppText: 'Đang cài đặt',/*不超过55个字符*/
        installText: 'Cài đặt',/*不超过15个字符*/

        /*2014-05-13*/
       searchHolderMyApp:"Ứng dụng & trò chơi trong máy",
       searchHolderWallpaper:"Hình nền",
       searchHolderRingtone:"Nhạc chuông",
       searchHolderAppGames:"Ứng dụng/Trò chơi",
       noSdState:"Không tìm thấy thẻ SD trên thiết bị.",
       /*2014-5-26*/
       minTipText:"Thu nhỏ",
       maxTipText:"Phóng to",
       exitTipText:"Thoát",
       returnTipText:"Trở lại",
       retreatTipText:"Tiếp theo",
       /*2014-5-27*/
       noLabel : 'Không',
       menuOpenLabel:"Mở",
       //20140604
       bestPicksLabel: 'Chọn lọc',
       actionFailed:'Thực hiện thất bại',
       /*2014-06-09*/
      searchHolderYoutube:'YouTube URL hoặc Từ khóa',
      screenshotSave:"Hình chụp đã lưu trong: ",
      screenshotText:"Hình chụp",
      screenshotCheckPathTip: "Luôn lưu hình chụp theo đường dẫn này",
      /*2014-06-10*/
      alwaysOpenClient:'Luôn mở Mobogenie khi kết nối thiết bị ',
      changeOpenClient:'Có thể thay đổi  bất cứ lúc nào trong mục "Cài đặt".',
      /*2014-06-18*/
      screenBlackTipText: "Làm sáng màn hình của bạn",
      /*2014-06-30*/
      ebookLabel:"Sách",
      myEbookLabel:"Sách của tôi",
      /*2014-6-30修改*/
      connectDeviceText:'Đang kết nối. Hãy kết nối thiết bị của bạn.',
      openManageDevice:"Một thiết bị được phát hiện. Mở Mobogenie để quản lý thiết bị và tải tài nguyên miễn phí.",
      /*2014-07-18*/
      searchHolderEBook:"Sách",
      /*2014-09-25*/
      rememberMarkLabel:"Ghi nhớ cài đặt"
    };
    return dictionary;
});