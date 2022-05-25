<template>

	<div class="blueBackground eventsContainer"> 
		<div class="title">Events</div>
		<div class="serverError">{{ error }}</div>
		<div v-for="(info,index) in information" v-bind:value="info" :key="info.name" class="eventContainer">
			<div class="layoutEvent">
				<figure class="figureEvent" v-if="info.photo">
					<span class="categoryEvent">{{ info.category }}</span>
					<img :src="info.photo" class="imgEvent">
				</figure>
				<article>
					<h2 class="nameEvent">{{ info.name }}</h2>
					<span class="dateEvent">{{ info.date }}</span>
					<address class="addressEvent">{{ info.place }}</address>
					<div class="divPriceEvent"> Price: <span class="priceEvent"> {{ info.price }}</span></div>
					<h6>Description:</h6>
					<div class="descriptionEvent">{{ info.description }}</div>
				</article>
			</div>
			<div class="infoEvent">
				<div>Available seats: <span class="seatEvent">{{ info.totSeat - info.bookedSeat }}</span></div>
				<div><button class="bookEvent" @click="booking(info, index)">Book</button></div>
			</div>
		</div>
	</div>
</template>

<script>

	import axios from 'axios'
	export default {
		nome: 'event',
		data() {
			return {
				information: [],
				message: '',
				error: ''
			}
		},
		methods: {
			booking(event, indice) {
				if (localStorage.getItem('token') === null) {
					this.$router.push({
						name: 'Login',
						params: { error: 'unauthorized' }
					})
				} else {
				
					let booking = {
						nameEvent: event.name,
						userEmail: localStorage.getItem('email'), 
						dateEvent: event.date,
						placeEvent: event.place, 
						descriptionEvent: event.description,
						photo: event.photo
					}
					axios.post('http://localhost:3000/bookingEvent', booking).then(res => {
						console.log(res)
						alert("This event was added to your bookings");
						this.information[indice].bookedSeat += 1; 
					}, err => {
						console.log(err)
						alert("You already booked a seat for this event");
					})
				}
			}
		},
		mounted() {
			axios.get("http://localhost:3000/event")
			.then(response => {
				this.information = response.data;
			})
			.catch(error => {
				this.error = "Sorry, something went wrong (" + error.status + ")";
			})
		}
	}
</script>
           