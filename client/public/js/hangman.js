$(function () {
  document.getElementById('gameMusic').play();
  animalRequest();
  setTotalScore();
  this.punteggioPartita = 100;
  $('#hangmanCurrentScore').text(punteggioPartita);


});

// mostra il punteggio totale dell'utente
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
var tentativi = 0;
var punteggioPartita = 100;
var guessWord;
var difficult = false;
var blurPhoto = 10;
var usedWord = new Set();
var guessedWord = new Set();
var isTextNode = (_, el) => el.nodeType === Node.TEXT_NODE;
var musicIsOn = true;

function clearVariable() {
  this.tentativi = 0;
  this.punteggioPartita = 100;
  $('#letter').val("");
  $('#hangmanCurrentScore').text(punteggioPartita);
  this.guessWord = "";
  this.blurPhoto = 10;
  this.usedWord.clear();
  this.guessedWord.clear();
  $('.www').remove();
  for (let i = 0; i < word.length; i++) {
    $('#w' + i).remove();
  }
}

window.onclick = function (event) {
  var modalResult = document.getElementById('divResult');
  var modalRules = document.getElementById('rulesPopUp');
  if (event.target == modalResult) {
    $('#containerResutl').removeClass("winner");
    $('#containerResutl').removeClass("lost");
    modalResult.style.display = "none";
  } else if (event.target == modalRules) {
    modalRules.style.display = "none";
  }
}

$('#btnRules').on("click", function () {
  if ($('#rulesPopUp').is(":visible")) {
    $('#rulesPopUp').hide();
  } else {
    $('#rulesPopUp').show();
  }

});

$('#closeRules').on("click", function () {
  if ($('#rulesPopUp').is(":visible")) {
    $('#rulesPopUp').hide();
  } else {
    $('#rulesPopUp').show();
  }
});
$('#play').on("click",function (){
      document.getElementById('gameMusic').play();
});
$('#mute').on("click",function (){
    document.getElementById('gameMusic').pause();
});

$('#closeMessagge').on("click", function () {
  if ($('#divResult').is(":visible")) {
    $('#containerResutl').removeClass("winner");
    $('#containerResutl').removeClass("lost");
    $('#divResult').hide();
  } else {
    $('#divResult').show();
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
  }
  $('#animalPhoto').css("filter", "blur(" + 10 + "px)")
  clearVariable();
  animalRequest();
  changeImgHangMan();
}

function guess() {
  let userInput = $('#letter').val().toLowerCase();
  if (userInput.length === 0) return;
   // Se inserisce una lettera
  if (userInput.length === 1) {
    if (guessWord.includes(userInput)) {
      if (guessedWord.has(userInput)) {
        $('#divResult').show();
        $('#textResult').text("You have already guessed the letter: " + userInput)
        tentativi++;
        punteggioPartita = punteggioPartita - 10;
        $('#hangmanCurrentScore').text(punteggioPartita);
        $('#letter').val("");
        changeImgHangMan();
      } else {
        $('#hangmanCurrentScore').text(punteggioPartita);
      }
      guessedWord.add(userInput);
      //aggiunge la lettera indovinata alla parola
      for (let j = 0; j < guessWord.length; j++) {
        if (guessWord[j] == userInput) {
          $('#w' + j).text(userInput);
        }
      }
    } else {
      // Quando la parola inserita non è indovinata
      writeWordInsert(userInput);
      usedWord.add(userInput);
      tentativi++;
        
      punteggioPartita = punteggioPartita - 10;
      $('#hangmanCurrentScore').text(punteggioPartita);
      $('#letter').val("");
      changeImgHangMan();
    }
    $('#letter').val("");
  }else {
    // Se inserisce la parola
    if (guessWord == userInput) {
      $('#containerResutl').addClass("winner");
      $('#divResult').show();
      $('#textResult').text("Congratulations, you won!");
      document.getElementById('winnerSound').play();
      restart(true);
      return;
    } else {
      $('#divResult').show();
      $('#textResult').text("Try again and you will be luckier")
      $('#letter').val("");
      punteggioPartita = punteggioPartita - 10;
      $('#hangmanCurrentScore').text(punteggioPartita);
    }
  }
    // Controllo se ha vinto
    let count = 0;
    for (let k = 0; k < $('#wordToGuess').text().length; k++) {
      if ($('#wordToGuess').text().charAt(k) != "+" && $('#wordToGuess').text().charAt(k) != "-") {
        count++;
      }
    }
    if (count === $('#wordToGuess').text().length) {
      $('#containerResutl').addClass("winner");
      $('#divResult').show();
      $('#textResult').text("Congratulations, you won!");
      document.getElementById('winnerSound').play();
      restart(true);
      return;
    }

  if (tentativi >= 10) {
    $('#containerResutl').addClass("lost");
    $('#divResult').show();
    $('#textResult').text("Game over! The word was: " + guessWord);
    document.getElementById('gameoverSound').play();
    restart(false);
    return;
  } 
  blurPhoto = blurPhoto - 1;
  $('#animalPhoto').css("filter", "blur(" + blurPhoto + "px)")
}

// aggiorna il punteggio totale a fine partita
function saveResult() {
  var newPunteggio = this.punteggioPartita + this.punteggioUtente;
  punteggioUtente = newPunteggio;
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
    }).then(function () {
      $('#hangmanScore').text(punteggioUtente);
    })
      .catch(err => $("#serverErrorHangman").html("Sorry, something went wrong (" + err.status + ")"));
  }
}

function writeWordInsert(insertWord) {
  if (usedWord.has(insertWord)) {
    $('#divResult').show();
    $('#textResult').text("You have already inserted the letter: " + insertWord);
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
