const express = require('express')
const router = express.Router()
const passInfosCtrl = require('../controllers/passInfos')
const auth = require('../middleware/auth')

router.post('/:id', auth, passInfosCtrl.createTypePass)

module.exports = router