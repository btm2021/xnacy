
<template>
    <div>
        <div :id="containerId" class="TVChartContainer" />
    </div>
</template>
  
<script>
var aaa = []
var price = []
async function __customIndicators(PineJS) {
    return Promise.resolve([
        {
            name: "HTKC",
            metainfo: {
                _metainfoVersion: 42,
                id: "HTKC@tv-basicstudies-1",
                name: "HTKC",
                description: "HTKC",
                shortDescription: "HTKC",
                scriptIdPart: "",
                is_hidden_study: false,
                is_price_study: true,
                isCustomIndicator: true,

                plots: [
                    { id: 'plot_0', type: 'circles' },
                    {
                        id: 'plot_1',
                        type: 'circles',
                    },
                ],
                defaults: {
                    styles: {
                        plot_0: {
                            visible: true,
                            linewidth: 10,
                            plottype: 6,
                            trackPrice: false,
                            color: '#ef5350',
                            join: false,
                            transp: 20,
                        },
                        plot_1: {
                            visible: true,
                            linewidth: 2,
                            plottype: 6,
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
            name: 'bbb',
            metainfo: {
                _metainfoVersion: 51,
                id: 'bbb@tv-basicstudies-1',
                description: 'bbb',
                shortDescription: 'bbb',
                is_hidden_study: false,
                is_price_study: true,
                isCustomIndicator: true,
                format: {
                    type: 'price',
                    precision: 2,
                },

                plots: [{ id: 'plot_0', type: 'line' }],
                defaults: {
                    styles: {
                        plot_0: {
                            linestyle: 0,
                            visible: true,
                            linewidth: 3,
                            plottype: 2,
                            // Show price line?
                            trackPrice: false,

                            // Plot color
                            color: '#0000FF'
                        }
                    },
                    precision: 2,
                    inputs: {}
                },
                styles: {
                    plot_0: {
                        title: '-- output name --',
                        histogramBase: 0,
                    }
                },
                'inputs': [],
            },

            constructor: function () {
                this.init = function (context, inputCallback) {
                    this._context = context;
                    this._input = inputCallback;

                    // Define the symbol to be plotted.
                    // Symbol should be a string.
                    // You can use PineJS.Std.ticker(this._context) to get the selected symbol's ticker.
                    // For example,
                    //    var symbol = 'AAPL';
                    //    var symbol = '#EQUITY';
                    //    var symbol = PineJS.Std.ticker(this._context) + '#TEST';
                    //  var symbol = 'ETHUSDT';
                    // let a = this._context.new_sym(symbol, PineJS.Std.period(this._context));
                    // console.log(a)

                };

                this.main = function (context, inputCallback) {
                    this._context = context;
                    this._input = inputCallback;
                    let v = 0;
                    if (context.symbol.bartime()) {
                        let item = price.find(i => context.symbol.bartime() === i.time)
                        if (item) {
                            if (item.signal != 0) {
                                console.log(item.signal)
                            }
                            v = item.st.ActiveTrend
                        }
                    }
                    // You can use following built-in functions in PineJS.Std object:
                    //    open, high, low, close
                    //    hl2, hlc3, ohlc4


                    return [v];
                }
            }
        }

    ]
    )
}
export default {
    name: 'TVChartContainer',
    props: {

        orderInfo: {
            default: null,
            type: Object
        },
        symbol: {
            default: 'BTCUSDT',
            type: String
        },
        interval: {
            default: '15',
            type: String
        },
        containerId: {
            default: 'tv_chart_container',
            type: String
        },
        datafeedUrl: {
            default: 'https://confusedbeigebyte.baotrinh1.repl.co',
            // default: 'https://api2.skullnbones.xyz/udf',
            type: String
        },
        libraryPath: {
            default: '/charting_library/',
            type: String
        },
        chartsStorageUrl: {
            default: 'https://saveload.thecryptobox.io',
            type: String
        },
        chartsStorageApiVersion: {
            default: '1.1',
            type: String
        },
        clientId: {
            default: 'baotm',
            type: String
        },
        userId: {
            default: '339',
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
        height: {
            default: '800px',
            type: String
        },
        width: {
            default: '500px',
            type: String
        },

        autosize: {
            default: true,
            type: Boolean
        },

        studiesOverrides: {
            type: Object,
            default: () => ({

            })
        }
    },

    data() {
        return {
            aaa: [],
            alertList: [],
            listOrderLine: new Map()
        }
    },
    tvWidget: null,
    mounted() {
        const widgetOptions = {
            time_scale: {
                min_bar_spacing: 10,
            },
            // custom_css_url: 'css/style.css',
            auto_save_delay: 1,
            load_last_chart: true,
            theme: "dark",
            loading_screen: { backgroundColor: "#161A1E" },
            favorites: {
                intervals: ["1m", "3m", "5m", "15m", "30m", "1h", "4h", "1d", "1D",],
            },
            symbol_search_request_delay: 300,
            timezone: "Asia/Ho_Chi_Minh",
            symbol: this.symbol,
            //datafeed: api['binance_futures'],
            datafeed: new window.Datafeeds.UDFCompatibleDatafeed(this.datafeedUrl, 2000),
            interval: '15',
            container: this.containerId,
            library_path: this.libraryPath,
            locale: 'vi',
            disabled_features: [''],
            enabled_features: ["move_logo_to_main_pane", 'use_localstorage_for_settings', 'countdown', 'control_bar',
                'display_market', 'display_legend_on_all_charts', 'header_in_fullscreen_mode', 'study_templates'
            ],
            charts_storage_url: this.chartsStorageUrl,
            charts_storage_api_version: this.chartsStorageApiVersion,
            client_id: this.clientId,
            user_id: this.userId,
            custom_indicators_getter: __customIndicators,
            fullscreen: this.fullscreen,
            autosize: false,
            height: this.height,
            width: this.width,
            overrides: {

            }
            // studies_overrides: this.studiesOverrides

        }
        const {
            $TVChart: { Widget }
        } = this
        const tvWidget = new Widget(widgetOptions)
        this.tvWidget = tvWidget
        setTimeout(() => {
            this.drawFibo();
        }, 5000)
        tvWidget.onChartReady(() => {
            let listSignal = price.filter(i => (i.signal != 0))
            if (listSignal.length > 0) {
                let _listSign = []
                let _listOp = []
                listSignal.map(item => {

                    let s = (item.signal.Direction > 0) ? "arrow_up" : "arrow_down"
                    let t = (item.signal.Direction > 0) ? "LONG " + item.close : "SHORT " + item.close
                    tvWidget.chart().createShape({
                        time: (item.time / 1000)
                    },
                        {
                            shape: s,
                            text: t
                        })
                })

            }
            // tvWidget.onContextMenu((unixtime, price) => {
            //     return [{
            //         position: "top",
            //         text: "First top menu item, time: " + unixtime + ", price: " + price,
            //         click: function () { alert("First clicked."); }
            //     }]
            // })


            //    tvWidget.chart().createStudy('aaa', false, true);

            //  tvWidget.chart().createStudy('aa', false, true,[]);

            // tvWidget.chart().createOrderLine()

            //     .setText("SHORT Order 1")
            //     .setLineLength(10)
            //     .setPrice(19000)
            //     .setQuantity(2000)
            //     .setTooltip("??????????????????")
            //     .setLineStyle(0)
            //     .setLineColor("red")
            //console.log(tvWidget.activeChart().getVisibleRange().from)
            // tvWidget.chart().createExecutionShape()
            //     .setText("@1,320.75 Limit Buy 1")
            //     .setTooltip("@1,320.75 Limit Buy 1")
            //     .setTextColor("rgba(0,255,0,0.5)")
            //     .setArrowColor("#0F0")
            //     .setDirection("buy")
            //     .setTime(tvWidget.activeChart().getVisibleRange().from)
            //     .setPrice(160);



            tvWidget.activeChart().getAllShapes().forEach(item => {

                if (item.name === "rectangle") {
                    //x??c ?????nh gi?? c??a h???p
                    let s = tvWidget.activeChart().getShapeById(item.id);
                    let id = item.id
                    let p = s.getProperties();
                    let symbol = s._source._ownerSource.m_symbol;
                    let text = p.text;
                    let p1 = parseFloat(s._source._timePoint[0].price);
                    let p2 = parseFloat(s._source._timePoint[1].price)
                    let min, max;
                    if (p1 > p2) {
                        max = p1
                        min = p2;
                    } else {
                        max = p2;
                        min = p1
                    }
                    let index = this.alertList.find(i => i.id === id)

                    if (index) {
                        this.alertList[index] = {
                            id,
                            symbol, text, min, max
                        }
                    } else {
                        this.alertList.push({
                            id,
                            symbol, text, min, max
                        })
                    }
                    //   console.log(`${symbol} ${text} ${p1} ${p2}`)
                    //t???o alert n???m trong kho???ng gi??
                }


                // tvWidget.chart().createPositionLine()
                //     .onReverse(function (text) {
                //         console.log("Position reverse event");
                //     })
                //     .onClose(function (text) {
                //         console.log("Position close event");
                //     })
                //     .setText("PROFIT: 71.1 (3.31%)")
                //     .setQuantity("8.235")
                //     .setLineLength();


                //  console.log(tvWidget.activeChart().showPropertiesDialog(item.id));

            });

            // tvWidget.activeChart().createExecutionShape()
            //     .setText("S")
            //     .setArrowColor("#0F0")
            //     .setDirection("sell")
            //     .setPrice(20000);
            // tvWidget.chart().createOrderLine()
            // .onModify(res => res) 
            //     .setTooltip("Additional order information")
            //     .setModifyTooltip("Modify order")
            //     .setCancelTooltip("Cancel order")
            //     .onMove(function () {
            //         this.setText("onMove called");
            //     })
            //     .onModify("onModify called", function (text) {
            //         this.setText(text);
            //     })
            //     .onCancel("onCancel called", function (text) {
            //         this.setText(text);
            //     })
            //     .setText("STOP: 73.5 (5,64%)")
            //     .setQuantity("100");

            tvWidget.subscribe('onAutoSaveNeeded', (data) => {

                tvWidget.saveChartToServer((data) => {
                    tvWidget.activeChart().getAllShapes().forEach(item => {
                        if (item.name === "rectangle") {
                            //x??c ?????nh gi?? c??a h???p
                            let s = tvWidget.activeChart().getShapeById(item.id);
                            let id = item.id
                            let p = s.getProperties();
                            let symbol = s._source._ownerSource.m_symbol;
                            let text = p.text;
                            let p1 = parseFloat(s._source._timePoint[0].price);
                            let p2 = parseFloat(s._source._timePoint[1].price)
                            let min, max;
                            if (p1 > p2) {
                                max = p1
                                min = p2;
                            } else {
                                max = p2;
                                min = p1
                            }
                            let index = this.alertList.find(i => i.id === id)

                            if (index) {
                                this.alertList[index] = {
                                    id,
                                    symbol, text, min, max
                                }
                            } else {
                                this.alertList.push({
                                    id,
                                    symbol, text, min, max
                                })
                            }
                            // console.log(`${symbol} ${text} ${p1} ${p2}`)
                            //t???o alert n???m trong kho???ng gi??
                        }
                        if (item.name === 'long_position') {
                            //make order long position

                            let s = tvWidget.activeChart().getShapeById(item.id);
                            //   console.log(s)
                            // debugger
                        }
                        if (item.name === 'short_position') {
                            //make order short position

                        }
                        //  console.log(tvWidget.activeChart().showPropertiesDialog(item.id));

                    });
                },
                    (data) => {
                        //    console.log('fail', data)
                    }, true, {
                    chartName: 's'
                })

            })
        });
    },
    destroyed() {
        if (this.tvWidget !== null) {
            this.tvWidget.remove()
            this.tvWidget = null
        }
    },
    methods: {

        drawFibo() {
            //t???o 1 shape
            if (this.tvWidget) {
                if (this.tvWidget.chart()) {
                    let tv = this.tvWidget.chart();
                    tv.removeAllShapes();
                    let dateOffset = (24 * 60 * 60 * 1000) * 20;
                    var myDate = new Date();
                    myDate.setTime(myDate.getTime() - dateOffset);
                    myDate = myDate.valueOf();
                    //c??ch 20 bar
                    tv.createMultipointShape(
                        [{ time: myDate / 1000, price: aaa[aaa.length - 1][0] }, { time: myDate / 1000, price: aaa[aaa.length - 1][1] }, { time: 1666564200, price: aaa[aaa.length - 1][0] }],
                        {
                            shape: 'fib_trend_ext',
                            zOrder: 'top',
                        })
                } else {
                    setTimeout(() => {
                        this.drawFibo();
                    }, 5000)
                }

            } else {
                setTimeout(() => {
                    this.drawFibo();
                }, 5000)
            }

            // x??a to??n b??? fibo



        },
        deleteAllOrderLine() {
            this.listOrderLine.forEach((value, key) => this.deleteOrderLine(key))
        },
        deleteOrderLine(price) {
            this.listOrderLine.get(price).remove()
            this.listOrderLine.delete(price)
        },
        createOrderLine(info) {
            let { symbol, entryPrice, quantity, side, type, percent } = info;
            this.tvWidget.onChartReady(() => {

                let symbolChart = this.tvWidget.chart().symbol();
                //  console.log(symbol, entryPrice, symbolChart, quantity, side, type)
                if (symbolChart === symbol) {
                    let color = 'red'
                    if (side === 'LONG') {
                        color = 'green'
                    }

                    let orderObject = this.tvWidget.chart().createOrderLine()

                        .onMove("Modify called", function () {
                            let newPrice = parseFloat(this.getPrice())
                            let originPrice = parseFloat(this.getTooltip())
                            window.$nuxt.$emit('orderEvent', { newPrice, originPrice, type: 'moveEntry' })
                        })
                        .onCancel(function () {
                            let originPrice = parseFloat(this.getTooltip())
                            let newPrice = parseFloat(this.getPrice())
                            window.$nuxt.$emit('orderEvent', { newPrice, originPrice, type: 'deleteEntry' })
                        })
                        .setTooltip(entryPrice)
                        .setText(`${side}:${percent}%`)
                        .setPrice(entryPrice)
                        .setLineLength(10)
                        .setLineWidth(2)
                        .setLineStyle(0)
                        .setQuantity(quantity + " USDT")
                        .setBodyTextColor('red')
                        .setQuantityBackgroundColor(color)

                    this.listOrderLine.set(entryPrice, orderObject)
                }

            })

        },

    }
}
</script>
  
<style scoped>
.TVChartContainer {
    margin-left: 1%;
    width: 99.99vh;
    height: 80vh
}
</style>