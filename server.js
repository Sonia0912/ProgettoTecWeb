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

app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: false }));

app.use(require('./routes/authenticationroute'));
app.use(require('./routes/quizroute'));
app.use(require('./routes/hangmanroute'));
app.use(require('./routes/profileroute'));
app.use(require('./routes/dashboardroute'));
app.use(require('./routes/adoptionroute'));
app.use(require('./routes/eventsroute'));
app.use(require('./routes/adminroute'));

app.post('/profile',async (req, res) => {
    fs.readFile('./data/users.json', 'utf8', function readFileCallback(err, data) {
        if(err) {
            console.log("ERROR READING FILE: " + err);
        } else {
            obj = JSON.parse(data);
            for (var i = 0; i < obj.users.length; i++) {
                if (obj.users[i].email === req.body.email) {
                    obj.users[i].name = req.body.name
                    obj.users[i].surname = req.body.surname
                    break;
                }
            }
            newJson = JSON.stringify(obj);
            fs.writeFile('./data/users.json', newJson, 'utf8', (err) => {
                if (!err) {
                  console.log('Info Profile Update');
                }
            });
        }
    });
})

const PORT = 3000;

app.listen(PORT, () => console.log('App listening at http://localhost:' + PORT)) 