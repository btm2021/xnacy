export const state = () => ({
    listOrder: [
        { asd: 1 }, { asd: 2 }
    ]
})

export const mutations = {
    addOrder(state, text) {
        state.list.push({
            text,
            done: false
        })
    },
    removeOrder(state, { todo }) {
        state.list.splice(state.list.indexOf(todo), 1)
    },
    
}