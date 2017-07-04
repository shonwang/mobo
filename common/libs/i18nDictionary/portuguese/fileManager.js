/**
 * @author liujintao
 */
define('portuguese:fileManager', function(require, exports, module){
    var dictionary = {
        ImportFile: 'Importar Arquivos',
        ImportDirectory: 'Importar Pasta',
        sureDelete : "Tem certeza que deseja deletar os arquivos selecionados?",
        
        exportingTitle:"Exportando, por favor mantenha o dispositivo conectado.",
        deletingTitle:"Deletando, por favor mantenha o dispositivo conectado.",
        /*2014-07-26*/
        copingTitle:"Por favor mantenha o dispositivo conectado.",
        copySuccess:"Os arquivos foram copiado com sucesso.",
        sdCard:'Cartão SD',
        extSdCard:'Cartão SD externo',
        pasteLabel:"Colar",
        newFolder:"Nova pasta",
        /*2014-08-04*/
       selectMultiInfo:"{0} Pastas, {1} Arquivos selecionados",
       selectDirectoryInfo:"{0} Pastas, {1} Arquivos selecionados ",
       sdCardUsage:"Total: {0}, Disponível: {1}",
       sizeLabel:"Tamanho: {0}",
       modifiedTime:"Período de Modificação: {0}",
       /*2014-08-08*/
       importingTitle:'Importação em processo, mantenha o dispositivo conectado.',
	   /*2014-08-11*/
       noSdCardNotice:'Impossível ler o Cartãp SD, por favor assegure que o Cartão em seu dispositivoestá funcionando.',
       confirmFileReplace:'{0} Arquivo já existe. Tem certeza que vovê quer substituí-lo?',
       /*2014-08-18*/
      deleteFailed:"Deletado {0} arquivos/pastas com sucesso, falha em deletar {1}:",
       importFailed:"Importar {0} arquivos/pastas com sucesso, falha em importar {1}:",
	   createFolderFailed:"Falha na criação da pasta",
       exportFailed:"Exportar {0} arquivos/pastas com sucesso, falha em exportar {1}:",
       copyFailed:"Cópia de {0} arquivos/pastas com sucesso, falha em copiar {1}:",
       /*2014-08-21*/
      renameFailed:"Falha em Renomear",
      spaceFailed:"Falha. Espaço insuficiente.",
      nosdcontent:"Esta pasta está vazia.",
       /*2014-09-11*/
       specailCharNotice:'Os caracteres a seguir não são permitidos para o nome de pasta: |/\:*?"<>',//重命名
       renameRepeatNotice:'Uma pasta nomeada [{0}] já existe. Por favor nomeie diferente.',//重命名已存在
       renameLabel:"Renomear",
       openingTitle:'Abrindo. Mantenha seu dispositivo conectado', 
       fileExtChangeNotice:'Se você mudar o nome da extensão do arquivo, este poderá tornar-se inútil. Tem certeza que quer mudar?',//后缀变更
       openHeader:"Abrir Arquivo",
       openingFailed:"Falha em abrir o arquivo",     
       /*2014-10-15*/
      cMemoryLess:"Sem espaço suficiente no Drive C. Por favor libere algum espaço antes de abrir vídeos, música, etc."      
    };
    return dictionary;
});