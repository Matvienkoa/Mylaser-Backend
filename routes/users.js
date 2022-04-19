const express = require('express');
const router = express.Router();
const { checkJWT, checkUser, checkAdmin } = require('../middleware/auth');
const userCtrl = require('../controllers/user');

router.get('/', checkJWT, checkUser, checkAdmin, userCtrl.getAllUsers);
router.get('/:id',  userCtrl.getOneUser);
router.put('/:id', checkJWT, checkUser, userCtrl.modifyUser);
router.delete('/:id', checkJWT, checkUser, userCtrl.deleteUser);

module.exports = router;