define('chinese:driver', function(require, exports, module){
    var dictionary = {
		badNetworkTitle:'您的网络好像不太好，请检查您的网络连接',
		pictureGuide: '图片教程',
		videoGuide: '视频教程',
		myVersion: '我的Android版本',
		debugFootText: '仍然无法打开USB调试模式？',
		oneClickSet: '一键打开',
		tryConnectText: '尝试拔出手机并重新连接或者重启您的手机',
		butBack: '返回',
		ContactSupport: '联系客服',
		allowDebugText: '请在您的手机屏幕上点击“确定”按键',
		allowDebugTip: "1.勾选该选项",
		allowDebugOkTip: "2.点击确定",/*不超过50个字符*/
		butRetry: '没有看到这个弹窗？',/*不超过60个字符*/
		butShowAgain: '显示弹窗',
		stillNoSolove: '仍然无法解决？',
        debugTipText: '请手动下载{0}（12KB）到您的设备上',
        debugSetterContentText: ' [USB Debuger]',
		orText: '或',
		noSpaceHint: '您设备的存储空间不足！',
		noSpaceText: 'Mobogenie需要的存储空间至少为{0}。',
		needSpaceText: '10 MB',
		upSpaceText: '请卸载一些应用程序以释放设备存储空间！',
		butHaveSpace: '已有足够的空间',
		connectFailedTitle:'连接设备失败',
		connectFailedTryText: '请尝试断开您的设备并重新连接',
		connectFailedRestart: '重启Mobogenie',
		RestartDevice: '重启您的电脑和手机',
		connectFailedText: '如果还是无法连接上设备，你可以阅读我们的常见问题，或直接反馈给我们',
		
		connectionGuide:'连接向导',
		driverUsbTitle: '请通过USB数据线连接您的设备！',
		driverUsbText: '连接您的设备后，您可以免费下载游戏、应用和更多有趣的资源，还可以轻松地管理您的设备数据！',
		
		AndroidLowDebugStep1: '1. 点击 <span>[应用程序]</span>',
		AndroidLowDebugStep2: '2. 点击 <span>[设置]</span>',
		AndroidLowDebugStep3: '3. 点击 <span>[应用]</span>',
		AndroidLowDebugStep4: '4. 点击 <span>[开发]</span>',
		AndroidLowDebugStep5: '5. 勾选 <span>[USB调试]',
		AndroidLowDebugStep6: '6. 点击 <span>[确定]',
		AndroidHighDebugStep3: '3. 点击 <span>[开发者选项]</span>',
		AndroidHigherDebugStep3: '3. 点击 <span>[关于手机]</span>',
		AndroidHigherDebugStep4: '4. 连续点击 <span>[版本号]</span> 几次',
		AndroidHigherDebugStep5: '5. 开发者模式已经打开',
		AndroidHigherDebugStep6: '6. 返回并点击 <span>[开发者选项]',
		AndroidHigherDebugStep9: '9. 勾选 <span>[一律允许使用这台计算机进行调试]</span>',
		
		SamsungHighDebugStep4: '4. 打开 <span>[开发者选项]</span>',
		SamsungHigherDebugStep3: '3. 点击 <span>[更多]</span>',
		SamsungHigherDebugStep4: '4. 点击 <span>[关于设备]</span>',
		driver1 :'<i>3</i> 点击 <b>[关于]</b>',
		driver2 :'<i>4</i> 点击 <b>[系统信息]</b>',
		driver3 :'<i>8</i> 点击 <b>[返回] </b> 再点击 <b>[开发者选项]</b>',
		driver4 :'<i>9</i> 勾选 <b>[不再提示]</b>',
		driver5 :'<i>2</i> 点击 <b>[通用]</b>',
		driver6 :'<i>10</i> 点击 <b>[是]</b>',
		/*2014-6-12*/
		driver7:' 勾选 <b>[不再提示]</b>',
		
		/*2014-7-3*/
		usbDebugServiceText:"您可以拨打以下电话联系当地客服人员",
		usbDebugCustomer:"联系客服",
		usbDebugTitle: '请打开[USB调试]后才可以管理您的设备',
		
		/*2014wifi*/
		driverUsbConnect: 'USB Connection',
		driverWifiConnect: 'Wi-Fi Connection',
		deviceBeen:"{0} devices have been detected. Please connect.",
		connectAnother:"Connect Another Device",
		pleaseDownMg:"Please download<b>Mobogenie Helper</b>(575KB) on your device.",
		alreadyHava:"I already have a Mobogenie Helper",
		enterPass:"Enter the verification code.",
		howtofind:"How do I find the verification code?",
		pleasePhoneOk:"Please accept the connection request on your device!",
		conncetionFailed:"Connection failed. Please check the following items: ",
		phoneWifiOpen:"Please check whether Wi-Fi is on and if your device is on the same LAN as the PC",
		passwordOk:" Is the verification code correct?",
		connectnix:"Connection failed. The device refused your PC connection request!",
		
		contingDevice:"Connecting your device...",
		updatingHelp:"正在更新Mobogenie Helper",
		pleaseInstall:"请在您的设备上完成Mobogenie Helper的安装",
		updateFailed:"Mobogenie更新失败！",
		alreadyCon:"Already connected",
		connectBtnText:"Connect",
		wifiScreen:"WIFI连接下无法获得手机屏幕截图",
        
        //2014-10-14
        connectNoticeTitle: 'Please connect your device.',
    };
    return dictionary;
});