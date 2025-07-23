let controller = require('./controller');
const User = require('./../models/user');
const {validationResult} = require("express-validator");

class UserController extends controller{
    async getAllUsers (req, res, next) {
        try {
            console.log(req.flash('message'));
            let users = await User.find();
            res.render("./../views/users.ejs", {
                users: users,
                errors: req.flash('errors'),
                message: req.flash('message'),
                req: req
            });
        } catch (error) {
            next(error);
        }
        }
    async seeOneUser(req, res, next) {
        try {
            let user = await User.findOne({_id: req.params.id})
            if (!user) {
                this.error('User not found', 404);
            }
            res.render('./../views/user.ejs', {user: user});
        }catch(err) {
            next(err);
        }
    }
    async createUser (req, res, next) {
        try {
            const errors = validationResult(req);
            console.log(errors);
            if (!errors.isEmpty()) {
                let myErrors = errors.array().map(err => err.msg);
                req.flash('errors', myErrors);
                console.log(req.flash(errors));
                return res.redirect('./user',);
            }
            console.log(req.body);
            req.body.id = parseInt(req.body.id);
            let newUser = new User({
                email: req.body.email,
                password: req.body.password,
                first_name: req.body.first_name,
            });
            await newUser.save();
            req.flash('message', 'کاربر مورد نظر ایجاد شد')
            res.redirect('/user');
        }catch(err) {
            next(err);
        }
    }
    async updateUser (req, res, next) {
        try {
            await User.updateMany({_id: req.params.id}, {$set: req.body});
            req.flash('message', 'کاربر مورد نظر بروز شد')
            res.redirect('/user')
        }catch(err) {
            next(err);
        }
    }
    async deleteUser (req, res, next) {
        try {
            await User.deleteOne({_id: req.params.id});
            req.flash('message', 'کاربر مورد نظر حذف شد')
            return res.redirect('/user');
        }catch(err) {
            next(err);
        }
    }
}

module.exports = new UserController;
