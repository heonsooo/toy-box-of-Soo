<script setup>
import HelloWorld from "./components/HelloWorld.vue";
</script>

<template>
  <div class="main">
    <HelloWorld msg="Vuex. wtih 아아덕후" />
  </div>
</template>

<style scoped>
.main {
  margin: auto 40%;
}
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
