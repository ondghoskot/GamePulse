//Nuxtjs UI store module
export const state = () => ({
  authToken: "",
  user: {}
});

export const getters = {
  getToken(state) {
    return state.authToken;
  },
  getUser(state) {
    return state.user;
  },
};

export const mutations = {
  setToken(state, value) {
    state.authToken = value;
  },
  setUserData(state, value) {
    state.user = value;
  },
};

export const actions = {};
