import { createStore } from "vuex";
import module_americano from "./espresso/americano.js";
import module_dolce from "./latte/dolce.js";

export default createStore({
  namespaced: true,
  state: {
    COMMON_COFFEE: [
      {
        name: "Iced Americano",
        price: 3.5,
        count: 0,
        description: "Two shot of espresso with cold water",
      },
      {
        name: "dolce latte",
        price: 4.5,
        count: 0,
        description: "A single shot of espresso with hot milk and foam",
      },
    ],
  },
  getters: {},
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

// import { createStore } from "vuex";

// const store = createStore({
//   state: {
//     // Define your state properties here
//   },
//   mutations: {
//     // Define your mutations here
//   },
//   actions: {
//     // Define your actions here
//   },
//   getters: {
//     // Define your getters here
//   },
// });
