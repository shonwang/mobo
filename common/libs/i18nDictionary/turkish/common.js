define('turkish:common', function(require, exports, module){
    var dictionary = {
        connectingText: 'Bağlanıyor',
        
        homeLabel: 'Anasayfa',
        appLabel: 'Uygulamalar',
        gamesLabel: 'Oyunlar',
        ringtonesLabel: 'Zil Sesleri',
        wallPaperLabel: 'Duvar kağıtları',
        youTubeLabel: 'YouTube',
        moreLabel: 'Fazlası',
        toolsLabel: 'Araçlar',
        safetyLabel: 'Güvenlik',
        contactLabel: 'Kişilerim',
        smsLabel: 'Mesajlarım',
        myAppLabel: 'Uygulamalarım',
        myMusicLabel: 'Müziklerim',
        myPictureLabel: 'Resimlerim',
        myVideoLabel: 'Videolarım',
        Import:'İçe aktar',
        Export:'Dışa aktar',
        Delete:'Sil',
        Refresh:'Yenile',
        updateAllLabel: 'Tümünü Güncelle',
        updateLabel: 'Güncelle',
        uninstallLabel: 'Kaldır',
        deviceText: 'Cihaz',
        phoneText: 'Telefon',
        memoryText: 'Hafıza',
        installLabel: 'Yükle',
        sizeLabel: 'Boyut',
        nameLabel: 'İsim',
        locationLabel: 'Konum',
        actionLabel: 'Hareket',
        selectAllLabel: 'Tümünü Seç',
        downloadAllLabel: 'Tümünü İndir',
        downloadingText: 'İndiriliyor',
        redownloadText: 'Yeniden İndir',
        downloadLabel: "İndir",
        
        successText: 'Başarı',
        installedInText: '{0} Kuruldu',
        ImportingText: 'İçe aktarılıyor',
        setWallpaperFailed: 'Duvar kağıdı ayarlanamadı',
        importedInText: '{0} İçe aktarıldı ',
        
        retryText: 'Tekrar dene',
        pauseText: 'Duraklat',
        continueText: 'Devam',
        inProcessingTaskText: 'İşleniyor',
        completedText: 'Tamamlandı',
        noTaskText: 'Hiçbir görev yok',
        
        captureLabel: 'Yakala',
        featureText: 'Olmazsa Olmazlar',
        countTasksText: '{0} görev(ler)',
        
        updateTipText: '{0} uygulamanın zaten en son versiyonuna sahipsiniz.',
        rootTipText: 'Telefonunuz root edilmemiştir. Root etmek istediğiniz uygulamayı kurmanıza izin verir,',
        oneClickRootLabel: 'Tek tık Root',
        shareMobogenieText: 'Mobogenie yi şurada paylaş',
        
        tipLabel: 'Öneri',
        confirmLabel:'Kabul',
        okLabel : 'OK',
        yesLabel : 'Evet',
        cancelLabel:'İptal',
        closeLabel : 'Kapat',
        failedLabel : 'Hata',
        exportSuccess:'Dışa aktarma başarılı',
        
        headSignIn:'Oturum aç',
        connectAnother : 'Başka bir cihaz bağlayın',
        deviceInfo: 'Cihaz hakkında',
        email:'Email',
        /*add 2014-03-28*/
        promptInvaildPath:'Geçersiz yol.',
	   
	    connectDeviceVia:'Uygulamalar,Oyunlar,Videolar ve her türlü ücretsiz Android içeriği kurmak ve devrimci bir mobil cihaz yönetimi hizmeti için telefonunuzu kolayca bağlayın.',
        connectNow:'Şimdi Bağla',
		
		downloadingDriver:'Cihazınız için sürücü indiriliyor {0}',
		installingDriverText:'Sürücü cihazınıza kuruluyor',
		installingMG:'Cihazınıza Mobogenie kuruluyor',
		connectedYourDeviceText: 'Bağlandı',
		disconnectYourDeviceText: 'Bağlantıyı kes',

        searchResultText: 'Şunu ara <span class="c-red key-sp">{0}</span>, bulundu <span class="c-red num-sp">{1}</span> sonuç(lar) ',
        searchSeeAllLink: 'Tümünü gör',
        openLabel: 'Klasör aç',
        
        Exporting:"Dışa aktarılıyor. Lütfen cihazınızı bağlı tutun.",
        Deleting:"Siliniyor.Lütfen cihazınızı bağlı tutun.",

        deviceMemoryLabel: "Cihaz Hafızası",
        sdCardLabel: "SD Kart 1",
        sdCardTwoLabel: "SD Kart 2",
        total: "Toplam: ",
        available: "Müsait: ",
        manage: "Yönet",
        
        installedText: 'Kuruldu',
        updateAppText: 'Güncelle',
        installingAppText: 'Kuruluyor',
        installText: 'Kur',
        
        /*2014-05-13*/
       searchHolderMyApp:"Yerel Uygulamalar&Oyunlar",
       searchHolderWallpaper:"Duvar Kağıtları",
       searchHolderRingtone:"Ses Tonları",
       searchHolderAppGames:"Uygulamalar/Oyunlar",
       noSdState:"Cihazınızda SD Kart bulunamadı.",
       /*2014-5-26*/
       minTipText:"Küçült",
       maxTipText:"Büyüt",
       exitTipText:"Çıkış",
       returnTipText:"Geri",
       retreatTipText:"İleri",
       /*2014-5-27*/
       noLabel : 'Hayır',
       menuOpenLabel:"Aç",
       //20140604
       bestPicksLabel: 'En İyi Seçimler',
       actionFailed:'Hareket başarısız oldu',
       /*2014-06-09*/
      searchHolderYoutube:'YouTube URL ya da Anahtar sözcükler',
      screenshotSave:"Snapshot şuraya kaydedildi: ",
      screenshotText:"Snapshot",
      screenshotCheckPathTip: "Snapshot'ı kaydetmek için her zaman bu yolu kullan",
      /*2014-06-10*/
      alwaysOpenClient:'Cihazı her bağladığınızda Mobogenie açılsın',
      changeOpenClient:'Bu Ayarları istediğiniz zaman değiştirebilirsiniz.',
      /*2014-06-18*/
      screenBlackTipText: "Lütfen mobil cihazınızın ekranını açın",
      /*2014-06-30*/
     ebookLabel:"Kitaplar",
     myEbookLabel:"Kitaplarım",
      /*2014-6-30修改*/
      connectDeviceText:'Bağlanıyor. Lütfen cihazınızı bağlı tutun.',
      openManageDevice:"Bir cihaz tespit edildi. Cihazınızı yönetmek ve ücretsiz içerik indirmek için Mobogenie'yi açın.",
      /*2014-07-18*/
     searchHolderEBook:"Kitaplar",
     /*2014-09-25*/
    rememberMarkLabel:"Hatırlatma Ayarları"
    };
    return dictionary;
});