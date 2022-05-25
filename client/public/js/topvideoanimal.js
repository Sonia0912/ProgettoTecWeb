


// function getVideoOfDay(){
//     var region = "ES"
//     var maxResults = 10

//     $.ajax({
//         type: 'GET',
//         url: 'https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults='+maxResults+'&regionCode='+region+'&videoCategoryId=15&alt=json&key=AIzaSyAC8x_AdVk02SwbCbFp5eLEQJ1OBg78AQE'
//     })
//     .then(animal => {
//         console.log(animal.items[0].id)
//             $('#videoPet').attr("src","https://www.youtube.com/embed/"+animal.items[0].id );
//             console.log(animal.items)
//             $('#descroptionVideo').text( animal.statistics.likeCount);
        
       
//     });
// }