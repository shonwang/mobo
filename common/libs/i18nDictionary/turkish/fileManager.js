/**
 * @author liujintao
 */
define('turkish:fileManager', function(require, exports, module){
    var dictionary = {
        ImportFile: 'Dosyaları içe aktar', 
        ImportDirectory: 'İçe aktarma klasörü', 
        sureDelete : "Seçili dosya/klasörü silmek istediğinize emin misiniz?", 
        
        exportingTitle:"Dışa aktarılıyor, lütfen cihazınızı bağlı tutunuz", 
        deletingTitle:"Siliniyor, lütfen cihazınızı bağlı tutunuz", 
        /*2014-07-26*/
        copingTitle:"lütfen cihazınızı bağlı tutunuz", 
        copySuccess:"Kopyalama işlemi tamamlandı", 
        sdCard:'SD Kart',
        extSdCard:'Harici SD Kart',
        pasteLabel:"Yapıştır",
        newFolder:"Yeni Klasör",
        /*2014-08-04*/
       selectMultiInfo:"{0} Klasör, {1} Dosya seçildi",
       selectDirectoryInfo:"{0} Klasör, {1} Dosya ",
       sdCardUsage:"Toplam: {0}, Kullanılabilir: {1}",
       sizeLabel:"Boyut: {0}",
       modifiedTime:"Değiştirme Tarihi: {0}",
       /*2014-08-08*/
       importingTitle:'İçe aktama devam ediyor, lütfen cihazınızı bağlı tutunuz', 
	   /*2014-08-11*/
       noSdCardNotice:'SD Kart okunamadı, lütfen cihazınızdaki SD Kartı kontrol ediniz.', 
       confirmFileReplace:'{0} zaten var. Değiştirmek istediğinize emin misiniz?',  
       /*2014-08-18*/
       deleteFailed:"{0} dosya başarılı bir şekilde silindi, {1} silinemedi:", 
       importFailed:"{0} dosya başarılı bir şekilde içe aktarıldı, {1} içe aktarılamadı:", 
       createFolderFailed:"Klasör oluşturulamadı", 
       exportFailed:"{0} dosya başarılı bir şekilde dışa aktarıldı, {1} dışa aktarılamadı:",  
       copyFailed:"{0} dosya başarılı bir şekilde kopyalandı, {1} kopyalanamadı:", 
       /*2014-08-21*/
       renameFailed:"Yeniden adlandırma başarısız",
       spaceFailed:"Hata. Yetersiz alan.",
       
       nosdcontent:"Bu klasör boş.",
       /*2014-09-11*/
       specailCharNotice:'İzleyen karakterler klasör isminde kullanılamaz: |/\:*?"<>',//重命名
       renameRepeatNotice:'[{0}] isimli klasör zaten mevcut. Lütfen başka bir isim verin.',//重命名已存在
       renameLabel:"Yeniden adlandır",
       openingTitle:'Açılıyor. Lütfen cihaz bağlantısını kesmeyin', 
       fileExtChangeNotice:'Eğer bir dosya adı uzantısını değiştirirseniz, dosya kullanılmaz hale gelebilir. Değiştirmek istediğinize emin misiniz?',//后缀变更
       openHeader:"Dosya Aç",
       openingFailed:"Dosya Açılamadı",    
       /*2014-10-15*/
      cMemoryLess:"C sürücüsünde yeterli boş alan yok. Video,müzik vb. açmadan önce lütfen biraz alan boşaltınız"       
    };
    return dictionary;
});