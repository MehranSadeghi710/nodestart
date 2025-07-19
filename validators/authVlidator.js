const validator = require('./validator')
const {check, validationResult} = require('express-validator');


module.exports = new class UserVlidator extends validator {
    register(){
        return[check("first_name","First name is required").not().isEmpty(),
            check('email', 'فرمت ایمیل صحیح نیست').isEmail() ,
    check('password', 'حداقل 5 کلمه').isLength({min : 5})]
    }
    login(){
        return[check('email', 'فرمت ایمیل صحیح نیست').isEmail() ,
            check('password', 'حداقل 5 کلمه').isLength({min : 5})]
    }
}

