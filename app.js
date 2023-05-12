const express = require('express');
const bodyParser = require('body-parser');
const mail = require('./app/mail');
const ejsMate = require('ejs-mate');
const mysql = require('mysql');
const path = require('path');

const app = express();

const connection = mysql.createConnection({
    // host: 'localhost',
    user: 'sam',
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

app.get('/gallery/', (req, res) => {
    let show = req.query.show ? req.query.show : false;
    let name = req.query.name;
    connection.query('SELECT name FROM photographers;', (error, results, fields) => {
        const photographers = [];
        const allPhotographers = results;
        results.forEach(result => photographers.push(result.name.toLowerCase()));
        photographers.push('all');

        connection.query('SELECT name, full_name FROM shows;', (error, results, fields) => {
            const shows = [];
            const allShows = results;
            results.forEach(result => shows.push(result.name.toLowerCase()));

            if (show && shows.indexOf(name) === -1) {
                show = false;
                name = 'all';
            }

            if (!show && photographers.indexOf(name) === -1) {
                show = false;
                name = 'all';
            }

            const query = name === 'all' ?
                `SELECT url_350, url_600, url_2000, photographers.name, alt_text, is_long FROM photos JOIN photographers ON photos.photographer_id = photographers.id;` :
                `SELECT url_350, url_600, url_2000, photographers.name, alt_text, is_long FROM photos 
                JOIN photographers ON photos.photographer_id = photographers.id 
                WHERE ${show ? 'show_id' : 'photographer_id'} = 
                    (
                        SELECT id FROM ${show ? 'shows' : 'photographers'} 
                        WHERE name = ?
                    );`

            connection.query(query, [name], (error, results, fields) => {
                if (error) throw error;
                res.render('pages/gallery', { results, allShows, allPhotographers, name, show })
            })
        })
    })
})

app.post("/gallery", (req, res) => {
    res.redirect(`/gallery/?${req.body.sort}`);
})

app.listen(3000, () => {
    console.log('listening on port 3000');
});
