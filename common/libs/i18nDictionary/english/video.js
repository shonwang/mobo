define('english:video', function(require, exports, module){
    var dictionary = {
        importVideo: 'Import Videos',
        exportSuccess:"Exported {0} videos successful.",
        exportFailed:"Export {0} videos successful,failed to export {1}:",
        promptDelete: 'Are you sure you want to delete selected {0} videos?',
        deleteFailed:"Delete {0} video successful,failed to delete {1}:",
        promptPlayTitle: 'Prepare playing video',
        promptPlay: 'Loading...',
        emptyVideoLabel: 'There are no videos on your device.',
        gotoYouTubeLabel: 'Download Videos',
        promptInvaildPath: 'Invaild path.',
        playLabel: 'Play',
        promptImportTips: "Android only supports .avi, .3gp, .mp4, and .m4v formats. Videos imported in other formats may not be recognized by the system.",
        promptFullDisk:"Not enough space on Disk C. Please free up some space before playing the video.",
    };
    return dictionary;
});