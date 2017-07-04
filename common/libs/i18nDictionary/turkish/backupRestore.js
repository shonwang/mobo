define('turkish:backupRestore', function(require, exports, module){
    var dictionary = {
        lastBackupLabel: 'Son yedekleme: ',
        basicLabel: 'Temel',
        advanceLabel: 'Gelişmiş',
        backupCompleted: 'Yedekleme tamamlandı',
        backupProcess: 'Yedekleniyor... Lütfen cihaz bağlantısını koparmayınız.',
        viewBackup: 'Yedeklemeyi görüntüle',
        finish: 'Bitti',
        backtoLabel: "Yedekle: ",
        changeLabel: "Değiştir",
        contactLabel: "Kişiler",
        messageLabel: "Mesajlar",
        callRegordsLabel: "Arama geçmişi",
        appLabel: "Uygulamalar",
        picLabel: "Resimler",
        musicLabel: "Müzikler",
        videoLabel: "Videolar",

        restoreProcess: 'Yedekleniyor... Lütfen cihaz bağlantısını koparmayınız.',
        restoreLabel: "Yeniden kur",
        nextLabel: "İleri",
        closeLabel : "Kapat",
        restoreFolder: "Özelleştirilmiş dosyadan yeniden kur", 
        selectLabel: "Yeniden kurulacak bir dosya seçiniz:", 
        previousLabel: "Geri",

        //20140531 - add by wangzhisong
        noBackupFile: "Yedekleme dosyası bulunamadı.", 
        //20140623
        pushBackupLabel: "Kişisel bilgilerini güvence altına almak için cihazınızı şimdi yedekleyiniz.", 
        //2014-7-25
        sureDialogText:"Veri kaybını önlemek için Yedekleme ve Yeniden kurma işlemleri aynı anda yapılamaz." 
    };
    return dictionary;
});