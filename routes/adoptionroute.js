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

router.get('/getPets', function(req, res) {
    var contentsDog = fs.readFileSync('./data/dog.json', 'utf8');
    var contentsCat = fs.readFileSync('./data/cat.json', 'utf8');
    objDog = JSON.parse(contentsDog);
    objDog.forEach(object => {
        object.type = 'dog';
    });
    objCat = JSON.parse(contentsCat);
    objCat.forEach(object => {
        object.type = 'cat';
    });
    obj = objDog.concat(objCat);
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
                id: Date.now().toString(),
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
            // update the number of bookings for that day and pet
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

router.post('/addPet', function(req, res) {
    fs.readFile('./data/' + req.body.type + '.json', 'utf8', function readFileCallback(err, data) {
        if(err) {
            console.log("ERROR READING FILE: " + err);
        } else {
            obj = JSON.parse(data);
            obj.push({
                name: req.body.name,
                age: req.body.age,
                gender: req.body.gender,
                photo: req.body.photo,
                description: req.body.description,
                shelter: req.body.shelter
            });
            json = JSON.stringify(obj);
            fs.writeFile('./data/' + req.body.type + '.json', json, 'utf8', (err) => {
                if (!err) {
                  console.log('Pet added to the database');
                }
            });
        }
    });
    res.status(204).send("OK");
})

router.delete('/deletePet/:type/:name', function(req, res) { 
    var contents = fs.readFileSync('./data/' + req.params.type + '.json', 'utf8');
    obj = JSON.parse(contents);
    remainingObj = obj.filter(data => data.name != req.params.name);
    json = JSON.stringify(remainingObj);
    fs.writeFile('./data/' + req.params.type + '.json', json, 'utf8', (err) => {
        if (!err) {
          console.log('Pet deleted');
        }
    });
    res.send("OK");
})

router.get('/myvisits/:loggedEmail', function(req, res) {
    fs.readFile('./data/visits.json', 'utf8', function readFileCallback(err, data) {
        if(err) {
            console.log("ERROR READING FILE: " + err);
        } else {
            obj = JSON.parse(data);
            var myBookings = [];
            for(let i = 0; i < obj.length; i++) {
                if(obj[i].username === req.params.loggedEmail) {
                    objFormatted = formatDayTime(obj[i]);
                    myBookings.push(objFormatted);
                }
            }
            var myBookingsOrdered = myBookings.reverse();
            res.json(myBookingsOrdered)
        }
    });
})

router.delete('/deleteBooking/:idVisit', function(req, res) { 
    var contents = fs.readFileSync('./data/visits.json', 'utf8');
    obj = JSON.parse(contents);
    visitToDelete = obj.filter(data => data.id === req.params.idVisit);
    remainingObj = obj.filter(data => data.id != req.params.idVisit);
    json = JSON.stringify(remainingObj);
    fs.writeFile('./data/visits.json', json, 'utf8', (err) => {
        if (!err) {
          console.log('Visit deleted');
        }
    });
    var contents2 = fs.readFileSync('./data/visitsPerDay.json', 'utf8');
    obj2 = JSON.parse(contents2);
    for(let i = 0; i < obj2.length; i++) {
        if(obj2[i].petName === visitToDelete[0].petName && obj2[i].day === visitToDelete[0].day && obj2[i].month === visitToDelete[0].month && obj2[i].year === visitToDelete[0].year) {
            obj2[i].totVisits -= 1;
            break;
        }
    }
    json2 = JSON.stringify(obj2);
    fs.writeFile('./data/visitsPerDay.json', json2, 'utf8', (err) => {
        if (!err) {
          console.log('Number of visits updated');
        }
    });
    res.send("OK");
})

function formatDayTime(visit) {
    let arr = visit.time.split(':');
    if(arr[1].length === 1) {
        let formattedTime = arr[0] + ":0" + arr[1]
        visit.time = formattedTime;
    }
    switch(visit.month) {
        case 1:
            visit.month = "January"
            break;
        case 2:
            visit.month = "February"
            break;
        case 3:
            visit.month = "March"
            break;
        case 4:
            visit.month = "April"
            break;
        case 5:
            visit.month = "May"
            break;
        case 6:
            visit.month = "June"
            break;
        case 7:
            visit.month = "July"
            break;
        case 8:
            visit.month = "August"
            break;
        case 9:
            visit.month = "September"
            break;
        case 10:
            visit.month = "October"
            break;
        case 11:
            visit.month = "November"
            break;
        case 12:
            visit.month = "December"
            break;
    }
    return visit;
}

module.exports = router;