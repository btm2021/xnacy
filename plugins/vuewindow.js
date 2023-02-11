import Vue from 'vue'
import VueTradingView from 'vue-trading-view/src/vue-trading-view';
import PubNubVue from 'pubnub-vue';

import VueLodash from 'vue-lodash'
import lodash from 'lodash'
Vue.use(VueLodash, { name: 'custom', lodash: lodash })
Vue.use(PubNubVue, {
    subscribeKey: 'sub-c-f85a3f2f-9028-40fc-8f09-89cb149a1355', publishKey: 'pub-c-3d5ddae6-a6db-4be3-8cbb-266b9167b35b'
}
)
Vue.use(VueTradingView)
