// De 104 para 32
const fs = require("fs")
const { default: makeWASocket, BufferJSON, initInMemoryKeyStore, DisconnectReason, MessageType,
    MessageOptions, MimeType } = require("@adiwajshing/baileys-md")
const { state, saveState } = useSingleFileAuthState('./config/shirosession.json')
const config = require('./config/config.json')
const { banner, getBuffer, getRandom } = require('./src/functions')

// imports

const prefix = config.prefix


const startSock = () => {
    const sock = makeWASocket({ printQRInTerminal: true, auth: state })

    sock.ev.on('messages.upsert', async m => {
        const msg = m.messages[0]
        if (!msg.key.fromMe && m.type === 'notify') {
            console.log('+ respondendo: ', msg.key.remoteJid)
            await sock.sendReadReceipt(msg.key.remoteJid, msg.key.participant, [msg.key.id])
            await sock.sendMessage(msg.key.remoteJid, 
            fs.readFileSync("./src/shiro.jpeg"),
            MessageType.photo,
            { mimetype: Mimetype.jpeg, caption: 'Opa! Shiro is alive' })
        }
    })

    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect } = update
        if (connection === 'close') {
            lastDisconnect.error?.output?.statusCode !== DisconnectReason.loggedOut
                ? startSock()
                : console.log('+ connection closed')
        }
        console.log('+ connection update', update)
    })
    
    
    sock.ev.on('creds.update', saveState)

    return sock
}

startSock()