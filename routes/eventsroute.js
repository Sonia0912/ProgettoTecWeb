var express = require('express');
var router = express.Router();
const fs = require('fs');

router.get('/event', function(req, res) {
    var contents = fs.readFileSync('./data/events.json','utf8');
    obj = JSON.parse(contents);
    res.json(obj)
});


router.post('/bookingEvent',async (req, res) => {
    var eventName ;
    var continua = true;
    fs.readFile('./data/bookingEvent.json', 'utf8', function readFileCallback(err, data) {
        if(err) {
            console.log("ERROR READING FILE: " + err);
        } else {
            obj = JSON.parse(data);
           
            for (var i = 0; i < obj.length; i++) {
                if (obj[i].nameEvent === req.body.nameEvent && obj[i].userEmail === req.body.userEmail ) {
                    continua = false;
                    break;
                }
            }
            if(continua){
                //aggiungi
                eventName = req.body.nameEvent;
                obj.push({
                    nameEvent: req.body.nameEvent,
                    userEmail: req.body.userEmail
                })
                newJson = JSON.stringify(obj);
                fs.writeFile('./data/bookingEvent.json', newJson, 'utf8', (err) => {
                    if (!err) {
                      console.log('Booking Update');
                      //return res.status(200).send("true")
                    }
                });     
                fs.readFile('./data/events.json', 'utf8', function readFileCallback(err, data) {
                    if(err) {
                        console.log("ERROR READING FILE: " + err);
                    } else {
                        obj = JSON.parse(data);
                        for (var i = 0; i < obj.length; i++) {
                            if (obj[i].name == eventName) {
                                obj[i].bookedSeat += 1;
                                console.log('num seat: '+ obj[i].bookedSeat )
                                break;
                            }
                        }
            
                        json = JSON.stringify(obj);
                        fs.writeFile('./data/events.json', json, 'utf8', (err) => {
                            if (!err) {
                              console.log('Value seat change into the database');
                              console.log(eventName)
                             return res.status(200).send("true")
                            }
                        });
                    }
                });
                
            }else{
                return res.status(400).send("false");
            }
           
        }
    });

   
})



router.get('/getEvents', function(req, res) {
    var content = fs.readFileSync('./data/events.json', 'utf8');
    obj = JSON.parse(content);
    
    res.json(obj);
});

router.post('/addEvent', function(req, res) {

    console.log("sono qui")
    fs.readFile('./data/events.json', 'utf8', function readFileCallback(err, data) {
        if(err) {
            console.log("ERROR READING FILE: " + err);
        } else {
            obj = JSON.parse(data);
            obj.push({
                name: req.body.name,
                date: req.body.date,
                place: req.body.place,
                price: req.body.price,
                description: req.body.description,
                totSeat: req.body.totSeat,
                bookedSeat:0,
                category:req.body.category,
                photo:req.body.photo
            });
            json = JSON.stringify(obj);
            fs.writeFile('./data/events.json', json, 'utf8', (err) => {
                if (!err) {
                  console.log('Event added to the database');
                 
                }
            });
        }
    });
    res.status(204).send("OK");
})

router.delete('/deleteEvent/:name', function(req, res) {
    var contents = fs.readFileSync('./data/events.json', 'utf8');
    obj = JSON.parse(contents);
    remainingObj = obj.filter(data => data.name != req.params.name);
    json = JSON.stringify(remainingObj);
    fs.writeFile('./data/events.json', json, 'utf8', (err) => {
        if (!err) {
          console.log('Event deleted');
        }
    });
    res.send("OK");
})

module.exports = router;