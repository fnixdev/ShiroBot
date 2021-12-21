const errButton = [
    { index: 1, urlButton: { displayText: 'Dono', url: 'https://t.me/fnixdev' } },
    { index: 2, urlButton: { displayText: 'Reportar Erro', url: 'https://github.com/fnixdev/ShiroBot/issue' } },
]

module.exports = async (conn, message, err) => {
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
                    footer: `${conn.user.name} ERROR MESSAGE`,
                    templateButtons: theButton,
                    headerType: 1
                }

                conn.sendMessage(senderNumber, buttonMessage);

                break;
            }

        case "connect ECONNREFUSED 127.0.0.1:80":
            {
                const buttonMessage = {
                    text: `Não foi possivel conectar ao servidor.\n\nContate o dono sobre este erro`,
                    footer: `${conn.user.name} ERROR MESSAGE`,
                    templateButtons: errButton,
                    headerType: 1
                }

                conn.sendMessage(senderNumber, buttonMessage);
                break;
            }

        case "Request failed with status code 500":
            {

                const buttonMessage = {
                    caption: `Ocorreu algum erro.\n\nContate o dono sobre este erro`,
                    footer: conn.user.name,
                    image: { url: 'https://http.cat/500' },
                    templateButtons: errButton,
                    headerType: 4
                }

                conn.sendMessage(senderNumber, buttonMessage);
                break;
            }

        default:
            {
                const buttonMessage = {
                    text: `Desculpe, ocorreu um problema \n\nPor favor, contate o dono para uma solução ou reparo\n\n\nError Log:\n\u0060\u0060\u0060${err}\u0060\u0060\u0060`,
                    footer: `${conn.user.name} ERROR MESSAGE`,
                    templateButtons: errButton,
                    headerType: 1
                }

                conn.sendMessage(senderNumber, buttonMessage);

                break;
            }
    }
}