 <template>
    <div class="wigglePattern">
        <div id="hangmanContainer">

            <div id="spanRules">
                <button id="btnRules"> ? </button>
                <div id="soundControllContainer">
                    <button id="play" class="soundControll"> &#128266; </button>
                    <button id="mute" class="soundControll"> &#128263; </button>
                </div>
                
                <!-- Modal rules -->
                <div id="rulesPopUp" class="modal">
                    <span id="closeRules" class="close" title="Close Modal">&times;</span>
                    <div class="modal-content hangmanModal-content">
                        <div class="container hangmanRulesContainer">
                            <h1>How to play</h1>
                            <ul>
                                <li>You have to guess the name of the animal in the picture.</li>
                                <li>You can insert one letter or the entire word.</li>
                                <li>You start with 100 points.</li>
                                <li>If you guess the word immediately you get all the 100 points.</li>
                                <li>If the letter or word are wrong: -10 points</li>
                                <li>You only have 10 rounds to win!</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Modal message -->
            <div id="divResult" class="modal">
                <span id="closeMessagge" class="close" title="Close Modal">&times;</span>
                <div class="modal-content-hangman">
                    <div id="containerResutl" class="hangmanMessaggeContainer">
                        <div id="textResult"></div>
                    </div>
                </div>

            </div>

            <div>
                <div class="title">Hangman Game</div>
                <div id="serverErrorHangman" class="serverError">{{ error }}</div>
                <span>
                    <div v-if="isAuth" class="scoreHangman">Your total score: <span id="hangmanScore"> </span></div>
                    <div class="scoreHangman">Current score: <span id="hangmanCurrentScore"></span></div>
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
        <audio id="winnerSound">
            <source src="../../sound/winner.mp3" type="audio/mp3">
        </audio>
        <audio id="gameoverSound">
            <source src="../../sound/gameover.mp3" type="audio/mp3">
        </audio>
        <audio id="gameMusic">
            <source src="../../sound/musicgame.mp3" type="audio/mp3">
        </audio>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: "hangman",
    data() {
        return {
            isAuth: false,
            score: 0,
            error: ''
        }
    },
    created() {
        if (localStorage.getItem('token') != null) {
            this.isAuth = true;
            axios.get("http://localhost:3000/hangmanScore/email/" + localStorage.email)
                .then((res) => {
                    this.score = res.data.score
                }).catch(error => {
                    this.error = "Sorry, something went wrong (" + error + ")";
                })
        }
    },
    mounted() {
        let Script = document.createElement("script");
        Script.setAttribute("src", "./js/hangman.js");
        document.head.appendChild(Script);
    }
}
</script>