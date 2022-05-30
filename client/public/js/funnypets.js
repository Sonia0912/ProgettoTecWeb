getFunnyDog();
getFunnyCat();

$("#anotherFundog").on("click", function () {
    getFunnyDog();
})
$("#anotherFuncat").on("click", function () {
    getFunnyCat();
})

function getFunnyDog() {
    $.ajax({
        type: 'GET',
        url: 'https://dog.ceo/api/breeds/image/random'
    })
        .then(animal => {
            $('#fundog').attr("src", animal["message"]);
        })
        .catch(err => {
            $("#serverErrorDogs").html("Sorry, something went wrong (" + err.status + ")");
        })
}

function getFunnyCat() {
    $.ajax({
        type: 'GET',
        url: 'https://api.thecatapi.com/v1/images/search'
    })
        .then(animal => {
            $('#funcat').attr("src", animal[0]["url"]);
        })
        .catch(err => {
            $("#serverErrorCats").html("Sorry, something went wrong (" + err.status + ")");
        })
}
