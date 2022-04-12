const express = require('express');
const router = express.Router();
const boxtalCtrl = require('../controllers/boxtal');

router.post('/', boxtalCtrl.getShipments);

module.exports = router;