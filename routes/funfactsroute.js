var express = require('express');
var router = express.Router();
const axios = require('axios');

router.get('/getFactsOf/:type', function(req, res) {
    axios.get('https://cat-fact.herokuapp.com/facts/random?animal_type='+req.params.type+'&amount=5') 
    .then(resp => {
        var facts = resp.data.map(function(i){
            return i.text;
        })
        res.json(facts)})
    .catch(err => console.log("ERROR: " + err.message))
})

module.exports = router;
