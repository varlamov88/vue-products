<template>
	<div class="login row">
		<form @submit.prevent="authorize" class="col-lg-6">
			<div class="form-group">
				<label for="login">Логин</label>
				<input type="text" class="form-control" id="login" v-model="login" required />
			</div>
			<div class="form-group">
				<label for="password">Пароль</label>
				<input type="password" class="form-control" id="password" v-model="password" required />
			</div>
			<button type="submit" class="btn btn-success mb-3">Авторизоваться</button>
            <div v-if="error.length" class="alert alert-danger">{{error}}</div>
		</form>
	</div>
</template>

<script>
export default {
	name: "login",
	data() {
		return {
			login: "",
            password: "",
            error: ""
		};
    },
	beforeMount() {
        if(this.$store.state.isAuthorized) {
            this.$router.replace({ name: "home" });
        }
    },
	methods: {
		authorize() {
            this.$store.dispatch("login", {login: this.login, password: this.password})
                .then((res) => {
                    this.$router.push({ name: "home" })
                })
                .catch(e => this.error = e.message);
		}
	}
};
</script>

<style scoped lang="scss">
</style>