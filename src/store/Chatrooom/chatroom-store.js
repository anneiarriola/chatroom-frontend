import ChatRoomApi from "@/api/chatroom/chatroom-api";

export default {
  namespaced: true,
  state: () => ({
    chatroom: [],
    isLoadingRooms: false,
    isLoadingCreateChat: false,
  }),
  mutations: {
    setChatRoom(state, data) {
      state.chatroom = data
    },
    setAddChatRoom(state, newChatRoom) {
     state.chatroom.push(newChatRoom)
    },
    setLoadingCreation(state, isLoading) {
      state.isLoadingCreateChat = isLoading;
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
    createChatRoom({ commit }, body) {
      const temp = body
      try {
        commit("setLoadingCreation", true);
        return new Promise((resolve, reject) => {
          const data = body
          setTimeout(() => {
            ChatRoomApi.createChatRoom(data)
              .then((res) => {
                console.log("res", res);
                commit("setAddChatRoom", temp);
                commit("setLoadingCreation", false);
                resolve(res);
              })
              .catch((err) => {
                commit("setAddChatRoom", null);
                commit("setLoadingCreation", false); 
                reject(err);
              });
          }, 2000); 
        });
      } catch (error) {
        commit("setAddChatRoom", null);
        commit("setLoadingCreation", false); 
        throw new Error(error);
      }
    },
  },
};
