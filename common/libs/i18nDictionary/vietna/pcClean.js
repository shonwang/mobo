define('vietna:pcclean', function(require, exports, module){
    var dictionary = {
		//浏览器缓存
        ieTemp:"IE Cache",//临时文件夹"
        chromeHistory:"Chrome Cache",
        firefoxHistory:"Firefox Cache",
        
        //第三方应用软件
        bitCometDld:"Nhật ký tải về BitComet",
        
        kmPlayer:"KMPlayer",
        skype:"Skype",
        line:"Line",
        facebook:"Facebook",
        vicMediaPlayer:"VLC Media Player",
        youtubeDown:"YouTube Downloader",
        mobogenie:"Mobogenie",
        
        //注册表
        regInvalidStartMenu:"Hồ sơ Menu khởi động không hợp lệ",
        regInvalidMenu:"Mục Menu ngữ cảnh không hợp lệ",
        regMuicache:"Tệp Tham chiếu MUI không hợp lệ",
        regHelp:"Tệp Trợ giúp không hợp lệ",
        regInvalidAppPath:"Đường dẫn ứng dụng không hợp lệ",
        regInvalidInstall:"Tệp dư thừa Cài đặt phần mềm",
        regInvalidUninstall:"Tệp dư thừa Gỡ cài đặt phần mềm",
        regFileAssoc:"Liên kết tệp không hợp lệ",
        regInvalidFont:"Font không hợp lệ",
        regInvalidStartRun:"Mục khởi động không hợp lệ",
        regDll:"DLL dư thừa",
        regCom:"Thành phần COM không hợp lệ",
        
        regOpenSaveDlg:"Nhật ký mở hộp thoại",
        regExtHistory:"Nhật ký mở loại tập tin không hợp lệ",
        regWinRar:"Nhật ký mở Winrar",
        regWinZip:"Nhật ký mở Winzip",
        regOffice:"Nhật ký mở Office",
        regStartMenu:"Mục menu bắt đầu không hợp lệ",
        regUninstall:"Thông tin gỡ cài đặt thừa",
        regInvalidFire:"Cài đặt tường lửa không hợp lệ",
        regInvalidHelp:"Mục menu trợ giúp không hợp lệ",
        regFailActiveX:"Thông tin ActiveX không hợp lệ",
        regFailClass:"Thông tin danh mục không hợp lệ",
        regRedundancy:"Thông tin thừa",
        
        //回收站文件
        windowsTrash:"Thùng rác",
        
        //痕迹清理
        rencentUseFile:"Các tệp đã mở gần đây (Tệp)",
        gooleToolbar:"Thanh công cụ Google",
        regAccessHistory:"Lịch sử truy cập Đăng ký",
        windowsSearchHistory:"Hồ sơ tìm kiếm",
        win7forward:"Danh sách nhảy Windows 7",
        winthumbCache:"Cache hình thu nhỏ Windows",
        
        /*10月21新增*/
        //第三方应用软件
        flashClean:"Cache Flash",
        appleLogClean:"Tệp nhật ký phần mềm Apple",
        msseLogClean:"Nhật ký thiết yếu bảo mật Microsoft",
        //10-21新增注册表
		runDlg:"Lịch sử \"Chạy\" Hộp hội thoại",
		visitedDir:"Chương trình đã chạy gần đây",
		openSaveHistory:"Chương trình đã chạy gần đây",
		winAndSize:"Lịch sử vị trí và kích thước cửa sổ",
		rencentUseReg:"Các tệp đã mở gần đây (Đăng ký)",
		fileExtHistory:"Lịch sử phần mở rộng tệp",
		recentProgHistory:"Lịch sử chương trình đã mở gần đây",
		noticeIconHistory:"Lịch sử biểu tượng khu vực thông báo",
		networkDrivesHistory:"Lịch sử ánh xạ ổ đĩa mạng",
		findComputerHistory:"Lịch sử tìm kiếm máy tính",
		findDocumentHistory:"Lịch sử tìm kiếm tệp",
		findPrinterHistory:"Lịch sử tìm kiếm máy in",
		regVisitePos:"Truy cập Regedit lần cuối",
		windowsRegHistory:"Lịch sử Đăng ký Windows",
		netNearBy:"Vị trí mạng",
        
		/*10-21新增*/
		// 系统垃圾清理
		sysWinUpdate:"Cơ sở dữ liệu Tự động cập nhật Windows",
		sysWinWinsxs:"Cache Sao lưu Windows WinSxS",
		sysWinIns:"Cache tạm Trình cài đặt Windows",
		sysIisLog:"Tệp nhật ký IIS",
		sysCryptoapi:"Cache Chứng chỉ Windows CryptoAPI",
		sysDefender:"Lịch sử quét Trình bảo vệ Windows",
		sysManifest:"Cache Bản kê Windows",
		sysWinSearch:"Nhật ký tìm kiếm Windows",
		sysErrorRepopt:"Báo cáo lỗi Windows",
		sysIconCache:"Cache biểu tượng Windows",
		sysPrefechFile:"Tệp tải trước Windows",
		sysFontCache:"Cache Font Windows",
		sysSysLog:"Tệp nhật ký hệ thống Windows",
		sysThumbCache:"Cache hình thu nhỏ",
		sysUpdatePatch:"Bản vá Tự động cập nhật hệ thống",
		sysSystempFile:"Tệp tạm Hệ thống",
		sysDefender:"Cache Sao lưu cập nhật trình bảo vệ Windows",
		sysWinOld:"Tệp sao lưu Windows.Old",
		sysInstalltemp:"Tệp tạm Cài đặt Windows",
		sysDumpFile:"Tệp kết xuất bộ nhớ",
		
    };
    return dictionary;
});