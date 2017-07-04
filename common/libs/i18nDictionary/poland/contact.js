define('poland:contact', function(require, exports, module){
    var dictionary = {
        sideLabel: 'Kontakty',
        message: 'Wiadomości',
        music: 'Moja muzyka',
        photo: 'Moje zdjęcia',
        video: 'Moje filmy',
        backup: 'Kopie zapasowe i przywracanie',
        ChangeIcon:'Zmień',
        MessageRecord:'Historia wiadomości',
        Note:'Uwaga',
        Save:'Zapisz',
        Edit:'Edytuj',
        Cancel:'Anuluj',
        inputhere:'wpisz tutaj',
        ContactSelected:'<span class="contacts-count selectedNum f18">{0}</span> Wybrane kontakty',
        SendMessage:'Wyślij wiadomość',
        Filter:'Filtr',
        AllContacts:'Wszystkie kontakty',
        AllGroups:'Wszystkie grupy',
        NewContact:'Nowy kontakt',
        ContactInfomation:'Informacje kontaktowe',
        //add 2014-03-24
        sureDeleteTitle:'Czy na pewno chcesz usunąć zaznaczone kontakty (ilość: {0})?',
        deleteFailed:"Nie udało się usunąć.",
        
        importingTitle:'Trwa importowanie, nie odłączaj telefonu.',
        importHeader:"Importuj kontakty",
        
        exportSuccess:"Z powodzeniem wyeksportowano kontakty (ilość {0}).",
        exportFailed:"Nie udało się wyeksportować.",
        
        addContactText:'Dodaj kontakty, wyszukaj w książce telefonicznej i wyślij wiadomości tekstowe.',
        newContact: 'Nowy kontakt',
        writeMessage:'Tutaj wpisz treść wiadomości...',
        Mobile: 'Komórkowy',
        //add 2014-04-09
        deletingTitle:'Trwa usuwanie, nie odłączaj telefonu.',
        //2014-5-26
        addTipText:"Dodaj",
        accountLabel:"Konto: ",
        emptyContact:"Brak kontaktów w telefonie",
        //2014-05-29
        deleteTipText:"Usuń",
        smsTipText:"SMS",
        
        importFailed:"Zaimportowano kontaktów: {0}, nie udało się zaimportować {1}",
        exportHeader:"Eksportuj kontakt(y)",
        exportAll:"Wszystkie kontakty: <em class='c-9'>({0})</em>",
        exportSelect:"Wybrano kontaktów: <em class='c-9'>({0})</em>",
        //2014-06-03
        editgroup:"Edytuj grupę",
        notassigened:"Nie przypisane",
        saveFailed:'Nie udało się zapisać kontaktu. Spróbuj później',
        //2014-06-11
        fileError:'Nie powiodło się. Nieprawidłowy plik vcf',
        groupText:'Grupa',
        
        /*2014-07-22*/
       contactPermissionNotice:"Uprawnienia do zarządzania kontaktami mogły zostać zablokowane przez aplikację zabezpieczającą. Należy nadać uprawnienia, wybierając odpowiednią pozycję w menu [Zarządzanie uprawnieniami]",
       //2014-08-18 保存分组失败
         saveGroupFailed:'Nie udało się zapisać grupy. Spróbuj później.'
    };
    return dictionary;
});
