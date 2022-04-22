const express = require('express');
const router = express.Router();
const cartCtrl = require('../controllers/cart');

router.post('/', cartCtrl.createCart);
router.get('/', cartCtrl.getAllCarts);
router.get('/:id', cartCtrl.getOneCart);
router.put('/:id', cartCtrl.editCart);
router.put('/removequote/:id', cartCtrl.removeQuoteFromCart);
router.put('/addshippinginfos/:id', cartCtrl.addShippingInfos);
router.put('/addrelayinfos/:id', cartCtrl.addRelayInfos);
router.delete('/:id', cartCtrl.deleteCart);

module.exports = router;