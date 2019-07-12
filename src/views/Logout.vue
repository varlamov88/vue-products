<template>
    <div></div>
</template>
<script>
export default {
	name: "logout",
	beforeMount() {
        this.$store.commit("logout");
        this.$router.push({ name: "home" });
    }
};
</script>