const express = require('express');
const router = express.Router();
const dxfCtrl = require('../controllers/dxf');
const multer = require('../middleware/multer-config');

router.post('/', multer.single('dxf'), dxfCtrl.convertDxf);
router.post('/quote', dxfCtrl.createQuote);
router.post('/price', dxfCtrl.getPrice);
module.exports = router;