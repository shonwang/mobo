define('turkish:sms', function(require, exports, module){
    var dictionary = {
        sendTo: 'ya gönder',
        characters: 'Karakter(ler)',
        pressCE: 'Göndermek için Ctrl+Enter a basın',
        writeMessage: 'Mesajınızı buraya yazın.',
        send: 'Gönder',
        allGroup: 'Tüm Grup',
        selectAll: 'Tümünü Seç',
        removeAll: 'Tümünü Geri Al',
        emptyInfo:'Arkadaşına mesaj gönder.',
        newMessage: 'Yeni Mesaj',
        msgSelected: '{0} Mesaj(lar) Seçildi',
        promptDelete: 'Seçilmiş {0} oturumları ({1} mesajları) silmek istediğinize emin misiniz?',
        importLable: "İçe aktar",
        exportLabel: "Dışa aktar",
        deleteLabel: "Sil",
        refreshLabel: "Yenile",
        addContact: "Kişi Ekle",
        editContact: "Kişi Düzenle",
        loadMore: "Daha Fazlasını Yükle",
        /*2014-5-30*/
       	contacts: '{0} kişi(ler) seçildi',
        contactName:"Kişi ismi ya da telefon numarası",

        selectedMsgLabel: "Seçilmiş mesajlar ({0})",
        allMsgLabel: "Tüm mesajlar ({0})",

        exportSuccess:"{0} Mesaj başarıyla dışa aktarıldı.",
        exportFailed:"{0} Mesaj başarıyla dışa aktarıldı, {1} Aktarılamadı : ",
        /*2014-5-31*/
        deleteFailed:"{0} Mesaj başarıyla silindi, {1} silinemedi : ",
        /*2014-6-18*/
        markasRead:"Okunmuş olarak işaretle",
        /*2014-07-22*/
       smsPermissionNotice:"SMS izinleri bir güvenlik uygulaması tarafından bloke edilmiş olabilir. Lütfen [İzin Yönetimi] seçeneğinden izin verin",
       emptySMS:"Cihazınızda mesaj bulunmamaktadır.",
    };
    return dictionary;
});
