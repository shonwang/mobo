define('farsi:pcclean', function(require, exports, module){
    var dictionary = {
		//浏览器缓存
        ieTemp:"حافظه پنهان IE",//临时文件夹"
        chromeHistory:"حافظه پنهان Chrome",
        firefoxHistory:"حافظه پنهان Firefox",
        
        //第三方应用软件
        bitCometDld:"سوابق دانلود BitComet",
        
        kmPlayer:"KMPlayer",
        skype:"Skype",
        line:"Line",
        facebook:"Facebook",
        vicMediaPlayer:"VLC Media Player",
        youtubeDown:"YouTube Downloader",
        mobogenie:"Mobogenie",
        
        //注册表
        regInvalidStartMenu:"سوابق منوی شروع نامعتبر است",
        regInvalidMenu:"ورودی‌های منوی متن نامعتبر است",
        regMuicache:"فایل‌های مرجع MUI نامعتبر است",
        regHelp:"فایل‌های راهنما نامعتبر است",
        regInvalidAppPath:"مسیرهای برنامه نامعتبر است",
        regInvalidInstall:"فایل‌های باقیمانده نصب نرم‌افزار",
        regInvalidUninstall:"فایل‌های باقیمانده حذف نصب نرم‌افزار",
        regFileAssoc:"هم‌خوانی فایل نامعتبر است",
        regInvalidFont:"فونت‌ها نامعتبر هستند",
        regInvalidStartRun:"ورودی‌های شروع نامعتبر هستند",
        regDll:"DLL تکراری",
        regCom:"مؤلفه‌های COM نامعتبر هستند",
        
        regOpenSaveDlg:"سوابق باز کردن کادر محاوره‌ای",
        regExtHistory:"سوابق باز کردن نوع فایل نامعتبر استrds",
        regWinRar:"سوابق باز کردن Winrar",
        regWinZip:"سوابق باز کردن Winzip",
        regOffice:"سوابق باز کردن Office",
        regStartMenu:"ورودی‌های منوی شروع نامعتبر است",
        regUninstall:"اطلاعات اضافی حذف نصب",
        regInvalidFire:"تنظیمات فایروال نامعتبر است",
        regInvalidHelp:"ورودی‌های منوی راهنما نامعتبر است",
        regFailActiveX:"اطلاعات ActiveX نامعتبر است",
        regFailClass:"اطلاعات گروه نامعتبر است",
        regRedundancy:"اطلاعات اضافی",
        
        //回收站文件
        windowsTrash:"سطل زباله",
        
        //痕迹清理
        rencentUseFile:"فایل‌های اخیراً باز شده (فایل)",
        gooleToolbar:"نوار ابزار Google",
        regAccessHistory:"تاریخچه دسترسی به رجیستری",
        windowsSearchHistory:"سوابق جستجو",
        win7forward:"لیست پرش در Windows 7",
        winthumbCache:"حافظه پنهان تصاویر بندانگشتی Windows",
        
        /*10月21新增*/
        //第三方应用软件
        flashClean:"حافظه پنهان Flash",
        appleLogClean:"فایل‌های گزارش نرم‌افزار Apple",
        msseLogClean:"گزارش فایل‌های مهم امنیتی Microsoft",
        //10-21新增注册表
		runDlg:"تاریخچه کادر محاوره‌ای \"اجرا\"",
		visitedDir:"برنامه‌های اخیراً اجرا شده",
		openSaveHistory:"برنامه‌های اخیراً اجرا شده",
		winAndSize:"تاریخچه اندازه و محل قرار گرفتن پنجره",
		rencentUseReg:"فایل‌های اخیراً باز شده (رجیستری)",
		fileExtHistory:"تاریخچه پسوند فایل",
		recentProgHistory:"تاریخچه برنامه‌های اخیراً باز شده",
		noticeIconHistory:"تاریخچه نمادهای اعلان",
		networkDrivesHistory:"تاریخچه نگاشت درایو شبکه",
		findComputerHistory:"تاریخچه جستجوی رایانه",
		findDocumentHistory:"تاریخچه جستجوی فایل",
		findPrinterHistory:"تاریخچه جستجوی چاپگر",
		regVisitePos:"آخرین دسترسی به Regedit",
		windowsRegHistory:"تاریخچه رجیستری Windows",
		netNearBy:"مکان‌های شبکه",
        
		/*10-21新增*/
		// 系统垃圾清理
		sysWinUpdate:"پایگاه داده به‌روزرسانی خودکار Windows",
		sysWinWinsxs:"حافظه پنهان پشتیبانی Windows WinSxS",
		sysWinIns:"حافظه پنهان موقتی نصب کننده Windows",
		sysIisLog:"فایل‌های گزارش IIS",
		sysCryptoapi:"حافظه پنهان گواهی Windows CryptoAPI",
		sysDefender:"تاریخچه اسکن آنتی ویروس Windows",
		sysManifest:"حافظه پنهان مانیفست Windows",
		sysWinSearch:"گزارشات جستجوی Windows",
		sysErrorRepopt:"گزارشات خطای Windows",
		sysIconCache:"حافظه پنهان نمادهای Windows",
		sysPrefechFile:"فایل‌های Prefetch در Windows",
		sysFontCache:"حافظه پنهان فونت‌های Windows",
		sysSysLog:"فایل‌های گزارش سیستم Windows",
		sysThumbCache:"حافظه پنهان تصاویر انگشتی",
		sysUpdatePatch:"زمان‌های به‌روزرسانی خودکار سیستم",
		sysSystempFile:"فایل‌های موقتی سیستم",
		sysDefender:"حافظه پنهان پشتیبان به‌روزرسانی آنتی ویروس Windows",
		sysWinOld:"فایل‌های پشتیبان قدیمی Windows",
		sysInstalltemp:"فایل‌های موقتی نصب Windows",
		sysDumpFile:"فایل‌های رونوشت حافظه",
    };
    return dictionary;
});