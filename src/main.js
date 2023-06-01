import Vue from "vue";
import App from "./App.vue";

import VueRouter from "vue-router";
import router from "./routes.js";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faAnglesUp } from "@fortawesome/free-solid-svg-icons";
import { faAnglesRight } from "@fortawesome/free-solid-svg-icons";
import { faAnglesLeft } from "@fortawesome/free-solid-svg-icons";

library.add(faAnglesUp, faAnglesRight, faAnglesLeft);

import BaseHeader from "./components/BaseHeader.vue";

Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.component("base-header", BaseHeader);
Vue.use(VueRouter);

new Vue({
  el: "#app",
  router,
  render: (h) => h(App),
});
