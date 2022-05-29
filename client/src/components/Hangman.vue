 <template>
    <div class="wigglePattern">
        <div id="hangmanContainer">

            <div id="spanRules">
                <button id="btnRules"> ? </button>
                <!-- Modal rules -->
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
                                <li>If the letter or word are wrong: -10 points</li>
                                <li>You only have 10 rounds to win!</li>
                            </ul>
                        </div>
                    </form>
                </div>
            </div>                

            <!-- Modal message -->
            <div id="divResult" class="modal" >
                <div class="modal-content"> 
                    <button id="closeResult">&times;</button>
                    <div id="textResult"></div>
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
            if(localStorage.getItem('token') != null) {
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
 
