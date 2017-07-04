define('indonesian:video', function(require, exports, module){
    var dictionary = {
        importVideo: 'Impor Video',/*不超过28个字符*/
        exportSuccess:"Mengekspor {0} video berhasil.",
        exportFailed:"Ekspor {0} video berhasil, gagal mengekspor {1}:",
        promptDelete: 'Yakin ingin menghapus {0} video terpilih?',
        deleteFailed:"Menghapus {0} video berhasil, gagal menghapus {1}:",
        promptPlayTitle: 'Bersiap memutar video',
        promptPlay: 'Memuat...',
        emptyVideoLabel: 'Tidak ada video di perangkat Anda.',
        gotoYouTubeLabel: 'Unduh Video',
        promptInvaildPath: 'Jalur tidak valid.',
        playLabel: 'Putar',
        promptImportTips: "Android hanya mendukung format .avi, .3gp, .mp4, and .m4v. Video yang diimpor ke format lain mungkin tidak dikenali sistem.",
        promptFullDisk:"Slot di Disk C tidak cukup. Silakan kosongkan sedikit sebelum memutar video.",
    };
    return dictionary;
});