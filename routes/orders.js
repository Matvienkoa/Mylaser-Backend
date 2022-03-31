const express = require('express');
const router = express.Router();
const { checkJWT, checkUser, checkAdmin } = require('../middleware/auth');
const orderCtrl = require('../controllers/order');

router.get('/', checkJWT, checkUser, checkAdmin, orderCtrl.getAllOrders);
router.get('/:id', checkJWT, checkUser, orderCtrl.getOneOrder);
router.get('/number/:number', checkJWT, checkUser, orderCtrl.getOneOrderByNumber);
router.post('/', checkJWT, checkUser, orderCtrl.createOrder);
router.put('/:number', checkJWT, checkUser, orderCtrl.editOrder);
router.put('/:id/price', checkJWT, checkUser, orderCtrl.addPriceToOrder);
router.put('/:number/payment', checkJWT, checkUser, orderCtrl.editPayment);
router.delete('/:id', checkJWT, checkUser, checkAdmin, orderCtrl.deleteOrder);

module.exports = router;