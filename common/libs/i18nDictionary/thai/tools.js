define('thai:tools', function(require, exports, module){
    var dictionary = {
		managementTool:'เครื่องมือการจัดการ',
		backup:'การสำรอง',/*不超过20个字符*/
		backupIntro:'สำรองข้อมูลทั้งหมดจากอุปกรณ์ Android ไปยัง PC',/*不超过58个字符*/
		restore:'คืนค่า',/*不超过20个字符*/
		restoreIntro:'คืนค่าข้อมูลจากการสำรองข้อมูลล่าสุด',/*不超过58个字符*/
		fileManager:'ตัวจัดการไฟล์',/*不超过20个字符*/
		fileManagerIntro:'ดูไฟล์และโฟลเดอร์บนอุปกรณ์',/*不超过58个字符*/
		screenshot:'ภาพหน้าจอ',/*不超过20个字符*/
		screenshotIntro:'ถ่ายภาพหน้าจอของหน้าจอมือถือ',/*不超过58个字符*/
		deviceInfoIntro:'ดูข้อมูลอุปกรณ์โดยละเอียด',/*不超过58个字符*/
		installApp:'ติดตั้งแอพ/ไฟล์เกม',/*不超过20个字符*/
		installAppIntro:'ติดตั้งชุดไฟล์ apk บนอุปกรณ์',/*不超过58个字符*/
		advancedTool:'เครื่องมือขั้นสูง',
		root:'การรูทด้วยคลิกเดียว',/*不超过20个字符*/
		rootIntro:'รูทอุปกรณ์เพื่อเรียกคืนหน่วยความจำเพิ่มเติม',//*不超过58个字符*/
		importOutlook:'นำเข้าข้อมูล Outlook',/*不超过20个字符*/
		importOutlookIntro:'นำเข้าที่ติดต่อ Outlook จาก PC ไปยังอุปกรณ์ Android',/*不超过58个字符*/
		importSymbian:'นำเข้าข้อมูล Symbian',/*不超过20个字符*/
		importSymbianIntro:'นำเข้าที่ติดต่อ Symbian ไปยังอุปกรณ์ Android',/*不超过58个字符*/
		freeWifi:'Wi-Fi ฟรี',/*不超过20个字符*/
		freeWifiIntro:'แบ่งปันเครือข่ายแล็ปทอปกับอุปกรณ์ผ่าน Wi-Fi',/*不超过58个字符*/
		
		/*device info*/
		basicInfo:'ข้อมูลพื้นฐาน',
		modelNumber:'หมายเลขรุ่น:',/*不超过19个字符*/
		androidVer:'รุ่นระบบ Android:',/*不超过19个字符*/
		screenResoltion:'ความละเอียดหน้าจอ:',/*不超过19个字符*/
		battery:'แบตเตอรี่:',/*不超过19个字符*/
		cpu:'CPU:',/*不超过19个字符*/
		ram:'RAM:',/*不超过19个字符*/
		memory:'หน่วยความจำ:',/*不超过19个字符*/
		sdCard:'การ์ด SD:',/*不超过19个字符*/
		isRooted:'รูทแล้ว:',/*不超过19个字符*/
		hardwareInfo:'ข้อมูลฮาร์ดแวร์',/*不超过19个字符*/
		imei:'IMEI:',/*不超过19个字符*/
		serialNumber:'หมายเลขผลิตภัณฑ์:',/*不超过19个字符*/
		imsi:'IMSI:',/*不超过19个字符*/
		macAddress:'MAC Address:',/*不超过19个字符*/
		basebandVer:'เวอร์ชั่น Baseband:',/*不超过19个字符*/
		kernelVer:'เวอร์ชั่น Kernel:',/*不超过19个字符*/
		copy:'คัดลอก',/*不超过8个字符*/
		copySuccess:'ทำสำเนาไปยังคลิปบอร์ด',
		unknownError: 'ข้อผิดพลาดที่ไม่รู้จัก',
		unKnownText:'เกิดข้อผิดพลาดที่ไม่รู้จัก',
		netWorkError:'เครือข่ายมีข้อผิดพลาด',
		netWorkErrorText:'โปรดตรวจสอบการเชื่อมต่อเครือข่าย',
		/*2014-09-11*/
		pcCleanerLabel:"PC Cleaner",
		scanOver:"แสกนสำเร็จ! {0} ไฟล์ขยะและ {1} ไฟล์รีจิสทรีสามารถทำความสะอาดได้.",
		cleanBtn:"ทำความสะอาด",
		lessBrowser:"ขยะอินเทอร์เนท",
		lessHistory:"ตกค้าง",
		lessCommonUes:'ขยะซอฟท์แวร์',
		lessSystem:'ขยะระบบ',
		lessDelete:"ถังขยะรีไซเคิล",
		lessUsuse:"ขยะรีจิสทรี",
		selectedLess:"เลือก",
		conScan:"สแกนอีกครั้ง",
		cleanText:"ช่วยจัดการทำความสะอาดขยะอินเทอร์เนท,ขยะระบบ,ขยะซอฟท์แวร์และอีกมากมาย!",
		
		cleanFinish:"ทำความสะอาดเสร็จแล้ว!",
		someFile:"ไฟล์และรีจิสทรีบางส่วนจะถูกลบออกหลังจากคุณรีสตาร์ทคอมพิวเตอร์ของคุณ.",
		cleanOver:"{0} ไฟล์ขยะและ {1} ไฟล์รีจิสทรีได้ถูกกำจัดแล้ว!",
		wifiConNot:"ฟังก์ชั่นนี้ไม่สามารถใช้งานได้กับ Wi-Fi.",
		/*2014-11-03*/
		cleanFinished:"เสร็จเรียบร้อย",
		/*2014-11-03 wifi hotpot*/
		deviceConnectingList:"เชื่อมต่อไปยัง {0}",
		startingWifiTitle:"กำลังเริ่ม free Wi-Fi...",
		hasNoWIfiTitle:"PC ของคุณไม่มี Wi-Fi.",
		iHaveWifi:"ฉันมี Wi-Fi.",
		wifiNameLabel:"ชื่อ Wi-Fi: ",
		wifiPasswordLabel:"รหัสผ่าน Wi-Fi: ",
		speedLabel:"ความเร็ว",
		devicesConnectedTitle:"{0} อุปกรณ์ที่เชื่อมต่อ.",
		closeWifiLabel:"ปิด Wi-Fi",
		deviceBlackList:"บัญชีดำ",
		deviceBlackList2:"บัญชีดำ {0}",
		moveOutBlackList:"ถอดออก",
		downloadSpeedLabel:"ความเร็วดาวน์โหลด",
		uploadSpeedLabel:"ความเร็วอัพโหลด",
		limitSpeedLabel:"จำกัดความเร็ว",
		pleaseWriteNum:"กรุณาใส่ 1-12 ตัวอักษร, ตัวเลขหรือขีดเส้นใต้.",
		moboWifi:"Mobogenie Wi-Fi",
		setBlackValidateNextTime:"บัญชีดำจะมีผลหลังจากคุณเริ่มใช้งาน Free Wi-Fiใหม่อีกครั้งเท่านั้น.",
		//2014-11-12
		pleaseWriteDeviceNameValid:"กรุณาใส่ตัวอักษร 1-12 ตัว.",
		
		//2014-11-14
		haveNoWifiAdapter:"ไม่สามารถตรวจพบ USB Wi-Fi Adapter ",
		solutionLabel:"วิธีแก้ไขปัญหา",
		solutionPluginTitle:"เสียบ Wi-Fi Adapter เพื่อเปิดการใช้งาน free Wi-Fi service.",
		solutionSwitchLaptop:"สลับไปยังแลปท๊อป."

    };
    return dictionary;
});