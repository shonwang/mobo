define('france:task', function(require, exports, module){
    var dictionary = {
        setingAsWallpaper: 'Définir comme fond d\'écran...',
        setingAsRingtone: 'Définition comme sonnerie...',
        setRingtoneSuccess: 'Définition de la sonnerie réussie',
        setRingtoneFailed: 'Échec de définition de la sonnerie',
        
        insuficientSpace: 'Échec de l\'installation. Espace insuffisant',
        noSdCard: 'Échec de l\'installation. Aucune carte SD',
        noSuchSourceFile: 'Échec de l\'installation. Fichier inexistant',
        inValidApkFile: 'Échec de l\'installation. Fichier apk.<br/>non valide',
        unknowSourceSetting: 'Échec de l\'installation. Cochez la case "Sources Inconnues" dans Paramètres > Applications',
        installPhoneMemory: 'Veuillez installer dans la mémoire',
        unknownError: 'Erreur inconnue',
        networkErrorText: 'Erreur réseau',
        
        waitingText: 'En attente',/*不超过56个字符*/
        pausedText: 'En pause',/*不超过24个字符*/
        installUnknownError: 'Échec de l\'installation. Erreur inconnue',
        downloadUnknownError: 'Échec du téléchargement Erreur inconnue',
        
        adbConnectionError: 'Connecter l\'appareil à installer',
        
        importFileNotExistedText: 'Échec de l\'importation. Le fichier n\'existe pas',
        importTransferErrorText: 'Échec de l\'importation. Erreur de transfert de fichier',
        importInsufficientSpace: 'Échec de l\'importation. Espace insuffisant',
        importUnknownError: 'Échec de l\'importation. Erreur inconnue',
        importUnConnectError: 'Connecter l\'appareil à importer',
        importFailedNoSdCard: 'Échec de l\'importation. Aucune carte SD',
        installSdkOlderError: 'Incompatible avec l\'appareil',
        installMismatchedCertificateError: 'Le certificat APK ne correspond pas. Veuillez désinstaller l\'application actuelle avant de procéder à l\'installation',
        
        transferringText: 'Transfert...',/*不超过55个字符*/
        settedText: 'Défini dans {0}',
        importViaConnectText: 'Connecter l\'appareil à importer',
        
        installFailedText: 'Échec de l\'installation',
        
        openFolder:'Ouvrir le dossier des téléchargements',
        
        downloadInText: 'Téléchargé(s) dans {0}',
        reinstallText: 'Réinstaller',/*不超过15个字符*/
        noTaskText: 'Aucune tâche.',
        /*6-04*/
        unknowSource2Setting: "Échec de l\'installation. Cochez la case « Sources Inconnues » dans Paramètres > Sécurité",
        
        unzipAppText:"Extraction des données du fichier",
        transferDataFile:"Transfert des données du fichier",
        unzipAppFailedText:"Échec de l'extraction des données du fichier",
        transferAppFailedText:"Échec du transfert des données du fichier",
        /*7-28*/
        hideTaskTip:"Masquer",
        /*2014-09-25*/
        showInstallPopLabel:"Install",
        /*2014-10-14*/
        installOnDeviceText: 'Veuillez terminer  l\'installation sur votre appareil.',
         /*2014-10-16*/
        pleaseTapInstall:"Sélectionnez «Installer» sur votre appareil.",
        /*2014-11-10*/
        installSdCard: "Installer sur la RAM",
        onlyInstallSdCard: "Cette application peut uniquement être installée sur la mémoire RAM de votre appareil.",
        /*2015-1-7yangtian*/
        insufficeient:"Espace disque faible"
    };
    return dictionary;
});