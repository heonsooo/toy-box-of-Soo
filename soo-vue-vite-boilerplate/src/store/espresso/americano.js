// store/espresso/americano.js
import axios from "axios";

const state = {
  icedAmericano: {
    name: "Iced Americano",
    price: 4500,
    description: "A single shot of espresso with hot water",
  },
  americanoBarista: {},
};
const getters = {};
const mutations = {
  incrementIcedAmericanoPrice(state) {
    state.icedAmericano.price += 100;
  },
  decrementIcedAmericanoPrice(state) {
    state.icedAmericano.price -= 100;
  },
  setAmericanoBaristar(state, payload) {
    state.americanoBarista = payload;
  },
};
const actions = {
  getAmericanoBaristar({ commit }, params) {
    axios
      .get(`https://reqres.in/api/users/${params}`)
      .then((res) => {
        // 통신 성공했을 경우, mutation으로 state 응답 값으로 변경
        commit("setAmericanoBaristar", res.data.data);
      })
      .catch((res) => {
        // 실패했을 경우
        console.error("실패 ", res);
      });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
