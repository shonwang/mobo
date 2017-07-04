define('arabic:music', function(require, exports, module){
    var dictionary = {
        ImportMusic: 'استيراد موسيقى',
        Artist:'الفنان',
        Time:'الوقت',
        Format:'التنسيق',
        emptyMusicLabel:"لا موسيقى على جهازك.",
        gotoRingtonesLabel: 'تنزيل نغمات الرنين',
        
        exportSuccess:"تم تصدير {0} من ملفات الموسيقى بنجاح.",
        exportFailed:"تم تصدير {0} من ملفات الموسيقى،وفشل تصدير {1}:",
        
        sureDelete : "هل تريد بالتأكيد حذف ملفات الموسيقى الـ {0} المحددة؟",
        deleteSuccess:"نجح الحذف.",
        deleteFailed:"تم حذف {0} من ملفات الموسيقى بنجاح،وفشل حذف {1}:",
        //add 2014-04-02
        setringtoneSuccess:'نجح التعيين كنغمة رنين',
        setsmsSuccess:'نجح التعيين كإعلام',
        setalarmSuccess:'نجح التعيين كتنبيه',
        setFailed:'فشل التعيين',
        //add 2014-04-16
        cancelringtone:'نجح إلغاء نغمة الرنين',
        cancelsetsms:'نجح إلغاء الإعلام',
        cancelsetalarm:'نجح إلغاء التنبيه',
        //add 2014-04-28
        formaterror:"هذا التنسيق غير معتمد",
        //add 2014-05-14
        setasringtone:"التعيين كنغمة رنين",
        setasnotification:"تعيين كإعلام",
        setasalarm:"تعيين كتنبيه",
        /*2014-5-26*/
        stop:"إيقاف تشغيل",
        /*2014-09-10*/
       musicnotexist:"الموسيقي غير موجود"
    };
    return dictionary;
});
