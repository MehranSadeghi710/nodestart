const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const flash = require('connect-flash');
const dashboardController = require("controllers/dashboardController");
const editUserValidator = require('validators/editUserValidator')
router.use(flash());
const uploadUserProfile = require('upload/uploadUserProfile')

router.use((req, res, next) => {
    if (req.isAuthenticated()){
        return next();
    }
    res.redirect('/');
})


router.get('/', dashboardController.index.bind(dashboardController));
router.post('/edituser', uploadUserProfile.single('img'), (req, res, next)=>{
    if(!req.file){
        req.body.img = null;
    }else {
        req.body.img = req.file.filename;
        next();
    }
}, editUserValidator.handle() ,dashboardController.edituser.bind(dashboardController));

module.exports = router;