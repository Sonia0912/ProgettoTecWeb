var express = require('express');
var router = express.Router();
const fs = require('fs');

router.get('/quizleaderboard', function(req, res) {
    fs.readFile('./data/users.json', 'utf8', function readFileCallback(err, data) {
        if(err) {
            console.log("ERROR READING FILE: " + err);
        } else {
            var obj = JSON.parse(data);
            var leaderboard = [];
            for(let i = 0; i < obj.users.length; i++) {
                if(obj.users[i].email != "admin") {
                    leaderboard.push({
                        name: obj.users[i].email,
                        score: obj.users[i].quizScore
                    })
                }
            }
            leaderboard.sort((a, b) => parseFloat(b.score) - parseFloat(a.score));
            res.json(leaderboard);
        }
    });
});

router.get('/hangmanleaderboard', function(req, res) {
    fs.readFile('./data/users.json', 'utf8', function readFileCallback(err, data) {
        if(err) {
            console.log("ERROR READING FILE: " + err);
        } else {
            var obj = JSON.parse(data);
            var leaderboard = [];
            for(let i = 0; i < obj.users.length; i++) {
                if(obj.users[i].email != "admin") {
                    leaderboard.push({
                        name: obj.users[i].email,
                        score: obj.users[i].hangmanScore
                    })
                }
            }
            leaderboard.sort((a, b) => parseFloat(b.score) - parseFloat(a.score));
            res.json(leaderboard);
        }
    });
});

module.exports = router;