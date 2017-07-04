define('arabic:sms', function(require, exports, module){
    var dictionary = {
        sendTo: 'إرسال إلى',
        characters: 'حرف (أحرف)',
        pressCE: 'اضغط على CTRL + Enter للإرسال',
        writeMessage: 'اكتب الرسالة هنا.',
        send: 'إرسال',
        allGroup: 'كل المجموعة',
        selectAll: 'تحديد الكل',
        removeAll: 'إزالة الكل',
        emptyInfo:'إرسال رسالة نصية إلى صديقك.',
        newMessage: 'رسالة جديدة',
        msgSelected: 'تم تحديد الرسالة (الرسائل) {0}',
        promptDelete: 'هل تريد بالتأكيد حذف الجلسات الـ {0} ({1} من الرسائل)؟',
        importLable: "الاستيراد",
        exportLabel: "التصدير",
        deleteLabel: "حذف",
        refreshLabel: "التحديث",
        addContact: "إضافة جهة اتصال",
        editContact: "تحرير جهة الاتصال",
        loadMore: "تحميل المزيد",
        /*2014-5-30*/
       	contacts: 'تم تحديد جهة (جهات) اتصال{0}',
        contactName:"اسم جهة اتصال أو رقم الهاتف",

        selectedMsgLabel: "الرسائل المحددة ({0})",
        allMsgLabel: "كل الرسائل ({0})",

        exportSuccess:"تم تصدير {0} من الرسائل بنجاح.",
        exportFailed:"تم تصدير {0} من الرسائل بنجاح، وفشل تصدير {1}: ",
        /*2014-5-31*/
        deleteFailed:"تم حذف{0} من الرسائل بنجاح، وفشل حذف {1}: ",
        /*2014-6-18*/
        markasRead:"وضع علامة كمقروء",
        /*2014-07-22*/
       smsPermissionNotice:"تم حظر أذونات الرسائل النصية القصيرة من تطبيق أمان. يرجى السماح بالأذونات في [إدارة الأذونات]",
       emptySMS:"لا رسائل على جهازك.",
    };
    return dictionary;
});
