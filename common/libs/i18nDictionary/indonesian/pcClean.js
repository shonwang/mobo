define('indonesian:pcclean', function(require, exports, module){
    var dictionary = {
		//浏览器缓存
        ieTemp:"IE Cache",//临时文件夹"
        chromeHistory:"Chrome Cache",
        firefoxHistory:"Firefox Cache",
        
        //第三方应用软件
        bitCometDld:"Catatan download BitComet",
        
        kmPlayer:"KMPlayer",
        skype:"Skype",
        line:"Line",
        facebook:"Facebook",
        vicMediaPlayer:"VLC Media Player",
        youtubeDown:"YouTube Downloader",
        mobogenie:"Mobogenie",
        
        //注册表
        regInvalidStartMenu:"Invalid Start Menu Records",
        regInvalidMenu:"Invalid Context Menu Entries",
        regMuicache:"Invalid MUI Reference Files",
        regHelp:"Invalid Help Files",
        regInvalidAppPath:"Invalid Application Paths",
        regInvalidInstall:"Software Installation Residuals",
        regInvalidUninstall:"Software Uninstallation Residuals",
        regFileAssoc:"Invalid File Associations",
        regInvalidFont:"Invalid Fonts",
        regInvalidStartRun:"Invalid Startup Entries",
        regDll:"Redundant DLL",
        regCom:"Invalid COM Components",
        
        regOpenSaveDlg:"Catatan pembukaan dialog",
        regExtHistory:"Catatan pembukaan tipe berkas tidak valid",
        regWinRar:"Catatan pembukaan Winrar ",
        regWinZip:"Catatan pembukaan Winzip ",
        regOffice:"Catatan pembukaan kantor",
        regStartMenu:"Entri menu start tidak valid",
        regUninstall:"Info uninstallation berlebihan",
        regInvalidFire:"Pengaturan Firewall tidak valid",
        regInvalidHelp:"Entri menu bantuan tidak valid",
        regFailActiveX:"Info ActiveX tidak valid",
        regFailClass:"Info kategori tidak valid",
        regRedundancy:"Info berlebihan",
        
        //回收站文件
        windowsTrash:"Keranjang Sampah",
        
        //痕迹清理
        rencentUseFile:"File yang Baru Dibuka (File)",
        gooleToolbar:"Bilah Alat Google",
        regAccessHistory:"Riwayat Akses Registri",
        windowsSearchHistory:"Cari di Catatan",
        win7forward:"Daftar Pintas Windows 7",
        winthumbCache:"Singgahan Gambar Kecil Windows",
        
        /*10月21新增*/
        //第三方应用软件
        flashClean:"Singgahan Flash",
        appleLogClean:"File Log Perangkat Lunak Apple",
        msseLogClean:"Log Esensial Keamanan Microsoft",
        //10-21新增注册表
		runDlg:"Riwayat Kotak Dialog \"Jalankan\"",
		visitedDir:"Program yang Baru Dijalankan",
		openSaveHistory:"Program yang Baru Dijalankan",
		winAndSize:"Riwayat Posisi dan Ukuran Jendela",
		rencentUseReg:"File yang Baru Dibuka (Registri)",
		fileExtHistory:"Riwayat Ekstensi File",
		recentProgHistory:"Riwayat Program yang Baru Dibuka",
		noticeIconHistory:"Riwayat Ikon Area Pemberitahuan",
		networkDrivesHistory:"Riwayat Pemetaan Drive Jaringan",
		findComputerHistory:"Riwayat Pencarian Komputer",
		findDocumentHistory:"Riwayat Pencarian File",
		findPrinterHistory:"Riwayat Pencarian Printer",
		regVisitePos:"Akses Regedit Terakhir",
		windowsRegHistory:"Riwayat Registri Windows",
		netNearBy:"Tempat Jaringan",
        
		/*10-21新增*/
		// 系统垃圾清理
		sysWinUpdate:"Database Pembaruan Otomatis Windows",
		sysWinWinsxs:"Singgahan Cadangan WinSxS Windows",
		sysWinIns:"Singgahan Sementara Penginstal Windows",
		sysIisLog:"File Log IIS",
		sysCryptoapi:"Singgahan Sertifikat CryptoAPI Windows",
		sysDefender:"Riwayat Pemindaian Pertahanan Windows",
		sysManifest:"Singgahan Manifes Windows",
		sysWinSearch:"Log Pencarian Windows",
		sysErrorRepopt:"Laporan Kesalahan Windows",
		sysIconCache:"Singgahan Ikon Windows",
		sysPrefechFile:"File Pengambilan Sebelumnya Windows",
		sysFontCache:"Singgahan Font Windows",
		sysSysLog:"File Log Sistem Windows",
		sysThumbCache:"Singgahan Gambar Kecil",
		sysUpdatePatch:"Tambahan Pembaruan Otomatis Sistem",
		sysSystempFile:"File Sementaran Sistem",
		sysDefender:"Singgahan Cadangan Pembaruan Pertahanan Windows",
		sysWinOld:"File Cadangan Lama Windows",
		sysInstalltemp:"File Sementara Instalasi Windows",
		sysDumpFile:"File Pembuangan Memori",
    };
    return dictionary;
});