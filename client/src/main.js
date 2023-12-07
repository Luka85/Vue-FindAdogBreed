import Vue from "vue";
import App from "@/App.vue";

import router from "@/routes.js";
import { createPinia, PiniaVuePlugin } from "pinia";
import VueRouter from "vue-router";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faAnglesUp } from "@fortawesome/free-solid-svg-icons";
import { faAnglesRight } from "@fortawesome/free-solid-svg-icons";
import { faAnglesLeft } from "@fortawesome/free-solid-svg-icons";

library.add(faAnglesUp, faAnglesRight, faAnglesLeft);

Vue.config.productionTip = false;
Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.use(PiniaVuePlugin);
Vue.use(VueRouter);
const pinia = createPinia();
new Vue({
  el: "#app",
  router,
  pinia,
  render: (h) => h(App),
});
