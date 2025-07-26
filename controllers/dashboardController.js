let controller = require('./controller');
const User = require('./../models/user');
const Payment = require('./../models/payment');
const axios = require('axios');
const {validationResult} = require("express-validator");

class dashboardController extends controller{
    async index (req, res, next) {
        try {
            res.render('./../views/dashboard/index',{req:req,})
        } catch (error) {
            next(error);
        }
        }
    async pay (req, res, next) {
        try {
            let params = {
                merchant_id: "6cded376-3063-11e9-a98e-005056a205be",
                amount: req.body.amount,
                callback_url : "http://127.0.0.1:3000/paycallback",
                description: "افزایش حساب کاربری"
            }
            const response = await axios.post("https://sandbox.zarinpal.com/pg/v4/payment/request.json", params);
            console.log(response);
            if(response.data.data.code == 100){
                let newPayment = new Payment({
                    user : req.user.id,
                    amount: req.body.amount,
                    resnumber : response.data.data.authority
                });
                await newPayment.save();
                res.redirect(`https://sandbox.zarinpal.com/pg/StartPay/${response.data.data.authority}`);

            }else {
               res.redirect('/dashboard')
            }
        } catch (error) {
            console.log(error);
            next(error);
        }
        }
    async edituser (req, res, next) {
        try {
            const errors = validationResult(req);
            // console.log(errors);
            // if (!errors.isEmpty()) {
            //     let myErrors = errors.array().map(err => err.msg);
            //     req.flash('errors', myErrors);
            //     console.log(req.flash(errors));
            //     return res.redirect('./',);
            // }
            let data = {
                firstName: req.body.firstName,
            }
            if (req.file){
                data.img = req.file.path.replace(/\\/g, '/').substring(6);
            }
            await User.updateOne({_id: req.user.id}, {$set: data})
            res.redirect('/');
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new dashboardController;
