<template>
    <div id="profileContainer">
        <div class="title">Profile</div>
        <div id="laoutProfile">

            <h3>E-mail: <span id="email">{{ email }}</span> </h3>

            <h3>Name:
                <span id="name">{{ name }}</span> </h3>
            <input v-model="name">
            <h3>Surname:  <span id="surname">{{ surname }}</span></h3>
            <input v-model="surname">
            <button @click="logOut">Log Out</button>
            <button @click="saveInfo">Save</button>

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