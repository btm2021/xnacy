<template>
    <div>
      <!-- TradingView Widget BEGIN -->
<div class="tradingview-widget-container">
  <div class="tradingview-widget-container__widget"></div>
 
  <script type="text/javascript" src="https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js" async>
  {
  "symbol": "BINANCE:{{symbol}}",
  "width": "100%",
  "height": "100%",
  "locale": "vi_VN",
  "dateRange": "1D",
  "colorTheme": "dark",
  "trendLineColor": "rgba(41, 98, 255, 1)",
  "underLineColor": "rgba(41, 98, 255, 0.3)",
  "underLineBottomColor": "rgba(41, 98, 255, 0)",
  "isTransparent": false,
  "autosize": true,
  "largeChartUrl": "",
  "noTimeScale": false,
  "chartOnly": false
}
  </script>
</div>
<!-- TradingView Widget END -->
    </div>
</template>

<script>

</script>
<script>

export default {

    props: ['symbol'],
    mounted() {
      
    },
    data() {
        return {

        }
    }
}
</script>

<style>

</style>