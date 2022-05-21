<template>
    <div id="adoptionBooking" class="centeredGrid blueBackground">

        <div class="title">Book a visit with {{ $route.params.petName }}</div>
        
        <div class="summary">
            <img v-bind:src="photo">
            <div class="summaryInfoContainer">
                <div class="summaryInfo summaryName">{{name}}</div>
                <div class="summaryInfo">
                    <span class="summaryAge">{{age}}</span>
                    <span class="summaryGender">{{gender}}</span>
                </div>
                <div class="summaryInfo summaryDescription">{{description}}</div> 
            </div>
        </div>

        <div class="bookingForm">
            <div class="formTitle">Pick a day and time within the next week:</div>
            <Datepicker v-model="date" placeholder="Select a date" :minDate="minDate" :maxDate="maxDate" :disabledWeekDays="[6, 0]" :disabledDates="disabledDates"
            :minTime="{ hours: 9 }" :maxTime="{ hours: 16, minutes: 30 }"
            required preventMinMaxNavigation></Datepicker>
            <div class="formOpenings">* We're open from Monday to Friday, 9:00 - 16:30</div>
            <div class="formTitle">Shelter:</div>
            <div class="formShelter">{{shelter}}</div>
            <button @click="book()">Book</button>
        </div>

    </div>
</template>

<script>
    import axios from 'axios'
    import Datepicker from '@vuepic/vue-datepicker';
    import '@vuepic/vue-datepicker/dist/main.css'
    import { ref } from 'vue';
    export default {
        name: "adoptionBooking",
        components: { Datepicker },
        created() {
            if(localStorage.getItem('token') === null) {
                    this.$router.push({
                        name: 'Login', 
                        params: { error: 'unauthorized' }
                    });
            }
        },
        setup() {
            // dates to disable by default
            const date = ref();
            const minDate = ref(new Date());     
            const maxDate = ref(new Date().setDate(new Date().getDate() + 7)); 
            const today = new Date();
            var disabledDates = [today];
            return {
                date,
                minDate,
                maxDate,
                disabledDates
            }
        },
        data() {
            return {
                type: this.$route.params.petType,
                name: this.$route.params.petName,
                age: -1,
                gender: '',
                photo: '',
                description: '',
                shelter: '',
                border: "unset"
            }
        },
        mounted() {
            axios.get('http://localhost:3000/infoPet/' + this.$route.params.petType + '/' +  this.$route.params.petName)
            .then((res) => {
                this.age = res.data.age
                this.gender = res.data.gender
                this.photo = res.data.photo
                this.description = res.data.description
                this.shelter = res.data.shelter
            })
            .catch((e) => { console.log(e) })
            // get dates with more than 5 bookings for that pet
            var fullDates = [];
            axios.get('http://localhost:3000/fullDates/' + this.$route.params.petName)
            .then((res) => {
                // disable those dates
                for(let i = 0; i < res.data.length; i++) {
                    fullDates.push(new Date(new Date().setMonth((res.data[i].month - 1), res.data[i].day)));
                }
            })
            .catch((e) => { console.log(e) })
            this.disabledDates = fullDates;
        },
        methods: {
            book() {
                if(this.date != null) {
                    const day = this.date.getDate(); 
                    const month = this.date.getMonth() + 1;
                    const year = this.date.getFullYear();
                    const hour = this.date.getHours();
                    const minute = this.date.getMinutes();
                    const selectedTime = `${hour}:${minute}`;  

                    const options = {
                        method: 'post',
                        url: 'http://localhost:3000/adoptionBook',
                        data: {
                            username: localStorage.getItem('email'),
                            petName: this.name,
                            shelter: this.shelter,
                            photo: this.photo,
                            day: day,
                            month: month,
                            year: year,
                            time: selectedTime
                        },
                    };
                    axios(options);
                    this.$router.push({
                        name: 'MyBookings'
                    });
                } else {
                    alert("Please select a date")
                }
            }
        }
    }
</script>