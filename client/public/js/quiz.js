var questions = [
    "What's the latin name of the ",
    "What's the animal type of the ",
    "What's the active time of the ",
    "What's the minimum length of the ",
    "What's the maximum length of the ",
    "What's the minimum weight of the ",
    "What's the maximum weight of the ",
    "What's the lifespan of the ",
    "What's the habitat of the ",
    "What's the diet of the ",
    "What's the geographical range of the ",
];

animalOfQuestion = null;
scoreUpdated = false;

generateQuestion();

$("#answer0").on("click", function(){
    showResult(0);
});

$("#answer1").on("click", function(){
    showResult(1);
});

$("#answer2").on("click", function(){
    showResult(2);
});

$("#answer3").on("click", function(){
    showResult(3);
});

$("#answer4").on("click", function(){
    showResult(4);
});

$("#answer5").on("click", function(){
    showResult(5);
});

$("#nextQuestion").on("click", function(){
    generateQuestion();
})

$("#showPicLink").on("click", function() {
    $('#animalPicModal').show();
    $('#animalImg').attr("src", animalOfQuestion["image_link"]);
    $('#caption').html(animalOfQuestion["name"]);
})

$(".close").on("click", function() {
    $('#animalPicModal').hide();
})

function generateQuestion() {

    resetDefaultValues();

    $.ajax({
        type: 'GET',
        url: 'https://zoo-animal-api.herokuapp.com/animals/rand/4'
    })
    .then(animale => {

        animalOfQuestion = animale[0]

        questionIndex = Math.floor(Math.random() * 12);

        answerKey = getAnswerKey(questionIndex);
        
        if(questionIndex == 2) {
            correctAnswerIndex = animale[0]["active_time"] == "Diurnal" ? 0 : 1;
            setQuestion(animale, questionIndex);
            setAnswerButtonsActiveTime();
            manageButtons(2);
        } else if(questionIndex == 1) {
            correctAnswerIndex = findCorrectAnswerIndexAnimalType(animale);
            setQuestion(animale, questionIndex);
            setAnswerButtonsAnimalType();
            manageButtons(1);
        } else {
            correctAnswerIndex = Math.floor(Math.random() * 4);
            numOfDuplicateAnswers = checkDuplicateAnswers(animale, answerKey);
            if(numOfDuplicateAnswers == 0) {
                setQuestion(animale, questionIndex);
                setAnswerButtons(animale, questionIndex, correctAnswerIndex, answerKey);
                manageButtons(-1);
            } else {
                generateQuestion();
            }
        }  

    });
}

function resetDefaultValues() {
    $("#result").empty();
    $("#showPicDiv").hide();
    scoreUpdated = false;
    for(var i = 0; i < 6; i++) {
        $("#answer" + i).css("background", "white");
        $("#answer" + i).css("color", "#1b284d;");
    }
}

function manageButtons(questionIndex) {
    if(questionIndex == 2) {
        $("#answer2").hide();
        $("#answer3").hide();
        $("#answer4").hide();
        $("#answer5").hide();
    } else if(questionIndex == 1) {
        $("#answer2").show();
        $("#answer3").show();
        $("#answer4").show();
        $("#answer5").show();
    } else {
        $("#answer2").show();
        $("#answer3").show();
        $("#answer4").hide();
        $("#answer5").hide();
    }
}

function setQuestion(animale, questionIndex) {
    $("#question").html(questions[questionIndex] + animale[0]["name"] + "?")
}

function setAnswerButtonsActiveTime() {
    $("#answer0").html("Diurnal");
    $("#answer1").html("Nocturnal");
}

function setAnswerButtonsAnimalType() {
    $("#answer0").html("Mammal");
    $("#answer1").html("Bird");
    $("#answer2").html("Reptile");
    $("#answer3").html("Amphibian");
    $("#answer4").html("Fish");
    $("#answer5").html("Marsupial");
}

function findCorrectAnswerIndexAnimalType(animale) {
    switch(animale[0]["animal_type"]) {
        case "Mammal":
            return 0;
        case "Bird":
            return 1;
        case "Reptile":
            return 2;
        case "Amphibian":
            return 3;
        case "Fish":
            return 4;
        case "Marsupial":
            return 5;
    }
}

