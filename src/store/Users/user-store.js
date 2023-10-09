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
    setLoadingCreateUser ( state, isLoading) {
      state.isLoadingCreateUser = isLoading
    },
    setCreateUser( state, data) {
      console.log('data', data)
      state.userCreated = data
    }
  },
  actions: {
    createUser ({commit}, body) {
      try {
        commit('setLoadingCreateUser', true)
        return new Promise((resolve) => {
          UsersApi.createUser(body).then((res) => {
            commit('setCreateUser', res)
            commit('setLoadingCreateUser', false)
            resolve(res)
          })
        }).catch((err) => {
          commit('setCreateUser', false)
          throw new Error(err)
        })
      } catch (error) {
        commit('setCreateUser', false)
          throw new Error(error)
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
