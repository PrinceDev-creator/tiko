const express = require('express')
const router = express.Router()
const ctrl = require('../controllers/test')

router.get('/', ctrl.test)

module.exports = router