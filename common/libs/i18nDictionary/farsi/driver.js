define('farsi:driver', function(require, exports, module){
    var dictionary = {
		badNetworkTitle:'اتصال شبکه خراب است. لطفاً شبکه خود را بررسی کنید.',
		pictureGuide: 'راهنمای تصویر',
		videoGuide: 'راهنمای ویدیو',
		myVersion: 'نسخه Android من',
		debugFootText: 'هنوز نمی‌توانید اشکال‌زدایی USB را باز کنید؟',
		oneClickSet: 'تنظیم با یک کلیک',
		tryConnectText: 'دستگاه را از برق بکشید و دوباره متصل کنید یا دستگاه را خاموش و روشن کنید.',
		butBack: 'به عقب',
		ContactSupport: 'پشتیبانی مخاطب',
		allowDebugText: 'وقتی از شما سؤال شد که به اشکال‌زدایی USB اجازه می‌دهید یا خیر، "تأیید" را فشار دهید.',
		allowDebugTip: "<i>۱</i> این گزینه را علامت بزنید",
		allowDebugOkTip: "<i>۲</i> روی <b>[تأیید]</b> ضربه بزنید",/*������50���ַ�*/
		butRetry: 'این پنجره را نمی‌بینید؟',
		butShowAgain: 'نمایش مجدد',
		stillNoSolove: 'هنوز کار نمی‌کند؟',
        debugTipText: 'لطفاً {0} (۱۲ کیلوبایت) را در دستگاهتان دانلود کنید',
        debugSetterContentText: ' [اشکال‌زدایی USB]',
		orText: 'یا',
		noSpaceHint: 'فضای ذخیره کافی در دستگاهتان وجود ندارد.',
		noSpaceText: 'Mobogenie به حداقل {0} فضای دیسک نیاز دارد.',
		needSpaceText: '۱۰ MB',
		upSpaceText: 'لطفاً چند برنامه را حذف کنید تا فضا باز شود.',
		butHaveSpace: 'فضای کافی دارم',
		connectFailedTitle:'اوه. اتصال ناموفق بود.',
		connectFailedTryText: 'اتصال دستگاه را قطع و دوباره وصل کنید.',
		connectFailedRestart: 'Mobogenie را راه‌اندازی مجدد کنید.',
		RestartDevice: 'رایانه و دستگاه را راه‌اندازی مجدد کنید.',
		connectFailedText: 'اگر باز هم مشکل داشتید، سؤالات متداول ما را مطالعه کرده و مشکل خود را با ما در میان بگذارید.',
		
		connectionGuide:'راهنمای اتصال',
		driverUsbTitle: 'لطفاً دستگاهتان را با کابل USB وصل کنید.',
		driverUsbText: 'پس از اتصال دستگاه، می‌توانید بازی‌ها، برنامه‌ها و موارد دیگر را به صورت رایگان دانلود کرده و دستگاهتان را مدیریت کنید.',
		
		AndroidLowDebugStep1: '<i>۱</i> روی <b>[کشوی برنامه‌ها]</b> ضربه بزنید',
		AndroidLowDebugStep2: '<i>۲</i> روی <b>[تنظیمات]</b> ضربه بزنید',
		AndroidLowDebugStep3: '<i>۳</i> روی <b>[برنامه‌ها]</b> ضربه بزنید',
		AndroidLowDebugStep4: '<i>۴</i> روی <b>[توسعه]</b> ضربه بزنید',
		AndroidLowDebugStep5: '<i>۵</i> <b>[اشکال‌زدایی USB]</b> را علامت بزنید',
		AndroidLowDebugStep6: '<i>۶</i> روی <b>[تأیید]</b> ضربه بزنید',
		AndroidHighDebugStep3: '<i>۳</i> روی <b>[گزینه‌های برنامه‌نویس]</b> ضربه بزنید',
		AndroidHigherDebugStep3: '<i>۳</i> روی <b>[درباره تلفن]</b> ضربه بزنید',
		AndroidHigherDebugStep4: '<i>۴</i> چند بار روی <b>[شماره ساخت]</b> ضربه بزنید',
		AndroidHigherDebugStep5: '<i>۵</i> حالت برنامه‌نویس فعال می‌شود',
		AndroidHigherDebugStep6: '<i>۶</i> برگردید و روی <b>[گزینه‌های برنامه‌نویس]</b> ضربه بزنید',
		AndroidHigherDebugStep9: '<i>۹</i> <b>[همیشه از این رایانه اجازه داده شود]</b> را علامت بزنید',
		
		SamsungHighDebugStep4: '<i>۴</i> <b>[گزینه‌های برنامه‌نویس]</b> را علامت بزنید',
		SamsungHigherDebugStep3: '<i>۳</i> روی <b>[بیشتر]</b> ضربه بزنید',
		SamsungHigherDebugStep4: '<i>۴</i> روی <b>[درباره دستگاه]</b> ضربه بزنید',
		
		driver1 :'<i>۳</i> روی <b>[درباره]</b> ضربه بزنید',
		driver2 :'<i>۴</i> روی <b>[اطلاعات نرم‌افزار]</b> ضربه بزنید',
		driver3 :'<i>۸</i> <b>[به عقب] </b> بروید و روی <b>[گزینه‌های برنامه‌نویس]</b> ضربه بزنید',
		driver4 :'<i>۹</i> <b>[دوباره سؤال نشود]</b> را علامت بزنید',
		driver5 :'<i>۲</i> روی <b>[عمومی]</b> ضربه بزنید',
		driver6 :'<i>۱۰</i> روی <b>[بله]</b> ضربه بزنید',
		/*2014-6-12*/
		driver7:' <b>[دوباره نشان داده نشود]</b> را علامت بزنید',
		
		/*2014-7-3*/
		usbDebugServiceText:"برای پشتیبانی می‌توانید با خدمات مشتریان محلی ما تماس بگیرید",
		usbDebugCustomer:"خدمات مشتریان",
		usbDebugTitle: 'برای مدیریت تلفن خود، اشکال‌زدایی USB را باز کنید',
		
		/*2014wifi*/
		driverUsbConnect: 'اتصال USB',
		driverWifiConnect: 'اتصال Wi-Fi',
		deviceBeen:"{0} دستگاه شناسایی شد. لطفاً متصل شوید.",
		connectAnother:"دستگاه دیگری وصل کنید",
		pleaseDownMg:"لطفاً <b>Mobogenie Helper</b> ‏ را در دستگاهتان دانلود کنید.",
		alreadyHava:"من Mobogenie Helper را دارم",
		enterPass:"٢.کد تأیید را وارد کنید.",
		howtofind:"چگونه کد تأیید را بیابم؟",
		pleasePhoneOk:"لطفاً درخواست اتصال را در دستگاهتان بپذیرید!",
		conncetionFailed:"اتصال ناموفق بود. لطفاً موارد زیر را بررسی کنید: ",
		phoneWifiOpen:"لطفاً بررسی کنید Wi-Fi روشن باشد و دستگاه و رایانه هر دو به یک LAN متصل باشند.",
		passwordOk:"آیا کد تأیید صحیح است؟",
		connectnix:"اتصال ناموفق بود. دستگاه درخواست اتصال با رایانه شما را رد کرد!",
		
		contingDevice:"در حال اتصال دستگاه...",
		updatingHelp:"در حال به‌روزرسانی Mobogenie Helper...",
		updateFailed:"به‌روزرسانی Mobogenie ناموفق بود!",
		alreadyCon:"من کابل USB را متصل کردم.",
		connectBtnText:"اتصال",
		wifiScreen:"دسترسی به عکس‌های صفحه تلفن از طریق Wi-Fi ممکن نیست.",
        
        //2014-10-14
		connectNoticeTitle: 'لطفا دستگاهتان را متصل کنید.',
		helpisOpen:"آیا Mobogenie Helper در تلفن شما اجرا می‌شود؟",
		//2014-10-20
		pleaseClick:"پس از نصب، Mobogenie Helper را باز کرده و دکمه زیر اتصال مجدد را کلیک کنید.",
		reConnectBtn:"اتصال مجدد",
		pleaseInstall:"Mobogenie Helper به ‌روز ارسال شد. لطفا آن را از دستگاه Android خود نصب کنید.",
		scanBlow:"کد QR زیر را اسکن کنید",
		downloadUsing:"با استفاده از آدرس اینترنتی زیر دانلود را در دستگاه Android خود انجام دهید",
		openHelpDevice:"۱. Mobogenie Helper را در دستگاه Android خود باز کنید.",
		/*2014-11-07修改*/
		connectFailedText:"از طریق Wi-Fi متصل شوید.",
		waitLong:"خیلی طول کشیده است؟ با ما در میان بگذارید!",
		alreadyHava:"من Mobogenie Helper را در تلفنم دارم. بعدی!",
		noHavaMobo:"من Mobogenie Helper را در تلفنم ندارم. برمی‌گردم!",
		tryConnectWifi:"Try connecting via Wi-Fi",
		/*2014-11-14增加*/
		driverWifiConnect:"اتصال بی‌سیم",
		havaOpenUsb:"من عملکرد USB را فعال کرده‌ام.",
		usbConnectFailed:"خطای اتصال USB",
		checkPhoneFailed: "یک برنامه تلفن شما را از اتصال به رایانه‌تان بازمی‌دارد. لطفاً آن را ببندید و دوباره امتحان کنید.",
		closeReConnect: "این برنامه را ببندید و مجدداً به {0} متصل شوید."
    };
    return dictionary;
});
