getFunnyDog();
getFunnyCat();

$("#anotherFundog").on("click", function(){
    getFunnyDog();
})

$("#anotherFuncat").on("click", function(){
    getFunnyCat();
})
// $('#anotherVideo').on("click",function(){
//     getVideoOfDay();
// })

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

