/**
 * Base Create By Dika Ardnt.
 * Updated by fnixdev
 * Follow https://github.com/fnixdev
 **/


require('./config')
const { default: makeWASocket, BufferJSON, WA_DEFAULT_EPHEMERAL, generateWAMessageFromContent, downloadContentFromMessage, downloadHistory, proto, getMessage, generateWAMessageContent, prepareWAMessageMedia } = require('@adiwajshing/baileys-md')
const fs = require('fs')
const util = require('util')
const chalk = require('chalk')
const { exec, spawn, execSync } = require("child_process")
const axios = require('axios')
const { fromBuffer } = require('file-type')
const path = require('path')
const os = require('os')
const speed = require('performance-now')
const yts = require('yt-search')

// SRC
const config = JSON.parse(fs.readFileSync('./src/config.json'))
const nsfw = JSON.parse(fs.readFileSync('./src/nsfw.json'))

// LIB

const { y2mateA, y2mateV } = require('./lib/y2mate')
const { performance } = require('perf_hooks')
const { UploadFileUgu, webp2mp4File, TelegraPh } = require('./lib/uploader')
const { smsg, getGroupAdmins, formatp, tanggal, formatDate, getTime, isUrl, sleep, clockString, runtime, fetchJson, getBuffer, jsonformat, delay, format, logic, generateProfilePicture, parseMention, getRandom } = require('./lib/myfunc')



global.owner = [config.dono]

