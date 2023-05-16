const mail = require('../app/mail');
const https = require('https');
const pool = require('../database');
const { v4: uuidv4 } = require('uuid');


exports.renderHome = (req, res, next) => {
    res.render('index', { sitekey: `${process.env.SITEKEY_LOCAL}` });
}

exports.subscribe = async (req, res, next) => {
    const email = req.body.email;
    const query = `INSERT INTO emails (email, uuid) VALUES (?, ?)`;

    pool.pool.getConnection((err, connection) => {
        if (err) throw err;
        connection.query(query, [email, uuidv4()]);
        connection.release();
    })
    const message = await mail.subscribe(req.body.email).catch(e => { console.log(e) });
    res.render('pages/subscribed', { email: req.body.email })
}

exports.checkForm = async (req, res, next) => {
    if (req.body.captcha === undefined ||
        req.body.captcha === '' ||
        req.body.captcha === null) {
        return res.json({ msg: false });
    }
    const secretKey = process.env.SECRET_KEY_LOCAL;
    const verifyURL = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${req.body.captcha}`;

    https.get(verifyURL, (response) => {
        let data = '';
        response.on('data', chunk => {
            data += chunk;
        })
        response.on('end', () => {
            data = JSON.parse(data)
            console.log(data)
            return res.json({ msg: data });
        })
    }).on('error', err => {
        console.error('there was an error siily')
    })

    // const result = await fetch(verifyURL, {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json",
    //     },
    // }).then(res => res.json())
    // return res.json({ msg: result.success })
}

exports.contact = async (req, res, next) => {
    await mail.info(req.body).catch(e => { console.log(e) });
    res.redirect('/');
}

exports.showGallery = (req, res, next) => {
    let show = req.query.show ? req.query.show : false;
    let name = req.query.name;

    pool.pool.getConnection((err, connection) => {
        if (err) throw err;

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
            connection.release();
        })
    })
}

exports.sortGallery = (req, res, next) => {
    res.redirect(`/gallery/?${req.body.sort}`);
}

exports.send404 = (req, res, next) => {
    res.status(404).send('Sorry, the page you are looking for does not exist.')
}