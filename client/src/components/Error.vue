<template>
    <div id="urlNotFoundText">
        <h1>We're sorry</h1>
        <img src="../../public/images/error-dog.png">
        <div>The url "{{ currentUrl }}" doesn't exist.</div>
        <div>
            <router-link to="/">&laquo; Go to Home</router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: "error",
    data() {
        return {
            currentUrl: ''
        }
    },
    created() {
        this.currentUrl = window.location.href;
    }
}
</script>

<style scoped>
#urlNotFoundText {
    padding: 50px;
    background-color: #d7e7ff;
    word-wrap: break-word;
}

#urlNotFoundText img {
    max-height: 200px;
    margin-top: 20px;
}

@media screen and (max-width: 480px) {
    #urlNotFoundText img {
        max-height: 150px;
    }
}
</style>