define('turkish:myapp', function(require, exports, module){
    var dictionary = {
        installAppsLabel: 'Uygulamaları Kur',
        moveToSdCardLabel: 'SD Karta taşı',
        tabAppLabel: 'Uygulamalar',
        tabUpdatesLabel: 'Güncellemeler',
        tabSystemLabel: 'Sistem',
        moveLabel: 'Taşı',
        
        appCurrentVersionLabel: 'Geçerli Versiyon:',
        appLatestVersionLabel: 'En son Versiyon:',
        appLocationLabel: 'Konum:',
        appSizeColonLabel: 'Boyut:',
        ratingColonLabel: 'Değerlendirme:',
        
        likeColonLabel: 'Şunlar da hoşunuza gidebilir...',
        downloadsText: '{0} indirmeler',
        updatingText: 'Güncelleniyor',
        uninstallingText: 'Kaldırılıyor',
        installingText: 'Kuruluyor',
        sureUninstallTip: 'Seçilmiş {0} uygulama(lar)ı kaldırmak istediğinize emin misiniz?',
        uninstalling: 'Kaldırılıyor.Lütfen cihazınızın bağlantısını kesmeyiniz.',
        uninstallSuccessText: 'Başarılı',
        uninsatllFailed:"{0} Uygulama(lar) başarıyla kaldırıldı, {1} kaldırılamadı :",
        
        exportSuccess:"{0} Uygulama(lar) başarıyla dışa aktarıldı.",
        exportFailed:"{0} Uygulama(lar) başarıyla dışa aktarıldı,{1} aktarılamadı :",
        
        systemMaskText: 'Cihazınızı root ettikten sonra sistem uygulamalarınızı yönetebilirsiniz.',
        systemMaskCtn: 'Sistem uygulamalarınızı temizlemek 156.3 MB boş alan sağlayacak.',
        searchResultTitle:'{0} Uygulama(lar) bulundu',
        
        /*2014-5-26*/
        deviceTipText : "Cihaz Hafızası",
        sdCardTipText : "SD Kart",
        //06-03
        noapptext:'Cihazınızda uygulama bulunmamaktadır.',
        noupdatetext:'Cihazınızda güncellenebilecek uygulama bulunmamaktadır.',
        noappBtnText:'Uygulama İndir',
        //08-13
        moving: 'Taşınıyor.Lütfen cihazınızın bağlantısını kesmeyiniz.',
        moveFailed:"{0} Uygulama(lar) başarıyla taşındı,{1} taşınamadı :",
        //08-19
        moveConfirm:"Uygulamalar SD kartınıza taşındıktan sonra çalışmayabilir. Devam etmek istediğinize emin misiniz?",
        //2014-10-14
        wifiUninstallTitle:"Lütfen telefonunuzdan kaldırmayı tamamlayınız."
    }
    return dictionary;
});