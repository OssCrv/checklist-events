const express = require('express');
const router = express.Router();

const authController = require('../controller/authController')

/* router.get('/', indexController.index);
 */
router.get('/login', authController.login);
router.post('/auth', authController.auth);
router.get('/logout', authController.logout)


module.exports = router;