define('arabic:myapp', function(require, exports, module){
    var dictionary = {
        installAppsLabel: 'تثبيت التطبيقات',
        moveToSdCardLabel: 'نقل إلى بطاقة SD',
        tabAppLabel: 'التطبيقات',
        tabUpdatesLabel: 'التحديثات',
        tabSystemLabel: 'النظام',
        moveLabel: 'نقل',
        
        appCurrentVersionLabel: 'الإصدار الحالي:',
        appLatestVersionLabel: 'أحدث إصدار:',
        appLocationLabel: 'الموقع:',
        appSizeColonLabel: 'الحجم:',
        ratingColonLabel: 'التصنيف:',
        
        likeColonLabel: 'قد يعجبك أيضًا...',
        downloadsText: '{0} من عمليات التنزيل',
        updatingText: 'التحديث',
        uninstallingText: 'إلغاء التثبيت',
        installingText: 'التثبيت',
        sureUninstallTip: 'هل تريد بالتأكيد إلغاء تثبيت التطبيق (التطبيقات) الـ {0} المحدد (المحددة)؟',
        uninstalling: 'إلغاء التثبيت قيد التقدم.يرجى إبقاء الجهاز متصلاً.',
        uninstallSuccessText: 'نجاح',
        uninsatllFailed:"تم إلغاء تثبيت {0} من التطبيقات بنجاح،وفشل تثبيت {1}:",
        
        exportSuccess:"تم تصدير {0} من التطبيقات بنجاح.",
        exportFailed:"تم تصدير {0} من التطبيقات بنجاح،وفشل تصدير {1}:",
        
        systemMaskText: 'يمكنك إدارة تطبيقات النظام بعد تحديد جذر الجهاز.',
        systemMaskCtn: 'سيؤدي مسح تطبيقات النظام إلى توفير ما يصل إلى 156.3 ميجابايت من المساحة.',
        searchResultTitle:'عثرنا على {0} من التطبيقات',
        
        /*2014-5-26*/
        deviceTipText : "ذاكرة الجهاز",
        sdCardTipText : "بطاقة SD",
        //06-03
        noapptext:'ما من تطبيقات على جهازك.',
        noupdatetext:'ما من تطبيقات قابلة للتحديث على جهازك.',
        noappBtnText:'تنزيل التطبيقات',
        //08-13
        moving: 'يتم الآن نقل الملفات، برجاء بقاء الهاتف متصلا',
        moveFailed:"تم نقل {0} تطبيق بنجاح، كما تعذر نقل {1} تطبيق",
        //08-19
        moveConfirm:"التطبيق قد لا يعمل أذا نقل إلي الذاكرة الخارجية. هل تريد الاستمرار في عملية النقل؟",
        //2014-10-14
        wifiUninstallTitle:"يرجى إكمال عملية إلغاء التثبيت على الهاتف"
    }
    return dictionary;
});
