import axios from "axios";
const state = {
  icedAmericano: {
    name: "Iced Americano",
    price: 4500,
    description: "A single shot of espresso with hot water",
  },
};
const mutations = {
  incrementIcedAmericanoPrice(state) {
    state.icedAmericano.price += 100;
  },
  decrementIcedAmericanoPrice(state) {
    state.icedAmericano.price -= 100;
  },
};
const actions = {};
const getters = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
