<template>
    <div>
       
        <div id="containerId123" class="TVChartContainer" />
        <b-modal :hide-footer="true" ok-only @show="onResetCalc" @reset="onResetCalc" id="calcPnl"
            title="Tính PNL Future Binance">
            <b-form>
                <b-form-group>
                    <b-form-radio-group v-model="calc.side" :options="['LONG', 'SHORT']"
                        button-variant="outline-primary" buttons>
                    </b-form-radio-group>
                </b-form-group>

                <b-form-group>
                    <label>Đòn bẩy</label>
                    <b-form-input type="range" step="1" min="1" max="125" v-model="calc.levage" required>
                    </b-form-input>
                    <span>X{{ calc.levage }}</span>
                </b-form-group>

                <b-form-group>
                    <label>Số tiền</label>
                    <b-form-input type="range" min="1000" max="100000" step="1000" v-model="calc.margin" required>
                    </b-form-input>
                    <span>Sau Đòn Bẩy <code>{{ calc.margin }}</code> <b> USDT</b>: Vốn thực :
                        <code>{{(parseFloat(calc.margin) / parseFloat(calc.levage)).toFixed(1)}}</code><b>
                            USDT</b></span>
                </b-form-group>
                <b-form-group>
                    <label>Entry</label>
                    <b-form-input v-model="calc.entry" required>
                    </b-form-input>
                </b-form-group>
                <b-form-group>
                    <label>Exit</label>
                    <b-form-input v-model="calc.close" required>
                    </b-form-input>
                </b-form-group>
                <b-form-row>
                    <b-col>
                        <b-button type="button" @click="calcPNL" block variant="primary">Tính</b-button>
                    </b-col>

                    <b-col>
                        <b-button type="reset" block variant="danger">Reset</b-button>
                    </b-col>
                </b-form-row>


            </b-form>
            <b-table-simple fixed bordered class="text-center mt-2" v-if="calcStatus" responsive>

                <b-tbody>
                    <b-tr>

                        <b-td><b>Giá Entry</b></b-td>
                        <b-td>{{ calc.entry }}</b-td>
                        <b-td><b>Giá Đóng</b></b-td>
                        <b-td>{{ calc.close }}</b-td>
                    </b-tr>
                    <b-tr>

                        <b-td><b>Vị thế</b></b-td>
                        <b-td><span v-if="(calc.side === 'LONG')" style="color:#0CCB80">{{ calc.side }}</span><span
                                style="color:#F23545" v-else>{{ calc.side }}</span></b-td>
                        <b-td><b>Vốn</b></b-td>
                        <b-td>{{ calc.margin }}</b-td>
                    </b-tr>

                    <b-tr>
                        <b-td><b>PNL</b></b-td>
                        <b-td><span v-if="(calc.pnl > 0)" style="color:#0CCB80">{{ calc.pnl }}</span><span
                                style="color:#F23545" v-else>{{ calc.pnl }}</span></b-td>
                        <b-td><b>ROE %</b></b-td>
                        <b-td><span v-if="(calc.pnl > 0)" style="color:#0CCB80">{{ calc.roe }}</span><span
                                style="color:#F23545" v-else>{{ calc.roe }}</span></b-td>

                    </b-tr>
                </b-tbody>

            </b-table-simple>
        </b-modal>

        <b-modal size="xl" id="marketScan" no-close-on-esc no-close-on-backdrop no-stacking title="Market Scan">
            <b-row class="h-100">
                <b-col cols="12">
                    <marketscan />
                </b-col>

            </b-row>
        </b-modal>

        <b-modal id="entryCalc">
            <b-row class="h-50">
                <b-col cols="12">
                    <entrycalc></entrycalc>
                </b-col>

            </b-row>
        </b-modal>

        <b-modal id="m-todo">
            <b-row class="h-50">
                <b-col cols="12">
                    <todo />
                </b-col>

            </b-row>
        </b-modal>

        <b-modal size="xl" id="m-cauhinh" title="Cấu hình">
            <b-row class="h-100">
                <b-col cols="12">
                    <config />
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
                    <backtest />
                </b-col>

            </b-row>
        </b-modal>
    </div>
</template>
  
<script>

