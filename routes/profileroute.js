if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

var express = require('express');
const jwt = require('jsonwebtoken');
const fs = require('fs')
var router = express.Router();


router.get('/profile', function(req, res) {
    var token = req.headers.token;
    jwt.verify(token, process.env.SESSION_SECRET, (err, decoded) => {
        if(err) return res.status(401).json({
            title: "unauthorized"
        })
        var contents = fs.readFileSync('./data/users.json', 'utf8');
        obj = JSON.parse(contents);
        var user = obj.users.find(user => user.id === decoded.userId);
        if(!user) return res.status(401).json({
            title: "user id not found"
        }) 
        return res.status(200).json({
            title: 'user grabbed',
            user: {
                email: user.email,
                name: user.name,
                surname: user.surname
            }
        })
    })
});



module.exports = router;