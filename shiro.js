/**
 * Base Create By Dika Ardnt.
 * Updated by fnixdev
 * Follow https://github.com/fnixdev
 **/


require('./config')
const { BufferJSON, WA_DEFAULT_EPHEMERAL, generateWAMessageFromContent, proto, generateWAMessageContent, generateWAMessage, prepareWAMessageMedia, areJidsSameUser, getContentType } = require('@adiwajshing/baileys')

const jsonFile = require('jsonfile');
const fs = require('fs')
const util = require('util')
const chalk = require('chalk')
const {
  exec,
  spawn,
  execSync
} = require("child_process")
const moment = require('moment-timezone')
const axios = require('axios')

const {
  fromBuffer
} = require('file-type')
const path = require('path')
const os = require('os')
const speed = require('performance-now')
const yts = require('yt-search')

// const afk = require("./lib/afk");

// SRC

const nsfw = JSON.parse(fs.readFileSync('./src/nsfw.json'))
const rules = JSON.parse(fs.readFileSync('./src/nsfw.json'))
// LIB


const {
  performance
} = require('perf_hooks')

const {
  UploadFileUgu,
  webp2mp4File,
  TelegraPh
} = require('./lib/uploader')

const {
  smsg,
  getGroupAdmins,
  formatp,
  tanggal,
  formatDate,
  getTime,
  isUrl,
  sleep,
  clockString,
  runtime,
  fetchJson,
  getBuffer,
  jsonformat,
  delay,
  format,
  logic,
  generateProfilePicture,
  parseMention,
  getRandom
} = require('./lib/myfunc')

const { yta, ytv } = require('./lib/y2mate')

