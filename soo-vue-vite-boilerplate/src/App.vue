<script>
import Header from "./components/Header.vue";
export default {
  name: "App",
  components: {
    Header,
  },
};
</script>

<template>
  <div>
    <Header msg="Vuex." />
    <main class="main-border">
      <router-view />
    </main>
  </div>
</template>

<style>
.main-border {
  width: 80%;
  padding: 10px;
  margin: 10px;
  border: 2px solid #000;
}
</style>
