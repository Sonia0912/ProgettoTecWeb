<template>
    <div class="centeredGrid leafPattern">
        <div class="title" id="containerTop10Video">Top 10</div>
        <div class="subtitle">Here you can find the daily top 10 videos about animals on YouTube filtered by country.
        </div>
        <select v-model="country" @change="getTop10of($event)" id="countryVideo" required>
            <option value="IT">ITALY</option>
            <option value="US">USA</option>
            <option value="ES">SPAIN</option>
            <option value="GB">GREAT BRITAIN</option>
            <option value="FI">FINLAND</option>
        </select>
        <div v-for="(video, index) in videos" v-bind:value="video" :key="video.id" class="centeredGrid funnypets">
            <div v-if="video">
                <div class="numVideo">{{ index + 1 }}° {{ video.title }}</div>
                <iframe class="videoPet" :src="video.link" allowfullscreen></iframe>
                <div id="viewsVideo">{{video.view}}</div>
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
            videos: [],
            error: ''
        }
    },
    methods: {
        getTop10of(country) {
            this.videos = [];
            axios.get("https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=10&regionCode=" + country.target.value + "&videoCategoryId=15&alt=json&key=AIzaSyAC8x_AdVk02SwbCbFp5eLEQJ1OBg78AQE")
                .then(res => {
                    res.data.items.forEach(el => {
                        this.videos.push({
                            link: "https://www.youtube.com/embed/" + el.id,
                            title: el.snippet.title
                        });
                    })
                }).catch(error => {
                    this.error = "Sorry, something went wrong (" + error.status + ")";
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
                    this.videos.push({
                        link: "https://www.youtube.com/embed/" + el.id,
                        title: el.snippet.title, 
                        view: el.statistics.viewCount
                    });
                })
            })
    }
}
</script>