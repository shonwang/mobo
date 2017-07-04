/**
 * @author liujintao
 */
define('indonesian:fileManager', function(require, exports, module){
    var dictionary = {
        ImportFile: 'Impor Berkas',
        ImportDirectory: 'Impor Folder',
        sureDelete : "Yakin untuk menghapus berkas yang dipilih?",
        
        exportingTitle:"Mengekspor, pastikan perangkat Anda terhubung",
        deletingTitle:"Menghapus, pastikan perangkat Anda terhubung",
        /*2014-07-26*/
        copingTitle:"Pastikan perangkat Anda tersambung",
        copySuccess:"Berhasil menyalin berkas",
        sdCard:'Kartu SD',
        extSdCard:'Kartu SD Eksternal',
        pasteLabel:"Tempel",
        newFolder:"Folder Baru",
        /*2014-08-04*/
       selectMultiInfo:"{0} Folder, {1} Berkas dipilih",
       selectDirectoryInfo:"{0} Folder, {1} Berkas ",
       sdCardUsage:"Total: {0}, Tersedia: {1}",
       sizeLabel:"Ukuran: {0}",
       modifiedTime:"Waktu Perubahan: {0}",
       /*2014-08-08*/
       importingTitle:'Sedang mengimpor, pastikan perangkat Anda terhubung',
	   /*2014-08-11*/
       noSdCardNotice:'Gagal membaca kartu SD, pastikan Kartu SD di perangkat Anda terhubung.',
       confirmFileReplace:'{0} sudah ada. Yakin untuk menggantinya?',
       /*2014-08-18*/
      deleteFailed:"Berhasil menghapus {0} berkas/folder, gagal menghapus {1}:",
       importFailed:"Berhasil impor {0} berkas/folder, gagal mengimpor {1}:",
	   createFolderFailed:"Gagal membuat folder",
       exportFailed:"Berhasil ekspor {0} berkas/folder, gagal mengekspor {1}:",
       copyFailed:"Berhasil menyalin {0} berkas/folder, gagal menyalin {1}:",
       /*2014-08-21*/
      renameFailed:"Gagal mengubah nama",
      spaceFailed:"Gagal. Memori tidak mencukupi.",
      nosdcontent:"Folder ini kosong.",
       /*2014-09-11*/
       specailCharNotice:'Karakter berikut ini tidak diperbolehkan untuk nama folder: |/\:*?"<>',//重命名
       renameRepeatNotice:'Folder [{0}] sudah ada. Silakan masukkan nama lainnya.',//重命名已存在
       renameLabel:"Ubah nama",
       openingTitle:'Sedang membuka.. Pastikan perangkat Anda tetap terhubung.', 
       fileExtChangeNotice:'Jika Anda mengubah ekstensi nama berkas, maka berkas tersebut tidak dapat dipakai. Yakin untuk mengubah?',//后缀变更
       openHeader:"Buka berkas",
       openingFailed:"Gagal membuka berkas",       
       /*2014-10-15*/
      cMemoryLess:"Tidak cukup ruang di drive C. Silakan kosongkan ruang sebelum membuka video, musik, dsb."      
    };
    return dictionary;
});