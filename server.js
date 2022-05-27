if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser')

app.use(cors())
app.use(morgan('tiny'))

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))

app.locals.siteTitle = 'AnimalHouse';
app.locals.userAuthenticated = false;

app.use(express.static("public"));
app.use(express.json());

app.use(bodyParser.json({ limit: '50MB', type: 'application/json' }));
app.use(bodyParser.urlencoded({ limit: '50MB', extended: true, type: 'application/x-www-form-urlencoded' }));

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    if ('OPTIONS' === req.method) {
      res.send(200);
    }
    else {
      next();
    }
});

app.options("/*", function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    res.send(200);
});

app.use(require('./routes/authenticationroute'));
app.use(require('./routes/quizroute'));
app.use(require('./routes/hangmanroute'));
app.use(require('./routes/profileroute'));
app.use(require('./routes/dashboardroute'));
app.use(require('./routes/adoptionroute'));
app.use(require('./routes/eventsroute'));
app.use(require('./routes/adminroute'));
app.use(require('./routes/volunteeringroute'));
app.use(require('./routes/leaderboardroute'));
app.use(require('./routes/memeroute'));

const PORT = 3000;

app.listen(PORT, () => console.log('App listening at http://localhost:' + PORT)) 