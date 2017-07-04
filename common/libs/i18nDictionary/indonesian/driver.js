define('indonesian:driver', function(require, exports, module){
    var dictionary = {
		badNetworkTitle:'Koneksi jaringan buruk. Harap periksa jaringan Anda.',/*不超过70个字符*/
		pictureGuide: 'Panduan Gambar',/*不超过26个字符*/
		videoGuide: 'Panduan Video',/*不超过26个字符*/
		myVersion: 'Versi Android Saya :',/*不超过26个字符*/
		debugFootText: 'Masih tidak dapat membuka Debug USB?',/*不超过40个字符*/
		oneClickSet: 'Pengaturan',/*不超过30个字符*/
		tryConnectText: 'Coba cabut dan colokkan kembali kabel atau mulai ulang perangkat Anda.',/*不超过70个字符*/
		butBack: 'Kembali',
		ContactSupport: 'Hubungi bantuan',/*不超过30个字符*/
		allowDebugText: 'Harap tekan "OK" saat dimintai izin debug USB.',/*不超过70个字符*/
		allowDebugTip: "<i>1</i> Centang pilihan ini",/*不超过50个字符*/
		allowDebugOkTip: "<i>2</i> Ketuk <b>[OK]</b>",/*不超过50个字符*/
		butRetry: 'Tidak dapat melihat pop-up ini?',/*不超过60个字符*/
		butShowAgain: 'Tampilkan Lagi',/*不超过25个字符*/
		stillNoSolove: 'Masih tidak bekerja?',
        debugTipText: 'Silakan unduh {0} (12KB) ke perangkat Anda',/*不超过50个字符*/
        debugSetterContentText: ' [USB Debuger]',/*不超过20个字符*/
		orText: 'ATAU',
		noSpaceHint: 'Tidak tersedia cukup memori pada perangkat Anda.',/*不超过60个字符*/
		noSpaceText: 'Mobogenie membutuhkan minimal {0} ruang disk.',/*不超过50个字符*/
		needSpaceText: '10 MB',
		upSpaceText: 'Hapus instalasi beberapa aplikasi untuk mengosongkan ruang.',/*不超过60个字符*/
		butHaveSpace: 'Saya Punya Cukup Ruang',/*不超过32个字符*/
		connectFailedTitle:'Ups. Koneksi gagal.',
		connectFailedTryText: 'Coba putuskan lalu sambungkan kembali perangkat Anda.',/*不超过90个字符*/
		connectFailedRestart: 'Mulai ulang Mobogenie.',/*不超过90个字符*/
		RestartDevice: 'Mulai ulang PC dan perangkat Anda.',/*不超过90个字符*/
		connectFailedText: 'Jika masih tidak bekerja, Anda dapat membaca FAQ kami atau beri tahu kami masalah Anda.',/*不超过90个字符*/
		
		connectionGuide:'Panduan Koneksi',
		driverUsbTitle: 'Harap sambungkan perangkat Anda lewat kabel USB.',/*不超过50个字符*/
		driverUsbText: 'Setelah perangkat tersambung, Anda dapat mengunduh game, aplikasi dan lainnya gratis, serta mengelola perangkat Anda.',
		
		AndroidLowDebugStep1: '<i>1</i> Ketuk <b>[Kolom Aplikasi]</b>',/*不超过60个字符*/
		AndroidLowDebugStep2: '<i>2</i> Ketuk <b>[Pengaturan]</b>',/*不超过60个字符*/
		AndroidLowDebugStep3: '<i>3</i> Ketuk <b>[Aplikasi]</b>',/*不超过60个字符*/
		AndroidLowDebugStep4: '<i>4</i> Ketuk <b>[Pengembangan]</b>',/*不超过60个字符*/
		AndroidLowDebugStep5: '<i>5</i> Centang <b>[Debug USB]</b>',/*不超过60个字符*/
		AndroidLowDebugStep6: '<i>6</i> Ketuk <b>[OK]</b>',/*不超过60个字符*/
		AndroidHighDebugStep3: '<i>3</i> Ketuk <b>[Pilihan developer]</b>',/*不超过60个字符*/
		AndroidHigherDebugStep3: '<i>3</i> Ketuk <b>[Tentang ponsel]</b>',/*不超过60个字符*/
		AndroidHigherDebugStep4: '<i>4</i> Ketuk <b>[Nomor build]</b> beberapa kali',/*不超过60个字符*/
		AndroidHigherDebugStep5: '<i>5</i> Mode Developer akan diaktifkan',/*不超过60个字符*/
		AndroidHigherDebugStep6: '<i>6</i> Kembali dan tekan <b>[Pilihan developer]</b>',/*不超过60个字符*/
		AndroidHigherDebugStep9: '<i>9</i> Centang <b>[Selalu izinkan dari komputer ini]</b>',/*不超过60个字符*/
		
		SamsungHighDebugStep4: '<i>4</i> Centang <b>[Pilihan developer]</b>',/*不超过60个字符*/
		SamsungHigherDebugStep3: '<i>3</i> Ketuk <b>[Lainnya]</b>',/*不超过60个字符*/
		SamsungHigherDebugStep4: '<i>4</i> Ketuk <b>[Tentang perangkat]</b>',/*不超过60个字符*/
		
		driver1 :'<i>3</i> Ketuk <b>[Tentang]</b>',
		driver2 :'<i>4</i> Ketuk <b>[Informasi Software]</b>',
		driver3 :'<i>8</i> Tekan <b>[kembali] </b> dan tap <b>[pilihan Developer]</b>',
		driver4 :'<i>9</i> Cek <b>[Jangan tanya saya lagi]</b>',
		driver5 :'<i>2</i> Ketuk <b>[Umum]</b>',
		driver6 :'<i>10</i> Ketuk <b>[Ya]</b>',
		/*2014-6-12*/
		driver7:' Tandai <b>[Jangan tampilkan ini lagi]</b>',
		
		/*2014-7-3*/
		usbDebugServiceText:"Anda juga dapat menghubungi layanan pelanggan lokal kami untuk bantuan",
		usbDebugCustomer:"Layanan Pelanggan",
		usbDebugTitle: 'Silakan buka USB Debugging untuk mengelola ponsel Anda',
		
		/*2014wifi*/
		driverUsbConnect: 'Koneksi USB',
		deviceBeen:"{0} perangkat terdeteksi. Silakan menyambungkan koneksi.",
		connectAnother:"Sambungkan dengan perangkat lainnya",
		pleaseDownMg:"Silakan mengunduh <b>Mobogenie Helper</b> ke perangkat Anda.",
		alreadyHava:"Saya sudah memiliki Mobogenie Helper",
		enterPass:"2.Masukkan kode verifikasi.",
		howtofind:"Bagaimana cara saya mendapatkan kode verifikasi?",
		pleasePhoneOk:"Silakan menyetujui untuk menyambung koneksi di perangkat Anda!",
		conncetionFailed:"Koneksi gagal. Silakan cek masalah di bawah ini:",
		phoneWifiOpen:"Silakan mengecek apakah Wi-Fi sudah dinyalakan dan perangkat Anda & PC Anda di LAN yang sama.",
		passwordOk:"Apakah kode verifikasi benar?",
		connectnix:"Koneksi gagal. Perangkat Anda menolak untuk disambungkan dengan PC!",
		
		contingDevice:"Menghubungkan perangkat Anda...",
		updatingHelp:"Memperbarui Mobogenie Helper...",
		updateFailed:"Gagal memperbarui Mobogenie!",
		alreadyCon:"Saya telah menyambungkan kabel USB.",
		connectBtnText:"Sambungkan",
		wifiScreen:"Tidak dapat mengakses screenshot melalui Wi-Fi.",
        
        //2014-10-14
		connectNoticeTitle: 'Harap sambungkan perangkat Anda.',
		helpisOpen:"Apakah Mobogenie Helper berjalan di ponsel Anda?",
		//2014-10-20
		pleaseClick:"Setelah menginstal, buka Mobogenie Helper dan klik tombol di bawah untuk tersambung kembali.",
		reConnectBtn:"Tersambung kembali",
		pleaseInstall:"Mobogenie Helper yang telah diperbarui telah terkirim. Silakan instal di perangkat Android Anda.",
		scanBlow:"Pindai kode QR di bawah ini",
		downloadUsing:"Unduh menggunakan URL di bawah ini di perangkat Android Anda",
		openHelpDevice:"1. Buka Mobogenie Helper di perangkat Android Anda.",
		
		/*2014-11-07修改*/
		connectFailedText:"Terhubung via Wi-Fi.",
		waitLong:"Terlalu lama? Beritahu kami!",
		alreadyHava:"Saya memiliki Mobogenie Helper pada ponsel saya. Berikutnya!",
		noHavaMobo:"Saya tidak punya Mobogenie Helper pada ponsel saya. Bawa aku kembali!",
		tryConnectWifi:"Try connecting via Wi-Fi",
		/*2014-11-14增加*/
		driverWifiConnect: 'Wireless Connection',
		havaOpenUsb:"Mengaktifkan fungsi USB",
		usbConnectFailed:"Koneksi USB eror",
		checkPhoneFailed: "Suatu program mencegah ponsel Anda untuk terhubung ke PC Anda. Tutup, lalu coba lagi.",
		closeReConnect: "Tutup program ini dan hubungkan kembali ke {0}."
    };
    return dictionary;
});