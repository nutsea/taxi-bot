const express = require('express')
const cors = require('cors')
const router = require('./routes/index')
const path = require('path')
const https = require('https')
const fs = require('fs')

const PORT = process.env.PORT || 5000

const options = {
    key: fs.readFileSync('/etc/letsencrypt/live/bot.taxiallrussia.ru/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/bot.taxiallrussia.ru/cert.pem')
}

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use('/api', router)

const server = https.createServer(options, app)

const start = async () => {
    try {
        server.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()

///bot

const bot = require('./bot')

bot.onText(/\/start/, (msg) => {
    console.log(msg.chat.id)
    const chatId = msg.chat.id
    const message = "Здравствуйте. Номер чата успешно отправлен на сервер"
    bot.sendMessage(chatId, message)
})

bot.on('text', (msg) => {
    const chatId = msg.chat.id
    const message = msg.text

    if (msg.text !== '/start' && msg.text !== '/help')
        bot.sendMessage(chatId, `Неизвестная команда "${message}"`)
})

bot.onText(/\/help/, (msg) => {
    const chatId = msg.chat.id
    const message = "Это простой бот. Вот доступные команды:\n/start - Отправить номер чата на сервер"
    bot.sendMessage(chatId, message)
})

module.exports = bot