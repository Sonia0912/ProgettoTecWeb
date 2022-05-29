<template>
    <div class="centeredGrid leafPattern">
        <div class="centeredGrid funnypets">
            <div class="title">Funny cats</div>
            <div id="serverErrorCats" class="serverError"></div>
            <img id="funcat">
            <button id="anotherFuncat">Next one</button>
            <button class="postBtn" id="postCatBtn" @click="postOnDashboradCat()"  v-if="postable">Post</button>
        </div>
        <div class="centeredGrid funnypets">
            <div class="title">Funny dogs</div>
            <div id="serverErrorDogs" class="serverError"></div>
            <img id="fundog">
            <button id="anotherFundog">Next one</button>
            <button class="postBtn" id="postDogBtn" @click="postOnDashboradDog()"  v-if="postable">Post</button>
        </div>
    </div>
</template>


<script>
import axios from 'axios';
import $ from 'jquery';
export default {
    name: "funnyPets",
    mounted() {
        let Script = document.createElement("script");
        Script.setAttribute("src", "./js/funnypets.js");
        document.head.appendChild(Script);

        if(localStorage.getItem('token')!= null){
            this.postable = true;
        }
    },
    data(){
        return{
            text: "Look at this fun ",
            image: '',
            postable: false
        }
    },
    methods: {
        postOnDashboradCat() {
          var data={
            text: this.text + 'cat',
            img: $('#funcat').attr('src')
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
        },
        postOnDashboradDog() {
          var data={
            text: this.text + 'dog',
            img: $('#fundog').attr('src')
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
.funnypets img {
    max-height: 300px;
    margin: 0 auto 20px auto;
}

.funnypets button {
    width: fit-content;
    padding: 10px;
    margin: 0px auto;
    background-color: #fd7e14;
    border-radius: 10px;
    color: white;
}

.funnypets button:hover {
    background-color: #fb9746;
}

@media screen and (max-width: 480px) {
    .funnypets img {
        max-width: 320px;
    }
}

@media screen and (max-width: 350px) {
    .funnypets img {
        max-width: 270px;
    }
}
</style>