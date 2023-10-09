import UsersApi from "@/api/users/user-api";

export default {
  namespaced: true,
  state: () => ({
    users: null,
    isLoadingCreateUser: false,
    userCreated: null,
  }),
  mutations: {
    setUsers(state, data) {
      state.users = data;
    },
    setLoadingCreateUser(state, isLoading) {
      state.isLoadingCreateUser = isLoading;
    },
    setCreateUser(state, data) {
      state.userCreated = data;
    },
  },
  actions: {
    createUser({ commit }, body) {
      try {
        commit("setLoadingCreateUser", true);
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            UsersApi.createUser(body)
              .then((res) => {
                commit("setCreateUser", res.data.user);
                commit("setLoadingCreateUser", false); // Set loading to false after the API request is completed
                resolve(res);
              })
              .catch((err) => {
                commit("setCreateUser", false);
                commit("setLoadingCreateUser", false); // Set loading to false in case of an error
                reject(err);
              });
          }, 2000); // Simulate a 2-second API request delay
        });
      } catch (error) {
        commit("setCreateUser", false);
        commit("setLoadingCreateUser", false); // Set loading to false in case of an error
        throw new Error(error);
      }
    },
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
