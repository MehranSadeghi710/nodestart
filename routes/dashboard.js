const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const flash = require('connect-flash');
const dashboardController = require("controllers/dashboardController");
router.use(flash());

router.use((req, res, next) => {
    if (req.isAuthenticated()){
        return next();
    }
    res.redirect('/');
})


router.get('/', dashboardController.index.bind(dashboardController));

module.exports = router;