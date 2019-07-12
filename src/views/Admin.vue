<template>
	<div class="admin row">
		<div class="col-12">
			<ul class="nav nav-tabs" role="tablist">
				<li class="nav-item">
					<a class="nav-link active" id="edit-tab" data-toggle="tab" href="#edit" role="tab" aria-controls="edit" aria-selected="true">Редактировать товары</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" id="add-tab" data-toggle="tab" href="#add" role="tab" aria-controls="add" aria-selected="false">Добавить товар</a>
				</li>
			</ul>
            <div class="tab-content">
                <div class="tab-pane fade show active" id="edit" role="tabpanel" aria-labelledby="edit-tab">
                    <edit-products></edit-products>
                </div>
                <div class="tab-pane fade row" id="add" role="tabpanel" aria-labelledby="add-tab">
                    <add-product></add-product>
                </div>
            </div>
		</div>
	</div>
</template>

<script>
import EditProducts from "@/components/EditProducts.vue";
import AddProduct from "@/components/AddProduct.vue";
export default {
	name: "admin",
    components: {
        EditProducts,
        AddProduct
    },
	beforeMount() {
		if (
			!this.$store.state.isAuthorized ||
			this.$store.state.user.groupId != 1
		) {
			this.$router.replace({ name: "home" });
		}
	}
};
</script>

<style scoped lang="scss">
.tab-content {
    padding-top: 30px;
}
</style>