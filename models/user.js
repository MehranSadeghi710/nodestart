const mongoose = require('mongoose');
const Schema = mongoose.Schema

const  userSchema = new Schema({
    first_name: {type: String},
    img: {type: String},
    balance : {type: Number , default: 0},
    email : {type: String, unique: true, required: true},
    password: {type: String, required: true},
})
module.exports = mongoose.model('User', userSchema, 'User');