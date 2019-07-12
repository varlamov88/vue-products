import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Login from "./views/Login.vue";
import Logout from "./views/Logout.vue";
import Registration from "./views/Registration.vue";
import Admin from "./views/Admin.vue";
import Products from "./views/Products.vue";
import Product from "./views/Product.vue";
import Page404 from "./views/Page404.vue";

Vue.use(Router);

export default new Router({
	mode: "history",
	base: process.env.BASE_URL,
	routes: [
		{
			path: "/",
			name: "home",
			component: Home
		},
		{
			path: "/login",
			name: "login",
			component: Login,
			meta: {
				shouldNoAuth: true
			}
		},
		{
			path: '/logout',
			name: "logout",
			component: Logout
		},
		{
			path: "/registration",
			name: "registration",
			component: Registration,
			meta: {
				shouldNoAuth: true
			}
		},
		{
			path: "/admin",
			name: "admin",
			component: Admin
		},
		{
			path: "/products",
			name: "products",
			component: Products
		},
		{
			path: "/products/:id",
			name: "product",
			component: Product
		},
		{
			path: "*",
			name: "404",
			component: Page404
		}
	]
});