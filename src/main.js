import Vue from "vue";
import App from "./App.vue";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";

library.add(faArrowsRotate);

import BaseHeader from "./components/BaseHeader.vue";

Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.component("base-header", BaseHeader);

new Vue({
  el: "#app",
  render: (h) => h(App),
});
