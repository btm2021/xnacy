<template>
    <div>


        <div>
            <b-navbar type="dark" variant="dark" style="border-bottom: #2B313A 1px solid;">
                <b-navbar-brand tag="h1" class="mb-0"><span style="color:#FCD435">NacyX</span></b-navbar-brand>
                <b-navbar-nav>
                    <b-nav-item-dropdown text="☰">
                        <b-dropdown-item v-b-modal.m-cauhinh href="#">Cấu hình</b-dropdown-item>
                        <b-dropdown-item href="#">Tình Trạng </b-dropdown-item>
                        <b-dropdown-item v-b-modal.m-tongthitruong href="#">Tổng thị trường </b-dropdown-item>
                        <b-dropdown-item v-b-modal.m-chisochung href="#">Chỉ số chung Crypto </b-dropdown-item>
                        <b-dropdown-item v-b-modal.m-backtest href="#">Backtest thông số </b-dropdown-item>
                        <b-dropdown-item v-b-modal.m-heatmap href="#">HeatMap </b-dropdown-item>
                        <b-dropdown-item v-b-modal.m-livetrans href="#">Theo Dõi Giao Dịch </b-dropdown-item>
                        <b-dropdown-item v-b-modal.m-lichkinhte href="#">Lịch kinh tế </b-dropdown-item>
                    </b-nav-item-dropdown>
                </b-navbar-nav>
            </b-navbar>

            <b-row fluid style="color:white;border-bottom: 1px #2B313A solid;">
                <b-col style="border-right:1px #2B313A solid" class="w-100 h-100" sm="12" md="12" lg="9" xl="9">
                    <!-- <b-row v-if="currentSymbolStatis" style="border-bottom: 1px #2B313A solid;height:70px;">
                        <b-col cols="2">
                            <div>
                                <div class="font-weight-bold;" style="cursor: pointer;margin-left:10%;margin-top:4%">
                                    <b-dropdown class="myDrop" style="border:0px !important" split right size="sm"
                                        split-variant="outline-primary">
                                        <template #button-content>
                                            {{ currentSymbolStatis.symbol }}
                                            <br />
                                            <div class="text-left">Perpetual</div>
                                        </template>
                                        <b-dropdown-text style="width:500px;">
                                            <b-row>
                                                <b-col cols="12">
                                                    <b-input size="sm" v-model="filterPerp" autocomplete="off"
                                                        type="search" class="text-uppercase"></b-input>
                                                </b-col>
                                                <b-col cols="12">
                                                    <b-table class="tablePerp" filter-debounce="100"
                                                        :filter="filterPerp" sticky-header="400px" responsive
                                                        :items="rawAllSymbolInfo" small :fields="pepFields" show-empty>
                                                        <template #cell(symbol)="data">
                                                            <span @click="phantich(data.item.symbol)"
                                                                class="symbolNamePerp">{{ data.item.symbol }}</span>
                                                        </template>
                                                        <template #cell(bv)="data">
                                                            <div>
                                                                {{ formatN(data.item.volume * data.item.lastPrice) }}
                                                            </div>
                                                        </template>

                                                        <template #cell(lastPrice)="data">
                                                            <span style="color:#F23545"
                                                                v-if="data.item.ps === 'down'">{{ data.item.bs }}</span>
                                                            <span style="color:#0CCB80"
                                                                v-else-if="data.item.ps === 'up'">{{
                                                                    data.item.bs
                                                                }}</span>
                                                            <span style="color:white" v-else>{{ data.item.bs }}</span>
                                                        </template>
                                                        <template #cell(priceChangePercent)="data">
                                                            <span style="color:#F23545"
                                                                v-if="data.item.priceChangePercent < 0">{{
                                                                    data.item.priceChangePercent
                                                                }}%</span>
                                                            <span style="color:#0CCB80" v-else>{{
                                                                data.item.priceChangePercent
                                                            }}%</span>
                                                        </template>
                                                    </b-table>
                                                </b-col>
                                            </b-row>
                                        </b-dropdown-text>
                                    </b-dropdown>


                                </div>
                            </div>
                        </b-col>
                        <b-col cols="2" style="border-left:1px solid  #2B313A;text-align: center" class="">
                            <div style="margin-top:8%">
                                <h2 class="font-weight-bolder" v-if="currentSymbolRealTimeMarkPrice">
                                    <span v-if="currentSymbolRealTimeMarkPrice.ps === 'none'">
                                        {{ parseFloat(currentSymbolRealTimeMarkPrice.bs) }}
                                    </span>
                                    <span class="text-success" v-else-if="currentSymbolRealTimeMarkPrice.ps === 'up'">
                                        {{ parseFloat(currentSymbolRealTimeMarkPrice.bs) }}
                                    </span>
                                    <span class="text-danger" v-else>
                                        {{ parseFloat(currentSymbolRealTimeMarkPrice.bs) }}
                                    </span>
                                </h2>
                                <h2 v-else>
                                    <b-overlay show></b-overlay>
                                </h2>
                            </div>
                        </b-col>
                        <b-col cols="1" style="border-left:1px solid  #2B313A;text-align: center;padding:0px" class="">
                            <div>Change</div>
                            <div>
                                <span v-if="parseFloat(currentSymbolStatis.priceChangePercent) >= 0"
                                    class="text-success">
                                    {{ parseFloat(currentSymbolStatis.priceChangePercent) }}%
                                </span>

                                <span v-else class="text-danger">
                                    {{ parseFloat(currentSymbolStatis.priceChangePercent) }}%
                                </span>



                            </div>
                            <div> <span>
                                    {{ parseFloat(currentSymbolStatis.priceChange) }}
                                </span></div>
                        </b-col>
                        <b-col cols="1" style="text-align: center;padding:0px" class="">
                            <div>High/Low</div>
                            <div>
                                <span> {{ currentSymbolStatis.highPrice }}</span>

                            </div>
                            <div>
                                <span> {{ currentSymbolStatis.lowPrice }}</span>
                            </div>
                        </b-col>
                        <b-col cols="1" style="text-align: center;padding:10px" class="">
                            <div>Vol(USDT)</div>
                            <div>{{ formatN(currentSymbolStatis.volume * currentSymbolStatis.lastPrice) }}</div>
                        </b-col>
                        <b-col cols="1" style="text-align: center;padding:0px" class="">
                            <div>Funding</div>
                            <div>
                                <span v-if="currentSymbolFundingRate > 0" class="text-success">
                                    {{ currentSymbolFundingRate }}
                                </span>
                                <span v-else class="text-danger"> {{ currentSymbolFundingRate }}
                                </span>
                                <div>{{ getCountDown(currentSymbolFundingRateCountDown) }}</div>
                            </div>
                            <div></div>
                        </b-col>
                        <b-col cols="1" style="text-align: center;padding:0px" class="">
                            <div>RSI(14) 15m</div>
                            <div>{{ currentSymbolRSI15m }}</div>
                            <div><span v-b-modal.m-phantichsymbol class="linkphantich text-info">Phân
                                    tích</span></div>
                        </b-col>
                        <b-col cols="3" style="cursor:pointer;border-left:1px solid  #2B313A;text-align: center;"
                            class="">
                            <span class="font-weight-bolder">Quét sàn</span>
                            <b-button-group style="width:100%" size="sm">
                                <b-button variant="primary" @click="changeTimeFrame(tf)"
                                    v-for="(tf, indextf) in listlinkscan" :key="indextf">
                                    {{ tf.name }}
                                </b-button>
                            </b-button-group>

                        </b-col>
                    </b-row>
                    <b-row v-else style="border-bottom: 1px #2B313A solid;height:70px;">
                        <b-col cols="12">
                            <b-overlay spinner-variant="primary" style="margin-top:3%" show rounded="sm"></b-overlay>
                        </b-col>

                    </b-row> -->
                    <b-row>

                        <b-col cols="12" ref="tdvCol">
                            <tvchart ref="tvchart" :key="currentSymbol" :symbol="currentSymbol"></tvchart>
                        </b-col>
                    </b-row>

                </b-col>

                <b-col class="w-100 h-100" style="font-size:8px" sm="12" md="12" lg="3" xl="3">
                    <div>
                        <b-row style="height:100vh;font-size:8px">
                            <b-col cols="12">
                                <b-table sticky-header="50vh" head-variant="warning" :fields="fields" class="myTable"
                                    style="font-size:10px !important;text-align: center; color:white !important"
                                    :items="currentDataList" show-empty small responsive>
                                    <template #cell(name)="data">
                                        <span @click="currentSymbol = data.item.name" class="symName">{{
                                            data.item.name
                                        }}</span>
                                    </template>
                                    <template #cell(status)="data">

                                        <span v-if="data.item.status === 'yes'"
                                            @click="itemPhanTich(data.item.name, data.item.timeframe)">
                                            <span class="dot blink_me"></span>
                                        </span>

                                    </template>
                                    <template #cell(currentPrice)="data">

                                        <span>{{ $nuxt.$store.$getPrice(data.item.name) }}</span>

                                    </template>
                                </b-table>
                                <!-- <b-table :filter="filterPerp" filter-debounce="100" sticky-header="50vh"
                                    head-variant="warning" class="myTable"
                                    style="font-size:10px;text-align: center; color:white !important" :fields="fields"
                                    :items="currentDataList" show-empty small responsive>
                                    <template #cell(name)="data">
                                        <span @click="phantich(data.item.name)" class="symName">{{
                                            data.item.name
                                        }}</span>
                                    </template>
                                    <template #cell(isFav)="data">
                                        <span class="notFav" @click="favDel(data.item.name)" v-if="data.item.isFav">
                                            &#11088;
                                        </span>
                                        <span v-else @click="favSym = data.item.name; addFav()" class="notFav"> &#9734;
                                        </span>

                                    </template>
                                    <template #cell(priceChangePercent)="data">
                                        <span style="color:#F23545" v-if="data.item.priceChangePercent < 0">{{
                                            data.item.priceChangePercent
                                        }}%</span>
                                        <span style="color:#0CCB80" v-else>{{ data.item.priceChangePercent }}%</span>
                                    </template>

                                    <template #cell(funding)="data">
                                        <span style="color:#F23545" v-if="data.item.funding < 0">{{
                                            data.item.funding
                                        }}%</span>
                                        <span style="color:#0CCB80" v-else>{{ data.item.funding }}%</span>
                                    </template>
                                    <template #cell(lastPrice)="data">
                                        <span style="color:#F23545" v-if="data.item.priceStatus === 'down'">{{
                                            data.item.lastPrice
                                        }}</span>
                                        <span style="color:#0CCB80" v-else-if="data.item.priceStatus === 'up'">{{
                                            data.item.lastPrice
                                        }}</span>
                                        <span style="color:white" v-else>{{ data.item.lastPrice }}</span>
                                    </template>

                                </b-table> -->
                            </b-col>

                        </b-row>

                    </div>

                </b-col>
                <b-col cols="12" style="height:300px;border:1px solid #2B313A;">
                    <b-row>
                        <b-col cols="12">
                            <div>
                                <b-tabs content-class="mt-3" justified>
                                    <b-tab title="Master (P/O)">
                                        <!-- 
                                        <b-row v-if="accountMaster">
                                            <b-col cols="6">
                                                <b>Vị thế</b>
                                                <b-table fixed :fields="positionFields" small
                                                    style="font-size:12px;color:white" hover striped bordered
                                                    :items="accountMaster.positions" show-empty>
                                                    <template #cell(tool)="data">
                                                        <b-button size="sm" variant="danger"
                                                            @click="thanhlyvithe({ account: account.name, symbol: data.item.symbol, orderId: data.item.orderId })">
                                                            X
                                                        </b-button>
                                                    </template>
                                                </b-table>

                                            </b-col>
                                            <b-col cols="6">
                                                <b>Lệnh chờ</b>
                                                <b-table fixed small style="font-size:12px;color:white" hover striped
                                                    bordered :items="accountMaster.openorder" :fields="orderWaitFields"
                                                    show-empty>
                                                    <template #cell(tool)="data">

                                                        <b-button size="sm" variant="danger"
                                                            @click="deleteOrder({ account: account.name, symbol: data.item.symbol, orderId: data.item.orderId })">
                                                            X
                                                        </b-button>
                                                    </template>
                                                </b-table>
                                            </b-col>
                                        </b-row> -->
                                    </b-tab>


                                    <b-tab title="Copytrade" active>
                                        <!-- <b-row style="color:white">
                                            <b-col xs="6" sm="12" md="12" lg="6" v-for="(account, index) in allAccount"
                                                :key="index">
                                                <b-container>


                                                    <span><b>{{ account.name }}</b> *Tổng tiền :
                                                        <code>{{ parseFloat(String(parseFloat(account.totalWalletBalance).toFixed(0))) }}</code>
                                                        *Pnl :
                                                        <code>{{ parseFloat(String(parseFloat(account.totalCrossUnPnl).toFixed(1))) }}</code></span>
                                                    <span><br /><b>Vị thế</b></span>
                                                    <b-table style="color:white" fixed :fields="positionFields" small
                                                        hover striped bordered :items="account.positions" show-empty>
                                                        <template #cell(tool)="data">
                                                            <b-button size="sm" variant="danger"
                                                                @click="thanhlyvithe({ account: account.name, symbol: data.item.symbol, orderId: data.item.orderId })">
                                                                X
                                                            </b-button>
                                                        </template>
                                                    </b-table>
                                                    <span><b>Lệnh chờ</b></span>
                                                    <b-table fixed small style="color:white" hover striped bordered
                                                        :items="account.openorder" :fields="orderWaitFields" show-empty>
                                                        <template #cell(tool)="data">

                                                            <b-button size="sm" variant="danger"
                                                                @click="deleteOrder({ account: account.name, symbol: data.item.symbol, orderId: data.item.orderId })">
                                                                X
                                                            </b-button>
                                                        </template>
                                                    </b-table>
                                                </b-container>
                                            </b-col>
                                        </b-row> -->

                                    </b-tab>
                                    <b-tab title="Log hệ thống">
                                        <!-- <div style="color:white">

                                            <b-table style="color:white" small hover striped bordered
                                                :items="msgStreamCp" :fields="msgStreamCpFields" show-empty></b-table>

                                        </div> -->
                                    </b-tab>
                                    <b-tab title="Theo dõi">
                                        <p></p>
                                    </b-tab>
                                    <b-tab title="Cảnh báo">
                                        <p></p>
                                    </b-tab>
                                    <b-tab title="Lịch sử PNL">
                                        <p></p>
                                    </b-tab>
                                </b-tabs>
                            </div>
                        </b-col>

                    </b-row>

                </b-col>

            </b-row>
            <div class="modalgroup" style="color:#1E2328 !important">
                <b-modal size="xl" no-close-on-backdrop no-close-on-esc ok-only title="Phân tích symbol"
                    id="m-phantichsymbol">
                    <phantichsymbol :symbol="phantichSymbol.symbol" :timeframe="phantichSymbol.timeframe" />
                </b-modal>
                <!-- <b-modal ok-only hide-footer scrollable size="xl" title="Cấu hình" id="m-cauhinh">
                    <div>
                        <b-card style="height:50vh" no-body>
                            <b-tabs pills card vertical>
                                <b-tab title="Thay đổi Master" active>
                                    <div>
                                        <b-container>

                                            <b-form-group label="Chọn Acc Master">
                                                <b-form-select v-model="changeAccMaster"
                                                    :options="optionChangeAccMaster"></b-form-select>
                                            </b-form-group>
                                            <b-button variant="success" @click="handleOkChangeAccountMaster">Change
                                            </b-button>

                                        </b-container>
                                    </div>
                                </b-tab>
                                <b-tab title="Chỉnh tài khoản">
                                    <div>
                                        <!-- <b-container>
                                            <b-button variant="success">Thêm Account</b-button>
                                            <div>

                                            </div>
                                            <b-table bordered fixed :fields="chinhsuaaccountfields"
                                                :items="ListAccountsJSON" show-empty small hover striped>
                                                <template #cell(role)="data">
                                                    <b-badge variant="warning" v-if="data.item.role === 'master'">Master
                                                    </b-badge>

                                                    <b-badge variant="success" v-else>Slave</b-badge>
                                                </template>
                                                <template #cell(status)="data">
                                                    <div class="text-center" @click="toggleStatus(data.item)">
                                                        <b-badge variant="success" v-if="(data.item.status)">V</b-badge>
                                                        <b-badge variant="danger" v-else>X</b-badge>
                                                    </div>
                                                </template>

                                                <template #cell(apikey)="data">
                                                    <span class="text-center">{{ getShort(data.item.apikey) }}</span>
                                                </template>

                                                <template #cell(apisec)="data">
                                                    <span class="text-center">{{ getShort(data.item.apisec) }}</span>
                                                </template>
                                                <template #cell(tool)="data" class="text-center">
                                                    <span @click="accountDelete(data.item)">❌</span>
                                                </template>
                                            </b-table>
                                        </b-container> -->
            </div>

            <b-tab title="Server">
                <b-container>
                    <b-row>
                        <b-col cols="12">
                            <b-button block variant="danger">
                                Khởi động lại
                            </b-button>
                        </b-col>
                    </b-row>
                </b-container>
            </b-tab>

        </div>




    </div>
