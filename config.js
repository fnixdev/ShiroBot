/**
   * Base Create By Dika Ardnt.
   * Updated by fnixdev
   * Follow https://github.com/fnixdev
*/


const fs = require('fs')
const chalk = require('chalk')


// Outros
global.owner = ['553189092420']
global.prefix = ['/', ';']
global.packname = 'Shiro Bot'
global.author = 'fnixdev'
global.sp = '✾'
global.mess = {
    admin: '_Apenas admins podem usar esse comando!_',
    botAdmin: '_Eu preciso que você me coloque como admin para fazer isso!_',
    owner: '_Apenas meu dono pode usar isso!_',
    isowner: '_Lol ele é meu dono._',
    group: '_Isso só pode ser usado em um grupo!_',
    private: '_Isso só pode ser usado no privado_',
    bot: '_Isso é uma função exclusiva do bot_',
    wait: '_Tudo bem querido, aguarde um momento._',
    text: '_Eu preciso que você digite algo_'
}
global.thumb = fs.readFileSync('./src/shiro.jpg')

let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.redBright(`Update'${__filename}'`))
	delete require.cache[file]
	require(file)
})
