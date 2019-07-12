<template>
	<div class="products">
		<h1>Товары</h1>
		<ul v-if="products.length" class="row products__list">
			<li
				is="Product"
				class="products__item col-lg-4 col-md-6 col-sm-6 col-xs-12"
				v-for="product in products"
				:key="product.id"
				:product="product"
			></li>
		</ul>
	</div>
</template>

<script>
import Product from "@/components/Product.vue";
export default {
	name: "products",
	computed: {
		products() {
			return this.$store.state.products;
		}
	},
	components: {
		Product
	}
};
</script>

<style scoped lang="scss">
.products {
	&__list {
		padding: 0;
		margin: 0 inherit;
		list-style: none;
	}
	&__item {
	}
}
</style>