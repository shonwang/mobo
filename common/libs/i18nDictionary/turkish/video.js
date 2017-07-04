define('turkish:video', function(require, exports, module){
    var dictionary = {
        importVideo: 'Videoları içe aktar',
        exportSuccess:"{0} Videolar başarıyla dışa aktarıldı.",
        exportFailed:"{0} Videolar başarıyla dışa aktarıldı,{1} dışa aktarılamadı :",
        promptDelete: 'Seçilmiş{0} videoları silmek istediğinize emin misiniz?',
        deleteFailed:"{0} Başarıyla silindi,{1} silinemedi :",
        promptPlayTitle: 'Video oynatmaya hazırlanıyor',
        promptPlay: 'Yükleniyor...',
        emptyVideoLabel: 'Cihazınızda video bulunmamaktadır.',
        gotoYouTubeLabel: 'Video indir',
        promptInvaildPath: 'Geçersiz yol.',
        playLabel: 'Oynat',
        promptImportTips: "Android sadece .avi, .3gp, .mp4, and .m4v formatlarını destekler. Diğer formatlarda içe aktarılan videolar sistem tarafından tanınmayabilir.",
        promptFullDisk:"Disk C'de yeterli alan yok. Lütfen videoyu oynatmadan önce boş alan yaratın.",
    };
    return dictionary;
});