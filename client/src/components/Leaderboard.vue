<template>
    <div id="leaderboard" class="centeredGrid blueCurtainBackground">
        <div class="title">Leaderboard</div>
        <div class="serverError">{{ error }}</div>

        <div id="leaderboardTypes">
            <button @click="typeOfGame = 0" :class="{ active: typeOfGame === 0 }">Quiz</button>
            <button @click="typeOfGame = 1" :class="{ active: typeOfGame === 1 }">Hangman</button>
        </div>

        <!-- Quiz -->
        <div id="quizLeadContainer" v-if="typeOfGame === 0">
            <span v-if="!isAdmin">You are #{{ this.myQuizPosition }}</span>
            <table id="quizLeaderboard">
                <tr v-for="(user, index) in quizToDisplay" :key="user.name"
                    :class="{ myScoreRow: myQuizPosition === index + 1 }">
                    <td>#{{ index + 1 }}</td>
                    <td>{{ user.name }}</td>
                    <td>{{ user.score }}</td>
                </tr>
            </table>
            <button v-if="!this.isHiddenQuiz" class="loadMore" @click="loadMoreQuiz">Load More</button>
        </div>

        <!-- Hangman -->
        <div id="hangmanLeadContainer" v-if="typeOfGame === 1">
            <span v-if="!isAdmin">You are #{{ this.myHangmanPosition }}</span>
            <table id="hangmanLeaderboard">
                <tr v-for="(user, index) in hangmanToDisplay" :key="user.name"
                    :class="{ myScoreRow: myHangmanPosition === index + 1 }">
                    <td>#{{ index + 1 }}</td>
                    <td>{{ user.name }}</td>
                    <td>{{ user.score }}</td>
                </tr>
            </table>
            <button v-if="!this.isHiddenHang" class="loadMore" @click="loadMoreHangman">Load More</button>
        </div>

    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: "leaderboard",
    data() {
        return {
            quizLeaderboard: [],
            hangmanLeaderboard: [],
            quizToDisplay: [],
            hangmanToDisplay: [],
            typeOfGame: 0,
            myQuizPosition: -1,
            myHangmanPosition: -1,
            isHiddenQuiz: false,
            isHiddenHang: false,
            isAdmin: false,
            error: ''
        }
    },
    created() {
        if (localStorage.getItem('token') === null) {
            this.$router.push("login")
        } else {
            var promises = [];
            promises.push(axios.get('http://localhost:3000/quizleaderboard'));
            promises.push(axios.get('http://localhost:3000/hangmanleaderboard'));
            Promise.all(promises)
                .then((results) => {
                    this.quizLeaderboard = results[0].data;
                    this.hangmanLeaderboard = results[1].data;
                    for (let i = 0; i < this.quizLeaderboard.length; i++) {
                        if (this.quizLeaderboard[i].name === localStorage.getItem("email")) {
                            this.myQuizPosition = i + 1;
                        }
                    }
                    for (let i = 0; i < this.hangmanLeaderboard.length; i++) {
                        if (this.hangmanLeaderboard[i].name === localStorage.getItem("email")) {
                            this.myHangmanPosition = i + 1;
                        }
                    }
                    // mostra solo i primi 5 inizialmente
                    this.quizToDisplay = this.quizLeaderboard.slice(0, 5);
                    this.hangmanToDisplay = this.hangmanLeaderboard.slice(0, 5);
                    if (this.hangmanLeaderboard.length === this.hangmanToDisplay.lenght) {
                        this.isHiddenQuiz = true;
                        this.isHiddenHang = true;
                    }
                })
                .catch(err => this.error = "Sorry, something went wrong (" + err.message + ")");
            // Se e' un admin non mostro la scritta You are #
            if (localStorage.getItem('isAdmin') != null) {
                this.isAdmin = true;
            }
        }
    },
    methods: {
        loadMoreQuiz() {
            var toLoad = this.quizToDisplay.length + 5;
            this.quizToDisplay = this.quizLeaderboard.slice(0, toLoad);
            if (this.quizLeaderboard.length === this.quizToDisplay.length) {
                this.isHiddenQuiz = true;
            }
        },
        loadMoreHangman() {
            var toLoad = this.hangmanToDisplay.length + 5;
            this.hangmanToDisplay = this.hangmanLeaderboard.slice(0, toLoad);
            if (this.hangmanLeaderboard.length === this.hangmanToDisplay.length) {
                this.isHiddenHang = true;
            }
        }
    }
}
</script>

<style scoped>
#leaderboard {
    padding-bottom: 30px;
}

#leaderboardTypes {
    margin: 0 auto;
}

#leaderboardTypes button {
    padding: 8px 14px;
    margin: 10px;
    background-color: rgb(255, 255, 255, 0.3);
    color: #60cead;
    border: 2px solid #60cead;
    border-radius: 40px;
    letter-spacing: 2px;
}

.active {
    background-color: #60cead !important;
    color: white !important;
}

#quizLeaderboard,
#hangmanLeaderboard {
    background-color: white;
    border-radius: 10px;
    border-collapse: separate;
    border-spacing: 20px;
    margin: 20px 0px
}

.myScoreRow {
    background-color: #60cead;
}

#quizLeadContainer,
#hangmanLeadContainer {
    display: grid;
    justify-items: center;
}

.loadMore {
    border-radius: 5px;
    background-color: #60cead;
    color: white;
    padding: 5px 8px;
}
</style>