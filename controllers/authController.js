let controller = require('./controller');
const User = require('./../models/user');
const {validationResult} = require("express-validator");
const passport = require("passport");

class UserController extends controller{
    async registerForm (req, res, next) {
        try {

            res.render("auth/register", {errors: req.flash('errors')});
        } catch (error) {
            next(error);
        }
        }
    async loginForm (req, res, next) {
        try {

            res.render("auth/login", {errors: req.flash('errors')});
        } catch (error) {
            next(error);
        }
    }
    async register (req, res, next) {
        try {
            const errors = validationResult(req);
            console.log(errors);
            if (!errors.isEmpty()) {
                let myErrors = errors.array().map(err => err.msg);
                req.flash('errors', myErrors);
                console.log(req.flash(errors));
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
                return res.redirect('./auth/login',);
            }
            passport.authenticate('local.login', (err, user) => {
                if (!user) return res.redirect('/auth/login');
                req.logIn(user, err =>{
                    return res.redirect('/dashboard');
                })
            })(req, res, next);
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new UserController;
