import Vue from "vue";
import Vuex from "vuex";
import axios from 'axios';
import * as Cookie from "./cookie";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		serverApi: "http://localhost:3000/",
		isAuthorized: false,
		user: {},
		products: [],
		reviews: []
	},
	mutations: {
		login(state, obj) {
			state.isAuthorized = true;
			state.user = obj;
			Cookie.setCookie("uid", obj.uid, 1);
		},
		logout(state) {
			state.isAuthorized = false;
			state.user = {};
			Cookie.eraseCookie("uid");
		},
		setProducts(state, arr) {
			state.products = arr;
		},
		setReviews(state, arr) {
			state.reviews = arr;
		},
		saveProduct(state, obj) {
			let ind = state.products.findIndex(prod => {
				return prod.id == obj.id;
			});
			if (ind >= 0) {
				state.products[ind] = obj;
			}
		},
		deleteProduct(state, id) {
			let ind = state.products.findIndex(prod => {
				return prod.id == id;
			});
			if (ind >= 0) {
				state.products.splice(ind, 1);
			}
		},
		addProduct(state, obj) {
			state.products.push(obj);
		}
	},
	actions: {
		async login({ commit, state }, user) {
			let param = (user.uid ? `?uid=${user.uid}` : `?login=${user.login}&password=${user.password}`);
			return await axios
				.get(`${state.serverApi}users${param}`)
				.then(response => {
					if (response.data.length && response.data[0].id) {
						commit("login", response.data[0]);
					}
					else {
						commit("logout");
						throw new Error("Неверные имя пользователя и пароль");
					}
					return response.data;
				});
		},
		async saveProduct({ commit, state }, product) {
			return await axios
				.put(`${state.serverApi}products/${product.id}`, product)
				.then(response => {
					if (response.data.id) {
						commit("saveProduct", response.data.id);
					}
					else {
						throw new Error("Ошибка сохранения");
					}
				});
		},
		async deleteProduct({ commit, state }, id) {
			return await axios
				.delete(`${state.serverApi}products/${id}`)
				.then(response => {
					if (response.status == 200) {
						commit("deleteProduct", id);
					}
					else {
						throw new Error("Ошибка удаления");
					}
				});
		},
		async addProduct({ commit, state }, product) {
			return await axios
				.post(`${state.serverApi}products`, product)
				.then(response => {
					if (response.data.id) {
						commit("addProduct", response.data);
					}
					else {
						throw new Error("Ошибка добавления");
					}
				});
		}
	}
});
