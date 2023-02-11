<template>
    <tvchart ref="tvchart" :key="currentSymbol" :symbol="currentSymbol"></tvchart>
</template>

<script>
export default {
    data() {
        return {
            currentSymbol: 'BTCUSDT'
        }
    },
    layout: 'default'
}
</script>

<style>

</style>