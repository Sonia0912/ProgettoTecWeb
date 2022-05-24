getFunnyDog();
getFunnyCat();

$("#anotherFundog").on("click", function(){
    getFunnyDog();
})

$("#anotherFuncat").on("click", function(){
    getFunnyCat();
})
$('#anotherVideo').on("click",function(){
    getVideoOfDay();
})

function getFunnyDog() {
        $.ajax({
            type: 'GET',
            url: 'https://dog.ceo/api/breeds/image/random'
        })
        .then(animal => {
            $('#fundog').attr("src", animal["message"]);
        });
}

function getFunnyCat() {
    $.ajax({
        type: 'GET',
        url: 'https://api.thecatapi.com/v1/images/search'
    })
    .then(animal => {
        $('#funcat').attr("src", animal[0]["url"]);
    });
}

function getVideoOfDay(){
    var region = "IT"
    var maxResults = 3

    $.ajax({
        type: 'GET',
        url: 'https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults='+maxResults+'&regionCode='+region+'&videoCategoryId=15&alt=json&key=AIzaSyAC8x_AdVk02SwbCbFp5eLEQJ1OBg78AQE'
    })
    .then(animal => {
        console.log(animal.items[0].id)
        $('#videoPet').attr("src","https://www.youtube.com/embed/"+animal.items[0].id );
    });
}