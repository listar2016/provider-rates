import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    providers: [],
    usStates: ['AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY'],
    snackData: {
      value: false,
      color: 'success',
      text: ''
    },
    provider: null
  },
  mutations: {
    SET_SNACK_DATA (state, data) {
      state.snackData = data
    },
    SET_PROVIDERS (state, { providers }) {
      state.providers = providers
    },
    ADD_PROVIDER (state, { provider }) {
      let newId = 1
      if (state.providers.length > 0) {
        newId = Math.max.apply(Math, state.providers.map(({ id }) => id)) + 1
      }
      state.providers.push({
        ...provider,
        id: newId
      })
    },
    UPDATE_PROVIDER (state, { provider }) {
      const findIndex = state.providers.findIndex(({ id }) => id === provider.id)
      state.providers.splice(findIndex, 1, provider)
    },
    DELETE_PROVIDER (state, { provider }) {
      const findIndex = state.providers.findIndex(({ id }) => id === provider.id)
      state.providers.splice(findIndex, 1)
    },
    SET_PROVIDER (state, { provider }) {
      state.provider = provider
    }
  },
  actions: {
    async setSnackData ({ commit }, data) {
      commit('SET_SNACK_DATA', data)
    },
    async getAllProviders ({ commit }) {
      commit('SET_PROVIDERS', [])
    },
    async addProvider ({ commit }, params) {
      commit('ADD_PROVIDER', { provider: params })
      return {
        success: true,
        message: 'Added successfully!',
        error: ''
      }
    },
    async updateProvider ({ commit }, params) {
      commit('UPDATE_PROVIDER', { provider: params })
      return {
        success: true,
        message: 'Updated successfully!',
        error: ''
      }
    },
    async deleteProvider ({ commit }, params) {
      commit('DELETE_PROVIDER', { provider: params })
      return {
        success: true,
        message: 'Deleted successfully!',
        error: ''
      }
    },
    async setProvider ({ commit }, params) {
      commit('SET_PROVIDER', { provider: params })
    }
  },
  getters: {
    providers: ({ providers }) => providers,
    usStates: ({ usStates }) => usStates,
    snackData: ({ snackData }) => snackData,
    provider: ({ provider }) => provider
  },
  modules: {}
})
