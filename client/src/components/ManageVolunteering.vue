<template>
    <div class="pinkLeafBackground"> 
        <div class="title pink">Manage volunteering</div>

        <!-- New volunteering position -->
        <div class="centeredGrid">
            <button id="addVol">New pet</button>
            <form id="newVolForm" action="http://localhost:3000/addVolunteering" method="post">
                <div id="colForm1">
                    <!-- Position -->
                    <div class="newVolField">
                        <div>Position:</div>
                        <select name="position" id="newVolPosition" required>
                            <option></option>
                            <option>Adoptions Concierge</option>
                            <option>Animal Care - Dogs</option>
                            <option>Animal Care - Cats</option>
                            <option>Dog PALs</option>
                            <option>Cat PALs</option>
                            <option>Wellness Clinic Assistant</option>
                            <option>Foster Program Support</option>
                        </select>
                    </div>
                    <!-- Shelter -->
                    <div class="newVolField">
                        <div>Shelter:</div>
                        <select name="shelter" id="newVolShelter" required>
                            <option></option>
                            <option value="King's Street, 30 - NY">King's Street, 30 - NY</option>
                            <option value="Park Avenue, 29 - NY">Park Avenue, 29 - NY</option>
                            <option value="Bay Avenue, 31 - NY">Bay Avenue, 31 - NY</option>
                        </select>
                    </div>
                    <!-- Requirements -->
                    <div class="newVolField">
                        <div id="volRequirementsTitle">Requirements:</div>
                        <input type="checkbox" id="req1" name="requirements" value="Must be 18yo">
                        <label for="req1"> Must be 18yo</label><br>
                        <input type="checkbox" id="req2" name="requirements" value="Positive attitude">
                        <label for="req2"> Positive attitude</label><br>
                        <input type="checkbox" id="req3" name="requirements" value="Communication skills">
                        <label for="req3"> Communication skills</label><br>
                        <input type="checkbox" id="req4" name="requirements" value="Good understanding of dogs">
                        <label for="req4"> Good understanding of dogs</label><br>
                        <input type="checkbox" id="req5" name="requirements" value="Good understanding of cats">
                        <label for="req5"> Good understanding of cats</label><br>
                        <input type="checkbox" id="req6" name="requirements" value="Medical experience">
                        <label for="req6"> Medical experience</label><br>
                        <input type="checkbox" id="req7" name="requirements" value="Good with childer">
                        <label for="req7"> Good with childer</label><br>
                        <input type="checkbox" id="req8" name="requirements" value="Ability to walk unaided on rough terrain">
                        <label for="req8"> Ability to walk unaided on rough terrain</label>
                    </div>
                    <div id="missingReq"></div>
                    <button type="submit" id="addVolBtn">Add</button>
                </div>
            </form>
        </div>

        <!-- Volunteering positions table -->
        <table id="volsList">
            <thead>
                <tr>
                    <th>Position</th>
                    <th>Shelter</th>
                    <th></th>
                </tr>
            </thead>
            <tbody></tbody>
        </table>

        <!-- Modal -->
        <div id="modalDeleteVolunteering" class="modal">
            <span id="closeButton" class="close" title="Close Modal">&times;</span>
            <form class="modal-content">
                <div class="container">
                    <h1>Delete Volunteering Position</h1>
                    <p>Are you sure you want to delete this volunteering position from the database?</p>
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
        name: "manageVolunteering",
        mounted() {
            let Script = document.createElement("script");
            Script.setAttribute("src", "./js/manageVolunteering.js");
            document.head.appendChild(Script);
        }
    }
</script>

<style scoped>
input, label {
    margin-bottom: 10px;
}

label {
    margin-left: 10px;
}

#volRequirementsTitle {
    margin-bottom: 10px;
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

@media screen and (max-width: 480px) {
     .modal-content {
        margin: 30% 10px 20% 10px;
    }
}
</style>