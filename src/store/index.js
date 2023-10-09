import Vue from "vue";
import Vuex from "vuex";
import UserStoreModule from "@/store/Users/user-store";
import ChatRoomStoreModule from '@/store/Chatrooom/chatroom-store'
import UserChatroomStoreModule from "./Chatrooom/user-chatroom-store";
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    UserStoreModule,
    ChatRoomStoreModule,
    UserChatroomStoreModule
  },
  state: () => ({
    user: localStorage.getItem('user'),
    userId: localStorage.getItem('user_id'),
  }),
  mutations:{
    setUserLocalStorage(state, data ){
      localStorage.setItem('user', data)
      state.user = data
    },
    setUserIdLocalStorage(state, data ){
      localStorage.setItem('user_id', data)
      state.userId = data
    },
  },
  actions:{
    setUserLocalStorage({commit}, data){
      commit('setUserLocalStorage', data)
    },
    setUserIdLocalStorage({commit}, data){
      commit('setUserIdLocalStorage', data)
    }
  }
});
