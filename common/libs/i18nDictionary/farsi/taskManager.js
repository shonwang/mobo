define('farsi:task', function(require, exports, module){
    var dictionary = {
        setingAsWallpaper: 'در حال تنظیم به تصویرزمینه...',
        setingAsRingtone: 'در حال تنظیم به آهنگ زنگ...',
        setRingtoneSuccess: 'تنظیم آهنگ زنگ موفق بود',
        setRingtoneFailed: 'تنظیم آهنگ زنگ ناموفق بود',
        
        insuficientSpace: 'نصب ناموفق بود. فضا کافی نیست',
        noSdCard: 'نصب ناموفق بود. بدون کارت حافظه',
        noSuchSourceFile: 'نصب ناموفق بود. چنین فایلی وجود ندارد',
        inValidApkFile: 'نصب ناموفق بود. فایل apk نامعتبر',
        unknowSourceSetting: 'نصب ناموفق بود. لطفاً &quot;منابع ناشناخته&quot; را در تنظیمات > برنامه‌ها بررسی کنید',
        installPhoneMemory: 'لطفاً در حافظه نصب کنید',
        unknownError: 'خطای ناشناخته',
        networkErrorText: 'خطای شبکه',
        
        waitingText: 'در انتظار',
        pausedText: 'متوقف شده',
        installUnknownError: 'نصب ناموفق بود. خطای ناشناخته',
        downloadUnknownError: 'دانلود ناموفق بود. خطای ناشناخته',
        
        adbConnectionError: 'برای نصب دستگاه را متصل کنید',
        
        importFileNotExistedText: 'وارد نشد. فایل وجود ندارد',
        importTransferErrorText: 'وارد نشد. خطای انتقال فایل',
        importInsufficientSpace: 'وارد نشد. فضا کافی نیست',
        importUnknownError: 'وارد نشد. خطای ناشناخته',
        importUnConnectError: 'برای وارد کردن، دستگاه را متصل کنید',
        importFailedNoSdCard: 'وارد نشد. بدون کارت حافظه',
        installSdkOlderError: 'با دستگاهتان ناسازگار است',
        installMismatchedCertificateError: 'گواهینامه APK مطابقت ندارد. لطفاً قبل از نصب، برنامه فعلی را حذف کنید',
        
        transferringText: 'در حال انتقال',
        settedText: 'تنظیم در {0}',
        importViaConnectText: 'برای وارد کردن، دستگاه را متصل کنید',
        
        installFailedText: 'نصب ناموفق بود',
        
        openFolder:'باز کردن پوشه دانلودها',
        
        downloadInText: 'در {0} دانلود شد',
        reinstallText: 'نصب مجدد',
        noTaskText: 'کاری در اینجا وجود ندارد.',
        /*6-04*/
        unknowSource2Setting: "نصب ناموفق بود. لطفاً &quot;منابع ناشناخته&quot; را در تنظیمات > امنیت بررسی کنید",
        
        unzipAppText:"استخراج فایل داده",
        transferDataFile:"انتقال فایل داده",
        unzipAppFailedText:"استخراج فایل داده ناموفق بود",
        transferAppFailedText:"انتقال فایل داده ناموفق بود",
        /*7-28*/
        hideTaskTip:"مخفی کردن",
        /*2014-09-25*/
        showInstallPopLabel:"Install",
        /*2014-10-14*/
        installOnDeviceText: 'لطفا نصب را در دستگاهتان کامل کنید.',
         /*2014-10-16*/
        pleaseTapInstall:"لطفا 'نصب' را در دستگاهتان کلیک کنید.",
        /*2014-11-10*/
        installSdCard: "نصب در RAM",
        onlyInstallSdCard: "این برنامه را فقط می‌توانید در RAM دستگاهتان نصب کنید.",
         /*2015-1-7yangtian*/
        insufficeient:"فضای کم دیسک"
    };
    return dictionary;
});
