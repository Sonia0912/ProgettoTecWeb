<template>
    <div class="centeredGrid leafPattern">
        <div class="title" id="containerTop10Video">Top 10</div>
        <div>{{error}}</div>
        <div class="subtitle">Here you can find the daily top 10 videos about animals on YouTube filtered by country.</div>
        <select @change="getTop10of($event)" id="countryVideo" required>
            <option value="IT">ITALY</option>
            <option value="US">USA</option>
            <option value="ES">SPAIN</option>
            <option value="GB">GREAT BRITAIN</option>
            <option value="FI">FINLAND</option>
            <option value="JP">JAPAN</option>
            <option value="AZ">AZERBAGIAN</option>
            <option value="PH">PHILIPPINES</option>
            <option value="MA">MOROCCO</option>
        </select>
        <div class="centeredGrid topTen"> 
            <div v-for="(video, index) in videos" v-bind:value="video" :key="video.id" class="funnyVideo">
                <div class="titleVideo"><span class="number">#{{ index + 1 }} </span> {{ video.title }}</div>
                <div>
                    <iframe class="videoPet" :src="video.link" allowfullscreen></iframe>
                    <div class="viewsVideo"><img src="../../public/icons/views.png">{{video.view}}</div>
                </div>
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
                            title: el.snippet.title,
                            view: el.statistics.viewCount
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
            }).catch(error => {
                    this.error = "Sorry, something went wrong (" + error.status + ")";
                })
    }
}
</script>

<style scoped>
.centeredGrid.topTen {
    max-width: 600px;
    justify-items: center;
    margin: 0 auto;
}

.funnyVideo {
    display: grid;
    justify-items: center;
    margin-bottom: 30px;
}

#countryVideo{
     border-radius: 10px;
     position: relative;
     max-width: 20vw;
     margin: 20px auto;
     border: unset;
     height: 35px;
     min-width: 200px;
     padding: 5px;
}

.number {
    font-weight: 900;
  transform: scaleY(1.5);
}

.videoPet{
    border-radius: 10px;
    width: 500px;
    height: 300px;
}

.titleVideo{
     justify-content: center;
     margin: 10px;
     padding: 5px;
     font-size: 25px;
     font-weight: 600;
}

.viewsVideo {
    font-size: 23px;
    justify-self: start;
}

.topTen img {
    height: 25px;
    margin-right: 5px;
}

@media  screen and (max-width: 520px) {
    .titleVideo{
        font-size: 20px;
    }
    .viewsVideo {
        font-size: 18px;
    }
    .videoPet{     
        width: 300px;
        height: 200px;
    }
}

@media  screen and (max-width: 320px) {
    .videoPet{     
        width: 260px;
        height: 150px;
    }
}
</style>