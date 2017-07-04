define('france:image', function(require, exports, module){
    var dictionary = {
    	importPicture: 'Importer une image',/*不超过28个字符*/
    	gallery: 'Galerie',/*不超过24个字符*/
    	wallpapers: 'Fonds d’écran',/*不超过24个字符*/
    	others:'Autres',/*不超过24个字符*/
    	date:'Date',
        sureDeleteText : "Voulez-vous vraiment supprimer les {0} images sélectionnées ?",
        deleteSuccessText: 'Suppression réussie',
        deleteFailed:"{0} images supprimées, {1} échecs :",
        setWallpaper: 'Définir comme fond d\'écran',
        
        exportSuccess:"{0} images exportées .",
        exportFailed:"{0} images exportées, {1} échecs :",
        setWallpaperSuccess: 'Image définie comme fond d\'écran',
        setWallpaperFailed: 'Échec de définition du fond d\'écran',
        /*201405-27*/
        rotateLeftText:"Faire pivoter à gauche",
        rotateRightText:"Faire pivoter à droite",
        noImagesText:"Il n\'y a pas d\'image sur votre appareil.",
        downloadImage:"Télécharger des fonds d\'écran",
        /*2014-07-16*/
        previewLabel:"Aperçu"
    };
    return dictionary;
});