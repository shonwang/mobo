define('italian:pcclean', function(require, exports, module){
    var dictionary = {
		//浏览器缓存
        ieTemp:"Cache di IE",//临时文件夹"
        chromeHistory:"Cache di Chrome",
        firefoxHistory:"Cache di Firefox",
        
        //第三方应用软件
        bitCometDld:"Record del download di BitComet",
        
        kmPlayer:"KMPlayer",
        skype:"Skype",
        line:"Line",
        facebook:"Facebook",
        vicMediaPlayer:"VLC Media Player",
        youtubeDown:"YouTube Downloader",
        mobogenie:"Mobogenie",
        
        //注册表
        regInvalidStartMenu:"Record del menu Start non validi",
        regInvalidMenu:"Voci del menu di scelta rapida non valide",
        regMuicache:"File di riferimento MUI non validi",
        regHelp:"File della guida non validi",
        regInvalidAppPath:"Percorsi applicazione non validi",
        regInvalidInstall:"File residui di installazione software",
        regInvalidUninstall:"File residui di disinstallazione software",
        regFileAssoc:"Associazioni file non valide",
        regInvalidFont:"Tipi di carattere non validi",
        regInvalidStartRun:"Voci di avvio non valide",
        regDll:"DLL ridondante",
        regCom:"Componenti COM non validi",
        
        regOpenSaveDlg:"Record delle aperture delle finestre di dialogo",
        regExtHistory:"Record delle aperture tipi di file non validi",
        regWinRar:"Record delle aperture di Winrar",
        regWinZip:"Record delle aperture di Winzip",
        regOffice:"Record delle aperture di Office",
        regStartMenu:"Voci del menu di avvio non valide",
        regUninstall:"Informazioni ridondanti sulla disinstallazione",
        regInvalidFire:"Impostazioni del firewall non valide",
        regInvalidHelp:"Voci del menu guida non valide",
        regFailActiveX:"Informazioni ActiveX non valide",
        regFailClass:"Informazioni categoria non valide",
        regRedundancy:"Informazioni ridondanti",
        
        //回收站文件
        windowsTrash:"Cestino",
        
        //痕迹清理
        rencentUseFile:"File aperti di recente (File)",
        gooleToolbar:"Google Toolbar",
        regAccessHistory:"Cronologia degli accessi al registro",
        windowsSearchHistory:"Ricerca record",
        win7forward:"Jump List Windows 7",
        winthumbCache:"Cache anteprime di Windows",
        
        /*10月21新增*/
        //第三方应用软件
        flashClean:"Cache flash",
        appleLogClean:"File di registro software Apple",
        msseLogClean:"Registro Microsoft Security Essentials",
        //10-21新增注册表
		runDlg:"Cronologia finestra di dialogo \"Esegui\"",
		visitedDir:"Programmi eseguiti di recente",
		openSaveHistory:"Programmi eseguiti di recente",
		winAndSize:"Cronologia posizione e dimensioni finestra",
		rencentUseReg:"File aperti di recente (Registro)",
		fileExtHistory:"Cronologia estensione file",
		recentProgHistory:"Cronologia programmi aperti di recente",
		noticeIconHistory:"Cronologia icona area di notifica",
		networkDrivesHistory:"Cronologia mapping unità di rete",
		findComputerHistory:"Cronologia ricerca computer",
		findDocumentHistory:"Cronologia ricerca file",
		findPrinterHistory:"Cronologia ricerca stampante",
		regVisitePos:"Ultimo accesso a Regedit",
		windowsRegHistory:"Cronologia registro di sistema di Windows",
		netNearBy:"Risorse di rete",
        
		/*10-21新增*/
		// 系统垃圾清理
		sysWinUpdate:"Database aggiornamento automatico di Windows",
		sysWinWinsxs:"Cache di backup WinSxS di Windows",
		sysWinIns:"Cache temporanea Windows Installer",
		sysIisLog:"File di registro IIS",
		sysCryptoapi:"Cache certificato CryptoAPI di Windows",
		sysDefender:"Cronologia analisi di Windows Defender",
		sysManifest:"Cache manifesto di Windows",
		sysWinSearch:"Log di ricerca di Windows",
		sysErrorRepopt:"Segnalazioni degli errori di Windows",
		sysIconCache:"Cache icona di Windows",
		sysPrefechFile:"File di prelettura di Windows",
		sysFontCache:"Cache tipi di carattere Windows",
		sysSysLog:"File del Registro di sistema di Windows",
		sysThumbCache:"Cache anteprime",
		sysUpdatePatch:"Patch di aggiornamento automatico del sistema",
		sysSystempFile:"File temporanei di sistema",
		sysDefender:"Cache di backup aggiornamento Windows Defender",
		sysWinOld:"File di backup Windows.Old",
		sysInstalltemp:"File temporanei di installazione di Windows",
		sysDumpFile:"File di dump della memoria",
		
    };
    return dictionary;
});