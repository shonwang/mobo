define('english:driver', function(require, exports, module){
    var dictionary = {
		badNetworkTitle:'Bad network connection. Please check your network.',
		pictureGuide: 'Picture Guide',
		videoGuide: 'Video Guide',
		myVersion: 'My Android Version:',
		debugFootText: 'Still can\'t open USB Debugging?',
		oneClickSet: 'One-click setting',
		tryConnectText: 'Try unplugging and reconnecting the cable or restart your device.',
		butBack: 'Back',
		ContactSupport: 'Contact support',
		allowDebugText: 'Please press "OK" when asked whether to allow USB debugging.',
		allowDebugTip: "<i>1</i> Check this option",
		allowDebugOkTip: "<i>2</i> Tap <b>[OK]</b>",/*������50���ַ�*/
		butRetry: 'Can\'t see this popup?',
		butShowAgain: 'Show Again',
		stillNoSolove: 'Still not working?',
        debugTipText: 'Please download {0} (12KB) to your device',
        debugSetterContentText: ' [USB Debuger]',
		orText: 'OR',
		noSpaceHint: 'Not enough storage on your device.',
		noSpaceText: 'Mobogenie requires at least {0} of disk space.',
		needSpaceText: '10 MB',
		upSpaceText: 'Please uninstall some apps to free up some space.',
		butHaveSpace: 'I Have Enough Space',
		connectFailedTitle:'Oops. Connection failed.',
		connectFailedTryText: 'Try disconnecting and then reconnecting your device.',
		connectFailedRestart: 'Restart Mobogenie.',
		RestartDevice: 'Restart your PC and device.',
		
		connectionGuide:'Connection Guide',
		driverUsbTitle: 'Please connect your device via USB cable.',
		driverUsbText: 'After connecting your device, you\'ll be able to download games, apps, and more for free, as well as manage your device.',
		
		AndroidLowDebugStep1: '<i>1</i> Tap <b>[App Drawer]</b>',
		AndroidLowDebugStep2: '<i>2</i> Tap <b>[Settings]</b>',
		AndroidLowDebugStep3: '<i>3</i> Tap <b>[Applications]</b>',
		AndroidLowDebugStep4: '<i>4</i> Tap <b>[Development]</b>',
		AndroidLowDebugStep5: '<i>5</i> Check <b>[USB debugging]</b>',
		AndroidLowDebugStep6: '<i>6</i> Tap <b>[OK]</b>',
		AndroidHighDebugStep3: '<i>3</i> Tap <b>[Developer options]</b>',
		AndroidHigherDebugStep3: '<i>3</i> Tap <b>[About phone]</b>',
		AndroidHigherDebugStep4: '<i>4</i> Tap <b>[Build number]</b> seveal times',
		AndroidHigherDebugStep5: '<i>5</i> Developer mode will be enabled',
		AndroidHigherDebugStep6: '<i>6</i> Go back and tap <b>[Developer options]</b>',
		AndroidHigherDebugStep9: '<i>9</i> Check <b>[Always allow from this computer]</b>',
		
		SamsungHighDebugStep4: '<i>4</i> Check <b>[Developer options]</b>',
		SamsungHigherDebugStep3: '<i>3</i> Tap <b>[More]</b>',
		SamsungHigherDebugStep4: '<i>4</i> Tap <b>[About device]</b>',
		
		driver1 :'<i>3</i> Tap <b>[About]</b>',
		driver2 :'<i>4</i> Tap <b>[Software information]</b>',
		driver3 :'<i>8</i> Go <b>[back] </b> and tap <b>[Developer options]</b>',
		driver4 :'<i>9</i> Check <b>[Don\'t ask me again]</b>',
		driver5 :'<i>2</i> Tap <b>[General]</b>',
		driver6 :'<i>10</i> Tap <b>[Yes]</b>',
		/*2014-6-12*/
		driver7:' Check <b>[Don\'t show this again]</b>',
		
		/*2014-7-3*/
		usbDebugServiceText:"You can also call our local customer service for support",
		usbDebugCustomer:"Customer Service",
		usbDebugTitle: 'Please open USB Debugging to manage your phone',
		
		/*2014wifi*/
		driverUsbConnect: 'USB Connection',
		deviceBeen:"{0} devices have been detected. Please connect.",
		connectAnother:"Connect Another Device",
		pleaseDownMg:"Please download<b>Mobogenie Helper</b>on your device.",
		alreadyHava:"I already have a Mobogenie Helper",
		enterPass:"2.Enter the verification code.",
		howtofind:"How do I find the verification code?",
		pleasePhoneOk:"Please accept the connection request on your device!",
		conncetionFailed:"Connection failed. Please check the following items: ",
		phoneWifiOpen:"Please ensure that the mobile network is under the same WiFi environment with PC",
		passwordOk:" Is the verification code correct?",
		connectnix:"Connection failed. The device refused your PC connection request!",
		
		contingDevice:"Connecting your device...",
		updatingHelp:"Updating Mobogenie Helper...",
		updateFailed:"Mobogenie update failed!",
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