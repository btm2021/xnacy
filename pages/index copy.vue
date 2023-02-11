<template>
    <client-only>

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
                    <b-row v-if="currentSymbolStatis" style="border-bottom: 1px #2B313A solid;height:70px;">
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

                    </b-row>
                    <b-row>

                        <b-col cols="12" ref="tdvCol" :key="eh">
                            <tvchart @orderEvent="orderEvent(event)" ref="tvchart" :width="ew" :height="eh"
                                :v-if="dataReady" :key="currentSymbol" :symbol="currentSymbol"></tvchart>
                        </b-col>
                    </b-row>

                </b-col>

                <b-col class="w-100 h-100" style="font-size:12px" sm="12" md="12" lg="3" xl="3">
                    <div>
                        <b-row style="height:50vh">
                            <b-col cols="12">

                                <b-table :filter="filterPerp" filter-debounce="100" sticky-header="50vh"
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

                                </b-table>
                            </b-col>

                        </b-row>
                        <b-row style="margin-top:3%;border-bottom: 1px solid  #2B313A;">
                            <b-col cols="12">
                                <b-button-group style="width:100%">
                                    <b-button :disabled="entryAction.listOrder.length > 0"
                                        @click="orderType = 'LONG'; deleteOrder()" variant="success">LONG</b-button>
                                    <b-button :disabled="entryAction.listOrder.length > 0" @click="orderType = 'SHORT'"
                                        variant="danger">SHORT</b-button>
                                </b-button-group>
                            </b-col>
                            <b-col cols="12" class="mt-3">
                                <b-form>
                                    <b-form-group id="input-group-1" label="Số tiền margin (USDT)">
                                        <b-form-input type="number" :disabled="!(entryAction.listOrder.length === 0)"
                                            v-model="entryMargin" required></b-form-input>
                                    </b-form-group>
                                    <b-form-group :label="'Đòn bẩy ' + entryLevager + 'X'">
                                        <b-form-input type="range" v-model="entryLevager" min="1" max="125" step="1">
                                        </b-form-input>
                                    </b-form-group>
                                    <div class="accordion" style="background-color:#1E2328" role="tablist">
                                        <b-card no-body>
                                            <b-card-header header-tag="header" class="p-1" role="tab">
                                                <b-button size="sm" block v-b-toggle.entry variant="warning">
                                                    Entry({{ entryAction.listOrder.length }})
                                                </b-button>
                                            </b-card-header>
                                            <b-collapse class="colorToBlack" id="entry" accordion="entry"
                                                role="tabpanel">

                                                <b-row style=" ">
                                                    <b-container>
                                                        <b-col cols="12">

                                                            <h3 class="text-center"><span
                                                                    v-if="entryAction.listOrder.length < configOrder.entry.maxCount"
                                                                    @click="addEntryInput = true;" class="linkphantich">
                                                                    ⊕
                                                                </span>
                                                                {{ entryAction.listOrder.length }}

                                                            </h3>

                                                            <b-input-group v-show="addEntryInput" class="mb-2">
                                                                <b-form-input autocomplete="off" type="number"
                                                                    v-model="modelEntryInput">
                                                                </b-form-input>

                                                                <template #append>

                                                                    <b-button variant="outline-primary"
                                                                        @click="addEntry()">
                                                                        Add</b-button>
                                                                </template>
                                                            </b-input-group>


                                                        </b-col>
                                                        <b-col cols="12">
                                                            <b-table-simple responsive bordered hover striped
                                                                class="text-center">
                                                                <b-thead>
                                                                    <b-tr>
                                                                        <b-th>Order</b-th>
                                                                        <b-th>Price</b-th>
                                                                        <b-th>Margin</b-th>
                                                                        <b-th>Percent</b-th>
                                                                        <b-th>#</b-th>
                                                                    </b-tr>
                                                                </b-thead>
                                                                <b-tbody>

                                                                    <b-tr
                                                                        v-for="(item, index1) in entryAction.listOrder"
                                                                        :key="index1">
                                                                        <b-td>{{ index1 + 1 }}</b-td>
                                                                        <b-td>
                                                                            {{ item.price }}
                                                                        </b-td>
                                                                        <b-td>{{ item.margin }}</b-td>
                                                                        <b-td>{{ item.percent }}%</b-td>
                                                                        <b-td><span class="deleteX"
                                                                                @click="deleteEntry(item.price)">X</span>
                                                                        </b-td>
                                                                    </b-tr>
                                                                </b-tbody>
                                                            </b-table-simple>
                                                            <div v-if="entryAction.listOrder.length > 0">

                                                                * Tóm tắt : <br />
                                                                Bạn sẽ tạo
                                                                <code>{{ entryAction.listOrder.length }}</code>
                                                                Order vào lệnh.Margin ban đầu {{ entryMargin }} được
                                                                chia
                                                                đều ra <code>{{ entryAction.listOrder.length }}</code>
                                                                lần, mổi lần
                                                                <code>{{ entryAction.listOrder[0].margin }}</code> USDT
                                                                để
                                                                vào.
                                                            </div>
                                                        </b-col>

                                                    </b-container>

                                                </b-row>
                                            </b-collapse>
                                        </b-card>
                                        <b-card no-body>
                                            <b-card-header header-tag="header" class="p-1" role="tab">
                                                <b-button size="sm" block v-b-toggle.takeprofit variant="success">
                                                    Take Profit(0/{{ configOrder.takeprofit.maxCount }}chưa làm)
                                                </b-button>
                                            </b-card-header>
                                            <b-collapse id="takeprofit" accordion="my-accordion" role="tabpanel">
                                                <b-row style="color:black">
                                                    <b-col cols="12">
                                                        <h3 class="text-center"><span class="linkphantich">
                                                                ⊕
                                                            </span> {{ 0 }}/{{ 5 }} <span v-b-tooltip.hover
                                                                title="Thay đổi tỉ lệ trong phần cấu hình"><code>50:50</code></span>
                                                        </h3>
                                                    </b-col>
                                                    <b-col cols="12">
                                                        <b-table-simple responsive>
                                                            <b-tbody>
                                                                <b-tr>
                                                                    <b-th>1</b-th>
                                                                    <b-th>19312.12</b-th>
                                                                    <b-td>50%</b-td>
                                                                    <b-td><span class="deleteX">X</span></b-td>
                                                                </b-tr>
                                                                <b-tr>
                                                                    <b-th>2</b-th>
                                                                    <b-th>19231.12</b-th>
                                                                    <b-td>50%</b-td>
                                                                    <b-td><span class="deleteX">X</span></b-td>
                                                                </b-tr>

                                                            </b-tbody>
                                                        </b-table-simple>
                                                    </b-col>

                                                </b-row>
                                            </b-collapse>
                                        </b-card>
                                        <b-card no-body>
                                            <b-card-header header-tag="header" class="p-1" role="tab">
                                                <b-button size="sm" block v-b-toggle.stoploss variant="primary">
                                                    Stoploss(chưa làm)
                                                </b-button>
                                            </b-card-header>
                                            <b-collapse id="stoploss" accordion="my-accordion" role="tabpanel">
                                                <b-row style="color:black">
                                                    <b-col cols="12">
                                                        <h3 class="text-center"><span class="linkphantich">
                                                                ⊕
                                                            </span> {{ 0 }}/{{ 2 }} <span v-b-tooltip.hover
                                                                title="Thay đổi tỉ lệ trong phần cấu hình"><code>50:50</code></span>
                                                        </h3>
                                                    </b-col>
                                                    <b-col cols="12">
                                                        <b-table-simple responsive>
                                                            <b-tbody>
                                                                <b-tr>
                                                                    <b-th>19312.12</b-th>
                                                                    <b-td>100%</b-td>
                                                                    <b-td><span class="deleteX">X</span></b-td>
                                                                </b-tr>

                                                            </b-tbody>
                                                        </b-table-simple>
                                                    </b-col>

                                                </b-row>
                                            </b-collapse>
                                        </b-card>

                                    </div>
                                </b-form>


                            </b-col>
                            <b-col cols="12" class="mt-3">
                                <b-button v-if="orderType === 'LONG'" block variant="success">Đặt Order LONG</b-button>
                                <b-button v-else block variant="danger">Đặt Order SHORT</b-button>
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
                                        </b-row>
                                    </b-tab>


                                    <b-tab title="Copytrade" active>
                                        <b-row style="color:white">
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
                                        </b-row>

                                    </b-tab>
                                    <b-tab title="Log hệ thống">
                                        <div style="color:white">

                                            <b-table style="color:white" small hover striped bordered
                                                :items="msgStreamCp" :fields="msgStreamCpFields" show-empty></b-table>

                                        </div>
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
                <b-modal ok-only hide-footer scrollable size="xl" title="Cấu hình" id="m-cauhinh">
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
                                <b-tab @click="getAllAccountJSON" title="Chỉnh tài khoản">
                                    <div>
                                        <b-container>
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
                                        </b-container>
                                    </div>
                                </b-tab>
                                <b-tab title="Server">
                                    <b-container>
                                        <b-row>
                                            <b-col cols="12">
                                                <b-button block @click="sendResetServer" variant="danger">
                                                    Khởi động lại
                                                </b-button>
                                            </b-col>
                                        </b-row>
                                    </b-container>
                                </b-tab>
                            </b-tabs>
                        </b-card>
                    </div>

                </b-modal>
                <b-modal ok-only hide-footer scrollable size="xl" title="Tổng thị trường" id="m-tongthitruong">
                    <b-row>
                        <b-col cols="12">
                            <todo />
                        </b-col>
                    </b-row>
                </b-modal>
                <b-modal ok-only hide-footer scrollable size="xl" title="Lịch kinh tế" id="m-lichkinhte">
                    <b-row class="h-50">
                        <b-col cols="12">
                            <lichkinhte></lichkinhte>
                        </b-col>

                    </b-row>
                </b-modal>
                <b-modal @show="setPhanTich()" ok-only hide-footer scrollable size="xl" title="Phân tích"
                    id="m-phantichsymbol">
                    <b-row style="color:black" class="h-50">
                        <b-col class="h-50">
                            <b-embed v-if="linkphantich" type="iframe" aspect="16by9" :src="linkphantich"
                                allowfullscreen>
                            </b-embed>
                        </b-col>
                    </b-row>
                </b-modal>
                <b-modal ok-only hide-footer scrollable size="xl" title="Chỉ số chung crypto" id="m-chisochung">
                    <b-row class="h-50">
                        <b-col cols="12">
                            <chisochung></chisochung>
                        </b-col>

                    </b-row>
                </b-modal>
                <b-modal ok-only hide-footer scrollable size="xl" title="HeatMap crypto" id="m-heatmap">
                    <b-row class="h-50">
                        <b-col cols="12">
                            <heatmap></heatmap>
                        </b-col>

                    </b-row>
                </b-modal>
                <b-modal ok-only hide-footer scrollable size="xl" title="Theo Dõi giao dịch crypto" id="m-livetrans">
                    <b-row class="h-50">
                        <b-col cols="12">
                            <livetransaction />
                        </b-col>

                    </b-row>
                </b-modal>
                <b-modal ok-only hide-footer scrollable size="xl" title="Backtest" id="m-backtest">
                    <b-row class="h-50">
                        <b-col cols="12">
                            <b-embed src="backtest" />
                        </b-col>

                    </b-row>
                </b-modal>
            </div>

        </div>
    </client-only>

