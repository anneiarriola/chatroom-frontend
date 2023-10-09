import Vue from 'vue';
import Vuex from 'vuex';
import UserStoreModule from "@/store/Users/user-store";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // state properties
  },
  mutations: {
    // mutations
  },
  modules: {
        UserStoreModule,
      },
});
