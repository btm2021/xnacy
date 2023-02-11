<template>
    <b-container>
        <b-table class="text-center" small striped hover :fields="fields" :items="listSymbol" show-empty>
            <template #cell(tool)="data">
                <span @click="removeSymbol(data.item.symbol)">❌</span>
            </template>
            <template #cell(stt)="data">
                <span>
                    {{ data.index + 1 }}
                </span>
            </template>
        </b-table>
        <b-button @click="reloadList()">reload</b-button>
    </b-container>

</template>

<script>
export default {
    data() {
        return {
            fields: [

                { key: 'stt', label: '#' },
                { key: 'symbol', label: 'Name' },
                { key: 'pricePrecision', label: 'ToFix' },
                { key: 'tool', label: '#' }
            ],
            listSymbol: []
        }
    },
    methods: {
        //setting
        async removeSymbol(symbol) {
            console.log(symbol)
            //remove symbol from list
            let exchangeInfo = `https://baotm.duckdns.org/getListSymbol?action=remove&symbol=${symbol}`
            let list_reponse = await this.$axios.get(exchangeInfo);
            let listSymbol = list_reponse.data.symbols
            listSymbol.map(i => {
                this.listSymbol.push({ symbol: i.symbol, pricePrecision: i.pricePrecision })
            })
        },
        async getListSymbol() {
            //get from server
            //get https://baotm.duckdns.org/getListSymbol
            let exchangeInfo = `https://baotm.duckdns.org/getListSymbol`
            let list_reponse = await this.$axios.get(exchangeInfo);
            let listSymbol = list_reponse.data.symbols
            listSymbol.map(i => {
                this.listSymbol.push({ symbol: i.symbol, pricePrecision: i.pricePrecision })
            })
        },
        async reloadList() {
            let exchangeInfo = `https://fapi.binance.com/fapi/v1/exchangeInfo`
            let list_reponse = await this.$axios.get(exchangeInfo);
            let listSymbol = list_reponse.data.symbols
            listSymbol.map(i => {
                this.listSymbol.push({ symbol: i.symbol, pricePrecision: i.pricePrecision })
            })

        }
    }
}
</script>

<style scoped>

</style>>
