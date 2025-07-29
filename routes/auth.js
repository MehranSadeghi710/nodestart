const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const flash = require('connect-flash');
const authController = require("controllers/authController");
const authValidator = require("validators/authValidator");
router.use(flash());

router.use((req, res, next) => {
    if (req.isAuthenticated()){
        return res.redirect('/dashboard');
    }
    next();
})
///

router.get('/login', authController.loginForm.bind(authController));

router.get('/register', authController.registerForm.bind(authController));

router.post('/login', authValidator.login() , authController.login.bind(authController));

router.post('/register', authValidator.register() , authController.register.bind(authController));

module.exports = router;