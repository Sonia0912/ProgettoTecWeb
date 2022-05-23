const { json } = require('body-parser');
var express = require('express');
var router = express.Router();
const fs = require('fs');

/* router.get('/hangman', function(req, res) {
    res.render('hangman', {
        pageTitle: 'Hangman',
        pageID: 'hangman'
    });
}); */

router.post('/hangman', function (req, res) {

    fs.readFile('./data/users.json', 'utf8', function readFileCallback(err, data) {
        if (err) {
            console.log("ERROR READING FILE: " + err);
        } else {
            obj = JSON.parse(data);

            // update the score of the user
            console.log(req.body.scoreUser)
            for (var i = 0; i < obj.users.length; i++) {
                if (obj.users[i].email === req.body.email) {
                    
                    obj.users[i].hangmanScore = req.body.scoreUser;
                    break;
                }
            }

            
            jsonFile = JSON.stringify(obj);
            console.log(jsonFile)
            fs.writeFile('./data/users.json', jsonFile, 'utf8', (err) => {
                if (!err) {
                    console.log('Score Hangman updated');
                }
            });
        }
    });
});

router.get('/hangmanScore', function(req,res){


    var contents = fs.readFileSync('./data/users.json', 'utf8');
    obj = JSON.parse(contents);
    var user = obj.users.find(user => user.email === req.query.email);
   
    console.log(user.hangmanScore)
    return res.json({score:user.hangmanScore})

}); 

module.exports = router;