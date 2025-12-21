const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const passCtrl = require('../controllers/pass')

router.get('/:eventId', auth, passCtrl.getAllPasses)
router.get('/create-pass/:passInfosId', auth, passCtrl.createPass)
router.post('/verify-pass/:passId', auth, passCtrl.verifyPass)

module.exports = router