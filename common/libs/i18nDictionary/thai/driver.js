define('thai:driver', function(require, exports, module){
    var dictionary = {
		badNetworkTitle:'การเชื่อมต่อเครือข่ายขัดข้อง โปรดตรวจสอบเครือข่าย.',/*不超过70个字符*/
		pictureGuide: 'ภาพแนะแนว',/*不超过26个字符*/
		videoGuide: 'วีดีโอแนะแนว',/*不超过26个字符*/
		myVersion: 'เวอร์ชั่น Android ของฉัน:',/*不超过26个字符*/
		debugFootText: 'ยังไม่สามารถเปิด USB Debugging?',/*不超过40个字符*/
		oneClickSet: 'การตั้งค่าแบบคลิกเดียว',/*不超过30个字符*/
		tryConnectText: 'ให้ลองถอดสายเคเบิลแล้วเสียบใหม่หรือรีสตาร์ทอุปกรณ์',/*不超过70个字符*/
		butBack: 'กลับไป',
		ContactSupport: 'ติดต่อฝ่ายบริการลูกค้า',/*不超过30个字符*/
		allowDebugText: 'โปรดกด "ตกลง" เมื่อมีคำถามว่าคุณต้องการอนุญาต  USB debugging หรือไม่',/*不超过70个字符*/
		allowDebugTip: "<i>1</i> ตรวจสอบตัวเลือกนี้",/*不超过50个字符*/
		allowDebugOkTip: "<i>2</i> แตะ <b>[ตกลง]</b>",/*不超过50个字符*/
		butRetry: 'คุณไม่เห็นป็อปอัพนี้?',/*不超过60个字符*/
		butShowAgain: 'แสดงอีกครั้ง',/*不超过25个字符*/
		stillNoSolove: 'ยังคงใช้ไม่ได้?',
        debugTipText: 'โปรดดาวน์โหลด {0} (12KB) มายังอุปกรณ์',/*不超过50个字符*/
        debugSetterContentText: ' [ตัวตรวจสอบ USB]',/*不超过20个字符*/
		orText: 'หรือ',
		noSpaceHint: 'อุปกรณ์มีพื้นที่จัดเก็บข้อมูลไม่เพียงพอ',/*不超过60个字符*/
		noSpaceText: 'Mobogenie ต้องใช้พื้นที่ในดิสก์อย่างน้อย {0}',/*不超过50个字符*/
		needSpaceText: '10 MB',
		upSpaceText: 'โปรดถอนการติดตั้งแอพบางตัวเพื่อเพิ่มพื้นที่',/*不超过60个字符*/
		butHaveSpace: 'ฉันมีพื้นที่เพียงพอ',/*不超过32个字符*/
		connectFailedTitle:'โอ๊ะ. การเชื่อมต่อล้มเหลว.',
		connectFailedTryText: 'ลองตัดการเชื่อมต่อกับอุปกรณ์แล้วเชื่อมต่อใหม่',/*不超过90个字符*/
		connectFailedRestart: 'รีสตาร์ท Mobogenie',/*不超过90个字符*/
		RestartDevice: 'รีสตาร์ท PC และอุปกรณ์',/*不超过90个字符*/
		connectFailedText: 'หากยังไม่สามารถแก้ไขปัญหาได้ คุณสามารถอ่าน FAQ หรือแจ้งปัญหากับเรา',/*不超过90个字符*/
		
		connectionGuide:'คำแนะนำในการเชื่อมต่อ',
		driverUsbTitle: 'โปรดเชื่อมต่ออุปกรณ์ผ่านสาย USB',/*不超过50个字符*/
		driverUsbText: 'หลังจากเชื่อมต่ออุปกรณ์ คุณจะสามารถดาวน์โหลดเกม แอพ และอื่นๆ ได้ฟรี และจัดการอุปกรณ์ของคุณได้ด้วย.',
		
		AndroidLowDebugStep1: '<i>1</i> แตะ <b>[ลิ้นชักแอพ]</b>',/*不超过60个字符*/
		AndroidLowDebugStep2: '<i>2</i> แตะ <b>[การตั้งค่า]</b>',/*不超过60个字符*/
		AndroidLowDebugStep3: '<i>3</i> แตะ <b>[แอพพลิเคชั่น]</b>',/*不超过60个字符*/
		AndroidLowDebugStep4: '<i>4</i> แตะ <b>[การพัฒนา]</b>',/*不超过60个字符*/
		AndroidLowDebugStep5: '<i>5</i> ทำเครื่องหมาย <b>[USB debugging]</b>',/*不超过60个字符*/
		AndroidLowDebugStep6: '<i>6</i> แตะ <b>[ตกลง]</b>',/*不超过60个字符*/
		AndroidHighDebugStep3: '<i>3</i> แตะ <b>[ตัวเลือกผู้พัฒนา]</b>',/*不超过60个字符*/
		AndroidHigherDebugStep3: '<i>3</i> แตะ <b>[เกี่ยวกับโทรศัพท์]</b>',/*不超过60个字符*/
		AndroidHigherDebugStep4: '<i>4</i> แตะ <b>[หมายเลขรุ่น]</b> หลายๆ ครั้ง',/*不超过60个字符*/
		AndroidHigherDebugStep5: '<i>5</i> เป็นการเปิดใช้งานโหมดผู้พัฒนา',/*不超过60个字符*/
		AndroidHigherDebugStep6: '<i>6</i> ย้อนกลับและแตะ <b>[ตัวเลือกผู้พัฒนา]',/*不超过60个字符*/
		AndroidHigherDebugStep9: '<i>9</i> ทำเครื่องหมาย <b>[อนุญาตเสมอจากคอมพิวเตอร์นี้]</b>',/*不超过60个字符*/
		
		SamsungHighDebugStep4: '<i>4</i> ทำเครื่องหมาย <b>[ตัวเลือกผู้พัฒนา]</b>',/*不超过60个字符*/
		SamsungHigherDebugStep3: '<i>3</i> แตะ <b>[เพิ่มเติม]</b>',/*不超过60个字符*/
		SamsungHigherDebugStep4: '<i>4</i> แตะ <b>[เกี่ยวกับอุปกรณ์]</b>',/*不超过60个字符*/
		
		driver1 :'<i>3</i> แตะ <b>[เกี่ยวกับ]</b>',
		driver2 :'<i>4</i> แตะ <b>[ข้อมูลซอฟต์แวร์]</b>',
		driver3 :'<i>8</i> ไปที่ <b>[ย้อนกลับ]</b> และแตะ <b>[ตัวเลือกผู้พัฒนา]</b>',
		driver4 :'<i>9</i> ตรวจสอบ <b>[ไม่ต้องถามอีก]</b>',
		driver5 :'<i>2</i> แตะ <b>[ทั่วไป]</b>',
		driver6 :'<i>10</i> แตะ <b>[ใช่]</b>',
		/*2014-6-12*/
		driver7:' ตรวจสอบ <b>[ไม่ต้องถามอีก]</b>',
		
		/*2014-7-3*/
		usbDebugServiceText:"คุณสามารถโทรไปที่ฝ่ายบริการลูกค้าในพื้นที่เพื่อรับบริการได้อีกด้วย",
		usbDebugCustomer:"ฝ่ายบริการลูกค้า",
		usbDebugTitle: 'โปรดเปิด USB Debugging เพื่อจัดการโทรศัพท์ของคุณ',
		
		/*2014wifi*/
		driverUsbConnect: 'การเชื่อมต่อUSB',
		deviceBeen:"{0} ตรวจสอบพบอุปกรณ์.กรุณาเชื่อมต่อไว้",
		connectAnother:"ไม่สามารถเชื่อมต่ออุปกรณ์อื่น",
		pleaseDownMg:"กรุณาดาวน์โหลด <b>Mobogenie Helper</b> ไปยังอุปกรณ์ของคุณ",
		alreadyHava:"ฉันมี Mobogenie Helper แล้ว",
		enterPass:"2.กรุณาใส่รหัสยืนยัน",
		howtofind:"ฉันจะหารหัสยืนยันได้อย่างไร?",
		pleasePhoneOk:"กรุณายอมรับการร้องขอในการเชื่อมต่ออุปกรณ์ของคุณ!",
		conncetionFailed:"เชื่อมต่อไม่สำเร็จ. กรุณาตรวจสอบรายการดังต่อไปนี้:",
		phoneWifiOpen:"กรุณาตรวจสอบว่า Wi-Fi กำลังเปิดใช้งานอยู่และอุปกรณ์ของคุณอยู่ในเครือข่าย LAN เดียวกับ PC",
		passwordOk:"รหัสยืนยันถูกต้องหรือไม่?",
		connectnix:"เชื่อมต่อไม่สำเร็จ. อุปกรณ์ได้ปฏิเสธการร้องขอการเชื่อมต่อกับ PC ของคุณ",
		
		contingDevice:"กำลังเชื่อมต่ออุปกรณ์ของคุณ...",
		updatingHelp:"กำลังอัพเดท Mobogenie Helper...",
		updateFailed:"อัพเดท Mobogenie update ไม่สำเร็จ!",
		alreadyCon:"ฉันได้เชื่อมต่อสาย USB ของฉันแล้ว",
		connectBtnText:"เชื่อมต่อ",
		wifiScreen:"ไม่สามารถเข้าถึงภาพหน้าจอของอุปกรณ์ผ่าน Wi-Fi.",
		
		//2014-10-14
		connectNoticeTitle: 'กรุณาเชื่อมต่ออุปกรณ์ของคุณ.',
		helpisOpen:"คุณได้เปิดการใช้งาน Mobogenie Helper อยู่รึเปล่า?",
		//2014-10-20
		pleaseClick:"หลังจากการติดตั้ง, กรุณาเปิดใช้งาน Mobogenie Helper และคลิ๊กที่ปุ่มด้านล่างเพื่อเชื่อมต่ออีกครั้ง.",
		reConnectBtn:"เชื่อมต่ออีกครั้ง",
		pleaseInstall:"การอัพเดท Mobogenie Helper ได้ถูกส่งแล้ว. กรุณาติดตั้งบนอุปกรณ์ของคุณ.",
		scanBlow:"สแกน QR code ด้านล่าง",
		downloadUsing:"ดาวน์โหลดการใช้งานจาก URL ด้านล่างบนอุปกรณ์แอนดรอยของคุณ",
		openHelpDevice:"1. เปิดใช้งาน Mobogenie Helper บนอุปกรณ์แอนดรอยของคุณ.",
		
		/*2014-11-07修改*/
		connectFailedText:"เชื่อมต่อผ่าน Wi-Fi.",
		waitLong:"ใช้เวลานานเกินไป? บอกเราสิ!",
		alreadyHava:"ฉันมี Mobogenie Helper อยู่ในอุปกรณ์ของฉันแล้ว. ต่อไป!",
		noHavaMobo:"ฉันยังไม่มี Mobogenie Helper อยู่ในอุปกรณ์ของฉัน. เอาฉันกลับมานะ!",
		tryConnectWifi:"Try connecting via Wi-Fi",
		/*2014-11-14增加*/
		driverWifiConnect: 'การเชื่อมต่อไร้สาย',
		havaOpenUsb:"ฉันได้เปิดใช้งานฟังค์ชั่น  USB แล้ว.",
		usbConnectFailed:"การเชื่อมต่อ USB ผิดพลาด",
		checkPhoneFailed: "โปรแกรมได้ทำการป้องกันการเชื่อมต่ออุปกรณ์ของคุณจากการเชื่อมต่อไปยัง PC ของคุณ.กรุณาปิดและลองใหม่อีกครั้ง.",
		closeReConnect: " ปิดโปรแกรมนี้และเชื่อมต่อใหม่ {0}."

    };
    return dictionary;
});