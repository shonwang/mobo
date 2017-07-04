define('hindi:common', function(require, exports, module){
    var dictionary = {
        connectingText: 'कनेक्ट किया जा रहा है',
        
        homeLabel: 'मुखपृष्ठ',
        appLabel: 'अनुप्रयोग',
        gamesLabel: 'गेम्स',
        ringtonesLabel: 'रिंगटोन्स',
        wallPaperLabel: 'वॉलपेपर्स',
        youTubeLabel: 'YouTube',
        moreLabel: 'और अधिक',
        toolsLabel: 'उपकरण किट',
        safetyLabel: 'सुरक्षा',
        contactLabel: 'मेरे संपर्क',
        smsLabel: 'मेरे संदेश',
        myAppLabel: 'मेरे अनुप्रयोग',
        myMusicLabel: 'मेरा संगीत',
        myPictureLabel: 'मेरे चित्र',
        myVideoLabel: 'मेरे वीडियो',
        Import:'आयात करें',
        Export:'निर्यात करें',
        Delete:'हटाएँ',
        Refresh:'ताज़ा करें',
        updateAllLabel: 'सभी का अद्यतन करें',
        updateLabel: 'अद्यतन करें',
        uninstallLabel: 'स्थापना रद्द करें',
        deviceText: 'डिवाइस',
        phoneText: 'फ़ोन',
        memoryText: 'मेमोरी',
        installLabel: 'स्थापित करें',
        sizeLabel: 'आकार',
        nameLabel: 'नाम',
        locationLabel: 'स्थान',
        actionLabel: 'कार्रवाई',
        selectAllLabel: 'सभी का चयन करें',
        downloadAllLabel: 'सभी को डाउनलोड करें',
        downloadingText: 'डाउनलोड किया जा रहा है',
        redownloadText: 'पुनः डाउनलोड करें',
        downloadLabel: "डाउनलोड करें",
        
        successText: 'सफल',
        installedInText: '{0} में स्थापित किया गया है',
        ImportingText: 'आयात किया जा रहा है',
        setWallpaperFailed: 'वॉलपेपर सेट करना विफल हुआ',
        importedInText: '{0} में आयात किया गया है',
        
        retryText: 'पुनः प्रयास करें',
        pauseText: 'विराम दें',
        continueText: 'जारी रखें',
        inProcessingTaskText: 'जारी है',
        completedText: 'पूर्ण हुआ',
        noTaskText: 'कोई कार्य जारी नहीं है',
        
        captureLabel: 'कैप्चर करें',
        featureText: 'अवश्य होने चाहिए',
        countTasksText: '{0} कार्य',
        
        updateTipText: 'आपके पास पहले से {0} अनुप्रयोगों का नवीनतम संस्करण है.',
        rootTipText: 'आपके मोबाइल डिवाइस को रूट नहीं किया गया है. इसे रूट करने से आपको अपने किसी भी इच्छित अनुप्रयोग को स्थापित करने की अनुमति मिलेगी,',
        oneClickRootLabel: 'एक-क्लिक में रूट करना',
        shareMobogenieText: 'इन पर Mobogenie साझा करें',
        
        tipLabel: 'युक्ति',
        confirmLabel:'पुष्टि करें',
        okLabel : 'ठीक',
        yesLabel : 'हाँ',
        cancelLabel:'रद्द करें',
        closeLabel : 'बंद करें',
        failedLabel : 'विफल हुआ',
        exportSuccess:'निर्यात सफलता',
        
        headSignIn:'साइन इन करें',
        connectAnother : 'किसी अन्य डिवाइस से कनेक्ट करें',
        deviceInfo: 'डिवाइस के बारे में',
        email:'ईमेल',
        /*add 2014-03-28*/
        promptInvaildPath:'अमान्य पथ.',
	   
	    connectDeviceVia:'अनुप्रयोग, गेम्स, वीडियोज़ और सभी प्रकार की नि:शुल्क Android सामग्री को स्थापित करने के लिए अपने फ़ोन को बस कनेक्ट करें और सशक्त मोबाइल डिवाइस प्रबंधन सेवा आज़माएँ.',
        connectNow:'अभी कनेक्ट करें',
		
		downloadingDriver:'आपके {0} डिवाइस के लिए ड्राइवर डाउनलोड किया जा रहा है',
		installingDriverText:'आपके डिवाइस के लिए ड्राइवर को स्थापित किया जा रहा है',
		installingMG:'आपके डिवाइस पर Mobogenie को स्थापित किया जा रहा है',
		connectedYourDeviceText: 'कनेक्ट किया गया है',
		disconnectYourDeviceText: 'डिस्कनेक्ट करें',

        searchResultText: '<span class="c-red key-sp">{0}</span> को खोजें, <span class="c-red num-sp">{1}</span> परिणाम मिले ',
        searchSeeAllLink: 'सभी को देखें',
        openLabel: 'फ़ोल्डर खोलें',
        
        Exporting:"निर्यात जारी है. कृपया अपने डिवाइस को कनेक्टेड बनाए रखें.",
        Deleting:"हटाना जारी है. कृपया अपने डिवाइस को कनेक्टेड बनाए रखें.",

        deviceMemoryLabel: "डिवाइस मेमोरी",
        sdCardLabel: "SD कार्ड 1",
        sdCardTwoLabel: "SD कार्ड 2",
        total: "कुल: ",
        available: "उपलब्ध: ",
        manage: "प्रबंधित करें",
        
        installedText: 'स्थापित किया गया',
        updateAppText: 'अद्यतन करें',
        installingAppText: 'स्थापित किया जा रहा है',
        installText: 'स्थापित करें',
        
        /*2014-05-13*/
       searchHolderMyApp:"स्थानीय अनुप्रयोग और गेम्स",
       searchHolderWallpaper:"वॉलपेपर्स",
       searchHolderRingtone:"रिंगटोन्स",
       searchHolderAppGames:"अनुप्रयोग/गेम्स",
       noSdState:"आपके डिवाइस पर कोई SD कार्ड नहीं मिला.",
       /*2014-5-26*/
       minTipText:"छोटा करें",
       maxTipText:"बड़ा करें",
       exitTipText:"बाहर निकलें",
       returnTipText:"वापस जाएँ",
       retreatTipText:"आगे जाएँ",
       /*2014-5-27*/
       noLabel : 'नहीं',
       menuOpenLabel:"खोलें",
       //20140604
       bestPicksLabel: 'श्रेष्ठ चुनाव',
       actionFailed:'कार्रवाई विफल हुई',
       /*2014-06-09*/
      searchHolderYoutube:'YouTube URL या कीवर्ड्स',
      screenshotSave:"स्नैपशॉट को इस पर सहेजा गया है: ",
      screenshotText:"स्नैपशॉट",
      screenshotCheckPathTip: "स्नैपशॉट सहेजने के लिए हमेशा इस पथ का उपयोग करें",
      /*2014-06-10*/
      alwaysOpenClient:'हमेशा डिवाइस-कनेक्शन पर Mobogenie खोलें?',
      changeOpenClient:'आप किसी भी समय सेटिंग्स में इसे बदल सकते हैं.',
      /*2014-06-18*/
      screenBlackTipText: "कृपया अपने मोबाइल डिवाइस की स्क्रीन चालू करें",
      /*2014-06-30*/
     ebookLabel:"किताबें",
     myEbookLabel:"मेरी किताबें",
      /*2014-6-30修改*/
      connectDeviceText:'कनेक्ट हो रहा है. कृपया अपने डिवाइस को कनेक्टेड बनाए रखें.',
      openManageDevice:"एक डिवाइस का पता चला है. अपने डिवाइस को प्रबंधित करने और निःशुल्क सामग्री डाउनलोड करने के लिए ‍Mobogenie खोलें.",
      /*2014-07-18*/
     searchHolderEBook:"किताबें",
      /*2014-09-25*/
    rememberMarkLabel:"Remember this"
    };
    return dictionary;
});
