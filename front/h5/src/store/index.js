import Vue from 'vue';
import Vuex from 'vuex'; //vuex
import { setUser, getUser, removeUser } from "@/commons/services/user";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    loading: false,
    source: {
      token: null,
      cancel: null
    },//ajax
    user: null,//用户
  },
  actions: {
    //通用loading
    setLoading({ commit }, data) {
      commit('setLoading', data);
    },
    setUser({ commit }, data) {
      return new Promise((resolve) => {
        commit('userUpdate', data);
        resolve();
      });
    },
    removeUser({ commit }, data) {
      return new Promise((resolve) => {
        commit('userRemove', data);
        resolve();
      });
    }
  },
  mutations: {
    setLoading(state, playload) {
      state.loading = playload;
    },
    userUpdate(state, playload) {
      setUser(playload);
      state.user = playload;
    },
    userRemove(state) {
      removeUser();
      state.user = null;
    },
  },
  getters: {
    userInfo: state => {
      if (state.user) {
        return state.user;
      } else {
        return getUser();
      }
    },
  },
});

//导出
export default store;
