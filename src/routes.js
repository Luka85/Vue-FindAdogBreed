import VueRouter from "vue-router";
import BreedsList from "./components/BreedsList.vue";
import BreedCard from "./components/BreedCard.vue";
import SearchForm from "./components/SearchForm.vue";

const router = new VueRouter({
  mode: "history",
  base: "/",
  routes: [
    { path: "/", component: BreedsList, redirect: "/breeds" },
    { path: "/breeds", component: BreedsList },
    // { name: "search", path: "/search/:breedName", component: SearchForm },
    // { path: "/breed/:breedId", component: BreedCard },
    { path: "/:notFound(.*)", component: BreedsList, redirect: "/breeds" },
  ],
});
export default router;
