<template>
    <div class="centeredGrid blueBackground">
        <div class="title">Volunteering</div>
        <div class="serverError" id="serverErrorVol">{{ error }}</div>

        <div id="viewVolunteering" class="verticalForm">
            <!-- Job position -->
            <div class="titleVol">Position:</div>
            <select id="jobPosition">
                <option></option>
            </select>
            <!-- Shelter -->
            <div class="titleVol">Shelter:</div>
            <select id="jobShelter">
                <option></option>
            </select>
            <!-- Requirements -->
            <div class="titleVol">Requirements:</div>
            <ul id="requirements"></ul>
            <!-- Book button -->
            <div id="positionNotSelected"></div>
            <button id="jobBook">Book</button>
        </div>

        <div id="bookVolunteering" class="verticalForm">
            <!-- Form -->
            <div class="titleVol">CV:</div>
            <textarea id="cv" placeholder="Tell us something about yourself..."></textarea>
            <!-- Day and time -->
            <div class="titleVol">Day and time of the interview:</div>
            <input type="text" id="txtDate" placeholder="mm/dd/yyyy" readonly />
            <select name="time" id="interviewTime"></select>
            <div id="dateUnavailable"></div>
            <!-- Submit button -->
            <div id="formNotCompleted"></div>
            <button @click="goToBookings" id="jobSubmit">Submit</button>
        </div>
    </div>
</template>

<script>
import $ from 'jquery'
import axios from 'axios'
export default {
    data() {
        return {
            name: "volunteering",
            positions: [],
            requirements: [],
            error: ''
        }
    },
    created() {
        if (localStorage.getItem('token') === null) {
            this.$router.push({
                name: 'Login',
                params: { error: 'unauthorized' }
            });
        }
    },
    mounted() {
        let Script = document.createElement("script");
        Script.setAttribute("src", "./js/volunteering.js");
        document.head.appendChild(Script);
    },
    methods: {
        goToBookings() {
            if ($('#jobPosition').val() && $('#jobShelter').val() && $('#cv').val() && $("#txtDate").val() && $("#interviewTime").val()) {
                let interview = {
                    position: $('#jobPosition').val(),
                    shelter: $('#jobShelter').val(),
                    cv: $('#cv').val(),
                    date: $("#txtDate").val(),
                    time: $("#interviewTime").val()
                }
                axios.post('http://localhost:3000/addInterview', interview, {
                    headers: {
                        token: localStorage.getItem('token')
                    }
                })
                    .then(() => {
                        $("#jobPosition").empty();
                        $("#jobShelter").empty();
                        $("#requirements").empty();
                        $("#positionNotSelected").empty();
                        $("#cv").val('');
                        $("#txtDate").val('');
                        $("#interviewTime").empty();
                        $("#formNotCompleted").empty();
                        this.$router.push({
                            name: 'MyBookings',
                        });
                    })
                    .catch(err => { $("#serverErrorVol").html("Sorry something went wrong (" + err + ")") })
            } else {
                $("#formNotCompleted").html("Please fill in all the fields");
            }
        }
    }
}
</script>
