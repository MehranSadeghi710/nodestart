const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const flash = require('connect-flash');
const userController = require("controllers/userController");
const userValidator = require("validators/userVlidator");
router.use(flash());
const User = require('./../models/user');

router.get('/', userController.getAllUsers);

router.get('/:id', userController.seeOneUser);

router.post('/', userValidator.handle(), userController.createUser);

router.put('/:id', userController.updateUser);

router.delete('/:id', userController.deleteUser);

module.exports = router;
