import VueRouter from "vue-router";
import BreedsList from "./components/BreedsList.vue";
import NotFound from "./components/NotFound.vue";
import BreedDetails from "./components/BreedDetails.vue";

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
      children: [
        {
          name: "details",
          path: "details",
          component: BreedDetails,
        },
      ],
    },

    {
      name: "search",
      path: "/search/",
      component: BreedsList,
    },

    { name: "notFound", path: "/:notFound(.*)*", component: NotFound },
  ],
});

export default router;
