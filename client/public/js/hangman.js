

// function utente(name){
//   if(name){
//     this.name = name; 
//     this.punteggio = 0; //getPunteggio da file
//     this.error = true; 
//     this.guessWord = ""; //getWord
//   }else{
//     this.name = "Utente"; 
//     this.punteggio = 0;
//     this.error = true; 
//     this.guessWord = ""; //getWord
//   }
// }


$('body').css("background-color","#4f788c");

var tentativi = 0; 
var punteggio = 100;
var guessWord;
let error = true; 
var blurPhoto = 10;
var usedWord = new Set();
var guessedWord = new Set();
//regole per il punteggio: 
// se indovina al primo tentativo sono 100 pti
// ogni lettera indovinare togli 5 punti
// ogni lettera sbagliata togli 10 punti

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
         alert("YOU ARE LOSER!"); 
         clearWord(guessWord);
         animalRequest();
        clearVariable();
         $('#animalPhoto').css("filter","blur("+blurPhoto+"px)")
         changeImgHangMan();
         return;
     }else{

      //chechk  only the first letter insered by user
      error = true
      let userInput = $('#letter').val().toLowerCase();

      if(userInput.length > 1 ){
        if(guessWord == userInput){
            alert("WINNER!");
            $('#letter').val("");
            punteggio = punteggio + 100;
            clearWord(guessWord);
            clearVariable();
            $('#animalPhoto').css("filter","blur("+blurPhoto+"px)")
            changeImgHangMan();
            animalRequest();
            $('#score').text(punteggio)
            return;
           }
      }else if(userInput.length == 1){
          console.log(userInput)

          if(guessWord.includes(userInput)){
            $('#score').text(punteggio)
            blurPhoto = blurPhoto - 2;
            $('#animalPhoto').css("filter","blur("+blurPhoto+"px)")
            error = false;
            if(guessedWord.has(userInput)){
              alert("Hia già indovinato la lettera: " + userInput)
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
            punteggio = punteggio - 10;
            $('#score').text(punteggio)
            $('#letter').val("");
            changeImgHangMan();
          }
      $('#letter').val("");  
      console.log("Punteggio -> " + punteggio)
      }
         
      
      //check user win
        let count = 0;
        for ( let k = 0; k < $('#wordToGuess').text().length; k++){
          if($('#wordToGuess').text().charAt(k) != "+" && $('#wordToGuess').text().charAt(k) != "-"){
            count++; 
          }
        }
        
        if(count === $('#wordToGuess').text().length){
          alert("WINNER!");
          $('#score').text(punteggio)
          clearWord(guessWord);
          clearVariable();
          changeImgHangMan();
          animalRequest();
          return;
        }

     }

     
   }

   function writeWordInsert(insertWord){

     if(usedWord.has(insertWord)){
      alert("Hai già inserito la lettera:" + insertWord);
     }else{
      $('#usedLetters').append("<span class=www>"+ insertWord + "</span>"); 
       
     }
     
    
   }

 function changeImgHangMan(){
    $("#imgHangman").attr("src","/images/hangman/facile"+tentativi+".png");
 }
