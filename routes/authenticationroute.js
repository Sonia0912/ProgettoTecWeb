var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const fs = require('fs');
const bcrypt = require('bcrypt');

router.post('/login', (req, res, next) => {
    var contents = fs.readFileSync('./data/users.json', 'utf8');
    obj = JSON.parse(contents);
    var user = obj.users.find(user => user.email === req.body.email);
    if (!user) {
        return res.status(401).json({
            title: "user not found",
            error: "No user was found with that e-mail"
        })
    }
    if (!bcrypt.compareSync(req.body.password, user.password)) {
        return res.status(401).json({
            title: "login failed",
            error: "The password is incorrect"
        })
    }
    var isAdmin = user.admin;
    var token = jwt.sign({ userId: user.id }, process.env.SESSION_SECRET);
    return res.status(200).json({
        title: "login success",
        token: token,
        admin: isAdmin
    })
})

router.post('/register', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)

        fs.readFile('./data/users.json', 'utf8', function readFileCallback(err, data) {
            if (err) {
                console.log("ERROR READING FILE: " + err);
            } else {
                obj = JSON.parse(data);
                var user = obj.users.find(user => user.email === req.body.email);
                if (user) {
                    return res.status(409).json({
                        title: "Existing email",
                        error: "This email is already used"
                    })
                } else {
                    obj.users.push({
                        id: Date.now().toString(),
                        name: req.body.name,
                        surname: req.body.surname,
                        email: req.body.email,
                        password: hashedPassword,
                        admin: false,
                        quizScore: 0,
                        hangmanScore: 0
                    });
                    json = JSON.stringify(obj);
                    fs.writeFile('./data/users.json', json, 'utf8', (err) => {
                        if (!err) {
                            console.log('User added to the database');
                            return res.status(200).send("OK")
                        }
                    });
                }
            }
        });
    } catch (e) {
        console.log("ERROR " + e)
        res.redirect('/')
    }
})

module.exports = router;