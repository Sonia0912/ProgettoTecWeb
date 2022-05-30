<template>
    <div class="pinkLeafBackground">
        <div class="title pink">Manage events</div>
        <div id="serverErrorManageEvent" class="serverError"></div>

        <div class="centeredGrid">
            <button id="addEvent">New event</button>
            <form id="newEventForm" action="http://localhost:3000/addEvent" method="post">
                <div id="colForm1">
                    <!-- Name -->
                    <div class="newEventField">Name:
                        <input type="text" name="name" id="newEventName" required />
                    </div>
                    <!-- Date -->
                    <div class="newEventField">Date:
                        <input type="text" readonly name="date" id="newEventDate" required />
                    </div>
                    <!-- Place -->
                    <div class="newEventField">Place:
                        <input type="text" name="place" id="newEventPlace" required />
                    </div>
                    <!-- Price -->
                    <div class="newEventField">Price:
                        <input type="number" min="0" max="1000" name="price" id="newEventPrice" required />
                    </div>
                </div>
                <div id="colForm2">
                    <!-- Description -->
                    <div class="newEventField">
                        <div>Description:</div>
                        <textarea id="descriptionEvent" name="description" placeholder="A description of this event..."
                            required></textarea>
                    </div>
                    <!-- Seats -->
                    <div class="newEventField">Seats:
                        <input type="number" min="0" max="1000" name="totSeat" id="newEventSeats" required />
                    </div>
                    <!-- Category -->
                    <div class="newEventField">
                        <div>Category:</div>
                        <select name="category" id="newEventCategory" required>
                            <option value="Festival">Festival</option>
                            <option value="Competition">Competition</option>
                            <option value="Show">Show</option>
                        </select>
                    </div>
                    <!-- Photo -->
                    <div class="newEventField eventPhotoField">
                        Photo URI:
                        <input type="text" name="photo" id="newEventPhoto" required />
                    </div>
                </div>
                <div id="newEventSubmit">
                    <div id="addEventError"></div>
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
                    <th>Booked Seat</th>
                    <th>Tot Seat</th>
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
export default {
    name: "manageAdoptions",
    created() {
        if (localStorage.getItem('token') === null || localStorage.getItem('isAdmin') === null) {
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
    }
}
</script>

<style scoped>
#addEventError {
    color: red;

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

@media screen and (max-width: 480px) {
    .modal-content {
        margin: 30% 10px 20% 10px;
    }
}
</style>