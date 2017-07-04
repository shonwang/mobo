define('indonesian:myapp', function(require, exports, module){
    var dictionary = {
        installAppsLabel: 'Instal Aplikasi',/*不超过18个字符*/
        moveToSdCardLabel: 'Pindahkan Ke Kartu SD',/*不超过30个字符*/
        tabAppLabel: 'Aplikasi',/*不超过24个字符*/
        tabUpdatesLabel: 'Pembaruan',/*不超过24个字符*/
        tabSystemLabel: 'Sistem',/*不超过24个字符*/
        moveLabel: 'Pindah',
        
        appCurrentVersionLabel: 'Versi Saat Ini:',/*不超过22个字符*/
        appLatestVersionLabel: 'Versi Terbaru:',/*不超过22个字符*/
        appLocationLabel: 'Lokasi:',/*不超过20个字符*/
        appSizeColonLabel: 'Ukuran:',/*不超过22个字符*/
        ratingColonLabel: 'Peringkat:',
        
        likeColonLabel: 'Anda mungkin suka ini...',/*不超过45个字符*/
        downloadsText: '{0} unduhan',
        updatingText: 'Memperbarui',/*不超过45个字符*/
        uninstallingText: 'Hapus instal',/*不超过12个字符*/
        installingText: 'Menginstal',
        sureUninstallTip: 'Anda yakin ingin menghapus instalasi {0} aplikasi dipilih?',
        uninstalling: 'Hapus instalasi dalam proses. Biarkan perangkat Anda tetap tersambung.',
        uninstallSuccessText: 'Berhasil',
        uninsatllFailed:"Hapus instalasi {0} aplikasi berhasil, gagal menghapus instalasi {1}:",
        
        exportSuccess:"Mengekspor {0} aplikasi berhasil.",
        exportFailed:"Mengekspor {0} aplikasi berhasil,gagal mengekspor {1}:",
        
        systemMaskText: 'Anda dapat mengelola aplikasi sistem setelah rooting perangkat.',
        systemMaskCtn: 'Membersihkan aplikasi sistem Anda dapat mengosongkan hingga 156,3 MB ruang.',
        searchResultTitle:'ditemukan {0} aplikasi',
        /*2014-5-26*/
        deviceTipText : "Memori Perangkat",
        sdCardTipText : "Kartu SD",
        //06-03
        noapptext:'Tidak ada apps pada gadget anda.',
        noupdatetext:'Tidak ada apps yang memerlukan update pada gadget anda.',
         /*2014-6-18*/
        noappBtnText:'Download Aplikasi',
        //08-13
        moving: 'Sedang memindahkan. Pastikan perangkat Anda tetap terhubung.',
        moveFailed:"Berhasil memindahkan {0} aplikasi, gagal memindahkan {1}:",
        //08-19
        moveConfirm:"Aplikasi mungkin tidak bisa dibuka setelah dipindahkan ke Kartu SD. Yakin untuk lanjut?",
        //2014-10-14
        wifiUninstallTitle:"Harap selesaikan penghapusan instalasi di ponsel Anda."
    }
    return dictionary;
});