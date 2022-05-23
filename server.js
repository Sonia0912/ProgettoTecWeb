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

app.use(express.static("img"));
app.use(express.json());

app.use(bodyParser.json({ limit: '50MB', type: 'application/json' }));
app.use(bodyParser.urlencoded({ limit: '50MB', extended: true, type: 'application/x-www-form-urlencoded' }));

app.use(require('./routes/authenticationroute'));
app.use(require('./routes/quizroute'));
app.use(require('./routes/hangmanroute'));
app.use(require('./routes/profileroute'));
app.use(require('./routes/dashboardroute'));
app.use(require('./routes/adoptionroute'));
app.use(require('./routes/eventsroute'));
app.use(require('./routes/adminroute'));
app.use(require('./routes/volunteeringroute'));

const PORT = 3000;

app.listen(PORT, () => console.log('App listening at http://localhost:' + PORT)) 