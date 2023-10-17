const Router = require('express')
const router = new Router()
const botRouter = require('./botRouter')

router.use('/bot', botRouter)

module.exports = router