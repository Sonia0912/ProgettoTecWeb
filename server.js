if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')
const fs = require('fs')

app.use(cors())
app.use(morgan('tiny'))


const initializePassport = require('./routes/utils/passport-config')
initializePassport(
    passport,
    email => {
        var contents = fs.readFileSync('./data/users.json', 'utf8');
        obj = JSON.parse(contents);
        return obj.users.find(user => user.email === email);
    },
    id => {
        var contents = fs.readFileSync('./data/users.json', 'utf8');
        obj = JSON.parse(contents);
        return obj.users.find(user => user.id === id);
    }
)

const { checkAuthenticated, checkNotAuthenticated, changeAuth } = require('./routes/utils/auth');

var obj = {
    users: []
};

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))

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

/* app.get('/login', checkNotAuthenticated, (req, res) =>  {
    res.render('login', {
        pageTitle: 'Login',
        pageID: 'login'
    });
}); */

/* app.get('/register', checkNotAuthenticated, (req, res) =>  {
    res.render('register', {
        pageTitle: 'Register',
        pageID: 'register'
    });
}); */

app.post('/login', checkNotAuthenticated, changeAuth, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}))

app.post('/register', checkNotAuthenticated, async (req, res) => {
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
   
        res.redirect('/login')
    } catch (e) {
        console.log("ERROR " + e)
        res.redirect('/')
    }
})

app.delete('/logout', changeAuth, (req, res) => {
    req.logOut()
    res.redirect('/login')
})

// Pagina di default per indirizzi non esistenti
/* app.get("*", function (req, res) {
    res.render("error", {
        pageTitle: 'Error',
        pageID: 'error'
    });   
});
 */

const PORT = 3000;

app.listen(PORT, () => console.log('App listening at http://localhost:' + PORT)) 