define('chinese:image', function(require, exports, module){
    var dictionary = {
    	importPicture: '导入图片',
    	gallery: '相册',
    	wallpapers: '壁纸',
    	others:'其它',
    	date:'日期',
        sureDeleteText : "您确定要删除已选中{0}张图片？",
        deleteSuccessText: '删除成功！',
        deleteFailed:"已删除{0}张图片，失败{1}张：",
        setWallpaper: '设为壁纸',
        
        exportSuccess:"成功导出{0}张图片！",
        exportFailed:"成功导出{0}张图片，失败{1}张：",
        setWallpaperSuccess: '设为壁纸成功！',
        setWallpaperFailed: '设为壁纸失败！',
        /*201405-27*/
        rotateLeftText:"逆时针旋转",
        rotateRightText:"顺时针旋转",
        noImagesText:"没有找到图片",
        downloadImage:"下载壁纸",
        /*2014-07-16*/
       previewLabel:"预览"
    };
    return dictionary;
});