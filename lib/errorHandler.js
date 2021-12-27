const errButton = [
    { index: 1, urlButton: { displayText: 'Dono', url: 'https://t.me/fnixdev' } },
    { index: 2, urlButton: { displayText: 'Reportar Erro', url: 'https://github.com/fnixdev/ShiroBot/issue' } },
]

module.exports = async (client, message, err) => {
    const senderNumber = message.key.remoteJid;

    switch (err) {
        case "Cannot read properties of undefined (reading 'Key')":
            {
                const theButton = [
                    { index: 1, urlButton: {  displayText: 'Dono', url: 'https://t.me/fnixdev' } },
                    { index: 2, quickReplyButton: { displayText: 'Menu', id: 'menu' } },
                ]

                const buttonMessage = {
                    text: `Comando não encontrado\n\nSe é algum problema com o comando, contate o dono.`,
                    footer: `${client.user.name} ERROR MESSAGE`,
                    templateButtons: theButton,
                    headerType: 1
                }

                client.sendMessage(senderNumber, buttonMessage);

                break;
            }

        case "connect ECONNREFUSED 127.0.0.1:80":
            {
                const buttonMessage = {
                    text: `Não foi possivel conectar ao servidor.\n\nContate o dono sobre este erro`,
                    footer: `${client.user.name} ERROR MESSAGE`,
                    templateButtons: errButton,
                    headerType: 1
                }

                client.sendMessage(senderNumber, buttonMessage);
                break;
            }

        case "Request failed with status code 500":
            {

                const buttonMessage = {
                    caption: `Ocorreu algum erro.\n\nContate o dono sobre este erro`,
                    footer: client.user.name,
                    image: { url: 'https://http.cat/500' },
                    templateButtons: errButton,
                    headerType: 4
                }

                client.sendMessage(senderNumber, buttonMessage);
                break;
            }
    }
}