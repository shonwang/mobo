define('farsi:setting', function(require, exports, module){
    var dictionary = {
    	aboutMe:'درباره Mobogenie',
		aboutMeVersion:'نسخه: {0}',
		MGWebsite:'وب‌سایت:',
		MGForums:'تالارهای گفتمان:',
		aboutMeLinkPolicy: 'سیاست حفظ حریم خصوصی',
		aboutMeLinkEULA: 'EULA',
		aboutMeLinkTOS: 'شرایط سرویس',
		aboutMeFootText: '©2014 Mobogenie.com. کلیه حقوق محفوظ است',
		feedback:'بازخورد',
        fbEmailFormatFailed: 'ایمیل نامعتبر',
        BtnSubmit: 'ارائه',
        fbSuccessTitle: 'از بازخورد شما متشکریم.',/*不超过45个字符*/
        fbSuccessText: 'کارکنان خدمات مشتری ما در زمان ممکن با شما تماس می‌گیرند، صندوق دریافت خود را بررسی کنید.',/*不超过150个字符*/
        
        
        setting: 'تنظیمات',
        checkForUpdates: 'بررسی موارد به‌روز',
        whatNew: 'خبر جدید چیست؟',
        ContactUs: 'تماس با ما',
        
		generalLabel: 'عمومی',
		LocationsLabel: 'مکان‌ها',
		AppllicationsLabel: 'برنامه‌ها',
		remindersLabel: 'یادآورها',
		Language: 'زبان',
		generalStartupTitle: 'هنگام شروع',
		generalStartupText:'کارهای ناتمام به طور خودکار ادامه یابد',
		generalConnetTitle: 'با اتصال دستگاه',
		generalConnetText: 'Mobogenie همیشه باز شود',
		generalConnetTextTwo: ' نصب خودکار برنامه‌های دانلود شده',
		generalCloseTitle: 'هنگام بستن',
		generalCloseText: ' کوچک کردن و بردن به نوار ابزار',
		generalCloseTextTwo: 'خروج سرویس گیرنده',
		generalCloseTextThree: 'هر بار به من یادآوری شود',
		generalUpdateTitle: 'به‌روزرسانی سرویس گیرنده',
		generalUpdateText: 'به‌روزرسانی خودکار سرویس گیرنده به جدیدترین نسخه',
		locationsResource: 'دانلودهای منابع',
		locationsBackup: 'مکان پشتیبان‌گیری',
		locationsScreen: 'مکان عکس از صفحه',
		locationsBtn: 'مرور...',
		appllicationsFileTitle: 'هم‌خوانی فایل',
		appllicationsFileText: 'بررسی کنید که فایل‌های ‎.apk با Mobogenie هم‌خوانی داشته باشند',
        appllicationsLatestTitle: 'به‌روزرسانی خودکار جدیدترین برنامه‌ها',
		appllicationsLatestText: 'جدیدترین برنامه‌های قابل به‌روزرسانی به طور خودکار دانلود شود',
		appllicationsDefaultTitle: 'مکان نصب پیش‌فرض',
		appllicationsDefaultText: ' خودکار (اگر روی کارت حافظه نصب نشود، در دستگاه نصب خواهد شد.)',
		appllicationsDefaultTextTwo: 'حافظه دستگاه',
		appllicationsDefaultTextThree: 'کارت حافظه خارجی (فقط از Android 2.2 و بالاتر پشتیبانی می‌کند.)',
		remindersUpdateTitle: 'نسخه‌های به‌روز برنامه',
		remindersUpdateText:'زمان به‌روزرسانی برنامه‌ها، هر {0} روز یادآوری شود',
		remindersBackupText:'زمان پشتیبان‌گیری دستگاهم، هر {0} روز یادآوری شود',
		remindersUpdateTextTwo: 'اصلا یادآوری نشود',
		remindersBackupTitle: 'پشتیبان‌گیری',
		remindersPopularTitle: 'فعالیت‌های پرطرفدار',
		remindersPopularText: 'در دسترس بودن فروش ویژه یا فعالیت‌های پرطرفدار به من یادآوری شود',
		/*5-24*/
		swicthSiteLabel:'سایت',
		/*5-26*/
		settingTip:"منو",
		/*7-21*/
		fbModelName: 'مدل دستگاه',
		fbOsVersion: 'نسخه Android',
		/*7.22*/
		fbType9:"سایر موارد",
		/*2014-9-9*/
		/*2014-9-9*/
		upload:"آپلود",
		/*2014-9-11 新版反馈文案*/
		pleaseGory:"گروه مشکل:",
		pleaseChoose:"لطفاً یک گروه انتخاب کنید.",
		openUSB:"در حال باز کردن اشکال‌زدایی USB.",
		pleaseSele:"لطفاً انتخاب کنید...",
		whatUsb:"اشکال‌زدایی USB چیست؟",
		havaActive:"آیا اشکال‌زدایی USB را فعال کرده‌اید؟",
		phoneModel:"مدل تلفن:",
		pleaseEnter:"لطفاً مدل تلفن خود را وارد کنید.",
		modelOf:"مدل تلفن مشکل دار",
		email: "ایمیل:",
		enterEmail:"لطفاً آدرس ایمیل را وارد کنید.",
		enterValid:"برای ارائه سرویس بهتر، یک آدرس ایمیل معتبر وارد کنید.",
		andVer:"نسخه Android:",
		pleaseVer:"لطفاً یک نسخه Android انتخاب کنید.",
		corSystem:"نسخه سیستم صحیح به ما کمک می‌کند با دقت مشکل شما را شناسایی کنیم.",
		socialAcc:"حساب اجتماعی:",
		selectMethod:"روشی انتخاب کنید که بتوانیم با شما تماس بگیریم",
		description:"شرح:",
		addAttach: "افزودن پیوست",
		noFiles:"فایلی وجود ندارد",
		onlySupports:"فقط از فایل‌های کوچکتر از ۳ مگابایت پشتیبانی می‌شود.",
		whyNeed:"چرا باید عملکرد اشکال‌زدایی USB را فعال کنم؟",
		debugRequired:"در سیستم Android برای اتصال کامل به رایانه، اشکال‌زدایی USB مورد نیاز است. فعال‌سازی اشکال‌زدایی USB به تلفن یا تبلت شما کمک می‌کند سریع‌تر به Mobogenie متصل شود.",
		openfun:"چگونه می‌توانم عملکرد اشکال‌زدایی USB را باز کنم؟",
		andLower:"Android 3.2 یا کمتر",
		selectSet:"در فهرست برنامه‌ها برای ورود به منوی سیستم، [تنظیمات] را انتخاب کنید.",
		selectApp: "[برنامه‌ها] را انتخاب کنید.",
		
		selectDeve:"[توسعه] را انتخاب کنید.",
		selectTap:"[اشکال‌زدایی USB] را انتخاب کرده و روی تأیید ضربه بزنید.",
		andFour: "Android 4.0 و 4.1",
		selectOpt:"[گزینه‌های برنامه‌نویس] را انتخاب کنید.",
		openOpt:"[گزینه‌های برنامه‌نویس] را در بالا باز کنید.",
		checkTap:"[اشکال‌زدایی USB] را علامت زده و روی تأیید ضربه بزنید.",
		androidFour:"Android 4.2",
		tapIcon:"روی نماد [تنظیمات] ضربه بزنید.",
		tapPhone:"روی [درباره تلفن] ضربه بزنید.",
		scrollBot: "به پایین صفحه بروید، [شماره ساخت] را بیابید و چند بار روی آن ضربه بزنید.",
		
		keepTap:"به ضربه زدن ادامه دهید تا وقتی پیام \"شما اکنون یک برنامه نویس هستید!\" ظاهر شود",
		goback:"به صفحه [تنظیمات] برگردید و [گزینه‌های برنامه نویس] را مشاهده کنید!",
		enterDeve:"[گزینه‌های برنامه‌نویس] را وارد کرده و روی [اشکال‌زدایی USB] ضربه بزنید.",
		backDeve:"به [گزینه‌های برنامه‌نویس] برگردید و مطمئن شوید [اشکال‌زداییUSB] علامت زده شده باشد.",
		connectCom:"تلفنتان را به رایانه وصل کرده و Mobogenie را باز کنید. <br/>Mobogenie ‏[راهنمای Mobogenie] را در رایانه‌تان نصب می‌کند.<br/>وقتی پنجره اعلان‌های نصب باز شد،‌روی تأیید ضربه بزنید.",
		returnCon:"برگشت و ادامه",
		fbSuccessClose: 'ادامه مرور در فروشگاه{0}',
		
		unableCon:"اتصال به تلفن ممکن نیست",
		proInstall:"اشکال در منابع",
		contactsText:"مخاطبین و پیام‌های متنی",
		slowPer:"عملکرد کند",
		unableRoot:"روت کردن ممکن نیست",
		stillWhen:"وقتی دستگاهی متصل نیست،‌MG باز می‌شود",
		suggesNew:"پیشنهادات عملکردهای جدید",
		usbOn: "اشکال‌زداریی USB روشن",
		usbOff: 'اشکال‌زداریی USB خاموش',
		fbTextarea: "ما همیشه به مشکلات شما گوش می‌دهیم!",
		errorFile:"فرمت فایل اشتباه",
		/*2014-11-07*/
		unableCon:"اتصال با تلفن از طریق USB ممکن نیست.",
		unableWifiCon:"اتصال با تلفن از طریق Wi-Fi ممکن نیست.",
    };
    return dictionary;
});
