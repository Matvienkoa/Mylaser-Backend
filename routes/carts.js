const express = require('express');
const router = express.Router();
const cartCtrl = require('../controllers/cart');

router.post('/', cartCtrl.createCart);
router.get('/', cartCtrl.getAllCarts);
router.get('/:id', cartCtrl.getOneCart);
router.put('/:id', cartCtrl.editCart);

module.exports = router;