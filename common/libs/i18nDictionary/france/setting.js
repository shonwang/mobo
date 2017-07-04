define('france:setting', function(require, exports, module){
    var dictionary = {
    	aboutMe:'À propos',/*不超过18个字符*/
		aboutMeVersion:'Version: {0}',/*不超过22个字符*/
		MGWebsite:'Site Web :',/*不超过35个字符*/
		MGForums:'Forums :',/*不超过35个字符*/
		aboutMeLinkPolicy: 'Politique de confidentialité',/*不超过35个字符*/
		aboutMeLinkEULA: 'CLUF',/*不超过35个字符*/
		aboutMeLinkTOS: 'Conditions d\'utilisation',/*不超过35个字符*/
		aboutMeFootText: '©2014 Mobogenie.com. Tous droits réservés',/*不超过70个字符*/
		feedback:'Feedback',
        fbEmailFormatFailed: 'Adresse e-mail non valide',/*不超过60个字符*/
        BtnSubmit: 'Envoyer',
        fbSuccessTitle: 'Merci pour vos commentaires .',/*不超过45个字符*/
        fbSuccessText: 'Notre service client reviendra vers vous dès que possible. Vérifiez régulièrement votre messagerie.',/*不超过150个字符*/
        
       
        setting: 'Paramètres',/*不超过18个字符*/
        checkForUpdates: 'Vérif. les m. à j.',/*不超过18个字符*/
        whatNew: 'Quoi de neuf ?',/*不超过18个字符*/
        ContactUs: 'Nous contacter',/*不超过18个字符*/
        
		generalLabel: 'Général',/*不超过13个字符*/
		LocationsLabel: 'Emplacements',/*不超过13个字符*/
		AppllicationsLabel: 'Applications',/*不超过13个字符*/
		remindersLabel: 'Rappels',/*不超过13个字符*/
		Language: 'Langue',/*不超过62个字符*/
		generalStartupTitle: 'Au démarrage',/*不超过62个字符*/
		generalStartupText:'Poursuivre automatiquement les tâches inachevées',/*不超过62个字符*/
		generalConnetTitle: 'Dès la connexion de l\'appareil',/*不超过62个字符*/
		generalConnetText: 'Toujours ouvrir Mobogenie',/*不超过62个字符*/
		generalConnetTextTwo: ' Installer automatiquement les applications téléchargées',/*不超过62个字符*/
		generalCloseTitle: 'À la fermeture',/*不超过62个字符*/
		generalCloseText: ' Minimiser le client dans la barre des tâches',/*不超过62个字符*/
		generalCloseTextTwo: 'Quitter le client',/*不超过62个字符*/
		generalCloseTextThree: 'Me le rappeler à chaque fois',/*不超过62个字符*/
		generalUpdateTitle: 'Mise à jour du client',/*不超过62个字符*/
		generalUpdateText: 'Mise à jour automatique du client vers la dernière version',/*不超过62个字符*/
		locationsResource: 'Téléchargements de ressources',/*不超过62个字符*/
		locationsBackup: 'Emplacement de sauvegarde',/*不超过62个字符*/
		locationsScreen: 'Emplacement des captures d\'écran',/*不超过62个字符*/
		locationsBtn: 'Parcourir...',/*不超过12个字符*/
		appllicationsFileTitle: 'Association de fichiers',/*不超过62个字符*/
		appllicationsFileText: 'Vérifier si les fichiers .apk sont associés à Mobogenie',/*不超过62个字符*/
        appllicationsLatestTitle: 'Mise à jour automatique des dernières applications',
		appllicationsLatestText: 'Tél. auto. les dernières applis proposant une mise à jour',/*不超过62个字符*/
		appllicationsDefaultTitle: 'Emplacement d\'installation par défaut',/*不超过62个字符*/
		appllicationsDefaultText: ' Auto. (si échec d\'install. sur carte SD, install. sur l\'appareil)',/*不超过62个字符*/
		appllicationsDefaultTextTwo: 'Mémoire de l\'appareil',/*不超过62个字符*/
		appllicationsDefaultTextThree: 'Carte SD ext. (prise en ch. par Android 2.2 et v. ult. uniq.)',/*不超过62个字符*/
		remindersUpdateTitle: 'Mises à jour de l\'application',/*不超过62个字符*/
		remindersUpdateText:'Me rappeler de mettre à jour les applis tous les {0} jours',/*不超过62个字符*/
		remindersBackupText:'Me rappeler de sauvegarder mon appareil tous les {0} jours',/*不超过62个字符*/
		remindersUpdateTextTwo: 'Ne jamais me rappeler',/*不超过62个字符*/
		remindersBackupTitle: 'Sauvegarde',/*不超过62个字符*/
		remindersPopularTitle: 'Activités populaires',/*不超过62个字符*/
		remindersPopularText: 'Me le rappeler si des activités populaires ou des promotions sont disponibles',
		/*5-24*/
		swicthSiteLabel:'Site',
		/*5-26*/
		settingTip:"Menu",
		/*7-21*/
		fbModelName: 'Modèle d\'appareil',
		fbOsVersion: 'Version d\'Android',
		/*7.22*/
		fbType9:"Autre",
		/*2014-9-9*/
		upload:"Télécharger",
		/*2014-9-11 新版反馈文案*/
		pleaseGory:"Catégorie du problème :",
		pleaseChoose:"Choisissez une catégorie.",
		openUSB:"Ouvrir le débogage USB :",
		pleaseSele:"Veuillez sélectionner...",
		whatUsb:"Qu\'est-ce que le débogage USB ?",
		havaActive:"Avez-vous activé le débogage USB ?",
		phoneModel:"Modèle de téléphone :",
		pleaseEnter:"Veuillez saisir votre modèle de téléphone.",
		modelOf:"Modèle du téléphone présentant un problème",
		email: "E-mail :",
		enterEmail:"Veuillez saisir votre adresse e-mail.",
		enterValid:"Veuillez saisir une adresse e-mail valide pour que nous puissions vous assister au mieux",
		andVer:"Version d\'Android :",
		pleaseVer:"Veuillez choisir une version d\'Android.",
		corSystem:"Une version système correcte nous aidera à identifier précisément votre problème.",
		socialAcc:"Compte social :",
		selectMethod:"Sélectionnez une méthode par laquelle nous pouvons vous contacter",
		description:"Description :",
		addAttach: "Ajouter une pièce jointe",
		noFiles:"Aucun fichier",
		onlySupports:"Seuls les fichiers de moins de 3 Mo sont pris en charge.",
		whyNeed:"Pourquoi dois-je activer la fonction de débogage USB ?",
		debugRequired:"Le débogage USB est nécessaire pour que le système Android soit correctement connecté à votre ordinateur. En activant le débogage USB, votre téléphone ou tablette peut se connecter à Mobogenie plus rapidement.",
		openfun:"Comment ouvrir la fonction de débogage USB ?",
		andLower:"Android 3.2 ou plus ancien",
		selectSet:"Sélectionnez [Paramètres] dans la liste des applications pour accéder au menu système.",
		selectApp: "Sélectionnez [Applications].",
		
		selectDeve:"Sélectionnez [Développement].",
		selectTap:"Sélectionnez [Débogage USB], puis appuyez sur OK.",
		andFour: "Android 4.0 et 4.1",
		selectOpt:"Sélectionnez [Options pour développeurs].",
		openOpt:"Activez [Options pour développeurs] en haut.",
		checkTap:"Cherchez [Débogage USB] et appuyez sur OK.",
		androidFour:"Android 4.2",
		tapIcon:"Appuyez sur l'icône [Paramètres].",
		tapPhone:"Appuyez sur [À propos de l\'appareil] (ou À propos du téléphone).",
		scrollBot: "Descendez en bas de l\'écran, cherchez le [Numéro de build] (ou numéro de série) et appuyez dessus plusieurs fois d\'affilée.",
		
		keepTap:"Continuez d\'appuyer jusqu\'à ce que le message « Vous êtes maintenant développeur » s\'affiche.",
		goback:"Retournez dans la page [Paramètres] où se trouvent les [Options pour développeurs].",
		enterDeve:"Ouvrez les [Options pour développeurs] et appuyez sur [Débogage USB].",
		backDeve:"Retournez dans les [Options pour développeurs] et vérifiez que [Débogage USB] est coché.",
		connectCom:"Connectez votre téléphone à votre ordinateur et ouvrez Mobogenie. <br/>Mobogenie va installer [Mobogenie Helper] sur votre ordinateur.<br/>Appuyez sur OK lorsque les notifications d\'installation s\'affichent.",
		returnCon:"Revenir et continuer",
		fbSuccessClose: 'Continuer à naviguer sur la boutique{0}',
		
		unableCon:"Impossible de se connecter à mon téléphone",
		proInstall:"Problèmes de ressources",
		contactsText:"Contacts et SMS",
		slowPer:"Ralentissement des performances",
		unableRoot:"Impossible de rooter",
		stillWhen:"MG apparaît toujours alors qu\'aucun appareil n\'est connecté",
		suggesNew:"Suggestions de nouvelles fonctions",
		usbOn: "Débogage USB activé",
		usbOff: 'Débogage USB désactivé',
		fbTextarea: "Nous sommes toujours heureux de recevoir vos commentaires !",
		errorFile:"format de fichier incorrect",
		/*2014-11-07*/
		unableCon:"Échec de la connexion à votre téléphone via USB.",
		unableWifiCon:"Échec de la connexion à votre téléphone via Wi-Fi.",
		
    };
    return dictionary;
});