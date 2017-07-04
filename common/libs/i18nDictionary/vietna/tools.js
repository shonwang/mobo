define('vietna:tools', function(require, exports, module){
    var dictionary = {
		managementTool:'Công cụ quản lý',
		backup:'Sao lưu',/*不超过20个字符*/
		backupIntro:'Sao lưu dữ liệu thiết bị Android vào PC.',/*不超过58个字符*/
		restore:'Khôi phục',/*不超过20个字符*/
		restoreIntro:'Khôi phục dữ liệu từ sao lưu trước.',/*不超过58个字符*/
		fileManager:'Quản lý tập tin',/*不超过20个字符*/
		fileManagerIntro:'Xem các tập tin và thư mục trên thiết bị.',/*不超过58个字符*/
		screenshot:'Screenshot',/*不超过20个字符*/
		screenshotIntro:'Chụp ảnh màn hình của thiết bị.',/*不超过58个字符*/
		deviceInfoIntro:'Xem thông tin chi tiết thiết bị.',/*不超过58个字符*/
		installApp:'Cài đặt ư.dụng/tr.chơi',/*不超过20个字符*/
		installAppIntro:'Cài đặt hàng loạt các tập tin apk vào thiết bị.',/*不超过58个字符*/
		advancedTool:'Công cụ nâng cao',
		root:'Root ngay',/*不超过20个字符*/
		rootIntro:'Root thiết bị để giải phóng thêm bộ nhớ.',//*不超过58个字符*/
		importOutlook:'Nhập dữ liệu Outlook',/*不超过20个字符*/
		importOutlookIntro:'Nhập danh bạ Outlook từ PC sang thiết bị Android ',/*不超过58个字符*/
		importSymbian:'Nhập dữ liệu Symbian',/*不超过20个字符*/
		importSymbianIntro:'Nhập danh bạ Symbian từ PC sang thiết bị Android.',/*不超过58个字符*/
		freeWifi:'Wi-Fi miễn phí',/*不超过20个字符*/
		freeWifiIntro:'Chia sẻ mạng laptop với thiết bị thông qua Wi-Fi.',/*不超过58个字符*/
		
		/*device info*/
		basicInfo:'Thông tin cơ bản',
		modelNumber:'Số Model :',/*不超过19个字符*/
		androidVer:'Phiên bản OS Android:',/*不超过19个字符*/
		screenResoltion:'Độ phân giải màn hình:',/*不超过19个字符*/
		battery:'Pin:',/*不超过19个字符*/
		cpu:'CPU:',/*不超过19个字符*/
		ram:'RAM:',/*不超过19个字符*/
		memory:'Bộ nhớ:',/*不超过19个字符*/
		sdCard:'Thẻ SD :',/*不超过19个字符*/
		isRooted:'Đã Root:',/*不超过19个字符*/
		hardwareInfo:'Thông tin phần cứng',/*不超过19个字符*/
		imei:'IMEI:',/*不超过19个字符*/
		serialNumber:'Số Seri :',/*不超过19个字符*/
		imsi:'IMSI:',/*不超过19个字符*/
		macAddress:'Địa chỉ MAC :',/*不超过19个字符*/
		basebandVer:'Phiên bản Baseband :',/*不超过19个字符*/
		kernelVer:'Phiên bản Kernel:',/*不超过19个字符*/
		copy:'Sao chép',/*不超过8个字符*/
		copySuccess:'Sao chép vào Clipboard',
		unknownError: 'Lỗi không xác định',
		unKnownText:'Xảy ra lỗi không xác định.',
		netWorkError:'Lỗi mạng',
		netWorkErrorText:'Vui lòng kiểm tra kết nối mạng.',
		/*2014-09-11*/
		pcCleanerLabel:"Trình dọn dẹp PC",
		scanOver:"Đã quét xong! Có thể dọn dẹp {0} tệp rác và {1} tệp đăng ký.",
		cleanBtn:"Dọn dẹp",
		lessBrowser:"Tệp rác internet",
		lessHistory:"Tệp dư thừa",
		lessCommonUes:'Tệp rác Phần mềm',
		lessSystem:'Tệp rác Hệ thống',
		lessDelete:"Thùng rác",
		lessUsuse:"Tệp rác Đăng ký",
		selectedLess:"được chọn",
		conScan:"Quét lại",
		cleanText:"Giúp dọn dẹp tệp rác từ internet, hệ thống, phần mềm và nhiều hơn nữa!",
		
		cleanFinish:"Đã dọn xong!",
		someFile:"Một số tệp và mục đăng ký sẽ bị xóa sau khi bạn khởi động lại máy tính.",
		cleanOver:"Đã dọn các {0} tập tin rác và {1} tập tin đăng ký!",
		wifiConNot:"Chức năng này không khả dụng với Wi-Fi.",
		
		/*2014-11-03*/
		cleanFinished:"Kết thúc",
		/*2014-11-03 wifi hotpot*/
		deviceConnectingList:"Đã kết nối với {0}",
		startingWifiTitle:"Đang bật Wi-Fi miễn phí...",
		hasNoWIfiTitle:"PC của bạn không có Wi-Fi.",
		iHaveWifi:"Tôi có Wi-Fi.",
		wifiNameLabel:"Tên Wi-Fi: ",
		wifiPasswordLabel:"Mật khẩu Wi-Fi: ",
		speedLabel:"Tốc độ",
		devicesConnectedTitle:"{0} thiết bị được kết nối.",
		closeWifiLabel:"Đóng Wi-Fi",
		deviceBlackList:"Danh sách đen",
		deviceBlackList2:"Danh sách đen {0}",
		moveOutBlackList:"Xóa",
		downloadSpeedLabel:"Tốc độ tải về",
		uploadSpeedLabel:"Tốc độ tải lên",
		limitSpeedLabel:"Tốc độ giới hạn",
		pleaseWriteNum:"Vui lòng nhập 1-12 chữ cái, chữ số hoặc dấu gạch dưới.",
		moboWifi:"Mobogenie Wi-Fi",
		setBlackValidateNextTime:"Danh sách đen chỉ có hiệu lực sau khi bạn khởi động lại Wi-Fi miễn phí.",
		//2014-11-12
		pleaseWriteDeviceNameValid:"Vui lòng nhập 1-12 ký tự.",
		
		//2014-11-14
		haveNoWifiAdapter:"Không phát hiện Bộ điều hợp Wi-Fi USB",
		solutionLabel:"Giải pháp",
		solutionPluginTitle:"Cắm Bộ điều hợp Wi-Fi để bật dịch vụ Wi-Fi miễn phí.",
		solutionSwitchLaptop:"Chuyển sang máy tính xách tay."
    };
    return dictionary;
});