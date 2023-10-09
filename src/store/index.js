import Vue from "vue";
import Vuex from "vuex";
import UserStoreModule from "@/store/Users/user-store";
import ChatRoomStoreModule from '@/store/Chatrooom/chatroom-store'
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    UserStoreModule,
    ChatRoomStoreModule
  },
});
