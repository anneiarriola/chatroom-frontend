import UsersApi from "@/api/users/user-api";

export default {
  namespaced: true,
  state: () => ({
    users: null,
  }),
  mutations: {
    setUsers(state, data) {
      state.users = data;
    },
  },
  actions: {
    fetchUser({ commit }, body) {
      try {
        return new Promise((resolve) => {
          UsersApi.fetchAllUser(body).then((res) => {
            commit("setUsers", res);
            resolve(res);
          });
        }).catch((err) => {
          commit("setUsers", null);
          throw new Error(err);
        });
      } catch (error) {
        commit("setUsers", null);
        throw new Error(error);
      }
    },
  },
};
