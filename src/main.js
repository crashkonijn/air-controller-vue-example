import Vue from 'vue'
import App from './App.vue'
import './styles/style.scss'
import AirController from 'air-controller-vue'
// import AsyncComputed from 'vue-async-computed'

Vue.use(AirController);
// Vue.use(Vuex);
// Vue.use(AsyncComputed)


import store from 'air-controller-vue/src/store'

new Vue({
  store,
  render: h => h(App)
}).$mount('#app');
