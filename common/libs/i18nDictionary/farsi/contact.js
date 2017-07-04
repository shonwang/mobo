define('farsi:contact', function(require, exports, module){
    var dictionary = {
        sideLabel: 'مخاطبین',
        message: 'پیام‌ها',
        music: 'موسیقی من',
        photo: 'عکس من',
        video: 'ویدیوی من',
        backup: 'پشتیبان و بازیابی',
        ChangeIcon:'تغییر',
        MessageRecord:'ضبط پیام',
        Note:'یادداشت',
        Save:'ذخیره',
        Edit:'ویرایش',
        Cancel:'لغو',
        inputhere:'اینجا وارد شود',
        ContactSelected:'<span class="contacts-count selectedNum f18">{0}</span> مخاطب انتخاب شد',
        SendMessage:'ارسال پیام',
        Filter:'فیلتر',
        AllContacts:'همه مخاطبین',
        AllGroups:'همه گروهها',
        NewContact:'مخاطب جدید',
        ContactInfomation:'اطلاعات تماس',
        //add 2014-03-24
        sureDeleteTitle:'واقعاً می‌خواهید {0} مخاطب انتخابی را حذف کنید؟',
        deleteFailed:"حذف ناموفق بود.",
        
        importingTitle:'وارد کردن در حال انجام است، تلفن را متصل نگهدارید',
        importHeader:"وارد کردن مخاطب(ها)",
        
        
        exportSuccess:"{0} مخاطب با موفقیت صادر شد.",
        exportFailed:"صادر کردن ناموفق بود.",
        
        addContactText:'مخاطبین را اضافه کنید، در دفترچه تلفن جستجو کرده و پیام‌های متنی ارسال کنید. ',
        newContact: 'مخاطب جدید',
        writeMessage:'پیامتان را اینجا بنویسید...',
        Mobile: 'تلفن همراه',
        //add 2014-04-09
        deletingTitle:'حذف در حال انجام است، تلفن را متصل نگهدارید',
        //2014-5-26
        addTipText:"جدید",
        accountLabel:"حساب: ",
        emptyContact:"هیچ مخاطبی در دستگاهتان وجود ندارد.",
        //2014-05-29
        deleteTipText:"حذف",
        smsTipText:"ارسال پیام",
        
        importFailed:"وارد کردن {0} مخاطب موفق و {1} مخاطب ناموفق بود",
        exportHeader:"صادر کردن مخاطب(ها)",
        exportAll:"همه مخاطبین <em class='c-9'>({0})</em>",
        exportSelect:"مخاطبین انتخابی <em class='c-9'>({0})</em>",
        //2014-06-03
        editgroup:"ویرایش گروه",
        notassigened:"تعیین نشده",
        saveFailed:'ذخیره مخاطب ناموفق بود. بعداً امتحان کنید.',
        //2014-06-11
        fileError:'ناموفق بود. فایل vcf نامعتبر',
        groupText:'گروه',
        /*2014-07-22*/
       contactPermissionNotice:"مجوزهای مخاطب ممکن است توسط یک برنامه امنیتی مسدود شده باشند. لطفاً مجوزها را در [مدیریت مجوز] آزاد کنید",
       //2014-08-18 保存分组失败
         saveGroupFailed:'ذخیره گروه ناموفق بود. بعداً امتحان کنید.'
    };
    return dictionary;
});
