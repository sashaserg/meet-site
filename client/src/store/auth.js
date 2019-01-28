import {
  CURRENT_USER,
  ERROR, GET_CURRENT_USER,
  LOGIN,
  LOGOUT,
  REFRESH_TOKENS,
  REGISTRATION,
  REQUEST,
  RESPONSE,
  USER_LOGIN,
  USER_LOGOUT
} from "../constants";
import {addUser} from "../api/rest/usersService";
import {getCurrentUser, login, logout, refreshTokens} from "../api/rest/authorizationService";

const auth = {
  state: {
    user: null
  },
  mutations: {
    [USER_LOGIN] (state, user) {
      state.user = user;
    },
    [USER_LOGOUT] (state) {
      state.user = null;
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    }
  },
  getters: {
    [GET_CURRENT_USER]: state => ({
      currentUser: state.user
    })
  },
  actions: {
    async [LOGIN] ( { commit }, user ) {
      commit(REQUEST, null, { root: true });
      try {
        const result = await login(user);
        if(!result) {
          throw new Error("Something wrong with login...Try it again");
        }
        else {
          commit(RESPONSE, null, { root: true });
          const { data } = result;
          localStorage.setItem('accessToken', data.accessToken);
          localStorage.setItem('refreshToken', data.refreshToken);
          commit(USER_LOGIN, data.user);
        }
      } catch (err) {
        commit(ERROR, err, { root: true });
      }
    },
    async [REGISTRATION] ( { commit }, user ) {
      commit(REQUEST, null, { root: true });
      try {
        const result = await addUser(user);
        if(!result)
        {
          throw new Error("Wrong with registration");
        } else {
          commit(RESPONSE, null, { root: true });
          return {code: 200, message: "User has added"}
        }
      } catch (err) {
        commit(ERROR, err, { root: true });
      }
    },
    async [LOGOUT] ( {commit} ) {
      commit(REQUEST, null, { root: true });
      try {
        const body = { refreshToken: localStorage.getItem('refreshToken')};
        const result = await logout(body);
        commit(USER_LOGOUT, result);
      } catch (err) {
        commit(ERROR, err, { root: true });
      }
    },
    async [REFRESH_TOKENS] ( {commit}, refreshToken ) {
      commit(REQUEST, null, { root: true });
      try {
          const result = await refreshTokens(refreshToken);
          const {data} = result;
          localStorage.setItem('accessToken', data.accessToken);
          localStorage.setItem('refreshToken', data.refreshToken);

      } catch (err) {
        commit(ERROR, err, { root: true });
      }
    },
    async [CURRENT_USER] ( {commit}) {
      try {
        const user = await getCurrentUser();
        const { data } = user;
        commit(USER_LOGIN, data);
      } catch (err) {
        commit(ERROR, err, { root: true });
      }
    }
  }
};

export default auth;
