/**
 * @author liujintao
 */
define('thai:fileManager', function(require, exports, module){
    var dictionary = {
        ImportFile: 'นำเข้าไฟล์',
        ImportDirectory: 'แฟ้มนำเข้า',
        sureDelete : "คุณแน่ใจที่จะลบไฟล์หรือแฟ้มที่เลือกไว้?",
        
        exportingTitle:"กำลังส่งออก, กรุณาเชื่อมต่ออุปกรณ์ไว้",
        deletingTitle:"กำลังลบ, กรุณาเชื่อมต่ออุปกรณ์ไว้",
        /*2014-07-26*/
        copingTitle:"กรุณาเชื่อมต่ออุปกรณ์ไว้",
        copySuccess:"คัดลอกไฟล์สำเร็จ",
        sdCard:'SD Card',
        extSdCard:'SD Card ภายนอก',
        pasteLabel:"วาง",
        newFolder:"แฟ้มใหม่",
        /*2014-08-04*/
       selectMultiInfo:"{0} แฟ้ม, {1} ไฟล์ที่เลือก",
       selectDirectoryInfo:"{0} แฟ้ม, {1} ไฟล์ ",
       sdCardUsage:"ทั้งหมด: {0}, ใช้ได้: {1}",
       sizeLabel:"ขนาด: {0}",
       modifiedTime:"เวลาแก้ไข: {0}",
       /*2014-08-08*/
       importingTitle:'กำลังทำการนำเข้า, กรุณาเชื่อมต่ออุปกรณ์ไว้',
	   /*2014-08-11*/
       noSdCardNotice:'ไม่สามารถอ่าน SD Card ได้, กรุณาตรวจสอบ SD Card บนอุปกรณ์ของคุณ.',
       confirmFileReplace:'{0} มีการติดตั้งอยู่แล้ว. คุณต้องการติดตั้งทับหรือไม่?',
       /*2014-08-18*/
       deleteFailed:"ลบ {0} ไฟล์/แฟ้มสำเร็จ, ลบไม่สำเร็จ {1}:",
       importFailed:"นำเข้า {0} ไฟล์/แฟ้มสำเร็จ, นำเข้าไม่สำเร็จ {1}:",
	   createFolderFailed:"สร้างแฟ้มไม่สำเร็จ",
       exportFailed:"ส่งออก {0} ไฟล์/แฟ้มสำเร็จ, ส่งออกไม่สำเร็จ {1}:",
       copyFailed:"คัดลอก {0} ไฟล์/แฟ้มสำเร็จ, คัดลอกไม่สำเร็จ {1}:",
       /*2014-08-21*/
       renameFailed:"เปลี่ยนชื่อไม่สำเร็จ.",
	   spaceFailed:"ล้มเหลว . พื้นที่ว่างไม่พอ.",
	   nosdcontent:"แฟ้มนี้ว่าง.",
       /*2014-09-11*/
       specailCharNotice:'ตัวอักษรเหล่านี้ไม่สามารถใช้ตั้งชื่อแฟ้มได้:|/\:*?"<>',//重命名
       renameRepeatNotice:'แฟ้มชื่อ [{0}] มีอยู่แล้ว. กรุณาใช้ชื่ออื่น.',//重命名已存在
       renameLabel:"เปลี่ยนชื่อ",
       openingTitle:'กำลังเปิด. กรุณาเชื่อมต่ออุปกรณ์ของคุณไว้', 
       fileExtChangeNotice:'ถ้าคุณเปลี่ยนชื่อไฟล์ส่วนขยายอาจจะทำให้ไม่สามารถใช้งานได้. คุณมั่นใจที่จะเปลี่ยนหรือไม่?',//后缀变更
       openHeader:"เปิดไฟล์",
       openingFailed:"เปิดไฟล์ไม่สำเร็จ",   
       /*2014-10-15*/
       cMemoryLess:"พื้นที่บนไดรฟ์ C ไม่เพียงพอ. กรุณาตรวจสอบพื้นที่เพิ่มเติมก่อนทำการเล่นไฟล์วีดีโอ ,เพลง หรืออื่นๆ."      
    };
    return dictionary;
});