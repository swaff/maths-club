const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated && req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
};

module.exports = function (app, passport) {
    app.get('/', isLoggedIn, (req, res) => {
        res.render('index', {
            title: 'Hey',
            message: 'Hello there!'
        });
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
};
