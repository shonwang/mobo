define('chinese:video', function(require, exports, module){
    var dictionary = {
        importVideo: '导入视频',
        exportSuccess:"导出{0}个视频！",
        exportFailed:"导出{0}个视频，失败{1}个：",
        promptDelete: '您确定要删除选中的{0}个视频吗？',
        deleteFailed:"成功删除{0}个视频，失败{1}个：",
        promptPlayTitle: '准备播放视频',
        promptPlay: '加载中...',
        emptyVideoLabel: '没有找到视频',
        gotoYouTubeLabel: '去YouTube下载',
        promptInvaildPath: '无效路径！',
        playLabel: '播放',
        promptImportTips: "Android默认只支持的AVI、3GP、MP4和M4V格式，导入其他格式的视频可能无法被系统识别。",
        //20140917
        promptFullDisk : "C盘剩余空间不足，请先清理C盘后再播放此视频",
        promptPlayTitle: "准备播放"
    };
    return dictionary;
});