define('vietna:driver', function(require, exports, module){
    var dictionary = {
		badNetworkTitle:'Kết nối mạng yếu. Vui lòng kiểm tra mạng.',/*不超过70个字符*/
		pictureGuide: 'Hướng dẫn hình ảnh',/*不超过26个字符*/
		videoGuide: 'Hướng dẫn video',/*不超过26个字符*/
		myVersion: 'Phiên bản Android của tôi :',/*不超过26个字符*/
		debugFootText: 'Vẫn không thể mở chế độ gỡ lỗi USB ?',/*不超过40个字符*/
		oneClickSet: 'Cài đặt ngay',/*不超过30个字符*/
		tryConnectText: 'Thử rút và gắn lại cáp hoặc khởi động lại thiết bị của bạn.',/*不超过70个字符*/
		butBack: 'Trở về',
		ContactSupport: 'Hỗ trợ liên hệ',/*不超过30个字符*/
		allowDebugText: 'Nhấn "OK" khi được hỏi có cho phép gỡ lỗi USB.',/*不超过70个字符*/
		allowDebugTip: "<i>1</i> Kiểm tra tùy chọn này",/*不超过50个字符*/
		allowDebugOkTip: "<i>2</i> Nhấn <b>[OK]</b>",/*不超过50个字符*/
		butRetry: 'Không thể nhìn thấy popup này?',/*不超过60个字符*/
		butShowAgain: 'Hiển thị lần nữa',/*不超过25个字符*/
		stillNoSolove: 'Vẫn không được?',
        debugTipText: 'Hãy tải {0} (12KB) cho thiết bị của bạn',/*不超过50个字符*/
        debugSetterContentText: ' [USB Debuger]',/*不超过20个字符*/
		orText: 'HOẶC',
		noSpaceHint: 'Không đủ chỗ trống trên thiết bị.',/*不超过60个字符*/
		noSpaceText: 'Mobogenie đòi hỏi ít nhất {0} bộ nhớ.',/*不超过50个字符*/
		needSpaceText: '10 MB',
		upSpaceText: 'Hãy gỡ bớt một số ứng dụng để giải phóng bộ nhớ.',/*不超过60个字符*/
		butHaveSpace: 'Tôi có đủ bộ nhớ',/*不超过32个字符*/
		connectFailedTitle:'Rất tiếc. Kết nối không thành.',
		connectFailedTryText: 'Hãy thử ngắt rồi kết nối lại điện thoại .',/*不超过90个字符*/
		connectFailedRestart: 'Khởi động lại Mobogenie.',/*不超过90个字符*/
		RestartDevice: 'Khởi động lại PC và thiết bị .',/*不超过90个字符*/
		connectFailedText: 'Nếu không có tác dụng, hãy đọc phần Hỏi Đáp hoặc cho chúng tôi biết vấn đề của bạn .',/*不超过90个字符*/
		
		connectionGuide:'Hướng dẫn kết nối',
		driverUsbTitle: 'Hãy kết nối điện thoại bằng cáp USB.',/*不超过50个字符*/
		driverUsbText: 'Sau khi kết nối, bạn có thể tải về miễn phí trò chơi, ứng dụng và nhiều hơn nữa, đồng thời cũng có thể quản lý thiết bị.',
		
		AndroidLowDebugStep1: '<i>1</i> Nhấn <b>[Trung tâm Ứng dụng]</b>',/*不超过60个字符*/
		AndroidLowDebugStep2: '<i>2</i> Nhấn <b>[Cài đặt]</b>',/*不超过60个字符*/
		AndroidLowDebugStep3: '<i>3</i> Nhấn <b>[Ứng dụng]</b>',/*不超过60个字符*/
		AndroidLowDebugStep4: '<i>4</i> Nhấn <b>[Phát triển]</b>',/*不超过60个字符*/
		AndroidLowDebugStep5: '<i>5</i> Chọn <b>[Gỡ lỗi USB]</b>',/*不超过60个字符*/
		AndroidLowDebugStep6: '<i>6</i> Nhấn <b>[OK]</b>',/*不超过60个字符*/
		AndroidHighDebugStep3: '<i>3</i> Nhấn <b>[Tùy chọn phát triển]</b>',/*不超过60个字符*/
		AndroidHigherDebugStep3: '<i>3</i> Nhấn <b>[Thông tin máy]</b>',/*不超过60个字符*/
		AndroidHigherDebugStep4: '<i>4</i> Nhấn <b>[Số]</b> một vài lần',/*不超过60个字符*/
		AndroidHigherDebugStep5: '<i>5</i> Chế độ nhà phát triển sẽ được kích hoạt',/*不超过60个字符*/
		AndroidHigherDebugStep6: '<i>6</i> Quay lại và nhấn <b>[Các tùy chọn nhà phát triển]</b>',/*不超过60个字符*/
		AndroidHigherDebugStep9: '<i>9</i> Chọn <b>[Luôn luôn cho phép từ máy tính này]</b>',/*不超过60个字符*/
		
		SamsungHighDebugStep4: '<i>4</i> Chọn <b>[Các tùy chọn nhà phát triển]</b>',/*不超过60个字符*/
		SamsungHigherDebugStep3: '<i>3</i> Nhấn <b>[Thêm]</b>',/*不超过60个字符*/
		SamsungHigherDebugStep4: '<i>4</i> Nhấn <b>[Thông tin thiết bị]</b>',/*不超过60个字符*/
		
		driver1 :'<i>3</i> Chọn <b>[Thông tin thiết bị]</b>',
		driver2 :'<i>4</i> Chọn <b>[Thông tin phần mềm]</b>',
		driver3 :'<i>8</i>  Nhấn <b>[Trở về] </b> và chọn <b>[Tùy chọn nhà phát triển]</b>',
		driver4 :'<i>9</i> Chọn <b>[Đừng hỏi tôi lần nữa]</b>',
		driver5 :'<i>2</i> Chọn <b>[Thông tin chung]</b>',
		driver6 :'<i>10</i> Nhấn <b>[Đúng]</b>',
		/*2014-6-12*/
		driver7:' Kiểm tra<b>[Không nhắc lại]</b>',
		
		/*2014-7-3*/
		usbDebugServiceText:"Bạn cũng có thể gọi dịch vụ khách hàng địa phương của chúng tôi để được hỗ trợ",
		usbDebugCustomer:"Dịch vụ khách hàng",
		usbDebugTitle: 'Vui lòng bật Gỡ lỗi USB để quản lý điện thoại của bạn',
		
		/*2014wifi*/
		driverUsbConnect: 'Kết nối USB',
		driverWifiConnect: 'Kết nối Wi-Fi',
		deviceBeen:"Đã phát hiện {0} thiết bị. Vui lòng kết nối.",
		connectAnother:"Kết nối thiết bị khác",
		pleaseDownMg:"Vui lòng tải <b>Mobogenie Helper</b> về thiết bị của bạn.",
		alreadyHava:"Tôi đã có Mobogenie Helper.",
		enterPass:"2.Hãy nhập mã xác thực.",
		howtofind:"Tìm mã xác thực bằng cách nào?",
		pleasePhoneOk:"Vui lòng chấp nhận yêu cầu kết nối trên thiết bị của bạn!",
		conncetionFailed:"Kết nối không thành công. Vui lòng kiểm tra các mục sau:  ",
		phoneWifiOpen:"Vui lòng kiểm tra xem Wi-Fi đã bật chưa và thiết bị của bạn có kết nối vào cùng mạng LAN với PC hay không.",
		passwordOk:"Mã xác thực có đúng không?",
		connectnix:"Kết nối không thành công. Thiết bị đã từ chối yêu cầu kết nối PC của bạn!",
		
		contingDevice:"Đang kết nối với thiết bị của bạn...",
		updatingHelp:"Đang cập nhật Mobogenie Helper...",
		updateFailed:"Không cập nhật được Mobogenie!",
		alreadyCon:"Tôi đã kết nối cáp USB.",
		connectBtnText:"Kết nối",
		wifiScreen:"Không thể truy cập ảnh chụp màn hình điện thoại qua Wi-Fi.",
		
		//2014-10-14
		connectNoticeTitle: 'Hãy kết nối vào thiết bị của bạn.',
		helpisOpen:"Mobogenie Helper có đang chạy trên điện thoại của bạn không?",
		//2014-10-20
		pleaseClick:"Sau khi cài đặt, hãy mở Mobogenie Helper và bấm nút bên dưới để kết nối lại.",
		reConnectBtn:"Kết nối lại",
		pleaseInstall:"Bản cập nhật Mobogenie Helper đã được gửi. Hãy cài đặt nó trên thiết bị Android của bạn.",
		scanBlow:"Hãy quét mã QR bên dưới",
		downloadUsing:"Tải xuống bằng URL bên dưới trên thiết bị Android",
		openHelpDevice:"1. Mở Mobogenie Helper trên thiết bị Android của bạn.",
		
		/*2014-11-07修改*/
		connectFailedText:"Kết nối qua Wi-Fi.",
		waitLong:"Chờ quá lâu? Hãy báo cho chúng tôi!",
		alreadyHava:"Tôi có Mobogenie Helper trên điện thoại. Tiếp theo!",
		noHavaMobo:"Tôi không có Mobogenie Helper trên điện thoại. Hãy đưa tôi trở về!",
		tryConnectWifi:"Try connecting via Wi-Fi",
		/*2014-11-14增加*/
		driverWifiConnect:"Kết nối không dây",
		havaOpenUsb:"Tôi đã kích hoạt chức năng USB.",
		usbConnectFailed:"Lỗi kết nối USB",
		checkPhoneFailed: "Một chương trình đang ngăn điện thoại kết nối vào PC. Hãy đóng chương trình này và thử lại.",
		closeReConnect: "Đóng chương trình này và kết nối lại vào {0}."
    };
    return dictionary;
});