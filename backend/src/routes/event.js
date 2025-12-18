const express = require('express')
const eventController = require('../controllers/event')
const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config')
const router = express.Router()

router.post('/', auth, multer, eventController.createEvent)

module.exports = router