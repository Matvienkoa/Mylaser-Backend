const express = require('express');
const router = express.Router();
const boxtalCtrl = require('../controllers/boxtal');

router.post('/', boxtalCtrl.getShipments);
router.post('/sendshipment', boxtalCtrl.sendShipment);

module.exports = router;