define('hindi:driver', function(require, exports, module){
    var dictionary = {
		badNetworkTitle:'खराब नेटवर्क कनेक्शन. कृपया अपने नेटवर्क की जाँच करें.',
		pictureGuide: 'चित्र मार्गदर्शिका',
		videoGuide: 'वीडियो मार्गदर्शिका',
		myVersion: 'मेरा Android संस्करण',
		debugFootText: 'अभी भी USB डीबगिंग नहीं खोल पा रहे हैं?',
		oneClickSet: 'एक-क्लिक में सेटिंग',
		tryConnectText: 'केबल निकालकर पुनः कनेक्ट करने का प्रयास करें या अपने डिवाइस को पुनः प्रारंभ करें.',
		butBack: 'वापस जाएँ',
		ContactSupport: 'समर्थन से संपर्क करें',
		allowDebugText: 'USB डिबगिंग की अनुमति के लिए पूछने पर कृपया "ठीक" दबाएँ.',
		allowDebugTip: "<i>1</i> यह विकल्प चेक करें",
		allowDebugOkTip: "<i>2</i> <b>[ठीक]</b> टैप करें",/*������50���ַ�*/
		butRetry: 'यह पॉपअप नहीं देख पा रहे हैं?',
		butShowAgain: 'फिर से दिखाएँ',
		stillNoSolove: 'अभी भी कार्य नहीं कर रहा है?',
        debugTipText: 'कृपया अपने डिवाइस पर {0} (12KB) डाउनलोड करें',
        debugSetterContentText: ' [USB डीबगर]',
		orText: 'या',
		noSpaceHint: 'आपके डिवाइस में पर्याप्त संग्रहण नहीं है.',
		noSpaceText: 'Mobogenie को कम से कम {0} डिस्क स्थान की आवश्यकता है.',
		needSpaceText: '10 MB',
		upSpaceText: 'कृपया कुछ स्थान खाली करने के लिए कुछ अनुप्रयोग की स्थापना रद्द करें.',
		butHaveSpace: 'मेरे पास पर्याप्त स्थान है',
		connectFailedTitle:'ओह. कनेक्शन विफल हुआ.',
		connectFailedTryText: 'अपने डिवाइस को डिस्कनेक्ट करके पुनः कनेक्ट करने का प्रयास करें.',
		connectFailedRestart: 'Mobogenie को पुनः प्रारंभ करें.',
		RestartDevice: 'अपने PC और डिवाइस को पुन: प्रारंभ करें.',
		connectFailedText: 'यदि ये कार्य नहीं करते हैं, तो आप हमारा FAQ पढ़ सकते हैं या अपनी समस्या के बारे में हमें बता सकते हैं.',
		
		connectionGuide:'कनेक्शन मार्गदर्शिका',
		driverUsbTitle: 'कृपया USB केबल के माध्यम से अपने डिवाइस को कनेक्ट करें.',
		driverUsbText: 'अपने डिवाइस को कनेक्ट करने के बाद, आप नि:शुल्क गेम, अनुप्रयोग और बहुत कुछ डाउनलोड कर पाएँगे, साथ ही अपने डिवाइस को भी प्रबंधित कर पाएँगे.',
		
		AndroidLowDebugStep1: '<i>1</i> <b>[ऐप ड्रॉर ]</b> पर टैप करें',
		AndroidLowDebugStep2: '<i>2</i> <b>[सेटिंग्स]</b> पर टैप करें',
		AndroidLowDebugStep3: '<i>3</i> <b>[अनुप्रयोग]</b> पर टैप करें',
		AndroidLowDebugStep4: '<i>4</i> <b>[डेवलपमेंट]</b> पर टैप करें',
		AndroidLowDebugStep5: '<i>5</i> <b>[USB डीबगिंग]</b> चेक करें',
		AndroidLowDebugStep6: '<i>6</i> <b>[ठीक]</b> टैप करें',
		AndroidHighDebugStep3: '<i>3</i> <b>[डेवलपर विकल्प]</b> पर टैप करें',
		AndroidHigherDebugStep3: '<i>3</i> <b>[फ़ोन के बारे में]</b> टैप करें',
		AndroidHigherDebugStep4: '<i>4</i> कई बार <b>[बिल्ड नंबर]</b> पर टैप करें',
		AndroidHigherDebugStep5: '<i>5</i> डेवलपर मोड सक्षम हो जाएगा',
		AndroidHigherDebugStep6: '<i>6</i> वापस जाएँ और <b>[डेवलपर विकल्प]</b> पर टैप करें',
		AndroidHigherDebugStep9: '<i>9</i> <b>[इस कंप्यूटर से हमेशा अनुमति दें]</b> चेक करें',
		
		SamsungHighDebugStep4: '<i>4</i> <b>[डेवलपर विकल्प]</b> चेक करें',
		SamsungHigherDebugStep3: '<i>3</i> <b>[अधिक]</b> पर टैप करें',
		SamsungHigherDebugStep4: '<i>4</i> <b>[डिवाइस के बारे में]</b> टैप करें',
		
		driver1 :'<i>3</i> <b>[इसके बारे में]</b> टैप करें',
		driver2 :'<i>4</i> <b>[सॉफ़्टवेयर जानकारी]</b> पर टैप करें',
		driver3 :'<i>8</i> <b>[वापस] </b> जाएँ और <b>[डेवलपर विकल्प]</b> पर टैप करें',
		driver4 :'<i>9</i> <b>[मुझसे दोबारा न पूछें]</b> चेक करें',
		driver5 :'<i>2</i> <b>[सामान्य]</b> पर टैप करें',
		driver6 :'<i>10</i> <b>[हाँ]</b> पर टैप करें',
		/*2014-6-12*/
		driver7:' <b>[यह फिर से न दिखाएँ]</b> चेक करें',
		/*2014-7-3*/
		usbDebugServiceText:"आप समर्थन के लिए हमारे स्थानीय ग्राहक सेवा केंद्र को भी कॉल कर सकते हैं",
		usbDebugCustomer:"ग्राहक सेवा केंद्र",
		usbDebugTitle: 'अपने फ़ोन को प्रबंधित करने के लिए कृपया USB डिबगिंग खोलें',
		
		/*2014wifi*/
		driverUsbConnect: 'USB कनेक्शन',
		driverWifiConnect: 'वाई-फ़ाई कनेक्शन',
		deviceBeen:"{0} डिवाइस का पता लगा है. कृपया कनेक्ट करें.",
		connectAnother:"दूसरे डिवाइस से कनेक्ट करें",
		pleaseDownMg:"कृपया अपने डिवाइस के लिए  <b>Mobogenie Helper</b> डाउनलोड करें.",
		alreadyHava:"मेरे पास Mobogenie Helper पहले से ही है",
		enterPass:"2.सत्यापन कोड दर्ज करें.",
		howtofind:"मैं सत्यापन कोड कैसे प्राप्त करूँ?",
		pleasePhoneOk:"कृपया अपने डिवाइस पर कनेक्शन अनुरोध स्वीकारें!",
		conncetionFailed:"कनेक्शन विफल. कृपया निम्न आइटम जाँचें: ",
		phoneWifiOpen:"कृपया जाँचें कि वाई-फ़ाई ऑन किया हुआ है या नहीं और क्या आपका डिवाइस भी उसी LAN पर है जिस पर PC है.",
		passwordOk:" क्या सत्यापन कोड सही है?",
		connectnix:"कनेक्शन विफल. डिवाइस ने आपका PC कनेक्शन अनुरोध अस्वीकार कर दिया!",
		
		contingDevice:"आपके डिवाइस को कनेक्ट किया जा रहा है...",
		updatingHelp:"Mobogenie हेल्पर अपडेट किया जा रहा है...",
		updateFailed:"Mobogenie अपडेट विफल रहा!",
		alreadyCon:"I've connected my USB cable",
		connectBtnText:"Connect",
		wifiScreen:"Unable to access phone screenshots via Wi-Fi.",
        
        //2014-10-14
		connectNoticeTitle: 'Please connect to your device.',
		helpisOpen:"Is Mobogenie Helper running on your phone?",
		//2014-10-20
		pleaseClick:"After installing, open Mobogenie Helper and click the button below to reconnect.",
		reConnectBtn:"Re-Connect",
		pleaseInstall:"Updated Mobogenie Helper has been sent. Please install it on your Android device.",
		scanBlow:"Scan the below QR code",
		downloadUsing:"Download using the below URL on your Android device",
		openHelpDevice:"1. Open Mobogenie Helper on your Android device.",
		
		/*2014-11-07修改*/
		connectFailedText:"Connect via Wi-Fi.",
		waitLong:"Taking too long? Tell us!",
		alreadyHava:"I have Mobogenie Helper on my phone. Next!",
		noHavaMobo:"I don't have Mobogenie Helper on my phone. Take me back!",
		tryConnectWifi:"Try connecting via Wi-Fi",
		/*2014-11-14增加*/
		driverWifiConnect: 'Wireless Connection',
		havaOpenUsb:"I've activated the USB function.",
		usbConnectFailed:"USB connection error",
		checkPhoneFailed: "A program is preventing your phone from connecting to your PC. Please close it and try again.",
		closeReConnect: "Close this program and re-connect to {0}."
    };
    return dictionary;
});
