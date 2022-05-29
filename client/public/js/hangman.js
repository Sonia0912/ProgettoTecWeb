
$(function() {
  animalRequest();
  setTotalScore();
  this.punteggioPartita = 100;
  $('#hangmanCurrentScore').text(punteggioPartita);

});


function setTotalScore() {
  if (localStorage.getItem('token') != null) {
    $.ajax({
      url: 'http://localhost:3000/hangmanScore',
      type: 'get',
      data: {
        email: localStorage.getItem('email')
      }
    }).then(res => {
      punteggioUtente = res.score;
      $('#hangmanScore').text(res.score);
    })


  }
}

var punteggioUtente = 0;
var tentativi = 1;
var punteggioPartita = 100;
var guessWord;
var error = true;
var difficult = false;
var blurPhoto = 10;
var usedWord = new Set();
var guessedWord = new Set();
var isTextNode = (_, el) => el.nodeType === Node.TEXT_NODE;



function clearVariable() {

  this.tentativi = 0;
  this.punteggioPartita = 100;
  $('#letter').val("");
  $('#hangmanCurrentScore').text(punteggioPartita);
  this.guessWord = "";
  this.error = true;
  this.blurPhoto = 10;
  this.usedWord.clear();
  this.guessedWord.clear();
  $('.www').remove()

}

function setDifficulty() {
  if ($('#difficulty').val() === 'difficult') {
    this.difficult = true;
    clearVariable();
    animalRequest()
  }
}

window.onclick = function (event) {
  var modal = document.getElementById('divResult');
  if (event.target == modal) {
    modal.style.display = "none";
    $('#divResult').removeClass("winner");
    $('#divResult').removeClass("lost");
  }
}

$('#btnRules').on("click", function () {
  if ($('#rulesPopUp').is(":visible")) {
    $('#rulesPopUp').hide();
  } else {
    $('#rulesPopUp').show();
  }

});
$('#closeResult').on("click", function () {
  $('#divResult').contents().filter(isTextNode).remove();
  $('#divResult').hide();
  $('#divResult').removeClass("winner");
  $('#divResult').removeClass("lost");
});

$('#closeRules').on("click", function () {
  if ($('#rulesPopUp').is(":visible")) {
    $('#rulesPopUp').hide();
  } else {
    $('#rulesPopUp').show();
  }
});


function animalRequest() {

  $.ajax({
    type: 'GET',
    url: 'https://zoo-animal-api.herokuapp.com/animals/rand/'
  }).then(animaleJSON => {
    getWordToGuess(animaleJSON);
  });
}

function hideWord(word) {
  console.log("Word to guess: " + word)
  for (let i = 0; i < word.length; i++) {
    if (word[i] == 'a' || word[i] == 'e' || word[i] == 'i' || word[i] == 'o' || word[i] == 'u') {
      $('#w' + i).text("+")
    } else {
      $('#w' + i).text("-")
    }
  }
}


function getWordToGuess(animalJSON) {

  var name = animalJSON["name"];
  let wordToGuess = name.split(' ').slice(-1);
  word = wordToGuess[wordToGuess.length - 1].toLowerCase();
  guessWord = word;
  $('#wordToGuess').empty();
  for (let i = 0; i < word.length; i++) {
    $('#wordToGuess').append("<span class=ww id=w" + i + ">" + word.charAt(i) + "</span>");
  }
  hideWord(guessWord);

  $("#animalPhoto").attr("src", animalJSON["image_link"]);


}

function restart(win) {

  if (win) {
    saveResult();
    setTotalScore();
   
  }
  $('#animalPhoto').css("filter", "blur(" + 10 + "px)")
 
  clearWord(guessWord);
  clearVariable();
  animalRequest();
  changeImgHangMan();

}

function clearWord(word) {
  for (let i = 0; i < word.length; i++) {
    $('#w' + i).remove();
  }
}

