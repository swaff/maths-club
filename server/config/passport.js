const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

const localStrategyOptions = {
    passReqToCallback: true
};

const isUserAuthenticated = (user, password) => user && user.isValidPassword(password);

const initPassport = (passport) => {
    console.log('init passport');
    passport.serializeUser((user, done) => done(null, user.id));

    passport.deserializeUser((id, done) => User.findById(id, done));

    passport.use('local-signup', new LocalStrategy(localStrategyOptions, (req, username, password, done) => {

        User.findOne({ username }, (err, user) => {

            if (err) {
                return done(err);
            }

            if (user) {
                return done(null, false, req.flash('sign-up.message', 'This username has already been taken'));
            }

            // Everything is looking good at this point, no errors, and no user
            // with the requested email address
            const newUser = new User();
            newUser.username = username;
            newUser.password = newUser.getPasswordHash(password);

            newUser.save((err) => {
                if (err) {
                    throw err;
                }
                return done(null, newUser);
            });
        });
    }));

    passport.use('local-login', new LocalStrategy(localStrategyOptions, (req, username, password, done) => {

        // try and find a user with the given username
        User.findOne({ username }, (err, user) => {

            if (err) { return done(err); }

            if (!isUserAuthenticated(user, password)) {
                return done(null, false, req.flash('login.message', 'There has been a problem logging in with this username and password'));
            }

            return done(null, user);
        });
    }));
};

module.exports = initPassport;
