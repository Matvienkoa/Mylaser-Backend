const express = require('express');
const router = express.Router();
const { checkJWT, checkUser } = require('../middleware/auth');
const mailCtrl = require('../controllers/mail');

router.post('/', checkJWT, checkUser, mailCtrl.sendMail);

module.exports = router;