// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueMaterial from 'vue-material'

import 'material-design-icons/iconfont/material-icons.css'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default-dark.css'

import store from './store/store.js'
import utils from './assets/util.js'

import Axios from 'axios'

Vue.config.productionTip = false
Vue.use(VueMaterial)
Vue.prototype.$utils = utils

Axios.defaults.baseURL =  "http://localhost:80/device/";// window.jsControler.getBaseUrl();
Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

Vue.prototype.$ajax = Axios

/* eslint-disable no-new */
new Vue({
  store,
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
