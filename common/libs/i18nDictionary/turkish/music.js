define('turkish:music', function(require, exports, module){
    var dictionary = {
        ImportMusic: 'Müzikleri İçe Aktar',
        Artist:'Sanatçı',
        Time:'Zaman',
        Format:'Format',
        emptyMusicLabel:"Cihazınızda müzik bulunmamaktadır.",
        gotoRingtonesLabel: 'Zil sesleri indir',
        
        exportSuccess:"{0} Müzik başarıyla dışa aktarıldı.",
        exportFailed:"{0} Müzik başarıyla dışa aktarıldı,dışa aktarılamadı {1}:",
        
        sureDelete : "Seçilmiş {0} müziği silmek istediğinize emin misiniz?",
        deleteSuccess:"Başarıyla silindi.",
        deleteFailed:"{0} Müzik başarıyla silindi,silinemedi {1}:",
        //add 2014-04-02
        setringtoneSuccess:'Zil sesi başarıyla ayarlandı',
        setsmsSuccess:'Bildirim başarıyla ayarlandı',
        setalarmSuccess:'Alarm başarıyla ayarlandı',
        setFailed:'Ayarlama başarısız oldu',
        //add 2014-04-16
        cancelringtone:'Zil sesi iptal edildi',
        cancelsetsms:'Bildirim iptal edildi',
        cancelsetalarm:'Alarm iptal edildi',
        //add 2014-04-28
        formaterror:"Bu format desteklenmiyor",
        //add 2014-05-14
        setasringtone:"Zil sesi olarak ayarla",
        setasnotification:"Bildirim olarak ayarla",
        setasalarm:"Alarm olarak ayarla",
        /*2014-5-26*/
        stop:"Durdur",
        /*2014-09-10*/
       musicnotexist:"Müzik bulunmuyor"
    };
    return dictionary;
});
