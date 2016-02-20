'use strict';

var express = require('express');
var app = express();

app.set('view engine', 'jade');
app.use(express.static('public'));

app.get('/', function (req, res) {
    res.render('index', {
        title: 'Hey',
        message: 'Hello there!'
    });
});

app.listen(3000, function () {
    return console.log('Example app listening on port 3000!');
});
