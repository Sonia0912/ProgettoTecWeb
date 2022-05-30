<template>
    <div id="adoptionBooking" class="centeredGrid blueBackground">

        <div class="title">Book a visit with {{ $route.params.petName }}</div>
        <div id="serverErrorBookAdop" class="serverError">{{ error }}</div>

        <div class="summary">
            <img v-bind:src="photo">
            <div class="summaryInfoContainer">
                <div class="summaryInfo summaryName">{{ name }}</div>
                <div class="summaryInfo">
                    <span class="summaryAge">{{ age }}</span>
                    <span class="summaryGender">{{ gender }}</span>
                </div>
                <div class="summaryInfo summaryDescription">{{ description }}</div>
            </div>
        </div>

        <div class="bookingForm">
            <div class="formTitle">Pick a day and time within the next week:</div>
            <input type="text" id="visitDate" val="mm/dd/yyyy" readonly />
            <select name="time" id="visitTime"></select>
            <div class="formOpenings">* We're open from Monday to Friday, 13:00 - 17:00</div>
            <div id="dateUnavailable"></div>
            <div class="formTitle">Shelter:</div>
            <div class="formShelter">{{ shelter }}</div>
            <button @click="book()">Book</button>
        </div>

    </div>
</template>

<script>
import axios from 'axios'
import $ from 'jquery'
export default {
    name: "adoptionBooking",
    created() {
        if (localStorage.getItem('token') === null) {
            this.$router.push({
                name: 'Login',
                params: { error: 'unauthorized' }
            });
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
            border: "unset",
            error: ''
        }
    },
    mounted() {
        let Script = document.createElement("script");
        Script.setAttribute("src", "../../js/adoptionBooking.js");
        document.head.appendChild(Script);
        // Get the info of the selected pet
        axios.get('http://localhost:3000/infoPet/' + this.$route.params.petType + '/' + this.$route.params.petName)
            .then((res) => {
                this.age = res.data.age
                this.gender = res.data.gender
                this.photo = res.data.photo
                this.description = res.data.description
                this.shelter = res.data.shelter
            })
            .catch((err) => { this.error = "Sorry, something went wrong (" + err.message + ")" })
    },
    methods: {
        book() {
            if ($("#visitTime").val() && $("#visitDate").val()) {
                var data = {
                    username: localStorage.getItem('email'),
                    petName: this.name,
                    shelter: this.shelter,
                    photo: this.photo,
                    date: $("#visitDate").val(),
                    time: $("#visitTime").val()
                }
                var myRouter = this.$router;
                axios.post('http://localhost:3000/adoptionBook', data)
                    .then(() => {
                        $("#visitDate").val('');
                        $("#visitTime").empty();
                        myRouter.push({
                            name: 'MyBookings'
                        });
                    })
                    .catch((err) => { this.error = "Sorry, something went wrong (" + err.message + ")" });
            } else {
                alert("Please select a date and time")
            }
        }
    }
}
</script>

<style scoped>
#visitTime,
#visitDate {
    border: unset;
    padding: 8px;
    border-radius: 10px;
    margin-bottom: 10px;
}
</style>