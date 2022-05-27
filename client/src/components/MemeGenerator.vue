<template>
    <div id="memeGenerator" class="wigglePattern"> 
        <div class="title">Meme Generator</div>
        <div class="serverError">{{error}}</div>
        <div class="subtitle">Build your own meme: write a joke or pick one and associate it with a random animal picture.</div>
        <div id="jokeContainer"> 
            <div>Your joke:</div>
            <textarea v-model="joke" />
            <button @click="getNewJoke">Get a random joke &raquo;</button>
        </div>
        <div id="picContainer">
            <img :src="pic">
            <button @click="getNewPic">Get a random picture &raquo;</button>
        </div>
        <div id="buttonsContainer"> 
            <button @click="generate">Generate Meme</button>
            <div>{{missingData}}</div>
            <div v-if="waiting">Please wait</div>
            <div id="memeContainer"> 
                <img :src="meme">
            </div>
            <button @click="postOnDashboard" id="postMemeBtn" v-if="postable">Post on your Dashboard</button>
            <a v-if="downloadable" :href="meme" download="meme">Download</a>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: "memeGenerator",
    data() {
        return {
            joke: '',
            pic: '',
            meme: '',
            waiting: false,
            postable: false,
            downloadable: false,
            missingData: '',
            error: ''
        }
    },
    mounted() {
        // Get first random picture
        axios.get('http://shibe.online/api/shibes?count=1&urls=true&httpsUrls=true')
        .then(res => this.pic = res.data[0])
        .catch(err => this.error = "Sorry, something went wrong (" + err.message + ")")
    },
    methods: {
        getNewJoke() {
            const options = {
                method: 'GET',
                url: 'https://jokeapi-v2.p.rapidapi.com/joke/pun',
                params: {type: 'single', format: 'json', blacklistFlags: 'nsfw,racist'},
                headers: {
                    'X-RapidAPI-Host': 'jokeapi-v2.p.rapidapi.com',
                    'X-RapidAPI-Key': '6d672cb995msh847ec9be56fb43ap1cee5bjsnf91df645befa'
                }
            };
            axios.request(options)
            .then(res => this.joke = res.data.joke)
            .catch(err => this.error = "Sorry, something went wrong (" + err.message + ")");
        },
        getNewPic() {
            axios.get('http://shibe.online/api/shibes?count=1&urls=true&httpsUrls=true')
            .then(res => this.pic = res.data[0])
            .catch(err => this.error = "Sorry, something went wrong (" + err.message + ")")
        },
        generate() {
            this.missingData = '';
            if(this.joke != '') {
                this.waiting = true;
                var data = {
                    topText: this.joke,
                    bottomText: "",
                    pic: this.pic
                }
                axios.post('http://localhost:3000/memegenerator', data)
                .then(res => { 
                    this.waiting = false;
                    this.downloadable = true;
                    this.meme = res.data.url
                    if(localStorage.getItem('token') != null) {
                        this.postable = true;
                    }
                })
                .catch(err => this.error = "Sorry, something went wrong (" + err.message + ")")   
            } else {
                this.missingData = "Write a joke to create the meme"
            }
        },
        postOnDashboard() {
            var data = {
                text: "Look at this meme:",
                img: this.meme
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
#memeGenerator {
    padding-bottom: 30px;
}

#jokeContainer {
    display: grid;
    justify-content: center;
    justify-items: center;
    margin: 20px 0px;
}

#jokeContainer textarea {
    border: unset;
    min-width: 400px;
    min-height: 100px;
    border-radius: 10px;
    margin: 10px 0px;
    padding: 15px
}

#jokeContainer button, #picContainer button {
    background-color: #0d6efd;
    color: white;
    border-radius: 5px;
    padding: 2px 10px;
}

#picContainer, #memeContainer {
    display: grid;
    justify-content: center;
    justify-items: center;
    margin: 10px 0px;
}

#picContainer img, #memeContainer img {
    object-fit: cover;
    margin: 10px 0px;
    max-width: 600px;
}

#buttonsContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
}

#buttonsContainer button {
    color: white;
    border-radius: 5px;
    margin: 10px 0px;
}

#buttonsContainer > button:first-child {
    background-color: #fd7e14;
    padding: 8px 10px;
}

#postMemeBtn {
    background-color: #1b284d;
    padding: 8px 10px;
}

@media screen and (max-width: 900px) {
    #picContainer img, #memeContainer img {
        max-width: 70vw;
    }
}

@media screen and (max-width: 750px) {
    #picContainer img, #memeContainer img {
        max-width: 90vw;
    }
    #jokeContainer textarea {
        min-width: 260px;
    }
}
</style>