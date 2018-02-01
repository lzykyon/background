import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';    // 默认主题
// import '../static/css/theme-green/index.css';       // 浅绿色主题
//import store from './vuex/store';
import Vuex from 'vuex';
import "babel-polyfill";
import Mock from './mock'
Mock.bootstrap();

Vue.use(ElementUI);
Vue.use(Vuex);
Vue.prototype.$axios = axios;
new Vue({
    router,
    //store,
    render: h => h(App)
}).$mount('#app');