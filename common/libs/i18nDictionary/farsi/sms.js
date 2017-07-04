define('farsi:sms', function(require, exports, module){
    var dictionary = {
        sendTo: 'ارسال به',
        characters: 'نویسه',
        pressCE: 'برای ارسال، Ctrl+Enter را فشار دهید',
        writeMessage: 'پیام را اینجا بنویسید.',
        send: 'ارسال',
        allGroup: 'کل گروه',
        selectAll: 'انتخاب همه',
        removeAll: 'حذف همه',
        emptyInfo:'یک پیام متنی برای دوست خود ارسال کنید.',
        newMessage: 'پیام جدید',
        msgSelected: 'پیام انتخاب شد {0}',
        promptDelete: 'واقعاً می‌خواهید {0} جلسه ({1} پیام) انتخابی را حذف کنید؟',
        importLable: "وارد کردن",
        exportLabel: "صادر کردن",
        deleteLabel: "حذف",
        refreshLabel: "نوسازی",
        addContact: "افزودن مخاطب",
        editContact: "ویرایش مخاطب",
        loadMore: "بارگیری بیشتر",
        /*2014-5-30*/
       	contacts: 'مخاطب انتخاب شد {0}',
        contactName:"شماره تلفن یا نام مخاطب",

        selectedMsgLabel: "پیام انتخابی ({0})",
        allMsgLabel: "همه پیام‌ها ({0})",

        exportSuccess:"صادر کردن {0} پیام موفق بود.",
        exportFailed:"صادر کردن {0} پیام موفق و {1} پیام ناموفق بود: ",
        /*2014-5-31*/
        deleteFailed:"حذف {0} پیام موفق و {1} پیام ناموفق بود: ",
        /*2014-6-18*/
        markasRead:"علامت خوانده شده",
        /*2014-07-22*/
       smsPermissionNotice:"مجوزهای SMS ممکن است توسط یک برنامه امنیتی مسدود شده باشند. لطفاً مجوزها را در [مدیریت مجوز] آزاد کنید",
       emptySMS:"هیچ پیامی در دستگاهتان وجود ندارد.",
    };
    return dictionary;
});
