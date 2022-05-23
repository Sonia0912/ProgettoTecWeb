<template>
    <div class="centeredGrid blueBackground"> 
        <div class="title">Volunteering</div>
        <div class="serverError" id="serverErrorVol">{{ error }}</div>

        <div id="viewVolunteering"> 
            <!-- Job position -->
            <div class="titleVol">Position:</div>
            <select id="jobPosition"><option></option></select>
            <!-- Shelter -->
            <div class="titleVol">Shelter:</div>
            <select id="jobShelter"><option></option></select>
            <!-- Requirements -->
            <div class="titleVol">Requirements:</div>
            <ul id="requirements"></ul>
            <button id="jobBook">Book</button> 
        </div>

        <div id="bookVolunteering">
            <!-- Form -->
            <div class="titleVol">CV:</div>
            <textarea id="cv" placeholder="Tell us something about yourself..."></textarea>
            <!-- Day and time -->
            <div class="titleVol">Pick a day and time for the interview:</div>
            <!-- <input type="date"> -->
            <input type="text" id="txtDate" />
            <select name="from" id="from">
                <option value="1">09:00</option>
                <option value="2">10:00</option>
                <option value="3">11:00</option>
                <option value="4">12:00</option>
            </select>
            <!-- Submit button -->
            <div id="formNotCompleted"></div>
            <button id="jobSubmit">Submit</button>       
        </div>
    </div>
</template>

<script>
/*     import Datepicker from '@vuepic/vue-datepicker';
    import '@vuepic/vue-datepicker/dist/main.css'; */
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
            if(localStorage.getItem('token') === null) {
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
        }
    }
</script>
