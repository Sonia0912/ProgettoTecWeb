<template>
    <div class="centeredGrid leafPattern">
        <div class="funFactsContainer">
            <div class="title">Fun Facts</div>
            <div class="serverError">{{ error }}</div>

            <div id="factsTypes">
                <button @click="typeOfFacts = 0" id="catsFacts" :class="{ active: typeOfFacts === 0 }">Cats Facts</button>
                <button @click="typeOfFacts = 1" id="dogsFacts" :class="{ active: typeOfFacts === 1 }">Dog Facts</button>
                <button @click="typeOfFacts = 2" id="bordsFacts" :class="{ active: typeOfFacts === 2 }">Bird
                    Facts</button>
            </div>


            <div v-if="typeOfFacts === 0" id="catFacts" >
                <div class="fact" v-for="f in factsCats" :key="f.text" >
                    {{ f.text }}
                     <button v-if="login" class="publishFactBtn" @click="postOnDashboard(f.text)"> Post </button>
                </div>
            </div>

            <div v-if="typeOfFacts === 1" id="dogFacts" >
                <div class="fact" v-for="d in factsDogs" :key="d.text" >
                    {{ d.text }}
                     <button v-if="login" class="publishFactBtn" @click="postOnDashboard(d.text)"> Post </button>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: "funfacts",
    data() {
        return {
            factsCats: [],
            factsDogs: [],
            error: '',
            typeOfFacts: 0, 
            login:false
        }
    },
    created() {


        if(localStorage.getItem('token') != null){
            this.login = true;
        }
         var promises = []
        //  promises.push(axios.get('http://localhost:3000/getFacts')
        //         .then(res => { 
        //             console.log(res)
        //         })
        //         .catch(err => this.error = "Sorry, something went wrong (" + err.message + ")"))


        //cat
        promises.push(axios.get("https://cat-fact.herokuapp.com/facts/random?animal_type=cat&amount=10"));
        //dog
        promises.push(axios.get("http://localhost:3000/getFactsDog"));
        Promise.all(promises)
            .then(res => {

                this.factsCats = res[0].data
                this.factsDogs = res[1].data;

            })
            .catch(err => {
                this.error = "Sorry, something went wrong (" + err.message + ")"
            })
    },
    mounted() {
        // let Script = document.createElement("script");
        // Script.setAttribute("src", "./js/funfacts.js");
        // document.head.appendChild(Script);
    },
    methods: {
        postOnDashboard(facts) {
        
             var data = {
                text: facts,
                img: ''
            }
            
            axios.post('http://localhost:3000/posts', data, {
                headers: {
                    'token': localStorage.getItem('token')
                }
            })
                .then(() =>
                    this.$router.push({
                        name: 'Dashboard'
                    })
                )
                .catch(err => this.error = "Sorry, something went wrong (" + err.message + ")")
        }
    }
}
</script>

<style scoped>
#factsTypes {
    margin: 0 auto;
}

#factsTypes button {
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
</style>
