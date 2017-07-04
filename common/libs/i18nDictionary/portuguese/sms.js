define('portuguese:sms', function(require, exports, module){
    var dictionary = {
        sendTo: 'Enviar para',
        characters: 'caractere(s)',
        pressCE: 'Pressione Ctrl+Enter para enviar',
        writeMessage: 'Escreva a mensagem aqui.',
        send: 'Enviar',
        allGroup: 'Todos do grupo',
        selectAll: 'Selecionar tudo',
        removeAll: 'Remova tudo',
        emptyInfo:'Enviar uma mensagem de texto para o seu amigo.',
        newMessage: 'Nova mensagem',
        msgSelected: '{0} Mensagem(s) selecionada(s)',
        promptDelete: 'Deseja mesmo excluir as {0} sessões selecionadas ({1} mensagens)?',
        importLable: "Importar",
        exportLabel: "Exportar",
        deleteLabel: "Excluir",
        refreshLabel: "Atualizar",
        addContact: "Adicionar contato",
        editContact: "Editar contato",
        loadMore: "Carregar mais",
        /*2014-5-30*/
       	contacts: '{0} contato(s) selecionado(s)',
        contactName:"Número de telefone ou nome de contato",

        selectedMsgLabel: "Mensagens selecionadas ({0})",
        allMsgLabel: "Todas as mensagens ({0})",

        exportSuccess:"{0} mensagens exportadas com êxito.",
        exportFailed:"{0} mensagens exportadas com êxito, {1} com falha:",
        /*2014-5-31*/
        deleteFailed:"Exclusão de {0} mensagens com êxito, falha na exclusão de {1}: ",
        /*2014-6-18*/
        markasRead:"Marcar como lida",
        /*2014-07-22*/
       smsPermissionNotice:"As permissões de SMS podem ter sido bloqueadas por um aplicativo de segurança. Habilite as permissões em [Gerenciador de Permissões]",
       emptySMS:"Não há mensagens no seu dispositivo.",
    };
    return dictionary;
});
