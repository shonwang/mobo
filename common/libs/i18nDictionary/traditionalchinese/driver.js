define('traditionalchinese:driver', function(require, exports, module){
    var dictionary = {
		badNetworkTitle:'您的網絡異常，請檢查您的網絡連接',
		pictureGuide: '圖片教學',
		videoGuide: '影片教學',
		myVersion: '我的Android版本',
		debugFootText: '仍然無法開啟USB調試模式？',
		oneClickSet: '一鍵開啟',
		tryConnectText: '嘗試拔出手機並重新連接或者重新啟動您的手機',
		butBack: '返回',
		ContactSupport: '聯絡客服',
		allowDebugText: '請在您的手機屏幕上點擊「確定」按鍵',
		allowDebugTip: "<i>1</i>勾選該選項",
		allowDebugOkTip: "<i>2</i>點擊確定",/*不超过50个字符*/
		butRetry: '沒有看到這個彈出視窗？',/*不超过60个字符*/
		butShowAgain: '顯示彈出視窗',
		stillNoSolove: '仍然無法解決？',
        debugTipText: '請手動下載{0}（12KB）到您的設備上',
        debugSetterContentText: ' [USB Debuger]',
		orText: '或',
		noSpaceHint: '設備的儲存空間不足！',
		noSpaceText: 'Mobogenie需要的儲存空間至少為{0}。',
		needSpaceText: '10 MB',
		upSpaceText: '請解除安裝一些應用程式以釋放儲存空間！',
		butHaveSpace: '已有足夠的空間',
		connectFailedTitle:'連接設備失敗',
		connectFailedTryText: '請嘗試中斷您的設備並重新連接',
		connectFailedRestart: '重新開啟Mobogenie',
		RestartDevice: '重新開啟您的電腦和手機',
		connectFailedText: '如果還是無法連接設備，您可以閱讀我們的常見問題，或直接給我們回饋',
		
		connectionGuide:'連接指南',
		driverUsbTitle: '請通過USB數據線連接您的設備！',
		driverUsbText: '連接您的設備後，您可以免費下載遊戲、應用程式和更多有趣的資源，還可以輕鬆地管理您的設備數據！',
		
		AndroidLowDebugStep1: '<i>1</i> 點擊 <b>[應用程式]</b>',
		AndroidLowDebugStep2: '<i>2</i> 點擊 <b>[設置]</b>',
		AndroidLowDebugStep3: '<i>3</i> 點擊 <b>[應用程式]</b>',
		AndroidLowDebugStep4: '<i>4</i> 點擊 <b>[開發]</b>',
		AndroidLowDebugStep5: '<i>5</i> 勾选 <b>[USB調試]</b>',
		AndroidLowDebugStep6: '<i>6</i> 點擊 <b>[確定]</b>',
		AndroidHighDebugStep3: '<i>3</i> 點擊 <b>[開發者選項]</b>',
		AndroidHigherDebugStep3: '<i>3</i> 點擊 <b>[關於手機]</b>',
		AndroidHigherDebugStep4: '<i>4</i> 連續點擊 <b>[版本]</b> 幾次',
		AndroidHigherDebugStep5: '<i>5</i> 開發者模式已經開啟',
		AndroidHigherDebugStep6: '<i>6</i> 返回並點擊 <b>[開發者選項]</b>',
		AndroidHigherDebugStep9: '<i>9</i> 勾選 <b>[一律允許使用這台電腦進行調試]</b>',
		
		SamsungHighDebugStep4: '<i>4</i> 開啟 <b>[開發者選項]</b>',
		SamsungHigherDebugStep3: '<i>3</i> 點擊 <b>[更多]</b>',
		SamsungHigherDebugStep4: '<i>4</i> 點擊 <b>[關於設備]</b>',
		driver1 :'<i>3</i> 點擊 <b>[關於]</b>',
		driver2 :'<i>4</i> 點擊<b>[系統信息]</b>',
		driver3 :'<i>8</i> 點擊<b>[返回] </b> 再點擊<b>[開發者選項]</b>',
		driver4 :'<i>9</i> 勾選<b>[不再提示]</b>',
		driver5 :'<i>2</i> 點擊 <b>[通用]</b>',
		driver6 :'<i>10</i> 點擊 <b>[是]</b>',
		/*2014-6-12*/
		driver7:' 勾選 <b>[不再提示]</b>',
		
		/*2014-7-3*/
		usbDebugServiceText:"您可以撥打以下電話聯繫當地客服人員",
		usbDebugCustomer:"聯絡客服",
		usbDebugTitle: '請打開[USB調試]後才可以管理您的設備',
		
		/*2014wifi*/
		driverUsbConnect: 'USB連接',
		driverWifiConnect: 'Wi-Fi連接',
		deviceBeen:"已檢測到{0}個設備，請連接",
		connectAnother:"連接其它設備",
		pleaseDownMg:"請下載 <b>Mobogenie Helper</b>到您的設備上",
		alreadyHava:"我已經安裝了Mobogenie Helper",
		enterPass:"2.輸入驗證碼",
		howtofind:"怎麼找到驗證碼？",
		pleasePhoneOk:"請在手機上接受PC連接請求！",
		conncetionFailed:"連接失敗，請檢查以下步驟是否正確：",
		phoneWifiOpen:"手機Wi-Fi是否已開啟，並與PC在同一個局域網內",
		passwordOk:"驗證碼是否輸入正確",
		connectnix:"連接失敗，手機拒絕了您PC的連接請求！",
		
		contingDevice:"正在連接您的裝置...",
		updatingHelp:"正在更新Mobogenie Helper",
		updateFailed:"Mobogenie更新失敗！",
		alreadyCon:"我已經連接數據線",
		connectBtnText:"連接",
		wifiScreen:"WiFi連接下無法獲得手機屏幕擷圖",
		
		//2014-10-14
		connectNoticeTitle: '請連接您的設備',
		helpisOpen:"手機上Mobogenie Helper是否已開啟",
		//2014-10-20
		pleaseClick:"安裝完成後請在手機上重新啟動Mobogenie Helper，並且點擊以下按鈕重新連接裝置。",
		reConnectBtn:"重新連接",
		pleaseInstall:"升級包已發送到您的裝置，請在您的裝置上完成Mobogenie Helper 新版本的安裝。",
		scanBlow:"掃描下面的二維碼下載",
		downloadUsing:"在您的手機瀏覧器上輸入下面網址下載",
		openHelpDevice:"1. 在您的裝置上啟動Mobogenie Helper。",
		/*2014-11-07修改*/
		connectFailedText:"經 Wi-Fi 連接",
		waitLong:"花太長時間了？告訴我們吧！",
		alreadyHava:"我的手機已存在 Mobogenie Helper，下一步！",
		noHavaMobo:"我的手機上沒有 Mobogenie Helper，請返回！",
		tryConnectWifi:"Try connecting via Wi-Fi",
		/*2014-11-14增加*/
		driverWifiConnect: '無線連接',
		havaOpenUsb:"我已經啟動USB功能",
		usbConnectFailed:"USB連接異常",
		checkPhoneFailed: "有一程式在防止您的手機連接您的電腦。請把它關閉後再試。",
		closeReConnect: "關閉此程式並重新連接至 {0}"
    };
    return dictionary;
});