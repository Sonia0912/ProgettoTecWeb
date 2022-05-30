<template>
    <div class="centeredGrid leafPattern">
        <div class="funFactsContainer">
            <div class="title">Fun Facts</div>
            <div class="serverError">{{ error }}</div>

            <div id="factsTypes">
                <button @click="typeOfFacts = 0" :class="{ active: typeOfFacts === 0 }">Fish Habitats 🐟 </button>
                <button @click="typeOfFacts = 1" :class="{ active: typeOfFacts === 1 }">Endangered Reptiles 🦎</button>
                <button @click="typeOfFacts = 2" :class="{ active: typeOfFacts === 2 }">Bird Population  🦅</button>
            </div>

            <!-- FISH FACTS -->
            <div v-if="typeOfFacts === 0" id="catFacts">
                <div class="fact" v-for="f in factsFishes" :key="f">
                    {{ f }}
                    <button v-if="loggedIn" class="publishFactBtn" @click="postOnDashboard(f)"> Post </button>
                </div>
                <div class="otherFacts"></div>
            </div>
            <!-- ENDAGERED SPECIES  -->
            <div v-if="typeOfFacts === 1" id="snailFacts">
                <div class="fact" v-for="s in factsEndangered" :key="s">
                    {{ s }}
                    <button v-if="loggedIn" class="publishFactBtn" @click="postOnDashboard(s)"> Post </button>
                </div>
                <div class="waitingFunFacts" v-if="waitingForReptiles">Please wait</div>
                <div class="otherFacts"></div>
            </div>
            <!-- BIRD HABITATS  -->
            <div v-if="typeOfFacts === 2" id="horseFacts">
                <div class="fact" v-for="h in factsBirds" :key="h">
                    {{ h }}
                    <button v-if="loggedIn" class="publishFactBtn" @click="postOnDashboard(h)"> Post </button>
                </div>
                <div class="waitingFunFacts" v-if="waitingForBirds">Please wait</div>
                <div class="otherFacts"></div>
            </div>

            <button id="loadMoreFacts" @click="loadMore">&#8595;</button>
 
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: "funfacts",
    data() {
        return {
            factsFishes: [],
            factsEndangered: [],
            factsBirds: [],
            error: '',
            typeOfFacts: 0,
            loggedIn: false,
            scrollable: true,
            waitingForReptiles: true,
            waitingForBirds: true,
        }
    },
    created() {
        if (localStorage.getItem('token') != null) {
            this.loggedIn = true;
        }
        axios.get("http://localhost:3000/getFactsOf/fish")
        .then(res => {
            var formattedArray = [];
            for(let i = 0; i < res.data.length; i++) {
                if(res.data[i] != null) {
                    var firstFormat = res.data[i].replace(/(<([^>]+)>)/gi, "");
                    formattedArray.push(firstFormat.replace(/&nbsp;/g, ''));
                }
            }
            this.factsFishes = formattedArray; 
        })
        .catch(err => this.error = "Sorry, something went wrong (" + err.message + ")")

        // Essendo lente la facciamo separatamente
        axios.get("http://localhost:3000/getFactsOf/endangered")
        .then(res => {  
            this.waitingForReptiles = false;
            this.factsEndangered = res.data;
        })
        .catch(err => this.error = "Sorry, something went wrong (" + err.message + ")")
        axios.get("http://localhost:3000/getFactsOf/bird")
        .then(res => {  
            this.waitingForBirds = false;
            this.factsBirds = res.data;
        })
        .catch(err => this.error = "Sorry, something went wrong (" + err.message + ")")

    },
    methods: {
        postOnDashboard(facts) {
            var data = {
                text: facts
            }
            axios.post('http://localhost:3000/posts', data, {
                headers: {
                    'token': localStorage.getItem('token')
                }
            })
            .then(() => this.$router.push({ name: 'Dashboard' }))
            .catch(err => this.error = "Sorry, something went wrong (" + err.message + ")")
        }, 
        loadMore() {
            var type = "fish";
            if ( this.typeOfFacts === 1) {
                this.waitingForReptiles = true;
                type = "endangered";
            }else if(this.typeOfFacts === 2) {
                this.waitingForBirds = true;
                type = "bird";
            }
            axios.get('http://localhost:3000/getFactsOf/' + type)
            .then (facts => {
                if (type === "fish") {
                    for(let i = 0; i < facts.data.length; i++) {
                        if(facts.data[i] != null) {
                            var firstFormat = facts.data[i].replace(/(<([^>]+)>)/gi, "");
                            this.factsFishes.push(firstFormat.replace(/&nbsp;/g, ''));
                        }
                    }
                } else if (type === "endangered") {
                    this.waitingForReptiles = false;
                    for(let i = 0; i < facts.data.length; i++) {
                        this.factsEndangered.push(facts.data[i]);
                    }
                } else if (type === "bird") {
                    this.waitingForBirds = false;
                    for(let i = 0; i < facts.data.length; i++) {
                        this.factsBirds.push(facts.data[i]);
                    }
                }
            })
            .catch(err => this.error = "Sorry, something went wrong (" + err.message + ")");         
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
    color: #fd7e14;
    border: 2px solid #fd7e14;
    border-radius: 40px;
    letter-spacing: 2px;
}

.active {
    background-color: #fd7e14 !important;
    color: white !important;
}

.funFactsContainer {
     text-align: center;
     overflow: unset;
}

.fact {
     background-color: white;
     display: flexbox;
     flex-direction: column;
     border-radius: 10px;
     padding: 20px;
     width: 40vw;
     max-width: 600px;
     height: fit-content;
     overflow: auto;
     margin: 30px auto 0px auto;
     display: flex;
     justify-content: center;
     align-items: center;
}

.publishFactBtn{
     margin-top: 10px;
     background-color: #1b284d;
     color: white;
     border-radius: 5px;
}

#loadMoreFacts {
    background-color: #fd7e14;
    color: white;
    margin-top: 20px;
    border-radius: 5px;
    padding: 0 13px;
    font-size: 25px;
}

.waitingFunFacts {
    font-size: 22px;
    margin-top: 20px;
}

@media screen and (max-width: 768px) {
    .fact {
        width: 60vw;
    }
}

@media screen and (max-width: 480px) {
    .fact {
        width: 80vw;
    }
}

@media screen and (max-width: 350px) {
    .fact {
        min-width: auto;
    }
}
</style>
