define('arabic:backupRestore', function(require, exports, module){
    var dictionary = {
        lastBackupLabel: 'آخر نسخة احتياطية: ',
        basicLabel: 'أساسية',
        advanceLabel: 'متقدمة',
        backupCompleted: 'اكتمل النسخ الاحتياطي',
        backupProcess: 'النسخ الاحتياطي قيد التقدم... يرجى إبقاء الجهاز متصلاً.',
        viewBackup: 'عرض النسخة الاحتياطية',
        finish: 'انتهاء',
        backtoLabel: "النسخ الاحتياطي إلى: ",
        changeLabel: "تغيير",
        contactLabel: "جهات الاتصال",
        messageLabel: "الرسائل",
        callRegordsLabel: "سجلات المكالمات",
        appLabel: "التطبيقات",
        picLabel: "الصور",
        musicLabel: "الموسيقى",
        videoLabel: "مقاطع الفيديو",

        restoreProcess: 'الاستعادة قيد التقدم... يرجى إبقاء الجهاز متصلاً.',
        restoreLabel: "الاستعادة",
        nextLabel: "التالي",
        closeLabel : "إغلاق",
        restoreFolder: "استعادة من المجلد المخصص",
        selectLabel: "تحديد ملف للاستعادة: ",
        previousLabel: "السابق",

        //20140531 - add by wangzhisong
        noBackupFile: "لم يتم العثور على ملفات النسخ الاحتياطي.",
        //20140623
        pushBackupLabel: "قم بإجراء نسخ احتياطي لبيانات جهازك الآن لحماية معلوماتك الشخصية.",
        //2014-7-25
        sureDialogText:"لتفادي فقدان البيانات، لا يمكن إجراء النسخ الاحتياطي والاستعادة في نفس الوقت."
   
    };
    return dictionary;
});
