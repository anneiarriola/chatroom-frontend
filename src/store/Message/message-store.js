import MessageApi from "@/api/messages/message-api";

export default {
  namespaced: true,
  state: () => ({
    message: null,
    allMessages: null,
    isLoadingMessage: false,
    isLoadingCreating: false,
  }),

  mutations: {
    setAllMessage(state, data) {
      state.allMessages = data;
    },
    setCreateMessage(state, data) {
      state.message = data;
    },
    setLoadingAllMessage(state, isLoading) {
      state.isLoadingMessage = isLoading;
    },
    setLoadingCreateMessage(state, isLoading) {
      state.isLoadingCreating = isLoading;
    },
  },
  actions: {
    createMessageStore({ commit }, body) {
      try {
        commit("setLoadingCreateMessage", true);
        return new Promise((resolve, reject) => {
          MessageApi.createMessage(body)
            .then((res) => {
              commit("setCreateMessage", body);
              commit("setLoadingCreateMessage", false);
              resolve(res);
            })
            .catch((err) => {
              commit("setCreateMessage", null);
              commit("setLoadingCreateMessage", false);
              reject(err);
            });
        });
      } catch (error) {
        commit("setCreateMessage", null);
        commit("setLoadingCreateMessage", false);
        throw new Error(error);
      }
    },

    fetchAllMessages({ commit }) {
      commit("setLoadingAllMessage", true);
      try {
        return new Promise((resolve, reject) => {
          MessageApi.fetchAllMessage()
            .then((res) => {
              commit("setAllMessage", res.data);
              commit("setLoadingAllMessage", false);
              resolve(res);
            })
            .catch((err) => {
              commit("setAllMessage", false);
              commit("setLoadingAllMessage", false);
              reject(err);
            });
        });
      } catch (error) {
        commit("setAllMessage", false);
        commit("setLoadingAllMessage", false);
        throw new Error(error);
      }
    },
  },
};
