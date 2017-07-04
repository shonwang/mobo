define('italian:backupRestore', function(require, exports, module){
    var dictionary = {
        lastBackupLabel: 'Ultimo backup: ',
        basicLabel: 'Standard',
        advanceLabel: 'Avanzate',
        backupCompleted: 'Backup completato',
        backupProcess: 'Backup in corso... Tenere il dispositivo collegato.',
        viewBackup: 'Visualizza backup',
        finish: 'Fine',
        backtoLabel: "Esegui backup in: ",
        changeLabel: "Modifica",
        contactLabel: "Contatti",
        messageLabel: "Messaggi",
        callRegordsLabel: "Record chiamate",
        appLabel: "Applicazioni",
        picLabel: "Foto",
        musicLabel: "Musica",
        videoLabel: "Video",

        restoreProcess: 'Ripristino in corso... Tenere il dispositivo collegato.',
        restoreLabel: "Ripristino",
        nextLabel: "Avanti",
        closeLabel : "Chiudi",
        restoreFolder: "Ripristina da cartella personalizzata",
        selectLabel: "Seleziona un file da ripristinare: ",
        previousLabel: "Precedente",
        //20140531 - add by wangzhisong
        noBackupFile: "Non è stato trovato nessun file di backup.",
        //20140623
        pushBackupLabel: "Effettuare ora un backup del dispositivo per proteggere i dati personali.",
        //2014-7-25
        sureDialogText:"Per evitare la perdita di dati non è possibile eseguire il backup e il ripristino contemporaneamente."
    };
    return dictionary;
});