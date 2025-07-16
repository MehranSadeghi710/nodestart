const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
let users = require('./../users.js');

router.get('/', (req, res) => {
    res.status(200).json({
        data: users,
        success: true
    });
})

router.get('/:id', function (req, res) {
    let user = users.find( user =>{
        if(user.id == req.params.id){
            return user;
        }
    });

    res.status(200).json({
        data: user,
        success: true
    });
})


router.post('/' , [ check('email', 'فرمت ایمیل صحیح نیست').isEmail() , check('password', 'حداقل 5 کلمه').isLength({min : 5})] , function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()});
    }
    console.log(req.body);
    req.body.id = parseInt(req.body.id);
    users.push(req.body);
    res.json({
        data: 'یوزر اضافه شد',
        success: true
    })
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
    res.json({
        data: 'کاربر بروز شد',
        success: true
    })
})

router.delete('/:id', function (req, res) {
    users = users.filter(user=>{
        if(user.id != req.params.id){
            return user;
        }
    })
    res.json({
        data: 'کاربر حذف شد',
        success: true
    })
})

module.exports = router;
