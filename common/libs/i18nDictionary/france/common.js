define('france:common', function(require, exports, module){
    var dictionary = {
        connectingText: 'Connexion',/*不超过16个字符*/
        
        homeLabel: 'Accueil',/*不超过14个字符*/
        appLabel: 'Applis',/*不超过14个字符*/
        gamesLabel: 'Jeux',/*不超过14个字符*/
        ringtonesLabel: 'Sonneries',/*不超过14个字符*/
        wallPaperLabel: 'Fonds d’écran',/*不超过14个字符*/
        youTubeLabel: 'YouTube',/*不超过14个字符*/
        moreLabel: 'Plus',/*不超过14个字符*/
        toolsLabel: 'Boîte à outils',/*不超过14个字符*/
        safetyLabel: 'Sécurité',/*不超过14个字符*/
        contactLabel: 'Mes contacts',/*不超过14个字符*/
        smsLabel: 'Mes messages',/*不超过14个字符*/
        myAppLabel: 'Mes applis',/*不超过14个字符*/
        myMusicLabel: 'Ma musique',/*不超过14个字符*/
        myPictureLabel: 'Mes images',/*不超过14个字符*/
        myVideoLabel: 'Mes vidéos',/*不超过14个字符*/
        Import:'Importer',/*不超过16个字符*/
        Export:'Exporter',/*不超过16个字符*/
        Delete:'Supprimer',
        Refresh:'Actualiser',
        updateAllLabel: 'Tt m. à j.',/*不超过16个字符*/
        updateLabel: 'Mise à j.',/*不超过12个字符*/
        uninstallLabel: 'Désinstaller',/*不超过16个字符*/
        deviceText: 'Appareil',/*不超过12个字符*/
        phoneText: 'Téléphone',
        memoryText: 'Mémoire',/*不超过12个字符*/
        installLabel: 'Installer',/*不超过12个字符*/
        sizeLabel: 'Taille',
        nameLabel: 'Nom',
        locationLabel: 'Emplacement',
        actionLabel: 'Action',
        selectAllLabel: 'Sélectionner tout',/*不超过30个字符*/
        downloadAllLabel: 'Télécharger tout',/*不超过24个字符*/
        downloadingText: 'Télécharg.',/*不超过24个字符*/
        redownloadText: 'Télécharger à nouveau',
        downloadLabel: "Télécharger",
        
        successText: 'Action réussie',
        installedInText: 'Installé dans {0}',/*不超过45个字符*/
        ImportingText: 'Importation...',/*不超过55个字符*/
        setWallpaperFailed: 'Set wallpaper failed',
        importedInText: 'Imported in {0}',
        
        retryText: 'Réessayer',/*不超过15个字符*/
        pauseText: 'Pause',/*不超过15个字符*/
        continueText: 'Continuer',/*不超过15个字符*/
        inProcessingTaskText: 'En cours',
        completedText: 'Terminé',
        noTaskText: '0 tâche en cours',/*不超过18个字符*/
        
        captureLabel: 'Capture',/*不超过24个字符*/
        featureText: 'Incontournables',/*不超过24个字符*/
        countTasksText: '{0} tâche(s)',/*不超过15个字符*/
        
        updateTipText: 'Vous disposez déjà de la version la plus récente de {0} applis .',/*不超过65个字符*/
        rootTipText: 'Votre appareil mobile n\'a pas été rooté. Cette opération vous permettra d\'installer n\'importe quelle application.',
        oneClickRootLabel: 'Rooter en un clic',
        shareMobogenieText: 'Partager Mobogenie via',/*不超过65个字符*/
        
        tipLabel: 'Astuce',
        confirmLabel:'Confirmer',
        okLabel : 'OK',
        yesLabel : 'Oui',
        cancelLabel:'Annuler',
        closeLabel : 'Fermer',
        failedLabel : 'échec',
        exportSuccess:'Exportation réussie',
        
        headSignIn:'Connexion',/*不超过11个字符*/
        /*connectAnother : 'Connectez un autre appareil',*/
        deviceInfo: 'À propos de l\'appareil',/*不超过22个字符*/
        email:'E-mail',
        /*add 2014-03-28*/
        promptInvaildPath:'Chemin invalide .',
	   
	    connectDeviceVia:'Connectez simplement votre téléphone pour obtenir des applications, jeux, vidéos et toutes sortes de contenus Android gratuits. Profitez d\'un service de gestion d\'appareil mobile révolutionnaire .',
        connectNow:'Se connecter',
		
		downloadingDriver:'Téléchargement du pilote de l\'appareil... {0}',/*不超过50个字符*/
		installingDriverText:'Installation du pilote de l\'appareil...',/*不超过50个字符*/
		installingMG:'Installation de Mobogenie sur l\'appareil...',/*不超过50个字符*/
		connectedYourDeviceText: 'Connecté',/*不超过50个字符*/
		disconnectYourDeviceText: 'Déconnecter',/*不超过50个字符*/

        searchResultText: 'Recherche de <span class="c-red">{0}</span>, <span class="c-red">{1}</span> résultat(s) trouvé(s) ',
        searchSeeAllLink: 'Afficher tout',
        openLabel: 'Ouvrir un dossier',
        
        Exporting:"Exportation en cours. Ne déconnectez pas votre appareil.",
        Deleting:"Suppression en cours. Ne déconnectez pas votre appareil.",

        deviceMemoryLabel: "Mémoire de l\'appareil",
        sdCardLabel: "Carte SD 1",
        sdCardTwoLabel: "Carte SD 2",
        total: "Total : ",/*不超过20个字符*/
        available: "Disponible : ",/*不超过20个字符*/
        manage: "Gestion",
        
        installedText: 'Installé',/*不超过15个字符*/
        updateAppText: 'Mise à j.',/*不超过12个字符*/
        installingAppText: 'Installat.',/*不超过55个字符*/
        installText: 'Installer',/*不超过15个字符*/

        /*2014-05-13*/
       searchHolderMyApp:"Applications et jeux locaux",
       searchHolderWallpaper:"Fonds d’écran",
       searchHolderRingtone:"Sonneries",
       searchHolderAppGames:"Applications/jeux",
       noSdState:"Aucune carte SD trouvée sur votre appareil.",
       /*2014-5-26*/
       minTipText:"Réduire",
       maxTipText:"Agrandir",
       exitTipText:"Quitter",
       returnTipText:"Précédent",
       retreatTipText:"Suivant",
       /*2014-5-27*/
       noLabel : 'Non',
       menuOpenLabel:"Ouvrir",
       //20140604
       bestPicksLabel: 'Coups de cœur',
       actionFailed:'Échec de l\'action',
       /*2014-06-09*/
      searchHolderYoutube:'URL ou mots-clés YouTube',
      screenshotSave:"La capture instantanée a été enregistrée ici : ",
      screenshotText:"Capture instantanée",
      screenshotCheckPathTip: "Toujours utiliser ce chemin pour enregistrer les captures instantanées",
      /*2014-06-10*/
      alwaysOpenClient:'Toujours ouvrir Mobogenie à la connexion de l\'appareil.',
      changeOpenClient:'Vous pouvez modifier à tout moment ce comportement dans les Paramètres.',
      /*2014-06-18*/
      screenBlackTipText: "Veuillez allumer l\'écran de votre appareil mobile.",
      /*2014-06-30*/
      ebookLabel:"Livres",
      myEbookLabel:"Mes livres",
      /*2014-6-30修改*/
      connectDeviceText:'Connexion en cours. Ne déconnectez pas votre appareil.',
      openManageDevice:"Un appareil a été détecté. Ouvrez Mobogenie pour gérer votre appareil et télécharger du contenu gratuit.",
      /*2014-07-18*/
      searchHolderEBook:"Livres",
      /*2014-09-25*/
      rememberMarkLabel:"Mémoriser les paramètres"
    };
    return dictionary;
});