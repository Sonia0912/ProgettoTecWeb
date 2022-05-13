<template>
            <div class="blueBackground">
            <div class="title">Find your pet</div>
            <div class="subtitle">At AnimalHouse we care about our pets' well being. If you intend to adopt one of our pets, please book an appoiment within the next week.</div>
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

                <div id="pets"></div>
            </div>
        </div>
</template>

<script>

/* import $ from 'jquery'
import axios from 'axios' */

export default {
    name: "adoption",
    mounted() {
        let Script = document.createElement("script");
        Script.setAttribute("src", "./js/adoption.js");
        document.head.appendChild(Script);
    }
}

</script>