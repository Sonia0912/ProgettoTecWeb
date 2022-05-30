var express = require('express');
var router = express.Router();
const fs = require('fs');

router.get('/dogsForAdoption', function (req, res) {
    var contents = fs.readFileSync('./data/dog.json', 'utf8');
    obj = JSON.parse(contents);
    res.json(obj);
});

router.get('/catsForAdoption', function (req, res) {
    var contents = fs.readFileSync('./data/cat.json', 'utf8');
    obj = JSON.parse(contents);
    res.json(obj);
});

router.get('/getPets', function (req, res) {
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

router.get('/infoPet/:type/:name', function (req, res) {
    var contents = fs.readFileSync('./data/' + req.params.type + '.json', 'utf8');
    obj = JSON.parse(contents);
    var pet = obj.find(pet => pet.name === req.params.name);
    res.json(pet);
});

router.post('/adoptionBook', function (req, res) {
    fs.readFile('./data/visits.json', 'utf8', function readFileCallback(err, data) {
        if (err) {
            console.log("ERROR READING FILE: " + err);
        } else {
            obj = JSON.parse(data);
            obj.push({
                id: Date.now().toString(),
                username: req.body.username,
                petName: req.body.petName,
                shelter: req.body.shelter,
                photo: req.body.photo,
                date: req.body.date,
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
        if (err) {
            console.log("ERROR READING FILE: " + err);
        } else {
            obj = JSON.parse(data);
            var found = false;
            // update the number of bookings for that day and pet
            for (var i = 0; i < obj.length; i++) {
                if (obj[i].petName === req.body.petName && obj[i].date === req.body.date) {
                    obj[i].times.push(req.body.time)
                    found = true;
                    break;
                }
            }
            // add the new booking to the database
            if (!found) {
                var timesArr = [];
                timesArr.push(req.body.time)
                obj.push({
                    petName: req.body.petName,
                    date: req.body.date,
                    times: timesArr
                });
            }
            json = JSON.stringify(obj);
            fs.writeFile('./data/visitsPerDay.json', json, 'utf8', (err) => {
                if (!err) {
                    console.log('Number of visits updated');
                    res.status(204).send("OK")
                }
            });
        }
    });
});

router.post('/addPet', function (req, res) {
    fs.readFile('./data/' + req.body.type + '.json', 'utf8', function readFileCallback(err, data) {
        if (err) {
            console.log("ERROR READING FILE: " + err);
        } else {
            obj = JSON.parse(data);
            var pet = obj.find(pet => pet.name === req.body.name);
            if (pet) {
                return res.status(409).json({
                    title: "Existing pet name",
                    error: "This name is already used"
                })
            } else {
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
                        res.status(204).send("OK");
                    }
                });
            }
        }
    });
})

// When the admin deletes a pet
router.delete('/deletePet/:type/:name', function (req, res) {
    // Deletes in dog.json or cat.json
    var contents = fs.readFileSync('./data/' + req.params.type + '.json', 'utf8');
    obj = JSON.parse(contents);
    remainingObj = obj.filter(data => data.name != req.params.name);
    json = JSON.stringify(remainingObj);
    fs.writeFile('./data/' + req.params.type + '.json', json, 'utf8', (err) => {
        if (!err) {
            console.log('Pet deleted (1)');
        }
    });
    // Deletes in visits.json
    var contents = fs.readFileSync('./data/visits.json', 'utf8');
    obj = JSON.parse(contents);
    remainingObj = [];
    for (let i = 0; i < obj.length; i++) {
        if (obj[i].petName != req.params.name) {
            remainingObj.push(obj[i]);
        }
    }
    json = JSON.stringify(remainingObj);
    fs.writeFile('./data/visits.json', json, 'utf8', (err) => {
        if (!err) {
            console.log('Pet deleted (2)');
        }
    });
    // Deletes in visitsPerDay.json
    var contents = fs.readFileSync('./data/visitsPerDay.json', 'utf8');
    obj = JSON.parse(contents);
    remainingObj = [];
    for (let i = 0; i < obj.length; i++) {
        if (obj[i].petName != req.params.name) {
            remainingObj.push(obj[i]);
        }
    }
    json = JSON.stringify(remainingObj);
    fs.writeFile('./data/visitsPerDay.json', json, 'utf8', (err) => {
        if (!err) {
            console.log('Pet deleted (3)');
        }
    });
    res.send("OK");
})

router.get('/myvisits/:loggedEmail', function (req, res) {
    fs.readFile('./data/visits.json', 'utf8', function readFileCallback(err, data) {
        if (err) {
            console.log("ERROR READING FILE: " + err);
        } else {
            obj = JSON.parse(data);
            var myBookings = [];
            for (let i = 0; i < obj.length; i++) {
                if (obj[i].username === req.params.loggedEmail) {
                    myBookings.push(obj[i]);
                }
            }
            var myBookingsOrdered = myBookings.reverse();
            res.json(myBookingsOrdered)
        }
    });
})

// When a user deletes a visit with a pet
router.delete('/deleteBooking/:idVisit', function (req, res) {
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
    for (let i = 0; i < obj2.length; i++) {
        if (obj2[i].petName === visitToDelete[0].petName && obj2[i].date === visitToDelete[0].date) {
            obj2[i].times = obj2[i].times.filter(item => item !== visitToDelete[0].time)
            break;
        }
    }
    json2 = JSON.stringify(obj2);
    fs.writeFile('./data/visitsPerDay.json', json2, 'utf8', (err) => {
        if (!err) {
            console.log('Times of the visit updated');
        }
    });
    res.send("OK");
})

router.get('/getVisits', function (req, res) {
    var contents = fs.readFileSync('./data/visits.json', 'utf8');
    obj = JSON.parse(contents);
    res.json(obj.reverse());
})

router.get('/visits/:petName', function (req, res) {
    fs.readFile('./data/visitsPerDay.json', 'utf8', function readFileCallback(err, data) {
        if (err) {
            console.log("ERROR READING FILE: " + err);
        } else {
            obj = JSON.parse(data);
            var bookedVisits = [];
            for (let i = 0; i < obj.length; i++) {
                if (obj[i].petName === req.params.petName) {
                    bookedVisits.push(obj[i]);
                }
            }
            res.json(bookedVisits)
        }
    });
})

router.put('/modifyVisit', function (req, res) {
    // modifico la visita in visits.json
    fs.readFile('./data/visits.json', 'utf8', function readFileCallback(err, data) {
        if (err) {
            console.log("ERROR READING FILE: " + err);
        } else {
            obj = JSON.parse(data);
            var oldTime = '';
            var oldDate = '';
            for (let i = 0; i < obj.length; i++) {
                if (obj[i].id === req.body.id) {
                    oldTime = obj[i].time;
                    oldDate = obj[i].date;
                    obj[i].date = req.body.date;
                    obj[i].time = req.body.time;
                    break;
                }
            }
            var myBookings = [];
            for (let i = 0; i < obj.length; i++) {
                if (obj[i].username === req.body.username) {
                    myBookings.push(obj[i]);
                }
            }
            var myBookingsOrdered = myBookings.reverse();
            json = JSON.stringify(obj);
            fs.writeFile('./data/visits.json', json, 'utf8', (err) => {
                if (!err) {
                    console.log('Day and time of the visit modified');
                    // modifico il giorno e gli orari in visitsPerDay.json
                    fs.readFile('./data/visitsPerDay.json', 'utf8', function readFileCallback(err, data) {
                        if (err) {
                            console.log("ERROR READING FILE: " + err);
                        } else {
                            obj2 = JSON.parse(data);
                            var found = false;
                            for (let i = 0; i < obj2.length; i++) {
                                if (obj2[i].petName === req.body.petName && obj2[i].date === req.body.date) {
                                    obj2[i].times.push(req.body.time);
                                    found = true;
                                }
                                if (obj2[i].petName === req.body.petName && obj2[i].date === oldDate) {
                                    obj2[i].times = obj2[i].times.filter(t => t != oldTime)
                                }
                            }
                            if (!found) {
                                var timesArr = [];
                                timesArr.push(req.body.time);
                                obj2.push({
                                    petName: req.body.petName,
                                    date: req.body.date,
                                    times: timesArr
                                })
                            }
                            json2 = JSON.stringify(obj2);
                            fs.writeFile('./data/visitsPerDay.json', json2, 'utf8', (err) => {
                                if (!err) {
                                    console.log('Times of the visit updated');
                                    res.json(myBookingsOrdered);
                                }
                            });
                        }
                    });
                }
            });
        }
    });
})

module.exports = router;