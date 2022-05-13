<template>
    <div class="content" id="loginForm">
        <div id="loginDiv">
            <h2>Sing in</h2>

            <form class="verticalForm" action="/login" method="post">
                <input type="email" name="email" placeholder="E-mail" id="email" required>
                <input type="password" name="password" placeholder="Password" id="password" required>
                <input type="submit" value="Sign in">
            </form>
        </div>
    </div>  
</template>


<script>
    export default {
        name: "login"
    }
</script>