var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const fs = require('fs');

router.post('/posts', function (req, res) {
    var token = req.headers.token;
    jwt.verify(token, process.env.SESSION_SECRET, (err, decoded) => {
        if (err) return res.status(401).json({
            title: "unauthorized"
        })
        var contents = fs.readFileSync('./data/users.json', 'utf8');
        obj = JSON.parse(contents);
        var user = obj.users.find(user => user.id === decoded.userId);
        if (!user) return res.status(401).json({
            title: "user id not found"
        })
        savePost(user.email, req.body.text, req.body.img);
        var contents = fs.readFileSync('./data/dashboard.json', 'utf8');
        obj = JSON.parse(contents);
        res.json(obj);
    })
});

router.get('/posts', function (req, res) {
    var contents = fs.readFileSync('./data/dashboard.json', 'utf8');
    obj = JSON.parse(contents);
    obj = obj.slice(-5);
    res.json(obj);
});

router.get('/moreposts/:postsLoaded', function (req, res) {
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