</template>

<script>


export default {
    head() {
        return {

        }
    },
    computed: {

    },
    methods: {
        //account
        itemPhanTich(symbol, tf) {
            console.log(symbol, tf)
            this.phantichSymbol.symbol = symbol;
            this.phantichSymbol.timeframe = tf;

            this.$bvModal.show("m-phantichsymbol")
        },
        calcStatus(data, symbol) {
            let str = 'no'
            let sideOfSignal = data.mybot89.lastSignal;
            let currentPrice = $nuxt.$store.$getPrice(symbol)
            let t1 = data.mybot89.t1;
            let t2 = data.mybot89.t2;
            if (sideOfSignal === "LONG" && currentPrice <= t1) {
                //long thì giá phải chạm hoặc thấp hơn t2
                str = "yes"
            }
            if (sideOfSignal === "SHORT" && currentPrice >= t2) {
                str = "yes"
            }
            return str;
        },
        calcScore(data, symbol) {

            //* định ngĩa chiến thuận, + điểm khi đạt đủ điều kiện
            /*
            bb: {middle: 22346.26899999998, upper: 23117.81773056468, lower: 21574.720269435278, pb: 0.22231241979598781}
cci: -90.55137013430523
close: 21917.77
ema21: 22265.07571516494
ema50: 22581.785919235954
ema200: 22953.35859247612
high: 21938.16
low: 21854.01
mybot89: {t1: 22766.727367581858, t2: 23222.061914933496, lastSignal: 'SHORT', signalBegin: 0, signalCountBar: 1000, …}
open: 21894.63
rsi: 14.878740424091305
stoch: (2) [20.095153969267407, 16.89811332467407]
time: 1676019600000
tsi: (2) [-0.3982559795505232, -0.5068896512606212]
volume: 9604.9873 */
            let score = 0;
            let sideOfSignal = data.mybot89.lastSignal;

            let currentPrice = $nuxt.$store.$getPrice(symbol)
            let t1 = data.mybot89.t1;
            let t2 = data.mybot89.t2;
            let rsi = data.rsi;
            let cci = data.cci;
            let tsi = data.tsi;
            let stoch = data.stoch;
            let candleType = (data.open > data.close) ? "red" : "green"
            if (sideOfSignal === "LONG") {
                //long thì giá phải chạm hoặc thấp hơn t2
                if (currentPrice <= t1) {
                    score += 2;
                }
                if (candleType === "green") {
                    score += 1;
                }
                if (rsi <= 25) {
                    score += 1
                }
                if (stoch[0] <= 25 && stoch[1] <= 25) {
                    score += 1
                }
                if (tsi[0] < 0 && tsi[1] < 0) {
                    score += 1;
                }
                if (cci < -150) {
                    score += 1
                }

            } else {
                //short
                if (currentPrice >= t2) {
                    score += 2;
                }
                if (candleType === "red") {
                    score += 1;
                }
                if (rsi >= 75) {
                    score += 1
                }
                if (stoch[0] >= 75 && stoch[1] >= 75) {
                    score += 1
                }
                if (tsi[0] > 0 && tsi[1] > 0) {
                    score += 1;
                }
                if (cci > 150) {
                    score += 1
                }
            }
            return score;
        },
        getLastScan() {
            if ($nuxt.$store.state.exchangeInfo.realtimePrice.length > 0) {
                let url = 'https://baotmscan1h.run.goorm.app/getByTimeFrame?timeframe=1h'
                fetch(url).then(data => data.json()).then(data => {
                    console.log(data)

                    let newData = []
                    data.map(i => {
                        let _data = JSON.parse(i.data)

                        let objectData = {
                            status: this.calcStatus(_data, i.id),
                            name: i.id,
                            signal: _data.mybot89.lastSignal,
                            barcount: _data.mybot89.signalBegin,
                            score: this.calcScore(_data, i.id),
                            timeframe: i.timeframe,
                            t1: $nuxt.$formatPrice(i.id, _data.mybot89.t1),
                            t2: $nuxt.$formatPrice(i.idm, _data.mybot89.t2),
                        }

                        newData.push(objectData)
                    })

                    //{name,signal,barcount,score}
                    this.currentDataList = newData;
                    setTimeout(() => {
                        console.log('refetch')
                        this.getLastScan()

                    }, 2000)
                })
            } else {
                console.log('chờ kết quả realtime ')
                setTimeout(() => {
                    this.getLastScan();
                }, 1000)
            }


        }


    },
    created() {

    },
    mounted() {
        this.getLastScan();

    },
    data() {
        return {
            phantichSymbol: {
                symbol: 'BTCUSDT',
                timeframe: '1h'
            },
            currentSymbol: 'BTCUSDT',
            dataReady: false,
            currentDataList: [],
            fields: [
                { key: 'status', sortable: true, label: '', },
                { key: 'name', label: 'Name', sortable: true },
                { key: 'signal', label: 'S', sortable: true },

                { key: 't1', label: 'T1', sortable: true },

                { key: 't2', label: 'T2', sortable: true },

                { key: 'currentPrice', label: 'P', sortable: true },
            ]
        }
    }
}
</script>

