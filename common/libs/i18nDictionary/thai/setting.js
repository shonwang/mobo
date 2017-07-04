define('thai:setting', function(require, exports, module){
    var dictionary = {
    	aboutMe:'เกี่ยวกับ Mobogenie',/*不超过18个字符*/
		aboutMeVersion:'เวอร์ชั่น: {0}',/*不超过22个字符*/
		MGWebsite:'เว็บไซต์:',/*不超过35个字符*/
		MGForums:'กระดานสนทนา:',/*不超过35个字符*/
		aboutMeLinkPolicy: 'นโยบายความเป็นส่วนตัว',/*不超过35个字符*/
		aboutMeLinkEULA: 'ข้อตกลงการอนุญาตใช้งานสำหรับผู้ใช้',/*不超过35个字符*/
		aboutMeLinkTOS: 'เงื่อนไขการให้บริการ',/*不超过35个字符*/
		aboutMeFootText: '©2014 Mobogenie.com All Rights Reserved',/*不超过70个字符*/
		feedback:'ความเห็น',
        fbEmailFormatFailed: 'อีเมลไม่ถูกต้อง',/*不超过60个字符*/
        BtnSubmit: 'ส่ง',
        fbSuccessTitle: 'ขอบคุณสำหรับความเห็นของคุณ.',/*不超过45个字符*/
        fbSuccessText: 'ฝ่ายบริการลูกค้าของเราจะติดต่อกลับโดยเร็วที่สุด โปรดตรวจสอบกล่องจดหมายของคุณ.',/*不超过150个字符*/
       
        setting: 'การตั้งค่า',/*不超过18个字符*/
        checkForUpdates: 'ตรวจสอบการอัปเดต',/*不超过18个字符*/
        whatNew: 'มีอะไรใหม่',/*不超过18个字符*/
        ContactUs: 'ติดต่อเรา',/*不超过18个字符*/
        
		generalLabel: 'ทั่วไป',/*不超过13个字符*/
		LocationsLabel: 'ตำแหน่ง',/*不超过13个字符*/
		AppllicationsLabel: 'แอพพลิเคชั่น',/*不超过13个字符*/
		remindersLabel: 'การแจ้งเตือน',/*不超过13个字符*/
		Language: 'ภาษา',/*不超过62个字符*/
		generalStartupTitle: 'ในระหว่างเริ่มทำงาน',/*不超过62个字符*/
		generalStartupText:'ทำงานที่ยังไม่เสร็จสิ้นโดยอัตโนมัติ',/*不超过62个字符*/
		generalConnetTitle: 'เมื่อเชื่อมต่อบนอุปกรณ์',/*不超过62个字符*/
		generalConnetText: 'เปิด Mobogenie เสมอ',/*不超过62个字符*/
		generalConnetTextTwo: ' ติดตั้งแอพที่ดาวน์โหลดโดยอัตโนมัติ',/*不超过62个字符*/
		generalCloseTitle: 'เมื่อปิด',/*不超过62个字符*/
		generalCloseText: ' ย่อไคลเอนต์ไปยังถาด',/*不超过62个字符*/
		generalCloseTextTwo: 'ออกจากไคลเอนต์',/*不超过62个字符*/
		generalCloseTextThree: 'เตือนฉันทุกครั้ง',/*不超过62个字符*/
		generalUpdateTitle: 'อัปเดตไคลเอนต์',/*不超过62个字符*/
		generalUpdateText: 'อัปเดตไคลเอนต์เป็นเวอร์ชั่นล่าสุดโดยอัตโนมัติ',/*不超过62个字符*/
		locationsResource: 'ดาวน์โหลดแหล่งข้อมูล',/*不超过62个字符*/
		locationsBackup: 'ตำแหน่งข้อมูลสำรอง',/*不超过62个字符*/
		locationsScreen: 'ตำแหน่งภาพจับหน้าจอ',/*不超过62个字符*/
		locationsBtn: 'เลือก...',/*不超过12个字符*/
		appllicationsFileTitle: 'การเชื่อมโยงของไฟล์',/*不超过62个字符*/
		appllicationsFileText: 'ทำเครื่องหมายหากไฟล์ .apk  เชื่อมโยงกับ Mobogenie',/*不超过62个字符*/
        appllicationsLatestTitle: 'อัพเดตอัตโนมัติแอพล่าสุด',
		appllicationsLatestText: 'ดาวน์โหลดแอพที่อัปเดตได้ล่าสุดโดยอัตโนมัติ',/*不超过62个字符*/
		appllicationsDefaultTitle: 'ตำแหน่งติดตั้งเริ่มต้น',/*不超过62个字符*/
		appllicationsDefaultText: ' อัตโนมัติ (หากติดตั้งบนการ์ด SD ล้มเหลว จะติดตั้งบนอุปกรณ์)',/*不超过62个字符*/
		appllicationsDefaultTextTwo: 'หน่วยความจำอุปกรณ์',/*不超过62个字符*/
		appllicationsDefaultTextThree: 'การ์ด SD ภายนอก (รองรับ Android 2.2 และสูงกว่าเท่านั้น)',/*不超过62个字符*/
		remindersUpdateTitle: 'การอัปเดตแอพพลิเคชั่น',/*不超过62个字符*/
		remindersUpdateText:'เตือนฉันให้อัปเดตแอพทุกๆ {0} วัน',/*不超过62个字符*/
		remindersBackupText:'เตือนฉันให้สำรองข้อมูลอุปกรณ์ทุกๆ {0} วัน',/*不超过62个字符*/
		remindersUpdateTextTwo: 'อย่าเตือนฉันอีก',/*不超过62个字符*/
		remindersBackupTitle: 'การสำรอง',/*不超过62个字符*/
		remindersPopularTitle: 'กิจกรรมยอดนิยม',/*不超过62个字符*/
		remindersPopularText: 'เตือนฉันหากมีกิจกรรมยอดนิยมหรือโปรโมชั่น',
		/*5-24*/
		swicthSiteLabel:'ไซต์',
		/*5-26*/
		settingTip:"เมนู",
		/*7-21*/
		fbModelName: 'รุ่นอุปกรณ์',
		fbOsVersion: 'เวอร์ชัน Android',
		/*7.22*/
		fbType9:"อื่นๆ",
		/*2014-9-9*/
		upload:"อัพโหลด",
		/*2014-9-11 新版反馈文案*/
		pleaseGory:"หมวดหมู่ปัญหา:",
		pleaseChoose:"กรุณาเลือกหมวดหมู่.",
		openUSB:"เปิดการใช้งาน USB Debugging:",
		pleaseSele:"กรุณาเลือก...",
		whatUsb:"USB Debugging คืออะไร?",
		havaActive:"คุณเคยเปิดการใช้งาน USB Debuggingหรือไม่?",
		phoneModel:"รุ่นโทรศัพท์:",
		pleaseEnter:"กรุณาระบุรุ่นโทรศัพท์ของคุณ.",
		modelOf:"รุ่นโทรรศัพท์ที่มีปัญหา",
		email: "อีเมล์:",
		enterEmail:"กรุณาระบุอีเมล์ของคุณ.",
		enterValid:"กรุณาระบุอีเมล์ที่ใช้งานได้เพื่อบริการจากเราที่ดีที่สุด",
		andVer:"เวอร์ชั่นแอนดรอยด์:",
		pleaseVer:"กรุณาเลือกเวอร์ชั่นแอนดรอยด์.",
		corSystem:"ระบบเวอร์ชั่นที่ถูกต้องจะช่วยให้เรารับรู้ปัญหาของคุณได้อย่างถูกต้อง.",
		socialAcc:"บัญชีโซเชี่ยล:",
		selectMethod:"เลือกช่องทางที่เราสามารถติดต่อคุณได้",
		description:"คำอธิบาย:",
		addAttach: "เพิ่มไฟล์แนบ",
		noFiles:"ไม่มีไฟล์",
		onlySupports:"รองรับไฟล์ที่มีขนาดน้อยกว่า 3MB.",
		whyNeed:"ทำไมฉันถึงต้องเปิดการใช้งาน USB Debugging?",
		debugRequired:"การใช้งาน USB Debugging ต้องการการเชื่อมต่อระบบแอนดรอยด์ไปยังคอมพิวเตอร์ของคุณ. การเปิดการใช้งาน USB Debugging สามารถทำให้โทรศัพท์และแทปเล็ทของคุณเชื่อมต่อกับ Mobogenie ได้เร็วขึ้น.",
		openfun:"ฉันจะเปิดการใช้งานฟังค์ชั่น USB Debugging ได้อย่างไร?",
		andLower:"Android 3.2 หรือต่ำกว่า",
		selectSet:"เลือก [ตั้งค่า] ในรายชื่อแอพเพื่อเข้าสู่รายการระบบ.",
		selectApp: "เลือก [แอพพลิเคชั่น].",
		
		selectDeve:"เลือก [การพัฒนา].",
		selectTap:"เลือก [USB Debugging] และแตะปุ่ม OK.",
		andFour: "Android 4.0 และ 4.1",
		selectOpt:"เลือก [ตัวเลือกผู้พัฒนา].",
		openOpt:"เปิด [ตัวเลือกผู้พัฒนา]  ที่อยู่ด้านบน.",
		checkTap:"ตรวจสอบ [USB Debugging] และแตะปุ่ม OK.",
		androidFour:"Android 4.2",
		tapIcon:"แต่ที่ไอค่อน [ตั้งค่า].",
		tapPhone:"แตะ [เกี่ยวกับโทรศัพท์].",
		scrollBot: "เลือนไปด้านล่างของหน้าจอและมองหาปุ่ม [สร้างหมายเลข]หลังจากนั้นแตะสองถึงสามครั้ง.",
		
		keepTap:"แตะอย่างต่อเนื่องจนกว่าคุณจะเห็นข้อความ \"คุณได้ใช้งานระดับเดียวกับผู้พัฒนาแล้ว!\"",
		goback:"แลับไปที่หน้า [ตั้งค่า] แล้วจะพบ  [ตัวเลือกผู้พัฒนา]ปรากฎขึ้น!",
		enterDeve:"เข้าไปยัง [ตัวเลือกผู้พัฒนา] และแตะ [USB Debugging].",
		backDeve:"กลับไปที่ [ตัวเลือกผู้พัฒนา]และตรวจสอบว่า [USB Debugging]มีการเลือกไว้แล้ว.",
		connectCom:"เชื่อมต่อโทรศัพท์ของคุณกับคอมพิวเตอร์และเปิดการใช้งาน Mobogenie. <br/>Mobogenie จะทำการติดตั้ง [Mobogenie Helper] ไปยังคอมพิวเตอร์ของคุณ.<br/>แตะ OK เมื่อมีการแจ้งเตือนว่ามีการติดตั้งแล้ว.",
		returnCon:"กลับไปและดำเนินการต่อ",
		fbSuccessClose: 'ดำเนินการเรียกดูร้านค้าต่อ{0}',
		
		unableCon:"ไม่สามารถเชื่อมต่อโทรศัพท์ของฉันได้",
		proInstall:"ปัญหาเกี่ยวกับทรัพยากร",
		contactsText:"รายชื่อและข้อความ",
		slowPer:"ประสิทธิภาพการทำงานช้า",
		unableRoot:"ไม่สามารถรูทได้",
		stillWhen:"MG ยังคงป๊อปอัพถึงแม้ไม่ได้เชื่อมต่ออุปกรณ์",
		suggesNew:"เสนอแนะฟังค์ชั่นใหม่",
		usbOn: "เปิดการใช้งานUSB Debugging",
		usbOff: 'ปิดการใช้งาน USB Debugging',
		fbTextarea: "เรายินดีเสมอที่จะรับฟัง!",
		errorFile:"รูปแบบไฟล์ไม่ถูกต้อง",
		/*2014-11-07*/
		unableCon:"ไม่สามารถเชื่อมต่ออุปกรณ์ของฉันผ่าน USB.",
		unableWifiCon:"ไม่สามารถเชื่อมต่ออุปกรณ์ของฉันผ่าน Wi-Fi.",

    };
    return dictionary;
});