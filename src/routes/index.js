const router = require('express').Router();
const user = require('./user');
const passwordRequests = require('./passwordRequests');

router.use('/user', user)
router.use('/forgot-password', passwordRequests)
router.get('/', (_req, res) => {
    res.send('Welcome to the SugarPix!');
});

module.exports = router;