function setAnswerButtons(animale, questionIndex, correctAnswerIndex, answerKey) {
    unitMeasure = "";
    if(questionIndex == 3 || questionIndex == 4) {
        unitMeasure = " feet"
    } else if (questionIndex == 5 || questionIndex == 6) {
        unitMeasure = " pounds"
    } else if (questionIndex == 7) {
        unitMeasure = " years"
    }

    switch(correctAnswerIndex) {
        case 0:
            $("#answer0").html(animale[0][answerKey] + unitMeasure);
            $("#answer1").html(animale[1][answerKey] + unitMeasure);
            $("#answer2").html(animale[2][answerKey] + unitMeasure);
            $("#answer3").html(animale[3][answerKey] + unitMeasure);
            break;
        case 1:
            $("#answer1").html(animale[0][answerKey] + unitMeasure);
            $("#answer0").html(animale[1][answerKey] + unitMeasure);
            $("#answer2").html(animale[2][answerKey] + unitMeasure);
            $("#answer3").html(animale[3][answerKey] + unitMeasure);
            break;
        case 2:
            $("#answer2").html(animale[0][answerKey] + unitMeasure);
            $("#answer0").html(animale[1][answerKey] + unitMeasure);
            $("#answer1").html(animale[2][answerKey] + unitMeasure);
            $("#answer3").html(animale[3][answerKey] + unitMeasure);
            break;
        case 3:
            $("#answer3").html(animale[0][answerKey] + unitMeasure);
            $("#answer0").html(animale[1][answerKey] + unitMeasure);
            $("#answer2").html(animale[2][answerKey] + unitMeasure);
            $("#answer1").html(animale[3][answerKey] + unitMeasure);
            break;
    }
}

function checkDuplicateAnswers(animale, answerKey) {
    answers = [animale[0][answerKey], animale[1][answerKey], animale[2][answerKey], animale[3][answerKey]];
    answersSet = new Set(answers);
    return numOfDuplicateAnswers = answers.length - answersSet.size;
}

function showResult(buttonIndex) {
    if(buttonIndex == correctAnswerIndex) {
        $("#result").html("Correct!");
        $("#answer" + buttonIndex).css("background", "#20c997");
        $("#answer" + buttonIndex).css("color", "white");
        $("#answer" + buttonIndex).effect("highlight", {color: '#f6f5ae'});
        updateScore(true);
    } else {
        $("#result").html("Wrong!");
        $("#answer" + buttonIndex).css("background", "#dc3545");
        $("#answer" + buttonIndex).css("color", "white");
        $("#answer" + buttonIndex).effect("shake");
        updateScore(false);
    }
    $("#showPicDiv").show();
}

function updateScore(correctAnswer) {
    if(!scoreUpdated && correctAnswer && localStorage.getItem('token') != null) {
        var oldScore =  parseInt($("#quizScore").text());
        /* $("#quizScore").html(oldScore + 10); */
        $.ajax({
            url: 'http://localhost:3000/quiz/email/' + localStorage.email,
            type: 'PUT'
        })
        .then((res) => {
            console.log(res)
            $("#quizScore").html(res.score);
        })
        .catch((err) => $("#serverErrorQuiz").html("Sorry something went wrong (" + err.status + ")"));
    }
    scoreUpdated = true;
}

function getAnswerKey(index) {
    switch(index) {
        case 0:
            return "latin_name";
        case 1:
            return "animal_type";
        case 2:
            return "active_time";
        case 3:
            return "length_min";
        case 4:
            return "length_max";
        case 5:
            return "weight_min";
        case 6:
            return "weight_max";
        case 7:
            return "lifespan";
        case 8:
            return "habitat";
        case 9:
            return "diet";
        case 10:
            return "geo_range";
    }
}

var colors = ['#ffb991', '#ffd991', '#fff491', '#e3ff91', '#a2ff91', '#91ffbf', '#affaf1', '#abe0ff', '#b4bffa', '#ccb8ff', '#e6b1fc', '#fabee2', '#ff91b0'];
var currentIndex = 0;
setInterval(function () {
    $('#quizContainer').css({
        backgroundColor: colors[currentIndex]
    });
    if (!colors[currentIndex]) {
        currentIndex = 0;
    } else {
        currentIndex++;
    }
}, 3000);