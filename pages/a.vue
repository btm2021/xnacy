<template>
  <div>

    <b-row>
      <b-col cols="8">
        <div>

        </div>
      </b-col>
      <b-col cols="8">
        <div id="klinechart" style="width:100%;height:70vh"></div>
      </b-col>
      <b-col cols="4">

      </b-col>
    </b-row>
  </div>
</template>

<script>
import { init, registerIndicator } from 'klinecharts'
var customIndicator = {
  name: 'MA11',
  shortName: 'MA11',
  calcParams: [5, 10],
  figures: [
    { key: 'ma1', title: 'MA5: ', type: 'line' },
    { key: 'ma2', title: 'MA10: ', type: 'line' }
  ],
  // When the calculation parameters are changed, it is hoped that the prompt is the same as the parameters, that is, the value of title needs to be changed
  regenerateFigures: (params) => {
    return params.map((p, i) => {
      return { key: `ma${i + 1}`, title: `MA${p}: `, type: 'line' }
    })
  },
  // Calculation results
  calc: (kLineDataList, { calcParams, figures }) => {
    // Note: The number of returned data needs to be consistent with the number of data in kLineDataList. If there is no value, replace it with {}.
    // It is best to take the callback parameter calcParams as the calculation parameter. If not, when the subsequent calculation parameters change, the calculation here cannot respond in time
    const closeSums = []
    return kLineDataList.map((kLineData, i) => {
      const ma = {}
      const close = kLineData.close
      console.log(calcParams)
      calcParams.forEach((param, j) => {
        closeSums[j] = (closeSums[j] || 0) + close
        if (i >= param - 1) {
          ma[figures[j].key] = closeSums[j] / param
          closeSums[j] -= dataList[i - (param - 1)].close
        }
      })

      // If there is a value, the data format of each item here should be { ma1: xxx, ma2: xxx }
      // Each key needs to be consistent with the value corresponding to the subkey in figures
      return 1500
    })
  }
}
export default {

  data() {
    return {
      rawData: null,
      dataReady: false,
      kLineChart: null,
      symbol: 'ETHUSDT',
      timeframe: '1h'
    }
  },
  mounted() {
    //  
    registerIndicator(customIndicator)
    let url = `${window.baseURL}getRaw?timeframe=${this.timeframe}&symbol=${this.symbol}`
    fetch(url).then(data => data.json()).then(data => {
      this.rawData = JSON.parse(data[0].data)
      let rawData = JSON.parse(data[0].data)
      let newList = []
      rawData.map(i => {
        newList.push({ open: i.open, high: i.high, low: i.low, close: i.close, timestamp: i.time, volume: i.volume })
      })

      this.kLineChart = init('klinechart')

      window.klinechart = this.kLineChart;
      this.kLineChart.createIndicator('VOL')
      console.log('asds')
      this.kLineChart.createIndicator('MA11', false, { id: 'candle_pane' })
      this.kLineChart.applyNewData(newList)
    })

  }
}
</script>

<style>

</style>