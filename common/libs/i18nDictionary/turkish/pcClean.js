define('turkish:pcclean', function(require, exports, module){
    var dictionary = {
		//浏览器缓存
        ieTemp:"IE Önbelleği",//临时文件夹"
        chromeHistory:"Chrome Önbelleği",
        firefoxHistory:"Firefox Önbelleği",
        
        //第三方应用软件
        bitCometDld:"BitComet indirme kayıtları",
        
        kmPlayer:"KMPlayer",
        skype:"Skype",
        line:"Line",
        facebook:"Facebook",
        vicMediaPlayer:"VLC Media Player",
        youtubeDown:"YouTube Downloader",
        mobogenie:"Mobogenie",
        
        //注册表
        regInvalidStartMenu:"Geçersiz Başlat Menüsü Kayıtları",
        regInvalidMenu:"Geçersiz İçerik Menü Girdileri",
        regMuicache:"Geçersiz MUI Referans Dosyaları",
        regHelp:"Geçersiz Yardım Dosyaları",
        regInvalidAppPath:"Geçersiz Uygulama Yolları",
        regInvalidInstall:"Yazılım Kurulum Kalıntıları",
        regInvalidUninstall:"Yazılım Kaldırma Kalıntıları",
        regFileAssoc:"Geçersiz Dosya İlişkilendirmeleri",
        regInvalidFont:"Geçersiz Yazı Tipleri",
        regInvalidStartRun:"Geçersiz Başlangıç Girdileri",
        regDll:"Artık DLL",
        regCom:"Geçersiz COM Bileşenleri",
        
        regOpenSaveDlg:"Diyalog açan kayıtlar",
        regExtHistory:"Geçersiz dosya türü açan kayıtlar",
        regWinRar:"Winrar açan kayıtlar",
        regWinZip:"Winzip açan kayıtlar",
        regOffice:"Office açan kayıtlar",
        regStartMenu:"Geçersiz başlat menüsü girdileri",
        regUninstall:"Gereksiz kaldırma bilgileri",
        regInvalidFire:"Geçersiz güvenlik duvarı ayarları",
        regInvalidHelp:"Geçersiz yardım menüsü girdileri",
        regFailActiveX:"Geçersiz ActiveX bilgisi",
        regFailClass:"Geçersiz kategori bilgisi",
        regRedundancy:"Gereksiz bilgi",
        
        //回收站文件
        windowsTrash:"Recycling Bin",
        
        //痕迹清理
        rencentUseFile:"Yakın Zamanda Açılan Dosyalar (Dosya)",
        gooleToolbar:"Google Araç Çubuğu",
        regAccessHistory:"Kayit Erişim Geçmişi;",
        windowsSearchHistory:"Arama Kayıtları",
        win7forward:"Windows 7 Sıçrama Listesi",
        winthumbCache:"Windows küçük resim önbelleği",
        
        /*10月21新增*/
        //第三方应用软件
        flashClean:"Flaş Önbelleği",
        appleLogClean:"Apple Yazılım Günlük Dosyaları",
        msseLogClean:"Microsoft Güvenlik Temelleri Günlüğü",
        //10-21新增注册表
		runDlg:"\"Çalıştır\" İletişim Kutusu Geçmişi",
		visitedDir:"Yakın Zamanda Çalıştırılan Programlar",
		openSaveHistory:"Yakın Zamanda Çalıştırılan Programlar",
		winAndSize:"Pencere Pozisyon ve Boyut Geçmişi",
		rencentUseReg:"Yakın Zamanda Açılan Dosyalar (Kayıt)",
		fileExtHistory:"Dosya Uzantısı Geçmişi",
		recentProgHistory:"Yakın Zamanda Açılmış Program Geçmişi",
		noticeIconHistory:"Bildirim Alanı İkon Geçmişi",
		networkDrivesHistory:"Ağ Sürücüsü Eşleştirme Geçmişi",
		findComputerHistory:"Bilgisayar Arama Geçmişi",
		findDocumentHistory:"Dosya Arama Geçmişi",
		findPrinterHistory:"Yazıcı Arama Geçmişi",
		regVisitePos:"Son Regedit Erişimi",
		windowsRegHistory:"Windows Kayıt Geçmişi",
		netNearBy:"Ağ Yerleri",
        
		/*10-21新增*/
		// 系统垃圾清理
		sysWinUpdate:"Windows Otomatik Güncelleme Veri Tabanı",
		sysWinWinsxs:"Windows WinSxS Yedekleme Önbelleği",
		sysWinIns:"Windows Kurucusu Geçici Önbelleği",
		sysIisLog:"IIS Günlük Dosyaları",
		sysCryptoapi:"Windows CryptoAPI Sertifikası Önbelleği",
		sysDefender:"Windows Defender Tarama Geçmişi",
		sysManifest:"Windows Manifesto Önbelleği",
		sysWinSearch:"Windows Arama Günlükleri",
		sysErrorRepopt:"Windows Hata Raporları",
		sysIconCache:"Windows İkon Önbelleği",
		sysPrefechFile:"Windows Belleğe Önceden Yüklenmiş Dosyalar",
		sysFontCache:"Windows Font Önbelleği",
		sysSysLog:"Windows Sistem Günlük Dosyaları",
		sysThumbCache:"Küçük Resim Önbelleği",
		sysUpdatePatch:"Sistem Otomatik Güncelleme Yamaları",
		sysSystempFile:"Sistem Geçici Dosyaları",
		sysDefender:"Windows Defender Güncelleme Yedekleme Önbelleği",
		sysWinOld:"Windows Eski Yedekleme Dosyaları",
		sysInstalltemp:"Windows Kurulum Geçici Dosyaları",
		sysDumpFile:"Bellek Dökümü Dosyaları",
		
    };
    return dictionary;
});