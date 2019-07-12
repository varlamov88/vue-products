import "bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import { library } from '@fortawesome/fontawesome-svg-core';
import { faRubleSign, faEdit, faTrashAlt,faSave } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
Vue.component('font-awesome-icon', FontAwesomeIcon);
library.add(faRubleSign, faEdit, faTrashAlt, faSave);

import * as Cookie from "./cookie";
import axios from "axios";

Vue.config.productionTip = false;

Vue.filter('toCurrency', function (value) {
	let val = (value / 1).toFixed(0);
	return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
});

let vm = new Vue({
	router,
	store,
	render: h => h(App),
	beforeMount() {
		axios
			.get(this.$store.state.serverApi + 'products')
			.then(response => {
				this.$store.commit("setProducts", response.data);
			})
			.catch(e => {
				console.log(e.message);
			});
		axios
			.get(this.$store.state.serverApi + 'reviews')
			.then(response => {
				this.$store.commit("setReviews", response.data);
			})
			.catch(e => {
				console.log(e.message);
			});
	}
});

store.dispatch("login", { uid: Cookie.getCookie("uid") })
	.then((res) => {})
	.catch(e => {})
	.finally(() => vm.$mount("#app"));