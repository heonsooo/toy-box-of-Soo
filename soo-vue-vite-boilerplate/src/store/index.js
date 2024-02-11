import { createStore } from "vuex";
import module_americano from "./espresso/americano.js";
import module_dolce from "./latte/dolce.js";

export default createStore({
  namespaced: true,
  state: {
    COMMON_COFFEE: [
      {
        name: "Iced Americano",
        count: 0,
        description: "Two shot of espresso with cold water",
      },
      {
        name: "dolce latte",
        count: 0,
        description: "A single shot of espresso with hot milk and foam",
      },
    ],
  },
  getters: {
    COMMON_totalCoffeeCount(state) {
      return state.COMMON_COFFEE.reduce((acc, cur) => {
        return acc + cur.count;
      }, 0);
    },
  },
  mutations: {
    COMMON_incrementCoffeeCount(state, index) {
      state.COMMON_COFFEE[index].count++;
    },
    COMMON_decrementCoffeeCount(state, index) {
      state.COMMON_COFFEE[index].count--;
    },
  },
  actions: {},
  modules: {
    module_americano,
    module_dolce,
  },
});
