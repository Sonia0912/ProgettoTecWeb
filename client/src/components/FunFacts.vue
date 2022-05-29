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
                <div class="fact" v-for="f in factsCats" :key="f">
                    {{ f }}
                    <button v-if="loggedIn" class="publishFactBtn" @click="postOnDashboard(f)"> Post </button>
                </div>
                <div id="otherFacts"></div>
            </div>
            <!-- DOG FACTS -->
            <div v-if="typeOfFacts === 1" id="dogFacts">
                <div class="fact" v-for="d in factsDogs" :key="d">
                    {{ d }}
                    <button v-if="loggedIn" class="publishFactBtn" @click="postOnDashboard(d)"> Post </button>
                </div>
                <div id="otherFacts"></div>
            </div>
            <!-- SNAIL FACTS  -->
            <div v-if="typeOfFacts === 2" id="snailFacts">
                <div class="fact" v-for="s in factsSnail" :key="s">
                    {{ s }}
                    <button v-if="loggedIn" class="publishFactBtn" @click="postOnDashboard(s)"> Post </button>
                </div>
                <div id="otherFacts"></div>
            </div>
            <!-- HORSE FACTS  -->
            <div v-if="typeOfFacts === 3" id="horseFacts">
                <div class="fact" v-for="h in factsHorse" :key="h">
                    {{ h }}
                    <button v-if="loggedIn" class="publishFactBtn" @click="postOnDashboard(h)"> Post </button>
                </div>
                <div id="otherFacts"></div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import $ from 'jquery'
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
            loggedIn: false,
            scrollable: true
        }
    },
    created() {
        if (localStorage.getItem('token') != null) {
            this.loggedIn = true;
        }

        var promises = []
        //Cat Facts
        promises.push(axios.get("http://localhost:3000/getFactsOf/cat"));
        //Dog Facts
        promises.push(axios.get("http://localhost:3000/getFactsOf/dog"));
        //Snail Facts
        promises.push(axios.get("http://localhost:3000/getFactsOf/snail"));
        //Horse Facts
        promises.push(axios.get("http://localhost:3000/getFactsOf/horse"));

        Promise.all(promises)
            .then(res => {
                this.factsCats = res[0].data; 
                this.factsDogs = res[1].data;
                this.factsSnail = res[2].data;
                this.factsHorse = res[3].data;
            })
            .catch(err => {
                this.error = "Sorry, something went wrong (" + err.message + ")"
            })
        
        window.addEventListener("scroll", this.handleScroll);
    },
    unmounted() {
        window.removeEventListener("scroll", this.handleScroll);
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
            .then(() => this.$router.push({ name: 'Dashboard' }))
            .catch(err => this.error = "Sorry, something went wrong (" + err.message + ")")
        }, 
        handleScroll() {
            if(this.scrollable) {
                this.scrollable = false;
                var type = "cat";
                if(this.typeOfFacts === 1) {
                    type = "dog";
                }else if ( this.typeOfFacts === 2) {
                    type = "snail";
                }else if(this.typeOfFacts === 3) {
                    type = "horse";
                }
                var scrollHeight = $(document).height();
                var scrollPosition = $(window).height() + $(window).scrollTop();
                if (scrollPosition + 280 >= scrollHeight) {
                    axios.get('http://localhost:3000/getFactsOf/' + type)
                    .then (facts => {
                        if (type === "cat") {
                            for(let i = 0; i < facts.data.length; i++) {
                                this.factsCats.push(facts.data[i]);
                            } 
                        } else if (type === "dog") {
                            for(let i = 0; i < facts.data.length; i++) {
                                this.factsDogs.push(facts.data[i]);
                            }
                        } else if (type === "snail") {
                            for(let i = 0; i < facts.data.length; i++) {
                                this.factsSnail.push(facts.data[i]);
                            }
                        } else {
                            for(let i = 0; i < facts.data.length; i++) {
                                this.factsHorse.push(facts.data[i]);
                            }
                        }
                    })
                    .catch(err => this.error = "Sorry, something went wrong (" + err.message + ")");
                }
                setTimeout(function(){
                    this.scrollable = true;
                }, 1000);
            }
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
