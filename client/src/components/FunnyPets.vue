<template>
        <div class="centeredGrid leafPattern">

            <div class="centeredGrid funnypets">
                <div class="title">Video of the day</div>
                <div class="video-container">
                    <iframe id="videoPet" width="420" height="315" src="https://www.youtube.com/embed/SSuj4Cz9F0M" allowfullscreen></iframe> 
                </div>
                <button id="anotherVideo">Another one</button>                    
            </div>
    
            <div class="centeredGrid funnypets">
                <div class="title">Funny dogs</div>
                <img id="fundog">
                <button id="anotherFundog">Another one</button>                    
            </div>
    
            <div class="centeredGrid funnypets">
                <div class="title">Funny cats</div>
                <img id="funcat">
                <button id="anotherFuncat">Another one</button>
            </div>

        </div>
</template>


<script>
    export default {
        name: "funnyPets",
        mounted() {
            let Script = document.createElement("script");
            Script.setAttribute("src", "./js/funnypets.js");
            document.head.appendChild(Script);
        }
    }
</script>