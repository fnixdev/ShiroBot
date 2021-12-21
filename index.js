const { default: makeWASocket, useSingleFileAuthState, DisconnectReason } = require("@adiwajshing/baileys-md")
const { state, saveState } = useSingleFileAuthState('./config/shirosession.json');
const fs = require('fs');
const logDB = './log/Log_VideoMessage.json';
const handler = require('./lib/handler.js');
const errorHandler = require("./lib/errorHandler");

const startSock = () => {
    const conn = makeWASocket({ printQRInTerminal: true, auth: state })

    conn.ev.on('messages.upsert', async m => {
        const message = m.messages[0]

        // send read receipt
        await conn.sendReadReceipt(message.key.remoteJid, message.key.participant, [message.key.id])
       
        if(message.key.remoteJid == "status@broadcast"){
            return;
        }
        if (!message.key.fromMe && m.type === 'notify') {
            
            // optional logging to get last message received
            fs.writeFileSync(logDB, JSON.stringify(m));

            try {
                await handler(conn, message);
            } catch (err) {
                const error = err.message;
                console.log(error);
                await errorHandler(conn, message, error)
            }
        }
    })

    conn.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect } = update
        if (connection === 'close') {
            lastDisconnect.error?.output?.statusCode !== DisconnectReason.loggedOut
                ? startSock()
                : console.log('+ connection closed')
        }
    })

    conn.ev.on('creds.update', saveState)

    return conn
}

startSock()