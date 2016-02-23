const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

const initPassport = (passport) => {
    console.log('init passport');
    passport.serializeUser((user, done) => done(null, user.id));

    passport.deserializeUser((id, done) => User.findById(id, done));

    passport.use('local-signup', new LocalStrategy({
        usernameField : 'username',
        passwordField : 'password',
        passReqToCallback : true
    }, (req, username, password, done) => {
        console.log('here we go');

        User.findOne({ username }, (err, user) => {

            if (err) {
                console.log(err);
                return done(err);
            }

            if (user) {
                console.log('user found');
                return done(null, false);
            }

            console.log('here');

            // everything is looking good at this point, no errors, and no user
            // with the requested email address
            const newUser = new User();
            newUser.username = username;
            newUser.password = newUser.getPasswordHash(password);

            newUser.save((err) => {
                if (err) {
                    console.log('failed to save user');
                    throw err;
                }
                console.log('done');
                return done(null, newUser);
            });
        });
    }));
};

module.exports = initPassport;
