<script>
export default {
  data() {
    return {
      pageTitle: "Page B",
      instanceDataOfPageB: 35,
    };
  },
  methods: {
    onClickAddNum() {
      this.instanceDataOfPageB++;
    },
    onClickMinusNum() {
      this.instanceDataOfPageB--;
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
