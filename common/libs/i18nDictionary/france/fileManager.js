/**
 * @author liujintao
 */
define('france:fileManager', function(require, exports, module){
    var dictionary = {
        ImportFile: 'Importer les fichiers',
        ImportDirectory: 'Importer les dossiers',
        sureDelete : "Êtes-vous sûr de vouloir supprimer les fichiers/dossiers sélectionnés ?",
        
        exportingTitle:"Exportation, en cours, ne déconnectez pas votre appareil",
        deletingTitle:"Suppression en cours, ne déconnectez pas votre appareil",
        /*2014-07-26*/
        copingTitle:"ne déconnectez pas votre appareil",
        copySuccess:"Les fichiers ont bien été copiés",
        sdCard:'Carte SD',
        extSdCard:'Carte SD externe',
        pasteLabel:"Coller",
        newFolder:"Nouveau dossier",
        /*2014-08-04*/
       selectMultiInfo:"{0} dossiers et {1} fichiers sélectionnés",
       selectDirectoryInfo:"{0} dossiers, {1} fichiers ",
       sdCardUsage:"Total : {0}, Disponible : {1}",
       sizeLabel:"Taille : {0}",
       modifiedTime:"Date de modification : {0}",
       /*2014-08-08*/
       importingTitle:'Importation en cours, gardez le téléphone connecté',
	   /*2014-08-11*/
       noSdCardNotice:'Échec de lecture de la carte SD, vérifiez que la carte SD de votre appareil fonctionne.',
       confirmFileReplace:'{0} existe déjà. Voulez-vous vraiment le remplacer ?',
       /*2014-08-18*/
      deleteFailed:"Suppression de {0} fichiers/dossiers, {1} non supprimés :",
       importFailed:"Importation de {0} fichiers/dossiers, {1} non importés :",
	   createFolderFailed:"Échec de la création de dossier",
       exportFailed:"Exportation de {0} fichiers/dossiers, {1} non exportés :",
       copyFailed:"Copie de {0} fichiers/dossiers, {1} non copiés :",
       /*2014-08-21*/
      renameFailed:"Impossible de renommer",
      spaceFailed:"Échec. Espace insuffisant.",
      nosdcontent:"Ce dossier est vide.",
       /*2014-09-11*/
       specailCharNotice:'Les caractères suivants ne sont pas autorisés dans un nom de dossier : |/\:*?"<>',//重命名
       renameRepeatNotice:'Un dossier nommé [{0}] existe déjà. Veuillez saisir un autre nom.',//重命名已存在
       renameLabel:"Renommer",
       openingTitle:'Ouverture. Ne déconnectez pas votre appareil', 
       fileExtChangeNotice:'Si vous modifiez l\'extension d\'un fichier, le fichier peut devenir inutilisable. Voulez-vous vraiment la modifier ?',//后缀变更
       openHeader:"Ouvrir le fichier",
       openingFailed:"Échec de l\'ouverture du fichier",      
       /*2014-10-15*/
      cMemoryLess:"Pas assez d'espace sur le disque C. Veuillez libérer de l'espace avant d'ouvrir des vidéos, des pistes audio, etc."      
    };
    return dictionary;
});