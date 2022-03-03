const express = require('express');
const router = express.Router();

const orderCtrl = require('../controllers/order')

router.get('/', orderCtrl.getAllOrders);
router.get('/:id', orderCtrl.getOneOrder);
router.get('/number/:number', orderCtrl.getOneOrderByNumber);
router.post('/', orderCtrl.createOrder);
router.put('/:id', orderCtrl.editOrder);
router.put('/:id/price', orderCtrl.addPriceToOrder);
router.delete('/:id', orderCtrl.deleteOrder);

module.exports = router;