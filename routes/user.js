const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const flash = require('connect-flash');
// let users = require('./../users.js');
router.use(flash());
const User = require('./../models/user');

// router.get('/', (req, res) => {
//     res.status(200).json({
//         data: users,
//         success: trues
//     });
// })

router.get('/:id', async function (req, res) {
    let user = await User.findOne({_id: req.params.id})
    res.render('./../views/user.ejs', {user: user});
})


router.post('/' , [
    check('email', 'فرمت ایمیل صحیح نیست').isEmail() ,
    check('password', 'حداقل 5 کلمه').isLength({min : 5})] ,
    async function (req, res) {

    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
        req.flash('errors', errors.array());
        console.log(req.flash(errors));
        return res.redirect('/user')
    }
    console.log(req.body);
    req.body.id = parseInt(req.body.id);
    let newUser = new User({
        email: req.body.email,
        password: req.body.password,
        first_name: req.body.first_name,
        });
    await newUser.save();

    // users.push(req.body);
    req.flash('message', 'کاربر مورد نظر ایجاد شد')
    res.redirect('/user');
})
router.get('/', async function (req, res) {
    console.log(req.flash('message'));
    let users = await User.find({});
    res.render('./../views/users.ejs', {users: users, errors: req.flash('errors'), message: req.flash('message')});
})

router.get('/:username', function (req, res) {
    // console.log(req.params.username);
    // console.log(req.query.id);
    res.send('Hello World!');
})

router.put('/:id', async function (req, res) {
    await User.updateMany({_id: req.params.id}, {$set: req.body});
    req.flash('message', 'کاربر مورد نظر بروز شد')
    res.redirect('/user')
})

router.delete('/:id', async function (req, res) {
    await User.deleteOne({_id: req.params.id});
    req.flash('message', 'کاربر مورد نظر حذف شد')
    return res.redirect('/user');
})

module.exports = router;
