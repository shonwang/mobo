define('france:video', function(require, exports, module){
    var dictionary = {
        importVideo: 'Importer des vidéos',/*不超过28个字符*/
        exportSuccess:"{0} vidéos exportées.",
        exportFailed:"{0} vidéos exportées, {1} échecs :",
        promptDelete: 'Voulez-vous vraiment supprimer les {0} vidéos sélectionnées ?',
        deleteFailed:"{0} vidéos supprimées, {1} échecs :",
        promptPlayTitle: 'Préparer la lecture de la vidéo',
        promptPlay: 'Chargement...',
        emptyVideoLabel: 'Il n\'y a pas de vidéos sur votre appareil .',
        gotoYouTubeLabel: 'Télécharger des vidéos',
        promptInvaildPath: 'Chemin invalide .',
        playLabel: 'Lecture',
        promptImportTips: "Android prend en charge les formats .avi, .3gp, .mp4 et .m4v uniquement. Les vidéos importées dans d\'autres formats peuvent ne pas être reconnues par le système.",
        promptFullDisk:"Espace insuffisant sur le disque C. Veuillez libérer de l\'espace avant de lire la vidéo.",
    };
    return dictionary;
});