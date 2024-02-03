import { createStore } from "vuex";
import module_americano from "./espresso/americano.js";
import module_dolce from "./latte/dolce.js";

export default createStore({
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
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

// export default store;
