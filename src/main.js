import Vue from 'vue'
import App from './App.vue'
import store from 'air-controller-vue/src/store'
import './styles/style.scss'
import AirController from 'air-controller-vue'

Vue.config.productionTip = false;

Vue.use(AirController);

new Vue({
  store,
  render: h => h(App)
}).$mount('#app');
