<template>
    <div class="centeredGrid blueCurtainBackground">
        <div class="title">My bookings</div>
        <div class="serverError">{{ error }}</div>
        <div id="bookingTypes">
            <button @click="typeOfBooking = 0" id="visitsType" :class="{ active: typeOfBooking === 0 }">Visits</button>
            <button @click="typeOfBooking = 1" id="eventsType" :class="{ active: typeOfBooking === 1 }">Events</button>
            <button @click="typeOfBooking = 2" id="interviewsType"
                :class="{ active: typeOfBooking === 2 }">Interviews</button>
        </div>

        <!-- Visits -->
        <div v-if="typeOfBooking === 0" id="myVisits">
            <div v-if="visits.length === 0" class="subtitle">You haven't booked any visit yet</div>
            <div class="summary visitSummary" v-for="(info, index) in visits" :id="info.id" :key="info.petName">
                <img v-bind:src="info.photo">
                <div class="summaryInfoContainer">
                    <div class="summaryInfo summaryName">{{ info.petName }}</div>
                    <div class="summaryInfo">
                        <span>{{ info.date }}</span>
                    </div>
                    <div class="summaryInfo">{{ info.time }}</div>
                    <div class="summaryInfo">{{ info.shelter }}</div>
                </div>
                <div class="deleteVisitContainer">
                    <button @click="askToDelete(info.id, index)" class="deleteVisitBtn">&#10006;</button>
                </div>
            </div>
        </div>

        <!-- Events -->

        <div v-if="typeOfBooking === 1" id="myEvents">
            <div v-if="events.length === 0" class="subtitle">You haven't booked any event yet</div>
            <div class="eventItem" v-for="info in events" :id="info.name" :key="info.userEmail">
                <figure class="figureEvent" v-if="info.photo">
                    <span id="nameEvent">{{ info.nameEvent }}</span>
                    <router-link to="/events"> <img :src="info.photo" class="imgEvent"> </router-link>
                </figure>
                <div class="EventInfoContainer">
                    <div class="evDate">{{ info.dateEvent }}</div>
                    <div class="evPlace">{{ info.placeEvent }}</div>
                    <div class="descriptionEvent">{{ info.descriptionEvent }}</div>
                </div>
            </div>
        </div>


        <!-- Interviews -->
        <div v-if="typeOfBooking === 2" id="myInterviews">
            <div v-if="interviews.length === 0" class="subtitle">You haven't booked any interview yet</div>
            <div v-for="iv in interviews" :id="iv.id" :key="iv.id"
                :class="{ approved: iv.status === 'approved', rejected: iv.status === 'rejected' }" class="interviewItem">
                <div class="ivStatus">Status: {{ iv.status }}</div>
                <div class="ivPosition">{{ iv.position }}</div>
                <div class="ivShelter">{{ iv.shelter }}</div>
                <div class="ivUsername">{{ iv.username }}</div>
                <div class="ivDateContainer">
                    <span class="ivDate">{{ iv.date }}</span>
                    <span class="ivTime">{{ iv.time }}</span>
                </div>
                <div class="ivCv">{{ iv.cv }}</div>
            </div>
        </div>

        <!-- Modal -->
        <div id="deleteBookingModal" class="modal">
            <span onclick="document.getElementById('deleteBookingModal').style.display='none'" id="closeButton"
                class="close" title="Close Modal">&times;</span>
            <form class="modal-content">
                <div class="container">
                    <h1>Delete Booking</h1>
                    <p>Are you sure you want to delete this booking?</p>
                    <div class="clearfix">
                        <button type="button" id="cancelButton" class="cancelbtn"
                            onclick="document.getElementById('deleteBookingModal').style.display='none'">Cancel</button>
                        <button type="button" id="confirmDeleteButton" class="deletebtn"
                            @click="deleteVisit">Delete</button>
                    </div>
                </div>
            </form>
        </div>

    </div>
</template>

