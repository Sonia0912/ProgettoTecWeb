<template>
    <div class="pinkLeafBackground">
        <div class="title pink">Users</div>
        <table id="usersList">
            <thead>
                <tr>
                    <th>Email</th>
                    <th>Name</th>
                    <th>Surname</th>
                    <th>Quiz score</th>
                    <th>Hangman score</th>
                </tr>
            </thead>
            <tbody></tbody>
        </table>
    </div>
</template>

<script>
    export default {
        name: "users",
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
            Script.setAttribute("src", "./js/users.js");
            document.head.appendChild(Script);
        }
    }
</script>