module.exports = shiro = async (shiro, m, chatUpdate) => {
    try {
        var body = (m.mtype === 'conversation') ? m.message.conversation : (m.mtype == 'imageMessage') ? m.message.imageMessage.caption : (m.mtype == 'videoMessage') ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage') ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'listResponseMessage') ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.mtype == 'templateButtonReplyMessage') ? m.message.templateButtonReplyMessage.selectedId : (m.mtype === 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text) : ''
        var budy = (typeof m.text == 'string' ? m.text : '')
        
        //
        var prefix = prefa ? /^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@#$%^&.©^]/gi.test(body) ? body.match(/^[°•π÷×¶∆£¢€¥®™+✓_=|~!?@#$%^&.©^]/gi)[0] : "" : prefa ?? global.prefix
        const isCmd = prefix.includes(body != '' && body.slice(0, 1)) && body.slice(1) != ''
        const command = isCmd ? body.slice(1).trim().split(' ')[0].toLowerCase() : ''
        //
        
        const args = body.trim().split(/ +/).slice(1)
        const pushname = m.pushName || "No Name"
        
        const isCreator = [shiro.user.id, ...global.owner].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
        const itsMe = m.sender == shiro.user.id ? true : false
        const text = q = args.join(" ")
        const quoted = m.quoted ? m.quoted : m
        const mime = (quoted.msg || quoted).mimetype || ''
	      const isMedia = /image|video|sticker|audio/.test(mime)
	
        // Group
        const groupMetadata = m.isGroup ? await shiro.groupMetadata(m.chat).catch(e => {}) : ''
        const groupName = m.isGroup ? groupMetadata.subject : ''
        const participants = m.isGroup ? await groupMetadata.participants : ''
        const groupAdmins = m.isGroup ? await getGroupAdmins(participants) : ''
      	const isBotAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false
        const isGroupAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false
        
        // NSFW
        const isNsfw = m.isGroup ? nsfw.includes(groupMetadata.id) : false

        // Bot Status
        const used = process.memoryUsage()
        const cpus = os.cpus().map(cpu => {
            cpu.total = Object.keys(cpu.times).reduce((last, type) => last + cpu.times[type], 0)
			return cpu
        })
        const cpu = cpus.reduce((last, cpu, _, { length }) => {
            last.total += cpu.total
			last.speed += cpu.speed / length
			last.times.user += cpu.times.user
			last.times.nice += cpu.times.nice
			last.times.sys += cpu.times.sys
			last.times.idle += cpu.times.idle
			last.times.irq += cpu.times.irq
			return last
        }, {
            speed: 0,
			total: 0,
			times: {
			    user: 0,
			    nice: 0,
			    sys: 0,
			    idle: 0,
			    irq: 0
            }
        })


///////////////////////////////////////////////////////////
//                                                       //
//                   Public/Self                         //
//                                                       //
///////////////////////////////////////////////////////////

        if (!shiro.public) {
            if (!m.key.fromMe) return
        }

///////////////////////////////////////////////////////////
//                                                       //
//           Lida com as mensagens no console            //
//                                                       //
///////////////////////////////////////////////////////////

            if (isCmd){
                  console.log(chalk.black(chalk.bgCyanBright('[ CMD ]')), chalk.black(chalk.cyan.bold(budy || m.mtype)) + '\n' + chalk.magenta('=> De'), chalk.green(pushname), chalk.yellow(m.sender) + '\n' + chalk.magenta('=> Em'), chalk.green(m.isGroup ? groupName : groupName))
                }
                else {
                  console.log(chalk.black(chalk.bgWhiteBright('[ MSG ]')), chalk.black(chalk.white.bold(budy || m.mtype)) + '\n' + chalk.magenta('=> De'), chalk.green(pushname), chalk.yellow(m.sender) + '\n' + chalk.magenta('=> Em'), chalk.green(m.isGroup ? groupName : groupName))
                  }

///////////////////////////////////////////////////////////
//                                                       //
//                Comandos de Dono                       //
//                                                       //
///////////////////////////////////////////////////////////

        switch(command) {
            case 'chat': {
                if (!isCreator) throw mess.owner
                if (!q) throw '_Opções :\n1 - mute\n2 - unmute_'
                if (args[0] === 'mute') {
                    shiro.chatModify({ mute: 'Infinity' }, m.chat, []).then((res) => m.reply(jsonformat(res))).catch((err) => m.reply(jsonformat(err)))
                } else if (args[0] === 'unmute') {
                    shiro.chatModify({ mute: null }, m.chat, []).then((res) => m.reply(jsonformat(res))).catch((err) => m.reply(jsonformat(err)))
                }
            }
            break
            case 'join': {
                if (!isCreator) throw mess.owner
                if (!text) throw 'Insira o link do grupo!'
                if (!isUrl(args[0]) && !args[0].includes('whatsapp.com')) throw 'Link Invalido!'
                m.reply(mess.wait)
                let result = args[0].split('https://chat.whatsapp.com/')[1]
                await shiro.groupAcceptInvite(result).then((res) => m.reply(jsonformat(res))).catch((err) => m.reply(jsonformat(err)))
            }
            break
            case 'public': {
                if (!isCreator) throw mess.owner
                shiro.public = true
                m.reply('Bot agora esta no modo público.')
            }
            break
            case 'self': {
                if (!isCreator) throw mess.owner
                shiro.public = false
                m.reply('Bot agora esta no modo privado')
            }
            break
            case 'ping': case 'botstatus': case 'statusbot': {
                if (!isCreator) throw mess.owner
                let timestamp = speed()
                let latensi = speed() - timestamp
                neww = performance.now()
                oldd = performance.now()
                respon = `*Ping*: ${latensi.toFixed(4)}ms\n*Uptime*: ${runtime(process.uptime())}\n*RAM*: ${formatp(os.totalmem() - os.freemem())} / ${formatp(os.totalmem())}\n\n*NodeJS Usage*\n${Object.keys(used).map((key, _, arr) => `${key.padEnd(Math.max(...arr.map(v=>v.length)),' ')}: ${formatp(used[key])}`).join('\n')}
                `.trim()
                m.reply(respon)
            }
            break
           case 'block': {
	             	if (!isCreator) throw mess.owner
	            	let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
	            	await shiro.updateBlockStatus(users, 'block').then((res) => m.reply('_Usuario bloquedo_')).catch((err) => m.reply(jsonformat(err)))
	          }
          	break
            case 'unblock': {
		            if (!isCreator) throw mess.owner
	             	let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
		            await shiro.updateBlockStatus(users, 'unblock').then((res) => m.reply('_Usuario desbloqueado_')).catch((err) => m.reply(jsonformat(err)))
	          }
          	break
            case 'update': {
                if (!isCreator) throw mess.owner
                stdout = execSync('git remote set-url origin https://github.com/fnixdev/ShiroBot.git && git pull')
                m.reply(stdout.toString())
                }
            break


///////////////////////////////////////////////////////////
//                                                       //
//                   Comandos de ADM                     //
//                                                       //
///////////////////////////////////////////////////////////

          	case 'kick': {
	            	if (!m.isGroup) throw mess.group
                if (!isBotAdmins) throw mess.botAdmin
                if (!isGroupAdmins) throw mess.admin
		            let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
	              if (users){
	                await shiro.sendMessage(m.chat, { video: { url: "./src/banido.mp4" }, caption: 'Banido, banido, banido' }, { quoted: m}) ,shiro.groupParticipantsUpdate(m.chat, [users], 'remove')
	              } else {
	                await m.reply('Eu preciso que você marque ou mencione um usuario')
	              }
          	}
	          break
	          case 'add': {
	            	if (!m.isGroup) throw mess.group
                if (!isBotAdmins) throw mess.botAdmin
                if (!isGroupAdmins) throw mess.admin
	             	let users = m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
		            await shiro.groupParticipantsUpdate(m.chat, [users], 'add').then((res) => m.reply(jsonformat(res))).catch((err) => m.reply(jsonformat(err)))
	          }
          	break
          	case 'promote': {
            		if (!m.isGroup) throw mess.group
                if (!isBotAdmins) throw mess.botAdmin
                if (!isGroupAdmins) throw mess.admin
	            	let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
	            	await shiro.groupParticipantsUpdate(m.chat, [users], 'promote').then((res) => m.reply('_Usuario Promovido_')).catch((err) => m.reply(jsonformat(err)))
          	}
          	break
          	case 'demote': {
		            if (!m.isGroup) throw mess.group
                if (!isBotAdmins) throw mess.botAdmin
                if (!isGroupAdmins) throw mess.admin
		            let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
            		await shiro.groupParticipantsUpdate(m.chat, [users], 'demote').then((res) => m.reply('_Usuario foi rebaixado a membro comum_')).catch((err) => m.reply(jsonformat(err)))
           	}
	          break
		    		case 'nsfw':
		            if (!m.isGroup) throw mess.group
                if (!isBotAdmins) throw mess.botAdmin
                if (!isGroupAdmins) throw mess.admin
		      			if (!text) return m.reply('Hmmmm')
		      			if (Number(text[0]) === 1) {
		     				if (isNsfw) return m.reply('_A putaria ja esta liberada._')
	    					nsfw.push(groupMetadata.id)
	    					fs.writeFileSync('./src/nsfw.json', JSON.stringify(nsfw))
    						m.reply('_A putaria foi liberada 😈_')
      					} else if (Number(args[0]) === 0) {
		    				nsfw.splice(groupMetadata.id, 1)
    						fs.writeFileSync('./src/nsfw.json', JSON.stringify(nsfw))
				    		m.reply('_Nsfw foi desativado no grupo_')
	    				  } else {
				    		m.reply('_Digite 1 para ativar ou 0 para desativar._')
    					  }
            break
            
///////////////////////////////////////////////////////////
//                                                       //
//                   Comandos Gerais                     //
//                                                       //
///////////////////////////////////////////////////////////

            case 'linkgrupo': case 'link': {
                if (!m.isGroup) throw mess.group
                let response = await shiro.groupInviteCode(m.chat)
                shiro.sendText(m.chat, `https://chat.whatsapp.com/${response}\n\nLink do grupo : ${groupMetadata.subject}`, m, { detectLink: true })
            }
            break
            case 'source': case 'shiro': {
                const fnix = 'https://telegra.ph/file/d7d397bcc9208d6407818.jpg'
                anu = `┌──⭓ *Shiro Bot* ✨\n│\n│▸ _Bot com intuito de aprender_\n│  _programação em JavaScript_\n│\n│▸ *Dono*: fnixdev\n│▸ https://github.com/fnixdev/ShiroBot\n│\n└───────⭓\n`
                shiro.sendMessage(m.chat, { image: { url: fnix }, caption: anu }, { quoted: m })
                }
            break
            case 'sticker': case 'stickergif': case 'sgif': {
                if (!quoted) throw `Responda a uma imagem/video ${prefix + command}`
                if (/image/.test(mime)) {
                    let media = await quoted.download()
                    let encmedia = await shiro.sendImageAsSticker(m.chat, media, m, { packname: global.packname, author: global.author })
                await fs.unlinkSync(encmedia)
                } else if (/video/.test(mime)) {
                if ((quoted.msg || quoted).seconds > 11)   return m.reply('10 segundos no máximo!')
                    let media = await quoted.download()
                    let encmedia = await shiro.sendVideoAsSticker(m.chat, media, m, { packname: global.packname, author: global.author })
                await fs.unlinkSync(encmedia)
                } else {
                        throw `Envie uma foto/video\nO video deve ter de 1 a 9 segundos`
                }
            }
            break
            case 'toimage': case 'toimg': {
                if (!quoted) throw 'Reply Image'
                if (!/webp/.test(mime)) throw `Responda a um sticker *${prefix + command}*`
                m.reply(mess.wait)
                let media = await shiro.downloadAndSaveMediaMessage(quoted)
                let ran = await getRandom('.png')
                exec(`ffmpeg -i ${media} ${ran}`, (err) => {
                    fs.unlinkSync(media)
                    if (err) throw err
                    let buffer = fs.readFileSync(ran)
                    shiro.sendMessage(m.chat, { image: buffer }, { quoted: m })
                    fs.unlinkSync(ran)
                })
            }
            break
	          case 'tomp4': case 'tovideo': {
                if (!quoted) throw 'Reply Image'
                if (!/webp/.test(mime)) throw `Responda a um sticker animado *${prefix + command}*`
                m.reply(mess.wait)
                let media = await shiro.downloadAndSaveMediaMessage(quoted)
                let webpToMp4 = await webp2mp4File(media)
                await shiro.sendMessage(m.chat, { video: { url: webpToMp4.result, caption: 'Convert Webp To Video' } }, { quoted: m })
                await fs.unlinkSync(media)
            }
            break
            case 'togif': {
                if (!quoted) throw 'Reply Image'
                if (!/webp/.test(mime)) throw `Responda a um sticker *${prefix + command}*`
                m.reply(mess.wait)
                let media = await shiro.downloadAndSaveMediaMessage(quoted)
                let webpToMp4 = await webp2mp4File(media)
                await shiro.sendMessage(m.chat, { video: { url: webpToMp4.result, caption: 'Convert Webp To Video' }, gifPlayback: true }, { quoted: m })
                await fs.unlinkSync(media)
            }
            break
	          case 'tourl': {
                m.reply(mess.wait)
                let media = await shiro.downloadAndSaveMediaMessage(quoted)
                if (/image/.test(mime)) {
                    let anu = await TelegraPh(media)
                    m.reply(util.format(anu))
                } else if (!/image/.test(mime)) {
                    let anu = await UploadFileUgu(media)
                    m.reply(util.format(anu))
                }
                await fs.unlinkSync(media)
            }
            break
            case 'owner': case 'creator': case 'dono': {
                let vcard = 'BEGIN:VCARD\n' // metadata of the contact card
                    + 'VERSION:3.0\n' 
                    + 'N:;fnix.;;;'
                    + 'FN:Luis Gustavo.\n'
                    + 'ORG:fnix (KuuhakuTeam);\n'
                    + 'TEL;type=CELL;type=VOICE;waid=553189092420:+55 31 89092420\n'
                    + 'END:VCARD'
                shiro.sendMessage(m.chat, { contacts: { displayName: 'fnix.', contacts: [{ vcard }] } }, { quoted: m })
            }
            break
            case 'help': case 'menu': {
                anu = `    _Oi, eu sou ShiroBot ✨_
_Por enquanto não faço muita coisa_

┌──⭓ *Menu Principal*
│
│▸ ${prefix}dono
│▸ ${prefix}shiro / ${prefix}source
│▸ ${prefix}menu / ${prefix}help
│▸ ${prefix}animemenu
│
└───────⭓

┌──⭓ *Menu de Grupo*
│
│▸ ${prefix}link
│▸ ${prefix}add @user
│▸ ${prefix}kick @user
│▸ ${prefix}promote @user
│▸ ${prefix}demote @user
│▸ ${prefix}welcome [opção]
│
└───────⭓

┌──⭓ *Download Menu*
│
│▸ ${prefix}mp3 
│▸ ${prefix}mp4
│▸ ${prefix}tiktok [link]
│
└───────⭓ 

┌──⭓ *Ultilidades*
│
│▸ ${prefix}mine
│▸ ${prefix}discord
│
└───────⭓ 

┌──⭓ *Convert Menu*
│
│▸ ${prefix}toimage
│▸ ${prefix}sticker
│▸ ${prefix}tovideo
│▸ ${prefix}togif
│▸ ${prefix}tourl
│
└───────⭓ 

┌──⭓ *Menu Dono*
│
│▸ ${prefix}ping
│▸ ${prefix}chat [opção]
│▸ ${prefix}join [link]
│▸ ${prefix}leave
│▸ ${prefix}block @user
│▸ ${prefix}unblock @user
│
└───────⭓`
                let message = await prepareWAMessageMedia({ image: fs.readFileSync('./src/shiro.jpg') }, { upload: shiro.waUploadToServer })
                const template = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
                    templateMessage: {
                        hydratedTemplate: {
                            imageMessage: message.imageMessage,
                            hydratedContentText: anu,
                            hydratedButtons: [{
                                urlButton: {
                                    displayText: 'Dono',
                                    url: 'https://github.com/fnixdev/'
                                }
                            }]
                        }
                    }
                }), { userJid: m.chat, quoted: m })
                shiro.relayMessage(m.chat, template.message, { messageId: template.key.id })
            }
            break
            case 'mine': {
                const min = 'https://telegra.ph/file/0c97e206340a796a1e0cc.jpg'
                anu = `_Clique no botão abaixo para baixar a ultima versão do minecraft_`
                let message = await prepareWAMessageMedia({ image: { url: min }}, { upload: shiro.waUploadToServer })
                const template = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
                    templateMessage: {
                        hydratedTemplate: {
                            imageMessage: message.imageMessage,
                            hydratedContentText: anu,
                            hydratedButtons: [{
                                urlButton: {
                                    displayText: 'Baixar Minecraft',
                                    url: 'https://www.mediafire.com/file/wtrpb1rluqdgpm5/Minecraft-1.18.2.03-Official-by-wadduk.apk/file'
                                }
                            }]
                        }
                    }
                }), { userJid: m.chat, quoted: m })
                shiro.relayMessage(m.chat, template.message, { messageId: template.key.id })
            }
            break
            case 'discord': {
                const disc = 'https://telegra.ph/file/5202907a4419530e0848d.jpg'
                anu = `_Clique no botão abaixo para baixar entrar no nosso servidor do Discord_`
                let message = await prepareWAMessageMedia({ image: { url: disc }}, { upload: shiro.waUploadToServer })
                const template = generateWAMessageFromContent(m.chat, proto.Message.fromObject({
                    templateMessage: {
                        hydratedTemplate: {
                            imageMessage: message.imageMessage,
                            hydratedContentText: anu,
                            hydratedButtons: [{
                                urlButton: {
                                    displayText: 'Entrar no Discord',
                                    url: 'https://discord.gg/PQncrzqHmb'
                                }
                            }]
                        }
                    }
                }), { userJid: m.chat, quoted: m })
                shiro.relayMessage(m.chat, template.message, { messageId: template.key.id })
            }
            break

