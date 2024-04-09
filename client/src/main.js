import { createApp } from "vue";
import App from "@/App.vue";

import router from "@/routes.js";
import { createPinia, PiniaVuePlugin } from "pinia";
// import { createRouter, createWebHashHistory } from "vue-router";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faAnglesUp } from "@fortawesome/free-solid-svg-icons";
import { faAnglesRight } from "@fortawesome/free-solid-svg-icons";
import { faAnglesLeft } from "@fortawesome/free-solid-svg-icons";

library.add(faAnglesUp, faAnglesRight, faAnglesLeft);

const pinia = createPinia();
const app = createApp(App);
app.use(pinia);
app.use(router);
app.component("font-awesome-icon", FontAwesomeIcon);
app.mount("#app");
