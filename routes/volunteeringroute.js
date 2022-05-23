var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
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

router.get('/interviews', function(req, res) {
    fs.readFile('./data/interviewsPerDay.json', 'utf8', function readFileCallback(err, data) {
        if(err) {
            console.log("ERROR READING FILE: " + err);
        } else {
            obj = JSON.parse(data);
            res.json(obj);
        }
    });
})

router.post('/addVolunteering', function(req, res) {

})

router.post('/addInterview', function(req, res) {
    var token = req.headers.token;
    jwt.verify(token, process.env.SESSION_SECRET, (err, decoded) => {
        if(err) return res.status(401).json({
            title: "unauthorized"
        })
        var contents = fs.readFileSync('./data/users.json', 'utf8');
        obj = JSON.parse(contents);
        var user = obj.users.find(user => user.id === decoded.userId);
        if(!user) return res.status(401).json({
            title: "user id not found"
        })
        // Add the new interview to the database
        fs.readFile('./data/interviews.json', 'utf8', function readFileCallback(err, data) {
            if(err) {
                console.log("ERROR READING FILE: " + err);
            } else {
                obj = JSON.parse(data);
                obj.push({
                    username: user.email,
                    position: req.body.position,
                    shelter: req.body.shelter,
                    cv: req.body.cv,
                    status: "pending",
                    date: formatDate(req.body.date),
                    time: req.body.time
                });
                json = JSON.stringify(obj);
                fs.writeFile('./data/interviews.json', json, 'utf8', (err) => {
                    if (!err) {
                      console.log('Interview added to the database');
                    }
                });
            }
        });
        // Update the times of that position
        fs.readFile('./data/interviewsPerDay.json', 'utf8', function readFileCallback(err, data) {
            if(err) {
                console.log("ERROR READING FILE: " + err);
            } else {
                obj = JSON.parse(data);
                var found = false;
                // update the bookedTimes if there was already a booking for that position that day
                for (var i = 0; i < obj.length; i++) {
                    if (obj[i].position === req.body.position && obj[i].shelter === req.body.shelter && obj[i].date === req.body.date) {
                        obj[i].bookedTimes.push(req.body.time);
                        found = true;
                        break;
                    }
                }
                if(!found) {
                    var newBookedTimes = [];
                    newBookedTimes.push(req.body.time);
                    // add the new booking to the database
                    obj.push({
                        position: req.body.position,
                        shelter: req.body.shelter,
                        date: req.body.date,
                        bookedTimes:newBookedTimes
                    });
                }
                json = JSON.stringify(obj);
                fs.writeFile('./data/interviewsPerDay.json', json, 'utf8', (err) => {
                    if (!err) {
                      console.log('Times of the interview updated');
                      res.status(204).send();
                    }
                });
            }
        });        
    })  
})

function formatDate(date) {
    arr = date.split('/');
    var month = '';
    switch(arr[0]) {
        case "01":
            month = "January"
            break;
        case "02":
            month = "February"
            break;
        case "03":
            month = "March"
            break;
        case "04":
            month = "April"
            break;
        case "05":
            month = "May"
            break;
        case "06":
            month = "June"
            break;
        case "07":
            month = "July"
            break;
        case "08":
            month = "August"
            break;
        case "09":
            month = "September"
            break;
        case "10":
            month = "October"
            break;
        case "11":
            month = "November"
            break;
        case "12":
            month = "December"
            break;
    }
    return arr[1] + " " + month + " " + arr[2]
}

module.exports = router;