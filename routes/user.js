const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const flash = require('connect-flash');
const userController = require("controllers/userController");
const userValidator = require("validators/userVlidator");
router.use(flash());
const User = require('./../models/user');

router.get('/', userController.getAllUsers.bind(userController));

router.get('/:id', userController.seeOneUser.bind(userController));

router.post('/', userValidator.handle(), userController.createUser.bind(userController));

router.put('/:id', userController.updateUser.bind(userController));

router.delete('/:id', userController.deleteUser.bind(userController));

module.exports = router;