///////////////////////////////////////////////////////////
//                                                       //
//                      Anime                            //
//                                                       //
///////////////////////////////////////////////////////////

            case 'menuanime': case 'animemenu':{
                capt = `    _Oi, eu sou ShiroBot ✨_

┌──⭓ *Procurar Anime*
│
│▸ ${prefix}anime [Nome]
│▸ ${prefix}manga (indisponi)
│
└───────⭓ 

┌──⭓ *Anime Fotos/Gifs*
│
│▸ ${prefix}neko
│▸ ${prefix}waifu
│▸ ${prefix}wallpaper
│▸ ${prefix}kiss
│▸ ${prefix}nekogif
│▸ ${prefix}poke
│▸ ${prefix}smug
│▸ ${prefix}cute
│▸ ${prefix}baka
│▸ ${prefix}foxgirl
│
└───────⭓`
                let animeMessage = {
                    video: { url: './src/shiro.gif' },
                    caption: capt,
                    gifPlayback: true,
                    footerText: 'Menu Anime • ShiroBot',
                    headerType: 4
                }
                shiro.sendMessage(m.chat, animeMessage, { quoted: m })
            }
            break
            case 'anime': {
                if (!text) throw 'Eu preciso que você digite algo para pesquisar!'
                m.reply(mess.wait)
                const res = await axios.get(`https://api.jikan.moe/v3/search/anime?q=${text}`)
                animeinfo = `✨️ *Título:* ${res.data.results[0].title}\n🎆️ *Episódios:* ${res.data.results[0].episodes}\n💌️ *Avaliação:* ${res.data.results[0].rated}\n❤️ *Score:* ${res.data.results[0].score}\n💚️ *Descrição:* ${res.data.results[0].synopsis}\n`
                shiro.sendMessage(m.chat, { image: { url: res.data.results[0].image_url }, caption: animeinfo }, { quoted: m})
            }
            break
            case 'neko': {
                let neko = await axios.get('https://nekos.life/api/v2/img/neko')
                shiro.sendMessage(m.chat, { image: { url: neko.data.url }, caption: `_Vai bater pra 2d ne safado_` }, { quoted: m})
            }
            break
            case 'wallpaper': {
                let neko = await axios.get('https://nekos.life/api/v2/img/wallpaper')
                shiro.sendMessage(m.chat, { image: neko.data.url }, { quoted: m})
            }
            break
            case 'waifu': {
                let neko = await axios.get('https://api.waifu.pics/sfw/waifu')
                shiro.sendMessage(m.chat, { image: { url: neko.data.url }, }, { quoted: m})
            }
            break
            
            // NSFW CMDS
            
            case 'anal': {
              if (!m.isGroup) throw mess.group
              let neko = await axios.get('https://nekos.life/api/v2/img/anal')
              if (!isNsfw) return m.reply('_Comandos +18 estão desativados nesse grupo._')
              shiro.sendMessage(m.chat, { image: { url: neko.data.url }, }, { quoted: m })
            }
            break

