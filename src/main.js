import Vue from 'vue'
import axios from 'axios';
import App from './App.vue'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

// axios.defaults.baseURL = (process.env.API_PATH === '') ? 'http://localhost:3000/' : process.env.API_PATH;
Vue.prototype.$http = axios;


new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
