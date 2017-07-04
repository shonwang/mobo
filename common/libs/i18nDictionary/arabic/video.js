define('arabic:video', function(require, exports, module){
    var dictionary = {
        importVideo: 'استيراد مقاطع الفيديو',
        exportSuccess:"تم تصدير {0} من مقاطع الفيديو بنجاح.",
        exportFailed:"تم تصدير {0} من مقاطع الفيديو بنجاح،وفشل تصدير {1}:",
        promptDelete: 'هل تريد بالتأكيد حذف مقاطع الفيديو الـ {0} المحددة؟',
        deleteFailed:"تم حذف {0} من مقاطع الفيديو بنجاح،وفشل حذف {1}:",
        promptPlayTitle: 'تحضير تشغيل الفيديو',
        promptPlay: 'يتم الآن التحميل...',
        emptyVideoLabel: 'لا مقاطع فيديو على جهازك.',
        gotoYouTubeLabel: 'تنزيل مقاطع الفيديو',
        promptInvaildPath: 'مسار غير صالح.',
        playLabel: 'تشغيل',
        promptImportTips: "يدعم Android تنسيقات ‎.avi و‎.3gp و‎.mp4 و‎.m4v فقط. قد لا يتم التعرف على مقاطع الفيديو التي يتم استيرادها بتنسيقات أخرى.",
        promptFullDisk:"مساحة محرك الأقراص C لا يكفي، يرجى تنظيف محرك الأقراص C ثم لعب هذا الفيديو"
    };
    return dictionary;
});
