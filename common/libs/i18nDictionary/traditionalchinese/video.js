define('traditionalchinese:video', function(require, exports, module){
    var dictionary = {
        importVideo: '導入影片',
        exportSuccess:"導出{0}個影片！",
        exportFailed:"導出{0}個影片，失敗{1}個：",
        promptDelete: '您確定要删除選取的{0}個影片嗎？',
        deleteFailed:"成功删除{0}個影片，失敗{1}個：",
        promptPlayTitle: '準備播放影片',
        promptPlay: '讀取中...',
        emptyVideoLabel: '沒有找到影片',
        gotoYouTubeLabel: '去YouTube下載',
        promptInvaildPath: '路徑無效！',
        playLabel: '播放',
        promptImportTips: "Android預設只支援的AVI、3GP、MP4和M4V格式，導入其他格式的影片可能無法被系統識別。",
        promptFullDisk:"磁碟機C:的剩餘空間不足，請先清理磁碟機C:後再播放此影片。",
    };
    return dictionary;
});