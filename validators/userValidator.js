const validator = require('./validator')
const {check, validationResult} = require('express-validator');


module.exports = new class UserValidator extends validator {
    handle(){
        return[check('email', 'فرمت ایمیل صحیح نیست').isEmail() ,
    check('password', 'حداقل 5 کلمه').isLength({min : 5})]
    }
}

