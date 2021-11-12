const PasswordRequestController = require('../controllers/passwordRequest');

const app = require('express')();

app.post('/', (req, res) => new PasswordRequestController().sendRecoverLink(req, res));
app.post('/recover/:hash', (req, res) => new PasswordRequestController().readRecoverLink(req, res));

module.exports = app;