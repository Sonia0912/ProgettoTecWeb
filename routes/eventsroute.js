var express = require('express');
var router = express.Router();
const fs = require('fs');

router.get('/event', function(req, res) {
    var contents = fs.readFileSync('./data/events.json','utf8');
    obj = JSON.parse(contents);
    res.json(obj)
});


router.post('/bookingEvent',async (req, res) => {
    fs.readFile('./data/bookingEvent.json', 'utf8', function readFileCallback(err, data) {
        if(err) {
            console.log("ERROR READING FILE: " + err);
        } else {
            obj = JSON.parse(data);
            var continua = true;
            for (var i = 0; i < obj.length; i++) {
                if (obj[i].nameEvent === req.body.nameEvent && obj[i].userEmail === req.body.userEmail ) {
                    continua = false;
                    break;
                }
            }
            if(continua){
                //aggiungi
                obj.push({
                    nameEvent: req.body.nameEvent,
                    userEmail: req.body.userEmail
                })
                newJson = JSON.stringify(obj);
                fs.writeFile('./data/bookingEvent.json', newJson, 'utf8', (err) => {
                    if (!err) {
                      console.log('Booking Update');
                      return res.status(200).send("true")
                    }
                });
            }else{
                return res.status(400).send("false");
            }
           
        }
    });
})

router.post('/', function(req, res) {
    fs.readFile('./data/.json', 'utf8', function readFileCallback(err, data) {
        if(err) {
            console.log("ERROR READING FILE: " + err);
        } else {
            obj = JSON.parse(data);
            console.log(req.data.nameEvent)
            var booked = obj.booking.find(booked => booked.nameEvent === req.body.nameEvent & booked.userEmail === req.body.userEmail );
           
            if(booked){
                console.log("Hai già prenotato")
            }else{
                console.log(req.body)
                obj.push({
                    nameEvent:req.body.nameEvent,
                    userEmail:req.body.userEmail
                });
            }
           
            json = JSON.stringify(obj);
            fs.writeFile('./data/bookingEvent.json', json, 'utf8', (err) => {
                if (!err) {
                  console.log('Event booking added to the database');
                }
            });
        }
    });
});

module.exports = router;