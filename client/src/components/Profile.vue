<template>
    <div id="profileContainer" class="blueCurtainBackground">
        <div class="title">Profile</div>
        <div id="profileGridContainer">
            <div id="layoutProfile">

                <span id="emailSpan" class="fontProfile">E-mail:</span> 
                <span id="email">{{ email }}</span>

                <span id="nameSpan" class="fontProfile">Name:</span>
                <input id="inputName" v-model="name">
            
                <span id="surnameSpan" class="fontProfile">Surname:</span>
                <input id="inputSurname" v-model="surname">

                <span id="passwordSpan" class="fontProfile">Password:</span>
                <input type="password" id="inputPassword" v-model="password">

                <span id="quizSpan" class="fontProfile">Quiz score:</span> 
                <span id="email">{{ quizScore }}</span>

                <span id="hangmanSpan" class="fontProfile">Hangman score:</span> 
                <span id="email">{{ hangmanScore }}</span>
                    
                <button id="logoutBtn" @click="logOut">Log Out</button>
                <button id="saveBtn" @click="saveInfo">Save</button>

            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: "profile",
    created() {
        if (localStorage.getItem('token') === null) {
            this.$router.push("login")
        }
    },
    data() {
        return {
            email: '',
            name: '',
            surname: '',
            password: '',
            quizScore: 0,
            hangmanScore: 0
        }
    },
    methods: {
        logOut() {
            localStorage.removeItem('token')
            localStorage.removeItem('email')
            localStorage.removeItem('isAdmin')
            localStorage.setItem('isLogged', false)
            window.dispatchEvent(new CustomEvent('isLogged-localstorage-logout', {
                detail: {
                    storage: localStorage.getItem('isLogged')
                }
            }));
            this.$router.push("login")
        },
        saveInfo() {
            let user = {
                email: this.email,
                name: this.name,
                surname: this.surname,
                password: this.password
            }
            axios.post('http://localhost:3000/profile', user)
        }
    },
    mounted() {
        axios.get("http://localhost:3000/profile", { headers: { token: localStorage.getItem('token') } })
            .then(res => {
                this.email = res.data.user.email;
                this.name = res.data.user.name;
                this.surname = res.data.user.surname;
                this.quizScore = res.data.user.quizScore;
                this.hangmanScore = res.data.user.hangmanScore;
            })
    }
}
</script>