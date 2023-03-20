const express = require('express');
const bodyParser = require('body-parser');
const mail = require('./app/mail');
const ejsMate = require('ejs-mate');
const mysql = require('mysql');
const path = require('path');

const app = express();

const connection = mysql.createConnection({
    host: 'localhost',
    // user: 'sam',
    user: 'root',
    password: process.env.PASS_MYSQL,
    database: 'aquamobnola_db'
});

connection.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected as id ' + connection.threadId);
});

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
    const message = await mail.subscribe(req.body.email).catch(e => { console.log(e) });
    res.render('pages/subscribed', { email: req.body.email })
});

app.post("/contact", async (req, res) => {
    await mail.info(req.body).catch(e => { console.log(e) });
    res.redirect('/');
})

app.get('/gallery/', async (req, res) => {
    const show = req.query.show ? req.query.show : false;
    const name = req.query.name;
    const query = name === 'all' ? `SELECT url_large, url_thumb, photographers.name, alt_text, is_long FROM photos JOIN photographers ON photos.photographer_id = photographers.id;` :
        `SELECT url_large, url_thumb, photographers.name, alt_text, is_long FROM photos 
    JOIN photographers ON photos.photographer_id = photographers.id 
    WHERE ${show ? 'show_id' : 'photographer_id'} = 
        (
            SELECT id FROM ${show ? 'shows' : 'photographers'} 
            WHERE name = '${name}'
        );`
    connection.query(query, (error, results, fields) => {
        if (error) throw error;
        res.render('pages/gallery', { results })
    })
})

app.post("/gallery", async (req, res) => {
    res.redirect(`/gallery/?${req.body.sort}`);
})

app.listen(3000, () => {
    console.log('listening on port 3000');
});
