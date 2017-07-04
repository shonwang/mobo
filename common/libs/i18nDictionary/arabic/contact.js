define('arabic:contact', function(require, exports, module){
    var dictionary = {
        sideLabel: 'جهات الاتصال',
        message: 'الرسائل',
        music: 'موسيقاي',
        photo: 'صورتي',
        video: 'الفيديو الخاص بي',
        backup: 'النسخ الاحتياطي والاستعادة',
        ChangeIcon:'تغيير',
        MessageRecord:'سجل الرسائل',
        Note:'ملاحظة',
        Save:'حفظ',
        Edit:'تحرير',
        Cancel:'إلغاء الأمر',
        inputhere:'إدخال هنا',
        ContactSelected:'تم تحديد<span class="contacts-count selectedNum f18">{0}</span> من جهات الاتصال',
        SendMessage:'إرسال الرسالة',
        Filter:'تصفية',
        AllContacts:'كل جهات الاتصال',
        AllGroups:'كل المجموعات',
        NewContact:'جهة اتصال جديدة',
        ContactInfomation:'معلومات جهة الاتصال',
        //add 2014-03-24
        sureDeleteTitle:'هل تريد بالتأكيد حذف جهات الاتصال الـ {0} المحددة؟',
        deleteFailed:"فشل الحذف.",
        
        importingTitle:'يتم الاستيراد الآن . يرجى إبقاء الجهاز متصلاً.',
        importHeader:"استيراد جهة (جهات) الاتصال",
        
        
        exportSuccess:"تم تصدير {0} من جهات الاتصال بنجاح.",
        exportFailed:"فشل التصدير.",
        
        addContactText:'لإضافة جهات اتصال، والبحث في دفتر الهاتف وإرسال رسائل نصية. ',
        newContact: 'جهة اتصال جديدة',
        writeMessage:'اكتب رسالتك هنا...',
        Mobile: 'الهاتف المحمول',
        //add 2014-04-09
        deletingTitle:'الحذف قيد التقدم، يرجى إبقاء الهاتف متصلاً',
        //2014-5-26
        addTipText:"حساب",
        accountLabel:"جديد: ",
        emptyContact:"ما من جهات اتصال في جهازك.",
        //2014-05-29
        deleteTipText:"حذف",
        smsTipText:"إرسال الرسالة",
        
        importFailed:"تم استيراد {0} من جهات الاتصال بنجاح، وفشل استيراد {1}",
        exportHeader:"تصدير جهة (جهات) اتصال",
        exportAll:"كل جهات الاتصال <em class='c-9'>({0})</em>",
        exportSelect:"جهات الاتصال المحددة <em class='c-9'>({0})</em>",
        //2014-06-03
        editgroup:"تحرير المجموعة",
        notassigened:"غير معيّن",
        saveFailed:'فشل حفظ جهة الاتصال. يرجى المحاولة لاحقًا.',
        //2014-06-11
        fileError:'فشل. ملف vcf غير صالح',
        groupText:'المجموعة',
        
        /*2014-07-22*/
       contactPermissionNotice:"من الممكن أنه تم حظر أذونات الاتصال من تطبيق أمان. يرجى السماح بالأذونات في إدارة الأذونات]",
       //2014-08-18 保存分组失败
         saveGroupFailed:'قد تعذر تخزين هذه المجموعة، برجاء إعادة المحاولة لاحقا'
    };
    return dictionary;
});
