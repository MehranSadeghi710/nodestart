const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const flash = require('connect-flash');
// let users = require('./../users.js');
router.use(flash());
const User = require('./../models/user');
const userController = require("./../controllers/userController");

router.get('/', userController.getAllUsers.bind(userController));

router.get('/:id', userController.seeOneUser.bind(userController));

router.post('/' , [
    check('email', 'فرمت ایمیل صحیح نیست').isEmail() ,
    check('password', 'حداقل 5 کلمه').isLength({min : 5})],
    userController.createUser.bind(userController))

router.put('/:id', userController.updateUser.bind(userController))

router.delete('/:id', userController.deleteUser.bind(userController))

module.exports = router;