module.exports = shiro = async (shiro, m, chatUpdate, store) => {
  try {
    var body = (m.mtype === 'conversation') ? m.message.conversation : (m.mtype == 'imageMessage') ? m.message.imageMessage.caption : (m.mtype == 'videoMessage') ? m.message.videoMessage.caption : (m.mtype == 'extendedTextMessage') ? m.message.extendedTextMessage.text : (m.mtype == 'buttonsResponseMessage') ? m.message.buttonsResponseMessage.selectedButtonId : (m.mtype == 'listResponseMessage') ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.mtype == 'templateButtonReplyMessage') ? m.message.templateButtonReplyMessage.selectedId : (m.mtype === 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text) : ''
    var budy = (typeof m.text == 'string' ? m.text : '')

    // Comandos

    const isCmd = prefix.includes(body != '' && body.slice(0, 1)) && body.slice(1) != ''
    const command = isCmd ? body.slice(1).trim().split(' ')[0].toLowerCase() : ''

    //

    const args = body.trim().split(/ +/).slice(1)
    const pushname = m.pushName || "No Name"
    const botNumber = await shiro.decodeJid(shiro.user.id)
    const isCreator = [shiro.user.id, ...global.owner].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender)
    const isOwner = global.owner + '@s.whatsapp.net'

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
    const isBotAdmins = m.isGroup ? groupAdmins.includes(botNumber) : false
    const isGroupAdmins = m.isGroup ? groupAdmins.includes(m.sender) : false

    // NSFW
    const isNsfw = m.isGroup ? nsfw.includes(groupMetadata.id) : false

    // Rules
    const savedRules = m.isGroup ? rules.includes(groupMetadata.id) : false

    
    // AFK
    // const isAfkOn = afk.checkAfkUser(m.sender, _afk)

    // Bot Status
    const used = process.memoryUsage()
    const cpus = os.cpus().map(cpu => {
      cpu.total = Object.keys(cpu.times).reduce((last, type) => last + cpu.times[type], 0)
      return cpu
    })
    const cpu = cpus.reduce((last, cpu, _, {
      length
    }) => {
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

    if (isCmd) {
      console.log(chalk.black(chalk.bgCyanBright('[ CMD ]')), chalk.black(chalk.cyan.bold(budy || m.mtype)) + '\n' + chalk.magenta('=> De'), chalk.green(pushname), chalk.yellow(m.sender) + '\n' + chalk.magenta('=> Em'), chalk.green(m.isGroup ? groupName : groupName))
    } else {
      console.log(chalk.black(chalk.bgWhiteBright('[ MSG ]')), chalk.black(chalk.white.bold(budy || m.mtype)) + '\n' + chalk.magenta('=> De'), chalk.green(pushname), chalk.yellow(m.sender) + '\n' + chalk.magenta('=> Em'), chalk.green(m.isGroup ? groupName : groupName))
    }

    ///////////////////////////////////////////////////////////
    //                                                       //
    //                Comandos de Dono                       //
    //                                                       //
    ///////////////////////////////////////////////////////////
    switch (command) {

      case 'test': {
        if (!isCreator) throw mess.owner
        let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
        m.reply(isOwner)
      }
      break
      case 'bc':
      case 'bcgc':
      case 'bcgroup': {
        if (!isCreator) throw mess.owner
        if (!text) throw mess.text
        let getGroups = await shiro.groupFetchAllParticipating()
        let groups = Object.entries(getGroups).slice(0).map(entry => entry[1])
        let anu = groups.map(v => v.id)
        m.reply(`Enviando broadcast em ${anu.length} grupos.`)
        for (let i of anu) {
          await sleep(1500)
          txt = `「 Mensagem de Transmissão 」\n\n${text}`
          shiro.sendMessage(i, { text: txt })
        }
        m.reply(`Mensagens enviadas em ${anu.length} grupos.`)
      }
      break

    case 'chat': {
      if (!isCreator) throw mess.owner
      if (!q) throw '_Opções_ :\n1 - mute\n2 - unmute'
      if (args[0] === 'mute') {
        shiro.chatModify({
          mute: 'Infinity'
        }, m.chat, []).then((res) => m.reply(jsonformat(res))).catch((err) => m.reply(jsonformat(err)))
      } else if (args[0] === 'unmute') {
        shiro.chatModify({
          mute: null
        }, m.chat, []).then((res) => m.reply(jsonformat(res))).catch((err) => m.reply(jsonformat(err)))
      }
    }
    break
    case 'listgp': {
      if (!isCreator) throw mess.owner
      let anu = await store.chats.all().filter(v => v.id.endsWith('@g.us')).map(v => v.id)
      let teks = `⬣ *Lista de Grupos*\n\nTotal : ${anu.length} Group\n\n`
      for (let i of anu) {
        let metadata = await shiro.groupMetadata(i)
        teks += `⬡ *Nome :* ${metadata.subject}\n⬡ *Dono :* @${metadata.owner.split('@')[0]}\n⬡ *ID :* ${metadata.id}\n⬡ *Criado :* ${moment(metadata.creation * 1000).tz('America/Sao_Paulo').format('DD/MM/YYYY HH:mm:ss')}\n⬡ *Membros :* ${metadata.participants.length}\n\n────────────────────────\n\n`
      }
      shiro.sendTextWithMentions(m.chat, teks, m)
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
      m.reply('_Ok senpai, passarei a responder outros membros a partir de agora._')
    }
    break
    case 'self': {
      if (!isCreator) throw mess.owner
      shiro.public = false
      m.reply('_Ok, permanecerei calada a partir de agora._')
    }
    break
    case 'ping':
    case 'botstatus':
    case 'statusbot': {
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
      let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
      await shiro.updateBlockStatus(users, 'block').then((res) => m.reply('_Usuario bloquedo_')).catch((err) => m.reply(jsonformat(err)))
    }
    break
    case 'unblock': {
      if (!isCreator) throw mess.owner
      let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
      await shiro.updateBlockStatus(users, 'unblock').then((res) => m.reply('_Usuario desbloqueado_')).catch((err) => m.reply(jsonformat(err)))
    }
    break
    case 'update': {
      if (!isCreator) throw mess.owner
      stdout = execSync('git remote set-url origin https://github.com/fnixdev/ShiroBot.git && git pull')
      m.reply(stdout.toString())
    }
    break
    case 'listgp': {
      if (!isCreator) throw mess.owner
      let grup = Object.values(await shiro.groupFetchAllParticipating()).map(v => `${v.subject}\n${v.id}`).join`\n\n`
      m.reply('Lista de Grupos:\n\n' + grup)
    }
    break
    case 'setprefix': {
      if (!isCreator) throw mess.owner
      if (!text) return m.reply('_Eu preciso que você informe um prefixo._')
      global.prefix = text[0]
      m.reply(`_Prefixo alterado para ${text[0]}_`)
    }
    break
    case 'restart': {
      if (!isCreator) throw mess.owner
      await m.reply('Reiniciando...')
      process.send('reset')
    }
    break
    case 'sh':
    case 'term': {
        if (!isCreator) throw mess.owner
        if (!text) throw mess.text
        exec(text, (err, stdout) => {
          if (err) return m.reply('_Erro ao executar comando no terminal_')
          if (stdout) return m.reply(stdout)
        })
      }
    break
  
    ///////////////////////////////////////////////////////////
    //                                                       //
    //                   Comandos de ADM                     //
    //                                                       //
    ///////////////////////////////////////////////////////////
    
    case 'setrules':
      if (!m.isGroup) throw mess.group
      if (!isGroupAdmins) throw mess.admin
      if (!text) throw mess.text
      let gId = groupMetadata.id
      objeto = { group_id: gId, rules: text }
      data = JSON.stringify(objeto)
      fs.writeFileSync(rules, data)
      await m.reply("_As novas regras foram salvas._")
    break

    case 'regras': {
      if (!savedRules) throw '_Nenhuma regra definida pelos admins._'
      gid = groupMetadata.id
      data = fs.readFileSync(rules)
      shiro.sendMessage(m.chat, { text: anu }, { quoted: m })
    }
    break
    case 'tagall':
      if (!m.isGroup) throw mess.group
      if (!isGroupAdmins) throw mess.admin
      if (!text) throw mess.text
      shiro.sendMessage(m.chat, {
        text: q ? q : '',
        mentions: participants.map(a => a.id)
      })
      break
    case 'kick': {
      if (!m.isGroup) throw mess.group
      if (!isGroupAdmins) throw mess.admin
      if (!isBotAdmins) throw mess.botAdmin
      let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
      if (users == isOwner) throw mess.isowner
      if (users) {
        await shiro.sendMessage(m.chat, {
          video: {
            url: "./src/banido.mp4"
          },
          caption: '_banido, pam, banido_'
        }, {
          quoted: m
        }), shiro.groupParticipantsUpdate(m.chat, [users], 'remove')
      } else {
        await m.reply('_Eu preciso que você marque ou mencione um usuario_')
      }
    }
    break
    case 'promote': {
      if (!m.isGroup) throw mess.group
      if (!isGroupAdmins) throw mess.admin
      if (!isBotAdmins) throw mess.botAdmin
      let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
      await shiro.groupParticipantsUpdate(m.chat, [users], 'promote').then( m.reply('_Usuario Promovido_')).catch((err) => m.reply(jsonformat(err)))
    }
    break
    case 'demote': {
      if (!m.isGroup) throw mess.group
      if (!isGroupAdmins) throw mess.admin
      if (!isBotAdmins) throw mess.botAdmin
      let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
      if (users == isOwner) throw mess.isowner
      await shiro.groupParticipantsUpdate(m.chat, [users], 'demote').then( m.reply('_Usuario foi rebaixado a membro comum_')).catch((err) => m.reply(jsonformat(err)))
    }
    break
    case 'nsfw':
      if (!m.isGroup) throw mess.group
      if (!isGroupAdmins) throw mess.admin
      if (!text) throw mess.text
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

    case 'linkgrupo':
    case 'link': {
      if (!m.isGroup) throw mess.group
      let response = await shiro.groupInviteCode(m.chat)
      shiro.sendText(m.chat, `https://chat.whatsapp.com/${response}\n\nLink do grupo : ${groupMetadata.subject}`, m, {
        detectLink: true
      })
    }
    break
    case 'source':
    case 'shiro':
    case 'sobre': {
      link = { url: 'https://telegra.ph/file/8481268cd704d86ca0a5c.jpg' }
      txt = `*「 O que é a Shiro? 」*\n\n_Inicialmente um projeto para enviar episódios de animes para o servidor, mas que aos poucos foi crescendo com funções administrativas entre outras._\n\n*「 Posso usar a Shiro? 」*\n\n_Se você deseja usar esse número em seu grupo, peça ao dono para usa-lo. Se deseja instalar este bot em um número secindario sinta-se livre para usar a source no GitHub._\n\n*「 Como fazer uma "Shiro?" 」*\n\n_Bom, isso é complicado, e se você planeja fazer algo assim, você deve aprender a programar, escolha uma linguagem de programação e pronto! Você saberá fazer uma Shiro._`
      let btn = [{
        urlButton: {
          displayText: 'Source',
          url: 'https://github.com/fnixdev/ShiroBot/'
        }
			}, {
        quickReplyButton: {
          displayText: 'Doar',
          id: `${prefix}pix`
        }
			}, {
        quickReplyButton: {
          displayText: 'Dono',
          id: `${prefix}dono`
        }
			}]
      shiro.send5ButImg(m.chat, txt, shiro.user.name, link, btn)
    }
    break
    case 'donate': case 'doar': case 'pix':{
      aceitas = 'https://telegra.ph/file/4c2400cb1b2d05849cddc.jpg'
      txt = '\nEu aceito: 6d850fc0-7676-4ecb-9277-848c7b3bddc9'
      shiro.sendImage(m.chat, aceitas, txt)
    }
    break
    case 'sticker':
    case 's':
    case 'stickergif':
    case 'sgif': {
      if (!quoted) throw `Responda a uma imagem/video ${prefix + command}`
      m.reply(mess.wait)
      if (/image/.test(mime)) {
        let media = await quoted.download()
        let encmedia = await shiro.sendImageAsSticker(m.chat, media, m, { packname: global.packname, author: global.author })
        await fs.unlinkSync(encmedia)
      } else if (/video/.test(mime)) {
        if ((quoted.msg || quoted).seconds > 11) return m.reply('10 segundos no máximo!')
        let media = await quoted.download()
        let encmedia = await shiro.sendVideoAsSticker(m.chat, media, m, { packname: global.packname, author: global.author })
        await fs.unlinkSync(encmedia)
      } else {
        throw `Envie uma foto/video\nO video deve ter de 1 a 9 segundos`
      }
    }
    break
    case 'casal': {
      if (!m.isGroup) throw mess.group
      let member = participants.map(u => u.id)
      let user1 = member[Math.floor(Math.random() * member.length)]
      let user2 = member[Math.floor(Math.random() * member.length)]
      let cupido = `👫 Casal do dia
      @${user1.split('@')[0]} ❤️ @${user2.split('@')[0]}`
      await m.reply(cupido)
    }
    break
    case 'owner':
    case 'creator':
    case 'dono': {
      let vcard = 'BEGIN:VCARD\n' // metadata of the contact card
        +
        'VERSION:3.0\n' +
        'N:;fnix.;;;' +
        'FN:Luis Gustavo.\n' +
        'ORG:fnix (KuuhakuTeam);\n' +
        'TEL;type=CELL;type=VOICE;waid=553189092420:+55 31 89092420\n' +
        'END:VCARD'
      shiro.sendMessage(m.chat, {
        contacts: {
          displayName: 'fnix.',
          contacts: [{
            vcard
					}]
        }
      }, {
        quoted: m
      })
    }
    break
    case 'menu':
    case 'help': {
      txt = `
╭────ꕥ Shiro Bot ꕥ────
│✾ Prefixo: ${prefix}
│✾ Versão: v1.0.1
│✾ Biblioteca: Baileys-MD
│✾ Uptime: ${runtime(process.uptime())}
╰❑
`
      let btn = [{
        urlButton: {
          displayText: 'Source',
          url: 'https://github.com/fnixdev/ShiroBot/'
        }
			}, {
        quickReplyButton: {
          displayText: 'Menu Principal',
          id: `${prefix}replymenu`
        }
			}, {
        quickReplyButton: {
          displayText: 'Menu Anime',
          id: `${prefix}menuanime`
        }
			}]
      shiro.send5ButImg(m.chat, txt, shiro.user.name, global.thumb, btn)
    }
    break
    case 'replymenu': {
      anu = `
╭─❑ 「 *Menu de Grupo* 」 ❑──
│ ${prefix}link
│ ${prefix}casal
│ ${prefix}kick @user [ADM]
│ ${prefix}promote @user [ADM]
│ ${prefix}demote @user [ADM]
│ ${prefix}nsfw [opção] [ADM]
╰❑

╭─❑ 「 *Download Menu* 」 ❑──
│ ${prefix}play
│ ${prefix}ytvideo
│ ${prefix}ytaudio
│ ${prefix}tiktok [link] 
│ ${prefix}pinterest [desativado]
╰❑

╭─❑ 「 *Ultilidades* 」 ❑──
│ ${prefix}minecraft
│ ${prefix}discord
╰❑

╭─❑ 「 *Sobre o Bot* 」 ❑──
│ ${prefix}dono
│ ${prefix}source
╰❑

╭─❑ 「 *Menu do Dono* 」 ❑──
│ ${prefix}ping
│ ${prefix}chat [opção]
│ ${prefix}join [link]
│ ${prefix}leave
│ ${prefix}block @user
│ ${prefix}unblock @user
╰❑
`
      shiro.sendMessage(m.chat, { text: anu }, { quoted: m })
    }
    break

    case 'mine':
    case 'minecraft': {
      link = { url: 'https://telegra.ph/file/0c97e206340a796a1e0cc.jpg' }
      caption = `_Escolha uma das opções abaixo para baixar o minecraft_`
      let btn = [{
        urlButton: {
          displayText: 'Baixar APK',
          url: `https://cdn-124.anonfiles.com/LbP9FaWex2/c5114e00-1650143087/Minecraft-v1.18.12.01-xbox-servers.apk`
        }
			}]
      shiro.send5ButImg(m.chat, caption, shiro.user.name, link, btn)
    }
    break
    case 'discord': {
      link = { url: 'https://telegra.ph/file/5202907a4419530e0848d.jpg' }
      caption = `_Clique no botão abaixo para baixar entrar no nosso servidor do Discord_`
      let btn = [{
        urlButton: {
          displayText: 'Entrar no Discord',
          url: `https://discord.gg/PQncrzqHmb`
        }
			}]
      shiro.send5ButImg(m.chat, caption, shiro.user.name, link, btn)
    }
    break

    ///////////////////////////////////////////////////////////
    //                                                       //
    //                      Anime                            //
    //                                                       //
    ///////////////////////////////////////////////////////////

    case 'menuanime':
    case 'animemenu': {
      capt = `
╭─❑ 「 *Anime/Manga* 」 ❑──
│▸ ${prefix}anime [Nome]
│▸ ${prefix}manga (indisponível)
╰❑

╭─❑ 「 *Fotos/Gifs SFW* 」 ❑──
│▸ ${prefix}neko
│▸ ${prefix}waifu
│▸ ${prefix}wallpaper
│▸ ${prefix}kiss [desativado]
│▸ ${prefix}nekogif [desativado]
│▸ ${prefix}poke [desativado]
│▸ ${prefix}smug [desativado]
│▸ ${prefix}cute [desativado]
│▸ ${prefix}baka [desativado]
│▸ ${prefix}foxgirl [desativado]
╰❑

╭─❑ 「 *Hentai Menu* 」 ❑──
│▸ ${prefix}hentai
│▸ ${prefix}hentaigif
│▸ ${prefix}hentaineko
│▸ ${prefix}anal
│▸ ${prefix}boobs
│▸ ${prefix}pussy
│▸ ${prefix}cum
│▸ ${prefix}blowjob
│▸ ${prefix}feet
│▸ ${prefix}yuri
╰❑
`
      shiro.sendMessage(m.chat, { text: capt }, { quoted: m })
    }
    break
    case 'anime': {
      if (!text) throw mess.text
      m.reply(mess.wait)
      const res = await axios.get(`https://api.jikan.moe/v3/search/anime?q=${text}`)
      animeinfo = `✨️ *Título:* _${res.data.results[0].title}_\n🎆️ *Episódios:*_ ${res.data.results[0].episodes}_\n💌️ *Avaliação:*_ ${res.data.results[0].rated}_\n❤️ *Score:* _${res.data.results[0].score}_\n💚️ *Descrição:* _${res.data.results[0].synopsis}_\n`
      shiro.sendMessage(m.chat, {
        image: {
          url: res.data.results[0].image_url
        },
        caption: animeinfo
      }, {
        quoted: m
      })
    }
    break
    case 'manga': {
      m.reply('_Funcão ainda em desenvolvimento._')
    }
    break
    case 'nhentai': {
      if (!text) return m.reply('_Eu preciso que você digite o id de um hentai do nhentai_')
      let res = await axios.get(`http://hadi-api.herokuapp.com/api/nhentai?id=${text}`)
      if (res.data.status === true) {
        let result = `• Nome: ${res.data.result.name}\n\n• Tags: ${res.data.result.tags}\n• Idioma: ${res.data.result.language}\n• Paginas: ${res.data.result.pages}\n• Categoria: ${res.data.result.catefories}\n\n_Fazendo download aguarde..._`
        m.reply(result)
        shiro.sendMessage(m.chat, {
          document: {
            url: res.data.result.download_pdf
          }
        }, {
          quoted: m
        })
      } else {
        return m.reply(`_Não foi possível encontrar o hentai, verifique que o ID digitado esta correto_`)
      }
    }
    break
    case 'neko': {
      let neko = await axios.get('https://nekos.life/api/v2/img/neko')
      shiro.sendMessage(m.chat, {
        image: {
          url: neko.data.url
        }
      }, {
        quoted: m
      })
    }
    break
    case 'wallpaper': {
      let neko = await axios.get('https://nekos.life/api/v2/img/wallpaper')
      shiro.sendMessage(m.chat, {
        image: neko.data.url
      }, {
        quoted: m
      })
    }
    break
    case 'waifu': {
      let neko = await axios.get('https://api.waifu.pics/sfw/waifu')
      shiro.sendMessage(m.chat, {
        image: {
          url: neko.data.url
        },
      }, {
        quoted: m
      })
    }
    break

    // NSFW CMDS

    case 'anal': {
      if (!m.isGroup) return m.reply(mess.group)
      let neko = await axios.get('https://nekos.life/api/v2/img/anal')
      if (!isNsfw) return m.reply('_Comandos +18 estão desativados nesse grupo._')
      shiro.sendMessage(m.chat, {
        video: {
          url: neko.data.url
        },
        caption: '_Vai bater pra 2d né safado._',
        gifPlayback: true,
      }, {
        quoted: m
      })
    }
    break
    case 'hentai': {
      if (!m.isGroup) return m.reply(mess.group)
      let neko = await axios.get('https://nekos.life/api/v2/img/hentai')
      if (!isNsfw) return m.reply('_Comandos +18 estão desativados nesse grupo._')
      shiro.sendMessage(m.chat, {
        image: {
          url: neko.data.url
        },
        caption: '_Vai bater pra 2d né safado._'
      }, {
        quoted: m
      })
    }
    break
    case 'boobs': {
      if (!m.isGroup) return m.reply(mess.group)
      let neko = await axios.get('https://nekos.life/api/v2/img/boobs')
      if (!isNsfw) return m.reply('_Comandos +18 estão desativados nesse grupo._')
      shiro.sendMessage(m.chat, {
        video: {
          url: neko.data.url
        },
        caption: '_Vai bater pra 2d né safado._',
        gifPlayback: true,
      }, {
        quoted: m
      })
    }
    break
    case 'pussy': {
      if (!m.isGroup) return m.reply(mess.group)
      let neko = await axios.get('https://nekos.life/api/v2/img/pussy')
      if (!isNsfw) return m.reply('_Comandos +18 estão desativados nesse grupo._')
      shiro.sendMessage(m.chat, {
        video: {
          url: neko.data.url
        },
        caption: '_Vai bater pra 2d né safado._',
        gifPlayback: true,
      }, {
        quoted: m
      })
    }
    break
    case 'cum': {
      if (!m.isGroup) return m.reply(mess.group)
      let neko = await axios.get('https://nekos.life/api/v2/img/cum')
      if (!isNsfw) return m.reply('_Comandos +18 estão desativados nesse grupo._')
      shiro.sendMessage(m.chat, {
        video: {
          url: neko.data.url
        },
        caption: '_Vai bater pra 2d né safado._',
        gifPlayback: true,
      }, {
        quoted: m
      })
    }
    break
    case 'blowjob': {
      if (!m.isGroup) return m.reply(mess.group)
      let neko = await axios.get('https://nekos.life/api/v2/img/bj')
      if (!isNsfw) return m.reply('_Comandos +18 estão desativados nesse grupo._')
      shiro.sendMessage(m.chat, {
        video: {
          url: neko.data.url
        },
        caption: '_Vai bater pra 2d né safado._',
        gifPlayback: true,
      }, {
        quoted: m
      })
    }
    break
    case 'hentaineko': {
      if (!m.isGroup) return m.reply(mess.group)
      let neko = await axios.get('https://nekos.life/api/v2/img/nsfw_neko_gif')
      if (!isNsfw) return m.reply('_Comandos +18 estão desativados nesse grupo._')
      shiro.sendMessage(m.chat, {
        video: {
          url: neko.data.url
        },
        caption: '_Vai bater pra 2d né safado._',
        gifPlayback: true,
      }, {
        quoted: m
      })
    }
    break
    case 'hentaigif': {
      if (!m.isGroup) return m.reply(mess.group)
      let neko = await axios.get('https://nekos.life/api/v2/img/Random_hentai_gif')
      if (!isNsfw) return m.reply('_Comandos +18 estão desativados nesse grupo._')
      shiro.sendMessage(m.chat, {
        video: {
          url: neko.data.url
        },
        caption: '_Vai bater pra 2d né safado._',
        gifPlayback: true,
      }, {
        quoted: m
      })
    }
    break
    case 'feet': {
      if (!m.isGroup) return m.reply(mess.group)
      let neko = await axios.get('https://nekos.life/api/v2/img/feetg')
      if (!isNsfw) return m.reply('_Comandos +18 estão desativados nesse grupo._')
      shiro.sendMessage(m.chat, {
        video: {
          url: neko.data.url
        },
        caption: '_Vai bater pra 2d né safado._',
        gifPlayback: true,
      }, {
        quoted: m
      })
    }
    break
    case 'yuri': {
      if (!m.isGroup) return m.reply(mess.group)
      let neko = await axios.get('https://nekos.life/api/v2/img/eroyuri')
      if (!isNsfw) return m.reply('_Comandos +18 estão desativados nesse grupo._')
      shiro.sendMessage(m.chat, {
        image: {
          url: neko.data.url
        },
        caption: '_Vai bater pra 2d né safado._'
      }, {
        quoted: m
      })
    }
    break

    ///////////////////////////////////////////////////////////
    //                                                       //
    //                      Download                         //
    //                                                       //
    ///////////////////////////////////////////////////////////

    case 'play':
    case 'yt': {
      if (!text) throw mess.text
      m.reply('_Tudo bem querido eu vou procurar pra você._')
      const search = await yts(`${text}`).catch(e => { m.reply('_[ ! ] Não consegui encontrar oque você queria 😔_') })
      anu = await yts({ videoId: `${search.all[0].videoId}` })
      caption = `
⭔ Titulo : ${anu.title}
⭔ Views : ${anu.views}
`
      let btn = [{
        urlButton: {
          displayText: 'Ver no YouTube',
          url: `${anu.url}`
        }
				}, {
        quickReplyButton: {
          displayText: 'Audio',
          id: `${prefix}ytmp3 ${anu.url}`
        }
				}, {
        quickReplyButton: {
          displayText: 'Video',
          id: `${prefix}ytvideo ${anu.url}`
        }
				}]
      imagem = { url: anu.thumbnail }
      shiro.send5ButImg(m.chat, caption, shiro.user.name, imagem, btn)
    }
    break

    case 'ytmp3': {
      let { yta } = require('./lib/y2mate')
      let quality = args[1] ? args[1] : '128kbps'
      let media = await yta(text, quality)
      if (media.filesize >= 100000) return m.reply(`_O audio que você quer é muito grande, eu só consigo enviar arquivos ate 100mb, este possui ${media.filesizeF}_`)
      shiro.sendMessage(m.chat, { audio: { url: media.dl_link }, mimetype: 'audio/mpeg', fileName: `${media.title}.mp3` }, { quoted: m })
    }
    break

    case 'ytaudio': {
      if (!text) throw mess.text
      m.reply(mess.wait)
      const search = await yts(`${text}`).catch(e => { m.reply('_[ ! ] Não consegui encontrar oque você queria 😔_') })
      argyts = `https://youtu.be/${search.all[0].videoId}`
      let quality = '128kbps'
      let media = await yta(argyts, quality)
      if (media.filesize >= 100000) return m.reply(`_O audio que você quer é muito grande, eu só consigo enviar arquivos ate 100mb, este possui ${media.filesizeF}_`)
      shiro.sendImage(m.chat, media.thumb, `⭔ Titulo : ${media.title}\n⭔ Tamanho : ${media.filesizeF}\n⭔ Tipo : MP3`, m)
      shiro.sendMessage(m.chat, { audio: { url: media.dl_link }, mimetype: 'audio/mpeg', fileName: `${media.title}.mp3` }, { quoted: m })
    }
    break

    case 'ytvideo': {
      if (!text) throw mess.text
      m.reply(mess.wait)
      const search = await yts(`${text}`).catch(e => { m.reply('_[ ! ] Não consegui encontrar oque você queria 😔_') })
      argyts = `https://youtu.be/${search.all[0].videoId}`
      let quality = '360p'
      let media = await ytv(argyts, quality)
      if (media.filesize >= 100000) return m.reply(`_O vídeo que você quer é muito grande, eu só consigo enviar arquivos ate 100mb, este possui ${media.filesizeF}_`)
      shiro.sendMessage(m.chat, { video: { url: media.dl_link }, mimetype: 'video/mp4', fileName: `${media.title}.mp4`, caption: `⭔ Titulo : ${media.title}\n⭔ Tamanho : ${media.filesizeF}\n⭔ Tipo : MP4` }, { quoted: m })
    }
    break

    case 'tiktok': {
      //m.reply('_Função desativada temporáriamente._')
      if (!text) throw 'Eu preciso que você insira um link!'
      if (!isUrl(args[0]) && !args[0].includes('tiktok.com')) throw 'Link Invalido!'
      m.reply(mess.wait)
      capt = '_Send by ShiroBot_'
      res = await axios.get(`http://hadi-api.herokuapp.com/api/tiktok?url=${text}`)
      let vid = res.data.result.video.nowm
      shiro.sendMessage(m.chat, {
        video: {
          url: vid
        },
        caption: capt,
        mimetype: 'video/mp4',
        fileName: 'video.mp4'
      }, {
        quoted: m
      })
    }
    break
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
