<template>
    <div class="verticalForm blueBackground">
        <span v-if="this.$route.params.error === 'unauthorized'">
            <h2>Sign in to use this service</h2>
        </span>
        <span v-else-if="this.$route.params.error === 'notadmin'">
            <h2>Sign in as an admin to user this service</h2>
        </span>
        <span v-else>
            <h2>Sign in</h2>
        </span>
        <div class="errorMessage">{{ error }}</div>
        <input type="email" name="email" placeholder="E-mail" id="emailLogin" v-model="email">
        <input type="password" name="password" placeholder="Password" id="passwordLogin" v-model="password">
        <button @click="signIn">Log in</button>
    </div>

</template>


<script>
import axios from 'axios'
export default {
    name: "login",
    created() {
        if (localStorage.getItem('token') != null) {
            this.$router.push("/")
        }
    },
    data() {
        return {
            email: '',
            password: '',
            error: ''
        }
    },
    methods: {
        signIn() {
            if (this.email != '' && this.password != '') {
                let user = {
                    email: this.email,
                    password: this.password
                }
                axios.post('http://localhost:3000/login', user)
                    .then(res => {
                        if (res.status === 200) {
                            localStorage.setItem('token', res.data.token)
                            if (res.data.admin) {
                                localStorage.setItem('isAdmin', res.data.admin)
                                window.dispatchEvent(new CustomEvent('isAdmin-localstorage-true', {
                                    detail: {
                                        storage: localStorage.getItem('isAdmin')
                                    }
                                }));
                            }
                            localStorage.setItem('email', this.email)
                            localStorage.setItem('isLogged', true)
                            window.dispatchEvent(new CustomEvent('isLogged-localstorage-login', {
                                detail: {
                                    storage: localStorage.getItem('isLogged')
                                }
                            }));
                            this.$router.push("profile")
                        }
                    }, err => {
                        this.error = err.response.data.error
                    })
            } else {
                this.error = "Please fill in all the fields"
            }
        }
    }
}
</script>

<style scoped>
button {
    background-color: #1b284d;
    border-radius: 5px;
    padding: 5px 10px;
    color: white;
    margin-top: 20px;
}

button:hover {
    background-color: #2b417d;
}
</style>