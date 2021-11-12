const { UserController } = require('../controllers');

const app = require('express')();

app.get('/', (req, res) => new UserController().getUsers(req, res));
app.get('/:id', (req, res) => new UserController().getUser(req, res));
app.post('/signup', (req, res) => new UserController().signUp(req, res));
app.post('/login', (req, res) => new UserController().login(req, res));
app.put('/:id', (req, res) => new UserController().getUser(req, res));
app.delete('/:id', (req, res) => new UserController().deleteUser(req, res));



module.exports = app;