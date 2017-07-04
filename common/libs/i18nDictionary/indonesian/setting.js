define('indonesian:setting', function(require, exports, module){
    var dictionary = {
    	aboutMe:'Tentang Mobogenie',/*不超过18个字符*/
		aboutMeVersion:'Versi: {0}',/*不超过22个字符*/
		MGWebsite:'Situs web:',/*不超过35个字符*/
		MGForums:'Forum:',/*不超过35个字符*/
		aboutMeLinkPolicy: 'Kebijakan Privasi',/*不超过35个字符*/
		aboutMeLinkEULA: 'EULA',/*不超过35个字符*/
		aboutMeLinkTOS: 'Ketentuan Layanan',/*不超过35个字符*/
		aboutMeFootText: '©2014 Mobogenie.com. Semua Hak Dilindungi',/*不超过70个字符*/
		feedback:'Saran',
        fbEmailFormatFailed: 'Email tidak valid',/*不超过60个字符*/
        BtnSubmit: 'Kirim',
        fbSuccessTitle: 'Terima kasih atas saran anda.',/*不超过45个字符*/
        fbSuccessText: 'Staf layanan pelanggan kami akan menghubungi Anda secepatnya, maka pastikan Anda memeriksa kotak masuk.',/*不超过150个字符*/
        
       
        setting: 'Pengaturan',/*不超过18个字符*/
        checkForUpdates: 'Periksa Pembaruan',/*不超过18个字符*/
        whatNew: 'Apa yang baru?',/*不超过18个字符*/
        ContactUs: 'Hubungi kami',/*不超过18个字符*/
        
		generalLabel: 'Umum',/*不超过13个字符*/
		LocationsLabel: 'Lokasi',/*不超过13个字符*/
		AppllicationsLabel: 'Aplikasi',/*不超过13个字符*/
		remindersLabel: 'Pengingat',/*不超过13个字符*/
		Language: 'Bahasa',/*不超过62个字符*/
		generalStartupTitle: 'Saat Pengaktifan',/*不超过62个字符*/
		generalStartupText:'Otomatis lanjutkan tugas belum selesai',/*不超过62个字符*/
		generalConnetTitle: 'Saat Perangkat tersambung',/*不超过62个字符*/
		generalConnetText: 'Selalu buka Mobogenie',/*不超过62个字符*/
		generalConnetTextTwo: ' Otomatis instal aplikasi unduhan',/*不超过62个字符*/
		generalCloseTitle: 'Saat Penutupan',/*不超过62个字符*/
		generalCloseText: ' Perkecil klien ke laci',/*不超过62个字符*/
		generalCloseTextTwo: 'Keluarkan klien',/*不超过62个字符*/
		generalCloseTextThree: 'Ingatkan saya setiap saat',/*不超过62个字符*/
		generalUpdateTitle: 'Pembaruan Klien',/*不超过62个字符*/
		generalUpdateText: 'Pembaruan otomatis klien ke versi terbaru',/*不超过62个字符*/
		locationsResource: 'Unduhan Item',/*不超过62个字符*/
		locationsBackup: 'Lokasi Cadangan',/*不超过62个字符*/
		locationsScreen: 'Lokasi Tangkapan Layar',/*不超过62个字符*/
		locationsBtn: 'Jelajah...',/*不超过12个字符*/
		appllicationsFileTitle: 'Asosiasi File',/*不超过62个字符*/
		appllicationsFileText: 'Periksa apakah file .apk terkait dengan Mobogenie',/*不超过62个字符*/
        appllicationsLatestTitle: 'Pembaruan otomatis aplikasi terbaru',
		appllicationsLatestText: 'Unduh aplikasi dapat diperbarui terbaru otomatis',/*不超过62个字符*/
		appllicationsDefaultTitle: 'Lokasi Instal Default',/*不超过62个字符*/
		appllicationsDefaultText: ' Otomatis (Instal di perangkat jika gagal di kartu SD.)',/*不超过62个字符*/
		appllicationsDefaultTextTwo: 'Memori Perangkat',/*不超过62个字符*/
		appllicationsDefaultTextThree: 'Kartu SD Eksternal (Hanya mendukung Android 2.2 atau terbaru.)',/*不超过62个字符*/
		remindersUpdateTitle: 'Pembaruan Aplikasi',/*不超过62个字符*/
		remindersUpdateText:'Ingatkan saya untuk memperbarui aplikasi setiap {0} hari',/*不超过62个字符*/
		remindersBackupText:'Ingatkan saya untuk mencadangkan perangkat setiap {0} hari',/*不超过62个字符*/
		remindersUpdateTextTwo: 'Jangan pernah ingatkan saya',/*不超过62个字符*/
		remindersBackupTitle: 'Cadangan',/*不超过62个字符*/
		remindersPopularTitle: 'Aktivitas Populer',/*不超过62个字符*/
		remindersPopularText: 'Ingatkan saya jika aktivitas atau promosi populer tersedia',
		/*5-24*/
		swicthSiteLabel:'Situs',
		/*5-26*/
		settingTip:"Menu",
		/*7-21*/
		fbModelName: 'Model Perangkat',
		fbOsVersion: 'Versi Android',
		
		/*7.22*/
		fbType9:"Lainnya",
		/*2014-9-9*/
		upload:"Unggah",
		/*2014-9-11 新版反馈文案*/
		pleaseGory:"Kategori masalah:",
		pleaseChoose:"Silakan pilih kategori.",
		openUSB:"Buka USB Debugging:",
		pleaseSele:"Silakan pilih...",
		whatUsb:"Apa itu USB Debugging?",
		havaActive:"Apakah Anda sudah mengaktifkan USB Debugging?",
		phoneModel:"Model HP:",
		pleaseEnter:"Silakan masukkan model HP Anda.",
		modelOf:"Model HP yang bermasalah",
		email: "Email:",
		enterEmail:"Silakan masukkan email Anda.",
		enterValid:"Silakan masukkan email Anda untuk membantu meningkatkan pelayanan kami untuk Anda.",
		andVer:"Versi Android:",
		pleaseVer:"Silakan pilih versi Android.",
		corSystem:"Versi sistem yang benar akan membantu kami untuk mengidentifikasi masalah Anda secara akurat.",
		socialAcc:"Akun sosial:",
		selectMethod:"Pilih metode kami menghubungi Anda",
		description:"Deskripsi:",
		addAttach: "Tambah lampiran",
		noFiles:"Tidak ada berkas",
		onlySupports:"Hanya mendukung berkas yang lebih kecil dari 3MB.",
		whyNeed:"Mengapa saya perlu mengaktifkan USB Debugging?",
		debugRequired:"USB Debugging diperlukan untuk sistem Android agar sepenuhnya bisa terhubung ke PC Anda. Mengaktifkan USB Debugging memungkinkan ponsel atau tablet Anda untuk terhubung dengan Mobogenie lebih cepat.",
		openfun:"Bagaimana cara saya membuka fungsi USB Debugging?",
		andLower:"Android 3.2 atau lebih rendah",
		selectSet:"Pilih [Pengaturan] di daftar aplikasi untuk masuk ke sistem menu.",
		selectApp: "Pilih [Aplikasi].",
		
		selectDeve:"Pilih [Pengembangan].",
		selectTap:"Pilih [USB Debugging] dan klik OK.",
		andFour: "Android 4.0 dan 4.1",
		selectOpt:"Pilih [Opsi Pengembang].",
		openOpt:"Buka [Opsi Pengembang] di paling atas.",
		checkTap:"Cek [USB Debugging] dan klik OK.",
		androidFour:"Android 4.2",
		tapIcon:"Klik ikon [Pengaturan].",
		tapPhone:"Tap [About Phone].",
		scrollBot: "Skrol ke paling bawah, cari [Nomor Bentukan], dan klik 7x secara cepat.",
		
		keepTap:"Klik terus sampai Anda melihat pesan \"Anda adalah seorang pengembang!\"",
		goback:"Kembali ke halaman [Pengaturan] untuk melihat  [Opsi Pengembang]!",
		enterDeve:"Masuk ke [Opsi Pengembang] dan klik [USB Debugging].",
		backDeve:"Kembali ke [Opsi Pengembang] dan pastikan [USB Debugging] sudah dicentang.",
		connectCom:"Hubungkan HP Anda ke komputer dan buka Mobogenie. <br/>Mobogenie akan menginstal [Mobogenie Helper] ke komputer Anda.<br/>Klik OK ketika notifikasi instalasi muncul.",
		returnCon:"Kembali dan lanjut",
		fbSuccessClose: 'Lanjutkan mencari toko {0}',
		
		unableCon:"Tidak dapat terhubung dengan HP saya",
		proInstall:"Masalah dengan sumber",
		contactsText:"Kontak dan pesan",
		slowPer:"Performa lambat",
		unableRoot:"Tidak bisa rooting",
		stillWhen:"MG masih muncul ketika tidak ada perangkat terhubung",
		suggesNew:"Sugesti untuk fungsi baru",
		usbOn: "USB Debugging On",
		usbOff: 'USB Debugging Off',
		fbTextarea: "Kami selalu siap untuk mendengar!",
		errorFile:"format berkas yang salah",
		/*2014-11-07*/
		unableCon:"Tidak dapat terhubung ke ponsel Anda melalui USB.",
		unableWifiCon:"Tidak dapat terhubung ke ponsel Anda melalui Wi-Fi.",
    };
    return dictionary;
});