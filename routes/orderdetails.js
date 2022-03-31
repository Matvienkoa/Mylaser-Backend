const express = require('express');
const router = express.Router();
const { checkJWT, checkUser } = require('../middleware/auth');
const orderdetailsCtrl = require('../controllers/orderdetails');

router.get('/', checkJWT, checkUser, orderdetailsCtrl.getAllOrderdetails);
router.get('/:id', checkJWT, checkUser, orderdetailsCtrl.getOneOrderdetails);
router.post('/', checkJWT, checkUser, orderdetailsCtrl.createOrderdetails);
router.put('/:id', checkJWT, checkUser, orderdetailsCtrl.editOrderdetails);
router.delete('/:id', checkJWT, checkUser, orderdetailsCtrl.deleteOrderdetails);

module.exports = router;