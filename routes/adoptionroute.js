var express = require('express');
var router = express.Router();
const fs = require('fs');

router.get('/dogsForAdoption', function(req, res) {
    var contents = fs.readFileSync('./data/dog.json', 'utf8');
    obj = JSON.parse(contents);
    res.json(obj);
});

router.get('/catsForAdoption', function(req, res) {
    var contents = fs.readFileSync('./data/cat.json', 'utf8');
    obj = JSON.parse(contents);
    res.json(obj);
});

router.get('/infoPet/:type/:name', function(req, res) {
    var contents = fs.readFileSync('./data/' + req.params.type + '.json', 'utf8');
    obj = JSON.parse(contents);
    var pet = obj.find(pet => pet.name === req.params.name);
    res.json(pet);
});

router.get('/fullDates/:petName', function(req, res) {
    fs.readFile('./data/visitsPerDay.json', 'utf8', function readFileCallback(err, data) {
        if(err) {
            console.log("ERROR READING FILE: " + err);
        } else {
            var obj = JSON.parse(data);
            var shelterFullDates = [];
            for(let i = 0; i < obj.length; i++) {
                if(obj[i].petName === req.params.petName && obj[i].totVisits >= 5) {
                    shelterFullDates.push(obj[i]);
                }
            }
            res.json(shelterFullDates);
        }
    });
});

router.post('/adoptionBook', function(req, res) {
    fs.readFile('./data/visits.json', 'utf8', function readFileCallback(err, data) {
        if(err) {
            console.log("ERROR READING FILE: " + err);
        } else {
            obj = JSON.parse(data);
            obj.push({
                username: req.body.username,
                petName: req.body.petName,
                shelter: req.body.shelter,
                photo: req.body.photo,
                day: req.body.day,
                month: req.body.month,
                year: req.body.year,
                time: req.body.time
            });
            json = JSON.stringify(obj);
            fs.writeFile('./data/visits.json', json, 'utf8', (err) => {
                if (!err) {
                  console.log('Visit added to the database');
                }
            });
        }
    });
    fs.readFile('./data/visitsPerDay.json', 'utf8', function readFileCallback(err, data) {
        if(err) {
            console.log("ERROR READING FILE: " + err);
        } else {
            obj = JSON.parse(data);
            var found = false;
            // update the number of bookings for that day and shelter
            for (var i = 0; i < obj.length; i++) {
                if (obj[i].petName === req.body.petName && obj[i].day === req.body.day && obj[i].month === req.body.month) {
                    obj[i].totVisits += 1;
                    found = true;
                    break;
                }
            }
            if(!found) {
                // add the new booking to the database
                obj.push({
                    petName: req.body.petName,
                    day: req.body.day,
                    month: req.body.month,
                    year: req.body.year,
                    totVisits: 1
                });
            }
            json = JSON.stringify(obj);
            fs.writeFile('./data/visitsPerDay.json', json, 'utf8', (err) => {
                if (!err) {
                  console.log('Number of visits updated');
                }
            });
        }
    });
});

module.exports = router;