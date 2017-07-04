define('thai:task', function(require, exports, module){
    var dictionary = {
        setingAsWallpaper: 'ตั้งค่าเป็นวอลเปเปอร์...',
        setingAsRingtone: 'ตั้งค่าเป็นเสียงเรียกเข้า...',
        setRingtoneSuccess: 'ตั้งค่าเสียงเรียกเข้าสำเร็จ',
        setRingtoneFailed: 'ตั้งค่าเสียงเรียกเข้าล้มเหลว',
        
        insuficientSpace: 'การติดตั้งล้มเหลว พื้นที่ว่างไม่พอ',
        noSdCard: 'การติดตั้งล้มเหลว ไม่มีการ์ด SD',
        noSuchSourceFile: 'การติดตั้งล้มเหลว ไม่มีไฟล์นี้',
        inValidApkFile: 'การติดตั้งล้มเหลว ไฟล์ apk ไม่ถูกต้อง',
        unknowSourceSetting: 'การติดตั้งล้มเหลว โปรดตรวจสอบ "ไม่รู้จักซอร์ส" ในการตั้งค่า > แอพพลิเคชั่น',
        installPhoneMemory: 'โปรดติดตั้งไปยังหน่วยความจำ',
        unknownError: 'ข้อผิดพลาดที่ไม่รู้จัก',
        networkErrorText: 'เกิดข้อผิดพลาดกับเครือข่าย',
        
        waitingText: 'กำลังรอ',/*不超过56个字符*/
        pausedText: 'หยุดชั่วคราว',/*不超过24个字符*/
        installUnknownError: 'การติดตั้งล้มเหลว ข้อผิดพลาดที่ไม่รู้จัก',
        downloadUnknownError: 'ดาวน์โหลดล้มเหลว ข้อผิดพลาดที่ไม่รู้จัก',
        
        adbConnectionError: 'เชื่อมต่ออุปกรณ์เพื่อติดตั้ง',
        
        importFileNotExistedText: 'การนำเข้าล้มเหลว ไม่มีไฟล์นี้',
        importTransferErrorText: 'การนำเข้าล้มเหลว การถ่ายโอนไฟล์ล้มเหลว',
        importInsufficientSpace: 'การนำเข้าล้มเหลว พื้นที่ว่างไม่พอ',
        importUnknownError: 'การนำเข้าล้มเหลว ข้อผิดพลาดที่ไม่รู้จัก',
        importUnConnectError: 'เชื่อมต่ออุปกรณ์เพื่อติดตั้ง',
        importFailedNoSdCard: 'การนำเข้าล้มเหลว ไม่มีการ์ด SD',
        installSdkOlderError: 'ไม่สามารถใช้งานได้กับอุปกรณ์',
        installMismatchedCertificateError: 'การรับรอง APK ไม่ตรงกัน โปรดถอนการติดตั้งแอพพลิเคชั่นปัจจุบันก่อนการติดตั้ง',
        
        transferringText: 'กำลังถ่ายโอน',/*不超过55个字符*/
        settedText: 'ตั้งค่าใน {0}',
        importViaConnectText: 'เชื่อมต่ออุปกรณ์เพื่อติดตั้ง',
        
        installFailedText: 'การติดตั้งล้มเหลว',
        
        openFolder:'เปิดโฟลเดอร์ดาวน์โหลด',
        
        downloadInText: 'ดาวน์โหลดแล้วใน {0}',
        reinstallText: 'ติดตั้งใหม่',/*不超过15个字符*/
        noTaskText: 'ไม่มีงานที่นี่',
        /*6-04*/
        unknowSource2Setting: "การติดตั้งล้มเหลว โปรดตรวจสอบ \"ไม่รู้จักแหล่งข้อมูล\" ใน การตั้งค่า > ความปลอดภัย",
        
        unzipAppText:"กำลังดึงไฟล์ข้อมูล",
        transferDataFile:"กำลังถ่ายโอนไฟล์ข้อมูล",
        unzipAppFailedText:"ดึงไฟล์ข้อมูลล้มเหลว",
        transferAppFailedText:"ถ่ายโอนไฟล์ข้อมูลล้มเหลว",
        /*7-28*/
        hideTaskTip:"ซ่อน",
        /*2014-09-25*/
        showInstallPopLabel:"Install",
         /*2014-10-14*/
        installOnDeviceText: 'กรุณาทำการติดตั้งบนอุปกรณ์ของคุณให้เรียบร้อย.',
         /*2014-10-16*/
        pleaseTapInstall:"กรุณาคลิ๊ก 'ติดตั้ง' บนอุปกรณ์ของคุณ.",
        /*2014-11-10*/
        installSdCard: "ติดตั้งไปยังแรม",
        onlyInstallSdCard: "แอพนี้สามารถติดตั้งที่แรมของอุปกรณ์คุณได้เท่านั้น.",
        
        /*2015-1-7yangtian*/
        insufficeient:"พื้นที่ดิสก์ต่ำ"
    };
    return dictionary;
});