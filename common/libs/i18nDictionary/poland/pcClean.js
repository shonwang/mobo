define('poland:pcclean', function(require, exports, module){
    var dictionary = {
		//浏览器缓存
        ieTemp:"Pamięć podręczna przeglądarki IE",//临时文件夹"
        chromeHistory:"Pamięć podręczna przeglądarki Chrome",
        firefoxHistory:"Pamięć podręczna przeglądarki Firefox",
        
         //第三方应用软件
        bitCometDld:"Rejestr pobierania BitComet",
        
        kmPlayer:"KMPlayer",
        skype:"Skype",
        line:"Line",
        facebook:"Facebook",
        vicMediaPlayer:"VLC Media Player",
        youtubeDown:"YouTube Downloader",
        mobogenie:"Mobogenie",
        
        //注册表
        regInvalidStartMenu:"Nieprawidłowe zapisy menu Start",
        regInvalidMenu:"Nieprawidłowe wpisy menu kontekstowego",
        regMuicache:"Nieprawidłowe pliki referencyjne MUI",
        regHelp:"Nieprawidłowe pliki pomocy",
        regInvalidAppPath:"Nieprawidłowe ścieżki aplikacji",
        regInvalidInstall:"Pozostałości po instalacji oprogramowania",
        regInvalidUninstall:"Pozostałości po dezinstalacji oprogramowania",
        regFileAssoc:"Nieprawidłowe skojarzenia plików",
        regInvalidFont:"Nieprawidłowe czcionki",
        regInvalidStartRun:"Nieprawidłowe wpisy startowe",
        regDll:"Zbędne pliki DLL",
        regCom:"Nieprawidłowe składniki COM",
        
        regOpenSaveDlg:"Rejestr otwierania okien dialogowych",
        regExtHistory:"Rejestr otwierania nieprawidłowych typów plików",
        regWinRar:"Rejestr otwierania Winrar",
        regWinZip:"Rejestr otwierania Winzip",
        regOffice:"Rejestr otwierania Office",
        regStartMenu:"Nieprawidłowe wpisy menu Start",
        regUninstall:"Zbędne informacje dot. dezinstalacji",
        regInvalidFire:"Nieprawidłowe ustawienia zapory firewall",
        regInvalidHelp:"Nieprawidłowe wpisy menu pomocy",
        regFailActiveX:"Nieprawidłowe informacje o ActiveX",
        regFailClass:"Nieprawidłowe informacje o kategorii",
        regRedundancy:"Zbędne informacje",
        
        //回收站文件
        windowsTrash:"Kosz",
        
        //痕迹清理
        rencentUseFile:"Ostatnio otwierane pliki (plik)",
        gooleToolbar:"Pasek narzędzi Google",
        regAccessHistory:"Historia dostępu do rejestru",
        windowsSearchHistory:"Archiwum wyszukiwania",
        win7forward:"Lista szybkiego dostępu Windows 7",
        winthumbCache:"Pamięć podręczna miniatur systemu Windows",
        
        /*10月21新增*/
        //第三方应用软件
        flashClean:"Pamięć podręczna pamięci flash",
        appleLogClean:"Pliki dziennika oprogramowania Apple",
        msseLogClean:"Dziennik zabezpieczeń podstawowych Microsoft",
        //10-21新增注册表
		runDlg:"Historia okna dialogowego \"Uruchom\"",
		visitedDir:"Ostatnio uruchamiane programy",
		openSaveHistory:"Ostatnio uruchamiane programy",
		winAndSize:"Historia pozycji i rozmiarów okna",
		rencentUseReg:"Ostatnio otwierane pliki (rejestr)",
		fileExtHistory:"Historia rozszerzeń plików",
		recentProgHistory:"Historia ostatnio otwieranych programów",
		noticeIconHistory:"Historia ikony obszaru powiadomień",
		networkDrivesHistory:"Historia mapowania napędów sieciowych",
		findComputerHistory:"Historia wyszukiwania w komputerze",
		findDocumentHistory:"Historia wyszukiwania plików",
		findPrinterHistory:"Historia wyszukiwania drukarek",
		regVisitePos:"Ostatni dostęp do edytora rejestru",
		windowsRegHistory:"Historia rejestru systemu Windows",
		netNearBy:"Miejsca sieciowe",
        
		/*10-21新增*/
		// 系统垃圾清理
		sysWinUpdate:"Baza danych automatycznej aktualizacji systemu Windows",
		sysWinWinsxs:"Zapasowa pamięć podręczna folderu WinSxS systemu Windows",
		sysWinIns:"Tymczasowa pamięć podręczna instalatora systemu Windows",
		sysIisLog:"Pliki dziennika IIS",
		sysCryptoapi:"Pamięć podręczna certyfikatu Windows CryptoAPI",
		sysDefender:"Historia skanowania programu Windows Defender",
		sysManifest:"Pamięć podręczna pliku manifestu systemu Windows",
		sysWinSearch:"Dzienniki wyszukiwania systemu Windows",
		sysErrorRepopt:"Raporty błędów systemu Windows",
		sysIconCache:"Pamięć podręczna ikon systemu Windows",
		sysPrefechFile:"Pliki systemu Windows pobierane z wyprzedzeniem",
		sysFontCache:"Pamięć podręczna czcionek Windows",
		sysSysLog:"Pliki dziennika systemu Windows",
		sysThumbCache:"Pamięć podręczna miniatur",
		sysUpdatePatch:"Poprawki automatycznej aktualizacji systemu",
		sysSystempFile:"Tymczasowe pliki systemowe",
		sysDefender:"Zapasowa pamięć podręczna aktualizacji programu Windows Defender",
		sysWinOld:"Stare zapasowe pliki systemu Windows",
		sysInstalltemp:"Pliki tymczasowe instalacji systemu Windows",
		sysDumpFile:"Pliki zrzutu pamięci",
		
    };
    return dictionary;
});