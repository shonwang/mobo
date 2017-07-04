define('portuguese:contact', function(require, exports, module){
    var dictionary = {
        sideLabel: 'Contatos',
        message: 'Mensagens',
        music: 'Minhas músicas',
        photo: 'Minhas fotos',
        video: 'Meus vídeos',
        backup: 'Backup e restauração',
        ChangeIcon:'Alterar',
        MessageRecord:'Registros de mensagens',
        Note:'Nota',
        Save:'Salvar',
        Edit:'Editar',
        Cancel:'Cancelar',
        inputhere:'inserir aqui',
        ContactSelected:'<span class="contacts-count selectedNum f18">{0}</span> Contatos selecionados',
        SendMessage:'Enviar mensagem',
        Filter:'Filtro',
        AllContacts:'Todos os contatos',
        AllGroups:'Todos os grupos',
        NewContact:'Novo contato',
        ContactInfomation:'Informações do contato',
        //add 2014-03-24
        sureDeleteTitle:'Deseja mesmo excluir os {0} contatos selecionados?',
        deleteFailed:"Falha ao excluir.",
        
        importingTitle:'Importação em andamento, mantenha conectado',
        importHeader:"Importar contato(s)",
        
        exportSuccess:"Êxito ao exportar {0} contatos.",
        exportFailed:"Falha ao exportar.",
        
        addContactText:'Adicionar contatos, pesquisar no catálogo e enviar mensagens.',
        newContact: 'Novo contato',
        writeMessage:'Escreva sua mensagem aqui...',
        Mobile: 'Celular',
        //add 2014-04-09
        deletingTitle:'Exclusão em andamento, mantenha conectado',
        //2014-5-26
        addTipText:"Adicionar",
        accountLabel:"Conta: ",
        emptyContact:"Master, não há contatos em seu telefone",
        //2014-05-29
        deleteTipText:"Excluir",
        smsTipText:"SMS",
        
        importFailed:"Importação de {0} contatos com êxito,falha ao importar {1}",
        exportHeader:"Exportar contato(s)",
        exportAll:"Todos os contatos <em class='c-9'>({0})</em>",
        exportSelect:"Contatos selecionados <em class='c-9'>({0})</em>",
        //2014-06-03
        editgroup:"Editar grupo",
        notassigened:"Sem atribuição",
        saveFailed:'Falha ao salvar contato. Tente novamente mais tarde.',
        //2014-06-11
        fileError:'Falha. Arquivo vcf inválido',
        groupText:'Grupo',
        
        /*2014-07-22*/
       contactPermissionNotice:"As permissões de contato podem ter sido bloqueadas por um aplicativo de segurança. Habilite as permissões em [Gerenciador de Permissões]",
       //2014-08-18 保存分组失败
         saveGroupFailed:'Falha para salvar o grupo. Por favor tente mais tarde.'
    };
    return dictionary;
});
