<template>
    <div class="verticalForm blueBackground">
        <h2>Sing up</h2>
        <div class="errorMessage">{{error}}</div>
        <input type="email" name="email" placeholder="E-mail" id="emailRegister" v-model="email">
        <input type="text" name="name" placeholder="Name" id="nameRegister" v-model="name">
        <input type="text" name="surname" placeholder="Surname" id="surnameRegister" v-model="surname">
        <input type="password" name="password" placeholder="Password" id="passwordRegister" v-model="password">
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
                if(this.email != '' && this.name != '' && this.surname != '' && this.password != '') {
                    let newUser = {
                        email: this.email,
                        name: this.name,
                        surname: this.surname,
                        password: this.password
                    }
                    axios.post('http://localhost:3000/register', newUser)
                    .then(
                        () => {
                            this.$router.push("login")
                        },
                        err => {
                            this.error = err.response.data.error
                        }     
                    )
                } else {
                    this.error = "Please fill in all the fields"
                }
            }
        },
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