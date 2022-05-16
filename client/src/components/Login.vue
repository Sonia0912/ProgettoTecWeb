<template>
    <div class="verticalForm">
        <h2>Sing in</h2>
        {{error}}
        <input type="email" name="email" placeholder="E-mail" id="email" v-model="email" required>
        <input type="password" name="password" placeholder="Password" id="password" v-model="password" required>
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
            }
        } 
    }
</script>