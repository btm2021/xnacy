<template>
    <Nuxt />
</template>
<script>
export default {
    async mounted() {
        await $nuxt.$initWebsocket()
        let exchangeInfo = await $nuxt.$initExchangeInfo()
        this.$store.commit('exchangeInfo/setListSymbol', exchangeInfo.symbols)
    }
}
</script>

<style>

</style>