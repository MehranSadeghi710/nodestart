let controller = require('./controller');
const User = require('./../models/user');
const {validationResult} = require("express-validator");

class dashboardController extends controller{
    async index (req, res, next) {
        try {
            res.render('./../views/dashboard/index', )
        } catch (error) {
            next(error);
        }
        }
    async edituser (req, res, next) {
        try {
            const errors = validationResult(req);
            console.log(errors);
            if (!errors.isEmpty()) {
                let myErrors = errors.array().map(err => err.msg);
                req.flash('errors', myErrors);
                console.log(req.flash(errors));
                return res.redirect('./dashboard',);
            }
            let data = {
                firstName: req.body.firstName,
            }
            if (req.file){
                data.img = req.file.path.replace(/\\/g, '/').substring(6);
            }
            await User.updateOne({_id: req.user.id}, {$set: data})
            res.redirect('./dashboard');
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new dashboardController;
