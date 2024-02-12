// store/latte/dolce.js
import axios from "axios";

const state = {
  dolceLatte: {
    name: "Hot DolceLatte",
    price: 5900,
    description: "A single shot of espresso with hot milk and foam",
  },
  dolceLatteBarista: {},
};
const getters = {};
const mutations = {
  incrementDolceLattePrice(state) {
    state.dolceLatte.price += 350;
  },
  decrementDolceLattePrice(state) {
    state.dolceLatte.price -= 350;
  },
  setDolceLatteBaristar(state, payload) {
    state.dolceLatteBarista = payload;
  },
};
const actions = {
  getDolceLatteBaristar({ commit }, params) {
    axios
      .get(`https://reqres.in/api/users/${params}`)
      .then((res) => {
        // 통신 성공했을 경우, mutation으로 state 응답 값으로 변경
        commit("setDolceLatteBaristar", res.data.data);
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
