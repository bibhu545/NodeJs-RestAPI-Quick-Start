const express = require('express')
const multer = require('multer')
const ProductController = require('../controllers/ProductController')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toDateString() + file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(new Error('invalid file type'), false);
    }
}

const upload = multer({
    storage: storage,
    limits: 1024 * 1024 * 5,
    fileFilter: fileFilter
})

const router = express.Router()

router.get('/', ProductController.getAllProducts)

router.get('/:id', ProductController.getProductById)

router.post('/', upload.single('productImage'), ProductController.createProduct)

router.put('/:id', ProductController.editProduct)

router.delete('/:id', ProductController.deleteProduct)

module.exports = router