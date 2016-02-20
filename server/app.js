const express = require('express');
const app = express();

const routes = require('./routes');

app.set('views', 'server/views');
app.set('view engine', 'jade');
app.use(express.static('public'));

routes(app);

app.listen(3000, () => console.log('Example app listening on port 3000!'));
