import VueRouter from "vue-router";
import BreedsList from "./components/BreedsList.vue";

const router = new VueRouter({
  mode: "history",
  base: "/",
  routes: [
    {
      name: "redirect",
      path: "/",
      component: BreedsList,
      redirect: "/breeds/",
    },
    {
      name: "breeds",
      path: "/breeds/",
      component: BreedsList,
    },
    {
      name: "breedName",
      path: "/breeds/:breedName",
      component: BreedsList,
      props: true,
    },

    { name: "search", path: "/search", component: BreedsList },

    { path: "/:notFound(.*)", component: BreedsList, redirect: "/breeds/" },
  ],
});

export default router;
