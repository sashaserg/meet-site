import {DISPLAYED_USER_UPDATE, ERROR, REQUEST, RESPONSE, USER_BY_ID, USERS, USERS_UPDATE} from "../constants";
import {getAllUsers, getUserById} from "../api/rest/usersService";
const queryString = require('query-string');

const user = {
  state: {
    users: [],
    displayedUser: {}
  },
  getters: {
    dUFullName(state) {
      return state.displayedUser.firstName + ' ' + state.displayedUser.lastName;
    }
  },
  mutations: {
    [USERS_UPDATE] (state, users) {
      state.users = users;
    },
    [DISPLAYED_USER_UPDATE] (state, user) {
      state.displayedUser = user;
    }
  },
  actions: {
    async [USERS] ({ commit }, filter) {
      commit(REQUEST, null, { root: true });
      const query = '?' + queryString.stringify(filter);
      try {
        const users = await getAllUsers(query);
        commit(RESPONSE, null, { root: true });
        commit(USERS_UPDATE, users.data);
      }
      catch (err) {
        commit(ERROR, err, { root: true });
      }
    },
    async [USER_BY_ID] ({ commit }, userId) {
      commit(REQUEST, null, {root: true});
      try {
        const user = await getUserById(userId);
        if(!user) {
          throw new Error('Something wrong with getting user');
        } else {
          commit(RESPONSE, null, { root: true });
          commit(DISPLAYED_USER_UPDATE, user.data);
        }
      } catch (err) {
        commit(ERROR, err, { root: true });
      }

    }
  },

};

export default user;
