define('thai:image', function(require, exports, module){
    var dictionary = {
    	importPicture: 'นำเข้าภาพ',/*不超过28个字符*/
    	gallery: 'แกลเลอรี่',/*不超过24个字符*/
    	wallpapers: 'วอลเปเปอร์',/*不超过24个字符*/
    	others:'อื่นๆ',/*不超过24个字符*/
    	date:'วันที่',
        sureDeleteText : "แน่ใจว่าต้องการลบ {0} ภาพที่เลือก?",
        deleteSuccessText: 'ลบสำเร็จ',
        deleteFailed:"ลบสำเร็จ {0} ภาพ ไม่สำเร็จ {1}:",
        setWallpaper: 'ตั้งเป็นวอลเปเปอร์',
        
        exportSuccess:"นำออกสำเร็จ {0} ภาพ.",
        exportFailed:"นำออกสำเร็จ {0} ภาพ ไม่สำเร็จ {1}:",
        setWallpaperSuccess: 'ตั้งเป็นวอลเปเปอร์สำเร็จ',
        setWallpaperFailed: 'ตั้งเป็นวอลเปเปอร์ล้มเหลว',
        /*201405-27*/
        rotateLeftText:"หมุนซ้าย",
        rotateRightText:"หมุนขวา",
        noImagesText:"ไม่มีไฟล์รูปภาพบนอุปกรณ์",
        downloadImage:"ดาวน์โหลดวอลเปเปอร์",
        
        /*2014-07-16*/
        previewLabel:"ดูตัวอย่าง"
    };
    return dictionary;
});