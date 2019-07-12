<template>
	<div class="registration row" v-cloak>
		<form @submit.prevent="register" class="col-lg-6">
			<div class="form-group">
				<label for="login">Логин</label>
				<input type="text" class="form-control" id="login" v-model="login" required />
			</div>
			<div class="form-group">
				<label for="password">Пароль</label>
				<input type="password" class="form-control" id="password" v-model="password" required />
			</div>
			<button type="submit" class="btn btn-success mb-3">Зарегистрироваться</button>
			<div v-if="error.length" class="alert alert-danger">{{error}}</div>
		</form>
	</div>
</template>

<script>
import axios from "axios";
export default {
	name: "register",
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
		async register() {
            let uid = this.generateCode(10);

            try {
                await axios
                    .get(`${this.$store.state.serverApi}users?login=${this.login}`)
                    .then(response => {
                        if (response.data.length && response.data[0].id) {
                            throw new Error("Пользователь с таким логином уже существует");
                        }
                    });

                await axios
                    .post(`${this.$store.state.serverApi}users/`, {
                        login: this.login,
                        password: this.password,
                        groupId: 2,
                        uid: uid
                    })
                    .then(response => {
                        if (response.data && response.data.id) {
                            this.$store.commit("login", response.data);
                            this.$router.push({ name: "home" });
                        }
                    });
            }
            catch(e) {
                this.error = e.message;
            }
		},
		generateCode(length) {
			let text = "";
			const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

			for (var i = 0; i < length; i++) {
				text += possible.charAt(
					Math.floor(Math.random() * possible.length)
				);
			}
			return text;
		}
	}
};
</script>

<style scoped lang="scss">
</style>