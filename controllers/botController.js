const bot = require('./../bot')
const apiError = require('./../error/apiError')

class BotController {
    async sendMsgOrder(req, res, next) {
        const {from, to, phone, name, rate} = req.query
        const message = `ЗАКАЗ\nИмя: ${name}\nНомер: +${phone}\nОткуда: ${from}\nКуда: ${to}\nТариф: ${rate}`
        try {
            await bot.sendMessage(5359516739, message)
            return res.json(message)
        } catch (e) {
            return next(apiError.badRequest(e))
        }
    }

    async sendMsgNumber(req, res, next) {
        const {phone} = req.query
        const message = `ЗАЯВКА НА ЗВОНОК\nНомер: +${phone}`
        try {
            await bot.sendMessage(5359516739, message)
            return res.json(message)
        } catch (e) {
            return next(apiError.badRequest(e))
        }
    }
}

module.exports = new BotController()