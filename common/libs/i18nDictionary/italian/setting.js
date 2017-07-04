define('italian:setting', function(require, exports, module){
    var dictionary = {
    	aboutMe:'Info su Mobogenie',/*不超过18个字符*/
		aboutMeVersion:'Versione: {0}',/*不超过22个字符*/
		MGWebsite:'Sito Web:',/*不超过35个字符*/
		MGForums:'Forum:',/*不超过35个字符*/
		aboutMeLinkPolicy: 'Informativa sulla privacy',/*不超过35个字符*/
		aboutMeLinkEULA: 'EULA',/*不超过35个字符*/
		aboutMeLinkTOS: 'Condizioni per l\'utilizzo del servizio',/*不超过35个字符*/
		aboutMeFootText: '©2014 Mobogenie.com. Tutti i diritti riservati',/*不超过70个字符*/
		feedback:'Commenti',
        fbEmailFormatFailed: 'Indirizzo e-mail non valido',/*不超过60个字符*/
        BtnSubmit: 'Invia',
        fbSuccessTitle: 'Grazie per il commento.',/*不超过45个字符*/
        fbSuccessText: 'Il personale dell\'assistenza clienti sarà disponibile il prima possibile. Assicurarsi quindi di aver controllato la Posta in arrivo.',/*不超过150个字符*/
        
       
        setting: 'Impostazioni',/*不超过18个字符*/
        checkForUpdates: 'Controlla aggiornamenti',/*不超过18个字符*/
        whatNew: 'Quali sono le novità?',/*不超过18个字符*/
        ContactUs: 'Contattataci',/*不超过18个字符*/
        
		generalLabel: 'Generale',/*不超过13个字符*/
		LocationsLabel: 'Posizioni',/*不超过13个字符*/
		AppllicationsLabel: 'Applicazioni',/*不超过13个字符*/
		remindersLabel: 'Promemoria',/*不超过13个字符*/
		Language: 'Lingua',/*不超过62个字符*/
		generalStartupTitle: 'All\'avvio',/*不超过62个字符*/
		generalStartupText:'Continuare automaticamente le attività non completate',/*不超过62个字符*/
		generalConnetTitle: 'Al collegamento del dispositivo',/*不超过62个字符*/
		generalConnetText: 'Aprire sempre Mobogenie',/*不超过62个字符*/
		generalConnetTextTwo: ' Installare automaticamente le applicazioni scaricate',/*不超过62个字符*/
		generalCloseTitle: 'Alla chiusura',/*不超过62个字符*/
		generalCloseText: ' Ridurre a icona il client',/*不超过62个字符*/
		generalCloseTextTwo: 'Uscire dal client',/*不超过62个字符*/
		generalCloseTextThree: 'Ricorda ogni volta',/*不超过62个字符*/
		generalUpdateTitle: 'Aggiornamento del client',/*不超过62个字符*/
		generalUpdateText: 'Aggiorna automaticamente il client all\'ultima versione',/*不超过62个字符*/
		locationsResource: 'Download delle risorse',/*不超过62个字符*/
		locationsBackup: 'Posizione backup',/*不超过62个字符*/
		locationsScreen: 'Posizione schermate',/*不超过62个字符*/
		locationsBtn: 'Cerca...',/*不超过12个字符*/
		appllicationsFileTitle: 'Associazione file',/*不超过62个字符*/
		appllicationsFileText: 'Controllare se i file .apk sono associati a Mobogenie',/*不超过62个字符*/
        appllicationsLatestTitle: 'Aggiorna automaticamente le applicazioni più recenti',
		appllicationsLatestText: 'Scarica automaticamente le ultima applicazioni aggiornabili',/*不超过62个字符*/
		appllicationsDefaultTitle: 'Posizione installazione predefinita',/*不超过62个字符*/
		appllicationsDefaultText: ' Automatico (in caso di errore di installazione sulla scheda SD, l\'installazione verrà effettuata sul dispositivo.)',/*不超过62个字符*/
		appllicationsDefaultTextTwo: 'Memoria dispositivo',/*不超过62个字符*/
		appllicationsDefaultTextThree: 'Scheda SD esterna (supporta solo Android 2.2 e versioni successive.)',/*不超过62个字符*/
		remindersUpdateTitle: 'Aggiornamenti dell\'applicazione',/*不超过62个字符*/
		remindersUpdateText:'Visualizza promemoria di aggiornamento delle applicazioni ogni {0} giorni',/*不超过62个字符*/
		remindersBackupText:'Visualizza promemoria di backup del dispositivo ogni {0} giorni',/*不超过62个字符*/
		remindersUpdateTextTwo: 'Non visualizzare più il promemoria',/*不超过62个字符*/
		remindersBackupTitle: 'Backup',/*不超过62个字符*/
		remindersPopularTitle: 'Attività più popolari',/*不超过62个字符*/
		remindersPopularText: 'Visualizza promemoria se sono disponibili promozioni e le attività più popolari',
		/*5-24*/
		swicthSiteLabel:'Sito',
		/*5-26*/
		settingTip:"Menu",
		/*7-21*/
		fbModelName: 'Modello dispositivo',
		fbOsVersion: 'Versione Android',
		
		/*7.22*/
		fbType1:"Imposs. attivare debug.",
		fbType9:"Altro",
		/*2014-9-9*/
		upload:"Carica",
		/*2014-9-11 新版反馈文案*/
		pleaseGory:"Categoria problema:",
		pleaseChoose:"Scegliere una categoria.",
		openUSB:"Apri debug USB:",
		pleaseSele:"Effettuare una selezione...",
		whatUsb:"Cos'è il debug USB?",
		havaActive:"Il debug USB è stato attivato?",
		phoneModel:"Modello telefono:",
		pleaseEnter:"Inserire il modello del telefono.",
		modelOf:"Modello del telefono con problema",
		email: "E-mail:",
		enterEmail:"Inserire il proprio indirizzo e-mail.",
		enterValid:"Inserire un indirizzo e-mail valido per consentire una migliore assistenza",
		andVer:"Versione Android:",
		pleaseVer:"Scegliere una versione Android.",
		corSystem:"Una corretta versione del sistema ci aiuta ad identificare con precisione il problema.",
		socialAcc:"Metodo di contatto:",
		selectMethod:"Selezionare un metodo di contatto",
		description:"Descrizione:",
		addAttach: "Aggiungi allegato",
		noFiles:"Nessun file",
		onlySupports:"Supporta solo i file di dimensioni inferiori a 3 MB.",
		whyNeed:"Perché devo attivare la funzione del debug USB?",
		debugRequired:"Il debug USB è richiesto dal sistema Android per la connessione al PC. L'attivazione del debug USB consente al telefono o al tablet di connettersi a Mobogenie in modo più rapido.",
		openfun:"In che modo posso avviare la funzione del debug USB?",
		andLower:"Android 3.2 o versioni precedenti",
		selectSet:"Selezionare [Impostazioni] nell'elenco delle applicazioni per accedere al menu di sistema.",
		selectApp: "Selezionare [Applicazioni].",
		
		selectDeve:"Selezionare [Sviluppo].",
		selectTap:"Selezionare [Debug USB] e toccare OK.",
		andFour: "Android 4.0 e 4.1",
		selectOpt:"Selezionare [Opzioni per lo sviluppatore].",
		openOpt:"Aprire [Opzioni per lo sviluppatore] in alto.",
		checkTap:"Selezionare [Debug USB] e toccare OK.",
		androidFour:"Android 4.2",
		tapIcon:"Toccare l'icona [Impostazioni].",
		tapPhone:"Toccare [Info telefono].",
		scrollBot: "Scorrere verso la parte inferiore dello schermo, individuare [Numero build] e toccarlo più volte.",
		
		keepTap:"Continuare a toccarlo finché non viene visualizzato il messaggio di conferma del nuovo stato di sviluppatore.",
		goback:"Ritornare alla pagina [Impostazioni] per visualizzare [Opzioni per lo sviluppatore]!",
		enterDeve:"Accedere a [Opzioni per lo sviluppatore] e toccare [Debug USB].",
		backDeve:"Ritornare a [Opzioni per lo sviluppatore] e assicurarsi di aver selezionato [Debug USB].",
		connectCom:"Connettere il telefono al computer e aprire Mobogenie. <br/>Mobogenie installerà [Mobogenie Helper] sul computer.<br/>Toccare OK una volta visualizzate le notifiche di installazione.",
		returnCon:"Ritorna e continua",
		fbSuccessClose: 'Continua a visitare il negozio{0}',
		
		unableCon:"Impossibile effettuare la connessione al telefono",
		proInstall:"Problemi con le risorse",
		contactsText:"Contatti e messaggi di testo",
		slowPer:"Prestazioni lente",
		unableRoot:"Impossibile impostare come principale",
		stillWhen:"MG viene visualizzato se non è connesso alcun dispositivo",
		suggesNew:"Suggerimenti per nuove funzioni",
		usbOn: "Debug USB attivato",
		usbOff: 'Debug USB disattivato',
		fbTextarea: "Siamo sempre a disposizione!",
		errorFile:"Formato del file errato",
		/*2014-11-07*/
		unableCon:"Impossibile connettersi al telefono tramite USB.",
		unableWifiCon:"Impossibile collegare il telefono tramite Wi-Fi.",
    };
    return dictionary;
});