define('turkish:contact', function(require, exports, module){
    var dictionary = {
        sideLabel: 'Kişiler',
        message: 'Mesajlar',
        music: 'Müziklerim',
        photo: 'Resimlerim',
        video: 'Videolarım',
        backup: 'Yedekle & Geri yükle',
        ChangeIcon:'Değiştir',
        MessageRecord:'Mesaj Kaydı',
        Note:'Not',
        Save:'Kaydet',
        Edit:'Düzenle',
        Cancel:'Vazgeç',
        inputhere:'Buraya yaz',
        ContactSelected:'<span class="contacts-count selectedNum f18">{0}</span> Kişiler Seçildi',
        SendMessage:'Mesaj Gönder',
        Filter:'Filtre',
        AllContacts:'Bütün Kişiler',
        AllGroups:'Bütün Gruplar',
        NewContact:'Yeni Kişi',
        ContactInfomation:'Kişi Bilgileri',
        //add 2014-03-24
        sureDeleteTitle:'Seçili {0} Kişi(ler)i silmek istediğinize emin misiniz?', 
        deleteFailed:"Silinemedi.",
        
        importingTitle:'Taşınıyor, bağlantıyı kesmeyiniz',
        importHeader:"Kişi(ler)i taşıyın",
        
        
        exportSuccess:"{0} kişiler başarıyla dışa aktarıldı.",
        exportFailed:"Dışa aktarılamadı.",
        
        addContactText:'Kişileri ekleyin, rehberde arayın ve mesaj gönderin. ',
        newContact: 'Yeni Kişi',
        writeMessage:'Mesajınızı buraya yazın...',
        Mobile: "Mobil",
        //add 2014-04-09
        deletingTitle:'Siliniyor, bağlantıyı kesmeyiniz',
        //2014-5-26
        addTipText:"Yeni",
        accountLabel:"Hesap : ",
        emptyContact:"Cihazınızda hiçbir kişi bulunmamaktadır.",
        //2014-05-29
        deleteTipText:"Sil",
        smsTipText:"Mesaj Gönder",
        
        importSuccess:"{0} Kişi başarıyla alındı.",
        importFailed:"{0} Kişi başarıyla alındı,{1} Alınamadı ",
        exportHeader:"Kişi(ler)i Dışa Aktar",
        exportAll:"Tüm Kişiler <em class='c-9'>({0})</em>",
        exportSelect:"Seçilmiş kişiler <em class='c-9'>({0})</em>",
        //2014-06-03
        editgroup:"Grup Düzenle",
        notassigened:"Atanmadı",
        saveFailed:'Kişi kaydedilemedi. Lütfen daha sonra tekrar deneyin.',
        //2014-06-11
        fileError:'Hata. Geçersiz vcf dosyası',
        groupText:'Grup',
        
        /*2014-07-22*/
       contactPermissionNotice:"Kişi izinleri bir güvenlik uygulaması tarafından bloke edilmiş olabilir. Lütfen [İzin Yönetimi]'nden izinleri onaylayın",
       //2014-08-18 保存分组失败
       saveGroupFailed:'Grup kaydedilemedi. Lütfen daha sonra tekrar deneyin.',
    };
    return dictionary;
});
