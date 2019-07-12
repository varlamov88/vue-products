<template>
	<div>
		<form @submit.prevent="add" class="col-lg-6">
            <div v-if="error.length" class="alert alert-danger">{{error}}</div>
		    <div v-if="success.length" class="alert alert-success">{{success}}</div>
			<div class="form-group">
				<label for="productName">Название</label>
				<input type="text" class="form-control" id="productName" v-model="product.name" required />
			</div>
			<div class="form-group">
				<label for="productVendor">Бренд</label>
				<input type="text" class="form-control" id="productVendor" v-model="product.vendorName" />
			</div>
			<div class="form-group">
				<label for="productImg">Картинка</label>
				<input type="text" class="form-control" id="productImg" v-model="product.img" />
			</div>
			<div class="form-group">
				<label for="productPrice">Цена</label>
				<input type="number" class="form-control" id="productPrice" v-model.number="product.price" />
			</div>
			<div class="form-group">
				<label for="productCount">Количество</label>
				<input type="number" class="form-control" id="productCount" v-model.number="product.count" />
			</div>
			<div class="form-group">
				<label for="productPreview">Анонс</label>
				<textarea class="form-control" id="productPreview" v-model="product.preview"></textarea>
			</div>
			<div class="form-group">
				<label for="productDescription">Описание</label>
				<textarea class="form-control" id="productDescription" v-model="product.description"></textarea>
			</div>
			<button type="submit" class="btn btn-success mb-3">Сохранить</button>
			<div v-if="error.length" class="alert alert-danger">{{error}}</div>
		</form>
	</div>
</template>

<script>
export default {
	name: "add-product",
	data() {
		return {
			error: "",
            success: "",
            product: {}
		};
	},
	methods: {
		add() {
            this.$store
				.dispatch("addProduct", this.product)
				.then(res => {
                    this.success = "Товар добавлен";
                    this.error = "";
                    this.product = {};
                })
				.catch(e => (this.error = e.message));
        }
	}
};
</script>

<style scoped lang="scss">
</style>
