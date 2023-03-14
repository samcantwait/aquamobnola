const express = require('express');
const bodyParser = require('body-parser');
const mail = require('./app/mail');
const ejsMate = require('ejs-mate');
const path = require('path');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.engine('ejs', ejsMate);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(__dirname));

app.get("/", (req, res) => {
    res.render('index');
});

app.post("/subscribe", async (req, res) => {
    await mail.subscribe(req.body.email).catch(e => { console.log(e) });
    res.render('pages/subscribed', { email: req.body.email })
});

app.post("/contact", async (req, res) => {
    await mail.info(req.body).catch(e => { console.log(e) });
    res.redirect('/');
})

app.get("/gallery", async (req, res) => {
    res.render('pages/gallery');
})

app.listen(3000, () => {
    console.log('listening on port 3000');
});