</template>

<script>


export default {
    head() {
        return {
            title: this.getTitle((this.currentSymbolRealTimeMarkPrice) ? parseFloat(String(parseFloat(this.currentSymbolRealTimeMarkPrice.p))) : 0)
        }
    },
    computed: {
        
    },
    methods: {
        //account
       
        handleOkChangeAccountMaster() {
            // let link = 'http://localhost:3000/' + 'acc';
            // this.$axios.post(link, {
            //   action: 'setmaster',
            //   idAccount: 'bao1',
            //   infoAccount: JSON.stringify({ hello: 'world' })
            // })
            if (this.changeAccMaster) {
                let link = this.linkbase + 'acc';
                this.$axios.post(link, {
                    action: 'setmaster',
                    idAccount: this.changeAccMaster,
                    infoAccount: JSON.stringify({ hello: 'world' })
                }).then(data => {
                    this.$bvToast.toast(`Thay đổi master thành công, vui lòng chờ server reload`, {
                        title: 'Thông báo',
                        autoHideDelay: 5000,
                        appendToast: true,
                        variant: 'success'
                    })
                })

            } else {
                this.$bvToast.toast(`Vui Lòng Chọn 1 Acc để set thành Master`, {
                    title: 'Lỗi',
                    autoHideDelay: 5000,
                    appendToast: true,
                    variant: 'danger'
                })
            }
        },
        setOptionChangeAccountMaster() {
            this.allAccount.forEach(acc => {
                this.optionChangeAccMaster.push(acc.name)
            })
        },
        getAccount() {
            let urlInfo = 'https://nacy.duckdns.org/infoAccount'
            this.$axios.post(urlInfo, {
                action: 'all'
            }).then(data => {
                this.allAccount = data.data;
                this.optionChangeAccMaster = []
                this.setOptionChangeAccountMaster();
                if (this.nameAccountMaster) {
                    let name = this.nameAccountMaster;
                    this.accountMaster = data.data.find(item => item.name === name.name)
                }
                setTimeout(() => {
                    this.getAccount();
                }, 3000)

            })

        },

        getAllAccountJSON() {

            let link = this.linkbase + 'acc';
            this.$axios.post(link, {
                action: 'read',
                idAccount: '99999',
                infoAccount: JSON.stringify({ hello: 'world' })
            }).then(data => {
                this.ListAccountsJSON = data.data.ListAccount
                let accmaster = data.data.ListAccount.find(item => item.role === 'master')
                this.nameAccountMaster = accmaster

            })

        },
        toggleStatus(data) {
            let id = data.id;
            let link = this.linkbase + "acc"
            let status = (data.status) ? "TẮT" : "BẬT"

            this.$bvModal.msgBoxConfirm(`Bạn muốn ${status} account ${id} `, {
                title: 'Xác nhận',
                size: 'sm',
                buttonSize: 'sm',
                okVariant: 'danger',
                okTitle: 'YES',
                cancelTitle: 'NO',
                footerClass: 'p-2',
                hideHeaderClose: false,
                centered: true
            })
                .then(value => {
                    if (value) {
                        if (status) {
                            this.$axios.post(link, {
                                action: (data.status) ? "turnoff" : "turnon",
                                idAccount: id,
                                infoAccount: JSON.stringify({ hello: 'world' })
                            }).then(data => {
                                this.$bvToast.toast(`${(data.status) ? "Tắt" : "Bật"} account ${id} thành công, server sẽ reload trong 1s`, {
                                    title: 'Thông báo',
                                    autoHideDelay: 5000,
                                    appendToast: true,
                                    variant: 'success'
                                })
                            })
                        }
                    }
                })
        },
        sendResetServer() {
            let link = this.linkbase + 'acc';
            this.$axios.post(link, {
                action: 'restartserver',
                idAccount: '',
                infoAccount: JSON.stringify({ hello: 'world' })
            })
            this.$bvToast.toast(`Khởi động lại server thành công`, {
                title: 'Thông báo',
                autoHideDelay: 5000,
                appendToast: true,
                variant: 'info'
            })
            this.$bvModal.hide('modalChangeServer')

        },
        getShort(str) {
            return `${str[0]}${str[1]}${str[2]}...${str[str.length - 3]}${str[str.length - 2]}${str[str.length - 1]}`
        },
        //
        syncOrderLine() {
            this.$nextTick(() => {
                this.$refs.tvchart.deleteAllOrderLine()
                this.entryAction.listOrder.map(item1 => {
                    let orderObject = { symbol: this.currentSymbol, entryPrice: item1.price, percent: item1.percent, quantity: item1.margin, side: this.orderType, type: 'entry' }
                    this.$refs.tvchart.createOrderLine(orderObject)
                })
            })

        },
        orderEvent(event) {
            //change originPrice to newPrice
            this.$refs.tvchart.deleteAllOrderLine()
            let { newPrice, originPrice, type } = event;
            switch (type) {
                case "moveEntry": {
                    let item = this.entryAction.listOrder.findIndex(i => i.price === originPrice)
                    if (item >= 0) {
                        this.entryAction.listOrder[item].price = newPrice
                    }
                } break;
                case "deleteEntry": {
                    this.deleteEntry(originPrice)
                } break;
            }
            this.syncOrderLine();

        },
        deleteOrder() {

        },

        getTitle(number) {

            let item = this.rawExchangeSymbol.find(item => item.symbol === this.currentSymbol)
            if (item) {
                return parseFloat(String(number.toFixed(item.pricePrecision)))
            } else {
                return number;
            }


        },
        deleteEntry(price) {

            if (this.entryAction.listOrder.length === 1) {
                this.entryAction.listOrder = [];
            } else {
                let newArray = this.entryAction.listOrder.filter(i => i.price != price)
                let newListOrder = []
                newArray.map(item => {
                    let percent = Math.round(100 / (newArray.length))
                    let margin = Math.round(percent * (parseFloat(this.entryAction.margin)) / 100)
                    newListOrder.push({
                        percent,
                        margin,
                        price: item.price,
                    })
                })
                this.entryAction.listOrder = newListOrder;
            }
            this.syncOrderLine();
        },
        addEntry() {

            if (!this.modelEntryInput > 0) {
                this.makeToast("Cảnh báo", "Vui lòng nhập giá trị phù hợp")
                return;
            }
            //* kiểm tra và phân thành tỉ lệ thích hợp dựa trên entry
            let listOrder = this.entryAction.listOrder;
            let checkPriceTrunk = listOrder.find(i => i.price === parseFloat(this.modelEntryInput))
            if (checkPriceTrunk) {
                this.makeToast("Cảnh báo", "Giá nhập vào đã trùng")
                return;
            }
            let order = null
            let margin = 0;
            let price = 0;
            let percent = 0;
            if (listOrder.length === 0) {
                this.entryAction.margin = parseFloat(this.entryMargin)
                order = {
                    price: parseFloat(this.modelEntryInput),
                    percent: 100 / (listOrder.length + 1),
                    margin: parseFloat(this.entryMargin) / 100 / (listOrder.length + 1) * 100,
                }
                margin = parseFloat(this.entryMargin) / 100 / (listOrder.length + 1) * 100;
                percent = 100 / (listOrder.length + 1);
                price = parseFloat(this.modelEntryInput)
                listOrder.push(order);
                let orderObject = { symbol: this.currentSymbol, entryPrice: price, percent, quantity: margin, side: this.orderType, type: 'entry' }
                this.$refs.tvchart.createOrderLine(orderObject)

            } else {
                //delete all orderLine
                percent = Math.round(100 / (listOrder.length + 1))
                margin = Math.round(parseFloat(this.entryMargin) * (Math.round(100 / (listOrder.length + 1))) / 100)
                price = parseFloat(this.modelEntryInput)
                this.$refs.tvchart.deleteAllOrderLine()
                let newListOrder = []
                listOrder.map(item => {
                    let percent = Math.round(100 / (listOrder.length + 1))
                    let margin = Math.round(percent * (parseFloat(this.entryMargin)) / 100)
                    newListOrder.push({
                        percent,
                        margin,
                        price: item.price,
                    })
                    let orderObject = { symbol: this.currentSymbol, entryPrice: item.price, percent, quantity: margin, side: this.orderType, type: 'entry' }
                    this.$refs.tvchart.createOrderLine(orderObject)
                })
                order = {
                    price: parseFloat(this.modelEntryInput),
                    percent: Math.round(100 / (listOrder.length + 1)),
                    margin: Math.round(parseFloat(this.entryMargin) * (Math.round(100 / (listOrder.length + 1))) / 100)
                }
                let orderObject = { symbol: this.currentSymbol, entryPrice: price, percent, quantity: margin, side: this.orderType, type: 'entry' }
                this.$refs.tvchart.createOrderLine(orderObject)
                newListOrder.push(order)
                listOrder = newListOrder;
            }

            this.entryAction.listOrder = listOrder
            this.modelEntryInput = null;
            this.addEntryInput = false;


        },
        getRSI() {
            let url = `https://scan15m.baotrinh1.repl.co/indicator?timestamp=${new Date().getTime()}`;
            this.$axios.get(url).then(data => {
                let f = data.data;
                let item = f.find(i => i.name === this.currentSymbol)
                let rsi = item.rsi14.value.value;
                this.currentSymbolRSI15m = rsi
            })
        },
        getCountDown(tf) {
            let now = new Date().getTime();
            let distance = new Date(tf) - now;
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);
            return `${hours}H:${minutes}M:${seconds}`;

        },
        getFunding() {
            let url = `https://fapi.binance.com/fapi/v1/premiumIndex?symbol=${this.currentSymbol}`;
            this.$axios.get(url).then(p => {
                let f = parseFloat(p.data.lastFundingRate)
                this.currentSymbolFundingRate = parseFloat((f * 100.0).toFixed(4));
                this.currentSymbolFundingRateCountDown = p.data.nextFundingTime
            })


        },
        formatPrice(symbolName, price) {
            let priceAfterFormat = 0;
            let rawExchangeSymbol = this.rawExchangeSymbol;
            if (rawExchangeSymbol.length > 0) {
                let pricePoint = rawExchangeSymbol.find(i => i.symbol === symbolName);
                return parseFloat(String(parseFloat(price).toFixed(pricePoint.pricePrecision)));
            } else {
                return price;
            }
        },
        getInit() {

            //get list 
            this.$axios.get('https://fapi.binance.com/fapi/v1/exchangeInfo').then(data => {
                let listCoinSupport = []
                data.data.symbols.map(item => {
                    if (!String(item.symbol).includes('_')) {
                        listCoinSupport.push(item.symbol)
                    }
                })
                this.rawExchangeSymbol = data.data.symbols;
                let logWS = new WebSocket("wss://baotm.duckdns.org/wss")
                logWS.onmessage = (evt) => {
                    var received_msg = evt.data;
                    console.log(received_msg)
                }
                let markPriceWS = new WebSocket("wss://fstream.binance.com/ws/!markPrice@arr@1s");
                markPriceWS.onmessage = (evt) => {
                    var received_msg = evt.data;
                    let rawMarkPrice = JSON.parse(received_msg);
                    this.realTimePrice = rawMarkPrice;
                    let markPrice = []
                    let rawExchangeSymbol = this.rawExchangeSymbol
                    let pricePoint = rawExchangeSymbol.find(i => i.symbol === this.currentSymbol);
                    if (!this.currentSymbolRealTimeMarkPrice) {

                        let currentSymbolRealTimeMarkPrice = rawMarkPrice.find(item => item.s === this.currentSymbol)
                        let bs = parseFloat(currentSymbolRealTimeMarkPrice.p)
                        if (pricePoint) {
                            bs = parseFloat(String((parseFloat(currentSymbolRealTimeMarkPrice.p)).toFixed(pricePoint.pricePrecision)));
                        }
                        this.currentSymbolRealTimeMarkPrice = { ...currentSymbolRealTimeMarkPrice, ps: 'none', bs }
                    } else {
                        let currentSymbolRealTimeMarkPrice = rawMarkPrice.find(item => item.s === this.currentSymbol)
                        let ps = 'none';
                        let bs = parseFloat(currentSymbolRealTimeMarkPrice.p)
                        if (pricePoint) {
                            bs = parseFloat(String((parseFloat(currentSymbolRealTimeMarkPrice.p)).toFixed(pricePoint.pricePrecision)));
                        }
                        let lastP = parseFloat(this.currentSymbolRealTimeMarkPrice.p)
                        let p = parseFloat(currentSymbolRealTimeMarkPrice.p)
                        if (lastP === p) {
                            ps = 'none'
                        } else if (lastP > p) {
                            ps = 'down'
                        } else {
                            ps = 'up'
                        }
                        this.currentSymbolRealTimeMarkPrice = { ...currentSymbolRealTimeMarkPrice, ps, bs }
                    }

                    rawMarkPrice.map(item => {
                        if (this.rawExchangeSymbol.length > 0) {
                            let infoInRaw = this.rawExchangeSymbol.filter(i => {
                                return (i.symbol === item.s)
                            })
                            if (infoInRaw.length === 1) {
                                let precisionPrice = infoInRaw[0].pricePrecision;
                                let lastPrice = this.lastPriceList.filter(i => {
                                    return i.s === item.s
                                })
                                let p = parseFloat(String(parseFloat(item.p).toFixed(precisionPrice)));
                                let isFav = false
                                let isFavItem = this.favList.filter(i => {

                                    return i === item.s
                                })

                                isFav = (isFavItem.length > 0)
                                if (lastPrice.length > 0) {
                                    let ps = "down"
                                    if (lastPrice[0].p === p) {
                                        ps = "none"
                                    } else if (lastPrice[0].p > p) {
                                        ps = "down"
                                    } else {
                                        ps = "up"
                                    }
                                    markPrice.push({
                                        s: item.s,
                                        p,
                                        r: (parseFloat(item.r) * 100).toFixed(3),
                                        ps,
                                        f: isFav
                                    })

                                } else {
                                    markPrice.push({
                                        s: item.s,
                                        p,
                                        r: (parseFloat(item.r) * 100).toFixed(3),
                                        ps: 'none',
                                        f: false
                                    })
                                }



                            }


                        }

                    })
                    this.lastPriceList = this.markPriceList;
                    this.markPriceList = markPrice;



                };

                this.listCoinSupport = listCoinSupport
                //  this.favList = listCoinSupport
            })
        },
        makeToast(title, msg) {
            this.$bvToast.toast(msg, {
                title: title,
                autoHideDelay: 5000,
                appendToast: true,
                variant: 'warning'
            })
        },
        favDel(item) {

            let list = this.favList.filter(i => i != item)
            this.favList = list;
            this.saveFav();
        },
        addFav() {
            let index = this.favList.find(i => i === String(this.favSym).toUpperCase())
            let indexInList = this.listCoinSupport.find(i => i === String(this.favSym).toUpperCase())
            if (!index && indexInList && this.favSym) {
                this.favList.push(String(this.favSym).toUpperCase())
                this.favSym = null;
                this.favStatus = false;
            } else {
                this.makeToast('Thông báo', 'Symbol đã tồn tại hoặc mã không hỗ trợ')
                this.favSym = null;
                this.favStatus = false;
            }
            this.saveFav();
        },
        changeTimeFrame(tf) {

            this.timeframeSelect = tf.name;
            this.currentTimeFrame = tf;
            this.getTimeFrameAnalyze(this.currentTimeFrame.url).then(data => {
                this.currentDataList = data;
                setTimeout(() => {
                    this.changeTimeFrame(this.currentTimeFrame);
                }, 1000)
            })
        },
        getTimeFrameAnalyze(url) {
            return new Promise((resolve, reject) => {
                url = `${url}/indicator?timestamp=${new Date().getTime()}`
                this.$axios.get(url).then(data => {
                    // console.log(data.data)
                    let newList = []
                    // data.data.map(item => {
                    //     let item1 = this.favList.find(i => item.name === i)
                    //     if (item1) {
                    //         newList.push({ ...item, isFav: true })
                    //     } else {
                    //         newList.push({ ...item, isFav: false })
                    //     }
                    // })

                    resolve(newList)
                    //  setTimeout(this.getTimeFrameAnalyze(url), 5000)
                })
            })
        },
        saveFav() {
            localStorage.setItem("favList", JSON.stringify(this.favList))
        },
        loadFav() {
            let favList = localStorage.getItem('favList');
            if (favList) {
                return JSON.parse(favList);
            } else {
                this.saveFav();
                return []
            }
        },
        getWSStream() {
            this.currentSymbolWS = new WebSocket("wss://fstream.binance.com/ws/!markPrice@arr");
        },
        formatN(n) {
            let s = "";

            if (n > 1000000000) {
                s = ((n / 1000000000)).toFixed(2) + "B"
            } else if (n < 1000000000 && n > 1000000) {
                s = ((n / 1000000)).toFixed(2) + "M"
            } else if (n < 1000000 && n > 1000) {
                s = ((n / 1000000)).toFixed(2) + "K"
            }
            return s
        },
        getAllSymbolInfo() {
            let url = `https://fapi.binance.com/fapi/v1/ticker/24hr`
            this.$axios.get(url).then(data => {
                let newList = []
                let lastInfo = this.rawAllSymbolInfo;
                let newInfo = data.data
                if (lastInfo.length > 0) {
                    lastInfo.map(item => {
                        let itemFind = newInfo.find(i => i.symbol === item.symbol)
                        let ps = "none";
                        let bs = 0;
                        let bv = 0
                        if (parseFloat(itemFind.lastPrice) > parseFloat(item.lastPrice)) {
                            ps = "up"
                        } else {
                            ps = "down"
                        }
                        bv = parseFloat(item.volume)
                        bs = parseFloat(String(parseFloat(item.lastPrice)))
                        newList.push({ ...itemFind, ps, bs, bv })
                    })
                } else {
                    newInfo.map(item => {
                        let ps = "none";
                        let bs = 0
                        let bv = 0;
                        bv = parseFloat(item.volume)
                        bs = parseFloat(String(parseFloat(item.lastPrice)))
                        newList.push({ ...item, ps, bs, bv })
                    })
                }
                this.rawAllSymbolInfo = newList;
                setTimeout(() => { this.getAllSymbolInfo() }, 3000)
            })
        },
        getRealtimePrice(sym) {
            let item = null;
            if (this.realTimePrice.length > 0) {
                item = this.realTimePrice.find(i => i.s === sym)
            }
            if (item) {
                return parseFloat(item.p)
            } else {
                return 0;
            }
        },
        phantich(name) {

            this.currentSymbol = name;
            let url = `https://fapi.binance.com/fapi/v1/ticker/24hr?symbol=${name}`
            this.$axios.get(url).then(data => {
                this.currentSymbolStatis = data.data;
            })
            this.getFunding();
            // this.getRSI();
        },
        receptor(msg) {
            this.msgStreamCp.push({ text: JSON.parse(msg.message), time: new Date() })
        },


    },
    created() {
        this.$nuxt.$on('orderEvent', ($event) => this.orderEvent($event))
    },
    mounted() {
        //subscript to baotm.duckdns.org
        let _url = 'ws://15.235.140.236:3000/ws'

        this.$pnSubscribe({ channels: ['mychannel'], withPresence: true });
        this.$pnGetMessage('mychannel', this.receptor);
        this.getAllAccountJSON();
        this.getAccount();

        this.dataReady = true;
        this.$nextTick(() => {
            this.eh = (this.$refs.tdvCol.clientHeight || 500) + 100 + "px";
            this.ew = (this.$refs.tdvCol.clientWidth || 500) - 30 + "px"
        });

        this.favList = this.loadFav();
        this.getInit();
        this.changeTimeFrame({ name: '15m', url: 'https://scan15m.baotrinh1.repl.co' })
        this.phantich('BTCUSDT')
        this.getAllSymbolInfo();

    },
    data() {
        return {
            linkphantich: null,
            realTimePrice: [],
            nameAccountMaster: null,
            accountMaster: null,
            linkbase: 'https://nacy.duckdns.org/',
            chinhsuaaccountfields: [
                { key: "id" },
                { key: 'role' },
                { key: 'status' },
                { key: 'apikey' },
                { key: 'apisec' },
                { key: 'tool' },
            ],
            ListAccountsJSON: [],
            changeAccMaster: '',
            optionChangeAccMaster: [],
            allAccount: [],
            positionFields: [
                { key: 'symbol' },
                {
                    key: 'side', formatter: (value, key, item) => {

                        return (parseFloat(item.notional) > 0) ? "LONG" : "SHORT"
                    }
                }, {
                    key: 'entryPrice', formatter: (value, key, item) => {

                        return this.formatPrice(item.symbol, item.entryPrice)
                    }
                }, {
                    key: 'price', formatter: (value, key, item) => {
                        let a = this.getRealtimePrice(item.symbol)
                        a = this.formatPrice(item.symbol, a)
                        return a;
                    }
                },
                {
                    key: 'initialMargin', label: 'Size', formatter: (value, key, item) => {

                        return (parseFloat(item.initialMargin)).toFixed(1)
                    }
                },
                {
                    key: 'unrealizedProfit', label: 'PNL', formatter: (value, key, item) => {

                        return (parseFloat(item.unrealizedProfit)).toFixed(1)
                    }
                },


                { key: 'tool', label: '#' },
            ],
            orderWaitFields: [
                { key: 'symbol' },
                {
                    key: 'side', formatter: (value, key, item) => {
                        return (item.side === 'BUY') ? 'LONG' : 'SHORT'
                    }
                },
                {
                    key: 'price', label: 'Entry', formatter: (value, key, item) => {
                        return (parseFloat(item.price)).toFixed(1)
                    }
                },
                {
                    key: 'initMargin', label: 'Vốn',
                    formatter: (value, key, item) => {

                        return (parseFloat(item.price) * parseFloat(item.origQty) / 20).toFixed(1)
                    }
                },

                { key: 'tool', label: '#' },

            ],
            msgStreamCp: [],
            msgStreamCpFields: [

                {
                    key: 'time', label: "Thời gian ",
                    formatter: (value, key, item) => {
                        return this.$moment(item.time).format('hh:mm:ss a')
                    }
                },
                { key: 'text', label: "thông báo" }
            ],
            count: 0,
            eh: "100px",
            ew: "100px",
            dataReady: false,
            modelPercentSelectState: false,
            entryLevager: 20,
            entryMargin: 4000,
            modelEntryInput: 0,
            modelPercentInput: 50,
            addEntryInput: false,
            entryAction: {

                margin: 0,
                listOrder: []
            },

            configOrder: {
                entry: {
                    maxCount: 5
                },
                takeprofit: {
                    maxCount: 5
                },
                stoploss: {
                    maxCount: 1
                },
            },
            filterPerp: null,
            rawAllSymbolInfo: [],
            orderType: 'SHORT',
            rsiFilter: null,
            currentTimeFrame: null,
            currentSymbol: 'BTCUSDT',
            currentSymbolStatis: null,
            currentSymbolRealTimeMarkPrice: null,
            currentSymbolFundingRate: 0,
            currentSymbolFundingRateCountDown: 0,
            currentSymbolRSI15m: 0,
            currentDataList: [],
            timeframeSelect: '15m',
            filter: null,
            pepFields: [
                { key: "symbol", label: "Symbol", sortable: true },
                { key: "lastPrice", label: "Last Price", sortable: true },
                { key: "priceChangePercent", label: "Change %", sortable: true },
                { key: "bv", label: "Volume", sortable: true },
            ],
            fields: [
                {
                    key: "isFav", label: '⭐',
                    sortable: true,
                },
                { key: "name" },
                { key: "timeframe", label: 'T' },
                { key: "lastPrice", label: 'price' },
                {
                    key: 'symbolQuote.priceChangePercent', label: '%',
                    sortable: true
                },
                {
                    key: "rsi14.value.value",
                    label: "RSI",
                    sortable: true
                }
            ],

            rawExchangeSymbol: [],
            rawMarkPrice: [],
            markPriceList: [],
            lastPriceList: [],
            favField: [
                { key: 'f', label: '', class: 'favCell', },
                { key: 's', label: 'Symbol' },
                { key: 'p', label: 'Price' }
            ],
            dataReady: false,
            favStatus: false,
            listCoinSupport: [

            ],
            favSym: null,
            favList: ['BTCUSDT', 'ETHUSDT'],
            tabs: [],
            tabCounter: 0,
            listCoinWatch: [
                'BTCUSDT', 'ETHUSDT', 'BNBUSDT', 'CAKEUSDT', 'XRPUSDT', 'ADAUSDT', 'SOLUSDT', 'DOGEUSDT', 'MATICUSDT', 'DOTUSDT',
                'TRXUSDT', 'SHIBUSDT', 'AVAXUSDT', 'UNIUSDT', 'LTCUSDT', 'LINKUSDT', 'ATOMUSDT', 'LUNAUSDT', 'FILUSDT', 'APEUSDT', 'MANAUSDT', 'GMTUSDT', 'SNXUSDT', 'ENSUSDT'
            ],
            layout: [
                { "x": 0, "y": 1, "w": 8, "h": 15, "i": "chart", },
                { "x": 8, "y": 1, "w": 2, "h": 15, "i": "order" },
                { "x": 10, "y": 1, "w": 2, "h": 15, "i": "fav" },
                { "x": 0, "y": 8, "w": 12, "h": 5, "i": "pos", },
            ],
            listlinkscan: [
                {
                    name: '5m',
                    url: 'https://scan5m.baotrinh1.repl.co',
                    tdvtime: '5',
                    default: false,
                    dataList: [],
                    chartOptions: {
                        "autosize": true,
                        "symbol": "BINANCE:BTCUSDTPERP",
                        "interval": "5",
                        "timezone": "Etc/UTC",
                        "theme": "dark",
                        "locale": "vi_VN",
                        "toolbar_bg": "#f1f3f6",
                        "enable_publishing": false,
                        "withdateranges": true,
                        "hide_side_toolbar": false,
                        "allow_symbol_change": true,
                        "studies": [
                            "BB@tv-basicstudies",
                            "Stochastic@tv-basicstudies",
                            "ZigZag@tv-basicstudies"
                        ]
                    }
                },
                {
                    name: '15m',
                    url: 'https://scan15m.baotrinh1.repl.co',
                    tdvtime: '15',
                    dataList: [],
                    default: true,
                    chartOptions: {
                        "autosize": true,
                        "interval": "15",
                        "timezone": "Etc/UTC",
                        "theme": "dark",
                        "locale": "vi_VN",
                        "toolbar_bg": "#f1f3f6",
                        "enable_publishing": false,
                        "withdateranges": true,
                        "hide_side_toolbar": false,
                        "allow_symbol_change": true,
                        "studies": [
                            "BB@tv-basicstudies",
                            "Stochastic@tv-basicstudies",
                            "ZigZag@tv-basicstudies"
                        ]
                    }
                },
                {
                    name: '1h',
                    url: 'https://scan1h.baotrinh1.repl.co',
                    tdvtime: '1h',
                    default: false,
                    chartOptions: {
                        "autosize": true,
                        "interval": "60",
                        "timezone": "Etc/UTC",
                        "theme": "dark",
                        "locale": "vi_VN",
                        "toolbar_bg": "#f1f3f6",
                        "enable_publishing": false,
                        "withdateranges": true,
                        "hide_side_toolbar": false,
                        "allow_symbol_change": true,
                        "studies": [
                            "BB@tv-basicstudies",
                            "Stochastic@tv-basicstudies",
                            "ZigZag@tv-basicstudies"
                        ]
                    }
                },
                {
                    name: '4h',
                    url: 'https://scan4h.baotrinh1.repl.co',
                    tdv: '4h',
                    default: false,
                    dataList: [],
                    chartOptions: {
                        "autosize": true,
                        "interval": "240",
                        "timezone": "Etc/UTC",
                        "theme": "dark",
                        "locale": "vi_VN",
                        "toolbar_bg": "#f1f3f6",
                        "enable_publishing": false,
                        "withdateranges": true,
                        "hide_side_toolbar": false,
                        "allow_symbol_change": true,
                        "studies": [
                            "BB@tv-basicstudies",
                            "Stochastic@tv-basicstudies",
                            "ZigZag@tv-basicstudies"
                        ]
                    }
                }
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
</style>