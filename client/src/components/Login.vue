<template>
    <div class="verticalForm">
        <span v-if="this.$route.params.error === 'unauthorized'">
            <h2>Sign in to use this service</h2>
        </span>
        <span v-else>
            <h2>Sign in</h2>
        </span>
        <div class="errorMessage">{{error}}</div>
        <input type="email" name="email" placeholder="E-mail" id="email" v-model="email">
        <input type="password" name="password" placeholder="Password" id="password" v-model="password">
        <button @click="signIn">Log in</button>
    </div>
  
</template>


<script>
    import axios from 'axios'
    export default {
        name: "login",
        created() {
            if(localStorage.getItem('token') != null) {
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
                if(this.email != '' && this.password != '') {
                    let user = {
                        email: this.email,
                        password: this.password
                    }
                    axios.post('http://localhost:3000/login', user)
                    .then(res => {
                        if(res.status === 200) {
                            localStorage.setItem('token', res.data.token)
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
                    }              
                    )
                } else {
                    this.error = "Please fill in all the fields"
                }
            }
        }
    }
</script>