const express = require('express');
const router = express.Router();

const orderdetailsCtrl = require('../controllers/orderdetails')

router.get('/', orderdetailsCtrl.getAllOrderdetails);
router.get('/:id', orderdetailsCtrl.getOneOrderdetails);
router.post('/', orderdetailsCtrl.createOrderdetails);
router.put('/:id', orderdetailsCtrl.editOrderdetails);
router.delete('/:id', orderdetailsCtrl.deleteOrderdetails);

module.exports = router;