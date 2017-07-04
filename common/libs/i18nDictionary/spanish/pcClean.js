define('spanish:pcclean', function(require, exports, module){
    var dictionary = {
		//浏览器缓存
        ieTemp:"Caché IE",//临时文件夹"
        chromeHistory:"Caché Chrome",
        firefoxHistory:"Caché Firefox",
        
        //第三方应用软件
        bitCometDld:"Registros de descargas de BitComet ",
        
        kmPlayer:"KMPlayer",
        skype:"Skype",
        line:"Line",
        facebook:"Facebook",
        vicMediaPlayer:"VLC Media Player",
        youtubeDown:"YouTube Downloader",
        mobogenie:"Mobogenie",
        
        //注册表
        regInvalidStartMenu:"Documentos del menú Inicio no válidos",
        regInvalidMenu:"Entradas del menú contextual no válidos",
        regMuicache:"Archivos MUI de referencia inválidos",
        regHelp:"Archivos de Ayuda inválidos",
        regInvalidAppPath:"Ruta de Aplicación inválida",
        regInvalidInstall:"Residuos de Software de Instalación",
        regInvalidUninstall:"Residuos de software de Desinstalación",
        regFileAssoc:"Asociación de archivos no válidos",
        regInvalidFont:"Fuentes no válidas",
        regInvalidStartRun:"Entradas de inicio no válidos",
        regDll:"DLL redundante",
        regCom:"Componentes COM inválidos",
        
        regOpenSaveDlg:"Expedientes de apertura de diálogo ",
        regExtHistory:"Expedientes de apertura de tipo de archivo no válidos ",
        regWinRar:"Registros de apertura Winrar ",
        regWinZip:"Registros de apertura Winzip",
        regOffice:"Registros de apertura de oficina",
        regStartMenu:"Entradas del menú de inicio invalido",
        regUninstall:"Desinstalación redundante",
        regInvalidFire:"Configuración del firewall no válido",
        regInvalidHelp:"Entradas del menú de ayuda no válidas",
        regFailActiveX:"Info ActiveX no válido",
        regFailClass:"Info de categoría no válido",
        regRedundancy:"información redundante",
        
        //回收站文件
        windowsTrash:"Papelera de reciclaje",
        
        //痕迹清理
        rencentUseFile:"Archivos abiertos recientemente (Archivo)",
        gooleToolbar:"Barra de Herramientas de Google",
        regAccessHistory:"Historial de Acceso a Registro",
        windowsSearchHistory:"Buscar Registros",
        win7forward:"Windows 7 Saltar Lista",
        winthumbCache:"Windows Thumbnail Cache",
        
        /*10月21新增*/
        //第三方应用软件
        flashClean:"Flash Cache",
        appleLogClean:"Apple Software Logaritmo Archivos",
        msseLogClean:"Registro de Microsoft Security Essentials",
        //10-21新增注册表
		runDlg:"\"Ejecutar\" Cuadro de diálogo del historial",
		visitedDir:"Programas recientemente ejecutados",
		openSaveHistory:"Programas recientemente ejecutados",
		winAndSize:"Window Position and Size History",
		rencentUseReg:"Archivos Recientemente abiertos (Registro)",
		fileExtHistory:"Historial de Extensión de Archivos",
		recentProgHistory:"Historial de programas recientemente abiertos",
		noticeIconHistory:"Historial de Notificación de íconos de área",
		networkDrivesHistory:"Historial de Red de Unidad de Mapeo",
		findComputerHistory:"Historial de Búsqueda de Computadora",
		findDocumentHistory:"Historial de Búsqueda de Archivos",
		findPrinterHistory:"Historial de Búsqueda de Impresora",
		regVisitePos:"Último acceso Regedit",
		windowsRegHistory:"Historial del Registro de Windows",
		netNearBy:"Sitios de Red",
        
		/*10-21新增*/
		// 系统垃圾清理
		sysWinUpdate:"Actualización automática de la base de datos de Windows",
		sysWinWinsxs:"Copia de seguridad de Windows WinSxS caché",
		sysWinIns:"Windows Installer Temp Cache",
		sysIisLog:"IIS Log Files",
		sysCryptoapi:"Windows CryptoAPI Caché Certificado",
		sysDefender:"Historial de Escaneo de Windows Defender",
		sysManifest:"Windows Caché Manifiesto",
		sysWinSearch:"Registro de Búsqueda de Windows",
		sysErrorRepopt:"Registro de Error de Windows",
		sysIconCache:"Icono de Windows caché",
		sysPrefechFile:"Los archivos de Windows Prefetch",
		sysFontCache:"Windows Font Cache",
		sysSysLog:"Registro de archivos de Windows System",
		sysThumbCache:"Thumbnail Cache",
		sysUpdatePatch:"System Auto-update Patches",
		sysSystempFile:"System Temp Files",
		sysDefender:"Windows Defender Update Backup Cache",
		sysWinOld:"Windows.Old Respaldos de Archivos",
		sysInstalltemp:"Windows Installation Temp Files",
		sysDumpFile:"Memory Dump Files",
		
    };
    return dictionary;
});