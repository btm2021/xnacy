<template>
    <div style="">
        <!-- TradingView Widget BEGIN -->
        <div class="tradingview-widget-container">
            <div class="tradingview-widget-container__widget"></div>
            <div class="tradingview-widget-copyright"><a
                    href="https://vn.tradingview.com/markets/currencies/economic-calendar/" rel="noopener"
                    target="_blank"><span class="blue-text">Lịch kinh tế</span></a> từ TradingView</div>
            <script type="text/javascript" src="https://s3.tradingview.com/external-embedding/embed-widget-events.js"
                async>
                {
  "width": "100%",
  "height": "600",
  "colorTheme": "dark",
  "isTransparent": false,
  "locale": "vi_VN",
  "importanceFilter": "0,1",
  "currencyFilter": "CAD,EUR,FRF,DEM,JPY,CHF,GBP,USD"
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