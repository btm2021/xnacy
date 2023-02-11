<template>
    <div>
        <b-row>
            <b-col cols="12">

                <b-table :busy="marketscanbusy" responsive small bordered :items="marketData" show-empty
                    :fields="scanFields">
                    <!-- <template #cell(dataframe)="data">
                       
                    </template> -->
                    <template #thead-top>
                        <b-tr class="text-center">
                            <b-th colspan="2" variant="dark"></b-th>
                            <b-th colspan="11" variant="primary">1h</b-th>

                        </b-tr>
                    </template>
                    <template #table-busy>
                        <div class="text-center text-danger my-2">
                            <b-spinner class="align-middle"></b-spinner>
                            <strong>Loading...</strong>
                        </div>
                    </template>
                    <template #cell(index)="data">
                        <span>
                            {{ data.index + 1 }}
                        </span>
                    </template>

                    <template #cell(price)="data">
                        <span>
                            {{ $getPrice(data.item.symbol) }}
                        </span>
                    </template>

                </b-table>

            </b-col>
        </b-row>
    </div>
</template>

<script>

export default {
    data() {
        return {
            listServer: [

            ],
            marketscanbusy: true,
            marketData: [],
            scanFields: [
                { key: 'index', label: '#' },
                { key: 'symbol', label: 'Symbol' },
            ]
        }
    },
    methods: {
        async getServerScan() {
            return new Promise((resolve, reject) => {
                let url = `https://database.deta.sh/v1/c06pa3r8/listServerScan/query`
                fetch(url, {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-API-Key': 'c06pa3r8_6XB282uQdaB74eHiFq6QMK4uMjfEGc8M'
                    }
                }).then(data => data.json()).then(data => {

                    let items = data.items.sort((a, b) => a.timeout - b.timeout);
                    resolve(items)
                })
            })

        },
        async getDataAndCompress() {
            try {
                this.listServer = await this.getServerScan();

                let listRequest = [];
                this.listServer.forEach(i => {
                    // listRequest.push(this.getDataByTf(i.timeframe))
                })
                listRequest.push(this.getDataByTf("1h"))
                Promise.all(listRequest).then(data => {
                    let listData = []
                    data.forEach(i => {
                        //lap qua các server quét các timeframe khác nhau
                        //kieu du lieu mong muon BTC 15m 14 15m 34 15m 89 indicator

                        let timeframe = i.timeframe;
                        i.data.forEach(symbol => {
                            listData.push({ timeframe, symbol: symbol.name, data: JSON.parse(symbol.data) })
                        })

                    })


                    let groupBy = $nuxt.lodash.groupBy(listData, "symbol")
                    let mkData = $nuxt.lodash.toPairs(groupBy);
                    let newList = []

                    //format data
                    mkData.forEach(i => {

                        let mkData = { symbol: i[0] }
                        let tf = i[1];
                        tf.forEach(a => {
                            //mkData["tf" + a.timeframe + "bot14"] = { ...a.data["mybot14"] }

                            mkData["tf" + a.timeframe] = { ...a.data }
                            mkData["bot" + a.timeframe + "_signal"] = a.data["mybot89"].lastSignal
                            mkData["bot" + a.timeframe + "_count"] = a.data["mybot89"].signalCountBar
                            mkData["bot" + a.timeframe + "_t1"] = a.data["mybot89"].t1
                            mkData["bot" + a.timeframe + "_t2"] = a.data["mybot89"].t2


                            /*
lastSignal: "LONG"
signalAt: 1674086400000
signalBegin: 979
signalCountBar: 21
t1: 19865.98309642072
t2: 19468.663434492308
quy tắc :
1.vào lệnh khi giá cao hơn t1,t2.
2.vào lệnh ở cây nến cùng màu
3.stoshj 30,70
4.gặp cây mạnh phăng ngang qua thì quy tắc 1 2 3 ngồi chơ2

*/
                            this.scanFields.push(
                                {
                                    key: "bot" + a.timeframe + "_signal",
                                    label: "Signal", sortable: true
                                },

                                {
                                    key: "bot" + a.timeframe + "_count",
                                    label: "Count", sortable: true
                                },
                                {
                                    key: "bot" + a.timeframe + "_t1",
                                    label: "t1", sortable: true,
                                    formatter: (value, key, item) => {
                                        return $nuxt.$formatPrice(item.symbol, value)
                                    }
                                },
                                {
                                    key: "bot" + a.timeframe + "_t2",
                                    label: "t2", sortable: true,
                                    formatter: (value, key, item) => {
                                        return $nuxt.$formatPrice(item.symbol, value)
                                    }
                                },
                                //rule
                                {
                                    key: "price",
                                    label: "Giá", sortable: true
                                },

                                {
                                    key: "bot" + a.timeframe + "_stoch",
                                    label: "Stoch", sortable: true
                                },
                                {
                                    key: "bot" + a.timeframe + "_rule4",
                                    label: "RSI", sortable: true,
                                    formatter: (value, key, item) => {
                                        return parseFloat((item.tf1h.rsi).toFixed(1))
                                    }
                                },
                                {
                                    key: "bot" + a.timeframe + "_rule5",
                                    label: "CCI", sortable: true,
                                    formatter: (value, key, item) => {
                                        return parseFloat(item.tf1h.cci.toFixed(1))
                                    }
                                },
                                {
                                    key: "bot" + a.timeframe + "_rule8",
                                    label: "Stoch", sortable: true
                                },
                                {
                                    key: "bot" + a.timeframe + "_rule8",
                                    label: "VWAP", sortable: true
                                },

                                {
                                    key: "bot" + a.timeframe + "_ema100",
                                    label: "EMA100", sortable: true
                                },
                                {
                                    key: "bot" + a.timeframe + "_ema200",
                                    label: "EMA200", sortable: true
                                },

                            )
                        })
                        newList.push(mkData)


                    })
                    console.log(newList)


                    //kieu du lieu mong muon
                    // {symbol:btc,timeframe15_bot14,timeframe15_bot14,timeframe15_bot14,}

                    this.marketData = newList;
                    this.marketscanbusy = false;

                })
            } catch (err) {
                //có lỗi, thử lại trong vòng 5s
                console.log('Error, trying connect in 5s')
                setTimeout(() => {
                    this.getDataAndCompress();
                }, 5000)
            }
        },
        async getDataByTf(tf) {
            return new Promise((resolve, reject) => {
                let dataproxy = 'https://9ygioa.deta.dev/getbytimeframe?timeframe=' + tf;
                fetch(dataproxy).then(data => data.json()).then(data => {
                    resolve({ timeframe: tf, data })
                })

            })

        },

    },
    async mounted() {
        // this.getListData();
        this.getDataAndCompress()
    }
}
</script>

<style>

</style>