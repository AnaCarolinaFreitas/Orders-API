const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const apiKeyMiddleware = require("../config/apiKey");

router.use(apiKeyMiddleware);
router.get('/', orderController.getOrders);
router.get('/:id', orderController.getOrderById);
router.post('/', orderController.createOrder);
router.put('/:id', orderController.updateOrder);
router.delete('/:id', orderController.deleteOrder);

module.exports = router;