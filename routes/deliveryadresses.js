const express = require('express');
const router = express.Router();

const deliveryAdressCtrl = require('../controllers/deliveryadress')

router.get('/', deliveryAdressCtrl.getAllDeliveryadress);
router.get('/:id', deliveryAdressCtrl.getOneDeliveryadress);
router.post('/', deliveryAdressCtrl.createDeliveryadress);
router.put('/:id', deliveryAdressCtrl.editDeliveryadress);
router.delete('/:id', deliveryAdressCtrl.deleteDeliveryadress);

module.exports = router;