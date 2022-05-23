<template>
    <div class="pinkLeafBackground">
        <div class="title pink">Manage events</div>

        <div class="centeredGrid">
            <button @click="isHidden = !isHidden" id="addEvent">New event</button>
            <form  id="newEventForm" @submit="submit" action="http://localhost:3000/addEvent" method="post">
                <div id="colForm1">
                    <!-- Name -->
                    <div class="newEventField">Name:
                        <input type="text" name="name" id="newEventName" v-model="name" required />
                    </div>
                    <!-- Date -->
                    <div class="newEventField">Date:
                        <input type="date" name="date" id="newEventDate" v-model="date" required />
                    </div>
                    <!-- Place -->
                    <div class="newEventField">Place:
                        <input type="text" name="place" id="newEventPlace" v-model="place" required />
                    </div>
                    <!-- Price -->
                    <div class="newEventField">Price:
                        <input type="number" min="0" max="1000" name="price" id="newEventPrice" v-model="price" required />
                    </div>
                </div>
                <div id="colForm2">
                    <!-- Description -->
                    <div class="newEventField">
                        <div>Description:</div>
                        <textarea v-model="description" name="description" placeholder="A description of this event..." required></textarea>
                    </div>
                    <!-- Seats -->
                    <div class="newEventField">Seats:
                        <input type="number" min="0" max="1000" name="totSeat" id="newEventSeats" v-model="seats" required />
                    </div>
                    <!-- Category -->
                    <div class="newEventField">
                        <div>Category:</div>
                        <select v-model="category" name="category" id="newEventCategory" required>
                            <option value="Festival">Festival</option>
                            <option value="Competition">Competition</option>
                            <option value="Show">Show</option>
                        </select>
                    </div>
                    <!-- Photo -->
                    <div class="newEventField eventPhotoField">
                        <div>Photo:</div>
                        <input type="file" onchange="updatePhoto(this);" ref="myFiles" name="photoName" id="newEventPhoto" accept="image/png, image/jpeg" required />
                        <input v-model="photo" type="text" name="photo" id="srcPhoto" hidden />
                        <div id="errorNewEvent"></div>
                    </div>
                </div>
                <div id="newEventSubmit">
                    <button type="submit" id="addEventBtn">Add</button>
                </div>
            </form>
        </div>

        <table id="eventsList">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Place</th>
                    <th>Date</th>
                    <th></th>
                </tr>
            </thead>
            <tbody></tbody>
        </table>

        <!-- Modal -->
        <div id="modalDeleteEvent" class="modal">
            <span id="closeButton" class="close" title="Close Modal">&times;</span>
            <form class="modal-content">
                <div class="container">
                    <h1>Delete Event</h1>
                    <p>Are you sure you want to delete this event from the database?</p>
                    <div class="clearfix">
                        <button type="button" id="cancelButton" class="cancelbtn">Cancel</button>
                        <button type="button" id="confirmDeleteButton" class="deletebtn">Delete</button>
                    </div>
                </div>
            </form>
        </div>

    </div>
</template>

<script>
    export default{
        name: "manageAdoptions",
        data() {
            return {
                name: '',
                date: '',
                place: '',
                price: '',
                description: '',
                seats: '',
                category: '',
                photo: '',
                isHidden: true
            }
        },
        created() {
            if(localStorage.getItem('token') === null || localStorage.getItem('isAdmin') === null) {
                this.$router.push({
                    name: 'Login', 
                    params: { error: 'notadmin' }
                });
            }
        },
        mounted() {
            let Script = document.createElement("script");
            Script.setAttribute("src", "./js/manageEvents.js");
            document.head.appendChild(Script);
        },
        methods: {
            submit: function (event) {
                
                // if(this.name){
                //     // this.$router.push({
                //     //     name: 'Event'
                //     // });
                //     return true;
                // }
                
                 event.preventDefault();
                    
            }
        }
    }
</script>

<style scoped>
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

@media screen and (max-width: 480px) {
     .modal-content {
        margin: 30% 10px 20% 10px;
    }
}
</style>
