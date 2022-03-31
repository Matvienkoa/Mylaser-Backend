const express = require('express');
const router = express.Router();
const dxfCtrl = require('../controllers/dxf');
const multer = require('../middleware/multer-config');

router.post('/', multer.single('dxf'), dxfCtrl.convertDxf);
router.post('/quote', dxfCtrl.createQuote);
router.put('/quote/:id', dxfCtrl.editQuote);
router.get('/quote/:id', dxfCtrl.getCurrentQuote);
router.delete('/quote/:id', dxfCtrl.deleteQuote);
router.delete('/file', dxfCtrl.deleteFile);

module.exports = router;