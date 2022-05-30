if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

var express = require('express');
const jwt = require('jsonwebtoken');
const fs = require('fs');
var router = express.Router();
const bcrypt = require('bcrypt');

router.get('/profile', function (req, res) {
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
        return res.status(200).json({
            title: 'user grabbed',
            user: {
                email: user.email,
                name: user.name,
                surname: user.surname,
                quizScore: user.quizScore,
                hangmanScore: user.hangmanScore
            }
        })
    })
});

router.post('/profile', async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    fs.readFile('./data/users.json', 'utf8', function readFileCallback(err, data) {
        if (err) {
            console.log("ERROR READING FILE: " + err);
        } else {
            obj = JSON.parse(data);
            for (var i = 0; i < obj.users.length; i++) {
                if (obj.users[i].email === req.body.email) {
                    obj.users[i].name = req.body.name
                    obj.users[i].surname = req.body.surname
                    if (req.body.password != '') {
                        obj.users[i].password = hashedPassword
                    }
                    break;
                }
            }
            newJson = JSON.stringify(obj);
            fs.writeFile('./data/users.json', newJson, 'utf8', (err) => {
                if (!err) {
                    console.log('Info Profile Update');
                    res.send("ok");
                }
            });
        }
    });
})

module.exports = router;