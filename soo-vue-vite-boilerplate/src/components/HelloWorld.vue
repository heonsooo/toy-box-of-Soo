<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {
      count: 0,
    };
  },
  methods: {
    onClickMoveHome() {
      this.$router.push("/");
    },
    onClickMovePageA() {
      this.$router.push({ name: "A" });
    },
    onClickMovePageB() {
      this.$router.push({ name: "B" });
    },
  },
};
</script>

<template>
  <div class="main-border">
    <h1>{{ msg }}</h1>

    <p>
      Main Page
      <span>
        <button type="button" @click="onClickMoveHome">Home</button>
      </span>
      <span>
        <button type="button" @click="onClickMovePageA">pageA</button>
      </span>
      <span>
        <button type="button" @click="onClickMovePageB">pageB</button>
      </span>
    </p>
    <router-view />
  </div>
</template>

<style>
.main-border {
  width: 80%;
  border: 2px solid #000;
  padding: 10px;
  margin: 10px;
}
</style>
