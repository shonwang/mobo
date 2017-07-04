define('thai:music', function(require, exports, module){
    var dictionary = {
         ImportMusic: 'นำเข้าเพลง',/*不超过28个字符*/
        Artist:'ศิลปิน',/*不超过20个字符*/
        Time:'เวลา',/*不超过12个字符*/
        Format:'รูปแบบ',/*不超过10个字符*/
        emptyMusicLabel:"ไม่มีไฟล์เพลงบนอุปกรณ์.",/*不超过11个字符*/
        gotoRingtonesLabel: 'การดาวน์โหลดเสียงเรียกเข้า',/*不超过35个字符*/
        
        exportSuccess:"นำออกสำเร็จ {0} เพลง.",
        exportFailed:"นำออกสำเร็จ {0} เพลง นำออกไม่สำเร็จ {1}:",
        
        sureDelete : "แน่ใจว่าต้องการลบ {0} เพลงที่เลือก?",
        deleteSuccess:"ลบสำเร็จ",
        deleteFailed:"ลบสำเร็จ {0} เพลง ไม่สำเร็จ {1}:",
        //add 2014-04-02
        setringtoneSuccess:'ตั้งเป็นเสียงเรียกเข้าสำเร็จ',
        setsmsSuccess:'ตั้งเป็นการแจ้งเตือนสำเร็จ',
        setalarmSuccess:'ตั้งเป็นเสียงปลุกสำเร็จ',
        setFailed:'การตั้งค่าล้มเหลว',
        //add 2014-04-16
        cancelringtone:'ยกเลิกเสียงเรียกเข้าสำเร็จ',
        cancelsetsms:'ยกเลิกการแจ้งเตือนสำเร็จ',
        cancelsetalarm:'ยกเลิกเสียงปลุกสำเร็จ',
        //add 2014-04-28
        formaterror:"ไม่รองรับรูปแบบนี้",
        //add 2014-05-14
        setasringtone:"ตั้งเป็นเสียงเรียกเข้า",
        setasnotification:"ตั้งเป็นการแจ้งเตือน",
        setasalarm:"ตั้งเป็นเสียงปลุก",
        /*2014-5-26*/
        stop:"หยุด",
        /*2014-09-10*/
        musicnotexist:"ไม่พบเพลงดังกล่าว"
    };
    return dictionary;
});
