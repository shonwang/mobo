define('italian:common', function(require, exports, module){
    var dictionary = {
        connectingText: 'Connessione',/*不超过16个字符*/
        
        homeLabel: 'Home',/*不超过14个字符*/
        appLabel: 'Applicazioni',/*不超过14个字符*/
        gamesLabel: 'Giochi',/*不超过14个字符*/
        ringtonesLabel: 'Suonerie',/*不超过14个字符*/
        wallPaperLabel: 'Sfondi',/*不超过14个字符*/
        youTubeLabel: 'YouTube',/*不超过14个字符*/
        moreLabel: 'Altro',/*不超过14个字符*/
        toolsLabel: 'Toolkit',/*不超过14个字符*/
        safetyLabel: 'Sicurezza',/*不超过14个字符*/
        contactLabel: 'Contatti',/*不超过14个字符*/
        smsLabel: 'Messaggi',/*不超过14个字符*/
        myAppLabel: 'Applicazioni',/*不超过14个字符*/
        myMusicLabel: 'La mia musica',/*不超过14个字符*/
        myPictureLabel: 'Le mie foto',/*不超过14个字符*/
        myVideoLabel: 'I miei video',/*不超过14个字符*/
        Import:'Importa',/*不超过16个字符*/
        Export:'Esporta',/*不超过16个字符*/
        Delete:'Elimina',
        Refresh:'Aggiorna',
        updateAllLabel: 'Aggiorna tutto',/*不超过16个字符*/
        updateLabel: 'Aggiorna',/*不超过12个字符*/
        uninstallLabel: 'Disinstalla',/*不超过16个字符*/
        deviceText: 'Dispositivo',/*不超过12个字符*/
        phoneText: 'Telefono',
        memoryText: 'Memoria',/*不超过12个字符*/
        installLabel: 'Installa',/*不超过12个字符*/
        sizeLabel: 'Dimensioni',
        nameLabel: 'Nome',
        locationLabel: 'Posizione',
        actionLabel: 'Azione',
        selectAllLabel: 'Seleziona tutto',/*不超过30个字符*/
        downloadAllLabel: 'Scarica tutto',/*不超过24个字符*/
        downloadingText: 'Download in corso',/*不超过24个字符*/
        redownloadText: 'Scarica di nuovo',
        downloadLabel: "Download",
        
        successText: 'Operazione riuscita',
        installedInText: 'Installato in data {0}',/*不超过45个字符*/
        ImportingText: 'Importazione in corso',/*不超过55个字符*/
        setWallpaperSucess: 'Set wallpaper succeed',
        importedInText: 'Importato in data {0}',
        
        retryText: 'Riprova',/*不超过15个字符*/
        pauseText: 'Sospendi',/*不超过15个字符*/
        continueText: 'Continua',/*不超过15个字符*/
        inProcessingTaskText: 'In corso',
        completedText: 'Operazione completata',
        noTaskText: 'Nessuna attività',/*不超过18个字符*/
        
        captureLabel: 'Acquisisci',/*不超过24个字符*/
        featureText: 'Indispensabili',/*不超过24个字符*/
        countTasksText: '{0} attività',/*不超过15个字符*/
        
        updateTipText: 'Disponi già dell\'ultima versione delle {0} applicazioni.',/*不超过65个字符*/
        rootTipText: 'Il dispositivo mobile non è stato impostato come principale. L\'operazione consentirà l\'installazione di qualsiasi applicazione desiderata.',
        oneClickRootLabel: 'Imposta come principale con un clic',
        shareMobogenieText: 'Condividi Mobogenie su',/*不超过65个字符*/
        
        tipLabel: 'Suggerimento',
        confirmLabel:'Conferma',
        okLabel : 'OK',
        yesLabel : 'Sì',
        cancelLabel:'Annulla',
        closeLabel : 'Chiudi',
        failedLabel : 'operazione non riuscita',
        exportSuccess:'Esportazione effettuata con successo',
        
        headSignIn:'Accedi',/*不超过11个字符*/
        connectAnother : 'Connect another device',
        deviceInfo: 'Info dispositivo',/*不超过22个字符*/
        email:'E-mail',
        /*add 2014-03-28*/
        promptInvaildPath:'Percorso non valido.',
	   
	    connectDeviceVia:'È sufficiente collegare il telefono per installare applicazioni, giochi, video e tutti i tipi di contenuti gratuiti per Android, accedendo al rivoluzionario servizio di gestione dei dispositivi mobili.',
        connectNow:'Collega adesso',
		
		downloadingDriver:'Download del driver per il dispositivo {0}',/*不超过50个字符*/
		installingDriverText:'Installazione del driver per il dispositivo',/*不超过50个字符*/
		installingMG:'Installazione di Mobogenie sul dispositivo',/*不超过50个字符*/
		connectedYourDeviceText: 'Connesso',/*不超过50个字符*/
		disconnectYourDeviceText: 'Disconnesso',/*不超过50个字符*/

        searchResultText: 'Ricerca di <span class="c-red">{0}</span>, <span class="c-red">{1}</span> risultati trovati ',
        searchSeeAllLink: 'Visualizza tutto',
        openLabel: 'Apri cartella',
        
        Exporting:"Esportazione in corso. Tenere il dispositivo collegato.",
        Deleting:"Eliminazione in corso. Tenere il dispositivo collegato.",

        deviceMemoryLabel: "Memoria dispositivo",
        sdCardLabel: "Scheda SD 1",
        sdCardTwoLabel: "Scheda SD 2",
        total: "Totale: ",/*不超过20个字符*/
        available: "Disponibile: ",/*不超过20个字符*/
        manage: "Gestisci",
        
        installedText: 'Installato',/*不超过15个字符*/
        updateAppText: 'Aggiorna',/*不超过12个字符*/
        installingAppText: 'Installazione',/*不超过55个字符*/
        installText: 'Installa',/*不超过15个字符*/

        /*2014-05-13*/
       searchHolderMyApp:"Applicazione e giochi in locale",
       searchHolderWallpaper:"Sfondi",
       searchHolderRingtone:"Suonerie",
       searchHolderAppGames:"Applicazioni/Giochi",
       noSdState:"Non è stata trovata nessuna scheda SD sul dispositivo.",
       /*2014-5-26*/
       minTipText:"Riduci a icona",
       maxTipText:"Ingrandisci",
       exitTipText:"Esci",
       returnTipText:"Indietro",
       retreatTipText:"Inoltra",
       /*2014-5-27*/
       noLabel : 'No',
       menuOpenLabel:"Apri",
       //20140604
       bestPicksLabel: 'Le più scelte',
       actionFailed:'Azione non riuscita',
       /*2014-06-09*/
      searchHolderYoutube:'URL YouTube o tastiera',
      screenshotSave:"Snapshot salvata in: ",
      screenshotText:"Snapshot",
      screenshotCheckPathTip: "Utilizza sempre questo percorso per salvare snapshot",
      /*2014-06-10*/
      alwaysOpenClient:'Apri sempre Mobogenie al collegamento del dispositivo.',
      changeOpenClient:'È possibile modificare in qualsiasi momento questa opzione Impostazioni.',
      /*2014-06-18*/
      screenBlackTipText: "Accendere lo schermo del dispositivo mobile",
      /*2014-06-30*/
      ebookLabel:"Libri",
      myEbookLabel:"I miei libri",
      /*2014-6-30修改*/
      connectDeviceText:'Connessione in corso. Mantenere il dispositivo collegato.',
      openManageDevice:"È stato rilevato un dispositivo. Aprire Mobogenie per gestire il dispositivo e scaricare contenuti gratuiti.",
      /*2014-07-18*/
      searchHolderEBook:"Libri",
      /*2014-09-25*/
      rememberMarkLabel:"Salva impostazioni"
    };
    return dictionary;
});