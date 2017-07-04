define('thai:myapp', function(require, exports, module){
    var dictionary = {
         installAppsLabel: 'ติดตั้งแอพ',/*不超过18个字符*/
        moveToSdCardLabel: 'ย้ายไปยังการ์ด SD',/*不超过30个字符*/
        tabAppLabel: 'แอพพลิเคชั่น',/*不超过24个字符*/
        tabUpdatesLabel: 'อัปเดต',/*不超过24个字符*/
        tabSystemLabel: 'ระบบ',/*不超过24个字符*/
        moveLabel: 'ย้าย',
        
        appCurrentVersionLabel: 'เวอร์ชั่นปัจจุบัน:',/*不超过22个字符*/
        appLatestVersionLabel: 'เวอร์ชั่นล่าสุด:',/*不超过22个字符*/
        appLocationLabel: 'ตำแหน่ง:',/*不超过20个字符*/
        appSizeColonLabel: 'ขนาด:',/*不超过22个字符*/
        ratingColonLabel: 'คะแนน:',
        
        likeColonLabel: 'และคุณอาจชอบ...',/*不超过45个字符*/
        downloadsText: '{0} ดาวน์โหลด',
        updatingText: 'กำลังอัปเดต',/*不超过45个字符*/
        uninstallingText: 'กำลังถอนการติดตั้ง',/*不超过12个字符*/
        installingText: 'กำลังติดตั้ง',
        sureUninstallTip: 'แน่ใจว่าต้องการถอนการติดตั้ง {0} แอพที่เลือก?',
        uninstalling: 'กำลังถอนการติดตั้ง โปรดเชื่อมต่ออุปกรณ์ค้างเอาไว้',
        uninstallSuccessText: 'สำเร็จ',
        uninsatllFailed:"ถอนการติดตั้งสำเร็จ {0} แอพ ไม่สำเร็จ {1}:",
        
        exportSuccess:"ส่งออกสำเร็จ {0} แอพ.",
        exportFailed:"ส่งออกสำเร็จ {0} แอพ ไม่สำเร็จ {1}:",
        
        systemMaskText: 'สามารถจัดการแอพระบบของคุณได้หลังจากรูทอุปกรณ์',
        systemMaskCtn: 'การล้างแอพระบบจะเรียกคืนพื้นที่ได้ 156.3 MB',
        searchResultTitle:'เราพบ {0} แอพ',
        /*2014-5-26*/
        deviceTipText : "หน่วยความจำอุปกรณ์",
        sdCardTipText : "การ์ด SD",
        //06-03
        noapptext:'ไม่มีแอพบนอุปกรณ์',
        noupdatetext:'ไม่มีแอพที่อัพเดตได้บนอุปกรณ์',
        /*2014-6-18*/
        noappBtnText:'ดาวน์โหลดแอพ',
        //08-13
        moving: 'กำลังทำการเคลื่อนย้าย. กรุณาเชื่อมต่ออุปกรณ์ของคุณไว้.',
        moveFailed:"เคลื่อนย้าย {0} แอพสำเร็จ, เคลื่อนย้ายไม่สำเร็จ {1}:",
        //08-19
        moveConfirm:"แอพอาจจะไม่สามารถใช้งานได้หลังจากย้ายไปที่ SD Card.คุณต้องการจะดำเนินการต่อ?",
        //2014-10-14
        wifiUninstallTitle:"กรุณาถอนการติดตั้งบนอุปกรณ์ของคุณให้เรียบร้อย."
    }
    return dictionary;
});