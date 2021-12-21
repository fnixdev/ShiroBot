
const {
    MessageType,
    WAMessage,
    ReconnectMode,
    WAProto,
    useSingleFileAuthState,
    MediaType,
    DisconnectReason
} = require('@adiwajshing/baileys-md')
var pino = require("pino");
var baileys = require("@adiwajshing/baileys-md");
const axios = require('axios').default
const fs = require('fs')
const moment = require('moment-timezone')
const chalk = require('chalk')

const color1 = (texto, cor) => {
    return !color ? chalk.magenta(texto) : chalk.keyword(cor)(texto)
}
const color = (texto, cor) => {
    return !color ? chalk.cyan(texto) : chalk.keyword(cor)(texto)
}
const getGroupAdmins = (participantes) => {
    var admins = []
    for (let i of participantes) {
        i.admin === "admin" ? admins.push(i.id) : ''
    }
    return admins
}
const { saveState, state } = useSingleFileAuthState('./config/shirosession.json');


(async () => {
    const prefix = [
        '!'
    ]
    const client = baileys["default"]({
        printQRInTerminal: true,
        browser: ['Shiro MD Session', "Safari", "3.0"],
        logger: pino({ level: 'info' }),
        auth: state
    })


    client.ev.on('messages.upsert', async m => {
        try {
            if (!msg.message) return
            const msg = Object.keys(m.messages[0].message)[0].includes('senderKeyDistributionMessage') ? m.messages[1] : m.messages[0]
            msg.message = (Object.keys(msg.message)[0] === 'ephemeralMessage') ? msg.message.ephemeralMessage.message : msg.message
            
            if (msg.key && msg.key.remoteJid == 'status@broadcast') return
            if (msg.key.fromMe) return

            const from = msg.key.remoteJid
            const type = Object.keys(msg.message)[0]
            const time = moment.tz('America/Sao_Paulo').format('HH:mm:ss')

            var body = (type === 'conversation') ? msg.message.conversation : (type == 'imageMessage') ?
                msg.message?.imageMessage?.caption : (type == 'videoMessage') ?
                    msg.message?.videoMessage?.caption : (type == 'extendedTextMessage') ?
                        msg.message?.extendedTextMessage?.text : (type == 'buttonsResponseMessage') ?
                            msg.message.buttonsResponseMessage?.selectedButtonId : (type == 'liveLocationMessage') ?
                                msg.message.liveLocationMessage?.caption : (type == 'listResponseMessage') ?
                                    msg.message.listResponseMessage?.singleSelectReply?.selectedRowId : ''

            const isMedia = type.includes('videoMessage') || type.includes('imageMessage') || type.includes('stickerMessage') || type.includes('audioMessage') || type.includes('documentMessage')

            const isCmd = prefix.includes(body != '' && body.slice(0, 1)) && body.slice(1) != ''
            const comando = isCmd ? body.slice(1).trim().split(' ')[0].toLowerCase() : ''
            const args = body.trim().split(/ +/).slice(1)
            const isGroup = from.endsWith('@g.us')
            const author = isGroup ? msg.key.participant : msg.key.remoteJid
            const pushname = msg.pushName || "No Name"

            const groupMetadata = isGroup ? await client.groupMetadata(from) : ''
            const groupName = isGroup ? groupMetadata.subject : ''
            const groupMembers = isGroup ? groupMetadata.participants : ''
            const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''

            const botNumber = client.user.id.includes(':') ? client.user.id.split(':')[0] + '@s.whatsapp.net' : client.user.id
            const isGroupAdmins = groupAdmins.includes(author) || false
            function isBotAdmin() {
                var a1 = isGroup ? getGroupAdmins(groupMembers) : ''
                if (a1.includes(botNumber)) return true
                else return false
            }

            class conn {
                static reply(message, mentions = [author], options = { quoted: msg }) {
                    return client.sendMessage(from, { text: message, mentions: mentions }, options)
                }
                static sendImage(image, message = '', mentions = [author], options = { quoted: msg }) {
                    return client.sendMessage(from, { image: image, mentions: mentions, caption: message }, options)
                }
            }
            if (!isGroup && isCmd) console.log(color('COMMAND RECEIVED'), color(time, 'yellow'), color1(comando), 'OF', color1(pushname))
            if (isCmd && isGroup) console.log(color('COMMAND RECEIVED'), color(time, 'yellow'), color1(comando), 'OF', color1(pushname), 'IN', color(groupName))

            if (isCmd) {
                switch (comando) {
                    case 'msg':
                        conn.reply(JSON.stringify(msg, null, '\t'))
                        break
                    case 'sendtext':
                        conn.reply(`Text Here`)
                        break
                }
            }

        } catch (err) {
            console.log(err)
        }
    })
    client.ev.on('group-participants.update', async (update) => {
        console.log(update)
    })

    client.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect } = update
        if (connection === 'close') {
            //const shouldReconnect = (lastDisconnect.error as Boom)?.output?.statusCode !== DisconnectReason.loggedOut
            console.log('❌ - Connection Closed\nReason: ', lastDisconnect.error)
            process.exit()
        } else if (connection === 'open') {
            console.log(color(`✅ - BOT Started!`, 'green'))
        } else if (connection === 'connecting') {
            console.log(color(`✅ - Connecting on WhatsApp Web...`, 'green'))
        }
    })

   client.ev.on('creds.update', () => saveState)
})()