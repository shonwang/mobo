define('english:music', function(require, exports, module){
    var dictionary = {
        ImportMusic: 'Import Music',
        Artist:'Artist',
        Time:'Time',
        Format:'Format',
        emptyMusicLabel:"There are no music on your device.",
        gotoRingtonesLabel: 'Download Ringtones',
        
        exportSuccess:"Exported {0} music successful.",
        exportFailed:"Export {0} music successful,failed to export {1}:",
        
        sureDelete : "Are you sure you want to delete selected {0} music?",
        deleteSuccess:"Delete success.",
        deleteFailed:"Delete {0} music successful,failed to delete {1}:",
        //add 2014-04-02
        setringtoneSuccess:'Set as ringtone success',
        setsmsSuccess:'Set as notification success',
        setalarmSuccess:'Set as alarm success',
        setFailed:'Set failed',
        //add 2014-04-16
        cancelringtone:'Cancel ringtone success',
        cancelsetsms:'Cancel notification success',
        cancelsetalarm:'Cancel alarm success',
        //add 2014-04-28
        formaterror:"This format is not supported",
        //add 2014-05-14
        setasringtone:"Set as ringtone",
        setasnotification:"Set as notification",
        setasalarm:"Set as alarm",
        /*2014-5-26*/
        stop:"Stop",
        /*2014-09-10*/
       musicnotexist:"Music not exist"
    };
    return dictionary;
});
