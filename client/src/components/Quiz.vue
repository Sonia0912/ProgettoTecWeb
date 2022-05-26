<template>
        <div class="wigglePattern">
            <div class="row">
              <div class="col-md-2">
              </div>
              <div class="col-md-8">
                <div id="divQuiz">
                    <div class="title">Quiz</div>
                    <div id="serverErrorQuiz" class="serverError"></div>
                    <span v-if="isAuth">
                        <div class="score">Your score: <span id="quizScore">{{ score }}</span></div>
                    </span>                    
                    <div id="quizContainer">
                        <div id="question"></div>
                        <div class="d-flex justify-content-center answersRow">
                            <button id="answer0"></button>
                            <button id="answer1"></button>
                        </div>
                        <div class="d-flex justify-content-center answersRow">
                            <button id="answer2"></button>
                            <button id="answer3"></button>
                        </div>
                        <div class="d-flex justify-content-center answersRow">
                            <button id="answer4"></button>
                            <button id="answer5"></button>
                        </div>
                        <div id="result"></div>
                        <div id="showPicDiv"><button id="showPicLink">See a picture</button></div>
                        <!-- The Modal -->
                        <div id="animalPicModal" class="modal">
                            <!-- The Close Button -->
                            <span class="close">&times;</span>
                            <!-- Modal Content (The Image) -->
                            <img class="modal-content" id="animalImg">
                            <!-- Modal Caption (Image Text) -->
                            <div id="caption"></div>
                        </div>
                    </div>
                    <div class="d-flex justify-content-center">
                        <button id="nextQuestion"><span>Next question </span></button>
                    </div>
                </div>
              </div>
              <div class="col-md-2">
              </div>
            </div>
        </div>
</template>


<script>
    import axios from 'axios'
    export default {
        name: "quiz",
        data() {
            return {
                isAuth: false,
                score: -1
            }
        },
        created() {
            if(localStorage.getItem('token') != null) {
                this.isAuth = true;
                axios.get("http://localhost:3000/quiz/email/" + localStorage.email)
                .then((res) => {
                    this.score = res.data.score
                })
            }
        },
        mounted() {
            let Script = document.createElement("script");
            Script.setAttribute("src", "./js/quiz.js");
            document.head.appendChild(Script);
        }
    }
</script>