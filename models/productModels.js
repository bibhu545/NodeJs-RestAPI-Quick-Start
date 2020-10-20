const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    path: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('product', productSchema)