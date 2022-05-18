<template>
    <div class="verticalForm">
        <h2>Sing up</h2>
        <div class="errorMessage">{{error}}</div>
        <input type="email" name="email" placeholder="E-mail" id="email" v-model="email">
        <input type="text" name="name" placeholder="Name" id="name" v-model="name">
        <input type="text" name="surname" placeholder="Surname" id="surname" v-model="surname">
        <input type="password" name="password" placeholder="Password" id="password" v-model="password">
        <button @click='signUp()'>Register</button>
    </div>  
</template>


<script>
    import axios from 'axios'
    export default {
        name: "register",
        created() {
            if(localStorage.getItem('token') != null) {
                this.$router.push("/")
            }
        },
        data() {
            return {
                email: '',
                name: '',
                surname: '',
                password: '',
                error:''
            }
        },
        methods: {
            signUp() {
                console.log("ciaociao")
                if(this.email != '' && this.name != '' && this.surname != '' && this.password != '') {
                    let newUser = {
                        email: this.email,
                        name: this.name,
                        surname: this.surname,
                        password: this.password
                    }
                    axios.post('http://localhost:3000/register', newUser)
                    .then(
                        this.$router.push("login")
                    )
                } else {
                    console.log("ciao")
                    this.error = "Please fill in all the fields"
                }
            }
        },
    }
</script>