const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, path.resolve(__dirname, '../images'))
    },
    filename: (req, file, callback) => {
        const filename = file.originalname.split(' ').join('_')
        const extension = file.mimetype.split('/')[1]
        const finalName = filename + Date.now() + '.' + extension

        callback(null, finalName)
    }
})

module.exports = multer({ storage }).single('thumbnail')