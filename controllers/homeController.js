let controller = require('./controller');
const User = require('./../models/user');
const {validationResult} = require("express-validator");
const axios = require("axios");

class dashboardController extends controller {
    async paycallback(req, res, next) {
        try {
            if (req.query.Status !== "OK"){
                return res.send('تراکنش ناموفق')
            }
            let payment = await Payment.findOne({resnumber: res.query.Authority});
            if (!payment){
                return res.send('همچین تراکنشی وجود ندارد')
            }
            let params = {
                MerchantID: "6cded376-3063-11e9-a98e-005056a205be",
                Amount: payment.amount,
                Authority: req.query.Authority
            }
            const response = await axios.post("https://www.zarinpal.com/pg/rest/WebGate/PaymentVerification.json", params);
            if(response.data.status === 100){
                let balance = payment.amount;
            }else {
                return res.send('تراکنش ناموفق')

            }

        } catch (error) {
            next(error);
        }
    }
}
module.exports = new dashboardController;
