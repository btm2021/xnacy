import Vue from 'vue'
import VueTradingView from 'vue-trading-view/src/vue-trading-view';
import PubNubVue from 'pubnub-vue';

import { createChart } from 'lightweight-charts';
Vue.use(PubNubVue, {
    subscribeKey: 'sub-c-f85a3f2f-9028-40fc-8f09-89cb149a1355', publishKey: 'pub-c-3d5ddae6-a6db-4be3-8cbb-266b9167b35b'
}
)
Vue.use(createChart)
Vue.use(VueTradingView)