///////////////////////////////////////////////////////////
//                                                       //
//                      Youtube                          //
//                                                       //
///////////////////////////////////////////////////////////

            case 'mp3': { // Reservado caso cair Y2mate
                if (!text) throw 'Eu preciso que você digite algo para pesquisar!'
                m.reply(mess.wait)
                const search = await yts(`${text}`).catch(e => { m.reply('_[ ! ] O erro de consulta inserido não existe_')})
                res = await axios.get(`https://meguxrest.herokuapp.com/api/ytmp3?url=https://www.youtube.com/watch?v=${search.all[0].videoId}`)
                result = `*Título* ➠ _${res.data.title}_\n*Canal* ➠ _${res.data.channel}_\n*Views* ➠ _${res.data.views}_\n\n_Processando o download aguarde._`
                shiro.sendMessage(m.chat, { image: { url: res.data.thumb }, caption: result }, { quoted: m})
                shiro.sendMessage(m.chat, { audio: { url: res.data.url }, }, { quoted: m})
            }
            break 
            case 'mp4': {
                m.reply('_Função ainda em desenvolvimento._') /*
                if (!text) throw 'Insira o link do video!'
                const search = await yts(`${text}`).catch(e => { m.reply('_[ ! ] O erro de consulta inserido não existe_')})
                m.reply(mess.wait)
                res = await axios.get(`http://hadi-api.herokuapp.com/api/yt2/video?url=https://www.youtube.com/watch?v=${search.all[0].videoId}`)
                result = `*Título* ➠ _${res.data.result.title}_\n*Canal* ➠ _${res.data.result.channel}_\n*Views* ➠ _${res.data.result.views}_\n\n_Processando o download aguarde._`
                shiro.sendMessage(m.chat, { image: { url: res.data.result.thumb }, caption: result }, { quoted: m})
                shiro.sendMessage(m.chat, { video: { url: res.data.result.download_video }, mimetype: 'video/mp4'}, { quoted: m}) */
            }
            break
            case 'tiktok': case 'tiktoknowm': {
                if (!text) throw 'Eu preciso que você insira um link!'
                if (!isUrl(args[0]) && !args[0].includes('tiktok.com')) throw 'Link Invalido!'
                m.reply(mess.wait)
                res = await axios.get(`http://hadi-api.herokuapp.com/api/tiktok?url=${text}`)
                capt = `_Enviado por ShiroBot_`
                let buttons = [
                    {buttonId: `tiktokv ${text}`, buttonText: {displayText: '► Video'}, type: 1},
                    {buttonId: `tiktokmp3 ${text}`, buttonText: {displayText: '♫ Audio'}, type: 1}
                ]
                let buttonMessage = {
                    video: { url: res.result.video.nowm },
                    caption: capt,
                    footer: 'Pressione um botão',
                    buttons: buttons,
                    headerType: 5
                }
                shiro.sendMessage(m.chat, buttonMessage, { quoted: m })
            }
            break
            case 'tiktokwm': {
                if (!text) throw 'Eu preciso que você insira um link!'
                if (!isUrl(args[0]) && !args[0].includes('tiktok.com')) throw 'Link Invalido!'
                m.reply(mess.wait)
                res = await axios.get(`http://hadi-api.herokuapp.com/api/tiktok?url=${text}`)
                capt = `_Enviado por ShiroBot_`
                let buttons = [
                    {buttonId: `tiktokv ${text}`, buttonText: {displayText: '► Video'}, type: 1},
                    {buttonId: `tiktokmp3 ${text}`, buttonText: {displayText: '♫ Audio'}, type: 1}
                ]
                let buttonMessage = {
                    video: { url: res.result.video.nowm },
                    caption: capt,
                    footer: 'Pressione um botão',
                    buttons: buttons,
                    headerType: 5
                }
                shiro.sendMessage(m.chat, buttonMessage, { quoted: m })
            }
            break
            case 'tiktokmp3': {
                if (!text) throw 'Eu preciso que você insira um link!'
                if (!isUrl(args[0]) && !args[0].includes('tiktok.com')) throw 'Link Invalido!'
                m.reply(mess.wait)
                res = await axios.get(`http://hadi-api.herokuapp.com/api/tiktok?url=${text}`)
                capt = `_Enviado por ShiroBot_`
                let buttons = [
                    {buttonId: `tiktok ${text}`, buttonText: {displayText: '► Video'}, type: 1},
                    {buttonId: `tiktokmp3 ${text}`, buttonText: {displayText: '♫ Audio'}, type: 1}
                ]
                let buttonMessage = {
                    text: capt,
                    footer: 'Pressione um botão',
                    buttons: buttons,
                    headerType: 2
                }
                let msg = await shiro.sendMessage(m.chat, buttonMessage, { quoted: m })
                shiro.sendMessage(m.chat, { audio: { url: res.result.audio.original } }, { quoted: msg })
            }
            break
            /*
            case 'mp3':
                if (!text) throw 'Eu preciso que você digite algo para pesquisar!'
                m.reply(mess.wait)
                const ssa = await yts(`${text}`).catch(e => { m.reply('_[ ! ] O erro de consulta inserido não existe_')})
                res = await y2mateA(`https://www.youtube.com/watch?v=${ssa.all[0].videoId}`).catch(e => {
                m.reply('_[ ! ] Erro Ao Entrar Em Contato Com Y2mate_')
                })
                result = `*YOUTUBE MP4*\n\n*•Titulo* : _${res[0].judul}_\n*•Formato* : _MP4_\n*•Tamanho* : _${res[0].size}_\n\n_Aguarde o download_`
                shiro.sendMessage(m.chat, { image: { url: res[0].thumb }, caption: result }, { quoted: m }).then((lalu) => {
                shiro.sendMessage(m.chat, { audio: { url: res[0].link }, }, { quoted: m })
                })
            break 
            case 'mp4':
                if (!text) throw 'Eu preciso que você digite algo para pesquisar!'
                m.reply(mess.wait)
                const ssv = await yts(`${text}`).catch(e => { m.reply('_[ ! ] O erro de consulta inserido não existe_')})
                res = await y2mateV(`https://www.youtube.com/watch?v=${ssv.all[0].videoId}`).catch(e => {
                m.reply('_[ ! ] Erro Ao Entrar Em Contato Com Y2mate_')
                })
                result = `*YOUTUBE MP4*\n\n*•Titulo* : _${res[0].judul}_\n*•Formato* : _MP4_\n*•Tamanho* : _${res[0].size}_\n\n_Aguarde o download_`
                shiro.sendMessage(m.chat, { image: { url: res[0].thumb }, capion: result }, { quoted: m }).then((lalu) => {
                shiro.sendMessage(m.chat, { video: { url: res[0].link }, caption: res[0].judul }, { quoted: m })
                })
            break */
            default:
                if (budy.startsWith('=>')) {
                    if (!isCreator) return m.reply(mess.owner)
                    function Return(sul) {
                        sat = JSON.stringify(sul, null, 2)
                        bang = util.format(sat)
                            if (sat == undefined) {
                                bang = util.format(sul)
                            }
                            return m.reply(bang)
                    }
                    try {
                        m.reply(util.format(eval(`(async () => { return ${budy.slice(3)} })()`)))
                    } catch (e) {
                        m.reply(String(e))
                    }
                }
                if (budy.startsWith('>')) {
                    if (!isCreator) return m.reply(mess.owner)
                    try {
                        let evaled = await eval(budy.slice(2))
                        if (typeof evaled !== 'string') evaled = require('util').inspect(evaled)
                        await m.reply(evaled)
                    } catch (err) {
                        m = String(err)
                        await m.reply(m)
                    }
                }

                if (budy.startsWith('$')) {
                    if (!isCreator) return reply(mess.owner)
                    exec(budy.slice(2), (err, stdout) => {
                        if(err) return m.reply(err)
                        if (stdout) return m.reply(stdout)
                    })
                }
        }
    } catch (err) {
        m.reply(util.format(err))
    }
}


let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.redBright(`Update ${__filename}`))
	delete require.cache[file]
	require(file)
})
