const express = require('express');
const router = express.Router();

const billingAdressCtrl = require('../controllers/billingadress')

router.get('/', billingAdressCtrl.getAllBillingadress);
router.get('/:id', billingAdressCtrl.getOneBillingadress);
router.post('/', billingAdressCtrl.createBillingadress);
router.put('/:id', billingAdressCtrl.editBillingadress);
router.delete('/:id', billingAdressCtrl.deleteBillingadress);

module.exports = router;