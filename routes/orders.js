const express = require('express');
const router = express.Router();

const orderCtrl = require('../controllers/order')

router.get('/', orderCtrl.getAllOrders);
router.get('/:id', orderCtrl.getOneOrder);
router.get('/number/:number', orderCtrl.getOneOrderByNumber);
router.post('/', orderCtrl.createOrder);
router.put('/:number', orderCtrl.editOrder);
router.put('/:id/price', orderCtrl.addPriceToOrder);
router.put('/:number/payment', orderCtrl.editPayment);
router.delete('/:id', orderCtrl.deleteOrder);

module.exports = router;