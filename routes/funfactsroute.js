var express = require('express');
var router = express.Router();
const axios = require('axios');

router.get('/getFactsOf/:type', function(req, res) {
    axios.get('https://cat-fact.herokuapp.com/facts/random?animal_type='+req.params.type+'&amount=10') 
    .then(resp => {
        res.json(resp.data)})
    .catch(err => console.log("ERROR: " + err.message))
})

router.get('/moreFacts/:type', function(req, res) {
    console.log("sono qui " + req.params.type)
    axios.get('https://cat-fact.herokuapp.com/facts/random?animal_type='+req.params.type+'&amount=10') 
    .then(resp => {
        res.json(resp.data)})
    .catch(err => console.log("ERROR: " + err.message))
})

module.exports = router;
