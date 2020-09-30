import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    providers: [
      {
        id: 1,
        firstName: 'test',
        lastName: 'test',
        address_1: 'test',
        address_2: 'test',
        city: 'test',
        state: 'AK',
        zipCode: '11111',
        phoneHome: '(111) 1111-1111',
        phoneMobile: '(555) 5555-5555',
        email: 'test@test.com',
        legacySystemId: '101',
        disciplines: null
      }
    ],
    usStates: ['AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY'],
    taxStatuses: ['W2', '1099 Independent Contractor', '1099 Company'],
    disciplines: ['ST', 'OT', 'PT', 'LBA', 'RBT'],
    services: ['Speech Therapy', 'Occupational Therapy Evaluation', 'Psychological Evaluation'],
    programs: ['EI', 'SEIT', 'CPSE'],
    unitTypes: ['Assessment', 'Hourly Service Provision', 'EI Basic Service Provision', 'EI Extended Service Provision', 'Service Coordination'],
    languages: ['Spanish', 'Russian', 'Mandarin', 'Polish', 'Portuguese'],
    snackData: {
      value: false,
      color: 'primary',
      text: ''
    },
    provider: null,
    rates: []
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
    },
    SET_RATES (state, { rates }) {
      state.rates = rates
    },
    ADD_RATE (state, { rate }) {
      let newId = 1
      if (state.rates.length > 0) {
        newId = Math.max.apply(Math, state.rates.map(({ id }) => id)) + 1
      }
      state.rates.push({
        ...rate,
        id: newId
      })
    },
    DELETE_RATE (state, { rate }) {
      const findIndex = state.rates.findIndex(({ id }) => id === rate.id)
      state.rates.splice(findIndex, 1)
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
    },
    async getAllRates ({ commit }) {
      commit('SET_RATES', [])
    },
    async addRate ({ commit }, params) {
      commit('ADD_RATE', { rate: params })
      return {
        success: true,
        message: 'Added successfully!',
        error: ''
      }
    },
    async deleteRate ({ commit }, params) {
      commit('DELETE_RATE', { rate: params })
      return {
        success: true,
        message: 'Deleted successfully!',
        error: ''
      }
    }
  },
  getters: {
    providers: ({ providers }) => providers,
    usStates: ({ usStates }) => usStates,
    snackData: ({ snackData }) => snackData,
    provider: ({ provider }) => provider,
    taxStatuses: ({ taxStatuses }) => taxStatuses,
    disciplines: ({ disciplines }) => disciplines,
    services: ({ services }) => services,
    programs: ({ programs }) => programs,
    unitTypes: ({ unitTypes }) => unitTypes,
    languages: ({ languages }) => languages,
    rates: ({ rates }) => rates
  },
  modules: {}
})
