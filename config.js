/**
   * Base Create By Dika Ardnt.
   * Updated by fnixdev
   * Follow https://github.com/fnixdev
*/


const fs = require('fs')
const chalk = require('chalk')


// Outros
global.owner = ['553189092420']
global.prefix = ['!']
global.packname = 'Shiro Bot'
global.author = 'https://github.com/fnixdev'
global.sp = '⭔'
global.mess = {
    admin: 'Apenas administradores podem usar esse comando!',
    botAdmin: 'Eu preciso ser administrador pra fazer isso!',
    owner: 'Apenas meu dono pode usar isso!',
    group: 'Isso só pode ser usado em um grupo!',
    private: 'Isso só pode ser usado no privado',
    bot: 'Recursos especial do bot',
    wait: 'Carregando...',
}
global.thumb = fs.readFileSync('./src/shiro.jpg')

let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.redBright(`Update'${__filename}'`))
	delete require.cache[file]
	require(file)
})
