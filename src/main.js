import Vue from 'vue';
import i18n from './i18n';
import App from './App';
import router from './router';
import store from './store';
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

// set default language when user first visit
const userLang = navigator.language || navigator.userLanguage;
localStorage.setItem('userLang', userLang);
const defaultLang = !(userLang === 'zh-CN' || userLang === 'zh-TW') ? 'en-US' : userLang;
const lang = localStorage.getItem('lang');
if (!localStorage.getItem('lang')) {
  //store.dispatch('changeLang', defaultLang);
  localStorage.setItem('lang', defaultLang);
}
i18n.locale = lang ? store.state.i18n.lang : defaultLang;

new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
}).$mount('#app');