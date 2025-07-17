const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const flash = require('connect-flash');
let users = require('./../users.js');
router.use(flash());

// router.get('/', (req, res) => {
//     res.status(200).json({
//         data: users,
//         success: trues
//     });
// })

router.get('/:id', function (req, res) {
    let user = users.find( user =>{
        if(user.id == req.params.id){
            return user;
        }
    });

    res.render('./../views/user.ejs', {user: user});
})


router.post('/' , [
    check('email', 'فرمت ایمیل صحیح نیست').isEmail() ,
    check('password', 'حداقل 5 کلمه').isLength({min : 5})] ,
    function (req, res) {

    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
        req.flash('errors', errors.array());
        console.log(req.flash(errors));
        return res.redirect('/user')
    }
    console.log(req.body);
    req.body.id = parseInt(req.body.id);
    users.push(req.body);
    req.flash('message', 'کاربر مورد نظر ایجاد شد')
    res.redirect('/user');
})
router.get('/', function (req, res) {
    console.log(req.flash('message'));
    res.render('./../views/users.ejs', {users: users, errors: req.flash('errors'), message: req.flash('message')});
})

router.get('/:username', function (req, res) {
    // console.log(req.params.username);
    // console.log(req.query.id);
    res.send('Hello World!');
})

router.put('/:id', function (req, res) {
    users = users.map(user =>{
        if(user.id == req.params.id){
            return req.body;
        }
        else {
            return user;
        }
    })
    req.flash('message', 'کاربر مورد نظر بروز شد')
    res.redirect('/user')
})

router.delete('/:id', function (req, res) {
    users = users.filter(user=>{
        if(user.id != req.params.id){
            return user;
        }
    })
    req.flash('message', 'کاربر مورد نظر حذف شد')
    return res.redirect('/user');
})

module.exports = router;
