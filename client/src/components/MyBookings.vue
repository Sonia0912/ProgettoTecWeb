<template>
    <h1>My bookings</h1>
</template>

<script>
    export default {
        name: "myBookings",
        created() {
            if (localStorage.getItem('token') === null) {
                this.$router.push("login")
            }
        },
    }
</script>
