import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import createLogger from 'vuex/dist/logger';
import monitorState from '../plugins/monitorState';
import i18n from '../i18n/store';
import test from './test';

Vue.use(Vuex);

const modules = {
  i18n,
  test,
};

const debug = process.env.NODE_ENV !== 'production';
const persistOptions = {
};
export default new Vuex.Store({
  modules,
  strict: debug,
  plugins: debug ?
    [createLogger(), monitorState(), createPersistedState(persistOptions)] :
    [createPersistedState(persistOptions)],
});
