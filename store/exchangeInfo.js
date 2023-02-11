export const state = () => ({
    listSymbol: [],
    realtimePrice: [],
    baseURL: 'https://baotmscan1h.run.goorm.app/'
})

export const getters = {
    getListSymbol(state) {
        return state.listSymbol
    },
    getRealtimePrice(state) {
        return state.realtimePrice;
    },
    getPrice(state, symbol) {
        let item = null;
        item = state.find(i => i.symbol === symbol);
        return item;
    }
}

export const mutations = {

    setListSymbol(state, list) {
        state.listSymbol = list
    },
    setRealtimePrice(state, list) {
        state.realtimePrice = list
    }

}

export const actions = {

}