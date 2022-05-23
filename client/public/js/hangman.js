
var punteggioUtente = 0; 

if (localStorage.getItem('token') != null) {
  $.ajax({
    url: 'http://localhost:3000/hangmanScore',
    type: 'get',
    data: {
      email: localStorage.getItem('email')
    }
  }).then(res=>{
       punteggioUtente =  res.score
  })

}
var tentativi = 0; 
var punteggioPartita = 100;
var guessWord;
var error = true; 
var blurPhoto = 10;
var usedWord = new Set();
var guessedWord = new Set();
let isTextNode = (_, el) => el.nodeType === Node.TEXT_NODE;

window.onload = animalRequest();

function clearVariable(){
  tentativi = 0;
  guessWord = "";
  error = true; 
  blurPhoto = 10;
  usedWord.clear();
  guessedWord.clear();
  $('.www').remove()
}

$('#btnRules').on("click",function () {
  if($('#rulesPopUp').is(":visible")){
    $('#rulesPopUp').hide(); 
  }else{
    $('#rulesPopUp').show();
  }
  
});
$('#closeResult').on("click", function(){
  $('#divResult').contents().filter(isTextNode).remove();
  $('#divResult').hide();
});

$('#closeRules').on("click",function () {
  if($('#rulesPopUp').is(":visible")){
    $('#rulesPopUp').hide(); 
  }else{
    $('#rulesPopUp').show();
  }
});


 function animalRequest() {

    clearVariable();
    $.ajax({
      type: 'GET',
      url: 'https://zoo-animal-api.herokuapp.com/animals/rand/'
    }).then(animaleJSON => {
      getWordToGuess(animaleJSON);
    });
  }

function hideWord(word){

  console.log("hide " + word)
  for(let i =0; i < word.length; i++){
    if(word[i] == 'a' || word[i] == 'e' || word[i] == 'i' || word[i] == 'o' || word[i] == 'u' ){
      $('#w'+i).text("+")
    }else{
      $('#w'+i).text("-")
    }
   // $('#w'+i).css("display","none")
  }
}


 function getWordToGuess(animalJSON){

    var name = animalJSON["name"]; 
    let wordToGuess = name.split(' ').slice(-1); 
    word = wordToGuess[wordToGuess.length - 1].toLowerCase();
    guessWord = word;
    for(let i =0; i < word.length; i++){
      $('#wordToGuess').append("<span class=ww id=w"+i+">"+ word.charAt(i) + "</span>"); 
    }
    hideWord(guessWord);
   
    $("#animalPhoto").attr("src",animalJSON["image_link"]);
    
 }

 function clearWord(word){
  for(let i =0; i < word.length; i++){
      $('#w'+i).remove();
  }
 }
 function guess(){

     if(tentativi > 9){
      $('#divResult').show();
       $('#textResult').text("YOU ARE A LOSER!");
         
         clearWord(guessWord);
         animalRequest();
         clearVariable();
         $('#letter').val("");
         $('#animalPhoto').css("filter","blur("+blurPhoto+"px)")
         changeImgHangMan();
         saveResult(punteggioPartita);
         return;
     }else{

      //chechk  only the first letter insered by user
      error = true;
      let userInput = $('#letter').val().toLowerCase();

      if(userInput.length > 1 ){
        if(guessWord == userInput){
          $('#divResult').show();
            $('#textResult').text("WINNER!");
            $('#letter').val("");
            punteggioPartita = punteggioPartita + 100;
            $('#hangmanCurrentScore').text(punteggioPartita);
            clearWord(guessWord);
            clearVariable();
            $('#animalPhoto').css("filter","blur("+blurPhoto+"px)")
            changeImgHangMan();
            animalRequest();
            saveResult(punteggioPartita);
            return;
           }else{
            $('#divResult').show();
            $('#textResult').text("try again and you will be luckier")
             $('#letter').val("");
             punteggioPartita = punteggioPartita - 10;
             $('#hangmanCurrentScore').text(punteggioPartita);

           }
      }else if(userInput.length == 1){

          if(guessWord.includes(userInput)){
            if(guessedWord.has(userInput)){
              $('#divResult').show();
              $('#textResult').text("You have just guess the letter: " + userInput)
              tentativi++; 
              punteggioPartita = punteggioPartita - 10;
              $('#hangmanCurrentScore').text(punteggioPartita);
              $('#letter').val("");
              changeImgHangMan();
            }else{
              $('#hangmanCurrentScore').text(punteggioPartita);
              blurPhoto = blurPhoto - 2;
              $('#animalPhoto').css("filter","blur("+blurPhoto+"px)")
              error = false;

            }
            
            if(guessedWord.has(userInput)){
              $('#divResult').show();
              $('#textResult').text("You have just guessed this word " + userInput)

            }else{
              guessedWord.add(userInput)
            }
            
            for (let j = 0; j < guessWord.length; j++) {
                if (guessWord[j] == userInput) {
                  $('#w' + j).text(userInput);
              }
            }
          }else{
            writeWordInsert(userInput);
            usedWord.add(userInput);
            tentativi++; 
            punteggioPartita = punteggioPartita - 5;
            $('#hangmanCurrentScore').text(punteggioPartita);
            $('#letter').val("");
            changeImgHangMan();
          }
      $('#letter').val("");  
      }
         
      
      //check user win
        let count = 0;
        for ( let k = 0; k < $('#wordToGuess').text().length; k++){
          if($('#wordToGuess').text().charAt(k) != "+" && $('#wordToGuess').text().charAt(k) != "-"){
            count++; 
          }
        }
        
        if(count === $('#wordToGuess').text().length){
          $('#divResult').show();
          $('#textResult').text("WINNER!")
          $('#hangmanCurrentScore').text(punteggioPartita);
          clearWord(guessWord);
          clearVariable();
          $('#animalPhoto').css("filter","blur("+blurPhoto+"px)")
          changeImgHangMan();
          animalRequest();
          saveResult(punteggioPartita);
          return;
        }

     }

     
   }



   function saveResult(punteggio){

    punteggio = punteggio + punteggioUtente;
    if (localStorage.getItem('token') != null) {
      $.ajax({
        url: 'http://localhost:3000/hangman',
        type: 'post',
        data: {
            email: localStorage.getItem('email'),
            scoreUser: punteggio 
        },
        headers: {
            token: localStorage.getItem('token')
        },
    });

    }
    

  }
    



   function writeWordInsert(insertWord){

     if(usedWord.has(insertWord)){
      $('#divResult').show();
      $('#textResult').text("You have just insered the letter:" + insertWord);
      //punteggio = punteggio - 5;
     }else{
      $('#usedLetters').append("<span class=www>"+ insertWord + "</span>"); 
       
     }
     
    
   }

 function changeImgHangMan(){
   if(tentativi>9){
    $("#imgHangman").attr("src","/images/hangman/facile"+9+".png");
   }else{
    $("#imgHangman").attr("src","/images/hangman/facile"+tentativi+".png");
   }
   
 }
