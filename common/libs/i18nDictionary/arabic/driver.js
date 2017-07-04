define('arabic:driver', function(require, exports, module){
    var dictionary = {
		badNetworkTitle:'اتصال الشبكة سيئ. يرجى التحقق من الشبكة.',
		pictureGuide: 'دليل الصور',
		videoGuide: 'دليل الفيديو',
		myVersion: 'إصدار Android الخاص بي',
		debugFootText: 'هل ما زال يتعذر فتح تصحيح USB؟',
		oneClickSet: 'الإعداد بنقرة واحدة',
		tryConnectText: 'حاول فصل الكبل وإعادة توصيله أو إعادة تشغيل الجهاز.',
		butBack: 'الخلف',
		ContactSupport: 'الاتصال بالدعم',
		allowDebugText: 'يرجى الضغط على "موافق" عند الطلب للسماح بتصحيح USB.',
		allowDebugTip: "<i>1</i>‎ حدد هذا الخيار",
		allowDebugOkTip: "<i>2</i>‎ انقر فوق <b>[موافق]</b>",/*������50���ַ�*/
		butRetry: 'هل يتعذر عليك رؤية هذا الإطار المنبثق؟',
		butShowAgain: 'الإظهار مرةً أخرى',
		stillNoSolove: 'ما زال لا يعمل؟',
        debugTipText: 'يرجى تنزيل {0} (12 كيلوبايت) إلى جهازك',
        debugSetterContentText: ' [مُصحح USB]',
		orText: 'أو',
		noSpaceHint: 'لا تتوفر مساحة تخزين كافية على الجهاز.',
		noSpaceText: 'يتطلب Mobogenie {0} على الأقل من مساحة القرص.',
		needSpaceText: '10 MB',
		upSpaceText: 'يرجى إلغاء تثبيت بعض التطبيقات لتحرير بعض المساحة.',
		butHaveSpace: 'لدي مساحة كافية',
		connectFailedTitle:'عذرًا. فشل الاتصال.',
		connectFailedTryText: 'حاول فصل اتصال الجهاز ثم توصيله من جديد.',
		connectFailedRestart: 'إعادة تشغيل Mobogenie.',
		RestartDevice: 'إعادة تشغيل الكمبيوتر والجهاز.',
		connectFailedText: 'إذا لم تنجح هذه الخطوات، يمكنك قراءة الأسئلة الشائعة أو إخبارنا بمشكلتك.',
		
		connectionGuide:'دليل الاتصال',
		driverUsbTitle: 'يرجى توصيل الجهاز عبر كبل USB.',
		driverUsbText: 'بعد توصيل الجهاز، ستتمكن من تنزيل الألعاب والتطبيقات، وغيرها المزيد مجانًا، فضلاً عن إدارة الجهاز.',
		
		AndroidLowDebugStep1: '<i>1</i>‎ اضغط على <b>[درج التطبيقات]</b>',
		AndroidLowDebugStep2: '<i>2</i>‎ اضغط على <b>[الإعدادات]</b>',
		AndroidLowDebugStep3: '<i>3</i>‎ اضغط على <b>[التطبيقات]</b>',
		AndroidLowDebugStep4: '<i>4</i>‎ اضغط  على <b>[التطوير]</b>',
		AndroidLowDebugStep5: '<i>5</i>‎ حدد <b>[تصحيح USB]</b>',
		AndroidLowDebugStep6: '<i>6</i>‎ اضغط على <b>[موافق]</b>',
		AndroidHighDebugStep3: '<i>3</i>‎ اضغط على <b>[خيارات المطور]</b>',
		AndroidHigherDebugStep3: '<i>3</i>‎ اضغط على <b>[حول الهاتف]</b>',
		AndroidHigherDebugStep4: '<i>4</i>‎ اضغط على <b>[رقم الإصدار]</b> عدة مرات',
		AndroidHigherDebugStep5: '<i>5</i>‎ سيتم تمكين وضع المطور',
		AndroidHigherDebugStep6: '<i>6</i>‎ عد إلى الوراء واضغط على <b>[خيارات المطور]</b>',
		AndroidHigherDebugStep9: '<i>9</i>‎ حدد <b>[السماح دائمًا من هذا الكمبيوتر]</b>',
		
		SamsungHighDebugStep4: '<i>4</i>‎ حدد <b>[خيارات المطور]</b>',
		SamsungHigherDebugStep3: '<i>3</i>‎ اضغط على <b>[المزيد]</b>',
		SamsungHigherDebugStep4: '<i>4</i>‎ اضغط على <b>[حول الجهاز]</b>',
		
		driver1 :'<i>3</i>‎ اضغط على <b>[حول]</b>',
		driver2 :'<i>4</i> اضغط على <b>[معلومات البرامج]</b>',
		driver3 :'<i>8</i>‎ عد <b>[إلى الخلف] </b> وانقر فوق <b>[خيارات المطور]</b>',
		driver4 :'<i>9</i>‎ حدد <b>[لا تسألني مجددًا]</b>',
		driver5 :'<i>2</i>‎ اضغط على <b>[عام]</b>',
		driver6 :'<i>10</i>‎ اضغط على <b>[نعم]</b>',
		/*2014-6-12*/
		driver7:' حدد <b>[لا تظهر هذا مجددًا]</b>',
		
		/*2014-7-3*/
		usbDebugServiceText:"يمكنك أيضًا الاتصال بخدمة العملاء المحلية للحصول على الدعم",
		usbDebugCustomer:"خدمة العملاء",
		usbDebugTitle: 'يرجى فتح وضع "تصحيح أخطاء USB" لإدارة هاتفك',
		
		/*2014wifi*/
		driverUsbConnect: 'اتصال USB',
		deviceBeen:"قد كشف جهاز{0}، قم بتوصيل",
		connectAnother:"توصيل بأجهزة أخرى",
		pleaseDownMg:"يرجى تحميل <b> مساعدMobogenie</b> إلى جهازك",
		alreadyHava:"قد أثبت مساعد Mobogenie",
		enterPass:"2.إدخال رمز التحقق",
		howtofind:"كيف أيجاد رمز التحقق؟",
		pleasePhoneOk:"يرجى قبول طلب اتصال جهاز الكمبيوتر على الهاتف!",
		conncetionFailed:"فشل في الاتصال، الرجاء التحقق من العناصر التالية:",
		phoneWifiOpen:"هل تشغيل خدمة الواي فاي للهاتف أولا؟ هل هو مع الكمبيوتر على نفس الشبكة المحلية ؟",
		passwordOk:"هل رمز التحقق صحيح أولا؟",
		connectnix:"فشل في الاتصال، رفض الهاتف طلبا من اتصال جهاز الكمبيوتر الخاص بك!",
		
		contingDevice:"  توصيل جهازك...",
		updatingHelp:" ...Mobogenie مساعد تحديث ",
		updateFailed:" Mobogenie فشل في تحديث ",
		alreadyCon:"لقد تم توصيل كبل USB",
		connectBtnText:"توصيل",
		wifiScreen:"غير قادر على الحصول على قطة الهاتف مع اتصال واي فاي",
		
		//2014-10-14
		connectNoticeTitle: 'يرجى توصيل جهازك',
		helpisOpen:"هل يتم تشغيل مساعد Mobogenie على الهاتف أولا",
		//2014-10-20
		pleaseClick:" يرجى إعادة فتح مساعد Mobogenie على الهاتف بعد اكتمال التثبيت، وانقر الزر أدناه لإعادة توصيل الجهاز.",
		reConnectBtn:"إعادة توصيل",
		pleaseInstall:"تم إرسال حزمة الترقية إلى جهازك، يرجى استكمال تثبيت إصدار جديد لمساعد Mobogenie على جهازك.",
		scanBlow:"تحقيق التحميل عن طريق المسح الضوئي للكود الثنائي الأبعاد",
		downloadUsing:"إدخال الموقع التالية لتحميل على متصفح النقال",
		openHelpDevice:"1.فتح مساعد Mobogenie على جهازك.",
		/*2014-11-07修改*/
		
		connectFailedText:" اتصال عبر Wi-Fi.",
		waitLong:" أخذ وقتا طويلا؟قل لنا!",
		alreadyHava:" لدي مساعد Mobogenie على هاتفي. التالي!",
		noHavaMobo:" ليس لدي مساعد Mobogenie على هاتفي. يأخذني مرة أخرى!",
		tryConnectWifi:"Try connecting via Wi-Fi",
		/*2014-11-14增加*/
		driverWifiConnect: ' اتصال لاسلكي ',
		havaOpenUsb:"لقد تنشيط وظيفة USB.",
		usbConnectFailed:" خطأ في اتصال USB ",
		checkPhoneFailed: " برنامج يمنع هاتفك من الاتصال إلى جهاز الكمبيوتر الخاص بك. يرجى إغلاقه وإعادة المحاولة.",
		closeReConnect: " إغلاق هذا البرنامج وإعادة الاتصال ب {0}."
    };
    return dictionary;
});
