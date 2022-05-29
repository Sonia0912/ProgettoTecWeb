const { json } = require('body-parser');
var express = require('express');
var router = express.Router();
const fs = require('fs');


router.get('/hangmanScore', function(req,res){
    var contents = fs.readFileSync('./data/users.json', 'utf8');
    obj = JSON.parse(contents);
    var user = obj.users.find(user => user.email === req.query.email);
    return res.json({score:user.hangmanScore})

}); 

router.post('/hangman', function (req, res) {

    fs.readFile('./data/users.json', 'utf8', function readFileCallback(err, data) {
        if (err) {
            console.log("ERROR READING FILE: " + err);
        } else {
            obj = JSON.parse(data);
            var scoreUser = 0;
            for (var i = 0; i < obj.users.length; i++) {
                if (obj.users[i].email === req.body.email) {
                    
                    obj.users[i].hangmanScore = parseInt(req.body.scoreUser);
                    scoreUser = obj.users[i].hangmanScore;
                    break;
                }
            }   
            jsonFile = JSON.stringify(obj);
            fs.writeFile('./data/users.json', jsonFile, 'utf8', (err) => {
                if (!err) {
                    console.log('Score Hangman updated');
                    res.json({score:scoreUser});
                }
            });
        }
    });
});

router.get('/hangmanScore/email/:email', function(req, res) {
    res.json({ score: getUserScore(req.params.email) })    
});


function getUserScore(userEmail) {
    score = 0;
    var contents = fs.readFileSync('./data/users.json', 'utf8');
    obj = JSON.parse(contents);
    userLoggedIn = obj.users.find(user => user.email === userEmail);
    score = userLoggedIn.hangmanScore;
    return score;
}

module.exports = router;