import Vue from 'vue'
import App from './App.vue'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import 'material-icons/iconfont/material-icons.css'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import * as VueGoogleMaps from 'vue2-google-maps'
import axios from "axios";
import VueAxios from 'vue-axios';

import pointToLatLng from "./assets/pointToLatLng";

import i18n from './local/i18n'

Vue.use(VueAxios, axios);
Vue.use(ElementUI);
Vue.use(pointToLatLng);

Vue.axios.defaults.headers.get['Content-Type'] = 'application/sparql-results+json';

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyAKfefiVhHqXWQsYDPJjs5t5Nhj5Qar2AE',
    libraries: 'places'
  }
});

Vue.config.productionTip = false;
Vue.use(VueMaterial);

new Vue({
  i18n,
  render: h => h(App),
}).$mount('#app');
