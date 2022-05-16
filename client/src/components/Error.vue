<template>
    <div id="urlNotFoundText">
        <h1>We're sorry</h1>
        <img src="../../public/images/error-dog.png">
        <div>The url "<span id="currentUrl">{{currentUrl}}</span>" doesn't exist.</div>
        <div><router-link to="/">&laquo; Go to Home</router-link></div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                currentUrl: window.location.href
            }
        }

    }
</script>