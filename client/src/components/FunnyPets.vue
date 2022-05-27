<template>
    <div class="centeredGrid leafPattern"> 
        <div class="centeredGrid funnypets">
            <div class="title">Funny cats</div>
            <div id="serverErrorCats" class="serverError"></div>
            <img id="funcat">
            <button id="anotherFuncat">Next one</button>
        </div>   
        <div class="centeredGrid funnypets">
            <div class="title">Funny dogs</div>
            <div id="serverErrorDogs" class="serverError"></div>
            <img id="fundog">
            <button id="anotherFundog">Next one</button>                    
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

<style scoped>
.funnypets img {
     max-height: 300px;
     margin: 0 auto 20px auto;
}

.funnypets button {
     width: fit-content;
     padding: 10px;
     margin: 0px auto;
     background-color: #fd7e14 ;
     border-radius: 10px;
     color: white;
}

.funnypets button:hover {
     background-color: #fb9746 ;
}

@media screen and (max-width: 480px) {
    .funnypets img {
        max-width: 320px;
    }
}

@media screen and (max-width: 350px) {
    .funnypets img {
        max-width: 270px;
    }
}
</style>