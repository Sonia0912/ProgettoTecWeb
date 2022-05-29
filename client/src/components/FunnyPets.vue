<template>
    <div class="centeredGrid leafPattern">
        <div class="centeredGrid funnypets">
            <div class="title">Funny cats</div>
            <div id="serverErrorCats" class="serverError"></div>
            <img id="funcat">
            <div> 
                <button class="postBtn" @click="postOnDashboradCat()"  v-if="postable">Post</button>
                <button id="anotherFuncat">Next one</button>
            </div>
        </div>
        <div class="centeredGrid funnypets">
            <div class="title">Funny dogs</div>
            <div id="serverErrorDogs" class="serverError"></div>
            <img id="fundog">
            <div> 
                <button class="postBtn" @click="postOnDashboradDog()"  v-if="postable">Post</button>   
                <button id="anotherFundog">Next one</button> 
            </div>
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
.funnypets {
    justify-items: center;
}

.funnypets img {
    max-height: 300px;
    margin: 0 auto 20px auto;
}

#anotherFuncat, #anotherFundog {
    width: fit-content;
    padding: 8px;
    margin: 0px auto;
    background-color: #fd7e14;
    border-radius: 10px;
    color: white;
}

#anotherFuncat:hover, #anotherFundog:hover {
    background-color: #fb9746;
}

.postBtn {
    margin-top: 10px;
    background-color: #1b284d;
    color: white;
    width: fit-content;
    padding: 8px;
    margin: 0px auto;
    color: white;
    border-radius: 10px;
    margin-right: 10px;
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