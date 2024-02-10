<script>
export default {
  data() {
    return {
      pageTitle: "Page A",
      instanceDataOfPageA: 72,
    };
  },
  methods: {
    onClickAddNum() {
      this.instanceDataOfPageA++;
    },
    onClickMinusNum() {
      this.instanceDataOfPageA--;
    },
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
      <button class="btn" type="button" @click="onClickAddNum()">증가</button>
      <button class="btn" type="button" @click="onClickMinusNum()">감소</button>
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
