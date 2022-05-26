<template>
    <div class="centeredGrid pinkLeafBackground">
        <div class="title pink">Appointments</div>
        <div class="serverError">{{ error }}</div>

        <div id="appointmentTypes">
            <button @click="typeOfBooking = 0" :class="{active: typeOfBooking === 0 }">Visits</button>
            <button @click="typeOfBooking = 1" :class="{active: typeOfBooking === 1 }">Interviews</button>
        </div>

        <!-- Visits -->
        <div v-if="typeOfBooking === 0" id="listOfVisits"> 
            <div v-if="visits.length === 0" class="subtitle">There are no visits booked</div>
            <div v-for="visit in visits" :id="visit.id" :key="visit.id" class="visitItem"> 
                <div class="visitPet">{{visit.petName}}</div>
                <div class="visitShelter">{{visit.shelter}}</div>
                <div class="visitUsername">{{visit.username}}</div>
                <div class="visitDateContainer"> 
                    <span class="visitDay">{{visit.day}}</span>.
                    <span class="visitMonth">{{visit.month}}</span>.
                    <span class="visitYear">{{visit.year}}</span>
                    <span class="visitTime">{{visit.time}}</span>
                </div>
            </div>
        </div>

        <!-- Interviews -->
        <div v-if="typeOfBooking === 1" id="listOfInterviews">
            <div v-if="interviews.length === 0" class="subtitle">There are no interviews booked</div>
            <div v-for="iv in interviews" :id="iv.id" :key="iv.id" :class="{approved: iv.status === 'approved', rejected: iv.status === 'rejected'}" class="interviewItem"> 
                <div class="ivPosition">{{iv.position}}</div>
                <div class="ivShelter">{{iv.shelter}}</div>
                <div class="ivUsername">{{iv.username}}</div>
                <div class="ivDateContainer"> 
                    <span class="ivDate">{{iv.date}}</span>
                    <span class="ivTime">{{iv.time}}</span>
                </div>
                <div class="ivCv">{{iv.cv}}</div>
                <div v-if="iv.status === 'pending'" class="statusBtnContainer"> 
                    <button @click="changeStatus(iv.id, false)" class="rejectInterview">Reject</button>
                    <button @click="changeStatus(iv.id, true)" class="approveInterview">Approve</button>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: 'appointments',
        data() {
            return {
                typeOfBooking: 0,
                visits: [],
                interviews: [],
                error: ''
            }
        },
        created() {
            var promises = [];
            promises.push(axios.get('http://localhost:3000/getVisits'));
            promises.push(axios.get('http://localhost:3000/getInterviews'));
            Promise.all(promises)
            .then((results) => {
                this.visits = results[0].data;
                this.interviews = results[1].data;
            })
            .catch(err => this.error = "Sorry, something went wrong (" + err.status + ")");
        },
        methods: {
            changeStatus(id, accepted) {
                var status = accepted ? "approved" : "rejected";
                axios.put('http://localhost:3000/changeStatus/' + status + '/' + id)
                .then((res) => {
                    this.interviews = res.data;
                }
                )
                .catch(err => {this.error = "Sorry, something went wrong (" + err.message + ")"})
            }
        }
    }
</script>

<style scoped>

#appointmentTypes {
    margin: 0 auto;
}

#appointmentTypes button {
    padding: 8px 14px;
    margin: 10px;
    background-color: rgb(255, 255, 255, 0.3);
    color: #f43e99;
    border: 2px solid #f43e99;
    border-radius: 40px;
    letter-spacing: 2px;
}

.active {
    background-color: #f43e99 !important;
    color: white !important;
}

#listOfInterviews, #listOfVisits {
    padding-bottom: 30px;
}
.interviewItem.approved {
    background-color: #a0dbc9;
    border: 1px solid #86b3a6;
}
.interviewItem.rejected {
    background-color: #e3a1a8;
    border: 1px solid #c18a8f;
}
.interviewItem, .visitItem {
    border-radius: 10px;
    border: 1px solid #cdcdcd;
    background-color: white;
    padding: 10px;
    margin: 10px;
    min-width: 600px;
}
.ivShelter, .ivPosition, .visitPet, .visitShelter {
    font-weight: 600;
}
.ivShelter, .ivDateContainer, .ivCv, .visitShelter {
    margin-bottom: 10px;
}
.ivShelter, .visitShelter {
    padding-bottom: 5px;
    border-bottom: 1px solid #1b284d;
}
.ivDate, .visitYear {
    margin-right: 8px;
}
.statusBtnContainer {
    display: flex;
    justify-content: flex-end;
}
.approveInterview, .rejectInterview {
    margin-left: 10px;
    border-radius: 5px;
}
.approveInterview {
    background-color: #60cead;
}
.rejectInterview {
    background-color: #dc3545;
}
@media screen and (max-width: 850px) {
    .interviewItem, .visitItem {
        min-width: 500px;
    }
}
@media screen and (max-width: 650px) {
    .interviewItem, .visitItem {
        min-width: 400px;
    }
}
@media screen and (max-width: 480px) {
    .interviewItem, .visitItem {
        min-width: unset;
    }
}
</style>
