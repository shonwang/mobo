define('thai:contact', function(require, exports, module){
    var dictionary = {
        sideLabel: 'รายชื่อผู้ติดต่อ',
        message: 'ข้อความ',
        music: 'เพลงของฉัน',
        photo: 'ภาพของฉัน',
        video: 'วิดีโอของฉัน',
        backup: 'สำรองข้อมูล&คืนค่า',
        ChangeIcon:'เปลี่ยน',
        MessageRecord:'บันทึกข้อความ',
        Note:'หมายเหตุ',
        Save:'บันทึก',
        Edit:'แก้ไข',
        Cancel:'ยกเลิก',
        inputhere:'ป้อนข้อมูลที่นี่',
        ContactSelected:'<span class="contacts-count selectedNum f18">{0}</span> รายชื่อ ที่เลือก',
        SendMessage:'ส่งข้อความ',
        Filter:'ตัวกรอง',
        AllContacts:'ที่ติดต่อทั้งหมด',
        AllGroups:'กลุ่มทั้งหมด',
        NewContact:'เพิ่มรายชื่อผู้ติดต่อ',
        ContactInfomation:'ข้อมูลรายชื่อผู้ติดต่อ',
        //add 2014-03-24
        sureDeleteTitle:'คุณแน่ใจหรือไม่ว่าต้องการลบ {0} รายชื่อ ที่เลือก',
        deleteFailed:"ลบไม่สำเร็จ",
        
        importingTitle:'กำลังนำเข้า ให้เชื่อมต่อโทรศัพท์ค้างเอาไว้ ',
        importHeader:"นำเข้ารายชื่อผู้ติดต่อ",
        
        exportSuccess:"ส่งออก {0} รายชื่อ สำเร็จ",
        exportFailed:"ส่งออกไม่สำเร็จ",
        
        addContactText:'เพิ่มรายชื่อผู้ติดต่อ ค้นหาสมุดโทรศัพท์และส่งข้อความ',
        newContact: 'เพิ่มรายชื่อผู้ติดต่อ',
        writeMessage:'เขียนข้อความที่นี่...',
        Mobile: 'มือถือ',
        //add 2014-04-09
        deletingTitle:'กำลังลบ ให้เชื่อมต่อโทรศัพท์ค้างเอาไว้',
        //2014-5-26
        addTipText:"เพิ่ม",
        accountLabel:"บัญชี: ",
        emptyContact:"ขออภัย ไม่มีที่ติดต่อในโทรศัพท์ของคุณ",
        //2014-05-29
        deleteTipText:"ลบ",
        smsTipText:"SMS",
        
        importFailed:"นำเข้า {0} ที่ติดต่อสำเร็จ นำเข้าล้มเหลว {1}",
        exportHeader:"ส่งออกที่ติดต่อ",
        exportAll:"ที่ติดต่อทั้งหมด  <em class='c-9'>({0})</em>",
        exportSelect:"ที่ติดต่อที่เลือกไว้  <em class='c-9'>({0})</em>",
        //2014-06-03
        editgroup:"แก้ไขกลุ่ม",
        notassigened:"ไม่ได้ถูกเลือก",
        saveFailed:'การบันทึกที่ติดต่อล้มเหลว โปรดลองอีกครั้งในภายหลัง',
        //2014-06-11
        fileError:'ล้มเหลว ไฟล์ vcf ไม่ถูกต้อง',
        groupText:'กลุ่ม',
        
        /*2014-07-22*/
       contactPermissionNotice:"สิทธิ์ผู้ติดต่ออาจถูกบล็อคโดยแอพพลิเคชั่นการรักษาความปลอดภัย โปรดให้สิทธิ์ใน [การจัดการสิทธิ์]",
       //2014-08-18 保存分组失败
        saveGroupFailed:'บันทึกกลุ่มไม่สำเร็จ. กรุณาลองใหม่ภายหลัง.'
    };
    return dictionary;
});
