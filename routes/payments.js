const express = require('express');
const router = express.Router();
const { checkJWT, checkUser } = require('../middleware/auth');
const paymentCtrl = require('../controllers/payment');

router.post('/', checkJWT, checkUser, paymentCtrl.createPayment);
router.get('/:session_id', checkJWT, checkUser, paymentCtrl.getPaymentSession);

module.exports = router;