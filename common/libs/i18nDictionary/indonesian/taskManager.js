define('indonesian:task', function(require, exports, module){
    var dictionary = {
        setingAsWallpaper: 'Jadikan sebagai wallpaper...',
        setingAsRingtone: 'Jadikan sebagai nada dering...',
        setRingtoneSuccess: 'Atur nada dering berhasil',
        setRingtoneFailed: 'Atur nada dering gagal',
        
        insuficientSpace: 'Instal gagal. Memori tidak mencukupi',
        noSdCard: 'Instal gagal. Tidak ada kartu SD',
        noSuchSourceFile: 'Instal gagal. Tidak ada file tersebut',
        inValidApkFile: 'Instal gagal. File apk tidak valid',
        unknowSourceSetting: 'Instal gagal. Harap centang ‘Sumber tak dikenal’ di Pengaturan > Aplikasi',
        installPhoneMemory: 'Silakan instal ke Memori',
        unknownError: 'Kesalahan tidak diketahui',
        networkErrorText: 'Kesalahan jaringan',
        
        waitingText: 'Menunggu',/*不超过56个字符*/
        pausedText: 'Ditunda',/*不超过24个字符*/
        installUnknownError: 'Instal gagal. Kesalahan tidak diketahui',
        downloadUnknownError: 'Unduhan gagal. Kesalahan tidak diketahui',
        
        adbConnectionError: 'Sambungkan perangkat untuk menginstal',
        
        importFileNotExistedText: 'Impor gagal. File tidak ada',
        importTransferErrorText: 'Impor gagal. Kesalahan transfer file',
        importInsufficientSpace: 'Impor gagal. Ruang tidak mencukupi',
        importUnknownError: 'Impor gagal. Kesalahan tidak diketahui',
        importUnConnectError: 'Sambungkan perangkat untuk mengimpor',
        importFailedNoSdCard: 'Impor gagal. Tidak ada kartu SD',
        installSdkOlderError: 'Tidak kompatibel dengan perangkat Anda',
        installMismatchedCertificateError: 'Sertifikat APK tidak cocok. Silakan hapus instalasi aplikasi saat ini sebelum menginstal',
        
        transferringText: 'Mentransfer',/*不超过55个字符*/
        settedText: 'Atur di {0}',
        importViaConnectText: 'Sambungkan perangkat untuk mengimpor',
        
        installFailedText: 'Instal gagal',
        
        openFolder:'Buka folder unduhan',
        
        downloadInText: 'Diunduh di {0}',
        reinstallText: 'Instal ulang',/*不超过15个字符*/
        noTaskText: 'Tidak ada tugas di sini.',
        /*6-04*/
        unknowSource2Setting: "Install gagal. Harap cek “Sumber tak diketahui” pada Pengaturan > Keamanan",
        
        unzipAppText:"Ekstrak file data",
        transferDataFile:"Transfer file data",
        unzipAppFailedText:"Gagal Mengekstrak file data",
        transferAppFailedText:"Gagal mentransfer file data",
        /*7-28*/
        hideTaskTip:"Sembunyikan",
        /*2014-09-25*/
        showInstallPopLabel:"Install",
        /*2014-10-14*/
        installOnDeviceText: 'Harap selesaikan instalasi di perangkat Anda.',
         /*2014-10-16*/
        pleaseTapInstall:"Silakan klik \"instal\" di perangkat Anda.",
        /*2014-11-10*/
        installSdCard: "Instal ke SdCard",
        onlyInstallSdCard: "Aplikasi ini hanya bisa diinstal ke SdCard perangkat Anda.",
        /*2015-1-7yangtian*/
        insufficeient:"Ruang disk rendah"
    };
    return dictionary;
});