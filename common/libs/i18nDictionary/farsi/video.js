define('farsi:video', function(require, exports, module){
    var dictionary = {
        importVideo: 'وارد کردن ویدیوها',
        exportSuccess:"صادر کردن {0} ویدیو موفق بود.",
        exportFailed:"صادر کردن {0} ویدیو موفق و {1} ویدیو ناموفق بود:",
        promptDelete: 'واقعاً می‌خواهید {0} ویدیوی انتخابی را حذف کنید؟',
        deleteFailed:"حذف {0} ویدیو موفق و {1} ویدیو ناموفق بود:",
        promptPlayTitle: 'آماده‌سازی پخش ویدیو',
        promptPlay: 'در حال بارگیری...',
        emptyVideoLabel: 'هیچ ویدیویی در دستگاهتان وجود ندارد.',
        gotoYouTubeLabel: 'دانلود ویدیوها',
        promptInvaildPath: 'مسیر نامعتبر است.',
        playLabel: 'پخش',
        promptImportTips: "Android فقط ار فرمت‌های ‎.avi،‏ ‎.3gp،‏ ‎.mp4 و ‎.m4v پشتیبانی می‌کند. ویدیوهای وارد شده با فرمت‌های دیگر ممکن است توسط سیستم شناسایی نشوند.",
        promptFullDisk:"فضای کافی در دیسک C وجود ندارد. لطفاً قبل از پخش ویدیو، قسمتی از فضا را خالی کنید.",
    };
    return dictionary;
});
