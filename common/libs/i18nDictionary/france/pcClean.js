define('france:pcclean', function(require, exports, module){
    var dictionary = {
		//浏览器缓存
        ieTemp:"Cache d\'Internet Explorer",//临时文件夹"
        chromeHistory:"Cache de Chrome",
        firefoxHistory:"Cache de Firefox",
        
        //第三方应用软件
        bitCometDld:"Journaux de téléchargement BitComet",
        
        kmPlayer:"KMPlayer",
        skype:"Skype",
        line:"Line",
        facebook:"Facebook",
        vicMediaPlayer:"VLC Media Player",
        youtubeDown:"YouTube Downloader",
        mobogenie:"Mobogenie",
        
        //注册表
        regInvalidStartMenu:"Enregistrements non valides du menu Démarrer",
        regInvalidMenu:"Entrées non valides du menu contextuel",
        regMuicache:"Fichiers de référence MUI non valides",
        regHelp:"Fichiers d\'aide non valides",
        regInvalidAppPath:"Chemins d\'application non valides",
        regInvalidInstall:"Fichiers résiduels d\'installation logicielle",
        regInvalidUninstall:"Fichiers résiduels de désinstallation logicielle",
        regFileAssoc:"Associations de fichiers non valides",
        regInvalidFont:"Polices non valides",
        regInvalidStartRun:"Entrées de démarrage incorrectes",
        regDll:"Fichiers DLL redondants",
        regCom:"Composants COM non valides",
        
        regOpenSaveDlg:"Journaux d\'ouverture de boîtes de dialogue",
        regExtHistory:"Journaux d\'ouverture de type de fichier non valide",
        regWinRar:"Journaux d\'ouverture de Winrar",
        regWinZip:"Journaux d\'ouverture de Winzip",
        regOffice:"Journaux d\'ouverture d\'Office",
        regStartMenu:"Entrées non valides du menu Démarrer",
        regUninstall:"Informations redondantes de désinstallation",
        regInvalidFire:"Paramètres du pare-feu non valides",
        regInvalidHelp:"Entrées non valides du menu d\'aide",
        regFailActiveX:"Informations ActiveX non valides",
        regFailClass:"Informations de catégorie non valides",
        regRedundancy:"Informations redondantes",
        
        //回收站文件
        windowsTrash:"Corbeille",
        
        //痕迹清理
        rencentUseFile:"Fichiers ouverts récemment (Fichier)",
        gooleToolbar:"Barre d\'outils Google",
        regAccessHistory:"Historique d\'accès au Registre",
        windowsSearchHistory:"Rechercher des enregistrements",
        win7forward:"Liste de raccourcis Windows 7",
        winthumbCache:"Cache de miniatures Windows",
        
        /*10月21新增*/
        //第三方应用软件
        flashClean:"Cache Flash",
        appleLogClean:"Fichiers journaux logiciels Apple",
        msseLogClean:"Journal des fonctions essentielles de sécurité Microsoft",
        //10-21新增注册表
		runDlg:"Historique de la boîte de dialogue \"Exécuter\"",
		visitedDir:"Programmes récemment exécutés",
		openSaveHistory:"Programmes récemment exécutés",
		winAndSize:"Historique de taille et position de la fenêtre",
		rencentUseReg:"Fichiers ouverts récemment (Registre)",
		fileExtHistory:"Historique d\'extension de fichier",
		recentProgHistory:"Historique des programmes récemment ouverts",
		noticeIconHistory:"Historique de l\'icône Zone de notification",
		networkDrivesHistory:"Historique de mappage de lecteur réseau",
		findComputerHistory:"Historique de recherche d\'ordinateurs",
		findDocumentHistory:"Historique de recherche de fichiers",
		findPrinterHistory:"Historique de recherche d\'imprimantes",
		regVisitePos:"Dernier accès à Regedit",
		windowsRegHistory:"Historique de registre Windows",
		netNearBy:"Favoris réseau",
        
		/*10-21新增*/
		// 系统垃圾清理
		sysWinUpdate:"Base de données des mises à jour automatiques de Windows",
		sysWinWinsxs:"Cache de sauvegarde Windows WinSxS",
		sysWinIns:"Cache temporaire Windows Installer",
		sysIisLog:"Fichiers journaux IIS",
		sysCryptoapi:"Cache de certificat CryptoAPI pour Windows",
		sysDefender:"Historique d\'analyses Windows Defender",
		sysManifest:"Manifeste de cache Windows",
		sysWinSearch:"Journaux de recherches Windows",
		sysErrorRepopt:"Rapports d\'erreur Windows",
		sysIconCache:"Cache de l\'icône Windows",
		sysPrefechFile:"Fichiers de prérécupération Windows",
		sysFontCache:"Cache de police Windows",
		sysSysLog:"Fichiers journaux du système Windows",
		sysThumbCache:"Cache de miniatures",
		sysUpdatePatch:"Correctifs de mise à jour automatique du système",
		sysSystempFile:"Fichiers système temporaires",
		sysDefender:"Cache de sauvegarde de mise à jour de Windows Defender",
		sysWinOld:"Anciens fichiers de sauvegarde Windows",
		sysInstalltemp:"Fichiers temporaires d\'installation Windows",
		sysDumpFile:"Fichiers de vidage mémoire",
    };
    return dictionary;
});