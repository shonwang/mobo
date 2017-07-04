define('france:sms', function(require, exports, module){
    var dictionary = {
        sendTo: 'Envoyer à',
        characters: 'caractère(s)',
        pressCE: 'Appuyez sur Ctrl + Entrée pour envoyer',
        writeMessage: 'Saisissez votre message ici.',
        send: 'Envoyer',
        allGroup: 'Groupe entier',
        selectAll: 'Sélectionner tout',
        removeAll: 'Tout supprimer',
        emptyInfo:'Envoyer un message texte à un(e) ami(e).',
        newMessage: 'Nouveau message',
        msgSelected: '{0} Message(s) sélectionné(s)',
        promptDelete: 'Voulez-vous vraiment supprimer les {0} conversations sélectionnées ({1} messages) ?',
        importLable: "Importer",
        exportLabel: "Exporter",
        deleteLabel: "Supprimer",
        refreshLabel: "Actualiser",
        addContact: "Ajouter un contact",
        editContact: "Modifier un contact",
        loadMore: "Charger plus",
        /*2014-5-30*/
       	contacts: '{0} contact(s) sélectionné(s)',
        contactName:"Nom ou numéro de téléphone",

        selectedMsgLabel: "Messages sélectionné ({0})",
        allMsgLabel: "Tous les messages ({0})",

        exportSuccess:"{0} messages exportés.",
        exportFailed:"{0} messages exportés, {1} échecs :",
        /*2014-5-31*/
        deleteFailed:"{0} messages supprimés, {1} échecs ",
        /*2014-6-18*/
        markasRead:"Marquer comme lu(s)",
        /*2014-07-22*/
       smsPermissionNotice:"Les autorisations SMS peuvent avoir été bloquées par une application de sécurité. Veuillez activer les autorisations dans [Gestion des autorisations]",
       emptySMS:"Il n\'y a pas d\'image sur votre appareil.",
    };
    return dictionary;
});
