const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser')

app.use(cors())
app.use(morgan('tiny'))
app.use(bodyParser.json())

const PORT = 3000;

app.listen(PORT, () => console.log('App listening at http://localhost:' + PORT)) 