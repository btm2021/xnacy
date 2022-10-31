<template>
    <div>
        <!-- TradingView Widget BEGIN -->
        <div class="tradingview-widget-container">
            <div class="tradingview-widget-container__widget"></div>
            <div class="tradingview-widget-copyright"><a href="https://vn.tradingview.com/markets/currencies/"
                    rel="noopener" target="_blank"><span class="blue-text">Chỉ số thị trường</span></a> bởi TradingView
            </div>
            <script type="text/javascript"
                src="https://s3.tradingview.com/external-embedding/embed-widget-market-quotes.js" async>
                {
  "width": "100%",
  "height": "500",
  "symbolsGroups": [
    {
      "name": "Chỉ số thị trường",
      "originalName": "Forex",
      "symbols": [
        {
          "name": "CRYPTOCAP:TOTAL",
          "displayName": "TOTAL"
        },
        {
          "name": "CRYPTOCAP:TOTAL2",
          "displayName": "TOTAL2"
        },
        {
          "name": "CRYPTOCAP:TOTAL3",
          "displayName": "TOTAL3"
        },
        {
          "name": "CRYPTOCAP:TOTALDEFI",
          "displayName": "TOTALDEFI"
        },
        {
          "name": "CRYPTOCAP:USDT",
          "displayName": "USDT"
        },
        {
          "name": "CRYPTOCAP:USDT.D",
          "displayName": "USDT.D"
        },
        {
          "name": "CRYPTOCAP:BTC.D",
          "displayName": "BTC.D"
        }
      ]
    }
  ],
  "showSymbolLogo": false,
  "colorTheme": "dark",
  "isTransparent": false,
  "locale": "vi_VN"
}
            </script>
        </div>
        <!-- TradingView Widget END -->
    </div>
</template>

<script>
export default {

}
</script>

<style>

</style>