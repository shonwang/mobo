define('arabic:pcclean', function(require, exports, module){
    var dictionary = {
		//浏览器缓存
        ieTemp:"مخبأ IE",//临时文件夹"
        chromeHistory:"مخبأ Chrome",
        firefoxHistory:"مخبأ Firefox",
         //第三方应用软件
        bitCometDld:" bitComet سجلات تحميل  ",
        
        kmPlayer:"KMPlayer",
        skype:"Skype",
        line:"Line",
        facebook:"Facebook",
        vicMediaPlayer:"VLC Media Player",
        youtubeDown:"YouTube Downloader",
        mobogenie:"Mobogenie",
        
        //注册表
        regInvalidStartMenu:"قائمة تسجيل البدء غير صالحة",
        regInvalidMenu:"قائمة اليمينة غير صالحة",
        regMuicache:"إشارات MUI غير صحيحة",
        regHelp:"ملفات مساعدة غير صالح",
        regInvalidAppPath:"مسار التطبيق غير صالح",
        regInvalidInstall:"المعلومات الباقية للبرنامج المثبت",
        regInvalidUninstall:"المعلومات الباقية للبرنامج الملغي",
        regFileAssoc:"اقتران الملف غير صالحة",
        regInvalidFont:"الخط غير صالح",
        regInvalidStartRun:"إدخالات بدء التشغيل غير صالحة",
        regDll:"مكتبة الارتباط الحيوي زائدة",
        regCom:"comغير صالحة",
        
        regOpenSaveDlg:" الحوار افتتاح سجلات ",
        regExtHistory:" سجلات فتح الملف غير صالحة  ",
        regWinRar:" WinRar سجلات افتتاح  ",
        regWinZip:" WinZip  سجلات افتتاح ",
        regOffice:" Office سجلات افتتاح",
        regStartMenu:" مدخل البدء غير صالح على القائمة ",
        regUninstall:" معلومات الإلغاء الزائدة ",
        regInvalidFire:" إعدادات جدار الحماية غير صالحة ",
        regInvalidHelp:"مدخل المساعدة غير صالح على القائمة",
        regFailActiveX:" غير صالحة ActiveX معلومات  ",
        regFailClass:" معلومات فئة غير صالحة ",
        regRedundancy:" معلومات زائدة ",
         
        //回收站文件
        windowsTrash:" سلة المحذوفات لWindows ",
        
        //痕迹清理
        rencentUseFile:"التسجيل من الوثائق(ملفات) التي تم فتحها مؤخرا",
        gooleToolbar:"شريط أدوات Google",
        regAccessHistory:"التسجيل السابق لزيارة تسجيل البرنامج",
        windowsSearchHistory:"تسجيل بحث ل Windows",
        win7forward:"قائمة الانتقال ل Windows7",
        winthumbCache:" تسجيل طلاء ل Windows",
        
        /*10月21新增*/
        //第三方应用软件
        flashClean:"ذاكرة فلاش",
        appleLogClean:"ملف يوميات برنامج Apple",
        msseLogClean:"يوميات Microsoft Security Essentials",
        //10-21新增注册表
		runDlg:"\"运行\"تاريخ الحوار",
		visitedDir:"التاريخ الحديث لتشغيل البرنامج",
		openSaveHistory:"التاريخ الحديث لتشغيل البرنامج",
		winAndSize:"تاريخ موقع النافذة وحجمها",
		rencentUseReg:"التسجيل الحديث لافتتح الوثائق(التسجيل)",
		fileExtHistory:"تاريخ ملحق الملف",
		recentProgHistory:"التسجيل الحديث لافتتح البرامج",
		noticeIconHistory:"تاريخ رمز  في منطقة الإعلام",
		networkDrivesHistory:"تاريخ تعيين محرك أقراص الشبكة ",
		findComputerHistory:"تاريخ البحث عن أجهزة الكمبيوتر",
		findDocumentHistory:"تاريخ البحث عن الملفات",
		findPrinterHistory:"تاريخ البحث عن جهاز الطباعة",
		regVisitePos:"اخر زيارة لمحرر التسجيل",
		windowsRegHistory:"تاريخ تيار سجل ويندوز",
		netNearBy:"جار الشبكة ل Windows",
        
		/*10-21新增*/
		// 系统垃圾清理
		sysWinUpdate:"قاعدة المعطيات للتحديث التلقائي Windows",
		sysWinWinsxs:"مخبأ النسخ الاحتياطي ل Windows winSxs",
		sysWinIns:"المخبأ المؤقت ل Windows installer",
		sysIisLog:"ملف يوميات IIS",
		sysCryptoapi:"مخبأ شهادة ل Windows CryptoAPI",
		sysDefender:"تاريخ المسح ل Windows Defender",
		sysManifest:"مخبأ  Windows ManifestCache",
		sysWinSearch:"يوميات Windows Search",
		sysErrorRepopt:"تقرير أخطاء ويندوز",
		sysIconCache:"مخبأ رمز Windows",
		sysPrefechFile:"ملف ما قبل القراءة لويندوز",
		sysFontCache:"ملفات مخبأ الخط ل Windows",
		sysSysLog:"ملفات اليوميات لنظام Windows",
		sysThumbCache:"ملف مخبأ المصغرة",
		sysUpdatePatch:"البقعة المتروك عند التحديث التلقائي للنظام",
		sysSystempFile:"الملفات المؤقتة للنظام",
		sysDefender:"مخبأ النسخ الاحتياطي لتجسيد Windows Defender",
		sysWinOld:"ملفات النسخ الاحتياطي ل Windows.Old",
		sysInstalltemp:"تركيب الملفات المؤقتة ل Windows",
		sysDumpFile:"ملفات تفريغ الذاكرة",
        
        
    };
    return dictionary;
});