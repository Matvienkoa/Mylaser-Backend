const express = require('express');
const router = express.Router();
const paymentCtrl = require('../controllers/payment');

router.post('/', paymentCtrl.createPayment);
router.get('/:session_id', paymentCtrl.getPaymentSession);

module.exports = router;