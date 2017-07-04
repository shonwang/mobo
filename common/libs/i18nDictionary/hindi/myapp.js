define('hindi:myapp', function(require, exports, module){
    var dictionary = {
        installAppsLabel: 'अनुप्रयोग स्थापित करें',
        moveToSdCardLabel: 'SD कार्ड में स्थानांतरित करें',
        tabAppLabel: 'अनुप्रयोग',
        tabUpdatesLabel: 'अपडेट्स',
        tabSystemLabel: 'सिस्टम',
        moveLabel: 'स्थानांतरित करें',
        
        appCurrentVersionLabel: 'वर्तमान संस्करण:',
        appLatestVersionLabel: 'नवीनतम संस्करण:',
        appLocationLabel: 'स्थान:',
        appSizeColonLabel: 'आकार:',
        ratingColonLabel: 'रेटिंग:',
        
        likeColonLabel: 'हो सकता है आपको यह भी पसंद आए...',
        downloadsText: '{0} डाउनलोड्स',
        updatingText: 'अद्यतन हो रहा है',
        uninstallingText: 'स्थापना रद्द हो रही है',
        installingText: 'स्थापित हो रहा है',
        sureUninstallTip: 'क्या आप वाकई चयनित {0} अनुप्रयोगों की स्थापना रद्द करना चाहते हैं?',
        uninstalling: 'स्थापना रद्द हो रही है. कृपया अपने डिवाइस को कनेक्टेड रखें.',
        uninstallSuccessText: 'सफल हुआ',
        uninsatllFailed:"{0} अनुप्रयोग की स्थापना रद्द करना सफल हुआ, {1} की स्थापना रद्द करने में विफल:",
        
        exportSuccess:"{0} अनुप्रयोगों को निर्यात करना, सफल हुआ.",
        exportFailed:"{0} अनुप्रयोगों को निर्यात करना सफल हुआ, {1} निर्यात करने में विफल:",
        
        systemMaskText: 'अपने डिवाइस को रूट करने के बाद आप अपने सिस्टम अनुप्रयोग प्रबंधित कर सकते हैं.',
        systemMaskCtn: 'आपके सिस्टम अनुप्रयोग को निकालने से 156.3 MB स्थान खाली हो जाएगा.',
        searchResultTitle:'हमें {0} अनुप्रयोग मिलें',
        
        /*2014-5-26*/
        deviceTipText : "डिवाइस मेमोरी",
        sdCardTipText : "SD कार्ड",
        //06-03
        noapptext:'आपके डिवाइस पर कोई अनुप्रयोग नहीं हैं.',
        noupdatetext:'आपके डिवाइस पर कोई अपडेट करने योग्य अनुप्रयोग नहीं हैं.',
        noappBtnText:'अनुप्रयोग डाउनलोड करें',
        //08-13
        moving: 'मूव  हो रहा है. कर के आपका डिवाइस कनेक्टेड रक्खे .',
		moveFailed:"{0} अप्प मूव हुवै. {1} अप्प मूव करने में विफल:",
        //08-19
        moveConfirm:"अप्प्स SD कार्ड मेँ मूव करने बाद शायद काम नही करेंगे। मूव जारी रखें?",
        //2014-10-14
        wifiUninstallTitle:"Please complete uninstallation on your phone."
    }
    return dictionary;
});
