import { createTypes, createMutations } from '../libs/index'
import i18n from './';

export const types = createTypes(`
  CHANGE_LANGUAGE
`);

const state = {
  lang: 'zh-CN',
};

const getters = {
  lang: state => state.lang,
};

const actions = {
  changeLang({ commit }, lang) {
    commit(types.CHANGE_LANGUAGE, lang);
  },
};

const mutations = {
  [types.CHANGE_LANGUAGE](state, setlang) {
    state.lang = setlang;
    i18n.locale = setlang;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
