var express = require('express');
var router = express.Router();
const fs = require('fs');

/* router.get('/adoption', function(req, res) {
    res.render('adoption', {
        pageTitle: 'Adoption',
        pageID: 'adoption'
    });
}); */

router.get('/dogsForAdoption', function(req, res) {
    var contents = fs.readFileSync('./data/dog.json', 'utf8');
    obj = JSON.parse(contents);
    res.json(obj);
});

router.get('/catsForAdoption', function(req, res) {
    var contents = fs.readFileSync('./data/cats.json', 'utf8');
    obj = JSON.parse(contents);
    res.json(obj);
});

module.exports = router;