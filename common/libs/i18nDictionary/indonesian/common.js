define('indonesian:common', function(require, exports, module){
    var dictionary = {
        connectingText: 'Menyambungkan',/*不超过16个字符*/
        
        homeLabel: 'Beranda',/*不超过14个字符*/
        appLabel: 'Aplikasi',/*不超过14个字符*/
        gamesLabel: 'Game',/*不超过14个字符*/
        ringtonesLabel: 'Ringtone',/*不超过14个字符*/
        wallPaperLabel: 'Wallpaper',/*不超过14个字符*/
        youTubeLabel: 'YouTube',/*不超过14个字符*/
        moreLabel: 'Lainnya',/*不超过14个字符*/
        toolsLabel: 'Perkakas',/*不超过14个字符*/
        safetyLabel: 'Keamanan',/*不超过14个字符*/
        contactLabel: 'Kontak Saya',/*不超过14个字符*/
        smsLabel: 'Pesan Saya',/*不超过14个字符*/
        myAppLabel: 'Aplikasi Saya',/*不超过14个字符*/
        myMusicLabel: 'Musik Saya',/*不超过14个字符*/
        myPictureLabel: 'Gambar Saya',/*不超过14个字符*/
        myVideoLabel: 'Video Saya',/*不超过14个字符*/
        Import:'Impor',/*不超过16个字符*/
        Export:'Ekspor',/*不超过16个字符*/
        Delete:'Hapus',
        Refresh:'Segarkan',
        updateAllLabel: 'Perbarui Semua',/*不超过16个字符*/
        updateLabel: 'Perbarui',/*不超过12个字符*/
        uninstallLabel: 'Hapus Aplikasi',/*不超过16个字符*/
        deviceText: 'Perangkat',/*不超过12个字符*/
        phoneText: 'Ponsel',
        memoryText: 'Memori',/*不超过12个字符*/
        installLabel: 'Instal',/*不超过12个字符*/
        sizeLabel: 'Ukuran',
        nameLabel: 'Nama',
        locationLabel: 'Lokasi',
        actionLabel: 'Tindakan',
        selectAllLabel: 'Pilih Semua',/*不超过30个字符*/
        downloadAllLabel: 'Unduh Semua',/*不超过24个字符*/
        downloadingText: 'Mengunduh',/*不超过24个字符*/
        redownloadText: 'Unduh ulang',
        downloadLabel: "Unduh",
        
        successText: 'Berhasil',
        installedInText: 'Diinstal dalam {0}',/*不超过45个字符*/
        ImportingText: 'Mengimpor',/*不超过55个字符*/
        setWallpaperFailed: 'Gagal memasang wallpaper',
        importedInText: 'Diimpor dalam {0}',
        
        retryText: 'Coba lagi',/*不超过15个字符*/
        pauseText: 'Jeda',/*不超过15个字符*/
        continueText: 'Lanjutkan',/*不超过15个字符*/
        inProcessingTaskText: 'Dalam Proses',
        completedText: 'Selesai',
        noTaskText: 'Tidak ada tugas',/*不超过18个字符*/
        
        captureLabel: 'Tangkap',/*不超过24个字符*/
        featureText: 'Wajib Punya',/*不超过24个字符*/
        countTasksText: '{0} Tugas',/*不超过15个字符*/
        
        updateTipText: '{0} aplikasi sudah versi terbaru.',/*不超过65个字符*/
        rootTipText: 'Perangkat Anda belum di-rooting. Rooting memungkinkan Anda menginstal aplikasi yang Anda inginkan.',
        oneClickRootLabel: 'Root Sekali Klik',
        shareMobogenieText: 'Bagikan Mobogenie di',/*不超过65个字符*/
        
        tipLabel: 'Tip',
        confirmLabel:'Konfirmasi',
        okLabel : 'OK',
        yesLabel : 'Ya',
        cancelLabel:'Batalkan',
        closeLabel : 'Tutup',
        failedLabel : 'gagal',
        exportSuccess:'Ekspor berhasil',
        
        headSignIn:'Masuk',/*不超过11个字符*/
        /*connectAnother : 'Sambung perangkat lain',*/
        deviceInfo: 'Tentang Perangkat',/*不超过22个字符*/
        email:'Email',
        /*add 2014-03-28*/
        promptInvaildPath:'Jalur tidak valid.',
	   
	    connectDeviceVia:'Cukup sambungkan ponsel Anda untuk menginstal Aplikasi, Game, Video, dan semua jenis konten Android gratis, serta membuka jalan menuju layanan manajemen perangkat seluler revolusioner.',
        connectNow:'Sambungkan Sekarang',
		
		downloadingDriver:'Mengunduh driver perangkat Anda {0}',/*不超过50个字符*/
		installingDriverText:'Menginstal driver perangkat Anda',/*不超过50个字符*/
		installingMG:'Menginstal Mobogenie ke perangkat Anda',/*不超过50个字符*/
		connectedYourDeviceText: 'Tersambung',/*不超过50个字符*/
		disconnectYourDeviceText: 'Terputus',/*不超过50个字符*/

        searchResultText: 'Pencarian <span class="c-red">{0}</span>, menemukan <span class="c-red">{1}</span> hasil',
        searchSeeAllLink: 'Lihat Semua',
        openLabel: 'Buka Folder',
        
        Exporting:"Ekspor dalam proses. Pastikan perangkat Anda tetap tersambung.",
        Deleting:"Penghapusan dalam proses. Pastikan perangkat Anda tetap tersambung.",

        deviceMemoryLabel: "Memori Perangkat",
        sdCardLabel: "Kartu SD 1",
        sdCardTwoLabel: "Kartu SD 2",
        total: "Total: ",/*不超过20个字符*/
        available: "Tersedia: ",/*不超过20个字符*/
        manage: "Kelola",
        
        installedText: 'Diinstal',/*不超过15个字符*/
        updateAppText: 'Perbarui',/*不超过12个字符*/
        installingAppText: 'Menginstal',/*不超过55个字符*/
        installText: 'Instal',/*不超过15个字符*/

        /*2014-05-13*/
       searchHolderMyApp:"Aplikasi&Game Lokal",
       searchHolderWallpaper:"Wallpaper",
       searchHolderRingtone:"Ringtone",
       searchHolderAppGames:"Aplikasi/Game",
       noSdState:"Kartu SD tidak ditemukan pada gadget anda.",
       /*2014-5-26*/
       minTipText:"Perkecil",
       maxTipText:"Perbesar",
       exitTipText:"Keluar",
       returnTipText:"Kembali",
       retreatTipText:"Maju",
       /*2014-5-27*/
       noLabel : 'Tidak',
       menuOpenLabel:"Buka",
       //20140604
       bestPicksLabel: 'Pilihan Editor',
       actionFailed:'Tindakan Gagal',
       /*2014-06-09*/
      searchHolderYoutube:'URL YouTube atau Kata Kunci',
      screenshotSave:"Snapshot telah disimpan ke: ",
      screenshotText:"Snapshot",
      screenshotCheckPathTip: "Selalu simpan snapshot di sini",
      /*2014-06-10*/
      alwaysOpenClient:'Selalu buka Mobogenie pada Gadget-Koneksi.',
      changeOpenClient:'Anda dapat mengganti ini di Pengaturan kapan saja.',
      /*2014-06-18*/
      screenBlackTipText: "Harap menyalakan layar gadget mobile anda",
      /*2014-06-30*/
      ebookLabel:"Buku",
      myEbookLabel:"Buku Saya",
      /*2014-6-30修改*/
      connectDeviceText:'Menghubungkan. Harap jaga gadget anda terhubung.',
      openManageDevice:"Gadget terdeteksi. Buka Mobogenie untuk mengatur gadget anda dan download konten gratis.",
      /*2014-07-18*/
      searchHolderEBook:"Buku",
      /*2014-09-25*/
      rememberMarkLabel:"Mengingat Pengaturan"
    };
    return dictionary;
});