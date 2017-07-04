define('indonesian:sms', function(require, exports, module){
    var dictionary = {
        sendTo: 'Kirim ke',
        characters: 'karakter',
        pressCE: 'Tekan Ctrl+Enter untuk mengirim',
        writeMessage: 'Tulis pesan di sini.',
        send: 'Kirim',
        allGroup: 'Semua Grup',
        selectAll: 'Pilih Semua',
        removeAll: 'Hapus Semua',
        emptyInfo:'Kirim pesan teks ke teman anda.',
        newMessage: 'Pesan Baru',
        msgSelected: '{0} Pesan Terpilih',
        promptDelete: 'Apakah anda yakin anda ingin menghapus {0} sesi terpilih ({1} pesan)?',
        importLable: "Impor",
        exportLabel: "Expor",
        deleteLabel: "Hapus",
        refreshLabel: "Refresh",
        addContact: "Tambah kontak",
        editContact: "Edit kontak",
        loadMore: "Muat lebih banyak",
        /*2014-5-30*/
       	contacts: '{0} kontak terpilih',
        contactName:"Nama kontak atau nomor ponsel",

        selectedMsgLabel: "Pesan terpilih ({0})",
        allMsgLabel: "Semua pesan ({0})",

        exportSuccess:"Sukses mengexpor {0} pesan.",
        exportFailed:"Sukses mengexpor {0} pesan,gagal mengexpor {1} pesan:",
        /*2014-5-31*/
        deleteFailed:"Sukses menghapus {0} pesan, gagal menghapus {1}: ",
        /*2014-6-18*/
        markasRead:"Tandai sebagai telah dibaca",
        /*2014-07-22*/
       smsPermissionNotice:"Izin SMS telah diblokir oleh aplikasi keamanan. Harap izinkan di [Manajemen Izin]",
       emptySMS:"Tidak ada pesan di perangkat Anda.",
    };
    return dictionary;
});
