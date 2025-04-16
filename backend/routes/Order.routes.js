const express = require('express')
const router = express.Router()
const OrderController = require('../controllers/Order.controller')
const authMiddleware = require('../middlewares/Auth.middleware');

router.post('/checkout',authMiddleware,OrderController.AddnewOrder)
router.get('/getOrders',OrderController.getAllOrders)
router.put('/:orderId/update-status',OrderController.updateOrderStatus)
router.get('/orderUser', authMiddleware, OrderController.getOrderBasedOnUser);
router.get('/totalOrders', OrderController.getTotalOrder);
router.get('/totalRevenue',OrderController.getTotalRevenue);
module.exports = router