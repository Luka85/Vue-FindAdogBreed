import VueRouter from "vue-router";
import BreedsList from "./components/BreedsList.vue";
import BreedCard from "./components/BreedCard.vue";
import SearchForm from "./components/SearchForm.vue";

const router = new VueRouter({
  mode: "history",
  base: "/",
  routes: [
    { path: "/", component: BreedsList, redirect: "/breeds/" },
    {
      name: "breeds",
      path: "/breeds/",
      component: BreedsList,

      children: [
        {
          name: "breedName",
          path: ":breedName",
          component: BreedsList,
          props: true,
        },
      ],
    },
    { name: "search", path: "/search", component: BreedsList },

    { path: "/:notFound(.*)", component: BreedsList, redirect: "/breeds/" },
  ],
});
export default router;
