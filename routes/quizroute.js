var express = require('express');
var router = express.Router();
const fs = require('fs');

router.get('/quiz', function(req, res) {
    if(req.app.locals.userAuthenticated) {
        res.json({ isAuth: true, score: getUserScore(req.user.email) })
    } else {
        res.json({ isAuth: false, score: -1 })
    }
});

router.put('/quiz', function(req, res) {
    if(req.app.locals.userAuthenticated) {
        updateUserScore(req.user.email)
    }
})

function getUserScore(userEmail) {
    score = -1;
    var contents = fs.readFileSync('./data/users.json', 'utf8');
    obj = JSON.parse(contents);
    userLoggedIn = obj.users.find(user => user.email === userEmail);
    score = userLoggedIn.quizScore;
    return score;
}

function updateUserScore(userEmail) {
    fs.readFile('./data/users.json', 'utf8', function readFileCallback(err, data) {
        if(err) {
            console.log("ERROR READING FILE: " + err);
        } else {
            obj = JSON.parse(data);
            for (var i = 0; i < obj.users.length; i++) {
                if (obj.users[i].email === userEmail) {
                    obj.users[i].quizScore += 10;
                    break;
                }
            }
            newJson = JSON.stringify(obj);
            fs.writeFile('./data/users.json', newJson, 'utf8', (err) => {
                if (!err) {
                  console.log('Quiz score updated');
                }
            });
        }
    });
}

module.exports = router;