<script>
import $ from 'jquery'
import axios from 'axios'
export default {
    name: "myBookings",
    created() {
        if (localStorage.getItem('token') === null) {
            this.$router.push("login")
        }
    },
    data() {
        return {
            typeOfBooking: 0,
            visits: [],
            events: [],
            interviews: [],
            visitToDelete: '',
            currentIndex: null,
            error: ''
        }
    },
    mounted() {
        var promises = [];
        var loggedEmail = localStorage.getItem('email');
        promises.push($.ajax({ url: 'http://localhost:3000/myvisits/' + loggedEmail, method: 'GET' }));
        promises.push($.ajax({ url: 'http://localhost:3000/myinterviews/' + loggedEmail, method: 'GET' }));
        promises.push($.ajax({ url: 'http://localhost:3000/myevents/' + loggedEmail, method: 'GET' }));
        Promise.all(promises)
            .then((results) => {
                this.visits = results[0];
                this.interviews = results[1];
                this.events = results[2];
            })
            .catch(err => this.error = "Sorry, something went wrong (" + err.status + ")");
    },
    methods: {
        askToDelete(id, index) {
            this.visitToDelete = id;
            this.currentIndex = index;
            $("#deleteBookingModal").show();
        },
        async deleteVisit() {
            await axios.delete('http://localhost:3000/deleteBooking/' + this.visitToDelete)
                .then(() => {
                    this.visitToDelete = '';
                    $("#deleteBookingModal").hide();
                    this.visits.splice(this.currentIndex, 1);
                })
                .catch(err => {
                    this.visitToDelete = '';
                    $("#deleteBookingModal").hide();
                    console.log(err)
                    this.error = "Sorry, something went wrong (" + err.message + ")"
                })
        }
    }
}
</script>

<style scoped>
#bookingTypes {
    margin: 0 auto;
}

#bookingTypes button {
    padding: 8px 14px;
    margin: 10px;
    background-color: rgb(255, 255, 255, 0.3);
    color: #60cead;
    border: 2px solid #60cead;
    border-radius: 40px;
    letter-spacing: 2px;
}

.active {
    background-color: #60cead !important;
    color: white !important;
}

.cancelbtn,
.deletebtn {
    float: left;
    width: 30%;
    border-radius: 10px;
    padding: 10px 0px;
}

.cancelbtn {
    background-color: #ccc;
    color: black;
    margin-left: 10%;
}

.deletebtn {
    background-color: #dc3545;
    color: white;
    float: right;
    margin-right: 10%;
}

.deleteVisitBtn {
    background-color: #dc3545;
    color: white;
    border-radius: 5px;
    padding: 3px 8px;
    float: right;
}

.deleteVisitContainer {
    flex-grow: 2;
}

.container {
    padding: 16px;
    text-align: center;
}

/* The Modal (background) */
.modal {
    display: none;
    /* Hidden by default */
    position: fixed;
    /* Stay in place */
    z-index: 1;
    /* Sit on top */
    left: 0;
    top: 0;
    width: 100%;
    /* Full width */
    height: 100%;
    /* Full height */
    overflow: auto;
    /* Enable scroll if needed */
    background-color: rgba(26, 26, 43, 0.5);
    padding-top: 50px;
}

/* Modal Content/Box */
.modal-content {
    background-color: #fefefe;
    margin: 5% auto 15% auto;
    /* 5% from the top, 15% from the bottom and centered */
    border: 1px solid #888;
    width: fit-content;
    /* Could be more or less, depending on screen size */
}

/* The Modal Close Button (x) */
.close {
    position: absolute;
    right: 35px;
    top: 15px;
    font-size: 40px;
    font-weight: bold;
    color: #f1f1f1;
}

.close:hover,
.close:focus {
    color: #f44336;
    cursor: pointer;
}

/* Clear floats */
.clearfix::after {
    content: "";
    clear: both;
    display: table;
}

.interviewItem.approved {
    background-color: #a0dbc9;
}

.interviewItem.rejected {
    background-color: #e3a1a8;
}

.interviewItem,
.eventItem {
    border-radius: 10px;
    background-color: white;
    padding: 10px;
    margin: 10px;
}

.ivShelter,
.ivPosition,
.ivStatus,
.evDate,
.evPlace {
    font-weight: 600;
}

.ivShelter,
.ivDateContainer,
.ivCv {
    margin-bottom: 10px;
}

.ivShelter,
.evPlace {
    padding-bottom: 5px;
    border-bottom: 1px solid #1b284d;
}

.ivDate {
    margin-right: 5px;
}

.statusBtnContainer {
    display: flex;
    justify-content: flex-end;
}

.approveInterview,
.rejectInterview {
    margin-left: 10px;
    border-radius: 5px;
}

.approveInterview {
    background-color: #60cead;
}

.rejectInterview {
    background-color: #dc3545;
}

@media screen and (max-width: 310px) {
    .modal-content {
        margin: 30% 10px 20% 10px;
    }
}

@media screen and (max-width: 480px) {
    #bookingTypes button {
        font-size: 14px;
        padding: 6px 10px;
        margin: 8px;
        letter-spacing: 1px;
    }
}
</style>