define('italian:sms', function(require, exports, module){
    var dictionary = {
        sendTo: 'Invia a',
        characters: 'caratteri',
        pressCE: 'Premere Ctrl+Invio per inviare',
        writeMessage: 'Scrivi il messaggio qui.',
        send: 'Invia',
        allGroup: 'Tutti i gruppi',
        selectAll: 'Seleziona tutto',
        removeAll: 'Rimuovi tutto',
        emptyInfo:'Invia un messaggio di testo al tuo amico.',
        newMessage: 'Nuovo messaggio',
        msgSelected: '{0} Messaggi selezionati',
        promptDelete: 'Eliminare le {0} sessioni selezionate ({1} messaggi)?',
        importLable: "Importa",
        exportLabel: "Esporta",
        deleteLabel: "Elimina",
        refreshLabel: "Aggiorna",
        addContact: "Aggiungi contatto",
        editContact: "Modifica contatto",
        loadMore: "Carica altro",
        /*2014-5-30*/
       	contacts: '{0} contatti selezionati',
        contactName:"Nome contatto o numero telefonico",

        selectedMsgLabel: "Messaggi selezionati ({0})",
        allMsgLabel: "Tutti i messaggi ({0})",

        exportSuccess:"{0} video esportati con successo.",
        exportFailed:"Operazione di esportazione di {0} messaggi effettuata con successo, impossibile esportare {1}:",
        /*2014-5-31*/
        deleteFailed:"{0} messaggi sono stati eliminati correttamente. Impossibile eliminare {1}: ",
        /*2014-6-18*/
        markasRead:"Segna come già letto",
        /*2014-07-22*/
       smsPermissionNotice:"Le autorizzazioni per SMS potrebbero essere state bloccate da un'applicazione di protezione. Consentire la autorizzazioni in [Gestioni autorizzazioni]",
       emptySMS:"Nessun messaggio sul dispositivo.",
    };
    return dictionary;
});
