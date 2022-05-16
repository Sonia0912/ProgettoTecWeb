var express = require('express');
var router = express.Router();
const fs = require('fs');

router.get('/event', function(req, res) {
    var contents = fs.readFileSync('./data/events.json','utf8');
    obj = JSON.parse(contents);
    res.json(obj)
});

module.exports = router;