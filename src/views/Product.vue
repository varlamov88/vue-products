<template>
	<div class="product-detail">
		<div class="row" v-if="product">
			<div class="col-lg-7 col-md-6">
				<div class="product-detail__img-wrap">
					<img class="product-detail__img" :src="product.img" :alt="product.name" />
				</div>
			</div>
			<div class="col-lg-5 col-md-6">
				<h1>{{product.name}}</h1>
				<div class="product-detail__price">
					Цена:
					<template v-if="product.price > 0">
						{{product.price | toCurrency}}
						<font-awesome-icon icon="ruble-sign" size="xs" />
					</template>
					<template v-else>не указана</template>
				</div>
				<div v-if="product.vendorName" class="product-detail__brand">
					<b>Производитель:</b>
					{{product.vendorName}}
				</div>
				<div class="product-detail__count">
					<b>Количество на складе:</b>
					{{product.count || 0}} шт.
				</div>
				<div v-if="product.preview" class="product-detail__description">{{product.preview}}</div>
			</div>
		</div>
		<div class="row" v-else>
			<div class="col"><h1>Товар не найден</h1></div>
		</div>
	</div>
</template>

<script>
export default {
	name: "product",
	computed: {
		product() {
			return this.$store.state.products.find((product) => {
				return product.id == this.$route.params.id;
			});
		}
	}
};
</script>

<style scoped lang="scss">
.product-detail {
	&__img-wrap {
		padding-bottom: 100%;
		overflow: hidden;
		position: relative;
		border: 1px solid #ccc;
	}
	&__img {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		max-width: 100%;
		max-height: 100%;
		padding: 15px;
	}
	&__price {
		font-weight: bold;
		font-size: 1.3rem;
		margin: 0.5rem 0;
	}
	&__count {
		margin: 0.5rem 0;
	}
}
</style>