<template>
	<li class="product">
        <a class="product__link" :href="$router.currentRoute.path + '/' + product.id">
            <div class="product__img-wrap"><img class="product__img" :src="product.img" /></div>
            <div class="product__price">
                <template v-if="product.price > 0">
                    {{product.price | toCurrency}} <font-awesome-icon icon="ruble-sign" size="xs" />
                </template>
                <template v-else>
                    цена не указана
                </template>
            </div>
            <div class="product__name">{{product.name}}</div>
        </a>
	</li>
</template>

<script>
export default {
	name: "product",
	data() {
		return {

		};
    },
    props: {
        product: Object
    }
};
</script>

<style scoped lang="scss">
.product {
    text-align: center;
    margin-bottom: 30px;
    &__link {
        color: inherit;
        text-decoration: none;
        border: 1px solid #ccc;
        display: block;
        height: 100%;
        width: 100%;
        padding: 15px;
        &:hover {
            text-decoration: none;
            border-color: #42b983;
            .product__name {
                color: #42b983;
            }
        }
    }
    &__img-wrap {
        padding-bottom: 100%;
        overflow: hidden;
        position: relative;
    }
    &__img {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        max-width: 100%;
        max-height: 100%;
    }
    &__price {
        font-weight: bold;
        font-size: 1.3rem;
        margin: .5rem 0;
    }
    &__name {
        font-weight: bold;
        margin: .5rem 0;
    }
}
</style>
