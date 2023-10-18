const Router = require('express')
const botController = require('../controllers/botController')
const router = new Router()

router.get('/', botController.sendMsgOrder)
router.get('/call', botController.sendMsgNumber)

module.exports = router