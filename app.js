const express = require('express');
const bodyParser = require('body-parser');
const mail = require('./app/mail');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post("/subscribe", async (req, res) => {
    await mail.subscribe(req.body.email).catch(e => { console.log(e) });
    res.send('Email sent');
    // res.sendFile(__dirname + "/index.html");
});

app.post("/contact", async (req, res) => {
    await mail.info(req.body).catch(e => { console.log(e) });
    res.send(`Message from "${req.body.fullName}". Email address is "${req.body.email}".  The message is: "${req.body.message}"`);
})

app.listen(3000, () => {
    console.log('listening on port 3000');
});

