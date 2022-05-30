var express = require('express');
var router = express.Router();
const fs = require('fs');

router.get('/event', function (req, res) {
    var contents = fs.readFileSync('./data/events.json', 'utf8');
    obj = JSON.parse(contents);
    res.json(obj)
});


router.post('/bookingEvent', async (req, res) => {
    var eventName;
    var continua = true;
    fs.readFile('./data/bookingEvent.json', 'utf8', function readFileCallback(err, data) {
        if (err) {
            console.log("ERROR READING FILE: " + err);
        } else {
            obj = JSON.parse(data);
            //controllo che non sia già presente la prenotazione
            for (var i = 0; i < obj.length; i++) {
                if (obj[i].nameEvent === req.body.nameEvent && obj[i].userEmail === req.body.userEmail) {
                    continua = false;
                    break;
                }
            }
            if (continua) {
                //aggiungi
                eventName = req.body.nameEvent;
                obj.push({
                    nameEvent: req.body.nameEvent,
                    userEmail: req.body.userEmail,
                    dateEvent: req.body.dateEvent,
                    placeEvent: req.body.placeEvent,
                    descriptionEvent: req.body.descriptionEvent,
                    photo: req.body.photo
                })
                newJson = JSON.stringify(obj);
                fs.writeFile('./data/bookingEvent.json', newJson, 'utf8', (err) => {
                    if (!err) {
                        console.log('Booking updated');
                        //return res.status(200).send("true")
                    }
                });
                fs.readFile('./data/events.json', 'utf8', function readFileCallback(err, data) {
                    if (err) {
                        console.log("ERROR READING FILE: " + err);
                    } else {
                        obj = JSON.parse(data);
                        for (var i = 0; i < obj.length; i++) {
                            if (obj[i].name == eventName) {
                                obj[i].bookedSeat += 1;
                                break;
                            }
                        }
                        json = JSON.stringify(obj);
                        fs.writeFile('./data/events.json', json, 'utf8', (err) => {
                            if (!err) {
                                console.log('Number of seats changed');
                                return res.status(200).send("true")
                            }
                        });
                    }
                });

            } else {
                return res.status(409).send("false");
            }

        }
    });


})



router.get('/getEvents', function (req, res) {
    var content = fs.readFileSync('./data/events.json', 'utf8');
    obj = JSON.parse(content);
    // obj[0].avaibleSeat = obj[0].totSeat - obj[0].bookedSeat;

    res.json(obj);
});

router.post('/addEvent', function (req, res) {
    fs.readFile('./data/events.json', 'utf8', function readFileCallback(err, data) {
        if (err) {
            console.log("ERROR READING FILE: " + err);
        } else {
            obj = JSON.parse(data);
            var eventDuplicate = obj.find(eventDuplicate => eventDuplicate.name === req.body.name &&
                eventDuplicate.date === req.body.date);

            if (eventDuplicate) {
                console.log("evento duplicato")
                return res.status(409).json({
                    title: "Existing Event",
                    error: "This event already exists"
                })
            } else {
                obj.push({
                    name: req.body.name,
                    date: req.body.date,
                    place: req.body.place,
                    price: req.body.price,
                    description: req.body.description,
                    totSeat: req.body.totSeat,
                    bookedSeat: 0,
                    category: req.body.category,
                    photo: req.body.photo
                });
                json = JSON.stringify(obj);
                fs.writeFile('./data/events.json', json, 'utf8', (err) => {
                    if (!err) {
                        console.log('Event added to the database');
                        res.status(204).send("OK");
                    }
                });
            }

        }
    });

})

router.delete('/deleteEvent/:name', function (req, res) {
    var events = fs.readFileSync('./data/events.json', 'utf8');
    var bookedEvent = fs.readFileSync('./data/bookingEvent.json', 'utf-8');

    obj1 = JSON.parse(events);
    obj2 = JSON.parse(bookedEvent);
    remainingObj1 = obj1.filter(data => data.name != req.params.name);
    remainingObj2 = obj2.filter(data => data.nameEvent != req.params.name);
    json1 = JSON.stringify(remainingObj1);
    json2 = JSON.stringify(remainingObj2);

    fs.writeFile('./data/events.json', json1, 'utf8', (err) => {
        if (!err) {
            console.log('Event deleted');
        }
    });
    fs.writeFile('./data/bookingEvent.json', json2, 'utf8', (err) => {
        if (!err) {
            console.log('Event Booked deleted');
        }
    });
    res.send("OK");
})

router.get('/myevents/:loggedEmail', function (req, res) {
    fs.readFile('./data/bookingEvent.json', 'utf8', function readFileCallback(err, data) {
        if (err) {
            console.log("ERROR READING FILE: " + err);
        } else {
            obj = JSON.parse(data);
            var myevents = [];
            for (let i = 0; i < obj.length; i++) {
                if (obj[i].userEmail === req.params.loggedEmail) {
                    myevents.push(obj[i]);
                }
            }
            res.json(myevents)
        }
    });
})

module.exports = router;