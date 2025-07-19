const express = require('express');
const router = express.Router();

router.use('/user', require('./user'))
router.use('/auth', require('./auth'))
router.use('/dashboard', require('./dashboard'))
router.get('/logout', (req, res) => {
    console.log('logged out');
})
// router.all('*', async (req, res, next) => {
//     try {
//         let err = new Error('Not Found');
//         err.status = 404;
//         throw err;
//     }catch(err) {
//         next(err);
//     }
// })
// router.use(async (req, res, next, err)=>{
//     const code = err.status || 500;
//     const message = err.message || "";
//     const stack = err.stack || "";

    // if (config.debug){
    //     console.log("kian")
    //     res.render('errors/developer.ejs', {message , stack});
    // }else {
    //     return res.render(`errors/${code}`, {message});
    // }
// })

module.exports = router;