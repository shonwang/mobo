define('thai:sms', function(require, exports, module){
    var dictionary = {
        sendTo: 'ส่งถึง',
        characters: 'ตัวอักษร',
        pressCE: 'กด Ctrl+Enter เพื่อส่ง',
        writeMessage: 'เขียนข้อความที่นี่',
        send: 'ส่ง',
        allGroup: 'กลุ่มทั้งหมด',
        selectAll: 'เลือกทั้งหมด',
        removeAll: 'ลบทั้งหมด',
        emptyInfo:'ส่งข้อความถึงเพื่อน',
        newMessage: 'ข้อความใหม่',
        msgSelected: '{0} ข้อความที่เลือก',
        promptDelete: 'แน่ใจหรือไม่ว่าต้องการลบเซสชัน {0} ที่เลือก ({1} ข้อความ)',
        importLable: "นำเข้า",
        exportLabel: "ส่งออก",
        deleteLabel: "ลบ",
        refreshLabel: "รีเฟรช",
        addContact: "เพิ่มที่ติดต่อ",
        editContact: "แก้ไขที่ติดต่อ",
        loadMore: "โหลดเพิ่มเติม",
        /*2014-5-30*/
       	contacts: '{0} ที่ติดต่อที่เลือก',
        contactName:"ชื่อที่ติดต่อหรือหมายเลขโทรศัพท์",

        selectedMsgLabel: "ข้อความที่เลือก ({0})",
        allMsgLabel: "ข้อความทั้งหมด ({0})",

        exportSuccess:"ส่งออก {0} ข้อความสำเร็จ",
        exportFailed:"ส่งออก {0} ข้อความสำเร็จ ส่งออกไม่สำเร็จ {1}:",
        /*2014-5-31*/
        deleteFailed:"ลบสำเร็จ {0} ข้อความ ลบไม่สำเร็จ {1}: ",
        /*2014-6-18*/
        markasRead:"ทำเครื่องหมายว่าอ่านแล้ว",
        /*2014-07-22*/
       smsPermissionNotice:"สิทธิ์ SMS อาจถูกบล็อคโดยแอพพลิเคชั่นการรักษาความปลอดภัย โปรดให้สิทธิ์ใน [การจัดการสิทธิ์]",
       emptySMS:"ไม่มีข้อความบนอุปกรณ์",
    };
    return dictionary;
});
