import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import axios from "axios";

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import routes from './router/routes'
import common from './common/common'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.prototype.axios = axios
Vue.prototype.common = common

axios.defaults.baseURL = "http://localhost:8888/"
// axios.defaults.baseURL = "http://10.0.8.16:8888/"
// axios.defaults.baseURL = "http://114.132.220.94:8888/"



const router = new VueRouter({
  routes
})

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
