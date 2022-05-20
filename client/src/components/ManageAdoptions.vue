<template>
    <div class="pinkBackground">
        <div class="title pink">Manage adoptions</div>

        <div class="centeredGrid">
            <button @click="isHidden = !isHidden" id="addPet">New pet</button>
            <form v-if="!isHidden" id="newPetForm" @submit="submit" action="http://localhost:3000/addPet" method="post">
                <div id="colForm1">
                    <!-- Name -->
                    <div class="newPetField">Name:
                        <input type="text" name="name" id="newPetName" v-model="name" required />
                    </div>
                    <!-- Age -->
                    <div class="newPetField">Age:
                        <input type="number" name="age" id="newPetAge" v-model="age" required />
                    </div>
                    <!-- Shelter -->
                    <div class="newPetField">
                        <div>Shelter:</div>
                        <select v-model="shelter" name="shelter" id="newPetShelter" required>
                            <option value="King's Street, 30 - NY">King's Street, 30 - NY</option>
                            <option value="Park Avenue, 29 - NY">Park Avenue, 29 - NY</option>
                            <option value="Bay Avenue, 31 - NY">Bay Avenue, 31 - NY</option>
                        </select>
                    </div>
                    <!-- Description -->
                    <div class="newPetField">
                        <div>Description:</div>
                        <textarea v-model="description" name="description" placeholder="A description of this pet..." required></textarea>
                    </div>
                </div>
                <div id="colForm2">
                    <!-- Type -->
                    <div class="newPetField">
                        <div>Type:</div>
                        <input type="radio" name="type" id="dog" value="dog" v-model="type" />
                        <label for="dog">Dog</label><br />
                        <input type="radio" name="type" id="cat" value="cat" v-model="type" />
                        <label for="cat">Cat</label>
                    </div>
                    <!-- Gender -->
                    <div class="newPetField">
                        <div>Gender:</div>
                        <input type="radio" name="gender" id="female" value="female" v-model="gender" />
                        <label for="female">Female</label><br />
                        <input type="radio" name="gender" id="male" value="male" v-model="gender" />
                        <label for="male">Male</label>
                    </div>
                </div>
                <!-- Photo -->
                <div class="newPetField petPhotoField">
                    <div>Photo:</div>
                    <input type="file" onchange="updatePhoto(this);" ref="myFiles" name="photoName" id="newPetPhoto" accept="image/png, image/jpeg" required />
                    <input v-model="photo" type="text" name="photo" id="srcPhoto" hidden />
                    <div id="errorNewPet"></div>
                </div>
                <div id="newPetSubmit">
                    <button type="submit" id="addPetBtn">Add</button>
                </div>
            </form>
        </div>

        <table id="petsList">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Type</th>
                    <th>Shelter</th>
                    <th></th>
                </tr>
            </thead>
            <tbody></tbody>
        </table>

        <!-- Modal -->
        <div id="modalDeletePet" class="modal">
            <span id="closeButton" class="close" title="Close Modal">&times;</span>
            <form class="modal-content">
                <div class="container">
                    <h1>Delete Pet</h1>
                    <p>Are you sure you want to delete this pet from the database?</p>
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
                age: '',
                gender: 'female',
                shelter: '',
                type: 'dog',
                description: '',
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
            Script.setAttribute("src", "./js/manageAdoptions.js");
            document.head.appendChild(Script);
        },
        methods: {
            submit: function (event) {
                if (this.name && this.age && this.gender && this.shelter && this.type) {
                    this.$router.push({
                        name: 'Adoption'
                    });
                    return true;
                }
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
