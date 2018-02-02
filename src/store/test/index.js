import Vue from 'vue'
import { createTypes, createMutations } from '../../libs';
import {Request,ClearRequest,Requestdd} from '../../api/request';

const types = createTypes([
  'TEST_LOGIN',
  'TEST_USERLIST',
  'TEST_USERLISTPAGE',
  'TEST_USERDEL',
  'TEST_USERADD',
  'TEST_USEREDIT',
  'TEST_USERDELALL',
])

const state = {
  message: {},
  status: {},
  error: {},
  form: {},
}

const actions = {
  login(store, payload) {
    return ClearRequest(store, types.TEST_LOGIN, {
      url: 'login',
      method: 'POST',
      qs: payload,
    })
  },
  userlist(store, payload) {
    return ClearRequest(store, types.TEST_USERLIST, {
      url: 'user/list',
      method: 'GET',
      qs: payload,
    })
  },
  userlistpage(store, payload) {
    return ClearRequest(store, types.TEST_USERLISTPAGE, {
      url: 'user/listpage',
      method: 'GET',
      qs: payload,
    })
  },
  userdel(store, payload) {
    return ClearRequest(store, types.TEST_USERDEL, {
      url: 'user/remove',
      method: 'POST',
      qs: payload,
    })
  },
  userdelall(store, payload) {
    return ClearRequest(store, types.TEST_USERDELALL, {
      url: 'user/batchremove',
      method: 'POST',
      qs: payload,
    })
  },
  useradd(store, payload) {
    return ClearRequest(store, types.TEST_USERADD, {
      url: 'user/add',
      method: 'POST',
      qs: payload,
    })
  },
  useredit(store, payload) {
    return ClearRequest(store, types.TEST_USEREDIT, {
      url: 'user/edit',
      method: 'POST',
      qs: payload,
    })
  },
}

const mutations = {
  ...createMutations(types),
  setEditingAvatar2Form(state, payload) {
    Vue.set(state.form, 'editingAvatar', payload)
  },
}

export default {
  state,
  actions,
  mutations,
}
