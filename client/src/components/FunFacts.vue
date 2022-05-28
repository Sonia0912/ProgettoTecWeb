<template>
    <div class="centeredGrid leafPattern">
        <div class="funFactsContainer">
            <div class="title">Fun Facts</div>
            <div class="serverError">{{ error }}</div>

            <div id="factsTypes">
                <button @click="typeOfFacts = 0" :class="{ active: typeOfFacts === 0 }">Cats
                    Facts</button>
                <button @click="typeOfFacts = 1" :class="{ active: typeOfFacts === 1 }">Dog
                    Facts</button>
                <button @click="typeOfFacts = 2" :class="{ active: typeOfFacts === 2 }">Snail
                    Facts</button>
                <button @click="typeOfFacts = 3" :class="{ active: typeOfFacts === 3 }"> Horse
                    Facts</button>
            </div>

            <!-- CAT FACTS -->
            <div v-if="typeOfFacts === 0" id="catFacts">
             <!-- v-scroll="scrollFunction(this.type[0])"> -->
                <div class="fact" v-for="f in factsCats" :key="f.text">
                    {{ f.text }}
                    <button v-if="login" class="publishFactBtn" @click="postOnDashboard(f.text)"> Post </button>
                </div>
                <div id="otherFacts"></div>
            </div>
            <!-- DOG FACTS -->
            <div v-if="typeOfFacts === 1" id="dogFacts" >
                <div class="fact" v-for="d in factsDogs" :key="d.text">
                    {{ d.text }}
                    <button v-if="login" class="publishFactBtn" @click="postOnDashboard(d.text)"> Post </button>
                </div>
                <div id="otherFacts"></div>
            </div>
            <!-- SNAIL FACTS  -->
            <div v-if="typeOfFacts === 2" id="snailFacts">
                <div class="fact" v-for="s in factsSnail" :key="s.text">
                    {{ s.text }}
                    <button v-if="login" class="publishFactBtn" > Post </button>
                </div>
                <div id="otherFacts"></div>
            </div>
            <!-- HORSE FACTS  -->
            <div v-if="typeOfFacts === 3" id="horseFacts">
                <div class="fact" v-for="h in factsHorse" :key="h.text">
                    {{ h.text }}
                    <button v-if="login" class="publishFactBtn" @click="postOnDashboard(h.text)"> Post </button>
                </div>
                <div id="otherFacts"></div>
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
            factsSnail: [],
            factsHorse: [],
            error: '',
            typeOfFacts: 0,
            login: false,
            type: ["cat", "dog", "snail", "horse"]
        }
    },
    created() {


        if (localStorage.getItem('token') != null) {
            this.login = true;
        }
        var promises = []
        //Cat Facts
        promises.push(axios.get("https://cat-fact.herokuapp.com/facts/random?animal_type=cat&amount=10"));
        //Dog Facts
        promises.push(axios.get("http://localhost:3000/getFactsOf/" + this.type[1]));
        //Snail Facts
        promises.push(axios.get("http://localhost:3000/getFactsOf/" + this.type[2]));
        //Horse Facts
        promises.push(axios.get("http://localhost:3000/getFactsOf/" + this.type[3]));

        Promise.all(promises)
            .then(res => {

                this.factsCats = res[0].data
                this.factsDogs = res[1].data;
                this.factsSnail = res[2].data;
                this.factsHorse = res[3].data;

            })
            .catch(err => {
                this.error = "Sorry, something went wrong (" + err.message + ")"
            })
    },
    mounted() {
        let Script = document.createElement("script");
        Script.setAttribute("src", "./js/funfacts.js");
        document.head.appendChild(Script);
    //window.addEventListener('scroll', this.scrollFunction(this.typeOfFacts));
    },
    methods: {
        postOnDashboard(facts) {
            var data='';
            if(facts.text){
                data = {        
                text: facts.text,
                img: ''
            }
            }else{
                data = {
                text: facts,
                img: ''
            }

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
.funFactsContainer{
    overflow: scroll;
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

.fact {
    min-width: 350px;
    max-width: 350px;
}

.active {
    background-color: #60cead !important;
    color: white !important;
}

@media screen and (max-width: 350px) {
    .fact {
        min-width: auto;
    }
}
</style>
