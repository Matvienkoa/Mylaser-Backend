const express = require('express');
const router = express.Router();
const { checkJWT, checkUser, checkAdmin } = require('../middleware/auth');
const deliveryAdressCtrl = require('../controllers/deliveryadress')

router.get('/', checkJWT, checkUser, checkAdmin, deliveryAdressCtrl.getAllDeliveryadress);
router.get('/:id', checkJWT, checkUser, deliveryAdressCtrl.getOneDeliveryadress);
router.post('/', checkJWT, checkUser, deliveryAdressCtrl.createDeliveryadress);
router.put('/:id', checkJWT, checkUser, deliveryAdressCtrl.editDeliveryadress);
router.delete('/:id', checkJWT, checkUser, deliveryAdressCtrl.deleteDeliveryadress);

module.exports = router;