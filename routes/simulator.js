const express = require('express');
const router = express.Router();
const simulatorCtrl = require('../controllers/simulator');

router.post('/', simulatorCtrl.getPrice);
router.post('/dxf', simulatorCtrl.createDXF);

module.exports = router;