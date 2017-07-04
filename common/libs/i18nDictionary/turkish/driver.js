define('turkish:driver', function(require, exports, module){
    var dictionary = {
		badNetworkTitle:'Kötü ağ bağlantısı. Lütfen ağınızı kontrol edin.',
		pictureGuide: 'Resim Kılavuzu',
		videoGuide: 'Video Kılavuzu',
		myVersion: 'Android Versiyonum:',
		debugFootText: 'Hala USB Ayıklamayı açamıyor musunuz?', 
		oneClickSet: 'Tek Tık Ayarı',
		tryConnectText: 'Kabloyu çıkartıp yeniden takmayı deneyin ya da cihazını yeniden başlatın.',
		butBack: 'Geri',
		ContactSupport: 'İletişim Desteği',
		allowDebugText: 'Sorulduğu zaman USB hata ayıklamaya izin vermek için lütfen "OK"e basın.',
		allowDebugTip: "<i>1</i> Bu seçeneği kontrol edin",
		allowDebugOkTip: "<i>2</i> Dokun <b>[OK]</b>",/*������50���ַ�*/
		butRetry: 'Bu açılır pencereyi göremiyor musun?', 
		butShowAgain: 'Tekrar Göster',
		stillNoSolove: 'Hala çalışmıyor mu?',
        debugTipText: 'Lütfen cihazınıza {0} (12KB) indirin',
        debugSetterContentText: ' [USB Hata ayıklayıcısı]',
		orText: 'yada',
		noSpaceHint: 'Cihazınızda yeterince depolama alanı yok.',
		noSpaceText: 'Mobogenie en az {0} disk alanına ihtiyac duyar.',
		needSpaceText: '10 MB',
		upSpaceText: 'Lütfen bazı uygulamaları silerek boş alan yaratın.',
		butHaveSpace: 'Yeterince Alanım Var',
		connectFailedTitle:'Hay aksi. Bağlantı koptu.',
		connectFailedTryText: 'Cihazınızın bağlantısını koparıp yeniden bağlamayı deneyin.',
		connectFailedRestart: 'Mobogenie yi yeniden başlatın.',
		RestartDevice: 'Bilgisayarınızı ve cihazınızı yeniden başlatın.',
		connectFailedText: 'Eğer bunlar çalışmazsa, bizim  SSS imizi okuyabilir ya da bize sorununuzdan bahsedebilirsiniz.',
		
		connectionGuide:'Bağlantı Kılavuzu',
		driverUsbTitle: 'Lütfen cihazını USB kablosu aracılığıyla bağlayınız.',
		driverUsbText: 'Cihazınızı bağladıktan sonra onu yönetmenin yanı sıra oyunlar,uygulamalar ve çok daha fazlasını ücretsiz olarak indirebileceksiniz.',
		
		AndroidLowDebugStep1: '<i>1</i> Dokun <b>[Uygulama Çekmecesi]</b>',
		AndroidLowDebugStep2: '<i>2</i> Dokun <b>[Ayarlar]</b>',
		AndroidLowDebugStep3: '<i>3</i> Dokun <b>[Uygulamalar]</b>',
		AndroidLowDebugStep4: '<i>4</i> Dokun <b>[Gelişme]</b>',
		AndroidLowDebugStep5: '<i>5</i> Kontrol <b>[USB hata ayıklama]</b>',
		AndroidLowDebugStep6: '<i>6</i> Dokun <b>[OK]</b>',
		AndroidHighDebugStep3: '<i>3</i> Dokun <b>[Geliştirici seçenekleri]</b>',
		AndroidHigherDebugStep3: '<i>3</i> Dokun <b>[Telefon Hakkında]</b>',
		AndroidHigherDebugStep4: '<i>4</i> Dokun <b>[Yapı numarası]</b> birkaç kere',
		AndroidHigherDebugStep5: '<i>5</i> Geliştirici modu etkinleştirilecek',
		AndroidHigherDebugStep6: '<i>6</i> Geri dönün ve dokunun <b>[Geliştirici seçenekleri]</b>',
		AndroidHigherDebugStep9: '<i>9</i> Kontrol <b>[Bu bilgisayara her zaman izin ver]</b>',
		
		SamsungHighDebugStep4: '<i>4</i> Kontrol <b>[Geliştirici seçenekleri]</b>',
		SamsungHigherDebugStep3: '<i>3</i> Dokun <b>[Daha fazlası]</b>',
		SamsungHigherDebugStep4: '<i>4</i> Dokun <b>[Cihaz hakkında]</b>',
		
		driver1 :'<i>3</i> Dokun <b>[Hakkında]</b>',
		driver2 :'<i>4</i> Dokun <b>[Yazılım bilgisi]</b>',
		driver3 :'<i>8</i> Git <b>[Geri] </b> ve dokun <b>[Geliştirici seçenekleri]</b>',
		driver4 :'<i>9</i> Kontrol <b>[Bunu bir daha sorma]</b>',
		driver5 :'<i>2</i> Dokun <b>[Genel]</b>',
		driver6 :'<i>10</i> Dokun <b>[Evet]</b>',
		/*2014-6-12*/
		driver7:' Kontrol <b>[Bunu bir daha gösterme]</b>',
		
		/*2014-7-3*/
		usbDebugServiceText:"Ayrıca destek almak için yerel müşteri hizmetlerimizi arayabilirsiniz",
		usbDebugCustomer:"Müşteri Hizmetleri",
		usbDebugTitle: 'Telefonunuzu yönetmek için lütfen USB hata ayıklamayı açın',
		
		/*2014wifi*/
		driverUsbConnect: 'USB Bağlantısı',
		driverWifiConnect: 'Wi-Fi Bağlantısı',
		deviceBeen:"{0} cihazlar tespit edildi. Lütfen Bağlayın",
		connectAnother:"Başka Bir Cihaz Bağlayın",
		pleaseDownMg:"Lütfen Cihazınıza <b>Mobogenie Danışmanını</b> İndirin",
		alreadyHava:"Hali Hazırda Mobogenie Danışmanına Sahibim",
		enterPass:"2.Doğrulama Kodunu Girin",
		howtofind:"Doğrulama Kodunu Nasıl Bulurum?",
		pleasePhoneOk:"Lütfen Cihazınızdan Bağlantı İsteğini Kabul Ediniz",
		conncetionFailed:"Bağlantı Kurulamadı.Lütfen Takip Eden Öğeleri  Kontrol Ediniz",
		phoneWifiOpen:"Lütfen Wi-Fi'ın açık olup olmadığını ve cihazınızın aynı yerel ağa bağlı olup olmadığını kontrol ediniz",
		passwordOk:"Doğrulama kodu doğru mu?",
		connectnix:"Bağlantı kurulamadı.Cihaz PC bağlantı isteğinizi reddetti.",
		
		contingDevice:"Cihazınız bağlanıyor...",
		updatingHelp:"Mobogenie Danışmanı Güncelleniyor...",
		updateFailed:"Mobogenie güncellenemedi!",
		alreadyCon:"USB kablomu bağladım",
		connectBtnText:"Bağlan",
		wifiScreen:"Wi-Fi ile telefon ekran resimlerine erişilemiyor.",
		
		//2014-10-14
		connectNoticeTitle: 'Lütfen cihazınıza bağlanınız.',
		helpisOpen:"Telefonunuzu Mobogenie Danışmanı mı yönetiyor?",
		//2014-10-20
		pleaseClick:"Kurulumdan sonra, Mobogenie Danışmanı'nı açın ve yeniden bağlanmak için aşağıdaki düğmeye tıklayın.",
		reConnectBtn:"Yeniden Bağlan",
		pleaseInstall:"Güncellenmiş Mobogenie Danışmanı gönderildi. Lütfen Android cihazınıza kurunuz.",
		scanBlow:"Aşağıdaki QR kodunu taratın",
		downloadUsing:"Aşağıdaki URL'i kullanarak Android cihazınıza indiriniz",
		openHelpDevice:"1. Android cihazınıza Mobogenie Danışmanı'nı açınız.",
		
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