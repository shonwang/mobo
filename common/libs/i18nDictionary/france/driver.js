define('france:driver', function(require, exports, module){
    var dictionary = {
		badNetworkTitle:'Mauvaise connexion réseau. Veuillez vérifier votre réseau .',/*不超过70个字符*/
		pictureGuide: 'Guide photo',/*不超过26个字符*/
		videoGuide: 'Guide vidéo',/*不超过26个字符*/
		myVersion: 'Ma version d\'Android :',/*不超过26个字符*/
		debugFootText: 'Vous n\'acc. touj. pas au débog. USB ?',/*不超过40个字符*/
		oneClickSet: 'Paramétrage en un clic',/*不超过30个字符*/
		tryConnectText: 'Débranchez et rebranchez le câble ou redémarrez votre appareil.',/*不超过70个字符*/
		butBack: 'Précédent',
		ContactSupport: 'Contacter l\'assistance',/*不超过30个字符*/
		allowDebugText: 'Appuyez sur  "OK" à la demande d\'autorisation du débogage USB.',/*不超过70个字符*/
		allowDebugTip: "<i>1</i> Cochez cette option",/*不超过50个字符*/
		allowDebugOkTip: "<i>2</i> Appuyez sur <b>[OK]</b>",/*不超过50个字符*/
		butRetry: 'Vous ne voyez pas ce message ?',/*不超过60个字符*/
		butShowAgain: 'Afficher à nouveau',/*不超过25个字符*/
		stillNoSolove: 'Ca ne fonctionne toujours pas?',
        debugTipText: 'Téléchargez {0} (12 ko) sur votre appareil',/*不超过50个字符*/
        debugSetterContentText: ' [Débogage USB]',/*不超过20个字符*/
		orText: 'OU',
		noSpaceHint: 'Mémoire insuffisante sur l\'appareil.',/*不超过60个字符*/
		noSpaceText: 'Mobogenie nécessite au moins {0} d\'espace disque.',/*不超过50个字符*/
		needSpaceText: '10 Mo',
		upSpaceText: 'Désinstallez des applications pour libérer de l\'espace.',/*不超过60个字符*/
		butHaveSpace: 'J\'ai suffisamment d\'espace',/*不超过32个字符*/
		connectFailedTitle:'Une Échec de la connexion .',
		connectFailedTryText: 'Essayez de déconnecter puis de reconnecter l\'appareil.',/*不超过90个字符*/
		connectFailedRestart: 'Redémarrez Mobogenie.',/*不超过90个字符*/
		RestartDevice: 'Redémarrez votre ordinateur et votre appareil.',/*不超过90个字符*/
		connectFailedText: 'Si le problème persiste, consultez notre FAQ ou contactez-nous.',/*不超过90个字符*/
		
		connectionGuide:'Guide de connexion',
		driverUsbTitle: 'Connectez votre appareil avec un câble USB.',/*不超过50个字符*/
		driverUsbText: 'Après la connexion, vous pourrez télécharger des jeux et des applications gratuits, gérer votre appareil et bien plus.',
		
		AndroidLowDebugStep1: '<i>1</i> Appuyez sur <b>[Applis]</b>',/*不超过60个字符*/
		AndroidLowDebugStep2: '<i>2</i> Appuyez sur <b>[Paramètres]</b>',/*不超过60个字符*/
		AndroidLowDebugStep3: '<i>3</i> Appuyez sur <b>[Applications]</b>',/*不超过60个字符*/
		AndroidLowDebugStep4: '<i>4</i> Appuyez sur <b>[Développement]</b>',/*不超过60个字符*/
		AndroidLowDebugStep5: '<i>5</i> Cochez <b>[Débogage USB]</b>',/*不超过60个字符*/
		AndroidLowDebugStep6: '<i>6</i> Appuyez sur <b>[OK]</b>',/*不超过60个字符*/
		AndroidHighDebugStep3: '<i>3</i> Appuyez sur <b>[Options pour les développeurs]</b>',/*不超过60个字符*/
		AndroidHigherDebugStep3: '<i>3</i> Appuyez sur <b>[à propos du téléphone]</b>',/*不超过60个字符*/
		AndroidHigherDebugStep4: '<i>4</i> App. sur <b>[Numéro de version]</b> plusieurs fois',/*不超过60个字符*/
		AndroidHigherDebugStep5: '<i>5</i> Ceci active le mode développeur',/*不超过60个字符*/
		AndroidHigherDebugStep6: '<i>6</i> Revenez en arrière et appuyez sur <b>[Options pour les développeurs]</b>',/*不超过60个字符*/
		AndroidHigherDebugStep9: '<i>9</i> Cochez <b>[Toujours autoriser depuis ce PC]</b>',/*不超过60个字符*/
		
		SamsungHighDebugStep4: '<i>4</i> Cochez <b>[Options pour les développeurs]</b>',/*不超过60个字符*/
		SamsungHigherDebugStep3: '<i>3</i> Appuyez sur <b>[Plus]</b>',/*不超过60个字符*/
		SamsungHigherDebugStep4: '<i>4</i> Appuyez sur <b>[à propos de l\'appareil]</b>',/*不超过60个字符*/
		
		driver1 :'<i>3</i> Appuyez sur <b>[À propos]</b>',
		driver2 :'<i>4</i> Appuyez sur <b>[Informations sur le logiciel]</b>',
		driver3 :'<i>8</i> Revenez <b>en arrière</b> et appuyez sur <b>[Options pour les développeurs]</b>',
		driver4 :'<i>9</i> Cochez <b>[Ne pas me le redemander]</b>',
		driver5 :'<i>2</i> Appuyez sur <b>[Général]</b>',
		driver6 :'<i>10</i> Appuyez sur <b>[Oui]</b>',
		/*2014-6-12*/
		driver7:' Cochez <b>[Masquer]</b>',
		/*2014-7-3*/
		usbDebugServiceText:"Vous pouvez également appeler l'antenne locale de notre service client pour obtenir de l'aide",
		usbDebugCustomer:"Service client",
		usbDebugTitle: 'Veuillez ouvrir le débogage USB pour gérer votre téléphone.',
		
		/*2014wifi*/
		driverUsbConnect: 'Connexion USB',
		driverWifiConnect: 'Connexion Wi-Fi',
		deviceBeen:"{0} périphériques ont été détectés. Veuillez vous connecter.",
		connectAnother:"Connectez un autre appareil",
		pleaseDownMg:"Veuillez télécharger <b>Mobogenie Helper</b> sur votre appareil.",
		alreadyHava:"J\'ai déjà Mobogenie Helper",
		enterPass:"2.Saisissez le code de vérification.",
		howtofind:"Comment puis-je trouver le code de vérification ?",
		pleasePhoneOk:"Veuillez accepter la demande de connexion sur votre appareil.",
		conncetionFailed:"Échec de la connexion. Veuillez vérifier les éléments suivants : ",
		phoneWifiOpen:"Veuillez vérifier que le Wi-Fi est activé et que votre appareil se situe sur le même réseau LAN que le PC.",
		passwordOk:"Le code de vérification est-il correct ?",
		connectnix:"Échec de la connexion. L\'appareil a refusé la demande de connexion de votre PC.",
		
		contingDevice:"Connexion de votre appareil...",
		updatingHelp:"Mise à jour de Mobogenie Helper...",
		updateFailed:"Échec de la mise à jour de Mobogenie !",
		alreadyCon:"J'ai connecté mon câble USB.",
		connectBtnText:"Connexion",
		wifiScreen:"Impossible d'accéder aux captures d'écran du téléphone via Wi-Fi.",
		
        //2014-10-14
		connectNoticeTitle: 'Veuillez connecter votre appareil.',
		helpisOpen:"Mobogenie Helper est-il en cours d'exécution sur votre téléphone ?",
		//2014-10-20
		pleaseClick:"Après l'installation, ouvrez Mobogenie Helper et cliquez sur le bouton ci-dessous pour rétablir la connexion.",
		reConnectBtn:"Rétablir la connexion",
		pleaseInstall:"La version mise à jour de Mobogenie Helper a été envoyée. Veuillez l'installer sur votre appareil Android.",
		scanBlow:"Scannez le code QR ci-dessous",
		downloadUsing:"Lancez le téléchargement en utilisant l'adresse URL ci-dessous sur votre appareil Android",
		openHelpDevice:"1. Ouvrez Mobogenie Helper sur votre appareil Android.",
		
		/*2014-11-07修改*/
		connectFailedText:"Connectez-vous via Wi-Fi.",
		waitLong:"Ça prend trop de temps ? Dites-le nous !",
		alreadyHava:"J\'ai Mobogenie Helper sur mon téléphone. Suivant !",
		noHavaMobo:"Je n\'ai pas Mobogenie Helper sur mon téléphone. Retourner en arrière !",
		tryConnectWifi:"Try connecting via Wi-Fi",
		/*2014-11-14增加*/
		driverWifiConnect:"Connexion sans fil",
		havaOpenUsb:"J\'ai activé la fonction USB.",
		usbConnectFailed:"Erreur de connexion USB",
		checkPhoneFailed: "Un programme empêche votre téléphone de se connecter à votre ordinateur. Fermez-le et réessayez.",
		closeReConnect: "Fermez ce programme et reconnectez-vous à {0}."
    };
    return dictionary;
});