<style scoped>
.myDrop ::v-deep(button) {
    border: 0px;
    color: white;
    background-color: #161A1E !important;
}

.myDrop ::v-deep(button:checked) {
    background-color: #161A1E !important;
}

.myDrop ::v-deep(button:hover) {
    background-color: #161A1E !important;
    color: white;
}

.navbar.navbar-dark.bg-dark {
    background-color: #161A1E !important;

}

.navItemDrop span {
    color: red;
}

.myTable>>>table {
    color: white !important
}

.notFav:hover {
    color: green;
    cursor: pointer;
}

.symName {
    cursor: pointer;
}

.linkphantich {
    cursor: pointer !important;
}

.linkphantich:hover {
    cursor: pointer;
    color: #FCD336
}

.symName:hover {
    color: #FCD336
}

.tablePerp {
    font-size: 14px !important;
    font-weight: bold;
}
</style>
<style>
@font-face {
    font-family: Ampersand;
    src: url("https://perp-static.babyswap.finance/cloud-futures/static/fonts/Kanit/Kanit-Regular.ttf");
}

html,
body {
    height: 100vh;
    margin: 0;
    width: 100vw;
    font-family: "Ampersand" !important;
}

body {
    background-color: #161A1E;
    font-family: Inter, sans-serif;
    font-size: 14px;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

}

.colorToBlack {
    color: black !important
}

.symbolNamePerp:hover {
    color: rgb(252, 212, 53)
}

.arrowDown:hover {
    color: greenyellow;
    cursor: pointer;
}

.deleteX {
    color: rgb(222, 72, 72);
    font-size: 15px;
    font-weight: bolder;
}

.deleteX:hover {
    color: red;
    cursor: pointer;
}

.blink_me {
    animation: blinker 1s linear infinite;
}

@keyframes blinker {
    50% {
        opacity: 0;
    }
}

.dot {
    height: 10px;
    width: 10px;
    background-color: red;
    border-radius: 50%;
    display: inline-block;
}

.dot:hover {
    cursor: pointer;
    background-color: rgb(229, 111, 111);
    ;
}
</style>