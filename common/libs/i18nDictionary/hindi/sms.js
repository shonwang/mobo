define('hindi:sms', function(require, exports, module){
    var dictionary = {
        sendTo: 'इसे भेजें',
        characters: 'वर्ण',
        pressCE: 'भेजने के लिए Ctrl+Enter दबाएँ',
        writeMessage: 'यहाँ संदेश लिखें.',
        send: 'भेजें',
        allGroup: 'सभी समूह',
        selectAll: 'सभी का चयन करें',
        removeAll: 'सभी को निकालें',
        emptyInfo:'अपने मित्र को कोई पाठ संदेश भेजें.',
        newMessage: 'नया संदेश',
        msgSelected: '{0} संदेश चयनित',
        promptDelete: 'क्या आप वाकई चयनित {0} सत्रों ({1} संदेशों) को हटाना चाहते हैं?',
        importLable: "आयात करें",
        exportLabel: "निर्यात करें",
        deleteLabel: "हटाएँ",
        refreshLabel: "ताज़ा करें",
        addContact: "संपर्क जोड़ें",
        editContact: "संपर्क संपादित करें",
        loadMore: "और अधिक लोड करें",
        /*2014-5-30*/
       	contacts: '{0} संपर्क चयनित हैं',
        contactName:"संपर्क नाम या फ़ोन नंबर",

        selectedMsgLabel: "चयनित संदेश ({0}) ",
        allMsgLabel: "सभी संदेश ({0})",

        exportSuccess:"{0} संदेश निर्यात करना, सफल हुआ.",
        exportFailed:"{0} संदेश निर्यात करना सफल हुआ, {1} निर्यात करने में विफल: ",
        /*2014-5-31*/
        deleteFailed:"{0} संदेश हटाना सफल हुआ, {1} हटाने में विफल: ",
        /*2014-6-18*/
        markasRead:"पढ़े गए के रूप में चिह्नित करें",
        /*2014-07-22*/
       smsPermissionNotice:"हो सकता है कि SMS अनुमतियों को किसी सुरक्षा अनुप्रयोग द्वारा अवरोधित किया गया हो. कृपया [अनुमति प्रबंधन] में अनुमतियों को अनुमत करें",
       emptySMS:"आपके डिवाइस पर कोई संदेश नहीं है.",
    };
    return dictionary;
});
