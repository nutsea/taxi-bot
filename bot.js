const TelegramBot = require('node-telegram-bot-api')

const token = '6300036683:AAHH5iFy9GlOqSZV3A7z37e_uAyPBho9p44'

const bot = new TelegramBot(token, { polling: true })

module.exports = bot