let controller = require('./controller');
const User = require('./../models/user');
const {validationResult} = require("express-validator");

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
                req.flash('errors', errors.array());
                console.log(req.flash(errors));
                return res.redirect('/auth/register');
            }

        } catch (error) {
            next(error);
        }
    }
    async login (req, res, next) {
        try {
            const errors = validationResult(req);
            console.log(errors);
            if (!errors.isEmpty()) {
                req.flash('errors', errors.array());
                console.log(req.flash(errors));
                return res.redirect('./auth/login',);
            }
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new UserController;
