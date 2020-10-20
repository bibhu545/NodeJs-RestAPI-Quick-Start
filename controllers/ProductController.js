const Product = require('../models/productModels')


exports.getAllProducts = (req, res, next) => {
    Product.find().then(result => {
        res.status(200).json(result)
    }).catch(error => {
        console.log(error);
        res.status(500).json({
            error: error
        })
    });
}

exports.getProductById = (req, res, next) => {
    let productId = req.params.id;
    Product.findById({ _id: productId }).then(result => {
        res.status(200).json(result)
    }).catch(error => {
        console.log(error);
        res.status(500).json({
            error: error
        })
    })
}

exports.deleteProduct = (req, res, next) => {
    let productId = req.params.id;
    Product.deleteOne({ _id: productId }).then(result => {
        res.status(200).json({
            message: "product deleted",
            data: result
        })
    }).catch(error => {
        console.log(error);
        res.status(500).json({
            error: error
        })
    })
}

exports.createProduct = (req, res, next) => {
    console.log(req.file)
    let newProduct = new Product({
        productName: req.body.name,
        price: req.body.price,
        path: req.file.path
    })
    newProduct.save().then(result => {
        res.status(200).json(newProduct)
    }).catch(error => {
        console.log(error);
        res.status(500).json({
            error: error
        })
    });
}

exports.editProduct = (req, res, next) => {
    let id = req.params.id;
    let updatedProduct = {};
    for (const ops of req.body) {
        updatedProduct[ops.propsName] = ops.value
    }
    Product.updateOne({ _id: id }, { $set: updatedProduct }).then(result => {
        res.status(200).json(result)
    }).catch(error => {
        console.log(error);
        res.status(500).json({
            error: error
        })
    });
}