const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express();
const flash = require('connect-flash');

const mongoose = require('mongoose');
const passport = require('passport');

// Set up the database
const databaseConfig = require('./config/database');
mongoose.connect(databaseConfig.url);

// Set up express
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', 'server/views');
app.set('view engine', 'jade');
app.use(express.static('public'));

// Setup passport for username/password style authentication
require('./config/passport')(passport);
app.use(session({
    secret: 'maths-clubs-super-secret-secret',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Set up all the application routes outisde of this file for bevity
require('./routes')(app, passport);

app.listen(3000, () => console.log('Example app listening on port 3000!'));
