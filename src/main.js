import 'babel-polyfill'
import 'element-ui/lib/theme-chalk/index.css'
import 'vant/lib/index.css'
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import './router/Each'
import store from "./store";
import Vant from 'vant' 
import ElementUI from 'element-ui'
import "./assets/js/fontSize/index";
import './assets/css/common/common.css'
import './assets/css/common/common.scss'
Vue.use(Vant);
Vue.use(ElementUI);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
