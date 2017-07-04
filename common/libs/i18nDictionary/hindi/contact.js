define('hindi:contact', function(require, exports, module){
    var dictionary = {
        sideLabel: 'संपर्क',
        message: 'संदेश',
        music: 'मेरा संगीत',
        photo: 'मेरा फ़ोटो',
        video: 'मेरा वीडियो',
        backup: 'बैकअप और पुनर्स्थापना',
        ChangeIcon:'बदलें',
        MessageRecord:'संदेश रिकॉर्ड',
        Note:'नोट',
        Save:'सहेजें',
        Edit:'संपादित करें',
        Cancel:'रद्द करें',
        inputhere:'यहाँ इनपुट करें',
        ContactSelected:'<span class="contacts-count selectedNum f18">{0}</span> संपर्कों का चयन किया गया',
        SendMessage:'संदेश भेजें',
        Filter:'फ़िल्टर करें',
        AllContacts:'सभी संपर्क',
        AllGroups:'सभी समूह',
        NewContact:'नया संपर्क',
        ContactInfomation:'संपर्क जानकारी',
        //add 2014-03-24
        sureDeleteTitle:'क्या आप वाकई चयनित {0} संपर्कों को हटाना चाहते हैं?',
        deleteFailed:"हटाने में विफल.",
        
        importingTitle:'आयात जारी है, फ़ोन कनेक्टेड बनाए रखें',
        importHeader:"संपर्क आयात करें",
        
        
        exportSuccess:"{0} संपर्क निर्यात करना सफल हुआ.",
        exportFailed:"निर्यात करने में विफल.",
        
        addContactText:'संपर्क जोड़ें, फ़ोन बुक खोजें और पाठ संदेश भेजें. ',
        newContact: 'नया संपर्क',
        writeMessage:'यहाँ अपना संदेश लिखें...',
        Mobile: 'मोबाइल',
        //add 2014-04-09
        deletingTitle:'हटाना जारी है, फ़ोन कनेक्टेड बनाए रखें',
        //2014-5-26
        addTipText:"नया",
        accountLabel:"खाता : ",
        emptyContact:"आपके डिवाइस पर कोई संपर्क नहीं हैं.",
        //2014-05-29
        deleteTipText:"हटाएँ",
        smsTipText:"संदेश भेजें",
        
        importFailed:"{0} संपर्क आयात करना सफल हुआ, {1} को आयात करने में विफल हुए",
        exportHeader:"संपर्क निर्यात करें",
        exportAll:"सभी संपर्क <em class='c-9'>({0})</em>",
        exportSelect:"चयनित संपर्क <em class='c-9'>({0})</em>",
        //2014-06-03
        editgroup:"समूह संपादित करें",
        notassigened:"असाइन नहीं किया गया",
        saveFailed:'संपर्क सहेजने में विफल. कृपया बाद में प्रयास करें.',
        //2014-06-11
        fileError:'विफल हुआ. अमान्य vcf फ़ाइल',
        groupText:'समूह',
        
        /*2014-07-22*/
       contactPermissionNotice:"हो सकता है कि संपर्क अनुमतियों को किसी सुरक्षा अनुप्रयोग द्वारा अवरोधित किया गया हो. कृपया [अनुमति प्रबंधन] में अनुमतियों को अनुमत करें",
       //2014-08-18 保存分组失败
         saveGroupFailed:'ग्रुप को सेव करने मैं असफल। बाद में कोशिश करें'
    };
    return dictionary;
});
