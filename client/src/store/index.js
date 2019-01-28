import Vue from 'vue'
import Vuex from 'vuex'
import { REQUEST, RESPONSE, ERROR } from "../constants"
import user from './user'
import photo from './photo'
import comment from './comment'
import auth from './auth'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    photo,
    comment,
    auth
  },
  state: {
    isFetching: false,
    error: null
  },
  mutations: {
    [REQUEST] (state) {
      state.isFetching = true;
    },
    [RESPONSE] (state) {
      state.isFetching = false;
    },
    [ERROR] (state, err) {
      state.isFetching = false;
      state.error = err;
    }
  },
  actions: {

  }
})
