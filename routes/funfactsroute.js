var express = require('express');
var router = express.Router();
const axios = require('axios');

router.get('/getFactsOf/:type', function(req, res) {
    // Fish facts
    if(req.params.type === "fish") {
        axios.get('https://www.fishwatch.gov/api/species')
        .then(resp => {
            var facts = resp.data.map(function(i){
                return i.Habitat;
            })
            const shuffled = [...facts].sort(() => 0.5 - Math.random());
            var randomFacts =  shuffled.slice(0, 5);
            res.json(randomFacts)
        })
        .catch(err => console.log("ERROR: " + err.message))
    }
    // Endangered facts
    // API -> https://rapidapi.com/luisvilla/api/animals-endangered-environmentalism
    else if(req.params.type === "endangered") {
        const options = {
            method: 'GET',
            url: 'https://animals-endangered-environmentalism.p.rapidapi.com/taxonomy/class',
            params: {q: 'reptilia'},
            headers: {
              'X-RapidAPI-Host': 'animals-endangered-environmentalism.p.rapidapi.com',
              'X-RapidAPI-Key': '6d672cb995msh847ec9be56fb43ap1cee5bjsnf91df645befa'
            }
          };
          axios.request(options).then(function (response) {
            const shuffled = [...response.data].sort(() => 0.7 - Math.random());
            var randomFacts =  shuffled.slice(0, 5);
            var infos = [];
            for(let i = 0; i < 5; i++) {
                var info = "SPECIES: " + randomFacts[i].commonName + ". THREATS: " + randomFacts[i].data.threats.details.threats
                infos.push(info)
            }
            res.json(infos)
          }).catch(function (error) {
              console.error(error);
          });
    }
    // Bird facts
    else {
        const options = {
            method: 'GET',
            url: 'https://animals-endangered-environmentalism.p.rapidapi.com/taxonomy/class',
            params: {q: 'aves'},
            headers: {
              'X-RapidAPI-Host': 'animals-endangered-environmentalism.p.rapidapi.com',
              'X-RapidAPI-Key': '6d672cb995msh847ec9be56fb43ap1cee5bjsnf91df645befa'
            }
          };
          axios.request(options).then(function (response) {
            const shuffled = [...response.data].sort(() => 0.7 - Math.random());
            var randomFacts =  shuffled.slice(0, 5);
            var infos = [];
            for(let i = 0; i < 5; i++) {
                var info = "SPECIES: " + randomFacts[i].commonName + ". POPULATION: " + randomFacts[i].data.textSummary.details.populationInformation
                infos.push(info)
            }
            res.json(infos)
          }).catch(function (error) {
              console.error(error);
          });
    }
})

module.exports = router;
