define('indonesian:tools', function(require, exports, module){
    var dictionary = {
		managementTool:'Manajemen Perangkat',
		backup:'Backup',/*不超过20个字符*/
		backupIntro:'Cadangkan semua data perangkat Android Anda ke PC.',/*不超过58个字符*/
		restore:'Restore',/*不超过20个字符*/
		restoreIntro:'Pulihkan data dari pencadangan sebelumnya.',/*不超过58个字符*/
		fileManager:'Pengelola File',/*不超过20个字符*/
		fileManagerIntro:'Lihat file dan folder di perangkat Anda.',/*不超过58个字符*/
		screenshot:'Cuplikan layar',/*不超过20个字符*/
		screenshotIntro:'Ambil cuplikan layar dari layar ponsel Anda.',/*不超过58个字符*/
		deviceInfoIntro:'Lihat rincian info perangkat.',/*不超过58个字符*/
		installApp:'Instal file Apl/Game',/*不超过20个字符*/
		installAppIntro:'Instal batch file aplikasi ke perangkat Anda.',/*不超过58个字符*/
		advancedTool:'Alat Lanjutan',
		root:'Root Sekali Klik',/*不超过20个字符*/
		rootIntro:'Root perangkat Anda untuk mengosongkan memori.',//*不超过58个字符*/
		importOutlook:'Impor Data Outlook',/*不超过20个字符*/
		importOutlookIntro:'Impor kontak Outlook dari PC Anda ke perangkat android.',/*不超过58个字符*/
		importSymbian:'Impor Data Symbian',/*不超过20个字符*/
		importSymbianIntro:'Impor kontak Symbian ke perangkat android Anda.',/*不超过58个字符*/
		freeWifi:'Wi-Fi gratis',/*不超过20个字符*/
		freeWifiIntro:'Bagikan jaringan laptop dengan perangkat Anda via Wi-Fi.',/*不超过58个字符*/
		
		/*device info*/
		basicInfo:'Informasi Dasar',
		modelNumber:'Nomor Model:',/*不超过19个字符*/
		androidVer:'Versi OS Android:',/*不超过19个字符*/
		screenResoltion:'Resolusi Layar:',/*不超过19个字符*/
		battery:'Baterai:',/*不超过19个字符*/
		cpu:'CPU:',/*不超过19个字符*/
		ram:'RAM:',/*不超过19个字符*/
		memory:'Memori:',/*不超过19个字符*/
		sdCard:'Kartu SD:',/*不超过19个字符*/
		isRooted:'Di-root:',/*不超过19个字符*/
		hardwareInfo:'Info Prgkt Keras',/*不超过19个字符*/
		imei:'IMEI:',/*不超过19个字符*/
		serialNumber:'Nomor Seri:',/*不超过19个字符*/
		imsi:'IMSI:',/*不超过19个字符*/
		macAddress:'Alamat MAC:',/*不超过19个字符*/
		basebandVer:'Versi Baseband:',/*不超过19个字符*/
		kernelVer:'Versi Kernel:',/*不超过19个字符*/
		copy:'Salin',/*不超过8个字符*/
		copySuccess:'Disalin ke Papan klip',
		unknownError: 'Kesalahan tidak diketahui',
		unKnownText:'Terjadi kesalahan tidak diketahui.',
		netWorkError:'Kesalahan Jaringan',
		netWorkErrorText:'Harap periksa koneksi jaringan Anda.',
		/*2014-09-11*/
		pcCleanerLabel:"PC Cleaner",
		scanOver:"Berhasil memindai! Berkas sampah {0} dan Berkas Registri {1} bisa dibersihkan.",
		cleanBtn:"Bersihkan",
		lessBrowser:"Sampah Internet",
		lessHistory:"Residual",
		lessCommonUes:'Sampah Software',
		lessSystem:'Sampah Sistem',
		lessDelete:"Recycling Bin",
		lessUsuse:"Sampah Registry",
		selectedLess:"dipilih",
		conScan:"Pindai lagi",
		cleanText:"Membantu membersikan sampah dari internet, sistem, software, dan lainnya!",
		
		cleanFinish:"Berhasil dibersihkan!",
		someFile:"Beberapa file dan entri resgister akan dihapus setelah Anda menghidupkan ulang komputer.",
		cleanOver:"{0} berkas sampah dan {1} berkas registry sudah dibersihkan!",
		wifiConNot:"Fungsi ini tidak tersedia dengan Wi-Fi.",
		/*2014-11-03*/
		cleanFinished:"Selesai",
		/*2014-11-03 wifi hotpot*/
		deviceConnectingList:"Terhubung ke {0}",
		startingWifiTitle:"Memulai Wi-Fi gratis...",
		hasNoWIfiTitle:"PC anda tidak mempunyai Wi-Fi.",
		iHaveWifi:"Saya mempunyai Wi-Fi.",
		wifiNameLabel:"Nama Wi-Fi: ",
		wifiPasswordLabel:"Password Wi-Fi: ",
		speedLabel:"Kecepatan",
		devicesConnectedTitle:"{0} perangkat terhubung.",
		closeWifiLabel:"Tutup Wi-Fi",
		deviceBlackList:"Blacklist",
		deviceBlackList2:"Blacklist {0}",
		moveOutBlackList:"Hapus",
		downloadSpeedLabel:"Download Speed",
		uploadSpeedLabel:"Upload Speed",
		limitSpeedLabel:"Limit Speed",
		pleaseWriteNum:"Tolong masukkan 1-12 huruf, angka atau garis bawah.",
		moboWifi:"Mobogenie Wi-Fi",
		setBlackValidateNextTime:"Blacklist akan berlaku hanya setelah Anda me-restart free Wi-Fi.",
		//2014-11-12
		pleaseWriteDeviceNameValid:"Tolong masukkan 1-12 karakter.",
		
		//2014-11-14
		haveNoWifiAdapter:"Tidak ada USB Wi-Fi Adapter Terdeteksi",
		solutionLabel:"Solusi",
		solutionPluginTitle:"Pasang Wi-Fi Adapter untuk mengaktifkan layanan Wi-Fi.",
		solutionSwitchLaptop:"Beralih ke laptop."
    };
    return dictionary;
});