function guess() {

  if (tentativi >= 9) {
    $('#divResult').addClass("lost");
    $('#divResult').show();
    $('#textResult').text("YOU ARE A LOSER! The word was: " + guessWord);
    restart(false);
    return;
  } else {

    //chechk  only the first letter insered by user
    error = true;
    let userInput = $('#letter').val().toLowerCase();

    if (userInput.length > 1) {
      if (guessWord == userInput) {
        $('#divResult').addClass("winner");
        $('#divResult').show();
        $('#textResult').text("CONGRATULATION, YOU ARE WINNER!");
        restart(true);
        return;
      } else {
        $('#divResult').show();
        $('#textResult').text("Try again and you will be luckier")
        $('#letter').val("");
        punteggioPartita = punteggioPartita - 10;
        $('#hangmanCurrentScore').text(punteggioPartita);

      }
    } else if (userInput.length == 1) {

      if (guessWord.includes(userInput)) {
        if (guessedWord.has(userInput)) {
          $('#divResult').show();
          $('#textResult').text("You have just guess the letter: " + userInput)
          tentativi++;
          punteggioPartita = punteggioPartita - 10;
          
          $('#hangmanCurrentScore').text(punteggioPartita);
          $('#letter').val("");
          changeImgHangMan();
        } else {
          $('#hangmanCurrentScore').text(punteggioPartita);
          error = false;
        }

        //DUPLICATI?
        guessedWord.add(userInput);

        // if (guessedWord.has(userInput)) {
        //   $('#divResult').show();
        //   $('#textResult').text("You have just guessed this word " + userInput);
        // } else {
          
        // }

        //aggiunge la lettera indovinata alla parola
        for (let j = 0; j < guessWord.length; j++) {
          if (guessWord[j] == userInput) {
            $('#w' + j).text(userInput);
          }
        }
      } else {
        //WHEN THE LETTER INSERTED IS NOT GUESSED
        writeWordInsert(userInput);
        usedWord.add(userInput);
        tentativi++;
        punteggioPartita = punteggioPartita - 10;
        $('#hangmanCurrentScore').text(punteggioPartita);
        $('#letter').val("");
        changeImgHangMan();
      }
      $('#letter').val("");
    }


    //check user win
    let count = 0;
    for (let k = 0; k < $('#wordToGuess').text().length; k++) {
      if ($('#wordToGuess').text().charAt(k) != "+" && $('#wordToGuess').text().charAt(k) != "-") {
        count++;
      }
    }

    if (count === $('#wordToGuess').text().length) {
      $('#divResult').addClass("winner");
      $('#divResult').show();
      $('#textResult').text("CONGRATULATION, YOU ARE WINNER!");
      restart(true);
      return;
    }

  }
  blurPhoto = blurPhoto - 1;
  $('#animalPhoto').css("filter", "blur(" + blurPhoto + "px)")
}



function saveResult() {
    var newPunteggio = this.punteggioPartita + this.punteggioUtente;
  if (localStorage.getItem('token') != null) {
    $.ajax({
      url: 'http://localhost:3000/hangman',
      type: 'post',
      data: {
        email: localStorage.getItem('email'),
        scoreUser: newPunteggio
      },
      headers: {
        token: localStorage.getItem('token')
      },
    }).then(function(res){
      this.punteggioUtente = res.score
      $('#hangmanScore').text(this.punteggioUtente);
    });
      
  }

}

function writeWordInsert(insertWord) {
  if (usedWord.has(insertWord)) {
    $('#divResult').show();
    $('#textResult').text("You have already inserted the letter: " + insertWord);
    //punteggio = punteggio - 5;
  } else {
    $('#usedLetters').append("<span class=www>" + insertWord + "</span>");
  }
}

function changeImgHangMan() {
  if (tentativi > 9) {
    $("#imgHangman").attr("src", "/images/hangman/facile" + 9 + ".png");
  } else {
    $("#imgHangman").attr("src", "/images/hangman/facile" + tentativi + ".png");
  }
}
