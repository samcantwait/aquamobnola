const express = require('express');
const bodyParser = require('body-parser');
const ejsMate = require('ejs-mate');
const path = require('path');
const allRoutes = require('./routes/allRoutes');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.engine('ejs', ejsMate);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(__dirname));

app.use(allRoutes);

app.listen(3000, () => {
    console.log('listening on port 3000');
});
