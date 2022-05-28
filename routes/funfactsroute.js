var express = require('express');
var router = express.Router();
const axios = require('axios');

router.get('/getFactsDog', function(req, res) {
    
    axios.get('https://cat-fact.herokuapp.com/facts/random?animal_type=dog&amount=10') 
    .then(resp => {
        res.json(resp.data)})
    .catch(err => console.log("ERROR: " + err))
})

module.exports = router;
