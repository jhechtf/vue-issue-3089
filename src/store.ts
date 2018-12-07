import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    searchQuery: ""
  },
  mutations: {
    updateSearch(state, {searchQuery}) {
      state.searchQuery = searchQuery;
      return state;
    }
  },
  actions: {

  },
});
