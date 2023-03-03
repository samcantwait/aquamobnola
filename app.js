const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


app.use(express.static(__dirname))

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post("/response", (req, res) => {
    const address = req.body.address;
    console.log("Email: " + address);
    res.sendFile(__dirname + "/index.html");
});

app.listen(3000, () => {
    console.log('listening on port 3000')
})

