<template>
    <div class="centeredGrid blueCurtainBackground">
        <div class="title">Dashboard</div>
        <form class="post-form" id="newPost" action="/posts" method="post">
            <div><textarea type="text" name="text" placeholder="Tell us something about your pets..." id="text" required></textarea></div>
            <div><img id="imgUploaded" /></div>
            <div id="errorPost"></div>
            <div>
                <input type="submit" value="Post" id="submitPost">
                <input type="file" name="img" id="img" accept="image/gif, image/png, image/jpeg" onchange="readURL(this);">
                <label class="imgLabel" for="img">Add picture</label>
            </div>
        </form>
        <div id="posts"></div>
    </div>
</template>

<script>
    export default {
        name: "dashboard",
        created() {
            if(localStorage.getItem('token') === null) {
                this.$router.push("login")
            }
        },
        mounted() {
            let Script = document.createElement("script");
            Script.setAttribute("src", "./js/dashboard.js");
            document.head.appendChild(Script);
        }
    }
</script>
