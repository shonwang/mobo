define('indonesian:music', function(require, exports, module){
    var dictionary = {
        ImportMusic: 'Impor Musik',/*不超过28个字符*/
        Artist:'Artis',/*不超过20个字符*/
        Time:'Waktu',/*不超过12个字符*/
        Format:'Format',/*不超过10个字符*/
        emptyMusicLabel:"Tidak ada musik di perangkat Anda.",/*不超过11个字符*/
        gotoRingtonesLabel: 'Unduh Nada Dering',/*不超过35个字符*/
        
        exportSuccess:"Mengekspor {0} musik berhasil.",
        exportFailed:"Mengekspor {0} musik berhasil,gagal mengekspor {1}:",
        
        sureDelete : "Anda yakin ingin menghapus {0} musik yang telah dipilih?",
        deleteSuccess:"Penghapusan berhasil.",
        deleteFailed:"Penghapusan {0} musik berhasil,gagal menghapus {1}:",
        //add 2014-04-02
        setringtoneSuccess:'Atur sebagai nada dering berhasil',
        setsmsSuccess:'Atur sebagai notifikasi berhasil',
        setalarmSuccess:'Atur sebagai alarm berhasil',
        setFailed:'Gagal mengatur',
        //add 2014-04-16
        cancelringtone:'Batalkan nada dering berhasil',
        cancelsetsms:'Batalkan notifikasi berhasil',
        cancelsetalarm:'Batalkan alarm berhasil',
        //add 2014-04-28
        formaterror:"Format ini tidak didukung",
        //add 2014-05-14
        setasringtone:"Atur sebagai nada dering",
        setasnotification:"Atur sebagai notifikasi",
        setasalarm:"Atur sebagai alarm",
        /*2014-5-26*/
        stop:"Hentikan",
        /*2014-09-10*/
        musicnotexist:"Musik tidak ditemukan"
    };
    return dictionary;
});
