define('hindi:task', function(require, exports, module){
    var dictionary = {
        setingAsWallpaper: 'वॉलपेपर के रूप में सेट हो रहा है...',
        setingAsRingtone: 'रिंगटोन के रूप में सेट हो रहा है...',
        setRingtoneSuccess: 'रिंगटोन सेट करना, सफल हुआ',
        setRingtoneFailed: 'रिंगटोन सेट करना, विफल हुआ',
        
        insuficientSpace: 'स्थापना विफल हुई. अपर्याप्त स्थान',
        noSdCard: 'स्थापना विफल हुई. कोई SD कार्ड नहीं है',
        noSuchSourceFile: 'स्थापना विफल हुई. ऐसी कोई फ़ाइल नहीं है',
        inValidApkFile: 'स्थापना विफल हुई. अमान्य apk फ़ाइल',
        unknowSourceSetting: 'स्थापना विफल हुई. कृपया सेटिंग्स > अनुप्रयोग में &quot;अज्ञात स्रोत&quot; जाँचें',
        installPhoneMemory: 'कृपया मेमोरी में स्थापित करें',
        unknownError: 'अज्ञात त्रुटि',
        networkErrorText: 'नेटवर्क त्रुटि',
        
        waitingText: 'प्रतीक्षा कर रहे हैं',
        pausedText: 'विराम दिया गया',
        installUnknownError: 'स्थापना विफल हुई. अज्ञात त्रुटि',
        downloadUnknownError: 'डाउनलोड विफल हुआ. अज्ञात त्रुटि',
        
        adbConnectionError: 'स्थापित करने के लिए डिवाइस कनेक्ट करें',
        
        importFileNotExistedText: 'आयात विफल हुआ. फ़ाइल मौजूद नहीं है',
        importTransferErrorText: 'आयात विफल हुआ. फ़ाइल स्थानांतरण त्रुटि',
        importInsufficientSpace: 'आयात विफल हुआ. अपर्याप्त स्थान',
        importUnknownError: 'आयात विफल हुआ. अज्ञात त्रुटि',
        importUnConnectError: 'आयात करने के लिए डिवाइस कनेक्ट करें',
        importFailedNoSdCard: 'आयात विफल हुआ. SD कार्ड नहीं है',
        installSdkOlderError: 'आपके डिवाइस के साथ असंगत है',
        installMismatchedCertificateError: 'APK प्रमाणपत्र बेमेल है. कृपया स्थापित करने से पहले वर्तमान अनुप्रयोग की स्थापना रद्द करें',
        
        transferringText: 'स्थानांतरित हो रहा है',
        settedText: '{0} में सेट करें',
        importViaConnectText: 'आयात करने के लिए डिवाइस कनेक्ट करें',
        
        installFailedText: 'स्थापना विफल हुई',
        
        openFolder:'डाउनलोड्स फ़ोल्डर खोलें',
        
        downloadInText: '{0} में डाउनलोड किया गया',
        reinstallText: 'पुनः स्थापित करें',
        noTaskText: 'यहाँ कोई कार्य नहीं हैं.',
        /*6-04*/
        unknowSource2Setting: "स्थापना विफल हुई. कृपया सेटिंग्स > सुरक्षा में &quot;अज्ञात स्रोत&quot; जाँचें",
        
        unzipAppText:"डेटा फ़ाइल निकाल रहा है",
        transferDataFile:"डेटा फ़ाइल स्थानांतरित कर रहा है",
        unzipAppFailedText:"डेटा फ़ाइल निकालने में विफल",
        transferAppFailedText:"डेटा फ़ाइल स्थानांतरित करने में विफल",
        /*7-28*/
        hideTaskTip:"छिपाएँ",
        /*2014-09-25*/
        showInstallPopLabel:"Install",
        /*2014-10-14*/
        installOnDeviceText: 'Please complete installation on your device.',
         /*2014-10-16*/
        pleaseTapInstall:"Please click 'Install' on your device.",
        /*2014-11-10*/
        installSdCard: "Install to RAM",
        onlyInstallSdCard: "This app can only be installed to your device's RAM.",
        /*2015-1-7yangtian*/
        insufficeient:"कम डिस्क स्थान"
    };
    return dictionary;
});
