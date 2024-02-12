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
    ...dolceHelper.mapState(["dolceLatte", "dolceLatteBarista"]),

    // index.js의 state
    ...mapState(["COMMON_COFFEE"]),

    // index.js의 getters
    ...mapGetters(["COMMON_totalCoffeeCount", "COMMON_totalCoffeePrice"]),
  },
  methods: {
    ...mapMutations([
      "COMMON_incrementCoffeeCount",
      "COMMON_decrementCoffeeCount",
    ]),

    ...dolceHelper.mapMutations([
      "incrementDolceLattePrice",
      "decrementDolceLattePrice",
    ]),

    ...dolceHelper.mapActions(["getDolceLatteBaristar"]),

    onClickAddNum() {
      this.instanceDataOfPageB++;
    },
    onClickMinusNum() {
      this.instanceDataOfPageB--;
    },
    onClickGetBaristar() {
      let baristarId = Math.floor(Math.random() * 10 + 1);
      this.getDolceLatteBaristar(baristarId);
    },
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
      <button class="btn" type="button" @click="onClickAddNum()">증가</button>
      <button class="btn" type="button" @click="onClickMinusNum()">감소</button>
    </div>
    <div label="vuex-data">
      <h4>page B Vuex state (dolce.js)</h4>
      <ul>
        <li>{{ dolceLatte.name }} 가격: {{ dolceLatte.price }}</li>
      </ul>
      <button class="btn" type="button" @click="incrementDolceLattePrice()">
        증액
      </button>
      <button class="btn" type="button" @click="decrementDolceLattePrice()">
        감액
      </button>
    </div>
    <div label="vuex-data-advance">
      <h4>page A, Page B Vuex 공통 state (index.js)</h4>
      <ul v-for="(coffee, idx) in COMMON_COFFEE" :key="`coffee${idx}`">
        <li>{{ coffee.name }} : {{ coffee.count }}개</li>
      </ul>
      <ul>
        <li>총 {{ COMMON_totalCoffeeCount }}개</li>
      </ul>
      <button class="btn" type="button" @click="COMMON_incrementCoffeeCount(1)">
        돌체라떼 추가
      </button>
      <button class="btn" type="button" @click="COMMON_decrementCoffeeCount(1)">
        돌체라떼 감소
      </button>
    </div>
    <div class="vuex-action">
      <h4>page B 돌체라떼 바리스타 호출 (Vuex actions 통신) (dolce.js)</h4>
      <template v-if="dolceLatteBarista?.avatar">
        <ul>
          <span>
            <img :src="dolceLatteBarista?.avatar" alt="avatar" />
          </span>
          <li class="avatar-desc">
            name : {{ dolceLatteBarista?.first_name }}
            {{ dolceLatteBarista?.last_name }}
          </li>
          <li>email : {{ dolceLatteBarista?.email }}</li>
        </ul></template
      >
      <button class="btn" type="button" @click="onClickGetBaristar()">
        바리스타 호출
      </button>
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
.vuex-action {
  margin-top: 30px;
}
.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-right: 10px;
}
.avatar-desc {
  font-size: 14pt;
  font-weight: bold;
}

.btn {
  margin-left: 10px;
}
</style>
