// store/latte/dolce.js
const state = {
  dolceLatte: {
    name: "Hot DolceLatte",
    price: 5900,
    description: "A single shot of espresso with hot milk and foam",
  },
};
const mutations = {
  incrementDolceLattePrice(state) {
    state.dolceLatte.price += 350;
  },
  decrementDolceLattePrice(state) {
    state.dolceLatte.price -= 350;
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
