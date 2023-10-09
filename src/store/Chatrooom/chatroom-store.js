import ChatRoomApi from "@/api/chatroom/chatroom-api";

export default {
  namespaced: true,
  state: () => ({
    chatroom: "",
    isLoadingRooms: false,
  }),
  mutations: {
    setChatRoom(state, data) {
      state.chatroom = data;
    },
  },
  actions: {
    fetchChatRoom({ commit }, body) {
      try {
        return new Promise((resolve) => {
          ChatRoomApi.fetchAllChatRoom(body).then((res) => {
            commit("setChatRoom", res.data);
            resolve(res);
          });
        }).catch((err) => {
          commit("setChatRoom", null);
          throw new Error(err);
        });
      } catch (error) {
        commit("setChatRoom", null);
        throw new Error(error);
      }
    },
  },
};
