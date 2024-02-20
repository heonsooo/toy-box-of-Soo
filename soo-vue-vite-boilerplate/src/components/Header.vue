<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
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
  <header class="main-border">
    <h1>{{ msg }}</h1>
    <nav class="nav-border">
      <h2>Menu</h2>
      <ul>
        <li>
          <button class="menu-btn" type="button" @click="onClickMoveHome">
            Home
          </button>
        </li>
        <li>
          <button class="menu-btn" type="button" @click="onClickMovePageA">
            pageA
          </button>
        </li>
        <li>
          <button class="menu-btn" type="button" @click="onClickMovePageB">
            pageB
          </button>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
/* .main-border {
  width: 80%;
  border: 2px solid #000;
  padding: 10px;
  margin: 10px;
} */
.nav-border {
  border: 1px solid slategrey;
  padding: 10px;
  margin: 10px;
}
li {
  list-style: none;
  display: inline;
  /* margin: 10px; */
}
.menu-btn {
  padding: 10px;
  margin: 10px;
  border: 1px solid #000;
  background-color: #fff;
  cursor: pointer;
}
</style>
