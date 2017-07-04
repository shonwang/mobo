define('english:pcclean', function(require, exports, module){
    var dictionary = {
		//浏览器缓存
        ieTemp:"IE Cache",//临时文件夹"
        chromeHistory:"Chrome Cache",
        firefoxHistory:"Firefox Cache",
        //第三方应用软件
        bitCometDld:"BitComet download records",
        
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
        
        regOpenSaveDlg:"Dialog opening records",
        regExtHistory:"Invalid file type opening records",
        regWinRar:"Winrar opening records",
        regWinZip:"Winzip opening records",
        regOffice:"Office opening records",
        regStartMenu:"Invalid start menu entries",
        regUninstall:"Redundant uninstallation info",
        regInvalidFire:"Invalid firewall settings",
        regInvalidHelp:"Invalid help menu entries",
        regFailActiveX:"Invalid ActiveX info",
        regFailClass:"Invalid category info",
        regRedundancy:"Redundant info",
         
        //回收站文件
        windowsTrash:"Recycling Bin",
        
        //痕迹清理
        rencentUseFile:"Recently Opened Files (File)",
        gooleToolbar:"Google Tool Bar",
        regAccessHistory:"Registry Access History",
        windowsSearchHistory:"Search Records",
        win7forward:"Windows 7 Jump List",
        winthumbCache:"Windows Thumbnail Cache",
        
        /*10月21新增*/
        //第三方应用软件
        flashClean:"Flash Cache",
        appleLogClean:"Apple Software Log Files",
        msseLogClean:"Microsoft Security Essentials Log",
        //10-21新增注册表
		runDlg:"\"Run\" Dialog Box History",
		visitedDir:"Recently Run Programs",
		openSaveHistory:"Recently Run Programs",
		winAndSize:"Window Position and Size History",
		rencentUseReg:"Recently Opened Files (Registry)",
		fileExtHistory:"File Extension History",
		recentProgHistory:"Recently Opened Program History",
		noticeIconHistory:"Notification Area Icon History",
		networkDrivesHistory:"Network Drive Mapping History",
		findComputerHistory:"Computer Search History",
		findDocumentHistory:"File Search History",
		findPrinterHistory:"Printer Search History",
		regVisitePos:"Last Regedit Access",
		windowsRegHistory:"Windows Registry History",
		netNearBy:"Network Places",
        
		/*10-21新增*/
		// 系统垃圾清理
		sysWinUpdate:"Windows Auto-update Database",
		sysWinWinsxs:"Windows WinSxS Backup Cache",
		sysWinIns:"Windows Installer Temp Cache",
		sysIisLog:"IIS Log Files",
		sysCryptoapi:"Windows CryptoAPI Certificate Cache",
		sysDefender:"Windows Defender Scan History",
		sysManifest:"Windows Manifest Cache",
		sysWinSearch:"Windows Search Logs",
		sysErrorRepopt:"Windows Error Reports",
		sysIconCache:"Windows Icon Cache",
		sysPrefechFile:"Windows Prefetch Files",
		sysFontCache:"Windows Font Cache",
		sysSysLog:"Windows System Log Files",
		sysThumbCache:"Thumbnail Cache",
		sysUpdatePatch:"System Auto-update Patches",
		sysSystempFile:"System Temp Files",
		sysDefender:"Windows Defender Update Backup Cache",
		sysWinOld:"Windows.Old Backup Files",
		sysInstalltemp:"Windows Installation Temp Files",
		sysDumpFile:"Memory Dump Files",
        
		
    };
    return dictionary;
});