define('thai:common', function(require, exports, module){
    var dictionary = {
        connectingText: 'กำลังเชื่อมต่อ',/*不超过16个字符*/
        
        homeLabel: 'หน้าหลัก',/*不超过14个字符*/
        appLabel: 'แอพพลิเคชั่น',/*不超过14个字符*/
        gamesLabel: 'เกม',/*不超过14个字符*/
        ringtonesLabel: 'เสียงเรียกเข้า',/*不超过14个字符*/
        wallPaperLabel: 'วอลเปเปอร์',/*不超过14个字符*/
        youTubeLabel: 'Youtube',/*不超过14个字符*/
        moreLabel: 'เพิ่มเติม',/*不超过14个字符*/
        toolsLabel: 'ชุดเครื่องมือ',/*不超过14个字符*/
        safetyLabel: 'ความปลอดภัย',/*不超过14个字符*/
        contactLabel: 'ที่ติดต่อของฉัน',/*不超过14个字符*/
        smsLabel: 'ข้อความของฉัน',/*不超过14个字符*/
        myAppLabel: 'แอพของฉัน',/*不超过14个字符*/
        myMusicLabel: 'เพลงของฉัน',/*不超过14个字符*/
        myPictureLabel: 'ภาพของฉัน',/*不超过14个字符*/
        myVideoLabel: 'วีดีโอของฉัน',/*不超过14个字符*/
        Import:'นำเข้า',/*不超过16个字符*/
        Export:'นำออก',/*不超过16个字符*/
        Delete:'ลบ',
        Refresh:'รีเฟรช',
        updateAllLabel: 'อัปเดตทั้งหมด',/*不超过16个字符*/
        updateLabel: 'อัปเดต',/*不超过12个字符*/
        uninstallLabel: 'ถอนการติดตั้ง',/*不超过16个字符*/
        deviceText: 'อุปกรณ์',/*不超过12个字符*/
        phoneText: 'โทรศัพท์',
        memoryText: 'หน่วยความจำ',/*不超过12个字符*/
        installLabel: 'ติดตั้ง',/*不超过12个字符*/
        sizeLabel: 'ขนาด',
        nameLabel: 'ชื่อ',
        locationLabel: 'ตำแหน่ง',
        actionLabel: 'แอคชั่น',
        selectAllLabel: 'เลือกทั้งหมด',/*不超过30个字符*/
        downloadAllLabel: 'โหลดทั้งหมด',/*不超过24个字符*/
        downloadingText: 'กำลังดาวน์โหลด',/*不超过24个字符*/
        redownloadText: 'ดาวน์โหลดอีกครั้ง',
        downloadLabel: "ดาวน์โหลด",
        
        successText: 'สำเร็จ',
        installedInText: 'ติดตั้งใน {0}',/*不超过45个字符*/
        ImportingText: 'กำลังนำเข้า',/*不超过55个字符*/
        setWallpaperFailed: 'ล้มเหลวในการตั้งค่าวอลเปเปอร์',
        importedInText: 'นำเข้าใน {0}',/*不超过45个字符*/
        
        retryText: 'ลองอีกครั้ง',/*不超过15个字符*/
        pauseText: 'หยุดพัก',/*不超过15个字符*/
        continueText: 'ดำเนินการต่อ',/*不超过15个字符*/
        inProcessingTaskText: 'กำลังดำเนินการ',
        completedText: 'เสร็จสมบูรณ์',
        noTaskText: 'ไม่มีงานที่ดำเนินการอยู่',/*不超过18个字符*/
        
        captureLabel: 'จับภาพหน้าจอ',/*不超过24个字符*/
        featureText: 'ต้องมี',/*不超过24个字符*/
        countTasksText: '{0} งาน',/*不超过15个字符*/
        
        updateTipText: 'คุณมีแอพ {0} เวอร์ชั่นล่าสุดแล้ว.',/*不超过65个字符*/
        rootTipText: 'อุปกรณ์มือถือของคุณยังไม่ได้รูท การรูทจะอนุญาตให้ติดตั้งแอพได้ทุกตัวที่ต้องการ',
        oneClickRootLabel: 'การรูทด้วยคลิกเดียว',
        shareMobogenieText: 'แบ่งปัน Mobogenie บน',/*不超过65个字符*/
        
        tipLabel: 'เคล็ดลับ',
        confirmLabel:'ยืนยัน',
        okLabel : 'ตกลง',
        yesLabel : 'ใช่',
        cancelLabel:'ยกเลิก',
        closeLabel : 'ปิด',
        failedLabel : 'ล้มเหลว',
        exportSuccess:'การส่งออกสำเร็จ',
        
        headSignIn:'เข้าสู่ระบบ',/*不超过11个字符*/
        /*connectAnother : 'เชื่อมต่ออุปกรณ์อื่น',*/
         deviceInfo: 'เกี่ยวกับอุปกรณ์',/*不超过22个字符*/
        email:'อีเมล',
        /*add 2014-03-28*/
        promptInvaildPath:'พาธไม่ถูกต้อง.',
	   
	    connectDeviceVia:'เพียงเชื่อมต่อโทรศัพท์เพื่อติดตั้งแอพ เกม วีดีโอ และเนื้อหาอื่นๆ ของ Android ได้ฟรี และเปิดประตูสู่การจัดการอุปกรณ์มือถือรูปแบบใหม่',
        connectNow:'เชื่อมต่อทันที',
		
		downloadingDriver:'กำลังดาวน์โหลดไดรเวอร์สำหรับอุปกรณ์ {0}',/*不超过50个字符*/
		installingDriverText:'กำลังติดตั้งไดรเวอร์สำหรับอุปกรณ์',/*不超过50个字符*/
		installingMG:'กำลังติดตั้ง Mobogenie ในอุปกรณ์',/*不超过50个字符*/
		connectedYourDeviceText: 'เชื่อมต่อแล้ว',/*不超过50个字符*/
		disconnectYourDeviceText: 'ตัดการเชื่อมต่อแล้ว',/*不超过50个字符*/

        searchResultText: 'ค้นหา <span class="c-red">{0}</span> พบ <span class="c-red">{1}</span> ผลลัพธ์ ',
        searchSeeAllLink: 'ดูทั้งหมด',
        openLabel: 'เปิดโฟลเดอร์',
        
        Exporting:"อยู่ในขั้นตอนการนำออก โปรดเชื่อมต่ออุปกรณ์ค้างเอาไว้",
        Deleting:"กำลังลบ โปรดเชื่อมต่ออุปกรณ์ค้างเอาไว้",

        deviceMemoryLabel: "หน่วยความจำอุปกรณ์",
        sdCardLabel: "การ์ด SD 1",
        sdCardTwoLabel: "การ์ด SD 2",
        total: "รวมทั้งหมด : ",/*不超过20个字符*/
        available: "มีพื้นที่เหลือ : ",/*不超过20个字符*/
        manage: "การจัดการ",
        
        installedText: 'ติดตั้งแล้ว',/*不超过15个字符*/
        updateAppText: 'อัปเดต',/*不超过12个字符*/
        installingAppText: 'กำลังติดตั้ง',/*不超过55个字符*/
        installText: 'ติดตั้ง',/*不超过15个字符*/

        /*2014-05-13*/
       searchHolderMyApp:"แอพ & เกมภายใน",
       searchHolderWallpaper:"วอลเปเปอร์",
       searchHolderRingtone:"เสียงเรียกเข้า",
       searchHolderAppGames:"แอพ/เกม",
       noSdState:"ไม่พบการ์ด SD บนอุปกรณ์ของคุณ",
       /*2014-5-26*/
       minTipText:"ย่อเล็กสุด",
       maxTipText:"ขยายใหญ่สุด",
       exitTipText:"ออก",
       returnTipText:"กลับไป",
       retreatTipText:"ส่งต่อ",
       /*2014-5-27*/
       noLabel : 'ไม่',
       menuOpenLabel:"เปิด",
       //20140604
       bestPicksLabel: 'ตัวเลือกที่ดีที่สุด',
       actionFailed:'การดำเนินการล้มเหลว',
       /*2014-06-09*/
      searchHolderYoutube:'YouTube URL หรือ คำสำคัญ',
      screenshotSave:"สแนปช็อต ถูกบันทึกไปยัง: ",
      screenshotText:"สแนปช็อต",
      screenshotCheckPathTip: "ใช้พาธนี้เพื่อบันทึกสแนปช็อตเสมอ",
      /*2014-06-10*/
      alwaysOpenClient:'เปิด Mobogenie เสมอเมื่อเชื่อมต่ออุปกรณ์',
      changeOpenClient:'คุณสามารถเปลี่ยนค่านี้ในการตั้งค่าได้ทุกเมื่อ',
      /*2014-06-18*/
      screenBlackTipText: "โปรดเปิดหน้าจออุปกรณ์มือถือ",
      /*2014-06-30*/
     ebookLabel:"หนังสือ",
     myEbookLabel:"หนังสือของฉัน",
      /*2014-6-30修改*/
      connectDeviceText:'กำลังเชื่อมต่อ โปรดเชื่อมต่ออุปกรณ์ค้างเอาไว้',
      openManageDevice:"พบอุปกรณ์ เปิด Mobogenie เพื่อจัดการอุปกรณ์ของคุณ และดาวน์โหลดเนื้อหาฟรี",
      /*2014-07-18*/
     searchHolderEBook:"หนังสือ",
          /*2014-09-25*/
      rememberMarkLabel:"จดจำการตั้งค่า"
    };
    return dictionary;
});