define('italian:contact', function(require, exports, module){
    var dictionary = {
        sideLabel: 'Contatti',
        message: 'Messaggi',
        music: 'La mia musica',
        photo: 'Le mie foto',
        video: 'I miei video',
        backup: 'Backup e ripristino',
        ChangeIcon:'Modifica',
        MessageRecord:'Record messaggi',
        Note:'Nota',
        Save:'Salva',
        Edit:'Modifica',
        Cancel:'Annulla',
        inputhere:'inserisci qui',
        ContactSelected:'<span class="contacts-count selectedNum f18">{0}</span> Contatti selezionati',
        SendMessage:'Invia messaggio',
        Filter:'Filtra',
        AllContacts:'Tutti i contatti',
        AllGroups:'Tutti i gruppi',
        NewContact:'Nuovo contatto',
        ContactInfomation:'Informazioni di contatto',
        //add 2014-03-24
        sureDeleteTitle:'Eliminare i {0} contatti selezionati?',
        deleteFailed:"Impossibile eseguire eliminazione.",
        
        importingTitle:'Importazione in corso, tenere il telefono collegato',
        importHeader:"Importa contatti",
        
        exportSuccess:"{0} contatti esportati con successo.",
        exportFailed:"Impossibile eseguire esportazione.",
        
        addContactText:'Aggiungi contatti, cerca nella rubrica e invia messaggi di testo.',
        newContact: 'Nuovo contatto',
        writeMessage:'Scrivi qui il messaggio...',
        Mobile: 'Cellulare',
        //add 2014-04-09
        deletingTitle:'Cancellazione in corso, tenere il telefono collegato',
        //2014-5-26
        addTipText:"Aggiungi",
        accountLabel:"Account: ",
        emptyContact:"Proprietario, nessun contatto nel telefono",
        //2014-05-29
        deleteTipText:"Elimina",
        smsTipText:"SMS",
        
        importFailed:"{0} contatti sono stati importati correttamente. Impossibile importare {1}",
        exportHeader:"Esporta contatti",
        exportAll:"Tutti i contatti <em class='c-9'>({0})</em>",
        exportSelect:"Contatti selezionati <em class='c-9'>({0})</em>",
        //2014-06-03
        editgroup:"Modifica gruppo",
        notassigened:"Non assegnato",
        saveFailed:'Impossibile salvare il contatto. Riprovare più tardi.',
        //2014-06-11
        fileError:'Operazione non riuscita. File vcf non valido',
        groupText:'Gruppo',
        
        /*2014-07-22*/
       contactPermissionNotice:"Le autorizzazioni per il contatto potrebbero essere state bloccate da un'applicazione di protezione. Consentire la autorizzazioni in [Gestioni autorizzazioni]",
       //2014-08-18 保存分组失败
         saveGroupFailed:'Impossibile salvare il gruppo. Riprovare più tardi.'
    };
    return dictionary;
});
