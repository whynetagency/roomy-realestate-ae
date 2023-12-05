'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const app = express();

const port = process.env.PORT || 80;

app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
});
app.post('/token', (req, res) => {
    const options = {
        method: 'POST',
        headers: {
            'accept': 'application/json',
            'cache-control': 'no-cache,no-cache',
            'content-type': 'application/x-www-form-urlencoded'
        },
        body: 'grant_type=client_credentials&scope=booking_engine%3Aapi&client_secret=_______&client_id=_______'
    };

    fetch('https://booking.guesty.com/oauth2/token', options)
        .then(response => response.json())
        .then(response => res.send({text: response}))
        .catch(err => res.send({'error': err}));
});

app.listen(port, () => {
    console.log('We are live on ' + port);
});

