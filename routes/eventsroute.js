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

module.exports = router;