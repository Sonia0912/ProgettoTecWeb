<template>
    <div>
        <h1>Profile</h1>
        <h3>E-mail: {{email}}</h3>
        <h3>Name: {{name}}</h3>
        <h3>Surname: {{surname}}</h3>
        <button @click="logOut">Log Out</button>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: "profile",
        created() {
            if(localStorage.getItem('token') === null) {
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