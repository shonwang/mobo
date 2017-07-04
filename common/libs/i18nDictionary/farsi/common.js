define('farsi:common', function(require, exports, module){
    var dictionary = {
        connectingText: 'در حال اتصال',
        
        homeLabel: 'صفحه اصلی',
        appLabel: 'برنامه',
        gamesLabel: 'بازی',
        ringtonesLabel: 'آهنگ زنگ',
        wallPaperLabel: 'تصویرزمینه',
        youTubeLabel: 'YouTube',
        moreLabel: 'بیشتر',
        toolsLabel: 'جعبه ابزار',
        safetyLabel: 'ایمنی',
        contactLabel: 'مخاطبین من',
        smsLabel: 'پیام‌های من',
        myAppLabel: 'برنامه من',
        myMusicLabel: 'موسیقی من',
        myPictureLabel: 'عکس‌های من',
        myVideoLabel: 'ویدیوهای من',
        Import:'وارد کردن',
        Export:'صادر کردن',
        Delete:'حذف',
        Refresh:'نوسازی',
        updateAllLabel: 'به‌روزرسانی همه',
        updateLabel: 'به‌روزرسانی',
        uninstallLabel: 'لغو نصب',
        deviceText: 'دستگاه',
        phoneText: 'تلفن',
        memoryText: 'حافظه',
        installLabel: 'نصب',
        sizeLabel: 'اندازه',
        nameLabel: 'نام',
        locationLabel: 'مکان',
        actionLabel: 'عملکرد',
        selectAllLabel: 'انتخاب همه',
        downloadAllLabel: 'دانلود همه',
        downloadingText: 'در حال دانلود',
        redownloadText: 'دانلود مجدد',
        downloadLabel: "دانلود",
        
        successText: 'موفق',
        installedInText: 'نصب شده در {0}',
        ImportingText: 'وارد کردن',
        setWallpaperFailed: 'تنظیم تصویر زمینه ناموفق بود',
        importedInText: 'وارد شده در {0}',
        
        retryText: 'سعی مجدد',
        pauseText: 'مکث',
        continueText: 'ادامه',
        inProcessingTaskText: 'در حال انجام',
        completedText: 'کامل شد',
        noTaskText: 'کاری انجام نمی‌شود',
        
        captureLabel: 'گرفتن',
        featureText: 'موارد لازم',
        countTasksText: '{0} کار',
        
        updateTipText: 'شما جدیدترین نسخه برنامه‌های {0} را دارید.',
        rootTipText: 'دستگاه همراه شما روت نشده است. با روت کردن دستگاه می‌توانید برنامه‌های مورد نظر را نصب کنید،',
        oneClickRootLabel: 'روت کردن با یک کلیک',
        shareMobogenieText: 'اشتراک‌گذاری Mobogenie در',
        
        tipLabel: 'نکته',
        confirmLabel:'تأیید',
        okLabel : 'تأیید',
        yesLabel : 'بله',
        cancelLabel:'لغو',
        closeLabel : 'بستن',
        failedLabel : 'ناموفق',
        exportSuccess:'صادر کردن موفق بود',
        
        headSignIn:'ورود به سیستم',
        connectAnother : 'دستگاه دیگری وصل کنید',
        deviceInfo: 'درباره دستگاه',
        email:'ایمیل',
        /*add 2014-03-28*/
        promptInvaildPath:'مسیر نامعتبر است.',
	   
	    connectDeviceVia:'تلفن خود را متصل کرده و برنامه‌ها، بازی‌ها، ویدیوها و انواع محتوای رایگان Android را نصب نمایید تا به دنیایی از خدمات مدیریتی دستگاه تلفن همراه وارد شوید.',
        connectNow:'اکنون متصل شوید',
		
		downloadingDriver:'در حال دانلود درایور دستگاه شما {0}',
		installingDriverText:'در حال نصب درایور دستگاه شما',
		installingMG:'در حال نصب Mobogenie در دستگاه شما',
		connectedYourDeviceText: 'متصل',
		disconnectYourDeviceText: 'قطع اتصال',

        searchResultText: 'جستجوی <span class="c-red key-sp">{0}</span>، <span class="c-red num-sp">{1}</span> نتیجه در بر داشت ',
        searchSeeAllLink: 'مشاهده همه',
        openLabel: 'باز کردن پوشه',
        
        Exporting:"صادر کردن در حال انجام است. لطفاً دستگاهتان را متصل نگهدارید.",
        Deleting:"حذف در حال انجام است.لطفاً دستگاهتان را متصل نگهدارید.",

        deviceMemoryLabel: "حافظه دستگاه",
        sdCardLabel: "کارت حافظه ۱",
        sdCardTwoLabel: "کارت حافظه ۲",
        total: "کل: ",
        available: "در دسترس: ",
        manage: "مدیریت",
        
        installedText: 'نصب شد',
        updateAppText: 'به‌روزرسانی',
        installingAppText: 'درحال نصب.',
        installText: 'نصب',
        
        /*2014-05-13*/
       searchHolderMyApp:"بازی‌ها و برنامه‌های محلی",
       searchHolderWallpaper:"تصویرزمینه",
       searchHolderRingtone:"آهنگ زنگ",
       searchHolderAppGames:"برنامه‌ها/بازی‌ها",
       noSdState:"کارت حافظه‌ای در دستگاهتان یافت نشد.",
       /*2014-5-26*/
       minTipText:"کوچک کردن",
       maxTipText:"بزرگ کردن",
       exitTipText:"خروج",
       returnTipText:"به عقب",
       retreatTipText:"انتقال",
       /*2014-5-27*/
       noLabel : 'خیر',
       menuOpenLabel:"باز کردن",
       //20140604
       bestPicksLabel: 'بهترین انتخاب',
       actionFailed:'عملیات ناموفق بود',
       /*2014-06-09*/
      searchHolderYoutube:'لغات کلیدی یا آدرس اینترنتی YouTube',
      screenshotSave:"عکس در محل زیر ذخیره شد: ",
      screenshotText:"عکس",
      screenshotCheckPathTip: "همیشه از این مسیر برای ذخیره عکس استفاده شود",
      /*2014-06-10*/
      alwaysOpenClient:'همیشه Mobogenie در زمان اتصال دستگاه باز شود؟',
      changeOpenClient:'می‌توانید این تنظیمات را هر زمان که بخواهید تغییر دهید.',
      /*2014-06-18*/
      screenBlackTipText: "لطفاً صفحه نمایش دستگاه همراهتان را روشن کنید",
      /*2014-06-30*/
     ebookLabel:"کتاب‌ها",
     myEbookLabel:"کتاب‌های من",
      /*2014-6-30修改*/
      connectDeviceText:'در حال اتصال. لطفاً دستگاهتان را متصل نگهدارید.',
      openManageDevice:"یک دستگاه شناسایی شد. Mobogenie را برای مدیریت دستگاهتان و دانلود محتوای رایگان باز کنید.",
      /*2014-07-18*/
     searchHolderEBook:"کتاب‌ها",
     /*2014-09-25*/
      rememberMarkLabel:"حفظ تنظیمات"
    };
    return dictionary;
});
