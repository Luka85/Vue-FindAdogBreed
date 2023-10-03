import Vue from "vue";
import App from "./App.vue";

import VueRouter from "vue-router";
import router from "./routes.js";
import { createPinia, PiniaVuePlugin } from "pinia";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faAnglesUp } from "@fortawesome/free-solid-svg-icons";
import { faAnglesRight } from "@fortawesome/free-solid-svg-icons";
import { faAnglesLeft } from "@fortawesome/free-solid-svg-icons";

library.add(faAnglesUp, faAnglesRight, faAnglesLeft);

import BaseHeader from "./components/BaseHeader.vue";
import UserLogin from "./components/UserLogin.vue";

Vue.config.productionTip = false;
Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.component("base-header", BaseHeader);
Vue.component("user-login", UserLogin);
Vue.use(VueRouter);
Vue.use(PiniaVuePlugin);
const pinia = createPinia();
new Vue({
  el: "#app",
  router,
  pinia,
  render: (h) => h(App),
});
