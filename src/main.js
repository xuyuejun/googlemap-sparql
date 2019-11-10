import Vue from 'vue'
import App from './App.vue'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import 'material-icons/iconfont/material-icons.css'
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyAKfefiVhHqXWQsYDPJjs5t5Nhj5Qar2AE',
    libraries: 'places'
  }
});

Vue.config.productionTip = false;
Vue.use(VueMaterial);

new Vue({
  render: h => h(App),
}).$mount('#app');
