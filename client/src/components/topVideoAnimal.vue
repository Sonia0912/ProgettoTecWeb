<template>
    <div class="centeredGrid leafPattern">
        <div class="title" id="containerTop10Video">TOP 10</div>
 
            <select v-model="country" @change="getTop10of($event)" id="countryVideo" required>
                <option value="IT">ITALY </option>
                <option value="US">USA</option>
                <option value="ES">SPAIN</option>
                <option value="GB">GB</option>
                <option value="FI">FILAND</option>
            </select>

            <span class="fi fi-gr"></span> <span class="fi fi-gr fis"></span>
      

        <div v-for="(video, index) in videos" v-bind:value="video" class="centeredGrid funnypets">
            <div v-if="video">
                <div id="numVideo">{{ index + 1 }}°</div>
                <iframe id="videoPet"  :src="video" allowfullscreen></iframe>
            </div>
        </div>
    </div>
</template>


<script>
import axios from 'axios'
export default {
    name: "TopVideoAnimal",
    data() {
        return {
            videos: []
        }
    },
    methods: {
        getTop10of(country) {

            this.videos = [];
            axios.get("https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=10&regionCode=" + country.target.value + "&videoCategoryId=15&alt=json&key=AIzaSyAC8x_AdVk02SwbCbFp5eLEQJ1OBg78AQE")
                .then(res => {

                    res.data.items.forEach(el => {
                        this.videos.push("https://www.youtube.com/embed/" + el.id);
                    })

                })

        }
    },
    mounted() {
        let Script = document.createElement("script");
        Script.setAttribute("src", "./js/topvideoanimal.js");
        document.head.appendChild(Script);
        axios.get("https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=10&regionCode=" + "IT" + "&videoCategoryId=15&alt=json&key=AIzaSyAC8x_AdVk02SwbCbFp5eLEQJ1OBg78AQE")
            .then(res => {
                res.data.items.forEach(el => {
                    this.videos.push("https://www.youtube.com/embed/" + el.id);
                })
            })


    }
}
</script>