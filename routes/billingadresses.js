const express = require('express');
const router = express.Router();
const { checkJWT, checkUser, checkAdmin } = require('../middleware/auth');
const billingAdressCtrl = require('../controllers/billingadress')

router.get('/', checkJWT, checkUser, checkAdmin, billingAdressCtrl.getAllBillingadress);
router.get('/:id', checkJWT, checkUser, billingAdressCtrl.getOneBillingadress);
router.post('/', checkJWT, checkUser, billingAdressCtrl.createBillingadress);
router.put('/:id', checkJWT, checkUser, billingAdressCtrl.editBillingadress);
router.delete('/:id', checkJWT, checkUser, billingAdressCtrl.deleteBillingadress);

module.exports = router;