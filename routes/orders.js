const express = require('express')
const checkAuth = require('../middlewares/authGuard')
const OrderController = require('../controllers/OrderController')

const router = express.Router()

router.get('/', checkAuth, OrderController.getAllOrders)

router.get('/:id', checkAuth, OrderController.getOrderById)

router.post('/', checkAuth, OrderController.createOrder)

router.delete('/:id', checkAuth, OrderController.deleteOrder)

module.exports = router