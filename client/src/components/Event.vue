<template>
	<div class="blueBackground eventsContainer">
		<div class="title">Events</div>
		<!-- Modal error -->
		<div id="messageError" class="modal">
			<span id="closeMessagge" class="close" title="Close Modal">&times;</span>
			<div class="modal-content">
				<div class="container">
					<div class="serverError">{{ error }}</div>
				</div>
			</div>
		</div>
		<!-- Modal Booking -->
		<div id="bookedEvent" class="modal">
			<span id="closeMessagge" class="close" title="Close Modal">&times;</span>
			<div class="modal-content">
				<div class="container">
					<div class="bookedEvent">{{ message }}</div>
				</div>
			</div>
		</div>
		<div v-for="(info, index) in information" v-bind:value="info" :key="info.name" class="eventContainer">
			<div class="layoutEvent">
				<figure class="figureEvent" v-if="info.photo">
					<span class="categoryEvent">{{ info.category }}</span>
					<img :src="info.photo" class="imgEvent">
				</figure>
				<article>
					<h2 class="nameEvent">{{ info.name }}</h2>
					<span class="dateEvent">{{ info.date }}</span>
					<address class="addressEvent">{{ info.place }}</address>
					<div class="divPriceEvent"> Price: <span class="priceEvent"> {{ info.price }} $</span></div>
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
import $ from 'jquery'
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
				axios.post('http://localhost:3000/bookingEvent', booking).then(() => {
					this.message = "This event was added to your bookings";
					$('#bookedEvent').show();
					this.information[indice].bookedSeat += 1;
				}, () => {
					this.error = "You already booked a seat for this even";
					$('#messageError').show();
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

		window.onclick = function (event) {
			var modalError = document.getElementById('messageError');
			var msgBook = document.getElementById('bookedEvent');
			if (event.target == modalError) {
				modalError.style.display = "none";
			} else if (event.target == msgBook) {
				msgBook.style.display = "none";
			}
		}
	}
}
</script>
<style scoped>
.bookedEvent {
	color: green;
	padding: 10px;
}

.serverError {
	color: red;
	padding: 10px;
}
</style>
           