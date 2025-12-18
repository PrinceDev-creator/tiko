const express = require('express')

const router = express.Router()
const paymentCtrl = require('../controllers/paymentTest')

router.post('/', paymentCtrl.paymentTest)

module.exports = router