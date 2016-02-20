const express = require('express');
const app = express();

app.set('view engine', 'jade');
app.use(express.static('public'));


app.get('/', (req, res) => {
    res.render('index', {
        title: 'Hey',
        message: 'Hello there!'
    });
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));
