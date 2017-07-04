define('thai:pcclean', function(require, exports, module){
    var dictionary = {
		//浏览器缓存
        ieTemp:"แคชIE",//临时文件夹"
        chromeHistory:"แคชChrome",
        firefoxHistory:"แคชFirefox",
        
        //第三方应用软件
        bitCometDld:"ประวัติการดาวน์โหลด BitComet",
        
        kmPlayer:"KMPlayer",
        skype:"Skype",
        line:"Line",
        facebook:"Facebook",
        vicMediaPlayer:"VLC Media Player",
        youtubeDown:"YouTube Downloader",
        mobogenie:"Mobogenie",
        
        //注册表
        regInvalidStartMenu:"ประวัติรายการเริ่มต้นที่ไม่ถูกต้อง",
        regInvalidMenu:"รายการเมนูบริบทไม่ถูกต้อง",
        regMuicache:"ไฟล์MUI Referenceไม่ถูกต้อง",
        regHelp:"ไฟล์ช่วยเหลือไม่ถุกต้อง",
        regInvalidAppPath:"Application Paths ไม่ถูกต้อง",
        regInvalidInstall:"การติดตั้งซอฟท์แวร์ตกค้าง",
        regInvalidUninstall:"การถอนการติดตั้งซอฟท์แวร์ตกค้าง",
        regFileAssoc:"ไฟล์ Associations ไม่ถูกต้อง",
        regInvalidFont:"ฟ้อนท์ไม่ถูกต้อง",
        regInvalidStartRun:"รายการนำเข้าการเริ่มต้นไม่ถูกต้อง",
        regDll:"DLL ซ้ำซ้อน",
        regCom:"COM Components ไม่ถูกต้อง",
        
        regOpenSaveDlg:"ประวัติการเปิดบทสนทนา",
        regExtHistory:"ประเภทไฟล์การเปิดใช้ประวัติไม่ถูกต้อง",
        regWinRar:"ประวัติการเปิดใช้ Winrar",
        regWinZip:"ประวัติการเปิดใช้ Winzip",
        regOffice:"ประวัติการเปิดใช้ Office",
        regStartMenu:"รายการเมนูเริ่มต้นไม่ถูกต้อง",
        regUninstall:"ข้อมูลการถอนการติดตั้งที่มากเกินไป",
        regInvalidFire:"การตั้งค่าไฟร์วอลล์ไม่ถูกต้อง",
        regInvalidHelp:"รายการเมนูช่วยเหลือไม่ถูกต้อง",
        regFailActiveX:"ข้อมูล ActiveX ไม่ถูกต้อง",
        regFailClass:"ข้อมูลประเภทไม่ถูกต้อง",
        regRedundancy:"ข้อมูลมากเกินไป",
        
        //回收站文件
        windowsTrash:"ถังขยะรีไซเคิล",
        
        //痕迹清理
        rencentUseFile:"ไฟล์ที่เปิดล่าสุด(ไฟล์)",
        gooleToolbar:"แถบเครื่องมือ Google",
        regAccessHistory:"ประวัติการเข้าถึงรีจิสทรี",
        windowsSearchHistory:"บันทึกการค้นหา",
        win7forward:"Windows 7 Jump List",
        winthumbCache:"ไฟล์แคชรูปย่อวินโดว์",
        
        /*10月21新增*/
        //第三方应用软件
        flashClean:"แฟลชแคช",
        appleLogClean:"ไฟล์บันทึกซอฟท์แวร์ Apple",
        msseLogClean:"บันทึกของ Microsoft Security Essentials",
        //10-21新增注册表
		runDlg:"\"Run\" ประวัติของกล่องตอบโต้",
		visitedDir:"โปรแกรมที่ใช้งานล่าสุด",
		openSaveHistory:"โปรแกรมที่ใช้งานล่าสุด",
		winAndSize:"ประวัติตำแหน่งหน้าต่างและขนาด",
		rencentUseReg:"ไฟล์ที่เปิดล่าสุด (รีจิสทรี)",
		fileExtHistory:"ประวัติไฟล์ส่วนต่อขยาย",
		recentProgHistory:"ประวัติโปรแกรมที่เปิดล่าสุด",
		noticeIconHistory:"ประวัติพื้นที่ไอคอนการแจ้งเตือน",
		networkDrivesHistory:"ประวัติเครือข่ายการแมปไดรฟ์",
		findComputerHistory:"ประวัติการค้นหาคอมพิวเตอร์",
		findDocumentHistory:"ประวัติการค้นหาไฟล์",
		findPrinterHistory:"ประวัติการค้นหาเครื่องพิมพ์",
		regVisitePos:"เข้าถึง Regedit ครั้งสุดท้าย",
		windowsRegHistory:"ประวัติรีจิสทรีวินโดว์",
		netNearBy:"พื้นที่เครือข่าย",
        
		/*10-21新增*/
		// 系统垃圾清理
		sysWinUpdate:"อัพเดทข้อมูลวินโดว์อัตโนมัติ",
		sysWinWinsxs:"แคชสำรองวินโดว์ WinSxS",
		sysWinIns:"แคชติดตั้งวินโดว์ชั่วคราว",
		sysIisLog:"ไฟล์บันทึก IIS",
		sysCryptoapi:"แคชใบรับรอง Windows CryptoAPI",
		sysDefender:"ประวัติการแสกน Windows Defender",
		sysManifest:"แคช Windows Manifest",
		sysWinSearch:"บันทึกการค้นหาวินโดว์",
		sysErrorRepopt:"รายงานข้อผิดพลาดของวินโดว์",
		sysIconCache:"แคชไอค่อนวินโดว์",
		sysPrefechFile:"ไฟล์ Windows Prefetch",
		sysFontCache:"แคชฟ้อนท์วินโดว์",
		sysSysLog:"ไฟล์บันทึกระบบวินโดว์",
		sysThumbCache:"แคชรูปย่อ",
		sysUpdatePatch:"ระบบอัพเดทแพทซ์อัตโนมัติ",
		sysSystempFile:"ระบบไฟล์ชั่วคราว",
		sysDefender:"แคชอัพเดทการสำรองข้อูล Windows Defender",
		sysWinOld:"ไฟล์สำรอง Windows.Old",
		sysInstalltemp:"ไฟล์การติดตั้งวินโดว์ชั่วคราว",
		sysDumpFile:"ไฟล์การถ่ายโอนข้อมูลหน่วยความจำ",
		
    };
    return dictionary;
});