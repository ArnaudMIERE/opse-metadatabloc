import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)


const state = {
    user: { "roles": [] }
};

const getters = {
    getUser: state => state.user
}

const mutations = {

    setUser(state, user) {
        state.user = user
    }
}

export default new Vuex.Store({
    getters,
    state,
    mutations,
});