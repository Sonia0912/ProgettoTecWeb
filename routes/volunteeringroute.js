var express = require('express');
var router = express.Router();
const fs = require('fs');

router.get('/volunteering', function(req, res) {
    fs.readFile('./data/volunteering.json', 'utf8', function readFileCallback(err, data) {
        if(err) {
            console.log("ERROR READING FILE: " + err);
        } else {
            obj = JSON.parse(data);
            res.json(obj);
        }
    });
});

module.exports = router;