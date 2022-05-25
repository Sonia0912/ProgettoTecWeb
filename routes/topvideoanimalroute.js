var express = require('express');
var router = express.Router();
const fs = require('fs');

// router.get('/topvideoanimal', function(req, res) {
//     $.ajax({
//         type: 'GET',
//         url: 'https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults='+req.maxResults+'&regionCode='+req.region+'&videoCategoryId=15&alt=json&key=AIzaSyAC8x_AdVk02SwbCbFp5eLEQJ1OBg78AQE'
//     })
//     .then(animal => {
//         console.log(res.animal.items[0].id)
//             return res.status(200).json({
//                 title: 'top10video',
//                 video: {
//                     id: animal.items[0].id,
//                     like: animal.statistics.likeCount
//                 }
//             })
       
//     });
// });