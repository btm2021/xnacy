<template>
    <div>

        <b-row>

            <b-col cols="8">
                <div class="lw-chart" style="height:500px;width:100vw," id="chartContainer"></div>
            </b-col>
            <b-col cols="4">
                <b-table small :items="keyLevel"></b-table>
                <b-table-simple>
                    <b-tbody>
                        <b-tr>
                            <b-td>

                            </b-td>

                            <b-td>
                                dasd
                            </b-td>
                        </b-tr>
                    </b-tbody>
                </b-table-simple>
            </b-col>
        </b-row>
    </div>
</template>

<script>
import { createChart } from 'lightweight-charts';

export default {

    data() {
        return {
            rawData: null,
            dataReady: false,
            chart: null,
            symbol: 'SOLUSDT',
            timeframe: '1h',
            lastData: null,
            keyLevel: []
        }
    },
    mounted() {
        //  
        fetch(`${window.baseURL}getBySymbol?symbol=SOLUSDT`).then(data => data.json()).then(data => {
            console.log(data)
            this.lastData = JSON.parse(data[0].data);
            window.lastData = JSON.parse(data[0].data);
            this.keyLevel = this.lastData.keylevel.keyLevels
        })

        let url = `${window.baseURL}getRaw?timeframe=${this.timeframe}&symbol=${this.symbol}`
        fetch(url).then(data => data.json()).then(data => {
            //lấy tiếp last

            this.rawData = JSON.parse(data[0].data)

            let rawData = JSON.parse(data[0].data)
            let newList = []
            rawData.map(i => {
                newList.push({ open: i.open, high: i.high, low: i.low, close: i.close, timestamp: i.time, volume: i.volume })
            })
            const chartOptions = {
                layout: { textColor: 'black', background: { type: 'solid', color: 'white' } },

                // timeScale: {
                //     rightOffset: 30,
                //     barSpacing: 10,
                //     timeVisible: true,
                //     borderColor: '#71649C',
                // },
            };

            var chart = createChart('chartContainer', chartOptions);
            const candlestickSeries = chart.addCandlestickSeries({
                upColor: '#26a69a', downColor: '#ef5350', borderVisible: false,
                wickUpColor: '#26a69a', wickDownColor: '#ef5350',
            });
            let klinedata = rawData
            candlestickSeries.setData(rawData)
            let show89 = 'true'
            if (show89 === "true") {
                const t1 = chart.addLineSeries({
                    crosshairMarkerVisible: false,
                    lastValueVisible: false, color: 'red', lineWidth: 2
                });
                const t2 = chart.addLineSeries({
                    crosshairMarkerVisible: false,
                    lastValueVisible: false, color: 'green', lineWidth: 2
                });

                const t1_data = klinedata
                    .map((d) => ({ time: d.time, value: d.mybot89.t1 }));
                const t2_data = klinedata
                    .map((d) => ({ time: d.time, value: d.mybot89.t2 }));
                t1.setData(t1_data);
                t2.setData(t2_data);

            }

            const bb_up = chart.addLineSeries({
                color: 'blue', lineWidth: 1,
                crosshairMarkerVisible: false,
                lastValueVisible: false,
                lastValueVisible: false,

            });
            const bb_mid = chart.addLineSeries({
                color: 'purple', lineWidth: 1, crosshairMarkerVisible: false,
                lastValueVisible: false,
            });
            const bb_low = chart.addLineSeries({
                color: 'blue', lineWidth: 1, crosshairMarkerVisible: false,
                lastValueVisible: false,
            });

            bb_up.setData(klinedata
                .map((d) => ({ time: d.time, value: d.bb.upper })));
            bb_mid.setData(klinedata
                .map((d) => ({ time: d.time, value: d.bb.middle })));
            bb_low.setData(klinedata
                .map((d) => ({ time: d.time, value: d.bb.lower })));

            var volumeSeries = chart.addHistogramSeries({
                color: '#26a69a',
                panel: '1',
                lineWidth: 2,
                priceFormat: {
                    type: 'volume',
                },
                overlay: true,
                scaleMargins: {
                    top: 0.6,
                    bottom: 0,
                },
            });
            const volume_data = klinedata
                .map((d) => ({
                    time: d.time, value: d.volume,
                    color: (d.close > d.open) ? "#26A69A" : "#F05250"
                }));
            //    volumeSeries.setData(volume_data)
            //sh,sl


            this.chart = chart;


        })

    },

}
</script>

<style>

</style>