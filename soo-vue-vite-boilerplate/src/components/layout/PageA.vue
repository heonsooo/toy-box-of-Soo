<script>
import {
  mapState,
  mapGetters,
  mapMutations,
  createNamespacedHelpers,
} from "vuex";
import store from "/src/store";

const americanoHelper = createNamespacedHelpers("module_americano");

export default {
  data() {
    return {
      pageTitle: "Americano Page A",
      instanceDataOfPageA: 72,
    };
  },
  computed: {
    // index.js의 state
    ...mapState(["COMMON_COFFEE"]),

    // module_americano.js의 state
    ...americanoHelper.mapState(["icedAmericano"]),

    // index.js의 getters
    ...mapGetters(["COMMON_totalCoffeeCount", "COMMON_totalCoffeePrice"]),
  },
  methods: {
    ...mapMutations([
      "COMMON_incrementCoffeeCount",
      "COMMON_decrementCoffeeCount",
    ]),

    ...createNamespacedHelpers("module_americano").mapMutations([
      "incrementIcedAmericanoPrice",
      "decrementIcedAmericanoPrice",
    ]),

    onClickAddNum() {
      this.instanceDataOfPageA++;
    },
    onClickMinusNum() {
      this.instanceDataOfPageA--;
    },
    onClickAddIcedAmericano() {},
  },
};
</script>

<template>
  <div class="pageA-border">
    <h2>{{ pageTitle }}</h2>
    <div class="img-box"></div>
    <div label="instance-data">
      <h4>page A 인스턴스 변수</h4>
      <ul>
        <li>
          별점 <span class="desc">(default : 72)</span> :
          {{ instanceDataOfPageA }}
        </li>
      </ul>
    </div>
    <div label="vuex-data">
      <h4>page A Vuex state (americano.js)</h4>
      <ul>
        <li>{{ icedAmericano.name }} 가격 : {{ icedAmericano.price }}</li>
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
.pageA-border {
  border: 0.5px solid #c59e9e;
  padding: 10px;
  margin: 10px;
}
.btn {
  margin-left: 10px;
}
.desc {
  color: grey;
  font-size: 9pt;
}

.img-box {
  background-image: url("../../assets/img/americano.jpg");
  background-size: cover;
  width: 400px;
  height: 400px;
}
</style>
