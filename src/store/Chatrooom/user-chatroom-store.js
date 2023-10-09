import UserChatRoomApi from "@/api/user_chatroom/user_chatroom-api";

export default {
  namespaced: true,
  state: () => ({
    validchatRoom: null,
    isLoadingValid: false,
  }),
  mutations: {
    setLoadingValid(state, isLoading) {
      state.isLoadingValid = isLoading;
    },
    setValidateChatRoom(state, data) {
      state.validchatRoom = data;
    },
  },
  actions: {
    validateChatRoomSt({ commit }, body) {
      try {
        commit("setLoadingValid", true);
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            UserChatRoomApi.validateChatRoom(body)
              .then((res) => {
                commit("setValidateChatRoom", res);
                commit("setLoadingValid", false);
                resolve(res);
              })
              .catch((err) => {
                commit("setValidateChatRoom", null);
                commit("setLoadingValid", false);
                reject(err);
              });
          }, 2000);
        });
      } catch (error) {
        commit("setValidateChatRoom", null);
        commit("setLoadingValid", false);
        throw new Error(error);
      }
    },
  },
};
