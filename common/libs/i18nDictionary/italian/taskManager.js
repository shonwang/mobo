define('italian:task', function(require, exports, module){
    var dictionary = {
        setingAsWallpaper: 'Operazione Imposta come sfondo in corso...',
        setingAsRingtone: 'Operazione Imposta come suoneria in corso...',
        setRingtoneSuccess: 'Operazione Imposta suoneria riuscita',
        setRingtoneFailed: 'Operazione Imposta suoneria non riuscita',
        
        insuficientSpace: 'Installazione non riuscita. Spazio insufficiente',
        noSdCard: 'Installazione non riuscita. Nessuna scheda SD',
        noSuchSourceFile: 'Installazione non riuscita. Nessun file simile',
        inValidApkFile: 'Installazione non riuscita. File .apk non valido',
        unknowSourceSetting: 'Installazione non riuscita. Selezionare \"Sorgenti sconosciute\" in Impostazioni > Applicazioni',
        installPhoneMemory: 'Effettuare l\'installazione su Memoria',
        unknownError: 'Errore sconosciuto',
        networkErrorText: 'Errore di rete',
        
        waitingText: 'In attesa',/*不超过56个字符*/
        pausedText: 'Sospeso',/*不超过24个字符*/
        installUnknownError: 'Installazione non riuscita. Errore sconosciuto',
        downloadUnknownError: 'Download non riuscito. Errore sconosciuto',
        
        adbConnectionError: 'Collegare il dispositivo da installare',
        
        importFileNotExistedText: 'Importazione non riuscita. File inesistente',
        importTransferErrorText: 'Importazione non riuscita. Errore trasferimento file',
        importInsufficientSpace: 'Importazione non riuscita. Spazio insufficiente',
        importUnknownError: 'Importazione non riuscita. Errore sconosciuto',
        importUnConnectError: 'Collegare il dispositivo da importare',
        importFailedNoSdCard: 'Importazione non riuscita. Nessuna scheda SD',
        installSdkOlderError: 'Non compatibile con il dispositivo in uso',
        installMismatchedCertificateError: 'Certificato APK non corrispondente. Disinstallare l\'applicazione corrente prima dell\'installazione',
        
        transferringText: 'Trasferimento in corso',/*不超过55个字符*/
        settedText: 'Impostato in data {0}',
        importViaConnectText: 'Collegare il dispositivo da importare',
        
        installFailedText: 'Installazione non riuscita',
        
        openFolder:'Apri cartella dei download',
        
        downloadInText: 'Scaricato in data {0}',
        reinstallText: 'Reinstalla',/*不超过15个字符*/
        noTaskText: 'Qui non ci sono attività.',
        /*6-04*/
        unknowSource2Setting: "Installazione non riuscita. Selezionare \"Sorgenti sconosciute\" in Impostazioni > Protezione",
        
        unzipAppText:"Estrazione file di dati in corso",
        transferDataFile:"Trasferimento file di dati in corso",
        unzipAppFailedText:"Impossibile estrarre file di dati",
        transferAppFailedText:"Impossibile trasferire file di dati",
        /*7-28*/
        hideTaskTip:"Nascondi",
        /*2014-09-25*/
        showInstallPopLabel:"Install",
        /*2014-10-14*/
        installOnDeviceText: 'Completare l\'installazione sul dispositivo.',
         /*2014-10-16*/
        pleaseTapInstall:"Fare clic su \"Installa\" sul dispositivo.",
        /*2014-11-10*/
        installSdCard: "Installa su RAM",
        onlyInstallSdCard: "L'app può essere installata solo sulla RAM del dispositivo.",
        
        /*2015-1-7yangtian*/
        insufficeient:"Spazio su disco insufficiente"
    };
    return dictionary;
});