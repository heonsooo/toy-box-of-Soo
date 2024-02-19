import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// mixin
import { mixinFormattingNumber } from "./utils/mixin";

createApp(App)
  .mixin(mixinFormattingNumber)
  .use(store)
  .use(router)
  .mount("#app");
