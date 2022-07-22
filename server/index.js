// server/index.js

const express = require("express");

const router = express.Router();

require("dotenv").config();

const PORT = process.env.PORT || 3001;

const app = express();

const mongoDb = require('./db/connection');

mongoDb.connectToServer(function (err) {
    console.log(err);
});

const db = mongoDb.getDb();

router.get('/weather', function (req, res) {
    db.collection('Weather').find().toArray((err, results) => {
        if (err) return console.log(err)
        res.send(results)
    });
});

router.post('/weather/new', (req, res) => {
    const newWeather = req.body
    db.collection('Weather').insertOne(newWeather, (err, results) => {
        if (err) return console.log(err)
        res.send('Saved')
    })
});

app.use("/", router);

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});