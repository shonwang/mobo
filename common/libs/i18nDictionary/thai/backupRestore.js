define('thai:backupRestore', function(require, exports, module){
    var dictionary = {
        lastBackupLabel: 'สำรองข้อมูลครั้งล่าสุด: ',
        basicLabel: 'พื้นฐาน',
        advanceLabel: 'ขั้นสูง',
        backupCompleted: 'สำรองข้อมูลเสร็จสมบูรณ์',
        backupProcess: 'กำลังสำรองข้อมูล...โปรดเชื่อมต่ออุปกรณ์ค้างเอาไว้',
        viewBackup: 'ดูการสำรองข้ัอมูล',
        finish: 'เสร็จสิ้น',
        backtoLabel: "สำรองข้อมูลไปที่: ",
        changeLabel: "เปลี่ยน",
        contactLabel: "รายชื่อผู้ติดต่อ",
        messageLabel: "ข้อความ",
        callRegordsLabel: "บันทึกการโทร",
        appLabel: "แอพพลิเคชั่น",
        picLabel: "ภาพ",
        musicLabel: "เพลง",
        videoLabel: "วิดีโอ",

        restoreProcess: 'กำลังคืนค่า...โปรดเชื่อมต่ออุปกรณ์ค้างเอาไว้',
        restoreLabel: "คืนค่า",
        nextLabel: "ถัดไป",
        closeLabel : "ปิด",
        restoreFolder: "คืนค่าจากโฟลเดอร์ที่กำหนดเอง",
        selectLabel: "เลือกไฟล์ที่จะคืนค่า: ",
        previousLabel: "ก่อนหน้า",
        //20140531 - add by wangzhisong
        noBackupFile: "ไม่พบไฟล์สำรองข้อมูล",
        //20140623
        pushBackupLabel: "สำรองข้อมูลอุปกรณ์ของคุณทันที เพื่อปกป้องข้อมูลส่วนบุคคลของคุณให้ปลอดภัย",
        //2014-7-25
        sureDialogText:"เพื่อป้องกันไม่ให้ข้อมูลสูญหาย จึงไม่สามารถดำเนินการสำรองข้อมูลและคืนค่าพร้อมกันได้"
    };
    return dictionary;
});