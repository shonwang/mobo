define('italian:tools', function(require, exports, module){
    var dictionary = {
		managementTool:'Strumenti di gestione',
		backup:'Backup',/*不超过20个字符*/
		backupIntro:'Consente di effettuare il backup di tutti i dati del dispositivo Android su PC.',/*不超过58个字符*/
		restore:'Ripristino',/*不超过20个字符*/
		restoreIntro:'Consente di ripristinare i dati da un backup precedente.',/*不超过58个字符*/
		fileManager:'File Manager',/*不超过20个字符*/
		fileManagerIntro:'Consente di visualizzare file e cartelle sul dispositivo in uso.',/*不超过58个字符*/
		screenshot:'Schermate',/*不超过20个字符*/
		screenshotIntro:'Consente di acquisire le schermate dello schermo del dispositivo mobile in uso.',/*不超过58个字符*/
		deviceInfoIntro:'Consente di visualizzare le informazioni dettagliate del dispositivo.',/*不超过58个字符*/
		installApp:'Installa file di applicazioni/giochi',/*不超过20个字符*/
		installAppIntro:'Consente l\'installazione batch dei file .apk sul dispositivo in uso.',/*不超过58个字符*/
		advancedTool:'Strumenti avanzati',
		root:'Imposta come principale con un clic',/*不超过20个字符*/
		rootIntro:'Consente di impostare come principale il dispositivo per liberare più memoria.',//*不超过58个字符*/
		importOutlook:'Importa dati Outlook',/*不超过20个字符*/
		importOutlookIntro:'Consente di importare i contatti Outlook dal PC sul dispositivo Android.',/*不超过58个字符*/
		importSymbian:'Importa dati Symbian',/*不超过20个字符*/
		importSymbianIntro:'Consente di importare i contatti Symbian sul dispositivo Android.',/*不超过58个字符*/
		freeWifi:'Wi-Fi gratis',/*不超过20个字符*/
		freeWifiIntro:'Consente di condividere la rete del portatile con il dispositivo in uso tramite Wi-Fi.',/*不超过58个字符*/
		
		/*device info*/
		basicInfo:'Informazioni di base',
		modelNumber:'Numero modello:',/*不超过19个字符*/
		androidVer:'Versione sistema operativo Android:',/*不超过19个字符*/
		screenResoltion:'Risoluzione schermo:',/*不超过19个字符*/
		battery:'Batteria:',/*不超过19个字符*/
		cpu:'CPU:',/*不超过19个字符*/
		ram:'RAM:',/*不超过19个字符*/
		memory:'Memoria:',/*不超过19个字符*/
		sdCard:'Scheda SD:',/*不超过19个字符*/
		isRooted:'Impostato come principale:',/*不超过19个字符*/
		hardwareInfo:'Informazioni hardware',/*不超过19个字符*/
		imei:'IMEI:',/*不超过19个字符*/
		serialNumber:'Numero di serie:',/*不超过19个字符*/
		imsi:'IMSI:',/*不超过19个字符*/
		macAddress:'Indirizzo MAC:',/*不超过19个字符*/
		basebandVer:'Versione banda base:',/*不超过19个字符*/
		kernelVer:'Versione kernel:',/*不超过19个字符*/
		copy:'Copia',/*不超过8个字符*/
		copySuccess:'Copiato su Appunti',
		unknownError: 'Errore sconosciuto',
		unKnownText:'Si è verificato un errore sconosciuto.',
		netWorkError:'Errore di rete',
		netWorkErrorText:'Controllare la propria connessione di rete.',
		/*2014-09-11*/
		pcCleanerLabel:"PC Cleaner",
		scanOver:"Ricerca completata! È possibile eliminare {0} file indesiderati e {1} file del Registro di sistema.",
		cleanBtn:"Pulisci",
		lessBrowser:"File indesiderati di Internet",
		lessHistory:"File residui",
		lessCommonUes:'File indesiderati del software',
		lessSystem:'File indesiderati del sistema',
		lessDelete:"Cestino",
		lessUsuse:"File indesiderati del Registro di sistema",
		selectedLess:"selezionati",
		conScan:"Esegui nuova ricerca",
		cleanText:"Consente di eliminare i file indesiderati di Internet, del sistema, del software e molto altro.",
		
		cleanFinish:"Eliminazione completata!",
		someFile:"Alcuni file e voci di registro verranno eliminati dopo che si riavvia il computer.",
		cleanOver:"{0} file indesiderati e {1} file del Registro di sistema sono stati eliminati.",
		wifiConNot:"Questa funzione non è disponibile con la connessione Wi-Fi.",
		
		/*2014-11-03*/
		cleanFinished:"Operazione completata",
		/*2014-11-03 wifi hotpot*/
		deviceConnectingList:"Connesso a {0}",
		startingWifiTitle:"Connessione a rete Wi-Fi gratuita...",
		hasNoWIfiTitle:"Il PC non è connesso alla rete Wi-Fi.",
		iHaveWifi:"Il PC è connesso alla rete Wi-Fi.",
		wifiNameLabel:"Nome rete Wi-Fi: ",
		wifiPasswordLabel:"Password rete Wi-Fi: ",
		speedLabel:"Velocità",
		devicesConnectedTitle:"{0} dispositivi connessi.",
		closeWifiLabel:"Chiudi rete Wi-Fi",
		deviceBlackList:"Black list",
		deviceBlackList2:"Black list {0}",
		moveOutBlackList:"Rimuovi",
		downloadSpeedLabel:"Velocità di download",
		uploadSpeedLabel:"Velocità di caricamento",
		limitSpeedLabel:"Limite di velocità",
		pleaseWriteNum:"Inserire da 1 a 12 lettere, numeri o caratteri di sottolineatura.",
		moboWifi:"Mobogenie Wi-Fi",
		setBlackValidateNextTime:"La black list sarà effettiva solo dopo aver riavviato la connessione Wi-Fi gratuita.",
		//2014-11-12
		pleaseWriteDeviceNameValid:"Inserire da 1 a 12 caratteri.",
		
		//2014-11-14
		haveNoWifiAdapter:"Nessun adattatore Wi-Fi USB rilevato",
		solutionLabel:"Soluzioni",
		solutionPluginTitle:"Collegare l'adattatore Wi-Fi per attivare il servizio Wi-Fi gratuito.",
		solutionSwitchLaptop:"Passa a computer portatile."
    };
    return dictionary;
});