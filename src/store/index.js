import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// global
import state from './state';
import getters from './getters';
import mutations from './mutations';
import actions from './actions';

// modules


export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state,
  getters,
  mutations,
  actions,
  modules: {}
});
