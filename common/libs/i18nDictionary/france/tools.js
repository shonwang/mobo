define('france:tools', function(require, exports, module){
    var dictionary = {
		managementTool:'Outils de gestion',
		backup:'Sauvegarde',/*不超过20个字符*/
		backupIntro:'Sauv. les données de l\'appareil Android sur l\'ordinateur.',/*不超过58个字符*/
		restore:'Restaurer',/*不超过20个字符*/
		restoreIntro:'Restaure des données à partir d\'une sauvegarde précédente.',/*不超过58个字符*/
		fileManager:'Gest. de fichiers',/*不超过20个字符*/
		fileManagerIntro:'Affiche les fichiers et les dossiers de votre appareil.',/*不超过58个字符*/
		screenshot:'Captures d\'écran',/*不超过20个字符*/
		screenshotIntro:'Prend des captures de l\'écran de votre appareil mobile.',/*不超过58个字符*/
		deviceInfoIntro:'Affiche les informations détaillées de l\'appareil.',/*不超过58个字符*/
		installApp:'Inst. appli. /jeu',/*不超过20个字符*/
		installAppIntro:'Installe des fichiers .apk par lot sur votre appareil.',/*不超过58个字符*/
		advancedTool:'Outils avancés',
		root:'Rooter en un clic',/*不超过20个字符*/
		rootIntro:'Roote votre appareil pour libérer davantage de mémoire.',//*不超过58个字符*/
		importOutlook:'Imp. données Outlook',/*不超过20个字符*/
		importOutlookIntro:'Importe les contacts Outlook du PC sur l\'appareil Android.',/*不超过58个字符*/
		importSymbian:'Imp. données Symbian',/*不超过20个字符*/
		importSymbianIntro:'Importe vos contacts Symbian sur votre appareil Android.',/*不超过58个字符*/
		freeWifi:'Wi-Fi gratuit',/*不超过20个字符*/
		freeWifiIntro:'Partage réseau du PC portable avec l\'appareil via Wi-Fi.',/*不超过58个字符*/
		
		/*device info*/
		basicInfo:'Informations de base',
		modelNumber:'Numéro de modèle :',/*不超过19个字符*/
		androidVer:'Version Android :',/*不超过19个字符*/
		screenResoltion:'Résol. de l\écran :',/*不超过19个字符*/
		battery:'Batterie :',/*不超过19个字符*/
		cpu:'Processeur :',/*不超过19个字符*/
		ram:'Mémoire RAM :',/*不超过19个字符*/
		memory:'Mémoire :',/*不超过19个字符*/
		sdCard:'Carte SD :',/*不超过19个字符*/
		isRooted:'Rooté :',/*不超过19个字符*/
		hardwareInfo:'Info. matérielles',/*不超过19个字符*/
		imei:'IMEI :',/*不超过19个字符*/
		serialNumber:'Numéro de série :',/*不超过19个字符*/
		imsi:'IMSI :',/*不超过19个字符*/
		macAddress:'Adresse MAC :',/*不超过19个字符*/
		basebandVer:'V. bande de base :',/*不超过19个字符*/
		kernelVer:'Version du noyau :',/*不超过19个字符*/
		copy:'Copier',/*不超过8个字符*/
		copySuccess:'Copié dans le presse-papiers',
		unknownError: 'Erreur inconnue',
		unKnownText:'Une erreur inconnue s\'est produite.',
		netWorkError:'Erreur réseau',
		netWorkErrorText:'Vérifiez votre connexion réseau.',
		/*2014-09-11*/
		pcCleanerLabel:"Programme de nettoyage PC",
		scanOver:"Analyse terminée. {0} fichiers indésirables et {1} fichiers de registre peuvent être nettoyés.",
		cleanBtn:"Nettoyage",
		lessBrowser:"Fichiers Internet indésirables",
		lessHistory:"Fichiers résiduels",
		lessCommonUes:'Fichiers logiciels indésirables',
		lessSystem:'Fichiers logiciels indésirables',
		lessDelete:"Corbeille",
		lessUsuse:"Fichiers de registre indésirables",
		selectedLess:"sélectionnés",
		conScan:"Analyser à nouveau",
		cleanText:"Vous permet de nettoyer les fichiers Internet, système, des logiciels indésirables et bien plus encore !",
		
		cleanFinish:"Nettoyage terminé!",
		someFile:"Certains fichiers et entrées de registre seront supprimés après le redémarrage de votre ordinateur.",
		cleanOver:"{0} fichiers indésirables et {1} fichiers de registre ont été nettoyés.",
		wifiConNot:"Cette fonction n\'est pas disponible avec le Wi-Fi.",
		
		/*2014-11-03*/
		cleanFinished:"Terminé",
		/*2014-11-03 wifi hotpot*/
		deviceConnectingList:"Connecté à {0}",
		startingWifiTitle:"Démarrage du Wi-Fi gratuit...",
		hasNoWIfiTitle:"Votre ordinateur n'est pas équipé de Wi-Fi.",
		iHaveWifi:"Je dispose du Wi-Fi.",
		wifiNameLabel:"Nom Wi-Fi : ",
		wifiPasswordLabel:"Mot de passe Wi-Fi : ",
		speedLabel:"Vitesse",
		devicesConnectedTitle:"{0} appareils sont connectés.",
		closeWifiLabel:"Fermer le Wi-Fi",
		deviceBlackList:"Liste noire",
		deviceBlackList2:"{0} sur liste noire",
		moveOutBlackList:"Retirer",
		downloadSpeedLabel:"Vitesse de téléchargement",
		uploadSpeedLabel:"Vitesse de chargement",
		limitSpeedLabel:"Limite de vitesse",
		pleaseWriteNum:"Saisissez entre 1 et 12 caractères (lettres, chiffres ou tirets bas).",
		moboWifi:"Wi-Fi Mobogenie",
		setBlackValidateNextTime:"La liste noire prendra effet après redémarrage du Wi-Fi gratuit.",
		//2014-11-12
		pleaseWriteDeviceNameValid:"Saisissez entre 1 et 12 caractères.",
		
		//2014-11-14
		haveNoWifiAdapter:"Aucun adaptateur Wi-Fi USB détecté",
		solutionLabel:"Solutions",
		solutionPluginTitle:"Branchez l\'adaptateur Wi-Fi pour activer le service Wi-Fi gratuit.",
		solutionSwitchLaptop:"Passez sur un ordinateur portable."
    };
    return dictionary;
});