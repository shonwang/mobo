define('thai:video', function(require, exports, module){
    var dictionary = {
        importVideo: 'นำเข้าวีดีโอ',/*不超过28个字符*/
        exportSuccess:"นำออกสำเร็จ {0} วีดีโอ.",
        exportFailed:"นำออกสำเร็จ {0} วีดีโอ ไม่สำเร็จ {1}:",
        promptDelete: 'แน่ใจว่าต้องการลบ {0} วีดีโอที่เลือก?',
        deleteFailed:"ลบสำเร็จ {0} วีดีโอ ไม่สำเร็จ {1}:",
        promptPlayTitle: 'เตรียมการเล่นวีดีโอ',
        promptPlay: 'กำลังโหลด...',
        emptyVideoLabel: 'ไม่มีไฟล์วีดีโอบนอุปกรณ์',
        gotoYouTubeLabel: 'การดาวน์โหลดวิดีโอ',
        promptInvaildPath: 'พาธไม่ถูกต้อง.',
        playLabel: 'เล่น',
        promptImportTips: "Android สนับสนุนรูปแบบ .avi, .3gp, .mp4 และ .m4v เท่านั้น วีดีโอที่นำเข้าในรูปแบบอื่นระบบจะไม่รู้จัก",
        promptFullDisk:"พื้นที่ดิสค์ C ไม่เพียงพอ. กรุณาเตรียมพื้นที่บางส่วนก่อนเล่นไฟล์วีดีโอ."
    };
    return dictionary;
});