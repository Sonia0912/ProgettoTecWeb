<template>
        <div class="centeredGrid leafPattern">    
            <div class="centeredGrid funnypets">
                <div class="title">Funny dogs</div>
                <div id="serverErrorDogs" class="serverError"></div>
                <img id="fundog">
                <button id="anotherFundog">Next one</button>                    
            </div>   
            <div class="centeredGrid funnypets">
                <div class="title">Funny cats</div>
                <div id="serverErrorCats" class="serverError"></div>
                <img id="funcat">
                <button id="anotherFuncat">Next one</button>
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