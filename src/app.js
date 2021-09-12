const express = require('express');
const volleyball = require('volleyball');
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000;
const app = express();
const db = require('../src/db');
const routes = require('./routes');

app.use(cors());
app.use(volleyball);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/', routes)
app.listen(port, async () => {
    console.log(`App Listening on ${port} port`);
    const connected = new db().connect();
    if (!connected) {
        process.exit(0);
    }
});
