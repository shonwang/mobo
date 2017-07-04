define('italian:driver', function(require, exports, module){
    var dictionary = {
		badNetworkTitle:'Connessione di rete di bassa qualità. Controllare la rete.',/*不超过70个字符*/
		pictureGuide: 'Guida alle foto',/*不超过26个字符*/
		videoGuide: 'Guida ai video',/*不超过26个字符*/
		myVersion: 'Versione Android in uso:',/*不超过26个字符*/
		debugFootText: 'Non si riesce ancora ad aprire il Debug USB?',/*不超过40个字符*/
		oneClickSet: 'Impostazione con un clic',/*不超过30个字符*/
		tryConnectText: 'Provare a scollegare e ricollegare il cavo o riavviare il dispositivo.',/*不超过70个字符*/
		butBack: 'Indietro',
		ContactSupport: 'Contattare l\'assistenza',/*不超过30个字符*/
		allowDebugText: 'Premere \"OK\" quando viene richiesto di consentire il Debug USB.',/*不超过70个字符*/
		allowDebugTip: "<i>1</i> Selezionare questa opzione",/*不超过50个字符*/
		allowDebugOkTip: "<i>2</i> Toccare <b>[OK]</b>",/*不超过50个字符*/
		butRetry: 'Non si riesce a vedere questo popup?',/*不超过60个字符*/
		butShowAgain: 'Mostra di nuovo',/*不超过25个字符*/
		stillNoSolove: 'I problemi persistono?',
        debugTipText: 'Scaricare {0} (12 KB) sul dispositivo in uso',/*不超过50个字符*/
        debugSetterContentText: ' [Debugger USB]',/*不超过20个字符*/
		orText: 'OPPURE',
		noSpaceHint: 'Spazio sul dispositivo è insufficiente.',/*不超过60个字符*/
		noSpaceText: 'Mobogenie richiede uno spazio su disco di almeno {0}',/*不超过50个字符*/
		needSpaceText: '10 MB',
		upSpaceText: 'Disinstallare alcune applicazioni per recuperare un po\' di spazio.',/*不超过60个字符*/
		butHaveSpace: 'Ho abbastanza spazio',/*不超过32个字符*/
		connectFailedTitle:'Ops. Collegamento non riuscito.',
		connectFailedTryText: 'Provare a scollegare e ricollegare il dispositivo.',/*不超过90个字符*/
		connectFailedRestart: 'Riavviare Mobogenie.',/*不超过90个字符*/
		RestartDevice: 'Riavviare il PC e il dispositivo.',/*不超过90个字符*/
		connectFailedText: 'In caso di mancato funzionamento, è possibile leggere le domande frequenti o esporre il problema.',/*不超过90个字符*/
		
		connectionGuide:'Guida al collegamento',
		driverUsbTitle: 'Collegare il dispositivo tramite cavo USB.',/*不超过50个字符*/
		driverUsbText: 'Dopo il collegamento, sarà possibile scaricare gratuitamente giochi, applicazioni e altro nonché gestire il dispositivo.',
		
		AndroidLowDebugStep1: '<i>1</i> Toccare <b>[App Drawer]</b>',/*不超过60个字符*/
		AndroidLowDebugStep2: '<i>2</i> Toccare <b>[Impostazioni]</b>',/*不超过60个字符*/
		AndroidLowDebugStep3: '<i>3</i> Toccare <b>[Applicazioni]</b>',/*不超过60个字符*/
		AndroidLowDebugStep4: '<i>4</i> Toccare <b>[Sviluppo]</b>',/*不超过60个字符*/
		AndroidLowDebugStep5: '<i>5</i> Selezionare <b>[Debug USB]</b>',/*不超过60个字符*/
		AndroidLowDebugStep6: '<i>6</i> Toccare <b>[OK]</b>',/*不超过60个字符*/
		AndroidHighDebugStep3: '<i>3</i> Toccare <b>[Opzioni per lo sviluppatore]</b>',/*不超过60个字符*/
		AndroidHigherDebugStep3: '<i>3</i> Toccare <b>[Info telefono]</b>',/*不超过60个字符*/
		AndroidHigherDebugStep4: '<i>4</i> Toccare <b>[Numero build]</b> più volte',/*不超过60个字符*/
		AndroidHigherDebugStep5: '<i>5</i> Verrà abilitata la modalità sviluppatore',/*不超过60个字符*/
		AndroidHigherDebugStep6: '<i>6</i> Tornare indietro e toccare <b>[Opzioni per lo sviluppatore]</b>',/*不超过60个字符*/
		AndroidHigherDebugStep9: '<i>9</i> Selezionare <b>[Consenti sempre su questo computer]</b>',/*不超过60个字符*/
		
		SamsungHighDebugStep4: '<i>4</i> Toccare <b>[Opzioni per lo sviluppatore]</b>',/*不超过60个字符*/
		SamsungHigherDebugStep3: '<i>3</i> Toccare <b>[Altro]</b>',/*不超过60个字符*/
		SamsungHigherDebugStep4: '<i>4</i> Toccare <b>[Info dispositivo]</b>',/*不超过60个字符*/
		
		driver1 :'<i>3</i> Toccare <b>[Info]</b>',
		driver2 :'<i>4</i> Toccare <b>[Informazioni software]</b>',
		driver3 :'<i>8</i> Tornare <b>[indietro] </b> e toccare <b>[Opzioni per lo sviluppatore]</b>',
		driver4 :'<i>9</i> Selezionare <b>[Non chiedere di nuovo]</b>',
		driver5 :'<i>2</i> Toccare <b>[Generale]</b>',
		driver6 :'<i>10</i> Toccare <b>[Sì]</b>',
		/*2014-6-12*/
		driver7:' Selezionare <b>[Non mostrare più]</b>',
		
		/*2014-7-3*/
		usbDebugServiceText:"È anche possibile chiamare l'assistenza clienti per ricevere supporto",
		usbDebugCustomer:"Assistenza clienti",
		usbDebugTitle: 'Aprire Debug USB per gestire il telefono',
		
		/*2014wifi*/
		driverUsbConnect: 'Connessione USB',
		driverWifiConnect: 'Connessione Wi-Fi',
		deviceBeen:"Sono stati rilevati {0} dispositivi. Collegare il dispositivo.",
		connectAnother:"Collega un altro dispositivo",
		pleaseDownMg:"Scaricare <b>Mobogenie Helper</b> sul dispositivo.",
		alreadyHava:"Mobogenie Helper è già installato",
		enterPass:"2.Immettere il codice di verifica.",
		howtofind:"In che modo è possibile trovare il codice di verifica?",
		pleasePhoneOk:"Accettare la richiesta di connessione dal dispositivo.",
		conncetionFailed:"Connessione non riuscita. Verificare i seguenti elementi: ",
		phoneWifiOpen:"Accertarsi che il Wi-Fi sia attivo e che il dispositivo si trovi sulla stessa rete LAN del PC.",
		passwordOk:"Il codice di verifica è corretto?",
		connectnix:"Connessione non riuscita. Il dispositivo ha rifiutato la richiesta di connessione del PC.",
		
		contingDevice:"Collegamento del dispositivo in corso...",
		updatingHelp:"Aggiornamento di Mobogenie Helper in corso...",
		updateFailed:"Aggiornamento di Mobogenie non riuscito.",
		alreadyCon:"Ho collegato il cavo USB",
		connectBtnText:"Connetti",
		wifiScreen:"Impossibile accedere alle schermate del telefono via Wi-Fi.",
        
        //2014-10-14
		connectNoticeTitle: 'Collegare al dispositivo.',
		helpisOpen:"Mobogenie Helper è in esecuzione sul telefono?",
		//2014-10-20
		pleaseClick:"Dopo l'installazione, aprire Mobogenie Helper e fare clic sul pulsante riportato di seguito per ristabilire la connessione.",
		reConnectBtn:"Riconnetti",
		pleaseInstall:"È stata inviata una versione aggiornata di Mobogenie Helper. Installarla sul dispositivo Android in uso.",
		scanBlow:"Scansionare il codice QR riportato di seguito",
		downloadUsing:"Eseguire il download sul dispositivo Android in uso utilizzando l'URL riportato di seguito",
		openHelpDevice:"1. Aprire Mobogenie Helper sul dispositivo Android.",
		
		/*2014-11-07修改*/
		connectFailedText:"Connettersi tramite Wi-Fi.",
		waitLong:"La connessione sta impiegando troppo tempo? Invia una segnalazione.",
		alreadyHava:"Mobogenie Helper è installato sul telefono. Avanti!",
		noHavaMobo:"Mobogenie Helper non è installato sul telefono. Indietro!",
		tryConnectWifi:"Try connecting via Wi-Fi",
		/*2014-11-14增加*/
		driverWifiConnect:"Connessione wireless",
		havaOpenUsb:"La funzione USB è attivata.",
		usbConnectFailed:"Errore di connessione USB",
		checkPhoneFailed: "Un programma impedisce la connessione del telefono al PC. Chiudere il programma e riprovare.",
		closeReConnect: "Chiudere il programma e connettersi nuovamente a {0}."
    };
    return dictionary;
});