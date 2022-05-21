<template>
    <div class="centeredGrid blueCurtainBackground">
        <div class="title">My bookings</div>
        <div class="serverError">{{ error }}</div>
        <div id="bookingTypes">
            <button @click="typeOfBooking = 0" id="visitsType" :class="{active: typeOfBooking === 0 }">Visits</button>
            <button @click="typeOfBooking = 1" id="eventsType" :class="{active: typeOfBooking === 1 }">Events</button>
            <button @click="typeOfBooking = 2" id="interviewsType" :class="{active: typeOfBooking === 2 }">Interviews</button>
        </div>
        <div v-if="typeOfBooking === 0" id="myVisits">
            <div v-if="visits.length === 0" class="subtitle">You haven't booked any visit yet</div>
            <div class="summary visitSummary" v-for="(info, index) in visits" @click="askToDelete(info.id, index)" :id="info.id" :key="info.petName">
                <img v-bind:src="info.photo">
                <div class="summaryInfoContainer">
                    <div class="summaryInfo summaryName">{{info.petName}}</div>
                    <div class="summaryInfo">
                        <span>{{info.day}}</span>
                        <span>{{info.month}}</span>
                        <span>{{info.year}}</span>
                    </div>
                    <div class="summaryInfo">{{info.time}}</div> 
                    <div class="summaryInfo">{{info.shelter}}</div> 
                </div>
            </div>
        </div>
        <div v-if="typeOfBooking === 1" id="myEvents">event</div>
        <div v-if="typeOfBooking === 2" id="myInterviews">interview</div>

        <!-- Modal -->
        <div id="deleteBookingModal" class="modal">
            <span onclick="document.getElementById('deleteBookingModal').style.display='none'" id="closeButton" class="close" title="Close Modal">&times;</span>
            <form class="modal-content">
                <div class="container">
                    <h1>Delete Booking</h1>
                    <p>Do you want to delete this booking?</p>
                    <div class="clearfix">
                        <button type="button" id="cancelButton" class="cancelbtn" onclick="document.getElementById('deleteBookingModal').style.display='none'">Cancel</button>
                        <button type="button" id="confirmDeleteButton" class="deletebtn" @click="deleteVisit">Delete</button>
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
            promises.push($.ajax({url: 'http://localhost:3000/myvisits/' + loggedEmail, method: 'GET'}));
/*                 promises.push($.ajax({url: 'http://localhost:3000/myevents/' + loggedEmail, method: 'GET'}));
            promises.push($.ajax({url: 'http://localhost:3000/myinterviews/' + loggedEmail, method: 'GET'})); */
            Promise.all(promises)
            .then((results) => {
                this.visits = results[0];
/*                     this.events = results[1];
                this.interviews = results[2]; */
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

.summary {
    cursor: pointer;
}

.cancelbtn, .deletebtn {
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

.container {
  padding: 16px;
  text-align: center;
}

/* The Modal (background) */
.modal {
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgba(26, 26, 43, 0.5);
  padding-top: 50px;
}

/* Modal Content/Box */
.modal-content {
  background-color: #fefefe;
  margin: 5% auto 15% auto; /* 5% from the top, 15% from the bottom and centered */
  border: 1px solid #888;
  width: fit-content; /* Could be more or less, depending on screen size */
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