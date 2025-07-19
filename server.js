const express = require('express');
const app = express();
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('connect-flash');
const mongoose = require('mongoose');
require('app-module-path').addPath(__dirname);
require('dotenv').config();
mongoose.connect('mongodb://localhost:27017/nodestart', {useNewUrlParser: true, useUnifiedTopology: true});

global.config = require('./config.js');

app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended : false }));
app.set ('view engine', 'ejs');
app.use(methodOverride('method'));
app.use(cookieParser(process.env.COOKIE_SECRET));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {secure : true}
}))
app.use(flash());
//
app.get('/', function (req, res) {
    res.render('index');
})

app.use('/user', require('./routes/index'));

app.listen(config.port, ()=>{
    console.log(`Server started on port ${config.port}`);
})
