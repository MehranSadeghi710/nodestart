const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const User = require('../models/user');

passport.serializeUser((user, done) => {
    done(null, user.id);
})

passport.deserializeUser(async (id, done) => {
    let user = await User.findById(id);
    if (user) done(null, user);
})

passport.use("local.register", new localStrategy(
    {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true,
    },  async (req, email, password, done ) => {
        try {
            let user = await User.findOne({email: req.body.email});
            if (user) {
                done(null, false, req.flash('error', 'User already exists'));
            }

            const newUser = new User({
                first_name: req.body.first_name,
                email: req.body.email,
                password: req.body.password,
            })
            await newUser.save();
            done(null, newUser);
        }catch(err) {
            return done(err, false, {message: err});
        }
    }
));

passport.use("local.register", new localStrategy(
    {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true,
    },  async (req, email, password, done ) => {
        try {
            let user = await User.findOne({email: req.body.email});
            if (!user || user.password !== req.body.password) {
                return done(null, false, req.flash('errors', 'اطلاعات شما هماهنگی ندارد'));
            }
            done(null, user);
        }catch(err) {
            return done(err, false, {message: err});
        }
    }

))
