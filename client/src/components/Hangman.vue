 <template>
    <div class="wigglePattern container">
<div class="row">

    <div class="col-xs-2"> </div>
     <div class="col-xs-8">
        <div class="title">Hangman Game </div>
     </div>

  
    <div class="d-flex row-xs-3"> 
        <img src="/images/hangman/facile0.png" id="imgHangman"> 
    </div>
    <div class="d-flex row-xs-3"> 
        <img  id="animalPhoto">  
    </div>

    <div class="col-xs-3 d-flex justify-content-center"> 
         <div id="word"> </div>    
    </div>


        <input type="text" id="letter" name="userWord"> <br>
        <button id="btnHangman" onclick="guess()"> Send </button>
            
        <div> Your Score is: <p id="score"> 100 </p></div>

        <button id="btnRules"> Rules </button>
        <div id="rules"> 
            <p id="descriptionHangman">
                <div>How to play</div>
                <div>You Start with 100 pti: </div>
                <div>If you guess the word in one shote: + 100 pti </div> 
                <div> If you guess one letter: - 5 pti  </div>
                <div> If you wrong: - 10 pti </div>
            </p>  
        </div>

</div>
</div>
    

    
 </template>

<script>
export default {
    name: "hangman",
    mounted() {
        let Script = document.createElement("script");
        Script.setAttribute("src", "./js/hangman.js");
        document.head.appendChild(Script);
    }
}
</script>
 
