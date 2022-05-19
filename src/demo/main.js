import Vue from 'vue';

Vue.config.productionTip = false;

import Vuex from "vuex";
Vue.use(Vuex);

import axios from 'axios';
import VueAxios from 'vue-axios';
Vue.use(VueAxios, axios)

import VueLayers from 'vuelayers'

Vue.use(VueLayers)


import App from './App.vue';
import router from '@/demo/router';
import vuetify from '@/demo/plugins/vuetify.js';
import i18n from '@/demo/i18n.js';

import store from './store/test-store'

new Vue({
    router,
    vuetify,
    store,
    i18n,
    render: h => h(App)
}).$mount('#app');