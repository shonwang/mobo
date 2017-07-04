define('poland:sms', function(require, exports, module){
    var dictionary = {
        sendTo: 'Wyślij do',
        characters: 'znaków',
        pressCE: 'Naciśnij Ctrl+Enter, aby wysłać',
        writeMessage: 'Wpisz wiadomość tutaj',
        send: 'Wyślij',
        allGroup: 'Grupa wszystkie',
        selectAll: 'Zaznacz wszystkie',
        removeAll: 'Usuń wszystkie',
        emptyInfo:'Wyślij wiadomość do znajomego',
        newMessage: 'Nowa wiadomość',
        msgSelected: '{0} - zaznaczone wiadomości',
        promptDelete: 'Czy na pewno chcesz usunąć zaznaczone sesje {0} (ilość wiadomości: {1})?',
        importLable: "Importuj",
        exportLabel: "Eksportuj",
        deleteLabel: "Usuń",
        refreshLabel: "Odśwież",
        addContact: "Dodaj kontakt",
        editContact: "Edytuj kontakt",
        loadMore: "Załaduj więcej",
        /*2014-5-30*/
       	contacts: '{0} - zaznaczone kontakty',
        contactName:"Nazwa kontaktu lub numer telefonu",

        selectedMsgLabel: "Zaznaczone wiadomości ({0})",
        allMsgLabel: "Wszystkie wiadomości ({0})",

        exportSuccess:"Z powodzeniem wyeksportowano wiadomości (ilość {0}).",
        exportFailed:"Wiadomości wyeksportowane z powodzeniem: {0}. Nie udało się wyeksportować: {1}.",
        /*2014-5-31*/
        deleteFailed:"Powiodło się usunięcie {0} wiadomości, nie udało się usunąć {1}: ",
        /*2014-6-18*/
        markasRead:"Oznacz jako przeczytane",
        /*2014-07-22*/
       smsPermissionNotice:"Uprawnienia SMS mogły zostać zablokowane przez aplikację zabezpieczającą. Należy nadać uprawnienia, wybierając odpowiednią pozycję w menu [Zarządzanie uprawnieniami]",
       emptySMS:"Brak wiadomości w urządzeniu.",
    };
    return dictionary;
});
