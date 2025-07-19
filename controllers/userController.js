let controller = require('./controller');
const User = require('./../models/user');
const {validationResult} = require("express-validator");

class UserController extends controller{
    async getAllUsers (req, res) {
        console.log(req.flash('message'));
        let users = await User.find({});
        res.render('./../views/users.ejs', {users: users, errors: req.flash('errors'), message: req.flash('message')});
    }
    async seeOneUser(req, res) {
        let user = await User.findOne({_id: req.params.id})
        res.render('./../views/user.ejs', {user: user});
    }
    async createUser (req, res) {
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
        req.flash('message', 'کاربر مورد نظر ایجاد شد')
        res.redirect('/user');
    }
    async updateUser (req, res) {
        await User.updateMany({_id: req.params.id}, {$set: req.body});
        req.flash('message', 'کاربر مورد نظر بروز شد')
        res.redirect('/user')
    }
    async deleteUser (req, res) {
        await User.deleteOne({_id: req.params.id});
        req.flash('message', 'کاربر مورد نظر حذف شد')
        return res.redirect('/user');
    }
}

module.exports = new UserController;
