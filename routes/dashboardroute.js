var express = require('express');
var router = express.Router();
const fs = require('fs');
const { checkAuthenticated, checkNotAuthenticated } = require('./utils/auth');

router.get('/dashboard', checkAuthenticated, function(req, res) {
    res.render('dashboard', {
        pageTitle: 'Dashboard',
        pageID: 'dashboard',
        email: req.user.email,
        name: req.user.name,
        surname: req.user.surname
    });
});

router.post('/posts', function(req, res) {
    savePost(req.user.email, req.body.text, req.body.img);
    var contents = fs.readFileSync('./data/dashboard.json', 'utf8');
    obj = JSON.parse(contents);
    res.json(obj);
});

router.get('/posts', checkAuthenticated, function(req, res) {
    var contents = fs.readFileSync('./data/dashboard.json', 'utf8');
    obj = JSON.parse(contents);
    obj = obj.slice(-5);
    res.json(obj);
});

router.get('/moreposts/:postsLoaded', function(req, res) {
    var contents = fs.readFileSync('./data/dashboard.json', 'utf8');
    obj = JSON.parse(contents);
    var indexStart = -(parseInt(req.params.postsLoaded) + 5);
    var indexEnd = -(req.params.postsLoaded);
    obj = obj.slice(indexStart, indexEnd);
    res.json(obj);
});

function savePost(username, postText, postImg) {
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    var contents = fs.readFileSync('./data/dashboard.json', 'utf8');
    obj = JSON.parse(contents);
    obj.push({
        author: username,
        date: today.toDateString(),
        text: postText,
        img: postImg,
    });
    newJson = JSON.stringify(obj);
    fs.writeFileSync('./data/dashboard.json', newJson, 'utf8');
}

module.exports = router;