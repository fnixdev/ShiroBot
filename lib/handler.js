/*
*   Quick search
*   Use "commandHandler" to quickly find the command
*   example: stickerHandler
*/
const fs = require('fs');
const axios = require("axios");
const PDFDocument = require("pdfkit");
const request = require('request');
const deleteFile = require("./delete");
const Genius = require("genius-lyrics");
const webpConverter = require("./webpconverter.js");
const WSF = require("wa-sticker-formatter");
const NLP = require("@hiyurigi/nlp")("TextCorrection");
const menu = fs.readFileSync('./config/menu.txt', 'utf-8');
const config = JSON.parse(fs.readFileSync('./config/config.json', 'utf-8'));
const dictionary = JSON.parse(fs.readFileSync('./config/dictionary.json', 'utf-8'))

const { fetchJson, getBuffer } = require('./functions')
const { writeFile } = require('fs/promises')
const { Brainly } = require("brainly-scraper-v2");
const { LatinKeAksara } = require("@sajenid/aksara.js");
const { proto, generateWAMessageFromContent, Mimetype, downloadContentFromMessage } = require('@adiwajshing/baileys-md');
const { log } = require('console');
const { url } = require('inspector');

// Sorting your command
dictionary.sort(function (a, b) {
    return b.length - a.length;
});

// Basic package setting
const brain = new Brainly("id");
const v = new NLP(dictionary);
const ytregex = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;

const bufferImagesForPdf = {};
const inPdfInput = [];

// Config basic setting
const prefix = config.prefix;
const dev = config.dev;

module.exports = async (client, message) => {
    const senderNumber = message.key.remoteJid;
    const senderName = message.pushName || client.user.name //sender?.notify || sender?.short || sender?.name || sender?.vname
    const buttonMessages = message.message?.templateButtonReplyMessage?.selectedId;
    const extendedTextMessage = message.message.extendedTextMessage;
    const quotedMessageContext = extendedTextMessage && extendedTextMessage.contextInfo;
    const quotedMessage = quotedMessageContext && quotedMessageContext.quotedMessage;
    const imageMessage = message.message.imageMessage;
    const videoMessage = message.message.videoMessage;
    const stickerMessage = message.message.stickerMessage;
    const textMessage = message.message.conversation || message.message.extendedTextMessage && message.message.extendedTextMessage.text || imageMessage && imageMessage.caption || videoMessage && videoMessage.caption || buttonMessages
    const sender = client.contacts[senderNumber]
  	let WAUser = sender?.notify || sender?.short || sender?.name || sender?.vname || client?.user?.name


    // handling command and parameter
    let command, parameter;
    if (buttonMessages) {
        command = buttonMessages;
    } else if (textMessage) {

        let a = textMessage.trim().split("\n");
        let b = "";

        b += a[0].split(" ").slice(1).join(" ");
        b += a.slice(1).join("\n")
        parameter = b.trim();

        // Prefix check
        c = a[0].split(" ")[0]
        pre = c.charAt(0);

        // Command check
        d = c.substring(1);

        if (pre == prefix) {
            if (!d) {
                let e = parameter.split(" ")
                d = e[0];

                parameter = parameter.split(" ").slice(1).join(" ");
            } else {
                let result = v.TextCorrection({
                    Needle: d,
                    Threshold: 0.7,
                    NgramsLength: 1
                });

                command = result[0].Key;
                console.log(result);
            }
        }
    }

    console.log(parameter);

    console.log("CMD: " + command);

    // Sticker owner
    stickerOwner = parameter || senderName || client.user.name
    const stickerParameter = parameter || WAUser


    switch (command) {
        // menuHandle
        // helpHandler
        case "menu": case "help":
            {
                const theButton = [
                    { index: 1, urlButton: { displayText: 'Dono', url: 'https://github.com/fnixdev' } },
                ]
 
                const buttonMessage = {
                    caption: menu,
                    footer: client.user.name,
                    image: { url: 'https://telegra.ph/file/d25d5f8704a94a34aabf7.jpg' },
                    templateButtons: theButton,
                    headerType: 4
                }

                client.sendMessage(senderNumber, buttonMessage);
                break;
            }

        // minecraft
        case "mine":
        {
          const theButton = [
            { index: 1, urlButton: { displayText: 'Baixar Minecraft', url: 'https://www.mediafire.com/file/wtrpb1rluqdgpm5/Minecraft-1.18.2.03-Official-by-wadduk.apk/file' } },
                ]
           const msg_ = "_Clique no botão abaixo para baixar a ultima versão do Minecraft._"
          const buttonMessage = {
            caption: msg_,
            footer: client.user.name,
            image: { url: 'https://telegra.ph/file/0c97e206340a796a1e0cc.jpg' },
            templateButtons: theButton,
            headerType: 4
          }
          client.sendMessage(senderNumber, buttonMessage);
          break;
        }
        
        // Nekos
        case "neko":
        {
          get_result = await fetchJson(`https://nekos.life/api/v2/img/neko`)
          get_buffer = await getBuffer(get_result.url)
          const nekoMsg = "_Bater pra 2d ne safado_"
          const nekoMessage = {
            caption: nekoMsg,
            footer: client.user.name,
            image: { url: get_buffer },
            headerType: 1
          }
          client.sendMessage(senderNumber, nekoMsg);
          break;
        }
        // stickerHandler
        case `sticker`:
	    	case `stiker`: {
	      		if (quotedMessage) {
			    	message.message = quotedMessage;
	      		}
	      		if (!message.message.imageMessage || message.message.imageMessage.mimetype != "image/jpeg") {
		    		client.sendMessage(senderNumber, "Tidak ada gambar :)", MessageType.text, {
	   				quoted: message
	    			});
    				break;
  	  		}
		      	const imagePath = await client.downloadAndSaveMediaMessage(message, Math.floor(Math.random() * 1000000));
    		  	const sticker = new WSF.Sticker("./" + imagePath, {
			        crop: false,
      			  pack: "Stiker",
		      	  author: stickerParameter
       			});
       			await sticker.build();
	      		fs.unlinkSync(imagePath);
	      		const bufferImage = await sticker.get();
	      		client.sendMessage(senderNumber, bufferImage, MessageType.sticker, {
	   	  	  quoted: message
	       		});
	      		break;
		    	}


        default:
            {
                console.log('[MSG]')
            }

    }
}