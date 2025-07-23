const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');
router.use('/user', require('./user'))
router.use('/auth', require('./auth'))
router.use('/dashboard', require('./dashboard'))
router.get('/logout', (req, res, next) => {
        req.logout(function(err) {
            if (err) return next(err);
            res.redirect('/');
        });

    // req.logout();
    // res.redirect('/');
})
router.get('/paycallback', homeController.paycallback.bind(homeController));
router.all('/*path', async (req, res, next) => {
    try {
        let err = new Error('Not Found');
        err.status = 404;
        throw err;
    }catch(err) {
        next(err);
    }
})
// router.use(async (req, res, next, err)=>{
//     const code = err.status || 500;
//     const message = err.message || "";
//     const stack = err.stack || "";
//
//     if (config.debug){
//         res.render('errors/developer.ejs', {message , stack});
//     }else {
//         return res.render(`errors/${code}`, {message});
//     }
// })

module.exports = router;