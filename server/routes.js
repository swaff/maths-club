const sumFactory = require('./lib/sumFactory');

const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated && req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
};

module.exports = function (app, passport) {
    app.get('/', isLoggedIn, (req, res) => {
        res.render('index');
    });

    app.get('/club/:number', isLoggedIn, (req, res) => {
        res.render('index');
    });

    app.get('/login', (req, res) => {
        res.render('login', {
            message: req.flash('login.message')
        });
    });

    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    }));

    app.get('/sign-up', (req, res) => {
        res.render('sign-up', {
            message: req.flash('sign-up.message')
        });
    });

    app.post('/sign-up', passport.authenticate('local-signup', {
        successRedirect: '/',
        failureRedirect: '/sign-up',
        failureFlash: true
    }));

    app.get('/api/sums', isLoggedIn, (req, res) => {
        if (req.query.number) {
            res.json({
                sums: sumFactory.getRandomSums(req.query.number)
            });
        } else {
            res.status(400).end();
        }
    });
};
