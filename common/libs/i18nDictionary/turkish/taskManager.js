define('turkish:task', function(require, exports, module){
    var dictionary = {
        setingAsWallpaper: 'Duvar kağıdı olarak ayarlanıyor...',
        setingAsRingtone: 'Zil sesi olarak ayarlanıyor...',
        setRingtoneSuccess: 'Zil sesi başarıyla ayarlandı',
        setRingtoneFailed: 'Zil sesi ayarlanamadı',
        
        insuficientSpace: 'Kurulum hatası. Yetersiz alan',
        noSdCard: 'Kurulum hatası. SD Kart yok',
        noSuchSourceFile: 'Kurulum hatası. Böyle bir dosya bulunmamaktadır',
        inValidApkFile: 'Kurulum hatası. Geçersiz apk dosyası',
        unknowSourceSetting: 'Kurulum hatası. Lütfen Ayarlar > Uygulamalar dan “Bilinmeyen kaynaklar”ı kontrol ediniz',
        installPhoneMemory: 'Lütfen hafızaya kurun',
        unknownError: 'Bilinmeyen hata',
        networkErrorText: 'Ağ hatası',
        
        waitingText: 'Bekliyor',
        pausedText: 'Durakladı',
        installUnknownError: 'Kurulum hatası. Bilinmeyen hata',
        downloadUnknownError: 'İndirme hatası. Bilinmeyen hata',
        
        adbConnectionError: 'Kurmak için cihazınızı bağlayın',
        
        importFileNotExistedText: 'İçe aktarılamadı. Dosya bulunmamaktadır',
        importTransferErrorText: 'İçe aktarılamadı. Dosya transfer hatası',
        importInsufficientSpace: 'İçe aktarılamadı. Yetersiz alan',
        importUnknownError: 'İçe aktarılamadı. Bilinmeyen hata',
        importUnConnectError: 'İçe aktarmak için cihazınızı bağlayın',
        importFailedNoSdCard: 'İçe aktarılamadı. SD Kart yok',
        installSdkOlderError: 'Cihazınızla uyumsuz',
        installMismatchedCertificateError: 'APK sertifikası uyuşmazlığı. Lütfen kurmadan önce geçerli uygulamayı silin',
        
        transferringText: 'Taşınıyor',
        settedText: '{0} da ayarlandı',
        importViaConnectText: 'İçe aktarmak için cihazınızı bağlayın',
        
        installFailedText: 'Kurulum hatası',
        
        openFolder:'İndirilenler klasörünü açın',
        
        downloadInText: '{0} da indirildi',
        reinstallText: 'Yeniden kur',
        noTaskText: 'Burada görev bulunmamaktadır.',
        /*6-04*/
        unknowSource2Setting: "Kurulum hatası. Lütfen Ayarlar > Güvenlik'ten “Bilinmeyen kaynaklar”ı kontrol edin ",
        
        unzipAppText: "Veri dosyası çıkarılıyor",
        transferDataFile: "Veri dosyası taşınıyor",
        unzipAppFailedText: "Veri dosyası çıkarılamadı",
        transferAppFailedText: "Veri dosyası taşınamadı",
        /*7-28*/
        hideTaskTip:"Gizle",
        /*2014-09-25*/
        showInstallPopLabel:"Install",
        /*2014-10-14*/
        installOnDeviceText: 'Lütfen kurulumu cihazınızdan tamamlayınız.',
         /*2014-10-16*/
        pleaseTapInstall:"Lütfen 'Kur' a tıklayınız.",
        /*2014-11-10*/
        installSdCard: "Instal ke SdCard",
        onlyInstallSdCard: "Aplikasi ini hanya bisa diinstal ke SdCard perangkat Anda.",
        
        /*2015-1-7yangtian*/
        insufficeient:"Düşük disk alanı"
    };
    return dictionary;
});