<template>
	<div class="title">
		Events
	</div>
	<div v-for="info in information" v-bind:value="info" :key="info.name">
		<div id="layoutEvent">
			<figure id="figureEvetn" v-if="info.photo">
				<span class="categoryEvetn">{{ info.category }}</span>
				<img :src="info.photo" id="imgEvent">
			</figure>
			<article>
				<h2 id="nameEvent">{{ info.name }} </h2>
				<span id="dateEvent">{{ info.date }}</span>
				<address id="addressEvent">
					{{ info.place }}
				</address>
				<div> Price: <span id="priceEvent"> {{ info.price }}</span></div>
				<h6>Description:</h6>
				<div id="descriptionEvent">
					{{ info.description }}
				</div>
			</article>
		</div>
		<div id="infoEvent">
			<div>Posti Rimasti: <span id="seatEvent"> {{info.totSeat - info.bookedSeat}}</span></div>
			<div> <button id="bookEvent">Book</button></div>
		</div>
	</div>
</template>

<script>

import axios from 'axios'

export default {
	nome: 'event',
	data() {
		return {
			information: []
		}
	},
	mounted() {
		axios.get("http://localhost:3000/event")
			.then(response => {
				console.log((response.data));
				this.information = response.data;
			})
			.catch(error => {
				console.log(error);
			})
	}
}
</script>
           