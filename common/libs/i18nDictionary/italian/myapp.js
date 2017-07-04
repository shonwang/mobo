define('italian:myapp', function(require, exports, module){
    var dictionary = {
        installAppsLabel: 'Installa applicazioni',/*不超过18个字符*/
        moveToSdCardLabel: 'Sposta sulla scheda SD',/*不超过30个字符*/
        tabAppLabel: 'Applicazioni',/*不超过24个字符*/
        tabUpdatesLabel: 'Aggiornamenti',/*不超过24个字符*/
        tabSystemLabel: 'Sistema',/*不超过24个字符*/
        moveLabel: 'Sposta',
        
        appCurrentVersionLabel: 'Versione corrente:',/*不超过22个字符*/
        appLatestVersionLabel: 'Versione più recente:',/*不超过22个字符*/
        appLocationLabel: 'Posizione:',/*不超过20个字符*/
        appSizeColonLabel: 'Dimensioni:',/*不超过22个字符*/
        ratingColonLabel: 'Valutazione:',
        
        likeColonLabel: 'Potrebbe piacere anche...',/*不超过45个字符*/
        downloadsText: '{0} download',
        updatingText: 'Aggiornamento',/*不超过45个字符*/
        uninstallingText: 'Disinstallazione in corso',/*不超过12个字符*/
        installingText: 'Installazione',
        sureUninstallTip: 'Disinstallare le {0} applicazioni selezionate?',
        uninstalling: 'Disinstallazione in corso. Tenere il dispositivo collegato.',
        uninstallSuccessText: 'Operazione riuscita',
        uninsatllFailed:"Operazione di disinstallazione di {0} applicazioni riuscita, impossibile disinstallare {1}:",
        
        exportSuccess:"{0} applicazioni esportate con successo.",
        exportFailed:"Operazione di esportazione di {0} applicazioni riuscita, impossibile esportare {1}:",
        
        systemMaskText: 'è possibile gestire le applicazioni del sistema dopo aver impostato il dispositivo come principale',
        systemMaskCtn: 'La cancellazione delle applicazioni del sistema consentirà di liberare fino a 156,3 MB di spazio.',
        searchResultTitle:'sono state trovate {0} applicazioni',
        /*2014-5-26*/
        deviceTipText : "Memoria dispositivo",
        sdCardTipText : "Scheda SD",
        //06-03
        noapptext:'Nessuna app sul tuo dispositivo.',
        noupdatetext:'Non ci sono app da aggiornare sul dispositivo.',
        /*2014-6-18*/
        noappBtnText:'Scarica app',
        //08-13
        moving: 'Spostamento in corso. Mantenere il dispositivo collegato.',
        moveFailed:"Spostamento di {0} app eseguito correttamente. Impossibile spostare {1}:",
        //08-19
        moveConfirm:"Le applicazioni potrebbero non funzionare una volta spostate sulla scheda SD. Continuare?",
        //2014-10-14
        wifiUninstallTitle:"Completare la disinstallazione sul telefono."
    }
    return dictionary;
});