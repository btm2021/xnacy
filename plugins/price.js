export default ({ app, store }, inject) => {
    window.mystore = store;
    // Inject $hello(msg) in Vue, context and store.
    window.baseURL = 'https://baotmscan1h.run.goorm.app/'
    //  window.baseURL='http://localhost:3001/'
    inject('getPriceAll', () => {
        return store.state.exchangeInfo.listSymbol;
        //get price all from websocket save in store
    })

    inject('getPrice', (symbol) => {
        //get price one from websocket save in store
        let listSymbol = store.state.exchangeInfo.realtimePrice
        if (listSymbol.length > 0) {
            let item = listSymbol.find(i => i.s === symbol)
            return $nuxt.$formatPrice(symbol, parseFloat(item.p))
        } else {
            return 0;
        }

    })
    inject('getFunding', (symbol) => {
        let listSymbol = store.state.exchangeInfo.listSymbol
        let item = listSymbol.find(i => i.symbol === symbol)
        return parseFloat(item.r)
        //get price one from websocket save in store
    })

    inject('formatPrice', (symbol, price) => {
        //get precion in store and format
        //tìm trong store
        //state.exchangeInfo.listSymbol
        price = parseFloat(price)
        let pricePrecision = 4;
        let listSymbol = store.state.exchangeInfo.listSymbol
        let item = listSymbol.find(i => i.symbol === symbol)
        if (item) {
            pricePrecision = item.pricePrecision
        }

        return parseFloat(String(price.toFixed(pricePrecision)))

    })
    inject('initWebsocket', () => {
        //init websocket
        let markPriceWS = new WebSocket("wss://fstream.binance.com/ws/!markPrice@arr@1s");
        markPriceWS.onmessage = (evt) => {
            var received_msg = evt.data;
            let rawMarkPrice = JSON.parse(received_msg);
            store.commit('exchangeInfo/setRealtimePrice', rawMarkPrice)
            window.realtime = rawMarkPrice
        }
        markPriceWS.onopen = (event) => {
            $nuxt.$makeToast("Kết nối websocket thành công", "success")

        }

    })

    inject('makeToast', (message, variant) => {
        $nuxt.$bvToast.toast(message, {
            title: "Thông báo",
            solid: true,
            variant,
            autoHideDelay: 1000,
            appendToast: true
        })
    })

    inject('initExchangeInfo', async () => {
        //init echange info
        // reload after 1miunute

        return new Promise(async (resolve, reject) => {
            let a = await app.$axios.get('https://fapi.binance.com/fapi/v1/exchangeInfo')
            $nuxt.$makeToast("Load thông tin sàn thành công", "success")
            resolve(a.data)
        })

    })



}