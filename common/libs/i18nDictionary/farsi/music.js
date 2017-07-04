define('farsi:music', function(require, exports, module){
    var dictionary = {
        ImportMusic: 'وارد کردن موسیقی',
        Artist:'هنرمند',
        Time:'زمان',
        Format:'فرمت',
        emptyMusicLabel:"هیچ موسیقی در دستگاهتان وجود ندارد.",
        gotoRingtonesLabel: 'دانلود آهنگ زنگ',
        
        exportSuccess:"صادر کردن {0} موسیقی موفق بود.",
        exportFailed:"صادر کردن {0} موسیقی موفق و {1} موسیقی ناموفق بود:",
        
        sureDelete : "واقعاً می‌خواهید {0} موسیقی انتخابی را حذف کنید؟",
        deleteSuccess:"حذف موفق بود.",
        deleteFailed:"حذف {0} موسیقی موفق و {1} موسیقی ناموفق بود:",
        //add 2014-04-02
        setringtoneSuccess:'تنظیم به آهنگ زنگ موفق بود',
        setsmsSuccess:'تنظیم به اعلان موفق بود',
        setalarmSuccess:'تنظیم به هشدار موفق بود',
        setFailed:'تنظیم ناموفق بود',
        //add 2014-04-16
        cancelringtone:'لغو آهنگ زنگ موفق بود',
        cancelsetsms:'لغو اعلان موفق بود',
        cancelsetalarm:'لغو هشدار موفق بود',
        //add 2014-04-28
        formaterror:"این فرمت پشتیبانی نمی‌شود",
        //add 2014-05-14
        setasringtone:"تنظیم به آهنگ زنگ",
        setasnotification:"تنظیم به اعلان",
        setasalarm:"تنظیم به هشدار",
        /*2014-5-26*/
        stop:"توقف",
        /*2014-09-10*/
        musicnotexist:"موسیقی وجود ندارد"
    };
    return dictionary;
});
