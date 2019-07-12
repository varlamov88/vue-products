<template>
	<div>
		<div v-if="error.length" class="alert alert-danger">{{error}}</div>
		<div class="products col-12" v-if="products.length">
			<div class="row head">
				<div class="col-1"></div>
				<div class="col-2">Название</div>
				<div class="col-1">Бренд</div>
				<div class="col-2">Картинка</div>
				<div class="col-1">Цена</div>
				<div class="col-1">Кол-во</div>
				<div class="col-2">Анонс</div>
				<div class="col-2">Описание</div>
			</div>
			<div v-for="item in products" :key="item.id" class="products__item row">
				<div class="col-12 col-lg-1">
					<div class="btn-group-vertical">
						<button v-if="editedId == item.id" class="btn btn-success" @click="save">
							<font-awesome-icon icon="save" />
						</button>
						<button v-else class="btn btn-info" @click="edit(item.id)">
							<font-awesome-icon icon="edit" />
						</button>
						<button class="btn btn-danger" @click="deleteItem(item.id)">
							<font-awesome-icon icon="trash-alt" />
						</button>
					</div>
				</div>
				<textarea class="col-12 col-lg-2" :readonly="editedId != item.id" v-model="item.name"></textarea>
				<textarea class="col-12 col-lg-1" :readonly="editedId != item.id" v-model="item.vendorName"></textarea>
				<textarea class="col-12 col-lg-2" :readonly="editedId != item.id" v-model="item.img"></textarea>
				<textarea class="col-12 col-lg-1" :readonly="editedId != item.id" v-model="item.price"></textarea>
				<textarea class="col-12 col-lg-1" :readonly="editedId != item.id" v-model="item.count"></textarea>
				<textarea class="col-12 col-lg-2" :readonly="editedId != item.id" v-model="item.preview"></textarea>
				<textarea class="col-12 col-lg-2" :readonly="editedId != item.id" v-model="item.description"></textarea>
			</div>
		</div>
		<div v-else>Товары отсутствуют</div>
	</div>
</template>

<script>
export default {
	name: "edit-products",
	data() {
		return {
			editedId: null,
            error: ""
		};
	},
	computed: {
		products() {
			return this.$store.state.products;
		},
		editedObj() {
			return this.products.find(prod => {
				return prod.id == this.editedId;
			});
		}
    },
	methods: {
		edit(id) {
			this.editedId = id;
			this.error = "";
		},
		save() {
			this.error = "";
			this.$store
				.dispatch("saveProduct", this.editedObj)
				.then(res => {
					this.editedId = null;
				})
				.catch(e => (this.error = e.message));
		},
		deleteItem(id) {
			this.editedId = null;
			this.error = "";
			this.$store
				.dispatch("deleteProduct", id)
				.then(res => {})
				.catch(e => (this.error = e.message));
        }
	}
};
</script>

<style scoped lang="scss">
.products {
	&__item {
		height: 100px;
		overflow: hidden;
		&:nth-child(odd) {
			background-color: rgba(0, 0, 0, 0.05);
		}
	}
    textarea {
        border: none;
        outline: 1px solid #28a745;
        outline-offset: -2px;
        resize: none;
        background-color: transparent;
        &[readonly] {
            overflow: hidden;
            outline: none;
        }
    }
}
.btn-group-vertical {
	width: 40px;
	margin: 10px auto;
	display: flex;
}

.head {
	font-weight: bold;
	padding: 15px 0;
	background-color: lightgray;
}
@media screen and (max-width: 991px) {
	.head {
		display: none;
	}
	.products__item {
		height: auto;
		overflow: initial;
	}
	.btn-group-vertical{
		margin: 10px 0 10px auto;
		flex-direction: row;
		.btn {
			border-radius: 0;
			margin: 0 0 0 0;
		}
	}
}
</style>
