const express = require('express');
const router = express.Router();

const dependencyController = require('../controller/dependencyController')
const checklistController = require('../controller/checklistController')
const eventController = require('../controller/eventController')
const authController = require('../controller/authController')

router.get('/', dependencyController.index);

router.get('/dependencia/:id', checklistController.index)


router.get('/login', authController.login);
router.post('/auth', authController.auth);
router.get('/logout', authController.logout)

router.get('/dependencies/', dependencyController.list);
router.post('/dependencies/create', dependencyController.create);
router.post('/dependencies/edit/:id', dependencyController.edit);
router.get('/dependencies/delete/:id', dependencyController.delete);

router.get('/events/', eventController.list);
router.post('/events/create', eventController.create);
router.post('/events/edit/:id', eventController.edit);
router.get('/events/delete/:id', eventController.delete);



module.exports = router;