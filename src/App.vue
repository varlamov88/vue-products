<template>
	<div id="app" class="container">
		<div id="nav" class="row">
			<div class="col-12 col-lg-8 col-md-6">
				<router-link class="btn btn-link" to="/">Главная</router-link> |
				<router-link class="btn btn-link" to="/products">Товары</router-link>
			</div>
			<div class="col-12 col-lg-4 col-md-6">
				<template v-if="!user.id">
					<router-link class="btn btn-outline-success col-6" to="/login">Войти</router-link>
					<router-link class="btn btn-outline-success col-6" to="/registration">Регистрация</router-link>
				</template>
				<template v-else>
					<template v-if="user.groupId == 1">
						<router-link class="btn btn-outline-success col-6" to="/admin">{{user.login}}</router-link>
					</template>
					<template v-else>
						<div class="btn col-6 btn-outline-secondary disabled">{{user.login}}</div>
					</template>
					<router-link class="btn btn-outline-success col-6" to="/logout">Выйти</router-link>
			</template>
			</div>


		</div>
		<router-view />
	</div>
</template>

<script>
export default {
	name: "app",
	computed: {
		user() {
			return this.$store.state.user;
		}
	}
};
</script>

<style scoped lang="scss">
#app {
	font-family: "Avenir", Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	color: #2c3e50;
	background-color: #fff;
}
#nav {
	padding: 30px 0;
	a {
		font-weight: bold;
		color: #2c3e50;
		&.router-link-exact-active {
			color: #42b983;
		}
	}
}
</style>
