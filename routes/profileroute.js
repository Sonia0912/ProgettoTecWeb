var express = require('express');
var router = express.Router();
const { checkAuthenticated, checkNotAuthenticated } = require('./utils/auth');

router.get('/profile', checkAuthenticated, function(req, res) {
    res.render('profile', {
        pageTitle: 'Profile',
        pageID: 'profile',
        email: req.user.email,
        name: req.user.name,
        surname: req.user.surname
    });
});

module.exports = router;