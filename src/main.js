import Vue from 'vue'
import App from './App.vue'
import router from './route'
import axios from "axios";
import VueAxios from 'vue-axios'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import store from './store.js'
Vue.config.productionTip = false
Vue.use(VueAxios, axios)
Vue.use(mavonEditor)
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')