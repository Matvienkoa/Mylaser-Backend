const express = require('express');
const router = express.Router();
const mailCtrl = require('../controllers/mail');

router.post('/button', mailCtrl.sendMailButton);
router.post('/infos', mailCtrl.sendMailInfos);

module.exports = router;