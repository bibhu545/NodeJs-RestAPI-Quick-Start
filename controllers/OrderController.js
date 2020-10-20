const Order = require('../models/orderModels')
const Product = require('../models/productModels')


exports.getAllOrders = function getAllOrders(req, res, next) {
    Order.find().select('_id productId quantity').populate('productId', 'productName').then(result => {
        if (!result) {
            res.status(404).json({
                message: "Order not found"
            })
        }
        res.status(200).json(result)
    }).catch(error => {
        console.log(error);
        res.status(500).json({
            error: error
        })
    });
}

exports.getOrderById = (req, res, next) => {
    let orderId = req.params.id;
    Order.findById({ _id: orderId }).select('_id quantity productId').populate('productId', 'productName').then(result => {
        res.status(200).json(result)
    }).catch(error => {
        console.log(error);
        res.status(500).json({
            error: error
        })
    })
}

exports.createOrder = (req, res, next) => {
    Product.findById({ _id: req.body.productId }).then(result => {
        if (!result) {
            return res.status(404).json({
                message: "Invalid product id"
            })
        }
        let order = new Order({
            productId: req.body.productId,
            quantity: req.body.quantity
        })
        order.save().then(result => {
            return res.status(201).json({
                message: "Order placed",
                orderDetails: order
            })
        }).catch(error => {
            console.log(error);
            res.status(500).json({
                error: error
            })
        });
    })
}

exports.deleteOrder = (req, res, next) => {
    let orderId = req.params.id;
    Order.deleteOne({ _id: orderId }).then(result => {
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