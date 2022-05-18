if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
const fs = require('fs')
const jwt = require('jsonwebtoken')

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

app.use(require('./routes/quizroute'));
app.use(require('./routes/hangmanroute'));
app.use(require('./routes/profileroute'));
app.use(require('./routes/dashboardroute'));
app.use(require('./routes/adoptionroute'));
app.use(require('./routes/eventsroute'));

app.post('/login', (req, res, next) => {
    var contents = fs.readFileSync('./data/users.json', 'utf8');
    obj = JSON.parse(contents);
    var user = obj.users.find(user => user.email === req.body.email);
    if(!user) {
        return res.status(401).json({
            title: "user not found",
            error: "No user was found with that e-mail"
        })
    }
    if(!bcrypt.compareSync(req.body.password, user.password)) {
        return res.status(401).json({
            title: "login failed",
            error: "The password is incorrect"
        })
    }
    var token = jwt.sign({ userId: user.id }, process.env.SESSION_SECRET);
    return res.status(200).json({
        title: "login success",
        token: token
    })
})

app.post('/register', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)

        fs.readFile('./data/users.json', 'utf8', function readFileCallback(err, data) {
            if(err) {
                console.log("ERROR READING FILE: " + err);
            } else {
                obj = JSON.parse(data);
                obj.users.push({
                    id: Date.now().toString(),
                    name: req.body.name,
                    surname: req.body.surname,
                    email: req.body.email,
                    password: hashedPassword,
                    quizScore: 0,
                    hangmanScore: 0
                });
                json = JSON.stringify(obj);
                fs.writeFile('./data/users.json', json, 'utf8', (err) => {
                    if (!err) {
                      console.log('User added to the database');
                    }
                });
            }
        });
    } catch (e) {
        console.log("ERROR " + e)
        res.redirect('/')
    }
})

const PORT = 3000;

app.listen(PORT, () => console.log('App listening at http://localhost:' + PORT)) 