 <template>
    <div class="wigglePattern">

        <div id="hangmanContainer">

            <div id="divRules">
                <button id="btnRules"> ? </button>
                <div id="rulesPopUp">
                    <button id="closeRules"> X </button>
                    <div id="descriptionHangman">
                        <p>How to play: </p>
                        <ul>
                            <li>You Start with 100 pti: </li>
                            <li>If you guess the word immediately: + 100 pti </li>
                            <li>If you guess one letter: - 5 pti </li>
                            <li>If you wrong: - 10 pti </li>
                        </ul>


                    </div>
                </div>
            </div>

            <div id="divResult">
                <button id="closeResult"> X </button>
                <div id="textResult"> </div>
            </div>

            <div>

                <div class="title">Hangman Game</div>
                <span>
                    <div id="scoreHangman">Your score: <span id="quizScore">{{ score }}</span></div>
                </span>

                <div id="HangmanBackgroud">
                    <img src="/images/hangman/facile0.png" id="imgHangman">
                    <img id="animalPhoto">
                    <div id="wordToGuess"></div>
                    <div id="usedLetters"></div>
                </div>

                <div id="hangmanInput">
                    <input type="text" id="letter" name="userWord">
                    <button id="btnHangman" onclick="guess()"> Send </button>
                </div>
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
 
