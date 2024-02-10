<script>
import {
  mapState,
  mapGetters,
  mapMutations,
  createNamespacedHelpers,
} from "vuex";

const dolceHelper = createNamespacedHelpers("module_dolce");

export default {
  data() {
    return {
      pageTitle: "Dolce Page B",
      instanceDataOfPageB: 35,
    };
  },
  computed: {
    // module_dolce.js의 state
    ...dolceHelper.mapState(["dolceLatte"]),

    // index.js의 state
    ...mapState(["COMMON_COFFEE"]),

    // index.js의 getters
    ...mapGetters(["COMMON_totalCoffeeCount", "COMMON_totalCoffeePrice"]),
  },
};
</script>

<template>
  <div class="pageB-border">
    <h2>{{ pageTitle }}</h2>
    <div class="img-box"></div>
    <div label="instance-data">
      <h4>page B 인스턴스 변수</h4>

      <ul>
        <li>
          별점<span class="desc">(default :35)</span> :
          {{ instanceDataOfPageB }}
        </li>
      </ul>
    </div>
    <div label="vuex-data">
      <h4>page B Vuex state (dolce.js)</h4>
      <ul>
        <li>{{ dolceLatte.name }} 가격: {{ dolceLatte.price }}</li>
      </ul>
    </div>
    <div label="vuex-data-advance">
      <h4>page A, Page B Vuex 공통 state (index.js)</h4>
      <ul v-for="(coffee, idx) in COMMON_COFFEE" :key="`coffee${idx}`">
        <li>{{ coffee.name }} : {{ coffee.count }}개</li>
      </ul>
      <ul>
        <li>총 {{ COMMON_totalCoffeeCount }}개</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.pageB-border {
  border: 0.5px solid #499784;
  padding: 10px;
  margin: 10px;
}
.img-box {
  background-image: url("../../assets/img/latte.jpg");
  background-size: cover;
  width: 400px;
  height: 400px;
}
.desc {
  color: grey;
  font-size: 9pt;
}

.btn {
  margin-left: 10px;
}
</style>
