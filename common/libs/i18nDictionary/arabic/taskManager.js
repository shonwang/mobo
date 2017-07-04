define('arabic:task', function(require, exports, module){
    var dictionary = {
        setingAsWallpaper: 'يتم التعيين كخلفية شاشة...',
        setingAsRingtone: 'يتم التعيين كنغمة رنين...',
        setRingtoneSuccess: 'نجح تعيين نغمة الرنين',
        setRingtoneFailed: 'فشل تعيين نغمة الرنين',
        
        insuficientSpace: 'فشل التثبيت. المساحة غير كافية',
        noSdCard: 'فشل التثبيت. ما من بطاقة SD',
        noSuchSourceFile: 'فشل التثبيت. ما من ملف مماثل',
        inValidApkFile: 'فشل التثبيت. ملف apk غير صالح',
        unknowSourceSetting: 'فشل التثبيت. يرجى التحقق من "المصادر المجهولة" في الإعدادات > التطبيقات',
        installPhoneMemory: 'يرجى التثبيت في الذاكرة',
        unknownError: 'خطأ مجهول',
        networkErrorText: 'خطأ في الشبكة',
        
        waitingText: 'قيد الانتظار',
        pausedText: 'متوقف مؤقتاً',
        installUnknownError: 'فشل التثبيت. خطأ مجهول',
        downloadUnknownError: 'فشل التنزيل. خطأ مجهول',
        
        adbConnectionError: 'توصيل الجهاز للتثبيت',
        
        importFileNotExistedText: 'فشل الاستيراد. الملف غير موجود',
        importTransferErrorText: 'فشل الاستيراد. خطأ في نقل الملف',
        importInsufficientSpace: 'فشل الاستيراد. المساحة غير كافية',
        importUnknownError: 'فشل الاستيراد. خطأ مجهول',
        importUnConnectError: 'توصيل الجهاز للاستيراد',
        importFailedNoSdCard: 'فشل الاستيراد. ما من بطاقة SD',
        installSdkOlderError: 'غير متوافق مع جهازك',
        installMismatchedCertificateError: 'عدم تطابق شهادة apk. يرجى إلغاء تثبيت التطبيق الحالي قبل تثبيته',
        
        transferringText: 'النقل',
        settedText: 'تم التعيين إلى {0}',
        importViaConnectText: 'توصيل الجهاز للاستيراد',
        
        installFailedText: 'فشل التثبيت',
        
        openFolder:'فتح مجلد التنزيلات',
        
        downloadInText: 'تم التحميل في {0}',
        reinstallText: 'إعادة التثبيت',
        noTaskText: 'ما من مهام هنا.',
        /*6-04*/
        unknowSource2Setting: "فشل التثبيت. يرجى التحقق من &quot;المصادر المجهولة&quot; في الإعدادات > الأمان",
       
        unzipAppText:"يتم الآن استخراج ملف البيانات",
        transferDataFile:"يتم الآن نقل ملف البيانات",
        unzipAppFailedText:"فشل استخراج ملف البيانات",
        transferAppFailedText:"فشل نقل ملف البيانات",
        /*7-28*/
        hideTaskTip:"إخفاء",
        /*2014-09-25*/
        showInstallPopLabel:"Install",
        /*2014-10-14*/
        installOnDeviceText: 'يرجى إكمال التثبيت على جهازك',
         /*2014-10-16*/
        pleaseTapInstall:"يرجى النقر على \"تثبيت\" على جهازك",
        /*2014-11-10*/
        installSdCard: " تثبيت إلى RAM ",
        onlyInstallSdCard: " يمكن تثبيت هذا التطبيق إلا في RAM لهاتفك.",
        /*2015-1-7yangtian*/
        insufficeient:"انخفاض مساحة القرص"

    };
    return dictionary;
});
