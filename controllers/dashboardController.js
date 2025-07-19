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
}

module.exports = new dashboardController;
