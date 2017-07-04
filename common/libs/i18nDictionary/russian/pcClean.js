define('russian:pcclean', function(require, exports, module){
    var dictionary = {
		//浏览器缓存
        ieTemp:"Кэш Internet Explorer",//临时文件夹"
        chromeHistory:"Кэш Chrome",
        firefoxHistory:"Кэш Mozilla Firefox",
        
        //第三方应用软件
        bitCometDld:"Данные скачивания BitComet ",
        
        kmPlayer:"KMPlayer",
        skype:"Skype",
        line:"Line",
        facebook:"Facebook",
        vicMediaPlayer:"VLC Media Player",
        youtubeDown:"YouTube Downloader",
        mobogenie:"Mobogenie",
        
        //注册表
        regInvalidStartMenu:"Недопустимые записи Меню Пуск",
        regInvalidMenu:"Недействительные пункты контекстного меню ",
        regMuicache:"Неверные MUI файлы справки",
        regHelp:"Недействительные файлы помощи",
        regInvalidAppPath:"Недействительные пути к приложениям",
        regInvalidInstall:"Мусор от установки приложений",
        regInvalidUninstall:"Удаление мусора от деинсталляции приложений",
        regFileAssoc:"Неправильная ассоциация файлов",
        regInvalidFont:"Неправильные шрифты",
        regInvalidStartRun:"Недействительные параметры автозапуска",
        regDll:"Резервный DLL",
        regCom:"Недопустимые компоненты COM",
        
        regOpenSaveDlg:"Dialog opening records",
        regExtHistory:"Invalid file type opening records",
        regWinRar:"Записи Winrar ",
        regWinZip:"Записи Winzip",
        regOffice:"Записи Office",
        regStartMenu:"Неправильные запросы меню запуска",
        regUninstall:"Лишние данные деинстализации",
        regInvalidFire:"Неправильные настройки файрволла",
        regInvalidHelp:"Неправильные запросы в меню помощи",
        regFailActiveX:"Неверный ActiveX info",
        regFailClass:"Неверная информация категории",
        regRedundancy:"Лишняя информация",
        
        //回收站文件
        windowsTrash:"Корзина",
        
        //痕迹清理
        rencentUseFile:"Недавно открытые файлы (файл)",
        gooleToolbar:"Панель Google Tool",
        regAccessHistory:"Реестр истории доступа",
        windowsSearchHistory:"История поиска",
        win7forward:"Списки переходов Windows 7",
        winthumbCache:"Windows кэш эскизов",
        
        /*10月21新增*/
        //第三方应用软件
        flashClean:"Flash кэш",
        appleLogClean:"Логи программ Apple",
        msseLogClean:"Логи Microsoft Security Essentials",
        //10-21新增注册表
		runDlg:"История поля \"Выполнить\"",
		visitedDir:"Недавно запущенные программы",
		openSaveHistory:"Недавно запускаемые программы",
		winAndSize:"Размещение и размер истории Window",
		rencentUseReg:"Недавно открытые файлы (реестр)",
		fileExtHistory:"История расширения файлов",
		recentProgHistory:"История недавно открытых программ",
		noticeIconHistory:"История центра уведомлений",
		networkDrivesHistory:"Network Drive Mapping History",
		findComputerHistory:"История поиска по компьютеру",
		findDocumentHistory:"История поиска файлов",
		findPrinterHistory:"История поиска принтеров",
		regVisitePos:"Последний заход в реестр",
		windowsRegHistory:"История реестра Windows",
		netNearBy:"Сетевое окружение",
        
		/*10-21新增*/
		// 系统垃圾清理
		sysWinUpdate:"База автообновления Windows",
		sysWinWinsxs:"Резервный кэш Windows WinSxS",
		sysWinIns:"Кэш временных установочных файлов Windows",
		sysIisLog:"IIS лог файлы",
		sysCryptoapi:"Кэш сертификатов Windows CryptoAPI",
		sysDefender:"История сканирования Windows Defender",
		sysManifest:"Кэш Windows Manifest",
		sysWinSearch:"Поисковые логи Windows",
		sysErrorRepopt:"Отчеты об ошибках Windows",
		sysIconCache:"Кэш иконок Windows",
		sysPrefechFile:"Файлы трассировки Windows",
		sysFontCache:"Кэш шрифтов Windows",
		sysSysLog:"Лог системных файлов Windows",
		sysThumbCache:"Кэш эскизов",
		sysUpdatePatch:"Автоматические системные Обновления",
		sysSystempFile:"Системные временные файлы",
		sysDefender:"Кэш резервных файлов обновления Windows Defender",
		sysWinOld:"Резервные файлы Windows.Old",
		sysInstalltemp:"Временные установочные файлы Windows",
		sysDumpFile:"Файлы дампа памяти",
		
    };
    return dictionary;
});