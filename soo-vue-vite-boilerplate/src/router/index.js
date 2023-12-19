import { createRouter, createWebHistory } from "vue-router";
const router = createRouter({
  history: createWebHistory(""),
  routes: [
    {
      path: "/",
      name: "main",
      component: () => import("../components/HelloWorld.vue"),
    },
    {
      path: "/A",
      name: "A",
      component: () => import("../components/layout/PageA.vue"),
    },
    {
      path: "/B",
      name: "B",
      component: () => import("../components/layout/PageB.vue"),
    },
  ],
});
export default router;
