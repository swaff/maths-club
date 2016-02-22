const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated && req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
};

module.exports = function (app) {
    app.get('/', isLoggedIn, (req, res) => {
        res.render('index', {
            title: 'Hey',
            message: 'Hello there!'
        });
    });

    app.get('/login', (req, res) => res.render('login'));
    app.get('/sign-up', (req, res) => res.render('sign-up'));
};
