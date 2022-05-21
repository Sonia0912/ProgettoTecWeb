<template>
    <div id="profileContainer">
        <div class="title">Profile</div>
        <div id="laoutProfile">

            
                <span id="emailSpan" class="fontProfile">E-mail:</span> 
                <span id="email">{{ email }}</span>
       
                <span id="nameSpan" class="fontProfile">Name:</span> 
                <span id="name">{{ name }}</span>
                <input id="inputName" v-model="name">
           
                <span id="suernameSpan" class="fontProfile">Surname:</span> 
                <span id="surname">{{ surname }}</span>
                <input id="inputSurname" v-model="surname">
       
           
            <button id="logoutBtn" @click="logOut">Log Out</button>
            <button id="saveBtn" @click="saveInfo">Save</button>

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
            surname: ''
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
                surname: this.surname
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
            })
    }
}
</script>