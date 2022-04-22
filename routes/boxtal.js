const express = require('express');
const router = express.Router();
const boxtalCtrl = require('../controllers/boxtal');

router.post('/', boxtalCtrl.getShipments);
router.post('/sendshipmenthome', boxtalCtrl.sendShipmentHome);
router.post('/sendshipmentpickuppoint', boxtalCtrl.sendShipmentPickUpPoint);
router.get('/', boxtalCtrl.getContents);
router.get('/gettoken', boxtalCtrl.getToken);
router.post('/getrelays', boxtalCtrl.getRelays);

module.exports = router;