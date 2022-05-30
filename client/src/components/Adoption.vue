<template>
    <div class="blueBackground">
        <div class="title">Find your pet</div>
        <div id="serverErrorAdop" class="serverError"></div>
        <div class="subtitle">At AnimalHouse we care about our pets' well being. If you intend to adopt one of our pets,
            please book an appoiment within the next week.</div>
        <div class="centeredGrid">
            <div class="filter">
                <div class="vh-center">
                    <button class="activeBtn" id="filterDog">Dogs</button>
                    <button id="filterCat">Cats</button>
                </div>
            </div>

            <div class="advFilter">
                <div class="relativeContainer">
                    <div class="vh-center">
                        <button id="advancedFilterBtn">Advanced filters</button>
                    </div>
                </div>
                <div class="relativeContainerHeight">
                    <div class="vh-center">
                        <div id="advancedFilters">
                            <div class="filterSection">
                                <input type="checkbox" id="female" name="female" value="f" checked>
                                <label for="famle"> Female</label><br>
                                <input type="checkbox" id="male" name="male" value="m" checked>
                                <label for="male"> Male</label><br>
                            </div>
                            <div class="filterSection">
                                <p>
                                    <label for="age">Age range:</label>
                                    <input type="text" id="age" readonly>
                                </p>
                                <div id="slider-range"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="pets">
                <div class="dogItemContainer" v-for="(dog, index) in dogs" v-bind:id="'dog' + index" :key="index"
                    @click="goToBooking('dog', dog.name)">
                </div>
                <div class="dogItemContainer" v-for="(cat, index) in cats" v-bind:id="'cat' + index" :key="index"
                    @click="goToBooking('cat', cat.name)">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: "adoption",
    data() {
        return {
            dogs: [],
            cats: []
        }
    },
    mounted() {
        let Script = document.createElement("script");
        Script.setAttribute("src", "./js/adoption.js");
        document.head.appendChild(Script);
        axios.get("http://localhost:3000/dogsForAdoption")
            .then((res) => {
                this.dogs = res.data;
            })
            .catch((e) => { console.log(e) })
        axios.get("http://localhost:3000/catsForAdoption")
            .then((res) => {
                this.cats = res.data;
            })
            .catch((e) => { console.log(e) })
    },
    methods: {
        goToBooking(type, selectedName) {
            if (localStorage.getItem('token') != null) {
                this.$router.push(`/adoption-booking/${type}/${selectedName}`)
            } else {
                this.$router.push({
                    name: 'Login',
                    params: { error: 'unauthorized' }
                });
            }

        }
    }
}
</script>