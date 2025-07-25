let controller = require('./controller');
const User = require('./../models/user');
const {validationResult} = require("express-validator");
const passport = require("passport");
const Recaptcha = require("express-recaptcha").RecaptchaV2;
const options = {'hl':'fa'};
const recaptcha = new Recaptcha('6Lf8S4srAAAAAGCDr3iuPB75zC1U5vU7pIFB400i', '6Lf8S4srAAAAAGnI_k7F2Snt-MIZlomhr7SPrCgv', options)

class UserController extends controller{
    async registerForm (req, res, next) {
        try {

            res.render("auth/register", {recaptcha: recaptcha.render(), errors: req.flash("errors")});
        } catch (error) {
            next(error);
        }
        }
    async loginForm (req, res, next) {
        try {

            res.render("auth/login", {errors: req.flash('errors'),
            req: req});
        } catch (error) {
            next(error);
        }
    }
    async register (req, res, next) {
        try {
            let recaptchaResult = await new Promise((resolve, reject) => {
                recaptcha.verify(req ,(err, data)=>{
                    if(err){
                        req.flash('errors','گزینه امنیتی را بزنید')
                        res.redirect('/auth/register');
                        resolve(false);
                    }else {resolve(true)}
                });
            })
            // if(recaptchaResult){
            //     return
            // }
            const errors = validationResult(req);
            console.log(errors);
            if (!errors.isEmpty()) {
                let myErrors = errors.array().map(err => err.msg);
                req.flash('errors', myErrors);
                return res.redirect('/auth/register');
            }
            passport.authenticate('local.register', {
                successRedirect: '/dashboard',
                failureRedirect: '/auth/register',
                failureFlash: true,
            })(req, res, next);
        } catch (error) {
            next(error);
        }
    }
    async login (req, res, next) {
        try {
            const errors = validationResult(req);
            console.log(errors);
            if (!errors.isEmpty()) {
                let myErrors = errors.array().map(err => err.msg);
                req.flash('errors', myErrors);
                console.log(req.flash(errors));
                return res.redirect('./login');
            }
            passport.authenticate('local.login', (err, user) => {
                if (!user) return res.redirect('./login');
                req.logIn(user, err =>{
                    return res.redirect('/dashboard');
                })
            })(req, res, next);
        } catch (error) {
            next(error);
        }
    }
}
//mkm lmlmp
module.exports = new UserController;
