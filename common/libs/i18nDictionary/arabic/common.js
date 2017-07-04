define('arabic:common', function(require, exports, module){
    var dictionary = {
        connectingText: 'الاتصال',
        
        homeLabel: 'الصفحة الرئيسية',
        appLabel: 'التطبيقات',
        gamesLabel: 'الألعاب',
        ringtonesLabel: 'موسيقى',
        wallPaperLabel: 'خلفيات الشاشة',
        youTubeLabel: 'YouTube',
        moreLabel: 'المزيد',
        toolsLabel: 'مجموعة الأدوات',
        safetyLabel: 'الأمان',
        contactLabel: 'جهات اتصالي',
        smsLabel: 'رسائلي',
        myAppLabel: 'تطبيقاتي',
        myMusicLabel: 'موسيقاي',
        myPictureLabel: 'صوري',
        myVideoLabel: 'الفيديوهات الخاصة بي',
        Import:'الاستيراد',
        Export:'التصدير',
        Delete:'حذف',
        Refresh:'التحديث',
        updateAllLabel: 'تحديث الكل',
        updateLabel: 'تحديث',
        uninstallLabel: 'إلغاء التثبيت',
        deviceText: 'الجهاز',
        phoneText: 'الهاتف',
        memoryText: 'الذاكرة',
        installLabel: 'تثبيت',
        sizeLabel: 'الحجم',
        nameLabel: 'الاسم',
        locationLabel: 'الموقع',
        actionLabel: 'الإجراء',
        selectAllLabel: 'تحديد الكل',
        downloadAllLabel: 'تنزيل الكل',
        downloadingText: 'يتم الآن التنزيل',
        redownloadText: 'إعادة التنزيل',
        downloadLabel: "تنزيل",
        
        successText: 'نجاح',
        installedInText: 'تم التثبيت في {0}',
        ImportingText: 'الاستيراد',
        setWallpaperFailed: 'فشل تعيين خلفية الشاشة',
        importedInText: 'تم الاستيراد في {0}',
        
        retryText: 'إعادة المحاولة',
        pauseText: 'إيقاف مؤقت',
        continueText: 'المتابعة',
        inProcessingTaskText: 'مهمة مستمرة',
        completedText: 'مكتمل',
        noTaskText: 'لا مهمة مستمرة',
        
        captureLabel: 'التقاط',
        featureText: 'اللوازم',
        countTasksText: '{0} من المهمات',
        
        updateTipText: 'لديك بالفعل أحدث إصدار لـ {0} من التطبيقات.',
        rootTipText: 'لم يتم تحديد جذر جهازك المحمول. سيسمح لك تحديد جذره بتثبيت أي تطبيق تريد،',
        oneClickRootLabel: 'تحديد الجذر بنقرة واحدة',
        shareMobogenieText: 'شارك Mobogenie على',
        
        tipLabel: 'تلميح',
        confirmLabel:'تأكيد',
        okLabel : 'موافق',
        yesLabel : 'نعم',
        cancelLabel:'إلغاء الأمر',
        closeLabel : 'إغلاق',
        failedLabel : 'فشل',
        exportSuccess:'نجاح التصدير',
        
        headSignIn:'تسجيل الدخول',
        connectAnother : 'توصيل جهاز آخر',
        deviceInfo: 'حول الجهاز',
        email:'البريد الإلكتروني',
        /*add 2014-03-28*/
        promptInvaildPath:'مسار غير صالح.',
	   
	    connectDeviceVia:'يكفي أن تقوم بتوصيل هاتفك لتثبيت التطبيقات والألعاب ومقاطع الفيديو وكل أنواع محتوى Android المجاني، لتفتح الباب أمام خدمة ثورية في عالم إدارة الأجهزة المحمولة.',
        connectNow:'الاتصال الآن',
		
		downloadingDriver:'تحميل برنامج التشغيل لجهازك {0}',
		installingDriverText:'تثبيت برنامج التشغيل لجهازك',
		installingMG:'تثبيت Mobogenie في الجهاز',
		connectedYourDeviceText: 'متصل',
		disconnectYourDeviceText: 'قطع الاتصال',

        searchResultText: 'البحث عن <span class="c-red key-sp">{0}</span>، تم العثور على <span class="c-red num-sp">{1}</span> من النتائج ',
        searchSeeAllLink: 'عرض الكل',
        openLabel: 'فتح المجلد',
        
        Exporting:"التصدير قيد التقدم. يرجى إبقاء الجهاز متصلاً.",
        Deleting:"يتم الحذف الآن  . يرجى إبقاء الجهاز متصلاً.",

        deviceMemoryLabel: "ذاكرة الجهاز",
        sdCardLabel: "بطاقة SD 1",
        sdCardTwoLabel: "بطاقة SD 2",
        total: "إجمالي المساحة: ",
        available: "المساحة المتوفرة: ",
        manage: "إدارة",
        
        installedText: 'تم التثبيت',
        updateAppText: 'تحديث',
        installingAppText: 'التثبيت',
        installText: 'تثبيت',
        
        /*2014-05-13*/
       searchHolderMyApp:"التطبيقات والألعاب المحلية",
       searchHolderWallpaper:"خلفيات الشاشة",
       searchHolderRingtone:"نغمات الرنين",
       searchHolderAppGames:"التطبيقات/والألعاب",
       noSdState:"لم يتم العثور على بطاقة SD في الجهاز.",
       /*2014-5-26*/
       minTipText:"تصغير",
       maxTipText:"تكبير",
       exitTipText:"خروج",
       returnTipText:"الخلف",
       retreatTipText:"إعادة التوجيه",
       /*2014-5-27*/
       noLabel : 'لا',
       menuOpenLabel:"فتح",
       //20140604
       bestPicksLabel: 'أفضل الاختيارات',
       actionFailed:'فشل الإجراء',
       /*2014-06-09*/
      searchHolderYoutube:'عنوان URL لـ YouTube أو الكلمات الأساسية',
      screenshotSave:"تم حفظ اللقطة إلى: ",
      screenshotText:"اللقطة",
      screenshotCheckPathTip: "استخدم دائمًا هذا المسار لحفظ اللقطة",
      /*2014-06-10*/
      alwaysOpenClient:'هل تريد فتح Mobogenie إلى اتصال الجهاز دائمًا؟',
      changeOpenClient:'يمكنك تغيير هذا في الإعدادات في أي وقت.',
      /*2014-06-18*/
      screenBlackTipText: "يرجى إضاءة شاشة الجهاز المحمول",
      /*2014-06-30*/
     ebookLabel:"كتب",
     myEbookLabel:"كتبي",
      /*2014-6-30修改*/
      connectDeviceText:'يتم الآن الاتصال. يرجى إبقاء الجهاز متصلاً.',
      openManageDevice:"تم الكشف عن جهاز. افتح Mobogenie لإدارة جهازك وتنزيل محتوى مجاني.",
      /*2014-07-18*/
     searchHolderEBook:"كتب",
     /*2014-09-25*/
      rememberMarkLabel:"احفظ هذا الاعداد"
    };
    return dictionary;
});
