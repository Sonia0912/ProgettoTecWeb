var express = require('express');
var router = express.Router();
const axios = require('axios');
const FormData = require('form-data');

router.post('/memegenerator', function(req, res) {
    console.log(req.body)
    const formData = new FormData();
    formData.append('topText', req.body.topText);
    formData.append('bottomText', req.body.bottomText);
    formData.append('imgUrl', req.body.pic);

    axios.post('https://memebuild.com/api/1.0/generateMeme', formData, {
        headers: {
            'API-KEY': '2ee147ca1760264cb0a666d3ec40e5'
        }
    })
    .then(resp => res.json(resp.data))
    .catch(err => console.log("ERROR: " + err))
})

module.exports = router;