 <template>
    <div class="wigglePattern">
        <div id="hangmanContainer">
            <div id="spanRules">
                <button id="btnRules"> ? </button>

                <!-- Modal -->
                <div id="rulesPopUp" class="modal">
                    <span id="closeRules" class="close" title="Close Modal">&times;</span>
                    <form class="modal-content hangmanModal-content">
                        <div class="container hangmanRulesContainer">
                            <h1>How to play</h1>
                            <ul>
                                <li>You have to guess the name of the animal in the picture.</li>
                                <li>You can insert one letter or the entire word.</li>
                                <li>You start with 100 points.</li>
                                <li>If you guess the word immediately you get all the 100 points.</li>
                                <li>If you guess one letter: -5 points</li>
                                <li>If the letter or word are wrong: -10 points</li>
                                <li>You only have 10 rounds to win!</li>
                            </ul>
                        </div>
                    </form>
                </div>

                

<!--                 <div id="rulesPopUp" class="modal">
                    <button id="closeRules">&times;</button>
                    <div id="descriptionHangman" class="modal-content">
                        <p>How to play: </p>
                        <ul>
                            <li>You have to guess the name of the animal in the picture.</li>
                            <li>You can insert one letter or the entire word.</li>
                            <li>You start with 100 points.</li>
                            <li>If you guess the word immediately you get all the 100 points.</li>
                            <li>If you guess one letter: -5 points</li>
                            <li>If the letter or word are wrong: -10 points</li>
                            <li>You only have 10 rounds to win!</li>
                        </ul>
                    </div>
                </div> -->

            </div>
            <div>
                <div class="title">Hangman Game</div>
                <span>
                    <div id="scoreHangman">Your total score: <span id="quizScore">{{ score }}</span></div>
                    <div id="scoreHangman">Current score: <span id="hangmanCurrentScore">100</span></div>
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
 