var aaa = []
var price = []
var listEma = []
let t2 = []
let listSignal = []
var t1Total = []
let t2Total = []
function getSignal(d1, d2) {
    //d1: ema
    //d2: trail2
    d1.splice(0, d1.length - d2.length);
    var cross = (d1[0] > d2[0]), indexes = [];
    for (var i = 0; i < d1.length; i++) {
        if (d1[i] < d2[i] && cross) {
            indexes.push({ index: i, cross: false, signal: 'SHORT' });
            cross = false;
        }
        if (d1[i] > d2[i] && !cross) {
            indexes.push({ index: i, cross: true, signal: 'LONG' });
            cross = true;
        }
    }

    return indexes;
}
async function __customIndicators(PineJS) {
    return Promise.resolve([
        {
            name: "HTKC",
            metainfo: {
                _metainfoVersion: 42,
                id: "HTKC@tv-basicstudies-1",
                name: "HTKC",
                description: "HTKC",
                shortDescription: "Hỗ trợ kháng cự",
                scriptIdPart: "",
                is_hidden_study: false,
                is_price_study: true,
                isCustomIndicator: true,

                plots: [
                    { id: 'plot_0', type: 'circle' },
                    {
                        id: 'plot_1',
                        type: 'circle',
                    },
                ],
                defaults: {
                    styles: {
                        plot_0: {
                            visible: true,
                            linewidth: 2,
                            plottype: 2,
                            trackPrice: false,
                            color: '#ef5350',
                            join: false,
                            transp: 20,
                            lineStyle: 0,
                        },
                        plot_1: {
                            visible: true,
                            linewidth: 2,
                            plottype: 2,
                            lineStyle: 0,
                            trackPrice: false,
                            color: '#26a69a',
                            join: false,
                            transp: 20,
                        },
                    },

                    inputs: {},
                },
                styles: {
                    plot_0: {
                        // Output name will be displayed in the Style window
                        title: 'VWAP value',
                    },
                },
                inputs: [],
            },
            constructor() {
                aaa = []
                this.init = function (context, inputCallback) {
                    this._context = context;
                    this._input = inputCallback;

                    const symbol = PineJS.Std.ticker(this._context);
                    this._context.new_sym(
                        symbol,
                        PineJS.Std.period(this._context),
                        PineJS.Std.period(this._context)
                    );
                };

                let lastXpup = 0;
                let lastXpdown = 0;

                this.main = function (context, inputCallback) {
                    this._context = context;
                    this._input = inputCallback;

                    this._context.select_sym(1);

                    // RSI
                    const src1 = this._context.new_var(PineJS.Std.close(this._context));
                    const len = 9;
                    const change = PineJS.Std.change(src1, context);
                    const max = this._context.new_var(PineJS.Std.max(change, 0));
                    const min = this._context.new_var(-PineJS.Std.min(change, 0));
                    const up1 = PineJS.Std.rma(this._context.new_var(max), len, context);
                    const down1 = PineJS.Std.rma(this._context.new_var(min), len, context);

                    const rsiElse = up1 === 0 ? 0 : 100 - 100 / (1 + up1 / down1);
                    const rsi = down1 === 0 ? 100 : rsiElse;

                    // HMA source for CMO
                    const n = 12;
                    const n2ma =
                        2 *
                        PineJS.Std.wma(
                            this._context.new_var(PineJS.Std.close(this._context)),
                            PineJS.Std.round(n / 2),
                            context
                        );
                    const nma = PineJS.Std.wma(
                        this._context.new_var(PineJS.Std.close(this._context)),
                        n,
                        context
                    );
                    const diff = n2ma - nma;
                    const sqn = PineJS.Std.round(PineJS.Std.sqrt(n));
                    const c = 5;
                    const n2ma6 =
                        2 *
                        PineJS.Std.wma(
                            this._context.new_var(PineJS.Std.open(this._context)),
                            PineJS.Std.round(c / 2),
                            context
                        );
                    const nma6 = PineJS.Std.wma(
                        this._context.new_var(PineJS.Std.open(this._context)),
                        c,
                        context
                    );
                    const diff6 = n2ma6 - nma6;
                    const sqn6 = PineJS.Std.round(PineJS.Std.sqrt(c));
                    const a1 = PineJS.Std.wma(this._context.new_var(diff6), sqn6, context);
                    const a = PineJS.Std.wma(this._context.new_var(diff), sqn, context);

                    // CMO
                    const len2 = 1;
                    const gains = PineJS.Std.sum(
                        this._context.new_var(a1 > a),
                        len2,
                        context
                    );
                    const losses = PineJS.Std.sum(
                        this._context.new_var(a1 < a),
                        len2,
                        context
                    );
                    const cmo = (100 * (gains - losses)) / (gains + losses);
                    // Close Pivots
                    const len5 = 2;
                    const h = PineJS.Std.highest(this._context.new_var(len5), context);
                    const h1 = PineJS.Std.dev(this._context.new_var(h), len5, context)
                        ? PineJS.Std.na(this._context)
                        : h;
                    const hpivot = PineJS.Std.fixnan(this._context.new_var(h1), context);
                    const l = PineJS.Std.lowest(this._context.new_var(len5), context);
                    const l1 = PineJS.Std.dev(this._context.new_var(l), len5, context)
                        ? PineJS.Std.na(this._context)
                        : l;
                    const lpivot = PineJS.Std.fixnan(this._context.new_var(l1), context);

                    // Calc Values
                    const sup = rsi < 25 && cmo > 50 && lpivot;
                    const res = rsi > 75 && cmo < -50 && hpivot;
                    const xup = sup ? PineJS.Std.low(this._context) : lastXpup;
                    const xdown = res ? PineJS.Std.high(this._context) : lastXpdown;

                    lastXpup = xup;
                    lastXpdown = xdown;
                    aaa.push([xup, xdown])
                    return [xup, xdown];
                };
            },
        },
        {
            name: "Bot",
            metainfo: {
                "_metainfoVersion": 40,
                "id": "bot@tv-basicstudies-1",
                "scriptIdPart": "",
                "name": "bao",
                "description": "bot",
                "shortDescription": "Bot tín hiệu",
                "is_hidden_study": false,
                "is_price_study": true,
                "isCustomIndicator": true,
                "plots": [{ "id": "plot_0", "type": "line" },
                { "id": "plot_1", "type": "line" }],
                "defaults": {
                    inputs: {
                        "period": 14,
                        "percent": 2,
                    },
                    "styles": {
                        "plot_0": {
                            "linestyle": 0,
                            "visible": true,
                            "linewidth": 2,
                            "plottype": 2,
                            "trackPrice": false,
                            "transparency": 40,
                            "color": "red"
                        },
                        "plot_1": {
                            "linestyle": 0,
                            "visible": true,
                            "linewidth": 2,
                            "plottype": 2,
                            "trackPrice": false,
                            "transparency": 40,
                            "color": "green"
                        }
                    },
                    "precision": 2,
                },
                "styles": {
                    "plot_0": {
                        "title": "T1",
                        "histogramBase": 0,
                    },
                    "plot_1": {
                        "title": "T2",
                        "histogramBase": 0,
                    }
                },
                "inputs": [
                    {
                        id: 'period',
                        type: 'integer',
                        name: 'Chu Kì',
                        defval: 14
                    },
                    {
                        id: 'percent',
                        type: 'float',
                        name: 'Phần trăm',
                        defval: 2
                    },
                ],
            },

            constructor: function () {
                this.init = function (context, inputCallback) {
                    this._context = context;
                    this._input = inputCallback;
                };

                this.main = function (context, inputCallback) {
                    this._context = context;
                    this._input = inputCallback;
                    let period = this._input(0);
                    let percent = this._input(1);
                    //tính ema
                    var close = this._context.new_var(PineJS.Std.close(this._context));
                    var ema = PineJS.Std.nz(PineJS.Std.ema(close, period, this._context), 0);
                    listEma.push(PineJS.Std.nz(ema, 0))
                    let _t2 = 0;
                    t2 = Array(listEma.length)
                    let t2 = Array(listEma.length)
                    t1Total.push(ema)
                    for (let i = 1; i < listEma.length - 1; i++) {

                        let t1 = PineJS.Std.nz(listEma[i], 0)
                        let sl = t1 * (percent / 100)
                        let iff1 = (t1 > PineJS.Std.nz(t2[i - 1], 0)) ? t1 - sl : t1 + sl;
                        let iff2 = (t1 < PineJS.Std.nz(t2[i - 1], 0) && listEma[i - 1] < PineJS.Std.nz(t2[i - 1])) ? PineJS.Std.min(PineJS.Std.nz(t2[i - 1]), t1 + sl) : iff1
                        let iff3 = (t1 > PineJS.Std.nz(t2[i - 1], 0) && listEma[i - 1] > PineJS.Std.nz(t2[i - 1])) ? PineJS.Std.max(PineJS.Std.nz(t2[i - 1]), t1 - sl) : iff2
                        t2[i] = iff3
                        _t2 = PineJS.Std.nz(iff3, 0)

                    }
                    t2Total.push(_t2)
                    return [ema, _t2];
                }
            }
        },
        {
            /*Dải EMA: gồm đường EMA34 (giá Close, High và Low) được biểu diễn bằng dải màu xanh với một đường trung tâm và 2 đường hai bên.
Đường EMA89 được biểu diễn bằng đường màu cam – đây là đường quan trọng nhất của bộ chỉ báo này.
Đường EMA200 được biểu diễn bằng đường màu hồng.
Đường EMA 610 được biểu diễn bằng đường màu đen. */
            name: "SonicR",
            metainfo: {
                "_metainfoVersion": 40,
                "id": "sonicr@tv-basicstudies-1",
                "scriptIdPart": "",
                "name": "SonicR",
                "description": "SonicR",
                "shortDescription": "Hệ thống giao dịch SonicR",
                "is_hidden_study": false,
                "is_price_study": true,
                "isCustomIndicator": true,
                "plots": [
                    { "id": "plot_0", "type": "line" },
                    { "id": "plot_1", "type": "line" },
                    { "id": "plot_2", "type": "line" },
                    { "id": "plot_3", "type": "line" },
                    { "id": "plot_4", "type": "line" },
                    { "id": "plot_5", "type": "line" },
                ],
                "defaults": {
                    inputs: {
                        "period": 14,
                        "percent": 2,
                    },
                    "styles": {
                        "plot_0": {
                            "linestyle": 0,
                            "visible": true,
                            "linewidth": 2,
                            "plottype": 2,
                            "trackPrice": false,
                            "transparency": 40,
                            "color": "red"
                        },
                        "plot_1": {
                            "linestyle": 0,
                            "visible": true,
                            "linewidth": 2,
                            "plottype": 2,
                            "trackPrice": false,
                            "transparency": 40,
                            "color": "green"
                        },
                        "plot_2": {
                            "linestyle": 0,
                            "visible": true,
                            "linewidth": 2,
                            "plottype": 2,
                            "trackPrice": false,
                            "transparency": 40,
                            "color": "red"
                        },
                        "plot_3": {
                            "linestyle": 0,
                            "visible": true,
                            "linewidth": 2,
                            "plottype": 2,
                            "trackPrice": false,
                            "transparency": 40,
                            "color": "green"
                        },
                        "plot_4": {
                            "linestyle": 0,
                            "visible": true,
                            "linewidth": 2,
                            "plottype": 2,
                            "trackPrice": false,
                            "transparency": 40,
                            "color": "red"
                        },
                        "plot_5": {
                            "linestyle": 0,
                            "visible": true,
                            "linewidth": 2,
                            "plottype": 2,
                            "trackPrice": false,
                            "transparency": 40,
                            "color": "red"
                        },
                    },
                    "precision": 2,
                },
                "styles": {
                    "plot_0": {
                        "title": "T1",
                        "histogramBase": 0,
                    },
                    "plot_1": {
                        "title": "T2",
                        "histogramBase": 0,
                    },
                    "plot_2": {
                        "title": "T1",
                        "histogramBase": 0,
                    },
                    "plot_3": {
                        "title": "T2",
                        "histogramBase": 0,
                    }, "plot_4": {
                        "title": "T1",
                        "histogramBase": 0,
                    },
                    "plot_5": {
                        "title": "T2",
                        "histogramBase": 0,
                    }
                },
                "inputs": [
                    {
                        id: 'period',
                        type: 'integer',
                        name: 'Chu Kì EMA body',
                        defval: 14
                    },
                    {
                        id: 'period',
                        type: 'integer',
                        name: 'Chu Kì EMA medium head',
                        defval: 89
                    },
                    {
                        id: 'period',
                        type: 'integer',
                        name: 'Chu Kì EMA Long head',
                        defval: 200
                    },
                    {
                        id: 'period',
                        type: 'integer',
                        name: 'Chu Kì EMA Super Long Head',
                        defval: 600
                    },


                ],
            },

            constructor: function () {
                this.init = function (context, inputCallback) {
                    this._context = context;
                    this._input = inputCallback;
                };

                this.main = function (context, inputCallback) {
                    this._context = context;
                    this._input = inputCallback;
                    let dragonbody_ema_period = 34;
                    let dragonhead_ema_period_medium = 89;
                    let dragonhead_ema_period_long = 200;
                    let dragonhead_ema_period_superlong = 600;
                    //tính ema 34 - low high close
                    var close = this._context.new_var(PineJS.Std.close(this._context));
                    var low = this._context.new_var(PineJS.Std.low(this._context));
                    var high = this._context.new_var(PineJS.Std.high(this._context));
                    var emadragonBodyLow = PineJS.Std.nz(PineJS.Std.ema(low, dragonbody_ema_period, this._context), 0);
                    var emadragonBodyHigh = PineJS.Std.nz(PineJS.Std.ema(high, dragonbody_ema_period, this._context), 0);
                    var emadragonBodyClose = PineJS.Std.nz(PineJS.Std.ema(close, dragonbody_ema_period, this._context), 0);
                    //tính ema 89,200,600
                    var emadragonBodyMedium = PineJS.Std.nz(PineJS.Std.ema(close, dragonhead_ema_period_medium, this._context), 0);
                    var emadragonBodyLong = PineJS.Std.nz(PineJS.Std.ema(close, dragonhead_ema_period_long, this._context), 0);
                    var emadragonBodySuperLong = PineJS.Std.nz(PineJS.Std.ema(close, dragonhead_ema_period_superlong, this._context), 0);
                    return [emadragonBodyLow, emadragonBodyHigh, emadragonBodyClose, emadragonBodyMedium, emadragonBodyLong, emadragonBodySuperLong];
                }
            }
        },
        {
            /*Dải EMA: gồm đường EMA34 (giá Close, High và Low) được biểu diễn bằng dải màu xanh với một đường trung tâm và 2 đường hai bên.
Đường EMA89 được biểu diễn bằng đường màu cam – đây là đường quan trọng nhất của bộ chỉ báo này.
Đường EMA200 được biểu diễn bằng đường màu hồng.
Đường EMA 610 được biểu diễn bằng đường màu đen. */
            name: "Trend ",
            metainfo: {
                "_metainfoVersion": 40,
                "id": "trend@tv-basicstudies-1",
                "scriptIdPart": "",
                "name": "trend",
                "description": "trend",
                "shortDescription": "Xác định trend dài hạn",
                "is_hidden_study": false,
                "is_price_study": true,
                "isCustomIndicator": true,
                "plots": [
                    { "id": "plot_0", "type": "line" },
                    { "id": "plot_1", "type": "line" },
                    { "id": "plot_2", "type": "line" },
                    { "id": "plot_3", "type": "line" },
                    { "id": "plot_4", "type": "line" },
                    { "id": "plot_5", "type": "line" },
                ],
                "defaults": {
                    inputs: {
                        "period": 14,
                        "percent": 2,
                    },
                    "styles": {
                        "plot_0": {
                            "linestyle": 0,
                            "visible": true,
                            "linewidth": 2,
                            "plottype": 2,
                            "trackPrice": false,
                            "transparency": 40,
                            "color": "red"
                        },
                        "plot_1": {
                            "linestyle": 0,
                            "visible": true,
                            "linewidth": 2,
                            "plottype": 2,
                            "trackPrice": false,
                            "transparency": 40,
                            "color": "green"
                        },
                        "plot_2": {
                            "linestyle": 0,
                            "visible": true,
                            "linewidth": 2,
                            "plottype": 2,
                            "trackPrice": false,
                            "transparency": 40,
                            "color": "red"
                        },
                        "plot_3": {
                            "linestyle": 0,
                            "visible": true,
                            "linewidth": 2,
                            "plottype": 2,
                            "trackPrice": false,
                            "transparency": 40,
                            "color": "green"
                        },
                        "plot_4": {
                            "linestyle": 0,
                            "visible": true,
                            "linewidth": 2,
                            "plottype": 2,
                            "trackPrice": false,
                            "transparency": 40,
                            "color": "red"
                        },
                        "plot_5": {
                            "linestyle": 0,
                            "visible": true,
                            "linewidth": 2,
                            "plottype": 2,
                            "trackPrice": false,
                            "transparency": 40,
                            "color": "red"
                        },
                    },
                    "precision": 2,
                },
                "styles": {
                    "plot_0": {
                        "title": "T1",
                        "histogramBase": 0,
                    },
                    "plot_1": {
                        "title": "T2",
                        "histogramBase": 0,
                    },
                    "plot_2": {
                        "title": "T1",
                        "histogramBase": 0,
                    },
                    "plot_3": {
                        "title": "T2",
                        "histogramBase": 0,
                    }, "plot_4": {
                        "title": "T1",
                        "histogramBase": 0,
                    },
                    "plot_5": {
                        "title": "T2",
                        "histogramBase": 0,
                    }
                },
                "inputs": [
                    {
                        id: 'period',
                        type: 'integer',
                        name: 'Chu Kì EMA body',
                        defval: 14
                    },
                    {
                        id: 'period',
                        type: 'integer',
                        name: 'Chu Kì EMA medium head',
                        defval: 89
                    },
                    {
                        id: 'period',
                        type: 'integer',
                        name: 'Chu Kì EMA Long head',
                        defval: 200
                    },
                    {
                        id: 'period',
                        type: 'integer',
                        name: 'Chu Kì EMA Super Long Head',
                        defval: 600
                    },


                ],
            },

            constructor: function () {
                this.init = function (context, inputCallback) {
                    this._context = context;
                    this._input = inputCallback;
                };

                this.main = function (context, inputCallback) {
                    this._context = context;
                    this._input = inputCallback;
                    let dragonbody_ema_period = 34;
                    let dragonhead_ema_period_medium = 89;
                    let dragonhead_ema_period_long = 200;
                    let dragonhead_ema_period_superlong = 600;
                    //tính ema 34 - low high close
                    var close = this._context.new_var(PineJS.Std.close(this._context));
                    var low = this._context.new_var(PineJS.Std.low(this._context));
                    var high = this._context.new_var(PineJS.Std.high(this._context));
                    var emadragonBodyLow = PineJS.Std.nz(PineJS.Std.ema(low, dragonbody_ema_period, this._context), 0);
                    var emadragonBodyHigh = PineJS.Std.nz(PineJS.Std.ema(high, dragonbody_ema_period, this._context), 0);
                    var emadragonBodyClose = PineJS.Std.nz(PineJS.Std.ema(close, dragonbody_ema_period, this._context), 0);
                    //tính ema 89,200,600
                    var emadragonBodyMedium = PineJS.Std.nz(PineJS.Std.ema(close, dragonhead_ema_period_medium, this._context), 0);
                    var emadragonBodyLong = PineJS.Std.nz(PineJS.Std.ema(close, dragonhead_ema_period_long, this._context), 0);
                    var emadragonBodySuperLong = PineJS.Std.nz(PineJS.Std.ema(close, dragonhead_ema_period_superlong, this._context), 0);
                    return [emadragonBodyLow, emadragonBodyHigh, emadragonBodyClose, emadragonBodyMedium, emadragonBodyLong, emadragonBodySuperLong];
                }
            }
        }
    ]
    )
}
function getLanguageFromURL() {
    // eslint-disable-next-line prefer-regex-literals
    const regex = new RegExp('[\\?&]lang=([^&#]*)')
    const results = regex.exec(window.location.search)
    return results === null ? null : decodeURIComponent(results[1].replace(/\+/g, ' '))
}
export default {
    name: 'TVChartContainer',
    props: {
        symbol: {
            default: 'BTCUSDT',
            type: String
        },
        interval: {
            default: '60',
            type: String
        },
        containerId: {
            default: 'containerId123',
            type: String
        },
        datafeedUrl: {
            default: 'api',
            type: String
        },
        libraryPath: {
            default: '/charting_library/',
            type: String
        },
        chartsStorageUrl: {
            default: 'https://saveload.tradingview.com',
            type: String
        },
        chartsStorageApiVersion: {
            default: '1.1',
            type: String
        },
        clientId: {
            default: 'bao',
            type: String
        },
        userId: {
            default: '334',
            type: String
        },
        fullscreen: {
            default: false,
            type: Boolean
        },
        autosize: {
            default: true,
            type: Boolean
        },
        studiesOverrides: {
            type: Object,
            default: () => ({})
        }
    },
    tvWidget: null,
    data() {
        return {
            calcStatus: false,
            calc: {
                entry: null,
                close: null,
                levage: 20,
                side: 'SHORT',
                margin: 4000,
                roe: 0,
                pnl: 0,
            },
            calcModalshow: false,
            _ws: null,
            listener: {},
            baseUrl: "wss://fstream.binance.com/ws",
            _path: '',
            streams: {},
            theme: "dark",
            tvIntervals: {
                1: "1m",
                3: "3m",
                5: "5m",
                15: "15m",
                30: "30m",
                60: "1h",
                120: "2h",
                240: "4h",
                360: "6h",
                480: "8h",
                720: "12h",
                D: "1d",
                "1D": "1d",
                "3D": "3d",
                W: "1w",
                "1W": "1w",
                M: "1M",
                "1M": "1M",
            },
            onRealtimeCallback: null,
            onHistoryCallback: null,
            symbols: [],
            binanceHost: 'https://fapi.binance.com'
        }
    },
    async mounted() {
        const widgetOptions = {
            symbol: this.symbol,
            loading_screen: { backgroundColor: "#161A1E" },
            favorites: {
                intervals: ["1m", "3m", "5m", "15m", "30m", "1h", "4h", "1d", "1D",],
            },
            theme: "Dark",
            auto_save_delay: 1,
            load_last_chart: true,
            timezone: "Asia/Bangkok",
            widgetbar: {
                news: false,
                rss_news_feed: {
                    default: [{
                        url: "https://articlefeeds.nasdaq.com/nasdaq/symbols?symbol={SYMBOL}",
                        name: "NASDAQ"
                    }, {
                        url: "http://feeds.finance.yahoo.com/rss/2.0/headline?s={SYMBOL}&region=US&lang=en-US",
                        name: "Yahoo Finance"
                    }]
                },
                datawindow:false,
                details: false,
                watchlist: true,
                watchlist_settings: {

                }

            },
            datafeed: new window.Datafeeds.UDFCompatibleDatafeed('https://price.deta.dev', 2000),
            interval: '60',
            container: this.containerId,
            library_path: '/charting_library/',
            locale: 'en',
            disabled_features: [
                'open_account_manager',
            ],
            enabled_features: [
                'study_templates',
                'use_localstorage_for_settings',
            ],
            custom_indicators_getter: __customIndicators,
            charts_storage_api_version: '1.1',
            charts_storage_url: 'http://34.172.109.153:8000',
            client_id: 'baotm',
            user_id: 'baotm',
            fullscreen: true,
            autosize: true,

        }
        const {
            $TVChart: { Widget }
        } = this;

        const tvWidget = new Widget(widgetOptions)
        this.tvWidget = tvWidget
        tvWidget.headerReady().then(() => {
            const profitCalc = tvWidget.createButton();
            profitCalc.setAttribute("title", "Pnl Calculator");
            profitCalc.innerHTML = '<?xml version="1.0" encoding="UTF-8"?><svg xmlns="http://www.w3.org/2000/svg" width="19" height="19"  fill="currentColor" class="bi bi-calculator" viewBox="0 0 16 16"> <path d="M12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h8zM4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H4z"/> <path d="M4 2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5v-2zm0 4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm0 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm0 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm3-6a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm0 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm0 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm3-6a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1zm0 3a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-4z"/> </svg></xml>';
            profitCalc.addEventListener("click", () =>
                this.$bvModal.show('calcPnl')
            );
            //  entrycalc
            const entryCalc = tvWidget.createButton();
            entryCalc.setAttribute("title", "Entry Calculator");
            entryCalc.innerHTML = `<xml version ="1.0" encoding="utf-8"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"  fill="currentColor" viewBox="0 0 24 24"> <g> <path fill="none" d="M0 0h24v24H0z"/> <path fill-rule="nonzero" d="M3 3h18a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm1 2v14h16V5H4zm16 7l-3.536 3.536-1.414-1.415L17.172 12 15.05 9.879l1.414-1.415L20 12zM6.828 12l2.122 2.121-1.414 1.415L4 12l3.536-3.536L8.95 9.88 6.828 12zm4.416 5H9.116l3.64-10h2.128l-3.64 10z"/> </g> </svg></xml>`
            entryCalc.addEventListener("click", () =>
                this.$bvModal.show('calcPnl')
            );
            const alert = tvWidget.createButton();
            alert.setAttribute("title", "Tạo cảnh báo");
            alert.innerHTML = `<xml version ="1.0" encoding="utf-8"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"  fill="currentColor" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="7"></circle><polyline points="12 9 12 12 13.5 13.5"></polyline><path d="M16.51 17.35l-.35 3.83a2 2 0 0 1-2 1.82H9.83a2 2 0 0 1-2-1.82l-.35-3.83m.01-10.7l.35-3.83A2 2 0 0 1 9.83 1h4.35a2 2 0 0 1 2 1.82l.35 3.83"></path></svg></xml>`
            alert.addEventListener("click", () =>
                this.$bvModal.show('calcPnl')
            );
            const coin360 = tvWidget.createButton();
            coin360.setAttribute("title", "Coin Heatmap");
            coin360.innerHTML = `<xml version ="1.0" encoding="utf-8"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path><path d="M22 12A10 10 0 0 0 12 2v10z"></path></svg></xml>`
            coin360.addEventListener("click", () =>
                this.$bvModal.show('m-heatmap')
            );
            const backtest = tvWidget.createButton();
            backtest.setAttribute("title", "Backtest");
            backtest.innerHTML = `<xml version ="1.0" encoding="utf-8"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line></svg></xml>`
            backtest.addEventListener("click", () =>
                this.$bvModal.show('m-heatmap')
            );

            const chisochung = tvWidget.createButton();
            chisochung.setAttribute("title", "Chỉ số chung");
            chisochung.innerHTML = `<xml version ="1.0" encoding="utf-8"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"></path></svg></xml>`
            chisochung.addEventListener("click", () =>
                this.$bvModal.show('m-chisochung')
            );
            const theodoigiaodich = tvWidget.createButton();
            theodoigiaodich.setAttribute("title", "Theo dõi giao dịch");
            theodoigiaodich.innerHTML = `<xml version ="1.0" encoding="utf-8"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line></svg></xml>`
            theodoigiaodich.addEventListener("click", () =>
                this.$bvModal.show('m-livetrans')
            );
            const lichkinhte = tvWidget.createButton();
            lichkinhte.setAttribute("title", "Lịch kinh tế");
            lichkinhte.innerHTML = `<xml version ="1.0" encoding="utf-8"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg></xml>`
            lichkinhte.addEventListener("click", () =>
                this.$bvModal.show('m-lichkinhte')
            );
            // market scan
            const scan = tvWidget.createButton();
            scan.setAttribute("title", "Market Scan");
            scan.innerHTML = `<xml version ="1.0" encoding="utf-8"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="10" cy="20.5" r="1"/><circle cx="18" cy="20.5" r="1"/><path d="M2.5 2.5h3l2.7 12.4a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.6l1.6-8.4H7.1"/></svg></xml>`
            scan.addEventListener("click", () =>
                this.$bvModal.show('marketScan')
            );
            // market watch
            const watch = tvWidget.createButton();
            watch.setAttribute("title", "Entry Calculator");
            watch.innerHTML = `<xml version ="1.0" encoding="utf-8"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-bell-ringing-2" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"> <path stroke="none" d="M0 0h24v24H0z" fill="none"/> <path d="M19.364 4.636a2 2 0 0 1 0 2.828a7 7 0 0 1 -1.414 7.072l-2.122 2.12a4 4 0 0 0 -.707 3.536l-11.313 -11.312a4 4 0 0 0 3.535 -.707l2.121 -2.123a7 7 0 0 1 7.072 -1.414a2 2 0 0 1 2.828 0z" /> <path d="M7.343 12.414l-.707 .707a3 3 0 0 0 4.243 4.243l.707 -.707" /> </svg></xml>`
            watch.addEventListener("click", () =>
                this.$bvModal.show('calcPnl')
            );
            // log
            const log = tvWidget.createButton();
            log.setAttribute("title", "log");
            log.innerHTML = `<xml version ="1.0" encoding="utf-8"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/><path d="M14 3v5h5M16 13H8M16 17H8M10 9H8"/></svg></xml>`
            log.addEventListener("click", () =>
                this.$bvModal.show('m-todo')
            );
            const setting = tvWidget.createButton();
            setting.setAttribute("title", "Cấu hình");
            setting.innerHTML = `<xml version ="1.0" encoding="utf-8"><svg class="svg-icon" stroke="currentColor" width="24" height="24" viewBox="0 0 24 24">
							<path fill="none" d="M10.032,8.367c-1.112,0-2.016,0.905-2.016,2.018c0,1.111,0.904,2.014,2.016,2.014c1.111,0,2.014-0.902,2.014-2.014C12.046,9.271,11.143,8.367,10.032,8.367z M10.032,11.336c-0.525,0-0.953-0.427-0.953-0.951c0-0.526,0.427-0.955,0.953-0.955c0.524,0,0.951,0.429,0.951,0.955C10.982,10.909,10.556,11.336,10.032,11.336z"></path>
							<path fill="none" d="M17.279,8.257h-0.785c-0.107-0.322-0.237-0.635-0.391-0.938l0.555-0.556c0.208-0.208,0.208-0.544,0-0.751l-2.254-2.257c-0.199-0.2-0.552-0.2-0.752,0l-0.556,0.557c-0.304-0.153-0.617-0.284-0.939-0.392V3.135c0-0.294-0.236-0.532-0.531-0.532H8.435c-0.293,0-0.531,0.237-0.531,0.532v0.784C7.582,4.027,7.269,4.158,6.966,4.311L6.409,3.754c-0.1-0.1-0.234-0.155-0.376-0.155c-0.141,0-0.275,0.055-0.375,0.155L3.403,6.011c-0.208,0.207-0.208,0.543,0,0.751l0.556,0.556C3.804,7.622,3.673,7.935,3.567,8.257H2.782c-0.294,0-0.531,0.238-0.531,0.531v3.19c0,0.295,0.237,0.531,0.531,0.531h0.787c0.105,0.318,0.236,0.631,0.391,0.938l-0.556,0.559c-0.208,0.207-0.208,0.545,0,0.752l2.254,2.254c0.208,0.207,0.544,0.207,0.751,0l0.558-0.559c0.303,0.154,0.616,0.285,0.938,0.391v0.787c0,0.293,0.238,0.531,0.531,0.531h3.191c0.295,0,0.531-0.238,0.531-0.531v-0.787c0.322-0.105,0.636-0.236,0.938-0.391l0.56,0.559c0.208,0.205,0.546,0.207,0.752,0l2.252-2.254c0.208-0.207,0.208-0.545,0.002-0.752l-0.559-0.559c0.153-0.303,0.285-0.615,0.389-0.938h0.789c0.295,0,0.532-0.236,0.532-0.531v-3.19C17.812,8.495,17.574,8.257,17.279,8.257z M16.747,11.447h-0.653c-0.241,0-0.453,0.164-0.514,0.398c-0.129,0.496-0.329,0.977-0.594,1.426c-0.121,0.209-0.089,0.473,0.083,0.645l0.463,0.465l-1.502,1.504l-0.465-0.463c-0.174-0.174-0.438-0.207-0.646-0.082c-0.447,0.262-0.927,0.463-1.427,0.594c-0.234,0.061-0.397,0.271-0.397,0.514V17.1H8.967v-0.652c0-0.242-0.164-0.453-0.397-0.514c-0.5-0.131-0.98-0.332-1.428-0.594c-0.207-0.123-0.472-0.09-0.646,0.082l-0.463,0.463L4.53,14.381l0.461-0.463c0.169-0.172,0.204-0.434,0.083-0.643c-0.266-0.461-0.467-0.939-0.596-1.43c-0.06-0.234-0.272-0.398-0.514-0.398H3.313V9.319h0.652c0.241,0,0.454-0.162,0.514-0.397c0.131-0.498,0.33-0.979,0.595-1.43c0.122-0.208,0.088-0.473-0.083-0.645L4.53,6.386l1.503-1.504l0.46,0.462c0.173,0.172,0.437,0.204,0.646,0.083c0.45-0.265,0.931-0.464,1.433-0.597c0.233-0.062,0.396-0.274,0.396-0.514V3.667h2.128v0.649c0,0.24,0.161,0.452,0.396,0.514c0.502,0.133,0.982,0.333,1.433,0.597c0.211,0.12,0.475,0.089,0.646-0.083l0.459-0.462l1.504,1.504l-0.463,0.463c-0.17,0.171-0.202,0.438-0.081,0.646c0.263,0.448,0.463,0.928,0.594,1.427c0.061,0.235,0.272,0.397,0.514,0.397h0.651V11.447z"></path>
						</svg></xml>`
            setting.addEventListener("click", () =>
                this.$bvModal.show('m-cauhinh')
            );
        })
        tvWidget.onChartReady(() => {
            tvWidget.subscribe('onAutoSaveNeeded', (data) => {
                tvWidget.saveChartToServer((data) => { })
            })

        })

    },

    destroyed() {
        if (this.tvWidget !== null) {
            // this.tvWidget.remove()
            this.tvWidget = null
        }
    },
    methods: {
        calcPNL() {
            /*Unrealized PNL = position size * direction of order * (mark price - entry price)
      ROE% =Unrealized PNL in USDT / entry margin = ( ( mark Price - entry Price ) * direction of order * size ) / （position_amount * contract_multiplier * mark_price* IMR）
      */
            let entryPrice = parseFloat(this.calc.entry)
            let exitPrice = parseFloat(this.calc.close)
            let margin = parseFloat(this.calc.margin)
            let side = (this.calc.side === 'LONG') ? 1 : -1
            let levage = parseFloat(this.calc.levage)
            let unPNL = (margin / entryPrice) * side * (exitPrice - entryPrice)
            let ROE = (unPNL / margin * 100 * levage)
            this.calc.roe = parseFloat(ROE.toFixed(2));
            this.calc.pnl = parseFloat(unPNL.toFixed(2));
            this.calcStatus = true;
        },
        onResetCalc() {
            this.calc = {
                entry: null,
                close: null,
                levage: 20,
                side: null,
                margin: 4000,
                roe: 0,
                pnl: 0,
            }
            this.calcStatus = false
        },
    }
}
</script>
  
<style scoped>
.TVChartContainer {
    min-height: calc(100vh - 1px);
    min-width: 100%;
}

.myntlogoplace {
    width: 99px;
    height: 38px;
    background-color: white;
    padding: 0 8px;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
}

.pnlCalc:hover {
    background-color: red;
    cursor: pointer;
}
</style>