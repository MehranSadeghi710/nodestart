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
                MerchantID: "6cded376-3063-11e9-a98e-005056a205be",
                Amount: req.body.amount,
                CallbackURL : "http://localhost:3000/paycallback",
                Description: "افزایش حساب کاربری"
            }
            const response = await axios.post("https://www.zarinpal.com/pg/rest/WebGate/PaymentRequest.json", params);
            if(response.data.status === 100){
                let newPayment = new Payment({
                    user : req.user.id,
                    amount: req.body.amount,
                    resnumber : response.data.Authority
                });
                await newPayment.save();
                res.redirect(`https://www.zarinpal.com/pg/StartPay/${response.data.Authority}`);

            }else {
               res.redirect('/dashboard')
            }
        } catch (error) {
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
            res.redirect('./');
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new dashboardController;
