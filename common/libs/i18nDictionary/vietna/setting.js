define('vietna:setting', function(require, exports, module){
    var dictionary = {
    	aboutMe:'Giới thiệu Mobogenie',/*不超过18个字符*/
		aboutMeVersion:'Phiên bản: {0}',/*不超过22个字符*/
		MGWebsite:'Website:',/*不超过35个字符*/
		MGForums:'Diễn đàn:',/*不超过35个字符*/
		aboutMeLinkPolicy: 'Chính sách riêng tư',/*不超过35个字符*/
		aboutMeLinkEULA: 'EULA',/*不超过35个字符*/
		aboutMeLinkTOS: 'Điều khoản dịch vụ',/*不超过35个字符*/
		aboutMeFootText: '©2014 Mobogenie.com. Bảo lưu mọi quyền',/*不超过70个字符*/
		feedback:'Phản hồi',
        fbEmailFormatFailed: 'Email không hợp lệ',/*不超过60个字符*/
        BtnSubmit: 'Gửi',
        fbSuccessTitle: 'Cám ơn phản hồi của bạn.',/*不超过45个字符*/
        fbSuccessText: ' Bộ phận khách hàng sẽ liên hệ với bạn trong thời gian sớm nhất, vui lòng kiểm tra hộp thư để biết.',/*不超过150个字符*/
        
       
        setting: 'Cài đặt',/*不超过18个字符*/
        checkForUpdates: 'Kiểm tra cập nhật',/*不超过18个字符*/
        whatNew: 'Có gì mới?',/*不超过18个字符*/
        ContactUs: 'Liên hệ chúng tôi',/*不超过18个字符*/
        
		generalLabel: 'Thông tin chung',/*不超过13个字符*/
		LocationsLabel: 'Vị trí',/*不超过13个字符*/
		AppllicationsLabel: 'Ứng dụng',/*不超过13个字符*/
		remindersLabel: 'Nhắc nhở',/*不超过13个字符*/
		Language: 'Ngôn ngữ',/*不超过62个字符*/
		generalStartupTitle: 'Khởi động',/*不超过62个字符*/
		generalStartupText:'Tự động hoàn tất các tác vụ chưa hoàn thành',/*不超过62个字符*/
		generalConnetTitle: 'Kết nối thiết bị',/*不超过62个字符*/
		generalConnetText: 'Luôn mở Mobogenie',/*不超过62个字符*/
		generalConnetTextTwo: ' Tự động cài đặt các ứng dụng đã tải về.',/*不超过62个字符*/
		generalCloseTitle: 'Đóng',/*不超过62个字符*/
		generalCloseText: ' Tối thiểu hóa client vào ổ đĩa',/*不超过62个字符*/
		generalCloseTextTwo: 'Thoát Client',/*不超过62个字符*/
		generalCloseTextThree: 'Luôn nhắc nhở ',/*不超过62个字符*/
		generalUpdateTitle: 'Cập nhật Client',/*不超过62个字符*/
		generalUpdateText: 'Tự động cập nhật client lên phiên bản mới nhất',/*不超过62个字符*/
		locationsResource: 'Ứng dụng tải về',/*不超过62个字符*/
		locationsBackup: 'Vị trí sao lưu',/*不超过62个字符*/
		locationsScreen: 'Vị trí screenshot',/*不超过62个字符*/
		locationsBtn: 'Duyệt...',/*不超过12个字符*/
		appllicationsFileTitle: 'Liên kết file',/*不超过62个字符*/
		appllicationsFileText: 'Kiểm tra liệu file apk có liên kết với Mobogenie hay không',/*不超过62个字符*/
        appllicationsLatestTitle: 'Tự động cập nhật những ứng dụng mới nhất',
		appllicationsLatestText: 'Tự động tải về ứng dụng có cập nhật mới nhất',/*不超过62个字符*/
		appllicationsDefaultTitle: 'Vị trí cài đặt mặc định',/*不超过62个字符*/
		appllicationsDefaultText: ' Tự động (Nếu cài đặt trên thẻ SD thất bại, sẽ cài đặt trên thiết bị)',/*不超过62个字符*/
		appllicationsDefaultTextTwo: 'Bộ nhớ thiết bị',/*不超过62个字符*/
		appllicationsDefaultTextThree: 'Thẻ SD ngoài(Chỉ hỗ trợ Android 2.2 trở lên.)',/*不超过62个字符*/
		remindersUpdateTitle: 'Cập nhật ứng dụng',/*不超过62个字符*/
		remindersUpdateText:'Nhắc tôi cập nhật các ứng dụng {0} ngày một lần',/*不超过62个字符*/
		remindersBackupText:'Nhắc tôi sao lưu thiết bị {0} ngày một lần',/*不超过62个字符*/
		remindersUpdateTextTwo: 'Đừng bao giờ nhắc tôi',/*不超过62个字符*/
		remindersBackupTitle: 'Sao lưu',/*不超过62个字符*/
		remindersPopularTitle: 'Hoạt động phổ biến',/*不超过62个字符*/
		remindersPopularText: 'Nhắc tôi biết nếu có các hoạt động phổ biến hoặc khuyến mãi ',/*不超过62个字符*/
		/*5-24*/
		swicthSiteLabel:'Khu vực',
		/*5-26*/
		settingTip:"Menu",
		/*7-21*/
		fbModelName: 'Số hiệu thiết bị',
		fbOsVersion: 'Phiên bản Android',
		
		/*7.22*/
		fbType9:"Khác",
		/*2014-9-9*/
		/*2014-9-9*/
		upload:"Tải lên",
		/*2014-9-11 新版反馈文案*/
		pleaseGory:"Thể loại vấn đề:",
		pleaseChoose:"Vui lòng chọn thể loại.",
		openUSB:"Mở Gỡ lỗi USB:",
		pleaseSele:"Vui lòng chọn...",
		whatUsb:"Gỡ lỗi USB là gì?",
		havaActive:"Bạn đã bật Gỡ lỗi USB chưa?",
		phoneModel:"Kiểu điện thoại:",
		pleaseEnter:"Vui lòng nhập kiểu điện thoại của bạn.",
		modelOf:"Kiểu của điện thoại có vấn đề",
		email: "Email:",
		enterEmail:"Vui lòng nhập địa chỉ email của bạn.",
		enterValid:"Vui lòng nhập địa chỉ email hợp lệ để giúp chúng tôi phục vụ bạn tốt hơn",
		andVer:"Phiên bản Android:",
		pleaseVer:"Vui lòng chọn phiên bản Android.",
		corSystem:"Phiên bản hệ thống chính xác sẽ giúp chúng tôi xác định chính xác vấn đề của bạn.",
		socialAcc:"Tài khoản mạng xã hội:",
		selectMethod:"Chọn phương pháp chúng tôi có thể liên hệ với bạn",
		description:"Mô tả:",
		addAttach: "Thêm phần đính kèm",
		noFiles:"Không có tập tin nào",
		onlySupports:"Chỉ hỗ trợ các tập tin nhỏ hơn 3MB.",
		whyNeed:"Tại sao tôi cần bật chức năng Gỡ lỗi USB?",
		debugRequired:"Cần bật Gỡ lỗi USB để hệ thống Android kết nối đầy đủ với máy tính của bạn. Bật Gỡ lỗi USB cho phép điện thoại hoặc máy tính bảng kết nối với Mobogenie nhanh hơn.",
		openfun:"Làm thế nào để bật chức năng Gỡ lỗi USB?",
		andLower:"Android 3.2 trở xuống",
		selectSet:"Chọn [Cài đặt] trong danh sách ứng dụng để vào menu hệ thống.",
		selectApp: "Chọn [Ứng dụng].",
		
		selectDeve:"Chọn [Phát triển].",
		selectTap:"Chọn [Gỡ lỗi USB] và nhấp OK.",
		andFour: "Android 4.0 và 4.1",
		selectOpt:"Chọn [Tùy chọn nhà phát triển].",
		openOpt:"Mở [Tùy chọn nhà phát triển] ở phía trên cùng.",
		checkTap:"Chọn [Gỡ lỗi USB] và nhấp OK.",
		androidFour:"Android 4.2",
		tapIcon:"Nhấp vào biểu tượng [Cài đặt].",
		tapPhone:"Nhấp vào [Giới thiệu về điện thoại].",
		scrollBot: "Cuộn xuống cuối màn hình, tìm [Số bản dựng] và nhấp vào nó vài lần.",
		
		keepTap:"Tiếp tục nhấp vào nó cho đến khi bạn thấy thông báo \"Bây giờ bạn đã là nhà phát triển!\"",
		goback:"Trở lại trang [Cài đặt] để xem [Tùy chọn nhà phát triển]!",
		enterDeve:"Vào [Tùy chọn nhà phát triển] và nhấp vào [Gỡ lỗi USB].",
		backDeve:"Trở lại [Tùy chọn nhà phát triển] và đảm bảo [Gỡ lỗi USB] được chọn.",
		connectCom:"Kết nối điện thoại với máy tính và mở Mobogenie. <br/>Mobogenie sẽ cài đặt [Trình trợ giúp Mobogenie] vào máy tính của bạn.<br/>Nhấp OK khi thiết bị cài đặt thông báo hiển thị.",
		returnCon:"Trở lại và tiếp tục",
		fbSuccessClose: 'Tiếp tục duyệt qua cửa hàng{0}',
		
		unableCon:"Không thể kết nối với điện thoại của tôi",
		proInstall:"Vấn đề với tài nguyên",
		contactsText:"Danh bạ và tin nhắn văn bản",
		slowPer:"Hiệu suất chậm",
		unableRoot:"Không thể root",
		stillWhen:"MG vẫn hiển thị khi không có thiết bị nào được kết nối",
		suggesNew:"Gợi ý chức năng mới",
		usbOn: "Gỡ lỗi USB đang bật",
		usbOff: 'Gỡ lỗi USB đang tắt',
		fbTextarea: "Chúng tôi luôn sẵn sàng lắng nghe!",
		errorFile:"định dạng tập tin không đúng",
		/*2014-11-07*/
		unableCon:"Không thể kết nối với điện thoại qua USB.",
		unableWifiCon:"Không thể kết nối với điện thoại qua Wi-Fi.",
    };
    return dictionary;
});